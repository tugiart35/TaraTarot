import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/useToast';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase/client';
import type { Theme } from '@/lib/theme/theme-config';
import {
  Toast,
  BaseCardGallery,
  BaseReadingTypeSelector,
  CardDetails,
  BaseCardRenderer,
} from '@/features/shared/ui';
import {
  BaseTarotModal,
  BaseTarotCanvas,
  BaseTarotInterpretation,
  BaseTarotForm,
} from '../ui';
import { useTarotReadingFlow } from '../hooks';
import { triggerEmailSending } from '../utils/trigger-email-sending';
import {
  READING_TYPES,
  TarotCard,
  TarotReadingProps,
  ReadingType,
} from '@/types/tarot';
import { TarotConfig, TarotTheme } from '../types/tarot-config.types';

interface SectionStyle {
  container: string;
  title: string;
}

interface ProcessSectionStyle extends SectionStyle {
  stepNumber: string;
}

interface SpreadThemeStyles {
  infoPrimary: SectionStyle;
  infoSecondary: SectionStyle;
  process: ProcessSectionStyle;
  modalFooter: {
    border: string;
    cancel: string;
    confirm: string;
  };
  creditConfirm: {
    container: string;
    title: string;
    message: string;
    confirmButton: string;
    cancelButton: string;
  };
  successModal: {
    container: string;
    title: string;
    message: string;
    infoBox: string;
    infoText: string;
    progressTrack: string;
    progressFill: string;
  };
  readingHighlight: {
    container: string;
    iconBg: string;
    iconText: string;
    title: string;
    subtitle: string;
  };
  clearAllButton: string;
  readingTypeTheme: Theme;
  galleryTheme: 'pink' | 'blue' | 'purple' | 'green';
}

