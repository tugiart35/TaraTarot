'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TarotCard, Locale } from '@/types/tarot-seo';
import Link from 'next/link';
import Image from 'next/image';

interface TarotCardsPageProps {
  locale: Locale;
}

export const TarotCardsPage = React.memo(function TarotCardsPage({ locale }: TarotCardsPageProps) {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'major_arcana' | 'minor_arcana'>('all');
  

  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/api/tarot/cards');
        const data = await response.json();
        
        if (data.success) {
          setCards(data.cards);
        }
      } catch (error) {
        console.error('Error loading cards:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCards();
  }, []);
  
  const filteredCards = useMemo(() => {
    if (!cards) return [];
    
    return cards.filter(card => {
      const matchesFilter = filter === 'all' || card.category === filter;
      const matchesSearch = searchTerm === '' || 
        card.names[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.content[locale].short_description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [cards, filter, searchTerm, locale]);
  
  const categoryPath = locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tarot cards...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Tarot Cards
          </h1>
          <p className="text-xl lg:text-2xl text-purple-200 max-w-3xl mx-auto">
            Explore the meanings and interpretations of all 78 tarot cards
          </p>
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="bg-white shadow-sm border-b border-gray-300">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Filter Buttons */}
            <div className="flex flex-col md:flex-row space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Cards
              </button>
              <button
                onClick={() => setFilter('major_arcana')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === 'major_arcana'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Major Arcana
              </button>
              <button
                onClick={() => setFilter('minor_arcana')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === 'minor_arcana'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Minor Arcana
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cards Grid */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filter === 'all' ? 'All Tarot Cards' : 
             filter === 'major_arcana' ? 'Major Arcana Cards' : 'Minor Arcana Cards'}
          </h2>
          <p className="text-gray-600">
            {filteredCards.length} cards found
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <Link
              key={card.id}
              href={`/${locale}/${categoryPath}/${card.category === 'major_arcana' ? 'major-arcana' : 'minor-arcana'}/${card.slugs[locale]}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <div className="relative h-64">
                <Image
                  src={`/images/tarot-cards/${card.id}.jpg`}
                  alt={card.names[locale]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    card.category === 'major_arcana'
                      ? 'bg-purple-600 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {card.category === 'major_arcana' ? 'Major' : 'Minor'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-200">
                  {card.names[locale]}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.content[locale].short_description}
                </p>
                
                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {card.seo[locale].keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-600 text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No cards found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>
    </div>
  );
});
