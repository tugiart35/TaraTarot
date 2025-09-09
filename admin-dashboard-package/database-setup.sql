-- Admin Dashboard Database Setup
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logları tablosu
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT CHECK (status IN ('success', 'failure', 'pending'))
);

-- Kullanıcı profilleri tablosu (eğer yoksa)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  credit_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Admin tablosu için RLS politikaları
CREATE POLICY "Admins can view all admins" ON admins FOR SELECT USING (true);
CREATE POLICY "Admins can insert admins" ON admins FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update admins" ON admins FOR UPDATE USING (true);
CREATE POLICY "Admins can delete admins" ON admins FOR DELETE USING (true);

-- Audit logs için RLS politikaları
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (true);
CREATE POLICY "System can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- Profiles için RLS politikaları
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (true);
