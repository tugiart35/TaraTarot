'use client';

/*
info:
Bağlantılı dosyalar:
- '@/types/tarot': Tarot kartı tipi tanımları
- '@/features/tarot/lib/love/card-name-mapping': Kart ismi mapping sistemi
- position-1-celiski-nedir.ts: 1. pozisyon anlamları
- position-2-sorunu-benmi-yarattim.ts: 2. pozisyon anlamları
- position-3-sorunu-benmi-yarattim.ts: 3. pozisyon anlamları
- position-4-bu-sorundaki-payimi-gormezden.ts: 4. pozisyon anlamları
- position-5-birlikte-oldugum-kisiye.ts: 5. pozisyon anlamları
- position-6-birbirimizi-suistimal.ts: 6. pozisyon anlamları
- position-7-sorunumuza-karisan-baska.ts: 7. pozisyon anlamları
- position-8-iliskimizi-etkileyen-maddi.ts: 8. pozisyon anlamları
- position-9-bu-iliski-surecek-mi.ts: 9. pozisyon anlamları

Dosyanın amacı:
- İlişki Sorunları (Relationship Problems) Tarot açılımında her pozisyon için kart anlamlarını yönetir
- Pozisyona, karta, anahtar kelimeye göre anlam arama ve filtreleme fonksiyonları sunar
- Pozisyon başlıkları, açıklamaları ve ilgili meta verileri içerir
- i18n desteği ile çoklu dil desteği sağlar

Supabase değişkenleri ve tablolar:
- Bu dosya sadece frontend tarafında kullanılır, doğrudan Supabase bağlantısı yok

Geliştirme önerileri:
- i18n desteği eklenebilir
- Kart ismi mapping sistemi genişletilebilir
- Arama ve filtreleme fonksiyonları geliştirilebilir

Tespit edilen hatalar:
- Yok

Kullanım durumları:
- getRelationshipProblemsMeaningByCardAndPosition: gerekli
- getRelationshipProblemsPositions: gerekli
- getRelationshipProblemsStatistics: gerekli
*/

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import {
  position1Meanings,
  getRelationshipProblemsPosition1Meaning,
  getRelationshipProblemsPosition1MeaningByCardName,
} from './position-1-celiski-nedir';
import {
  position2Meanings,
  getRelationshipProblemsposition2Meaning,
  getRelationshipProblemsposition2MeaningByCardName,
} from './position-2-sorunu-benmi-yarattim';
import {
  position3Meanings,
  getRelationshipProblemsposition3Meaning,
  getRelationshipProblemsposition3MeaningByCardName,
} from './position-3-sorunu-benmi-yarattim';
import {
  position4Meanings,
  getRelationshipProblemsposition4Meaning,
  getRelationshipProblemsposition4MeaningByCardName,
} from './position-4-bu-sorundaki-payimi-gormezden';
import {
  position5Meanings,
  getRelationshipProblemsposition5Meaning,
  getRelationshipProblemsposition5MeaningByCardName,
} from './position-5-birlikte-oldugum-kisiye';
import {
  position6Meanings,
  getRelationshipProblemsposition6Meaning,
  getRelationshipProblemsposition6MeaningByCardName,
} from './position-6-birbirimizi-suistimal';
import {
  position7Meanings,
  getRelationshipProblemsposition7Meaning,
  getRelationshipProblemsposition7MeaningByCardName,
} from './position-7-sorunumuza-karisan-baska';
import {
  position8Meanings,
  getRelationshipProblemsposition8Meaning,
  getRelationshipProblemsposition8MeaningByCardName,
} from './position-8-iliskimizi-etkileyen-maddi';
import {
  position9Meanings,
  getRelationshipProblemsposition9Meaning,
  getRelationshipProblemsposition9MeaningByCardName,
} from './position-9-bu-iliski-surecek-mi';

