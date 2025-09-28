/*
info:
Bağlantılı dosyalar:
- '@/lib/types/tarot': Tarot kartı tipi tanımları
- '@/lib/constants/tarotSpreads': Tarot açılım konfigürasyonları

Dosyanın amacı:
- İlişki Analizi (Relationship Analysis) Tarot açılımında her pozisyon için kart anlamlarını yönetir
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
- getRelationshipAnalysisMeaningByCardAndPosition: gerekli
- getRelationshipAnalysisPositions: gerekli
- getRelationshipAnalysisStatistics: gerekli
*/

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import {
  position1Meanings,
  getRelationshipAnalysisPosition1Meaning,
  getRelationshipAnalysisPosition1MeaningByCardName,
} from './position-1-mevcut-durum';
import {
  position2Meanings,
  getRelationshipAnalysisPosition2Meaning,
  getRelationshipAnalysisPosition2MeaningByCardName,
} from './position-2-sizin-hisleriniz';
import {
  position3Meanings,
  getRelationshipAnalysisPosition3Meaning,
  getRelationshipAnalysisPosition3MeaningByCardName,
} from './position-3-sizin-beklentileriniz';
import {
  position4Meanings,
  getRelationshipAnalysisPosition4Meaning,
  getRelationshipAnalysisPosition4MeaningByCardName,
} from './position-4-tavsiyeler';
import {
  position5Meanings,
  getRelationshipAnalysisPosition5Meaning,
  getRelationshipAnalysisPosition5MeaningByCardName,
} from './position-5-yol-haritasi';
import {
  position6Meanings,
  getRelationshipAnalysisPosition6Meaning,
  getRelationshipAnalysisPosition6MeaningByCardName,
} from './position-6-partnerinizin-beklentileri';
import {
  position7Meanings,
  getRelationshipAnalysisPosition7Meaning,
  getRelationshipAnalysisPosition7MeaningByCardName,
} from './position-7-partnerinizin-hisleri';

