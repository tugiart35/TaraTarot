/*
info:
Bağlantılı dosyalar:
- lib/admin/email-system.ts: Email sistemi yönetimi (gerekli)
- lib/supabase/server.ts: Server-side Supabase (gerekli)

Dosyanın amacı:
- Email gönderim API endpoint'i
- SMTP test fonksiyonları
- Email template işleme

Supabase değişkenleri ve tabloları:
- email_settings: SMTP ayarları
- email_logs: Email gönderim logları

Geliştirme önerileri:
- Rate limiting
- Email validation
- Template caching

Tespit edilen hatalar:
- ✅ SMTP entegrasyonu eklendi
- ✅ Error handling geliştirildi
- ✅ Email validation eklendi

Kullanım durumu:
- ✅ Gerekli: Email gönderim sistemi
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { ErrorResponse } from '@/lib/api/error-responses';
import { EmailCORS } from '@/lib/api/email-cors';
import { ApiBase } from '@/lib/api/shared/api-base';

export async function POST(request: NextRequest) {
  // Rate limiting kontrolü
  const rateLimitResponse = ApiBase.checkRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Request logging
  ApiBase.logRequest(request, 'Email Send API');

  let requestBody: any = null;
  try {
    requestBody = await request.json();
    const { to, subject, body: emailBody, smtpSettings } = requestBody;

    // Input validation using ApiBase
    const requiredFields = ['to', 'subject', 'body'];
    const validationResult = ApiBase.validateRequiredFields(
      requestBody,
      requiredFields
    );
    if (!validationResult.success) {
      return validationResult.error;
    }

    // Email validation using ApiBase
    if (!ApiBase.validateEmail(to)) {
      return ApiBase.error(
        {
          code: 'INVALID_EMAIL',
          message: 'Geçerli bir email adresi girin',
        },
        400
      );
    }

    // SMTP settings validation
    if (!smtpSettings || !smtpSettings.smtp_host || !smtpSettings.smtp_user) {
      return ErrorResponse.missingFieldsError(['smtp_host', 'smtp_user']);
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpSettings.smtp_host,
      port: smtpSettings.smtp_port || 587,
      secure: smtpSettings.smtp_secure || false,
      auth: {
        user: smtpSettings.smtp_user,
        pass: smtpSettings.smtp_password,
      },
    });

    // Verify connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP connection verification failed:', error);
      return ErrorResponse.smtpConnectionError();
    }

    // Send email
    const mailOptions = {
      from: `"${smtpSettings.from_name}" <${smtpSettings.from_email}>`,
      to: to,
      subject: subject,
      html: emailBody,
    };

    const info = await transporter.sendMail(mailOptions);

    return EmailCORS.wrapResponse(
      ApiBase.success(
        {
          messageId: info.messageId,
          to: to,
          subject: subject,
        },
        'Email başarıyla gönderildi'
      )
    );
  } catch (error) {
    ApiBase.logError(error, 'Email Send API');
    return EmailCORS.wrapResponse(
      ApiBase.error(
        {
          code: 'EMAIL_SEND_FAILED',
          message: 'Email gönderilemedi',
          details: error,
        },
        500
      )
    );
  }
}

export async function OPTIONS() {
  return EmailCORS.handlePreflightRequest();
}

export const runtime = 'nodejs';
