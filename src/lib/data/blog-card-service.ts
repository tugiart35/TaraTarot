
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
      'kupalar-asi': 'ace_of_cups',
      'kupalar-ikili': 'two_of_cups',
      'kupalar-uclu': 'three_of_cups',
      'kupalar-dortlu': 'four_of_cups',
      'kupalar-besli': 'five_of_cups',
      'kupalar-altili': 'six_of_cups',
      'kupalar-yedili': 'seven_of_cups',
      'kupalar-sekizli': 'eight_of_cups',
      'kupalar-dokuzlu': 'nine_of_cups',
      'kupalar-onlu': 'ten_of_cups',
      'kupalar-prensi': 'page_of_cups',
      'kupalar-sovalyesi': 'knight_of_cups',
      'kupalar-kralicesi': 'queen_of_cups',
      'kupalar-krali': 'king_of_cups',

      // Cups suit - English
      'ace-of-cups': 'ace_of_cups',
      'two-of-cups': 'two_of_cups',
      'three-of-cups': 'three_of_cups',
      'four-of-cups': 'four_of_cups',
      'five-of-cups': 'five_of_cups',
      'six-of-cups': 'six_of_cups',
      'seven-of-cups': 'seven_of_cups',
      'eight-of-cups': 'eight_of_cups',
      'nine-of-cups': 'nine_of_cups',
      'ten-of-cups': 'ten_of_cups',
      'page-of-cups': 'page_of_cups',
      'knight-of-cups': 'knight_of_cups',
      'queen-of-cups': 'queen_of_cups',
      'king-of-cups': 'king_of_cups',

      // Cups suit - Serbian
      'kupa-as': 'ace_of_cups',
      'kupa-dvojka': 'two_of_cups',
      'kupa-trojka': 'three_of_cups',
      'kupa-cetvorka': 'four_of_cups',
      'kupa-petica': 'five_of_cups',
      'kupa-sestica': 'six_of_cups',
      'kupa-sedmica': 'seven_of_cups',
      'kupa-osmica': 'eight_of_cups',
      'kupa-devetka': 'nine_of_cups',
      'kupa-desetka': 'ten_of_cups',
      'kupa-paz': 'page_of_cups',
      'kupa-vitez': 'knight_of_cups',
      'kupa-kraljica': 'queen_of_cups',
      'kupa-kralj': 'king_of_cups',

      // Swords suit - Turkish
      'kiliclar-asi': 'ace_of_swords',
      'kiliclar-ikili': 'two_of_swords',
      'kiliclar-uclu': 'three_of_swords',
      'kiliclar-dortlu': 'four_of_swords',
      'kiliclar-besli': 'five_of_swords',
      'kiliclar-altili': 'six_of_swords',
      'kiliclar-yedili': 'seven_of_swords',
      'kiliclar-sekizli': 'eight_of_swords',
      'kiliclar-dokuzlu': 'nine_of_swords',
      'kiliclar-onlu': 'ten_of_swords',
      'kiliclar-prensi': 'page_of_swords',
      'kiliclar-sovalyesi': 'knight_of_swords',
      'kiliclar-kralicesi': 'queen_of_swords',
      'kiliclar-krali': 'king_of_swords',

      // Swords suit - English
      'ace-of-swords': 'ace_of_swords',
      'two-of-swords': 'two_of_swords',
      'three-of-swords': 'three_of_swords',
      'four-of-swords': 'four_of_swords',
      'five-of-swords': 'five_of_swords',
      'six-of-swords': 'six_of_swords',
      'seven-of-swords': 'seven_of_swords',
      'eight-of-swords': 'eight_of_swords',
      'nine-of-swords': 'nine_of_swords',
      'ten-of-swords': 'ten_of_swords',
      'page-of-swords': 'page_of_swords',
      'knight-of-swords': 'knight_of_swords',
      'queen-of-swords': 'queen_of_swords',
      'king-of-swords': 'king_of_swords',

      // Swords suit - Serbian
      'mace-as': 'ace_of_swords',
      'mace-dvojka': 'two_of_swords',
      'mace-trojka': 'three_of_swords',
      'mace-cetvorka': 'four_of_swords',
      'mace-petica': 'five_of_swords',
      'mace-sestica': 'six_of_swords',
      'mace-sedmica': 'seven_of_swords',
      'mace-osmica': 'eight_of_swords',
      'mace-devetka': 'nine_of_swords',
      'mace-desetka': 'ten_of_swords',
      'mace-paz': 'page_of_swords',
      'mace-vitez': 'knight_of_swords',
      'mace-kraljica': 'queen_of_swords',
      'mace-kralj': 'king_of_swords',

      // Wands suit - Turkish
      'asalar-asi': 'ace_of_wands',
      'asalar-ikili': 'two_of_wands',
      'asalar-uclu': 'three_of_wands',
      'asalar-dortlu': 'four_of_wands',
      'asalar-besli': 'five_of_wands',
      'asalar-altili': 'six_of_wands',
      'asalar-yedili': 'seven_of_wands',
      'asalar-sekizli': 'eight_of_wands',
      'asalar-dokuzlu': 'nine_of_wands',
      'asalar-onlu': 'ten_of_wands',
      'asalar-prensi': 'page_of_wands',
      'asalar-sovalyesi': 'knight_of_wands',
      'asalar-kralicesi': 'queen_of_wands',
      'asalar-krali': 'king_of_wands',

      // Wands suit - English
      'ace-of-wands': 'ace_of_wands',
      'two-of-wands': 'two_of_wands',
      'three-of-wands': 'three_of_wands',
      'four-of-wands': 'four_of_wands',
      'five-of-wands': 'five_of_wands',
      'six-of-wands': 'six_of_wands',
      'seven-of-wands': 'seven_of_wands',
      'eight-of-wands': 'eight_of_wands',
      'nine-of-wands': 'nine_of_wands',
      'ten-of-wands': 'ten_of_wands',
      'page-of-wands': 'page_of_wands',
      'knight-of-wands': 'knight_of_wands',
      'queen-of-wands': 'queen_of_wands',
      'king-of-wands': 'king_of_wands',

      // Wands suit - Serbian
      'stap-as': 'ace_of_wands',
      'stap-dvojka': 'two_of_wands',
      'stap-trojka': 'three_of_wands',
      'stap-cetvorka': 'four_of_wands',
      'stap-petica': 'five_of_wands',
      'stap-sestica': 'six_of_wands',
      'stap-sedmica': 'seven_of_wands',
      'stap-osmica': 'eight_of_wands',
      'stap-devetka': 'nine_of_wands',
      'stap-desetka': 'ten_of_wands',
      'stap-paz': 'page_of_wands',
      'stap-vitez': 'knight_of_wands',
      'stap-kraljica': 'queen_of_wands',
      'stap-kralj': 'king_of_wands',

      // Pentacles suit - Turkish
      'yildizlar-asi': 'ace_of_pentacles',
      'yildizlar-ikili': 'two_of_pentacles',
      'yildizlar-uclu': 'three_of_pentacles',
      'yildizlar-dortlu': 'four_of_pentacles',
      'yildizlar-besli': 'five_of_pentacles',
      'yildizlar-altili': 'six_of_pentacles',
      'yildizlar-yedili': 'seven_of_pentacles',
      'yildizlar-sekizli': 'eight_of_pentacles',
      'yildizlar-dokuzlu': 'nine_of_pentacles',
      'yildizlar-onlu': 'ten_of_pentacles',
      'yildizlar-prensi': 'page_of_pentacles',
      'yildizlar-sovalyesi': 'knight_of_pentacles',
      'yildizlar-kralicesi': 'queen_of_pentacles',
      'yildizlar-krali': 'king_of_pentacles',

      // Pentacles suit - English
      'ace-of-pentacles': 'ace_of_pentacles',
      'two-of-pentacles': 'two_of_pentacles',
      'three-of-pentacles': 'three_of_pentacles',
      'four-of-pentacles': 'four_of_pentacles',
      'five-of-pentacles': 'five_of_pentacles',
      'six-of-pentacles': 'six_of_pentacles',
      'seven-of-pentacles': 'seven_of_pentacles',
      'eight-of-pentacles': 'eight_of_pentacles',
      'nine-of-pentacles': 'nine_of_pentacles',
      'ten-of-pentacles': 'ten_of_pentacles',
      'page-of-pentacles': 'page_of_pentacles',
      'knight-of-pentacles': 'knight_of_pentacles',
      'queen-of-pentacles': 'queen_of_pentacles',
      'king-of-pentacles': 'king_of_pentacles',

      // Pentacles suit - Serbian
      'novcic-as': 'ace_of_pentacles',
      'novcic-dvojka': 'two_of_pentacles',
      'novcic-trojka': 'three_of_pentacles',
      'novcic-cetvorka': 'four_of_pentacles',
      'novcic-petica': 'five_of_pentacles',
      'novcic-sestica': 'six_of_pentacles',
      'novcic-sedmica': 'seven_of_pentacles',
      'novcic-osmica': 'eight_of_pentacles',
      'novcic-devetka': 'nine_of_pentacles',
      'novcic-desetka': 'ten_of_pentacles',
      'novcic-paz': 'page_of_pentacles',
      'novcic-vitez': 'knight_of_pentacles',
      'novcic-kraljica': 'queen_of_pentacles',
      'novcic-kralj': 'king_of_pentacles',
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
