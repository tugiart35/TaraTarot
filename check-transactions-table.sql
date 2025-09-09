-- Transactions tablosunu kontrol et ve oluştur
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- 1. Transactions tablosunun var olup olmadığını kontrol et
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'transactions'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Eğer tablo yoksa oluştur
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    delta_credits INTEGER NOT NULL,
    reason TEXT NOT NULL,
    ref_type TEXT,
    ref_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS'yi etkinleştir
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 4. RLS politikasını oluştur
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON transactions;
CREATE POLICY "Allow all operations for authenticated users" ON transactions
    FOR ALL USING (true);

-- 5. Index oluştur
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- 6. Tabloyu tekrar kontrol et
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'transactions'
AND table_schema = 'public'
ORDER BY ordinal_position;
