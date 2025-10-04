# Component Yapısı Tasarım Dokümanı

## 🎨 Genel Tasarım Stratejisi

### Temel Prensipler

1. **Modüler Yapı**: Her bölüm ayrı component
2. **Yeniden Kullanılabilirlik**: Component'ler farklı sayfalarda kullanılabilir
3. **Responsive Design**: Mobil öncelikli tasarım
4. **Performance**: Lazy loading ve code splitting
5. **Accessibility**: WCAG 2.1 uyumlu
6. **SEO Optimized**: Structured data ve meta tags

## 🧩 Component Hiyerarşisi

### Ana Component Yapısı

```
TarotCardPage (Ana Container)
├── TarotCardHero (Hero Section)
├── TarotCardMeta (Meta & Share)
├── TarotCardContent (Ana İçerik)
│   ├── TarotCardMeanings (Anlamlar)
│   │   ├── TarotCardUpright (Düz Anlam)
│   │   └── TarotCardReversed (Ters Anlam)
│   ├── TarotCardSections (Alt Başlıklar)
│   │   ├── TarotCardLove (Aşk)
│   │   ├── TarotCardCareer (Kariyer)
│   │   ├── TarotCardMoney (Para)
│   │   └── TarotCardSpiritual (Ruhsal)
│   └── TarotCardContext (Derinleşme)
├── TarotCardCTA (Randevu & CTA)
├── TarotCardFAQ (Sık Sorulan Sorular)
├── TarotCardRelated (İlgili İçerikler)
└── TarotCardNavigation (Navigasyon)
```

## 📱 Responsive Design Breakpoints

### Tailwind CSS Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Layout Grid System

```css
/* Mobile (default) */
.container {
  @apply px-4 py-6;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    @apply px-6 py-8;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    @apply px-8 py-12 max-w-6xl mx-auto;
  }
}
```

## 🎯 Component Detayları

### 1. TarotCardPage (Ana Container)

```typescript
// src/components/tarot/TarotCardPage.tsx
import { TarotCard } from '@/types/tarot';
import { TarotCardHero } from './TarotCardHero';
import { TarotCardMeta } from './TarotCardMeta';
import { TarotCardContent } from './TarotCardContent';
import { TarotCardCTA } from './TarotCardCTA';
import { TarotCardFAQ } from './TarotCardFAQ';
import { TarotCardRelated } from './TarotCardRelated';
import { TarotCardNavigation } from './TarotCardNavigation';

interface TarotCardPageProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardPage({ card, locale }: TarotCardPageProps) {
  return (
    <article className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TarotCardHero card={card} locale={locale} />
        <TarotCardMeta card={card} locale={locale} />
        <TarotCardContent card={card} locale={locale} />
        <TarotCardCTA card={card} locale={locale} />
        <TarotCardFAQ card={card} locale={locale} />
        <TarotCardRelated card={card} locale={locale} />
        <TarotCardNavigation card={card} locale={locale} />
      </div>
    </article>
  );
}
```

### 2. TarotCardHero (Hero Section)

```typescript
// src/components/tarot/TarotCardHero.tsx
import Image from 'next/image';
import { TarotCard } from '@/types/tarot';
import { Badge } from '@/components/ui/Badge';

interface TarotCardHeroProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardHero({ card, locale }: TarotCardHeroProps) {
  const cardName = card.names[locale];
  const shortDescription = card.content[locale].short_description;

  return (
    <section className="text-center mb-12">
      {/* Kart Görseli */}
      <div className="relative aspect-[9/16] w-64 mx-auto mb-8 group">
        <Image
          src={`/cards/${card.id}.jpg`}
          alt={`${cardName} tarot kartı`}
          fill
          className="object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
          priority
          sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      </div>

      {/* Kart Adı */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
        {cardName}
      </h1>

      {/* Kısa Açıklama */}
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {shortDescription}
      </p>

      {/* Kart Kategorisi Badge */}
      <div className="mt-6">
        <Badge variant="secondary" className="text-sm px-4 py-2">
          {card.id.startsWith('the_') || card.id.includes('_') ?
            (locale === 'tr' ? 'Majör Arkana' :
             locale === 'en' ? 'Major Arcana' : 'Glavna Arkana') :
            (locale === 'tr' ? 'Minör Arkana' :
             locale === 'en' ? 'Minor Arcana' : 'Mala Arkana')
          }
        </Badge>
      </div>
    </section>
  );
}
```

