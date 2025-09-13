-- ============================================================================
-- MIGRATION 01: CUSTOM TYPES
-- ============================================================================
-- Migration: 20241201_01_types.sql
-- Description: Custom PostgreSQL types tanımları
-- Dependencies: None
-- Rollback: 20241201_01_types_rollback.sql

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Kullanıcı rolleri
CREATE TYPE user_role AS ENUM ('admin', 'premium', 'user', 'guest');

-- Okuma türleri  
CREATE TYPE reading_type AS ENUM ('tarot', 'numerology', 'love', 'career', 'general');

-- İşlem türleri
CREATE TYPE transaction_type AS ENUM ('purchase', 'refund', 'bonus', 'deduction', 'reading');

-- Okuma durumları
CREATE TYPE reading_status AS ENUM ('pending', 'completed', 'failed', 'reviewed');

-- Para birimi
CREATE TYPE currency_type AS ENUM ('TRY', 'USD', 'EUR');

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TYPE user_role IS 'Kullanıcı rolleri - admin, premium, user, guest';
COMMENT ON TYPE reading_type IS 'Tarot okuma türleri';
COMMENT ON TYPE transaction_type IS 'Kredi işlem türleri';
COMMENT ON TYPE reading_status IS 'Okuma durumları';
COMMENT ON TYPE currency_type IS 'Desteklenen para birimleri';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
