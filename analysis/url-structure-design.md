# URL Yapısı Tasarım Dokümanı

## 🌐 Genel URL Stratejisi

### Temel Prensipler

1. **SEO Dostu**: Arama motorları için optimize
2. **Kullanıcı Dostu**: Anlaşılır ve hatırlanabilir
3. **Çok Dilli**: Her dil için ayrı URL yapısı
4. **Hiyerarşik**: Mantıklı kategori yapısı
5. **Tutarlı**: Tüm sayfalar için standart

## 📋 URL Şablonları

### Ana Kategoriler

```
EN: /en/{category}/{slug}
TR: /tr/{kategori}/{slug}
SR: /sr/{kategorija}/{slug}
```

### Tarot Kartları

```
EN: /en/cards/{card-slug}
TR: /tr/kartlar/{kart-slug}
SR: /sr/kartice/{kart-slug}
```

### Tarot Açılımları

```
EN: /en/readings/{reading-slug}
TR: /tr/acilimlar/{acilim-slug}
SR: /sr/čitanja/{čitanje-slug}
```

### Rehberler

```
EN: /en/guides/{guide-slug}
TR: /tr/rehberler/{rehber-slug}
SR: /sr/vodiči/{vodič-slug}
```

## 🗂 Detaylı URL Mapping

### Major Arcana (22 kart)

| Kart               | EN Slug                        | TR Slug                     | SR Slug                      |
| ------------------ | ------------------------------ | --------------------------- | ---------------------------- |
| The Fool           | `/en/cards/the-fool`           | `/tr/kartlar/deli`          | `/sr/kartice/luda`           |
| The Magician       | `/en/cards/the-magician`       | `/tr/kartlar/buyucu`        | `/sr/kartice/carobnjak`      |
| The High Priestess | `/en/cards/the-high-priestess` | `/tr/kartlar/basrahibe`     | `/sr/kartice/prvosvestenica` |
| The Empress        | `/en/cards/the-empress`        | `/tr/kartlar/imparatorice`  | `/sr/kartice/carica`         |
| The Emperor        | `/en/cards/the-emperor`        | `/tr/kartlar/imparator`     | `/sr/kartice/car`            |
| The Hierophant     | `/en/cards/the-hierophant`     | `/tr/kartlar/aziz`          | `/sr/kartice/svestenik`      |
| The Lovers         | `/en/cards/the-lovers`         | `/tr/kartlar/asiklar`       | `/sr/kartice/ljubavnici`     |
| The Chariot        | `/en/cards/the-chariot`        | `/tr/kartlar/savas-arabasi` | `/sr/kartice/kola`           |
| Strength           | `/en/cards/strength`           | `/tr/kartlar/guc`           | `/sr/kartice/snaga`          |
| The Hermit         | `/en/cards/the-hermit`         | `/tr/kartlar/ermis`         | `/sr/kartice/pustinjak`      |
| Wheel of Fortune   | `/en/cards/wheel-of-fortune`   | `/tr/kartlar/kader-carki`   | `/sr/kartice/tocak-srece`    |
| Justice            | `/en/cards/justice`            | `/tr/kartlar/adalet`        | `/sr/kartice/pravda`         |
| The Hanged Man     | `/en/cards/the-hanged-man`     | `/tr/kartlar/asilan-adam`   | `/sr/kartice/obeseni-covek`  |
| Death              | `/en/cards/death`              | `/tr/kartlar/olum`          | `/sr/kartice/smrt`           |
| Temperance         | `/en/cards/temperance`         | `/tr/kartlar/denge`         | `/sr/kartice/umerenost`      |
| The Devil          | `/en/cards/the-devil`          | `/tr/kartlar/seytan`        | `/sr/kartice/davo`           |
| The Tower          | `/en/cards/the-tower`          | `/tr/kartlar/kule`          | `/sr/kartice/kula`           |
| The Star           | `/en/cards/the-star`           | `/tr/kartlar/yildiz`        | `/sr/kartice/zvezda`         |
| The Moon           | `/en/cards/the-moon`           | `/tr/kartlar/ay`            | `/sr/kartice/mesec`          |
| The Sun            | `/en/cards/the-sun`            | `/tr/kartlar/gunes`         | `/sr/kartice/sunce`          |
| Judgement          | `/en/cards/judgement`          | `/tr/kartlar/yargi`         | `/sr/kartice/sud`            |
| The World          | `/en/cards/the-world`          | `/tr/kartlar/dunya`         | `/sr/kartice/svet`           |

