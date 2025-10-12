'use client';

import type { TarotCard } from '@/types/tarot';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createMoneyConfig } from '@/features/tarot/shared/config';
import { getI18nMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';
import { useTranslations } from '@/hooks/useTranslations';

export default function MoneyReading(props: any) {
  const { t } = useTranslations();

  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createMoneyConfig(t),
    interpretationEmoji: '💰',
    readingType: 'MONEY_SPREAD',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      // i18n destekli fonksiyon - kullanıcının diline göre çevirileri döndürür
      const meaning = getI18nMoneyMeaningByCardAndPosition(
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
