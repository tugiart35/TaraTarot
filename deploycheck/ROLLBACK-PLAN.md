# 🔥 ROLLBACK & DISASTER RECOVERY PLAN

**Project:** TaraTarot  
**Version:** 1.0  
**Last Updated:** 2025-10-08

---

## 🎯 PURPOSE

This document provides step-by-step procedures for rolling back a failed
deployment and recovering from production incidents.

---

## ⚡ QUICK ROLLBACK (< 5 minutes)

### If Deployment Just Failed

**Vercel Platform Rollback:**

```bash
# Method 1: Vercel Dashboard (Recommended - 2 min)
1. Go to https://vercel.com/dashboard
2. Select TaraTarot project
3. Click "Deployments"
4. Find last working deployment
5. Click "..." → "Promote to Production"
✅ Done!

# Method 2: Vercel CLI (3 min)
vercel rollback
# Select previous deployment from list
```

**Impact:** Immediate revert to last working version

**Limitations:**

- Database changes NOT rolled back
- Environment variables NOT rolled back
- User data created during failed deploy remains

---

## 🗄️ DATABASE ROLLBACK

### Critical: Always Backup Before Migration!

**Pre-Migration Backup (Required):**

```bash
# In Supabase Dashboard:
1. Go to Database → Backups
2. Click "Create Backup"
3. Name: "pre-deploy-YYYYMMDD-HHMM"
4. Wait for completion
5. ✅ Note backup ID: ________________
```

### Restore from Backup

**If migrations caused issues:**

```bash
# Supabase Dashboard Method:
1. Database → Backups
2. Find pre-deploy backup
3. Click "Restore"
4. Confirm restoration
5. Wait 5-15 minutes
6. Verify data integrity
```

**Manual Restore (if needed):**

```sql
-- Connect to production DB via Supabase SQL Editor

-- 1. Check current schema version
SELECT * FROM schema_migrations ORDER BY version DESC LIMIT 5;

-- 2. If need to revert specific migration, run reverse SQL
-- (Should be documented per migration)

-- 3. Verify tables
\dt

-- 4. Test critical queries
SELECT COUNT(*) FROM profiles;
SELECT COUNT(*) FROM readings;
SELECT COUNT(*) FROM credit_transactions;
```

---

## 🔧 ENVIRONMENT VARIABLE ROLLBACK

### If Env Vars Changed

**Vercel Dashboard:**

```
1. Go to Settings → Environment Variables
2. Edit each changed variable
3. Restore previous values
4. Redeploy to apply changes
```

**Record Previous Values:**

| Variable             | Previous Value       | New Value            | Changed Date |
| -------------------- | -------------------- | -------------------- | ------------ |
| ******\_\_\_\_****** | ******\_\_\_\_****** | ******\_\_\_\_****** | **\_\_\_\_** |
| ******\_\_\_\_****** | ******\_\_\_\_****** | ******\_\_\_\_****** | **\_\_\_\_** |

---

## 🐛 INCIDENT RESPONSE PLAYBOOK

### P0: Site Down (Critical)

**Symptoms:**

- Homepage returns 500 error
- All pages inaccessible
- "Application Error" message

**Immediate Actions (< 5 min):**

1. **Verify it's not DNS/CDN issue**

   ```bash
   # Check if site resolves
   nslookup yoursite.com

   # Check direct Vercel URL
   curl https://your-deployment.vercel.app
   ```

2. **Check Vercel Status**
   - Visit https://www.vercel-status.com
   - If Vercel issue → wait for resolution

3. **If deployment issue → ROLLBACK**

   ```bash
   vercel rollback
   ```

4. **Verify rollback succeeded**
   - Check homepage loads
   - Test one user flow

5. **Notify team**
   - "Production rolled back due to [reason]"
   - ETA for fix: ****\_\_\_****

### P0: Database Connection Lost

**Symptoms:**

- "Database connection error"
- Auth fails
- Readings don't load

**Immediate Actions:**

1. **Check Supabase Status**
   - Supabase Dashboard → Project health
   - https://status.supabase.com

