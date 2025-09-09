# Auth Sistemi Dokümantasyonu

## 📋 Genel Bakış

Bu dokümantasyon, Tarot uygulamasının authentication (kimlik doğrulama) sisteminin detaylı analizini içerir. Sistem Supabase Auth kullanarak kullanıcı girişi, kayıt, e-posta onayı ve şifre sıfırlama işlemlerini yönetir.

## 🏗️ Sistem Mimarisi

### Ana Bileşenler

```
Auth Sistemi
├── Frontend (React/Next.js)
│   ├── Auth Sayfası (/auth)
│   ├── E-posta Onay Callback (/auth/confirm)
│   ├── useAuth Hook
│   └── Middleware (Route Protection)
├── Backend (Supabase)
│   ├── Auth Service
│   ├── User Management
│   └── Email Templates
└── Configuration
    ├── Environment Variables
    ├── i18n (Çoklu Dil)
    └── Email Settings
```

## 📁 Dosya Yapısı

### 1. Ana Auth Dosyaları

#### `/src/app/auth/page.tsx` - Ana Auth Sayfası
- **Amaç**: Kullanıcı girişi ve kayıt işlemlerini yönetir
- **Özellikler**:
  - Login/Register formu
  - Real-time form validasyonu
  - Şifre gücü göstergesi
  - Social login (Google, Facebook)
  - Şifre sıfırlama
  - Remember me özelliği
  - Çoklu dil desteği
- **Bağımlılıklar**:
  - `@/lib/supabase/client.ts`
  - `@/hooks/useTranslations.ts`
  - `messages/tr.json`, `en.json`, `sr.json`

#### `/src/app/auth/confirm/route.ts` - E-posta Onay Callback
- **Amaç**: E-posta onay linklerini işler
- **Özellikler**:
  - Token doğrulaması
  - Otomatik yönlendirme
  - Hata yönetimi
- **Bağımlılıklar**:
  - `@/lib/supabase/client.ts`

#### `/src/hooks/useAuth.ts` - Auth Hook
- **Amaç**: Auth state yönetimi ve utility fonksiyonları
- **Özellikler**:
  - User state tracking
  - Session management
  - Logout fonksiyonu
  - Şifre sıfırlama
  - Profil güncelleme
  - Admin rol kontrolü
- **Bağımlılıklar**:
  - `@/lib/supabase/client.ts`
  - `@supabase/supabase-js`

### 2. Bağlantılı Dosyalar

#### `/src/lib/supabase/client.ts` - Supabase Client
- **Amaç**: Supabase bağlantı konfigürasyonu
- **Özellikler**:
  - Client instance oluşturma
  - Environment variables yönetimi
  - Database types tanımları
  - Auth konfigürasyonu

#### `/src/middleware.ts` - Route Protection
- **Amaç**: Korumalı sayfalara erişim kontrolü
- **Özellikler**:
  - Session kontrolü
  - Protected routes yönetimi
  - Locale routing
  - Auth redirects

#### `/src/app/[locale]/page.tsx` - Ana Sayfa
- **Amaç**: Auth durumuna göre UI gösterimi
- **Özellikler**:
  - Auth state kontrolü
  - Login/Logout butonları
  - User bilgileri gösterimi

### 3. Konfigürasyon Dosyaları

#### `/messages/tr.json`, `/en.json`, `/sr.json` - Çeviri Dosyaları
- **Amaç**: Auth ile ilgili tüm metinlerin çoklu dil desteği
- **İçerik**:
  - Form labels
  - Error messages
  - Success messages
  - Validation messages

#### `/EMAIL_CONFIRMATION_SETUP.md` - E-posta Onay Kurulumu
- **Amaç**: E-posta onay sistemi kurulum rehberi
- **İçerik**:
  - Supabase konfigürasyonu
  - SMTP ayarları
  - Template yapılandırması
  - Test adımları

## 🔄 Auth Akışı

