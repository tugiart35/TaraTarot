'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createNewLoverConfig } from '@/features/tarot/shared/config';
import newLoverExports from '@/features/tarot/lib/new-lover/position-meanings-index';
import { useTranslations } from '@/hooks/useTranslations';

const { getNewLoverMeaningByCardAndPosition } = newLoverExports;

export default function NewLoverReading(props: any) {
  const { t } = useTranslations();

  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createNewLoverConfig(t),
    interpretationEmoji: '💕',
    readingType: 'NEW_LOVER_DETAILED',
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

      return {
        interpretation: isReversed ? meaning.reversed : meaning.upright,
        context: meaning.context,
        keywords: meaning.keywords || [],
      };
    },
  });

  return <TarotComponent {...props} />;
}
