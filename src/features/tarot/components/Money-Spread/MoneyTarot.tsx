'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMoneyConfig } from '@/features/tarot/shared/config';
import { getMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';

const MoneyReading = createTarotReadingComponent({
  getConfig: () => createMoneyConfig(),
  interpretationEmoji: '💰',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getMoneyMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default MoneyReading;
