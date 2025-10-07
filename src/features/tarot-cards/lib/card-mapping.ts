import { TarotCard } from '@/types/tarot-cards';

// Card mapping service for URL and locale handling
export class CardMapping {
  // Map card key to slug for locale
  static getCardSlugForLocale(
    cardKey: string,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const majorArcanaMapping = {
      'the-fool': { tr: 'joker', en: 'the-fool', sr: 'joker' },
      'the-magician': { tr: 'buyucu', en: 'the-magician', sr: 'carobnjak' },
      'the-high-priestess': {
        tr: 'yuksek-rahibe',
        en: 'the-high-priestess',
        sr: 'visoka-svestenica',
      },
      'the-empress': { tr: 'imparatorice', en: 'the-empress', sr: 'carica' },
      'the-emperor': { tr: 'imparator', en: 'the-emperor', sr: 'car' },
      'the-hierophant': {
        tr: 'basrahip',
        en: 'the-hierophant',
        sr: 'visoki-svestenik',
      },
      'the-lovers': { tr: 'asiklar', en: 'the-lovers', sr: 'ljubavnici' },
      'the-chariot': { tr: 'savas-arabasi', en: 'the-chariot', sr: 'kola' },
      strength: { tr: 'guc', en: 'strength', sr: 'snaga' },
      'the-hermit': { tr: 'ermis', en: 'the-hermit', sr: 'pustinjak' },
      'wheel-of-fortune': {
        tr: 'kader-carki',
        en: 'wheel-of-fortune',
        sr: 'kolo-srece',
      },
      justice: { tr: 'adalet', en: 'justice', sr: 'pravda' },
      'the-hanged-man': {
        tr: 'asili-adam',
        en: 'the-hanged-man',
        sr: 'obeseni-covek',
      },
      death: { tr: 'olum', en: 'death', sr: 'smrt' },
      temperance: { tr: 'olcululuk', en: 'temperance', sr: 'umerenost' },
      'the-devil': { tr: 'seytan', en: 'the-devil', sr: 'davo' },
      'the-tower': { tr: 'kule', en: 'the-tower', sr: 'kula' },
      'the-star': { tr: 'yildiz', en: 'the-star', sr: 'zvezda' },
      'the-moon': { tr: 'ay', en: 'the-moon', sr: 'mesec' },
      'the-sun': { tr: 'gunes', en: 'the-sun', sr: 'sunce' },
      judgement: { tr: 'yargi', en: 'judgement', sr: 'sud' },
      'the-world': { tr: 'dunya', en: 'the-world', sr: 'svet' },
    };

    // Check if it's a major arcana card
    if (majorArcanaMapping[cardKey as keyof typeof majorArcanaMapping]) {
      return majorArcanaMapping[cardKey as keyof typeof majorArcanaMapping][
        locale
      ];
    }

    // Handle minor arcana cards
    return this.getMinorArcanaSlug(cardKey, locale);
  }

  // Get Minor Arcana slug for locale
  private static getMinorArcanaSlug(
    cardKey: string,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const suit = cardKey.includes('cups')
      ? 'cups'
      : cardKey.includes('pentacles')
        ? 'pentacles'
        : cardKey.includes('swords')
          ? 'swords'
          : cardKey.includes('wands')
            ? 'wands'
            : '';

    const number = cardKey.includes('ace')
      ? 'ace'
      : cardKey.includes('two')
        ? 'two'
        : cardKey.includes('three')
          ? 'three'
          : cardKey.includes('four')
            ? 'four'
            : cardKey.includes('five')
              ? 'five'
              : cardKey.includes('six')
                ? 'six'
                : cardKey.includes('seven')
                  ? 'seven'
                  : cardKey.includes('eight')
                    ? 'eight'
                    : cardKey.includes('nine')
                      ? 'nine'
                      : cardKey.includes('ten')
                        ? 'ten'
                        : cardKey.includes('page')
                          ? 'page'
                          : cardKey.includes('knight')
                            ? 'knight'
                            : cardKey.includes('queen')
                              ? 'queen'
                              : cardKey.includes('king')
                                ? 'king'
                                : '';

    if (locale === 'tr') {
      const suitNames: Record<string, string> = {
        cups: 'kupalar',
        pentacles: 'yildizlar',
        swords: 'kiliclar',
        wands: 'asalar',
      };
      const numberNames: Record<string, string> = {
        ace: 'asi',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        ten: '10',
        page: 'ucak',
        knight: 'sovalye',
        queen: 'kiz',
        king: 'krali',
      };
      return `${suitNames[suit]}-${numberNames[number]}`;
    } else if (locale === 'sr') {
      const suitNames: Record<string, string> = {
        cups: 'kupa',
        pentacles: 'novcic',
        swords: 'mace',
        wands: 'stap',
      };
      const numberNames: Record<string, string> = {
        ace: 'as',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        ten: '10',
        page: 'ucak',
        knight: 'vitez',
        queen: 'kraljica',
        king: 'kralj',
      };
      return `${suitNames[suit]}-${numberNames[number]}`;
    }

    return cardKey; // English format stays the same
  }

