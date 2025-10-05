// src/app/(marketing)/page.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Busbuskimki - Profesyonel Tarot ve Numeroloji Hizmetleri',
  description:
    'Busbuskimki ile profesyonel tarot ve numeroloji hizmetlerini keşfedin. Kişisel yorumlar ve rehberlik ile hayatınıza ışık tutun.',
  keywords: [
    'tarot',
    'numeroloji',
    'tarot okuma',
    'kişisel rehberlik',
    'yorum',
  ],
  alternates: {
    canonical: 'https://busbuskimki.com/tr',
    languages: {
      tr: 'https://busbuskimki.com/tr',
      en: 'https://busbuskimki.com/en',
      sr: 'https://busbuskimki.com/sr',
    },
  },
  openGraph: {
    title: 'Busbuskimki - Profesyonel Tarot ve Numeroloji Hizmetleri',
    description:
      'Busbuskimki ile hayatınıza rehberlik eden tarot ve numeroloji yorumlarını keşfedin.',
    url: 'https://busbuskimki.com/tr',
    siteName: 'Busbuskimki',
    images: [
      {
        url: 'https://busbuskimki.com/assets/seo/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Busbuskimki',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busbuskimki - Profesyonel Tarot ve Numeroloji Hizmetleri',
    description:
      'Busbuskimki ile hayatınıza rehberlik eden tarot ve numeroloji yorumlarını keşfedin.',
    images: ['https://busbuskimki.com/assets/seo/twitter-image-home.jpg'],
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Busbuskimki',
    url: 'https://busbuskimki.com/tr',
    logo: 'https://busbuskimki.com/assets/logo.png',
    sameAs: [
      'https://www.facebook.com/Busbuskimki',
      'https://www.instagram.com/Busbuskimki',
    ],
  };

  return (
    <main>
      <h1>Hoş geldiniz!</h1>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sayfa içeriği */}
    </main>
  );
}
