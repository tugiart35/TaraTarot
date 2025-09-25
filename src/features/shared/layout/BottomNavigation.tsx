/*
info:
Bağlantılı dosyalar:
- next/link: Sayfalar arası geçiş için Link bileşeni (gerekli)
- next/navigation: usePathname ile aktif rota tespiti için (gerekli)
- @/hooks/useAuth: Kullanıcı giriş durumu kontrolü için (gerekli)

Dosyanın amacı:
- Mobil cihazlarda alt kısımda sabit duran navigasyon çubuğu oluşturur.
- Giriş yapmış kullanıcılar için "Dashboard" sekmesi, giriş yapmamış kullanıcılar için "Giriş Yap" sekmesi gösterir.
- Admin kullanıcılar için "Pakize" sekmesi gösterir.

Backend bağlantısı:
- useAuth hook'u üzerinden Supabase auth durumu kontrol edilir.

Geliştirme ve öneriler:
- Auth durumuna göre dinamik menü öğeleri gösterilir.
- Her sekme için emoji ikonlar ve aktif/aktif olmayan durumlar belirgin.
- Navigasyonun sticky olması için z-index ve sabit konumlandırma kullanılmış.
- Aktif sekme için renk vurgusu ve hover efektleri mevcut.
- Menü öğeleri sade, okunabilir ve kolayca genişletilebilir.

Hatalar / Geliştirmeye Açık Noktalar:
- Erişilebilirlik (a11y) için nav'a aria-label, Link'lere aria-current eklenebilir.
- Menüde çok fazla sekme olursa taşma veya responsive sorunları olabilir, scroll veya daha küçük ikonlar eklenebilir.
- Menüdeki isimler sabit, çoklu dil desteği için i18n eklenebilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Fonksiyonlar ve değişken isimleri açık, kod blokları sade ve modüler.
- Optimizasyon: Sadece gerekli render ve kontrol var, gereksiz tekrar yok.
- Yeniden Kullanılabilirlik: Basit yapı, kolayca genişletilebilir.
- Güvenlik: Auth durumu güvenli şekilde kontrol edilir.

Gereklilik ve Kullanım Durumu:
- BottomNavigation: Gerekli, mobilde hızlı erişim ve yönlendirme için ana navigasyon bileşeni.
- getNavigationItems: Gerekli, auth durumuna göre dinamik menü oluşturmak için.
- LanguageSelector: Gerekli, dil değiştirme işlevi için.
*/

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Dil seçenekleri
const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
];

// Navigasyon öğelerini oluştur - auth durumuna göre dinamik
const getNavigationItems = (
  currentLocale: string,
  isAuthenticated: boolean,
  isAdmin: boolean
) => {
  const baseItems = [
    {
      name: 'Tarot',
      href: `/${currentLocale}/tarotokumasi`,
      icon: '⭐',
      activeIcon: '⭐',
    },
    {
      name: 'Numeroloji',
      href: `/${currentLocale}/numeroloji`,
      icon: '🔢',
      activeIcon: '🔢',
    },
    {
      name: 'Ana Sayfa',
      href: `/${currentLocale}`,
      icon: '💛',
      activeIcon: '💛',
    },
  ];

  // Admin kontrolü - admin ise Pakize sekmesi ekle
  if (isAuthenticated && isAdmin) {
    baseItems.push({
      name: 'Pakize',
      href: `/${currentLocale}/pakize`,
      icon: '👑',
      activeIcon: '👑',
    });
  }

  // Auth durumuna göre giriş/profil sekmesi ekle
  if (isAuthenticated) {
    baseItems.push({
      name: 'Profil',
      href: `/${currentLocale}/dashboard`,
      icon: '👤',
      activeIcon: '👤',
    });
  } else {
    baseItems.push({
      name: 'Giriş Yap',
      href: `/${currentLocale}/auth`,
      icon: '🔑',
      activeIcon: '🔑',
    });
  }

  return baseItems;
};

