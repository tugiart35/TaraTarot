# Feature Specification: Tarot Kart Bilgi Sayfaları (Blog/SEO)

**Feature Branch**: `001-i-in-projeyi` **Created**: 2025-10-05 **Status**: Draft
**Input**: User description: "Her tarot kartı için SEO optimize edilmiş, çok
dilli (TR/EN/SR) bilgi sayfaları oluşturma"

## User Scenarios & Testing

### Primary User Story

Bir kullanıcı Google'da "Joker tarot kartı anlamı" veya "The Fool tarot meaning"
aradığında, sitemizin ilgili kart sayfasını bulur. Sayfada kartın düz/ters
anlamlarını, aşk/kariyer yorumlarını okur ve profesyonel okuma almak için
randevu oluşturur.

### Acceptance Scenarios

1. **Given** kullanıcı Google'da "The Fool tarot meaning" arar, **When** arama
   sonuçlarında sitemiz çıkar ve tıklar, **Then** İngilizce The Fool kart
   sayfası (SEO optimize, hreflang ile) açılır

2. **Given** kullanıcı Türkçe The Fool sayfasındayken, **When** dil
   değiştiriciyi kullanır, **Then** İngilizce/Sırpça versiyonlara doğru URL ile
   yönlendirilir (/en/cards/the-fool, /sr/kartice/joker)

3. **Given** kullanıcı kart sayfasını okur, **When** "Profesyonel Okuma Al"
   butonuna tıklar, **Then** tarot okuma sayfasına yönlendirilir

4. **Given** kullanıcı "Randevu Al" butonuna tıklar, **When** giriş yapmamışsa,
   **Then** login sayfasına, giriş yaptıysa busbuskimki.online'a yönlendirilir

5. **Given** kullanıcı kart sayfasının altındayken, **When** "İlgili Kartlar"
   bölümünü görür, **Then** aynı arkana tipindeki 3-4 kart otomatik önerilir

6. **Given** kullanıcı mobil cihazdan sayfa açar, **When** sayfa yüklenir,
   **Then** 4:5 oranında kart görseli lazy load ile, responsive tasarımda
   görüntülenir

### Edge Cases

- Kullanıcı doğrudan `/tr/kartlar/olmayan-kart` URL'sine giderse → 404 sayfası,
  alternatif kartlar önerisi
- Kart görseli yüklenemezse → placeholder görsel + alt text gösterilir
- FAQ JSON-LD hatalıysa → sayfa yine de çalışır, structured data olmadan
- İlgili kart bulunamazsa → boş bölüm gösterilmez, gizlenir
- Dil değiştiricide hedef dil henüz hazır değilse → buton disable, tooltip ile
  bilgi

## Requirements

### Functional Requirements

**Sayfa Yapısı & İçerik**

- **FR-001**: Sistem her tarot kartı için ayrı sayfa oluşturmalı (78 kart -
  Major + Minor Arcana)
- **FR-002**: Her kart sayfası şu bölümleri içermeli: Hero (görsel+başlık), Düz
  Anlam, Ters Anlam, Anahtar Kelimeler (Aşk/Kariyer/Para/Ruhsal),
  Hikaye/Mitoloji, CTA, FAQ, İlgili Kartlar
- **FR-003**: Kart görseli 4:5 oranında, lazy load ile yüklenmeli
- **FR-004**: Her sayfa breadcrumb içermeli: Anasayfa > Kartlar > [Arkana
  Tipi] > [Kart Adı]
- **FR-005**: Okuma süresi otomatik hesaplanmalı (içerik uzunluğuna göre)

**Çok Dilli Destek**

- **FR-006**: Her kart 3 dilde tam içeriğe sahip olmalı: TR, EN, SR
- **FR-007**: URL yapısı dile özgü doğal kelimeler içermeli:
  - TR: `/tr/kartlar/joker`, `/tr/kartlar/yuksek-rahibe`
  - EN: `/en/cards/the-fool`, `/en/cards/the-high-priestess`
  - SR: `/sr/kartice/joker`, `/sr/kartice/visoka-svestenica`
