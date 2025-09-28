'use client';

import { BaseCardPosition, BaseCardRenderer } from '@/features/shared/ui';
import { TarotCard } from '@/types/tarot';
import { useTranslations } from '@/hooks/useTranslations';
import { TarotConfig, TarotTheme } from '../types/tarot-config.types';
import { getThemeClasses } from './theme-utils';

// TarotTheme'i CardTheme'e dönüştür
const mapTarotThemeToCardTheme = (
  theme: TarotTheme
): 'blue' | 'pink' | 'purple' | 'green' | 'amber' | 'default' => {
  const themeMap: Record<
    TarotTheme,
    'blue' | 'pink' | 'purple' | 'green' | 'amber' | 'default'
  > = {
    blue: 'blue',
    pink: 'pink',
    purple: 'purple',
    green: 'green',
    yellow: 'amber',
    orange: 'amber',
    red: 'default',
  };
  return themeMap[theme] || 'default';
};

export interface BaseTarotCanvasProps {
  config: TarotConfig;
  selectedCards: (TarotCard | null)[];
  cardStates: boolean[];
  isReversed: boolean[];
  currentPosition: number;
  onCardDetails: (card: TarotCard) => void;
  onToggleCard: (positionId: number) => void;
  selectedReadingType: string | null;
  detailedFormSaved: boolean;
  className?: string;
}

