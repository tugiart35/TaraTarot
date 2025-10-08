import { Metadata } from 'next';

// Enhanced SEO configuration for Numerology Result pages
const SEO_CONFIG = {
  siteName: 'Büşbüşkimki - Tarot ve Numeroloji',
  domain: 'https://busbuskimki.com',
  socialMedia: {
    instagram: 'https://instagram.com/busbuskimki',
    facebook: 'https://facebook.com/busbuskimki',
    twitter: 'https://twitter.com/busbuskimki',
    youtube: 'https://youtube.com/@busbuskimki',
  },
  contact: {
    email: 'iletisim@busbuskimki.com',
    phone: '+382 (67) 010176',
  },
} as const;

// SEO Metadata generation for Numerology Result pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const { locale, type } = await params;

  const typeLabels = {
    tr: {
      'life-path': 'Yaşam Yolu',
      'expression-destiny': 'İfade/Kader',
      'soul-urge': 'Ruh Arzusu',
      personality: 'Kişilik',
      'birthday-number': 'Doğum Günü',
      maturity: 'Olgunluk',
      'pinnacles-challenges': 'Zirveler/Zorluklar',
      'personal-cycles': 'Kişisel Döngüler',
      compatibility: 'Uyum Analizi',
    },
    en: {
      'life-path': 'Life Path',
      'expression-destiny': 'Expression/Destiny',
      'soul-urge': 'Soul Urge',
      personality: 'Personality',
      'birthday-number': 'Birthday Number',
      maturity: 'Maturity',
      'pinnacles-challenges': 'Pinnacles/Challenges',
      'personal-cycles': 'Personal Cycles',
      compatibility: 'Compatibility',
    },
    sr: {
      'life-path': 'Životni Put',
      'expression-destiny': 'Izražavanje/Sudbina',
      'soul-urge': 'Želja Duše',
      personality: 'Ličnost',
      'birthday-number': 'Broj Rođendana',
      maturity: 'Zrelost',
      'pinnacles-challenges': 'Vrhunci/Izazovi',
      'personal-cycles': 'Lični Ciklusi',
      compatibility: 'Kompatibilnost',
    },
  };

  const currentTypeLabel =
    typeLabels[locale as keyof typeof typeLabels]?.[
      type as keyof typeof typeLabels.tr
    ] || type;

  const seoData = {
    tr: {
      title: `${currentTypeLabel} Numeroloji Sonucu - Detaylı Analiz | Büşbüşkimki`,
      description: `Kişisel ${currentTypeLabel.toLowerCase()} numeroloji analiziniz hazır. Detaylı sayı yorumları, yaşam rehberliği ve kişisel gelişim önerileri.`,
      keywords: `${currentTypeLabel.toLowerCase()} numeroloji, numeroloji sonucu, sayı analizi, kişisel numeroloji, yaşam rehberliği, mistik analiz`,
      canonical: `https://busbuskimki.com/tr/numeroloji/${type}`,
      shortTitle: `${currentTypeLabel} Sonucu | Büşbüşkimki`,
    },
    en: {
      title: `${currentTypeLabel} Numerology Result - Detailed Analysis | Büşbüşkimki`,
      description: `Your personal ${currentTypeLabel.toLowerCase()} numerology analysis is ready. Detailed number interpretations, life guidance and personal development recommendations.`,
      keywords: `${currentTypeLabel.toLowerCase()} numerology, numerology result, number analysis, personal numerology, life guidance, mystical analysis`,
      canonical: `https://busbuskimki.com/en/numerology/${type}`,
      shortTitle: `${currentTypeLabel} Result | Büşbüşkimki`,
    },
    sr: {
      title: `${currentTypeLabel} Numerološki Rezultat - Detaljna Analiza | Büşbüşkimki`,
      description: `Vaša lična ${currentTypeLabel.toLowerCase()} numerološka analiza je spremna. Detaljna tumačenja brojeva, životno vođstvo i preporuke za lični razvoj.`,
      keywords: `${currentTypeLabel.toLowerCase()} numerologija, numerološki rezultat, analiza brojeva, lična numerologija, životno vođstvo, mistična analiza`,
      canonical: `https://busbuskimki.com/sr/numerologija/${type}`,
      shortTitle: `${currentTypeLabel} Rezultat | Büşbüşkimki`,
    },
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.tr;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    authors: [{ name: 'Büşbüşkimki', url: SEO_CONFIG.domain }],
    creator: 'Büşbüşkimki - Tarot ve Numeroloji',
    publisher: 'Büşbüşkimki',
    category: 'Spirituality & Numerology',
    classification: 'Numerology Analysis Results',
    openGraph: {
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      url: currentSeo.canonical,
      siteName: SEO_CONFIG.siteName,
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'article',
      images: [
        {
          url: '/images/numerology-result-og.jpg',
          width: 1200,
          height: 630,
          alt: `${currentTypeLabel} Numeroloji Sonucu - Büşbüşkimki`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@busbuskimki',
      creator: '@busbuskimki',
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      images: {
        url: '/images/numerology-result-twitter.jpg',
        alt: `${currentTypeLabel} Numeroloji Sonucu`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentSeo.canonical,
      languages: {
        'tr-TR': `https://busbuskimki.com/tr/numeroloji/${type}`,
        'en-US': `https://busbuskimki.com/en/numerology/${type}`,
        'sr-RS': `https://busbuskimki.com/sr/numerologija/${type}`,
        'x-default': `https://busbuskimki.com/tr/numeroloji/${type}`,
      },
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': `${currentTypeLabel} Sonucu`,
      'mobile-web-app-capable': 'yes',
      'application-name': 'Büşbüşkimki Numeroloji',
      'msapplication-TileColor': '#6366F1',
      'theme-color': '#6366F1',
      'color-scheme': 'light dark',
      'dns-prefetch': SEO_CONFIG.domain,
      preconnect: 'https://fonts.googleapis.com',
      referrer: 'strict-origin-when-cross-origin',
      rating: 'general',
      distribution: 'global',
      'revisit-after': '7 days',
      expires: 'never',
      pragma: 'no-cache',
      'geo.region': 'TR',
      'geo.position': '41.0082;28.9784',
      'geo.placename': 'Istanbul, Turkey',
      ICBM: '41.0082, 28.9784',
      'article:author': 'Büşbüşkimki',
      'article:publisher': SEO_CONFIG.domain,
      'article:section': 'Numerology Results',
    },
  };
}

// Generate dynamic structured data for Numerology Results
function generateStructuredData(locale: string, type: string) {
  const typeLabels = {
    tr: {
      'life-path': 'Yaşam Yolu',
      'expression-destiny': 'İfade/Kader',
      'soul-urge': 'Ruh Arzusu',
      personality: 'Kişilik',
      'birthday-number': 'Doğum Günü',
      maturity: 'Olgunluk',
      'pinnacles-challenges': 'Zirveler/Zorluklar',
      'personal-cycles': 'Kişisel Döngüler',
      compatibility: 'Uyum Analizi',
    },
    en: {
      'life-path': 'Life Path',
      'expression-destiny': 'Expression/Destiny',
      'soul-urge': 'Soul Urge',
      personality: 'Personality',
      'birthday-number': 'Birthday Number',
      maturity: 'Maturity',
      'pinnacles-challenges': 'Pinnacles/Challenges',
      'personal-cycles': 'Personal Cycles',
      compatibility: 'Compatibility',
    },
    sr: {
      'life-path': 'Životni Put',
      'expression-destiny': 'Izražavanje/Sudbina',
      'soul-urge': 'Želja Duše',
      personality: 'Ličnost',
      'birthday-number': 'Broj Rođendana',
      maturity: 'Zrelost',
      'pinnacles-challenges': 'Vrhunci/Izazovi',
      'personal-cycles': 'Lični Ciklusi',
      compatibility: 'Kompatibilnost',
    },
  };

  const currentTypeLabel =
    typeLabels[locale as keyof typeof typeLabels]?.[
      type as keyof typeof typeLabels.tr
    ] || type;

  return [
    // Article Schema for Result Page
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}#article`,
      headline: `${currentTypeLabel} Numeroloji Sonucu`,
      description: `Kişisel ${currentTypeLabel.toLowerCase()} numeroloji analiziniz ve detaylı yorumlar.`,
      url: `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}`,
      image: `${SEO_CONFIG.domain}/images/numerology-result-og.jpg`,
      author: {
        '@type': 'Person',
        name: 'Büşbüşkimki',
        url: SEO_CONFIG.domain,
      },
      publisher: {
        '@type': 'Organization',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.domain,
        logo: `${SEO_CONFIG.domain}/images/logo.png`,
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}`,
      },
      articleSection: 'Numerology Results',
      keywords: `${currentTypeLabel.toLowerCase()}, numeroloji, analiz, sonuç`,
    },

    // Breadcrumb Schema
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name:
            locale === 'tr'
              ? 'Ana Sayfa'
              : locale === 'en'
                ? 'Home'
                : 'Početna',
          item: `${SEO_CONFIG.domain}/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name:
            locale === 'tr'
              ? 'Numeroloji'
              : locale === 'en'
                ? 'Numerology'
                : 'Numerologija',
          item: `${SEO_CONFIG.domain}/${locale}/numeroloji`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: currentTypeLabel,
          item: `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}`,
        },
      ],
    },

    // WebPage Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}#webpage`,
      name: `${currentTypeLabel} Numeroloji Sonucu`,
      description: `Kişisel ${currentTypeLabel.toLowerCase()} numeroloji analiziniz ve detaylı yorumlar.`,
      url: `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SEO_CONFIG.domain}#website`,
      },
      about: {
        '@type': 'Thing',
        name: 'Numerology Analysis',
        description: 'Personal numerology analysis and guidance',
      },
      mainEntity: {
        '@type': 'Article',
        '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji/${type}#article`,
      },
    },
  ];
}

export default async function NumerologyResultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;
  const structuredDataArray = generateStructuredData(locale, type);

  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      {structuredDataArray.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}

      {/* Performance Optimization */}
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />
      <link rel='dns-prefetch' href='//www.google-analytics.com' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />

      {children}
    </>
  );
}