### 1. Kullanıcı Kaydı
```
1. Kullanıcı /auth sayfasında kayıt formunu doldurur
2. Form validasyonu yapılır (email, password strength)
3. supabase.auth.signUp() çağrılır
4. E-posta onay mesajı gösterilir
5. Kullanıcı e-postasını kontrol eder
6. Onay linkine tıklar
7. /auth/confirm endpoint'i token'ı doğrular
8. Kullanıcı ana sayfaya yönlendirilir
```

### 2. Kullanıcı Girişi
```
1. Kullanıcı /auth sayfasında giriş formunu doldurur
2. supabase.auth.signInWithPassword() çağrılır
3. Başarılı giriş sonrası ana sayfaya yönlendirilir
4. useAuth hook'u user state'ini günceller
```

### 3. Social Login
```
1. Kullanıcı Google/Facebook butonuna tıklar
2. supabase.auth.signInWithOAuth() çağrılır
3. OAuth provider'a yönlendirilir
4. Başarılı auth sonrası callback URL'e döner
5. Session otomatik oluşturulur
```

### 4. Şifre Sıfırlama
```
1. Kullanıcı "Şifremi Unuttum" linkine tıklar
2. E-posta adresi girer
3. supabase.auth.resetPasswordForEmail() çağrılır
4. Sıfırlama e-postası gönderilir
5. Kullanıcı e-postadaki linke tıklar
6. Yeni şifre belirler
```

## 🛡️ Güvenlik Özellikleri

### 1. Form Validasyonu
- **Email Validasyonu**: Real-time email format kontrolü
- **Şifre Gücü**: 6 seviyeli şifre gücü göstergesi
- **Şifre Onayı**: Kayıt sırasında şifre eşleşme kontrolü
- **Client-side Validation**: Hızlı kullanıcı deneyimi

### 2. Route Protection
- **Middleware**: Korumalı sayfalara erişim kontrolü
- **Session Check**: Her istekte session doğrulaması
- **Redirect Logic**: Auth olmayan kullanıcıları /auth'a yönlendirme

### 3. Error Handling
- **Try-Catch Blocks**: Tüm auth işlemlerinde hata yakalama
- **User-Friendly Messages**: Türkçe hata mesajları
- **Console Logging**: Debug için detaylı loglar

## 🌐 Çoklu Dil Desteği

### Desteklenen Diller
- **Türkçe (tr)**: Varsayılan dil
- **İngilizce (en)**: Uluslararası kullanım
- **Sırpça (sr)**: Latin alfabesi kullanımı

### Çeviri Anahtarları
```json
{
  "auth": {
    "page": {
      "mysticalEntry": "Mistik Giriş",
      "journeyStart": "Yolculuk Başlasın",
      "emailPlaceholder": "E-posta adresiniz",
      "passwordPlaceholder": "Şifreniz",
      "signIn": "Giriş Yap",
      "signUp": "Kayıt Ol"
    },
    "notice": {
      "checkEmail": "E-posta adresinizi kontrol edin"
    }
  }
}
```

## 🔧 Konfigürasyon

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Auth Settings
- **Email Confirmations**: Etkin
- **Email Change Confirmations**: Etkin
- **Password Reset**: Etkin
- **Social Providers**: Google, Facebook
- **Session Timeout**: 24 saat

## 📊 Database Schema

### Auth Tables (Otomatik Supabase)
```sql
-- auth.users (Supabase tarafından yönetilir)
-- user_metadata.role: 'admin' | 'premium' | 'user' | 'guest'
-- user_metadata.subscription: Payment subscription info
-- user_metadata.last_login: Son giriş tarihi
-- email_confirmed_at: E-posta onay tarihi
-- created_at: Hesap oluşturma tarihi
```

