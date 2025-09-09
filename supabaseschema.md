# 🗄️ Supabase Schema Dokümantasyonu

## 📋 Genel Bakış

Bu dokümantasyon, Tarot uygulamasının Supabase veritabanı şemasının kapsamlı analizini içerir. Tüm tablolar, kolonlar, ilişkiler, güvenlik politikaları ve performans optimizasyonları detaylandırılmıştır.

**Son Güncelleme:** 2024  
**Veritabanı Versiyonu:** PostgreSQL 13.0.4  
**Supabase Projesi:** pootnkllsznjbaozpfss.supabase.co

---

## 🔧 Environment Variables (Çevre Değişkenleri)

### **Zorunlu Supabase Değişkenleri**
```env
NEXT_PUBLIC_SUPABASE_URL=pootnkllsznjbaozpfss.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aGdqZXNqdnVpYXRkdHdteWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTc5NTMsImV4cCI6MjA3MjI5Mzk1M30.ngX5H2zR-M7VCBXipWcsW98BFWS5zzIvdrAKcSHSnws
```

### **Opsiyonel Uygulama Değişkenleri**
```env
NEXT_PUBLIC_SITE_URL=your_site_url
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx
NEXT_PUBLIC_APP_NAME=Tarot Uygulaması
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development|production
```

### **Eksik Environment Değişkenleri (Kodda Kullanılan)**
```env
# Bu değişkenler kodda kullanılıyor ama environment'da tanımlı değil
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (555) 123 45 67
NEXT_PUBLIC_APP_NAME=TarotNumeroloji
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

### **Environment Değişken Durumu**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Mevcut ve kullanılıyor
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Mevcut ve kullanılıyor
- ❌ `NEXT_PUBLIC_SITE_URL` - Kodda kullanılıyor, environment'da eksik
- ❌ `NEXT_PUBLIC_CONTACT_PHONE` - Kodda kullanılıyor, environment'da eksik
- ❌ `NEXT_PUBLIC_APP_NAME` - Kodda kullanılıyor, environment'da eksik
- ❌ `NEXT_PUBLIC_APP_VERSION` - Kodda kullanılıyor, environment'da eksik
- ❌ `NODE_ENV` - Kodda kullanılıyor, environment'da eksik

---

## 📊 Database Schema (Veritabanı Şeması)

### **Toplam Tablo Sayısı:** 6
- ✅ `profiles` (1 satır)
- ✅ `admins` (0 satır)
- ✅ `tarot_readings` (0 satır)
- ✅ `detailed_questions` (0 satır)
- ✅ `user_questions` (0 satır)
- ✅ `transactions` (0 satır)

---

## 🏗️ Tablo Detayları

### 1. **profiles** - Kullanıcı Profilleri

**Amaç:** Kullanıcı profil bilgilerini ve kredi bakiyelerini saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key, auth.users.id ile bağlantılı |
| `display_name` | `text` | ❌ | `'Kullanıcı'` | Görünen isim |
| `credit_balance` | `integer` | ❌ | `100` | Kredi bakiyesi |
| `created_at` | `timestamptz` | ❌ | `now()` | Oluşturulma tarihi |
| `user_id` | `text` | ❌ | `''` | Kullanıcı ID'si |
| `full_name` | `text` | ❌ | `'Kullanıcı'` | Tam isim |
| `avatar_url` | `text` | ❌ | `''` | Profil resmi URL'si |
| `updated_at` | `timestamptz` | ❌ | `now()` | Güncellenme tarihi |

**Foreign Keys:**
- `profiles.id` → `auth.users.id`

**RLS Politikaları:**
- `Users can view own profile`: Kullanıcılar sadece kendi profillerini görebilir
- `Users can update own profile`: Kullanıcılar sadece kendi profillerini güncelleyebilir
- `Auto create profile`: Profil otomatik oluşturulabilir
- `profiles_select_self`: Gelişmiş SELECT politikası
- `profiles_insert_self`: Gelişmiş INSERT politikası
- `profiles_update_self`: Gelişmiş UPDATE politikası

---

### 2. **admins** - Admin Kullanıcıları

**Amaç:** Admin yetkisine sahip kullanıcıları saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `user_id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key, auth.users.id ile bağlantılı |
| `role` | `text` | ✅ | `'admin'` | Admin rolü |
| `created_at` | `timestamptz` | ✅ | `now()` | Oluşturulma tarihi |

**Foreign Keys:**
- `admins.user_id` → `auth.users.id`

