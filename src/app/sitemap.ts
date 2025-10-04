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

  // SEO-friendly URL'ler
  const seoFriendlyUrls = [
    // Ana sayfalar
    {
      url: `${baseUrl}/tr/anasayfa`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/home`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sr/pocetna`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    
    // Tarot sayfaları
    {
      url: `${baseUrl}/tr/tarot-okuma`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tarot-reading`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/tarot-citanje`,
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
    
    // Dashboard sayfaları
    {
      url: `${baseUrl}/tr/panel`,
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
      url: `${baseUrl}/sr/panel`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    
    // Auth sayfaları
    {
      url: `${baseUrl}/tr/giris`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sr/prijava`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    
    // Legal sayfalar (dil-spesifik URL'ler)
    {
      url: `${baseUrl}/tr/yasal/hakkimizda`,
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
      url: `${baseUrl}/sr/pravni/o-nama`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/yasal/iletisim`,
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
      url: `${baseUrl}/sr/pravni/kontakt`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/yasal/gizlilik-politikasi`,
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
      url: `${baseUrl}/sr/pravni/politika-privatnosti`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tr/yasal/kullanim-kosullari`,
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
      url: `${baseUrl}/sr/pravni/uslovi-koriscenja`,
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

  // Generate tarot spread pages (SEO-friendly URLs)
  const spreadPages = tarotSpreads.flatMap(spread => [
    {
      url: `${baseUrl}/tr/tarot-okuma/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
    {
      url: `${baseUrl}/en/tarot-reading/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
    {
      url: `${baseUrl}/sr/tarot-citanje/${spread.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: spread.priority,
    },
  ]);

  return [...seoFriendlyUrls, ...spreadPages];
}