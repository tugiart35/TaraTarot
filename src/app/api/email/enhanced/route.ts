/*
 * DOSYA ANALİZİ - ENHANCED EMAIL TEST ENDPOINT
 *
 * BAĞLANTILI DOSYALAR:
 * - src/lib/email/email-service.ts (email gönderme servisi)
 * - src/lib/pdf/pdf-generator.ts (PDF oluşturma servisi)
 *
 * DOSYA AMACI:
 * Enhanced email test - Kullanıcı bilgileri ve detaylı bilgilerle
 * Geliştirme ve test amaçlı kullanım
 *
 * KULLANIM DURUMU:
 * - TEST: Enhanced email oluşturma ve gönderimi
 * - GÜVENLİ: Production-ready with security
 */

import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/email-service';
import { pdfGeneratorService } from '@/lib/pdf/pdf-generator';
import { ErrorResponse } from '@/lib/api/error-responses';
import { EmailCORS } from '@/lib/api/email-cors';
// import { ApiBase } from '@/lib/api/shared/api-base';

// POST endpoint - Enhanced email test
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail } = body;

    // Test okuma verisi (Enhanced tarzında)
    const readingData = {
      id: 'enhanced-test-reading-123',
      reading_type: 'love',
      title: 'Aşk Açılımı - Detaylı Kişisel Okuma',
      spread_name: 'Aşk Yayılımı',
      cards: [
        {
          id: 51,
          name: 'Kılıçlar İkilisi',
          nameTr: 'Kılıçlar İkilisi',
          isReversed: false,
        },
        { id: 13, name: 'Ölüm', nameTr: 'Ölüm', isReversed: false },
        {
          id: 27,
          name: 'Kadehler Altılısı',
          nameTr: 'Kadehler Altılısı',
          isReversed: false,
        },
        { id: 5, name: 'Aziz', nameTr: 'Aziz', isReversed: true },
      ],
      interpretation: `❤️ **Aşk Açılımı**

**1. İlgi Duyduğun Kişi: Kılıçlar İkilisi** (Düz)
*Hakkında soru sorduğun kişi*
Bu kişi zor bir karar karşısında kararsız kalmış ve bir savunma mekanizması geliştirmiş. Gerçeklerle yüzleşmekten kaçınıyor ve duygularını bloke ediyor olabilir. Size karşı da gardını almış durumda.

**2. Fiziksel/Cinsel Bağlantı: Ölüm** (Düz)
*Fiziksel ve cinsel bağlantınız*
Cinsel yaşamınızda büyük bir dönüşüm yaşanıyor. Eski cinsel kimliğiniz veya dinamikleriniz sona eriyor ve tamamen yeni bir cinsel anlayış doğuyor. Bu, cinsel bir uyanış veya bir dönemin sonu olabilir.

**3. Duygusal/Ruhsal Bağlantı: Kadehler Altılısı** (Düz)
*Duygusal ve ruhsal bağlantınız*
Aranızda geçmişten gelen, tanıdık ve masum bir ruhsal bağ var. Bu, bir çocukluk aşkı veya geçmiş yaşam bağlantısı olabilir. Güvenli ve şefkatli bir duygusal ortam.

**4. Uzun Vadeli Sonuç: Aziz** (Ters)
*İlişkinin uzun vadeli sonucu*
Ters Hierophant, uzun vadede toplumsal baskı veya farklı inançlar nedeniyle bu ilişkinin yürümesinin zor olacağını gösterir. Geleneklere bir başkaldırı veya ayrılık.

💫 **Aşk Hayatı Özeti:**
Bu açılım, Kılıçlar İkilisi kartının temsil ettiği kişiyle olan ilişkinizin dinamiklerini gösteriyor. Aranızdaki fiziksel (Ölüm) ve duygusal (Kadehler Altılısı) bağların ardından, ilişkinizin uzun vadeli potansiyeli Aziz kartıyla aydınlanıyor.`,
      questions: {
        personalInfo: {
          name: 'Ahmet',
          email: userEmail || 'test@example.com',
          surname: 'Yılmaz',
          birthDate: '1993-11-11',
        },
        userQuestions: {
          concern: {
            question: 'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
            answer:
              'Gelecekteki ilişkimin nasıl olacağı konusunda endişeliyim.',
          },
          understanding: {
            question: 'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
            answer:
              'Mevcut ilişkimin potansiyelini ve geleceğini öğrenmek istiyorum.',
          },
          emotional: {
            question: 'Şu anda duygusal olarak nasıl hissediyorsunuz?',
            answer:
              'Karışık duygular içindeyim, hem umutlu hem de endişeliyim.',
          },
        },
      },
      status: 'completed',
      created_at: new Date().toISOString(),
      cost_credits: 50,
      admin_notes: 'Test okuma - Enhanced email oluşturma',
    };

    console.log('Enhanced email ile PDF oluşturuluyor...');

    // PDF oluştur
    const pdfBuffer = await pdfGeneratorService.generateReadingPDF(readingData);

    console.log('PDF oluşturuldu, enhanced email gönderiliyor...');

    // Enhanced email gönder
    const fileName = `enhanced-tarot-okuma-${new Date().toISOString().split('T')[0]}.pdf`;
    const success = await emailService.sendTarotReadingPDF(
      userEmail || 'busbuskimkionline@gmail.com',
      readingData,
      pdfBuffer,
      fileName
    );

    if (success) {
      return EmailCORS.wrapResponse(
        NextResponse.json({
          success: true,
          message: 'Enhanced email başarıyla oluşturuldu ve gönderildi!',
          timestamp: new Date().toISOString(),
          recipient: 'busbuskimkionline@gmail.com',
          fileName: fileName,
          features: [
            'Kullanıcı bilgileri (Ad, Soyad, Doğum Tarihi)',
            'Okuma detayları (Tür, Başlık, Yayılım, Tarih)',
            'Seçilen kartlar listesi',
            'Modern email tasarımı',
            'PDF eki ile birlikte',
            'Renkli bilgi kutuları',
          ],
        })
      );
    } else {
      return EmailCORS.wrapResponse(
        ErrorResponse.smtpConnectionError('Enhanced email gönderilemedi')
      );
    }
  } catch (error) {
    console.error('Enhanced email test API error:', error);
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
