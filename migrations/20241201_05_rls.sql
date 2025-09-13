-- ============================================================================
-- MIGRATION 05: ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Migration: 20241201_05_rls.sql
-- Description: Row Level Security politikaları
-- Dependencies: 20241201_04_indexes.sql
-- Rollback: 20241201_05_rls_rollback.sql

-- ============================================================================
-- ENABLE RLS
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Kullanıcılar sadece kendi profillerini görebilir
CREATE POLICY "profiles_select_own" ON profiles
FOR SELECT TO authenticated
USING (auth.uid()::text = user_id);

-- Kullanıcılar sadece kendi profillerini oluşturabilir
CREATE POLICY "profiles_insert_own" ON profiles
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id);

-- Kullanıcılar sadece kendi profillerini güncelleyebilir
CREATE POLICY "profiles_update_own" ON profiles
FOR UPDATE TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

-- Adminler tüm profilleri görebilir
CREATE POLICY "profiles_admin_all" ON profiles
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- ============================================================================
-- READINGS POLICIES
-- ============================================================================

-- Kullanıcılar sadece kendi okumalarını görebilir
CREATE POLICY "readings_select_own" ON readings
FOR SELECT TO authenticated
USING (auth.uid()::text = user_id);

-- Kullanıcılar sadece kendi okumalarını oluşturabilir
CREATE POLICY "readings_insert_own" ON readings
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id);

-- Kullanıcılar sadece kendi okumalarını güncelleyebilir (status değişikliği için)
CREATE POLICY "readings_update_own" ON readings
FOR UPDATE TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

-- Adminler tüm okumaları görebilir
CREATE POLICY "readings_admin_all" ON readings
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- Kullanıcılar kendi okumalarını silebilir (opsiyonel)
CREATE POLICY "readings_delete_own" ON readings
FOR DELETE TO authenticated
USING (auth.uid()::text = user_id);

-- ============================================================================
-- TRANSACTIONS POLICIES
-- ============================================================================

-- Kullanıcılar sadece kendi işlemlerini görebilir
CREATE POLICY "transactions_select_own" ON transactions
FOR SELECT TO authenticated
USING (auth.uid()::text = user_id);

-- Adminler tüm işlemleri görebilir
CREATE POLICY "transactions_admin_all" ON transactions
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- Service role tüm işlemleri yapabilir (sistem işlemleri için)
CREATE POLICY "transactions_service_role" ON transactions
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- PACKAGES POLICIES
-- ============================================================================

-- Herkes aktif paketleri görebilir (public read)
CREATE POLICY "packages_select_public" ON packages
FOR SELECT TO authenticated, anon
USING (is_active = true);

-- Sadece adminler paketleri yönetebilir
CREATE POLICY "packages_admin_manage" ON packages
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- ============================================================================
-- AUDIT_LOGS POLICIES
-- ============================================================================

-- Kullanıcılar sadece kendi audit loglarını görebilir
CREATE POLICY "audit_logs_select_own" ON audit_logs
FOR SELECT TO authenticated
USING (
  user_id = auth.uid()::text OR
  user_id IS NULL -- Anon işlemler için
);

-- Sadece adminler audit logları yönetebilir
CREATE POLICY "audit_logs_admin_all" ON audit_logs
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- Service role tüm audit logları yapabilir (sistem işlemleri için)
CREATE POLICY "audit_logs_service_role" ON audit_logs
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- ADMIN_NOTES POLICIES
-- ============================================================================

-- Kullanıcılar kendi okumalarının admin notlarını görebilir
CREATE POLICY "admin_notes_select_own_reading" ON admin_notes
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM readings r
    WHERE r.id = admin_notes.reading_id
    AND r.user_id = auth.uid()::text
  )
);

-- Adminler tüm notları görebilir
CREATE POLICY "admin_notes_select_admin" ON admin_notes
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
);

-- Sadece adminler not oluşturabilir
CREATE POLICY "admin_notes_insert_admin" ON admin_notes
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
  AND created_by = auth.uid()::text
);

-- Adminler kendi notlarını güncelleyebilir
CREATE POLICY "admin_notes_update_own" ON admin_notes
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
  AND created_by = auth.uid()::text
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
  AND created_by = auth.uid()::text
);

-- Adminler kendi notlarını silebilir
CREATE POLICY "admin_notes_delete_own" ON admin_notes
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid()::text 
    AND is_admin = true
  )
  AND created_by = auth.uid()::text
);

-- ============================================================================
-- POLICY COMMENTS
-- ============================================================================

COMMENT ON POLICY "profiles_select_own" ON profiles IS 'Kullanıcılar sadece kendi profillerini görebilir';
COMMENT ON POLICY "readings_select_own" ON readings IS 'Kullanıcılar sadece kendi okumalarını görebilir';
COMMENT ON POLICY "transactions_select_own" ON transactions IS 'Kullanıcılar sadece kendi işlemlerini görebilir';
COMMENT ON POLICY "packages_select_public" ON packages IS 'Herkes aktif paketleri görebilir';
COMMENT ON POLICY "audit_logs_select_own" ON audit_logs IS 'Kullanıcılar kendi audit loglarını görebilir';
COMMENT ON POLICY "admin_notes_select_own_reading" ON admin_notes IS 'Kullanıcılar kendi okumalarının notlarını görebilir';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
