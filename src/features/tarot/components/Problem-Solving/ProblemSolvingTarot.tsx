'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createProblemSolvingConfig } from '@/features/tarot/shared/config';
import { getProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';

const ProblemSolvingReading = createTarotReadingComponent({
  getConfig: () => createProblemSolvingConfig(),
  interpretationEmoji: '🧩',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getProblemSolvingMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default ProblemSolvingReading;
