# 🎴 Mystik Tarot - Proje Yapısı ve Dosya Haritası

## 📋 Genel Bakış

Bu proje, **Next.js 15** tabanlı modern bir tarot okuma uygulamasıdır. Kullanıcılar farklı tarot açılımları yapabilir, kartların anlamlarını öğrenebilir ve ruhani rehberlik alabilir. Proje **TypeScript**, **Tailwind CSS**, **Supabase** ve **PWA** teknolojileri kullanılarak geliştirilmiştir.

**Proje Adı:** Mystik Tarot  
**Versiyon:** 2.0.0  
**Teknoloji Stack:** Next.js 15, TypeScript, Tailwind CSS, Supabase, PWA  
**Dil Desteği:** Türkçe (TR), İngilizce (EN), Sırpça (SR - Latin)  
**Geliştirme Portu:** 3111  

---

## 🏗️ Proje Mimarisi

### **Ana Teknolojiler**
- **Frontend Framework:** Next.js 15 (App Router)
- **Programlama Dili:** TypeScript
- **Styling:** Tailwind CSS
- **Veritabanı:** Supabase (PostgreSQL)
- **Kimlik Doğrulama:** Supabase Auth
- **Uluslararasılaştırma:** next-intl
- **PWA:** next-pwa
- **Animasyonlar:** Framer Motion
- **İkonlar:** Heroicons, Lucide React, React Icons

### **Proje Yapısı**
```
Busbuskimki-tarot kopyası/
├── 📁 src/                    # Ana kaynak kodları
├── 📁 public/                 # Statik dosyalar
├── 📁 messages/               # Çeviri dosyaları
├── 📁 admin-dashboard-package/ # Admin panel paketi
├── 📁 docs/                   # Dokümantasyon
├── 📁 tests/                  # Test dosyaları
├── 📁 scripts/                # Yardımcı scriptler
└── 📄 Konfigürasyon dosyaları
```

---

## 📁 Detaylı Dosya Yapısı

### **🔧 Kök Dizin Konfigürasyon Dosyaları**

| Dosya | Açıklama | Önem |
|-------|----------|------|
| `package.json` | Proje bağımlılıkları ve script'ler | ⭐⭐⭐⭐⭐ |
| `next.config.js` | Next.js konfigürasyonu | ⭐⭐⭐⭐ |
| `tailwind.config.ts` | Tailwind CSS konfigürasyonu | ⭐⭐⭐⭐ |
| `tsconfig.json` | TypeScript konfigürasyonu | ⭐⭐⭐⭐ |
| `postcss.config.js` | PostCSS konfigürasyonu | ⭐⭐⭐ |
| `i18n.ts` | Uluslararasılaştırma konfigürasyonu | ⭐⭐⭐⭐ |
| `middleware.ts` | Next.js middleware (routing, auth, security) | ⭐⭐⭐⭐⭐ |

### **📱 Public Dizin (Statik Dosyalar)**

| Klasör/Dosya | Açıklama | İçerik |
|--------------|----------|--------|
| `cards/` | Tarot kart görselleri | 78 adet RWS tarot kartı |
| `icons/` | PWA ikonları | 72x72'den 512x512'ye kadar |
| `images/` | Uygulama görselleri | Arka plan ve UI görselleri |
| `manifest.json` | PWA manifest dosyası | Uygulama meta bilgileri |
| `sw.js` | Service Worker | PWA offline desteği |
| `sw-auth.js` | Auth Service Worker | Kimlik doğrulama SW |

### **🌍 Messages Dizin (Çeviri Dosyaları)**

| Dosya | Dil | Açıklama |
|-------|-----|----------|
| `tr.json` | Türkçe | Ana dil, 1300+ çeviri anahtarı |
| `en.json` | İngilizce | İkinci dil, 1255+ çeviri anahtarı |
| `sr.json` | Sırpça (Latin) | Üçüncü dil, 1255+ çeviri anahtarı |

---

## 🎯 Src Dizin Yapısı

### **📱 App Dizin (Next.js App Router)**

#### **Ana Layout Dosyaları**
| Dosya | Açıklama | Önem |
|-------|----------|------|
| `layout.tsx` | Kök layout (HTML, head, body) | ⭐⭐⭐⭐⭐ |
| `globals.css` | Global CSS stilleri | ⭐⭐⭐⭐ |
| `[locale]/layout.tsx` | Locale layout (i18n wrapper) | ⭐⭐⭐⭐ |

