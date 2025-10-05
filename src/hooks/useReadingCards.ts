import { useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import type { Reading } from '@/types/dashboard.types';
import type { TarotCard, PositionInfo } from '@/types/tarot';
import type { TarotConfig } from '@/features/tarot/shared/types/tarot-config.types';
import { useTarotDeck } from '@/features/tarot/lib/full-tarot-deck';
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
  keywords?: string[];
  context?: string;
}

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

function parseRawCards(
  rawCards: Reading['cards'] | null | undefined
): RawReadingCard[] {
  if (!rawCards) {
    return [];
  }

  try {
    if (typeof rawCards === 'string') {
      const parsed = JSON.parse(rawCards);
      if (Array.isArray(parsed)) {
        return parsed as RawReadingCard[];
      }
      if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray(parsed.selectedCards)
      ) {
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
  rawCards: Reading['cards'] | null | undefined,
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
      if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray(parsed.positions)
      ) {
        return parsed.positions.map((position: any, index: number) => ({
          id: position?.id ?? index + 1,
          title: position?.title ?? `position ${index + 1}`,
          desc:
            position?.desc ?? position?.description ?? `position ${index + 1}`,
          description:
            position?.description ?? position?.desc ?? `position ${index + 1}`,
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

  // Placeholder kart kontrolü
  if (rawCard.id && String(rawCard.id).startsWith('placeholder-')) {
    return {
      card: { ...UNKNOWN_CARD, id: fallbackId },
      displayName: 'Kart Seçilmedi',
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
        const meaning = getMeaningByCardAndPosition(
          card.nameTr || card.name,
          position
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
      };
    case 'newLover':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getNewLoverMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
      };
    case 'career':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getCareerMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
      };
    case 'money':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getMoneyMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
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
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
      };
    case 'marriage':
      return (card: TarotCard, position: number, isReversed: boolean) => {
        const meaning = getMarriageMeaningByCardAndPosition(
          card,
          position,
          isReversed
        );
        if (!meaning) {
          return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
        }
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
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
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
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
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
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
        return {
          interpretation: isReversed ? meaning.reversed : meaning.upright,
          keywords: meaning.keywords || [],
          context: meaning.context || '',
        };
      };
    default:
      return null;
  }
}

export function useReadingCards(
  reading: Reading | null,
  config: TarotConfig | null,
  normalizedType: NormalizedTarotReadingType | null
): ReadingDetailCard[] {
  const deck = useTarotDeck();
  const { t } = useTranslations();

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

  const rawCards = useMemo(
    () => parseRawCards(reading?.cards),
    [reading?.cards]
  );
  const positions = useMemo(
    () => parsePositions(reading?.cards, config),
    [reading?.cards, config]
  );

  const meaningResolver = useMemo(
    () => buildMeaningResolver(normalizedType ?? null),
    [normalizedType]
  );

  const cards = useMemo<ReadingDetailCard[]>(() => {
    // Config'den cardCount al, eğer yoksa fallback kullan
    let cardCount = config?.cardCount;

    // Eğer config'den cardCount gelmiyorsa özel mantık kullan
    if (!cardCount) {
      switch (normalizedType) {
        case 'love':
          cardCount = 4;
          break;
        case 'money':
          cardCount = 4;
          break;
        case 'career':
          cardCount = 7;
          break;
        case 'problemSolving':
          cardCount = 10;
          break;
        case 'marriage':
          cardCount = 10;
          break;
        case 'relationshipProblems':
          cardCount = 9;
          break;
        case 'newLover':
          cardCount = 6;
          break;
        case 'situationAnalysis':
          cardCount = 7;
          break;
        default:
          cardCount = rawCards.length;
      }
    }

    if (!cardCount) {
      return [];
    }

    // rawCards array'ini cardCount'a göre sınırla
    const actualCardCount = Math.min(cardCount, rawCards.length);
    const limitedRawCards = rawCards.slice(0, actualCardCount);

    const result = limitedRawCards.map((rawCard, index) => {
      const resolved = resolveCard(
        rawCard,
        deckById,
        deckByName,
        index * -1 - 1
      );

      const positionInfo =
        positions[index] ??
        ({
          id: index + 1,
          title: t('readingModal.position', `position ${index + 1}`),
          desc: `position ${index + 1}`,
          description: `position ${index + 1}`,
        } as PositionInfo);

      const meaning = meaningResolver
        ? meaningResolver(resolved.card, positionInfo.id, resolved.isReversed)
        : undefined;

      // Keywords ve context bilgilerini al
      let keywords: string[] = [];
      let context: string | undefined;

      if (meaning && typeof meaning === 'object' && meaning !== null) {
        if ('keywords' in meaning && Array.isArray(meaning.keywords)) {
          keywords = meaning.keywords;
        }
        if ('context' in meaning && typeof meaning.context === 'string') {
          context = meaning.context;
        }
      }

      return {
        card: resolved.card,
        displayName: resolved.displayName,
        isReversed: resolved.isReversed,
        position: positionInfo,
        meaning:
          typeof meaning === 'string' ? meaning : meaning?.interpretation || '',
        keywords: keywords.length > 0 ? keywords : [],
        context: context || '',
      };
    });

    return result;
  }, [
    config?.cardCount,
    rawCards,
    deckById,
    deckByName,
    positions,
    t,
    meaningResolver,
    normalizedType,
  ]);

  return cards;
}