export interface RelationshipAnalysisPositionMeaning {
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
 * İlişki Analizi açılımında kartın pozisyonuna göre anlamını döndürür
 */
export function getRelationshipAnalysisMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): RelationshipAnalysisPositionMeaning {
  // Debug için console.log ekle
  console.log('🔍 getRelationshipAnalysisMeaningByCardAndPosition called:', {
    cardName: card.name,
    cardNameTr: card.nameTr,
    position,
    isReversed,
  });

  // Pozisyon 1-7 arasında olmalı
  if (position < 1 || position > 7) {
    console.log('❌ Invalid position:', position);
    return {
      id: `relationship-analysis-${position}-${card.id}-${isReversed ? 'reversed' : 'upright'}`,
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
        getRelationshipAnalysisPosition1MeaningByCardName(englishCardName);
      break;
    case 2:
      positionMeaning =
        getRelationshipAnalysisPosition2MeaningByCardName(englishCardName);
      break;
    case 3:
      positionMeaning =
        getRelationshipAnalysisPosition3MeaningByCardName(englishCardName);
      break;
    case 4:
      positionMeaning =
        getRelationshipAnalysisPosition4MeaningByCardName(englishCardName);
      break;
    case 5:
      positionMeaning =
        getRelationshipAnalysisPosition5MeaningByCardName(englishCardName);
      break;
    case 6:
      positionMeaning =
        getRelationshipAnalysisPosition6MeaningByCardName(englishCardName);
      break;
    case 7:
      positionMeaning =
        getRelationshipAnalysisPosition7MeaningByCardName(englishCardName);
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
  const baseMeaning: RelationshipAnalysisPositionMeaning = {
    id: `relationship-analysis-${position}-${card.id}-${isReversed ? 'reversed' : 'upright'}`,
    position: position,
    card: card.name,
    cardName: card.nameTr,
    isReversed,
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywordsTr || card.keywords || [],
    context: `İlişki analizi açılımında ${position}. pozisyon (${relationshipAnalysisPositions[position as keyof typeof relationshipAnalysisPositions]?.title}) için ${card.nameTr} kartının anlamı`,
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
export const relationshipAnalysisPositions = {
  1: {
    title: 'Mevcut Durum',
    description: 'İlişkinizin mevcut şartları ve içinde bulunduğu durum',
    question: 'İlişkinizin şu anki durumu nasıl?',
  },
  2: {
    title: 'Sizin Hissleriniz',
    description:
      'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınız',
    question: 'Partnerinize karşı nasıl hissediyorsunuz?',
  },
  3: {
    title: 'Sizin Beklentileriniz',
    description:
      'İlişkiniz hakkındaki endişeleriniz, beklentileriniz ve hayalleriniz',
    question: 'Bu ilişkiden ne bekliyorsunuz?',
  },
  4: {
    title: 'Tavsiye',
    description:
      'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum tavsiyeleri',
    question: 'Bu durumda nasıl davranmalısınız?',
  },
  5: {
    title: 'Yol Haritası',
    description: 'İlişkide takınmanız gereken tavır ve izlemeniz gereken yol',
    question: 'Bu ilişkide hangi yolu izlemelisiniz?',
  },
  6: {
    title: 'Partnerinizin Beklentileri',
    description:
      'Partnerinizin ilişkiniz hakkındaki endişeleri, beklentileri ve hayalleri',
    question: 'Partneriniz bu ilişkiden ne bekliyor?',
  },
  7: {
    title: 'Partnerinizin Hissleri',
    description: 'Partnerinizin hisleri, düşünceleri ve size bakış açısı',
    question: 'Partneriniz size karşı nasıl hissediyor?',
  },
};

// Pozisyon bilgilerini alma fonksiyonu
export const getRelationshipAnalysisPositionInfo = (position: number) => {
  return relationshipAnalysisPositions[
    position as keyof typeof relationshipAnalysisPositions
  ];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllRelationshipAnalysisPositions = () => {
  return Object.entries(relationshipAnalysisPositions).map(
    ([position, info]) => ({
      position: parseInt(position),
      ...info,
    })
  );
};

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getRelationshipAnalysisMeaningByCardNameAndPosition = (
  cardName: string,
  position: number,
  isReversed: boolean = false
): RelationshipAnalysisPositionMeaning | undefined => {
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

  return getRelationshipAnalysisMeaningByCardAndPosition(
    mockCard,
    position,
    isReversed
  );
};

// Tüm pozisyon anlamlarını birleştiren ana array
export const allRelationshipAnalysisPositionMeanings: RelationshipAnalysisPositionMeaning[] =
  [
    ...position1Meanings,
    ...position2Meanings,
    ...position3Meanings,
    ...position4Meanings,
    ...position5Meanings,
    ...position6Meanings,
    ...position7Meanings,
  ];

// Pozisyon bazlı anlam alma fonksiyonları
export function getRelationshipAnalysisMeaningsByPosition(
  position: number
): RelationshipAnalysisPositionMeaning[] | null {
  if (position < 1 || position > 7) {
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
    default:
      return [];
  }
}

// Kart bazlı anlam alma fonksiyonu
export function getRelationshipAnalysisMeaningsByCard(
  card: TarotCard
): RelationshipAnalysisPositionMeaning[] {
  const meanings: RelationshipAnalysisPositionMeaning[] = [];

  for (let position = 1; position <= 7; position++) {
    const meaning = getRelationshipAnalysisMeaningByCardAndPosition(
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
export function getAllRelationshipAnalysisMeanings(): Record<
  number,
  RelationshipAnalysisPositionMeaning[]
> {
  const allMeanings: Record<number, RelationshipAnalysisPositionMeaning[]> = {};

  for (let position = 1; position <= 7; position++) {
    allMeanings[position] =
      getRelationshipAnalysisMeaningsByPosition(position) || [];
  }

  return allMeanings;
}

// Kart gruplarına göre filtreleme fonksiyonu
export const getRelationshipAnalysisMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return allRelationshipAnalysisPositionMeanings.filter(
    meaning => meaning.group === group
  );
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getRelationshipAnalysisMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return allRelationshipAnalysisPositionMeanings.filter(
    meaning => meaning.position === position && meaning.group === group
  );
};

// Arama fonksiyonu (kart adına göre)
export const searchRelationshipAnalysisMeaningsByCardName = (
  cardName: string
): RelationshipAnalysisPositionMeaning[] => {
  return allRelationshipAnalysisPositionMeanings.filter(
    meaning =>
      meaning.cardName?.toLowerCase().includes(cardName.toLowerCase()) ||
      false ||
      meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchRelationshipAnalysisMeaningsByKeyword = (
  keyword: string
): RelationshipAnalysisPositionMeaning[] => {
  return allRelationshipAnalysisPositionMeanings.filter(meaning =>
    meaning.keywords.some(kw =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// İstatistik fonksiyonları
export const getRelationshipAnalysisStatistics = () => {
  const totalCards = allRelationshipAnalysisPositionMeanings.length;
  const totalPositions = 7;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allRelationshipAnalysisPositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allRelationshipAnalysisPositionMeanings.filter(
      m => m.group === 'Kupalar'
    ).length,
    Kılıçlar: allRelationshipAnalysisPositionMeanings.filter(
      m => m.group === 'Kılıçlar'
    ).length,
    Asalar: allRelationshipAnalysisPositionMeanings.filter(
      m => m.group === 'Asalar'
    ).length,
    Tılsımlar: allRelationshipAnalysisPositionMeanings.filter(
      m => m.group === 'Tılsımlar'
    ).length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
    positions: Object.keys(relationshipAnalysisPositions).length,
    groups: ['Majör Arkana', 'Kupalar', 'Kılıçlar', 'Asalar', 'Tılsımlar'],
  };
};

// Varsayılan export
const relationshipAnalysisExports = {
  getRelationshipAnalysisMeaningByCardAndPosition,
  getRelationshipAnalysisMeaningByCardNameAndPosition,
  getRelationshipAnalysisMeaningsByPosition,
  getRelationshipAnalysisMeaningsByCard,
  getAllRelationshipAnalysisMeanings,
  allRelationshipAnalysisPositionMeanings,
  relationshipAnalysisPositions,
  getRelationshipAnalysisPositionInfo,
  getAllRelationshipAnalysisPositions,
  getRelationshipAnalysisMeaningsByGroup,
  getRelationshipAnalysisMeaningsByPositionAndGroup,
  searchRelationshipAnalysisMeaningsByCardName,
  searchRelationshipAnalysisMeaningsByKeyword,
  getRelationshipAnalysisStatistics,
  // Tüm pozisyon özel fonksiyonları
  getRelationshipAnalysisPosition1Meaning,
  getRelationshipAnalysisPosition1MeaningByCardName,
  position1Meanings,
  getRelationshipAnalysisPosition2Meaning,
  getRelationshipAnalysisPosition2MeaningByCardName,
  position2Meanings,
  getRelationshipAnalysisPosition3Meaning,
  getRelationshipAnalysisPosition3MeaningByCardName,
  position3Meanings,
  getRelationshipAnalysisPosition4Meaning,
  getRelationshipAnalysisPosition4MeaningByCardName,
  position4Meanings,
  getRelationshipAnalysisPosition5Meaning,
  getRelationshipAnalysisPosition5MeaningByCardName,
  position5Meanings,
  getRelationshipAnalysisPosition6Meaning,
  getRelationshipAnalysisPosition6MeaningByCardName,
  position6Meanings,
  getRelationshipAnalysisPosition7Meaning,
  getRelationshipAnalysisPosition7MeaningByCardName,
  position7Meanings,
};

export default relationshipAnalysisExports;