### Minor Arcana - Kupalar (14 kart)

| Kart           | EN Slug                    | TR Slug                         | SR Slug                       |
| -------------- | -------------------------- | ------------------------------- | ----------------------------- |
| Ace of Cups    | `/en/cards/ace-of-cups`    | `/tr/kartlar/kupalar-asi`       | `/sr/kartice/as-pehara`       |
| Two of Cups    | `/en/cards/two-of-cups`    | `/tr/kartlar/kupalar-ikilisi`   | `/sr/kartice/dvojka-pehara`   |
| Three of Cups  | `/en/cards/three-of-cups`  | `/tr/kartlar/kupalar-uclusu`    | `/sr/kartice/trojka-pehara`   |
| Four of Cups   | `/en/cards/four-of-cups`   | `/tr/kartlar/kupalar-dortlusu`  | `/sr/kartice/cetvorka-pehara` |
| Five of Cups   | `/en/cards/five-of-cups`   | `/tr/kartlar/kupalar-beslisi`   | `/sr/kartice/petica-pehara`   |
| Six of Cups    | `/en/cards/six-of-cups`    | `/tr/kartlar/kupalar-altilisi`  | `/sr/kartice/sestica-pehara`  |
| Seven of Cups  | `/en/cards/seven-of-cups`  | `/tr/kartlar/kupalar-yedilisi`  | `/sr/kartice/sedmica-pehara`  |
| Eight of Cups  | `/en/cards/eight-of-cups`  | `/tr/kartlar/kupalar-sekizlisi` | `/sr/kartice/osmica-pehara`   |
| Nine of Cups   | `/en/cards/nine-of-cups`   | `/tr/kartlar/kupalar-dokuzlusu` | `/sr/kartice/devetka-pehara`  |
| Ten of Cups    | `/en/cards/ten-of-cups`    | `/tr/kartlar/kupalar-onlusu`    | `/sr/kartice/desetka-pehara`  |
| Page of Cups   | `/en/cards/page-of-cups`   | `/tr/kartlar/kupalar-usagi`     | `/sr/kartice/paz-pehara`      |
| Knight of Cups | `/en/cards/knight-of-cups` | `/tr/kartlar/kupalar-sovalyesi` | `/sr/kartice/vitez-pehara`    |
| Queen of Cups  | `/en/cards/queen-of-cups`  | `/tr/kartlar/kupalar-kralicesi` | `/sr/kartice/kraljica-pehara` |
| King of Cups   | `/en/cards/king-of-cups`   | `/tr/kartlar/kupalar-krali`     | `/sr/kartice/kralj-pehara`    |

### Minor Arcana - Kılıçlar (14 kart)

| Kart             | EN Slug                      | TR Slug                          | SR Slug                       |
| ---------------- | ---------------------------- | -------------------------------- | ----------------------------- |
| Ace of Swords    | `/en/cards/ace-of-swords`    | `/tr/kartlar/kiliclar-asi`       | `/sr/kartice/as-maceva`       |
| Two of Swords    | `/en/cards/two-of-swords`    | `/tr/kartlar/kiliclar-ikilisi`   | `/sr/kartice/dvojka-maceva`   |
| Three of Swords  | `/en/cards/three-of-swords`  | `/tr/kartlar/kiliclar-uclusu`    | `/sr/kartice/trojka-maceva`   |
| Four of Swords   | `/en/cards/four-of-swords`   | `/tr/kartlar/kiliclar-dortlusu`  | `/sr/kartice/cetvorka-maceva` |
| Five of Swords   | `/en/cards/five-of-swords`   | `/tr/kartlar/kiliclar-beslisi`   | `/sr/kartice/petica-maceva`   |
| Six of Swords    | `/en/cards/six-of-swords`    | `/tr/kartlar/kiliclar-altilisi`  | `/sr/kartice/sestica-maceva`  |
| Seven of Swords  | `/en/cards/seven-of-swords`  | `/tr/kartlar/kiliclar-yedilisi`  | `/sr/kartice/sedmica-maceva`  |
| Eight of Swords  | `/en/cards/eight-of-swords`  | `/tr/kartlar/kiliclar-sekizlisi` | `/sr/kartice/osmica-maceva`   |
| Nine of Swords   | `/en/cards/nine-of-swords`   | `/tr/kartlar/kiliclar-dokuzlusu` | `/sr/kartice/devetka-maceva`  |
| Ten of Swords    | `/en/cards/ten-of-swords`    | `/tr/kartlar/kiliclar-onlusu`    | `/sr/kartice/desetka-maceva`  |
| Page of Swords   | `/en/cards/page-of-swords`   | `/tr/kartlar/kiliclar-usagi`     | `/sr/kartice/paz-maceva`      |
| Knight of Swords | `/en/cards/knight-of-swords` | `/tr/kartlar/kiliclar-sovalyesi` | `/sr/kartice/vitez-maceva`    |
| Queen of Swords  | `/en/cards/queen-of-swords`  | `/tr/kartlar/kiliclar-kralicesi` | `/sr/kartice/kraljica-maceva` |
| King of Swords   | `/en/cards/king-of-swords`   | `/tr/kartlar/kiliclar-krali`     | `/sr/kartice/kralj-maceva`    |

