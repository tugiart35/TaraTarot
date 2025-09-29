'use client';

import type { TarotCard } from '@/types/tarot';
import type { CardMeaningData } from '@/types/ui';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createNewLoverConfig } from '@/features/tarot/shared/config';
import newLoverExports from '@/features/tarot/lib/new-lover/position-meanings-index';
import type { NewLoverPositionMeaning } from '@/features/tarot/lib/new-lover/position-meanings-index';

const { getNewLoverMeaningByCardAndPosition } = newLoverExports;

const NewLoverReading = createTarotReadingComponent({
  getConfig: () => createNewLoverConfig(),
  interpretationEmoji: '💕',
  readingType: 'NEW_LOVER_DETAILED', // New Lover için reading type belirt
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

    // Context bilgisini de içeren obje döndür
    return {
      interpretation: isReversed ? meaning.reversed : meaning.upright,
      context: meaning.context,
      keywords: meaning.keywords || []
    };
  },
});

export default NewLoverReading;
