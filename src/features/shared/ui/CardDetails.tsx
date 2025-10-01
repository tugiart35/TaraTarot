/*
info:
Bağlantılı dosyalar:
- react: Temel React fonksiyonları için (gerekli)
- @/features/tarot/lib/a-tarot-helpers: Tarot kartı tipi ve temel kart verileri için (gerekli)
- ./BaseCardDetails: Ortak modal altyapısı ve görsel sunum için (gerekli)
- @/features/tarot/lib/love/position-meanings-index: Aşk açılımında pozisyon bazlı anlamlar (gerekli)
- @/features/tarot/lib/career/position-meanings-index: Kariyer açılımında pozisyon bazlı anlamlar (gerekli)
- @/features/tarot/lib/problem-solving/position-meanings-index: Problem çözme açılımında pozisyon bazlı anlamlar (gerekli)
- @/features/tarot/lib/situation-analysis/position-meanings-index: Durum analizi açılımında pozisyon bazlı anlamlar (gerekli)
- @/features/tarot/lib/relationship-analysis/position-meanings-index: İlişki analizi açılımında pozisyon bazlı anlamlar (gerekli)
- BaseInterpretation.tsx: Kariyer anlamları için CardMeaningData interface'i ve fonksiyonları (gerekli)

Dosyanın amacı:
- Tüm tarot açılımları (love, career, problem-solving, vb.) için mobil uyumlu, temalı ve yeniden kullanılabilir bir kart detay modalı sunmak. Kartın pozisyonuna göre anlam ve anahtar kelimeleri gösterir. BaseCardDetails ile modal altyapısı sağlar.

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece görsel arayüz ve kart detay yönetimi sağlar.

Geliştirme ve öneriler:
- BaseInterpretation.tsx'deki CardMeaningData interface'i ve fonksiyonları entegre edildi.
- getCardMeaning, getMeaningText, getKeywords, getPositionSpecificInterpretation fonksiyonları ile esnek veri çekimi sağlanıyor.
- showContext özelliği ile problem çözme açılımında context gösterimi destekleniyor.
- renderCardImage ve renderContent fonksiyonları ile üst modal bileşenine özelleştirilebilir içerik sunuluyor.
- themeSettings ile tüm açılım türlerine göre tema ve genişlik ayarları yönetiliyor.
- Anahtar kelimeler ve anlamlar için fallback mekanizması mevcut, veri eksikliğinde hata alınmaz.

Kodun orunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve fonksiyon isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Tüm açılım türleri için optimize edilmiş, gereksiz kod kaldırılmış.
- Yeniden Kullanılabilirlik: Tüm açılım türleri için özelleştirilmiş ancak modal yapısı sayesinde genişletilebilir.
- Güvenlik: Sadece görsel arayüz, XSS riski minimizd.

Gereklilik ve Kullanım Durumu:
- CardDetails: Gerekli, tüm tarot açılımlarında kart detay modalı olarak kullanılır.
- getCardMeaning, getMeaningText, getKeywords, getPositionSpecificInterpretation: Gerekli, kariyer ve problem çözme anlamları için kullanılır.
- showContext: Gerekli, problem çözme açılımında context gösterimi için kullanılır.
- renderCardImage, renderContent: Gerekli, modal içeriğini özelleştirmek için kullanılır.
*/

'use client';

import React from 'react';
import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';
import type { CardMeaningData } from '@/types/ui';
import BaseCardDetails from './BaseCardDetails';
// Eski import'lar kaldırıldı - yeni yapıda kullanılmıyor

// CardMeaningData artık @/types/ui'dan import ediliyor

interface CardDetailsProps {
  card: TarotCard;
  isReversed: boolean;
  position: number | null;
  onClose: () => void;
  spreadType:
    | 'love'
    | 'career'
    | 'problem-solving'
    | 'situation-analysis'
    | 'relationship-analysis'
    | 'relationship-problems'
    | 'marriage'
    | 'new-lover'
    | 'money';
  positionInfo?: {
    title: string;
    desc: string;
  };
  title?: string;

