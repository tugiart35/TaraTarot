'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { BaseInterpretation } from '@/features/shared/ui';
import { TarotConfig } from '../types/tarot-config.types';
import { TarotCard, PositionInfo } from '@/types/tarot';

export interface BaseTarotInterpretationProps {
  config: TarotConfig;
  cards: (TarotCard | null)[];
  isReversed: boolean[];
  title?: string;
  icon?: string;
  badgeText?: string;
  badgeColor?: string;
  positionsInfo: readonly PositionInfo[];
  getPositionSpecificInterpretation: (
    _card: TarotCard,
    _position: number,
    _isReversed: boolean
  ) => string;
  getPositionContext?: (_card: TarotCard, _position: number) => string;
  getKeywords?: (
    _meaning: any,
    _card: TarotCard
  ) => string[];
  showContext?: boolean;
  onSaveReading?: () => void;
  isSavingReading?: boolean;
  showSaveButton?: boolean;
  className?: string;
}

export default function BaseTarotInterpretation({
  config,
  cards,
  isReversed,
  title,
  icon,
  badgeText,
  badgeColor,
  positionsInfo,
  getPositionSpecificInterpretation,
  getPositionContext,
  getKeywords,
  showContext = true,
  onSaveReading,
  isSavingReading = false,
  showSaveButton = false,
  className = '',
}: BaseTarotInterpretationProps) {
  const { t } = useTranslations();

  // Theme'e göre badge rengi belirle
  const getThemeBadgeColor = (theme: string) => {
    const badgeColors: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-400',
      pink: 'bg-pink-500/20 text-pink-400',
      purple: 'bg-purple-500/20 text-purple-400',
      green: 'bg-green-500/20 text-green-400',
      yellow: 'bg-yellow-500/20 text-yellow-400',
      orange: 'bg-orange-500/20 text-orange-400',
      red: 'bg-red-500/20 text-red-400',
    };
    return badgeColors[theme] || badgeColors.blue;
  };

  // Varsayılan değerleri belirle
  const defaultTitle =
    title || t(`${config.translationNamespace}.data.interpretationTitle`);
  const defaultIcon = icon || config.icon;
  const defaultBadgeText =
    badgeText || t(`${config.translationNamespace}.data.badgeText`);
  const defaultBadgeColor = badgeColor || getThemeBadgeColor(config.theme);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* BaseInterpretation Bileşeni */}
      <BaseInterpretation
        cards={cards}
        isReversed={isReversed}
        theme={config.theme as any}
        title={defaultTitle}
        icon={defaultIcon}
        badgeText={defaultBadgeText}
        badgeColor={defaultBadgeColor || 'bg-blue-500/20 text-blue-400'}
        positionsInfo={positionsInfo}
        getPositionSpecificInterpretation={getPositionSpecificInterpretation}
        getPositionContext={getPositionContext}
        getKeywords={getKeywords}
        showContext={showContext}
      />

      {/* Kaydet Butonu - Sadece gerekli durumlarda göster */}
      {showSaveButton && onSaveReading && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={onSaveReading}
            disabled={isSavingReading}
            className={`px-8 py-4 bg-gradient-to-r ${
              config.theme === 'blue'
                ? 'from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600'
                : config.theme === 'pink'
                  ? 'from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600'
                  : config.theme === 'purple'
                    ? 'from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600'
                    : config.theme === 'green'
                      ? 'from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600'
                      : config.theme === 'yellow'
                        ? 'from-yellow-600 to-orange-500 hover:from-yellow-700 hover:to-orange-600'
                        : config.theme === 'orange'
                          ? 'from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600'
                          : config.theme === 'red'
                            ? 'from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600'
                            : 'from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600'
            } text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg`}
          >
            {isSavingReading ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                {t(`${config.translationNamespace}.modals.savingReading`)}
              </div>
            ) : (
              t(`${config.translationNamespace}.modals.saveReading`)
            )}
          </button>
        </div>
      )}
    </div>
  );
}