export interface RelationshipProblemsPositionMeaning {
  id: string;
  position: number;
  card: string;
  cardName?: string; // Optional - position dosyalarında yok
  isReversed?: boolean; // Optional - position dosyalarında yok
  upright: string;
  reversed: string;
  keywords: string[];
  advice?: string;
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// Kart grubunu belirleme fonksiyonu
function getCardGroup(
  card: TarotCard | string
): 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar' {
  if (typeof card === 'object') {
    // TarotCard objesi ise
    if (card.suit === 'major') {
      return 'Majör Arkana';
    }
    if (card.suit === 'cups') {
      return 'Kupalar';
    }
    if (card.suit === 'swords') {
      return 'Kılıçlar';
    }
    if (card.suit === 'wands') {
      return 'Asalar';
    }
    if (card.suit === 'pentacles') {
      return 'Tılsımlar';
    }
    return 'Majör Arkana'; // fallback
  } else {
    // String ise
    const name = card.toLowerCase();

    if (
      name.includes('kupalar') ||
      name.includes('kadehler') ||
      name.includes('pehara')
    ) {
      return 'Kupalar';
    } else if (name.includes('kılıçlar') || name.includes('mačeva')) {
      return 'Kılıçlar';
    } else if (name.includes('asalar') || name.includes('štapova')) {
      return 'Asalar';
    } else if (
      name.includes('tılsımlar') ||
      name.includes('altınlar') ||
      name.includes('pentakla')
    ) {
      return 'Tılsımlar';
    } else {
      return 'Majör Arkana';
    }
  }
}

/**
 * İlişki Sorunları açılımında kartın pozisyonuna göre anlamını döndürür
 */
export function getRelationshipProblemsMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): RelationshipProblemsPositionMeaning {
  // Debug için console.log ekle
  console.log('🔍 getRelationshipProblemsMeaningByCardAndPosition called:', {
    cardName: card.name,
    cardNameTr: card.nameTr,
    position,
    isReversed,
  });

  // Pozisyon 1-9 arasında olmalı
  if (position < 1 || position > 9) {
    console.log('❌ Invalid position:', position);
    return {
      id: `relationship-problems-${position}-${card.id}-${isReversed ? 'reversed' : 'upright'}`,
      position: 0,
      card: card.name,
      cardName: card.nameTr,
      isReversed,
      upright: card.meaningTr.upright,
      reversed: card.meaningTr.reversed,
      keywords: card.keywordsTr || card.keywords || [],
      advice: 'Bu pozisyon için özel bir anlam tanımlanmamış.',
      context: 'Tanımlanmamış pozisyon',
      group: getCardGroup(card),
    };
  }

  // Kart ismi mapping'ini al
  const cardNameMapping = getCardNameMappingSync();

  // Kart ismini İngilizce'ye çevir - önce nameTr'yi dene, sonra name'i
  const englishCardName =
    cardNameMapping[card.nameTr] || cardNameMapping[card.name] || card.name;
  console.log('🔄 Card name mapping:', {
    original: card.nameTr,
    originalName: card.name,
    mapped: englishCardName,
  });

  // Pozisyon özel anlamları kontrol et
  let positionMeaning = null;

  switch (position) {
    case 1:
      positionMeaning =
        getRelationshipProblemsPosition1MeaningByCardName(englishCardName);
      break;
    case 2:
      positionMeaning =
        getRelationshipProblemsposition2MeaningByCardName(englishCardName);
      break;
    case 3:
      positionMeaning =
        getRelationshipProblemsposition3MeaningByCardName(englishCardName);
      break;
    case 4:
      positionMeaning =
        getRelationshipProblemsposition4MeaningByCardName(englishCardName);
      break;
    case 5:
      positionMeaning =
        getRelationshipProblemsposition5MeaningByCardName(englishCardName);
      break;
    case 6:
      positionMeaning =
        getRelationshipProblemsposition6MeaningByCardName(englishCardName);
      break;
    case 7:
      positionMeaning =
        getRelationshipProblemsposition7MeaningByCardName(englishCardName);
      break;
    case 8:
      positionMeaning =
        getRelationshipProblemsposition8MeaningByCardName(englishCardName);
      break;
    case 9:
      positionMeaning =
        getRelationshipProblemsposition9MeaningByCardName(englishCardName);
      break;
  }

  console.log('🎯 Position meaning found:', positionMeaning ? 'YES' : 'NO');

  if (positionMeaning) {
    const result = {
      ...positionMeaning,
      cardName: card.nameTr, // cardName alanını ekle
      upright: isReversed ? positionMeaning.reversed : positionMeaning.upright,
      reversed: isReversed ? positionMeaning.upright : positionMeaning.reversed,
    };
    console.log(
      '✅ Returning position-specific meaning:',
      result.upright.substring(0, 50) + '...'
    );
    return result;
  }

  // Fallback: Genel kart anlamlarını döndür
  const baseMeaning: RelationshipProblemsPositionMeaning = {
    id: `relationship-problems-${position}-${card.id}-${isReversed ? 'reversed' : 'upright'}`,
    position: position,
    card: card.name,
    cardName: card.nameTr,
    isReversed,
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywordsTr || card.keywords || [],
    context: `İlişki sorunları açılımında ${position}. pozisyon için ${card.nameTr} kartının anlamı`,
    group: getCardGroup(card),
  };

  const fallbackResult = {
    ...baseMeaning,
    upright: isReversed ? baseMeaning.reversed : baseMeaning.upright,
    reversed: isReversed ? baseMeaning.upright : baseMeaning.reversed,
  };

  console.log(
    '⚠️ Returning fallback meaning:',
    fallbackResult.upright.substring(0, 50) + '...'
  );
  return fallbackResult;
}