// Dil seçici bileşeni
function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Mevcut dili pathname'den çıkar
  const currentLocale = pathname.split('/')[1] || 'tr';
  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    try {
      // Mevcut path'i locale olmadan al - daha güvenli yöntem
      let pathWithoutLocale = pathname;

      // Eğer pathname locale ile başlıyorsa, onu kaldır
      if (pathname.startsWith(`/${currentLocale}/`)) {
        pathWithoutLocale = pathname.substring(`/${currentLocale}`.length);
      } else if (pathname === `/${currentLocale}`) {
        pathWithoutLocale = '/';
      }

      // Yeni path oluştur - mevcut sayfayı koru
      const newPath =
        pathWithoutLocale === '/'
          ? `/${locale}/tarotokumasi`
          : `/${locale}${pathWithoutLocale}`;

      // Dropdown'ı kapat
      setIsOpen(false);

      // Cookie'yi güncelle - dil tercihini kaydet
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

      // Doğrudan window.location ile yönlendirme
      window.location.href = newPath;
    } catch (error) {
      // Dil değiştirme hatası sessizce işlenir
      console.error('Language change error:', error);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all duration-300 min-w-0 flex-1 text-gray-500 hover:text-gray-300'
      >
        <span className='text-lg mb-1'>{currentLanguage?.flag}</span>
        <span className='text-xs font-medium truncate'>
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {/* Dropup menü */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40'
            onClick={() => setIsOpen(false)}
          />

          {/* Dropup menü */}
          <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg shadow-xl min-w-[140px]'>
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === languages.length - 1 ? 'rounded-b-lg' : ''}
                  ${
                    currentLocale === language.code
                      ? 'bg-slate-700/50 text-amber-400'
                      : 'text-gray-300'
                  }
                `}
              >
                <div className='flex items-center space-x-3'>
                  <span className='text-lg'>{language.flag}</span>
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>{language.name}</span>
                    <span className='text-xs text-gray-400'>
                      {language.code.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const currentLocale = pathname.split('/')[1] || 'tr';

  // Profil ikonuna tıklama işlemi - programatik yönlendirme
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated) {
      // Dashboard sayfasına programatik yönlendirme
      router.push(`/${currentLocale}/dashboard`);
    } else {
      // Auth sayfasına yönlendirme
      router.push(`/${currentLocale}/auth`);
    }
  };

  // Pakize sekmesi tıklama işlemi - programatik yönlendirme
  const handlePakizeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('👑 Pakize sekmesi tıklandı:', { isAuthenticated, isAdmin, currentLocale });
    
    if (isAuthenticated && isAdmin) {
      console.log('👑 Pakize sayfasına yönlendiriliyor:', `/${currentLocale}/pakize`);
      // Pakize sayfasına programatik yönlendirme - window.location kullan
      window.location.href = `/${currentLocale}/pakize`;
    } else {
      console.log('👑 Pakize erişim hatası:', { isAuthenticated, isAdmin });
    }
  };

  // Navigation items oluştur
  const navigationItems = getNavigationItems(
    currentLocale,
    isAuthenticated,
    isAdmin
  );

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700'>
      <div className='flex items-center justify-around h-16 px-1'>
        {navigationItems.map(item => {
          const isActive =
            pathname === item.href ||
            (item.href === '/' && pathname === '') ||
            (item.href !== '/' && pathname?.startsWith(item.href));

          // Profil/Auth/Pakize sekmesi için özel tıklama işlemi
          const isProfileOrAuth = item.name === 'Profil' || item.name === 'Giriş Yap';
          const isPakize = item.name === 'Pakize';

          if (isProfileOrAuth) {
            return (
              <button
                key={item.name}
                onClick={handleProfileClick}
                className={`
                  flex flex-col items-center justify-center px-2 py-2 rounded-lg
                  transition-all duration-300 min-w-0 flex-1
                  ${isActive ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                <span className='text-lg mb-1'>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span className='text-xs font-medium truncate'>{item.name}</span>
              </button>
            );
          }

          if (isPakize) {
            return (
              <button
                key={item.name}
                onClick={handlePakizeClick}
                className={`
                  flex flex-col items-center justify-center px-2 py-2 rounded-lg
                  transition-all duration-300 min-w-0 flex-1
                  ${isActive ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                <span className='text-lg mb-1'>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span className='text-xs font-medium truncate'>{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center justify-center px-2 py-2 rounded-lg
                transition-all duration-300 min-w-0 flex-1
                ${isActive ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              <span className='text-lg mb-1'>
                {isActive ? item.activeIcon : item.icon}
              </span>
              <span className='text-xs font-medium truncate'>{item.name}</span>
            </Link>
          );
        })}

        {/* Dil seçici */}
        <LanguageSelector />
      </div>
    </nav>
  );
}