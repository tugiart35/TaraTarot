# Tarot Kartları SEO Görev Listesi

## 🎯 Genel Bakış

Bu dokümanda, 78 tarot kartı için çok dilli SEO optimizasyonu projesinin detaylı
görev listesi bulunmaktadır. Her görev, tahmini süre, öncelik seviyesi ve
bağımlılıkları ile birlikte listelenmiştir.

---

## 📋 Faz 1: Hazırlık ve Analiz (1-2 hafta)

### 1.1 İçerik Analizi

- [ ] **Görev 1.1.1**: blogtarot.txt dosyasını tam analiz etme
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 78 kartın mevcut içerik yapısını detaylı inceleme
  - **Çıktı**: Kart başına içerik haritası

- [ ] **Görev 1.1.2**: tr.json yapısını analiz etme
  - **Süre**: 2 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Mevcut çeviri yapısını ve anahtar sistemini inceleme
  - **Çıktı**: Çeviri yapısı dokümantasyonu

- [ ] **Görev 1.1.3**: card-name-mapping.ts entegrasyon planı
  - **Süre**: 3 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Kart isimleri mapping'ini içerik sistemiyle entegre etme
  - **Çıktı**: Entegrasyon şeması

### 1.2 Teknik Altyapı

- [ ] **Görev 1.2.1**: URL yapısı tasarımı
  - **Süre**: 3 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Çok dilli URL şablonlarını oluşturma
  - **Çıktı**: URL mapping tablosu

- [ ] **Görev 1.2.2**: Dosya yapısı planlama
  - **Süre**: 2 saat
  - **Öncelik**: Orta
  - **Açıklama**: Next.js App Router için klasör yapısını tasarlama
  - **Çıktı**: Klasör yapısı şeması

- [ ] **Görev 1.2.3**: Component yapısı tasarımı
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Yeniden kullanılabilir component'leri planlama
  - **Çıktı**: Component şeması

---

## 📝 Faz 2: İçerik Üretimi (3-4 hafta)

### 2.1 Veri Yapısı Oluşturma

- [ ] **Görev 2.1.1**: TypeScript interface'leri tanımlama
  - **Süre**: 3 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: TarotCard, CardContent gibi type'ları oluşturma
  - **Bağımlılık**: 1.1.1, 1.1.2
  - **Çıktı**: types/tarot.ts dosyası

- [ ] **Görev 2.1.2**: Veri dönüştürme script'i yazma
  - **Süre**: 6 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: blogtarot.txt → JSON formatına dönüştürme
  - **Bağımlılık**: 2.1.1
  - **Çıktı**: scripts/convert-content.mjs

### 2.2 İçerik Yazma ve Çeviri

- [ ] **Görev 2.2.1**: Major Arcana içerikleri (22 kart)
  - **Süre**: 40 saat (kart başına ~1.8 saat)
  - **Öncelik**: Yüksek
  - **Açıklama**: 22 Major Arcana kartı için TR içerik yazma
  - **Bağımlılık**: 2.1.2
  - **Çıktı**: TR içerikleri (700-1000 kelime/kart)

- [ ] **Görev 2.2.2**: Minor Arcana içerikleri (56 kart)
  - **Süre**: 100 saat (kart başına ~1.8 saat)
  - **Öncelik**: Yüksek
  - **Açıklama**: 56 Minor Arcana kartı için TR içerik yazma
  - **Bağımlılık**: 2.1.2
  - **Çıktı**: TR içerikleri (700-1000 kelime/kart)

- [ ] **Görev 2.2.3**: EN çevirileri (78 kart)
  - **Süre**: 60 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: TR içeriklerini EN'ye çevirme
  - **Bağımlılık**: 2.2.1, 2.2.2
  - **Çıktı**: EN içerikleri

- [ ] **Görev 2.2.4**: SR çevirileri (78 kart)
  - **Süre**: 60 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: TR içeriklerini SR'ye çevirme
  - **Bağımlılık**: 2.2.1, 2.2.2
  - **Çıktı**: SR içerikleri

### 2.3 SEO Meta Verileri

- [ ] **Görev 2.3.1**: TR meta verileri (78 kart)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Her kart için title, description, keywords
  - **Bağımlılık**: 2.2.1, 2.2.2
  - **Çıktı**: TR meta verileri

- [ ] **Görev 2.3.2**: EN meta verileri (78 kart)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Her kart için title, description, keywords
  - **Bağımlılık**: 2.2.3
  - **Çıktı**: EN meta verileri

- [ ] **Görev 2.3.3**: SR meta verileri (78 kart)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Her kart için title, description, keywords
  - **Bağımlılık**: 2.2.4
  - **Çıktı**: SR meta verileri

