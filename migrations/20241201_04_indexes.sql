-- ============================================================================
-- MIGRATION 04: INDEXES
-- ============================================================================
-- Migration: 20241201_04_indexes.sql
-- Description: Performans için indexler
-- Dependencies: 20241201_03_constraints.sql
-- Rollback: 20241201_04_indexes_rollback.sql

-- ============================================================================
-- PROFILES INDEXES
-- ============================================================================

-- Primary lookup by user_id (most common query)
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Email lookup (login, password reset)
CREATE INDEX idx_profiles_email ON profiles(email);

-- Admin users (admin operations)
CREATE INDEX idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;

-- Premium users (premium features)
CREATE INDEX idx_profiles_is_premium ON profiles(is_premium) WHERE is_premium = true;

-- User registration timeline
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- ============================================================================
-- READINGS INDEXES (En kritik performans alanı)
-- ============================================================================

-- En sık kullanılan query: kullanıcının okumalarını tarihe göre sıralı listele
CREATE INDEX idx_readings_user_created ON readings(user_id, created_at DESC);

-- Kullanıcının belirli türdeki okumalarını listele
CREATE INDEX idx_readings_user_type ON readings(user_id, reading_type);

-- Okuma durumuna göre filtreleme
CREATE INDEX idx_readings_status ON readings(status);

-- Okuma türü ve durum kombinasyonu
CREATE INDEX idx_readings_type_status ON readings(reading_type, status);

-- Tüm okumaları tarihe göre sırala (admin dashboard)
CREATE INDEX idx_readings_created_at ON readings(created_at DESC);

-- JSONB indexes for cards field (kart aramaları için)
CREATE INDEX idx_readings_cards_gin ON readings USING GIN(cards);

-- JSONB indexes for questions field
CREATE INDEX idx_readings_questions_gin ON readings USING GIN(questions);

-- Partial indexes for active readings (en sık kullanılan queries)
CREATE INDEX idx_readings_user_active ON readings(user_id, created_at DESC) 
WHERE status IN ('pending', 'completed');

-- Reading code lookup (özel okumalar için)
CREATE INDEX idx_readings_reading_code ON readings(reading_code) WHERE reading_code IS NOT NULL;

-- ============================================================================
-- TRANSACTIONS INDEXES
-- ============================================================================

-- Kullanıcının işlem geçmişi (en sık kullanılan)
CREATE INDEX idx_transactions_user_created ON transactions(user_id, created_at DESC);

-- İşlem türüne göre filtreleme
CREATE INDEX idx_transactions_type ON transactions(type);

-- Referans kayıtlara göre arama
CREATE INDEX idx_transactions_reference ON transactions(reference_type, reference_id);

-- Tüm işlemleri tarihe göre sırala (admin dashboard)
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- Balance değişiklikleri (analytics için)
CREATE INDEX idx_transactions_amount ON transactions(amount);

-- ============================================================================
-- PACKAGES INDEXES
-- ============================================================================

-- Aktif paketleri sıralı göster
CREATE INDEX idx_packages_active ON packages(is_active, sort_order);

-- Kredi miktarına göre sırala
CREATE INDEX idx_packages_credits ON packages(credits);

-- Fiyata göre sırala
CREATE INDEX idx_packages_price ON packages(price);

-- Para birimi ve aktif durum
CREATE INDEX idx_packages_currency_active ON packages(currency, is_active);

-- ============================================================================
-- AUDIT_LOGS INDEXES
-- ============================================================================

-- Kullanıcının audit logları
CREATE INDEX idx_audit_logs_user_created ON audit_logs(user_id, created_at DESC);

-- İşlem türüne göre filtreleme
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Kaynak türüne göre filtreleme
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Başarılı/başarısız işlemler
CREATE INDEX idx_audit_logs_success ON audit_logs(success);

-- Tüm audit logları tarihe göre sırala
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- IP adresine göre filtreleme (güvenlik)
CREATE INDEX idx_audit_logs_ip_address ON audit_logs(ip_address);

-- ============================================================================
-- ADMIN_NOTES INDEXES
-- ============================================================================

-- Okuma ID'sine göre notları bul
CREATE INDEX idx_admin_notes_reading ON admin_notes(reading_id);

-- Admin'e göre notları listele
CREATE INDEX idx_admin_notes_created_by ON admin_notes(created_by);

-- Notları tarihe göre sırala
CREATE INDEX idx_admin_notes_created_at ON admin_notes(created_at DESC);

-- ============================================================================
-- INDEX COMMENTS
-- ============================================================================

COMMENT ON INDEX idx_readings_user_created IS 'En sık kullanılan query için optimize edilmiş index';
COMMENT ON INDEX idx_readings_cards_gin IS 'JSONB cards alanı için GIN index - kart aramaları';
COMMENT ON INDEX idx_readings_user_active IS 'Aktif okumalar için partial index - performans optimizasyonu';
COMMENT ON INDEX idx_profiles_user_id IS 'Kullanıcı profil lookup için primary index';
COMMENT ON INDEX idx_transactions_user_created IS 'Kullanıcı işlem geçmişi için optimize edilmiş index';

-- ============================================================================
-- STATISTICS UPDATE
-- ============================================================================

-- Index oluşturma sonrası istatistikleri güncelle
ANALYZE profiles;
ANALYZE readings;
ANALYZE transactions;
ANALYZE packages;
ANALYZE audit_logs;
ANALYZE admin_notes;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
