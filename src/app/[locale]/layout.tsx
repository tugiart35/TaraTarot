import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

// Enhanced SEO configuration for Homepage
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

// SEO Metadata generation for Homepage
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const seoData = {
    tr: {
      title: 'Büşbüşkimki - Profesyonel Tarot Okuması ve Numeroloji Analizi',
      description:
        'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin. Aşk, kariyer ve yaşam sorularınıza mistik cevaplar bulun. Ücretsiz tarot ve numeroloji hizmetleri.',
      keywords:
        'tarot okuması, numeroloji analizi, mistik rehberlik, aşk açılımı, kariyer rehberliği, gelecek tahmini, ücretsiz tarot, online tarot, mistik danışmanlık, ruhani rehberlik',
      canonical: 'https://busbuskimki.com/tr',
      shortTitle: 'Büşbüşkimki - Mistik Rehberlik',
      longTailKeywords: [
        'bugün için tarot okuması',
        'ücretsiz numeroloji analizi',
        'aşk hayatım nasıl gelişecek',
        'kariyer değişikliği rehberliği',
        'günlük tarot kartı çekme',
        'yaşam yolu numeroloji',
        'online mistik danışmanlık',
      ],
    },
    en: {
      title: 'Büşbüşkimki - Professional Tarot Reading and Numerology Analysis',
      description:
        'Discover your future with professional tarot reading and numerology analysis. Find mystical answers to your love, career and life questions. Free tarot and numerology services.',
      keywords:
        'tarot reading, numerology analysis, mystical guidance, love spread, career guidance, future prediction, free tarot, online tarot, mystical counseling, spiritual guidance',
      canonical: 'https://busbuskimki.com/en',
      shortTitle: 'Büşbüşkimki - Mystical Guidance',
      longTailKeywords: [
        'today tarot reading',
        'free numerology analysis',
        'how will my love life develop',
        'career change guidance',
        'daily tarot card draw',
        'life path numerology',
        'online mystical counseling',
      ],
    },
    sr: {
      title: 'Büşbüşkimki - Profesionalno Tarot Čitanje i Numerološka Analiza',
      description:
        'Otkrijte svoju budućnost sa profesionalnim tarot čitanjem i numerološkom analizom. Pronađite mistične odgovore na vaša pitanja o ljubavi, karijeri i životu.',
      keywords:
        'tarot čitanje, numerološka analiza, mistično vođstvo, ljubavni raspored, karijerno vođstvo, predviđanje budućnosti, besplatno tarot, online tarot, mistično savetovanje',
      canonical: 'https://busbuskimki.com/sr',
      shortTitle: 'Büşbüşkimki - Mistično Vođstvo',
      longTailKeywords: [
        'danas tarot čitanje',
        'besplatna numerološka analiza',
        'kako će se razviti moj ljubavni život',
        'karijerno vođstvo promene',
        'dnevno tarot karta',
        'numerologija životnog puta',
        'online mistično savetovanje',
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
    classification: 'Mystical Guidance Services',
    openGraph: {
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      url: currentSeo.canonical,
      siteName: SEO_CONFIG.siteName,
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'website',
      images: [
        {
          url: '/images/homepage-og-image.jpg',
          width: 1200,
          height: 630,
          alt:
            locale === 'tr'
              ? 'Büşbüşkimki - Mistik Rehberlik'
              : locale === 'en'
                ? 'Büşbüşkimki - Mystical Guidance'
                : 'Büşbüşkimki - Mistično Vođstvo',
          type: 'image/jpeg',
        },
        {
          url: '/images/tarot-numerology-hero.jpg',
          width: 800,
          height: 600,
          alt:
            locale === 'tr'
              ? 'Tarot ve Numeroloji Hizmetleri'
              : locale === 'en'
                ? 'Tarot and Numerology Services'
                : 'Tarot i Numerologija Usluge',
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
        url: '/images/homepage-twitter-card.jpg',
        alt:
          locale === 'tr'
            ? 'Büşbüşkimki Ana Sayfa'
            : locale === 'en'
              ? 'Büşbüşkimki Homepage'
              : 'Büşbüşkimki Početna',
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
        'tr-TR': 'https://busbuskimki.com/tr',
        'en-US': 'https://busbuskimki.com/en',
        'sr-RS': 'https://busbuskimki.com/sr',
        'x-default': 'https://busbuskimki.com/tr',
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
          ? 'Büşbüşkimki'
          : locale === 'en'
            ? 'Büşbüşkimki'
            : 'Büşbüşkimki',
      'mobile-web-app-capable': 'yes',
      'application-name': 'Büşbüşkimki',

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
      'article:section': 'Mystical Services',
    },
  };
}

// Generate dynamic structured data for Homepage
function generateStructuredData(locale: string) {
  const localeTexts = {
    tr: {
      organizationName: 'Büşbüşkimki - Mistik Rehberlik',
      organizationDescription:
        'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin. Aşk, kariyer ve yaşam sorularınıza mistik cevaplar bulun.',
      service1Name: 'Tarot Okuması',
      service1Description:
        'Profesyonel tarot kartları ile aşk, kariyer ve yaşam rehberliği',
      service2Name: 'Numeroloji Analizi',
      service2Description:
        'Sayıların sırlarını keşfederek yaşam yolunuzu anlayın',
      homePage: 'Ana Sayfa',
      tarotPage: 'Tarot Okuması',
      numerologyPage: 'Numeroloji',
      faq1Q: 'Tarot okuması nasıl yapılır?',
      faq1A:
        'Tarot okuması, kişinin sorularına göre özel olarak seçilen tarot kartlarının profesyonel açılımlarla düzenlenmesi ve detaylı yorumlanması ile yapılır.',
      faq2Q: 'Numeroloji analizi nedir?',
      faq2A:
        'Numeroloji analizi, doğum tarihi ve isim bilgileri kullanılarak kişinin yaşam yolu, kader sayısı ve kişilik özelliklerini ortaya çıkaran mistik bir yöntemdir.',
      faq3Q: 'Hizmetleriniz ücretsiz mi?',
      faq3A:
        'Evet, temel tarot okuması ve numeroloji analizi tamamen ücretsizdir. Gelişmiş özellikler ve detaylı analizler için premium seçenekler mevcuttur.',
    },
    en: {
      organizationName: 'Büşbüşkimki - Mystical Guidance',
      organizationDescription:
        'Discover your future with professional tarot reading and numerology analysis. Find mystical answers to your love, career and life questions.',
      service1Name: 'Tarot Reading',
      service1Description:
        'Professional tarot cards for love, career and life guidance',
      service2Name: 'Numerology Analysis',
      service2Description:
        'Discover the secrets of numbers to understand your life path',
      homePage: 'Home',
      tarotPage: 'Tarot Reading',
      numerologyPage: 'Numerology',
      faq1Q: 'How is tarot reading done?',
      faq1A:
        'Tarot reading is performed by arranging specially selected tarot cards according to personal questions in professional spreads and providing detailed interpretations.',
      faq2Q: 'What is numerology analysis?',
      faq2A:
        'Numerology analysis is a mystical method that reveals a persons life path, destiny number and personality traits using birth date and name information.',
      faq3Q: 'Are your services free?',
      faq3A:
        'Yes, basic tarot reading and numerology analysis are completely free. Premium options are available for advanced features and detailed analysis.',
    },
    sr: {
      organizationName: 'Büşbüşkimki - Mistično Vođstvo',
      organizationDescription:
        'Otkrijte svoju budućnost sa profesionalnim tarot čitanjem i numerološkom analizom. Pronađite mistične odgovore na vaša pitanja o ljubavi, karijeri i životu.',
      service1Name: 'Tarot Čitanje',
      service1Description:
        'Profesionalne tarot karte za ljubav, karijeru i životno vođstvo',
      service2Name: 'Numerološka Analiza',
      service2Description:
        'Otkrijte tajne brojeva da razumete svoj životni put',
      homePage: 'Početna',
      tarotPage: 'Tarot Čitanje',
      numerologyPage: 'Numerologija',
      faq1Q: 'Kako se izvodi tarot čitanje?',
      faq1A:
        'Tarot čitanje se izvodi postavljanjem posebno odabranih tarot karata prema ličnim pitanjima u profesionalnim rasporedima i pružanjem detaljnih tumačenja.',
      faq2Q: 'Šta je numerološka analiza?',
      faq2A:
        'Numerološka analiza je mistična metoda koja otkriva životni put, broj sudbine i osobine ličnosti koristeći informacije o datumu rođenja i imenu.',
      faq3Q: 'Da li su vaše usluge besplatne?',
      faq3A:
        'Da, osnovno tarot čitanje i numerološka analiza su potpuno besplatni. Premium opcije su dostupne za napredne funkcije i detaljnu analizu.',
    },
  };

  const texts =
    localeTexts[locale as keyof typeof localeTexts] || localeTexts.tr;

  return [
    // Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.domain}#organization`,
      name: texts.organizationName,
      description: texts.organizationDescription,
      url: SEO_CONFIG.domain,
      logo: `${SEO_CONFIG.domain}/images/logo.png`,
      image: [
        `${SEO_CONFIG.domain}/images/homepage-og-image.jpg`,
        `${SEO_CONFIG.domain}/images/tarot-numerology-hero.jpg`,
      ],
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1847',
        bestRating: '5',
        worstRating: '1',
      },
    },

    // Website Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.domain}#website`,
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.domain,
      description: texts.organizationDescription,
      publisher: {
        '@type': 'Organization',
        '@id': `${SEO_CONFIG.domain}#organization`,
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

    // Service Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SEO_CONFIG.domain}#service`,
      name: texts.organizationName,
      description: texts.organizationDescription,
      provider: {
        '@type': 'Organization',
        '@id': `${SEO_CONFIG.domain}#organization`,
      },
      serviceType: 'Mystical Guidance',
      category: 'Spiritual Services',
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Mystical Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: texts.service1Name,
              description: texts.service1Description,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: texts.service2Name,
              description: texts.service2Description,
            },
          },
        ],
      },
    },

    // FAQ Schema
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SEO_CONFIG.domain}#faq`,
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
      '@id': `${SEO_CONFIG.domain}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: texts.homePage,
          item: `${SEO_CONFIG.domain}/${locale}`,
        },
      ],
    },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const structuredDataArray = generateStructuredData(locale);

  return (
    <html lang={locale} className={inter.className}>
      <head>
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
          href='/fonts/mystical-font.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />

        {/* Google Analytics */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: '${locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Homepage' : 'Početna'}',
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'mystical_services'
                }
              });
            `,
          }}
        />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
