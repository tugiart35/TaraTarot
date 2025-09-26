/*
 * Locale Utility Functions
 * 
 * Bu dosya dil belirleme işlemleri için ortak utility fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan locale belirleme kodlarını önler.
 */

import { NextRequest } from 'next/server';

// Desteklenen diller
export type SupportedLocale = 'tr' | 'en' | 'sr';

/**
 * Ülke kodundan dil belirle
 */
export function determineLocale(countryCode: string): SupportedLocale {
  if (!countryCode || typeof countryCode !== 'string') {
    return 'en'; // Varsayılan İngilizce
  }

  const code = countryCode.toUpperCase();

  // Türkiye
  if (code === 'TR') {
    return 'tr';
  }

  // Sırpça konuşulan ülkeler
  if (['RS', 'BA', 'ME', 'HR', 'SI', 'MK'].includes(code)) {
    return 'sr';
  }

  // Diğer ülkeler için İngilizce
  return 'en';
}

/**
 * Desteklenen dil kodları listesi
 */
export const SUPPORTED_LOCALES: SupportedLocale[] = ['tr', 'en', 'sr'];

/**
 * Dil kodunun desteklenip desteklenmediğini kontrol et
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Dil kodundan ülke adı al
 */
export function getCountryNameFromLocale(locale: SupportedLocale): string {
  switch (locale) {
    case 'tr':
      return 'Turkey';
    case 'sr':
      return 'Serbia';
    case 'en':
    default:
      return 'United States';
  }
}

/**
 * Dil kodundan yerel dil adı al
 */
export function getLocalLanguageName(locale: SupportedLocale): string {
  switch (locale) {
    case 'tr':
      return 'Türkçe';
    case 'sr':
      return 'Српски';
    case 'en':
    default:
      return 'English';
  }
}

/**
 * Request'ten locale çıkar (search params, path, cookie)
 */
export function extractLocaleFromRequest(request: NextRequest): SupportedLocale {
  // Search params'den locale al
  const searchParams = new URL(request.url).searchParams;
  const paramLocale = searchParams.get('locale');
  if (paramLocale && isSupportedLocale(paramLocale)) {
    return paramLocale;
  }
  
  // Path'den locale çıkar
  const pathSegments = request.nextUrl.pathname.split('/');
  const pathLocale = pathSegments[1];
  if (pathLocale && isSupportedLocale(pathLocale)) {
    return pathLocale;
  }
  
  // Cookie'den locale al
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }
  
  return 'tr'; // default
}

/**
 * Pathname'den locale çıkar
 */
export function extractLocaleFromPathname(pathname: string): SupportedLocale {
  const pathSegments = pathname.split('/');
  const locale = pathSegments[1];
  
  if (locale && isSupportedLocale(locale)) {
    return locale;
  }
  
  return 'tr'; // default
}

/**
 * Cookie'den locale al
 */
export function getLocaleFromCookie(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }
  
  return 'tr'; // default
}
