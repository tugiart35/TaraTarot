-- Tarot okuma sistemi için gerekli tabloları oluştur
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

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
-- tarot_readings için
CREATE POLICY "Allow all operations for authenticated users" ON tarot_readings
    FOR ALL USING (true);

-- detailed_questions için
CREATE POLICY "Allow all operations for authenticated users" ON detailed_questions
    FOR ALL USING (true);

-- user_questions için
CREATE POLICY "Allow all operations for authenticated users" ON user_questions
    FOR ALL USING (true);

-- transactions için
CREATE POLICY "Allow all operations for authenticated users" ON transactions
    FOR ALL USING (true);

-- 7. Index'ler oluştur
CREATE INDEX IF NOT EXISTS idx_tarot_readings_user_id ON tarot_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_tarot_readings_created_at ON tarot_readings(created_at);
CREATE INDEX IF NOT EXISTS idx_detailed_questions_user_id ON detailed_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_questions_user_id ON user_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);

-- 8. Tabloları kontrol et
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('tarot_readings', 'detailed_questions', 'user_questions', 'transactions')
AND table_schema = 'public'
ORDER BY table_name, ordinal_position;
