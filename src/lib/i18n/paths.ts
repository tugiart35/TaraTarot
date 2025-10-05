import { createNavigation } from 'next-intl/navigation';

// Supported locales
export const locales = ['tr', 'en', 'sr'] as const;
export type Locale = (typeof locales)[number];

// Create navigation helpers
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
});

// Card URL patterns for each locale
export const cardUrlPatterns = {
  tr: '/kartlar',
  en: '/cards',
  sr: '/kartice',
} as const;

// Generate card URL for a specific locale
export function getCardUrl(slug: string, locale: Locale): string {
  const basePath = cardUrlPatterns[locale];
  return `/${locale}${basePath}/${slug}`;
}

// Generate all locale URLs for a card
export function getAllCardUrls(slug: string) {
  return {
    tr: getCardUrl(slug, 'tr'),
    en: getCardUrl(slug, 'en'),
    sr: getCardUrl(slug, 'sr'),
  };
}

// Extract locale from pathname
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const locale = segments[1];

  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return null;
}

// Extract slug from card pathname
export function getSlugFromCardPathname(
  pathname: string,
  locale: Locale
): string | null {
  const basePath = cardUrlPatterns[locale];
  const pattern = new RegExp(`^/${locale}${basePath}/(.+)$`);
  const match = pathname.match(pattern);

  return match ? match[1] || null : null;
}

// Check if pathname is a card page
export function isCardPage(pathname: string): boolean {
  return locales.some(locale => {
    const basePath = cardUrlPatterns[locale];
    const pattern = new RegExp(`^/${locale}${basePath}/.+$`);
    return pattern.test(pathname);
  });
}

// Generate hreflang URLs for a card
export function generateHreflangUrls(slug: string) {
  const urls = getAllCardUrls(slug);

  return [
    { hreflang: 'tr', href: urls.tr },
    { hreflang: 'en', href: urls.en },
    { hreflang: 'sr', href: urls.sr },
    { hreflang: 'x-default', href: urls.en }, // Default to English
  ];
}

// Card name mapping for different locales
export const cardNameMapping = {
  'the-fool': {
    tr: 'joker',
    en: 'the-fool',
    sr: 'joker',
  },
  'the-high-priestess': {
    tr: 'yuksek-rahibe',
    en: 'the-high-priestess',
    sr: 'visoka-svestenica',
  },
} as const;

// Get card slug for specific locale
export function getCardSlugForLocale(cardKey: string, locale: Locale): string {
  const mapping = cardNameMapping[cardKey as keyof typeof cardNameMapping];
  return mapping?.[locale] || cardKey;
}

// Get card key from slug and locale
export function getCardKeyFromSlug(
  slug: string,
  locale: Locale
): string | null {
  for (const [key, mapping] of Object.entries(cardNameMapping)) {
    if (mapping[locale] === slug) {
      return key;
    }
  }
  return null;
}

// Language switcher paths for current page
export function getLanguageSwitcherPaths(currentPathname: string) {
  const currentLocale = getLocaleFromPathname(currentPathname);
  if (!currentLocale) {
    return null;
  }

  // Extract the path without locale
  const pathWithoutLocale = currentPathname.replace(`/${currentLocale}`, '');

  // Generate paths for all locales
  const paths: Record<Locale, string> = {} as Record<Locale, string>;

  for (const locale of locales) {
    paths[locale] = `/${locale}${pathWithoutLocale}`;
  }

  return {
    currentLocale,
    paths,
    currentPath: currentPathname,
  };
}
