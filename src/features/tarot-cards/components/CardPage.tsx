import { CardPageData } from '@/types/tarot-cards';
import { CardHero } from './CardHero';
import { CardMeanings } from './CardMeanings';
import { CardKeywords } from './CardKeywords';
import { CardStory } from './CardStory';
import { CardCTA } from './CardCTA';
import { CardFAQ } from './CardFAQ';
import { RelatedCards } from './RelatedCards';
import { CardSEO } from '../lib/card-seo';

interface CardPageProps {
  card: CardPageData;
  locale: 'tr' | 'en' | 'sr';
}

export default function CardPage({ card, locale }: CardPageProps) {
  const { card: cardData, content, seo, relatedCards } = card;

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <CardHero card={cardData} content={content} locale={locale} />

      {/* Meanings Section */}
      <CardMeanings content={content} locale={locale} />

      {/* Keywords Section */}
      <CardKeywords content={content} locale={locale} />

      {/* Story Section */}
      <CardStory content={content} locale={locale} />

      {/* FAQ Section */}
      <CardFAQ seo={seo} locale={locale} />

      {/* CTA Section */}
      <CardCTA locale={locale} />

      {/* Related Cards Section */}
      <RelatedCards cards={relatedCards} locale={locale} />

      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            CardSEO.generateStructuredData(cardData, seo, locale)
          ),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CardSEO.generateFAQStructuredData(seo)),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            CardSEO.generateBreadcrumbStructuredData(cardData, locale)
          ),
        }}
      />
    </div>
  );
}