### Minor Arcana - Asalar (14 kart)

| Kart            | EN Slug                     | TR Slug                        | SR Slug                        |
| --------------- | --------------------------- | ------------------------------ | ------------------------------ |
| Ace of Wands    | `/en/cards/ace-of-wands`    | `/tr/kartlar/asalar-asi`       | `/sr/kartice/as-stapova`       |
| Two of Wands    | `/en/cards/two-of-wands`    | `/tr/kartlar/asalar-ikilisi`   | `/sr/kartice/dvojka-stapova`   |
| Three of Wands  | `/en/cards/three-of-wands`  | `/tr/kartlar/asalar-uclusu`    | `/sr/kartice/trojka-stapova`   |
| Four of Wands   | `/en/cards/four-of-wands`   | `/tr/kartlar/asalar-dortlusu`  | `/sr/kartice/cetvorka-stapova` |
| Five of Wands   | `/en/cards/five-of-wands`   | `/tr/kartlar/asalar-beslisi`   | `/sr/kartice/petica-stapova`   |
| Six of Wands    | `/en/cards/six-of-wands`    | `/tr/kartlar/asalar-altilisi`  | `/sr/kartice/sestica-stapova`  |
| Seven of Wands  | `/en/cards/seven-of-wands`  | `/tr/kartlar/asalar-yedilisi`  | `/sr/kartice/sedmica-stapova`  |
| Eight of Wands  | `/en/cards/eight-of-wands`  | `/tr/kartlar/asalar-sekizlisi` | `/sr/kartice/osmica-stapova`   |
| Nine of Wands   | `/en/cards/nine-of-wands`   | `/tr/kartlar/asalar-dokuzlusu` | `/sr/kartice/devetka-stapova`  |
| Ten of Wands    | `/en/cards/ten-of-wands`    | `/tr/kartlar/asalar-onlusu`    | `/sr/kartice/desetka-stapova`  |
| Page of Wands   | `/en/cards/page-of-wands`   | `/tr/kartlar/asalar-usagi`     | `/sr/kartice/paz-stapova`      |
| Knight of Wands | `/en/cards/knight-of-wands` | `/tr/kartlar/asalar-sovalyesi` | `/sr/kartice/vitez-stapova`    |
| Queen of Wands  | `/en/cards/queen-of-wands`  | `/tr/kartlar/asalar-kralicesi` | `/sr/kartice/kraljica-stapova` |
| King of Wands   | `/en/cards/king-of-wands`   | `/tr/kartlar/asalar-krali`     | `/sr/kartice/kralj-stapova`    |

### Minor Arcana - Tılsımlar (14 kart)

