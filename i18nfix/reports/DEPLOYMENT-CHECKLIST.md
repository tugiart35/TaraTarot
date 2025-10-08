# 🚀 DashboardContainer.tsx - Deployment Checklist

**Tarih:** 2025-10-08  
**Component:** `src/components/dashboard/DashboardContainer.tsx`  
**Status:** ⚠️ CONDITIONAL PASS (85.25%)

---

## ✅ Pre-Deployment Checklist

### 🔴 P0 - BLOCKER (Must Fix Before Deploy)

- [ ] **SMTP Logging Removal**
  ```bash
  git apply i18nfix/patches/remove-smtp-logging.patch
  npm run build | grep -i "smtp"  # Should be empty
  ```
  **Status:** 🔴 CRITICAL  
  **Impact:** Security - Credentials exposed in build logs  
  **ETA:** 5 minutes

- [ ] **xlsx Vulnerability Fix**
  ```bash
  # Option 1: Update (if compatible)
  npm update xlsx
  
  # Option 2: Replace with exceljs
  npm uninstall xlsx
  npm install exceljs
  # Update import statements in admin components
  ```
  **Status:** 🔴 HIGH  
  **Impact:** Security - Prototype Pollution (CVSS 7.8)  
  **ETA:** 30 minutes

- [ ] **i18n Hardcoded Strings**
  ```bash
  # Apply patch
  git apply i18nfix/patches/dashboardcontainer-i18n.patch
  
  # Add missing keys to translation files
  # Method 1: Manual (recommended)
  # - Edit messages/tr.json, en.json, sr.json
  # - Add keys from add-missing-i18n-keys.json
  
  # Method 2: Automated (if script exists)
  npm run i18n:add-simple -- --file=i18nfix/patches/add-missing-i18n-keys.json
  ```
  **Status:** 🔴 MEDIUM  
  **Impact:** i18n completeness - 6 strings not translated  
  **ETA:** 15 minutes

---

### 🟡 P1 - HIGH (Fix Within 1 Week Post-Deploy)

- [ ] **nodemailer Update**
  ```bash
  npm update nodemailer
  npm audit fix
  ```
  **Status:** 🟡 MODERATE  
  **Impact:** Security - Email domain interpretation  
  **ETA:** 5 minutes

- [ ] **Console Errors Removal**
  ```bash
  git apply i18nfix/patches/remove-console-errors.patch
  ```
  **Status:** 🟡 LOW  
  **Impact:** Code quality - 2 console.error statements  
  **ETA:** 5 minutes

- [ ] **Error Tracking Setup**
  ```bash
  # Install Sentry
  npm install @sentry/nextjs
  
  # Initialize
  npx @sentry/wizard@latest -i nextjs
  
  # Configure environment
  echo "NEXT_PUBLIC_SENTRY_DSN=your-dsn" >> .env
  ```
  **Status:** 🟡 HIGH  
  **Impact:** Observability - No error tracking in production  
  **ETA:** 1 hour

---

### 🟢 P2 - MEDIUM (Fix Within 1 Month)

- [ ] **Test TypeScript Errors**
  - Fix BottomNavigation.test.tsx
  - Fix useAuth.test.ts gender type
  - Fix auth-validation.test.ts undefined checks
  
  **Status:** 🟢 LOW  
  **Impact:** CI/CD - Tests not passing (non-blocking)  
  **ETA:** 2 hours

- [ ] **Performance Monitoring**
  ```bash
  # Already installed: @vercel/analytics
  # Setup Web Vitals reporting
  # Configure in _app.tsx or layout.tsx
  ```
  **Status:** 🟢 MEDIUM  
  **Impact:** Observability - No performance tracking  
  **ETA:** 30 minutes

---

## 🧪 Verification Steps

### Step 1: Code Quality Checks
```bash
# TypeScript
npm run typecheck
# Expected: ✓ No production errors

# Linting
npm run lint
# Expected: ⚠ Warnings only in scripts (acceptable)

# Build
npm run build
# Expected: ✓ 250 pages generated, no SMTP logs
```

### Step 2: Security Audit
```bash
# Dependency scan
npm audit --production
# Expected: 0 HIGH or CRITICAL vulnerabilities

# Check for sensitive data
npm run build 2>&1 | grep -E "(password|secret|key|token)" -i
# Expected: Empty (no matches)
```

### Step 3: i18n Verification
```bash
# Run i18n checker (if available)
npm run i18n:check

# Manual check
grep -r "className='sr-only'" src/components/dashboard/DashboardContainer.tsx
# Verify all sr-only content uses translate()
```

### Step 4: Build Output Analysis
```bash
# Check bundle sizes
npm run build | grep "dashboard"
# Expected: Dashboard bundle ~1.03 MB (acceptable for feature-rich page)

# Verify static generation
ls -la .next/server/app/*/dashboard.html
# Expected: Files exist for tr, en, sr locales
```

---

## 🚢 Deployment Process

### Environment Setup

**Vercel Dashboard:**
1. Navigate to Project → Settings → Environment Variables
2. Verify all required variables are set:
   ```
   ✓ NEXT_PUBLIC_SUPABASE_URL
   ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
   ✓ SUPABASE_SERVICE_ROLE_KEY
   ✓ SHOPIER_MERCHANT_ID
   ✓ SHOPIER_API_KEY
   ✓ SHOPIER_API_SECRET
   ✓ SHOPIER_TEST_MODE=false (for production)
   ✓ SMTP_HOST
   ✓ SMTP_USER
   ✓ SMTP_PASS
   ✓ WEBHOOK_SECRET
   ✓ GROQ_API_KEY (for AI features)
   ```