  // Map slug to card key for locale
  static getCardKeyFromSlug(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): string | null {
    // Major Arcana reverse mapping
    const majorArcanaReverseMapping: Record<string, string> = {
      // Turkish
      joker: 'the-fool',
      buyucu: 'the-magician',
      'yuksek-rahibe': 'the-high-priestess',
      imparatorice: 'the-empress',
      imparator: 'the-emperor',
      basrahip: 'the-hierophant',
      asiklar: 'the-lovers',
      'savas-arabasi': 'the-chariot',
      guc: 'strength',
      ermis: 'the-hermit',
      'kader-carki': 'wheel-of-fortune',
      adalet: 'justice',
      'asili-adam': 'the-hanged-man',
      olum: 'death',
      olcululuk: 'temperance',
      seytan: 'the-devil',
      kule: 'the-tower',
      yildiz: 'the-star',
      ay: 'the-moon',
      gunes: 'the-sun',
      yargi: 'judgement',
      dunya: 'the-world',

      // English (direct mapping)
      'the-fool': 'the-fool',
      'the-magician': 'the-magician',
      'the-high-priestess': 'the-high-priestess',
      'the-empress': 'the-empress',
      'the-emperor': 'the-emperor',
      'the-hierophant': 'the-hierophant',
      'the-lovers': 'the-lovers',
      'the-chariot': 'the-chariot',
      strength: 'strength',
      'the-hermit': 'the-hermit',
      'wheel-of-fortune': 'wheel-of-fortune',
      justice: 'justice',
      'the-hanged-man': 'the-hanged-man',
      death: 'death',
      temperance: 'temperance',
      'the-devil': 'the-devil',
      'the-tower': 'the-tower',
      'the-star': 'the-star',
      'the-moon': 'the-moon',
      'the-sun': 'the-sun',
      judgement: 'judgement',
      'the-world': 'the-world',

      // Serbian
      carobnjak: 'the-magician',
      'visoka-svestenica': 'the-high-priestess',
      carica: 'the-empress',
      car: 'the-emperor',
      'visoki-svestenik': 'the-hierophant',
      ljubavnici: 'the-lovers',
      kola: 'the-chariot',
      snaga: 'strength',
      pustinjak: 'the-hermit',
      'kolo-srece': 'wheel-of-fortune',
      pravda: 'justice',
      'obeseni-covek': 'the-hanged-man',
      smrt: 'death',
      umerenost: 'temperance',
      davo: 'the-devil',
      kula: 'the-tower',
      zvezda: 'the-star',
      mesec: 'the-moon',
      sunce: 'the-sun',
      sud: 'judgement',
      svet: 'the-world',
    };

    // Check major arcana first
    if (majorArcanaReverseMapping[slug]) {
      return majorArcanaReverseMapping[slug];
    }

    // Check minor arcana
    return this.getMinorArcanaKey(slug, locale);
  }

