# 🚀 REFactor PLAN - Tarot Web Application

**Plan Tarihi:** $(date)  
**Framework:** Next.js 15.4.4 + TypeScript + Supabase  
**Branch:** refactor/structure-v1  
**Analiz Tabanı:** chore/inventory-safe

---

## 🎯 Plan Özeti

Bu refactor planı, mevcut Tarot Web projesini production-ready hale getirmek
için 7 fazlı bir yaklaşım sunar. Her faz, güvenli geri dönüş noktaları ve kabul
kapıları ile korunmuştur.

**Kritik Durum:**

- ❌ 235 TypeScript hatası
- ❌ Build başarısız (module resolution)
- ❌ 23 RSC ihlali
- ❌ 500+ lint hatası
- ⚠️ 8,000+ satır dead weight

---

## 🔒 FASE-0: Safety & Groundwork

### 🎯 Amaç

Güvenli refactor ortamı oluştur ve mevcut durumu snapshot'la.

### 📋 Görevler

- [ ] **Git Branching Stratejisi**
  - `refactor/structure-v1` branch'i oluştur
  - `chore/inventory-safe`'den fork et
  - Her faz sonunda `refactor-step-N` tag'i oluştur

- [ ] **Zorunlu Komut Kapıları**

  ```bash
  # Her faz öncesi çalıştır
  pnpm i --frozen-lockfile
  pnpm typecheck
  pnpm lint
  pnpm test -w || true
  pnpm build || true
  ```

- [ ] **Snapshot & Route Smoke**
  - Mevcut route'ların çalışır durumunu kaydet
  - Test placeholder'larına referans oluştur
  - Critical path'leri belirle

### ✅ Done Means

- [ ] `refactor/structure-v1` branch aktif
- [ ] Tüm komut kapıları çalışır (hata olsa bile)
- [ ] Snapshot alındı
- [ ] Test planı hazır

### 🔄 Rollback

```bash
git checkout chore/inventory-safe
git branch -D refactor/structure-v1
```

---

## 🔧 FASE-1: Type System Alignment

### 🎯 Amaç

TypeScript hatalarını çöz ve type safety'yi sağla.

### 📋 Görevler

#### 1.1 tsconfig Path Alias Netleştirme

- [ ] **Import Graph Analizi**
  - Mevcut path alias kullanımını haritala
  - Çakışan import'ları tespit et
  - Barrel export'ları optimize et

- [ ] **Path Alias Standardizasyonu**
  ```typescript
  // Önerilen yapı:
  "@/*": ["src/*"]
  "@/app/*": ["src/app/*"]
  "@/features/*": ["src/features/*"]
  "@/lib/*": ["src/lib/*"]
  "@/types/*": ["src/types/*"]
  "@/hooks/*": ["src/hooks/*"]
  ```

#### 1.2 Duplicate Exports Temizliği

- [ ] **Export Conflict'leri Çöz**
  - `src/lib/security/2fa.ts` - TOTPManager, SMS2FAManager
  - `src/lib/payment/payment-types.ts` - PaymentProvider, PaymentMethod
  - `src/lib/mobile/mobile-utils.ts` - MobileSecureStorage, MobileSessionManager

- [ ] **Ambient Type Çakışmaları**
  - Global type tanımlarını konsolide et
  - Namespace kullanımını optimize et

#### 1.3 235 TS Hatasını Alt Kümelere Böl

**1.3.1 Type Import/Export (50 hata)**

- [ ] Missing type imports
- [ ] Incorrect export syntax
- [ ] Module resolution issues

**1.3.2 JSX/Props (40 hata)**

- [ ] Missing prop types
- [ ] Incorrect JSX syntax
- [ ] Component prop validation

**1.3.3 Server/Client Ayrımı (30 hata)**

- [ ] RSC violation fixes
- [ ] Client hook usage in server components
- [ ] Proper data fetching patterns

**1.3.4 Missing Generics (35 hata)**

