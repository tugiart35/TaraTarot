# SEO Implementation Guide - busbuskimki Projesi

Bu rehber, busbuskimki projesinde SEO implementasyonunun nasıl yapıldığını adım
adım açıklar.

## 📋 Genel Yaklaşım

### 1. SEO Generator Sistemi

Her sayfa türü için ayrı SEO generator dosyası oluşturulur:

- `src/lib/seo/page-seo-generator.ts` - Ana sayfa için
- `src/lib/seo/tarot-seo-generator.ts` - Tarot sayfası için
- `src/lib/seo/numerology-seo-generator.ts` - Numeroloji sayfası için

### 2. SEO Data Yapısı

Her sayfa için SEO bilgileri şu yapıda organize edilir:

```typescript
const pageSeoData: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
    ogImage: string;
    twitterImage: string;
    breadcrumbs: Array<{ name: string; url: string }>;
    faq: Array<{ question: string; answer: string }>;
  }
> = {
  tr: {
    /* Türkçe SEO bilgileri */
  },
  en: {
    /* İngilizce SEO bilgileri */
  },
  sr: {
    /* Sırpça SEO bilgileri */
  },
};
```

## 🚀 Numeroloji Sayfası SEO Implementation Adımları

### Adım 1: SEO Generator Dosyası Oluşturma

**Dosya:** `src/lib/seo/numerology-seo-generator.ts`

