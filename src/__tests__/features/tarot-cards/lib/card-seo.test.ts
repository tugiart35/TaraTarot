import { describe, it, expect } from '@jest/globals';
import { CardSEO } from '@/features/tarot-cards/lib/card-seo';
import { TarotCard, CardSEO as CardSEOType } from '@/types/tarot-cards';

describe('CardSEO Service', () => {
  const mockCard: TarotCard = {
    id: 'test-card-id',
    englishName: 'The Fool',
    turkishName: 'Joker',
    serbianName: 'Joker',
    arcanaType: 'major',
    imageUrl: '/images/the-fool.jpg',
    slug: { tr: 'joker', en: 'the-fool', sr: 'joker' },
    createdAt: new Date('2025-01-27'),
    updatedAt: new Date('2025-01-27'),
  };

  const mockSEO: CardSEOType = {
    id: 'test-seo-id',
    cardId: 'test-card-id',
    locale: 'tr',
    metaTitle: 'Joker Tarot Kartı Anlamı ve Yorumu | Ücretsiz Tarot Okuması',
    metaDescription:
      'Joker tarot kartının anlamı, yorumu ve hikayesi. Düz ve ters pozisyonlarda Joker kartının aşk, kariyer ve para yorumları.',
    canonicalUrl: '/tr/kartlar/joker',
    ogImage: '/images/the-fool-og.jpg',
    twitterImage: '/images/the-fool-twitter.jpg',
    keywords: ['joker tarot', 'tarot kartı', 'joker anlamı'],
    faq: [
      {
        question: 'Joker tarot kartı ne anlama gelir?',
        answer: 'Joker kartı yeni başlangıçları temsil eder.',
      },
      {
        question: 'Joker kartı aşk hayatında ne anlama gelir?',
        answer: 'Aşk hayatınızda yeni bir sayfa açılabilir.',
      },
    ],
    createdAt: new Date('2025-01-27'),
    updatedAt: new Date('2025-01-27'),
  };

  describe('generateMetadata', () => {
    it('should generate correct metadata for Turkish locale', () => {
      const metadata = CardSEO.generateMetadata(mockCard, mockSEO, 'tr');

      expect(metadata.title).toBe(mockSEO.metaTitle);
      expect(metadata.description).toBe(mockSEO.metaDescription);
      expect(metadata.canonical).toBe(mockSEO.canonicalUrl);
      expect(metadata.openGraph.title).toBe(mockSEO.metaTitle);
      expect(metadata.openGraph.description).toBe(mockSEO.metaDescription);
      expect(metadata.openGraph.url).toBe(mockSEO.canonicalUrl);
      expect(metadata.openGraph.images[0].url).toBe(mockSEO.ogImage);
      expect(metadata.openGraph.locale).toBe('tr_TR');
      expect(metadata.openGraph.type).toBe('article');
      expect(metadata.twitter.card).toBe('summary_large_image');
      expect(metadata.twitter.title).toBe(mockSEO.metaTitle);
      expect(metadata.twitter.description).toBe(mockSEO.metaDescription);
      expect(metadata.twitter.images[0]).toBe(mockSEO.twitterImage);
      expect(metadata.robots.index).toBe(true);
      expect(metadata.robots.follow).toBe(true);
      expect(metadata.alternates.canonical).toBe(mockSEO.canonicalUrl);
      expect(metadata.alternates.languages.tr).toBe('/tr/kartlar/joker');
      expect(metadata.alternates.languages.en).toBe('/en/cards/the-fool');
      expect(metadata.alternates.languages.sr).toBe('/sr/kartice/joker');
    });

    it('should generate correct metadata for English locale', () => {
      const englishSEO = { ...mockSEO, locale: 'en' as const };
      const metadata = CardSEO.generateMetadata(mockCard, englishSEO, 'en');

      expect(metadata.openGraph.locale).toBe('en_US');
    });

    it('should generate correct metadata for Serbian locale', () => {
      const serbianSEO = { ...mockSEO, locale: 'sr' as const };
      const metadata = CardSEO.generateMetadata(mockCard, serbianSEO, 'sr');

      expect(metadata.openGraph.locale).toBe('sr_RS');
    });
  });

  describe('generateStructuredData', () => {
    it('should generate correct structured data', () => {
      const structuredData = CardSEO.generateStructuredData(
        mockCard,
        mockSEO,
        'tr'
      );

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Article');
      expect(structuredData.headline).toBe(mockSEO.metaTitle);
      expect(structuredData.description).toBe(mockSEO.metaDescription);
      expect(structuredData.image).toBe(mockSEO.ogImage);
      expect(structuredData.url).toBe(mockSEO.canonicalUrl);
      expect(structuredData.author['@type']).toBe('Organization');
      expect(structuredData.author.name).toBe('busbuskimki');
      expect(structuredData.publisher['@type']).toBe('Organization');
      expect(structuredData.publisher.name).toBe('busbuskimki');
      expect(structuredData.datePublished).toBe(
        mockCard.createdAt.toISOString()
      );
      expect(structuredData.dateModified).toBe(
        mockCard.updatedAt.toISOString()
      );
      expect(structuredData.mainEntityOfPage['@type']).toBe('WebPage');
      expect(structuredData.mainEntityOfPage['@id']).toBe(mockSEO.canonicalUrl);
      expect(structuredData.about['@type']).toBe('Thing');
      expect(structuredData.about.name).toBe(mockCard.turkishName);
      expect(structuredData.about.description).toBe(mockSEO.metaDescription);
    });
  });

  describe('generateFAQStructuredData', () => {
    it('should generate correct FAQ structured data', () => {
      const faqData = CardSEO.generateFAQStructuredData(mockSEO);

      expect(faqData['@context']).toBe('https://schema.org');
      expect(faqData['@type']).toBe('FAQPage');
      expect(faqData.mainEntity).toHaveLength(2);
      expect(faqData.mainEntity[0]['@type']).toBe('Question');
      expect(faqData.mainEntity[0].name).toBe(mockSEO.faq[0].question);
      expect(faqData.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(faqData.mainEntity[0].acceptedAnswer.text).toBe(
        mockSEO.faq[0].answer
      );
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('should generate correct breadcrumb structured data for Turkish locale', () => {
      const breadcrumbData = CardSEO.generateBreadcrumbStructuredData(
        mockCard,
        'tr'
      );

      expect(breadcrumbData['@context']).toBe('https://schema.org');
      expect(breadcrumbData['@type']).toBe('BreadcrumbList');
      expect(breadcrumbData.itemListElement).toHaveLength(3);
      expect(breadcrumbData.itemListElement[0].position).toBe(1);
      expect(breadcrumbData.itemListElement[0].name).toBe('Ana Sayfa');
      expect(breadcrumbData.itemListElement[1].position).toBe(2);
      expect(breadcrumbData.itemListElement[1].name).toBe('Tarot Kartları');
      expect(breadcrumbData.itemListElement[2].position).toBe(3);
      expect(breadcrumbData.itemListElement[2].name).toBe(mockCard.turkishName);
    });

    it('should generate correct breadcrumb structured data for English locale', () => {
      const breadcrumbData = CardSEO.generateBreadcrumbStructuredData(
        mockCard,
        'en'
      );

      expect(breadcrumbData.itemListElement[0].name).toBe('Home');
      expect(breadcrumbData.itemListElement[1].name).toBe('Tarot Cards');
      expect(breadcrumbData.itemListElement[2].name).toBe(mockCard.englishName);
    });

    it('should generate correct breadcrumb structured data for Serbian locale', () => {
      const breadcrumbData = CardSEO.generateBreadcrumbStructuredData(
        mockCard,
        'sr'
      );

      expect(breadcrumbData.itemListElement[0].name).toBe('Početna');
      expect(breadcrumbData.itemListElement[1].name).toBe('Tarot Karte');
      expect(breadcrumbData.itemListElement[2].name).toBe(mockCard.serbianName);
    });
  });

  describe('generateHreflangTags', () => {
    it('should generate correct hreflang tags', () => {
      const hreflangTags = CardSEO.generateHreflangTags(mockCard);

      expect(hreflangTags).toHaveLength(4);
      expect(hreflangTags[0].hreflang).toBe('tr');
      expect(hreflangTags[0].href).toContain('/tr/kartlar/joker');
      expect(hreflangTags[1].hreflang).toBe('en');
      expect(hreflangTags[1].href).toContain('/en/cards/the-fool');
      expect(hreflangTags[2].hreflang).toBe('sr');
      expect(hreflangTags[2].href).toContain('/sr/kartice/joker');
      expect(hreflangTags[3].hreflang).toBe('x-default');
      expect(hreflangTags[3].href).toContain('/en/cards/the-fool');
    });
  });
});
