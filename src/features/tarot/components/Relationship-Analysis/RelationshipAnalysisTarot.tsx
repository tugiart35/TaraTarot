'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createRelationshipAnalysisConfig } from '@/features/tarot/shared/config';
import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';

const RelationshipAnalysisReading = createTarotReadingComponent({
  getConfig: () => createRelationshipAnalysisConfig(),
  interpretationEmoji: '💕',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getRelationshipAnalysisMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default RelationshipAnalysisReading;
