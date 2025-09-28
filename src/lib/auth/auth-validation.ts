/*
 * Auth Validation Schemas
 *
 * Bu dosya auth form'ları için Zod validation şemalarını içerir.
 * Type-safe form validation sağlar.
 */

import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  rememberMe: z.boolean().optional(),
});

// Register form validation schema
export const registerSchema = z
  .object({
    email: z.string().email('Geçerli bir e-posta adresi girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
    surname: z.string().min(2, 'Soyad en az 2 karakter olmalı'),
    birthDate: z.string().refine(date => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 13 && age <= 120;
    }, 'En az 13 yaşında olmalısınız'),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

// Password strength validation
export const validatePasswordStrength = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalı');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermeli');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermeli');
  }

  if (!/\d/.test(password)) {
    errors.push('Şifre en az bir rakam içermeli');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Şifre en az bir özel karakter içermeli');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Email validation helper
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Age validation helper
export const validateAge = (
  birthDate: string
): {
  isValid: boolean;
  age: number;
  error?: string;
} => {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDateObj.getFullYear();

  if (age < 13) {
    return { isValid: false, age, error: 'En az 13 yaşında olmalısınız' };
  }

  if (age > 120) {
    return { isValid: false, age, error: 'Geçerli bir yaş girin' };
  }

  return { isValid: true, age };
};