// Pozisyon bilgileri ve açıklamaları
export const relationshipProblemsPositions = {
  1: {
    title: 'Çelişki nedir?',
    description: 'İlişkinizdeki temel çelişki ve çatışma noktaları',
    question: 'Hangi konularda anlaşamıyorsunuz?',
  },
  2: {
    title: 'Sorunu ben mi yarattım?',
    description: 'Sorunun kaynağında sizin payınız',
    question: 'Bu soruna nasıl katkıda bulundunuz?',
  },
  3: {
    title: 'Sorunu ben mi yarattım?',
    description: 'Kendi sorumluluğunuz ve davranışlarınız',
    question: 'Kendi hatalarınızı kabul ediyor musunuz?',
  },
  4: {
    title: 'Bu sorundaki payımı görmezden mi geliyorum?',
    description: 'Kendi sorumluluğunuzu kabul etme durumu',
    question: 'Kendi hatalarınızı görmezden mi geliyorsunuz?',
  },
  5: {
    title: 'Birlikte olduğum kişiyle geçmişteki deneyimlerim',
    description: 'Geçmiş deneyimlerin bugüne etkisi',
    question: 'Geçmiş deneyimleriniz şimdiki sorunu etkiliyor mu?',
  },
  6: {
    title: 'Birbirimizi suistimal mi ediyoruz?',
    description: 'Karşılıklı saygı ve sınırlar',
    question: 'Birbirinize zarar veriyor musunuz?',
  },
  7: {
    title: 'Sorunumuza karışan başka insanlar var mı?',
    description: 'Dış faktörler ve üçüncü kişiler',
    question: 'Başkaları ilişkinizi etkiliyor mu?',
  },
  8: {
    title: 'İlişkimizi etkileyen maddi sorunlar var mı?',
    description: 'Para, iş ve maddi durumun etkisi',
    question: 'Maddi sorunlar ilişkinizi zorluyor mu?',
  },
  9: {
    title: 'Bu ilişki sürecek mi?',
    description: 'İlişkinizin geleceği ve potansiyeli',
    question: 'Bu ilişki devam edecek mi?',
  },
};