**RLS Politikaları:**
- `Admins can view admin table`: Adminler admin tablosunu görüntüleyebilir

---

### 3. **tarot_readings** - Tarot Okuma Kayıtları

**Amaç:** Kullanıcıların tarot okuma geçmişini saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key |
| `user_id` | `text` | ❌ | `''` | Kullanıcı ID'si |
| `reading_type` | `text` | ❌ | `'general'` | Okuma türü (love, career, etc.) |
| `cards` | `jsonb` | ❌ | `'[]'` | Çekilen kartlar (JSON format) |
| `interpretation` | `text` | ❌ | `''` | Kart yorumu |
| `question` | `jsonb` | ✅ | - | Kullanıcı sorusu (JSON format) |
| `admin_notes` | `text` | ✅ | - | Admin notları |
| `status` | `text` | ✅ | `'pending'` | Durum (pending/reviewed/completed) |
| `title` | `text` | ✅ | - | Okuma başlığı |
| `summary` | `text` | ✅ | - | Okuma özeti |
| `cost_credits` | `integer` | ✅ | `2` | Maliyet (kredi) |
| `spread_name` | `text` | ✅ | - | Yayılım adı |
| `created_at` | `timestamptz` | ✅ | `now()` | Oluşturulma tarihi |
| `updated_at` | `timestamptz` | ✅ | `now()` | Güncellenme tarihi |

**Check Constraints:**
- `status` değeri: `'pending'`, `'reviewed'`, `'completed'` olabilir

**RLS Politikaları:**
- `Allow all operations for authenticated users`: Kimlik doğrulanmış kullanıcılar tüm işlemleri yapabilir

---

### 4. **detailed_questions** - Detaylı Soru Formları

**Amaç:** Kullanıcıların detaylı soru formlarını saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key |
| `user_id` | `text` | ❌ | `''` | Kullanıcı ID'si |
| `full_name` | `text` | ❌ | `''` | Tam isim |
| `birth_date` | `text` | ❌ | `''` | Doğum tarihi |
| `email` | `text` | ❌ | `''` | E-posta adresi |
| `concern` | `text` | ❌ | `''` | Endişe/merak |
| `understanding` | `text` | ❌ | `''` | Anlayış |
| `emotional` | `text` | ❌ | `''` | Duygusal durum |
| `reading_type` | `text` | ❌ | `'general'` | Okuma türü |
| `created_at` | `timestamptz` | ✅ | `now()` | Oluşturulma tarihi |

**RLS Politikaları:**
- `Allow all operations for authenticated users`: Kimlik doğrulanmış kullanıcılar tüm işlemleri yapabilir

---

### 5. **user_questions** - Kullanıcı Soruları

**Amaç:** Kullanıcıların basit sorularını saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key |
| `user_id` | `text` | ❌ | `''` | Kullanıcı ID'si |
| `question` | `text` | ❌ | `''` | Kullanıcı sorusu |
| `reading_type` | `text` | ❌ | `'general'` | Okuma türü |
| `created_at` | `timestamptz` | ✅ | `now()` | Oluşturulma tarihi |

**RLS Politikaları:**
- `Allow all operations for authenticated users`: Kimlik doğrulanmış kullanıcılar tüm işlemleri yapabilir

---

### 6. **transactions** - Kredi İşlemleri

**Amaç:** Kullanıcı kredi işlemlerini saklar.

| Kolon | Tip | Nullable | Default | Açıklama |
|-------|-----|----------|---------|----------|
| `id` | `uuid` | ❌ | `gen_random_uuid()` | Primary Key |
| `user_id` | `text` | ❌ | `''` | Kullanıcı ID'si |
| `delta_credits` | `integer` | ❌ | `0` | Kredi değişimi (+/-) |
| `reason` | `text` | ❌ | `''` | İşlem nedeni |
| `ref_type` | `text` | ✅ | - | Referans türü |
| `ref_id` | `text` | ✅ | - | Referans ID'si |
| `created_at` | `timestamptz` | ✅ | `now()` | Oluşturulma tarihi |

**RLS Politikaları:**
- `Allow all operations for authenticated users`: Kimlik doğrulanmış kullanıcılar tüm işlemleri yapabilir

---

## 🔐 Güvenlik (RLS - Row Level Security)

