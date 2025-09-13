-- ============================================================================
-- MIGRATION 03: FOREIGN KEYS & CONSTRAINTS
-- ============================================================================
-- Migration: 20241201_03_constraints.sql
-- Description: Foreign key constraints ve ek constraint'ler
-- Dependencies: 20241201_02_tables.sql
-- Rollback: 20241201_03_constraints_rollback.sql

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

-- admin_notes -> readings
ALTER TABLE admin_notes 
ADD CONSTRAINT fk_admin_notes_reading 
FOREIGN KEY (reading_id) REFERENCES readings(id) ON DELETE CASCADE;

-- ============================================================================
-- ADDITIONAL CONSTRAINTS
-- ============================================================================

-- Unique constraints
ALTER TABLE profiles ADD CONSTRAINT uk_profiles_user_id UNIQUE (user_id);
ALTER TABLE profiles ADD CONSTRAINT uk_profiles_email UNIQUE (email);
ALTER TABLE readings ADD CONSTRAINT uk_readings_reading_code UNIQUE (reading_code);

-- Check constraints for data integrity
ALTER TABLE profiles ADD CONSTRAINT ck_profiles_email_valid 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE profiles ADD CONSTRAINT ck_profiles_credit_balance_non_negative 
CHECK (credit_balance >= 0);

ALTER TABLE profiles ADD CONSTRAINT ck_profiles_login_count_non_negative 
CHECK (login_count >= 0);

ALTER TABLE readings ADD CONSTRAINT ck_readings_title_not_empty 
CHECK (length(trim(title)) > 0);

ALTER TABLE readings ADD CONSTRAINT ck_readings_interpretation_not_empty 
CHECK (length(trim(interpretation)) > 0);

ALTER TABLE readings ADD CONSTRAINT ck_readings_cost_credits_positive 
CHECK (cost_credits > 0);

ALTER TABLE readings ADD CONSTRAINT ck_readings_cards_valid_json 
CHECK (jsonb_typeof(cards) = 'object');

ALTER TABLE readings ADD CONSTRAINT ck_readings_questions_valid_json 
CHECK (jsonb_typeof(questions) = 'object' OR questions IS NULL);

ALTER TABLE readings ADD CONSTRAINT ck_readings_metadata_valid_json 
CHECK (jsonb_typeof(metadata) = 'object' OR metadata IS NULL);

ALTER TABLE transactions ADD CONSTRAINT ck_transactions_description_not_empty 
CHECK (length(trim(description)) > 0);

ALTER TABLE transactions ADD CONSTRAINT ck_transactions_balance_before_non_negative 
CHECK (balance_before >= 0);

ALTER TABLE transactions ADD CONSTRAINT ck_transactions_balance_after_non_negative 
CHECK (balance_after >= 0);

ALTER TABLE transactions ADD CONSTRAINT ck_transactions_balance_consistent 
CHECK (balance_after = balance_before + amount);

ALTER TABLE packages ADD CONSTRAINT ck_packages_name_not_empty 
CHECK (length(trim(name)) > 0);

ALTER TABLE packages ADD CONSTRAINT ck_packages_credits_positive 
CHECK (credits > 0);

ALTER TABLE packages ADD CONSTRAINT ck_packages_price_positive 
CHECK (price > 0);

ALTER TABLE packages ADD CONSTRAINT ck_packages_validity_days_positive 
CHECK (validity_days > 0);

ALTER TABLE packages ADD CONSTRAINT ck_packages_bonus_percentage_range 
CHECK (bonus_percentage >= 0 AND bonus_percentage <= 100);

ALTER TABLE audit_logs ADD CONSTRAINT ck_audit_logs_action_not_empty 
CHECK (length(trim(action)) > 0);

ALTER TABLE audit_logs ADD CONSTRAINT ck_audit_logs_details_valid_json 
CHECK (jsonb_typeof(details) = 'object');

ALTER TABLE admin_notes ADD CONSTRAINT ck_admin_notes_note_not_empty 
CHECK (length(trim(note)) > 0);

ALTER TABLE admin_notes ADD CONSTRAINT ck_admin_notes_created_by_not_empty 
CHECK (length(trim(created_by)) > 0);

-- ============================================================================
-- CONSTRAINT COMMENTS
-- ============================================================================

COMMENT ON CONSTRAINT fk_admin_notes_reading ON admin_notes IS 'Admin notları okuma kaydına bağlı';
COMMENT ON CONSTRAINT uk_profiles_user_id ON profiles IS 'Her kullanıcı için benzersiz user_id';
COMMENT ON CONSTRAINT uk_profiles_email ON profiles IS 'Her kullanıcı için benzersiz email';
COMMENT ON CONSTRAINT uk_readings_reading_code ON readings IS 'Özel okumalar için benzersiz kod';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
