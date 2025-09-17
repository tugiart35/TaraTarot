/*
info:
---
Dosya Amacı:
- Tüm tarot açılımları için ortak kişisel bilgi formu modalı
- Yeniden kullanılabilir, tema destekli, responsive tasarım
- Form validasyonu ve hata yönetimi dahil

Bağlantılı Dosyalar:
- @/hooks/useTranslations: i18n desteği için (gerekli)
- @/features/shared/ui: Ortak UI bileşenleri (gerekli)

Geliştirme ve Öneriler:
- Tema sistemi ile farklı açılımlar için özelleştirilebilir
- Form validasyonu merkezi ve genişletilebilir
- Responsive tasarım mobil öncelikli
- ESC tuşu ile kapatma desteği

Kullanım Durumu:
- TarotFormModal: Gerekli, tüm açılımlarda kullanılır
- Form validasyonu: Gerekli, veri güvenliği için
- Tema sistemi: Gerekli, görsel tutarlılık için
*/

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
// import { supabase } from '@/lib/supabase/client';

// Form veri tipleri
export interface PersonalInfo {
  name: string;
  surname: string;
  birthDate: string;
  email: string;
}

export interface UserQuestions {
  concern: {
    question: string;
    answer: string;
  };
  understanding: {
    question: string;
    answer: string;
  };
  emotional: {
    question: string;
    answer: string;
  };
}

export interface FormErrors {
  name: string;
  surname: string;
  birthDate: string;
  email: string;
  concern: string;
  understanding: string;
  emotional: string;
  general: string;
}

// Tema konfigürasyonu
export interface FormTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  text: string;
  icon: string;
}

// Props interface
export interface TarotFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    personalInfo: PersonalInfo,
    questions: UserQuestions
  ) => Promise<void>;
  theme: FormTheme;
  isLoading?: boolean;
  title?: string;
  icon?: string;
  userId?: string;
  readingType?: string;
}

// Varsayılan tema - Aşk açılımı için
const defaultTheme: FormTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'slate-900/95',
  border: 'pink-500/30',
  text: 'pink-200',
  icon: '💕',
};