  // Get Minor Arcana card key from slug
  private static getMinorArcanaKey(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): string | null {
    if (locale === 'tr') {
      // Turkish patterns: kupalar-asi, kiliclar-2, yildizlar-krali
      const match = slug.match(/^(kupalar|kiliclar|asalar|yildizlar)-(.+)$/);
      if (!match) {
        return null;
      }

      const suitMap: Record<string, string> = {
        kupalar: 'cups',
        kiliclar: 'swords',
        asalar: 'wands',
        yildizlar: 'pentacles',
      };

      const numberMap: Record<string, string> = {
        asi: 'ace',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        ucak: 'page',
        sovalye: 'knight',
        kiz: 'queen',
        krali: 'king',
      };

      const suitKey = match[1];
      const numberKey = match[2];

      if (!suitKey || !numberKey) {
        return null;
      }

      const suit = suitMap[suitKey];
      const number = numberMap[numberKey];

      if (!suit || !number) {
        return null;
      }
      return `${number}-of-${suit}`;
    } else if (locale === 'sr') {
      // Serbian patterns: kupa-as, mace-2, novcic-kralj
      const match = slug.match(/^(kupa|mace|stap|novcic)-(.+)$/);
      if (!match) {
        return null;
      }

      const suitMap: Record<string, string> = {
        kupa: 'cups',
        mace: 'swords',
        stap: 'wands',
        novcic: 'pentacles',
      };

      const numberMap: Record<string, string> = {
        as: 'ace',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        ucak: 'page',
        vitez: 'knight',
        kraljica: 'queen',
        kralj: 'king',
      };

      const suitKey = match[1];
      const numberKey = match[2];

      if (!suitKey || !numberKey) {
        return null;
      }

      const suit = suitMap[suitKey];
      const number = numberMap[numberKey];

      if (!suit || !number) {
        return null;
      }
      return `${number}-of-${suit}`;
    } else {
      // English: ace-of-cups, king-of-swords (direct format)
      if (
        slug.match(
          /^(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)-of-(cups|swords|wands|pentacles)$/
        )
      ) {
        return slug;
      }
    }

    return null;
  }

  // Get card name for locale
  static getCardNameForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    switch (locale) {
      case 'tr':
        return card.turkishName;
      case 'en':
        return card.englishName;
      case 'sr':
        return card.serbianName;
      default:
        return card.englishName;
    }
  }

  // Get card URL for locale
  static getCardUrlForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const basePath =
      locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    return `/${locale}/${basePath}/${card.slug[locale]}`;
  }

  // Get all card URLs for a card
  static getAllCardUrls(card: TarotCard) {
    return {
      tr: this.getCardUrlForLocale(card, 'tr'),
      en: this.getCardUrlForLocale(card, 'en'),
      sr: this.getCardUrlForLocale(card, 'sr'),
    };
  }

  // Get card path for locale
  static getCardPathForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const basePath =
      locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    return `/${locale}/${basePath}/${card.slug[locale]}`;
  }

  // Get card breadcrumb for locale
  static getCardBreadcrumbForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ) {
    const homeText =
      locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Home' : 'Početna';
    const cardsText =
      locale === 'tr'
        ? 'Tarot Kartları'
        : locale === 'en'
          ? 'Tarot Cards'
          : 'Tarot Karte';
    const cardName = this.getCardNameForLocale(card, locale);

    return [
      { name: homeText, url: `/${locale}` },
      {
        name: cardsText,
        url: `/${locale}/${locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice'}`,
      },
      { name: cardName, url: this.getCardUrlForLocale(card, locale) },
    ];
  }

  // Get card navigation for locale
  static getCardNavigationForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ) {
    const allUrls = this.getAllCardUrls(card);

    return {
      current: allUrls[locale],
      alternate: Object.entries(allUrls)
        .filter(([loc]) => loc !== locale)
        .map(([loc, url]) => ({
          locale: loc,
          url,
          name: loc === 'tr' ? 'Türkçe' : loc === 'en' ? 'English' : 'Српски',
        })),
    };
  }
}
