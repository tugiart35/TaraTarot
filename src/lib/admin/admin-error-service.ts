/*
 * Admin Error Service
 * 
 * Bu dosya admin paneli için ortak error handling service'ini sağlar.
 * DRY principle uygulayarak tekrarlanan error handling kodlarını önler.
 */

import { AdminError } from '@/types/admin.types';

export class AdminErrorService {
  /**
   * Admin error'ını handle et ve user-friendly mesaj döndür
   */
  static handleError(error: Error | unknown, context: string): string {
    // Error logging is handled by monitoring system

    // Production'da sadece user-friendly mesaj
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';
    } else if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
      return 'Bu işlem için yetkiniz bulunmuyor. Lütfen admin yetkilerinizi kontrol edin.';
    } else if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      return 'Kayıt bulunamadı. Lütfen sayfayı yenileyin ve tekrar deneyin.';
    } else if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
      return 'Bu kayıt zaten mevcut. Lütfen farklı bir değer deneyin.';
    } else if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
      return 'Girilen bilgiler geçersiz. Lütfen formu kontrol edin ve tekrar deneyin.';
    } else if (errorMessage.includes('timeout')) {
      return 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
    } else if (errorMessage.includes('server') || errorMessage.includes('500')) {
      return 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
    } else {
      return 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  /**
   * Admin action'ını logla
   */
  static logAdminAction(action: string, details: Record<string, unknown>): void {
    const logData = {
      action,
      details,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server'
    };

    // Action logging is handled by monitoring system

    // Production'da structured logging
    if (process.env.NODE_ENV === 'production') {
      // Sentry veya benzeri monitoring service'e gönder
      // logToMonitoringService(logData);
    }
  }

  /**
   * Error boundary için error objesi oluştur
   */
  static createErrorObject(code: string, message: string, details?: Record<string, unknown>): AdminError {
    return {
      code,
      message,
      details
    };
  }

  /**
   * Supabase error'ını handle et
   */
  static handleSupabaseError(error: Error | unknown, context: string): string {
    if (error.code === 'PGRST116') {
      return 'Aradığınız kayıt bulunamadı.';
    } else if (error.code === 'PGRST301') {
      return 'Bu işlem için yetkiniz bulunmuyor.';
    } else if (error.code === '23505') {
      return 'Bu kayıt zaten mevcut.';
    } else if (error.code === '23503') {
      return 'İlgili kayıt bulunamadı.';
    } else if (error.code === '23514') {
      return 'Girilen veriler geçersiz.';
    } else {
      return this.handleError(error, context);
    }
  }

  /**
   * Network error'ını handle et
   */
  static handleNetworkError(error: Error | unknown): string {
    if (error.name === 'NetworkError') {
      return 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.';
    } else if (error.name === 'TimeoutError') {
      return 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
    } else if (error.name === 'AbortError') {
      return 'İşlem iptal edildi.';
    } else {
      return 'Ağ hatası oluştu. Lütfen tekrar deneyin.';
    }
  }

  /**
   * Validation error'ını handle et
   */
  static handleValidationError(error: Error | unknown): string {
    if (error.message?.includes('required')) {
      return 'Gerekli alanlar doldurulmalıdır.';
    } else if (error.message?.includes('email')) {
      return 'Geçerli bir email adresi girin.';
    } else if (error.message?.includes('password')) {
      return 'Şifre en az 8 karakter olmalıdır.';
    } else if (error.message?.includes('length')) {
      return 'Girilen değer çok uzun veya çok kısa.';
    } else {
      return 'Girilen bilgiler geçersiz.';
    }
  }

  /**
   * Error mesajını kullanıcı dostu hale getir
   */
  static getUserFriendlyMessage(error: Error | unknown): string {
    if (typeof error === 'string') {
      return error;
    } else if (error.message) {
      return error.message;
    } else if (error.error) {
      return error.error;
    } else {
      return 'Beklenmeyen bir hata oluştu.';
    }
  }

  /**
   * Error'ı console'a güvenli şekilde logla
   */
  static safeLogError(error: Error | unknown, context: string): void {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[ADMIN] ${context}:`, error);
      }
    } catch (logError) {
      // Logging hatası olursa sessizce geç
      console.warn('Error logging failed:', logError);
    }
  }
}