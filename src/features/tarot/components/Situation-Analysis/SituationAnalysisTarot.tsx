'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createSituationAnalysisConfig } from '@/features/tarot/shared/config';
import { getSituationAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/situation-analysis/position-meanings-index';

const SituationAnalysisReading = createTarotReadingComponent({
  getConfig: () => createSituationAnalysisConfig(),
  interpretationEmoji: '🔍',
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => {
    if (!card) {
      return '';
    }

    const meaning = getSituationAnalysisMeaningByCardAndPosition(card, position, isReversed);

    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }

    return isReversed ? meaning.reversed : meaning.upright;
  },
});

export default SituationAnalysisReading;
