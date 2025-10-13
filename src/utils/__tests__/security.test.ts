/**
 * Security Utilities Test Suite
 * Tests for all security functions
 */

import {
  validateImageSrc,
  sanitizeHtml,
  sanitizeText,
  validateUrl,
  sanitizeNumerologyInput,
  validateDateInput,
  validateNameInput,
  sanitizeForDisplay,
  checkRateLimit,
  validateWebhookSignature,
  generateCsrfToken,
  validateCsrfToken,
  detectSqlInjection,
  validateEmail,
  calculatePasswordStrength,
  generateSecureRandomString,
} from '../security';

describe('Security Utilities', () => {
  describe('validateImageSrc', () => {
    it('should allow local file paths', () => {
      expect(validateImageSrc('/images/card.jpg')).toBe(true);
      expect(validateImageSrc('/public/logo.png')).toBe(true);
    });

    it('should allow data URLs', () => {
      expect(validateImageSrc('data:image/png;base64,abc123')).toBe(true);
    });

    it('should allow whitelisted domains', () => {
      expect(validateImageSrc('https://supabase.co/image.jpg')).toBe(true);
      expect(validateImageSrc('https://cdn.supabase.io/image.jpg')).toBe(true);
    });

    it('should reject non-whitelisted domains', () => {
      expect(validateImageSrc('https://evil.com/image.jpg')).toBe(false);
    });

    it('should reject protocol-relative URLs', () => {
      expect(validateImageSrc('//evil.com/image.jpg')).toBe(false);
    });
  });

  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const result = sanitizeHtml('<script>alert("xss")</script>');
      expect(result).not.toContain('<script>');
    });

    it('should remove iframe tags', () => {
      const result = sanitizeHtml('<iframe src="evil.com"></iframe>');
      expect(result).not.toContain('<iframe>');
    });

    it('should remove dangerous attributes', () => {
      const result = sanitizeHtml('<div onclick="alert()">Test</div>');
      expect(result).not.toContain('onclick');
    });

    it('should allow safe HTML', () => {
      const result = sanitizeHtml('<p>Safe content</p>');
      expect(result).toContain('<p>');
    });
  });

  describe('sanitizeText', () => {
    it('should escape HTML entities', () => {
      const result = sanitizeText('<script>alert("xss")</script>');
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should escape special characters', () => {
      expect(sanitizeText('&')).toBe('&amp;');
      expect(sanitizeText('<')).toBe('&lt;');
      expect(sanitizeText('>')).toBe('&gt;');
      expect(sanitizeText('"')).toBe('&quot;');
      expect(sanitizeText("'")).toBe('&#x27;');
    });
  });

  describe('validateUrl', () => {
    it('should accept valid HTTP URLs', () => {
      expect(validateUrl('http://example.com')).toBe(true);
      expect(validateUrl('https://example.com')).toBe(true);
    });

    it('should reject invalid protocols', () => {
      expect(validateUrl('javascript:alert(1)')).toBe(false);
      expect(validateUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    });

    it('should reject malformed URLs', () => {
      expect(validateUrl('not a url')).toBe(false);
    });
  });

  describe('sanitizeNumerologyInput', () => {
    it('should remove HTML tags', () => {
      const result = sanitizeNumerologyInput('<script>alert()</script>Ahmet');
      expect(result).not.toContain('<script>');
      expect(result).toContain('Ahmet');
    });

    it('should remove script injection attempts', () => {
      const result = sanitizeNumerologyInput('javascript:alert()');
      expect(result).toBe('alert');
    });

    it('should allow valid characters', () => {
      expect(sanitizeNumerologyInput('Ahmet-Ali 123')).toBe('Ahmet-Ali 123');
    });

    it('should limit length to 100 characters', () => {
      const longInput = 'a'.repeat(150);
      const result = sanitizeNumerologyInput(longInput);
      expect(result.length).toBe(100);
    });
  });

  describe('validateDateInput', () => {
    it('should accept valid dates', () => {
      expect(validateDateInput('1990-01-01')).toBe(true);
      expect(validateDateInput('2025-12-31')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(validateDateInput('01/01/1990')).toBe(false);
      expect(validateDateInput('1990-13-01')).toBe(false);
    });

    it('should reject dates before 1900', () => {
      expect(validateDateInput('1899-12-31')).toBe(false);
    });

    it('should reject far future dates', () => {
      expect(validateDateInput('2200-01-01')).toBe(false);
    });
  });

  describe('validateNameInput', () => {
    it('should accept valid names', () => {
      expect(validateNameInput('Ahmet')).toBe(true);
      expect(validateNameInput('Ayşe Fatma')).toBe(true);
    });

    it('should reject names that are too short', () => {
      expect(validateNameInput('A')).toBe(false);
    });

    it('should reject names that are too long', () => {
      expect(validateNameInput('a'.repeat(51))).toBe(false);
    });

    it('should reject names with invalid characters', () => {
      expect(validateNameInput('Ahmet123')).toBe(false);
      expect(validateNameInput('Ahmet@')).toBe(false);
    });

    it('should reject multiple consecutive spaces', () => {
      expect(validateNameInput('Ahmet  Ali')).toBe(false);
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', () => {
      const result = checkRateLimit('test-user', 5, 60000);
      expect(result).toBe(true);
    });

    it('should block requests exceeding limit', () => {
      const userId = 'test-limit-' + Date.now();
      for (let i = 0; i < 5; i++) {
        checkRateLimit(userId, 5, 60000);
      }
      const result = checkRateLimit(userId, 5, 60000);
      expect(result).toBe(false);
    });
  });

  describe('validateWebhookSignature', () => {
    it('should validate correct signatures', async () => {
      const payload = 'test payload';
      const secret = 'test-secret';

      // Create expected signature
      const crypto = await import('crypto');
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(payload);
      const expectedSignature = hmac.digest('hex');

      const result = await validateWebhookSignature(payload, expectedSignature, secret);
      expect(result).toBe(true);
    });

    it('should reject incorrect signatures', async () => {
      const result = await validateWebhookSignature('payload', 'wrong-signature', 'secret');
      expect(result).toBe(false);
    });

    it('should reject empty inputs', async () => {
      expect(await validateWebhookSignature('', 'sig', 'secret')).toBe(false);
      expect(await validateWebhookSignature('payload', '', 'secret')).toBe(false);
      expect(await validateWebhookSignature('payload', 'sig', '')).toBe(false);
    });
  });

  describe('generateCsrfToken', () => {
    it('should generate a token', () => {
      const token = generateCsrfToken();
      expect(token).toBeDefined();
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate unique tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('validateCsrfToken', () => {
    it('should validate matching tokens', () => {
      const token = generateCsrfToken();
      expect(validateCsrfToken(token, token)).toBe(true);
    });

    it('should reject non-matching tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(validateCsrfToken(token1, token2)).toBe(false);
    });

    it('should reject empty tokens', () => {
      expect(validateCsrfToken('', 'token')).toBe(false);
      expect(validateCsrfToken('token', '')).toBe(false);
    });
  });

  describe('detectSqlInjection', () => {
    it('should detect SQL injection patterns', () => {
      expect(detectSqlInjection("' OR 1=1--")).toBe(true);
      expect(detectSqlInjection("UNION SELECT * FROM users")).toBe(true);
      expect(detectSqlInjection("DROP TABLE users")).toBe(true);
      expect(detectSqlInjection("'; DELETE FROM users--")).toBe(true);
    });

    it('should allow safe input', () => {
      expect(detectSqlInjection('Ahmet')).toBe(false);
      expect(detectSqlInjection('test@example.com')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('not-an-email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test @example.com')).toBe(false);
    });

    it('should reject emails exceeding length limits', () => {
      const longEmail = 'a'.repeat(255) + '@example.com';
      expect(validateEmail(longEmail)).toBe(false);
    });
  });

  describe('calculatePasswordStrength', () => {
    it('should score strong passwords highly', () => {
      const result = calculatePasswordStrength('Str0ng!Pass@2025');
      expect(result.score).toBeGreaterThan(80);
      expect(result.feedback.length).toBe(0);
    });

    it('should score weak passwords lowly', () => {
      const result = calculatePasswordStrength('weak');
      expect(result.score).toBeLessThan(50);
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('should provide feedback for weak passwords', () => {
      const result = calculatePasswordStrength('short');
      expect(result.feedback).toContain('En az 8 karakter olmalı');
    });

    it('should detect missing character types', () => {
      const result = calculatePasswordStrength('alllowercase');
      expect(result.feedback).toContain('Büyük harf içermeli');
      expect(result.feedback).toContain('Rakam içermeli');
      expect(result.feedback).toContain('Özel karakter içermeli (!@#$%^&*)');
    });
  });

  describe('generateSecureRandomString', () => {
    it('should generate strings of specified length', () => {
      expect(generateSecureRandomString(16).length).toBe(16);
      expect(generateSecureRandomString(32).length).toBe(32);
    });

    it('should generate unique strings', () => {
      const str1 = generateSecureRandomString(32);
      const str2 = generateSecureRandomString(32);
      expect(str1).not.toBe(str2);
    });

    it('should only contain alphanumeric characters', () => {
      const str = generateSecureRandomString(100);
      expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
    });
  });
});
