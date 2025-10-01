/**
 * Schema.org JSON-LD structured data for SEO optimization
 * Provides rich snippets and enhanced search results
 */

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
  address: {
    '@type': string;
    addressCountry: string;
    addressLocality: string;
  };
}

export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': string;
    name: string;
  };
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
  inLanguage: string[];
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string;
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
      };
    }>;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface TarotReadingSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  serviceType: string;
  category: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

/**
 * Generate Organization schema for the business
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Busbuskimki - Tarot & Numerology',
    description: 'Professional tarot card readings and numerology services. Get personalized insights about love, career, and life guidance.',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-512.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+382 (67) 010176',
      contactType: 'customer service'
    },
    sameAs: [
      'https://www.facebook.com/busbuskimki',
      'https://www.instagram.com/busbuskimki'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ME',
      addressLocality: 'Montenegro'
    }
  };
}

/**
 * Generate Website schema for the main site
 */
export function generateWebSiteSchema(): WebSiteSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Busbuskimki - Tarot & Numerology',
    url: baseUrl,
    description: 'Professional tarot card readings and numerology services. Get personalized insights about love, career, and life guidance.',
    publisher: {
      '@type': 'Organization',
      name: 'Busbuskimki'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['tr', 'en', 'sr']
  };
}

/**
 * Generate Service schema for tarot/numerology services
 */
export function generateServiceSchema(): ServiceSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tarot & Numerology Services',
    description: 'Professional tarot card readings and numerology services for love, career, and life guidance.',
    provider: {
      '@type': 'Organization',
      name: 'Busbuskimki',
      url: baseUrl
    },
    serviceType: 'Personal Services',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tarot & Numerology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Love Tarot Reading',
            description: 'Get insights about your love life and relationships'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Career Tarot Reading',
            description: 'Discover your career path and professional opportunities'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Numerology Reading',
            description: 'Understand your life path through numerology'
          }
        }
      ]
    }
  };
}

/**
 * Generate Breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate FAQ schema for common questions
 */
export function generateFAQSchema(): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does tarot reading work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tarot reading is a form of divination that uses a deck of tarot cards to gain insight into various aspects of life, including love, career, and personal growth. Our professional readers interpret the cards to provide guidance and clarity.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is numerology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Numerology is the study of numbers and their influence on human life. By analyzing your birth date and name, numerology can reveal insights about your personality, life path, and future opportunities.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are the readings accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While tarot and numerology provide guidance and insights, the accuracy depends on various factors including the question asked, the interpretation, and how the guidance is applied to your life. Our readers are experienced professionals who provide thoughtful, personalized interpretations.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does a reading take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reading times vary depending on the type of reading. Simple spreads take 5-10 minutes, while comprehensive readings can take 15-30 minutes. You can choose the reading type that fits your schedule and needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I get a reading in my language?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our service is available in Turkish, English, and Serbian. You can select your preferred language when starting a reading.'
        }
      }
    ]
  };
}

/**
 * Generate Tarot Reading schema for specific readings
 */
export function generateTarotReadingSchema(readingType: string, price?: string): TarotReadingSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  
  const readingNames: Record<string, string> = {
    'love-spread': 'Love Tarot Reading',
    'career-spread': 'Career Tarot Reading',
    'situation-analysis': 'Situation Analysis Reading',
    'new-lover': 'New Lover Reading',
    'relationship-problems': 'Relationship Problems Reading'
  };
  
  const readingDescriptions: Record<string, string> = {
    'love-spread': 'Get insights about your love life, relationships, and romantic future',
    'career-spread': 'Discover your career path, professional opportunities, and work-life balance',
    'situation-analysis': 'Analyze your current situation and get guidance for the future',
    'new-lover': 'Explore potential new romantic connections and relationships',
    'relationship-problems': 'Address relationship challenges and find solutions'
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: readingNames[readingType] || 'Tarot Reading',
    description: readingDescriptions[readingType] || 'Professional tarot reading service',
    provider: {
      '@type': 'Organization',
      name: 'Busbuskimki',
      url: baseUrl
    },
    serviceType: 'Tarot Reading',
    category: 'Personal Services',
    offers: {
      '@type': 'Offer',
      price: price || '5',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock'
    }
  };
}

/**
 * Generate all schemas for the homepage
 */
export function generateHomepageSchemas() {
  return [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateServiceSchema(),
    generateFAQSchema()
  ];
}

/**
 * Generate schemas for a specific page
 */
export function generatePageSchemas(pageType: string, pageData?: any) {
  const schemas = [generateOrganizationSchema()];
  
  if (pageType === 'tarot-reading' && pageData?.readingType) {
    schemas.push(generateTarotReadingSchema(pageData.readingType, pageData.price));
  }
  
  if (pageData?.breadcrumbs) {
    schemas.push(generateBreadcrumbSchema(pageData.breadcrumbs));
  }
  
  return schemas;
}
