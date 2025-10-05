// Card Service - Reads from local JSON file instead of Supabase
import tarotCardsData from './tarot-cards.json';

export interface TarotCard {
  id: string;
  names: {
    tr: string;
    en: string;
    sr: string;
  };
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
  faq: string[];
  related: {
    cards: string[];
    guides: string[];
  };
  seo: {
    tr_title: string;
    tr_meta: string;
    en_title: string;
    en_meta: string;
  };
  keywords?: string[];
  app_brief?: string;
  app_brief_en?: string;
  long_description_tr?: string;
}

export class CardService {
  private static cards: TarotCard[] = tarotCardsData as any as TarotCard[];

  static getCardById(id: string): TarotCard | null {
    return this.cards.find(card => card.id === id) || null;
  }

  static getCardBySlug(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): TarotCard | null {
    return (
      this.cards.find(card => {
        const generatedSlug = this.getCardSlug(card, locale);
        return generatedSlug === slug;
      }) || null
    );
  }

  static getCardsByLocale(locale: 'tr' | 'en' | 'sr'): TarotCard[] {
    return this.cards.map(card => ({
      ...card,
      name: card.names[locale],
      description: card.short_description,
    }));
  }

  static getRelatedCards(cardId: string, limit: number = 4): TarotCard[] {
    const card = this.getCardById(cardId);
    if (!card || !card.related.cards) {
      return [];
    }

    const relatedCards = card.related.cards
      .map(relatedId => this.getCardById(relatedId))
      .filter(Boolean)
      .slice(0, limit);

    return relatedCards as TarotCard[];
  }

  static getAllCards(): TarotCard[] {
    return this.cards;
  }

  static getCardSlug(card: TarotCard, locale: 'tr' | 'en' | 'sr'): string {
    const name = card.names[locale].toLowerCase();
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

  static getCardUrl(card: TarotCard, locale: 'tr' | 'en' | 'sr'): string {
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
