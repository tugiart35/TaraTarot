'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import React, { useState } from 'react';

interface TarotCardContentProps {
  card: TarotCard;
  locale: Locale;
}

export const TarotCardContent = React.memo(function TarotCardContent({ card, locale }: TarotCardContentProps) {
  const [activeTab, setActiveTab] = useState<'upright' | 'reversed'>('upright');
  
  const content = card.content[locale];
  const meanings = content.meanings;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('upright')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'upright'
              ? 'bg-white text-purple-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Upright</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab('reversed')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'reversed'
              ? 'bg-white text-purple-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Reversed</span>
          </span>
        </button>
      </div>
      
      {/* Content */}
      <div className="space-y-8">
        {/* General Meaning */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            General Meaning
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>{meanings[activeTab].general}</p>
          </div>
        </section>
        
        {/* Specific Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Love & Relationships */}
          <section className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                ♥
              </span>
              Love & Relationships
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {meanings[activeTab].love}
            </p>
          </section>
          
          {/* Career & Work */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                💼
              </span>
              Career & Work
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {meanings[activeTab].career}
            </p>
          </section>
          
          {/* Money & Finances */}
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                💰
              </span>
              Money & Finances
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {meanings[activeTab].money}
            </p>
          </section>
          
          {/* Spiritual & Personal Growth */}
          <section className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                ✨
              </span>
              Spiritual & Growth
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {meanings[activeTab].spiritual}
            </p>
          </section>
        </div>
        
        {/* Context & Mythology */}
        {content.context.mythology && (
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-400">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                📚
              </span>
              Mythology & Context
            </h3>
            <p className="text-gray-700 leading-relaxed italic">
              {content.context.mythology}
            </p>
          </section>
        )}
        
        {/* Celtic Cross Positions */}
        {(content.context.celtic_cross.future || content.context.celtic_cross.hidden_influences) && (
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-400">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                🔮
              </span>
              Celtic Cross Positions
            </h3>
            <div className="space-y-4">
              {content.context.celtic_cross.future && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Future Position:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {content.context.celtic_cross.future}
                  </p>
                </div>
              )}
              {content.context.celtic_cross.hidden_influences && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Hidden Influences:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {content.context.celtic_cross.hidden_influences}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});