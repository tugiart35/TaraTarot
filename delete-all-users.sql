-- =====================================================
-- TÜM KULLANICILARI SİLME SCRIPTİ
-- =====================================================
-- Bu script Supabase'deki tüm kullanıcıları ve ilgili verilerini siler
-- DİKKAT: Bu işlem geri alınamaz!
-- 
-- Silinecek veriler:
-- 1. Public tablolarındaki kullanıcı verileri
-- 2. Auth tablolarındaki kullanıcı verileri  
-- 3. Auth.users tablosundaki kullanıcılar
-- =====================================================

-- İşlem öncesi mevcut kullanıcı sayısını kontrol et
SELECT 'İşlem öncesi kullanıcı sayısı:' as info, COUNT(*) as user_count FROM auth.users;

-- =====================================================
-- 1. PUBLIC TABLOLARINDAN KULLANICI VERİLERİNİ SİLME
-- =====================================================

-- Profiles tablosundaki tüm kayıtları sil
DELETE FROM public.profiles;
SELECT 'Profiles tablosu temizlendi' as info;

-- Admins tablosundaki tüm kayıtları sil
DELETE FROM public.admins;
SELECT 'Admins tablosu temizlendi' as info;

-- Tarot readings tablosundaki tüm kayıtları sil
DELETE FROM public.tarot_readings;
SELECT 'Tarot readings tablosu temizlendi' as info;

-- Detailed questions tablosundaki tüm kayıtları sil
DELETE FROM public.detailed_questions;
SELECT 'Detailed questions tablosu temizlendi' as info;

-- User questions tablosundaki tüm kayıtları sil
DELETE FROM public.user_questions;
SELECT 'User questions tablosu temizlendi' as info;

-- Transactions tablosundaki tüm kayıtları sil
DELETE FROM public.transactions;
SELECT 'Transactions tablosu temizlendi' as info;

-- =====================================================
-- 2. AUTH TABLOLARINDAN KULLANICI VERİLERİNİ SİLME
-- =====================================================

-- Sessions tablosundaki tüm kayıtları sil
DELETE FROM auth.sessions;
SELECT 'Sessions tablosu temizlendi' as info;

-- Identities tablosundaki tüm kayıtları sil
DELETE FROM auth.identities;
SELECT 'Identities tablosu temizlendi' as info;

-- Refresh tokens tablosundaki tüm kayıtları sil
DELETE FROM auth.refresh_tokens;
SELECT 'Refresh tokens tablosu temizlendi' as info;

-- MFA factors tablosundaki tüm kayıtları sil
DELETE FROM auth.mfa_factors;
SELECT 'MFA factors tablosu temizlendi' as info;

-- MFA challenges tablosundaki tüm kayıtları sil
DELETE FROM auth.mfa_challenges;
SELECT 'MFA challenges tablosu temizlendi' as info;

-- MFA AMR claims tablosundaki tüm kayıtları sil
DELETE FROM auth.mfa_amr_claims;
SELECT 'MFA AMR claims tablosu temizlendi' as info;

-- One time tokens tablosundaki tüm kayıtları sil
DELETE FROM auth.one_time_tokens;
SELECT 'One time tokens tablosu temizlendi' as info;

-- Flow state tablosundaki tüm kayıtları sil
DELETE FROM auth.flow_state;
SELECT 'Flow state tablosu temizlendi' as info;

-- =====================================================
-- 3. AUTH.USERS TABLOSUNDAN KULLANICILARI SİLME
-- =====================================================

-- Son olarak auth.users tablosundaki tüm kullanıcıları sil
DELETE FROM auth.users;
SELECT 'Auth users tablosu temizlendi' as info;

-- =====================================================
-- İŞLEM SONRASI KONTROL
-- =====================================================

-- İşlem sonrası kullanıcı sayısını kontrol et
SELECT 'İşlem sonrası kullanıcı sayısı:' as info, COUNT(*) as user_count FROM auth.users;

-- Tüm tabloların boş olduğunu doğrula
SELECT 
    'Public tabloları kontrol:' as info,
    (SELECT COUNT(*) FROM public.profiles) as profiles_count,
    (SELECT COUNT(*) FROM public.admins) as admins_count,
    (SELECT COUNT(*) FROM public.tarot_readings) as tarot_readings_count,
    (SELECT COUNT(*) FROM public.detailed_questions) as detailed_questions_count,
    (SELECT COUNT(*) FROM public.user_questions) as user_questions_count,
    (SELECT COUNT(*) FROM public.transactions) as transactions_count;

SELECT 
    'Auth tabloları kontrol:' as info,
    (SELECT COUNT(*) FROM auth.sessions) as sessions_count,
    (SELECT COUNT(*) FROM auth.identities) as identities_count,
    (SELECT COUNT(*) FROM auth.refresh_tokens) as refresh_tokens_count,
    (SELECT COUNT(*) FROM auth.mfa_factors) as mfa_factors_count,
    (SELECT COUNT(*) FROM auth.mfa_challenges) as mfa_challenges_count,
    (SELECT COUNT(*) FROM auth.mfa_amr_claims) as mfa_amr_claims_count,
    (SELECT COUNT(*) FROM auth.one_time_tokens) as one_time_tokens_count,
    (SELECT COUNT(*) FROM auth.flow_state) as flow_state_count;

-- =====================================================
-- İŞLEM TAMAMLANDI
-- =====================================================
SELECT 'TÜM KULLANICILAR BAŞARIYLA SİLİNDİ!' as result;
