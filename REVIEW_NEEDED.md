# REVIEW NEEDED - Manuel SEO Kararları

## Manuel İnceleme Gereken Route'lar

### 1. LEGAL PAGES - Yasal Sayfalar

#### 1.1 Mevcut Durum

- **Path**: `/{locale}/legal/{page}`
- **Sorun**: Tüm dillerde aynı "legal" prefix'i kullanılıyor
- **SEO Etkisi**: Dil-spesifik olmayan URL yapısı

#### 1.2 Önerilen Çözümler

##### Seçenek A: Dil-Spesifik Prefix'ler

```
TR: /tr/yasal/{page}
EN: /en/legal/{page}
SR: /sr/pravni/{page}
```

**Avantajlar:**

- ✅ Her dil için doğal URL'ler
- ✅ SEO-friendly
- ✅ Kullanıcı deneyimi iyileşir

**Dezavantajlar:**

- ❌ Daha fazla redirect gerekir
- ❌ Navigation complexity artar

##### Seçenek B: Tutarlı "Legal" Prefix

```
TR: /tr/legal/{page}
EN: /en/legal/{page}
SR: /sr/legal/{page}
```

**Avantajlar:**

- ✅ Basit implementasyon
- ✅ Tutarlı yapı
- ✅ Daha az redirect

**Dezavantajlar:**

- ❌ SEO optimizasyonu sınırlı
- ❌ Dil-spesifik değil

#### 1.3 Önerilen Karar

**Seçenek A** önerilir çünkü:

- SEO performansı daha iyi
- Kullanıcı deneyimi daha doğal
- Dil-spesifik URL'ler arama motorları için daha iyi

### 2. ADMIN ROUTES - Yönetim Paneli

#### 2.1 Mevcut Durum

- **Path**: `/{locale}/admin`
- **Sorun**: Admin route'ları public URL'lerde görünüyor
- **SEO Etkisi**: Admin sayfaları arama motorlarında görünebilir

#### 2.2 Önerilen Çözümler

##### Seçenek A: Admin Route'ları Gizle

```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/admin',
      destination: '/admin',
      has: [
        {
          type: 'header',
          key: 'x-admin-access',
          value: 'true'
        }
      ]
    }
  ];
}
```

##### Seçenek B: Admin Route'ları Koruma

```javascript
// middleware.ts
if (pathname.startsWith('/admin')) {
  // Admin access kontrolü
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/tr', request.url));
  }
}
```

#### 2.3 Önerilen Karar

**Seçenek B** önerilir çünkü:

- Mevcut yapıyı korur
- Güvenlik kontrolü sağlar
- SEO sorunlarını çözer

### 3. API ROUTES - API Yolları

#### 3.1 Mevcut Durum

- **Path**: `/api/{endpoint}`
- **Sorun**: API route'ları sitemap'te görünebilir
- **SEO Etkisi**: API endpoint'leri arama motorlarında görünebilir

#### 3.2 Önerilen Çözümler

##### Seçenek A: API Route'ları Sitemap'ten Çıkar

```typescript
// sitemap.ts
const excludePaths = ['/api', '/admin', '/dashboard'];
// API route'ları otomatik olarak exclude edilir
```

##### Seçenek B: Robots.txt ile Engelle

```txt
# robots.txt
Disallow: /api/
```

#### 3.3 Önerilen Karar

**Her iki seçenek de** uygulanmalı çünkü:

- API route'ları SEO için gerekli değil
- Arama motorları API endpoint'lerini indexlememeli
- Güvenlik açısından daha iyi

### 4. PAYMENT ROUTES - Ödeme Yolları

#### 4.1 Mevcut Durum

- **Path**: `/{locale}/payment`
- **Sorun**: Payment route'ları SEO için optimize edilmemiş
- **SEO Etkisi**: Ödeme sayfaları arama motorlarında görünebilir

#### 4.2 Önerilen Çözümler

##### Seçenek A: Payment Route'ları SEO'dan Çıkar

```typescript
// robots.txt
Disallow: /payment/;
```

##### Seçenek B: Payment Route'ları No-Index

```typescript
// payment layout.tsx
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
```

#### 4.3 Önerilen Karar

**Seçenek B** önerilir çünkü:

- Payment sayfaları kullanıcı deneyimi için gerekli
- Arama motorlarında görünmemeli
- No-index daha güvenli

### 5. DASHBOARD ROUTES - Panel Yolları

#### 5.1 Mevcut Durum