| Kart                | EN Slug                         | TR Slug                           | SR Slug                         |
| ------------------- | ------------------------------- | --------------------------------- | ------------------------------- |
| Ace of Pentacles    | `/en/cards/ace-of-pentacles`    | `/tr/kartlar/tilsimlar-asi`       | `/sr/kartice/as-pentakla`       |
| Two of Pentacles    | `/en/cards/two-of-pentacles`    | `/tr/kartlar/tilsimlar-ikilisi`   | `/sr/kartice/dvojka-pentakla`   |
| Three of Pentacles  | `/en/cards/three-of-pentacles`  | `/tr/kartlar/tilsimlar-uclusu`    | `/sr/kartice/trojka-pentakla`   |
| Four of Pentacles   | `/en/cards/four-of-pentacles`   | `/tr/kartlar/tilsimlar-dortlusu`  | `/sr/kartice/cetvorka-pentakla` |
| Five of Pentacles   | `/en/cards/five-of-pentacles`   | `/tr/kartlar/tilsimlar-beslisi`   | `/sr/kartice/petica-pentakla`   |
| Six of Pentacles    | `/en/cards/six-of-pentacles`    | `/tr/kartlar/tilsimlar-altilisi`  | `/sr/kartice/sestica-pentakla`  |
| Seven of Pentacles  | `/en/cards/seven-of-pentacles`  | `/tr/kartlar/tilsimlar-yedilisi`  | `/sr/kartice/sedmica-pentakla`  |
| Eight of Pentacles  | `/en/cards/eight-of-pentacles`  | `/tr/kartlar/tilsimlar-sekizlisi` | `/sr/kartice/osmica-pentakla`   |
| Nine of Pentacles   | `/en/cards/nine-of-pentacles`   | `/tr/kartlar/tilsimlar-dokuzlusu` | `/sr/kartice/devetka-pentakla`  |
| Ten of Pentacles    | `/en/cards/ten-of-pentacles`    | `/tr/kartlar/tilsimlar-onlusu`    | `/sr/kartice/desetka-pentakla`  |
| Page of Pentacles   | `/en/cards/page-of-pentacles`   | `/tr/kartlar/tilsimlar-usagi`     | `/sr/kartice/paz-pentakla`      |
| Knight of Pentacles | `/en/cards/knight-of-pentacles` | `/tr/kartlar/tilsimlar-sovalyesi` | `/sr/kartice/vitez-pentakla`    |
| Queen of Pentacles  | `/en/cards/queen-of-pentacles`  | `/tr/kartlar/tilsimlar-kralicesi` | `/sr/kartice/kraljica-pentakla` |
| King of Pentacles   | `/en/cards/king-of-pentacles`   | `/tr/kartlar/tilsimlar-krali`     | `/sr/kartice/kralj-pentakla`    |

## 🏗 Next.js Dosya Yapısı

### App Router Yapısı

```
src/app/
├── [locale]/
│   ├── (main)/
│   │   ├── cards/              # EN kartları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── kartlar/            # TR kartları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── kartice/            # SR kartları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── readings/           # EN açılımları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── acilimlar/          # TR açılımları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── čitanja/            # SR açılımları
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── guides/             # EN rehberler
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── rehberler/          # TR rehberler
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── vodiči/             # SR rehberler
│   │       └── [slug]/
│   │           └── page.tsx
│   └── layout.tsx
├── globals.css
└── layout.tsx
```

