/*
 * useValidation Hook - Ortak Validation Logic'i
 * 
 * Bu hook tüm form validation işlemleri için ortak logic sağlar.
 * DRY principle uygulayarak tekrarlanan validation kodlarını önler.
 */

import { useState, useCallback, useMemo } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface ValidationState {
  errors: ValidationErrors;
  isValid: boolean;
  isDirty: boolean;
}

export function useValidation<T extends Record<string, any>>(
  initialData: T,
  rules: Record<keyof T, ValidationRule>
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  // Validation logic
  const validateField = useCallback((field: keyof T, value: any): string | null => {
    const rule = rules[field];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      return `${String(field)} is required`;
    }

    // Skip other validations if value is empty and not required
    if (!value || value.toString().trim() === '') return null;

    // Min length validation
    if (rule.minLength && value.toString().length < rule.minLength) {
      return `${String(field)} must be at least ${rule.minLength} characters`;
    }

    // Max length validation
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      return `${String(field)} must be at most ${rule.maxLength} characters`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return `${String(field)} format is invalid`;
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  // Validate all fields
  const validateAll = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    for (const field in rules) {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
      }
    }
    
    setErrors(newErrors);
    return newErrors;
  }, [data, validateField, rules]);

  // Update field value
  const updateField = useCallback((field: keyof T, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  // Update multiple fields
  const updateFields = useCallback((updates: Partial<T>) => {
    setData(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setData(initialData);
    setErrors({});
    setIsDirty(false);
  }, [initialData]);

  // Clear errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Check if form is valid
  const isValid = useMemo(() => {
    return Object.keys(validateAll()).length === 0;
  }, [validateAll]);

  // Get field error
  const getFieldError = useCallback((field: keyof T): string | null => {
    return errors[field as string] || null;
  }, [errors]);

  // Check if field has error
  const hasFieldError = useCallback((field: keyof T): boolean => {
    return !!errors[field as string];
  }, [errors]);

  return {
    data,
    errors,
    isDirty,
    isValid,
    updateField,
    updateFields,
    resetForm,
    clearErrors,
    validateField,
    validateAll,
    getFieldError,
    hasFieldError
  };
}

// Common validation rules
export const ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Geçerli bir email adresi girin';
      }
      return null;
    }
  },

  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (!value) return null;
      if (value.length < 8) {
        return 'Şifre en az 8 karakter olmalı';
      }
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Şifre en az bir küçük harf içermeli';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Şifre en az bir büyük harf içermeli';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Şifre en az bir rakam içermeli';
      }
      return null;
    }
  },

  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value: string) => {
      if (!value) return null;
      if (value.length < 2) {
        return 'İsim en az 2 karakter olmalı';
      }
      if (value.length > 50) {
        return 'İsim en fazla 50 karakter olabilir';
      }
      if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) {
        return 'İsim sadece harf içerebilir';
      }
      return null;
    }
  },

  phone: {
    required: false,
    pattern: /^(\+90|0)?[5][0-9]{9}$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^(\+90|0)?[5][0-9]{9}$/.test(value)) {
        return 'Geçerli bir telefon numarası girin';
      }
      return null;
    }
  },

  birthDate: {
    required: false,
    custom: (value: string) => {
      if (!value) return null;
      const date = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      
      if (isNaN(date.getTime())) {
        return 'Geçerli bir tarih girin';
      }
      if (age < 13) {
        return 'En az 13 yaşında olmalısınız';
      }
      if (age > 120) {
        return 'Geçerli bir yaş girin';
      }
      return null;
    }
  },

  question: {
    required: true,
    minLength: 10,
    maxLength: 500,
    custom: (value: string) => {
      if (!value) return null;
      if (value.length < 10) {
        return 'Soru en az 10 karakter olmalı';
      }
      if (value.length > 500) {
        return 'Soru en fazla 500 karakter olabilir';
      }
      return null;
    }
  }
};

// Export utility functions
export const ValidationUtils = {
  isEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isPhone: (phone: string): boolean => {
    return /^(\+90|0)?[5][0-9]{9}$/.test(phone);
  },

  isStrongPassword: (password: string): boolean => {
    return password.length >= 8 && 
           /(?=.*[a-z])/.test(password) && 
           /(?=.*[A-Z])/.test(password) && 
           /(?=.*\d)/.test(password);
  },

  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  }
};