### **RLS Durumu**
Tüm tablolarda RLS etkin:
- ✅ `profiles` - RLS etkin
- ✅ `admins` - RLS etkin
- ✅ `tarot_readings` - RLS etkin
- ✅ `detailed_questions` - RLS etkin
- ✅ `user_questions` - RLS etkin
- ✅ `transactions` - RLS etkin

### **RLS Politikaları Detayı**

#### **profiles Tablosu**
```sql
-- Kullanıcılar sadece kendi profillerini görebilir
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Kullanıcılar sadece kendi profillerini güncelleyebilir
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Profil otomatik oluşturulabilir
CREATE POLICY "Auto create profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```

#### **Diğer Tablolar**
```sql
-- Kimlik doğrulanmış kullanıcılar tüm işlemleri yapabilir
CREATE POLICY "Allow all operations for authenticated users" ON [table_name]
    FOR ALL USING (true);
```

---

## ⚡ Performans Optimizasyonları

### **Index'ler**

#### **Primary Key Index'leri**
- `profiles_pkey` ON profiles(id)
- `admins_pkey` ON admins(user_id)
- `tarot_readings_pkey` ON tarot_readings(id)
- `detailed_questions_pkey` ON detailed_questions(id)
- `user_questions_pkey` ON user_questions(id)
- `transactions_pkey` ON transactions(id)

#### **Performans Index'leri**
- `idx_tarot_readings_user_id` ON tarot_readings(user_id)
- `idx_tarot_readings_created_at` ON tarot_readings(created_at)
- `idx_tarot_readings_title` ON tarot_readings(title)
- `idx_tarot_readings_cost_credits` ON tarot_readings(cost_credits)
- `idx_tarot_readings_spread_name` ON tarot_readings(spread_name)
- `idx_detailed_questions_user_id` ON detailed_questions(user_id)
- `idx_user_questions_user_id` ON user_questions(user_id)
- `idx_transactions_user_id` ON transactions(user_id)
- `idx_transactions_created_at` ON transactions(created_at)

---

## 🔗 İlişkiler (Relationships)

### **Foreign Key İlişkileri**
```sql
-- profiles tablosu auth.users ile bağlantılı
profiles.id → auth.users.id

-- admins tablosu auth.users ile bağlantılı
admins.user_id → auth.users.id
```

### **Mantıksal İlişkiler**
```sql
-- Kullanıcı profili ile okumaları arasında
profiles.user_id = tarot_readings.user_id

-- Kullanıcı profili ile soruları arasında
profiles.user_id = user_questions.user_id
profiles.user_id = detailed_questions.user_id

-- Kullanıcı profili ile işlemleri arasında
profiles.user_id = transactions.user_id

-- Okumalar ile işlemler arasında
tarot_readings.id = transactions.ref_id (ref_type = 'tarot_readings')
```

---

## 📝 Veri Tipleri ve Kısıtlamalar

### **Check Constraints**
```sql
-- tarot_readings.status değerleri
status IN ('pending', 'reviewed', 'completed')

-- NOT NULL kısıtlamaları
-- Tüm primary key'ler NOT NULL
-- Tüm user_id alanları NOT NULL
-- Tüm reading_type alanları NOT NULL
-- Tüm question alanları NOT NULL
-- Tüm delta_credits alanları NOT NULL
-- Tüm reason alanları NOT NULL
```

### **Default Değerler**
```sql
-- UUID'ler otomatik oluşturulur
id DEFAULT gen_random_uuid()

-- Timestamp'ler otomatik ayarlanır
created_at DEFAULT now()
updated_at DEFAULT now()

-- Kredi bakiyesi varsayılan değer
credit_balance DEFAULT 100

-- Okuma durumu varsayılan değer
status DEFAULT 'pending'

-- Okuma maliyeti varsayılan değer
cost_credits DEFAULT 2

-- Admin rolü varsayılan değer
role DEFAULT 'admin'
```

---

## 🚀 Kullanım Örnekleri

### **Profil İşlemleri**
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

### **Tarot Okuma İşlemleri**
```typescript
// Okuma kaydetme
const { data, error } = await supabase
  .from('tarot_readings')
  .insert({
    user_id: user.id,
    reading_type: 'love',
    cards: [
      { id: 1, name: 'The Lovers', isReversed: false },
      { id: 2, name: 'The Sun', isReversed: false }
    ],
    interpretation: 'Your love reading...',
    cost_credits: 3,
    status: 'completed'
  });

// Okumaları listeleme
const { data, error } = await supabase
  .from('tarot_readings')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

### **Kredi İşlemleri**
```typescript
// Kredi kesintisi
const { data, error } = await supabase
  .from('transactions')
  .insert({
    user_id: user.id,
    delta_credits: -3,
    reason: 'tarot_reading',
    ref_type: 'tarot_readings',
    ref_id: readingId
  });

