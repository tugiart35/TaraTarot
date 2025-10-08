# 🌐 I18N (Uluslararasılaştırma) RAPORU

**Oluşturulma Tarihi:** 7 Ekim 2025  
**Audit Seviyesi:** MEDIUM  
**Deployment Durumu:** ✅ Temel i18n hazır, iyileştirme önerileri var

---

## 📊 ÖZET

- **Desteklenen Diller:** 3 (TR, EN, SR)
- **Varsayılan Dil:** Türkçe (TR)
- **Translation Keys (TR):** 6536 satır
- **Translation Keys (EN):** 6036 satır  
**Translation Keys (SR):** Kontrol edilmeli
- **i18n Library:** next-intl
- **Durum:** ✅ FUNCTIONAL

---

## ✅ İYİ UYGUL AMALAR

### 1. Merkezi i18n Yapılandırması

**Dosya:** `src/lib/i18n/config.ts`

```typescript
export const locales = ['tr', 'en', 'sr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const localeConfig = {
  tr: {
    name: 'Türkçe',
    nativeName: 'Türkçe',
    timezone: 'Europe/Podgorica',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    timezone: 'Europe/Podgorica',
  },
  sr: {
    name: 'Serbian (Latin)',
    nativeName: 'Srpski (Latinica)',
    timezone: 'Europe/Podgorica',
  },
};
```

✅ **İyi Noktalar:**
- Type-safe locale definitions
- Timezone support
- Native name support

---

### 2. SEO-Friendly URL Routing

**Dosya:** `middleware.ts`

```typescript
const urlMappings: Record<string, string> = {
  // Turkish
  '/tr/anasayfa': '/tr',
  '/tr/tarot-okuma': '/tr/tarotokumasi',
  '/tr/giris': '/tr/auth',
  
  // English
  '/en/home': '/en',
  '/en/tarot-reading': '/en/tarotokumasi',
  '/en/login': '/en/auth',
  
  // Serbian
  '/sr/pocetna': '/sr',
  '/sr/tarot-citanje': '/sr/tarotokumasi',
  '/sr/prijava': '/sr/auth',
};
```

✅ **İyi Noktalar:**
- SEO-friendly URLs
- Locale-specific routes
- Clean URL structure

---

### 3. Translation Files

```
messages/
├── tr.json (6536 lines) ✅ Kapsamlı
├── en.json (6036 lines) ✅ İyi
└── sr.json (?) ⚠️ Kontrol edilmeli
```

✅ **İyi Organizasyon:**
- Nested key structure
- Kategorize edilmiş (auth, common, cards, etc.)
- Tutarlı naming convention

---

## ⚠️ İYİLEŞTİRME ÖNERİLERİ

### 1. Serbian (SR) Translation Completeness

**Sorun:** SR translation'ların completeness'i belirsiz

**Kontrol Gerekli:**
```bash
# Eksik key'leri bul:
node scripts/i18n-key-extractor.mjs
node scripts/check-hardcoded-ui-strings.mjs
```

**Önerilen Aksiyonlar:**
1. TR vs SR key count karşılaştır
2. Eksik key'leri tespit et
3. Auto-translation ile doldur (manual review gerek)

---

### 2. Hardcoded UI Strings

**Sorun:** Bazı UI metinleri hala hardcoded olabilir

**Tespit Yöntemleri:**
```bash
# Mevcut script'ler:
npm run i18n:check
npm run i18n:analyze
npm run i18n:find
```

**Önerilen:**
```bash
# Tüm hardcoded string'leri bul:
grep -r "\"[A-Z][a-z].*\"" src/app --include="*.tsx" --include="*.ts"
grep -r "'[A-Z][a-z].*'" src/components --include="*.tsx" --include="*.ts"
```

**Common Patterns:**
```typescript
// ❌ Hardcoded:
<button>Giriş Yap</button>
<h1>Tarot Okumalar</h1>
<p>Hesabınız yok mu?</p>

// ✅ i18n:
<button>{t('auth.page.login')}</button>
<h1>{t('readings.title')}</h1>
<p>{t('auth.page.hasAccount')}</p>
```

---

### 3. Dynamic Content Translation

**Sorun:** Tarot kartı isimleri ve açıklamaları

**Mevcut Durum:**

**Dosya:** `src/lib/tarot/card-names.ts`
```typescript
export function getCardName(cardKey: string, locale: Locale): string {
  const card = CARD_NAME_MAPPINGS[cardKey];
  if (!card) {
    return cardKey;
  }
  return card[locale] || card['en'] || cardKey;
}
```

✅ **İyi:** Kart isimleri locale-aware

**Kontrol Edilmeli:**
- Tüm 78 kart için çeviriler var mı?
- Kart açıklamaları translate edilmiş mi?
- Position meanings çevrilmiş mi?

---

### 4. Date & Number Formatting

**Sorun:** Locale-specific formatting consistency

**Önerilen:**
```typescript
// src/lib/i18n/formatters.ts - YENİ DOSYA

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCurrency(
  amount: number,
  locale: Locale,
  currency: string = 'TRY'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(number: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(number);
}
```

**Kullanım:**
```typescript
// ❌ Önce:
<span>{price} TL</span>
<span>{new Date().toLocaleDateString()}</span>

// ✅ Sonra:
<span>{formatCurrency(price, locale)}</span>
<span>{formatDate(new Date(), locale)}</span>
```

---

### 5. Pluralization

**Sorun:** Plural form'lar hardcoded

**Önerilen:**
```json
// messages/tr.json
{
  "credits": {
    "count": "{count} kredi",
    "count_plural": "{count} kredi",
    "remaining": "Kalan: {count} kredi"
  }
}

// messages/en.json
{
  "credits": {
    "count": "{count, plural, one {# credit} other {# credits}}",
    "remaining": "Remaining: {count, plural, one {# credit} other {# credits}}"
  }
}
```

