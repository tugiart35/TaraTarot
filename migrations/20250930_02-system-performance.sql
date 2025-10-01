-- System Performance tablosu oluşturma
CREATE TABLE IF NOT EXISTS system_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uptime NUMERIC NOT NULL DEFAULT 99.9,
  response_time INTEGER NOT NULL DEFAULT 45,
  memory_usage NUMERIC NOT NULL DEFAULT 2.4,
  cpu_usage INTEGER NOT NULL DEFAULT 12,
  active_users INTEGER NOT NULL DEFAULT 0,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- İndeks oluştur
CREATE INDEX IF NOT EXISTS idx_system_performance_timestamp ON system_performance (timestamp);

-- RLS politikaları
ALTER TABLE system_performance ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için okuma yetkisi
CREATE POLICY "Admins can read system performance" 
  ON system_performance FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Admin kullanıcıları için yazma yetkisi
CREATE POLICY "Admins can insert system performance" 
  ON system_performance FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Örnek veri ekleme
INSERT INTO system_performance (uptime, response_time, memory_usage, cpu_usage, active_users, timestamp)
VALUES 
  (99.98, 42, 2.1, 8, 3, now() - interval '1 day'),
  (99.95, 47, 2.3, 15, 5, now() - interval '12 hours'),
  (99.99, 38, 1.9, 10, 2, now() - interval '6 hours'),
  (99.97, 44, 2.2, 12, 4, now() - interval '3 hours'),
  (99.99, 40, 2.0, 9, 3, now() - interval '1 hour'),
  (99.98, 43, 2.4, 11, 5, now());

-- Sistem performans verilerini kaydetmek için fonksiyon
CREATE OR REPLACE FUNCTION log_system_performance(
  p_uptime NUMERIC,
  p_response_time INTEGER,
  p_memory_usage NUMERIC,
  p_cpu_usage INTEGER,
  p_active_users INTEGER
) RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO system_performance (
    uptime, 
    response_time, 
    memory_usage, 
    cpu_usage, 
    active_users
  ) VALUES (
    p_uptime, 
    p_response_time, 
    p_memory_usage, 
    p_cpu_usage, 
    p_active_users
  ) RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
