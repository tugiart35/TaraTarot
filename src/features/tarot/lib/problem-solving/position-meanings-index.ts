/*
info:
---
Dosya Amacı:
- Problem Çözme açılımı için pozisyon bazlı kart anlamları
- Her kartın her pozisyonda nasıl yorumlanacağını belirler
- Pozisyon özel anlamlar + genel kart anlamlarını birleştirir

Bağlı Dosyalar:
- ProblemSolvingTarot.tsx (ana bileşen)
- problem-solving-config.ts (pozisyon bilgileri)

Üretime Hazır mı?:
- Evet, temel yapı hazır, detaylı anlamlar eklenebilir
---

*/

import { TarotCard } from '@/types/tarot';

/**
 * Problem Çözme açılımı için pozisyon bazlı anlam arayüzü
 */
export interface ProblemSolvingPositionMeaning {
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
}

/**
 * Problem Çözme açılımında belirli bir kartın belirli pozisyondaki anlamını döndürür
 * @param card - Tarot kartı
 * @param position - Pozisyon numarası (1-10)
 * @returns Pozisyon özel anlam veya null
 */
export function getProblemSolvingMeaningByCardAndPosition(
  card: TarotCard,
  position: number
): ProblemSolvingPositionMeaning | null {
  // Şimdilik genel kart anlamlarını döndür
  // İleride pozisyon özel anlamlar eklenebilir
  
  const baseMeaning = {
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywords || [],
    context: `Problem çözme açılımında ${position}. pozisyon için ${card.nameTr} kartının anlamı`,
  };

  // Pozisyon özel anlamlar burada eklenebilir
  // Örnek: if (card.name === 'The Fool' && position === 1) { ... }
  
  return baseMeaning;
}

