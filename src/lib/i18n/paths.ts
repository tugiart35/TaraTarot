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

// Language switcher için path korunması
export function getLanguageSwitcherPaths(currentPath: string): Array<{
  locale: Locale;
  path: string;
  name: string;
  nativeName: string;
}> {
  const allPaths = createAllLocalizedPaths(currentPath);

  return locales.map(locale => ({
    locale,
    path: allPaths[locale],
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
  }));
}
