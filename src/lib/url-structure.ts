/**
 * URL Structure Utilities
 *
 * Bu dosya, gelişmiş URL yapısı için yardımcı fonksiyonlar içerir.
 */

import { Locale } from '@/types/tarot-seo';

// Kategori yolları
export const CATEGORY_PATHS = {
  tr: {
    major_arcana: 'buyuk-arkana',
    minor_arcana: 'kucuk-arkana',
    swords: 'kiliclar',
    cups: 'kupalar',
    wands: 'asalar',
    pentacles: 'tilsimlar',
  },
  en: {
    major_arcana: 'major-arcana',
    minor_arcana: 'minor-arcana',
    swords: 'swords',
    cups: 'cups',
    wands: 'wands',
    pentacles: 'pentacles',
  },
  sr: {
    major_arcana: 'velika-arkana',
    minor_arcana: 'mala-arkana',
    swords: 'mačevi',
    cups: 'čaše',
    wands: 'štapovi',
    pentacles: 'zlatnici',
  },
};

// Ana kategori yolları
export const MAIN_CATEGORY_PATHS = {
  tr: 'kartlar',
  en: 'cards',
  sr: 'kartice',
};

// Base URL
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

/**
 * Kart kategorisini belirle
 */
export function getCardCategory(cardId: string): string {
  if (cardId.includes('swords')) return 'swords';
  if (cardId.includes('cups')) return 'cups';
  if (cardId.includes('wands')) return 'wands';
  if (cardId.includes('pentacles')) return 'pentacles';
  if (
    cardId.includes('the_') ||
    cardId.includes('strength') ||
    cardId.includes('justice') ||
    cardId.includes('wheel_of_fortune') ||
    cardId.includes('death') ||
    cardId.includes('temperance') ||
    cardId.includes('the_hanged_man') ||
    cardId.includes('judgement')
  ) {
    return 'major_arcana';
  }
  return 'minor_arcana';
}

/**
 * Optimized slug oluştur
 */
export function generateOptimizedSlug(
  cardName: string,
  locale: Locale
): string {
  let slug = cardName.toLowerCase();

  // Türkçe karakter dönüşümü
  if (locale === 'tr') {
    const trMap = {
      ğ: 'g',
      ü: 'u',
      ş: 's',
      ı: 'i',
      ö: 'o',
      ç: 'c',
      Ğ: 'G',
      Ü: 'U',
      Ş: 'S',
      İ: 'I',
      Ö: 'O',
      Ç: 'C',
    };
    for (const [from, to] of Object.entries(trMap)) {
      slug = slug.replace(new RegExp(from, 'g'), to);
    }
  }

  // Sırpça karakter dönüşümü
  if (locale === 'sr') {
    const srMap = {
      ć: 'c',
      č: 'c',
      đ: 'd',
      š: 's',
      ž: 'z',
      Ć: 'C',
      Č: 'C',
      Đ: 'D',
      Š: 'S',
      Ž: 'Z',
    };
    for (const [from, to] of Object.entries(srMap)) {
      slug = slug.replace(new RegExp(from, 'g'), to);
    }
  }

  // Özel karakterleri temizle
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-|-$/g, '');

  return slug;
}

/**
 * Kategori URL'i oluştur
 */
export function generateCategoryUrl(cardId: string, locale: Locale): string {
  const category = getCardCategory(cardId);
  const categoryPath = (CATEGORY_PATHS[locale] as any)[category] || category;
  const mainPath = MAIN_CATEGORY_PATHS[locale];

  return `/${locale}/${mainPath}/${categoryPath}`;
}

/**
 * Tam kart URL'i oluştur
 */
export function generateCardUrl(
  cardId: string,
  cardName: string,
  locale: Locale
): string {
  const category = getCardCategory(cardId);
  const categoryPath = (CATEGORY_PATHS[locale] as any)[category] || category;
  const mainPath = MAIN_CATEGORY_PATHS[locale];
  const optimizedSlug = generateOptimizedSlug(cardName, locale);

  return `/${locale}/${mainPath}/${categoryPath}/${optimizedSlug}`;
}

/**
 * Breadcrumb URL'leri oluştur
 */
export function generateBreadcrumbUrls(
  cardId: string,
  cardName: string,
  locale: Locale
) {
  const category = getCardCategory(cardId);
  const categoryPath = (CATEGORY_PATHS[locale] as any)[category] || category;
  const mainPath = MAIN_CATEGORY_PATHS[locale];
  const optimizedSlug = generateOptimizedSlug(cardName, locale);

  return {
    home: `/${locale}`,
    cards: `/${locale}/${mainPath}`,
    category: `/${locale}/${mainPath}/${categoryPath}`,
    card: `/${locale}/${mainPath}/${categoryPath}/${optimizedSlug}`,
  };
}

/**
 * Hreflang URL'leri oluştur
 */
export function generateHreflangUrls(
  cardId: string,
  cardNames: Record<Locale, string>
): Record<string, string> {
  const hreflangUrls: Record<string, string> = {};

  // Her dil için URL oluştur
  for (const locale of ['tr', 'en', 'sr'] as Locale[]) {
    if (cardNames[locale]) {
      hreflangUrls[locale] = generateCardUrl(cardId, cardNames[locale], locale);
    }
  }

  // x-default olarak EN URL'ini ayarla
  hreflangUrls['x-default'] = hreflangUrls.en || hreflangUrls.tr || '';

  return hreflangUrls;
}

/**
 * Canonical URL oluştur
 */
export function generateCanonicalUrl(
  cardId: string,
  cardName: string,
  locale: Locale
): string {
  return `${BASE_URL}${generateCardUrl(cardId, cardName, locale)}`;
}

/**
 * Related URL'leri oluştur
 */
export function generateRelatedUrls(locale: Locale) {
  return {
    dailyTarot: `/${locale}/gunluk-tarot`,
    spreads: `/${locale}/acilimlar`,
    guides: `/${locale}/rehberler`,
    readings: `/${locale}/okumalar`,
  };
}

/**
 * Image URL'leri oluştur
 */
export function generateImageUrls(cardId: string) {
  return {
    card: `${BASE_URL}/images/cards/${cardId}.webp`,
    cardJpg: `${BASE_URL}/images/cards/${cardId}.jpg`,
    thumbnail: `${BASE_URL}/images/cards/thumbnails/${cardId}.webp`,
    social: `${BASE_URL}/images/cards/social/${cardId}.webp`,
  };
}

/**
 * Social sharing URL'leri oluştur
 */
export function generateSocialUrls(cardUrl: string, cardName: string) {
  const encodedUrl = encodeURIComponent(cardUrl);
  const encodedText = encodeURIComponent(cardName);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };
}

/**
 * Sitemap URL'leri oluştur
 */
export function generateSitemapUrls(
  cards: Array<{ id: string; names: Record<Locale, string> }>
) {
  const urls: Array<{
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }> = [];

  for (const card of cards) {
    for (const locale of ['tr', 'en', 'sr'] as Locale[]) {
      if (card.names[locale]) {
        const cardUrl = generateCardUrl(card.id, card.names[locale], locale);
        urls.push({
          url: `${BASE_URL}${cardUrl}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  }

  return urls;
}
