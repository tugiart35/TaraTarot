// Bu dosya, Karadağ PDPL uyumlu Kullanım Şartları sayfasını oluşturur.
// Kullanıcıların siteyi nasıl kullanabileceği, hak ve yükümlülükleri hakkında bilgi verir.
// Mistik tarot temasına uygun, modern ve profesyonel bir arayüz sunar.

'use client';

import React from 'react';
import {
  FaFileContract,
  FaShieldAlt,
  FaUserCheck,
  FaGavel,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaEye,
} from 'react-icons/fa';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import { useTranslations } from '@/hooks/useTranslations';

export default function TermsOfUse() {
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
            <FaFileContract className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            {t('footer.legalPages.termsOfUse.title')}
          </h1>
          <div className='flex items-center justify-center space-x-4 text-sm text-cosmic-300 mb-2'>
            <div className='flex items-center space-x-2'>
              <FaGavel className='w-4 h-4 text-golden-400' />
              <span>
                {t('footer.legalPages.termsOfUse.montenegroCompliant')}
              </span>
            </div>
            <div className='w-1 h-1 bg-cosmic-400 rounded-full'></div>
            <div className='flex items-center space-x-2'>
              <FaCheckCircle className='w-4 h-4 text-green-400' />
              <span>{t('footer.legalPages.termsOfUse.lastUpdated')}</span>
            </div>
          </div>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            {t('footer.legalPages.termsOfUse.subtitle')}
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaFileContract className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.termsOfUse.sections.general.title')}
              </h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t('footer.legalPages.termsOfUse.sections.general.content')}
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaShieldAlt className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t(
                  'footer.legalPages.termsOfUse.sections.serviceDescription.title'
                )}
              </h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t(
                'footer.legalPages.termsOfUse.sections.serviceDescription.content'
              )}
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaUserCheck className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t(
                  'footer.legalPages.termsOfUse.sections.usageConditions.title'
                )}
              </h2>
            </div>
            <div className='space-y-4'>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <h3 className='text-lg font-semibold text-green-300 mb-2 flex items-center'>
                  <FaCheckCircle className='w-4 h-4 mr-2' />
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.usagePurpose.title'
                  )}
                </h3>
                <p className='text-cosmic-200'>
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.usagePurpose.content'
                  )}
                </p>
              </div>
              <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20'>
                <h3 className='text-lg font-semibold text-blue-300 mb-2 flex items-center'>
                  <FaShieldAlt className='w-4 h-4 mr-2' />
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.intellectualProperty.title'
                  )}
                </h3>
                <p className='text-cosmic-200'>
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.intellectualProperty.content'
                  )}
                </p>
              </div>
              <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
                <h3 className='text-lg font-semibold text-purple-300 mb-2 flex items-center'>
                  <FaGavel className='w-4 h-4 mr-2' />
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.usageRules.title'
                  )}
                </h3>
                <p className='text-cosmic-200'>
                  {t(
                    'footer.legalPages.termsOfUse.sections.usageConditions.usageRules.content'
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaLock className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.termsOfUse.sections.registration.title')}
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20'>
                <h3 className='text-lg font-semibold text-blue-300 mb-2 flex items-center'>
                  <FaUserShield className='w-4 h-4 mr-2' />
                  {t(
                    'footer.legalPages.termsOfUse.sections.registration.accountSecurity.title'
                  )}
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  {t(
                    'footer.legalPages.termsOfUse.sections.registration.accountSecurity.content'
                  )}
                </p>
              </div>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <h3 className='text-lg font-semibold text-green-300 mb-2 flex items-center'>
                  <FaDatabase className='w-4 h-4 mr-2' />
                  {t(
                    'footer.legalPages.termsOfUse.sections.registration.dataProcessing.title'
                  )}
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  {t(
                    'footer.legalPages.termsOfUse.sections.registration.dataProcessing.content'
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaExclamationTriangle className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.termsOfUse.sections.disclaimer.title')}
              </h2>
            </div>
            <div className='bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4 rounded-lg border border-red-500/20'>
              <p className='text-cosmic-200'>
                {t('footer.legalPages.termsOfUse.sections.disclaimer.content')}
              </p>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaEye className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                {t('footer.legalPages.termsOfUse.sections.contact.title')}
              </h2>
            </div>
            <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
              <p className='text-cosmic-200'>
                {t('footer.legalPages.termsOfUse.sections.contact.content')}
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
