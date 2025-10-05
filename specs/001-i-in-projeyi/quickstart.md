# Quickstart: Tarot Kart Bilgi Sayfaları

**Feature**: Tarot Kart Bilgi Sayfaları (Blog/SEO)  
**Date**: 2025-01-27  
**Status**: Complete

## Overview

Bu quickstart guide, tarot kart bilgi sayfaları feature'ının nasıl test
edileceğini ve kullanılacağını gösterir. MVP olarak The Fool ve The High
Priestess kartları 3 dilde (TR/EN/SR) test edilecektir.

## Prerequisites

- Node.js 18+ installed
- Supabase project configured
- Environment variables set (.env.local)
- Database migrations applied

## Setup Instructions

### 1. Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Database Setup

```sql
-- Run the following SQL in Supabase SQL Editor
-- This creates the required tables for tarot cards

-- Create tarot_cards table
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

-- Create card_content table
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

-- Create card_seo table
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

-- Create card_pages table
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

### 3. Sample Data Insertion

```sql
-- Insert The Fool card
INSERT INTO tarot_cards (
  english_name, turkish_name, serbian_name, arcana_type, image_url,
  slug_tr, slug_en, slug_sr
) VALUES (
  'The Fool', 'Joker', 'Joker', 'major',
  '/images/cards/the-fool.jpg',
  'joker', 'the-fool', 'joker'
);

-- Insert The High Priestess card
INSERT INTO tarot_cards (
  english_name, turkish_name, serbian_name, arcana_type, image_url,
  slug_tr, slug_en, slug_sr
) VALUES (
  'The High Priestess', 'Yüksek Rahibe', 'Visoka Svestenica', 'major',
  '/images/cards/the-high-priestess.jpg',
  'yuksek-rahibe', 'the-high-priestess', 'visoka-svestenica'
);

-- Insert Turkish content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'tr',
  'Joker kartı yeni başlangıçları, masumiyeti ve potansiyeli temsil eder. Bu kart, hayatta yeni bir yolculuğa çıkmaya hazır olduğunuzu gösterir. Geçmişin yüklerinden kurtulup, geleceğe umutla bakmanın zamanı gelmiştir.',
  'Ters Joker kartı dikkatsizlik, risk alma ve sorumsuzluk anlamına gelir. Aceleci kararlar vermekten kaçınmalı, daha dikkatli olmalısınız. Yeni başlangıçlar için henüz hazır olmayabilirsiniz.',
  'Aşk hayatınızda yeni bir sayfa açılabilir. Bekar iseniz, yeni bir ilişki başlayabilir. Mevcut ilişkinizde taze bir başlangıç yapabilirsiniz.',
  'Kariyerinizde yeni fırsatlar çıkabilir. Yeni bir iş, proje veya kariyer değişikliği söz konusu olabilir. Cesur adımlar atmanın zamanı gelmiştir.',
  'Para konusunda yeni yatırımlar yapabilirsiniz. Ancak dikkatli olmalı, riskleri hesaplamalısınız. Yeni gelir kaynakları açılabilir.',
  'Ruhsal yolculuğunuzda yeni bir aşamaya geçiyorsunuz. İç sesinizi dinlemek ve sezgilerinize güvenmek önemlidir.',
  'Joker, tarot destesindeki en özel kartlardan biridir. Sıfır numaralı bu kart, hem başlangıcı hem de sonu temsil eder. Mitolojide, Joker genellikle masum bir gezgin olarak tasvir edilir.',
  ARRAY['yeni başlangıç', 'masumiyet', 'potansiyel', 'cesaret', 'umut', 'özgürlük', 'macera', 'keşif'],
  5
);

