// Bu dosya, yasal gerekliliklere uygun İletişim sayfasını oluşturur.
// Kullanıcıların platform ile iletişime geçebileceği bilgileri ve formu içerir.
// Mistik tarot temasına uygun, modern ve profesyonel bir arayüz sunar.

import React from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaClock,
} from 'react-icons/fa';

export default function Contact() {
  return (
    <div className='min-h-screen bg-cosmic-black'>
      {/* Mystical Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-800/20'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>

      <main className='relative z-10 max-w-4xl mx-auto px-4 py-12'>
        {/* Header Section with Mystical Design */}
        <section className='mb-12 text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30'>
            <FaEnvelope className='w-10 h-10 text-purple-300' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent'>
            İletişim
          </h1>
          <p className='text-cosmic-300 max-w-2xl mx-auto leading-relaxed'>
            Her türlü soru, öneri ve talepleriniz için bize ulaşabilirsiniz.
          </p>
        </section>

        {/* Content Sections with Card-like Design */}
        <div className='space-y-8'>
          {/* Contact Information */}
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaEnvelope className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                İletişim Bilgileri
              </h2>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaEnvelope className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-blue-300 mb-2'>
                  E-posta
                </h3>
                <a
                  href='mailto:info@busbuskimki.com'
                  className='text-golden-400 hover:text-golden-300 underline transition-colors'
                >
                  info@busbuskimki.com
                </a>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaPhone className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-green-300 mb-2'>
                  Telefon
                </h3>
                <a
                  href='tel:+38267010176'
                  className='text-golden-400 hover:text-golden-300 underline transition-colors'
                >
                  +382 (67) 010176
                </a>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <FaMapMarkerAlt className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-purple-300 mb-2'>
                  Adres
                </h3>
                <p className='text-cosmic-200'>Podgorica, Montenegro</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className='card p-6 hover-lift'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg'>
                <FaPaperPlane className='w-5 h-5 text-purple-300' />
              </div>
              <h2 className='text-2xl font-bold text-golden-300'>
                İletişim Formu
              </h2>
            </div>
            <div className='bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20 mb-6'>
              <div className='flex items-center space-x-2 text-yellow-300'>
                <FaClock className='w-4 h-4' />
                <span className='text-sm font-semibold'>
                  Geliştirme Aşamasında
                </span>
              </div>
              <p className='text-cosmic-200 text-sm mt-1'>
                İletişim formu ileride aktif hale getirilecektir. Şimdilik
                yukarıdaki iletişim bilgilerini kullanabilirsiniz.
              </p>
            </div>
            <form className='space-y-4'>
              <div className='relative'>
                <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4' />
                <input
                  type='text'
                  placeholder='Adınız Soyadınız'
                  className='form-input pl-10'
                  disabled
                />
              </div>
              <div className='relative'>
                <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4' />
                <input
                  type='email'
                  placeholder='E‑posta Adresiniz'
                  className='form-input pl-10'
                  disabled
                />
              </div>
              <div className='relative'>
                <FaComment className='absolute left-3 top-3 text-cosmic-400 w-4 h-4' />
                <textarea
                  placeholder='Mesajınız'
                  className='form-input pl-10'
                  rows={4}
                  disabled
                />
              </div>
              <button
                type='submit'
                className='w-full bg-mystical-600 text-white rounded-lg p-3 cursor-not-allowed opacity-50'
                disabled
              >
                <FaPaperPlane className='w-4 h-4 inline mr-2' />
                Gönder (Pasif)
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
