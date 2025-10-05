# IMPLEMENTATION PLAN - Büşbüşkiki SEO URL Optimization

## Güvenli ve Geriye Dönük Uyumlu URL Yapısı Geçişi

### 1. GENEL STRATEJİ

#### 1.1 Temel Prensipler

- ✅ **Geriye Dönük Uyumluluk**: Mevcut link'ler çalışmaya devam eder
- ✅ **SEO Optimizasyonu**: Her dil için doğal URL'ler
- ✅ **Güvenli Geçiş**: Aşamalı implementasyon
- ✅ **Test Odaklı**: Her aşamada kapsamlı test

#### 1.2 Risk Yönetimi

- **Düşük Risk**: Redirect'ler ve metadata güncellemeleri
- **Orta Risk**: Navigation ve internal link güncellemeleri
- **Yüksek Risk**: Core routing değişiklikleri (kaçınılacak)

### 2. IMPLEMENTATION PHASES

## PHASE 1: FOUNDATION SETUP (1-2 gün)

### 2.1 Next.js Konfigürasyonu

#### 2.1.1 next.config.js Güncellemesi

```javascript
// next.config.js
const nextConfig = {
  // Mevcut konfigürasyon...

  // SEO-friendly redirects
  async redirects() {
    return [
      // Ana sayfa redirects
      {
        source: '/tr',
        destination: '/tr/anasayfa',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/home',
        permanent: true,
      },
      {
        source: '/sr',
        destination: '/sr/pocetna',
        permanent: true,
      },

      // Tarot redirects
      {
        source: '/tr/tarotokumasi',
        destination: '/tr/tarot-okuma',
        permanent: true,
      },
      {
        source: '/en/tarotokumasi',
        destination: '/en/tarot-reading',
        permanent: true,
      },
      {
        source: '/sr/tarotokumasi',
        destination: '/sr/tarot-citanje',
        permanent: true,
      },

      // Numeroloji redirects
      {
        source: '/en/numeroloji',
        destination: '/en/numerology',
        permanent: true,
      },
      {
        source: '/sr/numeroloji',
        destination: '/sr/numerologija',
        permanent: true,
      },

      // Dashboard redirects
      {
        source: '/tr/dashboard',
        destination: '/tr/panel',
        permanent: true,
      },
      {
        source: '/sr/dashboard',
        destination: '/sr/panel',
        permanent: true,
      },

      // Auth redirects
      {
        source: '/tr/auth',
        destination: '/tr/giris',
        permanent: true,
      },
      {
        source: '/en/auth',
        destination: '/en/login',
        permanent: true,
      },
      {
        source: '/sr/auth',
        destination: '/sr/prijava',
        permanent: true,
      },
    ];
  },

  // Rewrites for new URL structure
  async rewrites() {
    return [
      // SEO-friendly URL'ler için rewrites
      {
        source: '/tr/anasayfa',
        destination: '/tr',
      },
      {
        source: '/en/home',
        destination: '/en',
      },
      {
        source: '/sr/pocetna',
        destination: '/sr',
      },
      {
        source: '/tr/tarot-okuma',
        destination: '/tr/tarotokumasi',
      },
      {
        source: '/en/tarot-reading',
        destination: '/en/tarotokumasi',
      },
      {
        source: '/sr/tarot-citanje',
        destination: '/sr/tarotokumasi',
      },
      {
        source: '/en/numerology',
        destination: '/en/numeroloji',
      },
      {
        source: '/sr/numerologija',
        destination: '/sr/numeroloji',
      },
      {
        source: '/tr/panel',
        destination: '/tr/dashboard',
      },
      {
        source: '/sr/panel',
        destination: '/sr/dashboard',
      },
      {
        source: '/tr/giris',
        destination: '/tr/auth',
      },
      {
        source: '/en/login',
        destination: '/en/auth',
      },
      {
        source: '/sr/prijava',
        destination: '/sr/auth',
      },
    ];
  },
};
```

### 2.2 SEO Headers Implementation

#### 2.2.1 Layout.tsx Güncellemesi

