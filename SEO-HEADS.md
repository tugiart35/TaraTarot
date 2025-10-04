# SEO HEADERS - TaraTarot Projesi

## Hreflang ve Canonical Tag Implementasyonu

### 1. HREFLANG IMPLEMENTATION

#### 1.1 Layout.tsx Güncellemesi

```typescript
// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  // Hreflang URLs oluştur
  const hreflangUrls = locales.map(loc => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
    const path = getLocalizedPath(locale, loc);
    return {
      hrefLang: loc,
      href: `${baseUrl}${path}`
    };
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      languages: hreflangUrls.reduce((acc, { hrefLang, href }) => {
        acc[hrefLang] = href;
        return acc;
      }, {} as Record<string, string>)
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      siteName: 'TaraTarot',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
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
  };
}

// Localized path helper
function getLocalizedPath(currentLocale: string, targetLocale: string): string {
  const pathMappings = {
    tr: {
      tr: '/anasayfa',
      en: '/home', 
      sr: '/pocetna'
    },
    en: {
      tr: '/anasayfa',
      en: '/home',
      sr: '/pocetna'
    },
    sr: {
      tr: '/anasayfa',
      en: '/home',
      sr: '/pocetna'
    }
  };
  
  return `/${targetLocale}${pathMappings[currentLocale][targetLocale]}`;
}
```

#### 1.2 Sayfa Bazında Hreflang

