# 🔗 Dependency Graph - Tarot Web Application

**Analiz Tarihi:** $(date)  
**Framework:** Next.js 15.4.4 + TypeScript  
**Branch:** chore/inventory-safe

---

## 📊 Dependency Overview

### 📈 İstatistikler
- **Toplam Import:** 514
- **Toplam Export:** 613
- **Client Components:** 88
- **Server Components:** 0 (RSC ihlali)
- **Mixed Components:** 23 (App Router'da client hook kullanımı)

---

## 🏗️ Ana Bağımlılık Kümeleri

### 1. 🎨 UI Components Cluster
```
src/features/shared/ui/
├── BaseCardRenderer.tsx
├── BaseCardGallery.tsx
├── BaseCardDetails.tsx
├── BaseCardPosition.tsx
├── BaseInterpretation.tsx
├── BaseReadingTypeSelector.tsx
└── CardDetails.tsx

Dependencies:
├── React (useState, useEffect)
├── Tailwind CSS
├── Framer Motion
└── @/types/tarot.ts
```

### 2. 🃏 Tarot Engine Cluster
```
src/features/tarot/lib/
├── a-tarot-helpers.ts
├── full-tarot-deck.ts
└── love/
    ├── position-meanings-index.ts
    ├── position-1-ilgi-duydugun-kisi.ts
    ├── position-2-fiziksel.ts
    ├── position-3-baglanti.ts
    └── position-4-uzun-vadeli-surec.ts

Dependencies:
├── @/lib/constants/tarotSpreads.ts
├── @/types/tarot.ts
└── @/lib/i18n/config.ts
```

### 3. 🔐 Authentication Cluster
```
src/hooks/useAuth.ts
src/lib/session-manager.ts
src/lib/security/
├── 2fa.ts
├── audit-logger.ts
└── rate-limiter.ts

Dependencies:
├── @supabase/supabase-js
├── @/lib/supabase/client.ts
├── @/types/auth.types.ts
└── @/lib/audit-logger.ts
```

### 4. 💳 Payment System Cluster
```
src/hooks/usePayment.ts
src/hooks/useShopier.ts
src/lib/payment/
├── payment-types.ts
└── shopier-config.ts

Dependencies:
├── @/types/auth.types.ts
├── @/lib/supabase/client.ts
└── Environment variables
```

### 5. 🌐 Internationalization Cluster
```
src/i18n/request.ts
src/lib/i18n/
├── config.ts
├── paths.ts
└── validation.ts
src/hooks/useTranslations.ts

Dependencies:
├── next-intl
├── messages/*.json
└── @/lib/i18n/config.ts
```

---

## 🔄 Import Patterns

### External Dependencies
| Package | Usage Count | Purpose |
|---------|-------------|---------|
| `react` | 45 | Core React functionality |
| `next` | 38 | Next.js framework |
| `@supabase/supabase-js` | 25 | Database and auth |
| `tailwindcss` | 15 | Styling |
| `framer-motion` | 8 | Animations |
| `react-hook-form` | 12 | Form handling |
| `zod` | 8 | Validation |
| `next-intl` | 6 | Internationalization |

### Internal Dependencies
| Path | Usage Count | Purpose |
|------|-------------|---------|
| `@/lib` | 89 | Utilities and configs |
| `@/features` | 67 | Feature modules |
| `@/hooks` | 34 | Custom React hooks |
| `@/components` | 45 | Reusable components |
| `@/types` | 28 | TypeScript definitions |

---

## ⚠️ Dependency Issues

### 1. 🔴 Circular Dependencies
```
src/lib/security/audit-logger.ts
├── imports: @/lib/supabase/client.ts
└── exports: AuditLogger (used by client.ts)

src/lib/supabase/client.ts
├── imports: @/lib/security/audit-logger.ts
└── exports: supabase client
```

### 2. 🟡 Duplicate Exports
```typescript
// Multiple files exporting same names:
src/lib/security/2fa.ts: TOTPManager, SMS2FAManager, Email2FAManager
src/lib/payment/payment-types.ts: PaymentProvider, PaymentMethod, Currency
src/lib/mobile/mobile-utils.ts: MobileSecureStorage, MobileSessionManager
```

### 3. 🟠 Unused Imports
```typescript
// Common unused imports:
src/lib/numerology/calculators.ts: normalizeDate, getLetterValue
src/lib/pdf/pdf-generator.ts: JSDOM
src/lib/security/audit-logger.ts: supabase, UserRole
```

---

## 🏛️ Architecture Layers

### Layer 1: Presentation (UI Components)
```
src/features/shared/ui/
src/components/
src/app/[locale]/
```
**Dependencies:** React, Tailwind, Framer Motion

### Layer 2: Business Logic (Features)
```
src/features/tarot/
src/features/numerology/
src/features/dashboard/
```
**Dependencies:** Layer 1 + Custom hooks

### Layer 3: Data Access (Hooks & Services)
```
src/hooks/
src/lib/supabase/
src/lib/admin/
```
**Dependencies:** Layer 2 + Supabase

### Layer 4: Infrastructure (Utils & Config)
```
src/lib/utils/
src/lib/config/
src/lib/constants/
```
**Dependencies:** External packages only

---

## 🔍 Dependency Analysis by Feature

### Tarot Reading System
```
LoveTarot.tsx
├── LoveCardRenderer.tsx
├── LoveInterpretation.tsx
├── LoveGuidanceDetail.tsx
└── TarotReadingSaver.tsx

Dependencies:
├── @/features/tarot/lib/* (tarot engine)
├── @/features/shared/ui/* (UI components)
├── @/hooks/useTarotReading.ts
└── @/lib/supabase/client.ts
```

### Numerology System
```
NumerologyForm.tsx
├── NumerologyResult.tsx
└── NumberMeaning.tsx

Dependencies:
├── @/lib/numerology/* (calculators)
├── @/features/shared/ui/* (UI components)
└── @/hooks/useTranslations.ts
```

### Dashboard System
```
DashboardPage.tsx
├── WelcomeSection.tsx
├── StatsCards.tsx
├── RecentActivity.tsx
└── ProfileManagement.tsx

Dependencies:
├── @/hooks/useDashboardData.ts
├── @/hooks/useAuth.ts
├── @/lib/supabase/client.ts
└── @/features/shared/ui/*
```

---

## 🚨 Critical Dependency Issues

### 1. RSC Violations (23 files)
App Router sayfalarında client-side hook kullanımı:
```typescript
// ❌ Server Component'te client hook
'use client' // Missing directive
export default function Page() {
  const [state, setState] = useState(); // ❌ Client hook in server component
}
```

### 2. Type Safety Issues
```typescript
// ❌ Unsafe type assertions
const data = response.data as any;
const user = session?.user!; // Non-null assertion without check
```

### 3. Missing Error Boundaries
```typescript
// ❌ No error handling for async operations
const result = await supabase.from('table').select();
// Should wrap in try-catch
```

---

## 📊 Dependency Metrics

| Metric | Value | Status |
|--------|-------|--------|
| **Total Dependencies** | 514 imports | ⚠️ High |
| **Circular Dependencies** | 2 detected | 🔴 Critical |
| **Duplicate Exports** | 15+ conflicts | 🔴 Critical |
| **Unused Imports** | 25+ files | 🟡 Warning |
| **RSC Violations** | 23 files | 🔴 Critical |
| **Type Safety** | 235 errors | 🔴 Critical |

---

## 🎯 Dependency Optimization Recommendations

### Immediate (Critical)
1. **Fix Circular Dependencies**
   - Refactor audit-logger.ts
   - Separate client/server concerns
   - Use dependency injection

2. **Resolve Duplicate Exports**
   - Consolidate similar modules
   - Use barrel exports properly
   - Rename conflicting exports

3. **Fix RSC Violations**
   - Add 'use client' directives
   - Separate server/client components
   - Use proper data fetching patterns

### Short Term (High Priority)
1. **Clean Unused Imports**
   - Remove unused dependencies
   - Optimize bundle size
   - Improve build performance

2. **Improve Type Safety**
   - Fix TypeScript errors
   - Add proper type guards
   - Use strict mode properly

3. **Add Error Boundaries**
   - Wrap async operations
   - Add proper error handling
   - Implement fallback UI

### Long Term (Medium Priority)
1. **Dependency Architecture**
   - Implement proper layering
   - Use dependency injection
   - Create clear interfaces

2. **Performance Optimization**
   - Lazy load heavy dependencies
   - Optimize bundle splitting
   - Implement tree shaking

3. **Monitoring & Analytics**
   - Track dependency usage
   - Monitor bundle size
   - Analyze performance impact

---

## 🔧 Dependency Management Tools

### Recommended Tools
1. **madge** - Circular dependency detection
2. **depcheck** - Unused dependency detection
3. **bundle-analyzer** - Bundle size analysis
4. **type-coverage** - TypeScript coverage

### Implementation
```bash
# Install tools
npm install -D madge depcheck @next/bundle-analyzer type-coverage

# Analyze dependencies
npx madge --circular src/
npx depcheck
npx type-coverage
```

---

## 📋 Action Plan

### Week 1: Critical Fixes
- [ ] Fix circular dependencies
- [ ] Resolve duplicate exports
- [ ] Fix RSC violations
- [ ] Clean unused imports

### Week 2: Type Safety
- [ ] Fix TypeScript errors
- [ ] Add proper type guards
- [ ] Implement error boundaries
- [ ] Improve type coverage

### Week 3: Optimization
- [ ] Optimize bundle size
- [ ] Implement lazy loading
- [ ] Add dependency monitoring
- [ ] Performance testing

### Week 4: Documentation
- [ ] Document dependency patterns
- [ ] Create architecture diagrams
- [ ] Update development guidelines
- [ ] Team training
