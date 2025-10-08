# ✅ PRE-DEPLOYMENT CHECKLIST

**Project:** TaraTarot  
**Deploy Date:** _____________  
**Deployed By:** _____________  
**Deploy Target:** Production

---

## 🚦 GO/NO-GO DECISION

**Before proceeding, ALL items in "MUST COMPLETE" section must be checked.**

---

## 🔴 MUST COMPLETE (Deployment Blockers)

### 1. Environment Configuration ⏱️ 15 minutes

- [ ] All 14 required env vars set in production platform
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = production Supabase URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = production anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = production service role key
- [ ] `NEXT_PUBLIC_SITE_URL` = production domain (https://yoursite.com)
- [ ] `WEBHOOK_SECRET` = strong random secret (min 32 chars)
- [ ] `SHOPIER_MERCHANT_ID` = production merchant ID
- [ ] `SHOPIER_API_KEY` = production API key
- [ ] `SHOPIER_API_SECRET` = production API secret
- [ ] `SHOPIER_TEST_MODE` = **false** (critical!)
- [ ] `SMTP_HOST` = smtp.gmail.com
- [ ] `SMTP_PORT` = 587
- [ ] `SMTP_USER` = production email
- [ ] `SMTP_PASS` = app-specific password
- [ ] Optional: `SENTRY_DSN` for error tracking

### 2. Local Build Verification ⏱️ 5 minutes

```bash
cd /Users/tugi/Desktop/TaraTarot
npm run build
```

- [ ] Build completes successfully
- [ ] No build errors shown
- [ ] Output shows "✓ Compiled successfully"
- [ ] All routes generated

### 3. Database Migrations ⏱️ 30 minutes

**CRITICAL:** Backup database before running migrations!

- [ ] Create database backup in Supabase dashboard
- [ ] Note backup timestamp: _____________
- [ ] Execute migrations in order (001 → 017)
- [ ] Verify RLS policies active
- [ ] Test read query on production DB
- [ ] Test write query (optional)
- [ ] Verify no migration errors

**Migration Order:**
1. `001_create_tarot_cards_tables.sql`
2. `002_insert_sample_tarot_cards.sql`
3. `003_insert_seo_data.sql`
4. `20241201_01_types.sql`
5. `20241201_02_tables.sql`
6. `20241201_03_constraints.sql`
7. `20241201_04_indexes.sql`
8. `20241201_05_rls.sql`
9. `20241201_06_functions.sql`
10. `20250911_01-types.sql`
11. `20250911_02-tables.sql`
12. `20250911_03-constraints.sql`
13. `20250911_04-indexes.sql`
14. `20250911_05-rls.sql`
15. `20250911_06-seed.sql`
16. `20250930_01-add-marriage-enum.sql`
17. `20250930_02-system-performance.sql`

### 4. DNS & Domain ⏱️ 10 minutes

- [ ] Domain DNS points to deployment platform
- [ ] SSL certificate provisioned
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] www redirect configured (if applicable)

### 5. Pre-Deploy Testing ⏱️ 20 minutes

```bash
# With production env vars (in safe environment)
npm run build
npm run start
```

- [ ] App starts successfully
- [ ] Homepage renders
- [ ] Auth pages load
- [ ] Dashboard accessible (after login)
- [ ] No console errors in browser
- [ ] i18n switching works (TR/EN/SR)

---

## 🟡 RECOMMENDED (Strongly Suggested)

### 6. Security Enhancements ⏱️ 20 minutes

- [ ] Apply security headers patch
  ```bash
  git apply deploycheck/patches/001-add-security-headers.patch
  ```
- [ ] Verify headers in browser DevTools (after deploy)
- [ ] Test CSP doesn't break functionality

### 7. Error Tracking ⏱️ 15 minutes

- [ ] Setup Sentry account (or similar)
- [ ] Add `SENTRY_DSN` to environment
- [ ] Verify first error captured
- [ ] Configure alert thresholds

### 8. Rollback Preparation ⏱️ 10 minutes

- [ ] Note current git commit SHA: _____________
- [ ] Document rollback commands
- [ ] Test rollback process in staging (if available)
- [ ] Identify on-call person: _____________

---

## 🟢 OPTIONAL (Nice to Have)

### 9. Monitoring Setup ⏱️ 30 minutes

- [ ] Configure Vercel Analytics
- [ ] Setup uptime monitoring (UptimeRobot, etc.)
- [ ] Create status page (optional)
- [ ] Configure Slack/Discord alerts

### 10. Performance Baseline ⏱️ 15 minutes

- [ ] Run Lighthouse audit on staging
- [ ] Document baseline scores
- [ ] Set performance budgets
- [ ] Monitor bundle sizes

---

## 🚀 DEPLOYMENT EXECUTION

### Step-by-Step Deploy Process

#### Pre-Deploy (30 minutes before)

