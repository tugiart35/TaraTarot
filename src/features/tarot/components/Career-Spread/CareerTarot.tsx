'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createCareerConfig } from '@/features/tarot/shared/config';
import { getCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';

const CareerReading = createTarotReadingComponent({
  getConfig: () => createCareerConfig(),
  interpretationEmoji: '💼',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getCareerMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default CareerReading;
