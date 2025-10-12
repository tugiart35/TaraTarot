'use client';

import type { TarotCard } from '@/types/tarot';
import { useTranslations } from '@/hooks/useTranslations';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createRelationshipProblemsConfig } from '@/features/tarot/shared/config';
import { getI18nRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';

export default function RelationshipProblemsReading(props: any) {
  // i18n hook'unu component içinde kullan
  const { t } = useTranslations();

  // TarotComponent'i hook'ların içinde oluştur
  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createRelationshipProblemsConfig(t),
    interpretationEmoji: '💔',
    readingType: 'RELATIONSHIP_PROBLEMS_DETAILED',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      // i18n destekli anlam al - t fonksiyonu closure ile erişilebilir!
      const meaning = getI18nRelationshipProblemsMeaningByCardAndPosition(
        card.name,
        position,
        t
      );

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
