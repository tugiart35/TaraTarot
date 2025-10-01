# 🚀 Production Deployment Guide

**Status:** Cloudflare + Vercel kurulu ✅  
**Next:** Production deployment  
**Estimated Time:** 60 minutes

---

## 1️⃣ Environment Variables Setup

### Vercel Dashboard'da Environment Variables Ekle

**Vercel Dashboard → Project → Settings → Environment Variables**

```bash
# Core App
NODE_ENV=production
DEBUG=false

# Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://qtlokdkcerjrbrtphlrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDgwOTcsImV4cCI6MjA3MzcyNDA5N30.ezpkbTze481HDVgWDohuDY-iOfK8TQpog1Jzk6Glm6k
SUPABASE_URL=https://qtlokdkcerjrbrtphlrh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE0ODA5NywiZXhwIjoyMDczNzI0MDk3fQ.Z9GuxWdEpsAhnz405LM7aVBmZNyJbZOnOdi8A3cMKWI

# Application URLs
NEXT_PUBLIC_SITE_URL=https://busbuskimki.com
NEXT_PUBLIC_CONTACT_PHONE=+382 (67) 010176

# Payment Configuration
SHOPIER_MERCHANT_ID=https://www.shopier.com/busbuskimki
SHOPIER_API_KEY=684fb826c76a726e2be5c049d110029c
SHOPIER_API_SECRET=e860249c45e6e4a6e8eca2c5b327eb77
SHOPIER_TEST_MODE=false
NEXT_PUBLIC_SHOPIER_API_URL=https://www.shopier.com/ShowProduct/api_pay4.php
NEXT_PUBLIC_SHOPIER_CALLBACK_URL=https://busbuskimki.com/payment/callback
NEXT_PUBLIC_SHOPIER_WEBHOOK_URL=https://busbuskimki.com/api/webhook/shopier

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=busbuskimkionline@gmail.com
SMTP_PASS=ouxpmflgzqfornlv

# Security
WEBHOOK_SECRET=your-generated-webhook-secret
```

### Generate Webhook Secret
```bash
# Terminal'de güçlü secret oluştur:
openssl rand -base64 32
```

---

## 2️⃣ Vercel Deploy

### Build Test (Local)
```bash
# Proje klasöründe build test et:
npm run build

# Build başarılı mı kontrol et:
echo $?  # 0 = success, 1 = error
```

### Deploy to Vercel
```bash
# Production deploy:
vercel --prod

# Domain ekle (eğer eklenmemişse):
vercel domains add busbuskimki.com
vercel domains add www.busbuskimki.com
```

### Vercel Dashboard Configuration
1. **Project Settings → Domains:**
   - `busbuskimki.com` ✅
   - `www.busbuskimki.com` ✅

2. **Project Settings → Functions:**
   - Node.js Version: 18.x
   - Build Command: `npm run build`
   - Output Directory: `.next`

---

## 3️⃣ Cloudflare Configuration

### DNS Records Check
```
A Record:     @     → 76.76.19.19 (Vercel IP)
CNAME:       www    → busbuskimki.com
```

### SSL/TLS Settings
```
SSL/TLS → Overview → "Full (strict)"
Edge Certificates → Always Use HTTPS → ON
```

### Performance Optimization
```
Speed → Optimization:
- Auto Minify: HTML, CSS, JS → ON
- Brotli Compression → ON
- Rocket Loader → ON

Caching → Configuration:
- Browser Cache TTL → 4 hours
- Caching Level → Standard
```

### Page Rules (Optional)
```
busbuskimki.com/api/*
- Cache Level: Bypass
- Edge Cache TTL: 2 hours

busbuskimki.com/_next/static/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
```

---

## 4️⃣ Production Testing

### 1. Basic Functionality Test
```bash
# Website accessibility:
curl -I https://busbuskimki.com

# API endpoints test:
curl -X POST https://busbuskimki.com/api/email/test
curl -X POST https://busbuskimki.com/api/webhook/shopier
```

