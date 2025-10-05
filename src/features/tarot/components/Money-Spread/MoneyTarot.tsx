'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMoneyConfig } from '@/features/tarot/shared/config';
import { getMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';

const MoneyReading = createTarotReadingComponent({
  getConfig: () => createMoneyConfig(),
  interpretationEmoji: '💰',
  readingType: 'MONEY_SPREAD', // Money Spread için reading type belirt
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getMoneyMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    // Context bilgisini de içeren obje döndür
    return {
      interpretation: isReversed ? meaning.reversed : meaning.upright,
      context: meaning.context,
      keywords: meaning.keywords || [],
    };
  },
});

export default MoneyReading;
