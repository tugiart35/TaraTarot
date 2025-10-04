'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import React, { useState, useCallback } from 'react';

interface TarotCardCTAProps {
  card: TarotCard;
  locale: Locale;
}

export const TarotCardCTA = React.memo(function TarotCardCTA({ card, locale }: TarotCardCTAProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const content = card.content[locale];
  const cta = content.cta;
  
  const handleMainCTA = useCallback(() => {
    // Burada booking modal'ı açılabilir
    console.log('Main CTA clicked:', cta.main);
  }, [cta.main]);
  
  const handleMicroCTA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Email capture API call
      const response = await fetch('/api/email/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'tarot-card-micro-cta',
          cardId: card.id,
          locale,
        }),
      });
      
      if (response.ok) {
        alert('Thank you! We\'ll send you a quick interpretation.');
        setEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Main CTA */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Professional Reading</h3>
          <p className="text-purple-200 mb-6">
            Get a personalized interpretation for this card
          </p>
          
          <button
            onClick={handleMainCTA}
            className="w-full bg-white text-purple-700 font-semibold py-4 px-6 rounded-xl hover:bg-purple-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label={cta.main}
          >
            {cta.main}
          </button>
          
          <p className="text-purple-200 text-sm mt-3">
            Includes detailed analysis and guidance
          </p>
        </div>
      </div>
      
      {/* Micro CTA */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Quick Interpretation</h3>
          <p className="text-pink-200 mb-4">
            Get a brief email interpretation of this card
          </p>
          
          <form onSubmit={handleMicroCTA} className="space-y-3" role="form" aria-label="Contact form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
              aria-label="Email address"
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-pink-700 font-medium py-3 px-4 rounded-lg hover:bg-pink-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label={isSubmitting ? 'Sending...' : cta.micro}
            >
              {isSubmitting ? 'Sending...' : cta.micro}
            </button>
          </form>
          
          <p className="text-pink-200 text-xs mt-2">
            Free • No spam • Instant delivery
          </p>
        </div>
      </div>
      
      {/* Additional Services */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          More Services
        </h3>
        
        <div className="space-y-3">
          <a
            href="/tarotokumasi"
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-200">
              <span className="text-purple-600 text-lg">🔮</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Full Tarot Reading</div>
              <div className="text-sm text-gray-600">Complete spread analysis</div>
            </div>
          </a>
          
          <a
            href="/numeroloji"
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
              <span className="text-blue-600 text-lg">🔢</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Numerology Reading</div>
              <div className="text-sm text-gray-600">Life path analysis</div>
            </div>
          </a>
          
          <a
            href="/dashboard"
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
              <span className="text-green-600 text-lg">📊</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">My Readings</div>
              <div className="text-sm text-gray-600">View your history</div>
            </div>
          </a>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="bg-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Why Choose Us?
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <span className="text-gray-700">Professional tarot readers</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <span className="text-gray-700">Confidential & secure</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <span className="text-gray-700">Detailed interpretations</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <span className="text-gray-700">24/7 availability</span>
          </div>
        </div>
      </div>
    </div>
  );
});
