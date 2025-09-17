/*
info:
---
Dosya Amacı:
- Para Açılımı tarot açılımı için konfigürasyon sabitleri
- 8 kartlık piramit düzen ve pozisyon bilgileri
- Her pozisyon için başlık, açıklama ve CSS konumlandırması

Bağlı Dosyalar:
- MoneyTarot.tsx (ana bileşen)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, tüm pozisyon bilgileri ve düzen tanımları tamamlandı
- Responsive tasarım için mobil ve web düzenleri hazır
---

*/

import { PositionLayout } from '@/types/tarot';

// Tarot kart pozisyonu interface'i
export interface TarotCardPosition {
  id: number;
  title: string;
  desc: string;
  description: string;
}

/**
 * Para Açılımı pozisyon bilgileri (8 kart)
 * Her pozisyon farklı bir finansal analiz aşamasını temsil eder
 */
export const MONEY_POSITIONS_INFO: readonly TarotCardPosition[] = [
  {
    id: 1,
    title: 'Parayla İlgili Kaygı',
    desc: 'Parayla ilgili kaygı var mı?',
    description: 'Parayla ilgili kaygı var mı?',
  },
  {
    id: 2,
    title: 'Finansal Güvenlik Arzusu',
    desc: 'Finansal güvenliğe duyulan arzu',
    description: 'Finansal güvenliğe duyulan arzu',
  },
  {
    id: 3,
    title: 'Para Kullanımı',
    desc: 'Parayı beni mutlu edecek şekilde nasıl kullanabilirim?',
    description: 'Parayı beni mutlu edecek şekilde nasıl kullanabilirim?',
  },
  {
    id: 4,
    title: 'Geçmişteki Para Tutumu',
    desc: 'Parayla ilgili geçmişteki tutumum',
    description: 'Parayla ilgili geçmişteki tutumum',
  },
  {
    id: 5,
    title: 'Mali Sorumluluklar',
    desc: 'Mali açıdan iyi bir yaşam için sorumluluklarım nedir?',
    description: 'Mali açıdan iyi bir yaşam için sorumluluklarım nedir?',
  },
  {
    id: 6,
    title: 'Yeni Mali Planlar',
    desc: 'Mali yatırımlarım veya birikimlerimle ilgili yeni planlarım',
    description: 'Mali yatırımlarım veya birikimlerimle ilgili yeni planlarım',
  },
  {
    id: 7,
    title: 'Gelecek Para Planları',
    desc: 'Parayla ilgili gelecek planlarım',
    description: 'Parayla ilgili gelecek planlarım',
  },
  {
    id: 8,
    title: 'Para Kazanma Yetenekleri',
    desc: 'Para kazanmak için ne gibi özel yeteneklerim var?',
    description: 'Para kazanmak için ne gibi özel yeteneklerim var?',
  },
] as const;

/**
 * Kartların canvas üzerindeki CSS konumları (8 kart için piramit düzen)
 * Responsive tasarım: mobilde kompakt, webde piramit benzeri
 */
export const MONEY_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3,
    className:
      'absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5,
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6,
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 7,
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 8,
    className:
      'absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
  },
] as const;

/**
 * Para Açılımı için toplam kart sayısı
 */
export const MONEY_CARD_COUNT = 8;
