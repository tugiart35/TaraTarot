/**
 * Rate Limiter Test Suite
 * Tests for client-side rate limiting functionality
 */

import {
  rateLimiter,
  withRateLimit,
  withAsyncRateLimit,
  formatResetTime,
} from '../rate-limiter';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset rate limiter before each test
    rateLimiter.cleanup();
  });

  describe('Basic Rate Limiting', () => {
    it('should allow requests within limit', () => {
      const result = rateLimiter.isAllowed('test_action', 'user1');
      expect(result.allowed).toBe(true);
    });

    it('should track remaining attempts', () => {
      rateLimiter.addConfig('test_limited', {
        maxAttempts: 3,
        windowMs: 60000,
      });

      const result1 = rateLimiter.isAllowed('test_limited', 'user1');
      expect(result1.remainingAttempts).toBe(2);

      const result2 = rateLimiter.isAllowed('test_limited', 'user1');
      expect(result2.remainingAttempts).toBe(1);
    });

    it('should block requests exceeding limit', () => {
      rateLimiter.addConfig('test_block', {
        maxAttempts: 2,
        windowMs: 60000,
      });

      rateLimiter.isAllowed('test_block', 'user1'); // 1st attempt
      rateLimiter.isAllowed('test_block', 'user1'); // 2nd attempt
      const result = rateLimiter.isAllowed('test_block', 'user1'); // 3rd attempt

      expect(result.allowed).toBe(false);
      expect(result.resetTime).toBeDefined();
    });

    it('should apply blocking duration when configured', () => {
      rateLimiter.addConfig('test_block_duration', {
        maxAttempts: 1,
        windowMs: 60000,
        blockDurationMs: 30000,
      });

      rateLimiter.isAllowed('test_block_duration', 'user1'); // 1st attempt
      const result = rateLimiter.isAllowed('test_block_duration', 'user1'); // 2nd attempt

      expect(result.allowed).toBe(false);
      expect(result.resetTime).toBeDefined();
    });
  });

  describe('Multiple Users', () => {
    it('should track limits separately for different users', () => {
      rateLimiter.addConfig('test_multi', {
        maxAttempts: 2,
        windowMs: 60000,
      });

      rateLimiter.isAllowed('test_multi', 'user1');
      rateLimiter.isAllowed('test_multi', 'user1');

      // user1 should be at limit
      expect(rateLimiter.isAllowed('test_multi', 'user1').allowed).toBe(false);

      // user2 should still be allowed
      expect(rateLimiter.isAllowed('test_multi', 'user2').allowed).toBe(true);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset limits for specific user', () => {
      rateLimiter.addConfig('test_reset', {
        maxAttempts: 1,
        windowMs: 60000,
      });

      rateLimiter.isAllowed('test_reset', 'user1');
      expect(rateLimiter.isAllowed('test_reset', 'user1').allowed).toBe(false);

      rateLimiter.reset('test_reset', 'user1');
      expect(rateLimiter.isAllowed('test_reset', 'user1').allowed).toBe(true);
    });
  });

  describe('Window Expiration', () => {
    it('should reset after window expires', () => {
      rateLimiter.addConfig('test_window', {
        maxAttempts: 1,
        windowMs: 100, // 100ms window
      });

      rateLimiter.isAllowed('test_window', 'user1');
      expect(rateLimiter.isAllowed('test_window', 'user1').allowed).toBe(false);

      // Wait for window to expire
      return new Promise(resolve => {
        setTimeout(() => {
          expect(rateLimiter.isAllowed('test_window', 'user1').allowed).toBe(true);
          resolve(undefined);
        }, 150);
      });
    });
  });

  describe('Get Reset Time', () => {
    it('should return reset time for blocked action', () => {
      rateLimiter.addConfig('test_reset_time', {
        maxAttempts: 1,
        windowMs: 60000,
      });

      rateLimiter.isAllowed('test_reset_time', 'user1');
      rateLimiter.isAllowed('test_reset_time', 'user1'); // Will be blocked

      const resetTime = rateLimiter.getResetTime('test_reset_time', 'user1');
      expect(resetTime).toBeGreaterThan(0);
    });

    it('should return null for non-existent action', () => {
      const resetTime = rateLimiter.getResetTime('non_existent', 'user1');
      expect(resetTime).toBeNull();
    });
  });

  describe('withRateLimit Decorator', () => {
    it('should allow function execution within limits', () => {
      rateLimiter.addConfig('test_decorator', {
        maxAttempts: 2,
        windowMs: 60000,
      });

      const testFn = (x: number) => x * 2;
      const limitedFn = withRateLimit('test_decorator', testFn);

      expect(limitedFn(5)).toBe(10);
    });

    it('should block function execution when limit exceeded', () => {
      rateLimiter.addConfig('test_decorator_block', {
        maxAttempts: 1,
        windowMs: 60000,
      });

      const testFn = (x: number) => x * 2;
      const limitedFn = withRateLimit('test_decorator_block', testFn);

      limitedFn(5); // First call succeeds
      const result = limitedFn(5); // Second call should be blocked

      expect(result).toHaveProperty('error');
      if (typeof result === 'object' && result !== null && 'error' in result) {
        expect(result.error).toContain('Çok fazla deneme');
      }
    });
  });

  describe('withAsyncRateLimit Decorator', () => {
    it('should allow async function execution within limits', async () => {
      rateLimiter.addConfig('test_async', {
        maxAttempts: 2,
        windowMs: 60000,
      });

      const asyncFn = async (x: number) => x * 2;
      const limitedFn = withAsyncRateLimit('test_async', asyncFn);

      const result = await limitedFn(5);
      expect(result).toBe(10);
    });

    it('should block async function execution when limit exceeded', async () => {
      rateLimiter.addConfig('test_async_block', {
        maxAttempts: 1,
        windowMs: 60000,
      });

      const asyncFn = async (x: number) => x * 2;
      const limitedFn = withAsyncRateLimit('test_async_block', asyncFn);

      await limitedFn(5); // First call succeeds
      const result = await limitedFn(5); // Second call should be blocked

      expect(result).toHaveProperty('error');
      if (typeof result === 'object' && result !== null && 'error' in result) {
        expect(result.error).toContain('Çok fazla deneme');
      }
    });
  });

  describe('formatResetTime', () => {
    it('should format time correctly for minutes', () => {
      expect(formatResetTime(60000)).toBe('1 dakika');
      expect(formatResetTime(120000)).toBe('2 dakika');
    });

    it('should format time correctly for hours', () => {
      expect(formatResetTime(3600000)).toBe('1 saat');
      expect(formatResetTime(7200000)).toBe('2 saat');
    });

    it('should handle zero or negative time', () => {
      expect(formatResetTime(0)).toBe('Şimdi');
      expect(formatResetTime(-1000)).toBe('Şimdi');
    });
  });

  describe('Cleanup', () => {
    it('should remove expired entries', () => {
      rateLimiter.addConfig('test_cleanup', {
        maxAttempts: 1,
        windowMs: 100, // Very short window
      });

      rateLimiter.isAllowed('test_cleanup', 'user1');

      // Wait for window to expire
      return new Promise(resolve => {
        setTimeout(() => {
          rateLimiter.cleanup();
          // After cleanup, should be able to make request again
          expect(rateLimiter.isAllowed('test_cleanup', 'user1').allowed).toBe(true);
          resolve(undefined);
        }, 150);
      });
    });
  });

  describe('Predefined Configurations', () => {
    it('should have login configuration', () => {
      const result = rateLimiter.isAllowed('login', 'user1');
      expect(result.allowed).toBe(true);
      expect(result.remainingAttempts).toBeDefined();
    });

    it('should have search configuration', () => {
      const result = rateLimiter.isAllowed('search', 'user1');
      expect(result.allowed).toBe(true);
    });

    it('should have admin_action configuration', () => {
      const result = rateLimiter.isAllowed('admin_action', 'admin1');
      expect(result.allowed).toBe(true);
    });
  });
});