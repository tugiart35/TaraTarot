/*
 * Auth Validation Tests
 *
 * Bu dosya auth validation schemas için unit testleri içerir.
 * Jest kullanır.
 */

import {
  loginSchema,
  registerSchema,
  passwordResetSchema,
  validatePasswordStrength,
  validateEmail,
  validateAge,
} from '../auth-validation';

describe('Auth Validation', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Geçerli bir e-posta adresi girin'
        );
      }
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Şifre en az 6 karakter olmalı'
        );
      }
    });
  });

  describe('registerSchema', () => {
    it('should validate correct register data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male' as const,
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
        name: 'John',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male' as const,
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Şifreler eşleşmiyor');
      }
    });

    it('should reject short name', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'J',
        surname: 'Doe',
        birthDate: '1990-01-01',
        gender: 'male' as const,
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Ad en az 2 karakter olmalı'
        );
      }
    });

    it('should reject underage user', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'John',
        surname: 'Doe',
        birthDate: '2020-01-01', // Too young
        gender: 'male' as const,
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'En az 13 yaşında olmalısınız'
        );
      }
    });
  });

  describe('passwordResetSchema', () => {
    it('should validate correct email', () => {
      const validData = {
        email: 'test@example.com',
      };

      const result = passwordResetSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
      };

      const result = passwordResetSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate strong password', () => {
      const result = validatePasswordStrength('Password123!');

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password without uppercase', () => {
      const result = validatePasswordStrength('password123!');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Şifre en az bir büyük harf içermeli');
    });

    it('should reject password without lowercase', () => {
      const result = validatePasswordStrength('PASSWORD123!');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Şifre en az bir küçük harf içermeli');
    });

    it('should reject password without numbers', () => {
      const result = validatePasswordStrength('Password!');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Şifre en az bir rakam içermeli');
    });

    it('should reject password without special characters', () => {
      const result = validatePasswordStrength('Password123');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Şifre en az bir özel karakter içermeli');
    });

    it('should reject short password', () => {
      const result = validatePasswordStrength('Pass1!');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Şifre en az 8 karakter olmalı');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('user123@domain.org')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test.domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateAge', () => {
    it('should validate correct age', () => {
      const birthDate = '1990-01-01';
      const result = validateAge(birthDate);

      expect(result.isValid).toBe(true);
      expect(result.age).toBeGreaterThan(13);
    });

    it('should reject underage user', () => {
      const birthDate = '2020-01-01';
      const result = validateAge(birthDate);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('En az 13 yaşında olmalısınız');
    });

    it('should reject unrealistic age', () => {
      const birthDate = '1800-01-01';
      const result = validateAge(birthDate);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Geçerli bir yaş girin');
    });
  });
});