### Middleware Yapısı

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Locale detection
  const pathnameIsMissingLocale = ['tr', 'en', 'sr'].every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Default locale redirect
    return NextResponse.redirect(new URL(`/tr${pathname}`, request.url));
  }

  // URL validation
  const validPaths = [
    '/cards/',
    '/kartlar/',
    '/kartice/',
    '/readings/',
    '/acilimlar/',
    '/čitanja/',
    '/guides/',
    '/rehberler/',
    '/vodiči/',
  ];

  const isValidPath = validPaths.some(path => pathname.includes(path));

  if (!isValidPath && pathname.includes('/[locale]/')) {
    return NextResponse.redirect(new URL('/tr', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## 🔗 Hreflang Yapısı

### Hreflang Etiketleri

```html
<!-- Her kart sayfasında -->
<link
  rel="alternate"
  hreflang="en"
  href="https://busbuskimki.com/en/cards/the-fool"
/>
<link
  rel="alternate"
  hreflang="tr"
  href="https://busbuskimki.com/tr/kartlar/deli"
/>
<link
  rel="alternate"
  hreflang="sr"
  href="https://busbuskimki.com/sr/kartice/luda"
/>
<link
  rel="alternate"
  hreflang="x-default"
  href="https://busbuskimki.com/en/cards/the-fool"
/>
```

### Canonical URL'ler

```html
<!-- Her sayfada canonical -->
<link rel="canonical" href="https://busbuskimki.com/tr/kartlar/deli" />
```

## 📊 URL Validation

### Geçerli URL Örnekleri

```
✅ /tr/kartlar/deli
✅ /en/cards/the-fool
✅ /sr/kartice/luda
✅ /tr/acilimlar/ask-acilimi
✅ /en/guides/tarot-basics
```

### Geçersiz URL Örnekleri

```
❌ /kartlar/deli (locale eksik)
❌ /tr/cards/the-fool (kategori uyumsuz)
❌ /en/kartlar/deli (kategori uyumsuz)
❌ /tr/kartlar/invalid-slug (geçersiz slug)
```

## 🎯 SEO Optimizasyonu

### URL SEO Best Practices

1. **Kısa ve Açıklayıcı**: `/tr/kartlar/deli` ✅
2. **Tire Kullanımı**: `/en/cards/the-fool` ✅
3. **Küçük Harf**: `/sr/kartice/luda` ✅
4. **Türkçe Karakterler**: `/tr/kartlar/buyucu` ✅
5. **Hiyerarşik Yapı**: `/tr/kartlar/` → `/tr/kartlar/deli` ✅

### Sitemap Yapısı

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://busbuskimki.com/tr/kartlar/deli</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://busbuskimki.com/en/cards/the-fool"/>
    <xhtml:link rel="alternate" hreflang="sr" href="https://busbuskimki.com/sr/kartice/luda"/>
  </url>
</urlset>
```

## 🚀 Implementation Adımları

### 1. Slug Generation Script

```typescript
// scripts/generate-slugs.ts
export const generateAllSlugs = () => {
  const cards = getAllCards();
  const slugs = {};

  cards.forEach(card => {
    slugs[card.id] = {
      tr: createTurkishSlug(card.names.tr),
      en: createEnglishSlug(card.names.en),
      sr: createSerbianSlug(card.names.sr),
    };
  });

  return slugs;
};
```

### 2. URL Validation

```typescript
// lib/url-validation.ts
export const validateUrl = (pathname: string): boolean => {
  const patterns = [
    /^\/[tr|en|sr]\/(kartlar|cards|kartice)\/[a-z0-9-]+$/,
    /^\/[tr|en|sr]\/(acilimlar|readings|čitanja)\/[a-z0-9-]+$/,
    /^\/[tr|en|sr]\/(rehberler|guides|vodiči)\/[a-z0-9-]+$/,
  ];

  return patterns.some(pattern => pattern.test(pathname));
};
```

### 3. Dynamic Routing

```typescript
// app/[locale]/(main)/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  const cards = await getAllCards();
  const params = [];

  for (const card of cards) {
    params.push(
      { locale: 'tr', category: 'kartlar', slug: card.slugs.tr },
      { locale: 'en', category: 'cards', slug: card.slugs.en },
      { locale: 'sr', category: 'kartice', slug: card.slugs.sr }
    );
  }

  return params;
}
```

## 📊 Sonuç ve Öneriler

### ✅ Avantajlar

1. **SEO Optimized**: Arama motorları için optimize
2. **User Friendly**: Kullanıcılar için anlaşılır
3. **Scalable**: Yeni içerikler kolayca eklenebilir
4. **Multilingual**: Çok dilli yapı
5. **Consistent**: Tutarlı URL yapısı

### ⚠️ Dikkat Edilecekler

1. **Slug Conflicts**: Aynı slug'ların farklı dillerde çakışmaması
2. **Character Encoding**: Türkçe ve Sırpça karakterler
3. **URL Length**: Çok uzun URL'ler SEO'yu olumsuz etkileyebilir
4. **Redirects**: Eski URL'lerden yeni URL'lere yönlendirme

### 🎯 Sonraki Adımlar

1. **Slug Generation**: Otomatik slug oluşturma
2. **URL Testing**: Tüm URL'lerin çalışırlığını test etme
3. **Sitemap Generation**: XML sitemap oluşturma
4. **Analytics Setup**: URL performansını takip etme

---

**Sonuç**: URL yapısı tasarımı SEO projesinin başarısı için kritik öneme
sahiptir ve yukarıdaki şablonlar kullanılarak implementasyon yapılabilir.

