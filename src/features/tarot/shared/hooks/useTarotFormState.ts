'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

export interface PersonalInfo {
  name: string;
  surname: string;
  birthDate: string;
  email: string;
  phone: string;
  countryCode: string;
}

export interface Questions {
  concern: string;
  understanding: string;
  emotional: string;
}

export interface FormErrors {
  name: string;
  surname: string;
  birthDate: string;
  email: string;
  phone: string;
  countryCode: string;
  concern: string;
  understanding: string;
  emotional: string;
  general: string;
}

export interface ModalStates {
  isSaving: boolean;
  showCreditConfirm: boolean;
  detailedFormSaved: boolean;
  showInfoModal: boolean;
  isSavingReading: boolean;
  showSuccessModal: boolean;
}

export interface ValidationKeys {
  nameMinLength: string;
  surnameMinLength: string;
  birthDateRequired: string;
  emailInvalid: string;
  questionMinLength: string;
}

export interface UseTarotFormStateProps {
  validationKeys: ValidationKeys;
}

export interface UseTarotFormStateReturn {
  // State
  personalInfo: PersonalInfo;
  communicationMethod: 'email' | 'whatsapp';
  questions: Questions;
  formErrors: FormErrors;
  modalStates: ModalStates;

  // Actions
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  updateCommunicationMethod: (method: 'email' | 'whatsapp') => void;
  updateQuestion: (field: keyof Questions, value: string) => void;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  setQuestions: React.Dispatch<React.SetStateAction<Questions>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  setModalStates: React.Dispatch<React.SetStateAction<ModalStates>>;

  // Validation
  validateDetailedForm: () => boolean;

  // Modal helpers
  closeInfoModal: () => void;
  closeCreditConfirm: () => void;
  closeSuccessModal: () => void;
  setSaving: (isSaving: boolean) => void;
  setSavingReading: (isSavingReading: boolean) => void;
  setDetailedFormSaved: (saved: boolean) => void;
}

export function useTarotFormState({
  validationKeys,
}: UseTarotFormStateProps): UseTarotFormStateReturn {
  const { t } = useTranslations();

  // Form state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    phone: '',
    countryCode: '',
  });

  const [communicationMethod, setCommunicationMethod] = useState<
    'email' | 'whatsapp'
  >('email');

  const [questions, setQuestions] = useState<Questions>({
    concern: '',
    understanding: '',
    emotional: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    phone: '',
    countryCode: '',
    concern: '',
    understanding: '',
    emotional: '',
    general: '',
  });

  const [modalStates, setModalStates] = useState<ModalStates>({
    isSaving: false,
    showCreditConfirm: false,
    detailedFormSaved: false,
    showInfoModal: false,
    isSavingReading: false,
    showSuccessModal: false,
  });

  // Form update functions
  const updatePersonalInfo = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      setPersonalInfo(prev => ({ ...prev, [field]: value }));
      setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
    },
    []
  );

  const updateQuestion = useCallback(
    (field: keyof Questions, value: string) => {
      setQuestions(prev => ({ ...prev, [field]: value }));
      setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
    },
    []
  );

  // Validation function
  const validateDetailedForm = useCallback(() => {
    const errors: { [key: string]: string } = {};
    let hasError = false;

    // Name validation
    if (!personalInfo.name.trim() || personalInfo.name.trim().length < 3) {
      errors.name = t(validationKeys.nameMinLength);
      hasError = true;
    }

    // Surname validation
    if (
      !personalInfo.surname.trim() ||
      personalInfo.surname.trim().length < 3
    ) {
      errors.surname = t(validationKeys.surnameMinLength);
      hasError = true;
    }

    // Birth date validation
    if (!personalInfo.birthDate) {
      errors.birthDate = t(validationKeys.birthDateRequired);
      hasError = true;
    }

    // Email validation (Email seçilirse gerekli)
    if (communicationMethod === 'email') {
      if (!personalInfo.email.trim()) {
        errors.email = 'E-posta adresi gerekli';
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        errors.email = t(validationKeys.emailInvalid);
        hasError = true;
      }
    }

    // Phone validation (WhatsApp seçildiyse gerekli)
    if (communicationMethod === 'whatsapp') {
      if (!personalInfo.phone.trim()) {
        errors.phone = t('validation.phoneRequired');
        hasError = true;
      } else if (
        !/^\+?[1-9]\d{1,14}$/.test(personalInfo.phone.replace(/\s/g, ''))
      ) {
        errors.phone = t('validation.phone');
        hasError = true;
      }
    }

    // Questions validation
    if (!questions.concern.trim() || questions.concern.trim().length < 10) {
      errors.concern = t(validationKeys.questionMinLength);
      hasError = true;
    }

    if (
      !questions.understanding.trim() ||
      questions.understanding.trim().length < 10
    ) {
      errors.understanding = t(validationKeys.questionMinLength);
      hasError = true;
    }

    if (!questions.emotional.trim() || questions.emotional.trim().length < 10) {
      errors.emotional = t(validationKeys.questionMinLength);
      hasError = true;
    }

    setFormErrors(prev => ({ ...prev, ...errors }));
    return !hasError;
  }, [personalInfo, questions, communicationMethod, validationKeys, t]);

  // Modal helper functions
  const closeInfoModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, showInfoModal: false }));
  }, []);

  const closeCreditConfirm = useCallback(() => {
    setModalStates(prev => ({ ...prev, showCreditConfirm: false }));
  }, []);

  const closeSuccessModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, showSuccessModal: false }));
  }, []);

  const setSaving = useCallback((isSaving: boolean) => {
    setModalStates(prev => ({ ...prev, isSaving }));
  }, []);

  const setSavingReading = useCallback((isSavingReading: boolean) => {
    setModalStates(prev => ({ ...prev, isSavingReading }));
  }, []);

  const setDetailedFormSaved = useCallback((saved: boolean) => {
    setModalStates(prev => ({ ...prev, detailedFormSaved: saved }));
  }, []);

  const updateCommunicationMethod = useCallback(
    (method: 'email' | 'whatsapp') => {
      setCommunicationMethod(method);
      // E-posta seçilirse telefon alanını, WhatsApp seçilirse e-posta alanını temizle
      if (method === 'email') {
        setPersonalInfo(prev => ({ ...prev, phone: '' }));
        setFormErrors(prev => ({ ...prev, phone: '' }));
      } else if (method === 'whatsapp') {
        setPersonalInfo(prev => ({ ...prev, email: '' }));
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    },
    []
  );

  return {
    // State
    personalInfo,
    communicationMethod,
    questions,
    formErrors,
    modalStates,

    // Actions
    updatePersonalInfo,
    updateCommunicationMethod,
    updateQuestion,
    setPersonalInfo,
    setQuestions,
    setFormErrors,
    setModalStates,

    // Validation
    validateDetailedForm,

    // Modal helpers
    closeInfoModal,
    closeCreditConfirm,
    closeSuccessModal,
    setSaving,
    setSavingReading,
    setDetailedFormSaved,
  };
}
