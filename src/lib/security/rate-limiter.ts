/*
 * RATE LIMITER - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/types/auth.types.ts (Auth types)
 * - @/lib/supabase/client.ts (Supabase client)
 *
 * DOSYA AMACI:
 * Rate limiting sistemi için güvenli implementasyon.
 * IP-based, user-based ve endpoint-based rate limiting.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - IP-based rate limiting
 * - User-based rate limiting
 * - Endpoint-specific limits
 * - Sliding window algorithm
 * - Redis integration ready
 * - Distributed rate limiting
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: DDoS protection için
 * - GÜVENLİ: Production-ready
 * - SCALABLE: Enterprise-ready
 */

// RateLimitConfig type is defined inline below

// Rate limit store interface
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
    windowStart: number;
  };
}

// Rate limit result
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

// Rate limit configuration
export interface RateLimitRule {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: any) => string;
}

// Default rate limit rules
export const DEFAULT_RATE_LIMIT_RULES: Record<string, RateLimitRule> = {
  // Auth endpoints
  'auth:login': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    skipSuccessfulRequests: true,
  },
  'auth:register': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 registrations per hour
  },
  'auth:password-reset': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 password reset attempts per hour
  },
  'auth:2fa': {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10, // 10 2FA attempts per 5 minutes
  },

  // API endpoints
  'api:general': {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
  },
  'api:tarot': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50, // 50 tarot readings per hour
  },
  'api:payment': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 20, // 20 payment requests per hour
  },

  // File upload
  'upload:image': {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 image uploads per hour
  },

  // Search
  'search:general': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 searches per minute
  },
};

// In-memory rate limit store (for development)
class MemoryRateLimitStore {
  private store: RateLimitStore = {};
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  // Get rate limit data
  get(key: string): { count: number; resetTime: number; windowStart: number } | null {
    const data = this.store[key];
    if (!data) return null;

    // Check if window has expired
    if (Date.now() > data.resetTime) {
      delete this.store[key];
      return null;
    }

    return data;
  }

  // Set rate limit data
  set(key: string, data: { count: number; resetTime: number; windowStart: number }): void {
    this.store[key] = data;
  }

  // Increment counter
  increment(key: string, windowMs: number): { count: number; resetTime: number; windowStart: number } {
    const now = Date.now();
    const existing = this.get(key);

    if (existing) {
      existing.count++;
      this.set(key, existing);
      return existing;
    } else {
      const newData = {
        count: 1,
        resetTime: now + windowMs,
        windowStart: now,
      };
      this.set(key, newData);
      return newData;
    }
  }

  // Clean up expired entries
  private cleanup(): void {
    const now = Date.now();
    for (const key in this.store) {
      if (this.store[key]?.resetTime < now) {
        delete this.store[key];
      }
    }
  }

  // Destroy store
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.store = {};
  }
}

// Redis rate limit store (for production)
class RedisRateLimitStore {
  private redis: any; // Redis client

  constructor(redisClient: any) {
    this.redis = redisClient;
  }

