'use client';

/*
info:
---
Dosya Amacı:
- Kariyer açılımı için her kartın her pozisyondaki özel anlamlarını tanımlar
- 78 tarot kartının 7 farklı kariyer pozisyonundaki yorumlarını içerir
- Kariyer odaklı yorumlar ve rehberlik sağlar

Üretime Hazır mı?:
- Dosya kapsamlı kariyer yorumları içerir, üretime hazırdır
- Her kart için pozisyon bazlı anlamlar tanımlanmış
- Kariyer temasına uygun yorumlar ve öneriler mevcut

Kullanım:
- CareerTarot.tsx bileşeni tarafından import edilir
- Kart seçimi sonrası pozisyon bazlı yorumlar için kullanılır
- Kariyer rehberliği ve önerileri sağlar
---

Bağlı Dosyalar:
- position-1-gercekten-istedigim-kariyer-bumu copy.ts
- position-2-kariyer-gelistirmek-icin-hangi-adımlar-atabilirim.ts
- position-3-kariyerimde-degisteremediğim-taraflar.ts
- position-4-kariyerimde-elimden-gelenin-en-iyisi-yapıyormuyum copy.ts
- position-5-kariyerimde-yardimci-olacak-ne-gibi-degisikler copy.ts
- position-6-gecmisimdeki-hangi-engeller.ts.ts
- position-7-sonuc-ne-olacak.ts

Supabase Değişkenleri:
- Bu dosya sadece statik veri içerir, Supabase bağlantısı yoktur

Geliştirme Önerileri:
- Tüm pozisyonlar için i18n desteği eklenebilir
- Kart anlamları daha detaylandırılabilir
- Pozisyon bazlı filtreleme fonksiyonları eklenebilir

Hata Durumları:
- Pozisyon bulunamadığında null döner
- Kart bulunamadığında null döner

Kullanım Durumları:
- getCareerMeaningByCardAndPosition: Belirli kart ve pozisyon için anlam al
- CAREER_POSITION_MEANINGS: Tüm pozisyon anlamlarına erişim
*/

import type { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import { position1Meanings } from './position-1-gercekten-istedigim-kariyer-bumu';
import { position2Meanings } from './position-2-kariyer-gelistirmek-icin-hangi-adımlar-atabilirim';
import { position3Meanings } from './position-3-kariyerimde-degisteremedigigim-taraflar';
import { position4Meanings } from './position-4-kariyerimde-elimden-gelenin-en-iyisi-yapıyormuyum';
import { position5Meanings } from './position-5-kariyerimde-yardimci-olacak-ne-gibi-degisikler';
import { position6Meanings } from './position-6-gecmisimdeki-hangi-engeller';
import { position7Meanings } from './position-7-sonuc-ne-olacak';

// Kariyer pozisyon anlamları interface'i
export interface CareerPositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// Kariyer açılımı pozisyon anlamları - 7 pozisyonlu sistem
export const CAREER_POSITION_MEANINGS: Record<number, CareerPositionMeaning[]> =
  {
    1: position1Meanings, // Gerçekten istediğim kariyer bu mu?
    2: position2Meanings, // Kariyer geliştirmek için hangi adımlar atabilirim?
    3: position3Meanings, // Kariyerimde değiştiremediğim taraflar
    4: position4Meanings, // Kariyerimde elimden gelenin en iyisini yapıyor muyum?
    5: position5Meanings, // Kariyerimde yardımcı olacak ne gibi değişikler
    6: position6Meanings, // Geçmişimdeki hangi engeller
    7: position7Meanings, // Sonuç ne olacak
  };

/**
 * Belirli bir kart ve pozisyon için kariyer anlamını getirir
 * @param card - Tarot kartı
 * @param position - Pozisyon numarası (1-7)
 * @param isReversed - Kart ters mi?
 * @returns Kariyer pozisyon anlamı veya null
 */
export function getCareerMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  _isReversed: boolean = false
): CareerPositionMeaning | null {
  // Pozisyon 1-7 arasında olmalı
  if (position < 1 || position > 7) {
    return null;
  }

  const positionMeanings = CAREER_POSITION_MEANINGS[position];
  if (!positionMeanings) {
    return null;
  }

  // Kart ismi eşleştirmesi için mapping kullan
  const cardNameMapping = getCardNameMappingSync();

  // Kartın İngilizce ismini bul
  const englishCardName = cardNameMapping[card.nameTr] || card.name;

  const meaning = positionMeanings.find(
    m =>
      m.card === card.name ||
      m.card === card.nameTr ||
      m.card === englishCardName
  );

  if (!meaning) {
    return null;
  }

  // isReversed parametresine göre anlamları döndür
  return {
    ...meaning,
    // upright ve reversed alanlarını orijinal haliyle koru
    upright: meaning.upright,
    reversed: meaning.reversed,
  };
}

