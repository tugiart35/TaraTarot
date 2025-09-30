/**
 * Numeroloji ana sayfası - Basit ve temiz tasarım
 */

'use client';

import { useState, useEffect } from 'react';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import { calculateNumerology } from '@/lib/numerology/calculators';
import { NumerologyType, NumerologyResult } from '@/lib/numerology/types';
import {
  sanitizeNumerologyInput,
  validateDateInput,
  validateNameInput,
  sanitizeForDisplay,
  checkRateLimit,
} from '@/utils/security';
import { useTranslations } from '@/hooks/useTranslations';

interface NumerologyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function NumerologyPage({ params }: NumerologyPageProps) {
  const { t } = useTranslations();
  const [resolvedParams, setResolvedParams] = useState<{
    locale: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    | 'life-path'
    | 'expression-destiny'
    | 'soul-urge'
    | 'personality'
    | 'birthday-number'
    | 'maturity'
    | 'pinnacles-challenges'
    | 'personal-cycles'
    | 'compatibility'
  >('life-path');
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    date: new Date().toISOString().split('T')[0],
    targetDate: new Date().toISOString().split('T')[0],
    personA: { fullName: '', birthDate: '' },
    personB: { fullName: '', birthDate: '' },
  });
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParamsData = await params;
      setResolvedParams(resolvedParamsData);
    };
    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-300'>{t('numerology.page.loading')}</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    // Güvenlik: Input sanitization
    const sanitizedValue = sanitizeNumerologyInput(value);

    // Validation kontrolü
    if (field === 'birthDate' || field === 'targetDate') {
      if (sanitizedValue && !validateDateInput(sanitizedValue)) {
        setSecurityError(t('numerology.page.errors.invalidDateFormat'));
        return;
      }
    } else if (field === 'fullName') {
      if (sanitizedValue && !validateNameInput(sanitizedValue)) {
        setSecurityError(t('numerology.page.errors.invalidNameFormat'));
        return;
      }
    }

    setSecurityError(null);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handlePersonInputChange = (
    person: 'personA' | 'personB',
    field: 'fullName' | 'birthDate',
    value: string
  ) => {
    // Güvenlik: Input sanitization
    const sanitizedValue = sanitizeNumerologyInput(value);

    // Validation kontrolü
    if (field === 'birthDate') {
      if (sanitizedValue && !validateDateInput(sanitizedValue)) {
        setSecurityError(t('numerology.page.errors.invalidDateFormat'));
        return;
      }
    } else if (field === 'fullName') {
      if (sanitizedValue && !validateNameInput(sanitizedValue)) {
        setSecurityError(t('numerology.page.errors.invalidNameFormat'));
        return;
      }
    }

    setSecurityError(null);
    setFormData(prev => ({
      ...prev,
      [person]: { ...prev[person], [field]: sanitizedValue },
    }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setSecurityError(null);

    try {
      // Rate limiting kontrolü
      if (!checkRateLimit('numerology-form', 10, 60000)) {
        setError(t('numerology.page.errors.rateLimitExceeded'));
        setLoading(false);
        return;
      }
      // Gerekli alanları kontrol et
      const input: any = {};

      if (activeTab === 'life-path' && formData.birthDate) {
        input.birthDate = formData.birthDate;
      } else if (
        (activeTab === 'expression-destiny' ||
          activeTab === 'soul-urge' ||
          activeTab === 'personality') &&
        formData.fullName
      ) {
        // fullName'i firstName ve lastName'e böl
        const nameParts = formData.fullName.trim().split(' ');
        input.firstName = nameParts[0] || '';
        input.lastName = nameParts.slice(1).join(' ') || '';
      } else if (activeTab === 'birthday-number' && formData.birthDate) {
        input.birthDate = formData.birthDate;
      } else if (
        activeTab === 'maturity' &&
        formData.birthDate &&
        formData.fullName
      ) {
        input.birthDate = formData.birthDate;
        // fullName'i firstName ve lastName'e böl
        const nameParts = formData.fullName.trim().split(' ');
        input.firstName = nameParts[0] || '';
        input.lastName = nameParts.slice(1).join(' ') || '';
      } else if (activeTab === 'pinnacles-challenges' && formData.birthDate) {
        input.birthDate = formData.birthDate;
      } else if (
        activeTab === 'personal-cycles' &&
        formData.birthDate &&
        formData.targetDate
      ) {
        input.birthDate = formData.birthDate;
        input.targetDate = formData.targetDate;
      } else if (
        activeTab === 'compatibility' &&
        formData.personA.fullName &&
        formData.personA.birthDate &&
        formData.personB.fullName &&
        formData.personB.birthDate
      ) {
        // PersonA için fullName'i firstName ve lastName'e böl
        const personANameParts = formData.personA.fullName.trim().split(' ');
        const personBNameParts = formData.personB.fullName.trim().split(' ');

        input.personA = {
          firstName: personANameParts[0] || '',
          lastName: personANameParts.slice(1).join(' ') || '',
          birthDate: formData.personA.birthDate,
        };
        input.personB = {
          firstName: personBNameParts[0] || '',
          lastName: personBNameParts.slice(1).join(' ') || '',
          birthDate: formData.personB.birthDate,
        };
      } else {
        setError(t('numerology.page.errors.requiredFields'));
        setLoading(false);
        return;
      }

      // Hesaplama yap
      const calculatedResult = calculateNumerology(
        activeTab as NumerologyType,
        input,
        resolvedParams.locale
      );

      // Sonuçları güvenli hale getir
      const sanitizedResult = {
        ...calculatedResult,
        description: sanitizeForDisplay(calculatedResult.description),
        compatibilityNotes:
          calculatedResult.compatibilityNotes?.map(note =>
            sanitizeForDisplay(note)
          ) || [],
      };

      setResult(sanitizedResult);
      setShowModal(true);
    } catch (err) {
      setError(t('numerology.page.errors.calculationError'));
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'life-path' as const,
      label: t('numerology.page.tabs.lifePath'),
      icon: '🛤️',
    },
    {
      id: 'expression-destiny' as const,
      label: t('numerology.page.tabs.expressionDestiny'),
      icon: '💫',
    },
    {
      id: 'soul-urge' as const,
      label: t('numerology.page.tabs.soulUrge'),
      icon: '💖',
    },
    {
      id: 'personality' as const,
      label: t('numerology.page.tabs.personality'),
      icon: '👤',
    },
    {
      id: 'birthday-number' as const,
      label: t('numerology.page.tabs.birthdayNumber'),
      icon: '🎂',
    },
    {
      id: 'maturity' as const,
      label: t('numerology.page.tabs.maturity'),
      icon: '🌳',
    },
    {
      id: 'pinnacles-challenges' as const,
      label: t('numerology.page.tabs.pinnaclesChallenges'),
      icon: '⛰️',
    },
    {
      id: 'personal-cycles' as const,
      label: t('numerology.page.tabs.personalCycles'),
      icon: '🔄',
    },
    {
      id: 'compatibility' as const,
      label: t('numerology.page.tabs.compatibility'),
      icon: '💕',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      </div>

      <div className='container mx-auto px-4 py-8 relative z-10'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <h1 className='text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl'>
            {t('numerology.page.title')}
          </h1>
          <div className='flex justify-center space-x-3 mb-8'>
            <div className='w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce'></div>
            <div
              className='w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-bounce'
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className='w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce'
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8'>
            {t('numerology.page.subtitle')}
          </p>
        </div>

        {/* Form Section */}
        <div className='max-w-4xl mx-auto'>
          {/* Enhanced Tab Navigation */}
          <div className='mb-8'>
            {/* Desktop Tab Navigation */}
            <div className='hidden md:flex flex-wrap gap-3 justify-center'>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-lg'
                  }`}
                >
                  <span className='text-xl transition-transform duration-300 group-hover:scale-110'>
                    {tab.icon}
                  </span>
                  <span className='text-sm font-semibold'>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-50 -z-10'></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Tab Navigation - Horizontal Scroll */}
            <div className='md:hidden'>
              <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <span className='text-lg'>{tab.icon}</span>
                    <span className='text-sm whitespace-nowrap'>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-purple-500/10'>
            {/* Form Header */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                  <span className='text-2xl'>
                    {tabs.find(tab => tab.id === activeTab)?.icon}
                  </span>
                </div>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
              </div>
              <p className='text-gray-300 text-sm max-w-md mx-auto'>
                {activeTab === 'life-path' &&
                  t('numerology.page.descriptions.lifePath')}
                {activeTab === 'expression-destiny' &&
                  t('numerology.page.descriptions.expressionDestiny')}
                {activeTab === 'soul-urge' &&
                  t('numerology.page.descriptions.soulUrge')}
                {activeTab === 'personality' &&
                  t('numerology.page.descriptions.personality')}
                {activeTab === 'birthday-number' &&
                  t('numerology.page.descriptions.birthdayNumber')}
                {activeTab === 'maturity' &&
                  t('numerology.page.descriptions.maturity')}
                {activeTab === 'pinnacles-challenges' &&
                  t('numerology.page.descriptions.pinnaclesChallenges')}
                {activeTab === 'personal-cycles' &&
                  t('numerology.page.descriptions.personalCycles')}
                {activeTab === 'compatibility' &&
                  t('numerology.page.descriptions.compatibility')}
              </p>
            </div>

            <div className='space-y-6'>
              {/* Life Path - Birth Date */}
              {activeTab === 'life-path' && (
                <div className='group'>
                  <label className='flex text-sm font-semibold mb-3 text-gray-200 items-center gap-2'>
                    <span className='text-lg'>📅</span>
                    {t('numerology.page.form.birthDate')}
                  </label>
                  <div className='relative'>
                    <input
                      type='date'
                      value={formData.birthDate}
                      onChange={e =>
                        handleInputChange('birthDate', e.target.value)
                      }
                      className='w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:bg-white/25'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>
              )}

              {/* Expression, Soul Urge, Personality - Full Name */}
              {(activeTab === 'expression-destiny' ||
                activeTab === 'soul-urge' ||
                activeTab === 'personality') && (
                <div className='group'>
                  <label className='flex text-sm font-semibold mb-3 text-gray-200 items-center gap-2'>
                    <span className='text-lg'>👤</span>
                    {t('numerology.page.form.fullName')}
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={formData.fullName}
                      onChange={e =>
                        handleInputChange('fullName', e.target.value)
                      }
                      placeholder={t('numerology.page.form.namePlaceholder')}
                      className='w-full px-4 py-4 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:bg-white/25'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>
              )}

              {/* Birthday Number - Birth Date */}
              {activeTab === 'birthday-number' && (
                <div>
                  <label className='block text-sm font-semibold mb-3 text-gray-200'>
                    📅 {t('numerology.page.form.birthDate')}
                  </label>
                  <input
                    type='date'
                    value={formData.birthDate}
                    onChange={e =>
                      handleInputChange('birthDate', e.target.value)
                    }
                    className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                    required
                  />
                </div>
              )}

              {/* Maturity - Birth Date + Full Name */}
              {activeTab === 'maturity' && (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-3 text-gray-200'>
                      📅 {t('numerology.page.form.birthDate')}
                    </label>
                    <input
                      type='date'
                      value={formData.birthDate}
                      onChange={e =>
                        handleInputChange('birthDate', e.target.value)
                      }
                      className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-3 text-gray-200'>
                      👤 {t('numerology.page.form.fullName')}
                    </label>
                    <input
                      type='text'
                      value={formData.fullName}
                      onChange={e =>
                        handleInputChange('fullName', e.target.value)
                      }
                      placeholder={t('numerology.page.form.namePlaceholder')}
                      className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400'
                      required
                    />
                  </div>
                </div>
              )}

              {/* Pinnacles & Challenges - Birth Date */}
              {activeTab === 'pinnacles-challenges' && (
                <div>
                  <label className='block text-sm font-semibold mb-3 text-gray-200'>
                    📅 {t('numerology.page.form.birthDate')}
                  </label>
                  <input
                    type='date'
                    value={formData.birthDate}
                    onChange={e =>
                      handleInputChange('birthDate', e.target.value)
                    }
                    className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                    required
                  />
                </div>
              )}

              {/* Personal Cycles - Birth Date + Target Date */}
              {activeTab === 'personal-cycles' && (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-3 text-gray-200'>
                      📅 {t('numerology.page.form.birthDate')}
                    </label>
                    <input
                      type='date'
                      value={formData.birthDate}
                      onChange={e =>
                        handleInputChange('birthDate', e.target.value)
                      }
                      className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-3 text-gray-200'>
                      🎯 {t('numerology.page.form.targetDate')}
                    </label>
                    <input
                      type='date'
                      value={formData.targetDate}
                      onChange={e =>
                        handleInputChange('targetDate', e.target.value)
                      }
                      className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                      required
                    />
                  </div>
                </div>
              )}

              {/* Compatibility - Two People */}
              {activeTab === 'compatibility' && (
                <div className='space-y-6'>
                  <div className='bg-white/5 rounded-xl p-4'>
                    <h4 className='text-lg font-semibold text-purple-400 mb-4'>
                      👤 {t('numerology.page.form.person1')}
                    </h4>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-200'>
                          {t('numerology.page.form.fullName')}
                        </label>
                        <input
                          type='text'
                          value={formData.personA.fullName}
                          onChange={e =>
                            handlePersonInputChange(
                              'personA',
                              'fullName',
                              e.target.value
                            )
                          }
                          placeholder={t(
                            'numerology.page.form.namePlaceholder'
                          )}
                          className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400'
                          required
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-200'>
                          {t('numerology.page.form.birthDate')}
                        </label>
                        <input
                          type='date'
                          value={formData.personA.birthDate}
                          onChange={e =>
                            handlePersonInputChange(
                              'personA',
                              'birthDate',
                              e.target.value
                            )
                          }
                          className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='bg-white/5 rounded-xl p-4'>
                    <h4 className='text-lg font-semibold text-pink-400 mb-4'>
                      👤 {t('numerology.page.form.person2')}
                    </h4>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-200'>
                          {t('numerology.page.form.fullName')}
                        </label>
                        <input
                          type='text'
                          value={formData.personB.fullName}
                          onChange={e =>
                            handlePersonInputChange(
                              'personB',
                              'fullName',
                              e.target.value
                            )
                          }
                          placeholder={t(
                            'numerology.page.form.namePlaceholder2'
                          )}
                          className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400'
                          required
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-semibold mb-2 text-gray-200'>
                          {t('numerology.page.form.birthDate')}
                        </label>
                        <input
                          type='date'
                          value={formData.personB.birthDate}
                          onChange={e =>
                            handlePersonInputChange(
                              'personB',
                              'birthDate',
                              e.target.value
                            )
                          }
                          className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Error Display */}
              {securityError && (
                <div className='mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl'>
                  <div className='flex items-center gap-2'>
                    <span className='text-red-400 text-lg'>⚠️</span>
                    <p className='text-red-300 text-sm font-medium'>
                      {securityError}
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Calculate Button */}
              <div className='pt-4'>
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className={`group relative w-full py-5 px-8 rounded-2xl font-bold text-white transition-all duration-500 transform shadow-2xl overflow-hidden ${
                    loading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 hover:scale-105 hover:shadow-purple-500/25'
                  }`}
                >
                  {!loading && (
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  )}
                  <div className='relative flex items-center justify-center gap-3'>
                    {loading ? (
                      <>
                        <div className='animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent'></div>
                        <span className='text-lg'>
                          {t('numerology.page.calculating')}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className='text-2xl group-hover:scale-110 transition-transform duration-300'>
                          🔮
                        </span>
                        <span className='text-lg'>
                          {t('numerology.page.calculate')}
                        </span>
                        <div className='absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Result Modal */}
      {showModal && result && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300'>
          <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/20 border border-white/10 animate-in zoom-in-95 duration-300'>
            <div className='p-8'>
              {/* Enhanced Modal Header */}
              <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                    <span className='text-2xl'>
                      {tabs.find(tab => tab.id === activeTab)?.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      {tabs.find(tab => tab.id === activeTab)?.label}{' '}
                      {t('numerology.page.results.title')}
                    </h3>
                    <p className='text-sm text-gray-400'>
                      {t('numerology.page.results.subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className='w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110'
                >
                  <span className='text-xl'>×</span>
                </button>
              </div>

              {/* Enhanced Result Content */}
              <div className='space-y-6'>
                {/* Enhanced Number Display */}
                <div className='text-center'>
                  <div className='relative inline-block'>
                    <div className='w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/30'>
                      <span className='text-4xl font-bold text-white'>
                        {result.number}
                      </span>
                    </div>
                    {result.isMasterNumber && (
                      <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                        <span className='text-yellow-900 text-xs font-bold'>
                          ★
                        </span>
                      </div>
                    )}
                  </div>
                  {result.isMasterNumber && (
                    <div className='inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 rounded-full'>
                      <span className='text-yellow-400 text-sm font-semibold'>
                        ✨ {t('numerology.page.results.masterNumber')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Enhanced Description */}
                <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-lg'>📖</span>
                    <h4 className='text-white font-semibold'>
                      {t('numerology.page.results.description')}
                    </h4>
                  </div>
                  <p className='text-gray-300 text-sm leading-relaxed whitespace-pre-line'>
                    {result.description}
                  </p>
                </div>
                {/* Special Results */}
                {result.pinnacles && (
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-white font-semibold mb-2'>
                      {t('numerology.page.results.pinnacles')}
                    </h4>
                    <div className='grid grid-cols-2 gap-2'>
                      {result.pinnacles.map((pinnacle, index) => (
                        <div key={index} className='text-center'>
                          <div className='text-lg font-bold text-purple-400'>
                            {pinnacle.number}
                          </div>
                          <div className='text-xs text-gray-400'>
                            {pinnacle.period}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.challenges && (
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-white font-semibold mb-2'>
                      {t('numerology.page.results.challenges')}
                    </h4>
                    <div className='grid grid-cols-2 gap-2'>
                      {result.challenges.map((challenge, index) => (
                        <div key={index} className='text-center'>
                          <div className='text-lg font-bold text-red-400'>
                            {challenge.number}
                          </div>
                          <div className='text-xs text-gray-400'>
                            {challenge.period}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.personalYear && (
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-white font-semibold mb-2'>
                      {t('numerology.page.results.personalCycles')}
                    </h4>
                    <div className='grid grid-cols-3 gap-2 text-center'>
                      <div>
                        <div className='text-lg font-bold text-blue-400'>
                          {result.personalYear}
                        </div>
                        <div className='text-xs text-gray-400'>
                          {t('numerology.page.results.year')}
                        </div>
                      </div>
                      <div>
                        <div className='text-lg font-bold text-green-400'>
                          {result.personalMonth}
                        </div>
                        <div className='text-xs text-gray-400'>
                          {t('numerology.page.results.month')}
                        </div>
                      </div>
                      <div>
                        <div className='text-lg font-bold text-yellow-400'>
                          {result.personalDay}
                        </div>
                        <div className='text-xs text-gray-400'>
                          {t('numerology.page.results.day')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {result.compatibilityScore && (
                  <div className='bg-gray-800 rounded-lg p-4'>
                    <h4 className='text-white font-semibold mb-2'>
                      {t('numerology.page.results.compatibility')}
                    </h4>
                    <div className='text-center mb-2'>
                      <div className='text-3xl font-bold text-pink-400'>
                        {result.compatibilityScore}/100
                      </div>
                      <div className='text-sm text-gray-400'>
                        {t('numerology.page.results.compatibilityScore')}
                      </div>
                    </div>
                    {result.compatibilityNotes && (
                      <div className='text-sm text-gray-300'>
                        {result.compatibilityNotes.map((note, index) => (
                          <div key={index}>• {note}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Close Button */}
              <div className='mt-8'>
                <button
                  onClick={() => setShowModal(false)}
                  className='group w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                >
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-lg group-hover:scale-110 transition-transform duration-300'>
                      ✨
                    </span>
                    <span>{t('numerology.page.close')}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Error Modal */}
      {error && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300'>
          <div className='bg-gradient-to-br from-red-900/90 via-gray-900 to-red-900/90 rounded-3xl max-w-md w-full p-8 shadow-2xl shadow-red-500/20 border border-red-500/20 animate-in zoom-in-95 duration-300'>
            <div className='text-center'>
              <div className='relative inline-block mb-6'>
                <div className='w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/30'>
                  <span className='text-3xl'>⚠️</span>
                </div>
                <div className='absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-pulse'></div>
              </div>
              <h3 className='text-2xl font-bold text-white mb-3'>
                {t('numerology.page.errors.calculationError')}
              </h3>
              <p className='text-gray-300 mb-6 leading-relaxed'>{error}</p>
              <button
                onClick={() => setError(null)}
                className='group w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25'
              >
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-lg group-hover:scale-110 transition-transform duration-300'>
                    ✓
                  </span>
                  <span>{t('numerology.page.ok')}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
