'use client';

import { useI18n } from '@/hooks/shared/useI18n';
import { useTarotDeck } from '@/features/tarot/lib/full-tarot-deck';
import TarotCardGrid from './TarotCardGrid';
import Link from 'next/link';

interface TarotCategoryPageProps {
  category: 'major' | 'minor' | 'all';
  title: string;
  description: string;
  showDescription?: boolean;
  maxCards?: number;
  gridCols?: '2' | '3' | '4' | '6' | '8' | '13';
  cardSize?: 'sm' | 'md' | 'lg';
  relatedCategories?: Array<{
    title: string;
    href: string;
    color: 'purple' | 'pink' | 'blue' | 'green';
  }>;
}

export default function TarotCategoryPage({
  category,
  title,
  description,
  showDescription = true,
  maxCards,
  gridCols = '4',
  cardSize = 'md',
  relatedCategories = [],
}: TarotCategoryPageProps) {
  const { t, currentLocale } = useI18n();
  const tarotDeck = useTarotDeck();

  // Kartları kategorilere göre filtrele
  const getFilteredCards = () => {
    switch (category) {
      case 'major':
        return tarotDeck.filter((card: any) => card.id >= 0 && card.id <= 21);
      case 'minor':
        return tarotDeck.filter((card: any) => card.id >= 22 && card.id <= 77);
      case 'all':
      default:
        return tarotDeck;
    }
  };

  const filteredCards = getFilteredCards();

  const colorClasses = {
    purple:
      'bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30 text-purple-300',
    pink: 'bg-pink-600/20 border-pink-500/30 hover:bg-pink-600/30 text-pink-300',
    blue: 'bg-blue-600/20 border-blue-500/30 hover:bg-blue-600/30 text-blue-300',
    green:
      'bg-green-600/20 border-green-500/30 hover:bg-green-600/30 text-green-300',
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            {title}
          </h1>
          {showDescription && (
            <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
              {description}
            </p>
          )}
        </div>

        {/* Breadcrumb */}
        <nav className='mb-8'>
          <ol className='flex items-center space-x-2 text-sm text-slate-400'>
            <li>
              <Link href={`/${currentLocale}`} className='hover:text-white'>
                {t('common.home')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/${currentLocale}/${currentLocale === 'tr' ? 'kartlar' : currentLocale === 'en' ? 'cards' : 'kartice'}`}
                className='hover:text-white'
              >
                {t('tarot.cards.title')}
              </Link>
            </li>
            <li>/</li>
            <li className='text-white'>{title}</li>
          </ol>
        </nav>

        {/* Cards Grid */}
        <div className='bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8'>
          <TarotCardGrid
            cards={filteredCards}
            maxCards={maxCards || undefined}
            gridCols={gridCols}
            cardSize={cardSize}
            showCardNumbers={true}
          />
        </div>

        {/* Description */}
        {showDescription && (
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              {t(`tarot.categories.${category}.title`)}
            </h2>
            <div className='prose prose-invert max-w-none'>
              <p className='text-slate-300 leading-relaxed'>
                {t(`tarot.categories.${category}.description`)}
              </p>
            </div>
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {relatedCategories.map((related, index) => (
              <Link
                key={index}
                href={related.href}
                className={`border rounded-xl p-6 transition-colors ${colorClasses[related.color]}`}
              >
                <h3 className='text-xl font-bold mb-2'>{related.title}</h3>
                <p className='text-sm opacity-80'>
                  {t(
                    `tarot.categories.${related.title.toLowerCase().replace(/\s+/g, '-')}.description`
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