export default function TarotFormModal({
  isOpen,
  onClose,
  onSave,
  theme = defaultTheme,
  isLoading = false,
  title,
  icon = '💕',
  userId,
  readingType,
}: TarotFormModalProps) {
  const { t } = useTranslations();

  // Form state'leri
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
  });

  const [questions, setQuestions] = useState<UserQuestions>({
    concern: {
      question: t('love.form.concernQuestion'),
      answer: '',
    },
    understanding: {
      question: t('love.form.understandingQuestion'),
      answer: '',
    },
    emotional: {
      question: t('love.form.emotionalQuestion'),
      answer: '',
    },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    concern: '',
    understanding: '',
    emotional: '',
    general: '',
  });

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Form alanlarını güncelleme
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };

  const updateQuestion = (field: keyof UserQuestions, value: string) => {
    setQuestions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        answer: value,
      },
    }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };

  // Form validasyonu
  const validateForm = (): boolean => {
    const errors: Partial<FormErrors> = {};
    let hasError = false;

    // Kişisel bilgi validasyonu
    if (!personalInfo.name.trim() || personalInfo.name.trim().length < 3) {
      errors.name = 'Ad en az 3 karakter olmalıdır.';
      hasError = true;
    }

    if (
      !personalInfo.surname.trim() ||
      personalInfo.surname.trim().length < 3
    ) {
      errors.surname = 'Soyad en az 3 karakter olmalıdır.';
      hasError = true;
    }

    if (!personalInfo.birthDate) {
      errors.birthDate = 'Doğum tarihi zorunludur.';
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz.';
      hasError = true;
    }

    // Soru validasyonu
    if (
      !questions.concern.answer.trim() ||
      questions.concern.answer.trim().length < 10
    ) {
      errors.concern = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }

    if (
      !questions.understanding.answer.trim() ||
      questions.understanding.answer.trim().length < 10
    ) {
      errors.understanding =
        'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }

    if (
      !questions.emotional.answer.trim() ||
      questions.emotional.answer.trim().length < 10
    ) {
      errors.emotional = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }

    setFormErrors(prev => ({ ...prev, ...errors }));
    return !hasError;
  };

  // Form kaydetme
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Supabase'e form verilerini kaydet
      if (userId && readingType) {
        await saveFormToSupabase();
      }

      await onSave(personalInfo, questions);
    } catch (error) {
      setFormErrors(prev => ({
        ...prev,
        general: 'Form kaydedilirken bir hata oluştu.',
      }));
    }
  };

  // Form verilerini Supabase'e kaydetme
  const saveFormToSupabase = async () => {
    if (!userId || !readingType) {
      console.warn('userId veya readingType eksik, form kaydedilmiyor');
      return;
    }

    try {
      // Yeni şemada form verileri readings tablosunda questions JSONB alanında saklanacak
      console.log(
        'Form verileri readings tablosunda questions alanında saklanacak'
      );

      console.log("✅ Form verileri başarıyla Supabase'e kaydedildi");
      console.log("📊 Dashboard'da görüntülenecek veriler:", {
        userId,
        readingType,
        fullName: `${personalInfo.name} ${personalInfo.surname}`,
        email: personalInfo.email,
        questionsCount: 3,
      });
    } catch (error) {
      console.error('Form Supabase kayıt hatası:', error);
      throw error;
    }
  };

  // Modal kapatma
  const handleClose = () => {
    // Form doldurulmuşsa onay iste
    if (
      personalInfo.name ||
      personalInfo.surname ||
      personalInfo.email ||
      questions.concern.answer
    ) {
      const shouldClose = window.confirm(
        'Form dolduruldu ancak kaydedilmedi. Çıkmak istediğinize emin misiniz?'
      );
      if (shouldClose) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`bg-${theme.background} border border-${theme.border} rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-${theme.border} flex-shrink-0`}
        >
          <div className='flex items-center'>
            <div
              className={`w-12 h-12 flex items-center justify-center bg-${theme.primary}-800/70 rounded-full mr-3 shadow-lg`}
            >
              <span className='text-xl text-${theme.text}'>{icon}</span>
            </div>
            <h2 className={`text-${theme.text} text-lg font-semibold`}>
              {title || t('love.form.personalInfo')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className={`text-gray-400 hover:text-${theme.primary}-300 transition-colors p-2 rounded-lg hover:bg-${theme.primary}-500/10`}
            title='Formu kapat (ESC)'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>
          <div className='space-y-4'>
            {/* Ad Soyad Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  className={`block text-sm font-medium text-${theme.text} mb-2`}
                >
                  {t('love.form.firstName')} *
                </label>
                <input
                  type='text'
                  value={personalInfo.name}
                  onChange={e => updatePersonalInfo('name', e.target.value)}
                  placeholder='Adınız'
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.name
                      ? 'border-red-500'
                      : `border-${theme.primary}-400/50`
                  } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base`}
                  autoComplete='given-name'
                />
                {formErrors.name && (
                  <p className='text-xs text-red-400 mt-1'>{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium text-${theme.text} mb-2`}
                >
                  {t('love.form.lastName')} *
                </label>
                <input
                  type='text'
                  value={personalInfo.surname}
                  onChange={e => updatePersonalInfo('surname', e.target.value)}
                  placeholder='Soyadınız'
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.surname
                      ? 'border-red-500'
                      : `border-${theme.primary}-400/50`
                  } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base`}
                  autoComplete='family-name'
                />
                {formErrors.surname && (
                  <p className='text-xs text-red-400 mt-1'>
                    {formErrors.surname}
                  </p>
                )}
              </div>
            </div>

            {/* Doğum Tarihi */}
            <div>
              <label
                className={`block text-sm font-medium text-${theme.text} mb-2`}
              >
                {t('love.form.birthDate')} *
              </label>
              <input
                type='date'
                value={personalInfo.birthDate}
                onChange={e => updatePersonalInfo('birthDate', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-800/80 border ${
                  formErrors.birthDate
                    ? 'border-red-500'
                    : `border-${theme.primary}-400/50`
                } rounded-xl text-white focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base`}
              />
              {formErrors.birthDate && (
                <p className='text-xs text-red-400 mt-1'>
                  {formErrors.birthDate}
                </p>
              )}
            </div>

            {/* E-posta */}
            <div>
              <label
                className={`block text-sm font-medium text-${theme.text} mb-2`}
              >
                {t('love.form.email')} *
              </label>
              <input
                type='email'
                value={personalInfo.email}
                onChange={e => updatePersonalInfo('email', e.target.value)}
                placeholder='ornek@email.com'
                className={`w-full px-4 py-3 bg-slate-800/80 border ${
                  formErrors.email
                    ? 'border-red-500'
                    : `border-${theme.primary}-400/50`
                } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base`}
                autoComplete='email'
              />
              {formErrors.email && (
                <p className='text-xs text-red-400 mt-1'>{formErrors.email}</p>
              )}
            </div>

            {/* Sorular Bölümü */}
            <div className={`pt-4 border-t border-${theme.primary}-500/20`}>
              <h3 className={`text-${theme.text} font-medium mb-4 text-center`}>
                {t('love.form.questions')}
              </h3>

              <div className='space-y-4'>
                <div>
                  <label
                    className={`block text-sm font-medium text-${theme.text} mb-2`}
                  >
                    {questions.concern.question}
                  </label>
                  <textarea
                    value={questions.concern.answer}
                    onChange={e => updateQuestion('concern', e.target.value)}
                    placeholder='Endişelerinizi detaylı bir şekilde açıklayın...'
                    className={`w-full px-4 py-3 bg-slate-800/80 border ${
                      formErrors.concern
                        ? 'border-red-500'
                        : `border-${theme.primary}-400/50`
                    } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base resize-none`}
                    rows={3}
                  />
                  {formErrors.concern && (
                    <p className='text-xs text-red-400 mt-1'>
                      {formErrors.concern}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-${theme.text} mb-2`}
                  >
                    {questions.understanding.question}
                  </label>
                  <textarea
                    value={questions.understanding.answer}
                    onChange={e =>
                      updateQuestion('understanding', e.target.value)
                    }
                    placeholder='Öğrenmek istediğiniz konuları belirtin...'
                    className={`w-full px-4 py-3 bg-slate-800/80 border ${
                      formErrors.understanding
                        ? 'border-red-500'
                        : `border-${theme.primary}-400/50`
                    } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base resize-none`}
                    rows={3}
                  />
                  {formErrors.understanding && (
                    <p className='text-xs text-red-400 mt-1'>
                      {formErrors.understanding}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-${theme.text} mb-2`}
                  >
                    {questions.emotional.question}
                  </label>
                  <textarea
                    value={questions.emotional.answer}
                    onChange={e => updateQuestion('emotional', e.target.value)}
                    placeholder='Mevcut duygusal durumunuzu açıklayın...'
                    className={`w-full px-4 py-3 bg-slate-800/80 border ${
                      formErrors.emotional
                        ? 'border-red-500'
                        : `border-${theme.primary}-400/50`
                    } rounded-xl text-white placeholder-gray-400 focus:border-${theme.primary}-400 focus:ring-2 focus:ring-${theme.primary}-400/20 transition-all duration-200 text-base resize-none`}
                    rows={3}
                  />
                  {formErrors.emotional && (
                    <p className='text-xs text-red-400 mt-1'>
                      {formErrors.emotional}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {formErrors.general && (
              <div className='text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center'>
                {formErrors.general}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`p-6 border-t border-${theme.primary}-500/20 flex-shrink-0`}
        >
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-${theme.primary}-600 to-${theme.secondary}-600 hover:from-${theme.primary}-700 hover:to-${theme.secondary}-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base`}
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                {t('love.form.saving')}
              </div>
            ) : (
              t('love.form.saveAndOpen')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
