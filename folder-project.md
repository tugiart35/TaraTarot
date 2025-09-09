# 📋 Mystik Tarot Projesi - Güncel Dosya Yapısı Analizi

Projeyi detaylı olarak inceledim ve güncel dosya yapısını çıkardım. İşte her dosyanın işlevi:

## 🏗️ **Ana Konfigürasyon Dosyaları**

### **Proje Yönetimi**
- **`package.json`** - Proje bağımlılıkları, script'ler ve metadata
- **`next.config.js`** - Next.js konfigürasyonu (image optimization, TypeScript, ESLint)
- **`tsconfig.json`** - TypeScript konfigürasyonu (path mapping, strict mode)
- **`tailwind.config.ts`** - Tailwind CSS konfigürasyonu (mistik tema, animasyonlar)
- **`postcss.config.js`** - PostCSS konfigürasyonu

### **PWA ve Manifest**
- **`public/manifest.json`** - PWA manifest dosyası (app metadata, icons, shortcuts)
- **`public/sw.js`** - Service Worker (offline support)
- **`public/sw-auth.js`** - Auth Service Worker

## 📁 **src/ Klasörü Yapısı**

### **App Router (Next.js 15)**
```
src/app/
├── layout.tsx                    # Kök layout (metadata, i18n, analytics)
├── globals.css                   # Global stiller (mistik tema, animasyonlar)
├── [locale]/                     # Çoklu dil desteği
│   ├── layout.tsx               # Locale layout
│   ├── page.tsx                 # Ana sayfa
│   ├── HomePageClient.tsx       # Client-side ana sayfa
│   ├── auth/                    # Kimlik doğrulama
│   │   ├── page.tsx            # Giriş/kayıt sayfası
│   │   └── confirm/route.ts    # Email doğrulama
│   ├── dashboard/               # Kullanıcı paneli
│   │   ├── page.tsx            # Ana dashboard
│   │   ├── credits/page.tsx    # Kredi yönetimi
│   │   ├── readings/page.tsx   # Okuma geçmişi
│   │   ├── settings/page.tsx   # Ayarlar
│   │   └── statistics/page.tsx # İstatistikler
│   ├── tarotokumasi/page.tsx   # Tarot okuma sayfası
│   └── (main)/legal/           # Yasal sayfalar
```

### **Özellik Modülleri (Feature-based)**
```
src/features/
├── shared/                      # Paylaşılan bileşenler
│   ├── layout/                 # Layout bileşenleri
│   │   ├── RootLayout.tsx      # Ana layout
│   │   ├── BottomNavigation.tsx # Alt navigasyon
│   │   ├── Footer.tsx          # Footer
│   │   └── HeadTags.tsx        # HTML head etiketleri
│   └── ui/                     # UI bileşenleri
│       ├── BaseCard*.tsx       # Temel kart bileşenleri
│       ├── CardDetails.tsx     # Kart detayları
│       ├── ErrorBoundary.tsx   # Hata yönetimi
│       ├── LoadingSpinner.tsx  # Yükleme animasyonu
│       ├── Toast.tsx           # Bildirim sistemi
│       └── tarot/              # Tarot özel bileşenleri
└── tarot/                      # Tarot özellikleri
    ├── components/             # Tarot bileşenleri
    │   ├── Love-Spread/        # Aşk açılımı
    │   └── standard/           # Standart açılımlar
    └── lib/                    # Tarot kütüphaneleri
        ├── a-tarot-helpers.ts  # Yardımcı fonksiyonlar
        ├── full-tarot-deck.ts  # Tam tarot destesi
        └── love/               # Aşk açılımı kütüphaneleri
```

### **Hooks (Custom React Hooks)**
```
src/hooks/
├── useAuth.ts                  # Kimlik doğrulama
├── usePayment.ts               # Ödeme işlemleri
├── useReadingCredits.ts        # Kredi yönetimi
├── useTarotReading.ts          # Tarot okuma
├── useToast.ts                 # Bildirim sistemi
├── useTouchScroll.ts           # Dokunmatik kaydırma
└── useTranslations.ts          # Çeviri yönetimi
```

### **Kütüphaneler ve Yardımcılar**
```
src/lib/
├── config/
│   ├── app-config.ts          # Uygulama konfigürasyonu
│   └── metadata.ts            # SEO metadata
├── constants/
│   ├── reading-credits.ts     # Kredi sabitleri
│   └── tarotSpreads.ts        # Tarot açılım sabitleri
├── i18n/                      # Çoklu dil desteği
│   ├── config.ts              # i18n konfigürasyonu
│   ├── paths.ts               # Dil yolları
│   └── validation.ts          # Dil doğrulama
├── supabase/
│   └── client.ts              # Supabase bağlantısı
├── security/                  # Güvenlik
│   ├── 2fa.ts                 # İki faktörlü kimlik doğrulama
│   ├── audit-logger.ts        # Denetim kayıtları
│   └── rate-limiter.ts        # Hız sınırlama
├── utils/                     # Yardımcı fonksiyonlar
│   └── profile-utils.ts       # Profil yardımcıları
├── actions/                   # Server actions
├── schemas/                   # Zod şemaları
├── logger.ts                  # Loglama sistemi
├── mobile/                    # Mobil yardımcılar
├── payment/                   # Ödeme işlemleri
├── rate-limiter.ts            # Hız sınırlama
└── session-manager.ts         # Oturum yönetimi
```

