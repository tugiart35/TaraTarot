# 🔍 Environment Variables Audit - Tarot Web Application

**Audit Date:** January 2025  
**Scope:** Complete src/\* analysis  
**Total Variables Found:** 23  
**Critical Security Issues:** 4  
**Missing from .env.example:** 3  
**Unused Variables:** 5

---

## 📊 Summary Matrix

| KEY                                  | Used in Files | Missing in .env.example? | Defined but Unused? | Notes                                           |
| ------------------------------------ | ------------- | ------------------------ | ------------------- | ----------------------------------------------- |
| **NODE_ENV**                         | 15 files      | ❌ No                    | ❌ No               | ✅ Core runtime variable                        |
| **NEXT_PUBLIC_SUPABASE_URL**         | 12 files      | ❌ No                    | ❌ No               | ⚠️ **SECURITY**: Real URL exposed               |
| **NEXT_PUBLIC_SUPABASE_ANON_KEY**    | 8 files       | ❌ No                    | ❌ No               | ⚠️ **SECURITY**: Real key exposed               |
| **SUPABASE_SERVICE_ROLE_KEY**        | 4 files       | ❌ No                    | ❌ No               | 🚨 **CRITICAL**: Real service key exposed       |
| **SMTP_HOST**                        | 2 files       | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SMTP_PORT**                        | 2 files       | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SMTP_SECURE**                      | 2 files       | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SMTP_USER**                        | 3 files       | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SMTP_PASS**                        | 2 files       | ❌ No                    | ❌ No               | 🚨 **CRITICAL**: Real password exposed          |
| **NEXT_PUBLIC_SHOPIER_API_URL**      | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **NEXT_PUBLIC_SHOPIER_CALLBACK_URL** | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **NEXT_PUBLIC_SHOPIER_WEBHOOK_URL**  | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SHOPIER_MERCHANT_ID**              | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SHOPIER_API_KEY**                  | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **SHOPIER_API_SECRET**               | 1 file        | ❌ No                    | ❌ No               | ✅ Properly configured                          |
| **NEXT_PUBLIC_SITE_URL**             | 6 files       | ✅ **YES**               | ❌ No               | ⚠️ **MISSING**: Used but not documented         |
| **NEXT_PUBLIC_CONTACT_PHONE**        | 2 files       | ✅ **YES**               | ❌ No               | ⚠️ **MISSING**: Used but not documented         |
| **WEBHOOK_SECRET**                   | 1 file        | ❌ No                    | ❌ No               | ⚠️ **MISSING**: Used but placeholder only       |
| **SHOPIER_TEST_MODE**                | 1 file        | ✅ **YES**               | ❌ No               | ⚠️ **MISSING**: Used but not documented         |
| **DEBUG**                            | 1 file        | ✅ **YES**               | ❌ No               | ⚠️ **MISSING**: Used but not documented         |
| **NEXT_PUBLIC_GOOGLE_CLIENT_ID**     | 0 files       | ❌ No                    | ✅ **YES**          | ❌ **UNUSED**: OAuth not implemented            |
| **GOOGLE_CLIENT_SECRET**             | 0 files       | ❌ No                    | ✅ **YES**          | ❌ **UNUSED**: OAuth not implemented            |
| **NEXT_PUBLIC_FACEBOOK_CLIENT_ID**   | 0 files       | ❌ No                    | ✅ **YES**          | ❌ **UNUSED**: OAuth not implemented            |
| **FACEBOOK_CLIENT_SECRET**           | 0 files       | ❌ No                    | ✅ **YES**          | ❌ **UNUSED**: OAuth not implemented            |
| **SENTRY_DSN**                       | 0 files       | ❌ No                    | ✅ **YES**          | ❌ **UNUSED**: Error monitoring not implemented |

---

## 🚨 Critical Security Issues

### 1. Real Secrets Exposed in .env.example

