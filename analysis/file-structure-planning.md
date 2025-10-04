# Dosya Yapısı Planlama Dokümanı

## 📁 Genel Yapı Stratejisi

### Temel Prensipler

1. **Modüler Yapı**: Her kategori için ayrı klasörler
2. **Çok Dilli Destek**: Her dil için ayrı routing
3. **SEO Optimized**: Static generation ve dynamic routing
4. **Performans**: Lazy loading ve code splitting
5. **Maintainability**: Temiz ve anlaşılır klasör yapısı

## 🏗 Next.js App Router Yapısı

### Ana Klasör Yapısı

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Çok dilli routing
│   │   ├── (main)/               # Ana sayfa grubu
│   │   │   ├── cards/            # EN kartları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── kartlar/          # TR kartları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── kartice/          # SR kartları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── readings/         # EN açılımları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── acilimlar/        # TR açılımları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── čitanja/          # SR açılımları
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── guides/           # EN rehberler
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── rehberler/        # TR rehberler
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── vodiči/           # SR rehberler
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── layout.tsx            # Locale layout
│   │   └── page.tsx              # Locale home page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.txt                # Robots.txt
│   └── manifest.json             # PWA manifest
├── components/                   # Shared components
│   ├── tarot/                    # Tarot-specific components
│   │   ├── TarotCardPage.tsx     # Main card page
│   │   ├── TarotCardHero.tsx     # Hero section
│   │   ├── TarotCardContent.tsx  # Content section
│   │   ├── TarotCardCTA.tsx      # CTA section
│   │   ├── TarotCardFAQ.tsx      # FAQ section
│   │   ├── TarotCardRelated.tsx  # Related cards
│   │   ├── TarotCardMeta.tsx     # Meta & share
│   │   └── TarotCardNavigation.tsx # Navigation
│   ├── ui/                       # UI components
│   │   ├── Breadcrumb.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── ReadingTime.tsx
│   │   └── LanguageSwitcher.tsx
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
├── lib/                          # Utility libraries
│   ├── tarot/                    # Tarot-specific utilities
│   │   ├── card-mappings.ts      # Card name mappings
│   │   ├── content-loader.ts     # Content loading
│   │   ├── slug-generator.ts     # Slug generation
│   │   ├── seo-generator.ts      # SEO meta generation
│   │   └── hreflang-generator.ts # Hreflang generation
│   ├── utils/                    # General utilities
│   │   ├── cn.ts                 # Class name utility
│   │   ├── date.ts               # Date utilities
│   │   └── validation.ts         # Validation utilities
│   └── constants/                # Constants
│       ├── routes.ts             # Route constants
│       ├── locales.ts            # Locale constants
│       └── seo.ts                # SEO constants
├── types/                        # TypeScript types
│   ├── tarot.ts                  # Tarot types
│   ├── seo.ts                    # SEO types
│   └── common.ts                 # Common types
├── data/                         # Static data
│   ├── cards/                    # Card data
│   │   ├── major-arcana.json     # Major Arcana data
│   │   ├── minor-arcana.json     # Minor Arcana data
│   │   └── card-metadata.json    # Card metadata
│   ├── spreads/                  # Spread data
│   │   ├── celtic-cross.json
│   │   ├── three-card.json
│   │   └── love-spread.json
│   └── guides/                   # Guide data
│       ├── tarot-basics.json
│       └── card-meanings.json
├── hooks/                        # Custom hooks
│   ├── useTarotCard.ts           # Tarot card hook
│   ├── useSEO.ts                 # SEO hook
│   └── useLocale.ts              # Locale hook
├── middleware.ts                 # Next.js middleware
└── tailwind.config.ts            # Tailwind config
```

## 📄 Dosya Detayları

### 1. App Router Sayfaları

#### Ana Kart Sayfası

```typescript
// src/app/[locale]/(main)/kartlar/[slug]/page.tsx
import { TarotCardPage } from '@/components/tarot/TarotCardPage';
import { getCardBySlug } from '@/lib/tarot/content-loader';
import { generateMetadata } from '@/lib/tarot/seo-generator';

export async function generateStaticParams() {
  const cards = await getAllCards();
  return cards.map(card => ({
    slug: card.slugs.tr
  }));
}

export async function generateMetadata({ params }) {
  return generateMetadata(params.slug, 'tr');
}

