/**
 * Enhanced SEO Meta Generator
 * Gelişmiş SEO meta tag üretimi için utility fonksiyonlar
 */

import type { Metadata } from 'next';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  nofollow?: boolean;
}

export interface LocaleAlternate {
  locale: string;
  url: string;
}

/**
 * Gelişmiş metadata üretimi
 */
export function generateEnhancedMetadata(
  config: PageSEOConfig,
  locale: string = 'tr',
  alternates?: LocaleAlternate[]
): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType = 'website',
    noindex,
    nofollow,
  } = config;

  // Robots meta
  const robots: Record<string, boolean | number> = {
    index: !noindex,
    follow: !nofollow,
  };

  // Open Graph metadata
  const openGraph: Metadata['openGraph'] = {
    type: ogType,
    locale: locale,
    title: title,
    description: description,
    siteName: 'Büsbüşkimki',
    images: ogImage
      ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ]
      : [
          {
            url: '/og-image.webp',
            width: 1200,
            height: 630,
            alt: 'Büsbüşkimki - Profesyonel Tarot Falı',
          },
        ],
  };

  // Twitter Card metadata
  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ogImage ? [ogImage] : ['/og-image.webp'],
  };

  // Alternate languages
  const languageAlternates: Record<string, string> = {};
  if (alternates) {
    alternates.forEach(alt => {
      languageAlternates[alt.locale] = alt.url;
    });
  }

  return {
    title: {
      default: title,
      template: '%s | Büsbüşkimki',
    },
    description: description,
    keywords: keywords?.join(', '),
    robots: robots,
    openGraph: openGraph,
    twitter: twitter,
    alternates: {
      canonical: canonical,
      languages:
        Object.keys(languageAlternates).length > 0
          ? languageAlternates
          : undefined,
    },
    other: {
      'google-site-verification':
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
  };
}

/**
 * Card sayfaları için özel meta generator
 */
export function generateCardPageMetadata(
  cardName: string,
  cardDescription: string,
  locale: string,
  slug: string
): Metadata {
  const localePrefix =
    locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

  return generateEnhancedMetadata(
    {
      title: `${cardName} - Tarot Kartı Anlamı ve Yorumu`,
      description: cardDescription,
      keywords: [
        'tarot',
        cardName,
        'tarot kartı',
        'tarot falı',
        'tarot yorumu',
        'tarot anlamı',
      ],
      canonical: `${baseUrl}/${locale}/${localePrefix}/${slug}`,
      ogImage: `/cards/rws/${slug}.webp`,
      ogType: 'article',
    },
    locale,
    [
      { locale: 'tr', url: `${baseUrl}/tr/kartlar/${slug}` },
      { locale: 'en', url: `${baseUrl}/en/cards/${slug}` },
      { locale: 'sr', url: `${baseUrl}/sr/kartice/${slug}` },
    ]
  );
}

/**
 * Homepage için meta generator
 */
export function generateHomepageMetadata(locale: string): Metadata {
  const titles = {
    tr: 'Büsbüşkimki - Profesyonel Online Tarot Falı ve Numeroloji',
    en: 'Büsbüşkimki - Professional Online Tarot Reading and Numerology',
    sr: 'Büsbüşkimki - Profesionalno Online Tarot Čitanje i Numerologija',
  };

  const descriptions = {
    tr: 'Profesyonel tarot falı, numeroloji analizi ve kişisel rehberlik. Aşk, kariyer, para ve ilişki danışmanlığı için güvenilir tarot okuyucusu.',
    en: 'Professional tarot reading, numerology analysis and personal guidance. Trusted tarot reader for love, career, money and relationship advice.',
    sr: 'Profesionalno tarot čitanje, numerologija analiza i lično vođenje. Pouzdan tarot čitač za ljubav, karijeru, novac i savete o vezi.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

  return generateEnhancedMetadata(
    {
      title: titles[locale as keyof typeof titles] || titles.tr,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.tr,
      keywords: [
        'tarot',
        'tarot falı',
        'numeroloji',
        'online fal',
        'tarot okuyucusu',
        'aşk falı',
        'kariyer falı',
      ],
      canonical: `${baseUrl}/${locale}`,
      ogImage: '/og-home.webp',
    },
    locale,
    [
      { locale: 'tr', url: `${baseUrl}/tr` },
      { locale: 'en', url: `${baseUrl}/en` },
      { locale: 'sr', url: `${baseUrl}/sr` },
    ]
  );
}

/**
 * Tarot reading pages için meta generator
 */
export function generateReadingPageMetadata(
  readingType: string,
  locale: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const readingNames = {
    love: {
      tr: 'Aşk Falı',
      en: 'Love Reading',
      sr: 'Ljubavno Čitanje',
    },
    career: {
      tr: 'Kariyer Falı',
      en: 'Career Reading',
      sr: 'Karijera Čitanje',
    },
    money: {
      tr: 'Para Falı',
      en: 'Money Reading',
      sr: 'Novac Čitanje',
    },
  };

  const name =
    readingNames[readingType as keyof typeof readingNames]?.[
      locale as 'tr' | 'en' | 'sr'
    ] || 'Tarot Reading';

  return generateEnhancedMetadata(
    {
      title: `${name} - Online Tarot Okuma`,
      description: `Profesyonel ${name.toLowerCase()} ile geleceğinizi keşfedin. Detaylı tarot analizi ve rehberlik.`,
      keywords: ['tarot', name.toLowerCase(), 'online tarot', 'tarot falı'],
      canonical: `${baseUrl}/${locale}/tarotokumasi/${readingType}`,
      ogImage: `/Spread/${readingType}.webp`,
    },
    locale
  );
}

/**
 * Admin pages için meta generator (noindex)
 */
export function generateAdminMetadata(
  title: string,
  locale: string = 'tr'
): Metadata {
  return generateEnhancedMetadata(
    {
      title: `${title} - Admin Panel`,
      description: 'Admin panel - Yönetim arayüzü',
      noindex: true,
      nofollow: true,
    },
    locale
  );
}
