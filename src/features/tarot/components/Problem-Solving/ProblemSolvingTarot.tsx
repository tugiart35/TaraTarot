'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createProblemSolvingConfig } from '@/features/tarot/shared/config';
import { 
  getProblemSolvingMeaningByCardAndPosition
} from '@/features/tarot/lib/problem-solving/position-meanings-index';

const ProblemSolvingReading = createTarotReadingComponent({
  getConfig: () => createProblemSolvingConfig(),
  interpretationEmoji: '🧩',
  readingType: 'PROBLEM_SOLVING_DETAILED', // Problem Solving için reading type belirt
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    console.log('🔍 ProblemSolvingTarot getCardMeaning:', {
      cardName: card.nameTr,
      position,
      isReversed
    });

    const meaning = getProblemSolvingMeaningByCardAndPosition(card, position, isReversed);

    console.log('🔍 ProblemSolvingTarot meaning result:', {
      found: !!meaning,
      card: meaning?.card,
      interpretation: meaning ? (isReversed ? meaning.reversed : meaning.upright)?.substring(0, 50) + '...' : 'No meaning'
    });

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    // Love tarot gibi context bilgisini de döndür
    const interpretation = isReversed ? meaning.reversed : meaning.upright;
    return {
      interpretation,
      context: meaning.context || '',
      keywords: meaning.keywords || []
    };
  },
});

export default ProblemSolvingReading;
