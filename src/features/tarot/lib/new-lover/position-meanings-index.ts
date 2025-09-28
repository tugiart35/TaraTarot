/*
info:
---
Dosya Amacı:
- Yeni Bir Sevgili açılımı tarot açılımında her pozisyon için kart anlamlarını birleştirir
- Pozisyona, karta, anahtar kelimeye veya gruba göre anlam arama ve filtreleme fonksiyonları sunar
- Pozisyon başlıkları, açıklamaları ve ilgili meta verileri içerir

Bağlı Dosyalar:
- NewLoverTarot.tsx (ana bileşen)
- new-lover-config.ts (konfigürasyon)
- messages/tr.json (çeviriler)
- position-1-yeni-bir-sevgili-yaklasacak-mi.ts (1. pozisyon anlamları)
- position-2-bu-kisi-nasil-biri.ts (2. pozisyon anlamları)
- position-3-bu-kisiyle-uyumlu-muyum.ts (3. pozisyon anlamları)
- position-4-bu-iliskinin-suresi-ne-kadar.ts (4. pozisyon anlamları)
- position-5-bu-kisi-ruh-esim-olabilir-mi.ts (5. pozisyon anlamları)
- position-6-dilegim-gerceklesecek-mi.ts (6. pozisyon anlamları)

Üretime Hazır mı?:
- Evet, tüm pozisyon anlamları ve arama fonksiyonları tamamlandı
---

*/

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import { position1Meanings } from './position-1-yakinda-yeni-bir-iliskiye';
import { position2Meanings } from './position-2-bu-kisi-hangi-burçtan';
import { position3Meanings } from './position-3-birbirimize-uyumlu-olabilecekmiyiz';
import { position4Meanings } from './position-4-uzun-sureli-iliskim-olacak-mi';
import { position5Meanings } from './position-5-bu-kisi-ruh-esim-olabilirmi';
import { position6Meanings } from './position-6-dilegim-gerceklesecek-mi';