/**
 * Belirli bir pozisyon için tüm kart anlamlarını getirir
 * @param position - Pozisyon numarası (1-7)
 * @returns Pozisyon anlamları array'i veya null
 */
export function getCareerMeaningsByPosition(
  position: number
): CareerPositionMeaning[] | null {
  if (position < 1 || position > 7) {
    return null;
  }

  return CAREER_POSITION_MEANINGS[position] || null;
}

/**
 * Belirli bir kart için tüm pozisyon anlamlarını getirir
 * @param card - Tarot kartı
 * @returns Kart anlamları array'i
 */
export function getCareerMeaningsByCard(
  card: TarotCard
): CareerPositionMeaning[] {
  const meanings: CareerPositionMeaning[] = [];
  const cardNameMapping = getCardNameMappingSync();
  const englishCardName = cardNameMapping[card.nameTr] || card.name;

  for (let position = 1; position <= 7; position++) {
    const positionMeanings = CAREER_POSITION_MEANINGS[position];
    if (positionMeanings) {
      const meaning = positionMeanings.find(
        m =>
          m.card === card.name ||
          m.card === card.nameTr ||
          m.card === englishCardName
      );
      if (meaning) {
        meanings.push(meaning);
      }
    }
  }

  return meanings;
}

/**
 * Tüm pozisyon anlamlarını getirir
 * @returns Tüm pozisyon anlamları
 */
export function getAllCareerMeanings(): Record<
  number,
  CareerPositionMeaning[]
> {
  return CAREER_POSITION_MEANINGS;
}

// Pozisyon açıklamaları
export const CAREER_POSITION_DESCRIPTIONS = {
  1: 'Gerçekten istediğim kariyer bu mu?',
  2: 'Kariyer geliştirmek için hangi adımlar atabilirim?',
  3: 'Kariyerimde değiştiremediğim taraflar',
  4: 'Kariyerimde elimden gelenin en iyisini yapıyor muyum?',
  5: 'Kariyerimde yardımcı olacak ne gibi değişikler',
  6: 'Geçmişimdeki hangi engeller',
  7: 'Sonuç ne olacak',
} as const;

// i18n destekli fonksiyon - kart ve pozisyona göre çevrilmiş anlam döndürür
export function getI18nCareerMeaningByCardAndPosition(
  cardName: string,
  position: number,
  t: (_key: string) => string
): CareerPositionMeaning | null {
  const positionMeanings = CAREER_POSITION_MEANINGS[position];
  if (!positionMeanings) {
    return null;
  }

  const originalMeaning = positionMeanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

  const i18nUpright = t(`career.meanings.${cardKey}.position${position}.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position${position}.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position${position}.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position${position}.context`);

  return {
    ...originalMeaning,
    upright: i18nUpright || originalMeaning.upright,
    reversed: i18nReversed || originalMeaning.reversed,
    keywords: (() => {
      if (!i18nKeywords) {
        return originalMeaning.keywords;
      }
      try {
        const parsed = JSON.parse(i18nKeywords);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return originalMeaning.keywords;
      } catch (error) {
        console.error(`[Career Position ${position}] Failed to parse keywords for ${cardName}:`, error);
        return originalMeaning.keywords;
      }
    })(),
    context: i18nContext || originalMeaning.context,
  };
}

// Export edilen pozisyon arrayleri
export {
  position1Meanings,
  position2Meanings,
  position3Meanings,
  position4Meanings,
  position5Meanings,
  position6Meanings,
  position7Meanings,
};
