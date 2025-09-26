/*
info:
Bu hook navigation logic'ini merkezi olarak yönetir ve BottomNavigation bileşeninden ayrıştırır.
Auth durumuna göre dinamik navigation items oluşturur ve dil değiştirme işlevselliği sağlar.

Bağlantılı dosyalar:
- @/hooks/auth/useAuth: Kullanıcı auth durumu için
- next/navigation: usePathname, useRouter için

Dosyanın amacı:
- Navigation items'ları auth durumuna göre dinamik oluşturma
- Dil değiştirme işlevselliği
- Navigation state yönetimi
- Reusable navigation logic

Backend bağlantısı:
- useAuth hook'u üzerinden Supabase auth durumu kontrol edilir
- Dil tercihi cookie'de saklanır

Geliştirme ve öneriler:
- Navigation items type safety için interface tanımları
- Dil değiştirme işlevselliği güvenli hale getirildi
- Error handling eklendi
- Memoization ile performance optimizasyonu
*/

'use client';

import { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

// Navigation item interface
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  activeIcon: string;
}

// Dil seçenekleri
export const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
];

// Navigasyon öğelerini oluştur - auth durumuna göre dinamik
const getNavigationItems = (
  currentLocale: string,
  isAuthenticated: boolean,
  isAdmin: boolean
): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
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

// Dil değiştirme fonksiyonu
const changeLanguage = (locale: string, pathname: string): string => {
  try {
    // Mevcut path'i locale olmadan al - daha güvenli yöntem
    let pathWithoutLocale = pathname;

    // Eğer pathname locale ile başlıyorsa, onu kaldır
    if (pathname.startsWith(`/${pathname.split('/')[1]}/`)) {
      const currentLocale = pathname.split('/')[1];
      pathWithoutLocale = pathname.substring(`/${currentLocale}`.length);
    } else if (pathname === `/${pathname.split('/')[1]}`) {
      pathWithoutLocale = '/';
    }

    // Yeni path oluştur - mevcut sayfayı koru
    const newPath =
      pathWithoutLocale === '/'
        ? `/${locale}/tarotokumasi`
        : `/${locale}${pathWithoutLocale}`;

    // Cookie'yi güncelle - dil tercihini kaydet
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    return newPath;
  } catch (error) {
    // Silently handle language change errors
    return `/${locale}/tarotokumasi`; // Fallback
  }
};

// Ana navigation hook
export function useNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  // Mevcut locale'i pathname'den çıkar
  const currentLocale = pathname.split('/')[1] || 'tr';

  // Navigation items'ları memoize et
  const navigationItems = useMemo(
    () => getNavigationItems(currentLocale, isAuthenticated, isAdmin),
    [currentLocale, isAuthenticated, isAdmin]
  );

  // Mevcut dili bul
  const currentLanguage = useMemo(
    () => languages.find(lang => lang.code === currentLocale) || languages[0],
    [currentLocale]
  );

  // Dil değiştirme fonksiyonu
  const handleLanguageChange = (locale: string) => {
    const newPath = changeLanguage(locale, pathname);
    window.location.href = newPath;
  };

  // Navigation item click handler
  const handleNavigationClick = (item: NavigationItem) => {
    router.push(item.href);
  };

  return {
    navigationItems,
    currentLocale,
    currentLanguage,
    languages,
    handleLanguageChange,
    handleNavigationClick,
    router,
  };
}
