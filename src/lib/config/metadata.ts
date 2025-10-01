/*
info:
Bağlantılı dosyalar:
- 'next': Next.js Metadata ve Viewport tipleri için (gerekli)
- Bu dosya, genellikle layout, sayfa ve PWA ile ilgili dosyalarda import edilerek merkezi meta/SEO yönetimi sağlar (örn. app/layout.tsx, app/page.tsx, PWA servis worker).

Dosyanın amacı:
- Uygulamanın SEO, meta ve PWA bilgilerini merkezi olarak yönetmek. Tüm sayfa başlıkları, açıklamaları, anahtar kelimeler, yazar bilgisi, viewport ve tema rengi gibi meta tag'leri tek noktadan kontrol etmek. Next.js 14 uyumluluğu için viewport ve themeColor ayrı export edilmiştir.

firebase değişkenleri ve tablolar:
- firebase ile doğrudan bir bağlantı veya değişken yoktur. Sadece frontend meta/SEO konfigürasyon dosyasıdır.

Geliştirme ve öneriler:
- Açıklamalar yeterli ve Türkçe, okunabilirlik yüksek.
- createPageTitle ve createPageDescription fonksiyonları ile dinamik başlık ve açıklama üretimi sağlanmış, bu iyi bir pratik.
- PWA metadata'sı sade ve merkezi olarak yönetiliyor.
- Eğer çoklu dil desteği olacaksa, meta tag'lerde hreflang veya dil varyantları eklenebilir.
- keywords alanı ileride dinamik hale getirilebilir.
- Gereksiz satır veya tekrar yok, kod sade ve amacına uygun.

Hatalar ve geliştirmeye açık noktalar:
- Şu an için hata veya kötü pratik yok.
- createPageTitle ve createPageDescription fonksiyonları daha fazla özelleştirilebilir (örn. site adı parametreli olabilir).
- PWA metadata'sı ileride genişletilebilir (örn. theme_color, background_color, start_url gibi ek alanlar eklenebilir).

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik ve sade yapı çok iyi.
- Tekrarsız, modüler ve merkezi yönetim sağlanmış.
- Güvenlik açısından risk yok, sadece frontend meta/SEO sabitleri içeriyor.

Gereklilik ve Kullanım Durumu:
- defaultMetadata: Gerekli, uygulamanın ana meta bilgileri için ana kaynak.
- viewport: Gerekli, Next.js 14 ile uyumlu viewport ayarı için kullanılır.
- createPageTitle: Gerekli, dinamik başlık üretimi için kullanılır.
- createPageDescription: Gerekli, dinamik açıklama üretimi için kullanılır.
- pwaMetadata: Gerekli, PWA ile ilgili meta bilgileri merkezi yönetmek için kullanılır.
*/

import type { Metadata, Viewport } from 'next';

// Ana uygulama metadata'sı - SEO Optimized
export const defaultMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3111'
  ),
  title: 'Busbuskimki - Profesyonel Tarot Falı ve Numeroloji | %100 Doğru Yorumlar',
  description:
    'Profesyonel tarot falı ve numeroloji hizmetleri. Deneyimli falcılar tarafından gerçekleştirilen detaylı yorumlar. Aşk, kariyer ve yaşam rehberliği. %100 gizli ve güvenli. Hemen başla!',
  keywords:
    'tarot falı, numeroloji, profesyonel tarot, online tarot, aşk falı, kariyer falı, gelecek yorumu, tarot kartları, mistik yorumlar, spiritüel rehberlik, busbuskimki, güvenilir falcı, deneyimli falcı, detaylı tarot yorumu, kişisel analiz, yaşam rehberliği, karar verme desteği, gelecek kehaneti, spiritüel danışmanlık, mistik hizmetler',
  authors: [{ name: 'Busbuskimki Ekibi', url: 'https://busbuskimki.com' }],
  creator: 'Busbuskimki',
  publisher: 'Busbuskimki',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'sr_RS'],
    url: 'https://busbuskimki.com',
    siteName: 'Busbuskimki - Profesyonel Tarot ve Numeroloji',
    title: 'Busbuskimki - Profesyonel Tarot Falı ve Numeroloji | %100 Doğru Yorumlar',
    description:
      'Profesyonel tarot falı ve numeroloji hizmetleri. Deneyimli falcılar tarafından gerçekleştirilen detaylı yorumlar. Aşk, kariyer ve yaşam rehberliği.',
    images: [
      {
        url: '/images/tarot-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Busbuskimki - Profesyonel Tarot Falı ve Numeroloji Hizmetleri',
        type: 'image/jpeg',
      },
    ],
    countryName: 'Turkey',
    emails: ['busbuskimkionline@gmail.com'],
    phoneNumbers: ['+382 (67) 010176'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busbuskimki - Profesyonel Tarot Falı ve Numeroloji',
    description:
      'Profesyonel tarot falı ve numeroloji hizmetleri. Deneyimli falcılar tarafından gerçekleştirilen detaylı yorumlar.',
    images: ['/images/tarot-og-image.jpg'],
    creator: '@busbuskimki',
    site: '@busbuskimki',
  },
  alternates: {
    canonical: 'https://busbuskimki.com',
    languages: {
      'tr-TR': 'https://busbuskimki.com/tr',
      'en-US': 'https://busbuskimki.com/en',
      'sr-RS': 'https://busbuskimki.com/sr',
    },
  },
  classification: 'Mystical Services',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Busbuskimki',
    'application-name': 'Busbuskimki',
    'msapplication-TileColor': '#8B5CF6',
    'theme-color': '#8B5CF6',
    'format-detection': 'telephone=no',
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
};

// Viewport konfigürasyonu - Next.js 14'te ayrı export gerekli
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
};

// Sayfa başlığı oluşturucu fonksiyonu
export const createPageTitle = (pageTitle: string): string => {
  return `${pageTitle} | Mystik Tarot`;
};

// Sayfa açıklaması oluşturucu fonksiyonu
export const createPageDescription = (pageDescription: string): string => {
  return `${pageDescription} - Mystik Tarot ile ruhani rehberlik alın.`;
};

// PWA metadata'sı
export const pwaMetadata = {
  manifest: '/manifest.json',
  icons: {
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
};
