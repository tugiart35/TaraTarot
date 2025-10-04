'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import Link from 'next/link';
import { CATEGORY_PATHS } from '@/types/tarot-seo';

interface TarotCardRelatedProps {
  card: TarotCard;
  locale: Locale;
}

export function TarotCardRelated({ card, locale }: TarotCardRelatedProps) {
  const content = card.content[locale];
  const categoryPath = CATEGORY_PATHS[locale];

  return (
    <div className='bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>
        Related Cards
      </h3>

      {content.related.cards && content.related.cards.length > 0 ? (
        <div className='space-y-3'>
          {content.related.cards.map((cardId, index) => (
            <Link
              key={index}
              href={`/${locale}/${categoryPath}/${card.category === 'major_arcana' ? 'major-arcana' : 'minor-arcana'}/${cardId}`}
              className='block md:hidden p-3 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-h-[44px] min-w-[44px]'
            >
              <div className='flex flex-col md:flex-row items-center'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex flex-col md:flex-row items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200'>
                  <span className='text-white text-sm font-bold'>
                    {cardId.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className='font-medium text-gray-900 group-hover:text-purple-700 transition-colors duration-200'>
                    {cardId
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {card.category === 'major_arcana'
                      ? 'Major Arcana'
                      : 'Minor Arcana'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='text-center py-8'>
          <div className='w-16 h-16 bg-gray-200 rounded-full flex flex-col md:flex-row items-center justify-center mx-auto mb-4'>
            <span className='text-gray-600 text-2xl'>
              🔮
            </span>
          </div>
          <p className='text-gray-600'>
            No related cards available
          </p>
        </div>
      )}

      {/* Related Guides */}
      {content.related.guides && content.related.guides.length > 0 && (
        <div className='mt-6 pt-6 border-t border-gray-300'>
          <h4 className='text-md font-medium text-gray-900 mb-3'>
            Related Guides
          </h4>
          <div className='space-y-2'>
            {content.related.guides.map((guide, index) => (
              <Link
                key={index}
                href={`/${locale}/guides/${guide.toLowerCase().replace(/\s+/g, '-')}`}
                className='block text-purple-600 hover:text-purple-700 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
              >
                {guide}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
