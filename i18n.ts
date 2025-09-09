/*
info:
Bağlantılı dosyalar:
- src/lib/i18n/config.ts: i18n yapılandırması için (gerekli)
- src/i18n/request.ts: Request configuration için (gerekli)

Dosyanın amacı:
- next-intl için ana yapılandırma dosyası
- Next.js App Router ile uyumlu i18n setup
- Locale routing ve message loading

Supabase değişkenleri ve tabloları:
- Yok (i18n yapılandırması)

Geliştirme önerileri:
- Yeni dil eklemek için bu dosyayı güncelle
- Locale detection logic eklenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Desteklenen diller
const locales = ['tr', 'en', 'sr'] as const;

export default getRequestConfig(async ({ locale }) => {
  // Desteklenmeyen dil kontrolü
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
