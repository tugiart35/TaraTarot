// Tarot Card Types
export interface TarotCard {
  id: string;
  englishName: string;
  turkishName: string;
  serbianName: string;
  arcanaType: 'major' | 'minor';
  suit?: 'cups' | 'swords' | 'wands' | 'pentacles';
  number?: number;
  imageUrl: string;
  slug: {
    tr: string;
    en: string;
    sr: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CardContent {
  id: string;
  cardId: string;
  locale: 'tr' | 'en' | 'sr';
  uprightMeaning: string;
  reversedMeaning: string;
  loveInterpretation: string;
  careerInterpretation: string;
  moneyInterpretation: string;
  spiritualInterpretation: string;
  story: string;
  keywords: string[];
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardSEO {
  id: string;
  cardId: string;
  locale: 'tr' | 'en' | 'sr';
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  twitterImage: string;
  keywords: string[];
  faq: FAQItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CardPage {
  locale: 'tr' | 'en' | 'sr';
  slug: string;
  cardId: string;
  path: string;
  isActive: boolean;
  lastModified: Date;
}

// Combined card data for page rendering
export interface CardPageData {
  card: TarotCard;
  content: CardContent;
  seo: CardSEO;
  relatedCards: TarotCard[];
}

// State management interfaces
export interface CardState {
  cards: TarotCard[];
  currentCard: TarotCard | null;
  currentContent: CardContent | null;
  currentSEO: CardSEO | null;
  loading: boolean;
  error: string | null;
}

export interface CardActions {
  loadCard: (slug: string, locale: string) => Promise<void>;
  loadRelatedCards: (cardId: string, arcanaType: string) => Promise<void>;
  updateCard: (cardId: string, updates: Partial<TarotCard>) => Promise<void>;
  clearError: () => void;
}

export interface URLState {
  locale: 'tr' | 'en' | 'sr';
  slug: string;
  path: string;
  canonicalUrl: string;
  alternateUrls: {
    tr: string;
    en: string;
    sr: string;
  };
}
