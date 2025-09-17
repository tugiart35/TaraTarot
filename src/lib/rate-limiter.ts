/**
 * Client-side Rate Limiting Utility
 * Prevents excessive API calls and user actions
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitEntry {
  attempts: number;
  windowStart: number;
  blockedUntil?: number;
}

class ClientRateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private configs: Map<string, RateLimitConfig> = new Map();

  constructor() {
    // Default configurations
    this.addConfig('login', {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
      blockDurationMs: 30 * 60 * 1000,
    }); // 5 attempts per 15min
    this.addConfig('search', { maxAttempts: 30, windowMs: 60 * 1000 }); // 30 searches per minute
    this.addConfig('admin_action', { maxAttempts: 10, windowMs: 60 * 1000 }); // 10 admin actions per minute
    this.addConfig('credit_update', { maxAttempts: 3, windowMs: 60 * 1000 }); // 3 credit updates per minute
    this.addConfig('user_status', { maxAttempts: 5, windowMs: 60 * 1000 }); // 5 status changes per minute
    this.addConfig('data_fetch', { maxAttempts: 60, windowMs: 60 * 1000 }); // 60 data fetches per minute
  }

  /**
   * Add or update rate limit configuration
   */
  addConfig(action: string, config: RateLimitConfig) {
    this.configs.set(action, config);
  }

  /**
   * Check if action is allowed
   */
  isAllowed(
    action: string,
    identifier: string = 'default'
  ): {
    allowed: boolean;
    resetTime?: number;
    remainingAttempts?: number;
  } {
    const key = `${action}:${identifier}`;
    const config = this.configs.get(action);

    if (!config) {
      return { allowed: true };
    }

    const now = Date.now();
    const entry = this.limits.get(key);

    // Check if currently blocked
    if (entry?.blockedUntil && entry.blockedUntil > now) {
      return {
        allowed: false,
        resetTime: entry.blockedUntil,
      };
    }

    // Initialize or reset if window expired
    if (!entry || now - entry.windowStart > config.windowMs) {
      this.limits.set(key, {
        attempts: 1,
        windowStart: now,
      });
      return {
        allowed: true,
        remainingAttempts: config.maxAttempts - 1,
      };
    }

    // Check if within limits
    if (entry.attempts < config.maxAttempts) {
      entry.attempts++;
      return {
        allowed: true,
        remainingAttempts: config.maxAttempts - entry.attempts,
      };
    }

    // Exceeded limits - block if configured
    if (config.blockDurationMs) {
      entry.blockedUntil = now + config.blockDurationMs;
    }

    return {
      allowed: false,
      resetTime: entry.windowStart + config.windowMs,
    };
  }

  /**
   * Record a failed attempt (like failed login)
   */
  recordFailure(action: string, identifier: string = 'default') {
    const result = this.isAllowed(action, identifier);
    return result;
  }

  /**
   * Reset limits for a specific action and identifier
   */
  reset(action: string, identifier: string = 'default') {
    const key = `${action}:${identifier}`;
    this.limits.delete(key);
  }

  /**
   * Get remaining time until reset
   */
  getResetTime(action: string, identifier: string = 'default'): number | null {
    const key = `${action}:${identifier}`;
    const entry = this.limits.get(key);
    const config = this.configs.get(action);

    if (!entry || !config) return null;

    if (entry.blockedUntil) {
      return Math.max(0, entry.blockedUntil - Date.now());
    }

    return Math.max(0, entry.windowStart + config.windowMs - Date.now());
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      const action = key.split(':')[0];
      const config = this.configs.get(action!);

      if (!config) continue;

      const expired = now - entry.windowStart > config.windowMs;
      const unblocked = !entry.blockedUntil || entry.blockedUntil < now;

      if (expired && unblocked) {
        this.limits.delete(key);
      }
    }
  }
}

// Global instance
export const rateLimiter = new ClientRateLimiter();

// Cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);
}

/**
 * Rate limit decorator for functions
 */
export function withRateLimit<T extends unknown[], R>(
  action: string,
  fn: (...args: T) => R,
  getIdentifier?: (...args: T) => string
) {
  return (...args: T): R | { error: string; resetTime?: number } => {
    const identifier = getIdentifier ? getIdentifier(...args) : 'default';
    const check = rateLimiter.isAllowed(action, identifier);

    if (!check.allowed) {
      const resetTime = check.resetTime;
      const minutes = resetTime
        ? Math.ceil((resetTime - Date.now()) / 60000)
        : 1;

      const result: { error: string; resetTime?: number } = {
        error: `Çok fazla deneme. ${minutes} dakika sonra tekrar deneyin.`,
      };
      if (resetTime !== undefined) result.resetTime = resetTime;
      return result;
    }

    return fn(...args);
  };
}

/**
 * Rate limit for async functions
 */
export function withAsyncRateLimit<T extends unknown[], R>(
  action: string,
  fn: (...args: T) => Promise<R>,
  getIdentifier?: (...args: T) => string
) {
  return async (
    ...args: T
  ): Promise<R | { error: string; resetTime?: number }> => {
    const identifier = getIdentifier ? getIdentifier(...args) : 'default';
    const check = rateLimiter.isAllowed(action, identifier);

    if (!check.allowed) {
      const resetTime = check.resetTime;
      const minutes = resetTime
        ? Math.ceil((resetTime - Date.now()) / 60000)
        : 1;

      const result: { error: string; resetTime?: number } = {
        error: `Çok fazla deneme. ${minutes} dakika sonra tekrar deneyin.`,
      };
      if (resetTime !== undefined) result.resetTime = resetTime;
      return result;
    }

    return await fn(...args);
  };
}

/**
 * Custom hook for rate limiting in React components
 */
export function useRateLimit(action: string, identifier: string = 'default') {
  const checkLimit = () => rateLimiter.isAllowed(action, identifier);
  const resetLimit = () => rateLimiter.reset(action, identifier);
  const getResetTime = () => rateLimiter.getResetTime(action, identifier);

  return {
    checkLimit,
    resetLimit,
    getResetTime,
    isAllowed: checkLimit().allowed,
  };
}

/**
 * Format remaining time for user display
 */
export function formatResetTime(resetTimeMs: number): string {
  if (resetTimeMs <= 0) return 'Şimdi';

  const minutes = Math.ceil(resetTimeMs / 60000);
  if (minutes < 60) {
    return `${minutes} dakika`;
  }

  const hours = Math.ceil(minutes / 60);
  return `${hours} saat`;
}