1. **Team Notification**
   - [ ] Notify team of upcoming deployment
   - [ ] Time: _____________
   - [ ] Expected duration: 1-2 hours

2. **Final Code Review**
   - [ ] All changes committed
   - [ ] No uncommitted work
   - [ ] Branch is `main` or production branch
   - [ ] Latest code pulled

3. **Backup Everything**
   - [ ] Database backup created
   - [ ] Note git SHA: _____________
   - [ ] Previous deployment URL noted (for rollback)

#### Deploy (15-30 minutes)

**If using Vercel:**

1. **Push to Production**
   ```bash
   git push origin main
   ```
   - [ ] Vercel auto-deploys (if connected)
   - [ ] Watch deployment logs
   - [ ] No build errors

**If Manual Deploy:**

1. **Via Vercel CLI**
   ```bash
   vercel --prod
   ```
   - [ ] Build succeeds
   - [ ] Deployment completes
   - [ ] Production URL received

#### Post-Deploy (1-2 hours)

1. **Immediate Verification (5 minutes)**
   - [ ] Visit production URL
   - [ ] Homepage loads
   - [ ] No visible errors
   - [ ] SSL certificate valid

2. **Smoke Tests (20 minutes)**
   - [ ] **Homepage:** Loads in <3s
   - [ ] **Auth:** Register new test user
   - [ ] **Auth:** Login with test user
   - [ ] **Reading:** Create love reading
   - [ ] **Reading:** View reading results
   - [ ] **Payment:** View credit packages (don't purchase yet)
   - [ ] **i18n:** Switch to EN, verify English
   - [ ] **i18n:** Switch to SR, verify Serbian
   - [ ] **i18n:** Switch back to TR

3. **Integration Tests (30 minutes)**
   - [ ] **Supabase:** Database queries working
   - [ ] **Email:** Test email sending
   - [ ] **Payment:** Shopier test transaction (if test mode available)
   - [ ] **Webhook:** Verify webhook endpoint accessible

4. **Monitoring Setup (15 minutes)**
   - [ ] Check Vercel dashboard
   - [ ] Review error logs (should be empty/minimal)
   - [ ] Check Supabase database activity
   - [ ] Verify analytics tracking

5. **Performance Check (10 minutes)**
   - [ ] Run Lighthouse audit
   - [ ] Check page load times
   - [ ] Verify image optimization
   - [ ] Check bundle sizes

---

## 📊 SUCCESS CRITERIA

### Deployment is Successful IF:

- ✅ All "MUST COMPLETE" items checked
- ✅ Build completed without errors
- ✅ All smoke tests passed
- ✅ No critical errors in logs (first hour)
- ✅ At least one successful user flow (register → reading)

### Deployment Requires Rollback IF:

- ❌ Homepage doesn't load (500 error)
- ❌ Database connection fails
- ❌ Auth completely broken
- ❌ Payment system errors (after test mode disabled)
- ❌ Critical security vulnerability discovered

---

## 🔥 ROLLBACK PROCEDURE

### If Deployment Fails:

1. **Immediate Action** (2 minutes)
   ```bash
   # Vercel Dashboard: Deployments → [Previous] → Promote
   # Or via CLI:
   vercel rollback
   ```

2. **Database Rollback** (if migrations ran)
   - Restore from pre-deployment backup
   - Verify data integrity

3. **Communication**
   - Notify team of rollback
   - Document issue
   - Plan fix and redeployment

4. **Post-Mortem**
   - What went wrong?
   - How to prevent?
   - Update this checklist

---

## ✅ POST-DEPLOYMENT

### First Hour Monitoring

- [ ] Watch error logs continuously
- [ ] Monitor user registrations
- [ ] Check payment transactions
- [ ] Verify email delivery
- [ ] Response times < 2s

### First Day

- [ ] Review error rates
- [ ] Check user feedback
- [ ] Monitor uptime (target: 99.9%)
- [ ] Verify all integrations stable

### First Week

- [ ] Performance trending
- [ ] Security incident check
- [ ] User satisfaction score
- [ ] Plan next improvements

---

## 🏆 DEPLOYMENT SIGN-OFF

### Pre-Deploy Approval

**Technical Lead:** _____________  
**Date:** _____________  
**Signature:** _____________

**Checklist Completed:** _____% (Must be 100% for MUST COMPLETE items)

**Deploy Authorization:** ☐ APPROVED ☐ REJECTED

**If Rejected, Reason:**
________________________________________
________________________________________

### Post-Deploy Confirmation

**Deployment Completed:** _____________  
**Production URL:** _____________  
**First Error Check:** ☐ PASS ☐ FAIL  
**Smoke Tests:** ☐ PASS ☐ FAIL  
**Status:** ☐ SUCCESS ☐ ROLLED BACK

---

**Checklist Version:** 1.0  
**Last Updated:** 2025-10-08  
**Use This Checklist:** For every production deployment