### Custom Tables
```sql
-- user_questions: Kullanıcı soruları
-- detailed_questions: Detaylı soru formları
-- tarot_readings: Tarot okuma kayıtları

-- Payment Tables
-- user_subscriptions: Kullanıcı abonelikleri
-- user_payment_methods: Ödeme yöntemleri
-- user_transactions: Ödeme işlemleri
-- pricing_tiers: Fiyatlandırma katmanları

-- Security Tables
-- audit_logs: Audit log kayıtları
-- two_factor_configs: 2FA konfigürasyonları
-- backup_codes: Yedek kodlar
-- security_events: Güvenlik olayları

-- Rate Limiting Tables
-- rate_limit_entries: Rate limiting kayıtları
-- blocked_ips: Engellenmiş IP'ler
-- suspicious_activities: Şüpheli aktiviteler
```

## 🔐 Enhanced Security Features

### 1. Two-Factor Authentication (2FA)
- **TOTP**: Time-based One-Time Password
- **SMS**: SMS-based verification
- **Email**: Email-based verification
- **Biometric**: Touch ID, Face ID, WebAuthn
- **Backup Codes**: Recovery codes for account access

### 2. Rate Limiting
- **IP-based**: Per IP address limits
- **User-based**: Per user limits
- **Endpoint-specific**: Different limits for different endpoints
- **Sliding Window**: Advanced rate limiting algorithm
- **Redis Integration**: Distributed rate limiting support

### 3. Audit Logging
- **Comprehensive Logging**: All user actions logged
- **Security Events**: Automatic security event detection
- **Real-time Monitoring**: Live security monitoring
- **Compliance Ready**: GDPR, SOX, HIPAA compliance
- **Risk Scoring**: Automatic risk assessment

### 4. Enhanced Session Management
- **Secure Storage**: Encrypted session storage
- **Session Timeout**: Automatic session expiration
- **Activity Tracking**: User activity monitoring
- **Concurrent Sessions**: Multiple session support
- **Session Analytics**: Session usage analytics

## 📱 PWA & Mobile Support

### 1. Progressive Web App (PWA)
- **Offline Support**: Works without internet connection
- **Service Worker**: Background sync and caching
- **App Manifest**: Native app-like experience
- **Push Notifications**: Real-time notifications
- **Install Prompt**: Add to home screen functionality

### 2. Mobile Browser Optimization
- **iOS Safari**: Touch ID, Face ID support
- **Android Chrome**: Fingerprint authentication
- **Responsive Design**: Mobile-first approach
- **Touch Optimization**: Touch-friendly interactions
- **Performance**: Optimized for mobile devices

### 3. Cross-Platform Compatibility
- **Web**: Full browser support
- **Mobile Web**: Mobile browser optimization
- **Desktop**: Native desktop experience
- **Tablet**: Tablet-optimized interface

## 💳 Payment Integration

### 1. Role-Based Payment Access
- **Free Tier**: Basic features
- **Premium Tier**: Enhanced features
- **Pro Tier**: Professional features
- **Enterprise**: Custom solutions

### 2. Payment Methods
- **Credit Cards**: Visa, MasterCard, American Express
- **Digital Wallets**: Apple Pay, Google Pay
- **Bank Transfers**: Direct bank integration
- **Cryptocurrency**: Bitcoin, Ethereum support

### 3. Subscription Management
- **Automatic Billing**: Recurring payments
- **Proration**: Mid-cycle upgrades/downgrades
- **Cancellation**: Easy subscription cancellation
- **Refunds**: Automated refund processing

## 🌐 Internationalization (i18n)

### 1. Supported Languages
- **Türkçe (tr)**: Primary language
- **English (en)**: International support
- **Serbian (sr)**: Latin script support

### 2. Localization Features
- **Date/Time**: Localized date and time formats
- **Currency**: Local currency support
- **Number Format**: Localized number formatting
- **Text Direction**: RTL/LTR support

### 3. Translation Management
- **Centralized**: All translations in JSON files
- **Real-time**: Dynamic language switching
- **Fallback**: Default language fallback
- **Validation**: Translation completeness checking

