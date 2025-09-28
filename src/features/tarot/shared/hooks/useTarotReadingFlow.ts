'use client';

import { useCallback } from 'react';
import { useTarotReading } from '@/hooks/useTarotReading';
import { useTarotFormState } from './useTarotFormState';
import { TarotConfig } from '../types/tarot-config.types';
import { TarotCard } from '@/types/tarot';
import { READING_TYPES } from '@/types/tarot';

export interface UseTarotReadingFlowProps {
  config: TarotConfig;
  onComplete?: (cards: TarotCard[], interpretation: string) => void;
  onPositionChange?: (title: string) => void;
}

export interface UseTarotReadingFlowReturn {
  // Tarot Reading State
  selectedCards: (TarotCard | null)[];
  usedCardIds: string[];
  showCardDetails: TarotCard | null;
  cardStates: boolean[];
  isReversed: boolean[];
  deck: TarotCard[];
  currentPosition: number;
  interpretationRef: React.RefObject<HTMLDivElement>;
  userQuestion: string;
  selectedReadingType: string | null;

  // Form State
  personalInfo: {
    name: string;
    surname: string;
    birthDate: string;
    email: string;
    phone: string;
  };
  communicationMethod: 'email' | 'whatsapp';
  questions: {
    concern: string;
    understanding: string;
    emotional: string;
  };
  formErrors: {
    name: string;
    surname: string;
    birthDate: string;
    email: string;
    phone: string;
    concern: string;
    understanding: string;
    emotional: string;
    general: string;
  };
  modalStates: {
    isSaving: boolean;
    showCreditConfirm: boolean;
    detailedFormSaved: boolean;
    showInfoModal: boolean;
    isSavingReading: boolean;
    showSuccessModal: boolean;
  };

  // Tarot Reading Actions
  handleCardSelect: (card: TarotCard) => void;
  handleCardDetails: (card: TarotCard) => void;
  setShowCardDetails: (card: TarotCard | null) => void;
  toggleCardState: (positionId: number) => void;
  handleClearAll: () => void;
  shuffleDeck: () => void;

  // Form Actions
  updatePersonalInfo: (
    field: 'name' | 'surname' | 'birthDate' | 'email' | 'phone',
    value: string
  ) => void;
  updateCommunicationMethod: (method: 'email' | 'whatsapp') => void;
  updateQuestion: (
    field: 'concern' | 'understanding' | 'emotional',
    value: string
  ) => void;
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      birthDate: string;
      email: string;
      phone: string;
    }>
  >;
  setQuestions: React.Dispatch<
    React.SetStateAction<{
      concern: string;
      understanding: string;
      emotional: string;
    }>
  >;
  setFormErrors: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      birthDate: string;
      email: string;
      phone: string;
      concern: string;
      understanding: string;
      emotional: string;
      general: string;
    }>
  >;
  setModalStates: React.Dispatch<
    React.SetStateAction<{
      isSaving: boolean;
      showCreditConfirm: boolean;
      detailedFormSaved: boolean;
      showInfoModal: boolean;
      isSavingReading: boolean;
      showSuccessModal: boolean;
    }>
  >;

  // Validation
  validateDetailedForm: () => boolean;

  // Modal helpers
  closeInfoModal: () => void;
  closeCreditConfirm: () => void;
  closeSuccessModal: () => void;
  setSaving: (isSaving: boolean) => void;
  setSavingReading: (isSavingReading: boolean) => void;
  setDetailedFormSaved: (saved: boolean) => void;

  // Reading Type Management
  setSelectedReadingType: (type: string | null) => void;
  handleReadingTypeSelect: (type: string) => Promise<void>;

  // Config
  config: TarotConfig;
}

export function useTarotReadingFlow({
  config,
  onComplete,
  onPositionChange,
}: UseTarotReadingFlowProps): UseTarotReadingFlowReturn {
  // Tarot Reading Hook
  const tarotReading = useTarotReading({
    config: {
      cardCount: config.cardCount,
      positionsInfo: config.positionsInfo,
    },
    onComplete: onComplete || (() => {}),
    onPositionChange: onPositionChange || (() => {}),
  });

  // Form State Hook
  const formState = useTarotFormState({
    validationKeys: config.validationKeys,
  });

  // Reading Type Selection Handler
  const handleReadingTypeSelect = useCallback(
    async (type: string) => {
      // Eğer DETAILED veya WRITTEN seçildiyse bilgilendirme modal'ını göster
      if (type === READING_TYPES.DETAILED || type === READING_TYPES.WRITTEN) {
        formState.setModalStates(prev => ({ ...prev, showInfoModal: true }));
      }

      // Reading type'ı set et
      tarotReading.setSelectedReadingType(type);
    },
    [formState, tarotReading]
  );

  return {
    // Tarot Reading State
    selectedCards: tarotReading.selectedCards,
    usedCardIds: Array.from(tarotReading.usedCardIds).map(String),
    showCardDetails: tarotReading.showCardDetails,
    cardStates: tarotReading.cardStates,
    isReversed: tarotReading.isReversed,
    deck: tarotReading.deck,
    currentPosition: tarotReading.currentPosition,
    interpretationRef: tarotReading.interpretationRef,
    userQuestion: tarotReading.userQuestion,
    selectedReadingType: tarotReading.selectedReadingType,

    // Form State
    personalInfo: formState.personalInfo,
    communicationMethod: formState.communicationMethod,
    questions: formState.questions,
    formErrors: formState.formErrors,
    modalStates: formState.modalStates,

    // Tarot Reading Actions
    handleCardSelect: tarotReading.handleCardSelect,
    handleCardDetails: tarotReading.handleCardDetails,
    setShowCardDetails: tarotReading.setShowCardDetails,
    toggleCardState: tarotReading.toggleCardState,
    handleClearAll: tarotReading.handleClearAll,
    shuffleDeck: tarotReading.shuffleDeck,

    // Form Actions
    updatePersonalInfo: formState.updatePersonalInfo,
    updateCommunicationMethod: formState.updateCommunicationMethod,
    updateQuestion: formState.updateQuestion,
    setPersonalInfo: formState.setPersonalInfo,
    setQuestions: formState.setQuestions,
    setFormErrors: formState.setFormErrors,
    setModalStates: formState.setModalStates,

    // Validation
    validateDetailedForm: formState.validateDetailedForm,

    // Modal helpers
    closeInfoModal: formState.closeInfoModal,
    closeCreditConfirm: formState.closeCreditConfirm,
    closeSuccessModal: formState.closeSuccessModal,
    setSaving: formState.setSaving,
    setSavingReading: formState.setSavingReading,
    setDetailedFormSaved: formState.setDetailedFormSaved,

    // Reading Type Management
    setSelectedReadingType: tarotReading.setSelectedReadingType,
    handleReadingTypeSelect,

    // Config
    config,
  };
}