  // BaseInterpretation.tsx'den alınan kariyer anlamları için fonksiyonlar
  getCardMeaning?: (_card: TarotCard) => CardMeaningData | null;
  getMeaningText?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard,
    _isReversed: boolean
  ) => string | { interpretation: string; context: string };
  getKeywords?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard
  ) => string[];
  getPositionSpecificInterpretation?: (
    _card: TarotCard,
    _position: number,
    _isReversed: boolean
  ) => string | { interpretation: string; context: string };

  // CONTEXT GÖSTERİMİ İÇİN (Problem çözme açılımı için)
  showContext?: boolean;

  // POZİSYON CONTEXT FONKSİYONU (lib/ dosyalarındaki context bilgileri için)
  getPositionContext?: (
    _card: TarotCard,
    _position: number
  ) => string | undefined;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  card,
  isReversed,
  position,
  onClose,
  spreadType,
  positionInfo,
  title,
  getCardMeaning,
  getMeaningText,
  getKeywords,
  getPositionSpecificInterpretation,
  showContext = false,
  getPositionContext,
}) => {
  if (!card) {
    return null;
  }

  // Bu fonksiyonlar artık renderContent içinde kullanılıyor, burada sadece debug için bırakıyoruz
  // const getMeaningByType = () => { ... }; // Kullanılmıyor, renderContent içinde tanımlandı
  // const getKeywordsByType = () => { ... }; // Kullanılmıyor, renderContent içinde tanımlandı

  const themeSettings = {
    love: { theme: 'pink', maxWidth: 'lg' },
    career: { theme: 'blue', maxWidth: 'lg' },
    'problem-solving': { theme: 'purple', maxWidth: 'lg' },
    'situation-analysis': { theme: 'blue', maxWidth: 'lg' },
    'relationship-analysis': { theme: 'blue', maxWidth: 'lg' },
    'relationship-problems': { theme: 'amber', maxWidth: 'lg' },
    marriage: { theme: 'pink', maxWidth: 'lg' },
    'new-lover': { theme: 'pink', maxWidth: 'lg' },
    money: { theme: 'amber', maxWidth: 'lg' },
  } as const;

  const renderCardImage = (card: TarotCard, isReversed: boolean) => (
    <div className='text-center'>
      <div className='relative inline-block group'>
        {/* Floating card container */}
        <div className='relative transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2'>
          <img
            src={card.image || '/cards/CardBack.webp'}
            alt={card.nameTr}
            className={`w-44 h-auto mx-auto rounded-3xl shadow-2xl transition-all duration-500 ${
              isReversed ? 'transform rotate-180' : ''
            }`}
            style={{
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
            }}
          />
          {/* Floating status indicator */}
          {isReversed && (
            <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse'>
              <span className='text-white text-sm font-bold'>↻</span>
            </div>
          )}
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              isReversed
                ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20'
                : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
            }`}
          ></div>
        </div>
      </div>
      {positionInfo && (
        <div className='mt-8 space-y-3'>
          <h3 className='text-2xl font-light text-white tracking-wide'>
            {positionInfo.title}
          </h3>
          <p className='text-gray-300 text-base leading-relaxed max-w-lg mx-auto font-light'>
            {positionInfo.desc}
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = (
    cardParam: TarotCard,
    isReversedParam: boolean,
    positionParam: number | null
  ) => {
    // BaseInterpretation.tsx'teki mantığı kullan - pozisyon özel yorum fonksiyonu öncelikli
    const getCardInterpretation = (): string => {
      const cardMeaning: CardMeaningData | null = getCardMeaning
        ? getCardMeaning(cardParam)
        : null;

      let positionInterpretation = '';

      // 1. Önce props'tan gelen getPositionSpecificInterpretation fonksiyonunu kullan
      if (getPositionSpecificInterpretation && positionParam) {
        const result = getPositionSpecificInterpretation(
          cardParam,
          positionParam,
          isReversedParam
        );

        // Eğer result string ise, direkt kullan
        if (typeof result === 'string') {
          positionInterpretation = result;
        }
        // Eğer result object ise, interpretation'ı al
        else if (result && typeof result === 'object') {
          positionInterpretation = result.interpretation || '';
        }
      }

      // 2. Eğer positionInterpretation boşsa, getMeaningText fonksiyonunu dene
      if (!positionInterpretation && getMeaningText) {
        const result = getMeaningText(cardMeaning, cardParam, isReversedParam);

        // Eğer result string ise, direkt kullan
        if (typeof result === 'string') {
          positionInterpretation = result;
        }
        // Eğer result object ise, interpretation'ı al
        else if (result && typeof result === 'object') {
          positionInterpretation = result.interpretation || '';
        }
      }

      // 3. Hala boşsa, CardMeaningData'dan anlamı al
      if (!positionInterpretation && cardMeaning) {
        if (cardMeaning.relationshipAnalysisMeaning) {
          positionInterpretation = isReversedParam
            ? cardMeaning.relationshipAnalysisMeaning.reversed
            : cardMeaning.relationshipAnalysisMeaning.upright;
        } else if (cardMeaning.careerMeaning) {
          positionInterpretation = isReversedParam
            ? cardMeaning.careerMeaning.reversed
            : cardMeaning.careerMeaning.upright;
        } else if (cardMeaning.moneyMeaning) {
          positionInterpretation = isReversedParam
            ? cardMeaning.moneyMeaning.reversed
            : cardMeaning.moneyMeaning.upright;
        } else if (cardMeaning.newLoverMeaning) {
          positionInterpretation = isReversedParam
            ? cardMeaning.newLoverMeaning.reversed
            : cardMeaning.newLoverMeaning.upright;
        } else if (cardMeaning.marriageMeaning) {
          positionInterpretation = isReversedParam
            ? cardMeaning.marriageMeaning.reversed
            : cardMeaning.marriageMeaning.upright;
        } else if (cardMeaning.upright || cardMeaning.reversed) {
          positionInterpretation = isReversedParam
            ? cardMeaning.reversed || cardMeaning.upright || ''
            : cardMeaning.upright || '';
        }
      }

      // 4. Son fallback: Kartın genel anlamını kullan
      if (!positionInterpretation) {
        positionInterpretation = isReversedParam
          ? cardParam.meaningTr.reversed
          : cardParam.meaningTr.upright;
      }

      return positionInterpretation;
    };

    // Kart anlamını ve anahtar kelimeleri al
    const cardInterpretation = getCardInterpretation();
    const keywords = getKeywords
      ? getKeywords(
          getCardMeaning ? getCardMeaning(cardParam) : null,
          cardParam
        )
      : [];

    // Context'i al (problem çözme açılımı için)
    const cardMeaning = getCardMeaning ? getCardMeaning(cardParam) : null;
    const context = showContext ? cardMeaning?.context || '' : '';

    // Pozisyon context'ini al (lib/ dosyalarından)
    const positionContext =
      getPositionContext && positionParam
        ? getPositionContext(cardParam, positionParam)
        : undefined;

    return (
      <div className='w-full space-y-10'>
        {/* Pozisyon Bağlamı - Glassmorphism Card */}
        {positionContext && (
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300'></div>
            <div className='relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl'>
              <div className='flex items-start gap-4'>
                <div className='w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1 flex-shrink-0 shadow-lg'></div>
                <div className='flex-1'>
                  <h4 className='text-blue-200 font-light text-sm mb-3 tracking-wide uppercase'>
                    Pozisyon Bağlamı
                  </h4>
                  <p className='text-gray-200 text-base leading-relaxed font-light'>
                    {positionContext}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ana Anlam - Floating Card */}
        <div className='relative group'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500'></div>
          <div className='relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl'>
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div
                  className={`w-4 h-4 rounded-full shadow-lg ${
                    isReversedParam
                      ? 'bg-gradient-to-r from-red-400 to-orange-400'
                      : 'bg-gradient-to-r from-green-400 to-emerald-400'
                  }`}
                ></div>
                <span
                  className={`text-lg font-light tracking-wide ${
                    isReversedParam ? 'text-red-200' : 'text-green-200'
                  }`}
                >
                  {isReversedParam ? 'Ters Anlam' : 'Düz Anlam'}
                </span>
              </div>
              <div className='text-white text-lg leading-relaxed font-light pl-8'>
                {cardInterpretation}
              </div>
            </div>
          </div>
        </div>

        {/* Ek Context - Glassmorphism Card */}
        {context && (
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300'></div>
            <div className='relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl'>
              <div className='flex items-start gap-4'>
                <div className='w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1 flex-shrink-0 shadow-lg'></div>
                <div className='flex-1'>
                  <h4 className='text-purple-200 font-light text-sm mb-3 tracking-wide uppercase'>
                    Derin Bağlam
                  </h4>
                  <p className='text-gray-200 text-base leading-relaxed font-light italic'>
                    {context}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Anahtar Kelimeler - Floating Tags */}
        {keywords.length > 0 && (
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-lg'></div>
              <span className='text-amber-200 font-light text-lg tracking-wide'>
                Anahtar Kelimeler
              </span>
            </div>
            <div className='flex flex-wrap gap-3 pl-8'>
              {keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className='group/tag relative bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300'></div>
                  <span className='relative z-10'>{keyword}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseCardDetails
      card={card}
      isReversed={isReversed}
      position={position}
      onClose={onClose}
      renderCardImage={renderCardImage}
      renderContent={renderContent}
      theme={themeSettings[spreadType].theme}
      maxWidth={themeSettings[spreadType].maxWidth}
      positionInfo={positionInfo || undefined}
      title={title || 'Kart Detayları'}
      spreadType={spreadType}
      getCardMeaning={getCardMeaning}
      getMeaningText={getMeaningText}
      getKeywords={getKeywords}
      getPositionSpecificInterpretation={getPositionSpecificInterpretation}
      getPositionContext={getPositionContext}
      showContext={showContext}
    />
  );
};

export default CardDetails;
