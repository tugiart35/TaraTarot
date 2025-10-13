# GitHub Secrets Kurulum Rehberi

## 🔐 GitHub Secrets Nedir?

GitHub Secrets, hassas bilgileri (API keys, tokens, passwords) güvenli bir şekilde saklamanıza ve CI/CD pipeline'larında kullanmanıza olanak sağlar. Bu bilgiler şifrelenir ve asla loglar'da görünmez.

---

## 📋 Gerekli Secrets Listesi

### 1. Vercel Deployment (ÖNERİLEN)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 2. Docker Hub (Opsiyonel - self-hosting için)
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

### 3. Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Opsiyonel (Gelişmiş)
- `CODECOV_TOKEN` (test coverage)
- `SNYK_TOKEN` (security scanning)

---

## 🚀 ADIM 1: Vercel Token ve Project Bilgileri

### A. Vercel Token Alma

1. **Vercel'e Giriş Yapın**
   - https://vercel.com/login adresine gidin
   - GitHub hesabınızla giriş yapın

2. **Settings'e Gidin**
   - Sağ üst köşedeki profil fotoğrafınıza tıklayın
   - "Settings" seçeneğine tıklayın

3. **Token Oluşturun**
   - Sol menüden **"Tokens"** sekmesine gidin
   - **"Create"** butonuna tıklayın
   - Token için bir isim verin (örn: "TaraTarot GitHub Actions")
   - **Scope** seçin: "Full Account" veya belirli projeler
   - **Expiration**: Genellikle "No Expiration" (güvenlik için 90 gün de seçebilirsiniz)
   - **"Create Token"** butonuna tıklayın
   - ⚠️ **Token'ı kopyalayın ve güvenli bir yere kaydedin!** (Bir daha gösterilmez)

### B. Vercel Organization ID

1. **Vercel Dashboard**'a gidin
   - https://vercel.com/dashboard

2. **Settings'e Gidin**
   - Sol menüden **"Settings"** seçeneğine tıklayın

3. **Organization ID'yi Bulun**
   - **"General"** sekmesinde
   - **"Organization ID"** başlığı altında ID'yi göreceksiniz
   - Örnek: `team_xxxxxxxxxxxxxxxxxxxxxxxx`
   - Kopyalayın

### C. Vercel Project ID

**Yöntem 1: Proje zaten Vercel'de varsa**

1. Vercel Dashboard'da projenize gidin
2. **Settings** → **General** sekmesine gidin
3. **"Project ID"** bölümünde ID'yi bulun
4. Örnek: `prj_xxxxxxxxxxxxxxxxxxxxxxxx`
5. Kopyalayın

**Yöntem 2: Proje henüz Vercel'de yoksa**

```bash
# Vercel CLI ile proje oluştur
npm i -g vercel
vercel login
vercel link

# Project ID'yi göster
vercel project ls
```

Veya proje oluşturduktan sonra Yöntem 1'i kullanın.

---


## 🗄️ ADIM 3: Supabase Credentials

### Supabase URL ve Anon Key Bulma

1. **Supabase Dashboard**
   - https://app.supabase.com/projects adresine gidin
   - Projenizi seçin

2. **Settings → API**
   - Sol menüden **"Settings"** ikonuna tıklayın
   - **"API"** sekmesine gidin