-- Insert English content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'en',
  'The Fool card represents new beginnings, innocence, and potential. This card shows that you are ready to embark on a new journey in life. It is time to break free from the burdens of the past and look to the future with hope.',
  'Reversed, The Fool card means carelessness, risk-taking, and irresponsibility. You should avoid making hasty decisions and be more careful. You may not be ready for new beginnings yet.',
  'A new chapter may open in your love life. If you are single, a new relationship may begin. In your current relationship, you can make a fresh start.',
  'New opportunities may arise in your career. A new job, project, or career change may be in question. It is time to take bold steps.',
  'You can make new investments in money. However, you should be careful and calculate the risks. New sources of income may open up.',
  'You are moving to a new stage in your spiritual journey. It is important to listen to your inner voice and trust your intuition.',
  'The Fool is one of the most special cards in the tarot deck. This card numbered zero represents both the beginning and the end. In mythology, The Fool is often depicted as an innocent traveler.',
  ARRAY['new beginning', 'innocence', 'potential', 'courage', 'hope', 'freedom', 'adventure', 'discovery'],
  5
);

-- Insert Serbian content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'sr',
  'Joker karta predstavlja nove početke, nevinost i potencijal. Ova karta pokazuje da ste spremni da krenete na novo putovanje u životu. Vreme je da se oslobodite tereta prošlosti i pogledate u budućnost sa nadom.',
  'Obrnuto, Joker karta znači nepažnju, preuzimanje rizika i neodgovornost. Trebalo bi da izbegavate donošenje ishitrenih odluka i budete oprezniji. Možda još uvek niste spremni za nove početke.',
  'Novo poglavlje se može otvoriti u vašem ljubavnom životu. Ako ste slobodni, nova veza može početi. U vašoj trenutnoj vezi, možete napraviti svež početak.',
  'Nove prilike se mogu pojaviti u vašoj karijeri. Novi posao, projekat ili promena karijere može biti u pitanju. Vreme je da napravite hrabre korake.',
  'Možete napraviti nove investicije u novcu. Međutim, trebalo bi da budete oprezni i izračunate rizike. Novi izvori prihoda se mogu otvoriti.',
  'Prelazite na novu fazu u svom duhovnom putovanju. Važno je da slušate svoj unutrašnji glas i verujete svojoj intuiciji.',
  'Joker je jedna od najposebnijih karata u tarot špilu. Ova karta broj nula predstavlja i početak i kraj. U mitologiji, Joker se često prikazuje kao nevin putnik.',
  ARRAY['novi početak', 'nevinost', 'potencijal', 'hrabrost', 'nada', 'sloboda', 'avantura', 'otkriće'],
  5
);
```

## Testing Scenarios

### 1. Basic Card Page Access

**Test**: Visit card pages in all three languages

```bash
# Turkish
curl -X GET "http://localhost:3000/tr/kartlar/joker"

# English
curl -X GET "http://localhost:3000/en/cards/the-fool"

# Serbian
curl -X GET "http://localhost:3000/sr/kartice/joker"
```

**Expected Results**:

- Status: 200 OK
- Content in correct language
- All required sections present (Hero, Meanings, Keywords, Story, CTA, FAQ,
  Related Cards)

### 2. SEO Validation

**Test**: Check SEO elements on each page

```bash
# Check meta tags
curl -s "http://localhost:3000/tr/kartlar/joker" | grep -E "<title>|<meta name=\"description\"|<link rel=\"canonical\""

# Check hreflang tags
curl -s "http://localhost:3000/tr/kartlar/joker" | grep -E "hreflang"
```

**Expected Results**:

- Title: "[Kart Adı] — Anlamı, Aşk & Kariyer | BüşBüşKimKi"
- Meta description: 120-155 characters
- Canonical URL: Self-referencing
- Hreflang tags: All three languages linked

### 3. API Endpoint Testing

**Test**: Test API endpoints directly

```bash
# Get card by slug
curl -X GET "http://localhost:3000/api/cards/tr/joker"

# Get card list
curl -X GET "http://localhost:3000/api/cards/tr"

