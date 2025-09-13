-- ============================================================================
-- MIGRATION 06: FUNCTIONS & TRIGGERS
-- ============================================================================
-- Migration: 20241201_06_functions.sql
-- Description: Functions, triggers ve materialized views
-- Dependencies: 20241201_05_rls.sql
-- Rollback: 20241201_06_functions_rollback.sql

-- ============================================================================
-- TRIGGER FUNCTIONS
-- ============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_readings_updated_at BEFORE UPDATE ON readings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_notes_updated_at BEFORE UPDATE ON admin_notes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- MATERIALIZED VIEWS
-- ============================================================================

-- User statistics materialized view
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
  user_id,
  COUNT(*) as total_readings,
  COUNT(*) FILTER (WHERE reading_type = 'love') as love_readings,
  COUNT(*) FILTER (WHERE reading_type = 'career') as career_readings,
  COUNT(*) FILTER (WHERE reading_type = 'general') as general_readings,
  COUNT(*) FILTER (WHERE reading_type = 'numerology') as numerology_readings,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_readings,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_readings,
  SUM(cost_credits) as total_credits_spent,
  AVG(cost_credits) as avg_credits_per_reading,
  MAX(created_at) as last_reading_at,
  MIN(created_at) as first_reading_at
FROM readings 
WHERE status != 'failed'
GROUP BY user_id;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_user_stats_user_id ON user_stats(user_id);

-- Reading statistics materialized view
CREATE MATERIALIZED VIEW reading_stats AS
SELECT 
  reading_type,
  status,
  DATE_TRUNC('day', created_at) as reading_date,
  COUNT(*) as count,
  AVG(cost_credits) as avg_cost,
  SUM(cost_credits) as total_cost
FROM readings
GROUP BY reading_type, status, DATE_TRUNC('day', created_at);

-- Create index on reading stats
CREATE INDEX idx_reading_stats_type_date ON reading_stats(reading_type, reading_date);

-- Daily transaction stats materialized view
CREATE MATERIALIZED VIEW daily_transaction_stats AS
SELECT 
  DATE_TRUNC('day', created_at) as transaction_date,
  type,
  COUNT(*) as count,
  SUM(amount) as total_amount,
  AVG(amount) as avg_amount
FROM transactions
GROUP BY DATE_TRUNC('day', created_at), type;

-- Create index on daily transaction stats
CREATE INDEX idx_daily_transaction_stats_date_type ON daily_transaction_stats(transaction_date, type);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_reading_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY reading_stats;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_daily_transaction_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY daily_transaction_stats;
END;
$$ LANGUAGE plpgsql;

-- Function to refresh all materialized views
CREATE OR REPLACE FUNCTION refresh_all_stats()
RETURNS void AS $$
BEGIN
  PERFORM refresh_user_stats();
  PERFORM refresh_reading_stats();
  PERFORM refresh_daily_transaction_stats();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- BUSINESS LOGIC FUNCTIONS
-- ============================================================================

-- Function to get user credit balance with transaction
CREATE OR REPLACE FUNCTION update_user_credits(
  p_user_id TEXT,
  p_amount INTEGER,
  p_type transaction_type,
  p_description TEXT,
  p_reference_type VARCHAR(50) DEFAULT NULL,
  p_reference_id VARCHAR(100) DEFAULT NULL
)
RETURNS TABLE(
  success BOOLEAN,
  new_balance INTEGER,
  transaction_id UUID
) AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
  v_transaction_id UUID;
BEGIN
  -- Get current balance
  SELECT credit_balance INTO v_current_balance 
  FROM profiles 
  WHERE user_id = p_user_id;
  
  -- Check if user exists
  IF v_current_balance IS NULL THEN
    RETURN QUERY SELECT false, 0, gen_random_uuid();
    RETURN;
  END IF;
  
  -- Calculate new balance
  v_new_balance := v_current_balance + p_amount;
  
  -- Check if balance would go negative
  IF v_new_balance < 0 THEN
    RETURN QUERY SELECT false, v_current_balance, gen_random_uuid();
    RETURN;
  END IF;
  
  -- Update profile balance
  UPDATE profiles 
  SET credit_balance = v_new_balance
  WHERE user_id = p_user_id;
  
  -- Insert transaction record
  INSERT INTO transactions (
    user_id, type, amount, description, reference_type, reference_id,
    balance_before, balance_after
  ) VALUES (
    p_user_id, p_type, p_amount, p_description, p_reference_type, p_reference_id,
    v_current_balance, v_new_balance
  ) RETURNING id INTO v_transaction_id;
  
  -- Return success
  RETURN QUERY SELECT true, v_new_balance, v_transaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a reading with credit deduction
CREATE OR REPLACE FUNCTION create_reading_with_credit_deduction(
  p_user_id TEXT,
  p_reading_type reading_type,
  p_spread_name VARCHAR(100),
  p_title VARCHAR(200),
  p_interpretation TEXT,
  p_cards JSONB,
  p_questions JSONB DEFAULT NULL,
  p_cost_credits INTEGER DEFAULT 2,
  p_metadata JSONB DEFAULT NULL
)
RETURNS TABLE(
  success BOOLEAN,
  reading_id UUID,
  new_balance INTEGER
) AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
  v_reading_id UUID;
  v_transaction_id UUID;