2. **Verify connection string**
   - Check `NEXT_PUBLIC_SUPABASE_URL` in env
   - Test connection manually

3. **Check RLS policies**

   ```sql
   -- In Supabase SQL Editor
   SELECT tablename, policyname
   FROM pg_policies
   WHERE schemaname = 'public';
   ```

4. **If recent migration broke it → Restore backup**
   - Database → Backups → Restore

### P1: Payment System Failure

**Symptoms:**

- Payment button doesn't work
- Shopier errors in logs
- Webhook failures

**Immediate Actions:**

1. **Enable Shopier Test Mode**

   ```
   Vercel → Environment Variables
   SHOPIER_TEST_MODE = true
   Redeploy
   ```

2. **Check Shopier Dashboard**
   - Verify API credentials valid
   - Check for IP whitelist issues
   - Review transaction logs

3. **Verify webhook endpoint**

   ```bash
   curl -X POST https://yoursite.com/api/webhook/shopier \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

4. **If webhook signature failing:**
   - Verify `WEBHOOK_SECRET` matches Shopier config
   - Check webhook URL is accessible

### P1: Auth System Failure

**Symptoms:**

- Can't login/register
- "Authentication error"
- Supabase auth errors

**Immediate Actions:**

1. **Check Supabase Auth Status**
   - Supabase Dashboard → Authentication
   - Verify auth is enabled

2. **Verify auth redirect URLs**
   - Supabase → Authentication → URL Configuration
   - Redirect URLs should include production domain

3. **Check env vars:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Test with direct Supabase client:**
   ```javascript
   // In browser console on site
   const { data, error } = await supabase.auth.getSession();
   console.log({ data, error });
   ```

### P2: Email Sending Fails

**Symptoms:**

- PDF emails not sent
- SMTP errors in logs

**Actions:**

1. **Verify SMTP credentials**
   - Check env vars: SMTP_USER, SMTP_PASS
   - Test in Gmail: App passwords still valid?

2. **Check email service limits**
   - Gmail: 500 emails/day limit
   - If exceeded: Switch to SendGrid/AWS SES

3. **Test email sending:**
   ```bash
   # Call test email endpoint
   curl -X POST https://yoursite.com/api/email/test
   ```

---

## 📋 ROLLBACK DECISION MATRIX

| Severity          | Criteria                           | Action                  | Response Time |
| ----------------- | ---------------------------------- | ----------------------- | ------------- |
| **P0 - Critical** | Site completely down               | IMMEDIATE ROLLBACK      | < 5 minutes   |
| **P0 - Critical** | Data loss occurring                | ROLLBACK + DB RESTORE   | < 10 minutes  |
| **P0 - Critical** | Security breach                    | ROLLBACK + INVESTIGATE  | < 5 minutes   |
| **P1 - High**     | Core feature broken (auth/payment) | ROLLBACK or HOTFIX      | < 30 minutes  |
| **P1 - High**     | Significant UX degradation         | HOTFIX (don't rollback) | < 2 hours     |
| **P2 - Medium**   | Non-critical feature broken        | HOTFIX next deploy      | < 24 hours    |
| **P3 - Low**      | Minor bug, cosmetic issue          | Fix in next release     | < 1 week      |

---

## 🔧 HOTFIX PROCEDURE

**For P1 issues that don't require full rollback:**

1. **Create hotfix branch**

   ```bash
   git checkout -b hotfix/critical-issue-name
   ```

2. **Make minimal fix**
   - Fix ONLY the critical issue
   - Don't refactor
   - Add quick test

3. **Test locally**

   ```bash
   npm run build
   npm run start
   # Test the specific issue
   ```

4. **Deploy hotfix**

   ```bash
   git push origin hotfix/critical-issue-name
   # Merge to main
   # Deploy
   ```

5. **Verify fix**
   - Test in production
   - Monitor for 1 hour
   - Document in post-mortem

---

## 📞 INCIDENT COMMUNICATION

### Internal Team Notification

**Template:**

```
🚨 PRODUCTION INCIDENT

Severity: [P0/P1/P2/P3]
Status: [INVESTIGATING/ROLLING BACK/FIXED]