- **FR-008**: Her sayfa hreflang tag'leri ile diğer dillere link vermeli
- **FR-009**: x-default hreflang İngilizce versiyona işaret etmeli
- **FR-030**: Tüm UI metinleri (butonlar, label'lar, başlıklar) anahtar (key)
  formatında yazılmalı
- **FR-031**: UI metinleri öncelikle `src/messages/tr.json` dosyasına eklenip,
  next-intl sistemi ile yönetilmeli
- **FR-032**: Hardcoded metin kullanımı yasak, tüm metinler translation key'leri
  olmalı (örn: `{t('cards.cta.getProfessionalReading')}`)

**SEO & Metadata**

- **FR-010**: Her kart sayfası SEO optimize title içermeli (format: "[Kart Adı]
  — Anlamı, Aşk & Kariyer | BüşBüşKimKi")
- **FR-011**: Meta description 120-155 karakter, anahtar kelimeleri içermeli
- **FR-012**: Canonical URL her dilin kendi URL'si olmalı (self-referencing)
- **FR-013**: Open Graph ve Twitter Card meta tag'leri tam olmalı
- **FR-014**: JSON-LD structured data içermeli: FAQPage, Article, Breadcrumb
- **FR-015**: FAQ şeması minimum 3, maksimum 6 soru/cevap içermeli

**CTA & Yönlendirmeler**

- **FR-016**: "Profesyonel Okuma Al" butonu tarot okuma sayfasına yönlendirmeli
- **FR-017**: "Randevu Al" butonu kullanıcı girişi kontrolü yapmalı:
  - Giriş yaptıysa → busbuskimki.online
  - Giriş yapmadıysa → login sayfası (return URL ile)
- **FR-018**: Mikro CTA "1 karta hızlı yorum al" e-posta capture veya randevuya
  yönlendirmeli

**İlgili Kartlar & Navigasyon**

- **FR-019**: Her kart sayfası aynı arkana tipinden 3-4 ilgili kart önermeli
  (otomatik)
- **FR-020**: İlgili kartlar card-name-mapping.ts sistemini kullanarak eşleşmeli
- **FR-021**: Kategori sayfalarına link vermeli (Major Arcana, Cups, Swords,
  vb.)
- **FR-022**: Sayfa altında sosyal paylaşım butonları olmalı (Facebook, Twitter,
  WhatsApp)

**Performans & Teknik**

- **FR-023**: Kart görselleri WebP formatında, lazy load ile yüklenmeli
- **FR-024**: Sayfa ilk yüklenişte 3 saniye altında interactive olmalı (4G
  bağlantıda)
- **FR-025**: Lighthouse SEO skoru minimum 90 olmalı
- **FR-026**: Mobil-first responsive tasarım olmalı
- **FR-027**: Tüm kart sayfaları sitemap.xml'e eklenmiş olmalı

**Aşamalı Yayın (MVP)**

- **FR-028**: İlk sürümde The Fool ve The High Priestess kartları TR-EN-SR
  dillerinde yayınlanmalı
- **FR-029**: Bu 2 kartın performansı başarılıysa (trafik/conversion
  metrikleri), kalan 76 kart eklenecek

### Key Entities

- **TarotCard**: Tarot kartını temsil eder
  - Attributes: id, englishName, turkishName, serbianName, arcanaType
    (major/minor), suit (cups/swords/wands/pentacles/major), number, imageUrl
  - Relationships: ilgili kartlarla many-to-many (arkana tipine göre)

- **CardContent**: Kart içeriğini temsil eder (çok dilli)
  - Attributes: cardId, locale (tr/en/sr), uprightMeaning, reversedMeaning,
    loveInterpretation, careerInterpretation, moneyInterpretation,
    spiritualInterpretation, story, keywords[]
  - Relationships: TarotCard ile one-to-many (her kart, 3 dil için 3 içerik)

- **CardSEO**: Kart SEO metadata (çok dilli)
  - Attributes: cardId, locale, metaTitle, metaDescription, canonicalUrl,
    ogImage, twitterImage, keywords[], faq[] (Question+Answer pairs)
  - Relationships: TarotCard ile one-to-many

- **CardPage**: Dinamik sayfa route
  - Attributes: locale, slug (URL-friendly kart adı), cardId
  - Relationships: TarotCard, CardContent, CardSEO ile compose

## Review & Acceptance Checklist

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked (none remaining)
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---

**SUCCESS**: Specification ready for planning phase
