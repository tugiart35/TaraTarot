import { renderHook, act } from '@testing-library/react';
import { useInputValidation } from '../useInputValidation';

describe('useInputValidation', () => {
  it('should validate required fields', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const validation = result.current.validate('', { required: true });
    
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('This field is required');
  });

  it('should validate email format', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const validEmail = result.current.validateEmail('test@example.com');
    const invalidEmail = result.current.validateEmail('invalid-email');
    
    expect(validEmail.isValid).toBe(true);
    expect(invalidEmail.isValid).toBe(false);
    expect(invalidEmail.errors).toContain('Invalid email format');
  });

  it('should validate password strength', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const weakPassword = result.current.validatePassword('weak');
    const strongPassword = result.current.validatePassword('StrongPass123');
    
    expect(weakPassword.isValid).toBe(false);
    expect(weakPassword.errors).toContain('Password must be at least 8 characters');
    
    expect(strongPassword.isValid).toBe(true);
  });

  it('should validate credit amounts', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const validAmount = result.current.validateCreditAmount(100);
    const invalidAmount = result.current.validateCreditAmount(-10);
    const tooHighAmount = result.current.validateCreditAmount(15000);
    
    expect(validAmount.isValid).toBe(true);
    expect(invalidAmount.isValid).toBe(false);
    expect(invalidAmount.errors).toContain('Amount must be greater than 0');
    expect(tooHighAmount.isValid).toBe(false);
    expect(tooHighAmount.errors).toContain('Amount cannot exceed 10,000 credits');
  });

  it('should sanitize input to prevent XSS', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const maliciousInput = '<script>alert("xss")</script>Hello';
    const sanitized = result.current.sanitizeInput(maliciousInput);
    
    expect(sanitized).toBe('Hello');
    expect(sanitized).not.toContain('<script>');
  });

  it('should validate with custom rules', () => {
    const { result } = renderHook(() => useInputValidation());
    
    const validation = result.current.validate('test', {
      required: true,
      minLength: 5,
      custom: (value) => value.includes('custom') ? null : 'Must contain "custom"',
    });
    
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('Minimum length is 5 characters');
    expect(validation.errors).toContain('Must contain "custom"');
  });
});
