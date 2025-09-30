import { useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import { getReadingFormat, getReadingTitle } from '@/utils/dashboard-utils';

export interface ReadingMetadata {
  formattedDate: string;
  costCredits: number | null;
  title: string;
  formatLabel: string;
  filePrefix: string;
}

const FORMAT_LABELS: Record<'audio' | 'written' | 'simple', string> = {
  audio: 'readings.format.audio',
  written: 'readings.format.written',
  simple: 'readings.format.simple',
};

export function useReadingMetadata(
  reading: Reading | null,
  normalizedType: string | null
): ReadingMetadata | null {
  const { t } = useTranslations();

  const metadata = useMemo(() => {
    if (!reading) {
      return null;
    }

    const locale = t('common.locale', 'tr-TR');

    const formattedDate = reading.created_at
      ? new Date(reading.created_at).toLocaleString(locale || 'tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-';

    const costCredits = reading.cost_credits ?? null;

    // Title'ı çevir - önce çeviri anahtarı dene, sonra fallback kullan
    const rawTitle = reading.title;
    let title = '';

    // Eğer title varsa ve çeviri anahtarı ise çevir
    if (rawTitle && rawTitle.includes('.')) {
      title = t(rawTitle, rawTitle);
    } else if (normalizedType) {
      // Normalized type'a göre çeviri anahtarı oluştur
      const translationKey = `${normalizedType}.data.detailedTitle`;
      const translatedTitle = t(translationKey, '');

      if (translatedTitle && translatedTitle !== translationKey) {
        title = translatedTitle;
      } else {
        // Fallback olarak getReadingTitle kullan
        title = getReadingTitle(reading.reading_type ?? '');
      }
    } else {
      // Fallback olarak getReadingTitle kullan
      title = getReadingTitle(reading.reading_type ?? '');
    }

    // Önce metadata'dan readingFormat bilgisini kontrol et
    const metadataFormat = reading.metadata?.readingFormat;
    let format: 'audio' | 'written' | 'simple';

    if (metadataFormat) {
      // Metadata'dan gelen format bilgisini kullan
      switch (metadataFormat.toLowerCase()) {
        case 'detailed':
          format = 'audio';
          break;
        case 'written':
          format = 'written';
          break;
        case 'simple':
          format = 'simple';
          break;
        default:
          format = getReadingFormat(
            reading.reading_type ?? '',
            costCredits ?? undefined,
            reading.title
          );
      }
    } else {
      // Fallback: mevcut getReadingFormat fonksiyonunu kullan
      format = getReadingFormat(
        reading.reading_type ?? '',
        costCredits ?? undefined,
        reading.title
      );
    }

    const formatLabelKey = FORMAT_LABELS[format];
    const formatLabel = t(
      formatLabelKey,
      format === 'audio'
        ? 'Sesli Okuma'
        : format === 'written'
          ? 'Yazılı Okuma'
          : 'Basit Okuma'
    );

    const filePrefix = t('readingModal.filePrefix', 'tarot-okuma');

    return {
      formattedDate,
      costCredits,
      title,
      formatLabel,
      filePrefix,
    };
  }, [reading, normalizedType, t]);

  return metadata;
}
