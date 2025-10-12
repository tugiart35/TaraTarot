/*
info:
Bağlantılı dosyalar:
- ../../../../hooks/useTranslations: i18n hook'u için (gerekli)
- ../../../../messages/*.json: Dil dosyaları için (gerekli)

Dosyanın amacı:
- Relationship Analysis tarot pozisyonları için i18n helper fonksiyonları
- Kart anlamlarını dil dosyalarından çekme
- Fallback mekanizması ile güvenli çeviri

Supabase değişkenleri ve tabloları:
- Yok (frontend helper)

Kullanım durumu:
- Aktif kullanımda
*/

import { useTranslations } from '@/hooks/useTranslations';

// Kart grupları için i18n anahtarları
export const getCardGroupKey = (group: string): string => {
  const groupMap: Record<string, string> = {
    'Majör Arkana': 'relationship-analysis.cardGroups.majorArcana',
    Kupalar: 'relationship-analysis.cardGroups.cups',
    Kılıçlar: 'relationship-analysis.cardGroups.swords',
    Asalar: 'relationship-analysis.cardGroups.wands',
    Tılsımlar: 'relationship-analysis.cardGroups.pentacles',
  };
  return groupMap[group] || group;
};

// Pozisyon başlıkları için i18n anahtarları
export const getPositionTitleKey = (position: number): string => {
  const positionMap: Record<number, string> = {
    1: 'relationship-analysis.positions.position1.title',
    2: 'relationship-analysis.positions.position2.title',
    3: 'relationship-analysis.positions.position3.title',
    4: 'relationship-analysis.positions.position4.title',
    5: 'relationship-analysis.positions.position5.title',
    6: 'relationship-analysis.positions.position6.title',
    7: 'relationship-analysis.positions.position7.title',
  };
  return positionMap[position] || `Position ${position}`;
};

// Pozisyon açıklamaları için i18n anahtarları
export const getPositionDescriptionKey = (position: number): string => {
  const positionMap: Record<number, string> = {
    1: 'relationship-analysis.positions.position1.description',
    2: 'relationship-analysis.positions.position2.description',
    3: 'relationship-analysis.positions.position3.description',
    4: 'relationship-analysis.positions.position4.description',
    5: 'relationship-analysis.positions.position5.description',
    6: 'relationship-analysis.positions.position6.description',
    7: 'relationship-analysis.positions.position7.description',
  };
  return positionMap[position] || `Description for position ${position}`;
};

// Kart anlamları için i18n anahtarları
export const getCardMeaningKey = (
  cardName: string,
  position: number,
  type: 'upright' | 'reversed'
): string => {
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `relationship-analysis.meanings.${cardKey}.position${position}.${type}`;
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
  return `relationship-analysis.meanings.${cardKey}.position${position}.keywords`;
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
  return `relationship-analysis.meanings.${cardKey}.position${position}.context`;
};

// Relationship Analysis tarot için i18n hook'u
export const useRelationshipAnalysisTranslations = () => {
  const { t } = useTranslations();

  return {
    getPositionTitle: (position: number): string => {
      return t(getPositionTitleKey(position));
    },

    getPositionDescription: (position: number): string => {
      return t(getPositionDescriptionKey(position));
    },

    getCardGroup: (group: string): string => {
      return t(getCardGroupKey(group));
    },

    getCardMeaning: (
      cardName: string,
      position: number,
      type: 'upright' | 'reversed'
    ): string => {
      const key = getCardMeaningKey(cardName, position, type);
      const translation = t(key);

      if (translation === key) {
        return '';
      }

      return translation;
    },

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
