/*
info:
---
Dosya Amacı:
- Problem Çözme tarot açılımı için konfigürasyon sabitleri
- 10 kartlık özel düzen ve pozisyon bilgileri
- Her pozisyon için başlık, açıklama ve CSS konumlandırması

Bağlı Dosyalar:
- ProblemSolvingTarot.tsx (ana bileşen)
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
}

/**
 * Problem Çözme Açılımı pozisyon bilgileri (10 kart)
 * Her pozisyon farklı bir analiz aşamasını temsil eder
 */
export const PROBLEM_SOLVING_POSITIONS_INFO: readonly TarotCardPosition[] = [
  {
    id: 1,
    title: 'Sorulan Soru',
    desc: 'Problem hakkında sorduğunuz temel soru',
  },
  {
    id: 2,
    title: 'Mevcut Durum',
    desc: 'Şu anda problemle ilgili yaşadığınız durum',
  },
  {
    id: 3,
    title: 'Geçmiş Etkiler',
    desc: 'Bu problemin oluşmasına neden olan geçmiş faktörler',
  },
  {
    id: 4,
    title: 'Gelecek Potansiyeli',
    desc: 'Problem çözüldüğünde ulaşabileceğiniz durum',
  },
  {
    id: 5,
    title: 'Dış Faktörler',
    desc: 'Problem üzerinde etkili olan dış etkenler',
  },
  {
    id: 6,
    title: 'İç Faktörler',
    desc: 'Problem üzerinde etkili olan iç etkenler',
  },
  {
    id: 7,
    title: 'Çözüm Yolu 1',
    desc: 'İlk çözüm önerisi ve yaklaşımı',
  },
  {
    id: 8,
    title: 'Çözüm Yolu 2',
    desc: 'İkinci çözüm önerisi ve yaklaşımı',
  },
  {
    id: 9,
    title: 'Çözüm Yolu 3',
    desc: 'Üçüncü çözüm önerisi ve yaklaşımı',
  },
  {
    id: 10,
    title: 'Sonuç ve Tavsiye',
    desc: 'En uygun çözüm yolu ve genel tavsiyeler',
  },
] as const;

/**
 * Kartların canvas üzerindeki CSS konumları (10 kart için özel düzen)
 * Responsive tasarım: mobilde kompakt, webde akış şeması benzeri
 */
export const PROBLEM_SOLVING_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 rotate-90 z-30',
  },
  {
    id: 3,
    className:
      'absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-[25%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5,
    className:
      'absolute top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6,
    className:
      'absolute top-[45%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
  },

  {
    id: 7,
    className:
      'absolute top-[20%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 8,
    className:
      'absolute top-[35%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 9,
    className:
      'absolute top-[50%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 10,
    className:
      'absolute top-[65%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
] as const;

/**
 * Problem Çözme Açılımı için toplam kart sayısı
 */
export const PROBLEM_SOLVING_CARD_COUNT = 10;
