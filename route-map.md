# 🗺️ Route Map - Tarot Web Application

**Analiz Tarihi:** $(date)  
**Framework:** Next.js 15.4.4 App Router  
**Branch:** chore/inventory-safe

---

## 📍 App Router Yapısı

### 🌐 Locale Routing

```
/[locale]/
├── tr/ (Turkish - Default)
├── en/ (English)
└── sr/ (Serbian - Latin)
```

### 🏠 Ana Sayfalar

#### Public Routes

| Route                           | Component         | Type   | Description                |
| ------------------------------- | ----------------- | ------ | -------------------------- |
| `/`                             | Redirect          | Server | → `/{locale}/tarotokumasi` |
| `/{locale}/tarotokumasi`        | TarotPage         | Client | Ana tarot okuma sayfası    |
| `/{locale}/numeroloji`          | NumerologyPage    | Client | Numeroloji hesaplama       |
| `/{locale}/numeroloji/[type]`   | DynamicPage       | Client | Numeroloji türü sayfası    |
| `/{locale}/auth`                | AuthPage          | Client | Kimlik doğrulama           |
| `/{locale}/auth/reset-password` | ResetPasswordPage | Client | Şifre sıfırlama            |

#### Protected Routes (Dashboard)

| Route                            | Component      | Type   | Auth Required | Description      |
| -------------------------------- | -------------- | ------ | ------------- | ---------------- |
| `/{locale}/dashboard`            | DashboardPage  | Client | ✅            | Kullanıcı paneli |
| `/{locale}/dashboard/credits`    | CreditsPage    | Client | ✅            | Kredi yönetimi   |
| `/{locale}/dashboard/packages`   | PackagesPage   | Client | ✅            | Paket satın alma |
| `/{locale}/dashboard/readings`   | ReadingsPage   | Client | ✅            | Okuma geçmişi    |
| `/{locale}/dashboard/settings`   | SettingsPage   | Client | ✅            | Hesap ayarları   |
| `/{locale}/dashboard/statistics` | StatisticsPage | Client | ✅            | İstatistikler    |

#### Admin Routes (Pakize)

| Route                        | Component         | Type   | Auth Required | Admin Required | Description        |
| ---------------------------- | ----------------- | ------ | ------------- | -------------- | ------------------ |
| `/{locale}/pakize`           | AdminDashboard    | Client | ✅            | ✅             | Admin ana panel    |
| `/{locale}/pakize/users`     | UsersPage         | Client | ✅            | ✅             | Kullanıcı yönetimi |
| `/{locale}/pakize/orders`    | OrdersPage        | Client | ✅            | ✅             | Sipariş yönetimi   |
| `/{locale}/pakize/packages`  | AdminPackagesPage | Client | ✅            | ✅             | Paket yönetimi     |
| `/{locale}/pakize/analytics` | AnalyticsPage     | Client | ✅            | ✅             | Analitik           |
| `/{locale}/pakize/settings`  | AdminSettingsPage | Client | ✅            | ✅             | Sistem ayarları    |

#### Payment Routes

| Route                       | Component          | Type   | Description    |
| --------------------------- | ------------------ | ------ | -------------- |
| `/{locale}/payment/success` | PaymentSuccessPage | Client | Ödeme başarılı |
| `/{locale}/payment/cancel`  | PaymentCancelPage  | Client | Ödeme iptal    |

#### Legal Pages

| Route                              | Component          | Type   | Description         |
| ---------------------------------- | ------------------ | ------ | ------------------- |
| `/{locale}/legal/about`            | AboutPage          | Server | Hakkımızda          |
| `/{locale}/legal/contact`          | ContactPage        | Server | İletişim            |
| `/{locale}/legal/privacy-policy`   | PrivacyPolicyPage  | Server | Gizlilik politikası |
| `/{locale}/legal/terms-of-use`     | TermsOfUsePage     | Server | Kullanım şartları   |
| `/{locale}/legal/refund-policy`    | RefundPolicyPage   | Server | İade politikası     |
| `/{locale}/legal/payment-terms`    | PaymentTermsPage   | Server | Ödeme şartları      |
| `/{locale}/legal/kvkk-disclosure`  | KVKKPage           | Server | KVKK aydınlatma     |
| `/{locale}/legal/disclaimer`       | DisclaimerPage     | Server | Sorumluluk reddi    |
| `/{locale}/legal/copyright-policy` | CopyrightPage      | Server | Telif hakkı         |
| `/{locale}/legal/cookie-policy`    | CookiePolicyPage   | Server | Çerez politikası    |
| `/{locale}/legal/child-privacy`    | ChildPrivacyPage   | Server | Çocuk gizliliği     |
| `/{locale}/legal/accessibility`    | AccessibilityPage  | Server | Erişilebilirlik     |
| `/{locale}/legal/security-policy`  | SecurityPolicyPage | Server | Güvenlik politikası |