- [ ] Generic type parameters
- [ ] Function signature fixes
- [ ] Interface implementations

**1.3.5 any→unknown/DTO'lar (80 hata)**

- [ ] Replace `any` with proper types
- [ ] Create DTO interfaces
- [ ] Type guards implementation

### ✅ Done Means

- [ ] `pnpm typecheck` temiz çalışır
- [ ] Tüm duplicate exports çözüldü
- [ ] Type safety %95+ sağlandı
- [ ] Import graph optimize edildi

### 🔄 Rollback

```bash
git checkout refactor-step-0
git reset --hard HEAD
```

---

## ⚡ FASE-2: RSC & Routing Hygiene

### 🎯 Amaç

App Router uyumluluğunu sağla ve RSC ihlallerini düzelt.

### 📋 Görevler

#### 2.1 23 RSC İhlali için Tablo

| Dosya                                         | İhlal Türü                       | Önerilen Çözüm                   |
| --------------------------------------------- | -------------------------------- | -------------------------------- |
| `src/app/[locale]/auth/page.tsx`              | Client hook in server component  | `'use client'` directive ekle    |
| `src/app/[locale]/dashboard/page.tsx`         | useState in server component     | Client wrapper component oluştur |
| `src/app/[locale]/dashboard/credits/page.tsx` | useEffect in server component    | Data fetching'i server'a taşı    |
| `src/features/tarot/LoveTarot.tsx`            | Client state in server component | Client component'e dönüştür      |
| `src/features/numerology/NumerologyForm.tsx`  | Form state in server component   | `'use client'` directive ekle    |

#### 2.2 'use client' Konumlandırma Rehberi

- [ ] **Client Component Kriterleri**
  - useState, useEffect, useRef kullanımı
  - Event handlers (onClick, onChange)
  - Browser APIs (localStorage, window)
  - Third-party client libraries

- [ ] **Server Component Kriterleri**
  - Data fetching (Supabase queries)
  - Server-side calculations
  - Static content rendering
  - SEO-critical content

#### 2.3 Client-Hook Bağımlılıklarını Adapter ile İzole Etme

- [ ] **Adapter Pattern Implementation**

  ```typescript
  // Server Component
  export default function ServerPage() {
    const data = await getServerData();
    return <ClientWrapper data={data} />;
  }

  // Client Component
  'use client';
  export default function ClientWrapper({ data }) {
    const [state, setState] = useState();
    return <div>{/* Client logic */}</div>;
  }
  ```

#### 2.4 App Router Segment Haritası

- [ ] **Route Structure Analysis**
  ```
  app/
  ├── [locale]/
  │   ├── (auth)/
  │   │   ├── sign-in/
  │   │   └── sign-up/
  │   ├── (protected)/
  │   │   └── dashboard/
  │   └── (marketing)/
  │       ├── page.tsx
  │       └── about/
  └── api/
      ├── auth/
      ├── payment/
      └── webhook/
  ```

#### 2.5 Edge/Node Runtime Kararları

- [ ] **Edge Runtime Kullanımı**
  - API routes (auth, payment)
  - Middleware functions
  - Static generation

- [ ] **Node Runtime Kullanımı**
  - Database operations
  - File system access
  - Heavy computations

### ✅ Done Means

- [ ] Hydration error yok
- [ ] Basic route navigation çalışır
- [ ] Server/client component ayrımı net
- [ ] RSC violations çözüldü

### 🔄 Rollback

```bash
git checkout refactor-step-1
git reset --hard HEAD
```

---

## 🔌 FASE-3: API & Data Layer Stabilizasyonu

### 🎯 Amaç

API endpoint'lerini stabilize et ve data layer'ı optimize et.

### 📋 Görevler

#### 3.1 Build-Breaking API Route Düzeltmesi

- [ ] **`src/app/api/test-improved-numerology/route.ts` Mini-Faz**
  - Import path düzeltmesi
  - Runtime configuration
  - Response schema planı
  - Error handling

#### 3.2 Supabase Erişim Noktaları