- **Path**: `/{locale}/dashboard`
- **Sorun**: Dashboard route'ları public URL'lerde
- **SEO Etkisi**: Kullanıcı paneli arama motorlarında görünebilir

#### 5.2 Önerilen Çözümler

##### Seçenek A: Dashboard Route'ları No-Index

```typescript
// dashboard layout.tsx
export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
```

##### Seçenek B: Dashboard Route'ları Robots.txt ile Engelle

```txt
# robots.txt
Disallow: /dashboard/
```

#### 5.3 Önerilen Karar

**Seçenek A** önerilir çünkü:

- Dashboard sayfaları kullanıcı deneyimi için gerekli
- Arama motorlarında görünmemeli
- No-index daha güvenli

### 6. LEGAL PAGES CONTENT - Yasal Sayfa İçerikleri

#### 6.1 Mevcut Durum

- **Sorun**: Legal sayfaların içerikleri dil-spesifik değil
- **SEO Etkisi**: Duplicate content riski

#### 6.2 Önerilen Çözümler

##### Seçenek A: Legal Sayfaları Dil-Spesifik Yap

```typescript
// legal pages için ayrı layout
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/legal/${page}`,
    },
  };
}
```

##### Seçenek B: Legal Sayfaları Tek Dil Yap

```typescript
// Sadece Türkçe legal sayfalar
// Diğer diller için redirect
```

#### 6.3 Önerilen Karar

**Seçenek A** önerilir çünkü:

- Her dil için uygun içerik
- SEO performansı daha iyi
- Kullanıcı deneyimi daha iyi

### 7. SPECIAL CASES - Özel Durumlar

#### 7.1 Numeroloji Alt Route'ları

- **Mevcut**: `/{locale}/numeroloji/[type]`
- **Sorun**: Type parametreleri SEO-friendly değil
- **Öneri**: Type parametrelerini dil-spesifik yap

#### 7.2 Tarot Alt Route'ları

- **Mevcut**: `/{locale}/tarotokumasi`
- **Sorun**: Alt route'lar yok
- **Öneri**: Tarot türleri için alt route'lar ekle

#### 7.3 Payment Success/Cancel

- **Mevcut**: `/{locale}/payment/success`
- **Sorun**: Success sayfaları SEO için optimize edilmemiş
- **Öneri**: Success sayfaları no-index yap

### 8. IMPLEMENTATION PRIORITY

#### 8.1 Yüksek Öncelik

1. **Legal Pages**: Dil-spesifik URL'ler
2. **Admin Routes**: Güvenlik kontrolü
3. **Payment Routes**: No-index implementation

#### 8.2 Orta Öncelik

1. **Dashboard Routes**: No-index implementation
2. **API Routes**: Sitemap'ten çıkarma
3. **Special Cases**: Alt route optimizasyonu

#### 8.3 Düşük Öncelik

1. **Content Updates**: Legal sayfa içerikleri
2. **Advanced SEO**: Schema markup
3. **Performance**: Core Web Vitals

### 9. DECISION MATRIX

| Route Type       | Current Issue        | Proposed Solution       | Implementation Effort | SEO Impact |
| ---------------- | -------------------- | ----------------------- | --------------------- | ---------- |
| Legal Pages      | Non-localized URLs   | Dil-spesifik prefix'ler | Medium                | High       |
| Admin Routes     | Public visibility    | Access control          | Low                   | Medium     |
| API Routes       | Sitemap inclusion    | Exclude from sitemap    | Low                   | Low        |
| Payment Routes   | SEO visibility       | No-index                | Low                   | Medium     |
| Dashboard Routes | SEO visibility       | No-index                | Low                   | Medium     |
| Special Cases    | Missing optimization | Route optimization      | High                  | Low        |

### 10. NEXT STEPS

#### 10.1 Immediate Actions

1. **Legal Pages**: Dil-spesifik URL implementasyonu
2. **Admin Routes**: Güvenlik kontrolü ekleme
3. **Payment Routes**: No-index implementation

#### 10.2 Short-term Actions

1. **Dashboard Routes**: No-index implementation
2. **API Routes**: Sitemap exclusion
3. **Content Updates**: Legal sayfa içerikleri

#### 10.3 Long-term Actions

1. **Advanced SEO**: Schema markup
2. **Performance**: Core Web Vitals optimization
3. **Monitoring**: SEO performance tracking

Bu review, Büşbüşkiki projesinin SEO optimizasyonu için gerekli manuel kararları
belirler ve implementasyon önceliklerini sıralar.
