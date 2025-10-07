# 🔧 Patch Dosyalarını Uygulama Kılavuzu

Bu dizindeki patch dosyaları `src/app/[locale]/(main)/cards/page.tsx` dosyasını production-ready hale getirmek için hazırlanmıştır.

## 📦 Patch Dosyaları

1. **001-add-missing-translations.patch**
   - Hardcoded string'leri translation objesine ekler
   - Yeni i18n key'leri: `cardsCount`, `majorArcanaCount`, `minorArcanaCount`, vb.
   - Tüm ternary operator'lı string'leri translation'a çevirir

2. **002-card-name-mapping.patch**
   - Yeni dosya: `src/lib/tarot/card-names.ts` oluşturur
   - 78 kartın tamamı için tr/en/sr isimlendirmesi
   - `getCardName()` fonksiyonunu localize eder

3. **003-extract-card-utils.patch**
   - Yeni dosya: `src/lib/tarot/card-utils.ts` oluşturur
   - Card URL, image path ve data generation utility'lerini ayırır
   - Magic number'ları constant'lara çevirir
   - Code duplication'ı azaltır

4. **004-add-static-params.patch**
   - `generateStaticParams()` fonksiyonu ekler
   - Build time'da 3 statik sayfa oluşturur (tr/en/sr)
   - SSG optimization'ı sağlar

## 🚀 Uygulama Adımları

### Seçenek 1: Tüm Patch'leri Aynı Anda Uygula

```bash
cd /Users/tugi/Desktop/TaraTarot

# Tüm patch'leri sırayla uygula
git apply i18nfix/patches/001-add-missing-translations.patch
git apply i18nfix/patches/002-card-name-mapping.patch
git apply i18nfix/patches/003-extract-card-utils.patch
git apply i18nfix/patches/004-add-static-params.patch
```

### Seçenek 2: Tek Tek Manuel Uygula

Her patch'i önce kontrol edin:

```bash
# Patch'i kontrol et (uygulamadan önce)
git apply --check i18nfix/patches/001-add-missing-translations.patch

# Eğer hata yoksa uygula
git apply i18nfix/patches/001-add-missing-translations.patch
```

### Seçenek 3: Manuel Kopyala-Yapıştır

Eğer patch dosyaları çalışmazsa:

1. `i18nfix/patches/` içindeki dosyaları açın
2. `diff` formatından değişiklikleri manuel olarak uygulayın
3. Yeni dosyalar için (card-names.ts, card-utils.ts) içeriği kopyalayıp yeni dosya oluşturun

## ✅ Uygulama Sonrası Kontroller

### 1. TypeScript Kontrolü

```bash
npm run type-check
# veya
npx tsc --noEmit
```

**Beklenen Sonuç:** ✅ No type errors

### 2. Build Testi

```bash
npm run build
```

**Beklenen Sonuç:** ✅ Build successful

### 3. Manuel Test

```bash
npm run dev

# Tarayıcıda test et:
# - http://localhost:3000/tr/kartlar
# - http://localhost:3000/en/cards
# - http://localhost:3000/sr/kartice
```

**Kontrol Listesi:**
- [ ] Sayfa yükleniyor
- [ ] Tüm kartlar görüntüleniyor
- [ ] Card hover effects çalışıyor
- [ ] Card name'ler localize edilmiş
- [ ] Image'ler doğru yükleniyor
- [ ] Links doğru yönlendiriyor

### 4. i18n Kontrolü

Her lokalde test edin:

```bash
# TR'de badge'ler "Toplam 78 Kart" göstermeli
# EN'de "Total 78 Cards" göstermeli
# SR'de "Ukupno 78 Karata" göstermeli
```

## 🐛 Sorun Giderme

### Patch Uygulanamıyor Hatası

```bash
error: patch failed: src/app/[locale]/(main)/cards/page.tsx:270
```

**Çözüm:**
1. Dosya zaten değiştirilmiş olabilir
2. Manuel olarak değişiklikleri uygulayın
3. Veya dosyayı git'ten reset edip tekrar deneyin:
   ```bash
   git checkout src/app/[locale]/(main)/cards/page.tsx
   git apply i18nfix/patches/001-*.patch
   ```

### TypeScript Import Hataları

```typescript
Module '"@/lib/tarot/card-names"' not found
```

**Çözüm:**
1. Patch 002 uygulandı mı kontrol edin
2. `src/lib/tarot/` dizininin var olduğundan emin olun
3. TypeScript cache'i temizleyin:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Build Hatası

```bash
Error: Page [...] is missing exported function "generateStaticParams"
```

**Çözüm:**
- Patch 004'ü uygulayın
- Next.js config'de `output: 'export'` varsa static export'u kontrol edin

## 📊 Patch Sonrası Beklenen Sonuçlar

### Code Quality
- ✅ Hardcoded strings: 0 (tümü i18n'e taşındı)
- ✅ Magic numbers: 0 (constant'lara çevrildi)
- ✅ Large functions: Refactor edildi
- ✅ Code duplication: Azaltıldı

### i18n Coverage
- ✅ TR: %100
- ✅ EN: %100
- ✅ SR: %100

### Deploy Readiness
- ✅ TypeScript: Pass
- ✅ Build: Pass
- ✅ Static Generation: Enabled
- ✅ Security: Pass

## 🎉 Tamamlandı!

Tüm patch'ler başarıyla uygulandığında:

```bash
# Son kontrol
npm run build

# Eğer başarılı:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages (3/3)
```

**Artık dosya %100 production-ready! 🚀**

## 📝 Notlar

- Patch dosyaları idempotent değildir (2 kez uygulayamazsınız)
- Eğer dosyada manuel değişiklik yaptıysanız, önce commit edin
- Patch'ler `git diff` formatındadır, `patch` komutu ile de uygulanabilir:
  ```bash
  patch -p1 < i18nfix/patches/001-add-missing-translations.patch
  ```

## 🆘 Yardım

Sorun yaşarsanız:

1. `i18nfix/reports/src-app-locale-main-cards-page.md` dosyasını kontrol edin
2. Her patch'in ne yaptığını inceleyin
3. Manuel olarak değişiklikleri uygulayın

---

**Oluşturulma Tarihi:** 2025-10-07  
**Hedef Dosya:** `src/app/[locale]/(main)/cards/page.tsx`

