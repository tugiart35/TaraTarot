/*
info:
---
Dosya Amacı:
- Tüm tarot açılımları için ortak okuma kaydetme utility'si
- Yeniden kullanılabilir, tip güvenli, hata yönetimi dahil
- Supabase entegrasyonu ve veri standardizasyonu

Bağlantılı Dosyalar:
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)
- @/hooks/useAuth: Kullanıcı bilgileri için (gerekli)
- @/types/tarot: Tarot tipleri için (gerekli)

Geliştirme ve Öneriler:
- Tip güvenliği ve veri validasyonu
- Hata yönetimi ve kullanıcı geri bildirimi
- Veri standardizasyonu ve backend uyumluluğu
- Guest kullanıcı desteği

Kullanım Durumu:
- TarotReadingSaver: Gerekli, tüm açılımlarda kullanılır
- Veri kaydetme: Gerekli, backend entegrasyonu için
- Tip güvenliği: Gerekli, veri bütünlüğü için
*/

'use client';

import { supabase } from '@/lib/supabase/client';
import { TarotCard } from '@/types/tarot';
import { emailService } from '@/lib/email/email-service';
import { pdfGeneratorService } from '@/lib/pdf/pdf-generator';

// Okuma veri tipleri
export interface ReadingData {
  userId: string;
  readingType: string;
  status: 'completed' | 'pending' | 'failed';
  title: string;
  interpretation: string;
  spreadName?: string;
  costCredits?: number;
  adminNotes?: string;
  cards: {
    selectedCards: Array<{
      id: number;
      name: string;
      nameTr: string;
      isReversed: boolean;
    }>;
    positions: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
  questions: {
    personalInfo: {
      name: string;
      surname: string;
      birthDate: string;
      email: string;
    };
    userQuestions: {
      concern: {
        question: string;
        answer: string;
      };
      understanding: {
        question: string;
        answer: string;
      };
      emotional: {
        question: string;
        answer: string;
      };
    };
  };
  metadata: {
    duration: number;
    platform: string;
    ipHash: string;
    userAgent: string;
  };
  timestamp: string;
  createdAt: Date;
  updatedAt: Date;
}

// Kaydetme sonucu
export interface SaveResult {
  success: boolean;
  id?: string;
  userId?: string;
  message?: string;
  error?: string;
}

// Kaydetme parametreleri
export interface SaveReadingParams {
  selectedCards: (TarotCard | null)[];
  isReversed: boolean[];
  interpretation: string;
  personalInfo: {
    name: string;
    surname: string;
    birthDate: string;
    email: string;
  };
  questions: {
    concern: string;
    understanding: string;
    emotional: string;
  };
  positionsInfo: ReadonlyArray<{
    id: number;
    title: string;
    desc: string;
  }>;
  readingType: string;
  startTime: number;
  user?: any;
  costCredits?: number; // optional credit cost to charge atomically
  spreadName?: string;  // optional spread name for metadata
}

export class TarotReadingSaver {
  /**
   * Okuma verisini Supabase'e kaydet
   */
  static async saveReading(params: SaveReadingParams): Promise<SaveResult> {
    try {
      const { user, selectedCards, isReversed, interpretation, personalInfo, questions, positionsInfo, readingType, startTime } = params;

      // Guest kullanıcı kontrolü
      if (!user?.id) {
        return { 
          success: true, 
          id: 'guest-session',
          userId: 'guest',
          message: 'Guest kullanıcı için veri saklanmadı'
        };
      }

      // Veri standardizasyonu
      const readingData: ReadingData = {
        userId: user.id,
        readingType,
        status: 'completed',
        title: 'Tarot Açılımı',
        interpretation,
        cards: {
          selectedCards: selectedCards
            .filter((card): card is TarotCard => card !== null)
            .map((card, idx) => ({
              id: card.id,
              name: card.name,
              nameTr: card.nameTr,
              isReversed: isReversed[idx] || false,
            })),
          positions: positionsInfo.map(pos => ({
            id: pos.id,
            title: pos.title,
            description: pos.desc,
          })),
        },
        questions: {
          personalInfo,
          userQuestions: {
            concern: {
              question: 'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
              answer: questions.concern
            },
            understanding: {
              question: 'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
              answer: questions.understanding
            },
            emotional: {
              question: 'Şu anda duygusal olarak nasıl hissediyorsunuz?',
              answer: questions.emotional
            }
          },
        },
        metadata: {
          duration: Date.now() - startTime,
          platform: 'web',
          ipHash: 'hashed_ip_address', // Güvenlik için IP hash
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        },
        timestamp: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // RPC ile atomik kredi düş + okuma oluştur
      const { data: rpcResult, error: rpcError } = await supabase.rpc('fn_create_reading_with_debit', {
        p_user_id: user.id,
        p_reading_type: readingData.readingType,
        p_spread_name: params.spreadName || 'Aşk Yayılımı',
        p_title: readingData.title,
        p_interpretation: readingData.interpretation,
        p_cards: readingData.cards.selectedCards,
        p_questions: readingData.questions,
        p_cost_credits: params.costCredits ?? 0,
        p_metadata: {
          duration: readingData.metadata.duration,
          platform: readingData.metadata.platform,
          ipHash: readingData.metadata.ipHash,
          userAgent: readingData.metadata.userAgent
        },
        p_idempotency_key: `reading_${user.id}_${readingData.timestamp}`
      });

      if (rpcError) {
        console.error('RPC okuma oluşturma hatası:', rpcError);
        throw rpcError;
      }

      // Yeni şemada tüm veriler readings tablosunda questions JSONB alanında saklanıyor
      console.log('Form verileri readings tablosunda questions alanında saklandı');

      // Email gönderimi (asenkron, hata durumunda okuma kaydını etkilemez)
      // Server-side API endpoint'e istek gönder
      this.triggerEmailSending(rpcResult?.id, readingData).catch(error => {
        console.error('Email gönderimi başarısız:', error);
      });

      return { 
        success: true, 
        id: rpcResult?.id,
        userId: user.id
      };

    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }

  /**
   * Basit okuma sayacı kaydet (guest kullanıcılar için)
   */
  static async saveSimpleReadingCounter(): Promise<SaveResult> {
    // Guest/simple sayacı: DB yazmadan başarı döndür (RLS gereği)
    return { success: true, id: 'guest-session', userId: 'guest' };
  }

  /**
   * Email gönderimi için API endpoint'e istek gönder
   */
  private static async triggerEmailSending(readingId: string | undefined, readingData: ReadingData): Promise<void> {
    if (!readingId) {
      console.error('❌ Reading ID bulunamadı, email gönderilemedi');
      return;
    }

    try {
      console.log('🔮 Email gönderimi API endpoint\'e istek gönderiliyor...', { readingId });
      
      // Server-side API endpoint'e sadece readingId gönder
      // API kendi Supabase'den gerçek veriyi çekecek
      const response = await fetch('/api/send-reading-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          readingId
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Email gönderimi başarılı:', result);
      } else {
        const error = await response.text();
        console.error('❌ Email gönderimi başarısız:', error);
      }
    } catch (error) {
      console.error('❌ Email gönderimi API hatası:', error);
    }
  }

  /**
   * Okuma email'i gönder (Server-side)
   */
  private static async sendReadingEmail(readingId: string | undefined, readingData: ReadingData): Promise<void> {
    console.log('🔮 Email gönderimi başlatılıyor...', { readingId, readingData: readingData.readingType });
    
    if (!readingId) {
      console.error('❌ Reading ID bulunamadı, email gönderilemedi');
      return;
    }

    try {
      // Kullanıcı email adresini al
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user?.email) {
        console.error('❌ Kullanıcı email adresi alınamadı:', userError);
        return;
      }

      const userEmail = userData.user.email;
      console.log('📧 Email gönderilecek adres:', userEmail);

      // PDF oluştur - Veri formatını düzelt
      console.log('📄 PDF oluşturuluyor...', { 
        readingId, 
        readingType: readingData.readingType,
        cardsCount: readingData.cards.selectedCards.length 
      });
      
      const pdfBuffer = await pdfGeneratorService.generateReadingPDF({
        id: readingId,
        reading_type: readingData.readingType,
        title: readingData.title,
        spread_name: readingData.spreadName || '',
        cards: readingData.cards.selectedCards, // Sadece selectedCards'ı gönder
        interpretation: readingData.interpretation,
        questions: readingData.questions,
        status: readingData.status,
        created_at: new Date().toISOString(),
        cost_credits: readingData.costCredits || 50,
        admin_notes: readingData.adminNotes || ''
      });

      console.log('✅ PDF oluşturuldu, boyut:', pdfBuffer.length, 'bytes');

      // Email gönder - Veri formatını düzelt
      console.log('📧 Email gönderiliyor...', { userEmail, readingId });
      
      const fileName = `tarot-okuma-${readingId.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.pdf`;
      const success = await emailService.sendTarotReadingPDF(
        userEmail, // Kullanıcının gerçek email adresi
        {
          id: readingId,
          reading_type: readingData.readingType,
          title: readingData.title,
          spread_name: readingData.spreadName || '',
          cards: readingData.cards.selectedCards, // Sadece selectedCards'ı gönder
          interpretation: readingData.interpretation,
          questions: readingData.questions,
          created_at: new Date().toISOString(),
          cost_credits: readingData.costCredits || 50,
          status: readingData.status
        },
        pdfBuffer,
        fileName
      );

      if (success) {
        console.log('✅ Okuma PDF\'i başarıyla email ile gönderildi:', userEmail);
      } else {
        console.error('❌ Email gönderimi başarısız');
      }
    } catch (error) {
      console.error('❌ PDF oluşturma veya email gönderimi hatası:', error);
      console.error('❌ Hata detayları:', {
        message: error instanceof Error ? error.message : 'Bilinmeyen hata',
        stack: error instanceof Error ? error.stack : undefined,
        readingId,
        readingType: readingData.readingType
      });
    }
  }

  /**
   * Veri validasyonu
   */
  static validateReadingData(data: Partial<ReadingData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('Kullanıcı ID gerekli');
    }

    if (!data.readingType) {
      errors.push('Okuma tipi gerekli');
    }

    if (!data.interpretation) {
      errors.push('Yorum gerekli');
    }

    if (!data.cards?.selectedCards || data.cards.selectedCards.length === 0) {
      errors.push('En az bir kart seçilmiş olmalı');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
