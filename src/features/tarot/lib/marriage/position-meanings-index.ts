/*
info:
---
Dosya Amacı:
- Evlilik açılımı pozisyon anlamları
- 10 pozisyon için özel evlilik odaklı yorumlar
- Sylvia Abraha kitabından uyarlanmış

Bağlı Dosyalar:
- marriage-config.ts (pozisyon tanımları)
- MarriageTarot.tsx (ana bileşen)
- position-1-sonuc-ne-olacak.ts (1. pozisyon anlamları)
- position-2-esimi-beklerken.ts (2. pozisyon anlamları)
- position-3-mali-kaynaklar.ts (3. pozisyon anlamları)
- position-4-baglanmak-isteyecek-mi.ts (4. pozisyon anlamları)
- position-5-benzer-yanlar.ts (5. pozisyon anlamları)
- position-6-aile-kabul.ts (6. pozisyon anlamları)
- position-7-birbirimizi-bulma.ts (7. pozisyon anlamları)
- position-8-anlasabilme.ts (8. pozisyon anlamları)
- position-9-ideal-es.ts (9. pozisyon anlamları)
- position-10-evlenebilme.ts (10. pozisyon anlamları)

Üretime Hazır mı?:
- Evet, tam anlam seti hazır
---

*/

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import {
  position1Meanings,
  getmarriagePosition1Meaning,
  getmarriagePosition1MeaningByCardName,
} from './position-1-sonuc-ne-olacak';
import { position2Meanings } from './position-2-esimi-beklerken-benim-ne-yapmam-gerekiyor';
import { position3Meanings } from './position-3-mali-kaynaklarimizi-birbirimizle-paylasacakmiyiz';
import { position4Meanings } from './position-4-her-ikimizde-baglanmak-isteyecekmiyiz';
import { position5Meanings } from './position-5-benzer-yanlarimiz-olacak-mi';
import { position6Meanings } from './position-6-bu-kisinin-ailesi-beni-kabul-edecek-mi';
import { position7Meanings } from './position-7-birbirimizi-nasil-bulacagiz';
import { position8Meanings } from './position-8-anlasabilecek-miyim';
import { position9Meanings } from './position-9-benim-icin-nasil-bir-es-uygundur';
import { position10Meanings } from './position-10-evlenebilecek-miyim';


export interface MarriagePositionMeaning {
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
// Evlilik açılımı pozisyon bilgileri
export const marriagePositions = {
  1: {
    title: 'Sonuç ne olacak?',
    description: 'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
    question: 'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
  },
  2: {
    title: 'Eşimi beklerken benim ne yapmam gerekiyor?',
    description: 'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
    question: 'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
  },
  3: {
    title: 'Mali kaynaklarımızı birbirimizle paylaşacak mıyız?',
    description: 'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
    question: 'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
  },
  4: {
    title: 'Her ikimiz de bağlanmak isteyecek miyiz?',
    description: 'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
    question: 'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
  },
  5: {
    title: 'Benzer yanlarımız olacak mı?',
    description: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
    question: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
  },
  6: {
    title: 'Bu kişinin ailesi beni kabul edecek mi?',
    description: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
    question: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
  },
  7: {
    title: 'Birbirimizi nasıl bulacağız?',
    description: 'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
    question: 'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
  },
  8: {
    title: 'Anlaşabilecek miyiz?',
    description: 'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
    question: 'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
  },
  9: {
    title: 'Benim için nasıl bir eş uygundur?',
    description: 'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
    question: 'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
  },
  10: {
    title: 'Evlenebilecek miyim?',
    description: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
    question: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
  },
};
 /**
 * Evlilik açılımında belirli bir kartın belirli pozisyondaki anlamını döndürür
 * @param card - Tarot kartı
 * @param position - Pozisyon numarası (1-10)
 * @param isReversed - Kart ters mi?
 * @returns Pozisyon özel anlam veya null
 */
export function getMarriageMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): MarriagePositionMeaning | null {
  // Pozisyon 1-10 arasında olmalı
  if (position < 1 || position > 10) {
    return null;
  }

  // Kart ismi mapping'ini al
  const cardNameMapping = getCardNameMappingSync();
  
  // Kart ismini İngilizce'ye çevir
  const englishCardName = cardNameMapping[card.nameTr] || card.nameTr;

  // Pozisyon özel anlamları kontrol et
  let positionMeaning = null;

  // Pozisyon anlamları array'ini al
  let positionMeanings: MarriagePositionMeaning[] = [];
  switch (position) {
    case 1:
      positionMeanings = position1Meanings;
      break;
    case 2:
      positionMeanings = position2Meanings;
      break;
    case 3:
      positionMeanings = position3Meanings;
      break;
    case 4:
      positionMeanings = position4Meanings;
      break;
    case 5:
      positionMeanings = position5Meanings;
      break;
    case 6:
      positionMeanings = position6Meanings;
      break;
    case 7:
      positionMeanings = position7Meanings;
      break;
    case 8:
      positionMeanings = position8Meanings;
      break;
    case 9:
      positionMeanings = position9Meanings;
      break;
    case 10:
      positionMeanings = position10Meanings;
      break;
  }

  // Kart anlamını bul
  positionMeaning = positionMeanings.find(
    meaning => meaning.card === englishCardName
  );

  if (positionMeaning) {
    const result = {
      ...positionMeaning,
      cardName: card.nameTr, // cardName alanını ekle
      isReversed: isReversed,
      // upright ve reversed alanlarını orijinal haliyle koru
      upright: positionMeaning.upright,
      reversed: positionMeaning.reversed,
    };
    return result;
  }

  // Fallback: Genel kart anlamlarını döndür
  const baseMeaning: MarriagePositionMeaning = {
    id: `${card.name.toLowerCase().replace(/\s+/g, '_')}_pos${position}`,
    card: card.name,
    cardName: card.nameTr,
    position: position,
    isReversed: isReversed,
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywordsTr || card.keywords || [],
    context: `Evlilik açılımında ${position}. pozisyon (${marriagePositions[position as keyof typeof marriagePositions]?.title}) için ${card.nameTr} kartının anlamı`,
    group: getCardGroup(card),
  };

  const fallbackResult = {
    ...baseMeaning,
    // upright ve reversed alanlarını orijinal haliyle koru
    upright: baseMeaning.upright,
    reversed: baseMeaning.reversed,
  };
  
  return fallbackResult;
}

