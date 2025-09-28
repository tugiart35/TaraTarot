'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createNewLoverConfig } from '@/features/tarot/shared/config';
import newLoverExports from '@/features/tarot/lib/new-lover/position-meanings-index';

const { getNewLoverMeaningByCardAndPosition } = newLoverExports;

const NewLoverReading = createTarotReadingComponent({
  getConfig: () => createNewLoverConfig(),
  interpretationEmoji: '💕',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getNewLoverMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default NewLoverReading;