#### **Sayfa Yapısı**
```
src/app/[locale]/
├── 📁 (main)/                 # Ana sayfa grubu
│   ├── 📁 legal/              # Yasal sayfalar
│   │   ├── about/page.tsx     # Hakkımızda
│   │   ├── contact/page.tsx   # İletişim
│   │   ├── privacy-policy/    # Gizlilik politikası
│   │   ├── terms-of-use/      # Kullanım şartları
│   │   └── ...                # Diğer yasal sayfalar
│   └── 📁 tarotokumasi/       # Tarot okuma sayfası
│       └── page.tsx           # Ana tarot sayfası
├── 📁 admin/                  # Admin paneli
│   ├── analytics/page.tsx     # Analitik
│   ├── content/page.tsx       # İçerik yönetimi
│   ├── orders/page.tsx        # Sipariş yönetimi
│   ├── packages/page.tsx      # Paket yönetimi
│   ├── settings/page.tsx      # Ayarlar
│   └── users/page.tsx         # Kullanıcı yönetimi
├── 📁 auth/                   # Kimlik doğrulama
│   ├── confirm/route.ts       # Email doğrulama
│   └── ...                    # Diğer auth sayfaları
└── 📁 dashboard/              # Kullanıcı paneli
    ├── credits/page.tsx       # Kredi yönetimi
    ├── readings/page.tsx      # Okuma geçmişi
    ├── settings/page.tsx      # Kullanıcı ayarları
    └── statistics/page.tsx    # İstatistikler
```

### **🧩 Features Dizin (Özellik Modülleri)**

#### **Shared Features (Paylaşılan Bileşenler)**
```
src/features/shared/
├── 📁 layout/                 # Layout bileşenleri
│   ├── BottomNavigation.tsx   # Alt navigasyon
│   ├── Footer.tsx             # Alt bilgi
│   ├── HeadTags.tsx           # HTML head etiketleri
│   ├── RootLayout.tsx         # Kök layout
│   └── index.ts               # Export dosyası
└── 📁 ui/                     # UI bileşenleri
    ├── BaseCardDetails.tsx    # Kart detay modalı
    ├── BaseCardGallery.tsx    # Kart galerisi
    ├── BaseCardPosition.tsx   # Kart pozisyonu
    ├── BaseCardRenderer.tsx   # Kart renderer
    ├── BaseInterpretation.tsx # Yorum bileşeni
    ├── BaseReadingTypeSelector.tsx # Okuma tipi seçici
    ├── CreditInfoModal.tsx    # Kredi bilgi modalı
    ├── ErrorBoundary.tsx      # Hata yakalama
    ├── ErrorDisplay.tsx       # Hata gösterimi
    ├── LanguageSwitcher.tsx   # Dil değiştirici
    ├── LoadingSpinner.tsx     # Yükleme animasyonu
    ├── MobileScrollWrapper.tsx # Mobil kaydırma
    ├── ReadingDetailModal.tsx # Okuma detay modalı
    ├── ReadingInfoModal.tsx   # Okuma bilgi modalı
    ├── Toast.tsx              # Bildirim sistemi
    └── 📁 tarot/              # Tarot özel bileşenler
        └── GenericTarotSpread.tsx # Genel tarot açılımı
```

#### **Tarot Features (Tarot Modülü)**
```
src/features/tarot/
├── 📁 components/             # Tarot bileşenleri
│   ├── 📁 Love-Spread/        # Aşk açılımı
│   │   ├── love-config.ts     # Aşk açılımı konfigürasyonu
│   │   ├── LoveCardRenderer.tsx # Aşk kartı renderer
│   │   ├── LoveGuidanceDetail.tsx # Aşk rehberlik detayı
│   │   ├── LoveInterpretation.tsx # Aşk yorumu
│   │   └── LoveTarot.tsx      # Ana aşk tarot bileşeni
│   └── 📁 standard/           # Standart bileşenler
│       ├── LastReadingSummary.tsx # Son okuma özeti
│       └── TarotSpreadSelector.tsx # Açılım seçici
├── 📁 lib/                    # Tarot kütüphaneleri
│   ├── a-tarot-helpers.ts     # Tarot yardımcı fonksiyonlar
│   ├── full-tarot-deck.ts     # Tam tarot destesi
│   └── 📁 love/               # Aşk açılımı kütüphaneleri
│       ├── i18n-helper.ts     # i18n yardımcıları
│       ├── position-1-ilgi-duydugun-kisi.ts # Pozisyon 1
│       ├── position-2-fiziksel.ts # Pozisyon 2
│       ├── position-3-baglanti.ts # Pozisyon 3
│       ├── position-4-uzun-vadeli-surec.ts # Pozisyon 4
│       └── position-meanings-index.ts # Pozisyon anlamları
└── index.ts                   # Export dosyası
```

