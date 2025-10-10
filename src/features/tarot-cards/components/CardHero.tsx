import Image from 'next/image';
import { TarotCard, CardContent } from '@/types/tarot-cards';
import { CardMapping } from '../lib/card-mapping';

interface CardHeroProps {
  card: TarotCard;
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardHero({ card, content, locale }: CardHeroProps) {
  const cardName = CardMapping.getCardNameForLocale(card, locale);

  return (
    <section className='relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Card Image */}
          <div className='relative'>
            <div className='relative w-full max-w-md mx-auto'>
              <Image
                src={card.imageUrl}
                alt={cardName}
                width={400}
                height={600}
                className='rounded-lg shadow-2xl'
                priority
              />
              {/* Card Number Badge */}
              {card.arcanaType === 'major' && (
                <div className='absolute -top-4 -right-4 bg-yellow-500 text-black font-bold text-xl px-3 py-1 rounded-full shadow-lg'>
                  {card.number || 0}
                </div>
              )}
              {/* Minor Arcana Badge */}
              {card.arcanaType === 'minor' && card.suit && (
                <div className='absolute -top-4 -right-4 bg-white text-black font-bold text-sm px-3 py-1 rounded-full shadow-lg'>
                  {card.suit.toUpperCase()} {card.number}
                </div>
              )}
            </div>
          </div>

          {/* Card Content */}
          <div className='space-y-6'>
            {/* Card Title */}
            <div>
              <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
                {cardName}
              </h1>
              <p className='text-xl text-purple-200'>
                {locale === 'tr'
                  ? 'Major Arcana'
                  : locale === 'en'
                    ? 'Major Arcana'
                    : 'Velika Arkana'}
              </p>
            </div>

            {/* Card Description */}
            <div className='prose prose-lg prose-invert max-w-none'>
              <p className='text-lg leading-relaxed'>
                {content.short_description}
              </p>
            </div>

            {/* Card Keywords */}
            {content.keywords?.keywords_message && (
              <div className='flex flex-wrap gap-2'>
                {content.keywords.keywords_message.split(',').slice(0, 6).map((keyword, index) => (
                  <span
                    key={index}
                    className='bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium'
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Reading Time */}
            <div className='flex items-center space-x-2 text-purple-200'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                  clipRule='evenodd'
                />
              </svg>
              <span>
                {content.readingTime}{' '}
                {locale === 'tr'
                  ? 'dakika okuma'
                  : locale === 'en'
                    ? 'min read'
                    : 'min čitanje'}
              </span>
            </div>

            {/* CTA Button */}
            <div className='pt-4'>
              <a
                href='#meanings'
                className='inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl'
              >
                {locale === 'tr'
                  ? 'Detaylı Anlamları Gör'
                  : locale === 'en'
                    ? 'View Detailed Meanings'
                    : 'Pogledaj Detaljna Značenja'}
                <svg
                  className='w-5 h-5 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      </div>
    </section>
  );
}
