# Data Model: Tarot Kart Bilgi Sayfaları

**Feature**: Tarot Kart Bilgi Sayfaları (Blog/SEO)  
**Date**: 2025-01-27  
**Status**: Complete

## Entity Definitions

### 1. TarotCard

**Purpose**: Tarot kartını temsil eder

```typescript
interface TarotCard {
  id: string; // UUID, primary key
  englishName: string; // "The Fool", "The High Priestess"
  turkishName: string; // "Joker", "Yüksek Rahibe"
  serbianName: string; // "Joker", "Visoka Svestenica"
  arcanaType: 'major' | 'minor'; // Major Arcana (22) vs Minor Arcana (56)
  suit?: 'cups' | 'swords' | 'wands' | 'pentacles'; // Minor Arcana için
  number?: number; // Minor Arcana için (1-14)
  imageUrl: string; // Kart görseli URL'si
  slug: {
    tr: string; // "joker", "yuksek-rahibe"
    en: string; // "the-fool", "the-high-priestess"
    sr: string; // "joker", "visoka-svestenica"
  };
  createdAt: Date;
  updatedAt: Date;
}
```

**Validation Rules**:

- `englishName`: Required, unique, max 50 chars
- `turkishName`: Required, unique, max 50 chars
- `serbianName`: Required, unique, max 50 chars
- `arcanaType`: Required, enum validation
- `suit`: Required if `arcanaType === 'minor'`
- `number`: Required if `arcanaType === 'minor'`, range 1-14
- `imageUrl`: Required, valid URL format
- `slug`: Required, URL-safe, unique per locale

### 2. CardContent

**Purpose**: Kart içeriğini temsil eder (çok dilli)

```typescript
interface CardContent {
  id: string; // UUID, primary key
  cardId: string; // Foreign key to TarotCard
  locale: 'tr' | 'en' | 'sr'; // Dil kodu
  uprightMeaning: string; // Düz anlam (500-800 karakter)
  reversedMeaning: string; // Ters anlam (500-800 karakter)
  loveInterpretation: string; // Aşk yorumu (200-400 karakter)
  careerInterpretation: string; // Kariyer yorumu (200-400 karakter)
  moneyInterpretation: string; // Para yorumu (200-400 karakter)
  spiritualInterpretation: string; // Ruhsal yorumu (200-400 karakter)
  story: string; // Hikaye/Mitoloji (300-600 karakter)
  keywords: string[]; // Anahtar kelimeler (5-10 adet)
  readingTime: number; // Okuma süresi (dakika)
  createdAt: Date;
  updatedAt: Date;
}
```

**Validation Rules**:

- `cardId`: Required, valid UUID, foreign key constraint
- `locale`: Required, enum validation
- `uprightMeaning`: Required, min 500, max 800 chars
- `reversedMeaning`: Required, min 500, max 800 chars
- `loveInterpretation`: Required, min 200, max 400 chars
- `careerInterpretation`: Required, min 200, max 400 chars
- `moneyInterpretation`: Required, min 200, max 400 chars
- `spiritualInterpretation`: Required, min 200, max 400 chars
- `story`: Required, min 300, max 600 chars
- `keywords`: Required, array of 5-10 strings
- `readingTime`: Required, calculated from content length

### 3. CardSEO

**Purpose**: Kart SEO metadata (çok dilli)

```typescript
interface CardSEO {
  id: string; // UUID, primary key
  cardId: string; // Foreign key to TarotCard
  locale: 'tr' | 'en' | 'sr'; // Dil kodu
  metaTitle: string; // SEO title (50-60 karakter)
  metaDescription: string; // Meta description (120-155 karakter)
  canonicalUrl: string; // Canonical URL
  ogImage: string; // Open Graph image URL
  twitterImage: string; // Twitter Card image URL
  keywords: string[]; // SEO anahtar kelimeler
  faq: FAQItem[]; // FAQ şeması için
  createdAt: Date;
  updatedAt: Date;
}

interface FAQItem {
  question: string; // Soru (max 100 karakter)
  answer: string; // Cevap (max 300 karakter)
}
```

**Validation Rules**:

- `cardId`: Required, valid UUID, foreign key constraint
- `locale`: Required, enum validation
- `metaTitle`: Required, 50-60 chars, unique per locale
- `metaDescription`: Required, 120-155 chars
- `canonicalUrl`: Required, valid URL format
- `ogImage`: Required, valid URL format
- `twitterImage`: Required, valid URL format
- `keywords`: Required, array of 5-10 strings
- `faq`: Required, array of 3-6 FAQItem objects

