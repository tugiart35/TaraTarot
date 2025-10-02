// Bu dosya, yasal gerekliliklere uygun Geri Ödeme Politikası sayfasını oluşturur.
// Dijital hizmetlerde geri ödeme koşulları ve müşteri haklarını açıklar.
// Mistik tarot temasına uygun, i18n destekli, modern ve profesyonel bir arayüz sunar.

'use client';

import React from 'react';
import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import { useTranslations } from '@/hooks/useTranslations';

export default function RefundPolicy() {
  const { t } = useTranslations();

  return (
    <div className='min-h-screen bg-cosmic-black'>
      {/* Mystical Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-800/20'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

      <main className='relative z-10 max-w-4xl mx-auto px-4 py-12'>
        {/* Header Section with Mystical Design */}
        <section className='mb-12 text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30'>
            <FaMoneyBillWave className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            {t('footer.legalPages.refundPolicy.title')}
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            {t('footer.legalPages.refundPolicy.subtitle')}
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaMoneyBillWave className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.refundPolicy.policyTitle')}
              </h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t('footer.legalPages.refundPolicy.content')}
            </p>
            <div className='mt-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
              <p className='text-cosmic-200'>
                {t('footer.legalPages.refundPolicy.contact').replace(
                  '{email}',
                  'info@busbuskimki.com'
                )}
              </p>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaExclamationTriangle className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.refundPolicy.exceptions')}
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4 rounded-lg border border-red-500/20'>
                <h3 className='text-lg font-semibold text-red-300 mb-2 flex items-center'>
                  <FaTimesCircle className='w-4 h-4 mr-2' />
                  {t('footer.legalPages.refundPolicy.noRefund')}
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  {t('footer.legalPages.refundPolicy.exception1')}
                </p>
              </div>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <h3 className='text-lg font-semibold text-green-300 mb-2 flex items-center'>
                  <FaCheckCircle className='w-4 h-4 mr-2' />
                  {t('footer.legalPages.refundPolicy.refundPossible')}
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  {t('footer.legalPages.refundPolicy.exception2')}
                </p>
              </div>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaClock className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.refundPolicy.processingTimes')}
              </h2>
            </div>
            <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20'>
              <p className='text-cosmic-200'>
                {t('footer.legalPages.refundPolicy.processingContent')}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
