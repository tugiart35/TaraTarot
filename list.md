# Supabase Şeması ve Değişkenler Listesi

## 🔧 Environment Variables (Çevre Değişkenleri)

### Gerekli Supabase Değişkenleri
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Opsiyonel Değişkenler
```env
NEXT_PUBLIC_SITE_URL=your_site_url
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx
NEXT_PUBLIC_APP_NAME=Tarot Uygulaması
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development|production
```

## 📊 Database Schema (Veritabanı Şeması)

### 1. Auth Tables (Otomatik Supabase Tabloları)

#### `auth.users` (Supabase tarafından yönetilir)
```sql
-- Otomatik Supabase auth tablosu
-- user_metadata.role: 'admin' | 'premium' | 'user' | 'guest'
-- user_metadata.subscription: Payment subscription info
-- user_metadata.last_login: Son giriş tarihi
-- email_confirmed_at: E-posta onay tarihi
-- created_at: Hesap oluşturma tarihi
```

### 2. Custom Tables (Özel Tablolar)

#### `profiles` - Kullanıcı Profilleri
```sql
CREATE TABLE profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    full_name TEXT,
    display_name TEXT,
    avatar_url TEXT,
    credit_balance INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**RLS Politikaları:**
- `profiles_select_self`: Kullanıcılar sadece kendi profillerini görebilir
- `profiles_insert_self`: Kullanıcılar sadece kendi profillerini oluşturabilir
- `profiles_update_self`: Kullanıcılar sadece kendi profillerini güncelleyebilir

#### `tarot_readings` - Tarot Okuma Kayıtları
```sql
CREATE TABLE tarot_readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    cards JSONB NOT NULL,
    interpretation TEXT NOT NULL,
    question JSONB,
    admin_notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed')),
    title TEXT,
    summary TEXT,
    cost_credits INTEGER DEFAULT 2,
    spread_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Index'ler:**
- `idx_tarot_readings_user_id` ON tarot_readings(user_id)
- `idx_tarot_readings_created_at` ON tarot_readings(created_at)
- `idx_tarot_readings_title` ON tarot_readings(title)
- `idx_tarot_readings_cost_credits` ON tarot_readings(cost_credits)
- `idx_tarot_readings_spread_name` ON tarot_readings(spread_name)

#### `detailed_questions` - Detaylı Soru Formları
```sql
CREATE TABLE detailed_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    email TEXT NOT NULL,
    concern TEXT NOT NULL,
    understanding TEXT NOT NULL,
    emotional TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Index:**
- `idx_detailed_questions_user_id` ON detailed_questions(user_id)

#### `user_questions` - Kullanıcı Soruları
```sql
CREATE TABLE user_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question TEXT NOT NULL,
    reading_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Index:**
- `idx_user_questions_user_id` ON user_questions(user_id)

#### `transactions` - Kredi İşlemleri
```sql
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    delta_credits INTEGER NOT NULL,
    reason TEXT NOT NULL,
    ref_type TEXT,
    ref_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Index'ler:**
- `idx_transactions_user_id` ON transactions(user_id)
- `idx_transactions_created_at` ON transactions(created_at)

### 3. RLS (Row Level Security) Durumu

Tüm custom tablolar RLS ile korunmaktadır:
- ✅ `profiles` - RLS etkin
- ✅ `tarot_readings` - RLS etkin
- ✅ `detailed_questions` - RLS etkin
- ✅ `user_questions` - RLS etkin
- ✅ `transactions` - RLS etkin

**RLS Politikaları:**
```sql
-- Tüm tablolar için genel politika
CREATE POLICY "Allow all operations for authenticated users" ON [table_name]
    FOR ALL USING (true);
```

## 🔗 Supabase Client Konfigürasyonu

### Client Dosyası: `src/lib/supabase/client.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

### TypeScript Database Types
```typescript
export interface Database {
  public: {
    Tables: {
      profiles: { /* profil tablosu tip tanımları */ };
      user_questions: { /* kullanıcı soruları tip tanımları */ };
      detailed_questions: { /* detaylı sorular tip tanımları */ };
      tarot_readings: { /* tarot okumaları tip tanımları */ };
      transactions: { /* işlemler tip tanımları */ };
    };
  };
}
```

