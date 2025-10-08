# 🌍 ENVIRONMENT CONFIGURATION RAPORU

**Oluşturulma Tarihi:** 7 Ekim 2025  
**Audit Seviyesi:** HIGH  
**Deployment Durumu:** ⚠️ Eksik environment variables var

---

## 📊 ÖZET

- **env.example:** 13 değişken tanımlı
- **Kodda kullanılan:** ~20+ değişken
- **Eksik döküman:** 7+ değişken
- **Validation:** ❌ YOK

---

## ❌ EKSİK ENVIRONMENT VARIABLES

### 1. AI Service Keys (CRITICAL)

```bash
# env.example'da YOK, kodda kullanılıyor:

GROQ_API_KEY=                    # ❌ Tarot yorumları için kritik
# Kullanım: src/lib/admin/api-keys.ts
# İşlev: AI tarot okuma yorumları

GOOGLE_API_KEY=                  # ❌ Gemini için gerekli
GEMINI_API_KEY=                  # ❌ Gemini AI için
# Kullanım: API key manager
# İşlev: Alternative AI provider
```

**Etki:**

- AI yorumları çalışmaz
- Kullanıcılar tarot okumalarından yararlanamaz
- Production'da runtime error

**Çözüm:**

```bash
# env.example'a ekle:
# AI Configuration
GROQ_API_KEY=your-groq-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

---

### 2. Database Connection (Tekrar)

```bash
# env.example'da var ama ek bilgi gerekli:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # ⚠️ Dikkatli kullanılmalı
```

**Eksik Bilgiler:**

- Hangi environment için? (dev, staging, prod)
- Service role ne zaman kullanılmalı?
- RLS policy'leri nasıl?

**Önerilen Güncelleme:**

```bash
# Supabase Configuration
# DEV: https://dev-project.supabase.co
# PROD: https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... # Public, client-side safe

# ⚠️ SERVER ONLY - RLS bypass'ı, dikkatli kullan
# Sadece admin operations ve server-side işlemler için
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

### 3. Application URLs

```bash
# env.example'da var:
NEXT_PUBLIC_SITE_URL=http://localhost:3111

# Eksikler:
NEXT_PUBLIC_API_URL=              # ❌ API base URL
NEXT_PUBLIC_CDN_URL=              # ❌ CDN için
NEXT_PUBLIC_WEBSOCKET_URL=        # ❌ Realtime için (varsa)
```

**Önerilen:**

```bash
# Application URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3111        # Main site
NEXT_PUBLIC_API_URL=http://localhost:3111/api    # API base
NEXT_PUBLIC_CDN_URL=https://cdn.yoursite.com     # Static assets
```

---

### 4. Payment Configuration (Shopier)

```bash
# env.example'da var ama incomplete:

SHOPIER_MERCHANT_ID=your-merchant-id
SHOPIER_API_KEY=your-api-key
SHOPIER_API_SECRET=your-api-secret
SHOPIER_TEST_MODE=true

# Eksikler:
SHOPIER_WEBHOOK_SECRET=           # ❌ Webhook doğrulama için
SHOPIER_CALLBACK_SECRET=          # ❌ Callback doğrulama için
SHOPIER_CURRENCY=TRY              # ❌ Para birimi
SHOPIER_TIMEOUT=30000             # ❌ Request timeout
```

**Önerilen:**

```bash
# Shopier Payment Configuration
SHOPIER_MERCHANT_ID=your-merchant-id
SHOPIER_API_KEY=your-api-key
SHOPIER_API_SECRET=your-api-secret
SHOPIER_WEBHOOK_SECRET=your-webhook-secret
SHOPIER_CALLBACK_SECRET=your-callback-secret
SHOPIER_TEST_MODE=true
SHOPIER_CURRENCY=TRY
SHOPIER_TIMEOUT=30000
NEXT_PUBLIC_SHOPIER_API_URL=https://www.shopier.com/ShowProduct/api_pay4.php
NEXT_PUBLIC_SHOPIER_CALLBACK_URL=http://localhost:3111/payment/callback
NEXT_PUBLIC_SHOPIER_WEBHOOK_URL=http://localhost:3111/api/webhook/shopier
```

---

### 5. Email Configuration

```bash
# env.example'da var:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Eksikler:
SMTP_FROM_NAME=                   # ❌ Gönderici adı
SMTP_FROM_EMAIL=                  # ❌ Gönderici email
SMTP_REPLY_TO=                    # ❌ Yanıt adresi
SMTP_MAX_RETRIES=3                # ❌ Retry logic
SMTP_TIMEOUT=10000                # ❌ Timeout
```

**Önerilen:**

```bash
# Email Configuration (for PDF notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME="Tara Tarot"
SMTP_FROM_EMAIL=noreply@yoursite.com
SMTP_REPLY_TO=support@yoursite.com
SMTP_MAX_RETRIES=3
SMTP_TIMEOUT=10000
```

---

### 6. Security & Secrets

```bash
# env.example'da var:
WEBHOOK_SECRET=your-webhook-secret

# Eksikler:
JWT_SECRET=                       # ❌ JWT signing (varsa)
ENCRYPTION_KEY=                   # ❌ Data encryption
SESSION_SECRET=                   # ❌ Session management
API_RATE_LIMIT_SECRET=           # ❌ Rate limiting token
```

**Önerilen:**

```bash
# Security & Secrets
WEBHOOK_SECRET=your-webhook-secret
ENCRYPTION_KEY=your-32-char-encryption-key
SESSION_SECRET=your-session-secret
API_RATE_LIMIT_SECRET=your-rate-limit-secret

# Generate with:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 7. Monitoring & Analytics

```bash
# env.example'da comment:
# SENTRY_DSN=

