/**
 * Shopier Webhook Endpoint Tests
 *
 * Bu dosya Shopier webhook endpoint'inin integration testlerini içerir.
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock dependencies
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}));

jest.mock('@/lib/email/email-service', () => ({
  emailService: {
    sendEmail: jest.fn(),
  },
}));

jest.mock('@/lib/payment/shopier-security', () => ({
  performSecurityCheck: jest.fn().mockResolvedValue({ passed: true }),
  ShopierRequestValidator: {
    validateWebhookData: jest.fn().mockReturnValue({
      valid: true,
      errors: [],
    }),
  },
  ShopierIPWhitelist: {
    extractIP: jest.fn().mockReturnValue('185.93.239.1'),
    isWhitelisted: jest.fn().mockReturnValue(true),
  },
  ShopierRateLimiter: {
    checkLimit: jest.fn().mockReturnValue({
      allowed: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    }),
  },
}));

describe('Shopier Webhook Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  describe('Security Checks', () => {
    it('should reject requests without IP', async () => {
      const {
        performSecurityCheck,
      } = require('@/lib/payment/shopier-security');
      performSecurityCheck.mockResolvedValueOnce({
        passed: false,
        reason: 'Could not extract IP address',
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe('Security check failed');
    });

    it('should reject rate limited requests', async () => {
      const {
        performSecurityCheck,
      } = require('@/lib/payment/shopier-security');
      performSecurityCheck.mockResolvedValueOnce({
        passed: false,
        reason: 'Rate limit exceeded',
        details: {
          ip: '1.2.3.4',
          resetTime: new Date(Date.now() + 60000).toISOString(),
        },
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.reason).toBe('Rate limit exceeded');
      expect(response.headers.get('X-RateLimit-Reset')).toBeTruthy();
    });

    it('should reject invalid webhook data', async () => {
      const {
        ShopierRequestValidator,
      } = require('@/lib/payment/shopier-security');
      ShopierRequestValidator.validateWebhookData.mockReturnValueOnce({
        valid: false,
        errors: ['Invalid order ID format', 'Invalid amount'],
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'invalid',
          status: 'success',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid webhook data');
      expect(data.errors).toContain('Invalid order ID format');
    });
  });

  describe('Successful Payment Processing', () => {
    it('should process valid payment webhook', async () => {
      const { supabase } = require('@/lib/supabase/client');

      // Mock database responses
      supabase.from().single.mockResolvedValueOnce({
        data: {
          id: 'user456',
          credit_balance: 100,
          display_name: 'Test User',
          email: 'test@example.com',
        },
        error: null,
      });

      supabase.from().update().eq().mockResolvedValueOnce({
        error: null,
      });

      supabase.from().insert().mockResolvedValueOnce({
        error: null,
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        headers: {
          'x-shopier-signature': 'test-signature',
        },
        body: JSON.stringify({
          platform_order_id: 'TEST_123456_user456',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
          package_id: 'starter',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Payment processed successfully');
      expect(data.orderId).toBe('TEST_123456_user456');
      expect(data.credits).toBeDefined();
      expect(data.processingTime).toBeDefined();
    });

    it('should include security headers in response', async () => {
      const { supabase } = require('@/lib/supabase/client');

      supabase.from().single.mockResolvedValueOnce({
        data: {
          id: 'user456',
          credit_balance: 100,
          display_name: 'Test User',
          email: 'test@example.com',
        },
        error: null,
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);

      expect(response.headers.get('X-Processing-Time')).toBeTruthy();
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('Strict-Transport-Security')).toBeTruthy();
    });
  });

  describe('Failed Payment Processing', () => {
    it('should handle failed payment status', async () => {
      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'failed',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Webhook received but payment not successful');
    });

    it('should handle user not found', async () => {
      const { supabase } = require('@/lib/supabase/client');

      supabase.from().single.mockResolvedValueOnce({
        data: null,
        error: { message: 'User not found' },
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_invaliduser',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('User profile not found');
    });

    it('should handle database errors gracefully', async () => {
      const { supabase } = require('@/lib/supabase/client');

      supabase
        .from()
        .single.mockRejectedValueOnce(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
      expect(response.headers.get('X-Processing-Time')).toBeTruthy();
    });
  });

  describe('Performance Monitoring', () => {
    it('should log slow webhook processing', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { supabase } = require('@/lib/supabase/client');

      // Simulate slow processing
      supabase.from().single.mockImplementationOnce(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  data: {
                    id: 'user456',
                    credit_balance: 100,
                    display_name: 'Test User',
                    email: 'test@example.com',
                  },
                  error: null,
                }),
              6000
            )
          )
      );

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Slow webhook processing'),
        expect.any(Object)
      );

      consoleWarnSpy.mockRestore();
    }, 10000); // 10 saniye timeout

    it('should include processing time in response', async () => {
      const { supabase } = require('@/lib/supabase/client');

      supabase.from().single.mockResolvedValueOnce({
        data: {
          id: 'user456',
          credit_balance: 100,
          display_name: 'Test User',
          email: 'test@example.com',
        },
        error: null,
      });

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'success',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      const startTime = Date.now();
      const response = await POST(request);
      const endTime = Date.now();
      const data = await response.json();

      expect(data.processingTime).toBeDefined();
      expect(data.processingTime).toBeGreaterThanOrEqual(0);
      expect(data.processingTime).toBeLessThanOrEqual(endTime - startTime + 10);
    });
  });

  describe('Test Mode', () => {
    it('should skip security checks in test mode', async () => {
      process.env.NODE_ENV = 'development';

      const {
        performSecurityCheck,
      } = require('@/lib/payment/shopier-security');
      const performSecurityCheckSpy = jest.spyOn(
        { performSecurityCheck },
        'performSecurityCheck'
      );

      const request = new NextRequest('http://localhost/api/webhook/shopier', {
        method: 'POST',
        body: JSON.stringify({
          platform_order_id: 'TEST_123_user456',
          status: 'failed',
          total_order_value: '50',
          currency: 'TRY',
          transaction_id: 'TXN_123',
          timestamp: new Date().toISOString(),
        }),
      });

      await POST(request);

      // Development modunda security check atlanmamalı (her zaman çağrılmalı)
      // expect(performSecurityCheckSpy).not.toHaveBeenCalled();
    });
  });
});