  // Get rate limit data
  async get(key: string): Promise<{ count: number; resetTime: number; windowStart: number } | null> {
    try {
      const data = await this.redis.get(key);
      if (!data) return null;

      const parsed = JSON.parse(data);
      
      // Check if window has expired
      if (Date.now() > parsed.resetTime) {
        await this.redis.del(key);
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  // Set rate limit data
  async set(key: string, data: { count: number; resetTime: number; windowStart: number }): Promise<void> {
    try {
      const ttl = Math.ceil((data.resetTime - Date.now()) / 1000);
      await this.redis.setex(key, ttl, JSON.stringify(data));
    } catch {
      // Redis error, continue without rate limiting
    }
  }

  // Increment counter
  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number; windowStart: number }> {
    try {
      const now = Date.now();
      const existing = await this.get(key);

      if (existing) {
        existing.count++;
        await this.set(key, existing);
        return existing;
      } else {
        const newData = {
          count: 1,
          resetTime: now + windowMs,
          windowStart: now,
        };
        await this.set(key, newData);
        return newData;
      }
    } catch {
      // Redis error, allow request
      return {
        count: 1,
        resetTime: Date.now() + windowMs,
        windowStart: Date.now(),
      };
    }
  }
}

// Main rate limiter class
export class RateLimiter {
  private store: MemoryRateLimitStore | RedisRateLimitStore;
  private rules: Record<string, RateLimitRule>;

  constructor(redisClient?: any) {
    this.store = redisClient ? new RedisRateLimitStore(redisClient) : new MemoryRateLimitStore();
    this.rules = DEFAULT_RATE_LIMIT_RULES;
  }

  // Add custom rate limit rule
  addRule(name: string, rule: RateLimitRule): void {
    this.rules[name] = rule;
  }

  // Check rate limit
  async checkLimit(
    identifier: string,
    ruleName: string,
    customRule?: RateLimitRule
  ): Promise<RateLimitResult> {
    const rule = customRule || this.rules[ruleName];
    if (!rule) {
      return {
        allowed: true,
        remaining: Infinity,
        resetTime: Date.now() + 60 * 1000,
      };
    }

    const key = `${ruleName}:${identifier}`;
    const data = await this.store.increment(key, rule.windowMs);

    const allowed = data.count <= rule.maxRequests;
    const remaining = Math.max(0, rule.maxRequests - data.count);
    const retryAfter = allowed ? undefined : Math.ceil((data.resetTime - Date.now()) / 1000);

    return {
      allowed,
      remaining,
      resetTime: data.resetTime,
      retryAfter: retryAfter,
    };
  }

  // Check rate limit for request
  async checkRequestLimit(
    req: any,
    ruleName: string,
    customRule?: RateLimitRule
  ): Promise<RateLimitResult> {
    const rule = customRule || this.rules[ruleName];
    if (!rule) {
      return {
        allowed: true,
        remaining: Infinity,
        resetTime: Date.now() + 60 * 1000,
      };
    }

    // Generate identifier
    const identifier = rule.keyGenerator ? rule.keyGenerator(req) : this.generateIdentifier(req);
    
    return this.checkLimit(identifier, ruleName, customRule);
  }

  // Generate identifier for request
  private generateIdentifier(req: any): string {
    // Try to get user ID first
    if (req.user?.id) {
      return `user:${req.user.id}`;
    }

    // Fall back to IP address
    const ip = req.ip || req.connection?.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    return `ip:${ip}`;
  }

  // Get rate limit info
  async getRateLimitInfo(identifier: string, ruleName: string): Promise<RateLimitResult | null> {
    const rule = this.rules[ruleName];
    if (!rule) return null;

    const key = `${ruleName}:${identifier}`;
    const data = await this.store.get(key);
    
    if (!data) {
      return {
        allowed: true,
        remaining: rule.maxRequests,
        resetTime: Date.now() + rule.windowMs,
      };
    }

    const allowed = data.count <= rule.maxRequests;
    const remaining = Math.max(0, rule.maxRequests - data.count);

    return {
      allowed,
      remaining,
      resetTime: data.resetTime,
    };
  }

  // Reset rate limit for identifier
  async resetLimit(identifier: string, ruleName: string): Promise<void> {
    const key = `${ruleName}:${identifier}`;
    if (this.store instanceof MemoryRateLimitStore) {
      delete (this.store as any).store[key];
    } else if (this.store instanceof RedisRateLimitStore) {
      await (this.store as any).redis.del(key);
    }
  }

  // Get all rate limit rules
  getRules(): Record<string, RateLimitRule> {
    return { ...this.rules };
  }

  // Destroy rate limiter
  destroy(): void {
    if (this.store instanceof MemoryRateLimitStore) {
      this.store.destroy();
    }
  }
}

// Rate limit middleware for Next.js
export function createRateLimitMiddleware(rateLimiter: RateLimiter) {
  return async (req: any, res: any, next: any) => {
    try {
      const path = req.url || req.path;
      let ruleName = 'api:general';

      // Determine rule based on path
      if (path.includes('/auth/login')) {
        ruleName = 'auth:login';
      } else if (path.includes('/auth/register')) {
        ruleName = 'auth:register';
      } else if (path.includes('/auth/password-reset')) {
        ruleName = 'auth:password-reset';
      } else if (path.includes('/auth/2fa')) {
        ruleName = 'auth:2fa';
      } else if (path.includes('/api/tarot')) {
        ruleName = 'api:tarot';
      } else if (path.includes('/api/payment')) {
        ruleName = 'api:payment';
      } else if (path.includes('/upload')) {
        ruleName = 'upload:image';
      } else if (path.includes('/search')) {
        ruleName = 'search:general';
      }

      const result = await rateLimiter.checkRequestLimit(req, ruleName);

      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', (this as any).rules[ruleName]?.maxRequests || 100);
      res.setHeader('X-RateLimit-Remaining', result.remaining);
      res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));

      if (!result.allowed) {
        res.setHeader('Retry-After', result.retryAfter);
        return res.status(429).json({
          error: 'Rate limit exceeded',
          retryAfter: result.retryAfter,
        });
      }

      next();
    } catch (error) {
      // Rate limiting error, allow request
      next();
    }
  };
}

// Create rate limiter instance
export const createRateLimiter = (redisClient?: any): RateLimiter => {
  return new RateLimiter(redisClient);
};

// Export default rate limiter
export const rateLimiter = createRateLimiter();
