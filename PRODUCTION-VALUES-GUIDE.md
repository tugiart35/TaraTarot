# 🔑 Production Values Guide - How to Get Real Values

**Purpose:** Production deployment için gerçek değerleri nasıl bulacağınız  
**Status:** Step-by-step guide  
**Estimated Time:** 2-4 hours to collect all values

---

## 🚀 Quick Start Checklist

- [ ] **Supabase Production Project** - New project oluştur
- [ ] **Shopier Production Account** - Live mode credentials al
- [ ] **Email Service** - Production SMTP ayarla
- [ ] **Domain & URLs** - Production domain belirle
- [ ] **Webhook Security** - Secure secret oluştur

---

## 1️⃣ Supabase Production Setup

### Step 1: Create Production Project

1. [Supabase Dashboard](https://supabase.com/dashboard) → "New Project"
2. **Project Name:** `tarot-numeroloji-prod` (or your choice)
3. **Database Password:** Güçlü password oluştur (kaydet!)
4. **Region:** En yakın region seç (Europe için `eu-west-1`)
5. **Wait:** Project oluşturulmasını bekle (2-3 dakika)

### Step 2: Get Production Keys

```bash
# Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://qtlokdkcerjrbrtphlrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDgwOTcsImV4cCI6MjA3MzcyNDA5N30.ezpkbTze481HDVgWDohuDY-iOfK8TQpog1Jzk6Glm6k
SUPABASE_URL=qtlokdkcerjrbrtphlrh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE0ODA5NywiZXhwIjoyMDczNzI0MDk3fQ.Z9GuxWdEpsAhnz405LM7aVBmZNyJbZOnOdi8A3cMKWI
```

### Step 3: Database Setup

```sql
-- Production database'de migration'ları çalıştır
-- 1. migrations/ klasöründeki tüm .sql dosyalarını sırayla çalıştır
-- 2. RLS policies'leri aktif et
-- 3. Test data ekle (gerekirse)
```

---

## 2️⃣ Shopier Production Setup

### Step 1: Contact Shopier Support

1. **Email:** `destek@shopier.com` veya `info@shopier.com`
2. **Subject:** "Production Account Activation Request"
3. **Message Template:**

```
Merhaba,

TarotNumeroloji projemiz için production account aktivasyonu istiyorum.

Şirket Bilgileri:
- Şirket Adı: [Your Company Name]
- Vergi No: [Your Tax Number]
- Website: https://your-domain.com

Test hesabımız zaten aktif, production için:
- Merchant ID : https://www.shopier.com/busbuskimki
- API Key : 684fb826c76a726e2be5c049d110029c
- API Secret : e860249c45e6e4a6e8eca2c5b327eb77
- Webhook URL: busbuskimki.com/api/webhook/shopier

Bu bilgileri paylaşabilir misiniz?

Teşekkürler.
```

### Step 2: Production Credentials

```bash
# Shopier'den gelecek değerler:
SHOPIER_MERCHANT_ID=https://www.shopier.com/busbuskimki
SHOPIER_API_KEY=684fb826c76a726e2be5c049d110029c
SHOPIER_API_SECRET=e860249c45e6e4a6e8eca2c5b327eb77
SHOPIER_TEST_MODE=false

# URLs (domain'inizi kullanın):
NEXT_PUBLIC_SHOPIER_API_URL=https://www.shopier.com/ShowProduct/api_pay4.php
NEXT_PUBLIC_SHOPIER_CALLBACK_URL=https://your-domain.com/payment/callback
NEXT_PUBLIC_SHOPIER_WEBHOOK_URL=https://busbuskimki.com/api/webhook/shopier
```

---

## 3️⃣ Email Service Production Setup

### Option A: Gmail Business (Recommended)

1. **Google Workspace** hesabı oluştur
2. **App Password** oluştur:
   - Google Account → Security → 2-Step Verification → App passwords
   - "Mail" seç → "Other" → "TarotNumeroloji" yaz
   - Generated password'ü kopyala

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=busbuskimkionline@gmail.com
SMTP_PASS=ouxpmflgzqfornlv
```

### Option B: Professional Email Service

**SendGrid, Mailgun, AWS SES** gibi servisler:

```bash
# SendGrid örneği:
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# AWS SES örneği:
SMTP_HOST=email-smtp.eu-west-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

---

## 4️⃣ Domain & URLs Setup

### Step 1: Domain Purchase

**Recommended Providers:**

- [Namecheap](https://www.namecheap.com) - Cheap, reliable
- [GoDaddy](https://www.godaddy.com) - Popular
- [Cloudflare](https://www.cloudflare.com) - DNS + Security

### Step 2: Domain Configuration

```bash
# Production domain'inizi kullanın:
NEXT_PUBLIC_SITE_URL=busbuskimki.com
NEXT_PUBLIC_CONTACT_PHONE=+382 (67) 010176  # Gerçek telefon numarası
```

### Step 3: SSL Certificate

#### Option A: Vercel (RECOMMENDED - FREE SSL)

**En ucuz ve kolay yöntem - Otomatik SSL**

```bash
# 1. Vercel CLI install
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy project
vercel

# 4. Add custom domain
vercel domains add busbuskimki.com

# 5. DNS ayarları (Domain provider'da)
# A Record: @ → 76.76.19.19
# CNAME: www → cname.vercel-dns.com

# SSL otomatik olarak aktif olur (5-10 dakika)
```

**Maliyet:** $0 (SSL ücretsiz, hosting ücretsiz tier)

#### Option B: Cloudflare (FREE SSL + CDN)

**Domain'i Cloudflare'e taşı - Ücretsiz SSL + Performance**

```bash
# 1. Cloudflare hesabı oluştur
# https://cloudflare.com → Sign up

# 2. Domain ekle
# Add Site → busbuskimki.com

# 3. DNS ayarları
# A Record: @ → 76.76.19.19 (Vercel IP)
# CNAME: www → busbuskimki.com

# 4. SSL/TLS ayarları
# SSL/TLS → Overview → "Full (strict)" seç
# Automatic HTTPS Rewrites → ON
```

**Maliyet:** $0 (SSL + CDN ücretsiz)

#### Option C: Let's Encrypt (Custom Server için)

**Eğer kendi server'ınız varsa**

```bash
# 1. Certbot install (Ubuntu)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 2. SSL certificate oluştur
sudo certbot --nginx -d busbuskimki.com -d www.busbuskimki.com

# 3. Otomatik yenileme
sudo crontab -e
# Şu satırı ekle:
0 12 * * * /usr/bin/certbot renew --quiet
```

**Maliyet:** $0 (SSL ücretsiz, server maliyeti $5-20/ay)

---

## 🎯 RECOMMENDED SOLUTION: Vercel + Cloudflare

**En uygun kombinasyon:**

1. **Vercel** → Hosting + Otomatik SSL
2. **Cloudflare** → DNS + CDN + Ekstra güvenlik

### Step-by-Step Implementation:

#### 1. Vercel Setup (5 dakika)

```bash
# Terminal'de proje klasöründe:
npm i -g vercel
vercel login
vercel --prod

# Domain ekle:
vercel domains add busbuskimki.com
```

#### 2. Cloudflare Setup (10 dakika)

1. [Cloudflare.com](https://cloudflare.com) → Sign up
2. "Add a Site" → `busbuskimki.com`
3. DNS Records ekle:
   - **A Record:** `@` → `76.76.19.19`
   - **CNAME:** `www` → `busbuskimki.com`
4. SSL/TLS → "Full (strict)"
5. Speed → Auto Minify → ON
6. Caching → Browser Cache TTL → 4 hours

#### 3. Domain Provider DNS Update

**Domain provider'ınızda (Namecheap, GoDaddy, vs.):**

```
Nameservers değiştir:
ns1.cloudflare.com
ns2.cloudflare.com
```

### Benefits:

- ✅ **$0 maliyet** (SSL + Hosting ücretsiz)
- ✅ **Otomatik SSL** (Wildcard certificate)
- ✅ **Global CDN** (Hızlı yükleme)
- ✅ **DDoS Protection** (Güvenlik)
- ✅ **Auto-scaling** (Trafik artışında)
- ✅ **Easy deployment** (`vercel --prod`)

### Timeline:

- **Vercel setup:** 5 dakika
- **Cloudflare setup:** 10 dakika
- **DNS propagation:** 5-30 dakika
- **SSL activation:** 5-10 dakika

**Total: 30-60 dakika**

---

## 5️⃣ Webhook Security

### Generate Secure Secret

```bash
# Terminal'de güçlü secret oluştur:
openssl rand -base64 32

# veya Node.js ile:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

```bash
WEBHOOK_SECRET=your-32-char-random-string
```

---

## 6️⃣ Environment Setup

### Development → Production Migration

```bash
# 1. Production .env dosyası oluştur
cp env.example .env.production

# 2. Tüm değerleri güncelle
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 (xxx) xxx xx xx
SHOPIER_TEST_MODE=false
WEBHOOK_SECRET=your-generated-secret

# 3. Supabase production keys
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-prod-anon-key
SUPABASE_URL=https://your-prod-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-prod-service-key

# 4. Shopier production keys
SHOPIER_MERCHANT_ID=your-prod-merchant-id
SHOPIER_API_KEY=your-prod-api-key
SHOPIER_API_SECRET=your-prod-api-secret

# 5. Email production settings
SMTP_USER=your-prod-email@gmail.com
SMTP_PASS=your-prod-app-password
```

---

## 7️⃣ Testing & Validation

### Pre-Production Tests

```bash
# 1. Environment variables validation
npm run build  # Build başarılı mı?

# 2. Database connection test
# Supabase dashboard'da test queries çalıştır

# 3. Email service test
curl -X POST https://your-domain.com/api/email/test

# 4. Payment integration test
# Shopier test mode'da test payment yap

# 5. Webhook endpoint test
curl -X POST https://your-domain.com/api/webhook/shopier
```

---

## 8️⃣ Deployment Platforms

### Option A: Vercel (Recommended)

```bash
# 1. Vercel CLI install
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Environment variables set
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... tüm variables için tekrarla
```

### Option B: Netlify

```bash
# 1. Netlify CLI install
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod

# 3. Environment variables: Netlify Dashboard → Site Settings → Environment Variables
```

### Option C: Custom Server

```bash
# 1. Server setup (Ubuntu/CentOS)
# 2. Node.js, PM2, Nginx install
# 3. SSL certificate setup
# 4. Environment variables in .env file
```

---

## 9️⃣ Cost Estimation

### Monthly Costs (Approximate)

- **Domain:** $10-15/year
- **Supabase:** Free tier (up to 50k requests)
- **Email Service:** $10-50/month
- **Hosting (Vercel):** Free tier available
- **Shopier:** %2.9 + $0.30 per transaction

### Total Monthly Cost: $20-100 (depending on usage)

---

## 🔒 Security Checklist

### Before Production

- [ ] All secrets in environment variables (not in code)
- [ ] HTTPS enabled (SSL certificate)
- [ ] Database RLS policies active
- [ ] Webhook signature validation
- [ ] Rate limiting enabled
- [ ] Error monitoring setup (Sentry)

### After Production

- [ ] Monitor error logs
- [ ] Check payment webhooks
- [ ] Test email delivery
- [ ] Verify SSL certificate
- [ ] Monitor performance metrics

---

## 📞 Support Contacts

### Technical Support

- **Supabase:** [Discord](https://discord.supabase.com) or
  [GitHub Issues](https://github.com/supabase/supabase/issues)
- **Shopier:** `destek@shopier.com`
- **Vercel:** [Vercel Support](https://vercel.com/support)

### Emergency Contacts

- **Domain Issues:** Domain provider support
- **SSL Issues:** Certificate authority support
- **Payment Issues:** Shopier technical support

---

## 🎯 Timeline

### Week 1: Setup

- [ ] Day 1-2: Supabase production project
- [ ] Day 3-4: Shopier production account
- [ ] Day 5-7: Email service setup

### Week 2: Deployment

- [ ] Day 1-2: Domain purchase & DNS
- [ ] Day 3-4: Environment configuration
- [ ] Day 5-7: Testing & validation

### Week 3: Go Live

- [ ] Day 1-2: Final testing
- [ ] Day 3-4: Production deployment
- [ ] Day 5-7: Monitoring & optimization

---

## 🚀 Quick Commands

### Generate Random Secrets

```bash
# Webhook secret
openssl rand -base64 32

# Database password
openssl rand -base64 16

# API keys (if needed)
openssl rand -hex 32
```

### Test Environment Variables

```bash
# Check if all required variables are set
node -e "
const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SMTP_PASS'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.log('Missing variables:', missing);
  process.exit(1);
} else {
  console.log('✅ All required variables present');
}
"
```

---

## 📋 Final Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] Payment integration tested
- [ ] Email service working
- [ ] SSL certificate active
- [ ] Domain DNS configured
- [ ] Error monitoring setup
- [ ] Backup strategy in place

**Ready for production! 🚀**
