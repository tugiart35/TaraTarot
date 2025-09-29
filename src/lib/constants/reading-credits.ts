/*
info:
Bağlantılı dosyalar:
- Doğrudan import edilen bir dosya yok, ancak bu dosya genellikle tarot açılımı, kredi kontrolü ve ödeme işlemleriyle ilgili bileşenlerde (örn. TarotReading, CreditRequirement, ödeme sayfaları) import edilir.

Dosyanın amacı:
- Tarot ve benzeri okuma türleri için gereken kredi miktarlarını merkezi olarak tanımlamak. Ayrıca, kredi kontrolü için tip tanımları sağlar.

Backend bağlantısı:
- Backend ile doğrudan bir bağlantı veya değişken yoktur. Ancak, kredi kontrolü ve düşümü işlemlerinde backend'de user_credits, credit_transactions gibi tablolarla ilişkili olabilir.

Geliştirme ve öneriler:
- Açıklamalar yeterli ve Türkçe, okunabilirlik yüksek.
- READING_CREDITS sabiti as const ile tanımlanmış, tip güvenliği sağlanmış.
- Okuma türleri ileride dinamik hale getirilecekse, backend'den çekilebilir.
- CreditStatus arayüzü sade ve kullanışlı, farklı durumlar için genişletilebilir.
- Gereksiz satır veya tekrar yok, kod sade ve amacına uygun.

Hatalar ve geliştirmeye açık noktalar:
- Şu an için hata veya kötü pratik yok.
- Okuma türleri sabit olduğu için güncelleme/değişiklik için kod güncellemesi gerekiyor, ileride dinamik yapılabilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik ve sade yapı çok iyi.
- Tekrarsız, modüler ve merkezi yönetim sağlanmış.
- Güvenlik açısından risk yok, sadece frontend sabitleri içeriyor.

Gereklilik ve Kullanım Durumu:
- READING_CREDITS: Gerekli, okuma türlerinin kredi gereksinimi için ana kaynak.
- ReadingType: Gerekli, tip güvenliği ve kontrol için kullanılır.
- CreditStatus: Gerekli, kredi kontrolü ve UI için kullanılır.
*/
// Bu dosya tarot açılımları için gerekli kredi miktarlarını tanımlar
// Her açılım türü için sabit kredi değerleri burada tutulur

export const READING_CREDITS = {
  LOVE_SPREAD: 70,
  LOVE_SPREAD_DETAILED: 70,
  LOVE_SPREAD_WRITTEN: 60,
  CAREER_SPREAD_DETAILED: 90,
  CAREER_SPREAD_WRITTEN: 80,
  PROBLEM_SOLVING_DETAILED: 130,
  PROBLEM_SOLVING_WRITTEN: 120,
  SITUATION_ANALYSIS_DETAILED: 100,
  SITUATION_ANALYSIS_WRITTEN: 90,
  RELATIONSHIP_ANALYSIS_DETAILED: 110,
  RELATIONSHIP_ANALYSIS_WRITTEN: 100,
  RELATIONSHIP_PROBLEMS_DETAILED: 120,
  RELATIONSHIP_PROBLEMS_WRITTEN: 110,
  MARRIAGE_DETAILED: 120,
  MARRIAGE_WRITTEN: 110,
  NEW_LOVER_DETAILED: 100,
  NEW_LOVER_WRITTEN: 90,
  MONEY_SPREAD_DETAILED: 90,
  MONEY_SPREAD_WRITTEN: 80,
} as const;

