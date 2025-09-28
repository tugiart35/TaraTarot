import { useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import type { TarotCard, PositionInfo, TarotTheme } from '@/types/tarot';
import type { TarotConfig } from '@/features/tarot/shared/types/tarot-config.types';
import { sanitizeHtml } from '@/utils/security';
import { getReadingTitle, getReadingFormat } from '@/utils/dashboard-utils';
import { useTarotDeck } from '@/features/tarot/lib/full-tarot-deck';
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
import { getMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';
import { getNewLoverMeaningByCardAndPosition } from '@/features/tarot/lib/new-lover/position-meanings-index';
import { getCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';
import { getMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';
import { getProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';
import { getRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';
import { getSituationAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/situation-analysis/position-meanings-index';

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

interface RawReadingCard {
  id?: string | number;
  cardId?: string | number;
  name?: string;
  nameTr?: string;
  title?: string;
  displayName?: string;
  isReversed?: boolean;
  reversed?: boolean;
  position?: number;
  positionId?: number;
}

export interface ReadingDetailCard {
  card: TarotCard;
  displayName: string;
  isReversed: boolean;
  position: PositionInfo;
  meaning?: string;
}

export interface ReadingQuestionEntry {
  label: string;
  value: string;
}

export interface ReadingQuestions {
  personalInfo: ReadingQuestionEntry[];
  prompts: ReadingQuestionEntry[];
}

export interface ReadingStatusInfo {
  label: string;
  badgeClassName: string;
  icon: string;
}

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
  status: ReadingStatusInfo;
  cards: ReadingDetailCard[];
  questions: ReadingQuestions;
  interpretationHtml: string;
  translationNamespace: string | null;
  filePrefix: string;
}

const CONFIG_FACTORIES: Record<NormalizedTarotReadingType, () => TarotConfig> = {
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

const TYPE_PRESENTATION: Record<NormalizedTarotReadingType, { icon: string }> = {
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

const STATUS_PRESENTATION: Record<string, ReadingStatusInfo> = {
  completed: {
    label: 'readingModal.completed',
    icon: '✅',
    badgeClassName:
      'bg-green-500/20 text-green-300 border border-green-500/30',
  },
  reviewed: {
    label: 'readingModal.reviewed',
    icon: '👁️',
    badgeClassName:
      'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  },
  pending: {
    label: 'readingModal.pending',
    icon: '⏳',
    badgeClassName:
      'bg-blue-500/20 text-blue-200 border border-blue-500/30',
  },
};

const FORMAT_LABELS: Record<'audio' | 'written' | 'simple', string> = {
  audio: 'readings.format.audio',
  written: 'readings.format.written',
  simple: 'readings.format.simple',
};

const UNKNOWN_CARD: TarotCard = {
  id: -1,
  name: 'Unknown Card',
  nameTr: 'Bilinmeyen Kart',
  suit: 'major',
  meaning: { upright: '', reversed: '' },
  meaningTr: { upright: '', reversed: '' },
  keywords: [],
  keywordsTr: [],
  image: '',
};

function normalizeReadingType(
  readingType?: string,
  spreadName?: string | null
): NormalizedTarotReadingType | null {
  if (!readingType && !spreadName) {
    return null;
  }

  const source = `${readingType ?? ''} ${spreadName ?? ''}`.toLowerCase();

  if (source.includes('new') && source.includes('lover')) {
    return 'newLover';
  }
  if (source.includes('love')) {
    return 'love';
  }
  if (source.includes('career')) {
    return 'career';
  }
  if (source.includes('money')) {
    return 'money';
  }
  if (source.includes('problem')) {
    return 'problemSolving';
  }
  if (source.includes('marriage')) {
    return 'marriage';
  }
  if (source.includes('relationship-analysis')) {
    return 'relationshipAnalysis';
  }
  if (source.includes('relationship') && source.includes('problem')) {
    return 'relationshipProblems';
  }
  if (source.includes('situation')) {
    return 'situationAnalysis';
  }

  return null;
}

function parseRawCards(rawCards: Reading['cards']): RawReadingCard[] {
  if (!rawCards) {
    return [];
  }

  try {
    if (typeof rawCards === 'string') {
      const parsed = JSON.parse(rawCards);
      if (Array.isArray(parsed)) {
        return parsed as RawReadingCard[];
      }
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.selectedCards)) {
        return parsed.selectedCards as RawReadingCard[];
      }
    }

    if (Array.isArray(rawCards)) {
      return rawCards as RawReadingCard[];
    }

    if (typeof rawCards === 'object') {
      const anyCards = rawCards as any;
      if (Array.isArray(anyCards.selectedCards)) {
        return anyCards.selectedCards as RawReadingCard[];
      }
    }
  } catch (error) {
    console.warn('Failed to parse reading cards', error);
  }

  return [];
}

function parsePositions(
  rawCards: Reading['cards'],
  config: TarotConfig | null
): PositionInfo[] {
  if (config?.positionsInfo?.length) {
    return config.positionsInfo as PositionInfo[];
  }

  if (!rawCards) {
    return [];
  }

  try {
    if (typeof rawCards === 'string') {
      const parsed = JSON.parse(rawCards);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.positions)) {
        return parsed.positions.map((position: any, index: number) => ({
          id: position?.id ?? index + 1,
          title: position?.title ?? `Pozisyon ${index + 1}`,
          desc: position?.desc ?? position?.description ?? `Pozisyon ${index + 1}`,
          description: position?.description ?? position?.desc ?? `Pozisyon ${index + 1}`,
        }));
      }
    }
  } catch (error) {
    console.warn('Failed to parse reading positions', error);
  }

  return [];
}

function resolveCard(
  rawCard: RawReadingCard | undefined,
  deckById: Map<number, TarotCard>,
  deckByName: Map<string, TarotCard>,
  fallbackId: number
): { card: TarotCard; displayName: string; isReversed: boolean } {
  if (!rawCard) {
    return {
      card: { ...UNKNOWN_CARD, id: fallbackId },
      displayName: 'Bilinmeyen Kart',
      isReversed: false,
    };
  }

  const rawId = rawCard.id ?? rawCard.cardId;
  if (rawId !== undefined && rawId !== null) {
    const numericId = Number(rawId);
    if (!Number.isNaN(numericId) && deckById.has(numericId)) {
      const deckCard = deckById.get(numericId)!;
      return {
        card: deckCard,
        displayName: deckCard.nameTr ?? deckCard.name,
        isReversed: Boolean(rawCard.isReversed ?? rawCard.reversed),
      };
    }
  }

  const candidateNames = [
    rawCard.name,
    rawCard.nameTr,
    rawCard.title,
    rawCard.displayName,
  ]
    .filter(Boolean)
    .map(name => name!.toLowerCase());

  for (const candidate of candidateNames) {
    if (candidate && deckByName.has(candidate)) {
      const deckCard = deckByName.get(candidate)!;
      return {
        card: deckCard,
        displayName: deckCard.nameTr ?? deckCard.name,
        isReversed: Boolean(rawCard.isReversed ?? rawCard.reversed),
      };
    }
  }

  const displayName =
    rawCard.nameTr || rawCard.name || rawCard.title || 'Bilinmeyen Kart';

  return {
    card: {
      ...UNKNOWN_CARD,
      id: fallbackId,
      name: displayName,
      nameTr: displayName,
    },
    displayName,
    isReversed: Boolean(rawCard.isReversed ?? rawCard.reversed),
  };
}

function buildMeaningResolver(
  normalizedType: NormalizedTarotReadingType | null
) {
  if (!normalizedType) {
    return null;
  }

  switch (normalizedType) {
    case 'love':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getMeaningByCardAndPosition(card.nameTr || card.name, position);
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'newLover':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getNewLoverMeaningByCardAndPosition(card, position, isReversed);
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'career':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getCareerMeaningByCardAndPosition(card, position, isReversed);
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'money':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getMoneyMeaningByCardAndPosition(card, position, isReversed);
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'problemSolving':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getProblemSolvingMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'marriage':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getMarriageMeaningByCardAndPosition(card, position, isReversed);
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'relationshipAnalysis':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getRelationshipAnalysisMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'relationshipProblems':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getRelationshipProblemsMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    case 'situationAnalysis':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getSituationAnalysisMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return isReversed ? meaning.reversed : meaning.upright;
      };
    default:
      return null;
  }
}

function parseQuestions(
  rawQuestions: any,
  config: TarotConfig | null,
  translate: (key: string, fallback?: string) => string
): ReadingQuestions {
  if (!rawQuestions) {
    return { personalInfo: [], prompts: [] };
  }

  let questionsPayload = rawQuestions;
  if (typeof rawQuestions === 'string') {
    try {
      questionsPayload = JSON.parse(rawQuestions);
    } catch (error) {
      console.warn('Failed to parse reading questions', error);
      return { personalInfo: [], prompts: [] };
    }
  }

  const personalInfoEntries: ReadingQuestionEntry[] = [];
  const promptEntries: ReadingQuestionEntry[] = [];

  const namespace = config?.translationNamespace;
  const formKeys = config?.i18nKeys?.form;

  const personalInfo =
    questionsPayload.personalInfo || questionsPayload.details?.personalInfo;

  if (personalInfo) {
    personalInfoEntries.push(
      {
        label:
          (formKeys && translate(formKeys.firstName)) ||
          translate('readingModal.firstName', 'Ad'),
        value: personalInfo.name ?? personalInfo.firstName ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.lastName)) ||
          translate('readingModal.lastName', 'Soyad'),
        value: personalInfo.surname ?? personalInfo.lastName ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.birthDate)) ||
          translate('readingModal.birthDate', 'Doğum Tarihi'),
        value: personalInfo.birthDate ?? '-',
      },
      {
        label:
          (formKeys && translate(formKeys.email)) ||
          translate('readingModal.email', 'E-posta'),
        value: personalInfo.email ?? '-',
      }
    );
  }

  const userQuestions =
    questionsPayload.userQuestions ||
    questionsPayload.questions ||
    questionsPayload.prompts;

  if (userQuestions) {
    if (typeof userQuestions === 'object') {
      Object.entries(userQuestions).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const normalizedKey = key.toLowerCase();
        let labelFallback = key;

        if (namespace) {
          const translated = translate(
            `${namespace}.form.${normalizedKey}Question`,
            value as string
          );
          if (translated !== value) {
            labelFallback = translated;
          }
        }

        promptEntries.push({
          label: labelFallback,
          value: String(value),
        });
      });
    } else if (Array.isArray(userQuestions)) {
      userQuestions.forEach((question: any, index: number) => {
        if (!question) {
          return;
        }
        promptEntries.push({
          label: `${translate('readingModal.question', 'Soru')} ${index + 1}`,
          value: String(question),
        });
      });
    }
  }

  return {
    personalInfo: personalInfoEntries.filter(entry => entry.value && entry.value !== '-'),
    prompts: promptEntries.filter(entry => entry.value),
  };
}

