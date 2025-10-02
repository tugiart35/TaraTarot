// Bu dosya, yasal gerekliliklere uygun Hakkımızda sayfasını oluşturur.
// Platformun amacı, vizyonu ve temel bilgilerini içerir.
// Mistik tarot temasına uygun, modern ve profesyonel bir arayüz sunar.

import React from 'react';
import {
  FaHeart,
  FaEye,
  FaRocket,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStar,
} from 'react-icons/fa';

export default function About() {
  return (
    <div className='min-h-screen bg-cosmic-black'>
      {/* Mystical Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-800/20'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>
      
      <main className='relative z-10 max-w-4xl mx-auto px-4 py-12'>
        {/* Header Section with Mystical Design */}
        <section className='mb-12 text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30'>
            <FaStar className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            Hakkımızda
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            Tarot ve numeroloji alanında uzmanlaşmış, güvenilir ve profesyonel
            hizmet sunan platform.
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaHeart className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Misyonumuz</h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              Büşbüşkimki olarak, kullanıcılarımıza en doğru, güvenilir ve etik
              tarot ile numeroloji analizlerini sunmayı amaçlıyoruz. Kişisel gelişim
              ve farkındalık yolculuğunuzda yanınızdayız.
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaEye className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Vizyonumuz</h2>
            </div>
            <p className='text-cosmic-200 leading-relaxed'>
              Modern teknolojiyi kullanarak, spiritüel danışmanlık ve kişisel analiz
              hizmetlerini herkes için erişilebilir ve anlaşılır kılmak.
            </p>
          </section>

          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaRocket className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>Temel Bilgiler</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaShieldAlt className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-purple-300 mb-2'>Platform</h3>
                <p className='text-cosmic-200'>Büşbüşkimki</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaMapMarkerAlt className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-green-300 mb-2'>Kuruluş Yeri</h3>
                <p className='text-cosmic-200'>Podgorica, Montenegro</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaEnvelope className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-blue-300 mb-2'>İletişim</h3>
                <a 
                  href='mailto:info@busbuskimki.com'
                  className='text-golden-400 hover:text-golden-300 underline transition-colors'
                >
                  info@busbuskimki.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
