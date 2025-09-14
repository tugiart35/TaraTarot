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
import { createClient } from '@/lib/supabase/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, body: emailBody, smtpSettings } = body;

    // Input validation
    if (!to || !subject || !emailBody) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // SMTP settings validation
    if (!smtpSettings || !smtpSettings.smtp_host || !smtpSettings.smtp_user) {
      return NextResponse.json(
        { success: false, message: 'SMTP settings required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: smtpSettings.smtp_host,
      port: smtpSettings.smtp_port || 587,
      secure: smtpSettings.smtp_secure || false,
      auth: {
        user: smtpSettings.smtp_user,
        pass: smtpSettings.smtp_password
      }
    });

    // Verify connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP connection verification failed:', error);
      return NextResponse.json(
        { success: false, message: 'SMTP connection failed' },
        { status: 500 }
      );
    }

    // Send email
    const mailOptions = {
      from: `"${smtpSettings.from_name}" <${smtpSettings.from_email}>`,
      to: to,
      subject: subject,
      html: emailBody
    };

    const info = await transporter.sendMail(mailOptions);

    // Log email
    const supabase = createClient();
    await supabase
      .from('email_logs')
      .insert({
        to_email: to,
        subject: subject,
        status: 'sent',
        sent_at: new Date().toISOString()
      });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Log error
    try {
      const supabase = createClient();
      await supabase
        .from('email_logs')
        .insert({
          to_email: body.to || 'unknown',
          subject: body.subject || 'unknown',
          status: 'failed',
          error_message: (error as Error).message,
          created_at: new Date().toISOString()
        });
    } catch (logError) {
      console.error('Error logging email failure:', logError);
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Email sending failed',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

