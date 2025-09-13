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
  LOVE_SPREAD: 80,
  LOVE_SPREAD_DETAILED: 60,
  LOVE_SPREAD_WRITTEN: 50,
} as const;

// Dashboard için gerekli kredi konfigürasyonları
export const READING_CREDIT_CONFIGS = {
  LOVE_SPREAD_DETAILED: {
    cost: 60,
    name: 'Aşk Açılımı (Detaylı)',
    description: '4 kartlık detaylı aşk açılımı',
  },
  LOVE_SPREAD_WRITTEN: {
    cost: 50,
    name: 'Aşk Açılımı (Yazılı)',
    description: '4 kartlık yazılı aşk açılımı',
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
