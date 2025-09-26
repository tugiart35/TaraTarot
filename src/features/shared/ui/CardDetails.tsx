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
import { getMeaningByCardAndPosition as getLoveMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';
import { getCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';
import { getProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';
import { getSituationAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/situation-analysis/position-meanings-index';
import relationshipAnalysisExports from '@/features/tarot/lib/relationship-analysis/position-meanings-index';
const { getRelationshipAnalysisMeaningByCardAndPosition } = relationshipAnalysisExports;
import { getRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
import newLoverExports from '@/features/tarot/lib/new-lover/position-meanings-index';
const { getNewLoverCardMeaning } = newLoverExports;
import { getMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';

// CardMeaningData artık @/types/ui'dan import ediliyor

interface CardDetailsProps {
  card: TarotCard;
  isReversed: boolean;
  position: number | null;
  onClose: () => void;
  spreadType: 'love' | 'career' | 'problem-solving' | 'situation-analysis' | 'relationship-analysis' | 'relationship-problems' | 'marriage' | 'new-lover' | 'money';
  positionInfo?: {
    title: string;
    desc: string;
  };
  title?: string;
  
  // BaseInterpretation.tsx'den alınan kariyer anlamları için fonksiyonlar
  getCardMeaning?: (card: TarotCard) => CardMeaningData | null;
  getMeaningText?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard,
    _isReversed: boolean
  ) => string;
  getKeywords?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard
  ) => string[];
  getPositionSpecificInterpretation?: (
    _card: TarotCard,
    _position: number,
    _isReversed: boolean
  ) => string;
  
  // CONTEXT GÖSTERİMİ İÇİN (Problem çözme açılımı için)
  showContext?: boolean;
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
      <img
        src={card.image || '/cards/CardBack.jpg'}
        alt={card.nameTr}
        className={`w-48 h-auto mx-auto rounded-lg border-2 border-current/60 shadow-lg ${isReversed ? 'transform rotate-180' : ''}`}
      />
      {positionInfo && (
        <div className='mt-4'>
          <p
            className={`text-${themeSettings[spreadType].theme}-300 font-bold text-lg`}
          >
            {positionInfo.title}
          </p>
          <p className='text-gray-300 text-sm italic'>
            &quot;{positionInfo.desc}&quot;
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
    // BaseInterpretation.tsx'deki gibi düzenli ve güvenli kart bilgilerini çekme
    const getCardMeaningData = (): CardMeaningData | null => {
      // Önce props'tan gelen getCardMeaning fonksiyonunu kullan
      if (getCardMeaning) {
        return getCardMeaning(cardParam);
      }
      
      // Fallback: Pozisyon bazlı anlamı çek
      let positionMeaning = null;
      
      if (positionParam) {
        switch (spreadType) {
          case 'love':
            positionMeaning = getLoveMeaningByCardAndPosition(
              cardParam.name,
              positionParam
            );
            break;
          case 'career':
            positionMeaning = getCareerMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'problem-solving':
            positionMeaning = getProblemSolvingMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'situation-analysis':
            positionMeaning = getSituationAnalysisMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'relationship-analysis':
            positionMeaning = getRelationshipAnalysisMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'relationship-problems':
            positionMeaning = getRelationshipProblemsMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'marriage':
            positionMeaning = getMarriageMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'new-lover':
            positionMeaning = getNewLoverCardMeaning(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
          case 'money':
            positionMeaning = getMoneyMeaningByCardAndPosition(
              cardParam,
              positionParam,
              isReversedParam
            );
            break;
        }
      }

      // PositionMeaning'i CardMeaningData formatına dönüştür
      if (positionMeaning) {
        if (typeof positionMeaning === 'string') {
          return {
            card: cardParam.name,
            name: cardParam.nameTr,
            upright: positionMeaning,
            reversed: positionMeaning,
            keywords: cardParam.keywordsTr || cardParam.keywords || [],
          };
        } else if (typeof positionMeaning === 'object' && positionMeaning !== null) {
          // İlişki Sorunları açılımı için özel dönüşüm
          if (spreadType === 'relationship-problems') {
            return {
              card: cardParam.name,
              name: cardParam.nameTr,
              upright: (positionMeaning as any).upright,
              reversed: (positionMeaning as any).reversed,
              keywords: (positionMeaning as any).keywords || cardParam.keywordsTr || cardParam.keywords || [],
              context: (positionMeaning as any).context,
            };
          }
          // İlişki Analizi açılımı için özel dönüşüm
          if (spreadType === 'relationship-analysis') {
            return {
              card: cardParam.name,
              name: cardParam.nameTr,
              upright: (positionMeaning as any).upright,
              reversed: (positionMeaning as any).reversed,
              keywords: (positionMeaning as any).keywords || cardParam.keywordsTr || cardParam.keywords || [],
              context: (positionMeaning as any).context,
            };
          }
          // Money açılımı için özel dönüşüm - BaseInterpretation.tsx'deki gibi
          if (spreadType === 'money') {
            return {
              card: cardParam.name,
              name: cardParam.nameTr,
              upright: (positionMeaning as any).upright,
              reversed: (positionMeaning as any).reversed,
              keywords: (positionMeaning as any).keywords || cardParam.keywordsTr || cardParam.keywords || [],
              context: (positionMeaning as any).context,
              // BaseInterpretation.tsx'deki gibi moneyMeaning alanını da ekle
              moneyMeaning: {
                upright: (positionMeaning as any).upright,
                reversed: (positionMeaning as any).reversed,
              },
            };
          }
          // New-lover açılımı için özel dönüşüm - BaseInterpretation.tsx'deki gibi
          if (spreadType === 'new-lover') {
            return {
              card: cardParam.name,
              name: cardParam.nameTr,
              upright: (positionMeaning as any).upright,
              reversed: (positionMeaning as any).reversed,
              keywords: (positionMeaning as any).keywords || cardParam.keywordsTr || cardParam.keywords || [],
              context: (positionMeaning as any).context,
              // BaseInterpretation.tsx'deki gibi newLoverMeaning alanını da ekle
              newLoverMeaning: {
                upright: (positionMeaning as any).upright,
                reversed: (positionMeaning as any).reversed,
              },
            };
          }
          // Diğer açılımlar için genel dönüşüm
          return {
            card: cardParam.name,
            name: cardParam.nameTr,
            upright: (positionMeaning as any).upright || (positionMeaning as any).meaning,
            reversed: (positionMeaning as any).reversed || (positionMeaning as any).meaning,
            keywords: (positionMeaning as any).keywords || cardParam.keywordsTr || cardParam.keywords || [],
            context: (positionMeaning as any).context,
          };
        }
      }

      return null;
    };

    // BaseInterpretation.tsx'deki gibi anlam metnini al
    const getMeaningTextData = (): string => {
      // Önce props'tan gelen getMeaningText fonksiyonunu kullan
      if (getMeaningText) {
        const cardMeaningData = getCardMeaningData();
        return getMeaningText(cardMeaningData, cardParam, isReversedParam);
      }
      
      // Önce props'tan gelen getPositionSpecificInterpretation fonksiyonunu kullan
      if (getPositionSpecificInterpretation && positionParam) {
        return getPositionSpecificInterpretation(cardParam, positionParam, isReversedParam);
      }
      
      // Fallback: CardMeaningData'dan anlamı al - BaseInterpretation.tsx'deki gibi
      const cardMeaningData = getCardMeaningData();
      if (cardMeaningData) {
        // BaseInterpretation.tsx'deki mantığı kullan
        if (cardMeaningData.moneyMeaning) {
          return isReversedParam 
            ? cardMeaningData.moneyMeaning.reversed 
            : cardMeaningData.moneyMeaning.upright;
        } else if (cardMeaningData.newLoverMeaning) {
          return isReversedParam 
            ? cardMeaningData.newLoverMeaning.reversed 
            : cardMeaningData.newLoverMeaning.upright;
        } else if (cardMeaningData.relationshipAnalysisMeaning) {
          return isReversedParam 
            ? cardMeaningData.relationshipAnalysisMeaning.reversed 
            : cardMeaningData.relationshipAnalysisMeaning.upright;
        } else if (cardMeaningData.careerMeaning) {
          return isReversedParam 
            ? cardMeaningData.careerMeaning.reversed 
            : cardMeaningData.careerMeaning.upright;
        } else if (cardMeaningData.upright || cardMeaningData.reversed) {
          return isReversedParam 
            ? cardMeaningData.reversed || cardMeaningData.upright || 'Bu kart için ters anlam bulunamadı.'
            : cardMeaningData.upright || 'Bu kart için düz anlam bulunamadı.';
        }
      }

      // Son fallback: Kartın genel anlamını kullan
      return isReversedParam
        ? cardParam.meaningTr?.reversed || 'Bu kart için ters anlam bulunamadı.'
        : cardParam.meaningTr?.upright || 'Bu kart için düz anlam bulunamadı.';
    };

    // BaseInterpretation.tsx'deki gibi anahtar kelimeleri al
    const getKeywordsData = (): string[] => {
      // Önce props'tan gelen getKeywords fonksiyonunu kullan
      if (getKeywords) {
        const cardMeaningData = getCardMeaningData();
        return getKeywords(cardMeaningData, cardParam);
      }
      
      // Fallback: CardMeaningData'dan anahtar kelimeleri al
      const cardMeaningData = getCardMeaningData();
      if (cardMeaningData && cardMeaningData.keywords) {
        const keywords = cardMeaningData.keywords;
        if (Array.isArray(keywords)) {
          return keywords;
        } else if (typeof keywords === 'string') {
          return (keywords as string)
            .split(',')
            .map((k: string) => k.trim())
            .filter((k: string) => k.length > 0);
        }
      }

      // Son fallback: Kartın genel anahtar kelimelerini kullan
      const fallbackKeywords = cardParam.keywordsTr || cardParam.keywords || [];
      return Array.isArray(fallbackKeywords) ? fallbackKeywords : [];
    };

    return (
      <div className='w-full space-y-4'>
        {/* Ana Anlam */}
        <div>
          <h3
            className={`font-semibold text-xl text-${themeSettings[spreadType].theme}-300 mb-2 border-b-2 border-${themeSettings[spreadType].theme}-500/50 pb-1`}
          >
            {positionParam
              ? `Pozisyon ${positionParam} - ${spreadType === 'love' ? 'Aşk' : 'Kart'} Anlamı`
              : 'Kart Anlamı'}
          </h3>
          <p className='text-gray-200 leading-relaxed'>
            {getMeaningTextData()}
          </p>
        </div>
        
        {/* Context - Problem çözme açılımı için */}
        {showContext && (() => {
          const cardMeaningData = getCardMeaningData();
          const context = cardMeaningData?.context || '';
          return context ? (
            <div>
              <h3
                className={`font-semibold text-xl text-${themeSettings[spreadType].theme}-300 mb-2 border-b-2 border-${themeSettings[spreadType].theme}-500/50 pb-1`}
              >
                Bağlam
              </h3>
              <p className={`text-${themeSettings[spreadType].theme}-200 italic text-sm leading-relaxed`}>
                {context}
              </p>
            </div>
          ) : null;
        })()}
        
        {/* Anahtar Kelimeler */}
        <div>
          <h3
            className={`font-semibold text-xl text-${themeSettings[spreadType].theme}-300 mb-2 border-b-2 border-${themeSettings[spreadType].theme}-500/50 pb-1`}
          >
            {positionParam
              ? `Pozisyon ${positionParam} - Anahtar Kelimeler`
              : 'Anahtar Kelimeler'}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {getKeywordsData().map(
              (keyword: string, index: number) => (
                <span
                  key={index}
                  className={`bg-${themeSettings[spreadType].theme}-500/20 text-${themeSettings[spreadType].theme}-200 px-3 py-1 rounded-full text-sm`}
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        </div>
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
    />
  );
};

export default CardDetails;