## 🚀 Deployment Checklist

### Production Hazırlığı
- [ ] Environment variables ayarlandı
- [ ] SMTP servisi yapılandırıldı
- [ ] E-posta template'leri özelleştirildi
- [ ] Redirect URL'leri güncellendi
- [ ] Site URL'i production domain'i ile ayarlandı
- [ ] Rate limiting kontrol edildi
- [ ] Error monitoring kuruldu

### Test Senaryoları
- [ ] Kullanıcı kaydı test edildi
- [ ] E-posta onayı test edildi
- [ ] Giriş/çıkış test edildi
- [ ] Social login test edildi
- [ ] Şifre sıfırlama test edildi
- [ ] Route protection test edildi
- [ ] Çoklu dil desteği test edildi

## 🔍 Sorun Giderme

### Yaygın Sorunlar

#### 1. E-posta Gelmiyor
- **Çözüm**: Spam klasörünü kontrol edin, SMTP ayarlarını doğrulayın

#### 2. Onay Bağlantısı Çalışmıyor
- **Çözüm**: Redirect URL'lerin doğru olduğunu kontrol edin

#### 3. Social Login Hatası
- **Çözüm**: OAuth provider ayarlarını kontrol edin

#### 4. Session Kaybolması
- **Çözüm**: Browser storage ayarlarını kontrol edin

### Debug Araçları
- **Console Logs**: Browser developer tools
- **Supabase Dashboard**: Auth logs ve user management
- **Network Tab**: API isteklerini izleme

## 📈 Performans Optimizasyonları

### 1. Code Splitting
- Auth sayfası lazy loading ile yüklenir
- useAuth hook'u sadece gerekli yerlerde kullanılır

### 2. Caching
- User session bilgileri cache'lenir
- Form state'leri localStorage'da saklanır

### 3. Error Boundaries
- Auth hatalarını yakalayan error boundary'ler
- Graceful degradation

## 🔮 Gelecek Geliştirmeler

### ✅ Tamamlanan Özellikler
- [x] 2FA (Two-Factor Authentication) - TOTP, SMS, Email, Biometric
- [x] Biometric authentication - Touch ID, Face ID, WebAuthn
- [x] Session management dashboard - Enhanced session handling
- [x] Advanced user roles - Role-based access control
- [x] Audit logging - Comprehensive audit trail
- [x] Rate limiting improvements - IP, user, endpoint-based
- [x] PWA support - Offline auth, service worker
- [x] Mobile browser compatibility - iOS, Android optimization
- [x] Payment system integration - Role-based payment access
- [x] Enhanced security headers - CSP, HSTS, XSS protection
- [x] TypeScript strict mode - Enhanced type safety

### Planlanan Özellikler
- [ ] CAPTCHA integration
- [ ] Password policy enforcement
- [ ] Advanced threat detection
- [ ] Machine learning-based fraud detection
- [ ] Multi-tenant support
- [ ] SSO integration (SAML, OIDC)
- [ ] Advanced analytics dashboard
- [ ] Real-time security monitoring

### Teknik İyileştirmeler
- [x] TypeScript strict mode
- [ ] Unit test coverage
- [ ] E2E test automation
- [ ] Performance monitoring
- [ ] Security audit
- [ ] Code splitting optimization
- [ ] Redis integration for rate limiting
- [ ] Elasticsearch for audit logs

## 📞 Destek

### Geliştirici Notları
- Auth sistemi Supabase Auth v2 kullanır
- Next.js 14 App Router ile uyumludur
- TypeScript strict mode destekler
- Responsive design uygulanmıştır

### İletişim
- **Dokümantasyon**: Bu dosya
- **Kod Yorumları**: Her dosyada detaylı açıklamalar
- **Setup Rehberi**: EMAIL_CONFIRMATION_SETUP.md

## 🛠️ Implementation Notes

### 1. Production-Ready Features Implemented

