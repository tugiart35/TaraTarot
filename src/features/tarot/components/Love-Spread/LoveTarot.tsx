'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createLoveConfig } from '@/features/tarot/shared/config';
import { getMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';

const LoveReading = createTarotReadingComponent({
  getConfig: () => createLoveConfig(),
  interpretationEmoji: '❤️',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getMeaningByCardAndPosition(card.name, position);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    // Context bilgisini de döndür
    const interpretation = isReversed ? meaning.reversed : meaning.upright;
    return {
      interpretation,
      context: meaning.context || '',
    };
  },
});

export default LoveReading;
