'use client';

import type { TarotCard } from '@/types/tarot';
import type { CardMeaningData } from '@/types/ui';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMarriageConfig } from '@/features/tarot/shared/config';
import { 
  getMarriageMeaningByCardAndPosition,
  type MarriagePositionMeaning 
} from '@/features/tarot/lib/marriage/position-meanings-index';

const MarriageReading = createTarotReadingComponent({
  getConfig: () => createMarriageConfig(),
  interpretationEmoji: '💍',
  readingType: 'MARRIAGE_DETAILED', // Marriage için reading type belirt
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

    // Context bilgisini de içeren obje döndür
    return {
      interpretation: isReversed ? meaning.reversed : meaning.upright,
      context: meaning.context,
      keywords: meaning.keywords || []
    };
  },
});

export default MarriageReading;
