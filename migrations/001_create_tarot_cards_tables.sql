-- Migration: Create Tarot Cards Tables
-- Date: 2025-01-27
-- Description: Create tables for tarot card information pages

-- Tarot Cards Table
CREATE TABLE IF NOT EXISTS tarot_cards (
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
CREATE TABLE IF NOT EXISTS card_content (
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
CREATE TABLE IF NOT EXISTS card_seo (
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
CREATE TABLE IF NOT EXISTS card_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES tarot_cards(id) ON DELETE CASCADE,
  locale VARCHAR(2) NOT NULL CHECK (locale IN ('tr', 'en', 'sr')),
  slug VARCHAR(100) NOT NULL,
  path TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(locale, slug)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_tarot_cards_arcana_type ON tarot_cards(arcana_type);
CREATE INDEX IF NOT EXISTS idx_tarot_cards_suit ON tarot_cards(suit);
CREATE INDEX IF NOT EXISTS idx_card_content_card_id ON card_content(card_id);
CREATE INDEX IF NOT EXISTS idx_card_content_locale ON card_content(locale);
CREATE INDEX IF NOT EXISTS idx_card_seo_card_id ON card_seo(card_id);
CREATE INDEX IF NOT EXISTS idx_card_seo_locale ON card_seo(locale);
CREATE INDEX IF NOT EXISTS idx_card_pages_locale_slug ON card_pages(locale, slug);
CREATE INDEX IF NOT EXISTS idx_card_pages_path ON card_pages(path);
CREATE INDEX IF NOT EXISTS idx_card_pages_active ON card_pages(is_active);

-- RLS Policies
ALTER TABLE tarot_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Allow public read access to tarot_cards" ON tarot_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read access to card_content" ON card_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access to card_seo" ON card_seo FOR SELECT USING (true);
CREATE POLICY "Allow public read access to card_pages" ON card_pages FOR SELECT USING (true);
