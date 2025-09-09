/*
info:
Bağlantılı dosyalar:
- ../lib/i18n/config.ts: i18n yapılandırması için (gerekli)
- ../lib/i18n/validation.ts: Validation mesajları için (gerekli)
- ../lib/i18n/paths.ts: Path helper fonksiyonları için (gerekli)

Dosyanın amacı:
- next-intl provider bileşeni
- Tüm uygulama için i18n context sağlar
- Locale değişikliklerini yönetir

Supabase değişkenleri ve tabloları:
- Yok (client-side provider)

Geliştirme önerileri:
- Locale değişikliği sırasında path korunması
- Error boundary ile hata yönetimi

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';

interface IntlProviderProps {
  children: ReactNode;
  messages: Record<string, any>;
}

export function IntlProvider({ children, messages }: IntlProviderProps) {
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
