'use client';

import React, { useCallback, useMemo, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { useCountryDetection } from '@/hooks/useCountryDetection';
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
    countryCode?: string;
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
    field: 'name' | 'surname' | 'birthDate' | 'email' | 'phone' | 'countryCode',
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
  const { countryInfo, isLoading: countryLoading } = useCountryDetection();

  // Otomatik ülke kodu ayarla
  useEffect(() => {
    if (countryInfo && !personalInfo.countryCode) {
      onUpdatePersonalInfo('countryCode', countryInfo.phoneCode);
    }
  }, [countryInfo, personalInfo.countryCode, onUpdatePersonalInfo]);

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


            {/* İletişim Tercihi - Minimal Tasarım */}
            <div className='space-y-4'>
              <label className={`block text-sm font-medium ${themeClasses.labelText} mb-3`}>
                {translate(formKeys.communicationMethod)} *
              </label>
              
              <div className='grid grid-cols-1 gap-3'>
                {/* E-posta Seçeneği */}
                <button
                  type='button'
                  onClick={() => onUpdateCommunicationMethod('email')}
                  className={`relative p-4 rounded-lg border transition-all duration-200 text-left ${
                    communicationMethod === 'email'
                      ? 'border-blue-500 bg-blue-500/5'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      communicationMethod === 'email' ? 'bg-blue-500' : 'bg-gray-600'
                    }`}>
                      <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <div className={`text-sm font-medium ${
                        communicationMethod === 'email' ? 'text-blue-400' : 'text-gray-200'
                      }`}>
                        {translate(formKeys.emailCommunication)}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      communicationMethod === 'email'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}>
                      {communicationMethod === 'email' && (
                        <div className='w-full h-full rounded-full bg-white scale-50'></div>
                      )}
                    </div>
                  </div>
                </button>

                {/* WhatsApp Seçeneği */}
                <button
                  type='button'
                  onClick={() => onUpdateCommunicationMethod('whatsapp')}
                  className={`relative p-4 rounded-lg border transition-all duration-200 text-left ${
                    communicationMethod === 'whatsapp'
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      communicationMethod === 'whatsapp' ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488'/>
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <div className={`text-sm font-medium ${
                        communicationMethod === 'whatsapp' ? 'text-green-400' : 'text-gray-200'
                      }`}>
                        {translate(formKeys.whatsappCommunication)}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      communicationMethod === 'whatsapp'
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-500'
                    }`}>
                      {communicationMethod === 'whatsapp' && (
                        <div className='w-full h-full rounded-full bg-white scale-50'></div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* E-posta Alanı - Minimal Tasarım */}
            {communicationMethod === 'email' && (
              <div className='space-y-3 animate-in slide-in-from-top-2 duration-300'>
                <label className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>
                  {translate(formKeys.email)} *
                </label>
                
                <div className='relative'>
                  <input
                    type='email'
                    value={personalInfo.email}
                    onChange={event =>
                      onUpdatePersonalInfo('email', event.target.value)
                    }
                    placeholder={getPlaceholder(placeholders.email)}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-blue-500'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all duration-200`}
                  />
                </div>
                
                {formErrors.email && (
                  <div className='flex items-center gap-2 text-red-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    <span>{formErrors.email}</span>
                  </div>
                )}
              </div>
            )}

            {/* Telefon Alanı - Minimal Tasarım */}
            {communicationMethod === 'whatsapp' && (
              <div className='space-y-3 animate-in slide-in-from-top-2 duration-300'>
                <label className={`block text-sm font-medium ${themeClasses.labelText} mb-2`}>
                  {translate(formKeys.phone)} *
                </label>
                
                <div className='flex gap-2'>
                  <div className='flex-shrink-0'>
                    <select
                      value={personalInfo.countryCode || countryInfo?.phoneCode || '+90'}
                      onChange={event =>
                        onUpdatePersonalInfo('countryCode', event.target.value)
                      }
                      className={`px-3 py-3 bg-gray-800/50 border border-gray-600 focus:border-green-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all duration-200 text-sm ${
                        countryLoading ? 'opacity-50' : ''
                      }`}
                      disabled={countryLoading}
                    >
                      {countryInfo && (
                        <option value={countryInfo.phoneCode} className="bg-green-600">
                          🎯 {countryInfo.phoneCode} ({countryInfo.country})
                        </option>
                      )}
                      <option value="+90">🇹🇷 +90</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+43">🇦🇹 +43</option>
                      <option value="+46">🇸🇪 +46</option>
                      <option value="+47">🇳🇴 +47</option>
                      <option value="+45">🇩🇰 +45</option>
                      <option value="+358">🇫🇮 +358</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+968">🇴🇲 +968</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+212">🇲🇦 +212</option>
                      <option value="+216">🇹🇳 +216</option>
                      <option value="+213">🇩🇿 +213</option>
                      <option value="+218">🇱🇾 +218</option>
                      <option value="+249">🇸🇩 +249</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+220">🇬🇲 +220</option>
                      <option value="+221">🇸🇳 +221</option>
                      <option value="+223">🇲🇱 +223</option>
                      <option value="+226">🇧🇫 +226</option>
                      <option value="+227">🇳🇪 +227</option>
                      <option value="+228">🇹🇬 +228</option>
                      <option value="+229">🇧🇯 +229</option>
                      <option value="+230">🇲🇺 +230</option>
                      <option value="+231">🇱🇷 +231</option>
                      <option value="+232">🇸🇱 +232</option>
                      <option value="+235">🇹🇩 +235</option>
                      <option value="+236">🇨🇫 +236</option>
                      <option value="+237">🇨🇲 +237</option>
                      <option value="+238">🇨🇻 +238</option>
                      <option value="+239">🇸🇹 +239</option>
                      <option value="+240">🇬🇶 +240</option>
                      <option value="+241">🇬🇦 +241</option>
                      <option value="+242">🇨🇬 +242</option>
                      <option value="+243">🇨🇩 +243</option>
                      <option value="+244">🇦🇴 +244</option>
                      <option value="+245">🇬🇼 +245</option>
                      <option value="+246">🇮🇴 +246</option>
                      <option value="+247">🇦🇨 +247</option>
                      <option value="+248">🇸🇨 +248</option>
                      <option value="+250">🇷🇼 +250</option>
                      <option value="+251">🇪🇹 +251</option>
                      <option value="+252">🇸🇴 +252</option>
                      <option value="+253">🇩🇯 +253</option>
                      <option value="+255">🇹🇿 +255</option>
                      <option value="+256">🇺🇬 +256</option>
                      <option value="+257">🇧🇮 +257</option>
                      <option value="+258">🇲🇿 +258</option>
                      <option value="+260">🇿🇲 +260</option>
                      <option value="+261">🇲🇬 +261</option>
                      <option value="+262">🇷🇪 +262</option>
                      <option value="+263">🇿🇼 +263</option>
                      <option value="+264">🇳🇦 +264</option>
                      <option value="+265">🇲🇼 +265</option>
                      <option value="+266">🇱🇸 +266</option>
                      <option value="+267">🇧🇼 +267</option>
                      <option value="+268">🇸🇿 +268</option>
                      <option value="+269">🇰🇲 +269</option>
                      <option value="+290">🇸🇭 +290</option>
                      <option value="+291">🇪🇷 +291</option>
                      <option value="+297">🇦🇼 +297</option>
                      <option value="+298">🇫🇴 +298</option>
                      <option value="+299">🇬🇱 +299</option>
                    </select>
                  </div>
                  <div className='flex-1'>
                    <input
                      type='tel'
                      value={personalInfo.phone}
                      onChange={event =>
                        onUpdatePersonalInfo('phone', event.target.value)
                      }
                      placeholder={getPlaceholder(placeholders.phone)}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${
                        formErrors.phone 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-green-500'
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all duration-200`}
                    />
                  </div>
                </div>
                
                {formErrors.phone && (
                  <div className='flex items-center gap-2 text-red-400 text-sm'>
                    <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                    </svg>
                    <span>{formErrors.phone}</span>
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