### 4. CardPage

**Purpose**: Dinamik sayfa route

```typescript
interface CardPage {
  locale: 'tr' | 'en' | 'sr'; // Dil kodu
  slug: string; // URL slug
  cardId: string; // Foreign key to TarotCard
  path: string; // Full path (e.g., "/tr/kartlar/joker")
  isActive: boolean; // Sayfa aktif mi
  lastModified: Date; // Son değişiklik tarihi
}
```

**Validation Rules**:

- `locale`: Required, enum validation
- `slug`: Required, URL-safe, unique per locale
- `cardId`: Required, valid UUID, foreign key constraint
- `path`: Required, valid URL path format
- `isActive`: Required, boolean
- `lastModified`: Required, valid date

## Relationships

### TarotCard ↔ CardContent

- **Type**: One-to-Many
- **Constraint**: Her kart için 3 dilde içerik (TR, EN, SR)
- **Cascade**: Card silinirse içerikler de silinir

### TarotCard ↔ CardSEO

- **Type**: One-to-Many
- **Constraint**: Her kart için 3 dilde SEO metadata
- **Cascade**: Card silinirse SEO metadata da silinir

### TarotCard ↔ CardPage

- **Type**: One-to-Many
- **Constraint**: Her kart için 3 dilde sayfa route
- **Cascade**: Card silinirse sayfa route da silinir

## Database Schema

### Supabase Tables

```sql
-- Tarot Cards Table
CREATE TABLE tarot_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  english_name VARCHAR(50) NOT NULL UNIQUE,
  turkish_name VARCHAR(50) NOT NULL UNIQUE,
  serbian_name VARCHAR(50) NOT NULL UNIQUE,
  arcana_type VARCHAR(10) NOT NULL CHECK (arcana_type IN ('major', 'minor')),
  suit VARCHAR(20) CHECK (suit IN ('cups', 'swords', 'wands', 'pentacles')),
  number INTEGER CHECK (number >= 1 AND number <= 14),
  image_url TEXT NOT NULL,
  slug_tr VARCHAR(100) NOT NULL UNIQUE,
  slug_en VARCHAR(100) NOT NULL UNIQUE,
  slug_sr VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Card Content Table
CREATE TABLE card_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES tarot_cards(id) ON DELETE CASCADE,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('tr', 'en', 'sr')),
  upright_meaning TEXT NOT NULL CHECK (LENGTH(upright_meaning) BETWEEN 500 AND 800),
  reversed_meaning TEXT NOT NULL CHECK (LENGTH(reversed_meaning) BETWEEN 500 AND 800),
  love_interpretation TEXT NOT NULL CHECK (LENGTH(love_interpretation) BETWEEN 200 AND 400),
  career_interpretation TEXT NOT NULL CHECK (LENGTH(career_interpretation) BETWEEN 200 AND 400),
  money_interpretation TEXT NOT NULL CHECK (LENGTH(money_interpretation) BETWEEN 200 AND 400),
  spiritual_interpretation TEXT NOT NULL CHECK (LENGTH(spiritual_interpretation) BETWEEN 200 AND 400),
  story TEXT NOT NULL CHECK (LENGTH(story) BETWEEN 300 AND 600),
  keywords TEXT[] NOT NULL CHECK (array_length(keywords, 1) BETWEEN 5 AND 10),
  reading_time INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id, locale)
);

-- Card SEO Table
CREATE TABLE card_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES tarot_cards(id) ON DELETE CASCADE,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('tr', 'en', 'sr')),
  meta_title VARCHAR(60) NOT NULL CHECK (LENGTH(meta_title) BETWEEN 50 AND 60),
  meta_description VARCHAR(155) NOT NULL CHECK (LENGTH(meta_description) BETWEEN 120 AND 155),
  canonical_url TEXT NOT NULL,
  og_image TEXT NOT NULL,
  twitter_image TEXT NOT NULL,
  keywords TEXT[] NOT NULL CHECK (array_length(keywords, 1) BETWEEN 5 AND 10),
  faq JSONB NOT NULL CHECK (jsonb_array_length(faq) BETWEEN 3 AND 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id, locale)
);

-- Card Pages Table
CREATE TABLE card_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES tarot_cards(id) ON DELETE CASCADE,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('tr', 'en', 'sr')),
  slug VARCHAR(100) NOT NULL,
  path TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(locale, slug)
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_tarot_cards_arcana_type ON tarot_cards(arcana_type);
CREATE INDEX idx_tarot_cards_suit ON tarot_cards(suit);
CREATE INDEX idx_card_content_card_id ON card_content(card_id);
CREATE INDEX idx_card_content_locale ON card_content(locale);
CREATE INDEX idx_card_seo_card_id ON card_seo(card_id);
CREATE INDEX idx_card_seo_locale ON card_seo(locale);
CREATE INDEX idx_card_pages_locale_slug ON card_pages(locale, slug);
CREATE INDEX idx_card_pages_path ON card_pages(path);
CREATE INDEX idx_card_pages_active ON card_pages(is_active);
```

