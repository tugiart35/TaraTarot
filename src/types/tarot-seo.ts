/*
 * Tarot SEO Projesi için TypeScript Interface'leri
 *
 * Bu dosya, 78 tarot kartı için çok dilli SEO optimizasyonu
 * projesinde kullanılan tüm type'ları tanımlar.
 */

// ============================================================================
// BÖLÜM 1: TEMEL TİPLER
// ============================================================================

/**
 * Desteklenen diller
 */
export type Locale = 'tr' | 'en' | 'sr';

/**
 * Kart kategorileri
 */
export type CardCategory = 'major_arcana' | 'minor_arcana';

/**
 * Minor Arcana takımları
 */
export type MinorArcanaSuit = 'cups' | 'swords' | 'wands' | 'pentacles';

// ============================================================================
// BÖLÜM 2: KART İÇERİK TİPLERİ
// ============================================================================

/**
 * Kart anlamları (düz ve ters)
 */
export interface CardMeanings {
  general: string;
  love: string;
  career: string;
  money: string;
  spiritual: string;
}

/**
 * Kart bağlamı (mitoloji ve Celtic Cross)
 */
export interface CardContext {
  mythology: string;
  celtic_cross: {
    future: string;
    hidden_influences: string;
  };
}

/**
 * CTA (Call to Action) bilgileri
 */
export interface CardCTA {
  main: string;
  micro: string;
}

/**
 * İlgili içerikler
 */
export interface CardRelated {
  cards: string[];
  guides: string[];
}

/**
 * Tek dil için kart içeriği
 */
export interface CardContent {
  short_description: string;
  meanings: {
    upright: CardMeanings;
    reversed: CardMeanings;
  };
  context: CardContext;
  faq: string[];
  cta: CardCTA;
  related: CardRelated;
}

// ============================================================================
// BÖLÜM 3: SEO TİPLERİ
// ============================================================================

/**
 * SEO meta verileri
 */
export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
}

/**
 * Tüm diller için SEO meta verileri
 */
export interface CardSEO {
  tr: SEOMeta;
  en: SEOMeta;
  sr: SEOMeta;
}

// ============================================================================
// BÖLÜM 4: KART İSİMLERİ VE SLUG'LAR
// ============================================================================

/**
 * Tüm diller için kart isimleri
 */
export interface CardNames {
  tr: string;
  en: string;
  sr: string;
}

/**
 * Tüm diller için URL slug'ları
 */
export interface CardSlugs {
  tr: string;
  en: string;
  sr: string;
}

// ============================================================================
// BÖLÜM 5: ANA KART İNTERFACE'İ
// ============================================================================

/**
 * Tam tarot kartı verisi - SEO projesi için
 */
export interface TarotCard {
  id: string;
  names: CardNames;
  slugs: CardSlugs;
  content: {
    tr: CardContent;
    en: CardContent;
    sr: CardContent;
  };
  seo: CardSEO;
  category: CardCategory;
  suit?: MinorArcanaSuit;
  number?: number;
}

// ============================================================================
// BÖLÜM 6: URL VE ROUTING TİPLERİ
// ============================================================================

/**
 * URL parametreleri
 */
export interface CardPageParams {
  locale: Locale;
  category: string;
  slug: string;
}

/**
 * Hreflang URL'leri
 */
export interface HreflangUrls {
  [locale: string]: string;
  'x-default': string;
}

// ============================================================================
// BÖLÜM 7: COMPONENT PROPS TİPLERİ
// ============================================================================

/**
 * TarotCardPage component props
 */
export interface TarotCardPageProps {
  card: TarotCard;
  locale: Locale;
}

/**
 * TarotCardHero component props
 */
export interface TarotCardHeroProps {
  card: TarotCard;
  locale: Locale;
}

/**
 * TarotCardContent component props
 */
export interface TarotCardContentProps {
  card: TarotCard;
  locale: Locale;
}

/**
 * TarotCardFAQ component props
 */
export interface TarotCardFAQProps {
  card: TarotCard;
  locale: Locale;
}

/**
 * TarotCardCTA component props
 */
export interface TarotCardCTAProps {
  card: TarotCard;
  locale: Locale;
}

/**
 * TarotCardRelated component props
 */
export interface TarotCardRelatedProps {
  card: TarotCard;
  locale: Locale;
}

