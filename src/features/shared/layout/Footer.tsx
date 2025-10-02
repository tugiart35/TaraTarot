'use client';

// Modern Footer bileşeni - Glassmorphism ve modern tasarım öğeleri ile
// İçerik: Telif hakkı, iletişim bilgileri, sosyal medya bağlantıları ve yasal bilgiler

import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronRight,
  FaLock,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiStripe,
  SiApplepay,
  SiGooglepay,
} from 'react-icons/si';
import { useTranslations } from '@/hooks/useTranslations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslations();

  return (
    <footer className='relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800'>
      {/* Glassmorphism overlay */}
      <div className='absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/5 via-transparent to-white/5'></div>
      
      {/* Content */}
      <div className='relative z-10 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
          {/* Ana Footer Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
            
            {/* Hakkımızda Bölümü - Enhanced */}
            <div className='lg:col-span-1'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
                  {t('footer.about.title', 'Hakkımızda')}
                </h3>
                <div className='w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mb-4'></div>
              </div>
              <p className='text-gray-300 text-sm leading-relaxed'>
                {t('footer.about.description', 'Büşbüşkimki olarak, profesyonel tarot okuması ve numeroloji analizi hizmetleri sunuyoruz. Aşk rehberliği, kariyer rehberliği, günlük rehberlik ve detaylı numeroloji analizleri ile hayatınızın her alanında rehberlik alabilirsiniz.')}
              </p>
            </div>

            {/* Hızlı Erişim - Enhanced */}
            <div>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
                  {t('footer.quickAccess.title', 'Hızlı Erişim')}
                </h3>
                <div className='w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mb-4'></div>
              </div>
              <ul className='space-y-3'>
                <li>
                  <Link
                    href='/tarotokumasi'
                    className='group flex items-center text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1'
                  >
                    <FaChevronRight className='w-3 h-3 mr-2 text-purple-400 group-hover:text-purple-300 transition-colors' />
                    {t('footer.quickAccess.tarotReading', 'Tarot Açılımı')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/numeroloji'
                    className='group flex items-center text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1'
                  >
                    <FaChevronRight className='w-3 h-3 mr-2 text-purple-400 group-hover:text-purple-300 transition-colors' />
                    {t('footer.quickAccess.numerology', 'Numeroloji Analizi')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/ask-acilimi'
                    className='group flex items-center text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1'
                  >
                    <FaChevronRight className='w-3 h-3 mr-2 text-purple-400 group-hover:text-purple-300 transition-colors' />
                    {t('footer.quickAccess.loveReading', 'Aşk Açılımı')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/kariyer-acilimi'
                    className='group flex items-center text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1'
                  >
                    <FaChevronRight className='w-3 h-3 mr-2 text-purple-400 group-hover:text-purple-300 transition-colors' />
                    {t('footer.quickAccess.careerReading', 'Kariyer Açılımı')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Yasal Bilgiler - Enhanced with better organization */}
            <div>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
                  {t('footer.legal.title', 'Yasal')}
                </h3>
                <div className='w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mb-4'></div>
              </div>
              <div className='grid grid-cols-1 gap-2'>
                <Link
                  href='/legal/privacy-policy'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.privacyPolicy', 'Gizlilik Politikası')}</span>
                </Link>
                <Link
                  href='/legal/terms-of-use'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.termsOfUse', 'Kullanım Şartları')}</span>
                </Link>
                <Link
                  href='/legal/kvkk-disclosure'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.kvkkDisclosure', 'KVKK Aydınlatma')}</span>
                </Link>
                <Link
                  href='/legal/cookie-policy'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.cookiePolicy', 'Çerez Politikası')}</span>
                </Link>
                <Link
                  href='/legal/disclaimer'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.disclaimer', 'Sorumluluk Reddi')}</span>
                </Link>
                <Link
                  href='/legal/refund-policy'
                  className='text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group'
                >
                  <span className='group-hover:text-purple-300'>{t('footer.legal.refundPolicy', 'Geri Ödeme Politikası')}</span>
                </Link>
              </div>
            </div>

            {/* İletişim Bilgileri - Enhanced with icons */}
            <div>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
                  {t('footer.contact.title', 'İletişim')}
                </h3>
                <div className='w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mb-4'></div>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3 group'>
                  <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-300'>
                    <FaEnvelope className='w-4 h-4 text-purple-300' />
                  </div>
                  <span className='text-sm text-gray-300 group-hover:text-white transition-colors'>
                    {t('footer.contact.email', 'info@busbuskimki.com')}
                  </span>
                </div>
                <div className='flex items-center space-x-3 group'>
                  <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-300'>
                    <FaPhone className='w-4 h-4 text-purple-300' />
                  </div>
                  <span className='text-sm text-gray-300 group-hover:text-white transition-colors'>
                    {process.env.NEXT_PUBLIC_CONTACT_PHONE ||
                      t('footer.contact.phone', '+382 (67) 010176')}
                  </span>
                </div>
                <div className='flex items-center space-x-3 group'>
                  <div className='p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-300'>
                    <FaMapMarkerAlt className='w-4 h-4 text-purple-300' />
                  </div>
                  <span className='text-sm text-gray-300 group-hover:text-white transition-colors'>
                    {t('footer.contact.address', 'Podgorica, Montenegro')}
                  </span>
                </div>
              </div>
              
              {/* Ödeme Yöntemleri - Minimal Design */}
              <div className='mt-6'>
                <h4 className='text-sm font-semibold text-gray-300 mb-3 flex items-center'>
                  <FaLock className='w-3 h-3 mr-1 text-green-400' />
                  {t('footer.payment.title', 'Ödeme Yöntemleri')}
                </h4>
                
                {/* Minimal Payment Icons */}
                <div className='flex flex-wrap items-center gap-3 mb-2'>
                  <SiVisa className='w-6 h-6 text-blue-500 hover:text-blue-400 transition-colors cursor-pointer' />
                  <SiMastercard className='w-6 h-6 text-red-500 hover:text-red-400 transition-colors cursor-pointer' />
                  <SiPaypal className='w-6 h-6 text-blue-600 hover:text-blue-500 transition-colors cursor-pointer' />
                  <SiStripe className='w-6 h-6 text-purple-600 hover:text-purple-500 transition-colors cursor-pointer' />
                  <SiApplepay className='w-6 h-6 text-gray-700 hover:text-gray-600 transition-colors cursor-pointer' />
                  <SiGooglepay className='w-6 h-6 text-gray-600 hover:text-gray-500 transition-colors cursor-pointer' />
                </div>
                
                {/* Minimal Security Badge */}
                <div className='flex items-center space-x-1 text-xs text-gray-400'>
                  <FaCheckCircle className='w-3 h-3 text-green-400' />
                  <span>{t('footer.payment.securePayment', 'Güvenli ödeme')}</span>
                </div>
              </div>
              
              {/* Sosyal Medya İkonları - Enhanced */}
              <div className='mt-6'>
                <h4 className='text-sm font-semibold text-gray-300 mb-3'>{t('footer.social.title', 'Sosyal Medya')}</h4>
                <div className='flex space-x-3'>
                  <a
                    href='https://facebook.com/busbuskimki'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group p-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25'
                  >
                    <FaFacebook className='w-5 h-5 text-purple-300 group-hover:text-white transition-colors' />
                  </a>
                  <a
                    href='https://twitter.com/busbuskimki'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group p-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25'
                  >
                    <FaTwitter className='w-5 h-5 text-purple-300 group-hover:text-white transition-colors' />
                  </a>
                  <a
                    href='https://instagram.com/busbuskimki'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group p-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25'
                  >
                    <FaInstagram className='w-5 h-5 text-purple-300 group-hover:text-white transition-colors' />
                  </a>
              
                </div>
              </div>
            </div>
          </div>

          {/* Modern Alt Bilgi ve Telif Hakkı */}
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px'></div>
            <div className='pt-8'>
              <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
                <div className='text-center lg:text-left'>
                  <p className='text-sm text-gray-300'>
                    © {currentYear}{' '}
                    <span className='font-semibold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent'>
                      Büşbüşkimki Digital Agency
                    </span>
                    . {t('footer.copyright.text', 'Tüm hakları saklıdır.')}
                  </p>
                </div>
                <div className='text-center lg:text-right'>
                  <p className='text-xs text-gray-400 max-w-md'>
                    {t('footer.copyright.disclaimer', 'Bu site eğlence amaçlıdır ve gerçek hayat tavsiyesi yerine geçmez.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
