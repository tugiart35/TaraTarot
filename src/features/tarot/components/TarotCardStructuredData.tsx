'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import { getCardHreflangUrls } from '@/features/tarot/lib/card-loader';

interface TarotCardStructuredDataProps {
  card: TarotCard;
  locale: Locale;
}

export function TarotCardStructuredData({
  card,
  locale,
}: TarotCardStructuredDataProps) {
  const content = card.content[locale];
  const hreflangUrls = getCardHreflangUrls(card.id, card.names, card.slugs);

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: card.seo[locale].title,
    description: card.seo[locale].description,
    image: [
      {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/tarot-cards/${card.id}.jpg`,
        width: 400,
        height: 700,
        alt: card.names[locale],
      },
    ],
    author: {
      '@type': 'Organization',
      name: 'Büsbüskimki',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Büsbüskimki',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': hreflangUrls[locale],
    },
    keywords: card.seo[locale].keywords.join(', '),
    articleSection:
      card.category === 'major_arcana' ? 'Major Arcana' : 'Minor Arcana',
    about: {
      '@type': 'Thing',
      name: card.names[locale],
      description: content.short_description,
    },
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(question => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${card.names[locale]} kartı hakkında detaylı bilgi için profesyonel tarot okuması alabilirsiniz.`,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kartlar',
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name:
          card.category === 'major_arcana' ? 'Major Arcana' : 'Minor Arcana',
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice'}/${card.category === 'major_arcana' ? 'major-arcana' : 'minor-arcana'}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: card.names[locale],
        item: hreflangUrls[locale],
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {content.faq.length > 0 && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