/**
 * Kartın grubunu belirler
 * @param card - Tarot kartı
 * @returns Kart grubu
 */
function getCardGroup(
  card: TarotCard
): 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar' {
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
}

/**
 * Belirli bir pozisyon için tüm kart anlamlarını getirir
 * @param position - Pozisyon numarası (1-10)
 * @returns Pozisyon anlamları array'i veya null
 */
export function getMarriageMeaningsByPosition(
  position: number
): MarriagePositionMeaning[] | null {
  if (position < 1 || position > 10) {
    return null;
  }

  // Pozisyon özel anlamları döndür
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
    case 10:
      return position10Meanings;
    default:
      return [];
  }
}

/**
 * Belirli bir kart için tüm pozisyon anlamlarını getirir
 * @param card - Tarot kartı
 * @returns Kart anlamları array'i
 */
export function getMarriageMeaningsByCard(
  card: TarotCard
): MarriagePositionMeaning[] {
  const meanings: MarriagePositionMeaning[] = [];

  for (let position = 1; position <= 10; position++) {
    const meaning = getMarriageMeaningByCardAndPosition(card, position);
    if (meaning) {
      meanings.push(meaning);
    }
  }

  return meanings;
}

/**
 * Tüm pozisyon anlamlarını getirir
 * @returns Tüm pozisyon anlamları
 */
export function getAllMarriageMeanings(): Record<
  number,
  MarriagePositionMeaning[]
> {
  const allMeanings: Record<number, MarriagePositionMeaning[]> = {};

  for (let position = 1; position <= 10; position++) {
    allMeanings[position] = getMarriageMeaningsByPosition(position) || [];
  }

  return allMeanings;
}

