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
import { locales } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://busbuskimki.com';
  const currentDate = new Date();

  // Ana sayfalar
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Locale sayfaları
  const localePages = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/tarotokumasi`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/numeroloji`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // Tarot okuma türleri
    {
      url: `${baseUrl}/${locale}/reading/love`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${locale}/reading/career`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/${locale}/reading/problem`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  return [...mainPages, ...localePages];
}
