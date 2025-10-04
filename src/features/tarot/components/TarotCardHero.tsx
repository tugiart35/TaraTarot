'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface TarotCardHeroProps {
  card: TarotCard;
  locale: Locale;
}

export const TarotCardHero = React.memo(function TarotCardHero({ card, locale }: TarotCardHeroProps) {
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Handle escape key
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  

  const [imageLoaded, setImageLoaded] = useState(false);
  
  const cardName = card.names[locale];
  const shortDescription = card.content[locale].short_description;
  const category = card.category === 'major_arcana' ? 'Major Arcana' : 'Minor Arcana';
  
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Card Image */}
          <div className="flex flex-col md:flex-row justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-96 lg:w-80 lg:h-[480px] relative rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 animate-pulse" />
                )}
                <Image
                  src={`/images/tarot-cards/${card.id}.jpg`}
                  alt={cardName}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
                
                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.4)] pointer-events-none" />
              </div>
              
              {/* Category Badge */}
              <div className="absolute -top-2 -right-4">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {category}
                </span>
              </div>
            </div>
          </div>
          
          {/* Card Info */}
          <div className="text-center lg:text-left space-y-6">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {cardName}
              </h1>
              
              <p className="text-xl lg:text-2xl text-purple-200 leading-relaxed max-w-2xl">
                {shortDescription}
              </p>
            </div>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {card.seo[locale].keywords.slice(0, 5).map((keyword, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {card.category === 'major_arcana' ? '22' : '56'}
                </div>
                <div className="text-purple-200 text-sm">
                  {card.category === 'major_arcana' ? 'Major Arcana' : 'Minor Arcana'}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {card.suit ? card.suit.toUpperCase() : 'MAJOR'}
                </div>
                <div className="text-purple-200 text-sm">
                  {card.suit ? 'Suit' : 'Arcana'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
});
