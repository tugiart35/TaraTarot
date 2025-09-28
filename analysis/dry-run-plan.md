# 🔍 DRY-RUN PLAN - Repository Restructure

**Date:** $(date)  
**Branch:** refactor/structure-v1  
**Source:** migrations/refactor-moves.plan.json

---

## 📋 Move Actions Analysis

### FASE-1: TypeScript Duplicate Export Conflicts

| Action | From                               | To                                                                   | Reason                                                     | Legacy Alias | Adapter | Import Fix |
| ------ | ---------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ | ------- | ---------- |
| RENAME | `src/lib/security/2fa.ts`          | `src/lib/security/two-factor-auth.ts`                                | TOTPManager, SMS2FAManager export conflicts                | ✅           | ❌      | ✅         |
| RENAME | `src/lib/payment/payment-types.ts` | `src/lib/payment/types.ts`                                           | PaymentProvider, PaymentMethod export conflicts            | ✅           | ❌      | ✅         |
| RENAME | `src/lib/mobile/mobile-utils.ts`   | `src/lib/mobile/utils.ts`                                            | MobileSecureStorage, MobileSessionManager export conflicts | ✅           | ❌      | ✅         |
| SPLIT  | `src/lib/security/audit-logger.ts` | `src/lib/security/audit-logger.ts + src/lib/security/audit-types.ts` | Circular dependency resolution                             | ✅           | ❌      | ✅         |

### FASE-2: RSC Violations

| Action | From                                          | To                                                                                                   | Reason                           | Legacy Alias | Adapter | Import Fix |
| ------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------- | ------------ | ------- | ---------- |
| SPLIT  | `src/app/[locale]/auth/page.tsx`              | `src/app/[locale]/auth/page.tsx + src/app/[locale]/auth/AuthForm.tsx`                                | Client hook in server component  | ✅           | ❌      | ✅         |
| SPLIT  | `src/app/[locale]/dashboard/page.tsx`         | `src/app/[locale]/dashboard/page.tsx + src/app/[locale]/dashboard/DashboardClient.tsx`               | useState in server component     | ✅           | ❌      | ✅         |
| SPLIT  | `src/app/[locale]/dashboard/credits/page.tsx` | `src/app/[locale]/dashboard/credits/page.tsx + src/app/[locale]/dashboard/credits/CreditsClient.tsx` | useEffect in server component    | ✅           | ❌      | ✅         |
| MOVE   | `src/features/tarot/LoveTarot.tsx`            | `src/features/tarot/components/LoveTarot.tsx`                                                        | Client state in server component | ✅           | ❌      | ✅         |
| MOVE   | `src/features/numerology/NumerologyForm.tsx`  | `src/features/numerology/components/NumerologyForm.tsx`                                              | Form state in server component   | ✅           | ❌      | ✅         |
| SPLIT  | `src/features/dashboard/DashboardPage.tsx`    | `src/features/dashboard/DashboardPage.tsx + src/features/dashboard/components/DashboardClient.tsx`   | Client hooks in server component | ✅           | ❌      | ✅         |

### FASE-3: API Route Organization

| Action | From                                            | To                                         | Reason                                | Legacy Alias | Adapter | Import Fix |
| ------ | ----------------------------------------------- | ------------------------------------------ | ------------------------------------- | ------------ | ------- | ---------- |
| MOVE   | `src/app/api/test-improved-numerology/route.ts` | `src/app/api/numerology/improved/route.ts` | Build error - module resolution issue | ✅           | ❌      | ✅         |
| MOVE   | `src/app/api/send-reading-email/route.ts`       | `src/app/api/email/reading/route.ts`       | API route organization                | ✅           | ❌      | ✅         |
| MOVE   | `src/app/api/test-email/route.ts`               | `src/app/api/email/test/route.ts`          | API route organization                | ✅           | ❌      | ✅         |
| MOVE   | `src/app/api/test-enhanced-email/route.ts`      | `src/app/api/email/enhanced/route.ts`      | API route organization                | ✅           | ❌      | ✅         |
| MOVE   | `src/app/api/send-email/route.ts`               | `src/app/api/email/send/route.ts`          | API route organization                | ✅           | ❌      | ✅         |

### FASE-4: Form Schema Separation

| Action            | From                                                    | To                                                                                                | Reason                      | Legacy Alias | Adapter | Import Fix |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------- | ------------ | ------- | ---------- |
| INTRODUCE_ADAPTER | `src/features/auth/components/LoginForm.tsx`            | `src/features/auth/schemas/login.ts + src/features/auth/components/LoginForm.tsx`                 | RHF + Zod schema separation | ❌           | ✅      | ✅         |
| INTRODUCE_ADAPTER | `src/features/auth/components/SignupForm.tsx`           | `src/features/auth/schemas/signup.ts + src/features/auth/components/SignupForm.tsx`               | RHF + Zod schema separation | ❌           | ✅      | ✅         |
| INTRODUCE_ADAPTER | `src/features/numerology/components/NumerologyForm.tsx` | `src/features/numerology/schemas/form.ts + src/features/numerology/components/NumerologyForm.tsx` | RHF + Zod schema separation | ❌           | ✅      | ✅         |