export interface NewLoverPositionMeaning {
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

// Yeni Bir Sevgili açılımı pozisyon bilgileri
export const newLoverPositions = {
  1: {
    title: 'Yeni Bir Sevgili Yaklaşacak mı?',
    description:
      'Yakın gelecekte yeni bir aşk ilişkisi başlayıp başlamayacağını gösterir',
    question: 'Yakın gelecekte yeni bir sevgiliyle tanışacak mısınız?',
  },
  2: {
    title: 'Bu Kişi Nasıl Biri?',
    description:
      'Yeni sevgilinizin kişilik özelliklerini ve karakterini gösterir',
    question: 'Yeni sevgiliniz nasıl bir kişilik olacak?',
  },
  3: {
    title: 'Bu Kişiyle Uyumlu muyum?',
    description: 'Yeni sevgilinizle uyumunuzu ve uyumluluğunuzu gösterir',
    question: 'Bu kişiyle ne kadar uyumlu olacaksınız?',
  },
  4: {
    title: 'Bu İlişkinin Süresi Ne Kadar?',
    description: 'İlişkinizin süresini ve kalıcılığını gösterir',
    question: 'Bu ilişki ne kadar sürecek?',
  },
  5: {
    title: 'Bu Kişi Ruh Eşim Olabilir mi?',
    description: 'Bu kişinin ruh eşiniz olup olmadığını gösterir',
    question: 'Bu kişi sizin ruh eşiniz olabilir mi?',
  },
  6: {
    title: 'Dileğim Gerçekleşecek mi?',
    description: 'Aşk dileğinizin gerçekleşip gerçekleşmeyeceğini gösterir',
    question: 'Aşk dileğiniz gerçekleşecek mi?',
  },
};

/**
 * Yeni Bir Sevgili açılımı pozisyon anlamları
 * Her pozisyon için kart anlamlarını içerir
 */
export const NEW_LOVER_POSITION_MEANINGS: Record<
  string,
  NewLoverPositionMeaning[]
> = {
  '1': position1Meanings,
  '2': position2Meanings,
  '3': position3Meanings,
  '4': position4Meanings,
  '5': position5Meanings,
  '6': position6Meanings,
};

/**
 * Yeni Bir Sevgili açılımında belirli bir kartın belirli pozisyondaki anlamını döndürür
 * @param card - Tarot kartı
 * @param position - Pozisyon numarası (1-6)
 * @param isReversed - Kart ters mi?
 * @returns Pozisyon özel anlam veya null
 */
export function getNewLoverMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): NewLoverPositionMeaning | null {
  // Pozisyon 1-6 arasında olmalı
  if (position < 1 || position > 6) {
    return null;
  }

  // Kart ismi mapping'ini al
  const cardNameMapping = getCardNameMappingSync();

  // Kart ismini İngilizce'ye çevir
  const englishCardName = cardNameMapping[card.nameTr] || card.nameTr;

  // Pozisyon özel anlamları kontrol et
  const positionMeanings =
    NEW_LOVER_POSITION_MEANINGS[position.toString()] || [];
  const positionMeaning = positionMeanings.find(
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
  const baseMeaning: NewLoverPositionMeaning = {
    id: `${card.name.toLowerCase().replace(/\s+/g, '_')}_pos${position}`,
    card: card.name,
    cardName: card.nameTr,
    position: position,
    isReversed: isReversed,
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywordsTr || card.keywords || [],
    context: `Yeni bir sevgili açılımında ${position}. pozisyon (${newLoverPositions[position as keyof typeof newLoverPositions]?.title}) için ${card.nameTr} kartının anlamı`,
    group: getCardGroup(card),
  };

  const fallbackResult = {
    ...baseMeaning,
    upright: isReversed ? baseMeaning.reversed : baseMeaning.upright,
    reversed: isReversed ? baseMeaning.upright : baseMeaning.reversed,
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
 * Yeni Bir Sevgili açılımı pozisyon anlamlarını al
 */
export function getNewLoverPositionMeanings(
  position: number
): NewLoverPositionMeaning[] {
  return NEW_LOVER_POSITION_MEANINGS[position.toString()] || [];
}

/**
 * Belirli bir kart için tüm pozisyon anlamlarını getirir
 * @param card - Tarot kartı
 * @returns Kart anlamları array'i
 */
export function getNewLoverMeaningsByCard(
  card: TarotCard
): NewLoverPositionMeaning[] {
  const meanings: NewLoverPositionMeaning[] = [];

  for (let position = 1; position <= 6; position++) {
    const meaning = getNewLoverMeaningByCardAndPosition(card, position);
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
export function getAllNewLoverMeanings(): Record<
  number,
  NewLoverPositionMeaning[]
> {
  const allMeanings: Record<number, NewLoverPositionMeaning[]> = {};

  for (let position = 1; position <= 6; position++) {
    allMeanings[position] = getNewLoverPositionMeanings(position) || [];
  }

  return allMeanings;
}

// Pozisyon bilgilerini alma fonksiyonu
export const getPositionInfo = (position: number) => {
  return newLoverPositions[position as keyof typeof newLoverPositions];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllPositions = () => {
  return Object.entries(newLoverPositions).map(([position, info]) => ({
    position: parseInt(position),
    ...info,
  }));
};

// Tüm pozisyon anlamlarını birleştiren ana array
export const allNewLoverPositionMeanings: NewLoverPositionMeaning[] = [];
Object.values(NEW_LOVER_POSITION_MEANINGS).forEach(meanings => {
  allNewLoverPositionMeanings.push(...meanings);
});

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getNewLoverMeaningByCardNameAndPosition = (
  cardName: string,
  position: number,
  isReversed: boolean = false
): NewLoverPositionMeaning | undefined => {
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

  return (
    getNewLoverMeaningByCardAndPosition(mockCard, position, isReversed) ||
    undefined
  );
};

// Kart gruplarına göre filtreleme fonksiyonu
export const getNewLoverMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverPositionMeaning[] => {
  return allNewLoverPositionMeanings.filter(meaning => meaning.group === group);
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getNewLoverMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverPositionMeaning[] => {
  return allNewLoverPositionMeanings.filter(
    meaning => meaning.position === position && meaning.group === group
  );
};

// Arama fonksiyonu (kart adına göre)
export const searchNewLoverMeaningsByCardName = (
  cardName: string
): NewLoverPositionMeaning[] => {
  return allNewLoverPositionMeanings.filter(
    meaning =>
      meaning.cardName?.toLowerCase().includes(cardName.toLowerCase()) ||
      meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchNewLoverMeaningsByKeyword = (
  keyword: string
): NewLoverPositionMeaning[] => {
  return allNewLoverPositionMeanings.filter(
    meaning =>
      meaning.keywords.some(kw =>
        kw.toLowerCase().includes(keyword.toLowerCase())
      ) ||
      meaning.upright.toLowerCase().includes(keyword.toLowerCase()) ||
      meaning.reversed.toLowerCase().includes(keyword.toLowerCase())
  );
};

// İstatistik fonksiyonları
export const getNewLoverStatistics = () => {
  const totalCards = allNewLoverPositionMeanings.length;
  const totalPositions = 6;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allNewLoverPositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allNewLoverPositionMeanings.filter(m => m.group === 'Kupalar')
      .length,
    Kılıçlar: allNewLoverPositionMeanings.filter(m => m.group === 'Kılıçlar')
      .length,
    Asalar: allNewLoverPositionMeanings.filter(m => m.group === 'Asalar')
      .length,
    Tılsımlar: allNewLoverPositionMeanings.filter(m => m.group === 'Tılsımlar')
      .length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
    positions: Object.keys(newLoverPositions).length,
    groups: ['Majör Arkana', 'Kupalar', 'Kılıçlar', 'Asalar', 'Tılsımlar'],
  };
};

// Varsayılan export
const newLoverExports = {
  getNewLoverMeaningByCardAndPosition,
  getNewLoverMeaningByCardNameAndPosition,
  getNewLoverPositionMeanings,
  getNewLoverMeaningsByCard,
  getAllNewLoverMeanings,
  allNewLoverPositionMeanings,
  newLoverPositions,
  getPositionInfo,
  getAllPositions,
  getNewLoverMeaningsByGroup,
  getNewLoverMeaningsByPositionAndGroup,
  searchNewLoverMeaningsByCardName,
  searchNewLoverMeaningsByKeyword,
  getNewLoverStatistics,
  // Eski fonksiyonlar (geriye uyumluluk için)
  getNewLoverCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getNewLoverMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );
    return meaning ? (isReversed ? meaning.reversed : meaning.upright) : '';
  },
};

export default newLoverExports;
