/*
info:
Bağlantılı dosyalar:
- @/lib/i18n/config: Locale yapılandırması için (gerekli)

Dosyanın amacı:
- SEO için dinamik sitemap oluşturma
- Tüm sayfaları arama motorlarına bildirme
- Çoklu dil desteği ile sitemap

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
  const locales = ['tr', 'en', 'sr'];

  // Static pages
  const staticPages = [
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
    {
      url: `${baseUrl}/tr/tarot`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tarot`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/tarot`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
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
    {
      url: `${baseUrl}/tr/pakize`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/premium`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sr/premium`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tr/legal/kvkk-disclosure`,
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
      url: `${baseUrl}/tr/legal/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sr/legal/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/legal/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/legal/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sr/legal/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Tarot spreads
  const tarotSpreads = [
    { slug: 'love-spread', priority: 0.8 },
    { slug: 'career-spread', priority: 0.7 },
    { slug: 'situation-analysis', priority: 0.7 },
    { slug: 'new-lover', priority: 0.6 },
    { slug: 'relationship-problems', priority: 0.6 },
  ];

  // Generate tarot spread pages
  const spreadPages = tarotSpreads.flatMap(spread => 
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/tarot/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    }))
  );

  return [...staticPages, ...spreadPages];
}
