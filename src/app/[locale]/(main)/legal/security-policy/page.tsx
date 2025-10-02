// Bu dosya, yasal gerekliliklere uygun Güvenlik Politikası sayfasını oluşturur.
// Platformun teknik ve idari güvenlik önlemlerini açıklar.
// Mistik tarot temasına uygun, i18n destekli, modern ve profesyonel bir arayüz sunar.

import React from 'react';
import { FaShieldAlt, FaLock, FaEye, FaDatabase, FaCheckCircle } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';

export default function SecurityPolicy() {
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
            <FaShieldAlt className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            {t('legalPages.securityPolicy.title')}
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            {t('legalPages.securityPolicy.subtitle')}
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaShieldAlt className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Güvenlik Taahhüdü</h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t('legalPages.securityPolicy.content')}
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaCheckCircle className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>{t('legalPages.securityPolicy.measures')}</h2>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20'>
                <div className='flex items-center space-x-3 mb-2'>
                  <FaLock className='w-5 h-5 text-blue-300' />
                  <h3 className='text-lg font-semibold text-blue-300'>{t('legalPages.securityPolicy.encryption')}</h3>
                </div>
              </div>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <div className='flex items-center space-x-3 mb-2'>
                  <FaEye className='w-5 h-5 text-green-300' />
                  <h3 className='text-lg font-semibold text-green-300'>{t('legalPages.securityPolicy.access')}</h3>
                </div>
              </div>
              <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
                <div className='flex items-center space-x-3 mb-2'>
                  <FaDatabase className='w-5 h-5 text-purple-300' />
                  <h3 className='text-lg font-semibold text-purple-300'>{t('legalPages.securityPolicy.monitoring')}</h3>
                </div>
              </div>
              <div className='bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg border border-orange-500/20'>
                <div className='flex items-center space-x-3 mb-2'>
                  <FaShieldAlt className='w-5 h-5 text-orange-300' />
                  <h3 className='text-lg font-semibold text-orange-300'>{t('legalPages.securityPolicy.backup')}</h3>
                </div>
              </div>
            </div>
            <div className='mt-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
              <div className='flex items-center space-x-3'>
                <FaCheckCircle className='w-5 h-5 text-purple-300' />
                <h3 className='text-lg font-semibold text-purple-300'>{t('legalPages.securityPolicy.compliance')}</h3>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}