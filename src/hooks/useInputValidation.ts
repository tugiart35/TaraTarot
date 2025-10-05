'use client';

import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface UseInputValidationReturn {
  validate: (value: string, rules: ValidationRule) => ValidationResult;
  validateEmail: (email: string) => ValidationResult;
  validatePassword: (password: string) => ValidationResult;
  validateCreditAmount: (amount: number) => ValidationResult;
  sanitizeInput: (input: string) => string;
}

/**
 * Custom hook for input validation and sanitization
 * Provides common validation patterns and security measures
 */
export function useInputValidation(): UseInputValidationReturn {
  const [validationCache, setValidationCache] = useState<
    Map<string, ValidationResult>
  >(new Map());

  // Sanitize input to prevent XSS attacks
  const sanitizeInput = useCallback((input: string): string => {
    return input.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    );
  }, []);

  // Validate email format
  const validateEmail = useCallback(
    (email: string): ValidationResult => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const sanitizedEmail = sanitizeInput(email);

      const errors: string[] = [];

      if (!sanitizedEmail) {
        errors.push('Email is required');
      } else if (!emailRegex.test(sanitizedEmail)) {
        errors.push('Invalid email format');
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    [sanitizeInput]
  );

  // Validate password strength
  const validatePassword = useCallback((password: string): ValidationResult => {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  // Validate credit amount
  const validateCreditAmount = useCallback(
    (amount: number): ValidationResult => {
      const errors: string[] = [];

      if (amount <= 0) {
        errors.push('Amount must be greater than 0');
      }
      if (amount > 10000) {
        errors.push('Amount cannot exceed 10,000 credits');
      }
      if (!Number.isInteger(amount)) {
        errors.push('Amount must be a whole number');
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    []
  );

  // Generic validation function
  const validate = useCallback(
    (value: string, rules: ValidationRule): ValidationResult => {
      const cacheKey = `${value}-${JSON.stringify(rules)}`;

      // Check cache first
      if (validationCache.has(cacheKey)) {
        return validationCache.get(cacheKey)!;
      }

      const sanitizedValue = sanitizeInput(value);
      const errors: string[] = [];

      // Required validation
      if (rules.required && !sanitizedValue) {
        errors.push('This field is required');
      }

      // Length validations
      if (
        sanitizedValue &&
        rules.minLength &&
        sanitizedValue.length < rules.minLength
      ) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
      }

      if (
        sanitizedValue &&
        rules.maxLength &&
        sanitizedValue.length > rules.maxLength
      ) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
      }

      // Pattern validation
      if (
        sanitizedValue &&
        rules.pattern &&
        !rules.pattern.test(sanitizedValue)
      ) {
        errors.push('Invalid format');
      }

      // Custom validation
      if (sanitizedValue && rules.custom) {
        const customError = rules.custom(sanitizedValue);
        if (customError) {
          errors.push(customError);
        }
      }

      const result: ValidationResult = {
        isValid: errors.length === 0,
        errors,
      };

      // Cache the result
      setValidationCache(prev => new Map(prev).set(cacheKey, result));

      return result;
    },
    [sanitizeInput, validationCache]
  );

  return {
    validate,
    validateEmail,
    validatePassword,
    validateCreditAmount,
    sanitizeInput,
  };
}