---

## 🔌 API Routes

### Public API Endpoints

| Route                | Method   | Type   | Description           | Rate Limit |
| -------------------- | -------- | ------ | --------------------- | ---------- |
| `/api/geolocation`   | GET/POST | Server | Coğrafi konum tespiti | 10/min     |
| `/api/exchange-rate` | GET/POST | Server | Döviz kuru çevirme    | 100/hour   |

### Protected API Endpoints

| Route                      | Method | Type   | Auth Required | Description          |
| -------------------------- | ------ | ------ | ------------- | -------------------- |
| `/api/send-email`          | POST   | Server | ✅            | Email gönderme       |
| `/api/send-reading-email`  | POST   | Server | ✅            | Okuma email gönderme |
| `/api/test-email`          | POST   | Server | ✅            | Email test           |
| `/api/test-enhanced-email` | POST   | Server | ✅            | Gelişmiş email test  |

### Webhook Endpoints

| Route                  | Method | Type   | Description           |
| ---------------------- | ------ | ------ | --------------------- |
| `/api/webhook/shopier` | POST   | Server | Shopier ödeme webhook |

### Auth Endpoints

| Route                    | Method | Type   | Description     |
| ------------------------ | ------ | ------ | --------------- |
| `/{locale}/auth/confirm` | GET    | Server | Email doğrulama |

---

## 🛡️ Middleware Configuration

### Security Headers

```typescript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': '...'
}
```

### Route Protection

- **Public Routes:** Ana sayfalar, auth, legal
- **Protected Routes:** Dashboard, user-specific content
- **Admin Routes:** Pakize paneli, admin-only content
- **API Routes:** Rate limiting, authentication

### Locale Handling

- **Default Locale:** Turkish (tr)
- **Supported Locales:** tr, en, sr
- **Fallback:** Turkish for unsupported locales
- **Cookie Storage:** NEXT_LOCALE cookie

---

## 🔄 Route Flow

### Authentication Flow

```
1. User visits protected route
2. Middleware checks authentication
3. If not authenticated → redirect to /{locale}/auth
4. If authenticated → allow access
5. Admin routes require additional admin check
```

### Locale Flow

```
1. User visits any route
2. Middleware checks for locale in URL
3. If no locale → redirect to /{defaultLocale}{pathname}
4. If invalid locale → redirect to /{defaultLocale}{pathname}
5. Set NEXT_LOCALE cookie
```

### Payment Flow

```
1. User selects package → /{locale}/dashboard/packages
2. Payment form → Shopier integration
3. Success → /{locale}/payment/success
4. Cancel → /{locale}/payment/cancel
5. Webhook → /api/webhook/shopier
```

---

## ⚠️ Route Issues

### RSC Violations

23 sayfa client-side hook kullanıyor (useState, useEffect):

- Dashboard sayfaları
- Admin sayfaları
- Auth sayfaları
- Payment sayfaları

### Missing Routes

- Error pages (404, 500)
- Maintenance page (exists but not integrated)
- Loading states
- Offline pages

### Security Concerns

- Rate limiting development modunda devre dışı
- Auth protection development modunda bypass
- Admin routes için ek güvenlik kontrolleri eksik

---

## 📊 Route Statistics

| Category             | Count | Status                |
| -------------------- | ----- | --------------------- |
| **Public Routes**    | 15    | ✅ Working            |
| **Protected Routes** | 6     | ⚠️ Auth bypass in dev |
| **Admin Routes**     | 6     | ⚠️ Auth bypass in dev |
| **API Routes**       | 8     | ✅ Working            |
| **Legal Routes**     | 12    | ✅ Working            |
| **Total Routes**     | 47    | ⚠️ Mixed status       |

---

## 🎯 Recommendations

### Immediate Fixes

1. **Fix RSC Violations:** Convert client components to server components where
   possible
2. **Enable Auth Protection:** Remove development bypasses
3. **Add Error Pages:** 404, 500, maintenance pages
4. **Rate Limiting:** Enable in production

### Short Term

1. **Route Optimization:** Lazy loading for heavy pages
2. **Security Enhancement:** Additional admin route protection
3. **Performance:** Route-based code splitting
4. **Monitoring:** Route performance tracking

### Long Term

1. **Route Analytics:** User journey tracking
2. **A/B Testing:** Route-based experiments
3. **SEO Optimization:** Route-based meta tags
4. **Accessibility:** Route-based accessibility features
