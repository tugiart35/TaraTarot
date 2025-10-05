'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createRelationshipAnalysisConfig } from '@/features/tarot/shared/config';
import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';

const RelationshipAnalysisReading = createTarotReadingComponent({
  getConfig: () => createRelationshipAnalysisConfig(),
  interpretationEmoji: '💕',
  readingType: 'RELATIONSHIP_ANALYSIS_DETAILED', // Relationship Analysis için reading type belirt
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    console.log('🔍 RelationshipAnalysisTarot getCardMeaning:', {
      cardName: card.nameTr,
      position,
      isReversed,
    });

    const meaning = getRelationshipAnalysisMeaningByCardAndPosition(
      card,
      position
    );

    console.log('🔍 RelationshipAnalysisTarot meaning result:', {
      found: !!meaning,
      card: meaning?.card,
      interpretation: meaning
        ? (isReversed ? meaning.reversed : meaning.upright)?.substring(0, 50) +
          '...'
        : 'No meaning',
    });

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    // Context bilgisini de içeren obje döndür
    return {
      interpretation: isReversed ? meaning.reversed : meaning.upright,
      context: meaning.context,
      keywords: meaning.keywords || [],
    };
  },
});

export default RelationshipAnalysisReading;