const THEME_STYLES: Record<TarotTheme, SpreadThemeStyles> = {
  pink: {
    infoPrimary: {
      container:
        'bg-pink-800/20 border border-pink-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-pink-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-rose-800/20 border border-rose-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-rose-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-pink-800/20 border border-pink-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-pink-200 font-semibold mb-2',
      stepNumber: 'bg-pink-600 text-white',
    },
    modalFooter: {
      border: 'border-pink-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-pink-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-pink-400 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-pink-600 to-green-500 hover:from-pink-700 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-pink-900/95 to-green-900/95 border border-pink-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-green-400 text-2xl font-bold mb-4',
      message: 'text-pink-200 mb-6 leading-relaxed',
      infoBox: 'bg-pink-800/30 border border-pink-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-pink-300 text-sm',
      progressTrack: 'bg-pink-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-green-600',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-pink-600/20 via-slate-500/30 to-green-500/20 border border-pink-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-pink-400/20',
      iconText: 'text-pink-300',
      title: 'text-pink-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-pink-500/30 to-green-500/20 border border-pink-500/50 rounded-2xl text-pink-400 hover:bg-pink-500/40 hover:border-pink-500/70 transition-all duration-300 font-semibold shadow-md shadow-pink-500/10',
    readingTypeTheme: 'pink',
    galleryTheme: 'pink',
  },
  blue: {
    infoPrimary: {
      container:
        'bg-blue-800/20 border border-blue-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-blue-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-cyan-800/20 border border-cyan-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-cyan-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-blue-800/20 border border-blue-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-blue-200 font-semibold mb-2',
      stepNumber: 'bg-blue-600 text-white',
    },
    modalFooter: {
      border: 'border-blue-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-blue-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-blue-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-blue-900/95 to-green-900/95 border border-blue-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-green-400 text-2xl font-bold mb-4',
      message: 'text-blue-200 mb-6 leading-relaxed',
      infoBox: 'bg-blue-800/30 border border-blue-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-blue-300 text-sm',
      progressTrack: 'bg-blue-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-green-600',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-blue-600/20 via-slate-500/30 to-green-500/20 border border-blue-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-blue-400/20',
      iconText: 'text-blue-300',
      title: 'text-blue-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-blue-500/30 to-green-500/20 border border-blue-500/50 rounded-2xl text-blue-300 hover:bg-blue-500/40 hover:border-blue-500/70 transition-all duration-300 font-semibold shadow-md shadow-blue-500/10',
    readingTypeTheme: 'blue',
    galleryTheme: 'blue',
  },
  green: {
    infoPrimary: {
      container:
        'bg-green-800/20 border border-green-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-green-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-emerald-800/20 border border-emerald-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-emerald-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-green-800/20 border border-green-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-green-200 font-semibold mb-2',
      stepNumber: 'bg-green-600 text-white',
    },
    modalFooter: {
      border: 'border-green-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-green-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-green-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-green-900/95 to-emerald-900/95 border border-green-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-emerald-300 text-2xl font-bold mb-4',
      message: 'text-green-200 mb-6 leading-relaxed',
      infoBox: 'bg-green-800/30 border border-green-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-green-300 text-sm',
      progressTrack: 'bg-green-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-emerald-500',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-green-600/20 via-slate-500/30 to-emerald-500/20 border border-green-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-green-400/20',
      iconText: 'text-green-300',
      title: 'text-green-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-green-500/30 to-emerald-500/20 border border-green-500/50 rounded-2xl text-green-300 hover:bg-green-500/40 hover:border-green-500/70 transition-all duration-300 font-semibold shadow-md shadow-green-500/10',
    readingTypeTheme: 'green',
    galleryTheme: 'green',
  },
  purple: {
    infoPrimary: {
      container:
        'bg-purple-800/20 border border-purple-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-purple-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-violet-800/20 border border-violet-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-violet-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-purple-800/20 border border-purple-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-purple-200 font-semibold mb-2',
      stepNumber: 'bg-purple-600 text-white',
    },
    modalFooter: {
      border: 'border-purple-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-purple-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border border-purple-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-indigo-300 text-2xl font-bold mb-4',
      message: 'text-purple-200 mb-6 leading-relaxed',
      infoBox: 'bg-purple-800/30 border border-purple-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-purple-300 text-sm',
      progressTrack: 'bg-purple-800/30',
      progressFill: 'bg-gradient-to-r from-indigo-400 to-purple-500',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-purple-600/20 via-slate-500/30 to-indigo-500/20 border border-purple-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-purple-400/20',
      iconText: 'text-purple-300',
      title: 'text-purple-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-purple-500/30 to-indigo-500/20 border border-purple-500/50 rounded-2xl text-purple-300 hover:bg-purple-500/40 hover:border-purple-500/70 transition-all duration-300 font-semibold shadow-md shadow-purple-500/10',
    readingTypeTheme: 'purple',
    galleryTheme: 'purple',
  },
  yellow: {
    infoPrimary: {
      container:
        'bg-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-yellow-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-amber-800/20 border border-amber-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-amber-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-yellow-200 font-semibold mb-2',
      stepNumber: 'bg-yellow-600 text-white',
    },
    modalFooter: {
      border: 'border-yellow-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-yellow-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-yellow-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-yellow-900/95 to-amber-900/95 border border-yellow-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-amber-300 text-2xl font-bold mb-4',
      message: 'text-yellow-200 mb-6 leading-relaxed',
      infoBox: 'bg-yellow-800/30 border border-yellow-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-yellow-300 text-sm',
      progressTrack: 'bg-yellow-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-amber-500',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-yellow-500/20 via-slate-500/30 to-amber-500/20 border border-yellow-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-yellow-400/20',
      iconText: 'text-yellow-300',
      title: 'text-yellow-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-yellow-500/30 to-amber-500/20 border border-yellow-500/50 rounded-2xl text-yellow-300 hover:bg-yellow-500/40 hover:border-yellow-500/70 transition-all duration-300 font-semibold shadow-md shadow-yellow-500/10',
    readingTypeTheme: 'yellow',
    galleryTheme: 'green',
  },
  orange: {
    infoPrimary: {
      container:
        'bg-orange-800/20 border border-orange-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-orange-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-amber-800/20 border border-amber-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-amber-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-orange-800/20 border border-orange-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-orange-200 font-semibold mb-2',
      stepNumber: 'bg-orange-600 text-white',
    },
    modalFooter: {
      border: 'border-orange-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-orange-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-orange-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-orange-900/95 to-green-900/95 border border-orange-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-green-300 text-2xl font-bold mb-4',
      message: 'text-orange-200 mb-6 leading-relaxed',
      infoBox: 'bg-orange-800/30 border border-orange-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-orange-300 text-sm',
      progressTrack: 'bg-orange-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-amber-500',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-orange-600/20 via-slate-500/30 to-green-500/20 border border-orange-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-orange-400/20',
      iconText: 'text-orange-300',
      title: 'text-orange-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-orange-500/30 to-green-500/20 border border-orange-500/50 rounded-2xl text-orange-300 hover:bg-orange-500/40 hover:border-orange-500/70 transition-all duration-300 font-semibold shadow-md shadow-orange-500/10',
    readingTypeTheme: 'orange',
    galleryTheme: 'pink',
  },
  red: {
    infoPrimary: {
      container:
        'bg-red-800/20 border border-red-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-red-200 font-semibold mb-2',
    },
    infoSecondary: {
      container:
        'bg-rose-800/20 border border-rose-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-rose-200 font-semibold mb-2',
    },
    process: {
      container:
        'bg-red-800/20 border border-red-500/30 rounded-xl p-4 text-gray-300',
      title: 'text-red-200 font-semibold mb-2',
      stepNumber: 'bg-red-600 text-white',
    },
    modalFooter: {
      border: 'border-red-500/20',
      cancel:
        'flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800',
      confirm:
        'flex-1 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg',
    },
    creditConfirm: {
      container:
        'bg-slate-900 border border-red-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4',
      title: 'text-red-300 text-xl font-bold mb-4 text-center',
      message: 'text-gray-200 text-center mb-6',
      confirmButton:
        'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60',
      cancelButton:
        'bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60',
    },
    successModal: {
      container:
        'bg-gradient-to-br from-red-900/95 to-rose-900/95 border border-red-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center',
      title: 'text-green-300 text-2xl font-bold mb-4',
      message: 'text-red-200 mb-6 leading-relaxed',
      infoBox: 'bg-red-800/30 border border-red-500/20 rounded-xl p-4 mb-6',
      infoText: 'text-red-300 text-sm',
      progressTrack: 'bg-red-800/30',
      progressFill: 'bg-gradient-to-r from-green-400 to-rose-500',
    },
    readingHighlight: {
      container:
        'bg-gradient-to-r from-red-600/20 via-slate-500/30 to-rose-500/20 border border-red-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse',
      iconBg: 'bg-red-400/20',
      iconText: 'text-red-300',
      title: 'text-red-200 font-bold text-lg',
      subtitle: 'text-gray-300 text-xs',
    },
    clearAllButton:
      'px-8 py-3 bg-gradient-to-r from-red-500/30 to-rose-500/20 border border-red-500/50 rounded-2xl text-red-300 hover:bg-red-500/40 hover:border-red-500/70 transition-all duration-300 font-semibold shadow-md shadow-red-500/10',
    readingTypeTheme: 'red',
    galleryTheme: 'pink',
  },
};

interface CreateTarotReadingComponentOptions {
  getConfig: () => TarotConfig;
  interpretationEmoji: string;
  getCardMeaning: (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ) => string | { interpretation: string; context: string; keywords?: string[] };
}

export function createTarotReadingComponent({
  getConfig,
  interpretationEmoji,
  getCardMeaning,
}: CreateTarotReadingComponentOptions) {
  return function TarotReadingComponent({
    onComplete,
    onPositionChange,
    onReadingTypeSelected,
  }: TarotReadingProps) {
    const config = useMemo(() => getConfig(), []);
    const themeStyles = THEME_STYLES[config.theme];
    const router = useRouter();
    const { t } = useTranslations();
    const { user } = useAuth();
    const { toast, showToast, hideToast } = useToast();
    const detailedCredits = useReadingCredits(config.creditKeys.detailed as any);
    const writtenCredits = useReadingCredits(config.creditKeys.written as any);

    const {
      selectedCards,
      usedCardIds,
      showCardDetails,
      cardStates,
      isReversed,
      deck,
      currentPosition,
      handleCardSelect,
      setShowCardDetails,
      toggleCardState,
      handleClearAll,
      shuffleDeck,
      interpretationRef,
      userQuestion,
      selectedReadingType,
      setSelectedReadingType,
      personalInfo,
      communicationMethod,
      questions,
      formErrors,
      modalStates,
      setModalStates,
      updatePersonalInfo,
      updateCommunicationMethod,
      updateQuestion,
      validateDetailedForm,
      setSaving,
      setSavingReading,
      setDetailedFormSaved,
      handleReadingTypeSelect,
    } = useTarotReadingFlow({
      config,
      onComplete: onComplete || (() => {}),
      onPositionChange: onPositionChange || (() => {}),
    });

    const {
      isSaving,
      showCreditConfirm,
      detailedFormSaved,
      showInfoModal,
      isSavingReading,
      showSuccessModal,
    } = modalStates;

    const [startTime] = useState(() => Date.now());

    const namespace = config.translationNamespace;
    const messages = useMemo(
      () => ({
        // i18n-ally: love.messages.formUnsavedWarning
        formUnsavedWarning: `${namespace}.messages.formUnsavedWarning`,
        // i18n-ally: love.messages.loginRequired
        loginRequired: `${namespace}.messages.loginRequired`,
        // i18n-ally: love.messages.simpleReadingCompleted
        simpleReadingCompleted: `${namespace}.messages.simpleReadingCompleted`,
        // i18n-ally: love.messages.readingSavedSuccess
        readingSavedSuccess: `${namespace}.messages.readingSavedSuccess`,
        // i18n-ally: love.messages.readingSaveError
        readingSaveError: `${namespace}.messages.readingSaveError`,
        // i18n-ally: love.messages.allCardsRequired
        allCardsRequired: `${namespace}.messages.allCardsRequired`,
        // i18n-ally: love.messages.interpretationTitle
        interpretationTitle: `${namespace}.messages.interpretationTitle`,
        // i18n-ally: love.messages.interpretationGreeting
        interpretationGreeting: `${namespace}.messages.interpretationGreeting`,
        // i18n-ally: love.messages.selectReadingTypeFirst
        selectReadingTypeFirst: `${namespace}.messages.selectReadingTypeFirst`,
      }),
      [namespace]
    );

    const dataKeys = useMemo(
      () => ({
        // i18n-ally: love.data.spreadName
        spreadName: `${namespace}.data.spreadName`,
        // i18n-ally: love.data.spreadTitle
        spreadTitle: `${namespace}.data.spreadTitle`,
        // i18n-ally: love.data.detailedTitle
        detailedTitle: `${namespace}.data.detailedTitle`,
        // i18n-ally: love.data.simpleInterpretation
        simpleInterpretation: `${namespace}.data.simpleInterpretation`,
        // i18n-ally: love.data.simpleTitle
        simpleTitle: `${namespace}.data.simpleTitle`,
        // i18n-ally: love.data.badgeText
        badgeText: `${namespace}.data.badgeText`,
        // i18n-ally: love.data.interpretationTitle
        interpretationTitle: `${namespace}.data.interpretationTitle`,
        readingFormats: {
          // i18n-ally: love.data.readingFormats.detailed
          detailed: `${namespace}.data.readingFormats.detailed`,
          // i18n-ally: love.data.readingFormats.written
          written: `${namespace}.data.readingFormats.written`,
          // i18n-ally: love.data.readingFormats.simple
          simple: `${namespace}.data.readingFormats.simple`,
        },
        cardDirections: {
          // i18n-ally: love.data.cardDirections.upright
          upright: `${namespace}.data.cardDirections.upright`,
          // i18n-ally: love.data.cardDirections.reversed
          reversed: `${namespace}.data.cardDirections.reversed`,
        },
      }),
      [namespace]
    );

    // i18n-ally: tarotPage.${config.summaryKey}.summary
    const summaryTitleKey = `tarotPage.${config.summaryKey}.summary`;
    // i18n-ally: tarotPage.${config.summaryKey}.summaryText
    const summaryTextKey = `tarotPage.${config.summaryKey}.summaryText`;
    const modalKeys = config.i18nKeys.modals;

    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (
          event.key === 'Escape' &&
          (selectedReadingType === READING_TYPES.DETAILED ||
            selectedReadingType === READING_TYPES.WRITTEN) &&
          !detailedFormSaved
        ) {
          if (
            personalInfo.name ||
            personalInfo.surname ||
            personalInfo.email ||
            questions.concern ||
            questions.understanding ||
            questions.emotional
          ) {
            const shouldClose = window.confirm(t(messages.formUnsavedWarning));
            if (shouldClose) {
              setSelectedReadingType(null);
            }
          } else {
            setSelectedReadingType(null);
          }
        }
      };

      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [
      detailedFormSaved,
      messages.formUnsavedWarning,
      personalInfo,
      questions,
      selectedReadingType,
      setSelectedReadingType,
      t,
    ]);

    const handleSaveDetailedFormClick = () => {
      if (!validateDetailedForm()) {
        return;
      }
      setModalStates(prev => ({ ...prev, showCreditConfirm: true }));
    };

    const closeInfoModal = () => {
      setModalStates(prev => ({ ...prev, showInfoModal: false }));
    };

    const cancelInfoModal = () => {
      setModalStates(prev => ({ ...prev, showInfoModal: false }));
      setSelectedReadingType(null);
    };

    const saveDetailedForm = async () => {
      if (!user) {
        showToast(t(messages.loginRequired), 'error');
        setModalStates(prev => ({
          ...prev,
          showCreditConfirm: false,
          isSaving: false,
        }));
        return;
      }

      setSaving(true);
      try {
        setDetailedFormSaved(true);
        setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
      } finally {
        setSaving(false);
      }
    };

    const saveReadingToSupabase = async (readingData: any) => {
      try {
        if (!user?.id) {
          return {
            success: true,
            id: 'guest-session',
            userId: 'guest',
            message: 'Guest kullanıcı için veri saklanmadı',
          };
        }

        const costCredits =
          selectedReadingType === READING_TYPES.DETAILED
            ? detailedCredits.creditStatus.requiredCredits
            : selectedReadingType === READING_TYPES.WRITTEN
              ? writtenCredits.creditStatus.requiredCredits
              : 0;

        // İletişim bilgilerini metadata'ya ekleme
        const enhancedMetadata = {
          ...readingData.metadata,
          communicationMethod,
          personalInfo: {
            ...personalInfo,
            // Güvenlik için telefon numarasını metadata'da hash'le
            phoneProvided: !!personalInfo.phone,
          },
        };

        const { data: rpcResult, error: rpcError } = await supabase.rpc(
          'fn_create_reading_with_debit',
          {
            p_user_id: user.id,
            p_reading_type: readingData.readingType,
            p_spread_name: t(dataKeys.spreadName),
            p_title: readingData.title || t(dataKeys.spreadTitle),
            p_interpretation: readingData.interpretation,
            p_cards: readingData.cards.selectedCards,
            p_questions: readingData.questions,
            p_cost_credits: costCredits,
            p_metadata: enhancedMetadata,
            p_idempotency_key: `reading_${user.id}_${readingData.timestamp}`,
          }
        );

        // Okuma kaydedildikten sonra, readings tablosuna contact_method ve phone bilgilerini güncelle
        if (rpcResult?.id) {
          const { error: updateError } = await supabase
            .from('readings')
            .update({
              contact_method: communicationMethod,
              phone:
                communicationMethod === 'whatsapp' ? personalInfo.phone : null,
            })
            .eq('id', rpcResult.id);

          if (updateError) {
            console.warn('İletişim bilgileri güncellenemedi:', updateError);
          }
        }

        if (rpcError) {
          throw rpcError;
        }

        // Email gönderimini arka planda yap, kullanıcıyı bekletme
        triggerEmailSending(rpcResult?.id).catch(error => {
          console.warn('Email gönderimi başarısız:', error);
        });

        return {
          success: true,
          id: rpcResult?.id,
          userId: user.id,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Bilinmeyen hata',
        };
      }
    };

    const generateBasicInterpretation = (): string => {
      if (
        selectedCards.length !== config.cardCount ||
        selectedCards.some(card => card === null)
      ) {
        return t(messages.allCardsRequired);
      }

      let interpretation = `${interpretationEmoji} **${t(messages.interpretationTitle)}**\\n\\n`;

      if (userQuestion.trim()) {
        interpretation += `**${t(messages.interpretationGreeting).replace('{question}', userQuestion)}**\\n\\n`;
      }

      config.positionsInfo.forEach((positionInfo, index) => {
        const card = selectedCards[index];
        const reversed = !!isReversed[index];

        if (card) {
          interpretation += `**${positionInfo.id}. ${positionInfo.title}: ${card.nameTr}** (${
            reversed
              ? t(dataKeys.cardDirections.reversed)
              : t(dataKeys.cardDirections.upright)
          })\\n*${positionInfo.desc}*\\n${getCardMeaning(card, positionInfo.id, reversed)}\\n\\n`;
        }
      });

      interpretation += `💫 **${t(summaryTitleKey)}:**\\n"${t(summaryTextKey)}"`;

      return interpretation;
    };

    const handleSaveReading = async () => {
      setSavingReading(true);

      try {
        if (selectedReadingType === READING_TYPES.SIMPLE) {
          const simpleReadingData = {
            userId: user?.id ?? 'anonymous-user',
            readingType: config.supabaseReadingType,
            cards: { selectedCards: [] },
            interpretation: t(dataKeys.simpleInterpretation),
            question: { type: 'simple' },
            status: 'completed',
            title: t(dataKeys.simpleTitle),
            cost_credits: 0,
            admin_notes: 'Simple reading counter',
            metadata: { platform: 'web' },
            timestamp: new Date().toISOString(),
          };

          // Kaydetme işlemini arka planda yap, kullanıcıyı yönlendir
          saveReadingToSupabase(simpleReadingData).catch(error => {
            console.warn('Simple reading kaydedilemedi:', error);
          });
          showToast(t(messages.simpleReadingCompleted), 'success');
          router.push('/dashboard');
          return;
        }

        if (
          selectedReadingType === READING_TYPES.DETAILED ||
          selectedReadingType === READING_TYPES.WRITTEN
        ) {
          const duration = Date.now() - startTime;
          const serializedCards = selectedCards
            .filter((card): card is TarotCard => card !== null)
            .map((card, index) => ({
              id: card.id,
              name: card.name,
              nameTr: card.nameTr,
              isReversed: isReversed[index],
            }));

          const readingData = {
            userId: user?.id ?? 'anonymous-user',
            readingType: config.supabaseReadingType,
            status: 'completed',
            title: t(dataKeys.detailedTitle),
            interpretation: generateBasicInterpretation(),
            cards: {
              selectedCards: serializedCards,
              positions: config.positionsInfo.map(position => ({
                id: position.id,
                title: position.title,
                description: position.desc,
              })),
            },
            questions: {
              personalInfo,
              userQuestions: questions,
            },
            metadata: {
              duration,
              platform: 'web',
              ipHash: 'hashed_ip_address',
              userAgent:
                typeof navigator !== 'undefined' ? navigator.userAgent : '',
              readingFormat: selectedReadingType,
              readingFormatTr:
                selectedReadingType === READING_TYPES.DETAILED
                  ? t(dataKeys.readingFormats.detailed)
                  : selectedReadingType === READING_TYPES.WRITTEN
                    ? t(dataKeys.readingFormats.written)
                    : t(dataKeys.readingFormats.simple),
            },
            timestamp: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const saveResult = await saveReadingToSupabase(readingData);

          if (saveResult.success) {
            showToast(t(messages.readingSavedSuccess), 'success');
          } else {
            showToast(t(messages.readingSaveError), 'error');
          }

          setModalStates(prev => ({ ...prev, showSuccessModal: true }));

          setTimeout(() => {
            setModalStates(prev => ({ ...prev, showSuccessModal: false }));
            router.push('/dashboard');
          }, 1500);

          return;
        }
      } catch {
        showToast(t(messages.readingSaveError), 'error');
      } finally {
        setSavingReading(false);
      }
    };

    const handleReadingTypeSelectWithCallback = async (
      type: ReadingType | string
    ) => {
      await handleReadingTypeSelect(type);

      if (onReadingTypeSelected) {
        onReadingTypeSelected();
      }
    };

    const handleCardSelectGuarded = (card: TarotCard) => {
      if (!selectedReadingType) {
        showToast(t(messages.selectReadingTypeFirst), 'info');
        return;
      }
      handleCardSelect(card);
    };

    const canSelectCards =
      selectedReadingType === READING_TYPES.SIMPLE ||
      ((selectedReadingType === READING_TYPES.DETAILED ||
        selectedReadingType === READING_TYPES.WRITTEN) &&
        detailedFormSaved);

    const readingTypeKey = `${config.creditKeyPrefix}_DETAILED` as any;

    return (
      <div className='w-full space-y-6 md:space-y-8'>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}

        <BaseTarotModal
          isOpen={showInfoModal}
          onClose={closeInfoModal}
          theme={config.theme}
          icon={config.icon}
          titleKey={modalKeys.infoTitle}
        >
          <div className='space-y-4'>
            <div className={themeStyles.infoPrimary.container}>
              <h3 className={themeStyles.infoPrimary.title}>
                {t(modalKeys.aboutSpread)}
              </h3>
              <p className='text-sm leading-relaxed'>
                {t(modalKeys.aboutSpreadText)}
              </p>
            </div>
            <div className={themeStyles.infoPrimary.container}>
              <h3 className={themeStyles.infoPrimary.title}>
                {selectedReadingType === READING_TYPES.DETAILED
                  ? t(modalKeys.detailedReading)
                  : t(modalKeys.writtenReading)}
              </h3>
              <p className='text-sm leading-relaxed'>
                {selectedReadingType === READING_TYPES.DETAILED
                  ? t(modalKeys.detailedReadingText)
                  : t(modalKeys.writtenReadingText)}
              </p>
            </div>
            <div className={themeStyles.infoSecondary.container}>
              <h3 className={themeStyles.infoSecondary.title}>
                {t(modalKeys.loveAttentionInfo)}
              </h3>
              <p className='text-sm leading-relaxed'>
                {t(modalKeys.loveAttention)}
              </p>
            </div>
            <div className={themeStyles.process.container}>
              <h3 className={themeStyles.process.title}>
                {t(modalKeys.process)}
              </h3>
              <div className='space-y-2'>
                {[modalKeys.step1, modalKeys.step2, modalKeys.step3, modalKeys.step4].map((stepKey, index) => (
                  <div
                    key={stepKey}
                    className='flex items-center text-gray-300 text-sm'
                  >
                    <span
                      className={`${themeStyles.process.stepNumber} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3`}
                    >
                      {index + 1}
                    </span>
                    {t(stepKey)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t ${themeStyles.modalFooter.border} p-6 flex-shrink-0 mt-6`}
          >
            <div className='flex gap-3'>
              <button
                onClick={cancelInfoModal}
                className={themeStyles.modalFooter.cancel}
              >
                {t(modalKeys.cancel)}
              </button>
              <button
                onClick={closeInfoModal}
                className={themeStyles.modalFooter.confirm}
              >
                {t(modalKeys.continue)}
              </button>
            </div>
          </div>
        </BaseTarotModal>

        <BaseTarotForm
          config={config}
          isOpen={
            (selectedReadingType === READING_TYPES.DETAILED ||
              selectedReadingType === READING_TYPES.WRITTEN) &&
            !detailedFormSaved &&
            !showInfoModal
          }
          onClose={() => setSelectedReadingType(null)}
          personalInfo={personalInfo}
          communicationMethod={communicationMethod}
          questions={questions}
          formErrors={formErrors}
          isSaving={isSaving}
          onUpdatePersonalInfo={updatePersonalInfo}
          onUpdateCommunicationMethod={updateCommunicationMethod}
          onUpdateQuestion={updateQuestion}
          onSaveForm={handleSaveDetailedFormClick}
        />

        {showCreditConfirm && (
          <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
            <div className={themeStyles.creditConfirm.container}>
              <h2 className={themeStyles.creditConfirm.title}>
                {t(modalKeys.creditConfirm)}
              </h2>
              <p className={themeStyles.creditConfirm.message}>
                {t(modalKeys.creditConfirmMessage)}
              </p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={saveDetailedForm}
                  disabled={isSaving}
                  className={themeStyles.creditConfirm.confirmButton}
                >
                  {isSaving ? t(modalKeys.processing) : t(modalKeys.confirm)}
                </button>
                <button
                  onClick={() =>
                    setModalStates(prev => ({
                      ...prev,
                      showCreditConfirm: false,
                    }))
                  }
                  disabled={isSaving}
                  className={themeStyles.creditConfirm.cancelButton}
                >
                  {t(modalKeys.cancel)}
                </button>
              </div>
            </div>
          </div>
        )}


     

        <BaseTarotCanvas
          config={config}
          selectedCards={selectedCards}
          cardStates={cardStates}
          isReversed={isReversed}
          currentPosition={currentPosition || 0}
          onCardDetails={setShowCardDetails}
          onToggleCard={toggleCardState}
          selectedReadingType={selectedReadingType}
          detailedFormSaved={detailedFormSaved}
          className='mb-6'
        />
   {selectedReadingType &&
          currentPosition &&
          currentPosition <= config.cardCount && (
            <div className='flex justify-center mb-4'>
              <div className={themeStyles.readingHighlight.container}>
                <div className='flex items-center space-x-3'>
                  <div
                    className={`w-6 h-6 ${themeStyles.readingHighlight.iconBg} rounded-full flex items-center justify-center`}
                  >
                    <span className={`${themeStyles.readingHighlight.iconText} text-sm`}>
                      {interpretationEmoji}
                    </span>
                  </div>
                  <div className='text-center'>
                    <div className={themeStyles.readingHighlight.title}>
                      {config.positionsInfo[currentPosition - 1]?.title ?? ''}
                    </div>
                    <div className={themeStyles.readingHighlight.subtitle}>
                      {config.positionsInfo[currentPosition - 1]?.desc ?? ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {selectedReadingType === null && (
          <div className='flex justify-center mb-6'>
            <BaseReadingTypeSelector
              selectedType={selectedReadingType}
              onTypeSelect={handleReadingTypeSelectWithCallback}
              onCreditInfoClick={() => router.push('/dashboard/credits')}
              readingTypes={READING_TYPES}
              theme={themeStyles.readingTypeTheme}
              disabled={isSaving}
              readingType={readingTypeKey}
            />
          </div>
        )}

        <BaseCardGallery
          deck={deck}
          usedCardIds={new Set(usedCardIds.map(id => Number(id)))}
          nextPosition={selectedReadingType ? currentPosition : null}
          onCardSelect={handleCardSelectGuarded}
          onShuffleDeck={shuffleDeck}
          canSelectCards={canSelectCards}
          theme={themeStyles.galleryTheme}
          renderCard={(card, isUsed, canSelect) => (
            <BaseCardRenderer
              card={card}
              isUsed={isUsed}
              canSelect={canSelect}
              mode='gallery'
              theme={themeStyles.galleryTheme}
            />
          )}
          translations={{
            // i18n-ally: gallery.nextPosition
            nextPosition: t('gallery.nextPosition'),
            // i18n-ally: gallery.allPositionsFull
            allPositionsFull: t('gallery.allPositionsFull'),
            // i18n-ally: gallery.shuffle
            shuffle: t('gallery.shuffle'),
            // i18n-ally: gallery.scrollToSeeAll
            scrollToSeeAll: t('gallery.scrollToSeeAll'),
            // i18n-ally: gallery.emptyDeck
            emptyDeck: t('gallery.emptyDeck'),
          }}
        />

        {selectedCards.filter(card => card !== null).length > 0 && (
          <div className='flex justify-center'>
            <button
              onClick={handleClearAll}
              className={themeStyles.clearAllButton}
            >
              {/* i18n-ally: ${namespace}.form.clearAll */}
              {t(`${namespace}.form.clearAll`)}
            </button>
          </div>
        )}

        {showCardDetails && (
          <CardDetails
            card={showCardDetails}
            isReversed={(() => {
              const index = selectedCards.findIndex(
                (candidate: TarotCard | null) =>
                  candidate && candidate.id === showCardDetails.id
              );
              return !!isReversed[index >= 0 ? index : 0];
            })()}
            position={(() => {
              const index = selectedCards.findIndex(
                (candidate: TarotCard | null) =>
                  candidate && candidate.id === showCardDetails.id
              );
              return (index >= 0 ? index : 0) + 1;
            })()}
            onClose={() => setShowCardDetails(null)}
            spreadType={config.spreadId as any}
            positionInfo={(() => {
              const index = selectedCards.findIndex(
                (candidate: TarotCard | null) =>
                  candidate && candidate.id === showCardDetails.id
              );
              const position = config.positionsInfo[index];
              return position
                ? { title: position.title, desc: position.desc }
                : { title: `Pozisyon ${index + 1}`, desc: 'Kart pozisyonu' };
            })()}
            getPositionSpecificInterpretation={(card, position, reversed) => {
              const meaning = getCardMeaning(card, position, reversed);
              if (typeof meaning === 'object' && meaning !== null) {
                return meaning.interpretation;
              }
              return typeof meaning === 'string' ? meaning : '';
            }}
            getPositionContext={(card, position) => {
              // Context bilgisini almak için lib/ dosyalarından
              const meaning = getCardMeaning(card, position, false);
              if (typeof meaning === 'object' && meaning !== null) {
                return meaning.context || undefined;
              }
              return undefined;
            }}
            getKeywords={(_cardMeaning, card) => {
              // Keywords'leri almak için lib/ dosyalarından
              const position = selectedCards.findIndex(c => c && c.id === card.id) + 1;
              const meaning = getCardMeaning(card, position, false);
              if (typeof meaning === 'object' && meaning !== null && meaning.keywords) {
                return meaning.keywords;
              }
              return [];
            }}
            showContext
          />
        )}

        {selectedCards.filter(card => card !== null).length ===
          config.cardCount &&
          selectedReadingType && (
            <div ref={interpretationRef} className='space-y-6'>
              <BaseTarotInterpretation
                config={config}
                cards={selectedCards}
                isReversed={isReversed}
                title={t(dataKeys.interpretationTitle)}
                icon={interpretationEmoji}
                badgeText={t(dataKeys.badgeText)}
                positionsInfo={config.positionsInfo}
            getPositionSpecificInterpretation={(card, position, reversed) => {
              const meaning = getCardMeaning(card, position, reversed);
              if (typeof meaning === 'object' && meaning !== null) {
                return meaning.interpretation;
              }
              return typeof meaning === 'string' ? meaning : '';
            }}
            getPositionContext={(card, position) => {
              // Context bilgisini almak için lib/ dosyalarından
              const meaning = getCardMeaning(card, position, false);
              if (typeof meaning === 'object' && meaning !== null) {
                return meaning.context || '';
              }
              return '';
            }}
            getKeywords={(_cardMeaning, card) => {
              // Keywords'leri almak için lib/ dosyalarından
              const position = selectedCards.findIndex(c => c && c.id === card.id) + 1;
              const meaning = getCardMeaning(card, position, false);
              if (typeof meaning === 'object' && meaning !== null && meaning.keywords) {
                return meaning.keywords;
              }
              return [];
            }}
            showContext
                onSaveReading={handleSaveReading}
                isSavingReading={isSavingReading}
                showSaveButton={
                  selectedReadingType === READING_TYPES.DETAILED ||
                  selectedReadingType === READING_TYPES.WRITTEN
                }
              />
            </div>
          )}

        {showSuccessModal && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className={themeStyles.successModal.container}>
              <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                <span className='text-3xl'>✅</span>
              </div>

              <h2 className={themeStyles.successModal.title}>
                {t(modalKeys.successTitle)}
              </h2>

              <p className={themeStyles.successModal.message}>
                {t(modalKeys.successMessage)}
              </p>

              <div className={themeStyles.successModal.infoBox}>
                <p className={themeStyles.successModal.infoText}>
                  {t(modalKeys.redirecting)}
                </p>
              </div>

              <div
                className={`w-full ${themeStyles.successModal.progressTrack} rounded-full h-2 mb-4`}
              >
                <div
                  className={`${themeStyles.successModal.progressFill} h-2 rounded-full animate-pulse`}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
}
