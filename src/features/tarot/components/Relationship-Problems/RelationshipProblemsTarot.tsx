'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createRelationshipProblemsConfig } from '@/features/tarot/shared/config';
import { getRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';

const RelationshipProblemsReading = createTarotReadingComponent({
  getConfig: () => createRelationshipProblemsConfig(),
  interpretationEmoji: '💔',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getRelationshipProblemsMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default RelationshipProblemsReading;
