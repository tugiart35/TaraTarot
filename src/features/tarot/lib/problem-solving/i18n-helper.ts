/*
info:
Bağlantılı dosyalar:
- ../../../../hooks/useTranslations: i18n hook'u için (gerekli)
- ../../../../messages/*.json: Dil dosyaları için (gerekli)

Dosyanın amacı:
- Problem Solving tarot pozisyonları için i18n helper fonksiyonları
- Kart anlamlarını dil dosyalarından çekme
- Fallback mekanizması ile güvenli çeviri

Supabase değişkenleri ve tabloları:
- Yok (frontend helper)

Geliştirme önerileri:
- Tüm kart anlamları için i18n anahtarları eklenebilir
- Cache mekanizması eklenebilir
- Type safety geliştirilebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { useTranslations } from '@/hooks/useTranslations';

// Kart grupları için i18n anahtarları
export const getCardGroupKey = (group: string): string => {
  const groupMap: Record<string, string> = {
    'Majör Arkana': 'problem-solving.cardGroups.majorArcana',
    Kupalar: 'problem-solving.cardGroups.cups',
    Kılıçlar: 'problem-solving.cardGroups.swords',
    Asalar: 'problem-solving.cardGroups.wands',
    Tılsımlar: 'problem-solving.cardGroups.pentacles',
  };
  return groupMap[group] || group;
};

// Pozisyon başlıkları için i18n anahtarları
export const getPositionTitleKey = (position: number): string => {
  const positionMap: Record<number, string> = {
    1: 'problem-solving.positions.position1.title',
    2: 'problem-solving.positions.position2.title',
    3: 'problem-solving.positions.position3.title',
    4: 'problem-solving.positions.position4.title',
    5: 'problem-solving.positions.position5.title',
    6: 'problem-solving.positions.position6.title',
    7: 'problem-solving.positions.position7.title',
    8: 'problem-solving.positions.position8.title',
    9: 'problem-solving.positions.position9.title',
    10: 'problem-solving.positions.position10.title',
  };
  return positionMap[position] || `Position ${position}`;
};

// Pozisyon açıklamaları için i18n anahtarları
export const getPositionDescriptionKey = (position: number): string => {
  const positionMap: Record<number, string> = {
    1: 'problem-solving.positions.position1.description',
    2: 'problem-solving.positions.position2.description',
    3: 'problem-solving.positions.position3.description',
    4: 'problem-solving.positions.position4.description',
    5: 'problem-solving.positions.position5.description',
    6: 'problem-solving.positions.position6.description',
    7: 'problem-solving.positions.position7.description',
    8: 'problem-solving.positions.position8.description',
    9: 'problem-solving.positions.position9.description',
    10: 'problem-solving.positions.position10.description',
  };
  return positionMap[position] || `Description for position ${position}`;
};

// Kart anlamları için i18n anahtarları
export const getCardMeaningKey = (
  cardName: string,
  position: number,
  type: 'upright' | 'reversed'
): string => {
  // Kart adını i18n anahtarına dönüştür
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `problem-solving.meanings.${cardKey}.position${position}.${type}`;
};

// Kart anahtar kelimeleri için i18n anahtarları
export const getCardKeywordsKey = (
  cardName: string,
  position: number
): string => {
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `problem-solving.meanings.${cardKey}.position${position}.keywords`;
};

// Kart bağlamı için i18n anahtarları
export const getCardContextKey = (
  cardName: string,
  position: number
): string => {
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `problem-solving.meanings.${cardKey}.position${position}.context`;
};

// Problem Solving tarot için i18n hook'u
export const useProblemSolvingTranslations = () => {
  const { t } = useTranslations();

  return {
    // Pozisyon başlığı al
    getPositionTitle: (position: number): string => {
      return t(getPositionTitleKey(position));
    },

    // Pozisyon açıklaması al
    getPositionDescription: (position: number): string => {
      return t(getPositionDescriptionKey(position));
    },

    // Kart grubu al
    getCardGroup: (group: string): string => {
      return t(getCardGroupKey(group));
    },

    // Kart anlamı al
    getCardMeaning: (
      cardName: string,
      position: number,
      type: 'upright' | 'reversed'
    ): string => {
      const key = getCardMeaningKey(cardName, position, type);
      const translation = t(key);

      // Eğer çeviri bulunamazsa, fallback olarak orijinal metni döndür
      if (translation === key) {
        // Bu durumda orijinal dosyalardan alınacak
        return '';
      }

      return translation;
    },

    // Kart anahtar kelimeleri al
    getCardKeywords: (cardName: string, position: number): string[] => {
      const key = getCardKeywordsKey(cardName, position);
      const translation = t(key);

      if (translation === key) {
        return [];
      }

      try {
        return JSON.parse(translation);
      } catch {
        return [];
      }
    },

    // Kart bağlamı al
    getCardContext: (cardName: string, position: number): string => {
      const key = getCardContextKey(cardName, position);
      const translation = t(key);

      if (translation === key) {
        return '';
      }

      return translation;
    },
  };
};

