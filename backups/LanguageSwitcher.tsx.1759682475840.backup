/*
info:
Bağlantılı dosyalar:
- ../../lib/i18n/paths.ts: Path helper fonksiyonları için (gerekli)
- ../../lib/i18n/config.ts: i18n yapılandırması için (gerekli)

Dosyanın amacı:
- Dil değiştirme bileşeni
- Mevcut path'i koruyarak dil değiştirme
- Dropdown veya button listesi ile dil seçimi

Supabase değişkenleri ve tabloları:
- Yok (client-side component)

Geliştirme önerileri:
- Keyboard navigation desteği
- Accessibility iyileştirmeleri
- Animasyonlar eklenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { getLanguageSwitcherPaths } from '@/lib/i18n/paths';
import { useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languagePaths = getLanguageSwitcherPaths(pathname);

  if (!languagePaths) {
    return null;
  }

  const handleLanguageChange = (newLocale: string) => {
    const targetPath =
      languagePaths.paths[newLocale as keyof typeof languagePaths.paths];
    if (targetPath) {
      router.push(targetPath);
      setIsOpen(false);
    }
  };

  const languages = [
    { locale: 'tr', name: 'Türkçe', nativeName: 'Türkçe' },
    { locale: 'en', name: 'English', nativeName: 'English' },
    { locale: 'sr', name: 'Srpski', nativeName: 'Српски' },
  ];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        <span className='text-lg'>
          {locale === 'tr' ? '🇹🇷' : locale === 'en' ? '🇺🇸' : '🇷🇸'}
        </span>
        <span>{languages.find(l => l.locale === locale)?.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg'>
          <div className='py-1'>
            {languages.map(language => (
              <button
                key={language.locale}
                onClick={() => handleLanguageChange(language.locale)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3 ${
                  language.locale === locale ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                <span className='text-lg'>
                  {language.locale === 'tr'
                    ? '🇹🇷'
                    : language.locale === 'en'
                      ? '🇺🇸'
                      : '🇷🇸'}
                </span>
                <div>
                  <div className='font-medium'>{language.name}</div>
                  <div className='text-xs text-gray-500'>
                    {language.nativeName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
