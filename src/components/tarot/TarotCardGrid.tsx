'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/hooks/shared/useI18n';
// import { getCardImagePath, getCardUrl } from '@/lib/tarot/card-image-helper';
import { TarotCard } from '@/types/tarot';

interface TarotCardGridProps {
  cards: TarotCard[];
  showCardNumbers?: boolean;
  maxCards?: number | undefined;
  gridCols?: '2' | '3' | '4' | '6' | '8' | '13';
  cardSize?: 'sm' | 'md' | 'lg';
}

export default function TarotCardGrid({
  cards,
  showCardNumbers = true,
  maxCards,
  gridCols = '4',
  cardSize = 'md',
}: TarotCardGridProps) {
  const { currentLocale } = useI18n();

  const displayCards = maxCards ? cards.slice(0, maxCards) : cards;

  const gridClasses = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    '6': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    '8': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8',
    '13': 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-13',
  };

  const cardSizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const imageSizeClasses = {
    sm: 'mb-1',
    md: 'mb-2',
    lg: 'mb-3',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`grid ${gridClasses[gridCols]} gap-3`}>
      {displayCards.map(card => {
        const cardUrl = `/${currentLocale}/kartlar/${card.id}`;
        const cardImage = `/cards/${card.id}.jpg`;

        return (
          <Link
            key={card.id}
            href={cardUrl}
            className='group bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-105'
          >
            <div
              className={`${cardSizeClasses[cardSize]} ${imageSizeClasses[cardSize]}`}
            >
              <div className='aspect-[9/16] relative rounded-lg overflow-hidden bg-slate-600/50'>
                <Image
                  src={cardImage}
                  alt={card.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                  loading='lazy'
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                />
              </div>
              <div className='text-center'>
                <p
                  className={`text-white font-medium truncate ${textSizeClasses[cardSize]}`}
                >
                  {card.name}
                </p>
                {showCardNumbers && (
                  <p className='text-slate-400 text-xs'>#{card.id}</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