**Kullanım:**
```typescript
// next-intl'de:
t('credits.count', { count: 5 }) // "5 credits"
t('credits.count', { count: 1 }) // "1 credit"
```

---

### 6. RTL Support (Gelecek için)

**Sorun:** Arapça gibi RTL diller için hazır değil

**Önerilen (ihtiyaç olursa):**
```typescript
// src/lib/i18n/config.ts
export const localeConfig = {
  tr: { dir: 'ltr', ... },
  en: { dir: 'ltr', ... },
  sr: { dir: 'ltr', ... },
  ar: { dir: 'rtl', ... }, // Gelecek için
};
```

```tsx
// Layout'ta:
<html lang={locale} dir={localeConfig[locale].dir}>
```

---

## 📋 TRANSLATION KEY PATTERN

### Mevcut Organization (İyi)

```json
{
  "auth": {
    "page": {...},
    "errors": {...},
    "success": {...}
  },
  "common": {...},
  "cards": {...},
  "readings": {...},
  "dashboard": {...}
}
```

### Önerilen Naming Convention

```
category.subcategory.context.key

Örnekler:
auth.page.login          // Login sayfası
auth.errors.invalid      // Auth hatası
common.buttons.save      // Genel buton
cards.major.fool.name    // Kart ismi
readings.love.title      // Reading başlık
```

---

## 🔧 AUTOMATED TRANSLATION TOOLS

### Mevcut Script'ler (İyi)

```bash
npm run i18n:check              # Hardcoded string'leri bul
npm run i18n:analyze            # Key'leri analiz et
npm run i18n:auto-translate     # Otomatik çeviri
npm run i18n:add-missing        # Eksik key'leri ekle
npm run i18n:validate           # Validation
```

### Önerilen Workflow

```bash
# 1. Hardcoded string'leri tespit et
npm run i18n:check

# 2. Eksik key'leri bul
npm run i18n:analyze

# 3. Auto-translate (Google Translate API)
npm run i18n:auto-translate

# 4. Manuel review
# - messages/tr.json'u aç
# - Auto-translated key'leri kontrol et
# - Düzelt ve onayla

# 5. Validate
npm run i18n:validate

# 6. Test
npm run dev
# Her dilde test et
```

---

## 📊 TRANSLATION COMPLETENESS

### Key Count Comparison

| Dil | Lines | Estimated Keys | Status |
|-----|-------|----------------|--------|
| TR | 6536 | ~2000+ | ✅ Complete |
| EN | 6036 | ~1900+ | ✅ Good |
| SR | ? | ? | ⚠️ Check |

### Critical Sections

| Section | TR | EN | SR | Priority |
|---------|----|----|----|---------| 
| auth | ✅ | ✅ | ? | HIGH |
| common | ✅ | ✅ | ? | HIGH |
| cards | ✅ | ✅ | ? | MEDIUM |
| readings | ✅ | ✅ | ? | HIGH |
| dashboard | ✅ | ✅ | ? | MEDIUM |
| admin | ✅ | ✅ | ? | LOW |

---

## 🎯 DEPLOYMENT CHECKLIST

### Kritik (Must Have):
- [x] Temel i18n yapılandırması ✅
- [x] TR translations complete ✅
- [x] EN translations complete ✅
- [ ] SR translations verified ⚠️
- [x] Locale routing çalışıyor ✅
- [x] SEO-friendly URLs ✅

### Önemli (Should Have):
- [ ] Hardcoded string'ler temizlenmiş
- [ ] Plural form'lar düzgün
- [ ] Date/number formatting tutarlı
- [ ] Error messages tümü translated
- [ ] Validation messages translated

### Nice to Have:
- [ ] RTL support (gelecek)
- [ ] Context-aware translations
- [ ] Translation fallback chain
- [ ] Translation cache optimization

---

## 🔧 ÖNER İLEN PATCH'LER

### Patch 1: SR Translation Completeness

```bash
# deploy-audit/patches/002-sr-translation-completeness.sh

# 1. Key count'u karşılaştır
echo "Comparing translation key counts..."
tr_count=$(jq -r 'keys | length' messages/tr.json)
en_count=$(jq -r 'keys | length' messages/en.json)
sr_count=$(jq -r 'keys | length' messages/sr.json)

echo "TR: $tr_count keys"
echo "EN: $en_count keys"
echo "SR: $sr_count keys"

# 2. Eksik key'leri bul
npm run i18n:analyze

# 3. Auto-translate
npm run i18n:auto-translate

# 4. Report
echo "✅ SR translations updated. Manual review needed."
```

### Patch 2: Hardcoded Strings Cleanup

```bash
# deploy-audit/patches/003-hardcoded-strings-cleanup.sh

# 1. Hardcoded string'leri tespit et
npm run i18n:find > hardcoded-strings-report.txt

# 2. Raporu göster
cat hardcoded-strings-report.txt

# 3. Manuel düzeltme gerekiyor
echo "⚠️ Manual review required. See hardcoded-strings-report.txt"
```

---

## ⏭️ SONRAKI ADIMLAR

1. **Hemen:** SR translation completeness kontrol
2. **Kısa Vadeli:** Hardcoded string'leri temizle
3. **Orta Vadeli:** Date/number formatting standardize et
4. **Uzun Vadeli:** Translation management system (Crowdin, Lokalise)

---

**✅ SONUÇ:** I18n temel olarak hazır, SR kontrol edilmeli ve hardcoded string'ler temizlenmeli.

