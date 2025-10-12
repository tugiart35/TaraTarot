'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createCareerConfig } from '@/features/tarot/shared/config';
import { getI18nCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';
import { useTranslations } from '@/hooks/useTranslations';

export default function CareerReading(props: any) {
  const { t } = useTranslations(); // Hook component içinde

  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createCareerConfig(t),
    interpretationEmoji: '💼',
    readingType: 'CAREER_SPREAD_DETAILED',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      // i18n destekli fonksiyon + t parametresi
      const meaning = getI18nCareerMeaningByCardAndPosition(
        card.name,
        position,
        t
      );

      if (!meaning) {
        // Fallback
        return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
      }

      const interpretation = isReversed ? meaning.reversed : meaning.upright;
      return {
        interpretation,
        context: meaning.context || '',
        keywords: meaning.keywords || [],
      };
    },
  });

  return <TarotComponent {...props} />;
}
