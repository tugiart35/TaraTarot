-- Profiles tablosunu güncelle - sadece eksik kolonları ekle
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- 1. display_name kolonu yoksa ekle
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'display_name'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE profiles ADD COLUMN display_name TEXT;
        RAISE NOTICE 'display_name kolonu eklendi';
    ELSE
        RAISE NOTICE 'display_name kolonu zaten mevcut';
    END IF;
END $$;

-- 2. credit_balance kolonu yoksa ekle
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'credit_balance'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE profiles ADD COLUMN credit_balance INTEGER DEFAULT 100;
        RAISE NOTICE 'credit_balance kolonu eklendi';
    ELSE
        RAISE NOTICE 'credit_balance kolonu zaten mevcut';
    END IF;
END $$;

-- 3. created_at kolonu yoksa ekle
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'created_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'created_at kolonu eklendi';
    ELSE
        RAISE NOTICE 'created_at kolonu zaten mevcut';
    END IF;
END $$;

-- 4. updated_at kolonu yoksa ekle
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'updated_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'updated_at kolonu eklendi';
    ELSE
        RAISE NOTICE 'updated_at kolonu zaten mevcut';
    END IF;
END $$;

-- 5. RLS'yi etkinleştir
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS politikalarını oluştur (eğer yoksa)
DO $$ 
BEGIN
    -- SELECT politikası
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'profiles_select_self'
    ) THEN
        CREATE POLICY profiles_select_self ON profiles
            FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE 'SELECT politikası eklendi';
    ELSE
        RAISE NOTICE 'SELECT politikası zaten mevcut';
    END IF;

    -- INSERT politikası
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'profiles_insert_self'
    ) THEN
        CREATE POLICY profiles_insert_self ON profiles
            FOR INSERT WITH CHECK (auth.uid() = id);
        RAISE NOTICE 'INSERT politikası eklendi';
    ELSE
        RAISE NOTICE 'INSERT politikası zaten mevcut';
    END IF;

    -- UPDATE politikası
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'profiles_update_self'
    ) THEN
        CREATE POLICY profiles_update_self ON profiles
            FOR UPDATE USING (auth.uid() = id);
        RAISE NOTICE 'UPDATE politikası eklendi';
    ELSE
        RAISE NOTICE 'UPDATE politikası zaten mevcut';
    END IF;
END $$;

-- 7. Güncellenmiş tablo yapısını göster
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;
