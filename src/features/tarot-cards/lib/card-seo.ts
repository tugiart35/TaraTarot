import { TarotCard } from '@/types/tarot-cards';

// Card SEO service for generating metadata
export class CardSEO {
  // Generate metadata for a card
  static generateMetadata(
    card: TarotCard,
    seo: any,
    locale: 'tr' | 'en' | 'sr'
  ) {
    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      canonical: seo.canonicalUrl,
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription,
        url: seo.canonicalUrl,
        images: [
          {
            url: seo.ogImage,
            width: 1200,
            height: 630,
            alt: card.englishName,
          },
        ],
        locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.metaTitle,
        description: seo.metaDescription,
        images: [seo.twitterImage],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: seo.canonicalUrl,
        languages: {
          tr: `/tr/kartlar/${card.slug?.tr || card.slug}`,
          en: `/en/cards/${card.slug?.en || card.slug}`,
          sr: `/sr/kartice/${card.slug?.sr || card.slug}`,
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
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
    const cardName =
      locale === 'tr'
        ? card.turkishName
        : locale === 'en'
          ? card.englishName
          : card.serbianName;

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
      datePublished: card.createdAt?.toISOString() || new Date().toISOString(),
      dateModified: card.updatedAt?.toISOString() || new Date().toISOString(),
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
        const answer = typeof item === 'string' ? `Answer for ${item}` : item?.answer || '';
        
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
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
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
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

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
