/**
 * PAGE SEO GENERATOR - Her sayfa için dinamik SEO metadata oluşturur
 *
 * Bu dosya, her sayfa için SEO metadata'sını dinamik olarak oluşturur.
 * Dil-spesifik SEO bilgileri, hreflang tags, canonical URL'ler ve structured data içerir.
 */

import { Metadata } from 'next';

// SEO-friendly URL mapping'leri
const seoFriendlyPaths = {
  tr: {
    '/': '/anasayfa',
    '/anasayfa': '/anasayfa',
    '/tarotokumasi': '/tarot-okuma',
    '/tarot-okuma': '/tarot-okuma',
    '/numeroloji': '/numeroloji',
    '/dashboard': '/panel',
    '/panel': '/panel',
    '/auth': '/giris',
    '/giris': '/giris',
  },
  en: {
    '/': '/home',
    '/home': '/home',
    '/anasayfa': '/home',
    '/tarotokumasi': '/tarot-reading',
    '/tarot-reading': '/tarot-reading',
    '/tarot-okuma': '/tarot-reading',
    '/numeroloji': '/numerology',
    '/numerology': '/numerology',
    '/dashboard': '/dashboard',
    '/auth': '/login',
    '/login': '/login',
  },
  sr: {
    '/': '/pocetna',
    '/pocetna': '/pocetna',
    '/anasayfa': '/pocetna',
    '/home': '/pocetna',
    '/tarotokumasi': '/tarot-citanje',
    '/tarot-citanje': '/tarot-citanje',
    '/tarot-okuma': '/tarot-citanje',
    '/tarot-reading': '/tarot-citanje',
    '/numeroloji': '/numerologija',
    '/numerologija': '/numerologija',
    '/numerology': '/numerologija',
    '/dashboard': '/panel',
    '/panel': '/panel',
    '/auth': '/prijava',
    '/prijava': '/prijava',
    '/giris': '/prijava',
    '/login': '/prijava',
  },
};

// Ana sayfa SEO bilgileri (seobilgileri.md'den alındı)
const homepageSeoData = {
  tr: {
    title: 'BüşBüşKimKi - Profesyonel Tarot ve Numeroloji Rehberliği',
    description:
      'BüşBüşKimKi ile tarot ve numeroloji hizmetleri ile kişisel rehberlik, yaşam ipuçları ve sezgisel yorumlar keşfedin.',
    keywords: [
      'tarot okuma',
      'numeroloji rehberi',
      'kişisel rehberlik',
      'hayat ipuçları',
      'sezgisel yorumlar',
      'tarot danışmanlığı',
      'numeroloji analiz',
      'kişisel gelişim',
    ],
    ogTitle: 'BüşBüşKimKi - Profesyonel Tarot ve Numeroloji Rehberliği',
    ogDescription:
      'BüşBüşKimKi ile hayatınıza rehberlik eden tarot ve numeroloji yorumlarını keşfedin ve kişisel gelişiminizi destekleyin.',
    twitterTitle: 'BüşBüşKimKi - Profesyonel Tarot ve Numeroloji Rehberliği',
    twitterDescription:
      'BüşBüşKimKi ile hayatınıza rehberlik eden tarot ve numeroloji yorumlarını keşfedin.',
  },
  en: {
    title: 'BüşBüşKimKi - Professional Tarot & Numerology Guidance',
    description:
      "Discover personal guidance and intuitive insights with BüşBüşKimKi's professional tarot and numerology services.",
    keywords: [
      'tarot reading',
      'numerology guidance',
      'personal guidance',
      'life insights',
      'intuitive readings',
      'tarot consultancy',
      'numerology analysis',
      'personal development',
    ],
    ogTitle: 'BüşBüşKimKi - Professional Tarot & Numerology Guidance',
    ogDescription:
      'Explore tarot and numerology insights at BüşBüşKimKi to support your personal growth and life decisions.',
    twitterTitle: 'BüşBüşKimKi - Professional Tarot & Numerology Guidance',
    twitterDescription:
      'Explore tarot and numerology insights at BüşBüşKimKi to support your personal growth.',
  },
  sr: {
    title: 'BüşBüşKimKi - Profesionalna Tarot i Numerologija',
    description:
      'Otkrijte lično vođenje i intuitivne uvide uz profesionalne tarot i numerologijske usluge BüşBüşKimKi.',
    keywords: [
      'tarot čitanje',
      'numerologija',
      'lični vodič',
      'životni saveti',
      'intuitivna čitanja',
      'tarot konsultacije',
      'numerološka analiza',
      'lični razvoj',
    ],
    ogTitle: 'BüşBüşKimKi - Profesionalna Tarot i Numerologija',
    ogDescription:
      'Istražite tarot i numerologiju uz BüşBüşKimKi i podržite lični razvoj i životne odluke.',
    twitterTitle: 'BüşBüşKimKi - Profesionalna Tarot i Numerologija',
    twitterDescription:
      'Istražite tarot i numerologiju uz BüşBüşKimKi i podržite lični razvoj.',
  },
};

