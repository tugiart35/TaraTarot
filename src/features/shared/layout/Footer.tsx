// Footer bileşeni - Sitenin tüm sayfalarında en altta görüntülenecek bölüm
// İçerik: Telif hakkı, iletişim bilgileri, sosyal medya bağlantıları ve yasal bilgiler

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-r from-purple-900 to-indigo-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Ana Footer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Hakkımızda Bölümü */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Hakkımızda</h3>
            <p className='text-gray-300 text-sm'>
              Tarot alanında uzmanlaşmış, güvenilir ve profesyonel hizmet sunan
              platformunuz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Hızlı Erişim</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/tarotokumasi'
                  className='hover:text-purple-300 transition-colors'
                >
                  Tarot Açılımı
                </Link>
              </li>
            </ul>
          </div>

          {/* Yasal Bilgiler */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Yasal</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/legal/privacy-policy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/terms-of-use'
                  className='hover:text-purple-300 transition-colors'
                >
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/kvkk-disclosure'
                  className='hover:text-purple-300 transition-colors'
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/cookie-policy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/contact'
                  className='hover:text-purple-300 transition-colors'
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/about'
                  className='hover:text-purple-300 transition-colors'
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/disclaimer'
                  className='hover:text-purple-300 transition-colors'
                >
                  Sorumluluk Reddi
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/copyright-policy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Telif Hakkı Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/refund-policy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Geri Ödeme Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/payment-terms'
                  className='hover:text-purple-300 transition-colors'
                >
                  Ödeme Şartları
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/security-policy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Güvenlik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/accessibility'
                  className='hover:text-purple-300 transition-colors'
                >
                  Erişilebilirlik
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/child-privacy'
                  className='hover:text-purple-300 transition-colors'
                >
                  Çocuk Gizliliği Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>İletişim</h3>
            <ul className='space-y-2 text-sm'>
              <li>Email: info@tarotapp.com</li>
              <li>
                Tel:{' '}
                {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+90 (xxx) xxx xx xx'}
              </li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
            {/* Sosyal Medya İkonları */}
            <div className='flex space-x-4 mt-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-purple-300 transition-colors'
              >
                <FaFacebook size={20} />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-purple-300 transition-colors'
              >
                <FaTwitter size={20} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-purple-300 transition-colors'
              >
                <FaInstagram size={20} />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-purple-300 transition-colors'
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Alt Bilgi ve Telif Hakkı */}
        <div className='border-t border-gray-700 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-300'>
            <p>© {currentYear} TarotApp. Tüm hakları saklıdır.</p>
            <p className='mt-2 md:mt-0'>
              Bu site eğlence amaçlıdır ve gerçek hayat tavsiyesi yerine geçmez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