```typescript
// src/app/[locale]/layout.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // Hreflang URLs
  const hreflangUrls = {
    tr: '/tr/anasayfa',
    en: '/en/home',
    sr: '/sr/pocetna',
  };

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/anasayfa`,
      languages: Object.entries(hreflangUrls).reduce(
        (acc, [lang, path]) => {
          acc[lang] = `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
          return acc;
        },
        {} as Record<string, string>
      ),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/anasayfa`,
      siteName: 'Büşbüşkiki',
      locale: locale,
      type: 'website',
    },
  };
}
```

### 2.3 Sitemap Güncellemesi

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';
  const currentDate = new Date();

  return [
    // Ana sayfalar
    {
      url: `${baseUrl}/tr/anasayfa`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/home`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sr/pocetna`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Tarot sayfaları
    {
      url: `${baseUrl}/tr/tarot-okuma`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tarot-reading`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/tarot-citanje`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Numeroloji sayfaları
    {
      url: `${baseUrl}/tr/numeroloji`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/numerology`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sr/numerologija`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
```

## PHASE 2: CONTENT UPDATES (1 gün)

### 2.1 Navigation Components

#### 2.1.1 Language Switcher Güncellemesi

```typescript
// src/components/LanguageSwitcher.tsx
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

const pathMappings = {
  tr: {
    '/anasayfa': '/anasayfa',
    '/tarot-okuma': '/tarot-okuma',
    '/numeroloji': '/numeroloji',
    '/panel': '/panel',
    '/giris': '/giris',
  },
  en: {
    '/anasayfa': '/home',
    '/tarot-okuma': '/tarot-reading',
    '/numeroloji': '/numerology',
    '/panel': '/dashboard',
    '/giris': '/login',
  },
  sr: {
    '/anasayfa': '/pocetna',
    '/tarot-okuma': '/tarot-citanje',
    '/numeroloji': '/numerologija',
    '/panel': '/panel',
    '/giris': '/prijava',
  },
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '');
    const mappedPath = pathMappings[newLocale]?.[currentPath] || currentPath;
    const newPath = `/${newLocale}${mappedPath}`;
    router.push(newPath);
  };

  // Component implementation...
}
```

### 2.2 Internal Links Güncellemesi

#### 2.2.1 Link Helper Function

```typescript
// src/lib/seo/links.ts
export function getLocalizedLink(path: string, locale: string): string {
  const linkMappings = {
    tr: {
      '/': '/anasayfa',
      '/tarotokumasi': '/tarot-okuma',
      '/numeroloji': '/numeroloji',
      '/dashboard': '/panel',
      '/auth': '/giris',
    },
    en: {
      '/': '/home',
      '/tarotokumasi': '/tarot-reading',
      '/numeroloji': '/numerology',
      '/dashboard': '/dashboard',
      '/auth': '/login',
    },
    sr: {
      '/': '/pocetna',
      '/tarotokumasi': '/tarot-citanje',
      '/numeroloji': '/numerologija',
      '/dashboard': '/panel',
      '/auth': '/prijava',
    },
  };

  return linkMappings[locale]?.[path] || path;
}
```

## PHASE 3: TESTING & VALIDATION (1 gün)

### 3.1 Automated Testing

#### 3.1.1 Redirect Testing

```typescript
// tests/redirects.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/test-redirects';

describe('Redirect Tests', () => {
  test('Turkish homepage redirect', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/tr',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(301);
    expect(res._getRedirectUrl()).toBe('/tr/anasayfa');
  });

  test('English tarot redirect', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/en/tarotokumasi',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(301);
    expect(res._getRedirectUrl()).toBe('/en/tarot-reading');
  });
});
```

### 3.2 Manual Testing Checklist

#### 3.2.1 URL Testing

- [ ] Tüm redirect'ler 301 status code döndürüyor
- [ ] Query parameters korunuyor
- [ ] Hash fragments korunuyor
- [ ] Redirect chain'ler sonsuz döngü oluşturmuyor

#### 3.2.2 SEO Testing

- [ ] Hreflang tag'ler doğru
- [ ] Canonical URL'ler self-referencing
- [ ] Sitemap yeni URL'leri içeriyor
- [ ] Robots.txt yeni URL'lere izin veriyor

#### 3.2.3 Functionality Testing

