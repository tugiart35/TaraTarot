/*
info:
Bağlantılı dosyalar:
- './position-1-ilgi-duydugun-kisi': 1. pozisyon (İlgi Duyduğun Kişi) kart anlamları
- './position-2-fizilsek': 2. pozisyon (Fiziksel/Cinsel Bağlantı) kart anlamları
- './position-3-baglantı': 3. pozisyon (Duygusal/Ruhsal Bağlantı) kart anlamları
- './position-4-uzun-vadeli-surec': 4. pozisyon (Uzun Vadeli Sonuç) kart anlamları

Dosyanın amacı:
- Aşk Tarot açılımında her pozisyon için kart anlamlarını birleştirir ve merkezi erişim sağlar.
- Pozisyona, karta, anahtar kelimeye veya gruba göre anlam arama ve filtreleme fonksiyonları sunar.
- Pozisyon başlıkları, açıklamaları ve ilgili meta verileri içerir.
*/

// Bu dosya, Aşk açılımında tüm pozisyonlar için kart anlamlarını birleştirir.
// Her pozisyon (1-4) için özel kart anlamlarını içerir ve kolay erişim sağlar.

import { position1Meanings, useI18nPosition1Meanings, getI18nPosition1Meaning } from './position-1-ilgi-duydugun-kisi';
import { position2Meanings, useI18nPosition2Meanings, getI18nPosition2Meaning } from './position-2-fiziksel';
import { position3Meanings, useI18nPosition3Meanings, getI18nPosition3Meaning } from './position-3-baglanti';
import { position4Meanings, useI18nPosition4Meanings, getI18nPosition4Meaning } from './position-4-uzun-vadeli-surec';
import { useLoveTranslations } from './i18n-helper';

export interface LovePositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// Tüm pozisyon anlamlarını birleştiren ana array
export const allLovePositionMeanings: LovePositionMeaning[] = [
  ...position1Meanings,
  ...position2Meanings,
  ...position3Meanings,
  ...position4Meanings,
];

// Pozisyona göre anlamları gruplandıran fonksiyon
export const getMeaningsByPosition = (
  position: number
): LovePositionMeaning[] => {
  switch (position) {
    case 1:
      return position1Meanings;
    case 2:
      return position2Meanings;
    case 3:
      return position3Meanings;
    case 4:
      return position4Meanings;
    default:
      return [];
  }
};

