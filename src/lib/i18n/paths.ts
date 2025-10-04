/*
info:
Bağlantılı dosyalar:
- ../config.ts: i18n yapılandırması için (gerekli)

Dosyanın amacı:
- Locale-aware path helper fonksiyonları
- URL oluşturma ve yönlendirme için
- Language switcher için path korunması

Supabase değişkenleri ve tabloları:
- Yok (path helper)

Geliştirme önerileri:
- Dynamic route parametreleri desteği
- Query string korunması

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { locales, defaultLocale, type Locale } from './config';

// Path'ten locale çıkarma
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return defaultLocale;
}

// Path'ten locale kaldırma
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(2).join('/');
  }

  return pathname;
}

// Locale ile path oluşturma
export function createLocalizedPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname);

  if (locale === defaultLocale) {
    return cleanPath === '/' ? '/' : cleanPath;
  }

  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

// Tüm diller için path'ler oluşturma
export function createAllLocalizedPaths(
  pathname: string
): Record<Locale, string> {
  const result = {} as Record<Locale, string>;

  locales.forEach(locale => {
    result[locale] = createLocalizedPath(pathname, locale);
  });

  return result;
}

// SEO-friendly URL mapping'leri
const seoFriendlyMappings = {
  tr: {
    '/': '/anasayfa',
    '/anasayfa': '/anasayfa',
    '/tarotokumasi': '/tarot-okuma',
    '/tarot-okuma': '/tarot-okuma',
    '/numeroloji': '/numeroloji',
    '/dashboard': '/panel',
    '/panel': '/panel',
    '/auth': '/giris',
    '/giris': '/giris'
  },
  en: {
    '/': '/home',
    '/home': '/home',
    '/anasayfa': '/home',
    '/tarotokumasi': '/tarot-reading',
    '/tarot-reading': '/tarot-reading',
    '/tarot-okuma': '/tarot-reading',
    '/numeroloji': '/numerology',
    '/numerology': '/numerology',
    '/dashboard': '/dashboard',
    '/auth': '/login',
    '/login': '/login'
  },
  sr: {
    '/': '/pocetna',
    '/pocetna': '/pocetna',
    '/anasayfa': '/pocetna',
    '/home': '/pocetna',
    '/tarotokumasi': '/tarot-citanje',
    '/tarot-citanje': '/tarot-citanje',
    '/tarot-okuma': '/tarot-citanje',
    '/tarot-reading': '/tarot-citanje',
    '/numeroloji': '/numerologija',
    '/numerologija': '/numerologija',
    '/numerology': '/numerologija',
    '/dashboard': '/panel',
    '/panel': '/panel',
    '/auth': '/prijava',
    '/prijava': '/prijava',
    '/giris': '/prijava',
    '/login': '/prijava'
  }
};

// SEO-friendly path mapping
function getSeoFriendlyPath(locale: Locale, path: string): string {
  const mapping = seoFriendlyMappings[locale];
  return mapping?.[path] || path;
}

// Language switcher için path korunması - SEO-friendly URL mapping ile
export function getLanguageSwitcherPaths(currentPath: string): Array<{
  locale: Locale;
  path: string;
  name: string;
  nativeName: string;
}> {
  const cleanPath = removeLocaleFromPath(currentPath);

  return locales.map(locale => {
    // SEO-friendly path mapping uygula
    const seoFriendlyPath = getSeoFriendlyPath(locale, cleanPath);
    
    // Ana sayfa için özel durum - her dil için doğru ana sayfa path'i
    let fullPath: string;
    
    if (cleanPath === '/' || cleanPath === '') {
      // Ana sayfa için her dil için doğru path
      fullPath = `/${locale}${getSeoFriendlyPath(locale, '/')}`;
    } else {
      // Diğer sayfalar için SEO-friendly path
      fullPath = `/${locale}${seoFriendlyPath}`;
    }

    return {
      locale,
      path: fullPath,
      name:
        locale === 'tr'
          ? 'Türkçe'
          : locale === 'en'
            ? 'English'
            : 'Serbian (Latin)',
      nativeName:
        locale === 'tr'
          ? 'Türkçe'
          : locale === 'en'
            ? 'English'
            : 'Srpski (Latinica)',
    };
  });
}
