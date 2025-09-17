/**
 * Relationship Analysis (İlişki Analizi) Tarot Açılımı Konfigürasyonu
 * 7 kartlık ilişki analizi açılımı
 */

export interface TarotCardPosition {
  id: number;
  className: string;
  title: string;
  desc: string;
  description: string;
}

export interface PositionLayout {
  id: number;
  className: string;
}

// 7 kartlık ilişki analizi pozisyon bilgileri
export const RELATIONSHIP_ANALYSIS_POSITIONS_INFO: TarotCardPosition[] = [
  {
    id: 1,
    className: 'relationship-current-situation',
    title: 'Mevcut Durum',
    desc: 'İlişkinin mevcut şartları, içinde bulunduğu durum ve varsa problemlerin yarattığı atmosfer hakkında bilgi verir.',
    description: 'İlişkinin mevcut şartları, içinde bulunduğu durum ve varsa problemlerin yarattığı atmosfer hakkında bilgi verir.'
  },
  {
    id: 2,
    className: 'relationship-your-feelings',
    title: 'Sizin Hissleriniz',
    desc: 'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu yansıtır.',
    description: 'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu yansıtır.'
  },
  {
    id: 3,
    className: 'relationship-your-expectations',
    title: 'Sizin Beklentileriniz',
    desc: 'Sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.',
    description: 'Sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.'
  },
  {
    id: 4,
    className: 'relationship-advice',
    title: 'Tavsiyeler',
    desc: 'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.',
    description: 'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.'
  },
  {
    id: 5,
    className: 'relationship-roadmap',
    title: 'Yol Haritası',
    desc: 'Bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.',
    description: 'Bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.'
  },
  {
    id: 6,
    className: 'relationship-partner-expectations',
    title: 'Partnerinizin Beklentileri',
    desc: 'Partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.',
    description: 'Partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.'
  },
  {
    id: 7,
    className: 'relationship-partner-feelings',
    title: 'Partnerinizin Hissleri',
    desc: 'Partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.',
    description: 'Partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.'
  }
];

// 7 kartlık ilişki analizi düzeni - Görüntüdeki düzene uygun
export const RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  { id: 1, className: 'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30' }, // Merkez - Mevcut Durum
  { id: 2, className: 'absolute top-[20%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ üst - Sizin Hissleriniz
  { id: 3, className: 'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ orta - Sizin Beklentileriniz
  { id: 4, className: 'absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ alt - Tavsiyeler
  { id: 5, className: 'absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol alt - Yol Haritası
  { id: 6, className: 'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol orta - Partnerinizin Beklentileri
  { id: 7, className: 'absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol üst - Partnerinizin Hissleri
] as const;

// Kart sayısı
export const RELATIONSHIP_ANALYSIS_CARD_COUNT = 7;