### **🔧 Lib Dizin (Kütüphaneler ve Yardımcılar)**

#### **Konfigürasyon Dosyaları**
```
src/lib/config/
├── app-config.ts              # Uygulama konfigürasyonu
└── metadata.ts                # SEO ve meta bilgiler
```

#### **Sabitler**
```
src/lib/constants/
├── reading-credits.ts         # Okuma kredi miktarları
└── tarotSpreads.ts            # Tarot açılım türleri
```

#### **Uluslararasılaştırma**
```
src/lib/i18n/
├── config.ts                  # i18n konfigürasyonu
├── paths.ts                   # Dil yolları
└── validation.ts              # Dil validasyonu
```

#### **Supabase**
```
src/lib/supabase/
└── client.ts                  # Supabase client konfigürasyonu
```

#### **Güvenlik**
```
src/lib/security/
├── 2fa.ts                     # İki faktörlü kimlik doğrulama
├── audit-logger.ts            # Denetim günlüğü
└── rate-limiter.ts            # Hız sınırlama
```

#### **Yardımcı Fonksiyonlar**
```
src/lib/utils/
├── profile-utils.ts           # Profil yardımcıları
└── user-id-utils.ts           # Kullanıcı ID yardımcıları
```

#### **Diğer Kütüphaneler**
| Dosya | Açıklama |
|-------|----------|
| `audit-logger.ts` | Denetim günlüğü sistemi |
| `error-handler.ts` | Hata yönetimi |
| `logger.ts` | Loglama sistemi |
| `rate-limiter.ts` | Hız sınırlama |
| `session-manager.ts` | Oturum yönetimi |
| `mobile/mobile-utils.ts` | Mobil yardımcıları |
| `payment/payment-types.ts` | Ödeme tipleri |

### **🎣 Hooks Dizin (Custom React Hooks)**

| Dosya | Açıklama | Kullanım |
|-------|----------|----------|
| `useAuth.ts` | Kimlik doğrulama hook'u | Kullanıcı oturum yönetimi |
| `usePayment.ts` | Ödeme hook'u | Ödeme işlemleri |
| `useReadingCredits.ts` | Okuma kredileri hook'u | Kredi yönetimi |
| `useTarotReading.ts` | Tarot okuma hook'u | Okuma işlemleri |
| `useToast.ts` | Bildirim hook'u | Toast mesajları |
| `useTouchScroll.ts` | Dokunma kaydırma hook'u | Mobil kaydırma |
| `useTranslations.ts` | Çeviri hook'u | i18n desteği |

### **📝 Types Dizin (TypeScript Tip Tanımları)**

| Dosya | Açıklama | İçerik |
|-------|----------|--------|
| `auth.types.ts` | Kimlik doğrulama tipleri | User, Role, Session |
| `reading.types.ts` | Okuma tipleri | Reading, ReadingDetail, ReadingInput |
| `tarot.ts` | Tarot tipleri | TarotCard, Position, Spread |

### **🔌 Providers Dizin (React Context Providers)**

| Dosya | Açıklama |
|-------|----------|
| `IntlProvider.tsx` | Uluslararasılaştırma provider'ı |
| `PWAAuthProvider.tsx` | PWA kimlik doğrulama provider'ı |

---

## 🗄️ Veritabanı Yapısı (Supabase)

### **Tablolar**

| Tablo | Açıklama | Kayıt Sayısı |
|-------|----------|--------------|
| `profiles` | Kullanıcı profilleri | 1 |
| `admins` | Admin kullanıcıları | 0 |
| `tarot_readings` | Tarot okuma kayıtları | 0 |
| `detailed_questions` | Detaylı soru formları | 0 |
| `user_questions` | Kullanıcı soruları | 0 |
| `transactions` | Kredi işlemleri | 0 |

### **Önemli Özellikler**
- **RLS (Row Level Security):** Tüm tablolarda etkin
- **Foreign Keys:** Auth sistemi ile bağlantılı
- **Index'ler:** Performans optimizasyonu için 16 adet
- **JSONB:** Kartlar ve sorular JSON formatında
- **Default Values:** Yeni kullanıcılar 100 kredi ile başlar

---

## 🎨 Tasarım Sistemi

