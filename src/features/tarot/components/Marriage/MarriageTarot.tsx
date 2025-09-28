'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMarriageConfig } from '@/features/tarot/shared/config';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';

const MarriageReading = createTarotReadingComponent({
  getConfig: () => createMarriageConfig(),
  interpretationEmoji: '💍',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getMarriageMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default MarriageReading;
