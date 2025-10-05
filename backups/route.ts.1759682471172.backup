/*
 * DOSYA ANALİZİ - SEND READING EMAIL API ENDPOINT
 *
 * BAĞLANTILI DOSYALAR:
 * - src/features/tarot/components/shared/utils/TarotReadingSaver.tsx (okuma kaydetme)
 * - src/lib/email/email-service.ts (email gönderme servisi)
 * - src/lib/pdf/pdf-generator.ts (PDF oluşturma servisi)
 *
 * DOSYA AMACI:
 * Server-side email gönderimi - Puppeteer ile PDF oluşturma
 * Client-side'dan gelen istekleri işler
 *
 * KULLANIM DURUMU:
 * - PRODUCTION: Gerçek okuma email gönderimi
 * - GÜVENLİ: Server-side PDF oluşturma
 */

import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/email-service';
import { pdfGeneratorService } from '@/lib/pdf/pdf-generator';
import { createClient } from '@supabase/supabase-js';
import { ErrorResponse } from '@/lib/api/error-responses';
import { EmailCORS } from '@/lib/api/email-cors';

// POST endpoint - Send reading email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { readingId } = body;

    console.log('🔮 Server-side email gönderimi başlatılıyor...', {
      readingId,
    });

    if (!readingId) {
      return EmailCORS.wrapResponse(
        ErrorResponse.missingFieldsError(['readingId'])
      );
    }

    // Server-side Supabase client oluştur (service role ile)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Supabase'den gerçek okuma verisini çek
    console.log("📊 Supabase'den okuma verisi çekiliyor...", { readingId });
    const { data: readingData, error: readingError } = await supabaseAdmin
      .from('readings')
      .select('*')
      .eq('id', readingId)
      .single();

    if (readingError || !readingData) {
      console.error('❌ Okuma verisi bulunamadı:', readingError);
      return EmailCORS.wrapResponse(
        ErrorResponse.notFoundError('Okuma verisi')
      );
    }

    console.log('✅ Okuma verisi bulundu:', {
      id: readingData.id,
      reading_type: readingData.reading_type,
      title: readingData.title,
    });

    // Kullanıcı email adresini al (admin client ile)
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(readingData.user_id);
    if (userError || !userData.user?.email) {
      console.error('❌ Kullanıcı email adresi alınamadı:', userError);
      return EmailCORS.wrapResponse(
        ErrorResponse.notFoundError('Kullanıcı email adresi')
      );
    }

    const userEmail = userData.user.email;
    console.log('📧 Email gönderilecek adres:', userEmail);

    // PDF oluştur - Gerçek veri formatını düzelt
    console.log('📄 PDF oluşturuluyor...', {
      readingId,
      readingType: readingData.reading_type,
      cardsCount: readingData.cards?.length || 0,
    });

    // Supabase'den gelen veriyi PDF formatına çevir
    const pdfData = {
      id: readingData.id,
      reading_type: readingData.reading_type,
      title: readingData.title || 'Tarot Açılımı',
      spread_name: readingData.spread_name || '',
      cards: readingData.cards || [],
      interpretation: readingData.interpretation || '',
      questions: readingData.questions || {},
      status: readingData.status || 'completed',
      created_at: readingData.created_at || new Date().toISOString(),
      cost_credits: readingData.cost_credits || 50,
      admin_notes: readingData.admin_notes || '',
    };

    const pdfBuffer = await pdfGeneratorService.generateReadingPDF(pdfData);
    console.log('✅ PDF oluşturuldu, boyut:', pdfBuffer.length, 'bytes');

    // Email gönder
    console.log('📧 Email gönderiliyor...', { userEmail, readingId });

    const fileName = `tarot-okuma-${readingId.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.pdf`;
    const success = await emailService.sendTarotReadingPDF(
      userEmail,
      pdfData,
      pdfBuffer,
      fileName
    );

    if (success) {
      console.log("✅ Okuma PDF'i başarıyla email ile gönderildi:", userEmail);
      return EmailCORS.wrapResponse(
        NextResponse.json({
          success: true,
          message: 'Email başarıyla gönderildi',
          timestamp: new Date().toISOString(),
          recipient: userEmail,
          fileName: fileName,
        })
      );
    } else {
      console.error('❌ Email gönderimi başarısız');
      return EmailCORS.wrapResponse(
        ErrorResponse.smtpConnectionError('Email gönderimi başarısız')
      );
    }
  } catch (error) {
    console.error('❌ Server-side email gönderimi hatası:', error);
    return EmailCORS.wrapResponse(
      ErrorResponse.internalServerError(
        error instanceof Error ? error.message : 'Bilinmeyen hata'
      )
    );
  }
}

// OPTIONS endpoint - CORS preflight
export async function OPTIONS(_request: NextRequest) {
  return EmailCORS.handlePreflightRequest();
}

export const runtime = 'nodejs';
