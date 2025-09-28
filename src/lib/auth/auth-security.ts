/*
 * Auth Security Utilities
 *
 * Bu dosya authentication güvenlik özelliklerini içerir.
 * Rate limiting, input sanitization ve güvenlik kontrolleri sağlar.
 */

import DOMPurify from 'dompurify';

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

export class AuthSecurity {
  private static readonly DEFAULT_RATE_LIMIT: RateLimitConfig = {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000, // 30 minutes
  };

  /**
   * Rate limiting kontrolü
   */
  static async checkRateLimit(
    identifier: string,
    operation: string,
    config: RateLimitConfig = AuthSecurity.DEFAULT_RATE_LIMIT
  ): Promise<{
    allowed: boolean;
    remainingAttempts: number;
    resetTime: number;
  }> {
    const key = `${identifier}:${operation}`;
    const now = Date.now();
    const stored = rateLimitStore.get(key);

    // Clean expired entries
    if (stored && now > stored.resetTime) {
      rateLimitStore.delete(key);
    }

    const current = rateLimitStore.get(key);

    if (!current) {
      // First attempt
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });

      return {
        allowed: true,
        remainingAttempts: config.maxAttempts - 1,
        resetTime: now + config.windowMs,
      };
    }

    if (current.count >= config.maxAttempts) {
      // Rate limit exceeded
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: current.resetTime,
      };
    }

    // Increment counter
    current.count++;
    rateLimitStore.set(key, current);

    return {
      allowed: true,
      remainingAttempts: config.maxAttempts - current.count,
      resetTime: current.resetTime,
    };
  }

  /**
   * Input sanitization
   */
  static sanitizeInput(input: string): string {
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    }
    // Server-side sanitization
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }

  /**
   * Email validation with security checks
   */
  static validateEmailSecurity(email: string): {
    valid: boolean;
    sanitized: string;
    error?: string;
  } {
    const sanitized = AuthSecurity.sanitizeInput(email);

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
      return { valid: false, sanitized, error: 'Invalid email format' };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /script/i,
      /javascript/i,
      /on\w+\s*=/i,
      /<[^>]*>/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(sanitized)) {
        return {
          valid: false,
          sanitized,
          error: 'Suspicious email content detected',
        };
      }
    }

    // Length check
    if (sanitized.length > 254) {
      return { valid: false, sanitized, error: 'Email too long' };
    }

    return { valid: true, sanitized };
  }

  /**
   * Password strength validation
   */
  static validatePasswordSecurity(password: string): {
    valid: boolean;
    score: number;
    suggestions: string[];
    error?: string;
  } {
    const suggestions: string[] = [];
    let score = 0;

    // Length check
    if (password.length < 8) {
      suggestions.push('Use at least 8 characters');
    } else {
      score += 1;
    }

    // Character variety checks
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Add lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Add uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Add numbers');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Add special characters');
    }

    // Common password check
    const commonPasswords = [
      'password',
      '123456',
      '123456789',
      'qwerty',
      'abc123',
      'password123',
      'admin',
      'letmein',
      'welcome',
      'monkey',
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      suggestions.push('Avoid common passwords');
      score = Math.max(0, score - 2);
    }

    // Sequential characters check
    if (/(.)\1{2,}/.test(password)) {
      suggestions.push('Avoid repeated characters');
      score = Math.max(0, score - 1);
    }

    const valid = score >= 3 && password.length >= 8;

    return {
      valid,
      score,
      suggestions,
      error: valid ? undefined : 'Password does not meet security requirements',
    };
  }

  /**
   * Session security validation
   */
  static validateSessionSecurity(session: any): {
    valid: boolean;
    error?: string;
  } {
    if (!session) {
      return { valid: false, error: 'No session found' };
    }

    if (!session.access_token) {
      return { valid: false, error: 'Invalid session token' };
    }

    // Check token expiration
    if (session.expires_at && Date.now() > session.expires_at * 1000) {
      return { valid: false, error: 'Session expired' };
    }

    return { valid: true };
  }

  /**
   * IP-based rate limiting
   */
  static async checkIPRateLimit(
    ip: string,
    operation: string
  ): Promise<{ allowed: boolean; remainingAttempts: number }> {
    return AuthSecurity.checkRateLimit(ip, operation, {
      maxAttempts: 10,
      windowMs: 60 * 60 * 1000, // 1 hour
      blockDurationMs: 2 * 60 * 60 * 1000, // 2 hours
    });
  }

  /**
   * User-based rate limiting
   */
  static async checkUserRateLimit(
    userId: string,
    operation: string
  ): Promise<{ allowed: boolean; remainingAttempts: number }> {
    return AuthSecurity.checkRateLimit(userId, operation, {
      maxAttempts: 20,
      windowMs: 60 * 60 * 1000, // 1 hour
      blockDurationMs: 4 * 60 * 60 * 1000, // 4 hours
    });
  }

  /**
   * Clear rate limit for user (admin function)
   */
  static clearRateLimit(identifier: string, operation: string): void {
    const key = `${identifier}:${operation}`;
    rateLimitStore.delete(key);
  }

  /**
   * Get rate limit status
   */
  static getRateLimitStatus(
    identifier: string,
    operation: string
  ): {
    count: number;
    resetTime: number;
    isBlocked: boolean;
  } {
    const key = `${identifier}:${operation}`;
    const stored = rateLimitStore.get(key);
    const now = Date.now();

    if (!stored || now > stored.resetTime) {
      return { count: 0, resetTime: 0, isBlocked: false };
    }

    return {
      count: stored.count,
      resetTime: stored.resetTime,
      isBlocked: stored.count >= AuthSecurity.DEFAULT_RATE_LIMIT.maxAttempts,
    };
  }
}
