'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTarotDeck } from '@/features/tarot/lib/full-tarot-deck';
import type { TarotCard, PositionInfo, ReadingType } from '@/types/tarot';

// Akışın hangi adımda olduğunu belirten bir enum/sabit
export const ReadingStep = {
  SELECTING_TYPE: 'SELECTING_TYPE', // Okuma tipi seçiliyor (Başlangıç durumu)
  AWAITING_CONFIRMATION: 'AWAITING_CONFIRMATION', // Kredi onayı modalı açık
  AWAITING_USER_INFO: 'AWAITING_USER_INFO', // Kullanıcı bilgi formu gösteriliyor
  READY_FOR_CARDS: 'READY_FOR_CARDS', // Kart seçimine hazır
};

interface TarotReadingConfig {
  cardCount: number;
  positionsInfo: readonly PositionInfo[];
}

interface UseTarotReadingProps {
  config: TarotReadingConfig;
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
}

function shuffleCards(deck: TarotCard[]): TarotCard[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function useTarotReading({
  config,
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
}: UseTarotReadingProps) {
  const { cardCount, positionsInfo } = config;
  const fullTarotDeck = useTarotDeck();

  const [selectedCards, setSelectedCards] = useState<(TarotCard | null)[]>(
    Array(cardCount).fill(null)
  );
  const [usedCardIds, setUsedCardIds] = useState<Set<number>>(new Set());
  const [showCardDetails, setShowCardDetails] = useState<TarotCard | null>(
    null
  );
  const [cardStates, setCardStates] = useState<boolean[]>(
    Array(cardCount).fill(false)
  );
  const [isReversed, setIsReversed] = useState<boolean[]>(
    Array(cardCount).fill(false)
  );
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number>(1);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [selectedReadingType, setSelectedReadingType] = useState<string | null>(
    null
  );
  const interpretationRef = useRef<HTMLDivElement | null>(null);

  // Yeni state'ler
  const [currentStep, setCurrentStep] = useState<string>(
    ReadingStep.SELECTING_TYPE
  );
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [pendingReadingType, setPendingReadingType] = useState<
    ReadingType | string | null
  >(null);
  const [isProcessingCredit, setIsProcessingCredit] = useState(false);

  // fullTarotDeck değiştiğinde deck'i güncelle - sadece ilk yüklemede
  useEffect(() => {
    if (fullTarotDeck && fullTarotDeck.length > 0 && deck.length === 0) {
      setDeck(shuffleCards([...fullTarotDeck]));
    }
  }, [fullTarotDeck, deck.length]);

  const handleCardSelect = useCallback(
    (card: TarotCard) => {
      if (usedCardIds.has(card.id) || currentPosition > cardCount) {
        return;
      }
      const newSelected = [...selectedCards];
      newSelected[currentPosition - 1] = card;
      setSelectedCards(newSelected);
      setUsedCardIds(new Set([...usedCardIds, card.id]));

      const isReversedCard = Math.random() < 0.3;
      const newIsReversed = [...isReversed];
      newIsReversed[currentPosition - 1] = isReversedCard;
      setIsReversed(newIsReversed);

      setCurrentPosition(currentPosition + 1);
      if (
        _onPositionChange &&
        positionsInfo &&
        positionsInfo[currentPosition - 1]
      ) {
        _onPositionChange(positionsInfo[currentPosition - 1]?.title || '');
      }
    },
    [
      currentPosition,
      cardCount,
      usedCardIds,
      selectedCards,
      isReversed,
      _onPositionChange,
      positionsInfo,
    ]
  );

  const handleCardDetails = (card: TarotCard) => setShowCardDetails(card);

  const toggleCardState = (idx: number) => {
    const newStates = [...cardStates];
    newStates[idx - 1] = !newStates[idx - 1];
    setCardStates(newStates);
    const newReversed = [...isReversed];
    newReversed[idx - 1] = !newReversed[idx - 1];
    setIsReversed(newReversed);
  };

  const handleClearAll = () => {
    setSelectedCards(Array(cardCount).fill(null));
    setUsedCardIds(new Set());
    setCardStates(Array(cardCount).fill(false));
    setIsReversed(Array(cardCount).fill(false));
    setCurrentPosition(1);
    setUserQuestion('');
    setCurrentStep(ReadingStep.SELECTING_TYPE);
    setSelectedReadingType(null);
    setPendingReadingType(null);
  };

  const shuffleDeck = () => {
    if (fullTarotDeck && fullTarotDeck.length > 0) {
      const shuffled = shuffleCards([...fullTarotDeck]);
      setDeck(shuffled);
    }
  };

  // Yeni fonksiyonlar
  const handleCancelReading = () => {
    setConfirmationModalOpen(false);
    setCurrentStep(ReadingStep.SELECTING_TYPE);
    setPendingReadingType(null);
  };

  return {
    selectedCards,
    usedCardIds,
    showCardDetails,
    cardStates,
    isReversed,
    deck,
    currentPosition,
    handleCardSelect,
    handleCardDetails,
    setShowCardDetails,
    toggleCardState,
    handleClearAll,
    shuffleDeck,
    interpretationRef,
    userQuestion,
    setUserQuestion,
    selectedReadingType,
    setSelectedReadingType,
    // Yeni state ve fonksiyonları export et
    currentStep,
    setCurrentStep,
    isConfirmationModalOpen,
    setConfirmationModalOpen,
    pendingReadingType,
    setPendingReadingType,
    isProcessingCredit,
    setIsProcessingCredit,
    handleCancelReading,
  };
}
