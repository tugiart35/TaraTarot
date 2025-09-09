-- Profiles tablosunun mevcut yapısını kontrol et
-- Bu dosyayı Supabase SQL Editor'da çalıştırarak mevcut kolonları görebilirsiniz

-- 1. Mevcut kolonları listele
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. display_name kolonu var mı kontrol et
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'display_name'
            AND table_schema = 'public'
        ) THEN 'display_name kolonu MEVCUT'
        ELSE 'display_name kolonu EKSİK'
    END as display_name_status;

-- 3. credit_balance kolonu var mı kontrol et
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'credit_balance'
            AND table_schema = 'public'
        ) THEN 'credit_balance kolonu MEVCUT'
        ELSE 'credit_balance kolonu EKSİK'
    END as credit_balance_status;

-- 4. RLS durumunu kontrol et
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'profiles' 
AND schemaname = 'public';

-- 5. RLS politikalarını kontrol et
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles' 
AND schemaname = 'public';