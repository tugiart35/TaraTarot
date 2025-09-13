-- ============================================================================
-- MIGRATION 02: TABLES
-- ============================================================================
-- Migration: 20241201_02_tables.sql
-- Description: Ana tablo tanımları
-- Dependencies: 20241201_01_types.sql
-- Rollback: 20241201_02_tables_rollback.sql

-- ============================================================================
-- TABLES
-- ============================================================================

-- 1. PROFILES TABLOSU
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE, -- Supabase auth.users.id referansı
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  credit_balance INTEGER DEFAULT 100 NOT NULL CHECK (credit_balance >= 0),
  is_premium BOOLEAN DEFAULT false NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  timezone VARCHAR(50) DEFAULT 'Europe/Istanbul' NOT NULL,
  preferred_language VARCHAR(5) DEFAULT 'tr' NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT profiles_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT profiles_credit_positive CHECK (credit_balance >= 0),
  CONSTRAINT profiles_login_count_positive CHECK (login_count >= 0)
);

-- 2. READINGS TABLOSU  
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  reading_type reading_type NOT NULL,
  spread_name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  interpretation TEXT NOT NULL,
  cards JSONB NOT NULL DEFAULT '{}',
  questions JSONB DEFAULT '{}',
  cost_credits INTEGER DEFAULT 2 NOT NULL CHECK (cost_credits > 0),
  status reading_status DEFAULT 'pending' NOT NULL,
  metadata JSONB DEFAULT '{}',
  reading_code VARCHAR(50) UNIQUE, -- Özel okumalar için
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT readings_interpretation_not_empty CHECK (length(trim(interpretation)) > 0),
  CONSTRAINT readings_title_not_empty CHECK (length(trim(title)) > 0),
  CONSTRAINT readings_cost_positive CHECK (cost_credits > 0),
  CONSTRAINT readings_cards_valid_json CHECK (jsonb_typeof(cards) = 'object'),
  CONSTRAINT readings_questions_valid_json CHECK (jsonb_typeof(questions) = 'object' OR questions IS NULL),
  CONSTRAINT readings_metadata_valid_json CHECK (jsonb_typeof(metadata) = 'object' OR metadata IS NULL)
);

-- 3. TRANSACTIONS TABLOSU
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL, -- Pozitif: kredi ekleme, Negatif: kredi çıkarma
  description TEXT NOT NULL,
  reference_type VARCHAR(50), -- 'package', 'reading', 'admin_adjustment'
  reference_id VARCHAR(100), -- İlgili kaydın ID'si
  balance_before INTEGER NOT NULL, -- İşlem öncesi bakiye
  balance_after INTEGER NOT NULL, -- İşlem sonrası bakiye
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT transactions_description_not_empty CHECK (length(trim(description)) > 0),
  CONSTRAINT transactions_balance_positive CHECK (balance_before >= 0 AND balance_after >= 0),
  CONSTRAINT transactions_balance_consistent CHECK (balance_after = balance_before + amount)
);

-- 4. PACKAGES TABLOSU
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  credits INTEGER NOT NULL CHECK (credits > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  currency currency_type DEFAULT 'TRY' NOT NULL,
  description TEXT,
  features TEXT[], -- Array of features
  bonus_percentage INTEGER DEFAULT 0 CHECK (bonus_percentage >= 0 AND bonus_percentage <= 100),
  validity_days INTEGER DEFAULT 30 CHECK (validity_days > 0),
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT packages_name_not_empty CHECK (length(trim(name)) > 0),
  CONSTRAINT packages_credits_positive CHECK (credits > 0),
  CONSTRAINT packages_price_positive CHECK (price > 0),
  CONSTRAINT packages_validity_positive CHECK (validity_days > 0)
);

-- 5. AUDIT_LOGS TABLOSU
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- NULL olabilir (anon işlemler için)
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50), -- 'reading', 'transaction', 'profile'
  resource_id VARCHAR(100),
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT audit_logs_action_not_empty CHECK (length(trim(action)) > 0),
  CONSTRAINT audit_logs_details_valid_json CHECK (jsonb_typeof(details) = 'object')
);

-- 6. ADMIN_NOTES TABLOSU
CREATE TABLE admin_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_id UUID NOT NULL,
  note TEXT NOT NULL,
  created_by TEXT NOT NULL, -- Admin user_id
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT admin_notes_note_not_empty CHECK (length(trim(note)) > 0),
  CONSTRAINT admin_notes_created_by_not_empty CHECK (length(trim(created_by)) > 0)
);

-- ============================================================================
-- TABLE COMMENTS
-- ============================================================================

COMMENT ON TABLE profiles IS 'Kullanıcı profil bilgileri ve kredi bakiyesi';
COMMENT ON TABLE readings IS 'Tarot okuma kayıtları - ana iş tablosu';
COMMENT ON TABLE transactions IS 'Kredi işlemleri geçmişi';
COMMENT ON TABLE packages IS 'Kredi paketleri - sabit referans veri';
COMMENT ON TABLE audit_logs IS 'Güvenlik ve compliance için audit kayıtları';
COMMENT ON TABLE admin_notes IS 'Okumalar için admin notları';

-- ============================================================================
-- COLUMN COMMENTS
-- ============================================================================

COMMENT ON COLUMN profiles.credit_balance IS 'Kullanıcının mevcut kredi bakiyesi';
COMMENT ON COLUMN readings.cards IS 'JSONB - çekilen kartlar ve pozisyonları';
COMMENT ON COLUMN readings.questions IS 'JSONB - kullanıcı soruları';
COMMENT ON COLUMN readings.metadata IS 'JSONB - ek meta veriler (platform, IP hash, vb.)';
COMMENT ON COLUMN transactions.balance_before IS 'İşlem öncesi kredi bakiyesi';
COMMENT ON COLUMN transactions.balance_after IS 'İşlem sonrası kredi bakiyesi';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
