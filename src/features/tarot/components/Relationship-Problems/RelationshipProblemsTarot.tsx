'use client';

import type { TarotCard } from '@/types/tarot';
import type { CardMeaningData } from '@/types/ui';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createRelationshipProblemsConfig } from '@/features/tarot/shared/config';
import { 
  getRelationshipProblemsMeaningByCardAndPosition,
  type RelationshipProblemsPositionMeaning 
} from '@/features/tarot/lib/relationship-problems/position-meanings-index';

const RelationshipProblemsReading = createTarotReadingComponent({
  getConfig: () => createRelationshipProblemsConfig(),
  interpretationEmoji: '💔',
  readingType: 'RELATIONSHIP_PROBLEMS_DETAILED', // Relationship Problems için reading type belirt
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

    // Context bilgisini de içeren obje döndür
    return {
      interpretation: isReversed ? meaning.reversed : meaning.upright,
      context: meaning.context,
      keywords: meaning.keywords || []
    };
  },
});

export default RelationshipProblemsReading;