```typescript
import { Metadata } from 'next';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './schema-markup';

// SEO data for numerology page
const numerologySeoData: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
    ogImage: string;
    twitterImage: string;
    breadcrumbs: Array<{ name: string; url: string }>;
    faq: Array<{ question: string; answer: string }>;
  }
> = {
  tr: {
    title: 'Ücretsiz Numeroloji Analizi - Yaşam Yolu Hesaplama | BüşBüşKimKi',
    description:
      'Doğum tarihiniz ve isminizle numeroloji analizi yapın. Yaşam yolu, kader sayısı ve kişilik özelliklerinizi keşfedin. 9 farklı numeroloji hesaplaması.',
    keywords: [
      'numeroloji analizi',
      'yaşam yolu hesaplama',
      'kader sayısı',
      'kişilik analizi',
      'numeroloji kalkülatörü',
      'ücretsiz numeroloji',
      'numeroloji danışmanlığı',
      'kişisel rehberlik',
      'numeroloji okuma',
    ],
    canonicalPath: '/tr/numeroloji',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Anasayfa', url: `${baseUrl}/tr/anasayfa` },
      { name: 'Numeroloji', url: `${baseUrl}/tr/numeroloji` },
    ],
    faq: [
      {
        question: 'Numeroloji nedir?',
        answer:
          'Numeroloji, sayıların insan hayatındaki etkisini inceleyen bir bilimdir.',
      },
      {
        question: 'Numeroloji analizi nasıl yapılır?',
        answer:
          'Doğum tarihiniz ve isminizdeki sayılar analiz edilerek kişilik özellikleriniz belirlenir.',
      },
    ],
  },
  en: {
    title: 'Free Numerology Analysis - Life Path Calculation | BüşBüşKimKi',
    description:
      'Discover your life path, destiny number and personality traits with free numerology analysis. 9 different numerology calculations, detailed analyses and personal guidance.',
    keywords: [
      'numerology analysis',
      'life path calculation',
      'destiny number',
      'personality analysis',
      'numerology calculator',
      'free numerology',
      'numerology consultation',
      'personal guidance',
      'numerology reading',
    ],
    canonicalPath: '/en/numerology',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Home', url: `${baseUrl}/en/home` },
      { name: 'Numerology', url: `${baseUrl}/en/numerology` },
    ],
    faq: [
      {
        question: 'What is numerology?',
        answer:
          'Numerology is the study of numbers and their influence on human life.',
      },
      {
        question: 'How is numerology analysis done?',
        answer:
          'Your birth date and name numbers are analyzed to determine your personality traits.',
      },
    ],
  },
  sr: {
    title:
      'Besplatna Numerološka Analiza - Izračun Životnog Puta | BüşBüşKimKi',
    description:
      'Otkrijte svoj životni put, broj sudbine i osobine ličnosti sa besplatnom numerološkom analizom. 9 različitih numeroloških izračuna, detaljne analize i lično vođstvo.',
    keywords: [
      'numerološka analiza',
      'izračun životnog puta',
      'broj sudbine',
      'analiza ličnosti',
      'numerološki kalkulator',
      'besplatna numerologija',
      'numerološke konsultacije',
      'lično vođstvo',
      'numerološko čitanje',
    ],
    canonicalPath: '/sr/numerologija',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Početna', url: `${baseUrl}/sr/pocetna` },
      { name: 'Numerologija', url: `${baseUrl}/sr/numerologija` },
    ],
    faq: [
      {
        question: 'Šta je numerologija?',
        answer:
          'Numerologija je proučavanje brojeva i njihovog uticaja na ljudski život.',
      },
      {
        question: 'Kako se radi numerološka analiza?',
        answer:
          'Analiziraju se brojevi vašeg datuma rođenja i imena da bi se odredile vaše osobine ličnosti.',
      },
    ],
  },
};

// Metadata generation function
export function generateNumerologyPageMetadata(locale: string): Metadata {
  const data = numerologySeoData[locale] || numerologySeoData.tr;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${data.canonicalPath}`,
      languages: {
        tr: `${baseUrl}/tr/numeroloji`,
        en: `${baseUrl}/en/numerology`,
        sr: `${baseUrl}/sr/numerologija`,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${baseUrl}${data.canonicalPath}`,
      siteName: 'BüşBüşKimKi',
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.twitterImage],
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

// Structured data generation function
export function generateNumerologyPageStructuredData(locale: string) {
  const data = numerologySeoData[locale] || numerologySeoData.tr;

  return {
    organization: generateOrganizationSchema(),
    website: generateWebSiteSchema(),
    service: generateServiceSchema(),
    breadcrumb: generateBreadcrumbSchema(data.breadcrumbs),
    faq: generateFAQSchema(),
  };
}
```

### Adım 2: Layout Dosyasını Güncelleme

**Dosya:** `src/app/[locale]/(main)/numeroloji/layout.tsx`

```typescript
import { Metadata } from 'next';
import { generateNumerologyPageMetadata, generateNumerologyPageStructuredData } from '@/lib/seo/numerology-seo-generator';

// SEO Metadata generation for Numerology page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Use the new numerology SEO generator
  return generateNumerologyPageMetadata(locale);
}

export default async function NumerologyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Generate structured data
  const structuredData = generateNumerologyPageStructuredData(locale);

  return (
    <>
      {/* Organization Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />

      {/* Website Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />

      {/* Service Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.service),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />

      {/* FAQ Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.faq),
        }}
      />

      {children}
    </>
  );
}
```

### Adım 3: SEO Test Etme

**Test Komutları:**

```bash
# Türkçe sayfa testi
curl -s "http://localhost:3000/tr/numeroloji" | grep -E "title.*Numeroloji" | head -1

# İngilizce sayfa testi
curl -s "http://localhost:3000/en/numerology" | grep -E "title.*Numerology" | head -1

# Sırpça sayfa testi
curl -s "http://localhost:3000/sr/numerologija" | grep -E "title.*Numerologija" | head -1
```

## 📝 Diğer Sayfalar İçin Aynı Yaklaşım

### 1. Dashboard Sayfası

- **SEO Generator:** `src/lib/seo/dashboard-seo-generator.ts`
- **Layout:** `src/app/[locale]/dashboard/layout.tsx`
- **URL'ler:** `/tr/panel`, `/en/dashboard`, `/sr/panel`

### 2. Auth Sayfası

- **SEO Generator:** `src/lib/seo/auth-seo-generator.ts`
- **Layout:** `src/app/[locale]/auth/layout.tsx`
- **URL'ler:** `/tr/giris`, `/en/login`, `/sr/prijava`

### 3. Legal Sayfalar

- **SEO Generator:** `src/lib/seo/legal-seo-generator.ts`
- **Layout:** `src/app/[locale]/(main)/yasal/layout.tsx`
- **URL'ler:** `/tr/yasal/*`, `/en/legal/*`, `/sr/pravni/*`

## 🔧 SEO Generator Template

Yeni sayfa türü için SEO generator oluştururken bu template'i kullanın:

```typescript
// src/lib/seo/[page-type]-seo-generator.ts
import { Metadata } from 'next';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from './schema-markup';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

// SEO data for [page-type] page
const [pageType]SeoData: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogImage: string;
  twitterImage: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  faq: Array<{ question: string; answer: string }>;
}> = {
  tr: {
    title: "[Turkish Title] | BüşBüşKimKi",
    description: "[Turkish Description]",
    keywords: ["keyword1", "keyword2", "keyword3"],
    canonicalPath: "/tr/[seo-friendly-path]",
    ogImage: "/assets/seo/og-image-[page-type].jpg",
    twitterImage: "/assets/seo/twitter-image-[page-type].jpg",
    breadcrumbs: [
      { name: "Anasayfa", url: `${baseUrl}/tr/anasayfa` },
      { name: "[Page Name]", url: `${baseUrl}/tr/[seo-friendly-path]` }
    ],
    faq: [
      { question: "Soru 1?", answer: "Cevap 1" },
      { question: "Soru 2?", answer: "Cevap 2" }
    ]
  },
  en: {
    title: "[English Title] | BüşBüşKimKi",
    description: "[English Description]",
    keywords: ["keyword1", "keyword2", "keyword3"],
    canonicalPath: "/en/[seo-friendly-path]",
    ogImage: "/assets/seo/og-image-[page-type].jpg",
    twitterImage: "/assets/seo/twitter-image-[page-type].jpg",
    breadcrumbs: [
      { name: "Home", url: `${baseUrl}/en/home` },
      { name: "[Page Name]", url: `${baseUrl}/en/[seo-friendly-path]` }
    ],
    faq: [
      { question: "Question 1?", answer: "Answer 1" },
      { question: "Question 2?", answer: "Answer 2" }
    ]
  },
  sr: {
    title: "[Serbian Title] | BüşBüşKimKi",
    description: "[Serbian Description]",
    keywords: ["keyword1", "keyword2", "keyword3"],
    canonicalPath: "/sr/[seo-friendly-path]",
    ogImage: "/assets/seo/og-image-[page-type].jpg",
    twitterImage: "/assets/seo/twitter-image-[page-type].jpg",
    breadcrumbs: [
      { name: "Početna", url: `${baseUrl}/sr/pocetna` },
      { name: "[Page Name]", url: `${baseUrl}/sr/[seo-friendly-path]` }
    ],
    faq: [
      { question: "Pitanje 1?", answer: "Odgovor 1" },
      { question: "Pitanje 2?", answer: "Odgovor 2" }
    ]
  }
};

export function generate[PageType]PageMetadata(locale: string): Metadata {
  const data = [pageType]SeoData[locale] || [pageType]SeoData.tr;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${data.canonicalPath}`,
      languages: {
        tr: `${baseUrl}/tr/[seo-friendly-path]`,
        en: `${baseUrl}/en/[seo-friendly-path]`,
        sr: `${baseUrl}/sr/[seo-friendly-path]`,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${baseUrl}${data.canonicalPath}`,
      siteName: "BüşBüşKimKi",
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "website",
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.twitterImage],
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

export function generate[PageType]PageStructuredData(locale: string) {
  const data = [pageType]SeoData[locale] || [pageType]SeoData.tr;

  return {
    organization: generateOrganizationSchema(),
    website: generateWebSiteSchema(),
    service: generateServiceSchema(),
    breadcrumb: generateBreadcrumbSchema(data.breadcrumbs),
    faq: generateFAQSchema(),
  };
}
```

## 🎯 SEO Checklist

Her yeni sayfa için şu adımları takip edin:

### ✅ Dosya Oluşturma

- [ ] SEO generator dosyası oluştur (`src/lib/seo/[page-type]-seo-generator.ts`)
- [ ] Layout dosyasını güncelle (`src/app/[locale]/[path]/layout.tsx`)
- [ ] Import'ları ekle

### ✅ SEO Data Hazırlama

- [ ] 3 dilde title yaz
- [ ] 3 dilde description yaz (150-160 karakter)
- [ ] 3 dilde keywords listesi hazırla
- [ ] 3 dilde canonical path belirle
- [ ] OG ve Twitter image path'leri belirle
- [ ] 3 dilde breadcrumb yapısı oluştur
- [ ] 3 dilde FAQ soruları hazırla

### ✅ Test Etme

- [ ] Build kontrolü (`npm run build`)
- [ ] 3 dilde sayfa yükleme testi
- [ ] SEO elementleri kontrolü (title, description, canonical, hreflang)
- [ ] Structured data kontrolü

### ✅ Sitemap ve Robots.txt

- [ ] Sitemap'e yeni URL'leri ekle
- [ ] Robots.txt'e yeni URL'leri ekle

## 🚀 Sonuç

Bu yaklaşım sayesinde:

- ✅ Her sayfa türü için ayrı SEO generator
- ✅ 3 dilde tutarlı SEO implementasyonu
- ✅ Structured data ile zengin sonuçlar
- ✅ Test edilebilir SEO yapısı
- ✅ Sürdürülebilir kod organizasyonu

Numeroloji sayfası bu yaklaşımla başarıyla implement edildi ve test edildi! 🎉