// Dashboard için gerekli kredi konfigürasyonları
export const READING_CREDIT_CONFIGS = {
  LOVE_SPREAD_DETAILED: {
    cost: 80,
    name: 'Aşk Açılımı (Detaylı)',
    description: '4 kartlık detaylı aşk açılımı',
  },
  LOVE_SPREAD_WRITTEN: {
    cost: 70,
    name: 'Aşk Açılımı (Yazılı)',
    description: '4 kartlık yazılı aşk açılımı',
  },
  CAREER_SPREAD_DETAILED: {
    cost: 90,
    name: 'Kariyer Açılımı (Detaylı)',
    description: '4 kartlık detaylı kariyer açılımı',
  },
  CAREER_SPREAD_WRITTEN: {
    cost: 80,
    name: 'Kariyer Açılımı (Yazılı)',
    description: '4 kartlık yazılı kariyer açılımı',
  },
  PROBLEM_SOLVING_DETAILED: {
    cost: 130,
    name: 'Problem Çözme Açılımı (Detaylı)',
    description: '10 kartlık detaylı problem çözme açılımı',
  },
  PROBLEM_SOLVING_WRITTEN: {
    cost: 120,
    name: 'Problem Çözme Açılımı (Yazılı)',
    description: '10 kartlık yazılı problem çözme açılımı',
  },
  SITUATION_ANALYSIS_DETAILED: {
    cost: 100,
    name: 'Durum Analizi Açılımı (Detaylı)',
    description: '7 kartlık detaylı durum analizi açılımı',
  },
  SITUATION_ANALYSIS_WRITTEN: {
    cost: 90,
    name: 'Durum Analizi Açılımı (Yazılı)',
    description: '7 kartlık yazılı durum analizi açılımı',
  },
  RELATIONSHIP_ANALYSIS_DETAILED: {
    cost: 110,
    name: 'İlişki Analizi Açılımı (Detaylı)',
    description: '7 kartlık detaylı ilişki analizi açılımı',
  },
  RELATIONSHIP_ANALYSIS_WRITTEN: {
    cost: 100,
    name: 'İlişki Analizi Açılımı (Yazılı)',
    description: '7 kartlık yazılı ilişki analizi açılımı',
  },
  RELATIONSHIP_PROBLEMS_DETAILED: {
    cost: 120,
    name: 'İlişki Sorunları Açılımı (Detaylı)',
    description: '9 kartlık detaylı ilişki sorunları açılımı',
  },
  RELATIONSHIP_PROBLEMS_WRITTEN: {
    cost: 110,
    name: 'İlişki Sorunları Açılımı (Yazılı)',
    description: '9 kartlık yazılı ilişki sorunları açılımı',
  },
  MARRIAGE_DETAILED: {
    cost: 120,
    name: 'Evlilik Açılımı (Detaylı)',
    description: '10 kartlık detaylı evlilik açılımı',
  },
  MARRIAGE_WRITTEN: {
    cost: 110,
    name: 'Evlilik Açılımı (Yazılı)',
    description: '10 kartlık yazılı evlilik açılımı',
  },
  NEW_LOVER_DETAILED: {
    cost: 100,
    name: 'Yeni Bir Sevgili Açılımı (Detaylı)',
    description: '6 kartlık detaylı yeni sevgili açılımı',
  },
  NEW_LOVER_WRITTEN: {
    cost: 90,
    name: 'Yeni Bir Sevgili Açılımı (Yazılı)',
    description: '6 kartlık yazılı yeni sevgili açılımı',
  },
  MONEY_SPREAD_DETAILED: {
    cost: 90,
    name: 'Para Açılımı (Detaylı)',
    description: '6 kartlık detaylı para açılımı',
  },
  MONEY_SPREAD_WRITTEN: {
    cost: 80,
    name: 'Para Açılımı (Yazılı)',
    description: '6 kartlık yazılı para açılımı',
  },
} as const;

// Kredi sabitleri ve uyarı eşikleri
export const CREDIT_CONSTANTS = {
  CREDIT_ALERTS: {
    LOW_BALANCE_THRESHOLD: 50,
    CRITICAL_BALANCE_THRESHOLD: 20,
  },
  DEFAULT_CREDITS: 100,
  MIN_CREDITS_FOR_READING: 20,
  EMAIL_CONFIRMATION_CREDITS: 10,
} as const;

// Kredi gerektiren okuma türleri
export type ReadingType = keyof typeof READING_CREDITS;

// Kredi durumu için tip tanımlaması
export interface CreditStatus {
  hasEnoughCredits: boolean;
  requiredCredits: number;
  currentCredits: number;
}
