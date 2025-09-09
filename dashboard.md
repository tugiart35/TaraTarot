# 📊 Dashboard Dosya Yapısı ve Açıklamaları

Bu dokümantasyon, Busbuskimki Tarot uygulamasının dashboard yapısını ve her dosyanın işlevini detaylı olarak açıklar.

## 🏗️ Genel Dashboard Yapısı

**Erişim Kontrolü:** Tüm dashboard sayfaları sadece giriş yapmış kullanıcılara açıktır.

```
src/
├── app/dashboard/                 # Dashboard sayfaları (Auth gerekli)
│   ├── page.tsx                  # Ana dashboard sayfası
│   ├── credits/page.tsx          # Kredi yönetimi sayfası
│   ├── readings/page.tsx         # Okuma geçmişi sayfası
│   ├── settings/page.tsx         # Hesap ayarları sayfası
│   └── statistics/page.tsx       # İstatistikler sayfası
├── hooks/                        # Dashboard hook'ları
│   ├── useAuth.ts               # Kimlik doğrulama hook'u
│   ├── usePayment.ts            # Ödeme sistemi hook'u
│   ├── useReadingCredits.ts     # Kredi yönetimi hook'u
│   ├── useTarotReading.ts       # Tarot okuma hook'u
│   ├── useToast.ts              # Bildirim hook'u
│   ├── useTouchScroll.ts        # Dokunmatik kaydırma hook'u
│   └── useTranslations.ts       # Çeviri hook'u
├── lib/                         # Dashboard kütüphaneleri
│   ├── session-manager.ts       # Oturum yönetimi
│   ├── rate-limiter.ts          # Rate limiting
│   ├── logger.ts                # Loglama sistemi
│   ├── supabase/client.ts       # Supabase bağlantısı
│   ├── security/                # Güvenlik modülleri
│   │   ├── audit-logger.ts      # Audit loglama
│   │   ├── rate-limiter.ts      # Rate limiting (güvenlik)
│   │   └── 2fa.ts               # İki faktörlü kimlik doğrulama
│   ├── payment/                 # Ödeme sistemi
│   │   └── payment-types.ts     # Ödeme tip tanımları
│   ├── constants/               # Sabitler
│   │   ├── reading-credits.ts   # Kredi konfigürasyonları
│   │   └── tarotSpreads.ts      # Tarot açılımları
│   └── config/                  # Konfigürasyon
│       ├── app-config.ts        # Uygulama konfigürasyonu
│       └── metadata.ts          # Meta veriler
└── types/                       # Tip tanımları
    ├── auth.types.ts            # Kimlik doğrulama tipleri
    ├── reading.types.ts         # Okuma tipleri
    └── tarot.ts                 # Tarot tipleri
```

## 📄 Dashboard Sayfaları

### 1. Ana Dashboard (`src/app/dashboard/page.tsx`)

**İşlevi:** Kullanıcının ana kontrol paneli
**Erişim:** Sadece giriş yapmış kullanıcılar erişebilir
**Özellikler:**
- Kullanıcı profil bilgileri ve hoş geldin mesajı
- Kredi bakiyesi ve istatistikler
- Son okumalar ve işlemler
- Hızlı işlemler (Tarot, Numeroloji, Aşk Analizi, vb.)
- Profil yönetimi modalı
- Responsive sidebar navigasyon
- Güvenli auth kontrolü (useAuth hook ile)

**Ana Bileşenler:**
- `UserProfile` interface - Kullanıcı profil verileri
- `Reading` interface - Okuma verileri
- `Transaction` interface - İşlem verileri
- Sidebar navigasyon
- İstatistik kartları
- Hızlı işlem kartları
- Profil düzenleme modalı

**Kullanılan Hook'lar:**
- `useAuth` - Kimlik doğrulama ve giriş kontrolü
- `useState` - State yönetimi
- `useEffect` - Lifecycle yönetimi

**Erişim Kontrolü:**
- Giriş yapmamış kullanıcılar otomatik olarak `/auth` sayfasına yönlendirilir
- useAuth hook'u ile güvenli auth kontrolü yapılır
- BottomNavigation'da giriş yapmış kullanıcılar için "Dashboard" sekmesi gösterilir

