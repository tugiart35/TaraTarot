'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMarriageConfig } from '@/features/tarot/shared/config';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
import { useTranslations } from '@/hooks/useTranslations';

export default function MarriageReading(props: any) {
  const { t } = useTranslations();

  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createMarriageConfig(t),
    interpretationEmoji: '💍',
    readingType: 'MARRIAGE_DETAILED',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      const meaning = getMarriageMeaningByCardAndPosition(
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