export function useReadingDetail(reading: Reading | null): ReadingDetailResult | null {
  const deck = useTarotDeck();
  const { t } = useTranslations();

  const normalizedType = useMemo(
    () => normalizeReadingType(reading?.reading_type, reading?.spread_name),
    [reading?.reading_type, reading?.spread_name]
  );

  const config = useMemo(() => {
    if (!normalizedType) {
      return null;
    }
    const factory = CONFIG_FACTORIES[normalizedType];
    return factory ? factory() : null;
  }, [normalizedType]);

  const theme: TarotTheme = config?.theme ?? 'purple';
  const icon = config?.icon ?? (normalizedType ? TYPE_PRESENTATION[normalizedType].icon : '✨');

  const deckById = useMemo(() => {
    const map = new Map<number, TarotCard>();
    deck.forEach(card => {
      map.set(card.id, card);
    });
    return map;
  }, [deck]);

  const deckByName = useMemo(() => {
    const map = new Map<string, TarotCard>();
    deck.forEach(card => {
      map.set(card.name.toLowerCase(), card);
      map.set(card.nameTr.toLowerCase(), card);
    });
    return map;
  }, [deck]);

  const rawCards = useMemo(() => parseRawCards(reading?.cards ?? null), [reading?.cards]);
  const positions = useMemo(
    () => parsePositions(reading?.cards ?? null, config),
    [reading?.cards, config]
  );

  const meaningResolver = useMemo(
    () => buildMeaningResolver(normalizedType ?? null),
    [normalizedType]
  );

  const cards = useMemo<ReadingDetailCard[]>(() => {
    const cardCount = config?.cardCount ?? rawCards.length;
    if (!cardCount) {
      return [];
    }

    return Array.from({ length: cardCount }).map((_, index) => {
      const rawCard = rawCards[index];
      const resolved = resolveCard(rawCard, deckById, deckByName, index * -1 - 1);

      const positionInfo =
        positions[index] ??
        ({
          id: index + 1,
          title: t('readingModal.position', `Pozisyon ${index + 1}`),
          desc: `Pozisyon ${index + 1}`,
          description: `Pozisyon ${index + 1}`,
        } as PositionInfo);

      const meaning = meaningResolver
        ? meaningResolver(resolved.card, positionInfo.id, resolved.isReversed)
        : undefined;

      return {
        card: resolved.card,
        displayName: resolved.displayName,
        isReversed: resolved.isReversed,
        position: positionInfo,
        meaning,
      };
    });
  }, [config?.cardCount, rawCards, deckById, deckByName, positions, t, meaningResolver]);

  const locale = t('common.locale', 'tr-TR');

  const formattedDate = reading?.created_at
    ? new Date(reading.created_at).toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  const costCredits = reading?.cost_credits ?? null;
  const title = reading?.title || getReadingTitle(reading?.reading_type ?? '');

  const statusInfo = (() => {
    const statusKey = reading?.status ?? 'pending';
    const presentation = STATUS_PRESENTATION[statusKey] ?? STATUS_PRESENTATION.pending;
    return {
      icon: presentation.icon,
      badgeClassName: presentation.badgeClassName,
      label: t(presentation.label, statusKey),
    };
  })();

  const format = getReadingFormat(reading?.reading_type ?? '', costCredits ?? undefined);
  const formatLabelKey = FORMAT_LABELS[format];
  const formatLabel = t(formatLabelKey, format === 'audio' ? 'Sesli Okuma' : format === 'written' ? 'Yazılı Okuma' : 'Basit Okuma');

  const questions = useMemo(
    () => parseQuestions(reading?.questions, config, (key, fallback) => t(key, fallback ?? key)),
    [reading?.questions, config, t]
  );

  const interpretationHtml = useMemo(() => {
    if (!reading?.interpretation) {
      return '';
    }
    return sanitizeHtml(reading.interpretation);
  }, [reading?.interpretation]);

  if (!reading) {
    return null;
  }

  return {
    isTarotReading: Boolean(config),
    normalizedType: normalizedType ?? null,
    config,
    theme,
    icon,
    title,
    spreadName:
      reading.spread_name ||
      (config?.translationNamespace
        ? t(`${config.translationNamespace}.data.spreadTitle`, title)
        : title),
    costCredits,
    formattedDate,
    formatLabel,
    status: statusInfo,
    cards,
    questions,
    interpretationHtml,
    translationNamespace: config?.translationNamespace ?? null,
    filePrefix: t('readingModal.filePrefix', 'tarot-okuma'),
  };
}
