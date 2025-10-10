import { TarotCard } from '@/types/tarot-cards';

// Card SEO service for generating metadata
export class CardSEO {
  // Normalize URL for canonical consistency
  private static normalizeUrl(url: string): string {
    // Ensure https and remove www for consistency
    let normalized = url.replace(/^https?:\/\/(www\.)?/, 'https://');
    
    // Remove trailing slash for SEO best practices
    normalized = normalized.replace(/\/$/, '');
    
    return normalized;
  }

  // Generate metadata for a card
  static generateMetadata(
    card: TarotCard,
    seo: any,
    locale: 'tr' | 'en' | 'sr'
  ) {
    const baseUrl = this.normalizeUrl(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
    );
    
    // Safe date handling with proper fallbacks
    const publishedDate = card.createdAt?.toISOString() || new Date('2025-01-01').toISOString();
    const modifiedDate = card.updatedAt?.toISOString() || publishedDate;
    
    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      // ✅ EKLE: keywords
      keywords: Array.isArray(seo.keywords) 
        ? seo.keywords.join(', ') 
        : seo.keywords || '',
      
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription,
        url: seo.canonicalUrl,
        siteName: 'Büşbüşkimki Tarot ve Numeroloji', // ✅ DÜZELTİLDİ
        images: [
          {
            url: seo.ogImage,
            width: 1200,
            height: 630,
            alt: `${card.turkishName || card.englishName} tarot kartı`, // ✅ EKLE
          },
        ],
        locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
        type: 'article',
        // ✅ EKLE: Article metadata with safe fallbacks
        publishedTime: publishedDate,
        modifiedTime: modifiedDate,
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.metaTitle,
        description: seo.metaDescription,
        images: [seo.twitterImage],
        site: '@busbuskimki', // ✅ EKLE: Twitter handle'ınız
        creator: '@busbuskimki', // ✅ EKLE
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
      alternates: {
        canonical: seo.canonicalUrl,
        languages: {
          tr: `${baseUrl}/tr/kartlar/${card.slug?.tr || card.slug}`,
          en: `${baseUrl}/en/cards/${card.slug?.en || card.slug}`,
          sr: `${baseUrl}/sr/kartice/${card.slug?.sr || card.slug}`,
        },
      },
    };
  }

  // Generate structured data (JSON-LD)
  static generateStructuredData(
    card: TarotCard,
    seo: any,
    locale: 'tr' | 'en' | 'sr'
  ) {
    const baseUrl = this.normalizeUrl(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
    );
    const cardName =
      locale === 'tr'
        ? card.turkishName
        : locale === 'en'
          ? card.englishName
          : card.serbianName;

    // Safe date handling with proper fallbacks
    const publishedDate = card.createdAt?.toISOString() || new Date('2025-01-01').toISOString();
    const modifiedDate = card.updatedAt?.toISOString() || publishedDate;

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.metaTitle,
      description: seo.metaDescription,
      image: seo.ogImage,
      url: seo.canonicalUrl,
      author: {
        '@type': 'Organization',
        name: 'busbuskimki',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'busbuskimki',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      datePublished: publishedDate,
      dateModified: modifiedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seo.canonicalUrl,
      },
      about: {
        '@type': 'Thing',
        name: cardName,
        description: seo.metaDescription,
      },
    };
  }

  // Generate FAQ structured data
  static generateFAQStructuredData(seo: any) {
    const faqItems = Array.isArray(seo.faq) ? seo.faq : [];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item: any) => {
        // Handle both object and string formats
        const question = typeof item === 'string' ? item : item?.question || '';
        const answer =
          typeof item === 'string' ? `Answer for ${item}` : item?.answer || '';

        return {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        };
      }),
    };
  }

  // Generate breadcrumb structured data
  static generateBreadcrumbStructuredData(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ) {
    const baseUrl = this.normalizeUrl(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
    );
    const cardName =
      locale === 'tr'
        ? card.turkishName
        : locale === 'en'
          ? card.englishName
          : card.serbianName;

    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name:
          locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Home' : 'Početna',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'tr'
            ? 'Tarot Kartları'
            : locale === 'en'
              ? 'Tarot Cards'
              : 'Tarot Karte',
        item: `${baseUrl}/${locale}/${locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cardName,
        item: `${baseUrl}/${locale}/${locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice'}/${card.slug?.[locale] || card.slug}`,
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    };
  }

  // Generate hreflang tags
  static generateHreflangTags(card: TarotCard) {
    const baseUrl = this.normalizeUrl(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
    );

    return [
      {
        hreflang: 'tr',
        href: `${baseUrl}/tr/kartlar/${card.slug.tr}`,
      },
      {
        hreflang: 'en',
        href: `${baseUrl}/en/cards/${card.slug.en}`,
      },
      {
        hreflang: 'sr',
        href: `${baseUrl}/sr/kartice/${card.slug.sr}`,
      },
      {
        hreflang: 'x-default',
        href: `${baseUrl}/en/cards/${card.slug.en}`,
      },
    ];
  }
}
