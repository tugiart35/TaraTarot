import { Metadata } from 'next';

// Enhanced SEO configuration with advanced optimization
const SEO_CONFIG = {
  siteName: 'Büşbüşkimki - Mistik Rehberlik',
  domain: 'https://busbuskimki.com',
  socialMedia: {
    instagram: 'https://instagram.com/busbuskimki',
    facebook: 'https://facebook.com/busbuskimki',
    twitter: 'https://twitter.com/busbuskimki',
    youtube: 'https://youtube.com/@busbuskimki',
  },
  contact: {
    email: 'iletisim@busbuskimki.com',
    phone: '+90-555-000-0000',
  },
} as const;

// SEO Metadata generation for Tarot Reading page with enhanced optimization
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const seoData = {
    tr: {
      title: 'Tarot Okuması - Profesyonel Tarot Açılımları | Büşbüşkimki',
      description:
        'Ücretsiz tarot okuması ile aşk, kariyer ve yaşam sorularınıza anında cevap bulun. 22 farklı tarot açılımı, profesyonel yorumlar ve kişisel rehberlik.',
      keywords:
        'ücretsiz tarot okuması, online tarot, aşk açılımı, kariyer tarot, gelecek tahmini, tarot kartları, mistik rehberlik, türkçe tarot, tarot falı, kişisel gelişim',
      canonical: 'https://busbuskimki.com/tr/tarotokumasi',
      shortTitle: 'Tarot Okuması | Büşbüşkimki',
      longTailKeywords: [
        'bugün için tarot okuması',
        'aşk hayatım nasıl gelişecek tarot',
        'kariyer değişikliği tarot rehberliği',
        'ücretsiz online tarot falı',
        'günlük tarot kartı çekme',
      ],
    },
    en: {
      title: 'Free Tarot Reading - Professional Tarot Spreads | Büşbüşkimki',
      description:
        'Get instant answers to your love, career and life questions with free professional tarot reading. 22 different spreads, expert interpretations and personal guidance.',
      keywords:
        'free tarot reading, online tarot, love spread, career guidance, tarot cards, mystical guidance, future prediction, daily tarot, personal development',
      canonical: 'https://busbuskimki.com/en/tarotokumasi',
      shortTitle: 'Tarot Reading | Büşbüşkimki',
      longTailKeywords: [
        'today tarot reading',
        'love life tarot guidance',
        'career change tarot advice',
        'free online tarot fortune',
        'daily tarot card draw',
      ],
    },
    sr: {
      title:
        'Besplatno Tarot Čitanje - Profesionalni Tarot Rasporedi | Büşbüşkimki',
      description:
        'Pronađite trenutne odgovore na vaša pitanja o ljubavi, karijeri i životu sa besplatnim profesionalnim tarot čitanjem.',
      keywords:
        'besplatno tarot čitanje, online tarot, ljubavni raspored, karijera, tarot karte, mistično vođstvo, predviđanje budućnosti',
      canonical: 'https://busbuskimki.com/sr/tarotokumasi',
      shortTitle: 'Tarot Čitanje | Büşbüşkimki',
      longTailKeywords: [
        'danas tarot čitanje',
        'ljubavni život tarot',
        'karijera promena tarot',
        'besplatno online tarot',
        'dnevni tarot karta',
      ],
    },
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.tr;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: `${currentSeo.keywords}, ${currentSeo.longTailKeywords.join(', ')}`,
    authors: [{ name: 'Büşbüşkimki', url: SEO_CONFIG.domain }],
    creator: 'Büşbüşkimki - Mistik Rehberlik',
    publisher: 'Büşbüşkimki',
    category: 'Spirituality & Mysticism',
    classification: 'Tarot Reading Services',
    openGraph: {
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      url: currentSeo.canonical,
      siteName: SEO_CONFIG.siteName,
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'website',
      images: [
        {
          url: '/images/tarot-og-image.jpg',
          width: 1200,
          height: 630,
          alt:
            locale === 'tr'
              ? 'Ücretsiz Tarot Okuması - Büşbüşkimki'
              : locale === 'en'
                ? 'Free Tarot Reading - Büşbüşkimki'
                : 'Besplatno Tarot Čitanje - Büşbüşkimki',
          type: 'image/jpeg',
        },
        {
          url: '/images/tarot-cards-spread.jpg',
          width: 800,
          height: 600,
          alt:
            locale === 'tr'
              ? 'Tarot Kartları Açılımı'
              : locale === 'en'
                ? 'Tarot Cards Spread'
                : 'Tarot Karte Raspored',
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
        url: '/images/tarot-twitter-card.jpg',
        alt:
          locale === 'tr'
            ? 'Tarot Okuması'
            : locale === 'en'
              ? 'Tarot Reading'
              : 'Tarot Čitanje',
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
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
    },
    alternates: {
      canonical: currentSeo.canonical,
      languages: {
        'tr-TR': 'https://busbuskimki.com/tr/tarotokumasi',
        'en-US': 'https://busbuskimki.com/en/tarotokumasi',
        'sr-RS': 'https://busbuskimki.com/sr/tarotokumasi',
        'x-default': 'https://busbuskimki.com/tr/tarotokumasi',
      },
      types: {
        'application/rss+xml': [
          {
            url: 'https://busbuskimki.com/rss.xml',
            title: 'Büşbüşkimki Blog RSS Feed',
          },
        ],
      },
    },
    other: {
      // PWA Meta Tags
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title':
        locale === 'tr'
          ? 'Tarot Okuması'
          : locale === 'en'
            ? 'Tarot Reading'
            : 'Tarot Čitanje',
      'mobile-web-app-capable': 'yes',
      'application-name': 'Büşbüşkimki Tarot',

      // Microsoft Tiles
      'msapplication-TileColor': '#8B4513',
      'msapplication-TileImage': '/icons/ms-icon-144x144.png',
      'msapplication-config': '/browserconfig.xml',

      // Theme and Colors
      'theme-color': '#8B4513',
      'color-scheme': 'light dark',

      // Performance Hints
      'dns-prefetch': SEO_CONFIG.domain,
      preconnect: 'https://fonts.googleapis.com',

      // Security
      referrer: 'strict-origin-when-cross-origin',

      // Additional SEO
      rating: 'general',
      distribution: 'global',
      'revisit-after': '7 days',
      expires: 'never',
      pragma: 'no-cache',

      // Geo Tags
      'geo.region': 'TR',
      'geo.position': '41.0082;28.9784',
      'geo.placename': 'Istanbul, Turkey',
      ICBM: '41.0082, 28.9784',

      // Article Tags
      'article:author': 'Büşbüşkimki',
      'article:publisher': SEO_CONFIG.domain,
      'article:section': 'Tarot & Spirituality',
    },
  };
}

// Generate dynamic structured data based on locale
function generateStructuredData(locale: string) {
  const localeTexts = {
    tr: {
      serviceName: 'Ücretsiz Tarot Okuması - Profesyonel Tarot Açılımları',
      serviceDescription:
        'Ücretsiz tarot okuması ile aşk, kariyer ve yaşam sorularınıza anında cevap bulun. 22 farklı tarot açılımı, profesyonel yorumlar ve kişisel rehberlik.',
      jobTitle: 'Profesyonel Tarot Okuyucusu ve Mistik Rehber',
      providerDescription:
        'Deneyimli tarot okuyucusu, mistik rehber ve spiritüel danışman',
      homePage: 'Ana Sayfa',
      tarotPage: 'Tarot Okuması',
      faq1Q: 'Tarot okuması nasıl yapılır?',
      faq1A:
        'Tarot okuması, kişinin sorularına göre özel olarak seçilen tarot kartlarının profesyonel açılımlarla düzenlenmesi ve detaylı yorumlanması ile yapılır.',
      faq2Q: 'Hangi konularda tarot okuması yapılabilir?',
      faq2A:
        'Aşk ve ilişkiler, kariyer ve iş hayatı, sağlık, finans, kişisel gelişim ve yaşam rehberliği konularında detaylı tarot okuması yapılabilir.',
      faq3Q: 'Tarot okuması ücretsiz mi?',
      faq3A:
        'Evet, temel tarot okuması tamamen ücretsizdir. Gelişmiş özellikler ve detaylı analizler için premium seçenekler mevcuttur.',
    },
    en: {
      serviceName: 'Free Tarot Reading - Professional Tarot Spreads',
      serviceDescription:
        'Get instant answers to your love, career and life questions with free professional tarot reading. 22 different spreads, expert interpretations and personal guidance.',
      jobTitle: 'Professional Tarot Reader and Mystical Guide',
      providerDescription:
        'Experienced tarot reader, mystical guide and spiritual advisor',
      homePage: 'Home',
      tarotPage: 'Tarot Reading',
      faq1Q: 'How is tarot reading done?',
      faq1A:
        'Tarot reading is performed by arranging specially selected tarot cards according to personal questions in professional spreads and providing detailed interpretations.',
      faq2Q: 'What topics can tarot reading cover?',
      faq2A:
        'Detailed tarot readings can be done on love and relationships, career and business life, health, finance, personal development and life guidance.',
      faq3Q: 'Is tarot reading free?',
      faq3A:
        'Yes, basic tarot reading is completely free. Premium options are available for advanced features and detailed analysis.',
    },
    sr: {
      serviceName: 'Besplatno Tarot Čitanje - Profesionalni Tarot Rasporedi',
      serviceDescription:
        'Pronađite trenutne odgovore na vaša pitanja o ljubavi, karijeri i životu sa besplatnim profesionalnim tarot čitanjem.',
      jobTitle: 'Profesionalni Tarot Čitač i Mistični Vodič',
      providerDescription:
        'Iskusni tarot čitač, mistični vodič i duhovni savetnik',
      homePage: 'Početna',
      tarotPage: 'Tarot Čitanje',
      faq1Q: 'Kako se izvodi tarot čitanje?',
      faq1A:
        'Tarot čitanje se izvodi postavljanjem posebno odabranih tarot karata prema ličnim pitanjima u profesionalnim rasporedima i pružanjem detaljnih tumačenja.',
      faq2Q: 'Koje teme može pokriti tarot čitanje?',
      faq2A:
        'Detaljno tarot čitanje može se uraditi na teme ljubavi i veza, karijere i poslovnog života, zdravlja, finansija, ličnog razvoja i životnog vođstva.',
      faq3Q: 'Da li je tarot čitanje besplatno?',
      faq3A:
        'Da, osnovno tarot čitanje je potpuno besplatno. Premium opcije su dostupne za napredne funkcije i detaljnu analizu.',
    },
  };

  const texts =
    localeTexts[locale as keyof typeof localeTexts] || localeTexts.tr;

  return [
    // Main Service Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SEO_CONFIG.domain}/${locale}/tarotokumasi#service`,
      name: texts.serviceName,
      description: texts.serviceDescription,
      url: `${SEO_CONFIG.domain}/${locale}/tarotokumasi`,
      image: [
        `${SEO_CONFIG.domain}/images/tarot-og-image.jpg`,
        `${SEO_CONFIG.domain}/images/tarot-cards-spread.jpg`,
        `${SEO_CONFIG.domain}/images/mystical-tarot.jpg`,
      ],
      provider: {
        '@type': 'Person',
        '@id': `${SEO_CONFIG.domain}#person`,
        name: 'Büşbüşkimki',
        jobTitle: texts.jobTitle,
        description: texts.providerDescription,
        url: SEO_CONFIG.domain,
        image: `${SEO_CONFIG.domain}/images/profile.jpg`,
        email: SEO_CONFIG.contact.email,
        telephone: SEO_CONFIG.contact.phone,
        sameAs: Object.values(SEO_CONFIG.socialMedia),
        knowsAbout: [
          'Tarot Reading',
          'Mystical Guidance',
          'Spiritual Counseling',
          'Love Tarot',
          'Career Guidance',
          'Life Coaching',
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certified Tarot Reader',
          credentialCategory: 'Professional Certification',
        },
      },
      serviceType: 'Tarot Reading',
      category: 'Mystical Services',
      audience: {
        '@type': 'Audience',
        audienceType: 'People seeking spiritual guidance',
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Turkey',
        },
        {
          '@type': 'Country',
          name: 'Global',
        },
      ],
      availableLanguage: [
        {
          '@type': 'Language',
          name: 'Turkish',
          alternateName: 'tr',
        },
        {
          '@type': 'Language',
          name: 'English',
          alternateName: 'en',
        },
        {
          '@type': 'Language',
          name: 'Serbian',
          alternateName: 'sr',
        },
      ],
      offers: {
        '@type': 'Offer',
        '@id': `${SEO_CONFIG.domain}/${locale}/tarotokumasi#offer`,
        description: texts.serviceDescription,
        category: 'Mystical Services',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'TRY',
          name: 'Free Basic Tarot Reading',
        },
        includesObject: [
          {
            '@type': 'Thing',
            name: 'Love Tarot Spread',
          },
          {
            '@type': 'Thing',
            name: 'Career Guidance Spread',
          },
          {
            '@type': 'Thing',
            name: 'Life Path Reading',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1847',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tarot Reading Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Love Tarot Reading',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Career Tarot Reading',
            },
          },
        ],
      },
    },

    // FAQ Schema
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SEO_CONFIG.domain}/${locale}/tarotokumasi#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: texts.faq1Q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: texts.faq1A,
          },
        },
        {
          '@type': 'Question',
          name: texts.faq2Q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: texts.faq2A,
          },
        },
        {
          '@type': 'Question',
          name: texts.faq3Q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: texts.faq3A,
          },
        },
      ],
    },

    // Breadcrumb Schema
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SEO_CONFIG.domain}/${locale}/tarotokumasi#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: texts.homePage,
          item: `${SEO_CONFIG.domain}/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: texts.tarotPage,
          item: `${SEO_CONFIG.domain}/${locale}/tarotokumasi`,
        },
      ],
    },

    // Website Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.domain}#website`,
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.domain,
      description: 'Professional tarot reading and mystical guidance services',
      publisher: {
        '@type': 'Person',
        '@id': `${SEO_CONFIG.domain}#person`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.domain}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: ['tr-TR', 'en-US', 'sr-RS'],
    },

    // Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.domain}#organization`,
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.domain,
      logo: `${SEO_CONFIG.domain}/images/logo.png`,
      description: 'Professional mystical guidance and tarot reading services',
      contactPoint: {
        '@type': 'ContactPoint',
        email: SEO_CONFIG.contact.email,
        telephone: SEO_CONFIG.contact.phone,
        contactType: 'Customer Service',
        availableLanguage: ['Turkish', 'English', 'Serbian'],
      },
      sameAs: Object.values(SEO_CONFIG.socialMedia),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressRegion: 'Istanbul',
      },
    },
  ];
}

export default async function TarotLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const structuredDataArray = generateStructuredData(locale);

  return (
    <>
      {/* Enhanced Structured Data for Maximum SEO */}
      {structuredDataArray.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}

      {/* Performance Optimization: DNS Prefetch */}
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />
      <link rel='dns-prefetch' href='//www.google-analytics.com' />
      <link rel='dns-prefetch' href='//connect.facebook.net' />

      {/* Preload Critical Resources */}
      <link
        rel='preload'
        href='/fonts/tarot-font.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />

      {children}
    </>
  );
}
