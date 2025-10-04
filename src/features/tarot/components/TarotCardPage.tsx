'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import { TarotCardHero } from './TarotCardHero';
import { TarotCardContent } from './TarotCardContent';
import { TarotCardCTA } from './TarotCardCTA';
import dynamic from 'next/dynamic';

const TarotCardFAQ = dynamic(() => import('./TarotCardFAQ').then(mod => ({ default: mod.TarotCardFAQ })), { 
  loading: () => <div className="animate-pulse h-32 bg-gray-200 rounded" />,
  ssr: false 
});

import { TarotCardRelated } from './TarotCardRelated';
import { TarotCardBreadcrumb } from './TarotCardBreadcrumb';
import { TarotCardStructuredData } from './TarotCardStructuredData';

interface TarotCardPageProps {
  card: TarotCard;
  locale: Locale;
}

export function TarotCardPage({ card, locale }: TarotCardPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Structured Data */}
      <TarotCardStructuredData card={card} locale={locale} />
      
      {/* Breadcrumb */}
      <TarotCardBreadcrumb card={card} locale={locale} />
      
      {/* Hero Section */}
      <TarotCardHero card={card} locale={locale} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl" id="main-content" role="main" tabIndex={-1}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <TarotCardContent card={card} locale={locale} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <TarotCardCTA card={card} locale={locale} />
            <TarotCardRelated card={card} locale={locale} />
          </div>
        </div>
      </main>
      
      {/* FAQ Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <TarotCardFAQ card={card} locale={locale} />
        </div>
      </section>
    </div>
  );
}