# Eksikler (kullanılıyorsa):
NEXT_PUBLIC_GA_ID=                # Google Analytics
NEXT_PUBLIC_GTM_ID=               # Google Tag Manager
VERCEL_ANALYTICS_ID=              # Vercel Analytics
SENTRY_DSN=                       # Error tracking
SENTRY_ORG=                       # Sentry organization
SENTRY_PROJECT=                   # Sentry project
LOG_LEVEL=info                    # Logging level
```

**Önerilen:**

```bash
# Analytics & Monitoring (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics
SENTRY_DSN=https://xxx@sentry.io/xxx     # Error tracking
LOG_LEVEL=info                            # info | debug | error
```

---

## ✅ MEVCUT ENVIRONMENT VARIABLES

### İyi Tanımlanmış

```bash
✅ NODE_ENV=development
✅ NEXT_PUBLIC_SUPABASE_URL=...
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY=...
✅ SUPABASE_SERVICE_ROLE_KEY=...
✅ NEXT_PUBLIC_SITE_URL=...
✅ NEXT_PUBLIC_CONTACT_PHONE=...
✅ WEBHOOK_SECRET=...
✅ SHOPIER_* (temel yapılandırma)
✅ SMTP_* (temel yapılandırma)
✅ DEBUG=false
```

---

## 🔴 VALIDATION EKSİKLİĞİ

### Mevcut Durum

```typescript
// src/lib/supabase/client.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ❌ Validation yok
// ❌ Type safety yok
// ❌ Runtime error riski var
```

### Önerilen Çözüm

```typescript
// src/lib/env-validator.ts - YENİ DOSYA
import { z } from 'zod';

const envSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),

  // App
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_CONTACT_PHONE: z.string(),

  // AI
  GROQ_API_KEY: z.string().min(20).optional(),
  GEMINI_API_KEY: z.string().min(20).optional(),

  // Payment
  SHOPIER_MERCHANT_ID: z.string().optional(),
  SHOPIER_API_KEY: z.string().optional(),
  SHOPIER_API_SECRET: z.string().optional(),
  SHOPIER_TEST_MODE: z.string().transform(val => val === 'true'),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),

  // Security
  WEBHOOK_SECRET: z.string().min(32).optional(),

  // Debug
  DEBUG: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    console.error(error);
    process.exit(1);
  }
}

// Auto-validate on import
export const env = validateEnv();
```

### Kullanım

```typescript
// src/lib/supabase/client.ts
import { env } from '@/lib/env-validator';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Type-safe
// ✅ Validated
// ✅ Runtime safe
```

---

## 📋 DEPLOYMENT CHECKLIST

### Environment-specific Configs

#### Development (.env.local)

```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3111
SHOPIER_TEST_MODE=true
DEBUG=true
LOG_LEVEL=debug
```

#### Staging (.env.staging)

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
SHOPIER_TEST_MODE=true
DEBUG=false
LOG_LEVEL=info
```

#### Production (.env.production)

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yoursite.com
SHOPIER_TEST_MODE=false
DEBUG=false
LOG_LEVEL=error
```

---

## 🔧 ÖNER NİLEN YAPILAN MAR

### 1. env.example Güncellemesi

```bash
# deploy-audit/patches/001-update-env-example.patch oluştur
```

### 2. Environment Validator

```bash
# src/lib/env-validator.ts oluştur
# Tüm gerekli değişkenleri validate et
```

### 3. Type Definitions

```typescript
// src/types/env.d.ts - YENİ DOSYA
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      NEXT_PUBLIC_SITE_URL: string;
      GROQ_API_KEY?: string;
      GEMINI_API_KEY?: string;
      // ... diğerleri
    }
  }
}

export {};
```

### 4. Startup Validation

```typescript
// src/app/layout.tsx veya next.config.js
import { validateEnv } from '@/lib/env-validator';

// Uygulama başlarken validate et
validateEnv();
```

---

## ⚠️ GÜVENLİK UYARILARI

### 1. Never Commit .env Files

```bash
# .gitignore'da olmalı:
.env
.env.local
.env.*.local
.env.development
.env.production
```

### 2. Use Secrets Manager (Production)

```bash
# Vercel
vercel env add GROQ_API_KEY production

# AWS
aws secretsmanager create-secret --name GROQ_API_KEY

# Doppler, Vault, etc.
```

### 3. Rotate Keys Regularly

```bash
# Her 90 günde bir:
- GROQ_API_KEY
- GEMINI_API_KEY
- SHOPIER_API_SECRET
- WEBHOOK_SECRET
- ENCRYPTION_KEY
```

---

## 📊 EKSIK VARIABLE ETKİSİ

| Variable               | Eksiklik Etkisi        | Çözüm Süresi |
| ---------------------- | ---------------------- | ------------ |
| GROQ_API_KEY           | AI yorumları çalışmaz  | 5dk          |
| GEMINI_API_KEY         | Alternative AI yok     | 5dk          |
| SMTP_FROM_NAME         | Email'ler "unknown"    | 2dk          |
| SHOPIER_WEBHOOK_SECRET | Webhook security zayıf | 5dk          |
| ENCRYPTION_KEY         | Data encryption yok    | 10dk         |

---

## ⏭️ SONRAKI ADIMLAR

1. **Hemen:** env.example'ı güncelle
2. **Kısa Vadeli:** Environment validator ekle
3. **Orta Vadeli:** Secrets manager'a geç
4. **Uzun Vadeli:** Key rotation policy oluştur

---

**⚠️ UYARI:** Eksik env variables production'da runtime error'lara sebep olur!
