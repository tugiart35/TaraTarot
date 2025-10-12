'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createNewLoverConfig } from '@/features/tarot/shared/config';
import { getI18nNewLoverMeaningByCardAndPosition } from '@/features/tarot/lib/new-lover/position-meanings-index';
import { useTranslations } from '@/hooks/useTranslations';

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

      // i18n destekli fonksiyon - kullanıcının diline göre çevirileri döndürür
      const meaning = getI18nNewLoverMeaningByCardAndPosition(
        card.name,
        position,
        t
      );

      if (!meaning) {
        // Fallback: orijinal kart anlamlarını kullan
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