## Data Validation

### TypeScript Validation (Zod)

```typescript
import { z } from 'zod';

export const TarotCardSchema = z.object({
  id: z.string().uuid(),
  englishName: z.string().min(1).max(50),
  turkishName: z.string().min(1).max(50),
  serbianName: z.string().min(1).max(50),
  arcanaType: z.enum(['major', 'minor']),
  suit: z.enum(['cups', 'swords', 'wands', 'pentacles']).optional(),
  number: z.number().int().min(1).max(14).optional(),
  imageUrl: z.string().url(),
  slug: z.object({
    tr: z.string().min(1).max(100),
    en: z.string().min(1).max(100),
    sr: z.string().min(1).max(100),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CardContentSchema = z.object({
  id: z.string().uuid(),
  cardId: z.string().uuid(),
  locale: z.enum(['tr', 'en', 'sr']),
  uprightMeaning: z.string().min(500).max(800),
  reversedMeaning: z.string().min(500).max(800),
  loveInterpretation: z.string().min(200).max(400),
  careerInterpretation: z.string().min(200).max(400),
  moneyInterpretation: z.string().min(200).max(400),
  spiritualInterpretation: z.string().min(200).max(400),
  story: z.string().min(300).max(600),
  keywords: z.array(z.string()).min(5).max(10),
  readingTime: z.number().int().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});
```

## State Management

### Card Data State

```typescript
interface CardState {
  cards: TarotCard[];
  currentCard: TarotCard | null;
  currentContent: CardContent | null;
  currentSEO: CardSEO | null;
  loading: boolean;
  error: string | null;
}

interface CardActions {
  loadCard: (slug: string, locale: string) => Promise<void>;
  loadRelatedCards: (cardId: string, arcanaType: string) => Promise<void>;
  updateCard: (cardId: string, updates: Partial<TarotCard>) => Promise<void>;
  clearError: () => void;
}
```

### URL State Management

```typescript
interface URLState {
  locale: 'tr' | 'en' | 'sr';
  slug: string;
  path: string;
  canonicalUrl: string;
  alternateUrls: {
    tr: string;
    en: string;
    sr: string;
  };
}
```

## Data Flow

### 1. Card Loading Flow

```
User visits /tr/kartlar/joker
↓
Next.js App Router matches [locale]/kartlar/[slug]
↓
Page component calls loadCard('joker', 'tr')
↓
API fetches card data from Supabase
↓
Component renders with card data
```

### 2. SEO Data Flow

```
Card data loaded
↓
SEO metadata generated
↓
Meta tags injected
↓
Structured data added
↓
Page rendered with SEO
```

### 3. Related Cards Flow

```
Current card identified
↓
Arcana type determined
↓
Related cards queried
↓
Cards filtered and limited
↓
Related cards displayed
```

## Performance Considerations

### Database Optimization

- Indexes on frequently queried fields
- Connection pooling
- Query optimization
- Caching strategies

### Data Caching

- Redis for frequently accessed cards
- CDN for images
- Browser caching for static data
- ISR (Incremental Static Regeneration) for popular cards

### Data Loading

- Lazy loading for images
- Code splitting for components
- Prefetching for related cards
- Optimistic updates

## Security Considerations

### Data Validation

- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Access Control

- RLS policies for data access
- Authentication requirements
- Rate limiting
- Content moderation

---

**Data Model Status**: ✅ Complete  
**Ready for**: Contract generation
