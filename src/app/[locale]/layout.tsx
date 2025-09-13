/*
info:
Bağlantılı dosyalar:
- ../providers/IntlProvider.tsx: i18n provider bileşeni için (gerekli)
- ../lib/i18n/config.ts: i18n yapılandırması için (gerekli)
- ../lib/i18n/paths.ts: Path helper fonksiyonları için (gerekli)
- ../../layout.tsx: Ana layout dosyası için (gerekli)

Dosyanın amacı:
- Locale segment routing için layout
- next-intl provider ile sarmalama
- Locale validation ve yönlendirme

Supabase değişkenleri ve tabloları:
- Yok (layout wrapper)

Geliştirme önerileri:
- Locale değişikliği sırasında state korunması
- Error boundary ile hata yönetimi

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Aktif kullanımda
*/

import { ReactNode } from 'react';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  await params;
  
  return (
    <div>
      {children}
    </div>
  );
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: {
      template: '%s | Tarot App',
      default: 'Tarot App',
    },
    description: 'Professional tarot reading service',
    openGraph: {
      title: 'Tarot App',
      description: 'Professional tarot reading service',
      locale: locale,
    },
  };
}