```typescript
// src/app/[locale]/(main)/tarotokumasi/layout.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const hreflangUrls = {
    'tr': '/tr/tarot-okuma',
    'en': '/en/tarot-reading', 
    'sr': '/sr/tarot-citanje'
  };

  return {
    title: 'Tarot Okuma - TaraTarot',
    description: 'Profesyonel tarot okuma hizmeti',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/tarot-okuma`,
      languages: Object.entries(hreflangUrls).reduce((acc, [lang, path]) => {
        acc[lang] = `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
        return acc;
      }, {} as Record<string, string>)
    }
  };
}
```

### 2. CANONICAL URL IMPLEMENTATION

#### 2.1 Canonical URL Helper

```typescript
// src/lib/seo/canonical.ts
export function generateCanonicalUrl(
  locale: string, 
  pathname: string,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
): string {
  // Path'ten locale'i çıkar
  const cleanPath = pathname.replace(`/${locale}`, '') || '/';
  
  // Locale-specific path mapping
  const pathMappings = {
    tr: {
      '/': '/anasayfa',
      '/tarotokumasi': '/tarot-okuma',
      '/numeroloji': '/numeroloji',
      '/dashboard': '/panel',
      '/auth': '/giris'
    },
    en: {
      '/': '/home',
      '/tarotokumasi': '/tarot-reading', 
      '/numeroloji': '/numerology',
      '/dashboard': '/dashboard',
      '/auth': '/login'
    },
    sr: {
      '/': '/pocetna',
      '/tarotokumasi': '/tarot-citanje',
      '/numeroloji': '/numerologija', 
      '/dashboard': '/panel',
      '/auth': '/prijava'
    }
  };

  const mappedPath = pathMappings[locale]?.[cleanPath] || cleanPath;
  return `${baseUrl}/${locale}${mappedPath}`;
}
```

#### 2.2 Metadata Generator

```typescript
// src/lib/seo/metadata.ts
import { Metadata } from 'next';
import { generateCanonicalUrl } from './canonical';

export function generatePageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords = [],
  image = '/og-image.jpg'
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const canonicalUrl = generateCanonicalUrl(locale, pathname);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'TaraTarot',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
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
  };
}
```

### 3. STRUCTURED DATA IMPLEMENTATION

#### 3.1 JSON-LD Schema

```typescript
// src/lib/seo/structured-data.ts
export function generateStructuredData({
  locale,
  pathname,
  title,
  description,
  type = 'WebPage'
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  type?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const canonicalUrl = generateCanonicalUrl(locale, pathname);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TaraTarot',
      url: baseUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: generateBreadcrumbs(locale, pathname)
    }
  };
}

function generateBreadcrumbs(locale: string, pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  // Ana sayfa
  breadcrumbs.push({
    '@type': 'ListItem',
    position: 1,
    name: locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Home' : 'Početna',
    item: `/${locale}`
  });

  // Diğer segmentler
  segments.forEach((segment, index) => {
    if (segment !== locale) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: index + 2,
        name: getBreadcrumbName(locale, segment),
        item: `/${locale}/${segments.slice(0, index + 1).join('/')}`
      });
    }
  });

  return breadcrumbs;
}

function getBreadcrumbName(locale: string, segment: string): string {
  const translations = {
    tr: {
      'tarot-okuma': 'Tarot Okuma',
      'numeroloji': 'Numeroloji',
      'panel': 'Panel',
      'giris': 'Giriş'
    },
    en: {
      'tarot-reading': 'Tarot Reading',
      'numerology': 'Numerology', 
      'dashboard': 'Dashboard',
      'login': 'Login'
    },
    sr: {
      'tarot-citanje': 'Tarot Čitanje',
      'numerologija': 'Numerologija',
      'panel': 'Panel',
      'prijava': 'Prijava'
    }
  };

  return translations[locale]?.[segment] || segment;
}
```

### 4. SITEMAP GÜNCELLEMESİ

#### 4.1 Güncellenmiş Sitemap

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const currentDate = new Date();

  // SEO-friendly URL'ler
  const seoFriendlyUrls = [
    // Ana sayfalar
    { url: `${baseUrl}/tr/anasayfa`, priority: 1.0 },
    { url: `${baseUrl}/en/home`, priority: 1.0 },
    { url: `${baseUrl}/sr/pocetna`, priority: 1.0 },
    
    // Tarot sayfaları
    { url: `${baseUrl}/tr/tarot-okuma`, priority: 0.9 },
    { url: `${baseUrl}/en/tarot-reading`, priority: 0.9 },
    { url: `${baseUrl}/sr/tarot-citanje`, priority: 0.9 },
    
    // Numeroloji sayfaları
    { url: `${baseUrl}/tr/numeroloji`, priority: 0.9 },
    { url: `${baseUrl}/en/numerology`, priority: 0.9 },
    { url: `${baseUrl}/sr/numerologija`, priority: 0.9 },
    
    // Dashboard sayfaları
    { url: `${baseUrl}/tr/panel`, priority: 0.8 },
    { url: `${baseUrl}/en/dashboard`, priority: 0.8 },
    { url: `${baseUrl}/sr/panel`, priority: 0.8 },
    
    // Auth sayfaları
    { url: `${baseUrl}/tr/giris`, priority: 0.7 },
    { url: `${baseUrl}/en/login`, priority: 0.7 },
    { url: `${baseUrl}/sr/prijava`, priority: 0.7 },
  ];

  return seoFriendlyUrls.map(url => ({
    url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
  }));
}
```

### 5. ROBOTS.TXT GÜNCELLEMESİ

#### 5.1 Güncellenmiş Robots.txt

```typescript
// src/app/robots.txt/route.ts
export async function GET(): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Allow static assets
Allow: /_next/static/
Allow: /fonts/
Allow: /icons/
Allow: /images/
Allow: /cards/

# Allow SEO-friendly URLs
Allow: /tr/anasayfa
Allow: /tr/tarot-okuma
Allow: /tr/numeroloji
Allow: /tr/panel
Allow: /tr/giris

Allow: /en/home
Allow: /en/tarot-reading
Allow: /en/numerology
Allow: /en/dashboard
Allow: /en/login

Allow: /sr/pocetna
Allow: /sr/tarot-citanje
Allow: /sr/numerologija
Allow: /sr/panel
Allow: /sr/prijava

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /profile/
Disallow: /settings/

# Crawl delay
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

### 6. IMPLEMENTATION CHECKLIST

#### 6.1 Hreflang Implementation
- [ ] Layout.tsx'e hreflang alternates ekle
- [ ] Her sayfa için locale-specific hreflang URLs
- [ ] x-default hreflang (Türkçe ana dil)
- [ ] Hreflang URL'lerin doğruluğunu test et

#### 6.2 Canonical URLs
- [ ] Her sayfa için canonical URL oluştur
- [ ] Self-referencing canonical URLs
- [ ] Duplicate content önleme
- [ ] Canonical URL'lerin doğruluğunu test et

#### 6.3 Structured Data
- [ ] JSON-LD schema markup ekle
- [ ] Breadcrumb structured data
- [ ] WebPage schema
- [ ] Organization schema (site-wide)

#### 6.4 Sitemap & Robots
- [ ] Sitemap.ts'i yeni URL'lerle güncelle
- [ ] Robots.txt'i yeni URL'lerle güncelle
- [ ] Sitemap'in doğruluğunu test et
- [ ] Robots.txt'in doğruluğunu test et

### 7. TESTING STRATEGY

#### 7.1 SEO Testing Tools
- **Google Search Console**: Hreflang ve canonical URL'leri doğrula
- **Google Rich Results Test**: Structured data test et
- **Screaming Frog**: URL yapısını analiz et
- **Ahrefs/SEMrush**: SEO performansını izle

#### 7.2 Manual Testing
- [ ] Her dil için URL'lerin çalıştığını test et
- [ ] Hreflang tag'lerin doğru olduğunu kontrol et
- [ ] Canonical URL'lerin self-referencing olduğunu doğrula
- [ ] Redirect'lerin çalıştığını test et

### 8. MONITORING & MAINTENANCE

#### 8.1 SEO Monitoring
- **Google Search Console**: Hreflang hatalarını izle
- **Core Web Vitals**: Performans metriklerini takip et
- **Crawl Errors**: 404 hatalarını kontrol et
- **Index Coverage**: Yeni URL'lerin indexlenmesini izle

#### 8.2 Maintenance Tasks
- **Weekly**: Google Search Console hatalarını kontrol et
- **Monthly**: Sitemap güncellemelerini yap
- **Quarterly**: SEO performansını analiz et
- **Annually**: URL yapısını gözden geçir

Bu implementasyon, TaraTarot projesinin SEO performansını önemli ölçüde artıracak ve çoklu dil desteğini optimize edecektir.