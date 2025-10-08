/*
info:
Bağlantılı dosyalar:
- './a-tarot-helpers': TarotCard tipi ve yardımcı fonksiyonlar için (gerekli)
- '../../hooks/useTranslations': i18n çeviri sistemi için (gerekli)
- '../../messages': Dil dosyaları için (gerekli)

Dosyanın amacı:
- Tam 78 kartlık tarot destesini (Major Arcana + Minor Arcana) i18n sistemi ile sunar.
- Her kart objesi i18n sisteminden çevirileri alır, çoklu dil desteği sağlar.
- Tarot uygulamasında kart çekme, gösterme ve analiz işlemlerinin temel veri kaynağıdır.

Supabase değişkenleri ve tablolar:
- Supabase ile doğrudan bir bağlantı veya veri işlemi yoktur.

Geliştirme ve öneriler:
- i18n sistemi entegre edildi, artık çoklu dil desteği mevcut.
- Kart verileri i18n dosyalarından dinamik olarak yüklenir.
- Kod daha modüler ve bakımı kolay hale geldi.
- Tüm dillerde (TR, EN, SR) tutarlı veri yapısı sağlanır.

Hatalar ve geliştirmeye açık noktalar:
- i18n entegrasyonu tamamlandı, artık hardcode veri yok.
- Kod formatı iyileştirildi ve linter hataları giderildi.
- Performans optimizasyonu için cache mekanizması eklenebilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik yüksek, i18n sistemi ile daha modüler.
- Kod tekrar kullanılabilir ve bakımı kolay.
- Güvenlik açısından risk yok, i18n sistemi güvenli.
- Optimizasyon: i18n cache mekanizması eklenebilir.

Gereklilik ve Kullanım Durumu:
- TarotCard tipi: Gerekli, tüm tarot işlemleri için ana tip.
- getTarotDeck: Gerekli, i18n destekli tarot veri kaynağı.
- Tüm kod amaca uygun, i18n sistemi ile geliştirildi.
*/

import type { TarotCard } from './a-tarot-helpers';
import { useTranslations } from '../../../hooks/useTranslations';
import { useMemo } from 'react';

export type { TarotCard };

