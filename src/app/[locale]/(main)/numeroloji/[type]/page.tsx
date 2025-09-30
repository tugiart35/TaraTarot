/**
 * Numeroloji sonuç sayfası
 * Hesaplanan numeroloji sonuçlarını ve açılımlarını gösterir
 */

'use client';

import { useState, useEffect } from 'react';
import { NumerologyType, NumerologyResult } from '@/lib/numerology/types';
import { calculateNumerology } from '@/lib/numerology/calculators';
import { getNumberMeaning } from '@/lib/numerology/meanings';
import { NumberMeaning } from '@/features/numerology/components/NumberMeaning';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import { useTranslations } from '@/hooks/useTranslations';

interface NumerologyResultPageProps {
  params: Promise<{
    locale: string;
    type: string;
  }>;
  searchParams: Promise<{
    fullName?: string;
    birthDate?: string;
    date?: string;
    targetDate?: string;
    personA_fullName?: string;
    personA_birthDate?: string;
    personB_fullName?: string;
    personB_birthDate?: string;
  }>;
}

export default function NumerologyResultPage({
  params,
  searchParams,
}: NumerologyResultPageProps) {
  const { t } = useTranslations();
  const [resolvedParams, setResolvedParams] = useState<{
    type: string;
    locale: string;
  } | null>(null);
  const [resolvedSearchParams, setResolvedSearchParams] = useState<any>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParamsData = await params;
      const resolvedSearchParamsData = await searchParams;
      setResolvedParams(resolvedParamsData);
      setResolvedSearchParams(resolvedSearchParamsData);
    };
    resolveParams();
  }, [params, searchParams]);

  if (!resolvedParams || !resolvedSearchParams) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-300'>{t('numerologyResult.loading')}</p>
        </div>
      </div>
    );
  }

  const { type, locale } = resolvedParams;
  const {
    fullName,
    birthDate,
    date,
    targetDate,
    personA_fullName,
    personA_birthDate,
    personB_fullName,
    personB_birthDate,
  } = resolvedSearchParams;
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateResult = () => {
      try {
        // Tip validasyonu
        const validTypes: NumerologyType[] = [
          'life-path',
          'expression-destiny',
          'soul-urge',
          'personality',
          'birthday-number',
          'maturity',
          'pinnacles-challenges',
          'personal-cycles',
          'compatibility',
        ];
        if (!validTypes.includes(type as NumerologyType)) {
          setError(t('numerologyResult.invalidType'));
          setLoading(false);
          return;
        }

        // Gerekli parametreleri kontrol et
        const requiredParams = {
          'life-path': ['birthDate'],
          'expression-destiny': ['fullName'],
          'soul-urge': ['fullName'],
          personality: ['fullName'],
          'birthday-number': ['birthDate'],
          maturity: ['birthDate', 'fullName'],
          'pinnacles-challenges': ['birthDate'],
          'personal-cycles': ['birthDate', 'targetDate'],
          compatibility: [
            'personA_fullName',
            'personA_birthDate',
            'personB_fullName',
            'personB_birthDate',
          ],
        };

        const missingParams = requiredParams[type as NumerologyType]?.filter(
          param => !searchParams[param as keyof typeof searchParams]
        );

        if (missingParams && missingParams.length > 0) {
          setError(t('numerologyResult.missingParams'));
          setLoading(false);
          return;
        }

        // Numeroloji hesaplaması yap
        const input: any = {
          fullName,
          birthDate,
          date,
          targetDate,
        };

        // Uyum analizi için özel parametreler
        if (type === 'compatibility') {
          input.personA = {
            fullName: personA_fullName,
            birthDate: personA_birthDate,
          };
          input.personB = {
            fullName: personB_fullName,
            birthDate: personB_birthDate,
          };
        }

        const calculatedResult = calculateNumerology(
          type as NumerologyType,
          input,
          locale
        );

        setResult(calculatedResult);
        setError(null);
      } catch (err) {
        setError(t('numerologyResult.calculationError'));
      } finally {
        setLoading(false);
      }
    };

    calculateResult();
  }, [
    type,
    fullName,
    birthDate,
    date,
    targetDate,
    personA_fullName,
    personA_birthDate,
    personB_fullName,
    personB_birthDate,
    resolvedSearchParams,
  ]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-300'>{t('numerologyResult.calculating')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-red-400 mb-4'>
            {t('numerologyResult.error')}
          </h1>
          <p className='text-gray-300 mb-8'>{error}</p>
          <a
            href={`/${locale}/numeroloji`}
            className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
          >
            {t('numerologyResult.backButton')}
          </a>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-red-400 mb-4'>
            {t('numerologyResult.resultNotFound')}
          </h1>
          <p className='text-gray-300 mb-8'>
            {t('numerologyResult.calculationError')}
          </p>
          <a
            href={`/${locale}/numeroloji`}
            className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
          >
            {t('numerologyResult.backButton')}
          </a>
        </div>
      </div>
    );
  }

  const numberMeaning = getNumberMeaning(result.number);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
      </div>

      <div className='container mx-auto px-4 py-8 relative z-10'>
        {/* Back Button */}
        <div className='mb-8'>
          <a
            href={`/${locale}/numeroloji`}
            className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300'
          >
            <span>←</span>
            <span>{t('numerologyResult.backButton')}</span>
          </a>
        </div>

        {/* Result Summary */}
        <div className='text-center mb-12'>
          <div className='relative inline-block mb-6'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse'></div>
            <div className='relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl'>
              <span className='text-4xl font-bold text-white'>
                {result.number}
              </span>
            </div>
          </div>

          <h1 className='text-4xl font-bold text-white mb-4'>
            {t(`numerologyResult.typeLabels.${result.type}`)}{' '}
            {t('numerologyResult.yourNumber')}
          </h1>

          {result.isMasterNumber && (
            <div className='mb-4'>
              <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'>
                ✨ {t('numerologyResult.masterNumber')}
              </span>
            </div>
          )}

          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            {result.description}
          </p>
        </div>

        {/* Number Meaning */}
        {numberMeaning && (
          <div className='mb-12'>
            <NumberMeaning meaning={numberMeaning} />
          </div>
        )}

        {/* Special Results for Pinnacles & Challenges */}
        {result.pinnacles && result.challenges && (
          <div className='max-w-4xl mx-auto mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Pinnacles */}
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
                <h3 className='text-2xl font-bold text-white mb-6 text-center'>
                  ⛰️ {t('numerologyResult.pinnacles')}
                </h3>
                <div className='space-y-4'>
                  {result.pinnacles.map((pinnacle, index) => (
                    <div
                      key={index}
                      className='p-4 bg-white/5 rounded-xl border border-white/10'
                    >
                      <div className='flex items-center gap-4 mb-2'>
                        <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-sm font-bold text-white'>
                          {pinnacle.number}
                        </div>
                        <span className='font-semibold text-green-400'>
                          {pinnacle.period}
                        </span>
                      </div>
                      <p className='text-gray-300 text-sm'>
                        {pinnacle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
                <h3 className='text-2xl font-bold text-white mb-6 text-center'>
                  ⚡ {t('numerologyResult.challenges')}
                </h3>
                <div className='space-y-4'>
                  {result.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className='p-4 bg-white/5 rounded-xl border border-white/10'
                    >
                      <div className='flex items-center gap-4 mb-2'>
                        <div className='w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white'>
                          {challenge.number}
                        </div>
                        <span className='font-semibold text-red-400'>
                          {challenge.period}
                        </span>
                      </div>
                      <p className='text-gray-300 text-sm'>
                        {challenge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Cycles */}
        {result.personalYear && result.personalMonth && result.personalDay && (
          <div className='max-w-2xl mx-auto mb-12'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
              <h3 className='text-2xl font-bold text-white mb-6 text-center'>
                🔄 {t('numerologyResult.personalCycles')}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-4 bg-white/5 rounded-xl'>
                  <div className='text-3xl font-bold text-blue-400 mb-2'>
                    {result.personalYear}
                  </div>
                  <div className='text-sm text-gray-300'>
                    {t('numerologyResult.personalYear')}
                  </div>
                </div>
                <div className='text-center p-4 bg-white/5 rounded-xl'>
                  <div className='text-3xl font-bold text-green-400 mb-2'>
                    {result.personalMonth}
                  </div>
                  <div className='text-sm text-gray-300'>
                    {t('numerologyResult.personalMonth')}
                  </div>
                </div>
                <div className='text-center p-4 bg-white/5 rounded-xl'>
                  <div className='text-3xl font-bold text-purple-400 mb-2'>
                    {result.personalDay}
                  </div>
                  <div className='text-sm text-gray-300'>
                    {t('numerologyResult.personalDay')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compatibility Results */}
        {result.compatibilityScore !== undefined &&
          result.compatibilityNotes && (
            <div className='max-w-2xl mx-auto mb-12'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
                <h3 className='text-2xl font-bold text-white mb-6 text-center'>
                  💕 {t('numerologyResult.compatibilityAnalysis')}
                </h3>
                <div className='text-center mb-6'>
                  <div className='text-4xl font-bold text-pink-400 mb-2'>
                    {result.compatibilityScore}/100
                  </div>
                  <div className='text-sm text-gray-300'>
                    {t('numerologyResult.compatibilityScore')}
                  </div>
                </div>
                <div className='space-y-3'>
                  <h4 className='font-semibold text-white'>
                    {t('numerologyResult.notes')}
                  </h4>
                  {result.compatibilityNotes.map((note, index) => (
                    <div
                      key={index}
                      className='p-3 bg-white/5 rounded-xl border border-white/10'
                    >
                      <p className='text-gray-300 text-sm'>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Calculation Breakdown */}
        <div className='max-w-2xl mx-auto mb-12'>
          <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
            <h3 className='text-2xl font-bold text-white mb-6 text-center'>
              📊 {t('numerologyResult.calculationDetails')}
            </h3>
          </div>
        </div>

        {/* Additional Actions */}
        <div className='text-center'>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href={`/${locale}/numeroloji`}
              className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105'
            >
              🔮 {t('numerologyResult.newCalculation')}
            </a>
            <button
              onClick={() => window.print()}
              className='px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300'
            >
              🖨️ {t('numerologyResult.print')}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