// Pozisyon bilgilerini alma fonksiyonu
export const getRelationshipProblemsPositionInfo = (position: number) => {
  return relationshipProblemsPositions[
    position as keyof typeof relationshipProblemsPositions
  ];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllRelationshipProblemsPositions = () => {
  return Object.entries(relationshipProblemsPositions).map(
    ([position, info]) => ({
      position: parseInt(position),
      ...info,
    })
  );
};

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getRelationshipProblemsMeaningByCardNameAndPosition = (
  cardName: string,
  position: number,
  isReversed: boolean = false
): RelationshipProblemsPositionMeaning | undefined => {
  // Bu fonksiyon TarotCard objesi gerektirir, bu yüzden mock bir obje oluşturuyoruz
  const mockCard: TarotCard = {
    id: 0,
    name: cardName,
    nameTr: cardName,
    suit: 'major', // Varsayılan
    number: 0,
    meaning: {
      upright: 'Temel anlam',
      reversed: 'Ters anlam',
    },
    meaningTr: {
      upright: 'Temel anlam',
      reversed: 'Ters anlam',
    },
    keywords: [],
    keywordsTr: [],
    image: '',
  };

  return getRelationshipProblemsMeaningByCardAndPosition(
    mockCard,
    position,
    isReversed
  );
};

// Tüm pozisyon anlamlarını birleştiren ana array
export const allRelationshipProblemsPositionMeanings: RelationshipProblemsPositionMeaning[] =
  [
    ...position1Meanings,
    ...position2Meanings,
    ...position3Meanings,
    ...position4Meanings,
    ...position5Meanings,
    ...position6Meanings,
    ...position7Meanings,
    ...position8Meanings,
    ...position9Meanings,
  ];

// Pozisyon bazlı anlam alma fonksiyonları
export function getRelationshipProblemsMeaningsByPosition(
  position: number
): RelationshipProblemsPositionMeaning[] | null {
  if (position < 1 || position > 9) {
    return null;
  }

  switch (position) {
    case 1:
      return position1Meanings;
    case 2:
      return position2Meanings;
    case 3:
      return position3Meanings;
    case 4:
      return position4Meanings;
    case 5:
      return position5Meanings;
    case 6:
      return position6Meanings;
    case 7:
      return position7Meanings;
    case 8:
      return position8Meanings;
    case 9:
      return position9Meanings;
    default:
      return [];
  }
}

// Kart bazlı anlam alma fonksiyonu
export function getRelationshipProblemsMeaningsByCard(
  card: TarotCard
): RelationshipProblemsPositionMeaning[] {
  const meanings: RelationshipProblemsPositionMeaning[] = [];

  for (let position = 1; position <= 9; position++) {
    const meaning = getRelationshipProblemsMeaningByCardAndPosition(
      card,
      position
    );
    if (meaning) {
      meanings.push(meaning);
    }
  }

  return meanings;
}

// Tüm anlamları alma fonksiyonu
export function getAllRelationshipProblemsMeanings(): Record<
  number,
  RelationshipProblemsPositionMeaning[]
> {
  const allMeanings: Record<number, RelationshipProblemsPositionMeaning[]> = {};

  for (let position = 1; position <= 9; position++) {
    allMeanings[position] =
      getRelationshipProblemsMeaningsByPosition(position) || [];
  }

  return allMeanings;
}

// Kart gruplarına göre filtreleme fonksiyonu
export const getRelationshipProblemsMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return allRelationshipProblemsPositionMeanings.filter(
    meaning => meaning.group === group
  );
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getRelationshipProblemsMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return allRelationshipProblemsPositionMeanings.filter(
    meaning => meaning.position === position && meaning.group === group
  );
};

