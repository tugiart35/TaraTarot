/*
 * DOSYA ANALİZİ - TEST EMAIL API ENDPOINT (PRODUCTION-READY)
 *
 * BAĞLANTILI DOSYALAR:
 * - src/lib/email/email-service.ts (email gönderme servisi)
 * - .env (SMTP konfigürasyonu)
 *
 * DOSYA AMACI:
 * SMTP ayarlarını test etmek için email gönderme endpoint'i
 * Geliştirme ve production ortamında email servisini doğrulama
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (sadece email test)
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Rate limiting
 * - Input validation
 * - Error handling
 * - CORS headers
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: SMTP ayarlarını test etmek için
 * - GÜVENLİ: Production-ready with security
 * - TEST: Geliştirme aşamasında kullanım
 */

import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/email-service';
import { ErrorResponse } from '@/lib/api/error-responses';
import { EmailCORS } from '@/lib/api/email-cors';
import { getClientIP } from '@/lib/utils/ip-utils';

// Rate limiting için basit in-memory store
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Dakikada 3 test email
const RATE_WINDOW = 60 * 1000; // 1 dakika

// Rate limiting kontrolü
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `test-email:${ip}`;
  const entry = requestCounts.get(key);

  if (!entry || now > entry.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// getClientIP artık ip-utils'den import ediliyor

// POST endpoint - Test email gönderme
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      return EmailCORS.wrapResponse(
        ErrorResponse.rateLimitExceeded(RATE_LIMIT, 60)
      );
    }

    const body = await request.json();

    // Input validation
    if (!body.email || !body.email.includes('@')) {
      return EmailCORS.wrapResponse(
        ErrorResponse.emailValidationError()
      );
    }

    // Test email içeriği
    const testEmailData = {
      to: body.email,
      subject: '🔮 Busbuskimki Tarot - SMTP Test Email',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { background: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔮 SMTP Test Başarılı!</h1>
            <p>Busbuskimki Tarot Sistemi</p>
          </div>
          
          <div class="content">
            <div class="success">
              <h2>✅ Email Servisi Çalışıyor</h2>
              <p>SMTP ayarlarınız doğru şekilde yapılandırılmış ve email servisi aktif.</p>
            </div>
            
            <h3>Test Detayları:</h3>
            <ul>
              <li><strong>Test Zamanı:</strong> ${new Date().toLocaleString('tr-TR')}</li>
              <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST || 'smtp.gmail.com'}</li>
              <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT || '587'}</li>
              <li><strong>Gönderen:</strong> ${process.env.SMTP_USER || 'busbuskimkionline@gmail.com'}</li>
            </ul>
            
            <p>Bu test email'i başarıyla alındıysa, tarot okuma PDF'leri de sorunsuz gönderilecektir.</p>
          </div>
          
          <div class="footer">
            <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
            <p>Bu email otomatik test sistemi tarafından gönderilmiştir.</p>
          </div>
        </body>
        </html>
      `,
    };

    // Email gönder
    const success = await emailService.sendEmail(testEmailData);

    if (success) {
      return EmailCORS.wrapResponse(
        NextResponse.json({
          success: true,
          message: 'Test email başarıyla gönderildi!',
          timestamp: new Date().toISOString(),
          recipient: body.email,
        })
      );
    } else {
      return EmailCORS.wrapResponse(
        ErrorResponse.smtpConnectionError('Email gönderilemedi. SMTP ayarlarını kontrol edin.')
      );
    }
  } catch (error) {
    console.error('Test email API error:', error);
    return EmailCORS.wrapResponse(
      ErrorResponse.internalServerError()
    );
  }
}

// GET endpoint - SMTP durumu kontrolü
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      return EmailCORS.wrapResponse(
        ErrorResponse.rateLimitExceeded(RATE_LIMIT, 60)
      );
    }

    // SMTP ayarlarını kontrol et (şifre hariç)
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || '587',
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      hasPassword: !!process.env.SMTP_PASS,
    };

    return EmailCORS.wrapResponse(
      NextResponse.json({
        success: true,
        smtp: smtpConfig,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error('SMTP status API error:', error);
    return EmailCORS.wrapResponse(
      ErrorResponse.internalServerError()
    );
  }
}

// OPTIONS endpoint - CORS preflight
export async function OPTIONS(_request: NextRequest) {
  return EmailCORS.handlePreflightRequest();
}

export const runtime = 'nodejs';
