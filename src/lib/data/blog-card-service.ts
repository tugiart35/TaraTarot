// Blog Card Service - Reads from tr.json blog section
import trMessages from '../../../messages/tr.json';

interface BlogCardData {
  name: string;
  short_description: string;
  meanings: {
    upright: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
    reversed: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
  };
  context: {
    mythology: string;
    celtic_cross?: {
      future: string;
      hidden_influences: string;
    };
  };
  story: {
    title: string;
    description: string;
    history: string;
    historytitle: string;
    history_message: string;
    mystic_title: string;
    mystic_message: string;
    cultural_title: string;
    cultural_message: string;
  };
  keywords: {
    keywords_title: string;
    keywords_message: string;
    positive_title: string;
    positive_message: string;
    balance_title: string;
    balance_message: string;
    soul_title: string;
    soul_message: string;
  };
  associations?: {
    title: string;
    astrology: string;
    numerology: string;
    element: string;
    chakra: string;
  };
  card_combinations?: {
    title: string;
    combinations: Array<{
      card: string;
      meaning: string;
    }>;
  };
  affirmations?: {
    title: string;
    affirmation_list: string[];
  };
  cta: {
    main: string;
    micro: string;
  };
  faq: Array<{ question: string; answer: string }>;
  related_cards: string[];
  imageUrl: string;
}

interface BlogCards {
  [key: string]: BlogCardData;
}

export class BlogCardService {
  private static getBlogCards(): BlogCards {
    return (trMessages as any).blog.cards;
  }

  static getCardById(id: string): BlogCardData | null {
    const cards = this.getBlogCards();
    return cards[id] || null;
  }

