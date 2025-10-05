/**
 * Shopier Security Tests
 *
 * Bu dosya shopier-security modülünün testlerini içerir.
 */

import crypto from 'crypto';
import {
  generateSecureSignature,
  verifySecureSignature,
  generateLegacySignature,
  ShopierIPWhitelist,
  ShopierRateLimiter,
  ShopierRequestValidator,
} from '../shopier-security';

describe('Shopier Security', () => {
  describe('generateSecureSignature', () => {
    it('should generate HMAC-SHA256 signature', () => {
      const params = {
        orderId: 'ORDER_123_user456',
        amount: '100',
        currency: 'TRY',
      };
      const secret = 'test-secret';

      const signature = generateSecureSignature(params, secret);

      // HMAC-SHA256 hex formatında 64 karakter olmalı
      expect(signature).toHaveLength(64);
      expect(signature).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate consistent signatures for same input', () => {
      const params = {
        orderId: 'ORDER_123_user456',
        amount: '100',
      };
      const secret = 'test-secret';

      const signature1 = generateSecureSignature(params, secret);
      const signature2 = generateSecureSignature(params, secret);

      expect(signature1).toBe(signature2);
    });

    it('should generate different signatures for different params', () => {
      const params1 = { orderId: 'ORDER_123' };
      const params2 = { orderId: 'ORDER_456' };
      const secret = 'test-secret';

      const signature1 = generateSecureSignature(params1, secret);
      const signature2 = generateSecureSignature(params2, secret);

      expect(signature1).not.toBe(signature2);
    });

    it('should sort parameters alphabetically', () => {
      const params1 = { z: '1', a: '2', m: '3' };
      const params2 = { a: '2', m: '3', z: '1' };
      const secret = 'test-secret';

      const signature1 = generateSecureSignature(params1, secret);
      const signature2 = generateSecureSignature(params2, secret);

      expect(signature1).toBe(signature2);
    });
  });

  describe('verifySecureSignature', () => {
    it('should verify valid signature', () => {
      const params = {
        orderId: 'ORDER_123_user456',
        amount: '100',
      };
      const secret = 'test-secret';
      const signature = generateSecureSignature(params, secret);

      const isValid = verifySecureSignature(params, signature, secret);

      expect(isValid).toBe(true);
    });

    it('should reject invalid signature', () => {
      const params = {
        orderId: 'ORDER_123_user456',
        amount: '100',
      };
      const secret = 'test-secret';
      const invalidSignature = 'invalid-signature';

      const isValid = verifySecureSignature(params, invalidSignature, secret);

      expect(isValid).toBe(false);
    });

    it('should reject tampered params', () => {
      const params1 = { orderId: 'ORDER_123', amount: '100' };
      const params2 = { orderId: 'ORDER_123', amount: '200' }; // Tampered
      const secret = 'test-secret';
      const signature = generateSecureSignature(params1, secret);

      const isValid = verifySecureSignature(params2, signature, secret);

      expect(isValid).toBe(false);
    });
  });

  describe('generateLegacySignature', () => {
    it('should generate base64 signature', () => {
      const params = {
        orderId: 'ORDER_123',
        amount: '100',
      };
      const secret = 'test-secret';

      const signature = generateLegacySignature(params, secret);

      // Base64 formatında olmalı
      expect(signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });
  });

  describe('ShopierIPWhitelist', () => {
    beforeEach(() => {
      // Test için NODE_ENV'i production yap
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should whitelist Shopier IP ranges', () => {
      expect(ShopierIPWhitelist.isWhitelisted('185.93.239.1')).toBe(true);
      expect(ShopierIPWhitelist.isWhitelisted('185.93.240.1')).toBe(true);
    });

    it('should whitelist localhost in development', () => {
      process.env.NODE_ENV = 'development';

      expect(ShopierIPWhitelist.isWhitelisted('127.0.0.1')).toBe(true);
      expect(ShopierIPWhitelist.isWhitelisted('192.168.1.1')).toBe(true);
    });

    it('should reject non-whitelisted IPs', () => {
      expect(ShopierIPWhitelist.isWhitelisted('1.2.3.4')).toBe(false);
      expect(ShopierIPWhitelist.isWhitelisted('8.8.8.8')).toBe(false);
    });

    it('should extract IP from request headers', () => {
      const mockRequest = {
        headers: {
          get: (name: string) => {
            if (name === 'x-forwarded-for') {
              return '1.2.3.4, 5.6.7.8';
            }
            if (name === 'x-real-ip') {
              return '9.10.11.12';
            }
            return null;
          },
        },
      } as any;

      const ip = ShopierIPWhitelist.extractIP(mockRequest);

      expect(ip).toBe('1.2.3.4'); // İlk IP
    });

    it('should prioritize CF-Connecting-IP header', () => {
      const mockRequest = {
        headers: {
          get: (name: string) => {
            if (name === 'cf-connecting-ip') {
              return '1.1.1.1';
            }
            if (name === 'x-forwarded-for') {
              return '2.2.2.2';
            }
            if (name === 'x-real-ip') {
              return '3.3.3.3';
            }
            return null;
          },
        },
      } as any;

      const ip = ShopierIPWhitelist.extractIP(mockRequest);

      expect(ip).toBe('1.1.1.1');
    });
  });

  describe('ShopierRateLimiter', () => {
    beforeEach(() => {
      ShopierRateLimiter.reset();
    });

    afterEach(() => {
      ShopierRateLimiter.reset();
    });

    it('should allow requests within limit', () => {
      const result1 = ShopierRateLimiter.checkLimit('test-ip', 3, 60000);
      const result2 = ShopierRateLimiter.checkLimit('test-ip', 3, 60000);
      const result3 = ShopierRateLimiter.checkLimit('test-ip', 3, 60000);

      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
      expect(result3.allowed).toBe(true);
      expect(result3.remaining).toBe(0);
    });

    it('should reject requests over limit', () => {
      ShopierRateLimiter.checkLimit('test-ip', 2, 60000);
      ShopierRateLimiter.checkLimit('test-ip', 2, 60000);
      const result = ShopierRateLimiter.checkLimit('test-ip', 2, 60000);

      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should track different IPs separately', () => {
      const result1 = ShopierRateLimiter.checkLimit('ip1', 2, 60000);
      const result2 = ShopierRateLimiter.checkLimit('ip2', 2, 60000);

      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
      expect(result1.remaining).toBe(1);
      expect(result2.remaining).toBe(1);
    });

    it('should reset after time window', async () => {
      ShopierRateLimiter.checkLimit('test-ip', 1, 100); // 100ms window
      const result1 = ShopierRateLimiter.checkLimit('test-ip', 1, 100);
      expect(result1.allowed).toBe(false);

      // 150ms bekle (window süresi geçsin)
      await new Promise(resolve => setTimeout(resolve, 150));

      const result2 = ShopierRateLimiter.checkLimit('test-ip', 1, 100);
      expect(result2.allowed).toBe(true);
    });

    it('should provide stats', () => {
      ShopierRateLimiter.checkLimit('ip1', 10, 60000);
      ShopierRateLimiter.checkLimit('ip2', 10, 60000);

      const stats = ShopierRateLimiter.getStats();

      expect(stats.totalIdentifiers).toBe(2);
      expect(stats.activeIdentifiers).toBe(2);
    });
  });

  describe('ShopierRequestValidator', () => {
    describe('validateTimestamp', () => {
      it('should accept recent timestamps', () => {
        const now = new Date().toISOString();
        expect(ShopierRequestValidator.validateTimestamp(now)).toBe(true);
      });

      it('should reject old timestamps', () => {
        const old = new Date(Date.now() - 400000).toISOString(); // 400 saniye önce
        expect(ShopierRequestValidator.validateTimestamp(old, 300)).toBe(false);
      });

      it('should reject future timestamps', () => {
        const future = new Date(Date.now() + 400000).toISOString();
        expect(ShopierRequestValidator.validateTimestamp(future, 300)).toBe(
          false
        );
      });

      it('should handle invalid timestamps', () => {
        expect(ShopierRequestValidator.validateTimestamp('invalid')).toBe(
          false
        );
      });
    });

    describe('validateOrderId', () => {
      it('should accept valid order IDs', () => {
        expect(
          ShopierRequestValidator.validateOrderId('ORDER_123456_user789')
        ).toBe(true);
        expect(
          ShopierRequestValidator.validateOrderId('TEST_123456_user789')
        ).toBe(true);
      });

      it('should reject invalid order IDs', () => {
        expect(ShopierRequestValidator.validateOrderId('invalid')).toBe(false);
        expect(ShopierRequestValidator.validateOrderId('ORDER_abc_user')).toBe(
          false
        );
        expect(ShopierRequestValidator.validateOrderId('')).toBe(false);
      });
    });

    describe('validateAmount', () => {
      it('should accept valid amounts', () => {
        expect(ShopierRequestValidator.validateAmount(50)).toBe(true);
        expect(ShopierRequestValidator.validateAmount(100.5)).toBe(true);
      });

      it('should reject invalid amounts', () => {
        expect(ShopierRequestValidator.validateAmount(0)).toBe(false);
        expect(ShopierRequestValidator.validateAmount(-10)).toBe(false);
        expect(ShopierRequestValidator.validateAmount(20000)).toBe(false);
        expect(ShopierRequestValidator.validateAmount(NaN)).toBe(false);
      });
    });

    describe('validateCurrency', () => {
      it('should accept valid currencies', () => {
        expect(ShopierRequestValidator.validateCurrency('TRY')).toBe(true);
        expect(ShopierRequestValidator.validateCurrency('USD')).toBe(true);
        expect(ShopierRequestValidator.validateCurrency('EUR')).toBe(true);
      });

      it('should reject invalid currencies', () => {
        expect(ShopierRequestValidator.validateCurrency('ABC')).toBe(false);
        expect(ShopierRequestValidator.validateCurrency('')).toBe(false);
      });
    });

    describe('validateWebhookData', () => {
      it('should accept valid webhook data', () => {
        const validData = {
          orderId: 'ORDER_123456_user789',
          timestamp: new Date().toISOString(),
          amount: 100,
          currency: 'TRY',
          status: 'success',
          transactionId: 'TXN_123',
        };

        const result = ShopierRequestValidator.validateWebhookData(validData);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should reject invalid webhook data', () => {
        const invalidData = {
          orderId: 'invalid',
          timestamp: 'invalid',
          amount: -10,
          currency: 'ABC',
          status: 'invalid',
        };

        const result = ShopierRequestValidator.validateWebhookData(invalidData);

        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });

      it('should list all validation errors', () => {
        const invalidData = {
          orderId: '',
          timestamp: '',
          amount: 'invalid',
          currency: '',
          status: '',
        };

        const result = ShopierRequestValidator.validateWebhookData(invalidData);

        expect(result.errors).toContain('Invalid order ID format');
        expect(result.errors).toContain('Invalid or expired timestamp');
        expect(result.errors).toContain('Invalid amount');
        expect(result.errors).toContain('Invalid currency');
        expect(result.errors).toContain('Invalid status');
      });
    });
  });
});