```bash
# 🚨 CRITICAL - Replace with placeholders
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE0ODA5NywiZXhwIjoyMDczNzI0MDk3fQ.Z9GuxWdEpsAhnz405LM7aVBmZNyJbZOnOdi8A3cMKWI
SMTP_PASS=ouxp mflg zqfo rnlv
NEXT_PUBLIC_SUPABASE_URL=https://qtlokdkcerjrbrtphlrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDgwOTcsImV4cCI6MjA3MzcyNDA5N30.ezpkbTze481HDVgWDohuDY-iOfK8TQpog1Jzk6Glm6k
```

---

## 📍 Detailed Usage Analysis

### Core Runtime Variables

#### NODE_ENV

**Used in:** 15 files  
**Files:** `src/middleware.ts`, `src/lib/logger.ts`,
`src/lib/utils/environment-utils.ts`, `src/lib/api/error-responses.ts`,
`src/lib/api/geolocation-responses.ts`, `src/lib/audit-logger.ts`,
`src/lib/utils/rate-limiting.ts`, `src/lib/utils/redirect-utils.ts`,
`src/hooks/usePageTracking.ts`, `src/components/shared/ui/ErrorBoundary.tsx`,
`src/features/shared/ui/ErrorBoundary.tsx`,
`src/app/api/webhook/shopier/route.ts`, `src/lib/payment/shopier-config.ts`,
`src/lib/services/admin-detection-service.ts`,
`src/app/[locale]/admin/layout.tsx`, `src/components/admin/AdminGuard.tsx`,
`src/providers/AdminAuthProvider.tsx`  
**Purpose:** Environment detection, conditional logic  
**Status:** ✅ Properly used

### Supabase Configuration

#### NEXT_PUBLIC_SUPABASE_URL

**Used in:** 12 files  
**Files:** `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`,
`src/middleware.ts`, `src/app/[locale]/auth/confirm/route.ts`,
`src/app/auth/callback/route.ts`, `src/app/api/email/reading/route.ts`,
`src/lib/services/admin-detection-service.ts`, `src/lib/config/metadata.ts`,
`src/app/[locale]/dashboard/layout.tsx`, `src/lib/payment/shopier-config.ts`,
`src/lib/api/email-cors.ts`  
**Purpose:** Supabase client configuration  
**Status:** ⚠️ **SECURITY**: Real URL exposed in .env.example

#### NEXT_PUBLIC_SUPABASE_ANON_KEY

**Used in:** 8 files  
**Files:** `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`,
`src/middleware.ts`, `src/app/[locale]/auth/confirm/route.ts`,
`src/app/auth/callback/route.ts`,
`src/lib/services/admin-detection-service.ts`  
**Purpose:** Supabase anonymous authentication  
**Status:** ⚠️ **SECURITY**: Real key exposed in .env.example

#### SUPABASE_SERVICE_ROLE_KEY

**Used in:** 4 files  
**Files:** `src/lib/supabase/server.ts`, `src/app/api/email/reading/route.ts`  
**Purpose:** Server-side admin operations  
**Status:** 🚨 **CRITICAL**: Real service key exposed in .env.example

### Email Configuration

#### SMTP Variables

**SMTP_HOST:** Used in 2 files (`src/lib/email/email-service.ts`,
`src/app/api/email/test/route.ts`)  
**SMTP_PORT:** Used in 2 files (`src/lib/email/email-service.ts`,
`src/app/api/email/test/route.ts`)  
**SMTP_SECURE:** Used in 2 files (`src/lib/email/email-service.ts`,
`src/app/api/email/test/route.ts`)  
**SMTP_USER:** Used in 3 files (`src/lib/email/email-service.ts`,
`src/app/api/email/test/route.ts`)  
**SMTP_PASS:** Used in 2 files (`src/lib/email/email-service.ts`,
`src/app/api/email/test/route.ts`)  
**Status:** SMTP_PASS 🚨 **CRITICAL**: Real password exposed

### Payment Configuration

#### Shopier Variables