### **Tip Tanımları**
```
src/types/
├── auth.types.ts              # Kimlik doğrulama tipleri
├── reading.types.ts           # Okuma tipleri
└── tarot.ts                   # Tarot tipleri
```

### **Provider'lar**
```
src/providers/
├── IntlProvider.tsx           # Çoklu dil provider
└── PWAAuthProvider.tsx        # PWA auth provider
```

## 🗄️ **Veritabanı Dosyaları**

### **SQL Dosyaları**
- **`create-tarot-tables.sql`** - Ana tabloları oluşturma
- **`check-profiles-table.sql`** - Profiles tablosu kontrolü
- **`check-transactions-table.sql`** - Transactions tablosu kontrolü
- **`update-tarot-readings-table.sql`** - Tarot readings tablosu güncelleme
- **`fix-profiles-table.sql`** - Profiles tablosu düzeltme

### **Veritabanı Tabloları**
1. **`profiles`** - Kullanıcı profilleri (kredi bakiyesi dahil)
2. **`tarot_readings`** - Tarot okuma kayıtları
3. **`transactions`** - Kredi işlem geçmişi
4. **`user_questions`** - Kullanıcı soruları
5. **`detailed_questions`** - Detaylı soru formları

## 🌐 **Çoklu Dil Desteği**

### **Dil Dosyaları**
- **`messages/tr.json`** - Türkçe çeviriler
- **`messages/en.json`** - İngilizce çeviriler
- **`messages/sr.json`** - Sırpça çeviriler (Latin alfabesi)

### **i18n Konfigürasyonu**
- **`i18n.ts`** - next-intl konfigürasyonu
- **`src/i18n/request.ts`** - Request konfigürasyonu

## 📚 **Dokümantasyon**

### **Test ve Debug Dosyaları**
- **`CREDITS_PAGE_TEST.md`** - Kredi sayfası test rehberi
- **`CREDIT_DEDUCTION_TEST.md`** - Kredi düşme testi
- **`CREDIT_SYNC_TEST.md`** - Kredi senkronizasyon testi
- **`TRANSACTIONS_TABLE_FIX.md`** - Transactions tablosu düzeltme rehberi

### **Proje Dokümantasyonu**
- **`README.md`** - Proje açıklaması
- **`PROJECT_CLEANUP_REPORT.md`** - Proje temizlik raporu
- **`list.md`** - Proje listesi
- **`test-scenarios.md`** - Test senaryoları

### **Yasal Dokümantasyon**
- **`auth.md`** - Kimlik doğrulama dokümantasyonu
- **`dashboard.md`** - Dashboard dokümantasyonu
- **`EMAIL_CONFIRMATION_SETUP.md`** - Email doğrulama kurulumu

## 🎨 **Statik Dosyalar**

### **Görsel Dosyalar**
```
public/
├── cards/                      # Tarot kartları
│   ├── CardBack.jpg           # Kart arkası
│   └── rws/                   # Rider-Waite-Smith kartları (78 adet)
├── icons/                     # PWA ikonları (8 farklı boyut)
├── images/                    # Arka plan görselleri
│   ├── bg-3card-tarot.jpg     # 3 kart açılımı arka planı
│   └── bg-love-tarot.jpg      # Aşk açılımı arka planı
└── manifest.json              # PWA manifest
```

## 🔧 **Scripts ve Araçlar**

### **Geliştirme Araçları**
- **`scripts/check-hardcoded-ui-strings.mjs`** - Hardcoded string kontrolü
- **`package-merge.js`** - Package.json birleştirme
- **`debug-supabase-connection.js`** - Supabase bağlantı testi

### **Middleware**
- **`src/middleware.ts`** - Next.js middleware (routing, auth, security)
- **`src/middleware.ts.bak`** - Middleware yedek dosyası

## 🚀 **Proje Özellikleri**

### **Teknoloji Stack**
- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Supabase** - Backend as a Service
- **next-intl** - Çoklu dil desteği
- **PWA** - Progressive Web App

### **Ana Özellikler**
1. **Tarot Okuma Sistemi** - Farklı açılım türleri
2. **Kredi Sistemi** - Okuma maliyetleri
3. **Kullanıcı Yönetimi** - Auth, profil, dashboard
4. **Çoklu Dil Desteği** - TR, EN, SR
5. **PWA Desteği** - Offline çalışma
6. **Responsive Tasarım** - Mobil uyumlu
7. **Mistik Tema** - Özel tasarım sistemi

### **Güvenlik Özellikleri**
- Row Level Security (RLS)
- Rate limiting
- CSRF protection
- Security headers
- Audit logging
- Session management

## 📊 **Proje İstatistikleri**

- **Toplam Dosya Sayısı**: ~200+ dosya
- **TypeScript/TSX Dosyaları**: 89 adet
- **Görsel Dosyalar**: 85+ adet
- **Dil Desteği**: 3 dil (TR, EN, SR)
- **Tarot Kartları**: 78 adet
- **PWA İkonları**: 8 farklı boyut

## 🔄 **Geliştirme Durumu**

- **Production Ready**: ✅
- **TypeScript**: ✅ Strict mode
- **ESLint**: ✅ Configured
- **Prettier**: ✅ Configured
- **PWA**: ✅ Manifest + Service Worker
- **i18n**: ✅ 3 dil desteği
- **Database**: ✅ Supabase RLS
- **Security**: ✅ Headers + Rate limiting

Bu proje, modern web geliştirme standartlarına uygun, ölçeklenebilir ve güvenli bir tarot okuma uygulamasıdır.