BEGIN
  -- Get current balance
  SELECT credit_balance INTO v_current_balance 
  FROM profiles 
  WHERE user_id = p_user_id;
  
  -- Check if user exists
  IF v_current_balance IS NULL THEN
    RETURN QUERY SELECT false, gen_random_uuid(), 0;
    RETURN;
  END IF;
  
  -- Check if user has enough credits
  IF v_current_balance < p_cost_credits THEN
    RETURN QUERY SELECT false, gen_random_uuid(), v_current_balance;
    RETURN;
  END IF;
  
  -- Calculate new balance
  v_new_balance := v_current_balance - p_cost_credits;
  
  -- Insert reading record
  INSERT INTO readings (
    user_id, reading_type, spread_name, title, interpretation,
    cards, questions, cost_credits, status, metadata
  ) VALUES (
    p_user_id, p_reading_type, p_spread_name, p_title, p_interpretation,
    p_cards, p_questions, p_cost_credits, 'completed', p_metadata
  ) RETURNING id INTO v_reading_id;
  
  -- Update profile balance
  UPDATE profiles 
  SET credit_balance = v_new_balance
  WHERE user_id = p_user_id;
  
  -- Insert transaction record
  INSERT INTO transactions (
    user_id, type, amount, description, reference_type, reference_id,
    balance_before, balance_after
  ) VALUES (
    p_user_id, 'reading', -p_cost_credits, 
    'Tarot okuması: ' || p_title, 'reading', v_reading_id::text,
    v_current_balance, v_new_balance
  ) RETURNING id INTO v_transaction_id;
  
  -- Return success
  RETURN QUERY SELECT true, v_reading_id, v_new_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user reading history with pagination
CREATE OR REPLACE FUNCTION get_user_readings(
  p_user_id TEXT,
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0,
  p_reading_type reading_type DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  reading_type reading_type,
  spread_name VARCHAR(100),
  title VARCHAR(200),
  interpretation TEXT,
  cost_credits INTEGER,
  status reading_status,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.reading_type,
    r.spread_name,
    r.title,
    r.interpretation,
    r.cost_credits,
    r.status,
    r.created_at,
    r.updated_at
  FROM readings r
  WHERE r.user_id = p_user_id
    AND (p_reading_type IS NULL OR r.reading_type = p_reading_type)
  ORDER BY r.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- AUDIT FUNCTIONS
-- ============================================================================

-- Function to log audit events
CREATE OR REPLACE FUNCTION log_audit_event(
  p_user_id TEXT DEFAULT NULL,
  p_action VARCHAR(100),
  p_resource_type VARCHAR(50) DEFAULT NULL,
  p_resource_id VARCHAR(100) DEFAULT NULL,
  p_details JSONB DEFAULT '{}',
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_success BOOLEAN DEFAULT true
)
RETURNS UUID AS $$
DECLARE
  v_audit_id UUID;
BEGIN
  INSERT INTO audit_logs (
    user_id, action, resource_type, resource_id, details,
    ip_address, user_agent, success
  ) VALUES (
    p_user_id, p_action, p_resource_type, p_resource_id, p_details,
    p_ip_address, p_user_agent, p_success
  ) RETURNING id INTO v_audit_id;
  
  RETURN v_audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ADMIN FUNCTIONS
-- ============================================================================

-- Function to get admin dashboard stats
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats(
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
  total_users BIGINT,
  total_readings BIGINT,
  total_transactions BIGINT,
  total_revenue DECIMAL,
  active_users_today BIGINT,
  readings_today BIGINT,
  avg_credits_per_user DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM profiles) as total_users,
    (SELECT COUNT(*) FROM readings) as total_readings,
    (SELECT COUNT(*) FROM transactions WHERE type = 'purchase') as total_transactions,
    (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE type = 'purchase' AND created_at >= NOW() - INTERVAL '1 day' * p_days) as total_revenue,
    (SELECT COUNT(*) FROM profiles WHERE last_login_at >= CURRENT_DATE) as active_users_today,
    (SELECT COUNT(*) FROM readings WHERE created_at >= CURRENT_DATE) as readings_today,
    (SELECT COALESCE(AVG(credit_balance), 0) FROM profiles) as avg_credits_per_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- FUNCTION COMMENTS
-- ============================================================================

COMMENT ON FUNCTION update_user_credits IS 'Kullanıcı kredi bakiyesini günceller ve transaction kaydı oluşturur';
COMMENT ON FUNCTION create_reading_with_credit_deduction IS 'Okuma oluşturur ve kredi düşer';
COMMENT ON FUNCTION get_user_readings IS 'Kullanıcının okuma geçmişini pagination ile getirir';
COMMENT ON FUNCTION log_audit_event IS 'Audit log kaydı oluşturur';
COMMENT ON FUNCTION get_admin_dashboard_stats IS 'Admin dashboard için istatistikleri getirir';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
