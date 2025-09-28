/*
info:
---
Dosya Amacı:
- Para Açılımı tarot açılımında her pozisyon için kart anlamlarını birleştirir
- Pozisyona, karta, anahtar kelimeye veya gruba göre anlam arama ve filtreleme fonksiyonları sunar
- Pozisyon başlıkları, açıklamaları ve ilgili meta verileri içerir

Bağlı Dosyalar:
- MoneyTarot.tsx (ana bileşen)
- money-config.ts (konfigürasyon)
- messages/tr.json (çeviriler)
- position-1-mevcut-finansal-durum.ts (1. pozisyon anlamları)
- position-2-para-akisi.ts (2. pozisyon anlamları)
- position-3-finansal-engeller.ts (3. pozisyon anlamları)
- position-4-firsatlar.ts (4. pozisyon anlamları)
- position-5-yakin-gelecek.ts (5. pozisyon anlamları)
- position-6-yeni-mali-planlar.ts (6. pozisyon anlamları)
- position-7-gelecek-para-planlari.ts (7. pozisyon anlamları)
- position-8-para-kazanma-yetenekleri.ts (8. pozisyon anlamları)

Üretime Hazır mı?:
- Evet, tüm pozisyon anlamları ve arama fonksiyonları tamamlandı
---

*/

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import { position1Meanings } from './position-1-mevcut-finansal-durum';
import { position2Meanings } from './position-2-para-akisi';
import { position3Meanings } from './position-3-finansal-engeller';
import { position4Meanings } from './position-4-firsatlar';
import { Position5Meanings } from './position-5-yakin-gelecek';
import { Position6Meanings } from './position-6-yeni-mali-planlar';
import { Position7Meanings } from './position-7-gelecek-para-planlari';
import { position8meanings } from './position-8-para-kazanma-yetenekleri';

