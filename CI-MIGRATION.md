# 🚀 CI/CD & Migration Pipeline - Tarot Web Application

**Framework:** Next.js 15.4.4  
**Database:** Supabase PostgreSQL  
**Deployment:** Vercel + Cloudflare  
**Date:** January 2025

---

## 📊 **PIPELINE OVERVIEW**

### **🔄 Release Pipeline Stages:**
1. **Preflight Checks** → 2. **Build & Test** → 3. **Migration** → 4. **Deploy** → 5. **Post-Deploy**

### **⏱️ Estimated Duration:**
- **Full Pipeline:** ~8-12 minutes
- **Hotfix Pipeline:** ~4-6 minutes
- **Migration Only:** ~2-3 minutes

---

## 🔍 **PREFlight CHECKS**

### **1. Code Quality Validation**
```bash
# TypeScript compilation check
npm run typecheck

# ESLint validation
npm run lint

# Prettier formatting check
npm run format:check

# Code quality summary
npm run code-quality
```

### **2. Test Suite Execution**
```bash
# Unit tests with coverage
npm run test:ci

# Integration tests
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e

# Security tests
npm run test:security

# Payment system tests
npm run test:payment
```

### **3. Build Validation**
```bash
# Production build test
npm run build

# Bundle analysis (optional)
ANALYZE=true npm run build

# TypeScript strict check
tsc --noEmit --strict
```

### **4. Environment Validation**
```bash
# Check required environment variables
node -e "
const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
  'WEBHOOK_SECRET',
  'SHOPIER_MERCHANT_ID',
  'SHOPIER_API_KEY',
  'SHOPIER_API_SECRET'
];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('❌ Missing environment variables:', missing);
  process.exit(1);
}
console.log('✅ All required environment variables present');
"

# Database connectivity test
node scripts/db-smoke.sql
```

---

## 🧪 **BUILD & TEST STAGE**

### **Automated Test Suite:**
```bash
#!/bin/bash
# build-and-test.sh

set -e

echo "🔨 BUILD & TEST STAGE"

# 1. Install dependencies
npm ci --only=production

# 2. Type checking
echo "📝 TypeScript validation..."
npm run typecheck

# 3. Linting
echo "🔍 ESLint validation..."
npm run lint

# 4. Formatting check
echo "🎨 Prettier validation..."
npm run format:check

# 5. Unit tests
echo "🧪 Running unit tests..."
npm run test:ci

# 6. Integration tests
echo "🔗 Running integration tests..."
npm run test:integration

# 7. Security tests
echo "🔒 Running security tests..."
npm run test:security

# 8. Payment tests
echo "💳 Running payment tests..."
npm run test:payment

# 9. Build test
echo "🏗️ Production build test..."
npm run build

echo "✅ BUILD & TEST STAGE COMPLETED"
```

### **Coverage Requirements:**
- **Lines:** ≥70%
- **Functions:** ≥70%
- **Branches:** ≥70%
- **Statements:** ≥70%

---

## 🗄️ **DATABASE MIGRATION STAGE**

### **Migration Strategy:**
```bash
#!/bin/bash
# migrate.sh

set -e

echo "🗄️ DATABASE MIGRATION STAGE"

# 1. Backup current database
echo "💾 Creating database backup..."
supabase db dump --data-only > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Check migration status
echo "📊 Checking migration status..."
supabase migration list

# 3. Run pending migrations
echo "🔄 Running pending migrations..."
supabase migration up

# 4. Validate migration
echo "✅ Validating migration..."
supabase db diff --schema public

# 5. Update seed data (if needed)
echo "🌱 Updating seed data..."
supabase db reset --linked

echo "✅ DATABASE MIGRATION COMPLETED"
```

### **Migration Files Structure:**
```
migrations/
├── 20241201_01_types.sql          # Types & Enums
├── 20241201_02_tables.sql         # Tables & Relations
├── 20241201_03_constraints.sql    # Constraints & FKs
├── 20241201_04_indexes.sql        # Indexes & Performance
├── 20241201_05_rls.sql           # Row Level Security
├── 20241201_06_functions.sql     # Functions & Triggers
├── 20250911_01-types.sql         # Updated Types
├── 20250911_02-tables.sql        # Updated Tables
├── 20250911_03-constraints.sql   # Updated Constraints
├── 20250911_04-indexes.sql       # Updated Indexes
├── 20250911_05-rls.sql          # Updated RLS Policies
├── 20250911_06-seed.sql         # Seed Data
├── 20250930_01-add-marriage-enum.sql    # Marriage enum
└── 20250930_02-system-performance.sql  # Performance tables
```

### **Migration Safety Checks:**
```sql
-- Pre-migration validation
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND rowsecurity = false;

-- Check for missing indexes
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Validate RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

---

## 🚀 **DEPLOYMENT STAGE**

### **Vercel Deployment:**
```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 DEPLOYMENT STAGE"

# 1. Environment validation
echo "🔍 Validating environment..."
if [ "$NODE_ENV" != "production" ]; then
  echo "❌ NODE_ENV must be 'production'"
  exit 1
fi

# 2. Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod --confirm

# 3. Verify deployment
echo "✅ Verifying deployment..."
DEPLOY_URL=$(vercel ls | head -n 2 | tail -n 1 | awk '{print $2}')
curl -f "$DEPLOY_URL" || exit 1

# 4. Run smoke tests
echo "🧪 Running smoke tests..."
npm run test:smoke

echo "✅ DEPLOYMENT COMPLETED"
```

### **Cloudflare Configuration:**
```bash
# Update Cloudflare DNS if needed
cloudflare-cli dns update --zone busbuskimki.com --record www --type CNAME --content cname.vercel-dns.com

