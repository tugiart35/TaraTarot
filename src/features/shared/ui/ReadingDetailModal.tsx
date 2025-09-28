'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import { BaseCardRenderer, BaseTarotModal, getThemeClasses } from '@/features/tarot/shared/ui';
import type { CardTheme } from '@/types/ui';
import type { TarotCard } from '@/types/tarot';
import { useReadingDetail } from '@/hooks/useReadingDetail';
import PDFExport from '@/features/shared/ui/PDFExport';
import { sanitizeHtml } from '@/utils/security';

interface ReadingDetailModalProps {
  reading: Reading | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingDetailModal({
  reading,
  isOpen,
  onClose,
}: ReadingDetailModalProps) {
  const { t } = useTranslations();
  const detail = useReadingDetail(reading);

  const theme = detail?.theme ?? 'purple';
  const themeClasses = getThemeClasses(theme);

  const safeInterpretation = useMemo(() => {
    if (!detail?.interpretationHtml) {
      return null;
    }
    return sanitizeHtml(detail.interpretationHtml);
  }, [detail?.interpretationHtml]);

  const handleDownload = useCallback(() => {
    const modalNode = document.querySelector('[data-reading-detail-modal]');
    if (!modalNode) {
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }

    const cloned = modalNode.cloneNode(true) as HTMLElement;
    cloned.classList.add('printing');

    printWindow.document.write(`
      <html>
        <head>
          <title>${detail?.filePrefix ?? 'tarot-reading'}</title>
          <style>
            body { font-family: 'Inter', sans-serif; background: #0f172a; color: white; padding: 24px; }
            .printing { max-width: 960px; margin: 0 auto; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body></body>
      </html>
    `);

    printWindow.document.body?.appendChild(cloned);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, [detail?.filePrefix]);

  if (!isOpen || !reading || !detail) {
    return null;
  }

  return (
    <BaseTarotModal
      isOpen={isOpen}
      onClose={onClose}
      theme={theme}
      icon={detail.icon}
      titleKey='readingModal.mysticReading'
      maxWidth='xl'
      className='backdrop-blur'
    >
      <div
        data-reading-detail-modal
        className='space-y-8'
      >
        <header className='space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-inner shadow-black/20'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <span className='text-3xl'>{detail.icon}</span>
                <h2 className='text-xl font-semibold text-slate-100'>{detail.title}</h2>
              </div>
              <p className='mt-2 text-sm text-slate-300'>
                {detail.spreadName}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${detail.status.badgeClassName}`}
            >
              <span>{detail.status.icon}</span>
              {detail.status.label}
            </span>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <InfoTile
              label={t('readingModal.readingDate', 'Okuma Tarihi')}
              value={detail.formattedDate}
            />
            <InfoTile
              label={t('readingModal.creditCost', 'Kredi Maliyeti')}
              value={detail.costCredits ? `${detail.costCredits} ${t('readings.credits', 'kredi')}` : '-'}
            />
            <InfoTile
              label={t('readings.formatLabel', 'Okuma Formatı')}
              value={detail.formatLabel}
            />
            <InfoTile
              label={t('readings.type', 'Okuma Türü')}
              value={reading.reading_type?.replace(/_/g, ' ') ?? '-'}
            />
          </div>
        </header>

        {detail.cards.length > 0 && (
          <section className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
                {t('readingModal.mysticReading', 'Mistik Okuma')} –
                <span className='ml-2 text-slate-300'>
                  {t('readingModal.cardspreadmeaning2', 'Kartların rehberliği')}
                </span>
              </h3>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              {detail.cards.map(cardItem => (
                <CardInsight
                  key={`${cardItem.position.id}-${cardItem.card.id}`}
                  card={cardItem.card}
                  displayName={cardItem.displayName}
                  positionTitle={cardItem.position.title}
                  isReversed={cardItem.isReversed}
                  meaning={cardItem.meaning}
                  theme={theme}
                />
              ))}
            </div>
          </section>
        )}

        <section className='space-y-3'>
          <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
            {t('readingModal.interpretation', 'Mistik Yorumlama')}
          </h3>
          <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-sm leading-relaxed text-slate-200'>
            {safeInterpretation ? (
              <div dangerouslySetInnerHTML={{ __html: safeInterpretation }} />
            ) : (
              <p className='text-slate-400'>
                {t('readingModal.noInterpretation', 'Bu kart için yorum bulunamadı.')}
              </p>
            )}
          </div>
        </section>

        {(detail.questions.personalInfo.length > 0 || detail.questions.prompts.length > 0) && (
          <section className='space-y-3'>
            <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
              {t('readingModal.questionsAnswers', 'Sorular ve Cevaplar')}
            </h3>

            <div className='grid gap-4 md:grid-cols-2'>
              {detail.questions.personalInfo.map(entry => (
                <InfoTile key={entry.label} label={entry.label} value={entry.value} />
              ))}
            </div>

            {detail.questions.prompts.length > 0 && (
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-3'>
                {detail.questions.prompts.map(entry => (
                  <div key={entry.label} className='space-y-1'>
                    <p className='text-xs uppercase tracking-wide text-slate-400'>
                      {entry.label}
                    </p>
                    <p className='text-sm text-slate-100'>{entry.value}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <footer className='flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-xs text-slate-400'>
            {t('readingModal.mysticNotes', 'Kişisel mistik notlarınızı kaydetmek için bu okumanın PDF kopyasını indirebilirsiniz.')}
          </div>
          <PDFExport onDownload={handleDownload} />
        </footer>
      </div>
    </BaseTarotModal>
  );
}

interface InfoTileProps {
  label: string;
  value: string;
}

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className='rounded-xl border border-white/5 bg-slate-900/40 p-4 shadow-sm shadow-black/10'>
      <p className='text-xs uppercase tracking-wide text-slate-400'>{label}</p>
      <p className='mt-1 text-sm font-medium text-slate-100'>{value || '-'}</p>
    </div>
  );
}

interface CardInsightProps {
  card: TarotCard;
  displayName: string;
  positionTitle: string;
  isReversed: boolean;
  meaning?: string;
  theme: 'pink' | 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow';
}

function CardInsight({
  card,
  displayName,
  positionTitle,
  isReversed,
  meaning,
  theme,
}: CardInsightProps) {
  const themeMap: Record<CardInsightProps['theme'], CardTheme> = {
    pink: 'pink',
    red: 'pink',
    blue: 'blue',
    green: 'green',
    purple: 'purple',
    orange: 'amber',
    yellow: 'amber',
  };

  const resolvedTheme = themeMap[theme] ?? 'default';

  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 shadow-sm shadow-black/10'>
      <div className='flex items-start gap-4'>
        <BaseCardRenderer
          card={card}
          isReversed={isReversed}
          mode='gallery'
          canSelect={false}
          size='small'
          theme={resolvedTheme}
          showName
        />
        <div className='flex-1 space-y-1'>
          <p className='text-sm font-semibold text-slate-100'>{displayName}</p>
          <p className='text-xs text-slate-400'>{positionTitle}</p>
          <span className='inline-flex items-center rounded-full bg-slate-800/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300'>
            {isReversed ? 'Ters' : 'Düz'}
          </span>
        </div>
      </div>
      {meaning && (
        <p className='text-sm leading-relaxed text-slate-200'>{meaning}</p>
      )}
    </div>
  );
}
