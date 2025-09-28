import { TarotTheme, ThemeClasses } from '../types/tarot-modal.types';

export const getThemeClasses = (theme: TarotTheme): ThemeClasses => {
  const themes: Record<TarotTheme, ThemeClasses> = {
    blue: {
      border: 'border-blue-500/30',
      headerBorder: 'border-blue-500/20',
      sectionBorder: 'border-blue-500/20',
      iconBg: 'bg-blue-800/70',
      iconText: 'text-blue-200',
      titleText: 'text-blue-200',
      labelText: 'text-blue-200',
      inputBorder: 'border-blue-400/50',
      buttonBg: 'bg-blue-600/80',
      buttonText: 'text-blue-100',
      buttonHover: 'hover:bg-blue-500/20',
      focusRing: 'focus:ring-blue-500/50',
    },
    pink: {
      border: 'border-pink-500/30',
      headerBorder: 'border-pink-500/20',
      sectionBorder: 'border-pink-500/20',
      iconBg: 'bg-pink-800/70',
      iconText: 'text-pink-200',
      titleText: 'text-pink-200',
      labelText: 'text-pink-200',
      inputBorder: 'border-pink-400/50',
      buttonBg: 'bg-pink-600/80',
      buttonText: 'text-pink-100',
      buttonHover: 'hover:bg-pink-500/20',
      focusRing: 'focus:ring-pink-500/50',
    },
    purple: {
      border: 'border-purple-500/30',
      headerBorder: 'border-purple-500/20',
      sectionBorder: 'border-purple-500/20',
      iconBg: 'bg-purple-800/70',
      iconText: 'text-purple-200',
      titleText: 'text-purple-200',
      labelText: 'text-purple-200',
      inputBorder: 'border-purple-400/50',
      buttonBg: 'bg-purple-600/80',
      buttonText: 'text-purple-100',
      buttonHover: 'hover:bg-purple-500/20',
      focusRing: 'focus:ring-purple-500/50',
    },
    green: {
      border: 'border-green-500/30',
      headerBorder: 'border-green-500/20',
      sectionBorder: 'border-green-500/20',
      iconBg: 'bg-green-800/70',
      iconText: 'text-green-200',
      titleText: 'text-green-200',
      labelText: 'text-green-200',
      inputBorder: 'border-green-400/50',
      buttonBg: 'bg-green-600/80',
      buttonText: 'text-green-100',
      buttonHover: 'hover:bg-green-500/20',
      focusRing: 'focus:ring-green-500/50',
    },
    yellow: {
      border: 'border-yellow-500/30',
      headerBorder: 'border-yellow-500/20',
      sectionBorder: 'border-yellow-500/20',
      iconBg: 'bg-yellow-800/70',
      iconText: 'text-yellow-200',
      titleText: 'text-yellow-200',
      labelText: 'text-yellow-200',
      inputBorder: 'border-yellow-400/50',
      buttonBg: 'bg-yellow-600/80',
      buttonText: 'text-yellow-100',
      buttonHover: 'hover:bg-yellow-500/20',
      focusRing: 'focus:ring-yellow-500/50',
    },
    orange: {
      border: 'border-orange-500/30',
      headerBorder: 'border-orange-500/20',
      sectionBorder: 'border-orange-500/20',
      iconBg: 'bg-orange-800/70',
      iconText: 'text-orange-200',
      titleText: 'text-orange-200',
      labelText: 'text-orange-200',
      inputBorder: 'border-orange-400/50',
      buttonBg: 'bg-orange-600/80',
      buttonText: 'text-orange-100',
      buttonHover: 'hover:bg-orange-500/20',
      focusRing: 'focus:ring-orange-500/50',
    },
    red: {
      border: 'border-red-500/30',
      headerBorder: 'border-red-500/20',
      sectionBorder: 'border-red-500/20',
      iconBg: 'bg-red-800/70',
      iconText: 'text-red-200',
      titleText: 'text-red-200',
      labelText: 'text-red-200',
      inputBorder: 'border-red-400/50',
      buttonBg: 'bg-red-600/80',
      buttonText: 'text-red-100',
      buttonHover: 'hover:bg-red-500/20',
      focusRing: 'focus:ring-red-500/50',
    },
  };

  return themes[theme];
};

export const getMaxWidthClass = (
  maxWidth: 'sm' | 'md' | 'lg' | 'xl'
): string => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return maxWidthClasses[maxWidth];
};
