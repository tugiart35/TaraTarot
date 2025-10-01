/*
 * Email API Error Response Standardization
 *
 * Bu dosya email API endpoint'leri için standart error response'ları sağlar.
 * Production'da güvenlik için detaylı error mesajlarını gizler.
 */

import { NextResponse } from 'next/server';


export class ErrorResponse {
  private static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  private static sanitizeError(error: Error): string {
    if (this.isProduction()) {
      return 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    }
    return error.message;
  }

  static emailValidationError(
    message: string = 'Geçersiz email adresi'
  ): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'VALIDATION_ERROR',
        message: this.isProduction() ? 'Geçersiz email adresi' : message,
      },
      { status: 400 }
    );
  }

  static smtpConnectionError(
    message: string = 'SMTP bağlantı hatası'
  ): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'SMTP_CONNECTION_ERROR',
        message: this.isProduction()
          ? 'Email servisi şu anda kullanılamıyor'
          : message,
      },
      { status: 500 }
    );
  }

  static internalServerError(details?: string): NextResponse {
    const sanitizedMessage = details
      ? this.sanitizeError(new Error(details))
      : 'Sunucu hatası';

    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: this.isProduction()
          ? 'Sunucu hatası oluştu'
          : sanitizedMessage,
      },
      { status: 500 }
    );
  }

  static missingFieldsError(fields: string[]): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'MISSING_FIELDS',
        message: this.isProduction()
          ? 'Gerekli alanlar eksik'
          : `Eksik alanlar: ${fields.join(', ')}`,
      },
      { status: 400 }
    );
  }

  static rateLimitExceeded(limit: number, window: number): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: `Çok fazla istek. ${limit} istek/${window} saniye limiti aşıldı.`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': window.toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  static notFoundError(resource: string = 'Kaynak'): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'NOT_FOUND',
        message: this.isProduction()
          ? 'Kaynak bulunamadı'
          : `${resource} bulunamadı`,
      },
      { status: 404 }
    );
  }

  static unauthorizedError(message: string = 'Yetkisiz erişim'): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
        message: this.isProduction() ? 'Bu işlem için yetkiniz yok' : message,
      },
      { status: 401 }
    );
  }

  static forbiddenError(message: string = 'Erişim engellendi'): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: 'FORBIDDEN',
        message: this.isProduction() ? 'Bu işlem için yetkiniz yok' : message,
      },
      { status: 403 }
    );
  }
}