# Purge cache
cloudflare-cli purge-cache --zone busbuskimki.com --purge-everything
```

---

## 🔄 **ROLLBACK PROCEDURES**

### **Application Rollback:**
```bash
#!/bin/bash
# rollback.sh

set -e

echo "🔄 ROLLBACK PROCEDURE"

# 1. Get previous deployment
echo "📋 Getting previous deployment..."
PREVIOUS_DEPLOYMENT=$(vercel ls | head -n 3 | tail -n 1 | awk '{print $1}')

# 2. Rollback to previous version
echo "⏪ Rolling back to $PREVIOUS_DEPLOYMENT..."
vercel rollback $PREVIOUS_DEPLOYMENT --prod --confirm

# 3. Verify rollback
echo "✅ Verifying rollback..."
curl -f https://busbuskimki.com || exit 1

echo "✅ ROLLBACK COMPLETED"
```

### **Database Rollback:**
```bash
#!/bin/bash
# rollback-db.sh

set -e

echo "🗄️ DATABASE ROLLBACK"

# 1. List recent migrations
echo "📋 Recent migrations:"
supabase migration list --limit 5

# 2. Rollback last migration
echo "⏪ Rolling back last migration..."
supabase migration down

# 3. Verify rollback
echo "✅ Verifying database rollback..."
supabase db diff --schema public

echo "✅ DATABASE ROLLBACK COMPLETED"
```

---

## 🧪 **POST-DEPLOYMENT VALIDATION**

### **Health Checks:**
```bash
#!/bin/bash
# post-deploy-validation.sh

set -e

echo "🔍 POST-DEPLOYMENT VALIDATION"

# 1. Application health
echo "🏥 Application health check..."
curl -f https://busbuskimki.com/health || exit 1

# 2. Database connectivity
echo "🗄️ Database connectivity check..."
curl -f https://busbuskimki.com/api/health/db || exit 1

# 3. Payment system
echo "💳 Payment system check..."
curl -f https://busbuskimki.com/api/health/payment || exit 1

# 4. Email system
echo "📧 Email system check..."
curl -f https://busbuskimki.com/api/health/email || exit 1

# 5. Performance check
echo "⚡ Performance check..."
curl -w "@curl-format.txt" -s -o /dev/null https://busbuskimki.com

# 6. SEO validation
echo "🔍 SEO validation..."
curl -s https://busbuskimki.com | grep -q "Busbuskimki" || exit 1

echo "✅ POST-DEPLOYMENT VALIDATION COMPLETED"
```

### **curl-format.txt:**
```
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
```

---

## 🎯 **PIPELINE CONFIGURATIONS**

### **GitHub Actions Workflow:**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  preflight:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check

  test:
    needs: preflight
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Unit tests
        run: npm run test:ci
      
      - name: Integration tests
        run: npm run test:integration
      
      - name: E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: 0

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### **Environment Variables:**
```bash
# Required for CI/CD
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://busbuskimki.com
WEBHOOK_SECRET=your-webhook-secret
SHOPIER_MERCHANT_ID=your-merchant-id
SHOPIER_API_KEY=your-api-key
SHOPIER_API_SECRET=your-api-secret
SHOPIER_TEST_MODE=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# CI/CD Secrets
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
SUPABASE_ACCESS_TOKEN=your-supabase-token
```

---

## 🚨 **EMERGENCY PROCEDURES**

### **Critical Issues Response:**
```bash
#!/bin/bash
# emergency-response.sh

echo "🚨 EMERGENCY RESPONSE PROCEDURE"

# 1. Immediate rollback
echo "⏪ Immediate rollback..."
./rollback.sh

# 2. Notify team
echo "📢 Notifying team..."
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🚨 CRITICAL ISSUE: Application rolled back automatically"}' \
  $SLACK_WEBHOOK_URL

# 3. Create incident report
echo "📝 Creating incident report..."
cat > incident_$(date +%Y%m%d_%H%M%S).md << EOF
# Incident Report - $(date)

## Issue
- Time: $(date)
- Status: Rolled back
- Impact: High

## Actions Taken
1. Immediate rollback executed
2. Team notified
3. Investigation initiated

## Next Steps
1. Root cause analysis
2. Fix implementation
3. Re-deployment
EOF

echo "✅ EMERGENCY RESPONSE COMPLETED"
```

---

## 📊 **MONITORING & ALERTS**

### **Key Metrics:**
- **Uptime:** ≥99.9%
- **Response Time:** ≤2s
- **Error Rate:** ≤0.1%
- **Build Success Rate:** ≥95%

### **Alert Conditions:**
- Build failure
- Test failure rate >5%
- Migration failure
- Deployment timeout >10min
- Post-deploy health check failure

---

## 🎯 **PIPELINE SUMMARY**

### **✅ Strengths:**
- **Comprehensive testing** (Unit, Integration, E2E, Security)
- **Automated migrations** with rollback capability
- **Multi-stage validation** (Preflight, Build, Deploy, Post-deploy)
- **Environment isolation** (Dev, Staging, Production)
- **Emergency procedures** for critical issues

### **🔧 Available Scripts:**
- **52 npm scripts** for all development tasks
- **Jest configuration** with 70% coverage threshold
- **TypeScript strict mode** enabled
- **ESLint + Prettier** code quality
- **Playwright E2E** testing
- **Custom test suites** for payment, security, i18n

### **🗄️ Database Management:**
- **14 migration files** with proper versioning
- **RLS policies** for security
- **Performance indexes** optimized
- **Seed data** management
- **Rollback procedures** documented

---

**🚀 Bu pipeline, production-ready deployment için tüm gerekli adımları içerir. Emergency procedures ve rollback capabilities ile güvenli deployment sağlar.**