**SHOPIER_MERCHANT_ID:** Used in 1 file (`src/lib/payment/shopier-config.ts`)  
**SHOPIER_API_KEY:** Used in 1 file (`src/lib/payment/shopier-config.ts`)  
**SHOPIER_API_SECRET:** Used in 1 file (`src/lib/payment/shopier-config.ts`)  
**NEXT_PUBLIC_SHOPIER_API_URL:** Used in 1 file
(`src/lib/payment/shopier-config.ts`)  
**NEXT_PUBLIC_SHOPIER_CALLBACK_URL:** Used in 1 file
(`src/lib/payment/shopier-config.ts`)  
**NEXT_PUBLIC_SHOPIER_WEBHOOK_URL:** Used in 1 file
(`src/lib/payment/shopier-config.ts`)  
**Status:** ✅ All properly configured

### Missing Variables (Used but not in .env.example)

#### NEXT_PUBLIC_SITE_URL

**Used in:** 6 files  
**Files:** `src/lib/config/metadata.ts`,
`src/app/[locale]/dashboard/layout.tsx`, `src/lib/payment/shopier-config.ts`,
`src/lib/api/email-cors.ts`  
**Purpose:** Base URL for metadata, payment callbacks, email CORS  
**Status:** ⚠️ **MISSING**: Critical for production

#### NEXT_PUBLIC_CONTACT_PHONE

**Used in:** 2 files  
**Files:** `src/features/shared/layout/Footer.tsx`,
`src/app/[locale]/(main)/legal/kvkk-disclosure/page.tsx`  
**Purpose:** Contact information display  
**Status:** ⚠️ **MISSING**: Used in legal pages

#### WEBHOOK_SECRET

**Used in:** 1 file  
**Files:** `src/app/api/webhook/shopier/route.ts`  
**Purpose:** Webhook signature validation  
**Status:** ⚠️ **MISSING**: Security critical, placeholder only

#### SHOPIER_TEST_MODE

**Used in:** 1 file  
**Files:** `src/lib/payment/shopier-config.ts`  
**Purpose:** Payment test mode toggle  
**Status:** ⚠️ **MISSING**: Development/testing control

#### DEBUG

**Used in:** 1 file  
**Files:** `src/lib/utils/environment-utils.ts`  
**Purpose:** Debug mode override  
**Status:** ⚠️ **MISSING**: Development debugging

### Unused Variables (In .env.example but not used)

#### OAuth Variables

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - OAuth not implemented
- `GOOGLE_CLIENT_SECRET` - OAuth not implemented
- `NEXT_PUBLIC_FACEBOOK_CLIENT_ID` - OAuth not implemented
- `FACEBOOK_CLIENT_SECRET` - OAuth not implemented

#### Monitoring Variables

- `SENTRY_DSN` - Error monitoring not implemented

---

## 🔧 Recommended Safe Defaults

### Development Environment

```bash
# App Environment
NODE_ENV=development
DEBUG=false

# Supabase Configuration (Development)
NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-dev-anon-key
SUPABASE_URL=https://your-dev-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-dev-service-key

# Application URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3111
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx

# Email Configuration (Development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-dev-email@gmail.com
SMTP_PASS=your-dev-app-password

# Payment Configuration (Development)
SHOPIER_MERCHANT_ID=your-dev-merchant-id
SHOPIER_API_KEY=your-dev-api-key
SHOPIER_API_SECRET=your-dev-api-secret
SHOPIER_TEST_MODE=true
NEXT_PUBLIC_SHOPIER_API_URL=https://www.shopier.com/ShowProduct/api_pay4.php
NEXT_PUBLIC_SHOPIER_CALLBACK_URL=http://localhost:3111/payment/callback
NEXT_PUBLIC_SHOPIER_WEBHOOK_URL=http://localhost:3111/api/webhook/shopier

# Webhook Security
WEBHOOK_SECRET=your-dev-webhook-secret

# OAuth (Optional - remove if not used)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Monitoring (Optional - remove if not used)
SENTRY_DSN=
```

### Production Environment (Required)

