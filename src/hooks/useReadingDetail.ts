import { useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import type {
  TarotTheme,
  TarotConfig,
} from '@/features/tarot/shared/types/tarot-config.types';
import { sanitizeHtml } from '@/utils/security';
import { useReadingCards } from '@/hooks/useReadingCards';
import { useReadingQuestions } from '@/hooks/useReadingQuestions';
import { useReadingMetadata } from '@/hooks/useReadingMetadata';
import { getReadingStatusInfo } from '@/utils/reading-status-utils';
import {
  createCareerConfig,
  createLoveConfig,
  createMoneyConfig,
  createProblemSolvingConfig,
  createMarriageConfig,
  createNewLoverConfig,
  createRelationshipAnalysisConfig,
  createRelationshipProblemsConfig,
  createSituationAnalysisConfig,
} from '@/features/tarot/shared/config';

export type NormalizedTarotReadingType =
  | 'love'
  | 'newLover'
  | 'career'
  | 'money'
  | 'problemSolving'
  | 'marriage'
  | 'situationAnalysis'
  | 'relationshipAnalysis'
  | 'relationshipProblems';

// Import edilen hook'lardan gelen interface'ler
export type { ReadingDetailCard } from '@/hooks/useReadingCards';
export type {
  ReadingQuestionEntry,
  ReadingQuestions,
} from '@/hooks/useReadingQuestions';
export type { ReadingStatusInfo } from '@/utils/reading-status-utils';

export interface ReadingDetailResult {
  isTarotReading: boolean;
  normalizedType: NormalizedTarotReadingType | null;
  config: TarotConfig | null;
  theme: TarotTheme;
  icon: string;
  title: string;
  spreadName: string;
  costCredits: number | null;
  formattedDate: string;
  formatLabel: string;
  status: import('@/utils/reading-status-utils').ReadingStatusInfo;
  cards: import('@/hooks/useReadingCards').ReadingDetailCard[];
  questions: import('@/hooks/useReadingQuestions').ReadingQuestions;
  interpretationHtml: string;
  translationNamespace: string | null;
  filePrefix: string;
}

const CONFIG_FACTORIES: Record<NormalizedTarotReadingType, () => TarotConfig> =
  {
    love: createLoveConfig,
    newLover: createNewLoverConfig,
    career: createCareerConfig,
    money: createMoneyConfig,
    problemSolving: createProblemSolvingConfig,
    marriage: createMarriageConfig,
    situationAnalysis: createSituationAnalysisConfig,
    relationshipAnalysis: createRelationshipAnalysisConfig,
    relationshipProblems: createRelationshipProblemsConfig,
  };

const TYPE_PRESENTATION: Record<NormalizedTarotReadingType, { icon: string }> =
  {
    love: { icon: '💕' },
    newLover: { icon: '💖' },
    career: { icon: '💼' },
    money: { icon: '💰' },
    problemSolving: { icon: '🧩' },
    marriage: { icon: '💒' },
    situationAnalysis: { icon: '🔮' },
    relationshipAnalysis: { icon: '💙' },
    relationshipProblems: { icon: '💔' },
  };

function normalizeReadingType(
  readingType?: string,
  spreadName?: string | null
): NormalizedTarotReadingType | null {
  if (!readingType && !spreadName) {
    return null;
  }

  const source = `${readingType ?? ''} ${spreadName ?? ''}`.toLowerCase();

  // Önce en spesifik kontrolleri yap

  // Relationship Analysis - en spesifik (spreadName kontrolü önce)
  if (
    spreadName === 'relationshipAnalysis.data.spreadName' ||
    source.includes('relationshipanalysis.data.spreadname')
  ) {
    return 'relationshipAnalysis';
  }

  // Relationship Analysis - diğer kontroller
  if (
    source.includes('relationship-analysis') ||
    source.includes('relationshipanalysis') ||
    source.includes('ilişki analizi') ||
    source.includes('iliskianalizi') ||
    readingType === 'relationship-analysis' ||
    spreadName === 'relationship-analysis'
  ) {
    return 'relationshipAnalysis';
  }

  // Relationship Problems
  if (
    source.includes('relationship-problems') ||
    source.includes('relationshipproblems') ||
    source.includes('ilişki problemleri') ||
    source.includes('relationshipproblems.data.spreadname') ||
    readingType === 'relationship-problems' ||
    spreadName === 'relationship-problems' ||
    spreadName === 'relationshipProblems.data.spreadName'
  ) {
    return 'relationshipProblems';
  }

  // Situation Analysis
  if (
    source.includes('situation-Analysis') ||
    source.includes('situationAnalysis') ||
    source.includes('durum analizi') ||
    readingType === 'situation-analysis' ||
    readingType === 'SITUATION_ANALYSIS_SPREAD' ||
    spreadName === 'situation-analysis' ||
    spreadName === 'situationAnalysis.data.spreadName'
  ) {
    return 'situationAnalysis';
  }

  // New Lover
  if (
    source.includes('new-lover') ||
    source.includes('newlover') ||
    source.includes('yeni aşk') ||
    readingType === 'new-lover' ||
    spreadName === 'new-lover'
  ) {
    return 'newLover';
  }

  // Problem Solving
  if (
    source.includes('problem-solving') ||
    source.includes('problemsolving') ||
    source.includes('problem çözme') ||
    readingType === 'problem-solving' ||
    spreadName === 'problem-solving'
  ) {
    return 'problemSolving';
  }

  // Marriage
  if (
    source.includes('marriage') ||
    source.includes('evlilik') ||
    readingType === 'marriage' ||
    readingType === 'love' && source.includes('evlilik') ||
    spreadName === 'marriage'
  ) {
    return 'marriage';
  }

  // Money
  if (
    source.includes('money') ||
    source.includes('para') ||
    readingType === 'money' ||
    spreadName === 'money'
  ) {
    return 'money';
  }

  // Career
  if (
    source.includes('career') ||
    source.includes('kariyer') ||
    readingType === 'career' ||
    spreadName === 'career'
  ) {
    return 'career';
  }

  // Love - genel kontrol (sadece Relationship Analysis değilse)
  if (
    ((source.includes('love') ||
      source.includes('aşk') ||
      readingType === 'love' ||
      spreadName === 'love') &&
      spreadName !== 'love.data.spreadName') ||
    spreadName !== 'relationshipAnalysis.data.spreadName'
  ) {
    return 'love';
  }

  // Fallback: Eğer hiçbir case match etmezse, general olarak problemSolving döndür
  if (source.includes('general') || !source.trim()) {
    return 'problemSolving';
  }

  return null;
}

export function useReadingDetail(
  reading: Reading | null
): ReadingDetailResult | null {
  const { t } = useTranslations();

  const normalizedType = useMemo(() => {
    return normalizeReadingType(reading?.reading_type, reading?.spread_name);
  }, [reading?.reading_type, reading?.spread_name]);

  const config = useMemo(() => {
    if (!normalizedType) {
      return null;
    }
    const factory = CONFIG_FACTORIES[normalizedType];
    const configResult = factory ? factory() : null;

    return configResult;
  }, [normalizedType]);

  const theme: TarotTheme = config?.theme ?? 'purple';
  const icon =
    config?.icon ??
    (normalizedType ? TYPE_PRESENTATION[normalizedType].icon : '✨');

  // Yeni hook'ları kullan
  const cards = useReadingCards(reading, config, normalizedType);
  const questions = useReadingQuestions(reading, config);
  const metadata = useReadingMetadata(reading, normalizedType);
  const status = getReadingStatusInfo(reading, t);

  const interpretationHtml = useMemo(() => {
    if (!reading?.interpretation) {
      return '';
    }
    return sanitizeHtml(reading.interpretation);
  }, [reading?.interpretation]);

  if (!reading) {
    return null;
  }

  if (!reading || !metadata) {
    return null;
  }

  return {
    isTarotReading: Boolean(config),
    normalizedType: normalizedType ?? null,
    config,
    theme,
    icon,
    title: metadata.title,
    spreadName: (() => {
      // Önce config'den çeviri anahtarı dene
      if (config?.spreadName) {
        const translatedSpreadName = t(config.spreadName, '');

        if (
          translatedSpreadName &&
          translatedSpreadName !== config.spreadName
        ) {
          return translatedSpreadName;
        }
      }

      // Fallback: normalizedType'a göre çeviri anahtarı dene
      if (normalizedType) {
        const translationKey = `${normalizedType}.data.spreadName`;
        const translatedSpreadName = t(translationKey, '');

        if (translatedSpreadName && translatedSpreadName !== translationKey) {
          return translatedSpreadName;
        }
      }

      // Son fallback değerler
      return reading.spread_name || metadata.title;
    })(),
    costCredits: metadata.costCredits,
    formattedDate: metadata.formattedDate,
    formatLabel: metadata.formatLabel,
    status,
    cards,
    questions,
    interpretationHtml,
    translationNamespace: config?.translationNamespace ?? null,
    filePrefix: metadata.filePrefix,
  };
}
