/*
 * Auth Service Class
 * 
 * Bu dosya authentication işlemleri için business logic'i içerir.
 * Supabase auth operasyonlarını merkezi olarak yönetir.
 */

import { supabase } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
import type { RegisterFormData } from './auth-validation';

// AuthError class tanımı
export class AuthError extends Error {
  constructor(message: string, public originalError?: any, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Rate limit error class - DEVRE DIŞI
// export class RateLimitError extends AuthError {
//   constructor(message: string, public retryAfter?: number) {
//     super(message);
//     this.name = 'RateLimitError';
//     this.code = 'RATE_LIMIT_EXCEEDED';
//   }
// }

export class AuthService {
  /**
   * Rate limit kontrolü ve yönetimi - DEVRE DIŞI
   */
  // private static isRateLimitError(error: any): boolean {
  //   return error.message?.includes('rate limit') || 
  //          error.message?.includes('rate limit exceeded') ||
  //          error.message?.includes('too many requests') ||
  //          error.status === 429 ||
  //          error.statusCode === 429;
  // }

  // /**
  //  * Rate limit hatası için kullanıcı dostu mesaj
  //  */
  // private static getRateLimitMessage(): string {
  //   return 'Çok fazla kayıt denemesi yapıldı. Lütfen 5-10 dakika bekleyip tekrar deneyin veya farklı bir email adresi kullanın.';
  // }

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
      
      // Giriş başarılıysa profile kontrolü yap
      if (data.user) {
        try {
          const { ensureProfileExists } = await import('@/lib/utils/profile-utils');
          
          const profileResult = await ensureProfileExists(data.user);
          
          if (!profileResult.success) {
            console.warn('Profile kontrolü başarısız:', profileResult.error);
            // Profile sorunu giriş işlemini etkilemez
          }
        } catch (profileError) {
          console.warn('Profile kontrol hatası:', profileError);
          // Profile hatası giriş işlemini etkilemez
        }
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
      console.log('Kullanıcı kaydı başlatılıyor:', { email: userData.email });
      
      // Supabase auth signup işlemi
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
          // Email confirmation için callback URL'i ayarla
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('SignUp error:', error);
        
        // Rate limit hatası kontrolü - DEVRE DIŞI
        // if (this.isRateLimitError(error)) {
        //   throw new RateLimitError(
        //     this.getRateLimitMessage(),
        //     300 // 5 dakika
        //   );
        // }
        
        // Diğer hatalar için normal işlem
        throw new AuthError(error.message, error, error.status?.toString());
      }
      
      console.log('Auth signup başarılı:', { userId: data.user?.id });
      
      // Kullanıcı başarıyla oluşturulduysa profile oluştur
      if (data.user) {
        try {
          console.log('Profile oluşturma başlatılıyor...');
          const { createOrUpdateProfile } = await import('@/lib/utils/profile-utils');
          
          const profileResult = await createOrUpdateProfile({
            userId: data.user.id,
            firstName: userData.name,
            lastName: userData.surname,
            email: userData.email,
            birthDate: userData.birthDate,
            gender: userData.gender,
          });
          
          if (!profileResult.success) {
            console.error('Profile oluşturulamadı:', profileResult.error);
            // Profile oluşturulamasa bile auth işlemi başarılı sayılır
          } else {
            console.log('Profile başarıyla oluşturuldu:', profileResult.profile?.id);
          }
        } catch (profileError) {
          console.error('Profile oluşturma hatası:', profileError);
          // Profile hatası auth işlemini etkilemez
        }
      }
      
      return data;
    } catch (error) {
      console.error('SignUp genel hatası:', error);
      
      // Hata tipine göre işlem
      if (error instanceof AuthError) {
        throw error;
      }
      
      throw new AuthError(
        error instanceof Error ? error.message : 'Bilinmeyen hata oluştu',
        error
      );
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
      console.log('AuthService.resendConfirmation called with email:', email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      console.log('Supabase resend response:', { error });
      
      if (error) {
        console.error('Resend error:', error);
        throw new AuthError(error.message, error);
      }
      
      console.log('Resend confirmation successful');
      return true;
    } catch (error) {
      console.error('Resend confirmation catch block:', error);
      throw error;
    }
  }
}
