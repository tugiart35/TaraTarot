'use client';

import type { TarotCard } from '@/types/tarot';
import { useTranslations } from '@/hooks/useTranslations';
import { createTarotReadingComponent } from '@/features/tarot/shared/components';
import { createLoveConfig } from '@/features/tarot/shared/config';
import { getI18nMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';

export default function LoveReading(props: any) {
  // i18n hook'unu component içinde kullan
  const { t } = useTranslations();

  // TarotComponent'i hook'ların içinde oluştur
  const TarotComponent = createTarotReadingComponent({
    getConfig: () => createLoveConfig(),
    interpretationEmoji: '❤️',
    getCardMeaning: (
      card: TarotCard | null,
      position: number,
      isReversed: boolean
    ) => {
      if (!card) {
        return '';
      }

      // i18n destekli anlam al - t fonksiyonu artık erişilebilir!
      const meaning = getI18nMeaningByCardAndPosition(card.name, position, t);

      if (!meaning) {
        // Fallback: kartın kendi Türkçe anlamını kullan
        return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
      }

      // Context bilgisini de döndür
      const interpretation = isReversed ? meaning.reversed : meaning.upright;
      return {
        interpretation,
        context: meaning.context || '',
      };
    },
  });

  return <TarotComponent {...props} />;
}