export default function BaseTarotCanvas({
  config,
  selectedCards,
  cardStates,
  isReversed,
  currentPosition,
  onCardDetails,
  onToggleCard,
  selectedReadingType,
  detailedFormSaved,
  className = '',
}: BaseTarotCanvasProps) {
  const themeClasses = getThemeClasses(config.theme);
  const { t } = useTranslations();
  const canvasKeys = config.i18nKeys.canvas;

  // Tema bazlı gradient sınıfları
  const getCanvasTheme = (theme: TarotTheme): string => {
    const themes = {
      blue: 'bg-gradient-to-br from-blue-900/90 via-slate-900/80 to-green-800/80 border-blue-700/60',
      pink: 'bg-gradient-to-br from-pink-900/90 via-slate-900/80 to-rose-800/80 border-pink-700/60',
      purple:
        'bg-gradient-to-br from-purple-900/90 via-slate-900/80 to-violet-800/80 border-purple-700/60',
      green:
        'bg-gradient-to-br from-green-900/90 via-slate-900/80 to-emerald-800/80 border-green-700/60',
      yellow:
        'bg-gradient-to-br from-yellow-900/90 via-slate-900/80 to-amber-800/80 border-yellow-700/60',
      orange:
        'bg-gradient-to-br from-orange-900/90 via-slate-900/80 to-red-800/80 border-orange-700/60',
      red: 'bg-gradient-to-br from-red-900/90 via-slate-900/80 to-rose-800/80 border-red-700/60',
    };
    return themes[theme];
  };

  // Tema bazlı gradient overlay
  const getGradientOverlay = (theme: TarotTheme): string => {
    const overlays = {
      blue: 'bg-gradient-to-br from-blue-900/10 via-slate-900/60 to-green-900/20',
      pink: 'bg-gradient-to-br from-pink-900/10 via-slate-900/60 to-rose-900/20',
      purple:
        'bg-gradient-to-br from-purple-900/10 via-slate-900/60 to-violet-900/20',
      green:
        'bg-gradient-to-br from-green-900/10 via-slate-900/60 to-emerald-900/20',
      yellow:
        'bg-gradient-to-br from-yellow-900/10 via-slate-900/60 to-amber-900/20',
      orange:
        'bg-gradient-to-br from-orange-900/10 via-slate-900/60 to-red-900/20',
      red: 'bg-gradient-to-br from-red-900/10 via-slate-900/60 to-rose-900/20',
    };
    return overlays[theme];
  };

  // Tema bazlı final gradient
  const getFinalGradient = (theme: TarotTheme): string => {
    const gradients = {
      blue: 'bg-gradient-to-br from-blue-900/80 via-slate-900/10 to-green-900/80',
      pink: 'bg-gradient-to-br from-pink-900/80 via-slate-900/10 to-rose-900/80',
      purple:
        'bg-gradient-to-br from-purple-900/80 via-slate-900/10 to-violet-900/80',
      green:
        'bg-gradient-to-br from-green-900/80 via-slate-900/10 to-emerald-900/80',
      yellow:
        'bg-gradient-to-br from-yellow-900/80 via-slate-900/10 to-amber-900/80',
      orange:
        'bg-gradient-to-br from-orange-900/80 via-slate-900/10 to-red-900/80',
      red: 'bg-gradient-to-br from-red-900/80 via-slate-900/10 to-rose-900/80',
    };
    return gradients[theme];
  };

  return (
    <div
      className={`w-full relative overflow-hidden rounded-2xl shadow-2xl ${getCanvasTheme(config.theme)} ${className}`}
    >
      {/* Okuma tipi seçilmediyse overlay */}
      {selectedReadingType === null && (
        <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
          <div className='flex flex-col items-center px-6 text-center space-y-2'>
            <div
              className={`w-16 h-16 flex items-center justify-center ${themeClasses.iconBg} rounded-full shadow-lg`}
            >
              <span className={`text-4xl ${themeClasses.iconText}`}>
                {config.icon}
              </span>
            </div>
            <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
              {t(canvasKeys.selectReadingTitle)}
            </h3>
            <p className='text-gray-300 text-sm max-w-sm'>
              {t(canvasKeys.selectReadingDescription)}
            </p>
          </div>
        </div>
      )}

      {(selectedReadingType === 'detailed' ||
        selectedReadingType === 'written') &&
        !detailedFormSaved && (
          <div className='absolute inset-0 z-30 flex items-center justify-center rounded-2xl'>
            <div className='absolute inset-0 bg-black/45 backdrop-blur-[2px] rounded-2xl' />
            <div className='relative z-10 max-w-md mx-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center space-y-3 shadow-2xl'>
              <div
                className={`mx-auto w-12 h-12 flex items-center justify-center ${themeClasses.iconBg} rounded-full`}
              >
                <span className={`text-xl ${themeClasses.iconText}`}>🔒</span>
              </div>
              <h3 className={`${themeClasses.titleText} text-lg font-semibold`}>
                {t(canvasKeys.lockedTitle)}
              </h3>
              <p className='text-gray-300 text-sm'>
                {t(canvasKeys.lockedDescription)}
              </p>
            </div>
          </div>
        )}

      {/* Background layers */}
      <div className='absolute inset-0 rounded-2xl overflow-hidden'>
        <div
          className={`absolute inset-0 ${getGradientOverlay(config.theme)} backdrop-blur-[2px]`}
          style={{ zIndex: 1 }}
        />
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
          loading='lazy'
          style={{ zIndex: 0 }}
        />
        <div
          className={`absolute inset-0 ${getFinalGradient(config.theme)}`}
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Additional overlay */}
      <div
        className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
        style={{ zIndex: 4 }}
      />

      {/* Card positions */}
      <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
        <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
          {(config.positionsLayout || []).map((position, idx) => (
            <BaseCardPosition
              key={position.id}
              position={position}
              card={selectedCards[position.id - 1] ?? null}
              isOpen={!!cardStates[position.id - 1]}
              isReversed={!!isReversed[position.id - 1]}
              isNextPosition={currentPosition === position.id}
              onToggleCard={() => onToggleCard(position.id)}
              onCardDetails={onCardDetails}
              canSelect={
                selectedReadingType === 'simple' ||
                ((selectedReadingType === 'detailed' ||
                  selectedReadingType === 'written') &&
                  detailedFormSaved)
              }
              positionInfo={
                (config.positionsInfo || [])[idx] ?? {
                  title: `Pozisyon ${position.id}`,
                  desc: 'Kart pozisyonu',
                }
              }
              renderCard={(card, props) => (
                <BaseCardRenderer
                  card={card}
                  theme={mapTarotThemeToCardTheme(config.theme)}
                  {...props}
                />
              )}
              colorScheme={mapTarotThemeToCardTheme(config.theme)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
