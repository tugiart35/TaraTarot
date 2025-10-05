# BüşBüşKimKi Tarot - Structured Data (JSON-LD) Bilgi Rehberi

Bu doküman, web sitesinde JSON-LD Structured Data implementasyonu için gerekli
tüm bilgileri toplu ve verimli şekilde sunar.

---

## 1️⃣ Site Bilgileri

| Alan            | Bilgi                                            | Not                                    |
| --------------- | ------------------------------------------------ | -------------------------------------- |
| Site Adı        | BüşBüşKimKi Tarot Okuyucusu                      | Güncel site adı                        |
| Site Açıklaması | Profesyonel tarot okuma ve numeroloji hizmetleri | Şifalandırıcı ve sezgisel üslup        |
| Site URL        | https://busbuskimki.com                          | Doğrula                                |
| Logo URL        | TODO: Site logosunun tam URL'si                  | Örn: `/assets/logo.png` veya CDN linki |
| Favicon URL     | TODO: Site favicon URL'si                        | Örn: `/favicon.ico`                    |

---

## 2️⃣ Organizasyon Bilgileri

| Alan                   | Bilgi                                   | Not                                    |
| ---------------------- | --------------------------------------- | -------------------------------------- |
| Organizasyon Adı       | BüşBüşKimKi Tarot Okuyucusu             | Aynı                                   |
| Organizasyon Türü      | TODO: Bireysel mi, şirket mi?           | Netleştirilmeli                        |
| İletişim               | Email: TODO, Telefon: TODO, Adres: TODO | JSON-LD contactPoint için kullanılacak |
| Sosyal Medya Hesapları | TODO: Instagram / Facebook / Twitter    | JSON-LD sameAs alanı için gerekli      |

---

## 3️⃣ Hizmet Bilgileri

| Hizmet          | Açıklama                                                                                             | Fiyat | Süre |
| --------------- | ---------------------------------------------------------------------------------------------------- | ----- | ---- |
| Tarot Okuma     | Kartlarla geçmiş, şimdi ve geleceğe dair rehberlik. Sıcak, şifalandırıcı ve sezgisel yorumlar sunar. | TODO  | TODO |
| Numeroloji      | Doğum tarihi ve evrensel günler ışığında kişisel rehberlik ve sezgisel analizler.                    | TODO  | TODO |
| Diğer Hizmetler | TODO                                                                                                 | TODO  | TODO |

> Not: Fiyat, süre ve hizmet sayfası URL’leri JSON-LD “Offer” alanlarında
> kullanılacak.

---

## 4️⃣ Sayfa Türleri ve Schema

| Sayfa            | Schema Türü | Not                          |
| ---------------- | ----------- | ---------------------------- |
| Ana Sayfa        | WebSite     | ✅                           |
| Hizmet Sayfaları | Service     | Her hizmet için ayrı JSON-LD |
| Hakkımızda       | AboutPage   | ✅                           |
| İletişim         | ContactPage | ✅                           |
| Blog / Makale    | Article     | Eğer varsa                   |

---

## 5️⃣ Teknik Bilgiler

| Alan               | Bilgi                                                                      | Not                                       |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------- |
| Schema.org Türleri | WebSite, Service, AboutPage, ContactPage, Article, FAQPage, BreadcrumbList | ✅                                        |
| Breadcrumb         | Örn: Ana Sayfa > Hizmetler > Tarot                                         | Her sayfa için önerilir                   |
| FAQ                | TODO: Var mı?                                                              | SSS varsa JSON-LD FAQPage ile eklenebilir |
| Testimonial        | TODO: Var mı?                                                              | Müşteri yorumları varsa eklenebilir       |

---

## 6️⃣ SEO Bilgileri

| Alan                  | Bilgi                                                  | Not                      |
| --------------------- | ------------------------------------------------------ | ------------------------ |
| Ana Anahtar Kelimeler | tarot, numeroloji, tarot okuma, tarot rehberi          | ✅                       |
| Hedef Kitle           | Türkiye ve İngilizce konuşan uluslararası kullanıcılar | ✅                       |
| Dil Kodları           | tr-TR, en-US, sr-RS                                    | Önceki bilgilerle uyumlu |

---

## ⚡ Özet

- Eksik alanlar `"TODO"` ile işaretlendi, JSON-LD implementasyonu için
  güncellenmeli.
- Her hizmet ve sayfa için ayrı ayrı JSON-LD hazırlanabilir.
- Breadcrumb ve FAQ desteği SEO performansını artırır.
- Site adını ve üslubu **BüşBüşKimKi Tarot Okuyucusu** olarak güncelledik,
  şifalandırıcı ve sıcak bir üslup korunuyor.