### 2. Kredi Yönetimi (`src/app/dashboard/credits/page.tsx`)

**İşlevi:** Kullanıcının kredi işlemlerini görüntüleme ve yönetme
**Erişim:** Sadece giriş yapmış kullanıcılar erişebilir
**Özellikler:**
- Kredi işlem geçmişi
- Filtreleme (tip, tarih aralığı)
- İstatistik kartları (toplam satın alınan, kullanılan, iade, bakiye)
- CSV export özelliği
- İşlem detayları ve durumları

**Ana Bileşenler:**
- `Transaction` interface - İşlem verileri
- `CreditStats` interface - Kredi istatistikleri
- Filtreleme bileşenleri
- İşlem listesi
- Export fonksiyonu

### 3. Okuma Geçmişi (`src/app/dashboard/readings/page.tsx`)

**İşlevi:** Kullanıcının tüm okumalarını görüntüleme ve yönetme
**Erişim:** Sadece giriş yapmış kullanıcılar erişebilir
**Özellikler:**
- Okuma geçmişi listesi
- Grid/List görünüm seçenekleri
- Filtreleme (tip, tarih, arama)
- Sayfalama (load more)
- Okuma detayları
- İndirme özelliği

**Ana Bileşenler:**
- `Reading` interface - Okuma verileri
- `ReadingFilters` interface - Filtre seçenekleri
- Görünüm modu değiştirici
- Filtreleme bileşenleri
- Okuma kartları

### 4. Hesap Ayarları (`src/app/dashboard/settings/page.tsx`)

**İşlevi:** Kullanıcının hesap ayarlarını yönetme
**Erişim:** Sadece giriş yapmış kullanıcılar erişebilir
**Özellikler:**
- Bildirim tercihleri
- Gizlilik ayarları
- Güvenlik ayarları (şifre değiştirme)
- Veri yönetimi (export, hesap silme)
- Tab-based navigasyon

**Ana Bileşenler:**
- `NotificationSettings` interface - Bildirim ayarları
- `PrivacySettings` interface - Gizlilik ayarları
- Şifre değiştirme formu
- Veri export/silme işlemleri
- Tab navigasyonu

### 5. İstatistikler (`src/app/dashboard/statistics/page.tsx`)

**İşlevi:** Kullanıcının okuma istatistiklerini ve numerolojik içgörüleri görüntüleme
**Erişim:** Sadece giriş yapmış kullanıcılar erişebilir
**Özellikler:**
- Genel okuma istatistikleri
- Numerolojik analiz (yaşam yolu, kişisel yıl, aylık rehberlik)
- Trend analizi
- Tab-based görünüm (Genel Bakış, Numeroloji, Desenler)

**Ana Bileşenler:**
- `UserStats` interface - Kullanıcı istatistikleri
- `NumerologyInsights` interface - Numeroloji verileri
- İstatistik kartları
- Numeroloji hesaplama fonksiyonları
- Tab navigasyonu

## 🔧 Dashboard Hook'ları

### 1. Kimlik Doğrulama (`src/hooks/useAuth.ts`)

**İşlevi:** Kullanıcı kimlik doğrulama ve oturum yönetimi
**Özellikler:**
- Session yönetimi
- Role-based access control
- Audit logging
- PWA desteği
- Güvenlik özellikleri (timeout, CSRF, rate limiting)

**Döndürdüğü Değerler:**
- `user` - Kullanıcı bilgileri
- `loading` - Yükleme durumu
- `error` - Hata mesajları
- `isAuthenticated` - Giriş durumu
- `isAdmin` - Admin kontrolü
- `isPremium` - Premium kontrolü
- `signOut` - Çıkış fonksiyonu
- `checkPermission` - İzin kontrolü

### 2. Ödeme Sistemi (`src/hooks/usePayment.ts`)

**İşlevi:** Ödeme ve abonelik yönetimi
**Özellikler:**
- Subscription yönetimi
- Payment method yönetimi
- Transaction geçmişi
- Role-based permissions
- PCI compliance

**Döndürdüğü Değerler:**
- `subscription` - Abonelik bilgileri
- `paymentMethods` - Ödeme yöntemleri
- `transactions` - İşlem geçmişi
- `loading` - Yükleme durumu
- `error` - Hata mesajları

