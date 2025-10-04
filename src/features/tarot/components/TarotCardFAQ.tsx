'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import React, { useState } from 'react';

interface TarotCardFAQProps {
  card: TarotCard;
  locale: Locale;
}

export const TarotCardFAQ = React.memo(function TarotCardFAQ({ card, locale }: TarotCardFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  
  const content = card.content[locale];
  const faqs = content.faq;
  
  // Eğer FAQ yoksa, genel FAQ'ler oluştur
  const defaultFAQs = [
    `${card.names[locale]} kartı ne anlama gelir?`,
    `${card.names[locale]} kartı ters geldiğinde ne demek?`,
    `${card.names[locale]} kartı aşk okumasında ne ifade eder?`,
    `${card.names[locale]} kartı kariyer okumasında ne anlama gelir?`,
    `${card.names[locale]} kartı para okumasında ne ifade eder?`
  ];
  
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  // FAQ cevaplarını oluştur
  const getFAQAnswer = (question: string) => {
    const cardName = card.names[locale];
    
    if (question.includes('ne anlama gelir')) {
      return `${cardName} kartı ${content.meanings.upright.general}`;
    }
    
    if (question.includes('ters geldiğinde')) {
      return `${cardName} kartı ters geldiğinde ${content.meanings.reversed.general}`;
    }
    
    if (question.includes('aşk okumasında')) {
      return `Aşk okumasında ${cardName} kartı ${content.meanings.upright.love}`;
    }
    
    if (question.includes('kariyer okumasında')) {
      return `Kariyer okumasında ${cardName} kartı ${content.meanings.upright.career}`;
    }
    
    if (question.includes('para okumasında')) {
      return `Para okumasında ${cardName} kartı ${content.meanings.upright.money}`;
    }
    
    return `${cardName} kartı hakkında daha fazla bilgi almak için profesyonel bir tarot okuması alabilirsiniz.`;
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Common questions about the {card.names[locale]} card
        </p>
      </div>
      
      <div className="space-y-4">
        {displayFAQs.map((question, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
              aria-expanded={openItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 pr-4">
                  {question}
                </h3>
                <div className={`transform transition-transform duration-200 ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}>
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </button>
            
            {openItems.includes(index) && (
              <div 
                id={`faq-answer-${index}`}
                className="px-6 py-4 bg-white border-t border-gray-300"
              >
                <p className="text-gray-700 leading-relaxed">
                  {getFAQAnswer(question)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": displayFAQs.map((question) => ({
              "@type": "Question",
              "name": question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": getFAQAnswer(question)
              }
            }))
          })
        }}
      />
    </div>
  );
});