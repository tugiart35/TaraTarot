/*
 * Auth Error Handling Service
 * 
 * Bu dosya auth error handling işlemleri için ortak service fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan error handling kodlarını önler.
 */

import { NextRequest, NextResponse } from 'next/server';
import { RedirectUtils } from '@/lib/utils/redirect-utils';

export class AuthErrorService {
  /**
   * Callback error'ını handle et
   */
  static handleCallbackError(error: any, locale: string): NextResponse {
    console.error('Auth callback error:', error);
    
    // Error type'a göre farklı redirect'ler
    if (error.message?.includes('expired')) {
      return this.createErrorRedirect(locale, 'token_expired');
    } else if (error.message?.includes('invalid')) {
      return this.createErrorRedirect(locale, 'invalid_token');
    } else if (error.message?.includes('network')) {
      return this.createErrorRedirect(locale, 'network_error');
    } else {
      return this.createErrorRedirect(locale, 'callback_failed');
    }
  }
  
  /**
   * Email confirmation error'ını handle et
   */
  static handleConfirmationError(error: any, locale: string): NextResponse {
    console.error('Email confirmation error:', error);
    
    if (error.message?.includes('expired')) {
      return this.createErrorRedirect(locale, 'token_expired');
    } else if (error.message?.includes('invalid')) {
      return this.createErrorRedirect(locale, 'invalid_token');
    } else {
      return this.createErrorRedirect(locale, 'confirmation_failed');
    }
  }
  
  /**
   * Auth error redirect oluştur
   */
  private static createErrorRedirect(locale: string, error: string): NextResponse {
    return NextResponse.redirect(`/${locale}/auth?error=${error}`);
  }
  
  /**
   * Error mesajını kullanıcı dostu hale getir
   */
  static getUserFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'token_expired':
        return 'Token süresi dolmuş. Lütfen tekrar deneyin.';
      case 'invalid_token':
        return 'Geçersiz token. Lütfen tekrar deneyin.';
      case 'network_error':
        return 'Ağ hatası. Lütfen internet bağlantınızı kontrol edin.';
      case 'callback_failed':
        return 'Giriş işlemi başarısız. Lütfen tekrar deneyin.';
      case 'confirmation_failed':
        return 'E-posta onayı başarısız. Lütfen tekrar deneyin.';
      default:
        return 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }
}