---

## 🛠 Faz 3: Teknik Implementasyon (2-3 hafta)

### 3.1 Sayfa Geliştirme

- [ ] **Görev 3.1.1**: Dynamic routing kurulumu
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: [locale]/[category]/[slug] routing yapısı
  - **Bağımlılık**: 1.2.1, 1.2.2
  - **Çıktı**: Routing yapısı

- [ ] **Görev 3.1.2**: Ana sayfa component'i
  - **Süre**: 12 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: TarotCardPage component'i geliştirme
  - **Bağımlılık**: 2.1.1
  - **Çıktı**: components/TarotCardPage.tsx

- [ ] **Görev 3.1.3**: Hero bölümü component'i
  - **Süre**: 6 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Kart görseli ve başlık bölümü
  - **Bağımlılık**: 3.1.2
  - **Çıktı**: components/TarotCardHero.tsx

- [ ] **Görev 3.1.4**: İçerik bölümü component'i
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Upright/Reversed anlamlar ve alt başlıklar
  - **Bağımlılık**: 3.1.2
  - **Çıktı**: components/TarotCardContent.tsx

- [ ] **Görev 3.1.5**: CTA bölümü component'i
  - **Süre**: 4 saat
  - **Öncelik**: Orta
  - **Açıklama**: Randevu ve hızlı yorum butonları
  - **Bağımlılık**: 3.1.2
  - **Çıktı**: components/TarotCardCTA.tsx

- [ ] **Görev 3.1.6**: FAQ component'i
  - **Süre**: 6 saat
  - **Öncelik**: Orta
  - **Açıklama**: Sık sorulan sorular ve JSON-LD
  - **Bağımlılık**: 3.1.2
  - **Çıktı**: components/TarotCardFAQ.tsx

### 3.2 SEO Optimizasyonu

- [ ] **Görev 3.2.1**: Meta tags implementasyonu
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Dynamic meta tags generation
  - **Bağımlılık**: 2.3.1, 2.3.2, 2.3.3
  - **Çıktı**: lib/meta-generator.ts

- [ ] **Görev 3.2.2**: Hreflang implementasyonu
  - **Süre**: 6 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Çok dilli hreflang etiketleri
  - **Bağımlılık**: 3.2.1
  - **Çıktı**: lib/hreflang-generator.ts

- [ ] **Görev 3.2.3**: JSON-LD structured data
  - **Süre**: 8 saat
  - **Öncelik**: Orta
  - **Açıklama**: FAQ ve Article schema implementasyonu
  - **Bağımlılık**: 3.1.6
  - **Çıktı**: lib/structured-data.ts

- [ ] **Görev 3.2.4**: Sitemap generation
  - **Süre**: 6 saat
  - **Öncelik**: Orta
  - **Açıklama**: 234 sayfa için otomatik sitemap
  - **Bağımlılık**: 3.1.1
  - **Çıktı**: app/sitemap.ts

### 3.3 Performans Optimizasyonu

- [ ] **Görev 3.3.1**: Image optimization
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 78 kart görseli için Next.js Image optimizasyonu
  - **Bağımlılık**: 3.1.3
  - **Çıktı**: Optimized images

- [ ] **Görev 3.3.2**: Lazy loading implementasyonu
  - **Süre**: 4 saat
  - **Öncelik**: Orta
  - **Açıklama**: Component'ler için lazy loading
  - **Bağımlılık**: 3.1.2
  - **Çıktı**: Lazy loading yapısı

- [ ] **Görev 3.3.3**: Code splitting
  - **Süre**: 6 saat
  - **Öncelik**: Orta
  - **Açıklama**: Route-based code splitting
  - **Bağımlılık**: 3.1.1
  - **Çıktı**: Optimized bundle sizes

---

## 🧪 Faz 4: Test ve Optimizasyon (1-2 hafta)

### 4.1 Testing

- [ ] **Görev 4.1.1**: Unit testler yazma
  - **Süre**: 16 saat
  - **Öncelik**: Orta
  - **Açıklama**: Component'ler için test coverage
  - **Bağımlılık**: 3.1.2-3.1.6
  - **Çıktı**: Test dosyaları

- [ ] **Görev 4.1.2**: Integration testler
  - **Süre**: 12 saat
  - **Öncelik**: Orta
  - **Açıklama**: Sayfa render ve routing testleri
  - **Bağımlılık**: 3.1.1
  - **Çıktı**: Integration testleri

- [ ] **Görev 4.1.3**: SEO audit
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Meta tags, structured data kontrolü
  - **Bağımlılık**: 3.2.1-3.2.3
  - **Çıktı**: SEO audit raporu