// Kart isimlerini eşleştiren mapping - Tüm dilleri kapsar (TR, EN, SR)
const cardNameMapping: { [key: string]: string } = {
  // Major Arcana - Türkçe
  'Deli': 'The Fool',
  'Büyücü': 'The Magician',
  'Yüksek Rahibe': 'The High Priestess',
  'İmparatoriçe': 'The Empress',
  'İmparator': 'The Emperor',
  'Hierophant': 'The Hierophant',
  'Aziz': 'The Hierophant',
  'Aşıklar': 'The Lovers',
  'Savaş Arabası': 'The Chariot',
  'Güç': 'Strength',
  'Ermiş': 'The Hermit',
  'Münzevi': 'The Hermit',
  'Kader Çarkı': 'The Wheel of Fortune',
  'Adalet': 'Justice',
  'Asılı Adam': 'The Hanged Man',
  'Ölüm': 'Death',
  'Ölçü': 'Temperance',
  'Ölçülülük': 'Temperance',
  'Şeytan': 'The Devil',
  'Kule': 'The Tower',
  'Yıldız': 'The Star',
  'Ay': 'The Moon',
  'Güneş': 'The Sun',
  'Yargı': 'Judgement',
  'Mahkeme': 'Judgement',
  'Dünya': 'The World',
  
  
  // Major Arcana - Sırpça
  'Budala': 'The Fool',
  'Mađioničar': 'The Magician',
  'Visoka Svestenica': 'The High Priestess',
  'Carica': 'The Empress',
  'Car': 'The Emperor',
  'Sveštenik': 'The Hierophant',
  'Ljubavnici': 'The Lovers',
  'Kola': 'The Chariot',
  'Snaga': 'Strength',
  'Pustinjak': 'The Hermit',
  'Točak Sreće': 'The Wheel of Fortune',
  'Pravda': 'Justice',
  'Obeseni Čovek': 'The Hanged Man',
  'Smrt': 'Death',
  'Umerenost': 'Temperance',
  'Đavo': 'The Devil',
  'Kula': 'The Tower',
  'Zvezda': 'The Star',
  'Mesec': 'The Moon',
  'Sunce': 'The Sun',
  'Sud': 'Judgement',
  'Svet': 'The World',
  
  // Minor Arcana - Kupalar (Türkçe)
  'Kupalar Ası': 'Ace of Cups',
  'Kupalar İkilisi': 'Two of Cups',
  'Kupalar Üçlüsü': 'Three of Cups',
  'Kupalar Dörtlüsü': 'Four of Cups',
  'Kupalar Beşlisi': 'Five of Cups',
  'Kupalar Altılısı': 'Six of Cups',
  'Kupalar Yedilisi': 'Seven of Cups',
  'Kupalar Sekizlisi': 'Eight of Cups',
  'Kupalar Dokuzlusu': 'Nine of Cups',
  'Kupalar Onlusu': 'Ten of Cups',
  'Kupalar Uşağı': 'Page of Cups',
  'Kupalar Prensi': 'Page of Cups',
  'Kupalar Şövalyesi': 'Knight of Cups',
  'Kupalar Kraliçesi': 'Queen of Cups',
  'Kupalar Kralı': 'King of Cups',
  
  // Minor Arcana - Kadehler (Türkçe - Alternatif isimler)
  'Kadehler Ası': 'Ace of Cups',
  'Kadehler İkilisi': 'Two of Cups',
  'Kadehler Üçlüsü': 'Three of Cups',
  'Kadehler Dörtlüsü': 'Four of Cups',
  'Kadehler Beşlisi': 'Five of Cups',
  'Kadehler Altılısı': 'Six of Cups',
  'Kadehler Yedilisi': 'Seven of Cups',
  'Kadehler Sekizlisi': 'Eight of Cups',
  'Kadehler Dokuzlusu': 'Nine of Cups',
  'Kadehler Onlusu': 'Ten of Cups',
  'Kadehler Uşağı': 'Page of Cups',
  'Kadehler Prensi': 'Page of Cups',
  'Kadehler Şövalyesi': 'Knight of Cups',
  'Kadehler Kraliçesi': 'Queen of Cups',
  'Kadehler Kralı': 'King of Cups',
  
  
  // Minor Arcana - Kupalar (Sırpça)
  'As Pehara': 'Ace of Cups',
  'Dvojka Pehara': 'Two of Cups',
  'Trojka Pehara': 'Three of Cups',
  'Četvorka Pehara': 'Four of Cups',
  'Petica Pehara': 'Five of Cups',
  'Šestica Pehara': 'Six of Cups',
  'Sedmica Pehara': 'Seven of Cups',
  'Osmica Pehara': 'Eight of Cups',
  'Devetka Pehara': 'Nine of Cups',
  'Desetka Pehara': 'Ten of Cups',
  'Paž Pehara': 'Page of Cups',
  'Vitez Pehara': 'Knight of Cups',
  'Kraljica Pehara': 'Queen of Cups',
  'Kralj Pehara': 'King of Cups',
  
  // Minor Arcana - Kılıçlar (Türkçe)
  'Kılıçlar Ası': 'Ace of Swords',
  'Kılıçlar İkilisi': 'Two of Swords',
  'Kılıçlar Üçlüsü': 'Three of Swords',
  'Kılıçlar Dörtlüsü': 'Four of Swords',
  'Kılıçlar Beşlisi': 'Five of Swords',
  'Kılıçlar Altılısı': 'Six of Swords',
  'Kılıçlar Yedilisi': 'Seven of Swords',
  'Kılıçlar Sekizlisi': 'Eight of Swords',
  'Kılıçlar Dokuzlusu': 'Nine of Swords',
  'Kılıçlar Onlusu': 'Ten of Swords',
  'Kılıçlar Uşağı': 'Page of Swords',
  'Kılıçlar Prensi': 'Page of Swords',
  'Kılıçlar Şövalyesi': 'Knight of Swords',
  'Kılıçlar Kraliçesi': 'Queen of Swords',
  'Kılıçlar Kralı': 'King of Swords',
  
  
  // Minor Arcana - Kılıçlar (Sırpça)
  'As Mačeva': 'Ace of Swords',
  'Dvojka Mačeva': 'Two of Swords',
  'Trojka Mačeva': 'Three of Swords',
  'Četvorka Mačeva': 'Four of Swords',
  'Petica Mačeva': 'Five of Swords',
  'Šestica Mačeva': 'Six of Swords',
  'Sedmica Mačeva': 'Seven of Swords',
  'Osmica Mačeva': 'Eight of Swords',
  'Devetka Mačeva': 'Nine of Swords',
  'Desetka Mačeva': 'Ten of Swords',
  'Paž Mačeva': 'Page of Swords',
  'Vitez Mačeva': 'Knight of Swords',
  'Kraljica Mačeva': 'Queen of Swords',
  'Kralj Mačeva': 'King of Swords',
  
  // Minor Arcana - Asalar (Türkçe)
  'Asalar Ası': 'Ace of Wands',
  'Asalar İkilisi': 'Two of Wands',
  'Asalar Üçlüsü': 'Three of Wands',
  'Asalar Dörtlüsü': 'Four of Wands',
  'Asalar Beşlisi': 'Five of Wands',
  'Asalar Altılısı': 'Six of Wands',
  'Asalar Yedilisi': 'Seven of Wands',
  'Asalar Sekizlisi': 'Eight of Wands',
  'Asalar Dokuzlusu': 'Nine of Wands',
  'Asalar Onlusu': 'Ten of Wands',
  'Asalar Uşağı': 'Page of Wands',
  'Asalar Prensi': 'Page of Wands',
  'Asalar Şövalyesi': 'Knight of Wands',
  'Asalar Kraliçesi': 'Queen of Wands',
  'Asalar Kralı': 'King of Wands',
  
  
  // Minor Arcana - Asalar (Sırpça)
  'As Štapova': 'Ace of Wands',
  'Dvojka Štapova': 'Two of Wands',
  'Trojka Štapova': 'Three of Wands',
  'Četvorka Štapova': 'Four of Wands',
  'Petica Štapova': 'Five of Wands',
  'Šestica Štapova': 'Six of Wands',
  'Sedmica Štapova': 'Seven of Wands',
  'Osmica Štapova': 'Eight of Wands',
  'Devetka Štapova': 'Nine of Wands',
  'Desetka Štapova': 'Ten of Wands',
  'Paž Štapova': 'Page of Wands',
  'Vitez Štapova': 'Knight of Wands',
  'Kraljica Štapova': 'Queen of Wands',
  'Kralj Štapova': 'King of Wands',
  
  // Minor Arcana - Tılsımlar (Türkçe)
  'Tılsımlar Ası': 'Ace of Pentacles',
  'Tılsımlar İkilisi': 'Two of Pentacles',
  'Tılsımlar Üçlüsü': 'Three of Pentacles',
  'Tılsımlar Dörtlüsü': 'Four of Pentacles',
  'Tılsımlar Beşlisi': 'Five of Pentacles',
  'Tılsımlar Altılısı': 'Six of Pentacles',
  'Tılsımlar Yedilisi': 'Seven of Pentacles',
  'Tılsımlar Sekizlisi': 'Eight of Pentacles',
  'Tılsımlar Dokuzlusu': 'Nine of Pentacles',
  'Tılsımlar Onlusu': 'Ten of Pentacles',
  'Tılsımlar Uşağı': 'Page of Pentacles',
  'Tılsımlar Prensi': 'Page of Pentacles',
  'Tılsımlar Şövalyesi': 'Knight of Pentacles',
  'Tılsımlar Kraliçesi': 'Queen of Pentacles',
  'Tılsımlar Kralı': 'King of Pentacles',
  
  // Minor Arcana - Altınlar (Türkçe - Alternatif isimler)
  'Altınlar Ası': 'Ace of Pentacles',
  'Altınlar İkilisi': 'Two of Pentacles',
  'Altınlar Üçlüsü': 'Three of Pentacles',
  'Altınlar Dörtlüsü': 'Four of Pentacles',
  'Altınlar Beşlisi': 'Five of Pentacles',
  'Altınlar Altılısı': 'Six of Pentacles',
  'Altınlar Yedilisi': 'Seven of Pentacles',
  'Altınlar Sekizlisi': 'Eight of Pentacles',
  'Altınlar Dokuzlusu': 'Nine of Pentacles',
  'Altınlar Onlusu': 'Ten of Pentacles',
  'Altınlar Uşağı': 'Page of Pentacles',
  'Altınlar Prensi': 'Page of Pentacles',
  'Altınlar Şövalyesi': 'Knight of Pentacles',
  'Altınlar Kraliçesi': 'Queen of Pentacles',
  'Altınlar Kralı': 'King of Pentacles',
  
  
  // Minor Arcana - Tılsımlar (Sırpça)
  'As Pentakla': 'Ace of Pentacles',
  'Dvojka Pentakla': 'Two of Pentacles',
  'Trojka Pentakla': 'Three of Pentacles',
  'Četvorka Pentakla': 'Four of Pentacles',
  'Petica Pentakla': 'Five of Pentacles',
  'Šestica Pentakla': 'Six of Pentacles',
  'Sedmica Pentakla': 'Seven of Pentacles',
  'Osmica Pentakla': 'Eight of Pentacles',
  'Devetka Pentakla': 'Nine of Pentacles',
  'Desetka Pentakla': 'Ten of Pentacles',
  'Paž Pentakla': 'Page of Pentacles',
  'Vitez Pentakla': 'Knight of Pentacles',
  'Kraljica Pentakla': 'Queen of Pentacles',
  'Kralj Pentakla': 'King of Pentacles',
  
};

