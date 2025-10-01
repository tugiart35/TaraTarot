import { Metadata } from 'next';

// Enhanced SEO configuration with advanced optimization for Numerology
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

// SEO Metadata generation for Numerology page with enhanced optimization
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const seoData = {
    tr: {
      title: 'Ücretsiz Numeroloji Analizi - Yaşam Yolu Hesaplama | Büşbüşkimki',
      description:
        'Ücretsiz numeroloji analizi ile yaşam yolunuzu, kader sayınızı ve kişilik özelliklerinizi keşfedin. 9 farklı numeroloji hesaplaması, detaylı analizler ve kişisel rehberlik.',
      keywords:
        'ücretsiz numeroloji, yaşam yolu hesaplama, kader sayısı, numeroloji analizi, doğum tarihi analizi, isim analizi, kişilik numerolojisi, uyumluluk hesaplama, sayıların gücü',
      canonical: 'https://busbuskimki.com/tr/numeroloji',
      shortTitle: 'Numeroloji Analizi | Büşbüşkimki',
      longTailKeywords: [
        'bugün için numeroloji analizi',
        'yaşam yolu numarası hesaplama',
        'isim numerolojisi analizi',
        'ücretsiz kader sayısı hesaplama',
        'numeroloji uyumluluk testi',
        'doğum tarihi numeroloji',
      ],
    },
    en: {
      title: 'Free Numerology Analysis - Life Path Calculation | Büşbüşkimki',
      description:
        'Discover your life path, destiny number and personality traits with free numerology analysis. 9 different numerology calculations, detailed analyses and personal guidance.',
      keywords:
        'free numerology, life path calculation, destiny number, numerology analysis, birth date analysis, name analysis, personality numerology, compatibility calculation, power of numbers',
      canonical: 'https://busbuskimki.com/en/numeroloji',
      shortTitle: 'Numerology Analysis | Büşbüşkimki',
      longTailKeywords: [
        'today numerology analysis',
        'life path number calculation',
        'name numerology analysis',
        'free destiny number calculation',
        'numerology compatibility test',
        'birth date numerology',
      ],
    },
    sr: {
      title:
        'Besplatna Numerološka Analiza - Izračun Životnog Puta | Büşbüşkimki',
      description:
        'Otkrijte svoj životni put, broj sudbine i osobine ličnosti sa besplatnom numerološkom analizom. 9 različitih numeroloških izračuna, detaljne analize i lično vođstvo.',
      keywords:
        'besplatna numerologija, izračun životnog puta, broj sudbine, numerološka analiza, analiza datuma rođenja, analiza imena, numerologija ličnosti, izračun kompatibilnosti',
      canonical: 'https://busbuskimki.com/sr/numeroloji',
      shortTitle: 'Numerološka Analiza | Büşbüşkimki',
      longTailKeywords: [
        'danas numerološka analiza',
        'broj životnog puta izračun',
        'numerologija imena analiza',
        'besplatan broj sudbine',
        'numerologija kompatibilnost test',
        'datum rođenja numerologija',
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
    category: 'Spirituality & Numerology',
    classification: 'Numerology Analysis Services',
    openGraph: {
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      url: currentSeo.canonical,
      siteName: SEO_CONFIG.siteName,
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'website',
      images: [
        {
          url: '/images/numerology-og-image.jpg',
          width: 1200,
          height: 630,
          alt:
            locale === 'tr'
              ? 'Ücretsiz Numeroloji Analizi - Büşbüşkimki'
              : locale === 'en'
                ? 'Free Numerology Analysis - Büşbüşkimki'
                : 'Besplatna Numerološka Analiza - Büşbüşkimki',
          type: 'image/jpeg',
        },
        {
          url: '/images/numbers-mystical.jpg',
          width: 800,
          height: 600,
          alt:
            locale === 'tr'
              ? 'Mistik Sayılar ve Numeroloji'
              : locale === 'en'
                ? 'Mystical Numbers and Numerology'
                : 'Mistični Brojevi i Numerologija',
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
        url: '/images/numerology-twitter-card.jpg',
        alt:
          locale === 'tr'
            ? 'Numeroloji Analizi'
            : locale === 'en'
              ? 'Numerology Analysis'
              : 'Numerološka Analiza',
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
        'tr-TR': 'https://busbuskimki.com/tr/numeroloji',
        'en-US': 'https://busbuskimki.com/en/numeroloji',
        'sr-RS': 'https://busbuskimki.com/sr/numeroloji',
        'x-default': 'https://busbuskimki.com/tr/numeroloji',
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
          ? 'Numeroloji'
          : locale === 'en'
            ? 'Numerology'
            : 'Numerologija',
      'mobile-web-app-capable': 'yes',
      'application-name': 'Büşbüşkimki Numeroloji',

      // Microsoft Tiles
      'msapplication-TileColor': '#6366F1',
      'msapplication-TileImage': '/icons/ms-icon-144x144.png',
      'msapplication-config': '/browserconfig.xml',

      // Theme and Colors
      'theme-color': '#6366F1',
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
      'article:section': 'Numerology & Spirituality',
    },
  };
}

// Generate dynamic structured data based on locale for Numerology
function generateStructuredData(locale: string) {
  const localeTexts = {
    tr: {
      serviceName: 'Ücretsiz Numeroloji Analizi - Yaşam Yolu Hesaplama',
      serviceDescription:
        'Ücretsiz numeroloji analizi ile yaşam yolunuzu, kader sayınızı ve kişilik özelliklerinizi keşfedin. 9 farklı numeroloji hesaplaması, detaylı analizler ve kişisel rehberlik.',
      jobTitle: 'Profesyonel Numerolog ve Mistik Rehber',
      providerDescription:
        'Deneyimli numerolog, yaşam koçu ve spiritüel danışman',
      homePage: 'Ana Sayfa',
      numerologyPage: 'Numeroloji',
      faq1Q: 'Numeroloji analizi nasıl yapılır?',
      faq1A:
        'Numeroloji analizi, kişinin doğum tarihi ve adı kullanılarak özel matematiksel hesaplamalar yapılması ve sonuçların detaylı yorumlanması ile gerçekleştirilir.',
      faq2Q: 'Hangi konularda numeroloji analizi yapılabilir?',
      faq2A:
        'Yaşam yolu, kader sayısı, kişilik analizi, uyumluluk testi, kariyer rehberliği ve kişisel gelişim konularında detaylı numeroloji analizi yapılabilir.',
      faq3Q: 'Numeroloji analizi ücretsiz mi?',
      faq3A:
        'Evet, temel numeroloji analizi tamamen ücretsizdir. Gelişmiş özellikler ve detaylı raporlar için premium seçenekler mevcuttur.',
    },
    en: {
      serviceName: 'Free Numerology Analysis - Life Path Calculation',
      serviceDescription:
        'Discover your life path, destiny number and personality traits with free numerology analysis. 9 different numerology calculations, detailed analyses and personal guidance.',
      jobTitle: 'Professional Numerologist and Mystical Guide',
      providerDescription:
        'Experienced numerologist, life coach and spiritual advisor',
      homePage: 'Home',
      numerologyPage: 'Numerology',
      faq1Q: 'How is numerology analysis done?',
      faq1A:
        'Numerology analysis is performed by making special mathematical calculations using a persons birth date and name, and providing detailed interpretations of the results.',
      faq2Q: 'What topics can numerology analysis cover?',
      faq2A:
        'Detailed numerology analysis can be done on life path, destiny number, personality analysis, compatibility testing, career guidance and personal development.',
      faq3Q: 'Is numerology analysis free?',
      faq3A:
        'Yes, basic numerology analysis is completely free. Premium options are available for advanced features and detailed reports.',
    },
    sr: {
      serviceName: 'Besplatna Numerološka Analiza - Izračun Životnog Puta',
      serviceDescription:
        'Otkrijte svoj životni put, broj sudbine i osobine ličnosti sa besplatnom numerološkom analizom.',
      jobTitle: 'Profesionalni Numerolog i Mistični Vodič',
      providerDescription:
        'Iskusni numerolog, životni trener i duhovni savetnik',
      homePage: 'Početna',
      numerologyPage: 'Numerologija',
      faq1Q: 'Kako se izvodi numerološka analiza?',
      faq1A:
        'Numerološka analiza se izvodi posebnim matematičkim izračunima koristeći datum rođenja i ime osobe, i pružanjem detaljnih tumačenja rezultata.',
      faq2Q: 'Koje teme može pokriti numerološka analiza?',
      faq2A:
        'Detaljna numerološka analiza može se uraditi na teme životnog puta, broja sudbine, analize ličnosti, testova kompatibilnosti, karijernog vođstva i ličnog razvoja.',
      faq3Q: 'Da li je numerološka analiza besplatna?',
      faq3A:
        'Da, osnovna numerološka analiza je potpuno besplatna. Premium opcije su dostupne za napredne funkcije i detaljne izveštaje.',
    },
  };

  const texts =
    localeTexts[locale as keyof typeof localeTexts] || localeTexts.tr;

  return [
    // Main Service Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji#service`,
      name: texts.serviceName,
      description: texts.serviceDescription,
      url: `${SEO_CONFIG.domain}/${locale}/numeroloji`,
      image: [
        `${SEO_CONFIG.domain}/images/numerology-og-image.jpg`,
        `${SEO_CONFIG.domain}/images/numbers-mystical.jpg`,
        `${SEO_CONFIG.domain}/images/numerology-calculator.jpg`,
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
          'Numerology',
          'Life Path Analysis',
          'Destiny Number',
          'Name Analysis',
          'Compatibility Analysis',
          'Personal Development',
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certified Numerologist',
          credentialCategory: 'Professional Certification',
        },
      },
      serviceType: 'Numerology Analysis',
      category: 'Mystical Services',
      audience: {
        '@type': 'Audience',
        audienceType: 'People seeking life guidance through numbers',
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
        '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji#offer`,
        description: texts.serviceDescription,
        category: 'Mystical Services',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'TRY',
          name: 'Free Basic Numerology Analysis',
        },
        includesObject: [
          {
            '@type': 'Thing',
            name: 'Life Path Number',
          },
          {
            '@type': 'Thing',
            name: 'Destiny Number',
          },
          {
            '@type': 'Thing',
            name: 'Personality Analysis',
          },
          {
            '@type': 'Thing',
            name: 'Compatibility Testing',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '967',
        bestRating: '5',
        worstRating: '1',
      },
    },

    // FAQ Schema
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji#faq`,
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
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji#breadcrumb`,
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
          name: texts.numerologyPage,
          item: `${SEO_CONFIG.domain}/${locale}/numeroloji`,
        },
      ],
    },

    // WebApplication Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${SEO_CONFIG.domain}/${locale}/numeroloji#webapp`,
      name: texts.serviceName,
      description: texts.serviceDescription,
      url: `${SEO_CONFIG.domain}/${locale}/numeroloji`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '967',
      },
    },
  ];
}

export default async function NumerologyLayout({
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
        href='/fonts/numerology-font.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />

      {children}
    </>
  );
}