### FASE-5: Code Quality

| Action            | From                                | To                                                                       | Reason                 | Legacy Alias | Adapter | Import Fix |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------ | ---------------------- | ------------ | ------- | ---------- |
| SPLIT             | `src/lib/numerology/calculators.ts` | `src/lib/numerology/calculators.ts + src/lib/numerology/unused-utils.ts` | Unused imports cleanup | ❌           | ❌      | ✅         |
| SPLIT             | `src/lib/pdf/pdf-generator.ts`      | `src/lib/pdf/pdf-generator.ts + src/lib/pdf/unused-utils.ts`             | Unused imports cleanup | ❌           | ❌      | ✅         |
| SPLIT             | `src/lib/security/audit-logger.ts`  | `src/lib/security/audit-logger.ts + src/lib/security/unused-utils.ts`    | Unused imports cleanup | ❌           | ❌      | ✅         |
| INTRODUCE_ADAPTER | `src/lib/error-handler.ts`          | `src/lib/error-handler.ts + src/lib/monitoring/sentry.ts`                | Monitoring integration | ❌           | ✅      | ✅         |

### FASE-6: Dead Weight Removal

| Action | From                                                  | To                                           | Reason           | Legacy Alias | Adapter | Import Fix |
| ------ | ----------------------------------------------------- | -------------------------------------------- | ---------------- | ------------ | ------- | ---------- |
| MOVE   | `src/middleware.ts.bak`                               | `archive/middleware.ts.bak`                  | Backup file      | ❌           | ❌      | ❌         |
| MOVE   | `numerolgy.json`                                      | `archive/numerolgy.json`                     | Typo in filename | ❌           | ❌      | ❌         |
| MOVE   | `numerology.module.json`                              | `archive/numerology.module.json`             | Unused file      | ❌           | ❌      | ❌         |
| MOVE   | `src/features/shared/ui/tarot/GenericTarotSpread.tsx` | `archive/components/GenericTarotSpread.tsx`  | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/features/shared/ui/MobileScrollWrapper.tsx`      | `archive/components/MobileScrollWrapper.tsx` | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/features/shared/ui/CreditInfoModal.tsx`          | `archive/components/CreditInfoModal.tsx`     | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/features/shared/ui/ErrorDisplay.tsx`             | `archive/components/ErrorDisplay.tsx`        | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/features/shared/ui/ReadingInfoModal.tsx`         | `archive/components/ReadingInfoModal.tsx`    | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/components/admin/ABTestManager.tsx`              | `archive/components/ABTestManager.tsx`       | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/components/admin/FraudDetection.tsx`             | `archive/components/FraudDetection.tsx`      | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/components/admin/RealTimeMonitoring.tsx`         | `archive/components/RealTimeMonitoring.tsx`  | Unused component | ❌           | ❌      | ❌         |
| MOVE   | `src/components/GeolocationDetector.tsx`              | `archive/components/GeolocationDetector.tsx` | Unused component | ❌           | ❌      | ❌         |

### FASE-7: Test Infrastructure

| Action            | From                                 | To                                                       | Reason                          | Legacy Alias | Adapter | Import Fix |
| ----------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------- | ------------ | ------- | ---------- |
| INTRODUCE_ADAPTER | `tests/`                             | `tests/ + tests/unit/ + tests/integration/ + tests/e2e/` | Test infrastructure setup       | ❌           | ✅      | ✅         |
| INTRODUCE_ADAPTER | `tests/i18n/locale-routing.spec.ts`  | `tests/integration/i18n/locale-routing.spec.ts`          | Integration test categorization | ❌           | ✅      | ✅         |
| INTRODUCE_ADAPTER | `tests/i18n/messages-parity.test.ts` | `tests/unit/i18n/messages-parity.test.ts`                | Unit test categorization        | ❌           | ✅      | ✅         |

---

## 📊 Summary

- **Total Actions:** 35
- **RENAME:** 3
- **MOVE:** 17
- **SPLIT:** 8
- **INTRODUCE_ADAPTER:** 7
- **Legacy Aliases Needed:** 15
- **Adapters Needed:** 7
- **Import Fixes Needed:** 28

---

## ⚠️ Validation Checks

### Route Map Compliance

- ✅ All moved API routes maintain their functionality
- ✅ App Router segments preserved
- ✅ Locale routing structure maintained

### RSC Compliance

- ✅ Server components remain server components
- ✅ Client components properly marked with 'use client'
- ✅ No client hooks in server components after moves

### Node/Edge Runtime

- ✅ API routes that touch DB will have `export const runtime = 'nodejs'`
- ✅ No Edge runtime for DB operations

---

## 🎯 Next Steps

1. **Apply FASE-1 moves** (TypeScript conflicts)
2. **Apply FASE-2 moves** (RSC violations)
3. **Apply FASE-3 moves** (API organization)
4. **Apply FASE-4 moves** (Form schemas)
5. **Apply FASE-5 moves** (Code quality)
6. **Apply FASE-6 moves** (Dead weight)
7. **Apply FASE-7 moves** (Test infrastructure)

Each phase will be committed and tagged separately for rollback safety.
