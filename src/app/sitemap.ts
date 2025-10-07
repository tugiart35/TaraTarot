/*
info:
Bağlantılı dosyalar:
- @/lib/i18n/config: Locale yapılandırması için (gerekli)

Dosyanın amacı:
- SEO için dinamik sitemap oluşturma
- Tüm sayfaları arama motorlarına bildirme
- Çoklu dil desteği ile sitemap
- SEO-friendly URL'ler ile sitemap

Supabase değişkenleri ve tabloları:
- Yok (statik sitemap)

Geliştirme önerileri:
- Dinamik içerik için veritabanından sayfa listesi çekilebilir
- Lastmod tarihleri güncellenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Next.js otomatik sitemap oluşturma
- SEO optimizasyonu için gerekli
*/

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const currentDate = new Date();

  // SEO-friendly URL'ler (gerçek dosya yapısına göre güncellendi)
  const seoFriendlyUrls = [
    // Ana sayfalar (gerçek route'lar)
    {
      url: `${baseUrl}/tr`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sr`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // Tarot sayfaları (gerçek route'lar)
    {
      url: `${baseUrl}/tr/tarotokumasi`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tarotokumasi`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/tarotokumasi`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // Numeroloji sayfaları
    {
      url: `${baseUrl}/tr/numeroloji`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/numerology`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/numerologija`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // Dashboard sayfaları (gerçek route'lar)
    {
      url: `${baseUrl}/tr/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sr/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },

    // Auth sayfaları (gerçek route'lar)
    {
      url: `${baseUrl}/tr/auth`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/auth`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sr/auth`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

    // Legal sayfalar - tüm diller için İngilizce "legal" kullanılıyor
    {
      url: `${baseUrl}/tr/legal/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sr/legal/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/legal/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sr/legal/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/legal/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sr/legal/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/legal/terms-of-use`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal/terms-of-use`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sr/legal/terms-of-use`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Tarot spreads (mevcut yapı korunuyor)
  const tarotSpreads = [
    { slug: 'love-spread', priority: 0.8 },
    { slug: 'career-spread', priority: 0.7 },
    { slug: 'situation-analysis', priority: 0.7 },
    { slug: 'new-lover', priority: 0.6 },
    { slug: 'relationship-problems', priority: 0.6 },
  ];

  // Generate tarot spread pages (gerçek route'lar)
  const spreadPages = tarotSpreads.flatMap(spread => [
    {
      url: `${baseUrl}/tr/tarotokumasi/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
    {
      url: `${baseUrl}/en/tarotokumasi/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
    {
      url: `${baseUrl}/sr/tarotokumasi/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
  ]);

  // Generate tarot card pages (234 pages: 78 cards × 3 languages)
  const cardSlugs = {
    tr: [
      'joker',
      'buyucu',
      'yuksek-rahibe',
      'imparatorice',
      'imparator',
      'basrahip',
      'asiklar',
      'savas-arabasi',
      'guc',
      'ermis',
      'kader-carki',
      'adalet',
      'asili-adam',
      'olum',
      'olcululuk',
      'seytan',
      'kule',
      'yildiz',
      'ay',
      'gunes',
      'yargi',
      'dunya',
      // Minor Arcana - Cups
      'kupalar-asi',
      'kupalar-ikili',
      'kupalar-uclu',
      'kupalar-dortlu',
      'kupalar-besli',
      'kupalar-altili',
      'kupalar-yedili',
      'kupalar-sekizli',
      'kupalar-dokuzlu',
      'kupalar-onlu',
      'kupalar-prensi',
      'kupalar-sovayesi',
      'kupalar-kralicesi',
      'kupalar-krali',
      // Minor Arcana - Swords
      'kiliclar-asi',
      'kiliclar-ikili',
      'kiliclar-uclu',
      'kiliclar-dortlu',
      'kiliclar-besli',
      'kiliclar-altili',
      'kiliclar-yedili',
      'kiliclar-sekizli',
      'kiliclar-dokuzlu',
      'kiliclar-onlu',
      'kiliclar-prensi',
      'kiliclar-sovayesi',
      'kiliclar-kralicesi',
      'kiliclar-krali',
      // Minor Arcana - Wands
      'asalar-asi',
      'asalar-ikili',
      'asalar-uclu',
      'asalar-dortlu',
      'asalar-besli',
      'asalar-altili',
      'asalar-yedili',
      'asalar-sekizli',
      'asalar-dokuzlu',
      'asalar-onlu',
      'asalar-prensi',
      'asalar-sovayesi',
      'asalar-kralicesi',
      'asalar-krali',
      // Minor Arcana - Pentacles
      'paralar-asi',
      'paralar-ikili',
      'paralar-uclu',
      'paralar-dortlu',
      'paralar-besli',
      'paralar-altili',
      'paralar-yedili',
      'paralar-sekizli',
      'paralar-dokuzlu',
      'paralar-onlu',
      'paralar-prensi',
      'paralar-sovayesi',
      'paralar-kralicesi',
      'paralar-krali',
    ],
    en: [
      'the-fool',
      'the-magician',
      'the-high-priestess',
      'the-empress',
      'the-emperor',
      'the-hierophant',
      'the-lovers',
      'the-chariot',
      'strength',
      'the-hermit',
      'wheel-of-fortune',
      'justice',
      'the-hanged-man',
      'death',
      'temperance',
      'the-devil',
      'the-tower',
      'the-star',
      'the-moon',
      'the-sun',
      'judgement',
      'the-world',
      // Minor Arcana - Cups
      'ace-of-cups',
      'two-of-cups',
      'three-of-cups',
      'four-of-cups',
      'five-of-cups',
      'six-of-cups',
      'seven-of-cups',
      'eight-of-cups',
      'nine-of-cups',
      'ten-of-cups',
      'page-of-cups',
      'knight-of-cups',
      'queen-of-cups',
      'king-of-cups',
      // Minor Arcana - Swords
      'ace-of-swords',
      'two-of-swords',
      'three-of-swords',
      'four-of-swords',
      'five-of-swords',
      'six-of-swords',
      'seven-of-swords',
      'eight-of-swords',
      'nine-of-swords',
      'ten-of-swords',
      'page-of-swords',
      'knight-of-swords',
      'queen-of-swords',
      'king-of-swords',
      // Minor Arcana - Wands
      'ace-of-wands',
      'two-of-wands',
      'three-of-wands',
      'four-of-wands',
      'five-of-wands',
      'six-of-wands',
      'seven-of-wands',
      'eight-of-wands',
      'nine-of-wands',
      'ten-of-wands',
      'page-of-wands',
      'knight-of-wands',
      'queen-of-wands',
      'king-of-wands',
      // Minor Arcana - Pentacles
      'ace-of-pentacles',
      'two-of-pentacles',
      'three-of-pentacles',
      'four-of-pentacles',
      'five-of-pentacles',
      'six-of-pentacles',
      'seven-of-pentacles',
      'eight-of-pentacles',
      'nine-of-pentacles',
      'ten-of-pentacles',
      'page-of-pentacles',
      'knight-of-pentacles',
      'queen-of-pentacles',
      'king-of-pentacles',
    ],
    sr: [
      'joker',
      'carobnjak',
      'visoka-svestenica',
      'carica',
      'car',
      'prvosveštenica',
      'ljubavnici',
      'ratna-kolica',
      'snaga',
      'pustinjak',
      'kolo-srece',
      'pravda',
      'obeseni',
      'smrt',
      'umerenost',
      'djavol',
      'kula',
      'zvezda',
      'mesec',
      'sunce',
      'sud',
      'svet',
      // Minor Arcana - Cups
      'as-pehara',
      'dva-pehara',
      'tri-pehara',
      'cetiri-pehara',
      'pet-pehara',
      'sest-pehara',
      'sedam-pehara',
      'osam-pehara',
      'devet-pehara',
      'deset-pehara',
      'paz-pehara',
      'vitez-pehara',
      'kraljica-pehara',
      'kralj-pehara',
      // Minor Arcana - Swords
      'as-macova',
      'dva-macova',
      'tri-macova',
      'cetiri-macova',
      'pet-macova',
      'sest-macova',
      'sedam-macova',
      'osam-macova',
      'devet-macova',
      'deset-macova',
      'paz-macova',
      'vitez-macova',
      'kraljica-macova',
      'kralj-macova',
      // Minor Arcana - Wands
      'as-stapova',
      'dva-stapova',
      'tri-stapova',
      'cetiri-stapova',
      'pet-stapova',
      'sest-stapova',
      'sedam-stapova',
      'osam-stapova',
      'devet-stapova',
      'deset-stapova',
      'paz-stapova',
      'vitez-stapova',
      'kraljica-stapova',
      'kralj-stapova',
      // Minor Arcana - Pentacles
      'as-diskova',
      'dva-diskova',
      'tri-diskova',
      'cetiri-diskova',
      'pet-diskova',
      'sest-diskova',
      'sedam-diskova',
      'osam-diskova',
      'devet-diskova',
      'deset-diskova',
      'paz-diskova',
      'vitez-diskova',
      'kraljica-diskova',
      'kralj-diskova',
    ],
  };

  // Generate card pages for all locales
  const cardPages = Object.entries(cardSlugs).flatMap(([locale, slugs]) => {
    const basePath =
      locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    return slugs.map(slug => ({
      url: `${baseUrl}/${locale}/${basePath}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  });

  return [...seoFriendlyUrls, ...spreadPages, ...cardPages];
}