### 4.2 Performance Testing

- [ ] **Görev 4.2.1**: Core Web Vitals testi
  - **Süre**: 6 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: LCP, FID, CLS metrikleri
  - **Bağımlılık**: 3.3.1-3.3.3
  - **Çıktı**: Performance raporu

- [ ] **Görev 4.2.2**: Mobile responsiveness testi
  - **Süre**: 8 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Mobil cihazlarda test
  - **Bağımlılık**: 3.1.2-3.1.6
  - **Çıktı**: Mobile test raporu

### 4.3 Content Review

- [ ] **Görev 4.3.1**: İçerik proofreading (TR)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 78 kart için TR içerik kontrolü
  - **Bağımlılık**: 2.2.1, 2.2.2
  - **Çıktı**: Düzeltilmiş TR içerikler

- [ ] **Görev 4.3.2**: İçerik proofreading (EN)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 78 kart için EN içerik kontrolü
  - **Bağımlılık**: 2.2.3
  - **Çıktı**: Düzeltilmiş EN içerikler

- [ ] **Görev 4.3.3**: İçerik proofreading (SR)
  - **Süre**: 20 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 78 kart için SR içerik kontrolü
  - **Bağımlılık**: 2.2.4
  - **Çıktı**: Düzeltilmiş SR içerikler

---

## 🚀 Faz 5: Launch ve Monitoring (1 hafta)

### 5.1 Deployment

- [ ] **Görev 5.1.1**: Production build
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Production için build optimizasyonu
  - **Bağımlılık**: 4.1.1-4.1.3
  - **Çıktı**: Production build

- [ ] **Görev 5.1.2**: Staging deployment
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Test ortamında deployment
  - **Bağımlılık**: 5.1.1
  - **Çıktı**: Staging environment

- [ ] **Görev 5.1.3**: Production deployment
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: Canlı ortama deployment
  - **Bağımlılık**: 5.1.2
  - **Çıktı**: Live website

### 5.2 Monitoring Setup

- [ ] **Görev 5.2.1**: Google Search Console setup
  - **Süre**: 4 saat
  - **Öncelik**: Yüksek
  - **Açıklama**: 234 sayfa için Search Console
  - **Bağımlılık**: 5.1.3
  - **Çıktı**: GSC configuration

- [ ] **Görev 5.2.2**: Analytics setup
  - **Süre**: 4 saat
  - **Öncelik**: Orta
  - **Açıklama**: GA4 ve custom events
  - **Bağımlılık**: 5.1.3
  - **Çıktı**: Analytics tracking

- [ ] **Görev 5.2.3**: Performance monitoring
  - **Süre**: 6 saat
  - **Öncelik**: Orta
  - **Açıklama**: Core Web Vitals monitoring
  - **Bağımlılık**: 5.1.3
  - **Çıktı**: Performance monitoring

---

## 📊 Görev Özeti

### Toplam Süre: 580-620 saat

- **Faz 1 (Hazırlık)**: 18 saat
- **Faz 2 (İçerik)**: 300 saat
- **Faz 3 (Teknik)**: 100 saat
- **Faz 4 (Test)**: 110 saat
- **Faz 5 (Launch)**: 26 saat

### Öncelik Dağılımı

- **Yüksek Öncelik**: 65 görev (520 saat)
- **Orta Öncelik**: 25 görev (100 saat)

### Kritik Bağımlılıklar

1. **İçerik analizi** → **Veri yapısı** → **İçerik yazma**
2. **Teknik altyapı** → **Component geliştirme** → **SEO optimizasyonu**
3. **Test** → **Deployment** → **Monitoring**

---

## 🎯 Başarı Kriterleri

### Teknik Kriterler

- [ ] 234 sayfa başarıyla oluşturuldu
- [ ] Core Web Vitals hedefleri karşılandı
- [ ] Mobile responsiveness %100
- [ ] SEO audit skoru 90+

### İçerik Kriterleri

- [ ] Her kart için 700-1000 kelime
- [ ] 3 dilde çeviri tamamlandı
- [ ] Proofreading %100 tamamlandı
- [ ] Unique content oranı %95+

### SEO Kriterleri

- [ ] Hreflang implementasyonu
- [ ] Structured data validation
- [ ] Sitemap generation
- [ ] Meta tags optimization

---

_Bu görev listesi, tarot kartları SEO projesinin başarılı bir şekilde
tamamlanması için gerekli tüm adımları kapsamaktadır. Her görev, detaylı
açıklamalar ve bağımlılıkları ile birlikte planlanmıştır._