// Pozisyon bilgilerini alma fonksiyonu
export const getPositionInfo = (position: number) => {
  return marriagePositions[
    position as keyof typeof marriagePositions
  ];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllPositions = () => {
  return Object.entries(marriagePositions).map(([position, info]) => ({
    position: parseInt(position),
    ...info,
  }));
};

// Kart gruplarına göre filtreleme fonksiyonu
export const getMeaningsByGroup = (
  _group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  // Şimdilik boş array döndür, ileride implement edilebilir
  return [];
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  const positionMeanings = getMarriageMeaningsByPosition(position);
  if (!positionMeanings) {
    return [];
  }
  return positionMeanings.filter(meaning => meaning.group === group);
};

// Arama fonksiyonu (kart adına göre)
export const searchMeaningsByCardName = (
  _cardName: string
): MarriagePositionMeaning[] => {
  // Şimdilik boş array döndür, ileride implement edilebilir
  return [];
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchMeaningsByKeyword = (
  _keyword: string
): MarriagePositionMeaning[] => {
  // Şimdilik boş array döndür, ileride implement edilebilir
  return [];
};

// İstatistik fonksiyonları
export const getStatistics = () => {
  const totalPositions = 10;
  const cardsPerPosition = 0; // Şimdilik 0, ileride hesaplanacak

  const groupStats = {
    'Majör Arkana': 0,
    Kupalar: 0,
    Kılıçlar: 0,
    Asalar: 0,
    Tılsımlar: 0,
  };

  return {
    totalCards: 0,
    totalPositions,
    cardsPerPosition,
    groupStats,
  };
};

// Tüm pozisyon anlamlarını birleştiren ana array
export const allMarriagePositionMeanings: MarriagePositionMeaning[] = [
  ...position1Meanings,
  ...position2Meanings,
  ...position3Meanings,
  ...position4Meanings,
  ...position5Meanings,
  ...position6Meanings,
  ...position7Meanings,
  ...position8Meanings,
  ...position9Meanings,
  ...position10Meanings,
];

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getMarriageMeaningByCardNameAndPosition = (
  cardName: string,
  position: number,
  isReversed: boolean = false
): MarriagePositionMeaning | undefined => {
  // Bu fonksiyon TarotCard objesi gerektirir, bu yüzden mock bir obje oluşturuyoruz
  const mockCard: TarotCard = {
    id: 0,
    name: cardName,
    nameTr: cardName,
    suit: 'major', // Varsayılan
    number: 0,
    meaning: {
      upright: 'Temel anlam',
      reversed: 'Ters anlam'
    },
    meaningTr: {
      upright: 'Temel anlam',
      reversed: 'Ters anlam'
    },
    keywords: [],
    keywordsTr: [],
    image: ''
  };

  return getMarriageMeaningByCardAndPosition(mockCard, position, isReversed) || undefined;
};

// Kart gruplarına göre filtreleme fonksiyonu
export const getMarriageMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return allMarriagePositionMeanings.filter(meaning => meaning.group === group);
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getMarriageMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return allMarriagePositionMeanings.filter(
    meaning => meaning.position === position && meaning.group === group
  );
};

// Arama fonksiyonu (kart adına göre)
export const searchMarriageMeaningsByCardName = (
  cardName: string
): MarriagePositionMeaning[] => {
  return allMarriagePositionMeanings.filter(meaning =>
    (meaning.cardName?.toLowerCase().includes(cardName.toLowerCase()) || false) ||
    meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchMarriageMeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return allMarriagePositionMeanings.filter(meaning =>
    meaning.keywords.some(kw =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// İstatistik fonksiyonları
export const getMarriageStatistics = () => {
  const totalCards = allMarriagePositionMeanings.length;
  const totalPositions = 10;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allMarriagePositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allMarriagePositionMeanings.filter(m => m.group === 'Kupalar').length,
    Kılıçlar: allMarriagePositionMeanings.filter(m => m.group === 'Kılıçlar')
      .length,
    Asalar: allMarriagePositionMeanings.filter(m => m.group === 'Asalar').length,
    Tılsımlar: allMarriagePositionMeanings.filter(m => m.group === 'Tılsımlar')
      .length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
    positions: Object.keys(marriagePositions).length,
    groups: ['Majör Arkana', 'Kupalar', 'Kılıçlar', 'Asalar', 'Tılsımlar'],
  };
};

// Varsayılan export
const marriageExports = {
  getMarriageMeaningByCardAndPosition,
  getMarriageMeaningByCardNameAndPosition,
  getMarriageMeaningsByPosition,
  getMarriageMeaningsByCard,
  getAllMarriageMeanings,
  allMarriagePositionMeanings,
  marriagePositions,
  getPositionInfo,
  getAllPositions,
  getMarriageMeaningsByGroup,
  getMarriageMeaningsByPositionAndGroup,
  searchMarriageMeaningsByCardName,
  searchMarriageMeaningsByKeyword,
  getMarriageStatistics,
  // Tüm pozisyon özel fonksiyonları
  getmarriagePosition1Meaning,
  getmarriagePosition1MeaningByCardName,
  position1Meanings,
  position2Meanings,
  position3Meanings,
  position4Meanings,
  position5Meanings,
  position6Meanings,
  position7Meanings,
  position8Meanings,
  position9Meanings,
  position10Meanings,
};

export default marriageExports;