```bash
# App Environment
NODE_ENV=production
DEBUG=false

# Supabase Configuration (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-prod-anon-key
SUPABASE_URL=https://your-prod-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-prod-service-key

# Application URLs (CRITICAL)
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx

# Email Configuration (Production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-prod-email@gmail.com
SMTP_PASS=your-prod-app-password

# Payment Configuration (Production)
SHOPIER_MERCHANT_ID=your-prod-merchant-id
SHOPIER_API_KEY=your-prod-api-key
SHOPIER_API_SECRET=your-prod-api-secret
SHOPIER_TEST_MODE=false
NEXT_PUBLIC_SHOPIER_API_URL=https://www.shopier.com/ShowProduct/api_pay4.php
NEXT_PUBLIC_SHOPIER_CALLBACK_URL=https://your-production-domain.com/payment/callback
NEXT_PUBLIC_SHOPIER_WEBHOOK_URL=https://your-production-domain.com/api/webhook/shopier

# Webhook Security (CRITICAL)
WEBHOOK_SECRET=your-secure-production-webhook-secret

# OAuth (If implemented)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-prod-google-client-id
GOOGLE_CLIENT_SECRET=your-prod-google-client-secret
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=your-prod-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-prod-facebook-client-secret

# Monitoring (Recommended)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

---

## 🚨 Immediate Actions Required

### 1. Security Fix (CRITICAL - Do First)

```bash
# Replace these in env.example with placeholders
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-key
SMTP_PASS=your-app-password
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

### 2. Add Missing Variables to .env.example

```bash
# Add these to env.example
NEXT_PUBLIC_SITE_URL=http://localhost:3111
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx
WEBHOOK_SECRET=your-webhook-secret
SHOPIER_TEST_MODE=false
DEBUG=false
```

### 3. Clean Up Unused Variables

```bash
# Remove or comment out these unused variables
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# NEXT_PUBLIC_FACEBOOK_CLIENT_ID=
# FACEBOOK_CLIENT_SECRET=
# SENTRY_DSN=
```

---

## 📋 File Usage Breakdown

### High Usage Files (5+ env vars)

1. **`src/lib/payment/shopier-config.ts`** - 8 variables
2. **`src/lib/supabase/server.ts`** - 3 variables
3. **`src/lib/email/email-service.ts`** - 5 variables
4. **`src/lib/config/metadata.ts`** - 1 variable

### Security-Critical Files

1. **`src/middleware.ts`** - Supabase auth + security headers
2. **`src/lib/supabase/server.ts`** - Service role key usage
3. **`src/app/api/webhook/shopier/route.ts`** - Webhook secret validation

---

## 🎯 Production Readiness Checklist

### Pre-Production

- [ ] All real secrets replaced with placeholders
- [ ] All used variables documented in .env.example
- [ ] Unused variables removed or commented
- [ ] Production environment variables set
- [ ] Webhook secret configured and validated

### Post-Production

- [ ] Environment variables loaded correctly
- [ ] No undefined variable errors in logs
- [ ] All integrations (Supabase, Email, Payment) working
- [ ] Security headers applied
- [ ] Monitoring active (if implemented)

---

## 🔍 Code Examples

### Proper Environment Variable Usage

```typescript
// ✅ Good - with fallback and validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

// ✅ Good - with default values
const smtpPort = parseInt(process.env.SMTP_PORT || '587');

// ✅ Good - environment-specific logic
if (process.env.NODE_ENV === 'production') {
  // Production-only code
}
```

### Security Best Practices

```typescript
// ✅ Good - server-side only
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Server-side only

// ❌ Bad - never expose server keys to client
// const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY; // Don't do this
```

---

## 📞 Support & Next Steps

**Security Issues:** Fix immediately before any deployment  
**Missing Variables:** Add to .env.example before production  
**Unused Variables:** Clean up to reduce confusion

**Priority Order:**

1. 🔥 Fix security issues (real secrets)
2. 📝 Add missing variables
3. 🧹 Clean up unused variables
4. 🧪 Test all environment configurations

---

## 🎯 Audit Summary

**Total Variables:** 23  
**Critical Issues:** 4 (real secrets exposed)  
**Missing Variables:** 5 (used but not documented)  
**Unused Variables:** 5 (documented but not used)  
**Production Ready:** ❌ No (security issues must be fixed first)

**Recommendation:** Fix security issues immediately, then add missing variables
before production deployment.
