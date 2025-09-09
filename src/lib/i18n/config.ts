/*
info:
Bağlantılı dosyalar:
- ../providers/IntlProvider.tsx: i18n provider bileşeni için (gerekli)
- ../../middleware.ts: Locale routing middleware için (gerekli)
- ../../../messages/*.json: Dil dosyaları için (gerekli)

Dosyanın amacı:
- next-intl için temel yapılandırma ayarları
- Desteklenen diller: TR (varsayılan), EN, SR (Latin)
- Timezone: Europe/Podgorica
- Locale segment routing yapılandırması

Supabase değişkenleri ve tabloları:
- Yok (i18n yapılandırması)

Geliştirme önerileri:
- Yeni dil eklemek için bu dosyayı güncelle
- Locale routing kurallarını buradan yönet

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Desteklenen diller
export const locales = ['tr', 'en', 'sr'] as const;
export type Locale = (typeof locales)[number];

// Varsayılan dil
export const defaultLocale: Locale = 'tr';

// Dil yapılandırması
export const localeConfig = {
  tr: {
    name: 'Türkçe',
    nativeName: 'Türkçe',
    timezone: 'Europe/Podgorica',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    timezone: 'Europe/Podgorica',
  },
  sr: {
    name: 'Serbian (Latin)',
    nativeName: 'Srpski (Latinica)',
    timezone: 'Europe/Podgorica',
  },
} as const;

// next-intl yapılandırması
export default getRequestConfig(async ({ locale }) => {
  // Desteklenmeyen dil kontrolü
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
    timeZone: localeConfig[locale as Locale].timezone,
  };
});