#### Enhanced Auth Hook (`useAuth.ts`)
- **Session Management**: Automatic session refresh and timeout
- **Activity Tracking**: User activity monitoring for session management
- **Secure Storage**: Encrypted session storage for PWA support
- **Audit Logging**: Comprehensive audit trail for all auth events
- **Role-Based Access**: Enhanced permission system
- **Error Handling**: Robust error handling with user-friendly messages

#### PWA Support (`PWAAuthProvider.tsx`)
- **Offline Support**: Works without internet connection
- **Service Worker Integration**: Background sync and caching
- **Install Prompt**: Native app installation support
- **Push Notifications**: Real-time notification support
- **Mobile Optimization**: Touch-friendly interactions

#### Security Enhancements
- **2FA System** (`2fa.ts`): TOTP, SMS, Email, Biometric support
- **Rate Limiting** (`rate-limiter.ts`): IP, user, endpoint-based limits
- **Audit Logging** (`audit-logger.ts`): Comprehensive security monitoring
- **Mobile Security** (`mobile-utils.ts`): Mobile-specific security features

#### Payment Integration (`usePayment.ts`)
- **Role-Based Access**: Payment features based on user roles
- **Subscription Management**: Full subscription lifecycle management
- **Payment Methods**: Multiple payment method support
- **Security**: PCI-compliant payment handling

### 2. Security Headers Implementation

```typescript
// Enhanced security headers in middleware
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' https://www.googletagmanager.com; ...'
};
```

### 3. TypeScript Strict Mode Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 4. PWA Manifest Configuration

```json
{
  "name": "TarotNumeroloji - Mystical Tarot Reading",
  "short_name": "TarotNumeroloji",
  "start_url": "/tr",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#0f0f23",
  "theme_color": "#6366f1",
  "scope": "/",
  "lang": "tr",
  "categories": ["lifestyle", "entertainment", "utilities"]
}
```

### 5. Service Worker Implementation

- **Auth Service Worker** (`sw-auth.js`): Secure authentication handling
- **Offline Support**: Cached auth responses for offline use
- **Background Sync**: Automatic session refresh
- **Push Notifications**: Security alerts and updates
- **Rate Limiting**: Client-side rate limiting support

### 6. Mobile Browser Compatibility

- **iOS Safari**: Touch ID, Face ID, WebAuthn support
- **Android Chrome**: Fingerprint authentication
- **Cross-Platform**: Consistent experience across devices
- **Performance**: Optimized for mobile devices
- **Touch Support**: Touch-friendly interactions

### 7. Internationalization Support

- **Multi-Language**: Turkish, English, Serbian support
- **Dynamic Switching**: Real-time language switching
- **Comprehensive Coverage**: All auth messages translated
- **Fallback System**: Default language fallback
- **Validation**: Translation completeness checking

### 8. Backend Integration Points

All backend integration points are marked with comments:
```typescript
// Burada backend'e bağlanılacak - [description]
```

Key integration points:
- Audit logging
- 2FA verification
- Payment processing
- Rate limiting storage
- Security alerts
- Session management

### 9. Production Deployment Steps

1. **Environment Setup**:
   - Configure Supabase environment variables
   - Set up Redis for rate limiting
   - Configure SMTP for email notifications

2. **Security Configuration**:
   - Enable RLS policies in Supabase
   - Configure security headers
   - Set up SSL certificates

3. **PWA Deployment**:
   - Register service worker
   - Configure manifest
   - Test offline functionality

4. **Monitoring Setup**:
   - Configure audit logging
   - Set up security alerts
   - Monitor rate limiting

5. **Testing**:
   - Test all auth flows
   - Verify 2FA functionality
   - Test payment integration
   - Validate mobile compatibility

---

*Son güncelleme: 2024*
*Versiyon: 2.0*
*Durum: Production Ready with Enhanced Security*
*Özellikler: 2FA, PWA, Mobile, Payment, Audit Logging, Rate Limiting*
