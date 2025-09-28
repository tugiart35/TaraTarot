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
  title: 'Büşbüşkimki - Profesyonel Tarot Okuması ve Numeroloji Analizi',
  description:
    'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin. Aşk, kariyer ve yaşam sorularınıza mistik cevaplar bulun. Güvenilir mistik rehberlik hizmetleri.',
  keywords:
    'tarot okuması, numeroloji, mistik rehberlik, aşk rehberliği, kariyer rehberliği, günlük rehberlik, ruhani danışmanlık, tarot kartları, sayıların sırrı, gelecek tahmini, kader analizi',
  authors: [{ name: 'Büşbüşkimki - Mistik Rehberlik' }],
  creator: 'Büşbüşkimki',
  publisher: 'Büşbüşkimki',
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
    url: 'https://busbuskimki.com',
    siteName: 'Büşbüşkimki - Mistik Rehberlik',
    title: 'Büşbüşkimki - Profesyonel Tarot Okuması ve Numeroloji Analizi',
    description:
      'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin. Aşk, kariyer ve yaşam sorularınıza mistik cevaplar bulun.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Büşbüşkimki - Mistik Tarot ve Numeroloji',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Büşbüşkimki - Profesyonel Tarot Okuması ve Numeroloji Analizi',
    description:
      'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin.',
    images: ['/images/twitter-card.jpg'],
  },
  alternates: {
    canonical: 'https://busbuskimki.com',
    languages: {
      'tr-TR': 'https://busbuskimki.com/tr',
      'en-US': 'https://busbuskimki.com/en',
      'sr-RS': 'https://busbuskimki.com/sr',
    },
  },
  category: 'Spirituality',
  classification: 'Mystical Services',
  other: {
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