### 2. Database Connection Test
- Supabase Dashboard → SQL Editor
- Test query çalıştır:
```sql
SELECT COUNT(*) FROM profiles;
```

### 3. Payment Integration Test
- Shopier test mode'da test payment
- Webhook endpoint test
- Callback URL test

### 4. Email Service Test
- Contact form test
- PDF generation test
- SMTP connection test

### 5. Performance Test
```bash
# Page speed test:
curl -w "@curl-format.txt" -o /dev/null -s https://busbuskimki.com

# Create curl-format.txt:
cat > curl-format.txt << EOF
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

---

## 5️⃣ Monitoring & Analytics

### Vercel Analytics
1. **Vercel Dashboard → Analytics**
   - Enable Web Analytics
   - Enable Speed Insights

### Error Monitoring (Optional)
```bash
# Sentry setup (if needed):
npm install @sentry/nextjs

# Environment variable:
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### Uptime Monitoring
- **UptimeRobot** (Free tier): 50 monitors
- **Pingdom** (Free tier): 1 monitor
- **StatusCake** (Free tier): 10 tests

---

## 6️⃣ Security Checklist

### Pre-Launch Security
- [ ] All environment variables set
- [ ] HTTPS enforced
- [ ] Security headers active
- [ ] Rate limiting enabled
- [ ] Webhook signature validation
- [ ] Database RLS policies active

### Post-Launch Security
- [ ] Monitor error logs
- [ ] Check failed login attempts
- [ ] Verify payment webhooks
- [ ] Monitor API usage
- [ ] Check SSL certificate status

---

## 7️⃣ Go-Live Checklist

### Final Checks
- [ ] Domain pointing to Vercel
- [ ] SSL certificate active
- [ ] All environment variables loaded
- [ ] Database migrations completed
- [ ] Payment integration tested
- [ ] Email service working
- [ ] Error monitoring active
- [ ] Analytics tracking

### Launch Steps
1. **DNS Propagation Check:**
   ```bash
   nslookup busbuskimki.com
   ```

2. **SSL Certificate Check:**
   ```bash
   curl -I https://busbuskimki.com
   # Should return: Strict-Transport-Security header
   ```

3. **Performance Check:**
   - PageSpeed Insights
   - GTmetrix
   - WebPageTest

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Check build logs:
vercel logs

# Common fixes:
npm run build  # Test locally first
npm install    # Update dependencies
```

#### 2. Environment Variables Not Loading
```bash
# Check in Vercel dashboard:
Settings → Environment Variables → Production
```

#### 3. DNS Issues
```bash
# Check DNS propagation:
dig busbuskimki.com
nslookup busbuskimki.com
```

#### 4. SSL Issues
- Wait 5-10 minutes after DNS changes
- Check Cloudflare SSL/TLS settings
- Verify domain configuration in Vercel

---

## 📞 Support Contacts

### Vercel Support
- **Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

### Cloudflare Support
- **Documentation:** [developers.cloudflare.com](https://developers.cloudflare.com)
- **Community:** [community.cloudflare.com](https://community.cloudflare.com)

---

## 🎯 Timeline

### Day 1: Setup (60 minutes)
- [ ] Environment variables (15 min)
- [ ] Vercel deploy (10 min)
- [ ] Cloudflare config (10 min)
- [ ] Basic testing (15 min)
- [ ] Monitoring setup (10 min)

### Day 2: Testing & Optimization
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Security validation
- [ ] Go-live preparation

### Day 3: Launch
- [ ] Final checks
- [ ] Go live
- [ ] Monitor for 24 hours

---

## 🚀 Ready to Deploy!

**Next Steps:**
1. Environment variables'ları Vercel'e ekle
2. `vercel --prod` ile deploy et
3. Cloudflare ayarlarını optimize et
4. Production test et
5. Go live! 🎉

**Estimated Time:** 60 minutes
**Status:** Ready for production deployment