# Get related cards
curl -X GET "http://localhost:3000/api/cards/{cardId}/related?locale=tr"
```

**Expected Results**:

- JSON response with proper structure
- All required fields present
- Data validation passes

### 4. Responsive Design Testing

**Test**: Check mobile responsiveness

```bash
# Use browser dev tools or mobile testing
# Test on different screen sizes:
# - Mobile: 375px width
# - Tablet: 768px width
# - Desktop: 1200px width
```

**Expected Results**:

- Images scale properly (4:5 aspect ratio)
- Text remains readable
- CTA buttons accessible
- Navigation works on touch

### 5. Performance Testing

**Test**: Check Core Web Vitals

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000/tr/kartlar/joker --output=html --output-path=./lighthouse-report.html

# Check bundle size
npm run build
npm run analyze
```

**Expected Results**:

- Lighthouse SEO score ≥90
  - LCP <2.5s
  - FID <100ms
  - CLS <0.1

### 6. Content Quality Testing

**Test**: Validate content requirements

```bash
# Check content length constraints
curl -s "http://localhost:3000/api/cards/tr/joker" | jq '.data.content | {
  upright_meaning_length: (.upright_meaning | length),
  reversed_meaning_length: (.reversed_meaning | length),
  love_interpretation_length: (.love_interpretation | length),
  keywords_count: (.keywords | length)
}'
```

**Expected Results**:

- Upright meaning: 500-800 characters
- Reversed meaning: 500-800 characters
- Love interpretation: 200-400 characters
- Keywords: 5-10 items

### 7. Navigation Testing

**Test**: Test language switching

```bash
# Start on Turkish page
curl -s "http://localhost:3000/tr/kartlar/joker" | grep -E "href.*en/cards/the-fool|href.*sr/kartice/joker"

# Start on English page
curl -s "http://localhost:3000/en/cards/the-fool" | grep -E "href.*tr/kartlar/joker|href.*sr/kartice/joker"
```

**Expected Results**:

- Language switcher present
- Correct URLs for each language
- No broken links

### 8. CTA Functionality Testing

**Test**: Test call-to-action buttons

```bash
# Check CTA buttons are present
curl -s "http://localhost:3000/tr/kartlar/joker" | grep -E "Profesyonel Okuma Al|Randevu Al"

# Test CTA links
curl -I "http://localhost:3000/tr/kartlar/joker" | grep -E "Location.*tarot-okuma|Location.*busbuskimki.online"
```

**Expected Results**:

- "Profesyonel Okuma Al" button present
- "Randevu Al" button present
- Buttons link to correct destinations

## Troubleshooting

### Common Issues

1. **404 Errors on Card Pages**
   - Check database has sample data
   - Verify URL structure matches slugs
   - Check Next.js routing configuration

2. **Missing Translations**
   - Verify all three locales have content
   - Check next-intl configuration
   - Validate translation keys

3. **SEO Issues**
   - Check meta tags are generated
   - Verify structured data is valid
   - Test hreflang implementation

4. **Performance Issues**
   - Check image optimization
   - Verify lazy loading works
   - Test bundle size

### Debug Commands

```bash
# Check database connection
npm run db:check

# Validate translations
npm run i18n:validate

# Run tests
npm run test:unit
npm run test:integration
npm run test:e2e

# Check build
npm run build
npm run typecheck
npm run lint
```

## Success Criteria

### Technical Success

- [ ] All 6 test pages load successfully (2 cards × 3 languages)
- [ ] API endpoints return valid JSON
- [ ] SEO elements present and correct
- [ ] Responsive design works on all devices
- [ ] Performance metrics meet requirements

### Content Success

- [ ] All content sections present and populated
- [ ] Content length meets requirements
- [ ] Keywords and FAQ data complete
- [ ] Related cards functionality works

### User Experience Success

- [ ] Language switching works seamlessly
- [ ] CTA buttons function correctly
- [ ] Navigation is intuitive
- [ ] Page loads quickly

## Next Steps

After successful testing:

1. **Monitor Performance**: Track Core Web Vitals and user engagement
2. **Content Expansion**: Add remaining 76 cards
3. **SEO Optimization**: Monitor search rankings
4. **User Feedback**: Collect and analyze user behavior
5. **Iterative Improvement**: Based on data and feedback

---

**Quickstart Status**: ✅ Complete  
**Ready for**: Implementation and testin