// Kart adına ve pozisyona göre anlam bulma fonksiyonu
export const getMeaningByCardAndPosition = (
  cardName: string,
  position: number
): LovePositionMeaning | undefined => {
  console.log('🔍 getMeaningByCardAndPosition called:', { cardName, position });
  
  // Kart ismini mapping ile dönüştür
  const mappedCardName = cardNameMapping[cardName] || cardName;
  console.log('🔄 Mapped card name:', mappedCardName, 'from original:', cardName);
  
  const positionMeanings = getMeaningsByPosition(position);
  console.log(`📊 Position ${position} meanings:`, positionMeanings.length, 'meanings available');
  
  // İlk 5 kart ismini göster
  const sampleCards = positionMeanings.slice(0, 5).map(m => m.card);
  console.log('📋 Sample cards in position', position, ':', sampleCards);
  
  // Önce mapped isimle ara
  let found = positionMeanings.find(meaning => meaning.card === mappedCardName);
  console.log('🔎 Search with mapped name result:', found ? 'FOUND' : 'NOT FOUND');
  
  // Bulunamazsa orijinal isimle ara
  if (!found) {
    found = positionMeanings.find(meaning => meaning.card === cardName);
    console.log('🔎 Search with original name result:', found ? 'FOUND' : 'NOT FOUND');
  }
  
  console.log('✅ Final result:', found ? 'SUCCESS' : 'FAILED');
  
  return found;
};

