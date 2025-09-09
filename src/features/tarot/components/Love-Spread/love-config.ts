import type { PositionInfo, PositionLayout } from '@/types/tarot';

/**
 * Aşk Açılımı pozisyon başlıkları ve açıklamaları
 */
export const LOVE_POSITIONS_INFO: readonly PositionInfo[] = [
  {
    id: 1,
    title: 'İlgi Duyduğun Kişi',
    desc: 'Hakkında soru sorduğun kişi',
    description: 'Hakkında soru sorduğun kişi',
  },
  {
    id: 2,
    title: 'Fiziksel/Cinsel Bağlantı',
    desc: 'Fiziksel ve cinsel bağlantınız',
    description: 'Fiziksel ve cinsel bağlantınız',
  },
  {
    id: 3,
    title: 'Duygusal/Ruhsal Bağlantı',
    desc: 'Duygusal ve ruhsal bağlantınız',
    description: 'Duygusal ve ruhsal bağlantınız',
  },
  {
    id: 4,
    title: 'Uzun Vadeli Sonuç',
    desc: 'İlişkinin uzun vadeli sonucu',
    description: 'İlişkinin uzun vadeli sonucu',
  },
] as const;

/**
 * Kartların canvas üzerindeki CSS konumları (4 kart için yatay düzen)
 */
export const LOVE_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3,
    className:
      'absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 z-20 rotate-90',
  },
] as const;

/**
 * Aşk Açılımı için toplam kart sayısı
 */
export const LOVE_CARD_COUNT = 4;
