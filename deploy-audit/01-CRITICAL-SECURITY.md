# 🚨 KRİTİK GÜVENLİK SORUNLARI

**Oluşturulma Tarihi:** 7 Ekim 2025  
**Audit Seviyesi:** CRITICAL  
**Deployment Durumu:** ⛔ DEPLOYMENT YAPILMAMALI

---

## ⛔ DEPLOYMENT ENGELLEYİCİ SORUNLAR

### 1. 🔴 API Key Sızıntısı (.gemini/ dizini)

**Tehlike Seviyesi:** CRITICAL  
**Etki:** Tüm sistem güvenliği tehlikede

#### Tespit Edilen Sorunlar:

```
.gemini/settings.json - GEMINI_API_KEY açık metin
.gemini/GEMINI.md - GEMINI_API_KEY açık metin
```

**Tespit Edilen API Key:**

```
GEMINI_API_KEY=AIzaSyAgjVO0rAe1DishHl4KGRxpiQBDaHomhPs
```

#### Risk Değerlendirmesi:

- ❌ `.gemini/` dizini `.gitignore`'da YOK
- ❌ API key'ler Git repository'de saklanıyor
- ❌ Public olması durumunda tüm sistem hacklenilebilir
- ❌ Mali kayıp riski (API kullanım maliyeti)
- ❌ Veri sızıntısı riski

#### Acil Aksiyonlar:

1. ✅ `.gemini/` dizinini `.gitignore`'a ekle
2. ✅ Bu dosyaları Git history'den temizle
3. ✅ GEMINI_API_KEY'i yenile (mevcut key artık güvenli değil)
4. ✅ Tüm API key'leri environment variables'a taşı
5. ✅ Git history'i temizle: `git filter-repo` kullan

---

### 2. 🟡 Environment Variables Validasyonu Eksik

**Tehlike Seviyesi:** HIGH  
**Etki:** Runtime hatalar, production crashes

#### Tespit Edilen Sorunlar:

**Eksik Environment Variables:**

```bash
# env.example'da eksik:
GROQ_API_KEY                    # AI servisleri için kritik
GOOGLE_API_KEY                  # Gemini için
GEMINI_API_KEY                  # Gemini için
```

**Validation Eksikliği:**

- Uygulama başlangıcında env validation yok
- API key format kontrolü yok
- Required vs optional ayrımı net değil
- Startup sırasında eksik key kontrolü yok

#### Önerilen Çözüm:

```typescript
// src/lib/env-validator.ts oluştur
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GROQ_API_KEY',
  // ...
];

function validateEnv() {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}
```

---

### 3. 🟡 Service Role Key Kullanımı

**Tehlike Seviyesi:** MEDIUM  
**Etki:** RLS bypass riski

#### Tespit Edilen Sorunlar:

**Dosya:** `src/lib/supabase/server.ts:91-99`

```typescript
export const createClient = () => {
  // Server-side client with service role key for admin operations
  return createServerClient<Database>(supabaseUrl, supabaseServiceKey, {
    // ...
  });
};
```

#### Risk Değerlendirmesi:

- ⚠️ Service role key RLS'i bypass eder
- ⚠️ Client-side'da kullanılmamalı
- ⚠️ Sadece admin operations için kullanılmalı
- ⚠️ Kullanım yerleri audit edilmeli

#### Önerilen Çözüm:

- Service role kullanımını sadece admin API routes ile sınırla
- Client/Edge functions'da ASLA kullanma
- Kullanım yerlerini dokümante et
- Alternatif olarak elevated RLS policies kullan

---

### 4. 🟡 SMTP Credentials Güvenliği

**Tehlike Seviyesi:** MEDIUM  
**Etki:** Email hesap ele geçirilmesi riski

#### Tespit Edilen Sorunlar:

**Dosya:** `src/app/api/email/send/route.ts:79-87`

```typescript
const transporter = nodemailer.createTransport({
  host: smtpSettings.smtp_host,
  port: smtpSettings.smtp_port || 587,
  secure: smtpSettings.smtp_secure || false,
  auth: {
    user: smtpSettings.smtp_user,
    pass: smtpSettings.smtp_password, // ⚠️ Password plain text
  },
});
```

#### Risk Değerlendirmesi:

- ⚠️ SMTP credentials API'den geliyorconst
- ⚠️ Şifre encryption kontrolü yok
- ⚠️ Database'de plain text mi encryption mı belirsiz

---

## 📋 DEPLOYMENT ÖNCESİ KONTROL LİSTESİ

### Kritik Güvenlik (Tamamlanmalı):

- [ ] .gemini/ dizinini sil
- [ ] .gitignore'a `.gemini/` ekle
- [ ] Git history'den API key'leri temizle
- [ ] GEMINI_API_KEY'i yenile
- [ ] Tüm API key'leri env vars'a taşı
- [ ] Environment validation scripti ekle
- [ ] Service role kullanımını audit et
- [ ] SMTP credentials encryption kontrol et

### Önerilen (Production için):

- [ ] Secrets manager kullan (AWS Secrets Manager, Vercel Env)
- [ ] API key rotation policy belirle
- [ ] Security headers ekle
- [ ] Rate limiting güçlendir
- [ ] Audit logging aktif et
- [ ] CORS politikalarını gözden geçir

---

## 🔧 HIZLI DÜZELTENostalgia SCRIPT

```bash
# 1. .gemini dizinini temizle
rm -rf .gemini/

# 2. .gitignore'a ekle
echo "" >> .gitignore
echo "# API Keys & Secrets" >> .gitignore
echo ".gemini/" >> .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore

# 3. Git history temizle (DİKKAT: Backup al!)
git filter-repo --path .gemini --invert-paths --force

# 4. API key'i yenile
# Google Cloud Console'dan yeni key al
```

---

## 📊 GÜVENLİK PUANI

| Kategori               | Durum         | Puan        |
| ---------------------- | ------------- | ----------- |
| API Key Management     | 🔴 CRITICAL   | 0/10        |
| Environment Validation | 🟡 NEEDS WORK | 3/10        |
| Secrets Management     | 🟡 NEEDS WORK | 4/10        |
| Access Control         | 🟡 MEDIUM     | 6/10        |
| **GENEL PUAN**         | 🔴            | **3.25/10** |

---

## ⏭️ SONRAKI ADIMLAR

1. **ACİL** - .gemini/ dizinini temizle ve API key'leri yenile
2. **ACİL** - Environment validation ekle
3. **YÜKSEK** - Service role kullanımını audit et
4. **ORTA** - Secrets management sistemi kur
5. **ORTA** - Security monitoring ekle

---

**⚠️ UYARI:** Bu sorunlar çözülmeden production deployment YAPILMAMALIDIR!