  static getCardBySlug(
    slug: string,
    _locale: 'tr' | 'en' | 'sr'
  ): BlogCardData | null {
    const cards = this.getBlogCards();

    // For now, only Turkish content is available in blog data
    // Map English and Serbian slugs to Turkish cards
    const slugMapping: { [key: string]: string } = {
      // English slugs
      'the-fool': 'the-fool',
      'the-high-priestess': 'the-high-priestess',
      'the-magician': 'the-magician',
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

      // Turkish slugs
      joker: 'the-fool',
      'yuksek-rahibe': 'the-high-priestess',
      buyucu: 'the-magician',
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

      // Serbian slugs
      'visoka-svestenica': 'the-high-priestess',
      carobnjak: 'the-magician',
      carica: 'the-empress',
      car: 'the-emperor',
      prvosveštenica: 'the-hierophant',
      ljubavnici: 'the-lovers',
      'ratna-kolica': 'the-chariot',
      snaga: 'strength',
      pustinjak: 'the-hermit',
      'kolo-srece': 'wheel-of-fortune',
      pravda: 'justice',
      obeseni: 'the-hanged-man',
      smrt: 'death',
      umerenost: 'temperance',
      djavol: 'the-devil',
      kula: 'the-tower',
      zvezda: 'the-star',
      mesec: 'the-moon',
      sunce: 'the-sun',
      sud: 'judgement',
      svet: 'the-world',

      // Cups suit - Turkish
      'kupalar-asi': 'ace-of-cups',
      'kupalar-ikili': 'two-of-cups',
      'kupalar-uclu': 'three-of-cups',
      'kupalar-dortlu': 'four-of-cups',
      'kupalar-besli': 'five-of-cups',
      'kupalar-altili': 'six-of-cups',
      'kupalar-yedili': 'seven-of-cups',
      'kupalar-sekizli': 'eight-of-cups',
      'kupalar-dokuzlu': 'nine-of-cups',
      'kupalar-onlu': 'ten-of-cups',
      'kupalar-prensi': 'page-of-cups',
      'kupalar-sovalyesi': 'knight-of-cups',
      'kupalar-kralicesi': 'queen-of-cups',
      'kupalar-krali': 'king-of-cups',

      // Cups suit - English
      'ace-of-cups': 'ace-of-cups',
      'two-of-cups': 'two-of-cups',
      'three-of-cups': 'three-of-cups',
      'four-of-cups': 'four-of-cups',
      'five-of-cups': 'five-of-cups',
      'six-of-cups': 'six-of-cups',
      'seven-of-cups': 'seven-of-cups',
      'eight-of-cups': 'eight-of-cups',
      'nine-of-cups': 'nine-of-cups',
      'ten-of-cups': 'ten-of-cups',
      'page-of-cups': 'page-of-cups',
      'knight-of-cups': 'knight-of-cups',
      'queen-of-cups': 'queen-of-cups',
      'king-of-cups': 'king-of-cups',

      // Cups suit - Serbian
      'kupa-as': 'ace-of-cups',
      'kupa-dvojka': 'two-of-cups',
      'kupa-trojka': 'three-of-cups',
      'kupa-cetvorka': 'four-of-cups',
      'kupa-petica': 'five-of-cups',
      'kupa-sestica': 'six-of-cups',
      'kupa-sedmica': 'seven-of-cups',
      'kupa-osmica': 'eight-of-cups',
      'kupa-devetka': 'nine-of-cups',
      'kupa-desetka': 'ten-of-cups',
      'kupa-paz': 'page-of-cups',
      'kupa-vitez': 'knight-of-cups',
      'kupa-kraljica': 'queen-of-cups',
      'kupa-kralj': 'king-of-cups',

      // Swords suit - Turkish
      'kiliclar-asi': 'ace-of-swords',
      'kiliclar-ikili': 'two-of-swords',
      'kiliclar-uclu': 'three-of-swords',
      'kiliclar-dortlu': 'four-of-swords',
      'kiliclar-besli': 'five-of-swords',
      'kiliclar-altili': 'six-of-swords',
      'kiliclar-yedili': 'seven-of-swords',
      'kiliclar-sekizli': 'eight-of-swords',
      'kiliclar-dokuzlu': 'nine-of-swords',
      'kiliclar-onlu': 'ten-of-swords',
      'kiliclar-prensi': 'page-of-swords',
      'kiliclar-sovalyesi': 'knight-of-swords',
      'kiliclar-kralicesi': 'queen-of-swords',
      'kiliclar-krali': 'king-of-swords',

      // Swords suit - English
      'ace-of-swords': 'ace-of-swords',
      'two-of-swords': 'two-of-swords',
      'three-of-swords': 'three-of-swords',
      'four-of-swords': 'four-of-swords',
      'five-of-swords': 'five-of-swords',
      'six-of-swords': 'six-of-swords',
      'seven-of-swords': 'seven-of-swords',
      'eight-of-swords': 'eight-of-swords',
      'nine-of-swords': 'nine-of-swords',
      'ten-of-swords': 'ten-of-swords',
      'page-of-swords': 'page-of-swords',
      'knight-of-swords': 'knight-of-swords',
      'queen-of-swords': 'queen-of-swords',
      'king-of-swords': 'king-of-swords',

      // Swords suit - Serbian
      'mace-as': 'ace-of-swords',
      'mace-dvojka': 'two-of-swords',
      'mace-trojka': 'three-of-swords',
      'mace-cetvorka': 'four-of-swords',
      'mace-petica': 'five-of-swords',
      'mace-sestica': 'six-of-swords',
      'mace-sedmica': 'seven-of-swords',
      'mace-osmica': 'eight-of-swords',
      'mace-devetka': 'nine-of-swords',
      'mace-desetka': 'ten-of-swords',
      'mace-paz': 'page-of-swords',
      'mace-vitez': 'knight-of-swords',
      'mace-kraljica': 'queen-of-swords',
      'mace-kralj': 'king-of-swords',

      // Wands suit - Turkish
      'asalar-asi': 'ace-of-wands',
      'asalar-ikili': 'two-of-wands',
      'asalar-uclu': 'three-of-wands',
      'asalar-dortlu': 'four-of-wands',
      'asalar-besli': 'five-of-wands',
      'asalar-altili': 'six-of-wands',
      'asalar-yedili': 'seven-of-wands',
      'asalar-sekizli': 'eight-of-wands',
      'asalar-dokuzlu': 'nine-of-wands',
      'asalar-onlu': 'ten-of-wands',
      'asalar-prensi': 'page-of-wands',
      'asalar-sovalyesi': 'knight-of-wands',
      'asalar-kralicesi': 'queen-of-wands',
      'asalar-krali': 'king-of-wands',

      // Wands suit - English
      'ace-of-wands': 'ace-of-wands',
      'two-of-wands': 'two-of-wands',
      'three-of-wands': 'three-of-wands',
      'four-of-wands': 'four-of-wands',
      'five-of-wands': 'five-of-wands',
      'six-of-wands': 'six-of-wands',
      'seven-of-wands': 'seven-of-wands',
      'eight-of-wands': 'eight-of-wands',
      'nine-of-wands': 'nine-of-wands',
      'ten-of-wands': 'ten-of-wands',
      'page-of-wands': 'page-of-wands',
      'knight-of-wands': 'knight-of-wands',
      'queen-of-wands': 'queen-of-wands',
      'king-of-wands': 'king-of-wands',

      // Wands suit - Serbian
      'stap-as': 'ace-of-wands',
      'stap-dvojka': 'two-of-wands',
      'stap-trojka': 'three-of-wands',
      'stap-cetvorka': 'four-of-wands',
      'stap-petica': 'five-of-wands',
      'stap-sestica': 'six-of-wands',
      'stap-sedmica': 'seven-of-wands',
      'stap-osmica': 'eight-of-wands',
      'stap-devetka': 'nine-of-wands',
      'stap-desetka': 'ten-of-wands',
      'stap-paz': 'page-of-wands',
      'stap-vitez': 'knight-of-wands',
      'stap-kraljica': 'queen-of-wands',
      'stap-kralj': 'king-of-wands',

      // Pentacles suit - Turkish
      'yildizlar-asi': 'ace-of-pentacles',
      'yildizlar-ikili': 'two-of-pentacles',
      'yildizlar-uclu': 'three-of-pentacles',
      'yildizlar-dortlu': 'four-of-pentacles',
      'yildizlar-besli': 'five-of-pentacles',
      'yildizlar-altili': 'six-of-pentacles',
      'yildizlar-yedili': 'seven-of-pentacles',
      'yildizlar-sekizli': 'eight-of-pentacles',
      'yildizlar-dokuzlu': 'nine-of-pentacles',
      'yildizlar-onlu': 'ten-of-pentacles',
      'yildizlar-prensi': 'page-of-pentacles',
      'yildizlar-sovalyesi': 'knight-of-pentacles',
      'yildizlar-kralicesi': 'queen-of-pentacles',
      'yildizlar-krali': 'king-of-pentacles',

      // Pentacles suit - English
      'ace-of-pentacles': 'ace-of-pentacles',
      'two-of-pentacles': 'two-of-pentacles',
      'three-of-pentacles': 'three-of-pentacles',
      'four-of-pentacles': 'four-of-pentacles',
      'five-of-pentacles': 'five-of-pentacles',
      'six-of-pentacles': 'six-of-pentacles',
      'seven-of-pentacles': 'seven-of-pentacles',
      'eight-of-pentacles': 'eight-of-pentacles',
      'nine-of-pentacles': 'nine-of-pentacles',
      'ten-of-pentacles': 'ten-of-pentacles',
      'page-of-pentacles': 'page-of-pentacles',
      'knight-of-pentacles': 'knight-of-pentacles',
      'queen-of-pentacles': 'queen-of-pentacles',
      'king-of-pentacles': 'king-of-pentacles',

      // Pentacles suit - Serbian
      'novcic-as': 'ace-of-pentacles',
      'novcic-dvojka': 'two-of-pentacles',
      'novcic-trojka': 'three-of-pentacles',
      'novcic-cetvorka': 'four-of-pentacles',
      'novcic-petica': 'five-of-pentacles',
      'novcic-sestica': 'six-of-pentacles',
      'novcic-sedmica': 'seven-of-pentacles',
      'novcic-osmica': 'eight-of-pentacles',
      'novcic-devetka': 'nine-of-pentacles',
      'novcic-desetka': 'ten-of-pentacles',
      'novcic-paz': 'page-of-pentacles',
      'novcic-vitez': 'knight-of-pentacles',
      'novcic-kraljica': 'queen-of-pentacles',
      'novcic-kralj': 'king-of-pentacles',
    };

    const cardId = slugMapping[slug];
    if (cardId && cards[cardId]) {
      return cards[cardId];
    }

    return null;
  }