// Kredi geçmişi
const { data, error } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

---

## 🔧 Kurulum ve Bakım

### **Migration Sırası**
1. `profiles` tablosu oluşturulur
2. `admins` tablosu oluşturulur
3. `tarot_readings` tablosu oluşturulur
4. `detailed_questions` tablosu oluşturulur
5. `user_questions` tablosu oluşturulur
6. `transactions` tablosu oluşturulur
7. RLS politikaları eklenir
8. Index'ler oluşturulur

### **Bakım Görevleri**
- Düzenli veritabanı yedekleme
- Index performansı izleme
- RLS politika güncellemeleri
- Veri temizleme (eski kayıtlar)

---

## 📊 İstatistikler

### **Tablo Boyutları**
- `profiles`: 1 kayıt
- `admins`: 0 kayıt
- `tarot_readings`: 0 kayıt
- `detailed_questions`: 0 kayıt
- `user_questions`: 0 kayıt
- `transactions`: 0 kayıt

### **Environment Değişken Durumu**
- ✅ **Mevcut:** 2 değişken (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- ❌ **Eksik:** 5 değişken (NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_PHONE, NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_VERSION, NODE_ENV)

### **Toplam Index Sayısı:** 16
### **Toplam RLS Politika Sayısı:** 12
### **Toplam Foreign Key Sayısı:** 2
### **Toplam Environment Değişken Sayısı:** 7 (2 mevcut + 5 eksik)

---

## ⚠️ Önemli Notlar

### **Güvenlik**
1. **RLS Güvenliği:** Tüm tablolar RLS ile korunmaktadır
2. **Environment Variables:** Sadece `NEXT_PUBLIC_*` değişkenleri client-side'da kullanılabilir
3. **TypeScript Types:** Database tipleri `src/lib/supabase/client.ts` dosyasında tanımlanmıştır

### **Performans**
1. **Index'ler:** Performans için gerekli index'ler oluşturulmuştur
2. **Default Values:** Yeni kullanıcılar 100 kredi ile başlar
3. **JSONB:** Kartlar ve sorular JSONB formatında saklanır

### **Veri Bütünlüğü**
1. **Foreign Keys:** Auth sistemi ile güçlü bağlantı
2. **Check Constraints:** Status değerleri kontrol edilir
3. **NOT NULL:** Kritik alanlar zorunludur

### **Eksik Environment Değişkenleri**
1. **NEXT_PUBLIC_SITE_URL:** Site URL'i tanımlanmalı
2. **NEXT_PUBLIC_CONTACT_PHONE:** İletişim telefonu tanımlanmalı
3. **NEXT_PUBLIC_APP_NAME:** Uygulama adı tanımlanmalı
4. **NEXT_PUBLIC_APP_VERSION:** Uygulama versiyonu tanımlanmalı
5. **NODE_ENV:** Ortam değişkeni tanımlanmalı

---

## 🔍 Sorun Giderme

### **Yaygın Hatalar**
- **"column does not exist"** → Migration'ları kontrol edin
- **"relation does not exist"** → Tablo oluşturma scriptini çalıştırın
- **RLS hatası** → RLS politikalarını kontrol edin
- **Environment variable hatası** → .env.local dosyasını kontrol edin
- **"process.env is undefined"** → Eksik environment değişkenlerini ekleyin
- **"NEXT_PUBLIC_* is undefined"** → Client-side değişkenlerini tanımlayın

### **Debug Araçları**
- `debug-supabase-connection.js` - Bağlantı testi
- `check-*-table.sql` - Tablo yapısı kontrolü
- Browser console'da Supabase client logları

---

## 📞 Destek

### **Geliştirici Notları**
- Veritabanı PostgreSQL 13.0.4 kullanır
- Supabase Auth v2 entegrasyonu
- Next.js 14 App Router ile uyumlu
- TypeScript strict mode destekler

### **İletişim**
- **Dokümantasyon**: Bu dosya
- **Kod Yorumları**: Her dosyada detaylı açıklamalar
- **Setup Rehberi**: `list.md`, `auth.md`

---

*Son güncelleme: 2024*  
*Versiyon: 1.0*  
*Durum: Production Ready*  
*Özellikler: RLS, Index'ler, Foreign Keys, Check Constraints*