### 3. TarotCardMeta (Meta & Share)

```typescript
// src/components/tarot/TarotCardMeta.tsx
import { TarotCard } from '@/types/tarot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ReadingTime } from '@/components/ui/ReadingTime';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface TarotCardMetaProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardMeta({ card, locale }: TarotCardMetaProps) {
  const cardName = card.names[locale];
  const readingTime = calculateReadingTime(card.content[locale]);

  const breadcrumbItems = [
    { label: locale === 'tr' ? 'Anasayfa' : locale === 'en' ? 'Home' : 'Početna', href: `/${locale}` },
    { label: locale === 'tr' ? 'Kartlar' : locale === 'en' ? 'Cards' : 'Kartice', href: `/${locale}/${getCategoryPath(locale)}` },
    { label: cardName, href: `/${locale}/${getCategoryPath(locale)}/${card.slugs[locale]}` }
  ];

  return (
    <section className="mb-8 border-b border-gray-200 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Meta Info */}
        <div className="flex items-center gap-6">
          <ReadingTime minutes={readingTime} />
          <LanguageSwitcher currentLocale={locale} cardSlug={card.slugs[locale]} />
        </div>
      </div>

      {/* Share Buttons */}
      <div className="mt-4">
        <ShareButtons
          title={`${cardName} - Tarot Kartı`}
          url={`https://busbuskimki.com/${locale}/${getCategoryPath(locale)}/${card.slugs[locale]}`}
          description={card.content[locale].short_description}
        />
      </div>
    </section>
  );
}

function getCategoryPath(locale: 'tr' | 'en' | 'sr'): string {
  const paths = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice'
  };
  return paths[locale];
}

function calculateReadingTime(content: any): number {
  // İçerik uzunluğuna göre okuma süresi hesaplama
  const wordCount = Object.values(content).join(' ').split(' ').length;
  return Math.ceil(wordCount / 200); // Dakikada 200 kelime
}
```

### 4. TarotCardContent (Ana İçerik)

```typescript
// src/components/tarot/TarotCardContent.tsx
import { TarotCard } from '@/types/tarot';
import { TarotCardMeanings } from './TarotCardMeanings';
import { TarotCardSections } from './TarotCardSections';
import { TarotCardContext } from './TarotCardContext';

interface TarotCardContentProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardContent({ card, locale }: TarotCardContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Ana İçerik - Sol Kolon */}
      <div className="lg:col-span-2 space-y-8">
        <TarotCardMeanings card={card} locale={locale} />
        <TarotCardSections card={card} locale={locale} />
      </div>

      {/* Yan İçerik - Sağ Kolon */}
      <div className="lg:col-span-1">
        <TarotCardContext card={card} locale={locale} />
      </div>
    </div>
  );
}
```

### 5. TarotCardMeanings (Anlamlar)

```typescript
// src/components/tarot/TarotCardMeanings.tsx
import { TarotCard } from '@/types/tarot';
import { TarotCardUpright } from './TarotCardUpright';
import { TarotCardReversed } from './TarotCardReversed';

interface TarotCardMeaningsProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardMeanings({ card, locale }: TarotCardMeaningsProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {locale === 'tr' ? 'Kart Anlamları' :
         locale === 'en' ? 'Card Meanings' : 'Značenja Karte'}
      </h2>

      <TarotCardUpright card={card} locale={locale} />
      <TarotCardReversed card={card} locale={locale} />
    </section>
  );
}
```

### 6. TarotCardUpright (Düz Anlam)

```typescript
// src/components/tarot/TarotCardUpright.tsx
import { TarotCard } from '@/types/tarot';
import { Badge } from '@/components/ui/Badge';

interface TarotCardUprightProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardUpright({ card, locale }: TarotCardUprightProps) {
  const meanings = card.content[locale].meanings.upright;

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="success" className="text-sm">
          {locale === 'tr' ? 'Düz' : locale === 'en' ? 'Upright' : 'Pravo'}
        </Badge>
        <h3 className="text-xl font-semibold text-gray-900">
          {locale === 'tr' ? 'Pozitif Anlam' :
           locale === 'en' ? 'Positive Meaning' : 'Pozitivno Značenje'}
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {meanings.general}
        </p>

