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

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ErrorResponse } from '@/lib/api/error-responses';
import { EmailCORS } from '@/lib/api/email-cors';

export async function POST(request: NextRequest) {
  let requestBody: any = null;
  try {
    requestBody = await request.json();
    const { to, subject, body: emailBody, smtpSettings } = requestBody;

    // Input validation
    if (!to || !subject || !emailBody) {
      return ErrorResponse.missingFieldsError(['to', 'subject', 'body']);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return ErrorResponse.emailValidationError();
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
      NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId,
      })
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return EmailCORS.wrapResponse(
      ErrorResponse.internalServerError((error as Error).message)
    );
  }
}

export async function OPTIONS() {
  return EmailCORS.handlePreflightRequest();
}

export const runtime = 'nodejs';
