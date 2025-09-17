/*
info:
Bağlantılı dosyalar:
- react: Temel React fonksiyonları için (gerekli)
- @/features/tarot/lib/a-tarot-helpers: Tarot kartı tipi ve temel kart verileri için (gerekli)
- ./BaseCardDetails: Ortak modal altyapısı ve görsel sunum için (gerekli)
- @/lib/tarot/love/position-meanings-index: Aşk açılımında pozisyon bazlı anlamlar (gerekli)

Dosyanın amacı:
- Love tarot açılımı için mobil uyumlu, temalı ve yeniden kullanılabilir bir kart detay modalı sunmak. Kartın pozisyonuna göre anlam ve anahtar kelimeleri gösterir. BaseCardDetails ile modal altyapısı sağlar.

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece görsel arayüz ve kart detay yönetimi sağlar.

Geliştirme ve öneriler:
- getMeaningByType ve getKeywordsByType fonksiyonları ile Love açılımına göre esnek veri çekimi sağlanıyor.
- renderCardImage ve renderContent fonksiyonları ile üst modal bileşenine özelleştirilebilir içerik sunuluyor.
- themeSettings ile Love açılımına göre tema ve genişlik ayarları yönetiliyor.
- Anahtar kelimeler ve anlamlar için fallback mekanizması mevcut, veri eksikliğinde hata alınmaz.

Kodun orunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve fonksiyon isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Sadece Love spread için optimize edilmiş, gereksiz kod kaldırılmış.
- Yeniden Kullanılabilirlik: Love açılımı için özelleştirilmiş ancak modal yapısı sayesinde genişletilebilir.
- Güvenlik: Sadece görsel arayüz, XSS riski minimizd.

Gereklilik ve Kullanım Durumu:
- CardDetails: Gerekli, Love tarot açılımında kart detay modalı olarak kullanılır.
- getMeaningByType, getKeywordsByType: Gerekli, Love açılımına göre veri çekimi için kullanılır.
- renderCardImage, renderContent: Gerekli, modal içeriğini özelleştirmek için kullanılır.
*/

'use client';

import React from 'react';
import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';
import BaseCardDetails from './BaseCardDetails';
import { getMeaningByCardAndPosition as getLoveMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';
import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';
import { getRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
import { getNewLoverCardMeaning } from '@/features/tarot/lib/new-lover/position-meanings-index';

interface CardDetailsProps {
  card: TarotCard;
  isReversed: boolean;
  position: number | null;
  onClose: () => void;
  spreadType: 'love' | 'career' | 'problem-solving' | 'situation-analysis' | 'relationship-analysis' | 'relationship-problems' | 'marriage' | 'new-lover';
  positionInfo?: {
    title: string;
    desc: string;
  };
  title?: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  card,
  isReversed,
  position,
  onClose,
  spreadType,
  positionInfo,
  title,
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
    'situation-analysis': { theme: 'green', maxWidth: 'lg' },
    'relationship-analysis': { theme: 'blue', maxWidth: 'lg' },
    'relationship-problems': { theme: 'yellow', maxWidth: 'lg' },
    marriage: { theme: 'pink', maxWidth: 'lg' },
    'new-lover': { theme: 'pink', maxWidth: 'lg' },
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
    // Parametrelerle anlam ve anahtar kelimeleri al
    const getMeaningByTypeWithParams = () => {
      if (spreadType === 'love' && positionParam) {
        // Doğrudan pozisyon bazlı anlamı al
        const posMeaning = getLoveMeaningByCardAndPosition(
          cardParam.name,
          positionParam
        );

        if (posMeaning) {
          const meaning = isReversedParam
            ? posMeaning.reversed
            : posMeaning.upright;
          return meaning;
        }
      }

      if (spreadType === 'relationship-analysis' && positionParam) {
        // İlişki analizi için pozisyon bazlı anlamı al
        const posMeaning = getRelationshipAnalysisMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning) {
          return posMeaning.meaning;
        }
      }

      if (spreadType === 'relationship-problems' && positionParam) {
        // İlişki sorunları için pozisyon bazlı anlamı al
        const posMeaning = getRelationshipProblemsMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning) {
          return posMeaning.meaning;
        }
      }

      if (spreadType === 'marriage' && positionParam) {
        // Evlilik açılımı için pozisyon bazlı anlamı al
        const posMeaning = getMarriageMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning) {
          return posMeaning.meaning;
        }
      }

      if (spreadType === 'new-lover' && positionParam) {
        // Yeni Bir Sevgili açılımı için pozisyon bazlı anlamı al
        const posMeaning = getNewLoverCardMeaning(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning) {
          return posMeaning;
        }
      }

      // Fallback: Pozisyon bazlı anlam bulunamazsa kartın genel anlamını göster
      const fallbackMeaning = isReversedParam
        ? cardParam.meaningTr?.reversed
        : cardParam.meaningTr?.upright;
      return fallbackMeaning || 'Bu kart için anlam bulunamadı.';
    };

    const getKeywordsByTypeWithParams = () => {
      if (spreadType === 'love' && positionParam) {
        // Doğrudan pozisyon bazlı anahtar kelimeleri al
        const posMeaning = getLoveMeaningByCardAndPosition(
          cardParam.name,
          positionParam
        );

        if (posMeaning) {
          if (Array.isArray(posMeaning.keywords)) {
            return posMeaning.keywords;
          } else if (
            typeof posMeaning.keywords === 'string' &&
            posMeaning.keywords
          ) {
            const keywords = (posMeaning.keywords as string)
              .split(',')
              .map((k: any) => k.trim());
            return keywords;
          }
        }
      }

      if (spreadType === 'relationship-analysis' && positionParam) {
        // İlişki analizi için pozisyon bazlı anahtar kelimeleri al
        const posMeaning = getRelationshipAnalysisMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning && posMeaning.keywords) {
          return posMeaning.keywords;
        }
      }

      if (spreadType === 'relationship-problems' && positionParam) {
        // İlişki sorunları için pozisyon bazlı anahtar kelimeleri al
        const posMeaning = getRelationshipProblemsMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning && posMeaning.keywords) {
          return posMeaning.keywords;
        }
      }

      if (spreadType === 'marriage' && positionParam) {
        // Evlilik açılımı için pozisyon bazlı anahtar kelimeleri al
        const posMeaning = getMarriageMeaningByCardAndPosition(
          cardParam,
          positionParam,
          isReversedParam
        );

        if (posMeaning && posMeaning.keywords) {
          return posMeaning.keywords;
        }
      }

      // Fallback: Pozisyon bazlı anahtar kelimeler bulunamazsa kartın genel anahtar kelimelerini göster
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
              ? `Pozisyon ${positionParam} - Aşk Anlamı`
              : 'Kart Anlamı'}
          </h3>
          <p className='text-gray-200 leading-relaxed'>
            {getMeaningByTypeWithParams()}
          </p>
        </div>
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
            {getKeywordsByTypeWithParams().map(
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
