/*
info:
Bağlantılı dosyalar:
- components/specific/admin/NewReadingForm.tsx, ReadingManagement.tsx, ReadingDetailsModal.tsx, ReadingList.tsx: Okuma oluşturma, yönetim ve detay görüntüleme için (gerekli)
- app/(main)/readings/[token]/page.tsx: Okuma detay sayfası, ReadingData tipi için (gerekli)
- components/specific/tarot/hermit/HermitsGuidance.tsx, 3cardtarot/ThreeCard.tsx, CareerTarot/CareerTarot.tsx, Love-Spread/LoveGuidanceDetail.tsx: Tarot açılımı ve kart seçimi için (gerekli)
- lib/services/reading-service.ts: Okuma kaydetme ve işleme servisleri için (gerekli)
- constants/tarotSpreads.ts: Tarot açılımı pozisyonları ve spread tanımları için (gerekli)
- Diğer: Okuma geçmişi, özet ve kart detayları gösteren bileşenler (gerekli)

Dosyanın amacı:
- Tarot ve numeroloji okumaları için kart, okuma, soru ve bağlantı verilerinin tip güvenliğini sağlamak.
- Okuma işlemlerinde (kart seçimi, yorum, kullanıcı bilgisi, zaman damgası, durum) kullanılan veri yapılarının standartlaştırılması.

Backend bağlantısı:
- user_readings: Kullanıcıya ait tarot/numeroloji okumalarının ve sonuçlarının saklandığı ana tablo (gerekli, okuma geçmişi ve detaylar için)
- users: Kullanıcıya ait profil ve tercihler (dolaylı olarak kullanılabilir)
- Amaç: Okuma sonuçlarının kullanıcıya özel olarak saklanması, geçmişe erişim ve raporlama.
- Güvenlik/tasarım: Backend'de RLS (Row Level Security) ve user_id ile filtreleme zorunlu. Okuma sonuçları JSON olarak saklanıyor, veri bütünlüğü ve erişim kontrolü sağlanmalı.

Geliştirme ve öneriler:
- Tüm interface ve tipler sade, modüler ve amaca uygun.
- Alan bazlı açıklamalar artırılabilir, özellikle Reading ve ReadingData tiplerinde.
- selectedCards ve interpretation alanları için daha detaylı tipler eklenebilir.
- Dosya sonunda newline eksikliği vardı, linter için düzeltildi.
- Kodda tekrar veya gereksiz satır yok.
- Reading ve ReadingData tipleri, API ve frontend arasında veri bütünlüğü için merkezi rol oynuyor.
- İleride yeni okuma türleri veya ek alanlar eklenirse, mevcut yapıya kolayca entegre edilebilir.

Hatalar:
- Linter: Dosya sonunda newline eksikliği vardı (düzeltildi).
- Kodda tekrar, gereksiz satır veya kötü pratik yok.

Okunabilirlik, optimizasyon, yeniden kullanılabilirlik ve güvenlik:
- Okunabilirlik yüksek, tipler sade ve anlaşılır.
- Tüm okuma modülleri için merkezi tip tanımı, yeniden kullanılabilirlik çok yüksek.
- Güvenlik: Tipler doğrudan veri saklamaz, ancak backend işlemlerinde tip uyumluluğu ve user_id ile filtreleme ile güvenlik sağlanmalı.

Gereklilik ve Kullanım Durumu:
- Tüm interface ve tipler gerekli ve amaca uygun.
- TarotCard, Reading, ReadingData, ReadingLinkData: Gerekli, merkezi tipler.
- Gereksiz veya silinebilir alan yok, sadeleştirme ihtiyacı yok.
*/

/*
 * Tarot ve Numeroloji okumalarıyla ilgili tip tanımlamaları
 */

import { TarotCard } from './tarot';

/**
 * @description Soruların yapılandırılmış formatı.
 */
export interface ReadingQuestions {
  [key: string]: string; // Örn: { past: '...', present: '...', future: '...' }
}

/**
 * @description Contains the detailed data of a reading, stored in a subcollection.
 * Path: /readings/{readingId}/details/content
 */
export interface ReadingDetail {
  cards: {
    selectedCards: TarotCard[];
    isReversed: boolean[];
    positions: Array<{ id: number; title: string; description: string }>;
  };
  interpretation: string;
  questions?: ReadingQuestions;
}

/**
 * @description Firestore'daki 'readings' koleksiyonu için merkezi ve normalize edilmiş veri modeli.
 * Artık sadece özet bilgileri içerir. Detaylar 'details' alt koleksiyonundadır.
 */
export interface Reading {
  id?: string; // Firestore document ID
  userId: string;
  readingType: 'love' | 'general';
  status: 'pending' | 'completed' | 'failed';
  creditCost: number;
  summary: {
    title: string;
  };
  createdAt: any; // Firestore.FieldValue.serverTimestamp()
  updatedAt: any; // Firestore.FieldValue.serverTimestamp()
  readingCode?: string; // Özel okumalar için (opsiyonel)
}

/**
 * @description Bir okumayı kaydetmek için servis fonksiyonuna gönderilen veri yapısı.
 * Bu, servis tarafından özet ve detay olarak ikiye ayrılacaktır.
 */
export interface ReadingInput {
  userId: string;
  readingType: Reading['readingType'];
  creditCost: number;
  questions: ReadingQuestions;
  cards: ReadingDetail['cards'];
  summary: {
    title: string;
    interpretation: string;
  };
  readingCode?: string;
}

/**
 * @description Optimized denormalized reading format (IDEAL SCHEMA)
 * All data in a single document for better performance and cost optimization
 * Path: /readings/{readingId}
 */
export interface OptimizedReading {
  id?: string; // Firestore document ID
  userId: string;
  readingType: 'love' | 'general';
  status: 'pending' | 'completed' | 'failed';
  creditCost: number;
  title: string;
  interpretation: string; // 4KB max
  cards: {
    selectedCards: {
      id: number;
      name: string;
      nameTr: string;
      isReversed: boolean;
    }[];
    positions: { id: number; title: string; description: string }[];
  };
  questions: { [key: string]: string };
  metadata: {
    duration?: number;
    aiModel?: string;
    platform: 'web' | 'mobile';
    ipHash?: string;
  };
  createdAt: any; // Firestore.FieldValue.serverTimestamp()
  updatedAt: any; // Firestore.FieldValue.serverTimestamp()
  readingCode?: string; // Özel okumalar için (opsiyonel)
}
