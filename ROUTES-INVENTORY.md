# ROUTES INVENTORY - TaraTarot Projesi

## Mevcut Route Yapısı Analizi

### 1. TEMEL YAPILANDIRMA
- **Framework**: Next.js 15.4.4 (App Router)
- **i18n**: next-intl ile 3 dil desteği
- **Locales**: `tr` (varsayılan), `en`, `sr`
- **URL Pattern**: `/{locale}/{path}`

### 2. ANA ROUTE'LAR

#### 2.1 Ana Sayfa
- **Mevcut**: `/{locale}` (tr, en, sr)
- **Yönlendirme**: `/` → `/tr` (varsayılan)
- **Dosya**: `src/app/[locale]/page.tsx`

#### 2.2 Tarot Okuma
- **Mevcut**: `/{locale}/tarotokumasi`
- **Dosya**: `src/app/[locale]/(main)/tarotokumasi/page.tsx`
- **Layout**: `src/app/[locale]/(main)/tarotokumasi/layout.tsx`

#### 2.3 Numeroloji
- **Mevcut**: `/{locale}/numeroloji`
- **Alt Route**: `/{locale}/numeroloji/[type]`
- **Dosya**: `src/app/[locale]/(main)/numeroloji/page.tsx`
- **Layout**: `src/app/[locale]/(main)/numeroloji/layout.tsx`

#### 2.4 Dashboard (Kullanıcı Paneli)
- **Mevcut**: `/{locale}/dashboard`
- **Alt Route'lar**:
  - `/{locale}/dashboard/credits`
  - `/{locale}/dashboard/packages`
  - `/{locale}/dashboard/readings`
  - `/{locale}/dashboard/settings`
  - `/{locale}/dashboard/statistics`

#### 2.5 Admin Panel
- **Mevcut**: `/{locale}/admin`
- **Alt Route'lar**:
  - `/{locale}/admin/analytics`
  - `/{locale}/admin/auth`
  - `/{locale}/admin/orders`
  - `/{locale}/admin/packages`
  - `/{locale}/admin/readings`
  - `/{locale}/admin/settings`
  - `/{locale}/admin/users`

#### 2.6 Authentication
- **Mevcut**: `/{locale}/auth`
- **Alt Route'lar**:
  - `/{locale}/auth/reset-password`

#### 2.7 Payment
- **Mevcut**: `/{locale}/payment`
- **Alt Route'lar**:
  - `/{locale}/payment/success`
  - `/{locale}/payment/cancel`

#### 2.8 Legal Pages
- **Mevcut**: `/{locale}/legal/{page}`
- **Alt Route'lar**:
  - `/{locale}/legal/about`
  - `/{locale}/legal/accessibility`
  - `/{locale}/legal/child-privacy`
  - `/{locale}/legal/contact`
  - `/{locale}/legal/cookie-policy`
  - `/{locale}/legal/copyright-policy`
  - `/{locale}/legal/disclaimer`
  - `/{locale}/legal/kvkk-disclosure`
  - `/{locale}/legal/payment-terms`
  - `/{locale}/legal/privacy-policy`
  - `/{locale}/legal/refund-policy`
  - `/{locale}/legal/security-policy`
  - `/{locale}/legal/terms-of-use`

### 3. API ROUTE'LAR

#### 3.1 Authentication API
- **Mevcut**: `/auth/callback`
- **Dosya**: `src/app/auth/callback/route.ts`

#### 3.2 Email API
- **Mevcut**: `/api/email/send`
- **Alt Route'lar**:
  - `/api/email/reading`
  - `/api/email/test`

#### 3.3 Utility API'lar
- **Mevcut**: `/api/exchange-rate`
- **Mevcut**: `/api/geolocation`
- **Mevcut**: `/api/webhook/shopier`

### 4. ÖZEL SAYFALAR
- **Maintenance**: `/maintenance`
- **Sitemap**: `/sitemap.xml` (otomatik)
- **Robots**: `/robots.txt` (otomatik)

### 5. MEVCUT SEO YAPILANDIRMASI

#### 5.1 Sitemap
- **Dosya**: `src/app/sitemap.ts`
- **Desteklenen URL'ler**:
  - `/{locale}` (tr, en, sr)
  - `/{locale}/tarot` (tr, en, sr)
  - `/{locale}/numeroloji` (tr)
  - `/{locale}/numerology` (en)
  - `/{locale}/numerologija` (sr)

