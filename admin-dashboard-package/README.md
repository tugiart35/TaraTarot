# Admin Dashboard Migration Package

Bu paket, Busbuskimki projesindeki admin dashboard'unu başka bir projeye taşımak için hazırlanmıştır.

## 📁 İçerik

- `src/app/admin/` - Admin sayfaları
- `src/components/admin/` - Admin bileşenleri
- `src/lib/` - Paylaşılan kütüphaneler
- `src/hooks/` - React hook'ları
- `src/lib/constants/` - Sabitler
- `package-dependencies.json` - Gerekli NPM paketleri
- `database-setup.sql` - Veritabanı kurulum scripti
- `.env.example` - Environment variables template

## 🚀 Kurulum Adımları

### 1. Dosyaları Kopyalayın
```bash
# Yeni projede bu klasörleri oluşturun
mkdir -p src/app/admin
mkdir -p src/components/admin
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/lib/constants

# Dosyaları kopyalayın
cp -r src/app/admin/* your-project/src/app/admin/
cp -r src/components/admin/* your-project/src/components/admin/
cp -r src/lib/* your-project/src/lib/
cp -r src/hooks/* your-project/src/hooks/
cp -r src/lib/constants/* your-project/src/lib/constants/
```

### 2. NPM Paketlerini Yükleyin
```bash
# package-dependencies.json'daki paketleri yükleyin
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs lucide-react recharts framer-motion react-icons
```

### 3. Environment Variables
```bash
# .env.local dosyası oluşturun
cp .env.example your-project/.env.local
# Supabase URL ve anahtarını güncelleyin
```

### 4. Veritabanı Kurulumu
```bash
# Supabase SQL Editor'da database-setup.sql dosyasını çalıştırın
```

### 5. Admin Kullanıcısı Ekleme
```sql
-- Supabase SQL Editor'da çalıştırın
INSERT INTO admins (user_id, role) 
VALUES ('your-user-id', 'admin');
```

## ⚠️ Önemli Notlar

1. **Import Yolları**: Tüm `@/` import yollarının yeni projede çalıştığından emin olun
2. **TypeScript**: Yeni projede TypeScript yapılandırmasını kontrol edin
3. **Tailwind CSS**: Admin dashboard Tailwind CSS kullanıyor, yeni projede yapılandırın
4. **Supabase**: Yeni projede Supabase URL ve anahtarını güncelleyin

## 🔧 Yapılandırma

### Tailwind CSS
Admin dashboard Tailwind CSS kullanıyor. Yeni projede Tailwind CSS'i yapılandırın.

### TypeScript
Tüm dosyalar TypeScript ile yazılmış. Yeni projede TypeScript yapılandırmasını kontrol edin.

### Next.js
Admin dashboard Next.js 15 kullanıyor. Yeni projede uyumlu Next.js versiyonu kullanın.

## 🐛 Sorun Giderme

### Import Hataları
- `@/` import yollarının yeni projede çalıştığından emin olun
- `tsconfig.json`'da path mapping'i kontrol edin

### Veritabanı Hataları
- Supabase bağlantı ayarlarını kontrol edin
- RLS politikalarının doğru ayarlandığından emin olun
- Admin kullanıcısının `admins` tablosunda olduğundan emin olun

### Stil Sorunları
- Tailwind CSS'in yüklü ve yapılandırıldığından emin olun
- CSS dosyalarının doğru import edildiğinden emin olun

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız, lütfen proje sahibiyle iletişime geçin.
