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
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutErrorBoundary } from '@/components/layout/LayoutErrorBoundary';
import { useNavigation } from '@/hooks/useNavigation';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

// Navigation logic moved to useNavigation hook

// Dil seçici bileşeni
function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, languages, handleLanguageChange } = useNavigation();

  const handleLanguageSelect = (locale: string) => {
    setIsOpen(false);
    handleLanguageChange(locale);
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all duration-300 min-w-0 flex-1 text-gray-500 hover:text-gray-300'
        aria-label="Dil seçici menüsünü aç"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        role="button"
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
          <div 
            className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg shadow-xl min-w-[140px]'
            role="menu"
            aria-label="Dil seçenekleri"
          >
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === languages.length - 1 ? 'rounded-b-lg' : ''}
                  ${
                    currentLanguage?.code === language.code
                      ? 'bg-slate-700/50 text-amber-400'
                      : 'text-gray-300'
                  }
                `}
                role="menuitem"
                aria-label={`${language.name} dilini seç`}
                aria-current={currentLanguage?.code === language.code ? 'true' : 'false'}
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
  const { navigationItems, handleNavigationClick } = useNavigation();
  const { trackUserInteraction } = usePerformanceMonitoring();

  // Profil ikonuna tıklama işlemi - programatik yönlendirme
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const profileItem = navigationItems.find(item => item.name === 'Profil' || item.name === 'Giriş Yap');
    if (profileItem) {
      trackUserInteraction(profileItem.name, 'click');
      handleNavigationClick(profileItem);
    }
  };

  // Pakize sekmesi tıklama işlemi - programatik yönlendirme
  const handlePakizeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pakizeItem = navigationItems.find(item => item.name === 'Pakize');
    if (pakizeItem) {
      trackUserInteraction(pakizeItem.name, 'click');
      handleNavigationClick(pakizeItem);
    }
  };

  return (
    <LayoutErrorBoundary>
      <nav 
        className='fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700'
        role="navigation"
        aria-label="Ana navigasyon menüsü"
      >
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
                aria-label={`${item.name} sayfasına git`}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
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
                aria-label={`${item.name} sayfasına git`}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
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
              aria-label={`${item.name} sayfasına git`}
              aria-current={isActive ? 'page' : undefined}
              role="menuitem"
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
    </LayoutErrorBoundary>
  );
}