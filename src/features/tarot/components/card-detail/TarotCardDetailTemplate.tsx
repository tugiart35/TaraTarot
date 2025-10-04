'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';
import { TarotCard } from '@/types/tarot';

interface TarotCardDetailTemplateProps {
  card: TarotCard;
  cardImage: string;
  readingTime?: number;
  breadcrumbs?: Array<{ label: string; href: string }>;
  onShare?: () => void;
  onBookReading?: () => void;
  onQuickReading?: () => void;
  relatedCards?: TarotCard[];
  relatedGuides?: Array<{ title: string; href: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  // Detaylı içerik için yeni props
  cardData?: {
    content?: {
      upright?: {
        description?: {
          tr?: string;
          en?: string;
          sr?: string;
        };
        keywords?: string[];
        sections?: {
          aşk?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          kariyer?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          para?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          ruhsal?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
        };
      };
      reversed?: {
        description?: {
          tr?: string;
          en?: string;
          sr?: string;
        };
        keywords?: string[];
        sections?: {
          aşk?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          kariyer?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          para?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
          ruhsal?: {
            tr?: string;
            en?: string;
            sr?: string;
          };
        };
      };
    };
    context?: {
      description?: {
        tr?: string;
        en?: string;
        sr?: string;
      };
      celtic_cross_positions?: string[];
    };
  };
}

// Kart görseli helper fonksiyonu
const getCardImagePath = ({ cardId }: { cardId: string }) => {
  return `/cards/${cardId}.jpg`;
};

export default function TarotCardDetailTemplate({
  card,
  cardImage,
  readingTime = 4,
  breadcrumbs = [],
  onShare,
  relatedCards = [],
  relatedGuides = [],
  faqItems = [],
}: TarotCardDetailTemplateProps) {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState<'upright' | 'reversed'>('upright');
  
  // Kart verilerini tr.json'dan çek
  const getCardData = (key: string) => {
    return t(`cardDetail.cards.${card.id}.${key}`);
  };

  const getCardMeaning = (position: 'upright' | 'reversed', section: string) => {
    return t(`cardDetail.cards.${card.id}.meanings.${position}.${section}`);
  };

  const getCardContext = (key: string) => {
    return t(`cardDetail.cards.${card.id}.context.${key}`);
  };
  
  // Kart görseli - önce prop'tan, sonra otomatik yoldan
  const finalCardImage = cardImage || getCardImagePath({ cardId: card.id.toString() });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Meta & Share Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <a
                    href={crumb.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {crumb.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Reading time and share */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                {t('cardDetail.meta.readingTime').replace('{minutes}', readingTime.toString())}
              </span>
              {onShare && (
                <button
                  onClick={onShare}
                  className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                >
                  <span>📤</span>
                  {t('cardDetail.meta.share')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left/Top */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Card Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-full max-w-sm mx-auto md:mx-0">
                    <div className="aspect-[9/16] relative rounded-xl overflow-hidden bg-slate-700/50">
                      <Image
                        src={finalCardImage}
                        alt={card.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </div>
                    {/* Card number badge */}
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {card.number?.toString()}
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {card.name}
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {getCardData('description')}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      // tr.json'dan anahtar kelimeleri al
                      const keywords = t(`cardDetail.cards.${card.id}.keywords`, '');
                      if (keywords) {
                        return keywords.split(',').map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                          >
                            {keyword.trim()}
                          </span>
                        ));
                      }
                      
                      // Varsayılan anahtar kelimeler
                      return ['Tarot', 'Rehberlik', 'İçgörü'].map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Meanings Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('upright')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'upright'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {t('cardDetail.meanings.upright')}
                </button>
                <button
                  onClick={() => setActiveTab('reversed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'reversed'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {t('cardDetail.meanings.reversed')}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {activeTab === 'upright' 
                      ? t('cardDetail.meanings.uprightTitle')
                      : t('cardDetail.meanings.reversedTitle')
                    }
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {getCardMeaning(activeTab, 'general')}
                  </p>
                </div>

                {/* Key Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['love', 'career', 'money', 'spiritual'].map((area) => (
                    <div key={area} className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">
                        {t(`cardDetail.keyAreas.${area}.title`)}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {getCardMeaning(activeTab, area)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('cardDetail.faq.title')}
              </h2>
              <div className="space-y-4">
                {(() => {
                  // tr.json'dan FAQ sorularını al
                  const faqQuestions = [];
                  for (let i = 0; i < 3; i++) {
                    const question = t(`cardDetail.cards.${card.id}.faq.${i}`, '');
                    if (question) {
                      faqQuestions.push(question);
                    }
                  }
                  
                  if (faqQuestions.length > 0) {
                    return faqQuestions.map((question, index) => (
                      <div key={index} className="border-b border-slate-700/50 pb-4 last:border-b-0">
                        <h3 className="font-semibold text-white mb-2">
                          {question}
                        </h3>
                      </div>
                    ));
                  }
                  
                  if (faqItems.length > 0) {
                    return faqItems.map((item, index) => (
                      <div key={index} className="border-b border-slate-700/50 pb-4 last:border-b-0">
                        <h3 className="font-semibold text-white mb-2">
                          {item.question}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ));
                  }
                  
                  return (
                    <div className="text-slate-300 text-sm">
                      {t('cardDetail.cards.fool.faq.0')}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Sidebar - Right/Bottom */}
          <div className="space-y-6">
            {/* CTA Section */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">
                {t('cardDetail.cta.title')}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://busbuskimki.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors inline-block text-center"
                >
                  {getCardData('cta.main') || t('cardDetail.cta.bookReading')}
                </a>
                <a
                  href="/tarotokumasi"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors inline-block text-center"
                >
                  {getCardData('cta.micro') || t('cardDetail.cta.quickReading')}
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-4 text-center">
                {t('cardDetail.cta.note')}
              </p>
            </div>

            {/* Deep Dive Section */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">
                {t('cardDetail.deepDive.title')}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    {t('cardDetail.deepDive.story')}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {getCardContext('mythology')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    {t('cardDetail.deepDive.positions')}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {getCardContext('celtic_cross.future')} {getCardContext('celtic_cross.hidden_influences')}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Cards */}
            {relatedCards.length > 0 && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('cardDetail.related.cards')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {relatedCards.slice(0, 4).map((relatedCard) => (
                    <a
                      key={relatedCard.id}
                      href={`/tarotokumasi/kartlar/${relatedCard.id}`}
                      className="group bg-slate-700/30 hover:bg-slate-700/50 rounded-lg p-3 transition-colors"
                    >
                      <div className="aspect-[9/16] relative rounded-lg overflow-hidden bg-slate-600/50 mb-2">
                        <Image
                          src={getCardImagePath({ cardId: relatedCard.id.toString() })}
                          alt={relatedCard.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                      <p className="text-white text-sm font-medium truncate">
                        {relatedCard.name}
                      </p>
                    </a>
                  ))}
                </div>
                
                {/* Category Links */}
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="/tarotokumasi/kartlar/major-arcana"
                      className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                    >
                      Major Arcana
                    </a>
                    <a
                      href="/tarotokumasi/kartlar/ask-kartlari"
                      className="bg-pink-600/20 text-pink-300 px-3 py-1 rounded-full text-sm hover:bg-pink-600/30 transition-colors"
                    >
                      Aşk Kartları
                    </a>
                    <a
                      href="/gunluk-tarot"
                      className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-600/30 transition-colors"
                    >
                      Günlük Tarot
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('cardDetail.related.guides')}
                </h3>
                <div className="space-y-3">
                  {relatedGuides.map((guide, index) => (
                    <a
                      key={index}
                      href={guide.href}
                      className="block bg-slate-700/30 hover:bg-slate-700/50 rounded-lg p-3 transition-colors"
                    >
                      <p className="text-white text-sm font-medium">
                        {guide.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