Issue: [Brief description]
Impact: [User-facing impact]
Started: [Timestamp]

Actions Taken:
- [Action 1]
- [Action 2]

Next Steps:
- [Next action]

ETA: [Estimated resolution time]
```

### User Communication (if needed)

**For extended outages (>30 min):**

```
We're currently experiencing technical difficulties.
Our team is working to resolve the issue.

ETA: [time]
Status updates: [URL or social media]

Thank you for your patience.
```

---

## 🗃️ POST-INCIDENT CHECKLIST

### After Resolving Incident

- [ ] Verify issue completely resolved
- [ ] Monitor for 2 hours (no recurrence)
- [ ] Document incident details
- [ ] Update rollback plan if needed
- [ ] Schedule post-mortem meeting
- [ ] Implement preventive measures

### Post-Mortem Template

**Date:** ******\_******  
**Incident ID:** ******\_******  
**Duration:** **\_\_\_** minutes  
**Severity:** P\_\_\_

**What Happened:**

---

**Root Cause:**

---

**Impact:**

- Users affected: ******\_******
- Revenue impact: ******\_******
- Data loss: YES / NO

**Timeline:**

- Detected: ******\_******
- Rollback initiated: ******\_******
- Resolved: ******\_******

**What Went Well:**

---

**What Could Be Better:**

---

**Action Items:**

1. ***
2. ***

---

## 🛡️ PREVENTION STRATEGIES

### Reduce Rollback Likelihood

1. **Always test in staging first**
   - Separate Supabase project for staging
   - Test all changes before production

2. **Use feature flags**
   - Gradual rollout of new features
   - Quick disable without deployment

3. **Setup CI/CD**
   - Automated testing before deploy
   - Prevents broken code reaching production

4. **Database migration safety**
   - Always backup before migration
   - Test migrations on staging first
   - Document reverse migrations

5. **Monitor early warning signals**
   - Error rate increases
   - Performance degradation
   - Failed health checks

---

## 📊 ROLLBACK SUCCESS CRITERIA

### Rollback is Successful IF:

- ✅ Site loads normally
- ✅ All core features working (auth, reading, payment)
- ✅ No errors in logs
- ✅ Database queries succeed
- ✅ User experience normal

### Verification Steps Post-Rollback:

1. **Homepage** (1 min)
   - Loads without error
   - Images display
   - Links work

2. **Authentication** (2 min)
   - Login works
   - Session persists
   - Dashboard accessible

3. **Core Feature** (5 min)
   - Create tarot reading
   - View results
   - Navigate pages

4. **Database** (2 min)
   - Queries returning data
   - No connection errors
   - RLS working

**Total Verification Time:** ~10 minutes

---

## 🔐 SECURITY INCIDENT RESPONSE

### If Security Breach Detected

**P0 Response (Immediate):**

1. **TAKE SITE OFFLINE** (if data at risk)

   ```bash
   # Vercel: Scale to 0
   # Or: Delete DNS records temporarily
   ```

2. **Assess damage**
   - What data was accessed?
   - How did breach occur?
   - Are credentials compromised?

3. **Rotate all secrets**
   - Database passwords
   - API keys
   - Webhook secrets
   - JWT secrets

4. **Notify affected users** (if PII exposed)

5. **Document and report**

---

## 📝 EMERGENCY CONTACTS

**On-Call Engineer:** ******\_******  
**Database Admin:** ******\_******  
**Security Lead:** ******\_******  
**Product Owner:** ******\_******

**Escalation Path:**

1. On-call engineer (respond < 15 min)
2. Technical lead (respond < 30 min)
3. CTO/VP Engineering (P0 only)

---

## 🧪 ROLLBACK TESTING

### Test Rollback Procedure (Quarterly)

- [ ] Practice rollback in staging
- [ ] Time the procedure
- [ ] Update documentation
- [ ] Train team members

**Last Rollback Test:** ******\_******  
**Next Rollback Test:** ******\_******

---

**Rollback Plan Version:** 1.0  
**Approved By:** ******\_******  
**Date:** ******\_******

**Keep this document updated after each incident!**