  static getAllCards(): BlogCardData[] {
    const cards = this.getBlogCards();
    return Object.values(cards);
  }

  static getRelatedCards(cardId: string, limit: number = 4): BlogCardData[] {
    const cards = this.getBlogCards();
    const currentCard = cards[cardId];

    if (!currentCard || !currentCard.related_cards) {
      return [];
    }

    const relatedCards = currentCard.related_cards
      .map(relatedId => cards[relatedId])
      .filter((card): card is BlogCardData => card !== undefined)
      .slice(0, limit);

    return relatedCards;
  }

  static getCardSlug(card: BlogCardData, _locale: 'tr' | 'en' | 'sr'): string {
    const name = card.name.toLowerCase();
    // Handle special characters for Turkish and Serbian
    return name
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/ć/g, 'c')
      .replace(/č/g, 'c')
      .replace(/đ/g, 'd')
      .replace(/š/g, 's')
      .replace(/ž/g, 'z')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  static getCardUrl(card: BlogCardData, locale: 'tr' | 'en' | 'sr'): string {
    const slug = this.getCardSlug(card, locale);
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

    const paths = {
      tr: `/tr/kartlar/${slug}`,
      en: `/en/cards/${slug}`,
      sr: `/sr/kartice/${slug}`,
    };

    return `${baseUrl}${paths[locale]}`;
  }
}
