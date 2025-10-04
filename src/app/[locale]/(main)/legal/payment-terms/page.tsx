// Bu dosya, yasal gerekliliklere uygun Ödeme Şartları sayfasını oluşturur.
// Dijital hizmetlerde ödeme yöntemleri, süreç ve kullanıcı yükümlülüklerini açıklar.
// Mistik tarot temasına uygun, i18n destekli, modern ve profesyonel bir arayüz sunar.

import React from 'react';
import { FaCreditCard, FaShieldAlt, FaLock } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';

export default function PaymentTerms() {
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
            <FaCreditCard className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            {t('legalPages.paymentTerms.title')}
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            {t('legalPages.paymentTerms.subtitle')}
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaCreditCard className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Ödeme Yöntemleri</h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t('legalPages.paymentTerms.content')}
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaShieldAlt className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>{t('legalPages.paymentTerms.methods')}</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20 text-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <FaCreditCard className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-blue-300 mb-2'>{t('legalPages.paymentTerms.creditCard')}</h3>
              </div>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20 text-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <FaCreditCard className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-green-300 mb-2'>{t('legalPages.paymentTerms.debitCard')}</h3>
              </div>
              <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20 text-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <FaShieldAlt className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-purple-300 mb-2'>{t('legalPages.paymentTerms.digitalWallet')}</h3>
              </div>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaLock className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>{t('legalPages.paymentTerms.security')}</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <h3 className='text-lg font-semibold text-green-300 mb-2'>{t('legalPages.paymentTerms.ssl')}</h3>
              </div>
              <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20'>
                <h3 className='text-lg font-semibold text-blue-300 mb-2'>{t('legalPages.paymentTerms.pci')}</h3>
              </div>
              <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
                <h3 className='text-lg font-semibold text-purple-300 mb-2'>{t('legalPages.paymentTerms.secure')}</h3>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}