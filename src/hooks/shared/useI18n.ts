import { useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { useLocaleFromGeolocation } from '@/hooks/useGeolocation';

type SupportedLocale = 'tr' | 'en' | 'sr';

function extractLocale(pathname: string | null | undefined): SupportedLocale {
  if (!pathname) {
    return 'tr';
  }
  const maybe = pathname.split('/')[1];
  if (maybe === 'tr' || maybe === 'en' || maybe === 'sr') {
    return maybe as SupportedLocale;
  }
  return 'tr';
}

function buildLanguagePath(
  pathname: string,
  nextLocale: SupportedLocale
): string {
  try {
    // Eğer pathname locale ile başlıyorsa kaldır
    let pathWithoutLocale = pathname;
    const firstSegment = pathname.split('/')[1];
    if (firstSegment && ['tr', 'en', 'sr'].includes(firstSegment)) {
      pathWithoutLocale = pathname.substring(`/${firstSegment}`.length) || '/';
    }

    // SEO-friendly path mapping
    const seoMappings = {
      tr: {
        '/': '/anasayfa',
        '/tarotokumasi': '/tarot-okuma',
        '/tarot-reading': '/tarot-okuma',
        '/tarot-citanje': '/tarot-okuma',
        '/numeroloji': '/numeroloji',
        '/numerology': '/numeroloji',
        '/numerologija': '/numeroloji',
      },
      en: {
        '/': '/home',
        '/tarotokumasi': '/tarot-reading',
        '/tarot-okuma': '/tarot-reading',
        '/tarot-citanje': '/tarot-reading',
        '/numeroloji': '/numerology',
        '/numerologija': '/numerology',
      },
      sr: {
        '/': '/pocetna',
        '/tarotokumasi': '/tarot-citanje',
        '/tarot-okuma': '/tarot-citanje',
        '/tarot-reading': '/tarot-citanje',
        '/numeroloji': '/numerologija',
        '/numerology': '/numerologija',
      },
    };

    // SEO-friendly path'i al
    const mapping = seoMappings[nextLocale];
    const seoPath =
      mapping && pathWithoutLocale in mapping
        ? mapping[pathWithoutLocale as keyof typeof mapping]
        : pathWithoutLocale;

    // Mevcut sayfayı koru, root ise varsayılan sayfaya yönlendir
    const newPath =
      pathWithoutLocale === '/'
        ? `/${nextLocale}${seoPath}`
        : `/${nextLocale}${seoPath}`;

    // Cookie ile locale'i kaydet
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    return newPath;
  } catch (_e) {
    return `/${nextLocale}/tarotokumasi`;
  }
}

export function useI18n() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const {
    locale: geoLocale,
    loading: geoLoading,
    error: geoError,
    requestLocale,
  } = useLocaleFromGeolocation();

  const currentLocale = useMemo<SupportedLocale>(
    () => extractLocale(pathname),
    [pathname]
  );

  const changeLanguage = useCallback(
    (nextLocale: SupportedLocale): string =>
      buildLanguagePath(pathname || '/', nextLocale),
    [pathname]
  );

  const formatDate = useCallback(
    (
      date: string | number | Date,
      locale?: string,
      options?: Intl.DateTimeFormatOptions
    ) => {
      try {
        const loc = locale || t('common.locale', 'tr-TR');
        return new Date(date).toLocaleString(loc || 'tr-TR', options);
      } catch (_e) {
        return new Date(date).toLocaleString('tr-TR', options);
      }
    },
    [t]
  );

  return {
    t,
    currentLocale,
    changeLanguage,
    formatDate,
    // Geolocation destekleri
    geoLocale,
    geoLoading,
    geoError,
    requestLocale,
  };
}

export type { SupportedLocale };