// Kart ID'sine göre anlam bulma fonksiyonu
export const getMeaningById = (id: string): LovePositionMeaning | undefined => {
  return allLovePositionMeanings.find(meaning => meaning.id === id);
};

// Pozisyon başlıkları ve açıklamaları (i18n destekli)
export const useI18nLovePositions = () => {
  const { getPositionTitle, getPositionDescription } = useLoveTranslations();
  
  return {
    1: {
      title: getPositionTitle(1),
      description: getPositionDescription(1),
      question: 'Hakkında soru sorduğun kişi nasıl biri?', // Bu da i18n'e eklenebilir
    },
    2: {
      title: getPositionTitle(2),
      description: getPositionDescription(2),
      question: 'Aranızdaki fiziksel ve cinsel çekim ne durumda?',
    },
    3: {
      title: getPositionTitle(3),
      description: getPositionDescription(3),
      question: 'Aranızdaki duygusal ve ruhsal uyum nasıl?',
    },
    4: {
      title: getPositionTitle(4),
      description: getPositionDescription(4),
      question: 'Bu ilişkinin gelecekteki potansiyeli nedir?',
    },
  };
};

// Orijinal pozisyon bilgileri (fallback için)
export const lovePositions = {
  1: {
    title: 'İlgi Duyduğun Kişi',
    description: 'Hakkında soru sorduğun kişi',
    question: 'Hakkında soru sorduğun kişi nasıl biri?',
  },
  2: {
    title: 'Fiziksel/Cinsel Bağlantı',
    description: 'Fiziksel ve cinsel bağlantınız',
    question: 'Aranızdaki fiziksel ve cinsel çekim ne durumda?',
  },
  3: {
    title: 'Duygusal/Ruhsal Bağlantı',
    description: 'Duygusal ve ruhsal bağlantınız',
    question: 'Aranızdaki duygusal ve ruhsal uyum nasıl?',
  },
  4: {
    title: 'Uzun Vadeli Sonuç',
    description: 'İlişkinin uzun vadeli sonucu',
    question: 'Bu ilişkinin gelecekteki potansiyeli nedir?',
  },
};

