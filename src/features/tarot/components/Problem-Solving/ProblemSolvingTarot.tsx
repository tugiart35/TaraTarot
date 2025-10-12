'use client';

import type { TarotCard } from '@/types/tarot';
import { useTranslations } from '@/hooks/useTranslations';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createProblemSolvingConfig } from '@/features/tarot/shared/config';
import { getI18nProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';

export default function ProblemSolvingReading(props: any) {
  // i18n hook'unu component içinde kullan
  const { t } = useTranslations();

  // TarotComponent'i hook'ların içinde oluştur
  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createProblemSolvingConfig(t),
    interpretationEmoji: '🧩',
    readingType: 'PROBLEM_SOLVING_DETAILED',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      console.log('🔍 ProblemSolvingTarot getCardMeaning:', {
        cardName: card.name,
        position,
        isReversed,
      });

      // i18n destekli anlam al - t fonksiyonu closure ile erişilebilir!
      const meaning = getI18nProblemSolvingMeaningByCardAndPosition(
        card.name,
        position,
        t
      );

      console.log('🔍 ProblemSolvingTarot meaning result:', {
        found: !!meaning,
        card: meaning?.card,
        interpretation: meaning
          ? (isReversed ? meaning.reversed : meaning.upright)?.substring(0, 50) +
            '...'
          : 'No meaning',
      });

      if (!meaning) {
        // Fallback: kartın kendi Türkçe anlamını kullan
        return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
      }

      // Context bilgisini döndür
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