### **Renk Paleti**
- **Mystical:** Koyu lacivert tonları (#0f172a - #f8fafc)
- **Cosmic:** Mor tonları (#3b0764 - #faf5ff)
- **Golden:** Altın tonları (#451a03 - #fffbeb)
- **Ethereal:** Pastel tonlar (mavi, pembe, mor, nane, gül)

### **Tipografi**
- **Mystical:** Playfair Display (başlıklar)
- **Mystic:** Cinzel (dashboard)
- **Body:** Inter (metin)
- **Mono:** JetBrains Mono (kod)

### **Animasyonlar**
- `mystical-pulse`: Mistik nabız efekti
- `float`: Yüzen animasyon
- `glow`: Parlama efekti
- `shimmer`: Işıltı efekti
- `card-flip`: Kart çevirme
- `mystical-entrance`: Mistik giriş

---

## 🌐 Uluslararasılaştırma (i18n)

### **Desteklenen Diller**
- **Türkçe (tr):** Ana dil, varsayılan
- **İngilizce (en):** İkinci dil
- **Sırpça (sr):** Latin alfabesi kullanılıyor

### **Çeviri Yapısı**
```json
{
  "common": { "ok": "Tamam", "cancel": "İptal", ... },
  "nav": { "home": "Ana Sayfa", "dashboard": "Panel", ... },
  "tarot": { "loveSpread": "Aşk Açılımı", ... },
  "auth": { "login": "Giriş Yap", "register": "Kayıt Ol", ... },
  "dashboard": { "credits": "Krediler", "readings": "Okumalar", ... }
}
```

---

## 📱 PWA Özellikleri

### **Manifest.json**
- **Uygulama Adı:** TarotNumeroloji - Mystical Tarot Reading
- **Kısa Ad:** TarotNumeroloji
- **Başlangıç URL:** /tr
- **Görüntüleme:** Standalone
- **Yönelim:** Portrait-primary
- **Arka Plan Rengi:** #0f0f23
- **Tema Rengi:** #6366f1

### **Service Workers**
- `sw.js`: Ana service worker
- `sw-auth.js`: Kimlik doğrulama service worker

### **İkonlar**
- SVG, PNG formatlarında
- 72x72'den 512x512'ye kadar
- Maskable icon desteği

---

## 🔐 Güvenlik Özellikleri

### **Middleware Güvenliği**
- **Rate Limiting:** Geliştirme modunda devre dışı
- **CSRF Protection:** Etkin
- **Security Headers:** Kapsamlı güvenlik başlıkları
- **Bot Detection:** Geliştirme modunda devre dışı
- **Session Validation:** Supabase Auth ile

### **Supabase Güvenliği**
- **RLS:** Tüm tablolarda etkin
- **Auth:** Supabase Auth v2
- **Environment Variables:** Güvenli yönetim
- **Type Safety:** TypeScript ile tip güvenliği

---

## 🚀 Geliştirme ve Deployment

### **Script'ler**
```json
{
  "dev": "next dev -p 3111",           // Geliştirme sunucusu
  "build": "next build",               // Production build
  "start": "next start",               // Production sunucusu
  "lint": "next lint",                 // Linting
  "lint:fix": "next lint --fix",       // Lint düzeltme
  "format": "prettier --write .",      // Kod formatlama
  "i18n:check": "node scripts/check-hardcoded-ui-strings.mjs", // i18n kontrolü
  "i18n:test": "npm test tests/i18n/", // i18n testleri
  "i18n:validate": "npm run i18n:check && npm run i18n:test"  // i18n validasyonu
}
```

### **Environment Variables**
```env
# Zorunlu
NEXT_PUBLIC_SUPABASE_URL=pootnkllsznjbaozpfss.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Eksik (kodda kullanılıyor)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (555) 123 45 67
NEXT_PUBLIC_APP_NAME=TarotNumeroloji
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

---

## 📊 Proje İstatistikleri

### **Dosya Sayıları**
- **Toplam TypeScript/TSX Dosyası:** ~150+
- **Component Sayısı:** ~50+
- **Hook Sayısı:** 7
- **Type Definition:** 3 ana dosya
- **Çeviri Anahtarı:** 1300+ (Türkçe)

### **Bağımlılıklar**
- **Production:** 15 ana bağımlılık
- **Development:** 10 dev bağımlılığı
- **Toplam:** 25 bağımlılık

### **Teknoloji Dağılımı**
- **Frontend:** Next.js 15, React 18, TypeScript 5
- **Styling:** Tailwind CSS 3.3
- **Backend:** Supabase (PostgreSQL)
- **PWA:** next-pwa 5.6
- **i18n:** next-intl 4.3
- **Animasyon:** Framer Motion 12.2

---

## 🎯 Ana Özellikler

### **Tarot Açılımları**
- **Aşk Açılımı:** 4 kartlık özel aşk odaklı açılım
- **Pozisyonlar:** İlgi duyduğun kişi, Fiziksel bağlantı, Duygusal bağlantı, Uzun vadeli sonuç
- **Kart Desteği:** 78 adet RWS tarot kartı
- **Yorum Sistemi:** Pozisyon bazlı detaylı yorumlar

### **Kullanıcı Sistemi**
- **Kimlik Doğrulama:** Supabase Auth
- **Profil Yönetimi:** Kullanıcı profilleri
- **Kredi Sistemi:** Okuma başına kredi kesintisi
- **Geçmiş:** Okuma geçmişi takibi

### **Admin Paneli**
- **Kullanıcı Yönetimi:** Kullanıcı listesi ve detayları
- **Okuma Yönetimi:** Okuma onaylama ve yönetimi
- **Analitik:** Kullanım istatistikleri
- **İçerik Yönetimi:** Kart anlamları ve açılımlar

---

## 🔧 Geliştirme Notları

### **Kod Kalitesi**
- **TypeScript:** Strict mode aktif
- **ESLint:** Next.js konfigürasyonu
- **Prettier:** Kod formatlama
- **Türkçe Yorumlar:** Tüm dosyalarda Türkçe açıklamalar

### **Performans**
- **Code Splitting:** Dinamik import'lar
- **Image Optimization:** Next.js Image component
- **Lazy Loading:** Bileşen bazlı lazy loading
- **PWA Caching:** Service worker ile önbellekleme

### **Erişilebilirlik**
- **Semantic HTML:** Doğru HTML yapısı
- **ARIA Labels:** Erişilebilirlik etiketleri
- **Keyboard Navigation:** Klavye navigasyonu
- **Screen Reader:** Ekran okuyucu desteği

---

## 📚 Dokümantasyon Dosyaları

| Dosya | Açıklama |
|-------|----------|
| `README.md` | Ana proje dokümantasyonu |
| `supabaseschema.md` | Veritabanı şema dokümantasyonu |
| `auth.md` | Kimlik doğrulama rehberi |
| `dashboard.md` | Dashboard kullanım rehberi |
| `PROJECT-AUDIT.md` | Proje denetim raporu |
| `REFACTOR-PLAN.md` | Refaktör planı |
| `MODULAR_REFACTOR_PLAN.mdc` | Modüler refaktör planı |
| `i18n.README.mdc` | Uluslararasılaştırma rehberi |

---

## 🚨 Önemli Notlar

### **Geliştirme Durumu**
- ✅ **Production Ready:** Ana özellikler tamamlandı
- ✅ **PWA Ready:** Progressive Web App özellikleri aktif
- ✅ **i18n Ready:** Çoklu dil desteği tamamlandı
- ⚠️ **Environment Variables:** Bazı değişkenler eksik
- ⚠️ **Admin Panel:** Geliştirme aşamasında

### **Güvenlik**
- ✅ **RLS:** Tüm tablolarda etkin
- ✅ **Auth:** Supabase Auth entegrasyonu
- ✅ **HTTPS:** SSL sertifikası gerekli
- ⚠️ **Rate Limiting:** Production'da aktif edilmeli

### **Performans**
- ✅ **Code Splitting:** Dinamik import'lar
- ✅ **Image Optimization:** Next.js Image
- ✅ **Caching:** PWA service worker
- ⚠️ **Database Indexing:** Performans izleme gerekli

---

## 📞 Destek ve İletişim

### **Geliştirici Bilgileri**
- **Framework:** Next.js 15
- **Database:** Supabase (PostgreSQL 13.0.4)
- **Deployment:** Vercel/Netlify uyumlu
- **Domain:** Custom domain gerekli

### **Kurulum**
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

### **Environment Setup**
```bash
# .env.local dosyası oluştur
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (555) 123 45 67
NEXT_PUBLIC_APP_NAME=TarotNumeroloji
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

---

*Son güncelleme: 2024*  
*Versiyon: 2.0.0*  
*Durum: Production Ready*  
*Özellikler: PWA, i18n, Supabase, TypeScript, Tailwind CSS*

---

## 🎴 Tarot Uygulaması - Dosya Haritası Tamamlandı

Bu dokümantasyon, Mystik Tarot projesinin tüm dosya yapısını, teknolojilerini ve özelliklerini detaylı bir şekilde açıklamaktadır. Proje modern web teknolojileri kullanılarak geliştirilmiş, production-ready durumda olan kapsamlı bir tarot okuma uygulamasıdır.
