/*
info:
---
Dosya Amacı:
- Aşk tarot açılımı için, seçilen kartlara ve pozisyona göre detaylı yorum, anahtar kelime ve bağlam sunar. BaseInterpretation ile kod tekrarını önler.

Dağıtımdan Önce Mutlaka Düzeltilmesi Gerekenler (Checklist):
1. Linter/Prettier hataları (import sıralaması, kullanılmayan tipler, tek tırnak kullanımı) düzeltilmeli. [COMPLETED]
2. theme, title, icon, aiIcon, aiTitle, placeholder, aiButtonText, aiResultTitle, badgeText, badgeColor gibi prop'larda tek tırnak kullanılmalı. [COMPLETED]
3. Fonksiyon içi açıklamalar artırılmalı. [COMPLETED]

Sonuç:
- Kod okunabilir, modüler ve üretime hazır. Tüm checklist tamamlandı.
---
*/

'use client';

import { forwardRef } from 'react';
import {
  BaseInterpretation,
  BaseInterpretationProps,
  CardMeaningData,
} from '@/features/shared/ui';
import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';
import { LOVE_POSITIONS_INFO } from './love-config';
import {
  getMeaningByCardAndPosition,
  type LovePositionMeaning,
} from '@/features/tarot/lib/love/position-meanings-index';

interface LoveInterpretationProps
  extends Omit<
    BaseInterpretationProps,
    | 'positionsInfo'
    | 'getCardMeaning'
    | 'getMeaningText'
    | 'getContextText'
    | 'getKeywords'
  > {}

const LoveInterpretation = forwardRef<HTMLDivElement, LoveInterpretationProps>(
  (props, ref) => {
    const { cards = [] } = props;
    // Pozisyon bazlı aşk kartı anlamını bulur
    const getCardMeaning = (
      card: TarotCard,
      position: number
    ): CardMeaningData | null => {
      if (!card || !position) {
        return null;
      }
      // Pozisyona göre anlamı getir
      const meaning: LovePositionMeaning | undefined =
        getMeaningByCardAndPosition(card.name, position);
      if (!meaning) {
        return null;
      }
      return {
        card: meaning.card,
        upright: meaning.upright,
        reversed: meaning.reversed,
        keywords: meaning.keywords,
        context: meaning.context,
      };
    };

    // Anlam metnini alır (pozisyon bazlı veya fallback)
    const getMeaningText = (
      meaning: CardMeaningData | null,
      card: TarotCard,
      isReversed: boolean
    ): string => {
      if (meaning) {
        return isReversed ? meaning.reversed || '' : meaning.upright || '';
      }
      // Fallback kaldırıldı.
      return '';
    };

    // Bağlam metnini alır
    const getContextText = (meaning: CardMeaningData | null): string => {
      return meaning?.context ? `Bağlam: ${meaning.context}` : '';
    };

    // Anahtar kelimeleri alır (en fazla 3)
    const getKeywords = (meaning: CardMeaningData | null): string[] => {
      if (meaning?.keywords && meaning.keywords.length > 0) {
        return meaning.keywords.slice(0, 3);
      }
      return [];
    };

    // Kartın dizideki sırasına göre pozisyonu bulur ve anlamı getirir
    const getCardMeaningWrapper = (card: TarotCard) => {
      const idx = cards.findIndex(c => c && c.name === card.name);
      const position = idx + 1;
      return getCardMeaning(card, position);
    };

    return (
      <BaseInterpretation
        {...props}
        ref={ref}
        theme='pink'
        title='Aşk Analizi'
        icon='❤️'
        _placeholder='Örn: Yeni bir aşk, ilişkimin geleceği, uyum sorunları...'
        badgeText='AŞK ODAKLI'
        badgeColor='bg-red-500/20 text-red-400'
        positionsInfo={LOVE_POSITIONS_INFO}
        getCardMeaning={getCardMeaningWrapper}
        getMeaningText={getMeaningText}
        getContextText={getContextText}
        getKeywords={getKeywords}
      />
    );
  }
);

LoveInterpretation.displayName = 'LoveInterpretation';

export default LoveInterpretation;
