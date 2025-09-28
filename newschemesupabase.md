# Yeni Optimize Edilmiş Supabase Veritabanı Şeması

## Genel Bakış

Bu şema, mevcut 11 tabloyu 6 optimize edilmiş tabloya indirgeyerek maliyeti
düşürür ve performansı artırır.

## Tablo Yapısı

### 1. `profiles` Tablosu

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  credit_balance INTEGER DEFAULT 0 NOT NULL,
  is_premium BOOLEAN DEFAULT false NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  timezone VARCHAR(50) DEFAULT 'Europe/Istanbul' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 2. `readings` Tablosu

```sql
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reading_type VARCHAR(50) NOT NULL CHECK (reading_type IN ('tarot', 'numerology', 'love', 'career', 'general')),
  spread_name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  interpretation TEXT NOT NULL,
  cards JSONB,
  questions JSONB,
  cost_credits INTEGER DEFAULT 0 NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 3. `transactions` Tablosu

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('purchase', 'refund', 'bonus', 'deduction', 'reading')),
  amount INTEGER NOT NULL,
  description TEXT,
  reference_type VARCHAR(50),
  reference_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 4. `packages` Tablosu

```sql
CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL,
  price_eur DECIMAL(10,2) NOT NULL,
  price_try DECIMAL(10,2) NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  shopier_product_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 5. `spreads` Tablosu

```sql
CREATE TABLE spreads (
  id SERIAL PRIMARY KEY,
  name_tr VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_sr VARCHAR(100) NOT NULL,
  description_tr TEXT,
  description_en TEXT,
  description_sr TEXT,
  positions JSONB NOT NULL,
  card_count INTEGER NOT NULL,
  cost_credits INTEGER DEFAULT 0 NOT NULL,
  category VARCHAR(20) DEFAULT 'general' NOT NULL CHECK (category IN ('general', 'love', 'career', 'spiritual', 'health')),
  difficulty_level VARCHAR(20) DEFAULT 'beginner' NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 6. `admin_logs` Tablosu

```sql
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id VARCHAR(100),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

## İndeksler

```sql
-- Performans için indeksler
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_created_at ON readings(created_at);
CREATE INDEX idx_readings_status ON readings(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_packages_active ON packages(active);
CREATE INDEX idx_spreads_active ON spreads(active);
CREATE INDEX idx_spreads_category ON spreads(category);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);
```

## RLS Politikaları

```sql
-- RLS'yi etkinleştir
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE spreads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Profiles politikaları
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Readings politikaları
CREATE POLICY "Users can view own readings" ON readings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own readings" ON readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all readings" ON readings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Transactions politikaları
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Packages politikaları (herkese açık)
CREATE POLICY "Everyone can view active packages" ON packages FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage packages" ON packages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Spreads politikaları (herkese açık)
CREATE POLICY "Everyone can view active spreads" ON spreads FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage spreads" ON spreads FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Admin logs politikaları (sadece adminler)
CREATE POLICY "Admins can view admin logs" ON admin_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can insert admin logs" ON admin_logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
```

## Veri Migrasyonu

### Eski Tablolardan Yeni Tablolara Geçiş

```sql
-- Profiles tablosuna veri aktarımı
INSERT INTO profiles (id, email, display_name, avatar_url, credit_balance, is_premium, is_admin, timezone, created_at, updated_at)
SELECT id, email, display_name, avatar_url, credit_balance, is_premium, is_admin, timezone, created_at, updated_at
FROM users_old;

-- Readings tablosuna veri aktarımı
INSERT INTO readings (id, user_id, reading_type, spread_name, title, interpretation, cards, questions, cost_credits, status, metadata, created_at, updated_at)
SELECT
  id,
  user_id,
  reading_type,
  COALESCE(spread_name, 'Bilinmeyen Yayılım') as spread_name,
  COALESCE(title, 'Okuma') as title,
  interpretation,
  cards,
  questions,
  cost_credits,
  status,
  metadata,
  created_at,
  updated_at
FROM tarot_readings_old;

-- Transactions tablosuna veri aktarımı
INSERT INTO transactions (id, user_id, type, amount, description, reference_type, reference_id, created_at)
SELECT
  id,
  user_id,
  type,
  amount,
  description,
  reference_type,
  reference_id,
  created_at
FROM transactions_old;
```

## Avantajlar

1. **Maliyet Azaltma**: 11 tablodan 6 tabloya düşürme
2. **Performans Artışı**: Optimize edilmiş indeksler
3. **Veri Tutarlılığı**: JSONB kullanımı ile esnek veri yapısı
4. **Güvenlik**: RLS politikaları ile veri güvenliği
5. **Ölçeklenebilirlik**: Daha az tablo ile daha iyi performans

## JSONB Kullanımı

- `cards`: Tarot kartları ve pozisyonları
- `questions`: Kullanıcı form verileri
- `metadata`: Ek bilgiler ve ayarlar
- `positions`: Tarot açılım pozisyonları
- `details`: Admin log detayları

Bu şema, mevcut uygulamanın tüm işlevselliğini korurken maliyeti ve karmaşıklığı
önemli ölçüde azaltır.
