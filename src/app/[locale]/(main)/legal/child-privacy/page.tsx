// Bu dosya, yasal gerekliliklere uygun Çocuk Gizliliği Politikası sayfasını oluşturur.
// 13 yaş altı kullanıcıların gizliliği ve ebeveyn haklarını açıklar.
// Mistik tarot temasına uygun, i18n destekli, modern ve profesyonel bir arayüz sunar.

import React from 'react';
import { FaChild, FaShieldAlt, FaUserShield, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';

export default function ChildPrivacy() {
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
            <FaChild className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            {t('legalPages.childPrivacy.title')}
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            {t('legalPages.childPrivacy.subtitle')}
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaShieldAlt className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Çocuk Koruma Politikası</h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              {t('legalPages.childPrivacy.content')}
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaLock className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Güvenlik Önlemleri</h2>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4 rounded-lg border border-red-500/20'>
                <h3 className='text-lg font-semibold text-red-300 mb-2 flex items-center'>
                  <FaExclamationTriangle className='w-4 h-4 mr-2' />
                  Veri Toplama Kısıtlaması
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  13 yaş altı çocuklardan bilerek kişisel veri toplamıyoruz.
                </p>
              </div>
              <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20'>
                <h3 className='text-lg font-semibold text-green-300 mb-2 flex items-center'>
                  <FaUserShield className='w-4 h-4 mr-2' />
                  Ebeveyn Kontrolü
                </h3>
                <p className='text-cosmic-200 text-sm'>
                  Ebeveyn izni gereklidir ve veri silme hakkı vardır.
                </p>
              </div>
            </div>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaChild className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>İletişim</h2>
            </div>
            <div className='bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg border border-purple-500/20'>
              <p className='text-cosmic-200'>
                {t('legalPages.childPrivacy.contact').replace('{email}', 'info@busbuskimki.com')}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