        {/* Anahtar Kelimeler */}
        <div className="flex flex-wrap gap-2">
          {extractKeywords(meanings.general).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function extractKeywords(text: string): string[] {
  // Basit keyword extraction
  const keywords = text.split(/[.,!?]/)
    .map(sentence => sentence.trim().split(' ')[0])
    .filter(word => word.length > 3)
    .slice(0, 5);

  return keywords;
}
```

### 7. TarotCardSections (Alt Başlıklar)

```typescript
// src/components/tarot/TarotCardSections.tsx
import { TarotCard } from '@/types/tarot';
import { TarotCardLove } from './TarotCardLove';
import { TarotCardCareer } from './TarotCardCareer';
import { TarotCardMoney } from './TarotCardMoney';
import { TarotCardSpiritual } from './TarotCardSpiritual';

interface TarotCardSectionsProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardSections({ card, locale }: TarotCardSectionsProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {locale === 'tr' ? 'Hayat Alanları' :
         locale === 'en' ? 'Life Areas' : 'Životne Oblasti'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TarotCardLove card={card} locale={locale} />
        <TarotCardCareer card={card} locale={locale} />
        <TarotCardMoney card={card} locale={locale} />
        <TarotCardSpiritual card={card} locale={locale} />
      </div>
    </section>
  );
}
```

### 8. TarotCardCTA (Randevu & CTA)

```typescript
// src/components/tarot/TarotCardCTA.tsx
import { TarotCard } from '@/types/tarot';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface TarotCardCTAProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardCTA({ card, locale }: TarotCardCTAProps) {
  const cta = card.content[locale].cta;

  return (
    <section className="my-12">
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            {locale === 'tr' ? 'Kişisel Tarot Okuması Al' :
             locale === 'en' ? 'Get Personal Tarot Reading' : 'Dobijte Lično Tarot Čitanje'}
          </h3>

          <p className="text-lg mb-6 opacity-90">
            {locale === 'tr' ? 'Bu kart hakkında daha detaylı bilgi almak için profesyonel bir okuma yaptırın.' :
             locale === 'en' ? 'Get detailed insights about this card with a professional reading.' :
             'Dobijte detaljne uvid o ovoj karti sa profesionalnim čitanjem.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => window.open('/booking', '_blank')}
            >
              {cta.main}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => window.open('/quick-reading', '_blank')}
            >
              {cta.micro}
            </Button>
          </div>

          <p className="text-sm mt-4 opacity-75">
            {locale === 'tr' ? '30 dakika • 150 TL' :
             locale === 'en' ? '30 minutes • $25' :
             '30 minuta • €20'}
          </p>
        </div>
      </Card>
    </section>
  );
}
```

### 9. TarotCardFAQ (Sık Sorulan Sorular)

```typescript
// src/components/tarot/TarotCardFAQ.tsx
import { TarotCard } from '@/types/tarot';
import { Accordion } from '@/components/ui/Accordion';

interface TarotCardFAQProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardFAQ({ card, locale }: TarotCardFAQProps) {
  const faqs = card.content[locale].faq;

  const faqItems = faqs.map((question, index) => ({
    id: `faq-${index}`,
    question,
    answer: generateFAQAnswer(card, locale, index)
  }));

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {locale === 'tr' ? 'Sık Sorulan Sorular' :
         locale === 'en' ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
      </h2>

      <Accordion items={faqItems} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}

function generateFAQAnswer(card: TarotCard, locale: string, index: number): string {
  // FAQ cevaplarını kart içeriğine göre oluşturma
  const meanings = card.content[locale].meanings;

  switch (index) {
    case 0: // Kart ne anlama gelir?
      return meanings.upright.general;
    case 1: // Ters geldiğinde ne demek?
      return meanings.reversed.general;
    case 2: // Nasıl desteklenir?
      return card.content[locale].context.mythology;
    default:
      return meanings.upright.general;
  }
}
```

### 10. TarotCardRelated (İlgili İçerikler)

```typescript
// src/components/tarot/TarotCardRelated.tsx
import { TarotCard } from '@/types/tarot';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface TarotCardRelatedProps {
  card: TarotCard;
  locale: 'tr' | 'en' | 'sr';
}

export function TarotCardRelated({ card, locale }: TarotCardRelatedProps) {
  const related = card.content[locale].related;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {locale === 'tr' ? 'İlgili İçerikler' :
         locale === 'en' ? 'Related Content' : 'Povezani Sadržaj'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benzer Kartlar */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {locale === 'tr' ? 'Benzer Kartlar' :
             locale === 'en' ? 'Similar Cards' : 'Slične Karte'}
          </h3>
          <div className="space-y-3">
            {related.cards.slice(0, 3).map((cardId, index) => (
              <Link
                key={index}
                href={`/${locale}/${getCategoryPath(locale)}/${cardId}`}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">
                  {getCardName(cardId, locale)}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* İlgili Rehberler */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {locale === 'tr' ? 'Rehberler' :
             locale === 'en' ? 'Guides' : 'Vodiči'}
          </h3>
          <div className="space-y-3">
            {related.guides.map((guide, index) => (
              <Link
                key={index}
                href={`/${locale}/${getGuidePath(locale)}/${createSlug(guide)}`}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{guide}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function getCategoryPath(locale: string): string {
  const paths = { tr: 'kartlar', en: 'cards', sr: 'kartice' };
  return paths[locale];
}

function getGuidePath(locale: string): string {
  const paths = { tr: 'rehberler', en: 'guides', sr: 'vodiči' };
  return paths[locale];
}

function getCardName(cardId: string, locale: string): string {
  // Kart ID'sinden ismi getirme
  return cardId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function createSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}
```

## 🎨 Styling ve Theme

### CSS Variables

```css
/* src/styles/globals.css */
:root {
  /* Colors */
  --color-primary: 139 92 246; /* purple-500 */
  --color-secondary: 99 102 241; /* indigo-500 */
  --color-accent: 236 72 153; /* pink-500 */
  --color-success: 34 197 94; /* green-500 */
  --color-warning: 245 158 11; /* amber-500 */
  --color-error: 239 68 68; /* red-500 */

  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

### Component Styling

```css
/* Tarot Card Specific Styles */
.tarot-card {
  @apply bg-white rounded-xl shadow-lg border border-gray-200;
}

.tarot-card-hero {
  @apply text-center py-12;
}

.tarot-card-content {
  @apply prose prose-lg max-w-none;
}

.tarot-card-cta {
  @apply bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8;
}

.tarot-card-faq {
  @apply bg-gray-50 rounded-xl p-6;
}
```

## 🚀 Performance Optimizations

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const TarotCardFAQ = lazy(() => import('./TarotCardFAQ'));
const TarotCardRelated = lazy(() => import('./TarotCardRelated'));

export function TarotCardPage({ card, locale }: TarotCardPageProps) {
  return (
    <article className="min-h-screen">
      <TarotCardHero card={card} locale={locale} />
      <TarotCardMeta card={card} locale={locale} />
      <TarotCardContent card={card} locale={locale} />
      <TarotCardCTA card={card} locale={locale} />

      <Suspense fallback={<div>Loading...</div>}>
        <TarotCardFAQ card={card} locale={locale} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <TarotCardRelated card={card} locale={locale} />
      </Suspense>
    </article>
  );
}
```

### Image Optimization

```typescript
import Image from 'next/image';

export function TarotCardHero({ card, locale }: TarotCardHeroProps) {
  return (
    <div className="relative aspect-[9/16] w-64 mx-auto">
      <Image
        src={`/cards/${card.id}.jpg`}
        alt={`${card.names[locale]} tarot kartı`}
        fill
        className="object-cover rounded-xl"
        sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
}
```

## 📊 Sonuç ve Öneriler

### ✅ Avantajlar

1. **Modüler Yapı**: Her bölüm ayrı component
2. **Responsive Design**: Mobil öncelikli tasarım
3. **Performance**: Lazy loading ve optimizasyonlar
4. **Accessibility**: WCAG 2.1 uyumlu
5. **SEO Optimized**: Structured data ve meta tags
6. **Maintainable**: Temiz ve anlaşılır kod yapısı

### ⚠️ Dikkat Edilecekler

1. **Component Boyutu**: Büyük component'ler bundle boyutunu artırabilir
2. **Re-rendering**: Gereksiz re-render'ları önleme
3. **Memory Usage**: Büyük component'ler memory kullanımını artırabilir
4. **Testing**: Component'lerin test edilmesi

### 🚀 Sonraki Adımlar

1. **Component Geliştirme**: Component'leri implement etme
2. **Styling**: Tailwind CSS ile styling
3. **Testing**: Component testleri yazma
4. **Optimization**: Performance optimizasyonları

---

**Sonuç**: Component yapısı tasarımı, kullanıcı deneyimi ve performans açısından
kritik öneme sahiptir ve yukarıdaki yapı kullanılarak scalable bir sistem
oluşturulabilir.