### 3. Kredi Yönetimi (`src/hooks/useReadingCredits.ts`)

**İşlevi:** Okuma kredilerini yönetme
**Özellikler:**
- Kredi kontrolü
- Kredi kesintisi
- Transaction logging
- Supabase entegrasyonu

**Döndürdüğü Değerler:**
- `creditStatus` - Kredi durumu
- `isLoading` - Yükleme durumu
- `error` - Hata mesajları
- `checkCredits` - Kredi kontrolü
- `deductCredits` - Kredi kesintisi

### 4. Tarot Okuma (`src/hooks/useTarotReading.ts`)

**İşlevi:** Tarot okuma sürecini yönetme
**Özellikler:**
- Kart seçimi
- Okuma adımları
- Kredi onayı
- Kullanıcı bilgi formu

**Döndürdüğü Değerler:**
- `selectedCards` - Seçilen kartlar
- `currentStep` - Mevcut adım
- `isConfirmationModalOpen` - Onay modalı durumu
- `handleCardSelect` - Kart seçimi
- `handleClearAll` - Temizleme

### 5. Bildirimler (`src/hooks/useToast.ts`)

**İşlevi:** Toast bildirimlerini yönetme
**Özellikler:**
- Başarı/hata bildirimleri
- Otomatik kapanma
- Queue yönetimi

### 6. Dokunmatik Kaydırma (`src/hooks/useTouchScroll.ts`)

**İşlevi:** Mobil dokunmatik kaydırma optimizasyonu
**Özellikler:**
- Momentum scrolling
- Touch event handling
- Performance optimization

### 7. Çeviriler (`src/hooks/useTranslations.ts`)

**İşlevi:** Çoklu dil desteği
**Özellikler:**
- Dil dosyaları yönetimi
- Nested key desteği
- Fallback dil desteği

## 📚 Dashboard Kütüphaneleri

### 1. Oturum Yönetimi (`src/lib/session-manager.ts`)

**İşlevi:** Oturum yönetimi ve token yenileme
**Özellikler:**
- Otomatik token yenileme
- Session timeout yönetimi
- Auth state listener
- React hook desteği
- Güvenlik olayları

**Ana Sınıflar:**
- `SessionManager` - Ana oturum yöneticisi
- `useSession` - React hook
- `SessionState` - Oturum durumu interface'i

### 2. Rate Limiting (`src/lib/rate-limiter.ts`)

**İşlevi:** API isteklerini ve kullanıcı eylemlerini sınırlama
**Özellikler:**
- Endpoint bazlı rate limiting
- Kullanıcı bazlı sınırlar
- Güvenlik olayları loglama
- Supabase entegrasyonu

**Ana Sınıflar:**
- `RateLimiter` - Ana rate limiter
- `RateLimitConfig` - Konfigürasyon interface'i
- `RateLimitResult` - Sonuç interface'i

### 3. Loglama Sistemi (`src/lib/logger.ts`)

**İşlevi:** Uygulama genelinde loglama
**Özellikler:**
- Log seviyeleri (ERROR, WARN, INFO, DEBUG)
- Hassas bilgi filtreleme
- Performance logging
- API request logging
- User action logging

**Ana Sınıflar:**
- `Logger` - Ana logger sınıfı
- `LogEntry` - Log entry interface'i
- `LogLevel` - Log seviyeleri enum'u

### 4. Supabase Client (`src/lib/supabase/client.ts`)

**İşlevi:** Supabase bağlantısı ve konfigürasyonu
**Özellikler:**
- Database bağlantısı
- Auth yönetimi
- Real-time subscriptions
- Environment konfigürasyonu

### 5. Güvenlik Modülleri (`src/lib/security/`)

#### Audit Logger (`audit-logger.ts`)
- Güvenlik olaylarını loglama
- Severity seviyeleri
- Metadata desteği
- Supabase entegrasyonu

#### Rate Limiter (`rate-limiter.ts`)
- Güvenlik odaklı rate limiting
- IP bazlı sınırlar
- Distributed rate limiting desteği

#### 2FA (`2fa.ts`)
- İki faktörlü kimlik doğrulama
- TOTP desteği
- Backup kodları

