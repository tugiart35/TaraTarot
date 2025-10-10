/*
 * SEO Utilities
 * Dynamic meta tags ve Open Graph optimizasyonu
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

/**
 * Dynamic meta tags oluşturur
 */
export function generateMetaTags(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image = '/og-image.jpg',
    url = '',
    type = 'website',
    locale = 'tr',
  } = config;

  return {
    title: `${title} | Büşbüşkimki Tarot ve Numeroloji`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${title} | Büşbüşkimki Tarot ve Numeroloji`,
      description,
      url,
      siteName: 'Büşbüşkimki Tarot ve Numeroloji',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Büşbüşkimki Tarot ve Numeroloji`,
      description,
      images: [image],
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
 * Tarot okuma sayfası için SEO config
 */
export function getReadingSEOConfig(
  readingType: string,
  locale: string = 'tr'
): SEOConfig {
  const configs = {
    tr: {
      love: {
        title: 'Aşk Tarot Okuma',
        description:
          'Aşk hayatınız hakkında detaylı tarot okuma. Gelecekteki ilişkilerinizi keşfedin.',
        keywords: [
          'aşk tarot',
          'ilişki okuma',
          'aşk falı',
          'tarot kartları',
          'aşk rehberi',
        ],
      },
      career: {
        title: 'Kariyer Tarot Okuma',
        description:
          'Kariyeriniz ve iş hayatınız hakkında profesyonel tarot okuma. İş fırsatlarınızı keşfedin.',
        keywords: [
          'kariyer tarot',
          'iş okuma',
          'kariyer falı',
          'iş fırsatları',
          'profesyonel rehberlik',
        ],
      },
      problem: {
        title: 'Problem Çözme Tarot Okuma',
        description:
          'Hayatınızdaki problemleri çözmek için detaylı tarot okuma. Çözüm yollarını keşfedin.',
        keywords: [
          'problem çözme',
          'tarot rehberi',
          'yaşam koçluğu',
          'çözüm yolları',
          'kişisel gelişim',
        ],
      },
    },
    en: {
      love: {
        title: 'Love Tarot Reading',
        description:
          'Detailed tarot reading about your love life. Discover your future relationships.',
        keywords: [
          'love tarot',
          'relationship reading',
          'love fortune',
          'tarot cards',
          'love guidance',
        ],
      },
      career: {
        title: 'Career Tarot Reading',
        description:
          'Professional tarot reading about your career and work life. Discover your job opportunities.',
        keywords: [
          'career tarot',
          'job reading',
          'career fortune',
          'job opportunities',
          'professional guidance',
        ],
      },
      problem: {
        title: 'Problem Solving Tarot Reading',
        description:
          'Detailed tarot reading to solve problems in your life. Discover solution paths.',
        keywords: [
          'problem solving',
          'tarot guidance',
          'life coaching',
          'solution paths',
          'personal development',
        ],
      },
    },
  };

  const localeConfig = configs[locale as keyof typeof configs] || configs.tr;
  const readingConfig =
    localeConfig[readingType as keyof typeof localeConfig] || localeConfig.love;

  return {
    ...readingConfig,
    url: `/${locale}/reading/${readingType}`,
    image: `/og-images/${readingType}-${locale}.jpg`,
    locale,
  };
}

/**
 * Structured data (JSON-LD) oluşturur
 */
export function generateStructuredData(config: SEOConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.description,
    url: config.url,
    image: config.image,
    inLanguage: config.locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Büşbüşkimki Tarot ve Numeroloji',
      url: 'https://mystictarot.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: 'https://mystictarot.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: config.title,
          item: config.url,
        },
      ],
    },
  };
}