/**
 * Ana sayfa için SEO metadata oluşturur
 */
export function generateHomepageMetadata(locale: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const seoData =
    homepageSeoData[locale as keyof typeof homepageSeoData] ||
    homepageSeoData.tr;

  // SEO-friendly URL'ler
  const localePaths = seoFriendlyPaths[locale as keyof typeof seoFriendlyPaths];
  const homePath = localePaths?.['/'] || '/';
  const canonicalUrl = `${baseUrl}/${locale}${homePath}`;

  // Hreflang URL'leri
  const hreflangUrls = {
    tr: `${baseUrl}/tr/anasayfa`,
    en: `${baseUrl}/en/home`,
    sr: `${baseUrl}/sr/pocetna`,
  };

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangUrls,
    },
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      url: canonicalUrl,
      siteName: 'BüşBüşKimKi',
      images: [
        {
          url: 'https://busbuskimki.com/assets/logo/social-og.jpg',
          width: 1200,
          height: 630,
          alt: 'BüşBüşKimKi',
        },
      ],
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: ['https://busbuskimki.com/assets/logo/twitter-card.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Ana sayfa için JSON-LD structured data oluşturur
 */
export function generateHomepageStructuredData(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const localePaths = seoFriendlyPaths[locale as keyof typeof seoFriendlyPaths];
  const homePath = localePaths?.['/'] || '/';
  const currentUrl = `${baseUrl}/${locale}${homePath}`;

  const structuredData = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BüşBüşKimKi',
      url: currentUrl,
      logo: 'https://busbuskimki.com/assets/logo/logo.png',
      sameAs: [
        'https://www.instagram.com/busbuskimki',
        'https://www.facebook.com/busbuskimki',
      ],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BüşBüşKimKi',
      url: currentUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${currentUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name:
        locale === 'tr'
          ? 'Tarot ve Numeroloji Yorumları'
          : locale === 'en'
            ? 'Tarot and Numerology Readings'
            : 'Tarot i Numerologija',
      url: currentUrl,
      description:
        locale === 'tr'
          ? 'BüşBüşKimKi, tarot ve numeroloji hizmetleri ile kişisel rehberlik ve sezgisel yorumlar sunar.'
          : locale === 'en'
            ? 'BüşBüşKimKi provides professional tarot and numerology services with personal guidance and intuitive insights.'
            : 'BüşBüşKimKi pruža profesionalne usluge tarota i numerologije sa ličnim vođenjem i intuitivnim uvidima.',
      provider: {
        '@type': 'Organization',
        name: 'BüşBüşKimKi',
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name:
            locale === 'tr' ? 'Anasayfa' : locale === 'en' ? 'Home' : 'Početna',
          item: currentUrl,
        },
      ],
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name:
            locale === 'tr'
              ? 'BüşBüşKimKi nedir?'
              : locale === 'en'
                ? 'What is BüşBüşKimKi?'
                : 'Šta je BüşBüşKimKi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              locale === 'tr'
                ? 'BüşBüşKimKi, tarot ve numeroloji odaklı profesyonel rehberlik hizmetleri sunan bir platformdur.'
                : locale === 'en'
                  ? 'BüşBüşKimKi is a platform providing professional guidance focused on tarot and numerology.'
                  : 'BüşBüşKimKi je platforma koja pruža profesionalno vođenje fokusirano na tarot i numerologiju.',
          },
        },
        {
          '@type': 'Question',
          name:
            locale === 'tr'
              ? 'Hizmetler nasıl alınır?'
              : locale === 'en'
                ? 'How to book a service?'
                : 'Kako se rezerviše usluga?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              locale === 'tr'
                ? 'Web sitesi üzerinden kişisel tarot veya numeroloji seansınızı seçebilir ve rezervasyon oluşturabilirsiniz.'
                : locale === 'en'
                  ? 'You can select your personal tarot or numerology session on the website and make a reservation.'
                  : 'Možete odabrati svoj lični tarot ili numerološki čas na sajtu i izvršiti rezervaciju.',
          },
        },
      ],
    },
  };

  return structuredData;
}

/**
 * Genel sayfa için SEO metadata oluşturur (gelecekteki sayfalar için)
 */
export function generatePageMetadata(locale: string): Metadata {
  // Bu fonksiyon gelecekteki sayfalar için genişletilecek
  // Şimdilik ana sayfa için kullanılıyor
  return generateHomepageMetadata(locale);
}

/**
 * SEO-friendly URL oluşturur
 */
export function getSeoFriendlyUrl(locale: string, path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const mapping = seoFriendlyPaths[locale as keyof typeof seoFriendlyPaths];
  const seoPath =
    mapping && path in mapping ? mapping[path as keyof typeof mapping] : path;
  return `${baseUrl}/${locale}${seoPath}`;
}