### 6. Ödeme Sistemi (`src/lib/payment/`)

#### Payment Types (`payment-types.ts`)
- Ödeme tip tanımları
- Subscription tipleri
- Transaction tipleri
- Pricing tier'ları

### 7. Sabitler (`src/lib/constants/`)

#### Reading Credits (`reading-credits.ts`)
- Okuma kredi konfigürasyonları
- Reading type tanımları
- Credit status interface'i

#### Tarot Spreads (`tarotSpreads.ts`)
- Tarot açılım tanımları
- Position bilgileri
- Spread konfigürasyonları

### 8. Konfigürasyon (`src/lib/config/`)

#### App Config (`app-config.ts`)
- Uygulama genel konfigürasyonu
- Environment değişkenleri
- Feature flags

#### Metadata (`metadata.ts`)
- SEO meta verileri
- Open Graph tags
- Twitter cards

## 🎨 Stil ve Tasarım

### Tailwind Konfigürasyonu
- **Dashboard Renkleri:**
  - `night: '#0a0a0f'` - Ana arka plan
  - `lavender: '#a78bfa'` - Vurgu rengi
  - `gold: '#fbbf24'` - Altın vurgu
  - `crystal-clear: 'rgba(255, 255, 255, 0.1)'` - Şeffaf arka plan
  - `text-celestial: '#e0e7ff'` - Ana metin
  - `text-mystic: '#c4b5fd'` - İkincil metin

### CSS Sınıfları
- `.card-mystic` - Mistik kart stili
- `.mystic-glow` - Parlama efekti
- `.text-heading-1` - Ana başlık
- `.text-body-large` - Büyük metin

### Font Aileleri
- `mystic: ['Cinzel', 'serif']` - Dashboard için özel font
- `mystical: ['Playfair Display', 'serif']` - Genel mistik font
- `body: ['Inter', 'system-ui', 'sans-serif']` - Ana metin fontu

## 🔒 Güvenlik Özellikleri

1. **Kimlik Doğrulama:**
   - JWT token yönetimi
   - Session timeout
   - Role-based access control
   - 2FA desteği
   - Dashboard erişimi sadece giriş yapmış kullanıcılara açık

2. **Rate Limiting:**
   - API endpoint koruması
   - Kullanıcı bazlı sınırlar
   - Güvenlik olayları loglama

3. **Audit Logging:**
   - Tüm güvenlik olayları
   - Severity seviyeleri
   - Metadata desteği

4. **Veri Koruması:**
   - Hassas bilgi filtreleme
   - Secure session storage
   - CSRF koruması

## 📱 PWA Desteği

- Offline session yönetimi
- Secure storage
- Background sync
- Push notifications (gelecek)

## 🌐 Çoklu Dil Desteği

- Türkçe (tr)
- İngilizce (en)
- Sırpça (sr) - Latin alfabesi

## 🧭 Navigasyon ve Erişim

### BottomNavigation Entegrasyonu
- **Giriş yapmış kullanıcılar:** "Dashboard" sekmesi gösterilir (📊 ikonu)
- **Giriş yapmamış kullanıcılar:** "Giriş Yap" sekmesi gösterilir (🔑 ikonu)
- Dashboard sekmesi tıklandığında `/dashboard` rotasına yönlendirilir
- Auth kontrolü useAuth hook'u ile yapılır

## 🚀 Performans Optimizasyonları

- Lazy loading
- Image optimization
- Code splitting
- Caching strategies
- Database query optimization

## 📊 Analytics ve Monitoring

- User action tracking
- Performance monitoring
- Error tracking
- Usage analytics

## 🔄 Geliştirme ve Bakım

### Kod Kalitesi
- TypeScript tip güvenliği
- ESLint kuralları
- Prettier formatlama
- Husky pre-commit hooks

### Test Stratejisi
- Unit testler
- Integration testler
- E2E testler
- Performance testler

### Deployment
- Vercel deployment
- Environment management
- CI/CD pipeline
- Database migrations

---

Bu dokümantasyon, dashboard yapısının tam bir haritasını sunar ve her dosyanın işlevini detaylı olarak açıklar. Geliştirme sürecinde bu dokümantasyon referans olarak kullanılabilir.
