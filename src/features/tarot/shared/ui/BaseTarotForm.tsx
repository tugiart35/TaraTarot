'use client';

import React, { useCallback, useMemo } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { TarotConfig } from '../types/tarot-config.types';
import { getThemeClasses } from './theme-utils';

export interface BaseTarotFormProps {
  config: TarotConfig;
  isOpen: boolean;
  onClose: () => void;
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
  isSaving: boolean;
  onUpdatePersonalInfo: (
    field: 'name' | 'surname' | 'birthDate' | 'email' | 'phone',
    value: string
  ) => void;
  onUpdateCommunicationMethod: (method: 'email' | 'whatsapp') => void;
  onUpdateQuestion: (
    field: 'concern' | 'understanding' | 'emotional',
    value: string
  ) => void;
  onSaveForm: () => void;
  className?: string;
}

export default function BaseTarotForm({
  config,
  isOpen,
  onClose,
  personalInfo,
  communicationMethod,
  questions,
  formErrors,
  isSaving,
  onUpdatePersonalInfo,
  onUpdateCommunicationMethod,
  onUpdateQuestion,
  onSaveForm,
  className = '',
}: BaseTarotFormProps) {
  const { t } = useTranslations();
  const themeClasses = getThemeClasses(config.theme);
  const formKeys = config.i18nKeys.form;

  const placeholders = useMemo(
    () => formKeys.placeholders ?? {},
    [formKeys.placeholders]
  );

  const translate = useCallback(
    (key: string, fallback?: string) => {
      const result = t(key);
      if (result === key && typeof fallback === 'string') {
        return fallback;
      }
      return result;
    },
    [t]
  );

  const getPlaceholder = useCallback(
    (key?: string) => {
      if (!key) {
        return '';
      }
      const result = t(key);
      return result === key ? '' : result;
    },
    [t]
  );

  const handleClose = useCallback(() => {
    const hasUserInput =
      personalInfo.name ||
      personalInfo.surname ||
      personalInfo.email ||
      personalInfo.phone ||
      questions.concern ||
      questions.understanding ||
      questions.emotional;

    if (!hasUserInput) {
      onClose();
      return;
    }

    const confirmationMessage = translate(
      `${config.translationNamespace}.messages.formUnsavedWarning`,
      'Form dolduruldu ancak kaydedilmedi. Çıkmak istediğinize emin misiniz?'
    );

    if (window.confirm(confirmationMessage)) {
      onClose();
    }
  }, [config.translationNamespace, onClose, personalInfo, questions, translate]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
      onClick={event => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`bg-slate-900/95 border ${themeClasses.border} rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col ${className}`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${themeClasses.headerBorder} flex-shrink-0`}
        >
          <div className='flex items-center'>
            <div
              className={`w-12 h-12 flex items-center justify-center ${themeClasses.iconBg} rounded-full mr-3 shadow-lg`}
            >
              <span className={`text-xl ${themeClasses.iconText}`}>
                {config.icon}
              </span>
            </div>
            <h2 className={`${themeClasses.titleText} text-lg font-semibold`}>
              {translate(formKeys.personalInfo)}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className={`text-gray-400 ${themeClasses.buttonHover} transition-colors p-2 rounded-lg hover:text-white`}
            title={translate('common.close', 'Kapat')}
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

        <div className='flex-1 overflow-y-auto px-6 py-4'>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
                >
                  {translate(formKeys.firstName)} *
                </label>
                <input
                  type='text'
                  value={personalInfo.name}
                  onChange={event =>
                    onUpdatePersonalInfo('name', event.target.value)
                  }
                  placeholder={getPlaceholder(placeholders.firstName)}
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.name
                      ? 'border-red-500'
                      : themeClasses.inputBorder
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none ${themeClasses.focusRing} transition-all`}
                />
                {formErrors.name && (
                  <p className='text-red-400 text-xs mt-1'>{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
                >
                  {translate(formKeys.lastName)} *
                </label>
                <input
                  type='text'
                  value={personalInfo.surname}
                  onChange={event =>
                    onUpdatePersonalInfo('surname', event.target.value)
                  }
                  placeholder={getPlaceholder(placeholders.lastName)}
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.surname
                      ? 'border-red-500'
                      : themeClasses.inputBorder
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none ${themeClasses.focusRing} transition-all`}
                />
                {formErrors.surname && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.surname}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
              >
                {translate(formKeys.birthDate)} *
              </label>
              <input
                type='date'
                value={personalInfo.birthDate}
                onChange={event =>
                  onUpdatePersonalInfo('birthDate', event.target.value)
                }
                className={`w-full px-4 py-3 bg-slate-800/80 border ${
                  formErrors.birthDate
                    ? 'border-red-500'
                    : themeClasses.inputBorder
                } rounded-lg text-white focus:outline-none ${themeClasses.focusRing} transition-all`}
              />
              {formErrors.birthDate && (
                <p className='text-red-400 text-xs mt-1'>
                  {formErrors.birthDate}
                </p>
              )}
            </div>


            {/* İletişim Tercihi - Modern Tasarım */}
            <div className='space-y-3'>
              <label
                className={`block text-sm font-medium ${themeClasses.labelText} mb-4`}
              >
                {translate(formKeys.communicationMethod)} *
              </label>
              
              {/* E-posta Seçeneği */}
              <div 
                onClick={() => onUpdateCommunicationMethod('email')}
                className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                  communicationMethod === 'email'
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                    : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-700/30'
                }`}
              >
                <div className='flex items-center p-4'>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all ${
                    communicationMethod === 'email'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-600 text-gray-300'
                  }`}>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <h3 className={`font-semibold ${
                      communicationMethod === 'email' ? 'text-blue-400' : 'text-gray-200'
                    }`}>
                      {translate(formKeys.emailCommunication)}
                    </h3>
                    <p className={`text-sm ${
                      communicationMethod === 'email' ? 'text-blue-300' : 'text-gray-400'
                    }`}>
                      Sonuçları e-posta adresinize gönderelim
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    communicationMethod === 'email'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {communicationMethod === 'email' && (
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    )}
                  </div>
                </div>
              </div>

              {/* WhatsApp Seçeneği */}
              <div 
                onClick={() => onUpdateCommunicationMethod('whatsapp')}
                className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                  communicationMethod === 'whatsapp'
                    ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                    : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-700/30'
                }`}
              >
                <div className='flex items-center p-4'>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all ${
                    communicationMethod === 'whatsapp'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-600 text-gray-300'
                  }`}>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488'/>
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <h3 className={`font-semibold ${
                      communicationMethod === 'whatsapp' ? 'text-green-400' : 'text-gray-200'
                    }`}>
                      {translate(formKeys.whatsappCommunication)}
                    </h3>
                    <p className={`text-sm ${
                      communicationMethod === 'whatsapp' ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      Sonuçları WhatsApp ile paylaşalım
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    communicationMethod === 'whatsapp'
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400'
                  }`}>
                    {communicationMethod === 'whatsapp' && (
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* E-posta Alanı - Sadece Email seçilirse göster */}
            {communicationMethod === 'email' && (
              <div className='space-y-3 animate-in slide-in-from-top-2 duration-300'>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-3`}
                >
                  {translate(formKeys.email)} *
                </label>
                
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                  </div>
                  <input
                    type='email'
                    value={personalInfo.email}
                    onChange={event =>
                      onUpdatePersonalInfo('email', event.target.value)
                    }
                    placeholder={getPlaceholder(placeholders.email)}
                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 border-2 ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-blue-500/30 focus:border-blue-500'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg`}
                  />
                </div>
                
                {formErrors.email && (
                  <div className='flex items-center space-x-2 text-red-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    <span>{formErrors.email}</span>
                  </div>
                )}
                
                {!personalInfo.email && !formErrors.email && (
                  <div className='flex items-center space-x-2 text-blue-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                    </svg>
                    <span>E-posta adresi gerekli</span>
                  </div>
                )}
                
                {personalInfo.email && !formErrors.email && (
                  <div className='flex items-center space-x-2 text-blue-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    <span>E-posta adresi geçerli görünüyor</span>
                  </div>
                )}
              </div>
            )}

            {/* Telefon Alanı - Sadece WhatsApp seçilirse göster */}
            {communicationMethod === 'whatsapp' && (
              <div className='space-y-3 animate-in slide-in-from-top-2 duration-300'>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-3`}
                >
                  {translate(formKeys.phone)} *
                </label>
                
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-green-400' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/>
                    </svg>
                  </div>
                  <input
                    type='tel'
                    value={personalInfo.phone}
                    onChange={event =>
                      onUpdatePersonalInfo('phone', event.target.value)
                    }
                    placeholder={translate(formKeys.phonePlaceholder)}
                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 border-2 ${
                      formErrors.phone 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-green-500/30 focus:border-green-500'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-lg`}
                  />
                </div>
                
                {formErrors.phone && (
                  <div className='flex items-center space-x-2 text-red-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    <span>{formErrors.phone}</span>
                  </div>
                )}
                
                {!personalInfo.phone && !formErrors.phone && (
                  <div className='flex items-center space-x-2 text-green-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                    </svg>
                    <span>{translate(formKeys.phoneRequired)}</span>
                  </div>
                )}
                
                {personalInfo.phone && !formErrors.phone && (
                  <div className='flex items-center space-x-2 text-green-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    <span>Telefon numarası geçerli görünüyor</span>
                  </div>
                )}
              </div>
            )}

            <div
              className={`space-y-4 pt-4 border-t ${themeClasses.sectionBorder}`}
            >
              <h3
                className={`${themeClasses.titleText} text-base font-semibold`}
              >
                {translate(formKeys.questions)}
              </h3>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
                >
                  {translate(formKeys.concernQuestion)} *
                </label>
                <textarea
                  value={questions.concern}
                  onChange={event =>
                    onUpdateQuestion('concern', event.target.value)
                  }
                  placeholder={getPlaceholder(placeholders.concernQuestion)}
                  rows={3}
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.concern
                      ? 'border-red-500'
                      : themeClasses.inputBorder
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none ${themeClasses.focusRing} transition-all resize-none`}
                />
                {formErrors.concern && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.concern}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
                >
                  {translate(formKeys.understandingQuestion)}
                </label>
                <textarea
                  value={questions.understanding}
                  onChange={event =>
                    onUpdateQuestion('understanding', event.target.value)
                  }
                  placeholder={getPlaceholder(
                    placeholders.understandingQuestion
                  )}
                  rows={3}
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.understanding
                      ? 'border-red-500'
                      : themeClasses.inputBorder
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none ${themeClasses.focusRing} transition-all resize-none`}
                />
                {formErrors.understanding && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.understanding}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}
                >
                  {translate(formKeys.emotionalQuestion)}
                </label>
                <textarea
                  value={questions.emotional}
                  onChange={event =>
                    onUpdateQuestion('emotional', event.target.value)
                  }
                  placeholder={getPlaceholder(placeholders.emotionalQuestion)}
                  rows={3}
                  className={`w-full px-4 py-3 bg-slate-800/80 border ${
                    formErrors.emotional
                      ? 'border-red-500'
                      : themeClasses.inputBorder
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none ${themeClasses.focusRing} transition-all resize-none`}
                />
                {formErrors.emotional && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.emotional}
                  </p>
                )}
              </div>
            </div>

            {formErrors.general && (
              <div className='bg-red-900/20 border border-red-500/50 rounded-lg p-3'>
                <p className='text-red-400 text-sm'>{formErrors.general}</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`p-6 border-t ${themeClasses.sectionBorder} flex-shrink-0`}
        >
          <button
            onClick={onSaveForm}
            disabled={isSaving}
            className={`w-full ${themeClasses.buttonBg} ${themeClasses.buttonHover} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base`}
          >
            {isSaving ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                {translate(formKeys.saving, 'Kaydediliyor...')}
              </div>
            ) : (
              translate(formKeys.saveAndOpen)
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