#### 5.2 Robots.txt
- **Dosya**: `src/app/robots.txt/route.ts`
- **İzin Verilen**: `/{locale}/`, `/tarot/`, `/numeroloji/`, `/numerology/`, `/numerologija/`
- **Yasaklanan**: `/admin/`, `/api/`, `/dashboard/`, `/profile/`, `/settings/`

### 6. MIDDLEWARE YAPILANDIRMASI

#### 6.1 Locale Handling
- **Dosya**: `src/middleware.ts`
- **Konfigürasyon**: next-intl middleware
- **Locale Prefix**: `as-needed`

#### 6.2 Security Headers
- **CSP**: Content Security Policy aktif
- **HSTS**: Production'da aktif
- **X-Frame-Options**: DENY
- **Rate Limiting**: Development'da devre dışı

### 7. ROUTE KORUMA SİSTEMİ

#### 7.1 Public Routes
- `/{locale}/auth`
- `/{locale}/auth/callback`
- `/{locale}/auth/reset-password`

#### 7.2 Protected Routes
- `/{locale}/profile`
- `/{locale}/settings`
- `/{locale}/admin`
- `/{locale}/premium`

#### 7.3 Role-Based Access
- **Admin**: `/admin`, `/dashboard`, `/profile`, `/settings`, `/analytics`
- **Premium**: `/dashboard`, `/profile`, `/settings`, `/premium`
- **User**: `/dashboard`, `/profile`, `/settings`
- **Guest**: `/dashboard` (açık)

### 8. MEVCUT SORUNLAR VE İYİLEŞTİRME ALANLARI

#### 8.1 SEO Sorunları
- ❌ **Tutarsız URL Yapısı**: `/tarotokumasi` vs `/tarot`
- ❌ **Dil-Spesifik URL'ler Eksik**: Tüm dillerde aynı path'ler
- ❌ **Hreflang Tags Eksik**: Çoklu dil SEO desteği yetersiz
- ❌ **Canonical URL'ler Eksik**: Duplicate content riski

#### 8.2 Route Yapısı Sorunları
- ❌ **Karışık Naming**: `tarotokumasi` vs `tarot`
- ❌ **Legal Pages**: `/legal/` prefix'i SEO için uygun değil
- ❌ **Admin Routes**: Public URL'lerde admin path'leri

#### 8.3 Teknik Sorunlar
- ❌ **TypeScript Errors**: 235 hata
- ❌ **Build Failures**: Module resolution sorunları
- ❌ **Linting Issues**: 500+ hata

### 9. ÖNERİLEN İYİLEŞTİRMELER

#### 9.1 SEO-Friendly URL Yapısı
- **Türkçe**: `/tr/anasayfa`, `/tr/tarot-okuma`, `/tr/numeroloji`
- **İngilizce**: `/en/home`, `/en/tarot-reading`, `/en/numerology`
- **Sırpça**: `/sr/pocetna`, `/sr/tarot-citanje`, `/sr/numerologija`

#### 9.2 Route Standardizasyonu
- **Ana Sayfa**: `/{locale}/` → `/{locale}/anasayfa|home|pocetna`
- **Tarot**: `/{locale}/tarotokumasi` → `/{locale}/tarot-okuma|tarot-reading|tarot-citanje`
- **Numeroloji**: `/{locale}/numeroloji` → `/{locale}/numeroloji|numerology|numerologija`

#### 9.3 Redirect Stratejisi
- **301 Redirects**: Eski URL'lerden yeni URL'lere
- **Canonical Tags**: Duplicate content önleme
- **Hreflang Tags**: Çoklu dil SEO optimizasyonu

### 10. SONUÇ

Mevcut proje güçlü bir temel yapıya sahip ancak SEO ve URL yapısı açısından iyileştirme gerekiyor. Önerilen değişiklikler:

1. **SEO-Friendly URL'ler**: Her dil için doğal path'ler
2. **Redirect Stratejisi**: Mevcut link'leri koruma
3. **Hreflang Implementation**: Çoklu dil SEO
4. **Route Standardizasyonu**: Tutarlı naming convention
5. **Technical Fixes**: TypeScript ve build sorunlarını çözme

Bu analiz, güvenli ve geriye dönük uyumlu bir geçiş planı oluşturmak için temel oluşturur.