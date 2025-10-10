import { CardPageData } from '@/types/tarot-cards';
import { CardHero } from './CardHero';
import { CardMeanings } from './CardMeanings';
import { CardKeywords } from './CardKeywords';
import { CardStory } from './CardStory';
import { CardAssociations } from './CardAssociations';
import { CardCombinations } from './CardCombinations';
import { CardAffirmations } from './CardAffirmations';
import { CardCTA } from './CardCTA';
import { CardFAQ } from './CardFAQ';
import { RelatedCards } from './RelatedCards';
import { CardSEO } from '../lib/card-seo';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface CardPageProps {
  card: CardPageData;
  locale: 'tr' | 'en' | 'sr';
}

export default function CardPage({ card, locale }: CardPageProps) {
  const { card: cardData, content, seo, relatedCards } = card;

  // Get the correct cards page URL based on locale
  const getCardsPageUrl = (locale: string) => {
    switch (locale) {
      case 'tr':
        return '/tr/kartlar';
      case 'en':
        return '/en/cards';
      case 'sr':
        return '/sr/kartice';
      default:
        return '/tr/kartlar';
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Back Button */}
      <div className='bg-white border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Link
            href={getCardsPageUrl(locale)}
            className='inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group'
          >
            <FaArrowLeft className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200' />
            {locale === 'tr' && 'Kartlara Geri Dön'}
            {locale === 'en' && 'Back to Cards'}
            {locale === 'sr' && 'Nazad na Karte'}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <CardHero card={cardData} content={content} locale={locale} />

      {/* Meanings Section */}
      <CardMeanings content={content} locale={locale} />

      {/* Keywords Section */}
      <CardKeywords content={content} locale={locale} />

      {/* Story Section */}
      <CardStory content={content} locale={locale} />

      {/* Associations Section - YENİ */}
      <CardAssociations content={content} locale={locale} />

      {/* Card Combinations Section - YENİ */}
      <CardCombinations content={content} locale={locale} />

      {/* Affirmations Section - YENİ */}
      <CardAffirmations content={content} locale={locale} />

      {/* FAQ Section */}
      <CardFAQ seo={seo} locale={locale} />

      {/* CTA Section */}
      <CardCTA content={content} locale={locale} />

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
