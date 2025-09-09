/*
info:
Bağlantılı dosyalar:
- ../lib/i18n/config.ts: i18n yapılandırması için (gerekli)
- ../../messages/*.json: Dil dosyaları için (gerekli)

Dosyanın amacı:
- next-intl request configuration
- Server-side i18n yapılandırması
- Locale detection ve message loading

Supabase değişkenleri ve tabloları:
- Yok (i18n config)

Geliştirme önerileri:
- Custom locale detection logic eklenebilir
- Message caching stratejileri

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // Desteklenmeyen dil kontrolü
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
