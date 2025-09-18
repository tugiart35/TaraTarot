-- ============================================================================
-- DÜZELTİLMİŞ RLS POLİTİKALARI - SONSUZ DÖNGÜ SORUNU ÇÖZÜLDÜ
-- ============================================================================
-- Sorun: Admin politikaları profiles tablosunu sorgulayarak sonsuz döngü yaratıyordu
-- Çözüm: admin_users tablosunu kullanarak döngüsel bağımlılığı kırdık
-- Tarih: 2025-01-11
-- ============================================================================

-- Row-Level Security (RLS) policies
-- Note: Supabase service role bypasses RLS; client roles `anon` and `authenticated` are enforced.

-- Helper notes
-- auth.uid() returns current user id (uuid) for authenticated role
-- auth.role() returns token role: 'anon' | 'authenticated' | 'service_role'

-- ============================================================================
-- ÖNCE PROBLEMLİ POLİTİKALARI TEMİZLE
-- ============================================================================

-- Eski problemli politikaları kaldır
DROP POLICY IF EXISTS "admins_read_self" ON admins;

-- ============================================================================
-- PROFILES POLİTİKALARI (DÜZELTİLDİ)
-- ============================================================================

-- PROFILES
alter table public.profiles enable row level security;

-- Read own profile
create policy if not exists profiles_select_self
on public.profiles for select
using (auth.uid() = id);

-- Insert own profile (upsert on sign-up)
create policy if not exists profiles_insert_self
on public.profiles for insert
with check (auth.uid() = id);

-- Update own profile
create policy if not exists profiles_update_self
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Admins can read all profiles (admin_users tablosunu kullanarak döngü kırıldı)
create policy if not exists profiles_admin_read
on public.profiles for select
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admins can manage all profiles
create policy if not exists profiles_admin_manage
on public.profiles for all
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- ============================================================================
-- ADMIN_USERS POLİTİKALARI (DÜZELTİLDİ - SONSUZ DÖNGÜ KIRILDI)
-- ============================================================================

-- ADMIN_USERS
alter table public.admin_users enable row level security;

-- Adminler kendi admin kayıtlarını görebilir (DÖNGÜ KIRILDI)
create policy if not exists admin_users_select_self
on public.admin_users for select
using (user_id = auth.uid());

-- Adminler yeni admin ekleyebilir (sadece mevcut adminler)
create policy if not exists admin_users_insert_admin
on public.admin_users for insert
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Adminler admin kayıtlarını güncelleyebilir
create policy if not exists admin_users_update_admin
on public.admin_users for update
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- ============================================================================
-- READINGS POLİTİKALARI
-- ============================================================================

-- READINGS
alter table public.readings enable row level security;

-- Owner can CRUD own readings
create policy if not exists readings_owner_all
on public.readings for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Admins can manage all readings
create policy if not exists readings_admin_all
on public.readings for all
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

