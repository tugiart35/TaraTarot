'use client';

import { useCallback } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import { BaseCardRenderer } from '@/features/shared/ui';
import { BaseTarotModal, getThemeClasses } from '@/features/tarot/shared/ui';
import type { CardTheme } from '@/types/ui';
import type { TarotCard } from '@/types/tarot';
import { useReadingDetail } from '@/hooks/useReadingDetail';
import PDFExport from '@/features/shared/ui/PDFExport';

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
      <div data-reading-detail-modal className='space-y-8'>
        <header className='space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-inner shadow-black/20'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <span className='text-3xl'>{detail.icon}</span>
                <h2 className='text-xl font-semibold text-slate-100'>
                  {detail.title}
                </h2>
              </div>
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
              value={
                detail.costCredits
                  ? `${detail.costCredits} ${t('readings.credits', 'kredi')}`
                  : '-'
              }
            />
            <div className='rounded-xl border border-white/5 bg-slate-900/40 p-6 shadow-sm shadow-black/10'>
              <p className='text-xs uppercase tracking-wide text-slate-400'>
                {t('readings.formatLabel', 'Okuma Formatı')}
              </p>
              <div className='mt-1'>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    detail.formatLabel.includes('Sesli') ||
                    detail.formatLabel.includes('Sesli Okuma') ||
                    detail.formatLabel.includes('Audio')
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : detail.formatLabel.includes('Yazılı') ||
                          detail.formatLabel.includes('Yazılı Okuma') ||
                          detail.formatLabel.includes('Written')
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  <span>
                    {detail.formatLabel.includes('Sesli') ||
                    detail.formatLabel.includes('Sesli Okuma') ||
                    detail.formatLabel.includes('Audio')
                      ? '🎵'
                      : detail.formatLabel.includes('Yazılı') ||
                          detail.formatLabel.includes('Yazılı Okuma') ||
                          detail.formatLabel.includes('Written')
                        ? '📝'
                        : '✨'}
                  </span>
                  {detail.formatLabel}
                </span>
              </div>
            </div>
          </div>
        </header>
        {(detail.questions.personalInfo.length > 0 ||
          detail.questions.prompts.length > 0) && (
          <section className='space-y-3'>
            <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
              {t('readingModal.questionsAnswers', 'Sorular ve Cevaplar')}
            </h3>

            <div className='grid gap-4 md:grid-cols-2'>
              {detail.questions.personalInfo.map(entry => (
                <InfoTile
                  key={entry.label}
                  label={entry.label}
                  value={entry.value}
                />
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
        {detail.cards.length > 0 && (
          <section className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <h3
                  className={`${themeClasses.titleText} text-lg font-semibold`}
                >
                  {detail.spreadName}
                </h3>
                <p className='text-sm text-slate-300 leading-relaxed'>
                  {detail.normalizedType &&
                    t(
                      `spreads.${detail.normalizedType}.description`,
                      'Kartların rehberliği'
                    )}
                </p>
              </div>
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
                  keywords={cardItem.keywords}
                  context={cardItem.context}
                  theme={theme}
                />
              ))}
            </div>
          </section>
        )}

        <footer className='flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-xs text-slate-400'>
            {t(
              'readingModal.mysticNotes',
              'Kişisel notlarınızı kaydetmek için bu okumanın PDF kopyasını indirebilirsiniz.'
            )}
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
  meaning?: string | undefined;
  keywords?: string[] | undefined;
  context?: string | undefined;
  theme: 'pink' | 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow';
}

function CardInsight({
  card,
  displayName,
  positionTitle,
  isReversed,
  meaning,
  keywords,
  context,
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
          mode='detail'
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

      {/* Context bilgisi */}
      {context && (
        <div className='mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50'>
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
            <div>
              <p className='text-xs uppercase tracking-wide text-blue-300 font-medium mb-1'>
                Bağlam
              </p>
              <p className='text-sm text-slate-200 leading-relaxed'>
                {context}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ana anlam */}
      {meaning && (
        <div className='mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50'>
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0'></div>
            <div>
              <p className='text-xs uppercase tracking-wide text-purple-300 font-medium mb-1'>
                Anlam
              </p>
              <p className='text-sm text-slate-200 leading-relaxed'>
                {meaning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className='mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50'>
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0'></div>
            <div className='flex-1'>
              <p className='text-xs uppercase tracking-wide text-amber-300 font-medium mb-2'>
                Anahtar Kelimeler
              </p>
              <div className='flex flex-wrap gap-2'>
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-500/30'
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