3. **Bilgileri Kopyalayın**
   - **Project URL**: `https://xxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (uzun bir JWT token)
   - **service_role key** (opsiyonel, admin işlemler için)

---

## ⚙️ ADIM 4: GitHub'a Secrets Ekleme

### A. Repository'ye Gidin

1. GitHub'da TaraTarot repository'nizi açın
2. Üst menüden **"Settings"** sekmesine tıklayın

### B. Secrets Sayfasına Gidin

1. Sol menüden **"Secrets and variables"** → **"Actions"** seçeneğine tıklayın
2. **"New repository secret"** butonunu göreceksiniz

### C. Her Secret'ı Tek Tek Ekleyin

#### 1. VERCEL_TOKEN
```
Name: VERCEL_TOKEN
Secret: [Adım 1A'da aldığınız token]
```
**"Add secret"** butonuna tıklayın

#### 2. VERCEL_ORG_ID
```
Name: VERCEL_ORG_ID
Secret: [Adım 1B'de bulduğunuz org ID]
```

#### 3. VERCEL_PROJECT_ID
```
Name: VERCEL_PROJECT_ID
Secret: [Adım 1C'de bulduğunuz project ID]
```

#### 4. DOCKER_USERNAME (Opsiyonel)
```
Name: DOCKER_USERNAME
Secret: [Docker Hub kullanıcı adınız]
```

#### 5. DOCKER_PASSWORD (Opsiyonel)
```
Name: DOCKER_PASSWORD
Secret: [Adım 2B'de oluşturduğunuz access token]
```

#### 6. NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Secret: [Adım 3'te bulduğunuz Supabase URL]
```

#### 7. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Secret: [Adım 3'te bulduğunuz anon key]
```

---

## ✅ ADIM 5: Doğrulama

### Secrets'ların Eklendiğini Kontrol Edin

1. GitHub → Settings → Secrets and variables → Actions
2. Tüm secrets'ları listelemelisiniz:
   ```
   ✓ VERCEL_TOKEN
   ✓ VERCEL_ORG_ID
   ✓ VERCEL_PROJECT_ID
   ✓ DOCKER_USERNAME (opsiyonel)
   ✓ DOCKER_PASSWORD (opsiyonel)
   ✓ NEXT_PUBLIC_SUPABASE_URL
   ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

### Test Deployment

1. **Workflow'u Tetikleyin**
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

2. **Actions Sekmesini İzleyin**
   - GitHub → Actions sekmesine gidin
   - En son workflow çalışmasını açın
   - Tüm job'ların başarılı olmasını bekleyin

3. **Deployment'ı Kontrol Edin**
   - Vercel dashboard'da yeni deployment görünmeli
   - Docker Hub'da yeni image pushlandi mı kontrol edin

---

## 🔒 Güvenlik Notları

### ✅ Yapılması Gerekenler
- ✅ Secrets'ları asla kod içine yazmayın
- ✅ .env dosyalarını .gitignore'a ekleyin
- ✅ Token'ları düzenli olarak yenileyin (90 günde bir)
- ✅ Minimum gerekli izinleri verin

### ❌ Yapılmaması Gerekenler
- ❌ Secrets'ları commit etmeyin
- ❌ Secrets'ları console.log ile loglamayın
- ❌ Secrets'ları public'e açık dosyalara koymayın
- ❌ Eski token'ları iptal etmeyi unutmayın

---

## 🐛 Troubleshooting

### Problem: "Error: Vercel token is not valid"
**Çözüm:**
- Token'ı yeniden oluşturun
- Kopyalarken boşluk bırakmadığınızdan emin olun
- Token scope'unun yeterli olduğunu kontrol edin

### Problem: "Error: Project not found"
**Çözüm:**
- VERCEL_PROJECT_ID doğru mu kontrol edin
- Vercel'de proje linki yapıldı mı kontrol edin
- Organization ID doğru mu kontrol edin

### Problem: Docker push fails
**Çözüm:**
- Docker Hub'da repository oluşturuldu mu?
- Access token'ın Write izni var mı?
- Username doğru yazıldı mı? (case-sensitive)

### Problem: Supabase connection error
**Çözüm:**
- URL'in sonunda `/` olmamalı
- Anon key'in tamamını kopyaladığınızdan emin olun
- Supabase projesinin aktif olduğunu kontrol edin

---

## 📝 Hızlı Kontrol Listesi

Deployment öncesi şu soruları kendinize sorun:

- [ ] Vercel hesabım var mı?
- [ ] Vercel token oluşturdum mu?
- [ ] Organization ID'yi buldum mu?
- [ ] Project ID'yi buldum mu?
- [ ] Docker Hub hesabım var mı? (opsiyonel)
- [ ] Docker access token oluşturdum mu? (opsiyonel)
- [ ] Supabase URL ve anon key'i aldım mı?
- [ ] Tüm secrets'ları GitHub'a ekledim mi?
- [ ] Secrets'ların doğru girildiğinden emin miyim?
- [ ] Test deployment yaptım mı?

---

## 🎯 Alternatif: Sadece Vercel Deployment

Eğer Docker kullanmayacaksanız (sadece Vercel):

**Minimum Gerekli Secrets:**
1. `VERCEL_TOKEN`
2. `VERCEL_ORG_ID`
3. `VERCEL_PROJECT_ID`
4. `NEXT_PUBLIC_SUPABASE_URL`
5. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Docker secrets'larını şimdilik atlayabilirsiniz.

---

## 📞 Yardıma İhtiyacınız Varsa

1. **Vercel Docs**: https://vercel.com/docs/concepts/projects/environment-variables
2. **GitHub Secrets Docs**: https://docs.github.com/en/actions/security-guides/encrypted-secrets
3. **Docker Hub Tokens**: https://docs.docker.com/docker-hub/access-tokens/

---

## ✨ Başarılı Kurulum Sonrası

Secrets doğru kurulduysa:

1. ✅ Her PR → Preview deployment
2. ✅ Main branch push → Production deployment
3. ✅ Otomatik health checks
4. ✅ Docker image build & push (opsiyonel)

**Tebrikler! CI/CD pipeline'ınız tamamen hazır! 🎉**

---

## ✅ DEPLOYMENT DURUMU - GÜNCELLENDİ

### 📦 Git Push Durumu: ✅ BAŞARILI
```
Tarih: 2025-10-13
Commit: 9576b87
Mesaj: Add CI/CD pipeline and Docker configuration
Branch: main → origin/main
Durum: ✅ PUSHED TO GITHUB
Dosyalar: 9 files changed, 2170 insertions(+)
```

### 🎯 ŞİMDİ YAPMANIZ GEREKENLER:

#### 1️⃣ GitHub Actions'ı Kontrol Edin (HEMEN YAPIN)
```
URL: https://github.com/tugiart35/TaraTarot/actions
```
- "Add CI/CD pipeline and Docker configuration" workflow'unu bulun
- ⚠️ **İlk çalıştırma muhtemelen BAŞARISIZ olacak**
- **Sebep:** Secrets henüz eklenmedi (Bu NORMAL ve beklenen bir durumdur!)
- **Endişelenmeyin:** Secrets ekledikten sonra tekrar çalıştıracağız

#### 2️⃣ GitHub Secrets'ları Ekleyin (ÖNCELİKLİ)

**Zorunlu Secrets (Minimum):**
```
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Nasıl Ekleyeceğiniz:**
- Bu dosyanın yukarısındaki adımları takip edin
- Her secret için "New repository secret" butonunu kullanın
- https://github.com/tugiart35/TaraTarot/settings/secrets/actions

#### 3️⃣ Secrets Eklendikten Sonra Workflow'u Tekrar Çalıştırın

**Yöntem 1: GitHub UI'da**
```
1. https://github.com/tugiart35/TaraTarot/actions
2. Başarısız olan workflow'a tıklayın
3. "Re-run all jobs" butonuna tıklayın
```

**Yöntem 2: Yeni Commit (Daha Kolay)**
```bash
git commit --allow-empty -m "Trigger CI after adding secrets"
git push origin main
```

#### 4️⃣ Başarılı Deployment'ı Doğrulayın

**Kontrol Listesi:**
- ✅ GitHub Actions'da tüm jobs yeşil olmalı
- ✅ Build başarılı olmalı
- ✅ Tests geçmeli
- ✅ Vercel dashboard'da yeni deployment görünmeli
- ✅ Siteniz canlı olmalı!

---

## 🚨 İlk Workflow Hatasını Giderme

### Beklenen Hata Mesajları:

```
❌ Error: Input required and not supplied: token
❌ Error: Unable to deploy to Vercel
❌ Error: Environment variable not set
```

### ✅ Çözüm:
1. Yukarıdaki adımları takip ederek secrets'ları ekleyin
2. Workflow'u tekrar çalıştırın
3. Her şey hazır! 🎉

---

## 📊 Başarı Kriterleri

Deployment başarılı olduğunda göreceğiniz şeyler:

✅ **GitHub Actions:**
- Code Quality: ✓ Passed
- Tests: ✓ Passed
- Build: ✓ Passed
- Deploy: ✓ Passed

✅ **Vercel Dashboard:**
- Yeni deployment görünür
- Status: Ready
- Domain aktif

✅ **Site Kontrolü:**
- https://taratarot.com → Açılıyor
- /tr → Çalışıyor
- /en → Çalışıyor
- /sr → Çalışıyor

---

## 🎯 ÖZET: Yapılacaklar Listesi

1. [x] ~~CI/CD dosyalarını oluştur~~ ✅ TAMAMLANDI
2. [x] ~~Git'e commit et~~ ✅ TAMAMLANDI
3. [x] ~~GitHub'a push et~~ ✅ TAMAMLANDI
4. [ ] GitHub Actions'ı kontrol et ⬅️ **ŞİMDİ BURADASINIZ**
5. [ ] Secrets'ları ekle (Vercel, Supabase)
6. [ ] Workflow'u tekrar çalıştır
7. [ ] Deployment'ı doğrula
8. [ ] Kutla! 🎉

**Başarılar! Neredeyse bitti! 🚀**