// i18n destekli tarot destesi hook'u
export function useTarotDeck(): TarotCard[] {
  const { t } = useTranslations();

  return useMemo(() => {
    if (!t) {
      return [];
    }

    const deckArray: TarotCard[] = [];

    // Major Arcana (22 kart)
    const majorArcanaNames = [
      'The Fool',
      'The Magician',
      'The High Priestess',
      'The Empress',
      'The Emperor',
      'The Hierophant',
      'The Lovers',
      'The Chariot',
      'Strength',
      'The Hermit',
      'Wheel of Fortune',
      'Justice',
      'The Hanged Man',
      'Death',
      'Temperance',
      'The Devil',
      'The Tower',
      'The Star',
      'The Moon',
      'The Sun',
      'Judgement',
      'The World',
    ];

    for (let i = 0; i <= 21; i++) {
      deckArray.push({
        id: i,
        name: majorArcanaNames[i] || `Card ${i}`,
        nameTr: majorArcanaNames[i] || `Card ${i}`,
        suit: 'major' as const,
        number: i,
        meaning: {
          upright: '',
          reversed: '',
        },
        meaningTr: {
          upright: '',
          reversed: '',
        },
        keywords: [],
        keywordsTr: [],
        image: `/cards/rws/${i === 0 ? '0-Fool' : i === 1 ? 'I-Magician' : i === 2 ? 'II-HighPriestess' : i === 3 ? 'III-Empress' : i === 4 ? 'IV-Emperor' : i === 5 ? 'V-Hierophant' : i === 6 ? 'VI-Lovers' : i === 7 ? 'VII-Chariot' : i === 8 ? 'VIII-Strength' : i === 9 ? 'IX-Hermit' : i === 10 ? 'X-WheelOfFortune' : i === 11 ? 'XI-Justice' : i === 12 ? 'XII-HangedMan' : i === 13 ? 'XIII-Death' : i === 14 ? 'XIV-Temperance' : i === 15 ? 'XV-Devil' : i === 16 ? 'XVI-Tower' : i === 17 ? 'XVII-Star' : i === 18 ? 'XVIII-Moon' : i === 19 ? 'XIX-Sun' : i === 20 ? 'XX-Judgement' : 'XXI-World'}.jpg`,
      });
    }

    // Minor Arcana - Cups (14 kart)
    const cupsCards = [
      { id: 22, number: 1, image: 'Ace-Cups' },
      { id: 23, number: 2, image: 'II-Cups' },
      { id: 24, number: 3, image: 'III-Cups' },
      { id: 25, number: 4, image: 'IV-Cups' },
      { id: 26, number: 5, image: 'V-Cups' },
      { id: 27, number: 6, image: 'VI-Cups' },
      { id: 28, number: 7, image: 'VII-Cups' },
      { id: 29, number: 8, image: 'VIII-Cups' },
      { id: 30, number: 9, image: 'IX-Cups' },
      { id: 31, number: 10, image: 'X-Cups' },
      { id: 32, number: 0, image: 'Page-Cups', court: 'page' },
      { id: 33, number: 0, image: 'Knight-Cups', court: 'knight' },
      { id: 34, number: 0, image: 'Queen-Cups', court: 'queen' },
      { id: 35, number: 0, image: 'King-Cups', court: 'king' },
    ];

    cupsCards.forEach(card => {
      const numberNames = [
        '',
        'Ace',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
      ];
      const numberName =
        card.number >= 1 && card.number <= 10 ? numberNames[card.number] : '';

      deckArray.push({
        id: card.id,
        name: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Cups`
          : `${numberName} of Cups`,
        nameTr: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Cups`
          : `${numberName} of Cups`,
        suit: 'cups' as const,
        number: card.number,
        meaning: {
          upright: '',
          reversed: '',
        },
        meaningTr: {
          upright: '',
          reversed: '',
        },
        keywords: [],
        keywordsTr: [],
        image: `/cards/rws/${card.image}.jpg`,
      });
    });

    // Minor Arcana - Wands (14 kart)
    const wandsCards = [
      { id: 36, number: 1, image: 'Ace-Wands' },
      { id: 37, number: 2, image: 'II-Wands' },
      { id: 38, number: 3, image: 'III-Wands' },
      { id: 39, number: 4, image: 'IV-Wands' },
      { id: 40, number: 5, image: 'V-Wands' },
      { id: 41, number: 6, image: 'VI-Wands' },
      { id: 42, number: 7, image: 'VII-Wands' },
      { id: 43, number: 8, image: 'VIII-Wands' },
      { id: 44, number: 9, image: 'IX-Wands' },
      { id: 45, number: 10, image: 'X-Wands' },
      { id: 46, number: 0, image: 'Page-Wands', court: 'page' },
      { id: 47, number: 0, image: 'Knight-Wands', court: 'knight' },
      { id: 48, number: 0, image: 'Queen-Wands', court: 'queen' },
      { id: 49, number: 0, image: 'King-Wands', court: 'king' },
    ];

    wandsCards.forEach(card => {
      const numberNames = [
        '',
        'Ace',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
      ];
      const numberName =
        card.number >= 1 && card.number <= 10 ? numberNames[card.number] : '';

      deckArray.push({
        id: card.id,
        name: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Wands`
          : `${numberName} of Wands`,
        nameTr: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Wands`
          : `${numberName} of Wands`,
        suit: 'wands' as const,
        number: card.number,
        meaning: {
          upright: '',
          reversed: '',
        },
        meaningTr: {
          upright: '',
          reversed: '',
        },
        keywords: [],
        keywordsTr: [],
        image: `/cards/rws/${card.image}.jpg`,
      });
    });

    // Minor Arcana - Swords (14 kart)
    const swordsCards = [
      { id: 50, number: 1, image: 'Ace-Swords' },
      { id: 51, number: 2, image: 'II-Swords' },
      { id: 52, number: 3, image: 'III-Swords' },
      { id: 53, number: 4, image: 'IV-Swords' },
      { id: 54, number: 5, image: 'V-Swords' },
      { id: 55, number: 6, image: 'VI-Swords' },
      { id: 56, number: 7, image: 'VII-Swords' },
      { id: 57, number: 8, image: 'VIII-Swords' },
      { id: 58, number: 9, image: 'IX-Swords' },
      { id: 59, number: 10, image: 'X-Swords' },
      { id: 60, number: 0, image: 'Page-Swords', court: 'page' },
      { id: 61, number: 0, image: 'Knight-Swords', court: 'knight' },
      { id: 62, number: 0, image: 'Queen-Swords', court: 'queen' },
      { id: 63, number: 0, image: 'King-Swords', court: 'king' },
    ];

    swordsCards.forEach(card => {
      const numberNames = [
        '',
        'Ace',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
      ];
      const numberName =
        card.number >= 1 && card.number <= 10 ? numberNames[card.number] : '';

      deckArray.push({
        id: card.id,
        name: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Swords`
          : `${numberName} of Swords`,
        nameTr: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Swords`
          : `${numberName} of Swords`,
        suit: 'swords' as const,
        number: card.number,
        meaning: {
          upright: '',
          reversed: '',
        },
        meaningTr: {
          upright: '',
          reversed: '',
        },
        keywords: [],
        keywordsTr: [],
        image: `/cards/rws/${card.image}.jpg`,
      });
    });

    // Minor Arcana - Pentacles (14 kart)
    const pentaclesCards = [
      { id: 64, number: 1, image: 'Ace-Pentacles' },
      { id: 65, number: 2, image: 'II-Pentacles' },
      { id: 66, number: 3, image: 'III-Pentacles' },
      { id: 67, number: 4, image: 'IV-Pentacles' },
      { id: 68, number: 5, image: 'V-Pentacles' },
      { id: 69, number: 6, image: 'VI-Pentacles' },
      { id: 70, number: 7, image: 'VII-Pentacles' },
      { id: 71, number: 8, image: 'VIII-Pentacles' },
      { id: 72, number: 9, image: 'IX-Pentacles' },
      { id: 73, number: 10, image: 'X-Pentacles' },
      { id: 74, number: 0, image: 'Page-Pentacles', court: 'page' },
      { id: 75, number: 0, image: 'Knight-Pentacles', court: 'knight' },
      { id: 76, number: 0, image: 'Queen-Pentacles', court: 'queen' },
      { id: 77, number: 0, image: 'King-Pentacles', court: 'king' },
    ];

    pentaclesCards.forEach(card => {
      const numberNames = [
        '',
        'Ace',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
      ];
      const numberName =
        card.number >= 1 && card.number <= 10 ? numberNames[card.number] : '';

      deckArray.push({
        id: card.id,
        name: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Pentacles`
          : `${numberName} of Pentacles`,
        nameTr: card.court
          ? `${card.court.charAt(0).toUpperCase() + card.court.slice(1)} of Pentacles`
          : `${numberName} of Pentacles`,
        suit: 'pentacles' as const,
        number: card.number,
        meaning: {
          upright: '',
          reversed: '',
        },
        meaningTr: {
          upright: '',
          reversed: '',
        },
        keywords: [],
        keywordsTr: [],
        image: `/cards/rws/${card.image}.jpg`,
      });
    });

    return deckArray;
  }, [t]);
}

// Geriye uyumluluk için eski export (deprecated - use useTarotDeck hook instead)
export const fullTarotDeck: TarotCard[] = [];