// Arama fonksiyonu (kart adına göre)
export const searchRelationshipProblemsMeaningsByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning[] => {
  return allRelationshipProblemsPositionMeanings.filter(
    meaning =>
      meaning.cardName?.toLowerCase().includes(cardName.toLowerCase()) ||
      false ||
      meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchRelationshipProblemsMeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return allRelationshipProblemsPositionMeanings.filter(meaning =>
    meaning.keywords.some(kw =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// İstatistik fonksiyonları
export const getRelationshipProblemsStatistics = () => {
  const totalCards = allRelationshipProblemsPositionMeanings.length;
  const totalPositions = 9;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allRelationshipProblemsPositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allRelationshipProblemsPositionMeanings.filter(
      m => m.group === 'Kupalar'
    ).length,
    Kılıçlar: allRelationshipProblemsPositionMeanings.filter(
      m => m.group === 'Kılıçlar'
    ).length,
    Asalar: allRelationshipProblemsPositionMeanings.filter(
      m => m.group === 'Asalar'
    ).length,
    Tılsımlar: allRelationshipProblemsPositionMeanings.filter(
      m => m.group === 'Tılsımlar'
    ).length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
    positions: Object.keys(relationshipProblemsPositions).length,
    groups: ['Majör Arkana', 'Kupalar', 'Kılıçlar', 'Asalar', 'Tılsımlar'],
  };
};

/**
 * i18n destekli Relationship Problems anlam fonksiyonu
 * @param cardName - Kart adı (örn: "The Fool")
 * @param position - Pozisyon numarası (1-9)
 * @param t - i18n translate fonksiyonu
 * @returns i18n destekli anlam veya null
 */
export const getI18nRelationshipProblemsMeaningByCardAndPosition = (
  cardName: string,
  position: number,
  t: (_key: string) => string
): RelationshipProblemsPositionMeaning | null => {
  // Orijinal anlamı al
  let originalMeaning: RelationshipProblemsPositionMeaning | null = null;

  switch (position) {
    case 1:
      originalMeaning =
        getRelationshipProblemsPosition1MeaningByCardName(cardName);
      break;
    case 2:
      originalMeaning =
        getRelationshipProblemsposition2MeaningByCardName(cardName);
      break;
    case 3:
      originalMeaning =
        getRelationshipProblemsposition3MeaningByCardName(cardName);
      break;
    case 4:
      originalMeaning =
        getRelationshipProblemsposition4MeaningByCardName(cardName);
      break;
    case 5:
      originalMeaning =
        getRelationshipProblemsposition5MeaningByCardName(cardName);
      break;
    case 6:
      originalMeaning =
        getRelationshipProblemsposition6MeaningByCardName(cardName);
      break;
    case 7:
      originalMeaning =
        getRelationshipProblemsposition7MeaningByCardName(cardName);
      break;
    case 8:
      originalMeaning =
        getRelationshipProblemsposition8MeaningByCardName(cardName);
      break;
    case 9:
      originalMeaning =
        getRelationshipProblemsposition9MeaningByCardName(cardName);
      break;
    default:
      return null;
  }

  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');

  const i18nUpright = t(
    `relationship-problems.meanings.${cardKey}.position${position}.upright`
  );
  const i18nReversed = t(
    `relationship-problems.meanings.${cardKey}.position${position}.reversed`
  );
  const i18nKeywords = t(
    `relationship-problems.meanings.${cardKey}.position${position}.keywords`
  );
  const i18nContext = t(
    `relationship-problems.meanings.${cardKey}.position${position}.context`
  );

  // i18n çevirisi mevcut değilse orijinali kullan
  const isI18nAvailable =
    i18nUpright && !i18nUpright.startsWith('relationship-problems.meanings.');

  return {
    ...originalMeaning,
    upright: isI18nAvailable ? i18nUpright : originalMeaning.upright,
    reversed:
      i18nReversed &&
      !i18nReversed.startsWith('relationship-problems.meanings.')
        ? i18nReversed
        : originalMeaning.reversed,
    keywords: (() => {
      if (
        !i18nKeywords ||
        i18nKeywords.startsWith('relationship-problems.meanings.')
      ) {
        return originalMeaning.keywords;
      }
      // Keywords zaten array olabilir veya JSON string olabilir
      if (Array.isArray(i18nKeywords)) {
        return i18nKeywords;
      }
      try {
        const parsed = JSON.parse(i18nKeywords);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return originalMeaning.keywords;
      } catch (error) {
        console.error(
          `[Relationship Problems Position ${position}] Failed to parse keywords for ${cardName}:`,
          error
        );
        return originalMeaning.keywords;
      }
    })(),
    context:
      i18nContext &&
      !i18nContext.startsWith('relationship-problems.meanings.')
        ? i18nContext
        : originalMeaning.context,
  };
};

// Varsayılan export
const relationshipProblemsExports = {
  getRelationshipProblemsMeaningByCardAndPosition,
  getRelationshipProblemsMeaningByCardNameAndPosition,
  getRelationshipProblemsMeaningsByPosition,
  getRelationshipProblemsMeaningsByCard,
  getAllRelationshipProblemsMeanings,
  allRelationshipProblemsPositionMeanings,
  relationshipProblemsPositions,
  getRelationshipProblemsPositionInfo,
  getAllRelationshipProblemsPositions,
  getRelationshipProblemsMeaningsByGroup,
  getRelationshipProblemsMeaningsByPositionAndGroup,
  searchRelationshipProblemsMeaningsByCardName,
  searchRelationshipProblemsMeaningsByKeyword,
  getRelationshipProblemsStatistics,
  // i18n destekli fonksiyon
  getI18nRelationshipProblemsMeaningByCardAndPosition,
  // Tüm pozisyon özel fonksiyonları
  getRelationshipProblemsPosition1Meaning,
  getRelationshipProblemsPosition1MeaningByCardName,
  position1Meanings,
  getRelationshipProblemsposition2Meaning,
  getRelationshipProblemsposition2MeaningByCardName,
  position2Meanings,
  getRelationshipProblemsposition3Meaning,
  getRelationshipProblemsposition3MeaningByCardName,
  position3Meanings,
  getRelationshipProblemsposition4Meaning,
  getRelationshipProblemsposition4MeaningByCardName,
  position4Meanings,
  getRelationshipProblemsposition5Meaning,
  getRelationshipProblemsposition5MeaningByCardName,
  position5Meanings,
  getRelationshipProblemsposition6Meaning,
  getRelationshipProblemsposition6MeaningByCardName,
  position6Meanings,
  getRelationshipProblemsposition7Meaning,
  getRelationshipProblemsposition7MeaningByCardName,
  position7Meanings,
  getRelationshipProblemsposition8Meaning,
  getRelationshipProblemsposition8MeaningByCardName,
  position8Meanings,
  getRelationshipProblemsposition9Meaning,
  getRelationshipProblemsposition9MeaningByCardName,
  position9Meanings,
};

export default relationshipProblemsExports;