- [ ] **SSR vs Client Kullanımı**

  ```typescript
  // Server-side (API routes, Server Components)
  import { createServerClient } from '@/lib/supabase/server';

  // Client-side (Client Components, Hooks)
  import { supabase } from '@/lib/supabase/client';
  ```

- [ ] **Service Role Yasak Kontrolü**
  - Client/edge'te service_role kullanımı yok
  - RLS policies aktif
  - Token sızıntısı koruması

#### 3.3 Prisma/Supabase Kullanım Sınırları

- [ ] **Database Access Patterns**
  - Server Components: Direct Supabase queries
  - Client Components: Custom hooks
  - API Routes: Server-side operations
  - Middleware: Session validation only

### ✅ Done Means

- [ ] Build başarılı çalışır
- [ ] API endpoints stabilize
- [ ] Data layer optimize
- [ ] Security controls aktif

### 🔄 Rollback

```bash
git checkout refactor-step-2
git reset --hard HEAD
```

---

## 📝 FASE-4: Form & i18n Konsolidasyonu

### 🎯 Amaç

Form handling ve internationalization'ı standardize et.

### 📋 Görevler

#### 4.1 RHF + Zod Şema/UI Ayrımı

- [ ] **Schema Separation**

  ```typescript
  // schemas/auth.ts
  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // components/forms/LoginForm.tsx
  ('use client');
  export function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
    });
    // Form UI logic
  }
  ```

#### 4.2 Error Messages i18n Anahtarları

- [ ] **Validation Message Keys**
  ```typescript
  // messages/tr.json
  {
    "validation": {
      "email": "Geçerli bir e-posta adresi girin",
      "password": "Şifre en az 6 karakter olmalı"
    }
  }
  ```

#### 4.3 i18n Missing Keys Raporu

