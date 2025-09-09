# 🔮 Tarot Projesi Transfer Rehberi

Bu rehber, tarot projesini başka bir Next.js projesine nasıl transfer edeceğinizi açıklar.

## 📋 Transfer Öncesi Hazırlık

### 1. Hedef Proje Kontrolü
- Hedef proje bir Next.js projesi olmalı
- `package.json` dosyası mevcut olmalı
- TypeScript desteği olması önerilir

### 2. Yedekleme
- Her zaman önce yedek alın
- Mevcut projenizin çalışan halini koruyun

## 🚀 Transfer Yöntemleri

### Yöntem 1: Otomatik Script (Önerilen)

```bash
# Script'i çalıştırın
./transfer-project.sh /path/to/target-project

# Örnek:
./transfer-project.sh /Users/kullanici/yeni-proje
```

**Avantajları:**
- Otomatik yedekleme
- package.json birleştirme
- Bağımlılık yükleme
- Hata kontrolü

### Yöntem 2: Manuel Kopyalama

```bash
# Hedef proje klasörüne gidin
cd /path/to/target-project

# Ana klasörleri kopyalayın
cp -r "/Volumes/XPG_1/Busbuskimki-tarot kopyası/src" ./
cp -r "/Volumes/XPG_1/Busbuskimki-tarot kopyası/public" ./

# Konfigürasyon dosyalarını kopyalayın
cp "/Volumes/XPG_1/Busbuskimki-tarot kopyası/tailwind.config.ts" ./
cp "/Volumes/XPG_1/Busbuskimki-tarot kopyası/next.config.js" ./
cp "/Volumes/XPG_1/Busbuskimki-tarot kopyası/tsconfig.json" ./
cp "/Volumes/XPG_1/Busbuskimki-tarot kopyası/postcss.config.js" ./

# Bağımlılıkları yükleyin
npm install
```

### Yöntem 3: Git Subtree

```bash
# Hedef projede
git subtree add --prefix=tarot-app "/Volumes/XPG_1/Busbuskimki-tarot kopyası" yeni-gelistirme-branch --squash
```

## 📁 Transfer Edilecek Dosyalar

### Ana Klasörler
- `src/` - Tüm kaynak kod
- `public/` - Statik dosyalar (kartlar, resimler)

### Konfigürasyon Dosyaları
- `tailwind.config.ts` - Tailwind CSS konfigürasyonu
- `next.config.js` - Next.js konfigürasyonu
- `tsconfig.json` - TypeScript konfigürasyonu
- `postcss.config.js` - PostCSS konfigürasyonu

### Bağımlılıklar (package.json'dan)
```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "framer-motion": "^12.23.0",
    "next": "^15.4.4",
    "next-pwa": "^5.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.5.0",
    "zod": "^4.0.5"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "^15.4.4",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.5.0",
    "postcss": "^8",
    "prettier": "^3.6.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

## ⚙️ Transfer Sonrası Ayarlar

### 1. Environment Variables
```bash
# .env.local dosyası oluşturun
NEXT_PUBLIC_APP_NAME="Tarot Uygulaması"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 2. Port Ayarları
```bash
# package.json'da port değiştirin
"dev": "next dev -p 3000"  # Varsayılan port
```

### 3. Veritabanı Bağlantıları
- Supabase bağlantılarını kontrol edin
- API anahtarlarını güncelleyin

## 🧪 Test Etme

```bash
# Projeyi başlatın
npm run dev

# Linting kontrolü
npm run lint

# Build testi
npm run build
```

## 🚨 Olası Sorunlar ve Çözümleri

### 1. Port Çakışması
```bash
# Farklı port kullanın
npm run dev -- -p 3001
```

### 2. Bağımlılık Çakışması
```bash
# node_modules'ü temizleyin
rm -rf node_modules package-lock.json
npm install
```

### 3. TypeScript Hataları
```bash
# TypeScript cache'ini temizleyin
rm -rf .next
npm run build
```

## 📞 Destek

Transfer sırasında sorun yaşarsanız:
1. Yedek dosyalarınızı kontrol edin
2. Console hatalarını inceleyin
3. Bağımlılık versiyonlarını kontrol edin

## ✅ Transfer Kontrol Listesi

- [ ] Hedef proje Next.js projesi
- [ ] Yedek alındı
- [ ] src/ klasörü kopyalandı
- [ ] public/ klasörü kopyalandı
- [ ] Konfigürasyon dosyaları kopyalandı
- [ ] package.json birleştirildi
- [ ] Bağımlılıklar yüklendi
- [ ] Proje çalışıyor
- [ ] Linting geçiyor
- [ ] Build başarılı

---

**🎉 Transfer tamamlandıktan sonra tarot uygulamanız hazır olacak!**
