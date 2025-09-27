/*
 * Base Tarot Component - Ortak Tarot Logic'i
 * 
 * Bu component tüm tarot açılımları için ortak state yönetimi ve logic sağlar.
 * DRY principle uygulayarak tekrarlanan tarot kodlarını önler.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useToast } from '@/hooks/useToast';
import { useTranslations } from '@/hooks/useTranslations';
import { TarotCard, ReadingType } from '@/types/tarot';

export interface TarotFormData {
  question: string;
  personalInfo: {
    name: string;
    birthDate: string;
    relationshipStatus: string;
  };
}

export interface BaseTarotComponentProps {
  spreadId: string;
  cardCount: number;
  positionsInfo: any[];
  positionsLayout: any[];
  onReadingComplete?: (reading: any) => void;
}

export function useBaseTarotComponent({
  spreadId,
  cardCount,
  positionsInfo,
  positionsLayout,
  onReadingComplete
}: BaseTarotComponentProps) {
  // State management
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [currentStep, setCurrentStep] = useState<'question' | 'cards' | 'interpretation'>('question');
  const [readingType, setReadingType] = useState<ReadingType>('SIMPLE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [formData, setFormData] = useState<TarotFormData>({
    question: '',
    personalInfo: {
      name: '',
      birthDate: '',
      relationshipStatus: ''
    }
  });

  // Hooks
  const { user } = useAuth();
  const { credits, deductCredits } = useReadingCredits();
  const { showToast } = useToast();
  const { t } = useTranslations();
  const router = useRouter();

  // Card selection logic
  const handleCardSelect = useCallback((card: TarotCard) => {
    if (selectedCards.length >= cardCount) {
      showToast('error', t('tarot.maxCardsSelected', 'Maksimum kart sayısına ulaşıldı'));
      return;
    }

    setSelectedCards(prev => [...prev, card]);
  }, [selectedCards.length, cardCount, showToast, t]);

  const handleCardRemove = useCallback((cardId: number) => {
    setSelectedCards(prev => prev.filter(card => card.id !== cardId));
  }, []);

  // Form handling
  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const updateQuestion = useCallback((question: string) => {
    setFormData(prev => ({
      ...prev,
      question
    }));
  }, []);

  // Step navigation
  const goToNextStep = useCallback(() => {
    if (currentStep === 'question') {
      setCurrentStep('cards');
    } else if (currentStep === 'cards' && selectedCards.length === cardCount) {
      setCurrentStep('interpretation');
    }
  }, [currentStep, selectedCards.length, cardCount]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep === 'cards') {
      setCurrentStep('question');
    } else if (currentStep === 'interpretation') {
      setCurrentStep('cards');
    }
  }, [currentStep]);

  // Credit handling
  const handleCreditDeduction = useCallback(async () => {
    if (!user) {
      showToast('error', t('auth.loginRequired', 'Giriş yapmanız gerekiyor'));
      return false;
    }

    if (credits < 1) {
      showToast('error', t('credits.insufficient', 'Yetersiz kredi'));
      return false;
    }

    try {
      await deductCredits(1);
      showToast('success', t('credits.deducted', 'Kredi düşüldü'));
      return true;
    } catch (error) {
      showToast('error', t('credits.deductionFailed', 'Kredi düşürme başarısız'));
      return false;
    }
  }, [user, credits, deductCredits, showToast, t]);

  // Reading completion
  const handleReadingComplete = useCallback(async (reading: any) => {
    try {
      const { data, error } = await supabase
        .from('readings')
        .insert({
          user_id: user?.id,
          reading_type: spreadId,
          cards: JSON.stringify(selectedCards),
          interpretation: reading.interpretation,
          questions: JSON.stringify(formData),
          status: 'completed'
        });

      if (error) throw error;

      showToast('success', t('tarot.readingSaved', 'Okuma kaydedildi'));
      onReadingComplete?.(reading);
      
      // Reset form
      setSelectedCards([]);
      setCurrentStep('question');
      setFormData({
        question: '',
        personalInfo: {
          name: '',
          birthDate: '',
          relationshipStatus: ''
        }
      });
    } catch (error) {
      console.error('Reading save error:', error);
      showToast('error', t('tarot.readingSaveFailed', 'Okuma kaydetme başarısız'));
    }
  }, [user, spreadId, selectedCards, formData, onReadingComplete, showToast, t]);

  // Modal handling
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openCreditModal = useCallback(() => setIsCreditModalOpen(true), []);
  const closeCreditModal = useCallback(() => setIsCreditModalOpen(false), []);

  return {
    // State
    selectedCards,
    currentStep,
    readingType,
    isModalOpen,
    isCreditModalOpen,
    formData,
    
    // Actions
    handleCardSelect,
    handleCardRemove,
    updatePersonalInfo,
    updateQuestion,
    goToNextStep,
    goToPreviousStep,
    handleCreditDeduction,
    handleReadingComplete,
    openModal,
    closeModal,
    openCreditModal,
    closeCreditModal,
    
    // Setters
    setSelectedCards,
    setCurrentStep,
    setReadingType,
    setFormData,
    
    // Props
    spreadId,
    cardCount,
    positionsInfo,
    positionsLayout
  };
}