- [ ] Tüm sayfalar yükleniyor
- [ ] Navigation çalışıyor
- [ ] Language switcher çalışıyor
- [ ] Form submissions çalışıyor

## PHASE 4: MONITORING & OPTIMIZATION (Sürekli)

### 4.1 SEO Monitoring

#### 4.1.1 Google Search Console Setup

- Hreflang hatalarını izle
- Canonical URL sorunlarını kontrol et
- Index coverage raporlarını takip et
- Core Web Vitals metriklerini izle

#### 4.1.2 Analytics Setup

- URL yapısı değişikliklerini izle
- Bounce rate değişikliklerini takip et
- Conversion rate etkilerini analiz et
- User experience metriklerini izle

### 4.2 Performance Monitoring

#### 4.2.1 Core Web Vitals

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)

#### 4.2.2 Technical SEO

- Page load speed
- Mobile usability
- Structured data validation
- Schema markup testing

## 5. ROLLBACK PLAN

### 5.1 Emergency Rollback

#### 5.1.1 Hızlı Rollback (15 dakika)

```bash
# 1. Git rollback
git revert <commit-hash>

# 2. Deploy
npm run deploy

# 3. Cache clear
# CDN cache temizle
```

#### 5.1.2 Tam Rollback (30 dakika)

```bash
# 1. next.config.js'i eski haline döndür
# 2. Layout.tsx'i eski haline döndür
# 3. Sitemap.ts'i eski haline döndür
# 4. Navigation components'leri eski haline döndür
# 5. Deploy ve test
```

### 5.2 Rollback Triggers

- **Critical**: 404 hataları %5'ten fazla
- **High**: Core Web Vitals %20'den fazla kötüleşme
- **Medium**: Conversion rate %10'dan fazla düşüş
- **Low**: SEO ranking'lerde %5'ten fazla düşüş

## 6. SUCCESS METRICS

### 6.1 SEO Metrics

- **Hreflang Coverage**: %100
- **Canonical URL Accuracy**: %100
- **Sitemap Coverage**: %100
- **Index Coverage**: %95+

### 6.2 Performance Metrics

- **Page Load Speed**: <3 saniye
- **Core Web Vitals**: Tüm metrikler "Good"
- **Mobile Usability**: %100
- **Accessibility Score**: %90+

### 6.3 User Experience Metrics

- **Bounce Rate**: Mevcut seviyede veya daha iyi
- **Session Duration**: Mevcut seviyede veya daha iyi
- **Pages per Session**: Mevcut seviyede veya daha iyi
- **Conversion Rate**: Mevcut seviyede veya daha iyi

## 7. IMPLEMENTATION TIMELINE

### 7.1 Week 1: Foundation

- **Day 1-2**: next.config.js redirects ve rewrites
- **Day 3-4**: Layout.tsx hreflang implementation
- **Day 5**: Sitemap.ts güncellemesi

### 7.2 Week 2: Content Updates

- **Day 1-2**: Navigation components güncellemesi
- **Day 3-4**: Internal links güncellemesi
- **Day 5**: Language switcher güncellemesi

### 7.3 Week 3: Testing & Validation

- **Day 1-2**: Automated testing
- **Day 3-4**: Manual testing
- **Day 5**: Performance testing

### 7.4 Week 4: Monitoring & Optimization

- **Day 1-2**: SEO monitoring setup
- **Day 3-4**: Analytics setup
- **Day 5**: Performance optimization

## 8. RISK MITIGATION

### 8.1 Technical Risks

- **Risk**: Redirect loops
- **Mitigation**: Comprehensive testing, gradual rollout
- **Risk**: SEO ranking drops
- **Mitigation**: Proper canonical URLs, hreflang implementation

### 8.2 Business Risks

- **Risk**: User confusion
- **Mitigation**: Clear communication, gradual transition
- **Risk**: Revenue impact
- **Mitigation**: A/B testing, performance monitoring

### 8.3 Operational Risks

- **Risk**: Development delays
- **Mitigation**: Phased approach, buffer time
- **Risk**: Resource constraints
- **Mitigation**: Clear priorities, external support

Bu implementation plan, Büşbüşkiki projesinin SEO performansını optimize ederken
mevcut işlevselliği koruyacak şekilde tasarlanmıştır.