export default async function CardPage({ params }) {
  const card = await getCardBySlug(params.slug, 'tr');

  if (!card) {
    notFound();
  }

  return <TarotCardPage card={card} locale="tr" />;
}
```

#### Layout Dosyaları

```typescript
// src/app/[locale]/layout.tsx
import { LocaleProvider } from '@/providers/LocaleProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <LocaleProvider locale={params.locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
```

### 2. Component Yapısı

#### Tarot Card Page Component

```typescript
// src/components/tarot/TarotCardPage.tsx
import { TarotCardHero } from './TarotCardHero';
import { TarotCardMeta } from './TarotCardMeta';
import { TarotCardContent } from './TarotCardContent';
import { TarotCardCTA } from './TarotCardCTA';
import { TarotCardFAQ } from './TarotCardFAQ';
import { TarotCardRelated } from './TarotCardRelated';

interface TarotCardPageProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardPage({ card, locale }: TarotCardPageProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <TarotCardHero card={card} locale={locale} />
      <TarotCardMeta card={card} locale={locale} />
      <TarotCardContent card={card} locale={locale} />
      <TarotCardCTA card={card} locale={locale} />
      <TarotCardFAQ card={card} locale={locale} />
      <TarotCardRelated card={card} locale={locale} />
    </article>
  );
}
```

#### Hero Component

```typescript
// src/components/tarot/TarotCardHero.tsx
import Image from 'next/image';
import { TarotCard } from '@/types/tarot';

interface TarotCardHeroProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardHero({ card, locale }: TarotCardHeroProps) {
  return (
    <section className="mb-8">
      <div className="relative aspect-[9/16] w-64 mx-auto mb-6">
        <Image
          src={`/cards/${card.id}.jpg`}
          alt={card.names[locale]}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">
        {card.names[locale]}
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
        {card.content[locale].short_description}
      </p>
    </section>
  );
}
```

### 3. Library Yapısı

#### Content Loader

```typescript
// src/lib/tarot/content-loader.ts
import { TarotCard } from '@/types/tarot';
import { cardSlugMapping, reverseCardNameMapping } from './card-mappings';

export async function getCardBySlug(
  slug: string,
  locale: 'tr' | 'en' | 'sr'
): Promise<TarotCard | null> {
  const slugMapping = cardSlugMapping();
  const nameMapping = reverseCardNameMapping();

  // Slug'dan kart ID'sini bul
  const cardId = Object.keys(slugMapping).find(
    id => slugMapping[id][locale] === slug
  );

  if (!cardId) return null;

  // İçerik verilerini yükle
  const content = await loadCardContent(cardId, locale);

  return {
    id: cardId,
    names: nameMapping[cardId],
    slugs: slugMapping[cardId],
    content,
    seo: await generateCardSEO(cardId, locale),
  };
}

export async function getAllCards(): Promise<TarotCard[]> {
  const slugMapping = cardSlugMapping();
  const cards: TarotCard[] = [];

  for (const cardId of Object.keys(slugMapping)) {
    const card = await getCardBySlug(slugMapping[cardId].en, 'en');
    if (card) cards.push(card);
  }

  return cards;
}
```

#### SEO Generator

```typescript
// src/lib/tarot/seo-generator.ts
import { Metadata } from 'next';
import { TarotCard } from '@/types/tarot';

export async function generateMetadata(
  slug: string,
  locale: 'tr' | 'en' | 'sr'
): Promise<Metadata> {
  const card = await getCardBySlug(slug, locale);

  if (!card) return {};

  const hreflangUrls = getHreflangUrls(card.id);

  return {
    title: card.seo[locale].title,
    description: card.seo[locale].description,
    keywords: card.seo[locale].keywords,
    alternates: {
      canonical: hreflangUrls[locale],
      languages: hreflangUrls,
    },
    openGraph: {
      title: card.seo[locale].title,
      description: card.seo[locale].description,
      images: [`/cards/${card.id}.jpg`],
      locale: locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: card.seo[locale].title,
      description: card.seo[locale].description,
      images: [`/cards/${card.id}.jpg`],
    },
  };
}
```

### 4. Type Definitions

#### Tarot Types

```typescript
// src/types/tarot.ts
export interface TarotCard {
  id: string;
  names: {
    tr: string;
    en: string;
    sr: string;
  };
  slugs: {
    tr: string;
    en: string;
    sr: string;
  };
  content: {
    tr: CardContent;
    en: CardContent;
    sr: CardContent;
  };
  seo: {
    tr: SEOMeta;
    en: SEOMeta;
    sr: SEOMeta;
  };
}

