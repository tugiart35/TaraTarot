-- Tarot readings tablosuna eksik alanları ekle
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- 1. Eksik alanları ekle
ALTER TABLE tarot_readings 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS summary TEXT,
ADD COLUMN IF NOT EXISTS cost_credits INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS spread_name TEXT;

-- 2. Mevcut veriler için varsayılan değerleri güncelle
UPDATE tarot_readings 
SET 
  title = CASE 
    WHEN reading_type = 'love' THEN 'Aşk Okuması'
    WHEN reading_type = 'general' THEN 'Genel Okuma'
    WHEN reading_type = 'career' THEN 'Kariyer Okuması'
    ELSE 'Mistik Okuma'
  END,
  summary = CASE 
    WHEN LENGTH(interpretation) > 100 THEN SUBSTRING(interpretation, 1, 100) || '...'
    ELSE interpretation
  END,
  cost_credits = CASE 
    WHEN reading_type = 'love' THEN 3
    WHEN reading_type = 'career' THEN 3
    ELSE 2
  END,
  spread_name = CASE 
    WHEN reading_type = 'love' THEN 'Aşk Yayılımı'
    WHEN reading_type = 'general' THEN '3 Kart Yayılımı'
    WHEN reading_type = 'career' THEN 'Kariyer Yayılımı'
    ELSE 'Genel Yayılım'
  END
WHERE title IS NULL OR summary IS NULL OR cost_credits IS NULL OR spread_name IS NULL;

-- 3. Yeni alanlar için index'ler oluştur
CREATE INDEX IF NOT EXISTS idx_tarot_readings_title ON tarot_readings(title);
CREATE INDEX IF NOT EXISTS idx_tarot_readings_cost_credits ON tarot_readings(cost_credits);
CREATE INDEX IF NOT EXISTS idx_tarot_readings_spread_name ON tarot_readings(spread_name);

-- 4. Tabloyu kontrol et
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'tarot_readings'
AND table_schema = 'public'
ORDER BY ordinal_position;
