# 🔧 Transactions Tablosu Sorunu Çözümü

## Sorun
```
useReadingCredits.ts:173 Transaction log oluşturulamadı: {code: 'PGRST204', details: null, hint: null, message: "Could not find the 'delta_credits' column of 'transactions' in the schema cache"}
```

Bu hata, Supabase'de `transactions` tablosunun bulunmadığını veya `delta_credits` sütununun eksik olduğunu gösteriyor.

## Çözüm

### 1. Supabase SQL Editor'da Tabloyu Kontrol Et

Supabase Dashboard → SQL Editor'a git ve şu sorguyu çalıştır:

```sql
-- Transactions tablosunun var olup olmadığını kontrol et
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'transactions'
AND table_schema = 'public'
ORDER BY ordinal_position;
```

### 2. Eğer Tablo Yoksa Oluştur

Eğer yukarıdaki sorgu sonuç döndürmüyorsa, tabloyu oluştur:

```sql
-- Transactions tablosunu oluştur
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    delta_credits INTEGER NOT NULL,
    reason TEXT NOT NULL,
    ref_type TEXT,
    ref_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS'yi etkinleştir
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS politikasını oluştur
CREATE POLICY "Allow all operations for authenticated users" ON transactions
    FOR ALL USING (true);

-- Index'leri oluştur
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
```

### 3. Tüm Tabloları Oluştur (Önerilen)

Eğer diğer tablolar da eksikse, tüm tabloları oluşturmak için:

```sql
-- Tüm tarot tablolarını oluştur
-- 1. tarot_readings tablosu
CREATE TABLE IF NOT EXISTS tarot_readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    cards JSONB NOT NULL,
    interpretation TEXT NOT NULL,
    question JSONB,
    admin_notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. detailed_questions tablosu
CREATE TABLE IF NOT EXISTS detailed_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    email TEXT NOT NULL,
    concern TEXT NOT NULL,
    understanding TEXT NOT NULL,
    emotional TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. user_questions tablosu
CREATE TABLE IF NOT EXISTS user_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. transactions tablosu (kredi işlemleri için)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    delta_credits INTEGER NOT NULL,
    reason TEXT NOT NULL,
    ref_type TEXT,
    ref_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. RLS'yi etkinleştir
ALTER TABLE tarot_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE detailed_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 6. RLS politikalarını oluştur
CREATE POLICY "Allow all operations for authenticated users" ON tarot_readings
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON detailed_questions
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON user_questions
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON transactions
    FOR ALL USING (true);

-- 7. Index'ler oluştur
CREATE INDEX IF NOT EXISTS idx_tarot_readings_user_id ON tarot_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_tarot_readings_created_at ON tarot_readings(created_at);
CREATE INDEX IF NOT EXISTS idx_detailed_questions_user_id ON detailed_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_questions_user_id ON user_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
```

### 4. Tabloları Kontrol Et

Tüm tabloların oluşturulduğunu doğrula:

```sql
-- Tüm tabloları listele
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('tarot_readings', 'detailed_questions', 'user_questions', 'transactions')
AND table_schema = 'public'
ORDER BY table_name, ordinal_position;
```

## Test

### 1. Tarot Okuma Test Et
- Dashboard'a git
- Tarot okuma başlat
- "Kaydet Devam Et" butonuna bas
- Console'da hata olmamalı

### 2. Kredi Geçmişi Kontrol Et
- Dashboard → Kredi Geçmişi'ne git
- Transaction log'ları görünmeli

## Beklenen Sonuç

✅ **Başarılı Senaryo:**
- Transaction log başarıyla oluşturulur
- Console'da "Transaction log başarıyla oluşturuldu" mesajı
- Kredi geçmişi sayfasında işlem görünür

❌ **Hata Senaryoları:**
- Tablo yoksa: "Could not find the 'transactions' table" hatası
- Sütun yoksa: "Could not find the 'delta_credits' column" hatası
- RLS hatası: "new row violates row-level security policy" hatası

## Sorun Giderme

### Hala Hata Alıyorsan
1. Supabase'de tabloların oluşturulduğunu doğrula
2. RLS politikalarının aktif olduğunu kontrol et
3. Kullanıcının authenticated olduğunu kontrol et
4. Supabase cache'ini temizle (Dashboard → Settings → Clear Cache)

### Cache Sorunu
Eğer tablo oluşturuldu ama hala hata alıyorsan:
1. Supabase Dashboard → Settings → Clear Cache
2. Tarayıcı cache'ini temizle
3. Sayfayı yenile