### Database Migrations

**Supabase Dashboard:**
1. Navigate to SQL Editor
2. Verify migrations applied:
   ```sql
   SELECT * FROM _migrations ORDER BY applied_at DESC LIMIT 5;
   ```
3. Confirm RLS policies active:
   ```sql
   SELECT schemaname, tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

### Deployment Commands

```bash
# 1. Final checks
npm run typecheck && npm run build

# 2. Deploy to preview
vercel

# 3. Test preview deployment
# - Visit preview URL
# - Test dashboard functionality
# - Check browser console for errors
# - Test payment flow (test mode)
# - Verify i18n (tr/en/sr)

# 4. Deploy to production (if preview OK)
vercel --prod

# 5. Tag release
git tag -a v1.0.0 -m "Dashboard deployment - Post audit fixes"
git push origin v1.0.0
```

---

## 🔍 Post-Deployment Monitoring

### Immediate (First 15 minutes)

- [ ] **Homepage loads** → https://yourdomain.com
  ```bash
  curl -I https://yourdomain.com
  # Expected: 200 OK
  ```

- [ ] **Dashboard accessible** → https://yourdomain.com/tr/dashboard
  ```bash
  curl -I https://yourdomain.com/tr/dashboard
  # Expected: 200 OK or 302 (redirect to auth)
  ```

- [ ] **API endpoints working**
  ```bash
  curl https://yourdomain.com/api/cards/tr | jq '.success'
  # Expected: true
  ```

- [ ] **No console errors**
  - Open browser DevTools
  - Navigate to dashboard
  - Check console (should be clean)

### Short-term (First Hour)

- [ ] **Error rate** < 1%
  - Vercel Dashboard → Analytics → Errors
  
- [ ] **Response time** < 2s
  - Vercel Dashboard → Analytics → Performance

- [ ] **Database queries** optimized
  - Supabase Dashboard → Database → Query Performance

- [ ] **User sessions** active
  - Check Vercel Analytics → Active Users

### Medium-term (First Day)

- [ ] **Payment flow** tested
  - Test purchase with Shopier
  - Verify credit update
  - Check webhook delivery

- [ ] **Email delivery** working
  - Test password reset
  - Test purchase receipt

- [ ] **i18n** functioning
  - Test all 3 locales (tr/en/sr)
  - Verify no fallback strings visible

---

## 🔄 Rollback Plan

### Scenario 1: Critical Error (5xx, crashes)

**Action:** Immediate rollback
```bash
# Via Vercel Dashboard
# Deployments → Previous → Promote to Production

# Via CLI
vercel rollback [PREVIOUS_DEPLOYMENT_URL] --prod
```

**Communication:**
```
Subject: [URGENT] Deployment Rollback - Dashboard
Body: 
- Issue: [Description]
- Action: Rolled back to [PREVIOUS_VERSION]
- Status: Investigating
- ETA: [Time for fix + redeploy]
```

### Scenario 2: Non-critical Bugs (UI glitches, minor errors)

**Action:** Deploy hotfix
```bash
# 1. Create hotfix branch
git checkout -b hotfix/dashboard-fix

# 2. Apply fix
# ... make changes ...

# 3. Test locally
npm run build

# 4. Deploy to preview
vercel

# 5. If OK, deploy to production
vercel --prod

# 6. Merge to main
git checkout main
git merge hotfix/dashboard-fix
git push origin main
```

### Scenario 3: Performance Degradation

**Action:** Investigate + Scale
```bash
# 1. Check Vercel function logs
vercel logs --prod

# 2. Check Supabase performance
# Supabase Dashboard → Database → Query Performance

# 3. Enable caching (if not already)
# Update next.config.js with aggressive caching

# 4. Consider CDN optimization
# Vercel automatically handles, but verify Edge Network active
```

---

## 📊 Success Metrics

### Technical Metrics

| Metric | Target | Threshold |
|--------|--------|-----------|
| Error Rate | < 0.5% | < 1% |
| Response Time (p95) | < 1.5s | < 2s |
| Lighthouse Score | > 90 | > 80 |
| Core Web Vitals | All Green | 2 Green min |
| Uptime | 99.9% | 99.5% |

### Business Metrics

| Metric | Target | Threshold |
|--------|--------|-----------|
| Dashboard Load Success | > 99% | > 95% |
| Payment Success Rate | > 98% | > 95% |
| i18n Coverage | 100% | 98% |
| Mobile Usability | > 95% | > 90% |

---

## 🆘 Emergency Contacts

**On-Call Rotation:**
- Primary: [Developer Name]
- Secondary: [Developer Name]
- Database: Supabase Support
- Hosting: Vercel Support

**Escalation Path:**
1. Check monitoring dashboards
2. Review error logs
3. Attempt automated rollback
4. Contact on-call developer
5. If payment-related → Contact Shopier support
6. If database-related → Contact Supabase support

---

## 📝 Sign-Off

**Pre-Deployment:**
- [ ] Developer: _____________________ Date: _____
- [ ] QA: _____________________ Date: _____
- [ ] Product Owner: _____________________ Date: _____

**Post-Deployment:**
- [ ] Deployment successful: _____________________ Date: _____
- [ ] Monitoring active: _____________________ Date: _____
- [ ] No critical errors: _____________________ Date: _____

---

**Checklist Version:** 1.0  
**Last Updated:** 2025-10-08  
**Next Review:** After deployment completion