// Pozisyon bilgilerini alma fonksiyonu
export const getPositionInfo = (position: number) => {
  return lovePositions[position as keyof typeof lovePositions];
};

// Tüm pozisyonları alma fonksiyonu
export const getAllPositions = () => {
  return Object.entries(lovePositions).map(([position, info]) => ({
    position: parseInt(position),
    ...info,
  }));
};

// Kart gruplarına göre filtreleme fonksiyonu
export const getMeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): LovePositionMeaning[] => {
  return allLovePositionMeanings.filter(meaning => meaning.group === group);
};

// Pozisyon ve gruba göre filtreleme fonksiyonu
export const getMeaningsByPositionAndGroup = (
  position: number,
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): LovePositionMeaning[] => {
  const positionMeanings = getMeaningsByPosition(position);
  return positionMeanings.filter(meaning => meaning.group === group);
};

// Arama fonksiyonu (kart adına göre)
export const searchMeaningsByCardName = (
  cardName: string
): LovePositionMeaning[] => {
  return allLovePositionMeanings.filter(meaning =>
    meaning.card.toLowerCase().includes(cardName.toLowerCase())
  );
};

// Anahtar kelimeye göre arama fonksiyonu
export const searchMeaningsByKeyword = (
  keyword: string
): LovePositionMeaning[] => {
  return allLovePositionMeanings.filter(meaning =>
    meaning.keywords.some(kw =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// İstatistik fonksiyonları
export const getStatistics = () => {
  const totalCards = allLovePositionMeanings.length;
  const totalPositions = 4;
  const cardsPerPosition = totalCards > 0 ? totalCards / totalPositions : 0;

  const groupStats = {
    'Majör Arkana': allLovePositionMeanings.filter(
      m => m.group === 'Majör Arkana'
    ).length,
    Kupalar: allLovePositionMeanings.filter(m => m.group === 'Kupalar').length,
    Kılıçlar: allLovePositionMeanings.filter(m => m.group === 'Kılıçlar')
      .length,
    Asalar: allLovePositionMeanings.filter(m => m.group === 'Asalar').length,
    Tılsımlar: allLovePositionMeanings.filter(m => m.group === 'Tılsımlar')
      .length,
  };

  return {
    totalCards,
    totalPositions,
    cardsPerPosition,
    groupStats,
  };
};

// i18n destekli fonksiyonlar
export const useI18nAllLovePositionMeanings = () => {
  const position1Meanings = useI18nPosition1Meanings();
  const position2Meanings = useI18nPosition2Meanings();
  const position3Meanings = useI18nPosition3Meanings();
  const position4Meanings = useI18nPosition4Meanings();
  
  return [
    ...position1Meanings,
    ...position2Meanings,
    ...position3Meanings,
    ...position4Meanings,
  ];
};

// i18n destekli kart anlamı alma (hook kullanmadan)
export const getI18nMeaningByCardAndPosition = (
  cardName: string,
  position: number,
  t: (_key: string) => string
) => {
  switch (position) {
    case 1:
      return getI18nPosition1Meaning(cardName, t);
    case 2:
      return getI18nPosition2Meaning(cardName, t);
    case 3:
      return getI18nPosition3Meaning(cardName, t);
    case 4:
      return getI18nPosition4Meaning(cardName, t);
    default:
      return null;
  }
};

// Varsayılan export
export default {
  allLovePositionMeanings,
  getMeaningsByPosition,
  getMeaningByCardAndPosition,
  getMeaningById,
  lovePositions,
  getPositionInfo,
  getAllPositions,
  getMeaningsByGroup,
  getMeaningsByPositionAndGroup,
  searchMeaningsByCardName,
  searchMeaningsByKeyword,
  getStatistics,
  // i18n destekli fonksiyonlar
  useI18nAllLovePositionMeanings,
  useI18nLovePositions,
  getI18nMeaningByCardAndPosition,
};