export interface MoneyPositionMeaning {
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

// Para Açılımı pozisyon bilgileri
export const moneyPositions = {
  1: {
    title: 'Mevcut Finansal Durum',
    description:
      'Şu anki finansal durumunuz ve para konusundaki mevcut durumunuz',
    question: 'Şu anda finansal durumunuz nasıl?',
  },
  2: {
    title: 'Para Akışı',
    description: 'Gelir ve giderlerinizin akışı ve dengesi',
    question: 'Para akışınız nasıl?',
  },
  3: {
    title: 'Finansal Engeller',
    description: 'Para konusunda karşılaştığınız engeller ve zorluklar',
    question: 'Hangi finansal engellerle karşılaşıyorsunuz?',
  },
  4: {
    title: 'Fırsatlar',
    description: 'Para kazanma ve yatırım fırsatları',
    question: 'Hangi finansal fırsatlar var?',
  },
  5: {
    title: 'Yakın Gelecek',
    description: 'Yakın gelecekteki finansal durumunuz',
    question: 'Yakın gelecekte finansal durumunuz nasıl olacak?',
  },
  6: {
    title: 'Yeni Mali Planlar',
    description: 'Yeni mali planlarınız ve yatırımlarınız',
    question: 'Hangi yeni mali planlar yapıyorsunuz?',
  },
  7: {
    title: 'Gelecek Para Planları',
    description: 'Gelecekteki para planlarınız ve hedefleriniz',
    question: 'Gelecekteki para planlarınız neler?',
  },
  8: {
    title: 'Para Kazanma Yetenekleri',
    description: 'Para kazanma konusundaki yetenekleriniz ve becerileriniz',
    question: 'Para kazanma yetenekleriniz neler?',
  },
};

/**
 * Para Açılımı pozisyon anlamları
 * Her pozisyon için kart anlamlarını içerir
 */
export const MONEY_POSITION_MEANINGS: Record<string, MoneyPositionMeaning[]> = {
  // Pozisyon 1: Mevcut Finansal Durum
  '1': position1Meanings,
  // Pozisyon 2: Para Akışı
  '2': position2Meanings,
  // Pozisyon 3: Finansal Engeller
  '3': position3Meanings,
  // Pozisyon 4: Fırsatlar
  '4': position4Meanings,
  // Pozisyon 5: Yakın Gelecek
  '5': Position5Meanings,
  // Pozisyon 6: Yeni Mali Planlar
  '6': Position6Meanings,
  // Pozisyon 7: Gelecek Para Planları
  '7': Position7Meanings,
  // Pozisyon 8: Para Kazanma Yetenekleri
  '8': position8meanings,
};

/**
 * Para Açılımında belirli bir kartın belirli pozisyondaki anlamını döndürür
 * @param card - Tarot kartı
 * @param position - Pozisyon numarası (1-8)
 * @param isReversed - Kart ters mi?
 * @returns Pozisyon özel anlam veya null
 */
export function getMoneyMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): MoneyPositionMeaning | null {
  // Pozisyon 1-8 arasında olmalı
  if (position < 1 || position > 8) {
    return null;
  }

  // Kart ismi mapping'ini al
  const cardNameMapping = getCardNameMappingSync();

  // Kart ismini İngilizce'ye çevir
  const englishCardName = cardNameMapping[card.nameTr] || card.nameTr;

  // Pozisyon özel anlamları kontrol et
  const positionMeanings = MONEY_POSITION_MEANINGS[position.toString()] || [];
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
  const baseMeaning: MoneyPositionMeaning = {
    id: `${card.name.toLowerCase().replace(/\s+/g, '_')}_pos${position}`,
    card: card.name,
    cardName: card.nameTr,
    position: position,
    isReversed: isReversed,
    upright: card.meaningTr.upright,
    reversed: card.meaningTr.reversed,
    keywords: card.keywordsTr || card.keywords || [],
    context: `Para açılımında ${position}. pozisyon (${moneyPositions[position as keyof typeof moneyPositions]?.title}) için ${card.nameTr} kartının anlamı`,
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
 * Para Açılımı pozisyon anlamlarını al
 */
export function getMoneyPositionMeanings(
  position: number
): MoneyPositionMeaning[] {
  return MONEY_POSITION_MEANINGS[position.toString()] || [];
}

/**
 * Belirli bir kart için tüm pozisyon anlamlarını getirir
 * @param card - Tarot kartı
 * @returns Kart anlamları array'i
 */
export function getMoneyMeaningsByCard(
  card: TarotCard
): MoneyPositionMeaning[] {
  const meanings: MoneyPositionMeaning[] = [];

  for (let position = 1; position <= 8; position++) {
    const meaning = getMoneyMeaningByCardAndPosition(card, position);
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
export function getAllMoneyMeanings(): Record<number, MoneyPositionMeaning[]> {
  const allMeanings: Record<number, MoneyPositionMeaning[]> = {};

  for (let position = 1; position <= 8; position++) {
    allMeanings[position] = getMoneyPositionMeanings(position) || [];
  }

  return allMeanings;
}

// Pozisyon bilgilerini alma fonksiyonu
export const getPositionInfo = (position: number) => {
  return moneyPositions[position as keyof typeof moneyPositions];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllPositions = () => {
  return Object.entries(moneyPositions).map(([position, info]) => ({
    position: parseInt(position),
    ...info,
  }));
};

// Tüm pozisyon anlamlarını birleştiren ana array
export const allMoneyPositionMeanings: MoneyPositionMeaning[] = [];
Object.values(MONEY_POSITION_MEANINGS).forEach(meanings => {
  allMoneyPositionMeanings.push(...meanings);
});

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getMoneyMeaningByCardNameAndPosition = (
  cardName: string,
  position: number,
  isReversed: boolean = false
): MoneyPositionMeaning | undefined => {
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
    getMoneyMeaningByCardAndPosition(mockCard, position, isReversed) ||
    undefined
  );
};

// Kart gruplarına göre filtreleme fonksiyonu
export const getMoneyMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPositionMeaning[] => {
  return allMoneyPositionMeanings.filter(meaning => meaning.group === group);
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getMoneyMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPositionMeaning[] => {
  return allMoneyPositionMeanings.filter(
    meaning => meaning.position === position && meaning.group === group
  );
};

// Arama fonksiyonu (kart adına göre)
export const searchMoneyMeaningsByCardName = (
  cardName: string
): MoneyPositionMeaning[] => {
  return allMoneyPositionMeanings.filter(
    meaning =>
      meaning.cardName?.toLowerCase().includes(cardName.toLowerCase()) ||
      meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchMoneyMeaningsByKeyword = (
  keyword: string
): MoneyPositionMeaning[] => {
  return allMoneyPositionMeanings.filter(
    meaning =>
      meaning.keywords.some(kw =>
        kw.toLowerCase().includes(keyword.toLowerCase())
      ) ||
      meaning.upright.toLowerCase().includes(keyword.toLowerCase()) ||
      meaning.reversed.toLowerCase().includes(keyword.toLowerCase())
  );
};

// İstatistik fonksiyonları
export const getMoneyStatistics = () => {
  const totalCards = allMoneyPositionMeanings.length;
  const totalPositions = 8;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allMoneyPositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allMoneyPositionMeanings.filter(m => m.group === 'Kupalar').length,
    Kılıçlar: allMoneyPositionMeanings.filter(m => m.group === 'Kılıçlar')
      .length,
    Asalar: allMoneyPositionMeanings.filter(m => m.group === 'Asalar').length,
    Tılsımlar: allMoneyPositionMeanings.filter(m => m.group === 'Tılsımlar')
      .length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
    positions: Object.keys(moneyPositions).length,
    groups: ['Majör Arkana', 'Kupalar', 'Kılıçlar', 'Asalar', 'Tılsımlar'],
  };
};

// Varsayılan export
const moneyExports = {
  getMoneyMeaningByCardAndPosition,
  getMoneyMeaningByCardNameAndPosition,
  getMoneyPositionMeanings,
  getMoneyMeaningsByCard,
  getAllMoneyMeanings,
  allMoneyPositionMeanings,
  moneyPositions,
  getPositionInfo,
  getAllPositions,
  getMoneyMeaningsByGroup,
  getMoneyMeaningsByPositionAndGroup,
  searchMoneyMeaningsByCardName,
  searchMoneyMeaningsByKeyword,
  getMoneyStatistics,
  // Eski fonksiyonlar (geriye uyumluluk için)
  getMoneyCardMeaning: (
    card: TarotCard,
    position: number,
    isReversed: boolean = false
  ) => {
    const meaning = getMoneyMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );
    return meaning ? (isReversed ? meaning.reversed : meaning.upright) : '';
  },
};

export default moneyExports;