- [ ] **tr/en/me Eşleşme Stratejisi**
  - Eksik anahtarları tespit et
  - Placeholder stratejisi belirle
  - Auto-add kararı (Prompt 3'e bırak)

### ✅ Done Means

- [ ] Form schemas ayrıldı
- [ ] i18n keys standardize
- [ ] Validation messages i18n
- [ ] Missing keys raporu hazır

### 🔄 Rollback

```bash
git checkout refactor-step-3
git reset --hard HEAD
```

---

## 🧹 FASE-5: Code Quality & Observability

### 🎯 Amaç

Code quality'yi artır ve monitoring ekle.

### 📋 Görevler

#### 5.1 ESLint/Prettier Uyum Planı

- [ ] **Lint Error Temizliği**
  - 500+ prettier/ESLint hatası
  - Unused variables
  - Console.log temizliği

- [ ] **Codemod Önerileri**

  ```bash
  # Console.log temizliği
  npx jscodeshift -t remove-console.js src/

  # Unused imports temizliği
  npx unimported
  ```

#### 5.2 Sentry/Monitoring Bağlama Planı

- [ ] **Error Tracking Setup**

  ```typescript
  // lib/monitoring/sentry.ts
  import * as Sentry from '@sentry/nextjs';

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
  ```

- [ ] **DSN Environment Guard**
  - Production'da DSN zorunlu
  - Development'da optional
  - Error boundary implementation

### ✅ Done Means

- [ ] Lint errors temiz
- [ ] Console.log'lar production'dan kaldırıldı
- [ ] Monitoring aktif
- [ ] Error tracking çalışır

### 🔄 Rollback

```bash
git checkout refactor-step-4
git reset --hard HEAD
```

---

## 🗑️ FASE-6: Dead Weight & Bundle Health

### 🎯 Amaç

Kullanılmayan kodu temizle ve bundle'ı optimize et.

### 📋 Görevler

#### 6.1 Removal Candidate Listesi (Onaylı Plan)

**6.1.1 8 Kullanılmayan Dosya**

- [ ] `src/app/api/test-improved-numerology/route.ts` - Build hatası
- [ ] `src/middleware.ts.bak` - Backup dosyası
- [ ] `tests/i18n/locale-routing.spec.ts` - Jest dependency eksik
- [ ] `tests/i18n/messages-parity.test.ts` - Jest dependency eksik
- [ ] `docs/MODULAR_REFACTOR_PLAN.mdc` - Eski plan
- [ ] `docs/MODULARITY_AUDIT.mdc` - Eski audit
- [ ] `docs/TAROT_COMPONENTS_API.md` - Eski API docs
- [ ] `numerolgy.json` - Typo in filename

**6.1.2 12 Atıl Component**

- [ ] `GenericTarotSpread` - Kullanılmıyor
- [ ] `MobileScrollWrapper` - Kullanılmıyor
- [ ] `CreditInfoModal` - Kullanılmıyor
- [ ] `ErrorDisplay` - Kullanılmıyor
- [ ] `ReadingInfoModal` - Kullanılmıyor
- [ ] `ABTestManager` - Kullanılmıyor
- [ ] `FraudDetection` - Kullanılmıyor
- [ ] `RealTimeMonitoring` - Kullanılmıyor

**6.1.3 15 Duplicate Util**

- [ ] String utilities (cn, formatName)
- [ ] Date formatting functions
- [ ] Auth check functions
- [ ] Data formatting utilities

#### 6.2 Bundle & CWV Hedefleri

- [ ] **Bundle Size Targets**
  - Initial bundle: < 200KB
  - Chunk size: < 50KB
  - Total bundle: < 1MB

- [ ] **Core Web Vitals**
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

#### 6.3 Ölçüm Yöntemi

- [ ] **Bundle Analysis**

  ```bash
  npx @next/bundle-analyzer
  npx webpack-bundle-analyzer
  ```

- [ ] **Performance Monitoring**
  - Lighthouse CI
  - Web Vitals measurement
  - Bundle size tracking

### ✅ Done Means

- [ ] Bundle size %15-20 azaldı
- [ ] Build time %10-15 hızlandı
- [ ] Dead code temizlendi
- [ ] CWV hedefleri sağlandı

### 🔄 Rollback

```bash
git checkout refactor-step-5
git reset --hard HEAD
```

---

## 🧪 FASE-7: Test Strategy

### 🎯 Amaç

Kapsamlı test coverage oluştur.

### 📋 Görevler

#### 7.1 Test Matrisi

**7.1.1 Unit Tests (Utils)**

- [ ] **Target Coverage:** %80+
- [ ] **Focus Areas:**
  - `src/lib/utils/*` - Utility functions
  - `src/lib/numerology/*` - Calculation functions
  - `src/lib/security/*` - Security utilities
  - `src/hooks/*` - Custom hooks

**7.1.2 Integration Tests (API)**

- [ ] **Target Coverage:** %70+
- [ ] **Focus Areas:**
  - `src/app/api/*` - API endpoints
  - Supabase integration
  - Payment webhooks
  - Email services

**7.1.3 E2E Tests (Critical Journeys)**

- [ ] **Target Coverage:** %60+
- [ ] **Focus Areas:**
  - User authentication flow
  - Tarot reading process
  - Payment flow
  - Dashboard navigation

#### 7.2 Coverage Hedefi (Kademeli)

- [ ] **Week 1:** %40 coverage
- [ ] **Week 2:** %60 coverage
- [ ] **Week 3:** %80 coverage
- [ ] **Week 4:** %90+ coverage

#### 7.3 Test Infrastructure

- [ ] **Testing Framework**
  - Jest + React Testing Library
  - Playwright (E2E)
  - MSW (API mocking)

- [ ] **CI/CD Integration**
  - Automated test runs
  - Coverage reporting
  - Test result notifications

### ✅ Done Means

- [ ] Test coverage %80+
- [ ] Critical path'ler test edildi
- [ ] CI/CD pipeline'da test'ler çalışır
- [ ] Test'ler güvenilir

### 🔄 Rollback

```bash
git checkout refactor-step-6
git reset --hard HEAD
```

---

## 🔄 Rollback Strategy

### 🏷️ Git Tagging Strategy

```bash
# Her faz sonunda
git tag refactor-step-0  # Safety & Groundwork
git tag refactor-step-1  # Type System Alignment
git tag refactor-step-2  # RSC & Routing Hygiene
git tag refactor-step-3  # API & Data Layer
git tag refactor-step-4  # Form & i18n
git tag refactor-step-5  # Code Quality
git tag refactor-step-6  # Dead Weight
git tag refactor-step-7  # Test Strategy
```

### 🔙 Geri Dönüş Reçetesi

**Acil Rollback (1 saat)**

1. Git revert son commit'e
2. Database rollback (gerekirse)
3. Environment variables eski haline
4. Monitoring aktif et

**Orta Vadeli Rollback (1 gün)**

1. Feature flags ile disable et
2. Database migration geri al
3. API versioning ile eski versiyona dön
4. User communication yap

**Uzun Vadeli Rollback (1 hafta)**

1. Blue-green deployment ile eski versiyona dön
2. Data migration gerekirse
3. User training gerekirse
4. Documentation güncelle

---

## ✅ Acceptance Gates (Global)

### 🔒 Zorunlu Kapılar

- [ ] `pnpm typecheck` temiz çalışır
- [ ] `pnpm lint` hata vermez
- [ ] Smoke tests geçer
- [ ] `/dashboard` guard'ları çalışır
- [ ] Auth acceptance koşulları sağlanır

### 🎯 Auth Acceptance Koşulları

- [ ] Valid login → `/dashboard` redirect
- [ ] Invalid creds → form error
- [ ] Sign-up → email confirmation notice
- [ ] Unauthed `/dashboard` → `/sign-in` redirect

### 📊 Performance Gates

- [ ] Build time < 2 minutes
- [ ] Bundle size < 1MB
- [ ] LCP < 2.5s
- [ ] Test coverage > 80%

---

## 📋 Faz Özeti

| Faz        | Amaç                  | Süre    | Risk   | Rollback           |
| ---------- | --------------------- | ------- | ------ | ------------------ |
| **FASE-0** | Safety & Groundwork   | 1 gün   | Düşük  | Git checkout       |
| **FASE-1** | Type System Alignment | 3-4 gün | Yüksek | Git revert         |
| **FASE-2** | RSC & Routing Hygiene | 2-3 gün | Orta   | Component rollback |
| **FASE-3** | API & Data Layer      | 2 gün   | Orta   | API rollback       |
| **FASE-4** | Form & i18n           | 2 gün   | Düşük  | Config rollback    |
| **FASE-5** | Code Quality          | 2 gün   | Düşük  | Lint rollback      |
| **FASE-6** | Dead Weight           | 3 gün   | Orta   | File restore       |
| **FASE-7** | Test Strategy         | 1 hafta | Düşük  | Test disable       |

**Toplam Süre:** 3-4 hafta  
**Toplam Risk:** Orta-Yüksek  
**Beklenen Fayda:** Yüksek  
**ROI:** Pozitif

---

## 🎯 Sonuç

Bu refactor planı, Tarot Web projesini production-ready hale getirmek için
güvenli ve kademeli bir yaklaşım sunar. Her faz, net kabul kriterleri ve
rollback stratejileri ile korunmuştur.

**Kritik Başarı Faktörleri:**

1. TypeScript hatalarını çöz
2. Build'i çalışır hale getir
3. RSC ihlallerini düzelt
4. Güvenlik kontrollerini aktif et
5. Test coverage'ı artır

**Önerilen Yaklaşım:**

1. FASE-0 ile güvenli ortam oluştur
2. FASE-1-3 ile kritik sorunları çöz
3. FASE-4-6 ile optimizasyon yap
4. FASE-7 ile test coverage'ı tamamla

Bu plan, mevcut kodu değiştirmeden uygulanabilir ve her adımda güvenli geri
dönüş imkanı sağlar.