// ============================================================================
// BÖLÜM 8: API VE DATA LOADING TİPLERİ
// ============================================================================

/**
 * Kart yükleme fonksiyonu sonucu
 */
export interface CardLoadResult {
  card: TarotCard | null;
  error?: string;
}

/**
 * Tüm kartları yükleme sonucu
 */
export interface AllCardsResult {
  cards: TarotCard[];
  total: number;
  error?: string;
}

/**
 * Slug validation sonucu
 */
export interface SlugValidationResult {
  isValid: boolean;
  cardId?: string;
  error?: string;
}

// ============================================================================
// BÖLÜM 9: UTILITY TİPLERİ
// ============================================================================

/**
 * Kart kategorisi path'leri
 */
export interface CategoryPaths {
  tr: string;
  en: string;
  sr: string;
}

/**
 * Dil ayarları
 */
export interface LocaleConfig {
  locale: Locale;
  name: string;
  nativeName: string;
  path: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * FAQ item
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ============================================================================
// BÖLÜM 10: CONSTANTS
// ============================================================================

/**
 * Desteklenen diller
 */
export const SUPPORTED_LOCALES: Locale[] = ['tr', 'en', 'sr'];

/**
 * Kart kategorisi path'leri
 */
export const CATEGORY_PATHS: CategoryPaths = {
  tr: 'kartlar',
  en: 'cards',
  sr: 'kartice',
};

/**
 * Dil konfigürasyonları
 */
export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  tr: {
    locale: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    path: 'tr',
  },
  en: {
    locale: 'en',
    name: 'English',
    nativeName: 'English',
    path: 'en',
  },
  sr: {
    locale: 'sr',
    name: 'Serbian',
    nativeName: 'Српски',
    path: 'sr',
  },
};

/**
 * Major Arcana kartları
 */
export const MAJOR_ARCANA_CARDS = [
  'the_fool',
  'the_magician',
  'the_high_priestess',
  'the_empress',
  'the_emperor',
  'the_hierophant',
  'the_lovers',
  'the_chariot',
  'strength',
  'the_hermit',
  'wheel_of_fortune',
  'justice',
  'the_hanged_man',
  'death',
  'temperance',
  'the_devil',
  'the_tower',
  'the_star',
  'the_moon',
  'the_sun',
  'judgement',
  'the_world',
] as const;

/**
 * Minor Arcana takımları
 */
export const MINOR_ARCANA_SUITS: MinorArcanaSuit[] = [
  'cups',
  'swords',
  'wands',
  'pentacles',
];

/**
 * Minor Arcana kartları (her takım için)
 */
export const MINOR_ARCANA_CARDS = [
  'ace',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'page',
  'knight',
  'queen',
  'king',
] as const;

// ============================================================================
// BÖLÜM 11: TYPE GUARDS
// ============================================================================

/**
 * Locale type guard
 */
export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

/**
 * Card category type guard
 */
export function isCardCategory(value: string): value is CardCategory {
  return ['major_arcana', 'minor_arcana'].includes(value);
}

/**
 * Minor Arcana suit type guard
 */
export function isMinorArcanaSuit(value: string): value is MinorArcanaSuit {
  return MINOR_ARCANA_SUITS.includes(value as MinorArcanaSuit);
}

/**
 * Major Arcana card type guard
 */
export function isMajorArcanaCard(value: string): boolean {
  return MAJOR_ARCANA_CARDS.includes(value as any);
}

/**
 * Minor Arcana card type guard
 */
export function isMinorArcanaCard(value: string): boolean {
  return MINOR_ARCANA_CARDS.includes(value as any);
}

// ============================================================================
// BÖLÜM 12: UTILITY FUNCTIONS TYPES
// ============================================================================

/**
 * Slug oluşturma fonksiyonu tipi
 */
export type SlugGenerator = (name: string, locale: Locale) => string;

/**
 * Kart yükleme fonksiyonu tipi
 */
export type CardLoader = (
  slug: string,
  locale: Locale
) => Promise<CardLoadResult>;

/**
 * SEO meta oluşturma fonksiyonu tipi
 */
export type SEOMetaGenerator = (card: TarotCard, locale: Locale) => SEOMeta;

/**
 * Hreflang URL oluşturma fonksiyonu tipi
 */
export type HreflangGenerator = (cardId: string) => HreflangUrls;
