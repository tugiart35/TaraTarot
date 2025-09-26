/*
 * Auth Service Class
 * 
 * Bu dosya authentication işlemleri için business logic'i içerir.
 * Supabase auth operasyonlarını merkezi olarak yönetir.
 */

import { supabase } from '@/lib/supabase/client';
import { AuthError, Session } from '@supabase/supabase-js';
import type { LoginFormData, RegisterFormData, PasswordResetFormData } from './auth-validation';

export class AuthService {
  /**
   * Email ve şifre ile giriş yapma
   */
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Yeni kullanıcı kaydı
   */
  static async signUp(userData: RegisterFormData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.name,
            last_name: userData.surname,
            birth_date: userData.birthDate,
            gender: userData.gender,
          },
        },
      });
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Şifre sıfırlama e-postası gönderme
   */
  static async resetPassword(email: string, locale: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Google ile OAuth girişi
   */
  static async signInWithGoogle(locale: string) {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?locale=${locale}`,
        },
      });
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Çıkış yapma
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mevcut kullanıcı session'ını alma
   */
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Auth state değişikliklerini dinleme
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Session'ı yenileme
   */
  static async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * E-posta onaylama
   */
  static async resendConfirmation(email: string) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        throw new AuthError(error.message, error);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
}

// Auth error class for better error handling
export class AuthError extends Error {
  public readonly originalError: any;
  public readonly timestamp: string;

  constructor(message: string, originalError?: any) {
    super(message);
    this.name = 'AuthError';
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
}