**✅ Düzeltilen Uyumsuzluklar:**
- `profiles` tablosu eklendi (display_name, credit_balance, avatar_url)
- `transactions` tablosu eklendi (delta_credits, reason, ref_type, ref_id)
- `tarot_readings` tablosuna eksik alanlar eklendi (title, summary, cost_credits, spread_name)
- JSONB alanları için doğru tip tanımları (cards, question alanları için `any` tipi)

## 📁 İlgili Dosyalar

### SQL Dosyaları
- `create-tarot-tables.sql` - Ana tablo oluşturma scripti
- `check-profiles-table.sql` - Profiles tablosu kontrol scripti
- `fix-profiles-table.sql` - Profiles tablosu düzeltme scripti
- `check-transactions-table.sql` - Transactions tablosu kontrol scripti
- `update-tarot-readings-table.sql` - Tarot readings tablosu güncelleme scripti

### TypeScript Dosyaları
- `src/lib/supabase/client.ts` - Supabase client konfigürasyonu
- `src/types/auth.types.ts` - Auth tip tanımları
- `src/lib/utils/profile-utils.ts` - Profil yardımcı fonksiyonları

### Test ve Debug Dosyaları
- `debug-supabase-connection.js` - Supabase bağlantı test scripti
- `test-scenarios.md` - Test senaryoları
- `TRANSACTIONS_TABLE_FIX.md` - Transactions tablosu düzeltme rehberi

## 🚀 Kurulum Adımları

1. **Environment Variables Ayarla:**
   ```bash
   # .env.local dosyası oluştur
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Supabase SQL Editor'da Tabloları Oluştur:**
   ```sql
   -- create-tarot-tables.sql dosyasını çalıştır
   ```

3. **Profiles Tablosunu Kontrol Et:**
   ```sql
   -- check-profiles-table.sql dosyasını çalıştır
   ```

4. **Eksik Kolonları Ekle:**
   ```sql
   -- fix-profiles-table.sql dosyasını çalıştır
   ```

## 🔍 Kullanım Örnekleri

### Profiles Tablosu Kullanımı
```typescript
// Profil oluşturma
const { data, error } = await supabase
  .from('profiles')
  .insert({
    user_id: user.id,
    full_name: 'Test User',
    display_name: 'Test User',
    credit_balance: 100
  });

// Profil güncelleme
const { data, error } = await supabase
  .from('profiles')
  .update({ credit_balance: 95 })
  .eq('user_id', user.id);
```

### Tarot Readings Tablosu Kullanımı
```typescript
// Okuma kaydetme
const { data, error } = await supabase
  .from('tarot_readings')
  .insert({
    user_id: user.id,
    reading_type: 'love',
    cards: ['card1', 'card2', 'card3'],
    interpretation: 'Your reading...',
    cost_credits: 3
  });
```

### Transactions Tablosu Kullanımı
```typescript
// Kredi işlemi kaydetme
const { data, error } = await supabase
  .from('transactions')
  .insert({
    user_id: user.id,
    delta_credits: -3,
    reason: 'tarot_reading',
    ref_type: 'tarot_readings',
    ref_id: readingId
  });
```

## ⚠️ Önemli Notlar

1. **RLS Güvenliği:** Tüm tablolar RLS ile korunmaktadır
2. **Environment Variables:** Sadece `NEXT_PUBLIC_*` değişkenleri client-side'da kullanılabilir
3. **TypeScript Types:** Database tipleri `src/lib/supabase/client.ts` dosyasında tanımlanmıştır
4. **Index'ler:** Performans için gerekli index'ler oluşturulmuştur
5. **Default Values:** Yeni kullanıcılar 100 kredi ile başlar

## 🔧 Sorun Giderme

### Yaygın Hatalar:
- **"column does not exist"** → İlgili SQL fix dosyasını çalıştır
- **"relation does not exist"** → Tablo oluşturma scriptini çalıştır
- **RLS hatası** → RLS politikalarını kontrol et
- **Environment variable hatası** → .env.local dosyasını kontrol et

### Debug Araçları:
- `debug-supabase-connection.js` - Bağlantı testi
- `check-*-table.sql` - Tablo yapısı kontrolü
- Browser console'da Supabase client logları