export interface CardContent {
  short_description: string;
  meanings: {
    upright: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
    reversed: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
  };
  context: {
    mythology: string;
    celtic_cross: {
      future: string;
      hidden_influences: string;
    };
  };
  faq: string[];
  cta: {
    main: string;
    micro: string;
  };
  related: {
    cards: string[];
    guides: string[];
  };
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
}
```

### 5. Data Structure

#### Card Data

```json
// src/data/cards/major-arcana.json
{
  "the_fool": {
    "id": "the_fool",
    "names": {
      "tr": "Deli",
      "en": "The Fool",
      "sr": "Luda"
    },
    "content": {
      "tr": {
        "short_description": "Saf merak, cesur adımlar ve yeni döngülerin daveti.",
        "meanings": {
          "upright": {
            "general": "Özgürce yeni bir başlangıç...",
            "love": "Beklenmedik tanışmalar...",
            "career": "Yeni deneyimler...",
            "money": "Girişimsel fırsatlar...",
            "spiritual": "İçsel çocuğa dönme..."
          },
          "reversed": {
            "general": "Plansızlık, dikkatsizlik...",
            "love": "Bağlanmaktan kaçış...",
            "career": "Hazırlıksız atılımlar...",
            "money": "Düşünmeden harcama...",
            "spiritual": "Niyet eksikliği..."
          }
        },
        "context": {
          "mythology": "Majör Arkana'nın başlangıcı...",
          "celtic_cross": {
            "future": "Yeni bir yolculuğa adım atma.",
            "hidden_influences": "Macera ve özgürlük arzusu."
          }
        },
        "faq": [
          "Deli kartı ne anlama gelir?",
          "Deli ters geldiğinde ne demek?",
          "Yeni başlangıç nasıl desteklenir?"
        ],
        "cta": {
          "main": "Yeni Başlangıç Okuması — 20 dk",
          "micro": "1 karta hızlı rehber"
        },
        "related": {
          "cards": ["the_magician", "the_sun", "the_tower"],
          "guides": ["Yeni Başlangıçlar Rehberi"]
        }
      }
    }
  }
}
```

## 🚀 Implementation Adımları

### 1. Klasör Yapısını Oluşturma

```bash
# Ana klasörleri oluştur
mkdir -p src/app/[locale]/(main)/{cards,kartlar,kartice,readings,acilimlar,čitanja,guides,rehberler,vodiči}
mkdir -p src/components/tarot
mkdir -p src/lib/tarot
mkdir -p src/types
mkdir -p src/data/cards
mkdir -p src/hooks
```

### 2. Component'leri Oluşturma

```bash
# Tarot component'lerini oluştur
touch src/components/tarot/{TarotCardPage,TarotCardHero,TarotCardContent,TarotCardCTA,TarotCardFAQ,TarotCardRelated,TarotCardMeta,TarotCardNavigation}.tsx
```

### 3. Library Dosyalarını Oluşturma

```bash
# Tarot library dosyalarını oluştur
touch src/lib/tarot/{card-mappings,content-loader,slug-generator,seo-generator,hreflang-generator}.ts
```

### 4. Type Definition'ları Oluşturma

```bash
# Type dosyalarını oluştur
touch src/types/{tarot,seo,common}.ts
```

## 📊 Dosya Boyutları ve Performans

### Tahmini Dosya Boyutları

- **Component'ler**: ~50KB (toplam)
- **Library'ler**: ~100KB (toplam)
- **Type'lar**: ~20KB (toplam)
- **Data dosyaları**: ~2MB (78 kart için)
- **Toplam**: ~2.2MB

### Performans Optimizasyonları

1. **Lazy Loading**: Component'ler lazy load edilecek
2. **Code Splitting**: Route-based code splitting
3. **Static Generation**: Mümkün olduğunca static generation
4. **Image Optimization**: Next.js Image component kullanımı
5. **Bundle Analysis**: Bundle boyutlarını izleme

## 🎯 Sonuç ve Öneriler

### ✅ Avantajlar

1. **Modüler Yapı**: Her kategori ayrı klasörde
2. **Çok Dilli Destek**: Her dil için ayrı routing
3. **SEO Optimized**: Static generation ve meta tags
4. **Performans**: Lazy loading ve code splitting
5. **Maintainability**: Temiz ve anlaşılır yapı

### ⚠️ Dikkat Edilecekler

1. **Dosya Boyutu**: Data dosyaları büyük olacak
2. **Build Time**: Static generation süresi uzun olacak
3. **Memory Usage**: Tüm kartlar memory'de yüklenecek
4. **Git Management**: Büyük dosyalar için Git LFS gerekebilir

### 🚀 Sonraki Adımlar

1. **Klasör Yapısını Oluşturma**: Dosya yapısını implement etme
2. **Component Geliştirme**: Tarot component'lerini yazma
3. **Data Integration**: blogtarot.txt'den data çekme
4. **Testing**: Dosya yapısını test etme

---

**Sonuç**: Dosya yapısı planlama, projenin başarılı implementasyonu için kritik
öneme sahiptir ve yukarıdaki yapı kullanılarak scalable bir sistem
oluşturulabilir.

