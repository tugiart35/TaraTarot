% 09 — Folder Maps ve Mimari Rehberi

Bu doküman, projenin mimarisini, teknoloji yığınını, ana akışlarını ve klasör–dosya bazında görevlerini ayrıntılı olarak açıklar. Amaç; yeni geliştiricilerin hızlı ısınmasını sağlamak, bakım ve genişletilebilirliği kolaylaştırmaktır.

## Özet
- Modern Next.js (App Router) + TypeScript tabanlı çok dilli (TR/EN/SR) tarot uygulaması.
- Supabase ile kimlik doğrulama, profil ve kredi yönetimi, okuma kayıtları.
- PWA desteği, güvenlik odaklı middleware, modüler “feature” yapısı.
- Aşk Açılımı (Love Spread) ana ürün; kart seçimi, yorumlama, kredi kesimi ve okuma kaydı.

## Teknoloji Yığını
- Next.js 15 (App Router), React 18, TypeScript
- Tailwind CSS (UI), framer-motion (animasyon), lucide-react (ikon)
- next-intl (i18n), PWA (service worker: `public/sw.js`, `public/sw-auth.js`)
- Supabase JS SDK (auth + veritabanı)

## Ortam Değişkenleri
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase proje URL’i
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key

Not: Üretim ortamında gizli anahtarları asla dokümana koymayın; yalnızca değişken adlarını referans alın.

---

## Dizin Haritası (Üst Seviye)
- `src/`: Uygulama kaynak kodu
- `public/`: Statik dosyalar (ikonlar, manifest, kart görselleri, SW)
- `messages/`: i18n JSON mesajları (tr/en/sr)
- `admin-dashboard-package/`: Admin panel bileşenlerinin paketlenmiş kopyası
- `docs/`: Mimari ve refactor notları
- `tests/`: i18n testleri
- Kök dosyalar: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `next.config.js`, `README.md`, çeşitli SQL ve yardımcı dokümanlar

### Kök Yardımcı Dosyalar (seçme)
- `README.md`: Kısa proje özeti ve komutlar
- `package.json`: Script’ler ve bağımlılıklar
- `tailwind.config.ts`: Tailwind ayarı
- `next.config.js`: Next.js ayarı (PWA vb.)
- `tsconfig.json`: TypeScript ayarı
- `EMAIL_CONFIRMATION_*.md`, `PROJECT-AUDIT.md`, `REFACTOR-PLAN.md` vb.: Çeşitli bakım ve plan dokümanları
- SQL betikleri:
  - `create-tarot-tables.sql`: Tarotla ilgili temel tablo şemaları
  - `fix-profiles-table.sql`, `check-profiles-table.sql`: Profil tablosu bakım
  - `check-transactions-table.sql`, `TRANSACTIONS_TABLE_FIX.md`: İşlem tablosu kontrol/tamir
  - `update-tarot-readings-table.sql`: Tarot okuma tablosu güncelleme
  - `delete-all-users.sql`: Geliştirme/temizlik amaçlı toplu silme

---

## `src/` Dizin Haritası
- `src/app/`: App Router sayfaları (çok dilli yapı)
- `src/features/`: Özellik tabanlı modüller (tarot, shared UI vb.)
- `src/hooks/`: Özel React hook’ları (auth, tarot, krediler, çeviri)
- `src/lib/`: Yardımcı katman (supabase, i18n, sabitler, güvenlik, utils)
- `src/providers/`: Context/Provider bileşenleri (Intl, PWA Auth)
- `src/types/`: Tip tanımları (tarot, auth, reading)
- `src/middleware.ts`: Güvenlik ve locale yönlendirme middleware’i

### `src/app/[locale]/` (Çok Dilli Rotalar)
- `src/app/[locale]/(main)/tarotokumasi/page.tsx`: Ana tarot sayfası. Spread seçimi ve seçilen spread bileşenini yükler. Son okuma özetini gösterir.
- `src/app/[locale]/auth/page.tsx`: Giriş/Kayıt, Supabase auth entegrasyonu, profil oluşturma tetikler.
- `src/app/[locale]/auth/confirm/route.ts`: E-posta onayı/redirect handler.
- `src/app/[locale]/dashboard/page.tsx`: Kullanıcı paneli; profil, krediler, son okumalar, işlemler.
  - `.../dashboard/credits/page.tsx`: Kredi ekranı
  - `.../dashboard/readings/page.tsx`: Okuma geçmişi
  - `.../dashboard/settings/page.tsx`: Kullanıcı ayarları
  - `.../dashboard/statistics/page.tsx`: Basit istatistikler
- `src/app/[locale]/admin/layout.tsx`: Admin layout (navigasyon, yetki, session, loglama entegrasyonu)
- `src/app/[locale]/admin/page.tsx`: Admin dashboard (kullanıcı, kredi toplamı, günlük kullanım)
  - `.../admin/users/page.tsx`: Kullanıcı yönetimi
  - `.../admin/packages/page.tsx`: Kredi paketleri CRUD
  - `.../admin/orders/page.tsx`: Sipariş/ödeme listeleri
  - `.../admin/analytics/page.tsx`: Analitik
  - `.../admin/content/page.tsx`: İçerik yönetimi
  - `.../admin/settings/page.tsx`: Sistem ayarları
- `src/app/[locale]/(main)/legal/*/page.tsx`: Yasal sayfalar (gizlilik, KVKK, şartlar vb.)

### `src/features/tarot` (Tarot Modülü)
- `src/features/tarot/components/`:
  - `Love-Spread/LoveTarot.tsx`: Aşk Açılımı ana bileşeni. Kart pozisyonları, kart galerisi, okuma tipi seçimi, detay formu (DETAILED/WRITTEN), kredi onayı, okuma kaydı.
  - `Love-Spread/love-config.ts`: Aşk açılımı pozisyon bilgileri ve yerleşimler; toplam kart sayısı.
  - `Love-Spread/LoveCardRenderer.tsx`: Aşk temasıyla kart render’ı (BaseCardRenderer üzerine tema).
  - `Love-Spread/LoveInterpretation.tsx`: Seçilen kartlara göre aşk odaklı yorum bileşeni (BaseInterpretation varyantı).
  - `standard/TarotSpreadSelector.tsx`: Spread seçim butonları (yatay kaydırmalı, ikonlu).
  - `standard/LastReadingSummary.tsx`: Son okuma özeti kutucuğu.
  - `index.ts`: Tarot bileşenlerinin barrel export’u.
- `src/features/tarot/lib/`:
  - `full-tarot-deck.ts`: i18n destekli 78 kartlık deste hook’u (`useTarotDeck`).
  - `a-tarot-helpers.ts`: Tarot tipleri/yardımcıları (kart tipi vs.).
  - `love/position-meanings-index.ts`: Aşk pozisyonlarına göre kart anlamlarını birleştiren indeks; kart/pozisyon eşleme ve arama.
  - `love/position-*.ts`: Her pozisyon (1–4) için ayrıntı anlamlar.

### `src/features/shared` (Paylaşılan UI/Layout)
- `src/features/shared/ui/`:
  - `BaseCardGallery.tsx`: Tüm açılımlar için ortak kart galerisi; karıştırma, seçilebilirlik, ilerleyen pozisyon bilgisi.
  - `BaseCardPosition.tsx`: Kart pozisyon kutusu; sıradaki/boş/dolu durumlarını temalı gösterir.
  - `BaseCardRenderer.tsx`: Kart görseli/isim/statü render’ı; tema desteği.
  - `BaseInterpretation.tsx`: Yorum görünümü (başlık, rozet, kart anlamları, anahtar kelimeler, bağlam).
  - `BaseReadingTypeSelector.tsx`: SIMPLE/DETAILED/WRITTEN okuma tipi seçimi; kredi bilgisi entegrasyonu için uygun.
  - `CardDetails.tsx`: Kart detay modal’ı (düz/ters ve pozisyon anlamı ile).
  - `Toast.tsx`, `LoadingSpinner.tsx`, `ErrorBoundary.tsx`, `ErrorDisplay.tsx`, `LanguageSwitcher.tsx`, `MobileScrollWrapper.tsx`, `ReadingInfoModal.tsx`: Yardımcı UI bileşenleri.
- `src/features/shared/layout/BottomNavigation.tsx`: Mobil alt navigasyon; dil seçici ve auth durumuna göre dinamik menü.

### `src/hooks/` (Özel Hook’lar)
- `useAuth.ts`: Supabase oturumunu izler; `user`, `isAuthenticated`, `loading` döner.
- `useReadingCredits.ts`: Kredi bakiyesi kontrolü ve düşümü; `profiles` ve `transactions` tablolarıyla entegre.
- `useTarotReading.ts`: Kart seçimi, pozisyon yönetimi, deste karıştırma, yorum alanına referans; akış adımları.
- `useTranslations.ts`: i18n çeviri erişimi (next-intl sarmalayıcılarıyla).
- `useToast.ts`, `useTouchScroll.ts`, `usePayment.ts`: Yardımcı durum ve etkileşim hook’ları.

### `src/lib/` (Altyapı ve Yardımcı Katman)
- `supabase/client.ts`: Supabase client oluşturur, temel DB tipleri ve auth ayarları.
- `constants/reading-credits.ts`: Okuma tipleri ve kredi gereksinimleri; dashboard için kredi konfigürasyonları.
- `constants/tarotSpreads.ts`: Spread tanımları, dinamik import ve pozisyon/layout bilgisi; `findSpreadById` yardımcıları.
- `i18n/config.ts`: Desteklenen diller ve next-intl server tarafı konfigürasyon.
- `i18n/paths.ts`: Locale-aware path yardımcıları (path’ten locale çıkarma/ekleme).
- `i18n/validation.ts`: i18n doğrulama yardımcıları.
- `config/app-config.ts`, `config/metadata.ts`: Uygulama meta/konfig.
- `security/*` (2FA, rate-limiter, audit-logger): Güvenlik yardımcıları (geliştirme modunda çoğu devre dışı).
- `mobile/mobile-utils.ts`: Mobil/cihaz yardımcıları.
- `payment/payment-types.ts`: Ödeme tarafı tipler.
- `utils/profile-utils.ts`: Profil oluşturma/güncelleme, `ensureProfileExists` akışı.
- `utils/user-id-utils.ts`: Kullanıcı kimlik yardımcıları.
- `logger.ts`, `error-handler.ts`, `audit-logger.ts`, `rate-limiter.ts`, `session-manager.ts`: Genel altyapı yardımcıları.

### `src/providers/`
- `IntlProvider.tsx`: next-intl Provider; `messages` ile çocukları sarmalar.
- `PWAAuthProvider.tsx`: PWA auth durumu, SW ile senkronizasyon, çevrimdışı durum yönetimi.

### `src/types/`
- `tarot.ts`: Tarot kartı, pozisyon, layout, okuma tipleri ve modüler spread tipleri.
- `reading.types.ts`: Okuma/yorum veri tipleri (özet, ayrıntı vs.).
- `auth.types.ts`: Auth ve session bağlamı tipleri.

### `src/middleware.ts`
- Güvenlik başlıkları (CSP, HSTS, X-Frame-Options vs.), locale yönlendirme (`/` → `/tr/tarotokumasi`), public rotaları bypass, development’ta rate limit ve RBAC devre dışı.

---

## `public/` (Statik)
- `icons/*`: PWA ikonları
- `manifest.json`: PWA manifest
- `sw.js`: Genel service worker
- `sw-auth.js`: Auth’a özel service worker
- `cards/CardBack.jpg`: Kart sırtı görseli
- `images/bg-*-tarot.jpg`: Spread arka plan görselleri

## `messages/` (i18n)
- `tr.json`, `en.json`, `sr.json`: Uygulama metinleri, kart isim/anlamları ve UI mesajları

## `admin-dashboard-package/`
- `README.md`, `install.sh`, `database-setup.sql`: Paket kurulum ve entegrasyon rehberi
- `src/components/admin/*`: Admin bileşenleri (ReadingHistory, TransactionHistory, PaymentHistory, vb.)
- `src/hooks/*`: Paket içi hook’lar (auth, kredi, toast)
- Not: `src/components/admin/*` altında projeye gömülü benzer bileşenler de bulunur; paket, harici kullanım/yeniden kullanım içindir.

## `docs/`
- `MODULAR_REFACTOR_PLAN.mdc`, `MODULARITY_AUDIT.mdc`, `refactor-checklist.json`, `dep-graph.json` vb.: Modülerleşme ve bağımlılık analizleri

## `tests/`
- `tests/i18n/messages-parity.test.ts`: Dil dosyaları tutarlılık testleri
- `tests/i18n/locale-routing.spec.ts`: Locale yönlendirme testleri

## `scripts/`
- `check-hardcoded-ui-strings.mjs`: UI içinde sabit metin kalmasın diye denetim (i18n)

---

## Ana Akışlar

### 1) Aşk Tarot Okuması (Love Spread)
- Spread seçimi: `tarotokumasi/page.tsx` + `TarotSpreadSelector`
- Kart seçimi ve pozisyon akışı: `useTarotReading` (kart sayısı, sıradaki pozisyon, ters/düz)
- Okuma tipi: SIMPLE/DETAILED/WRITTEN (`BaseReadingTypeSelector`)
- DETAILED/WRITTEN formu ve kredi onayı: `LoveTarot.tsx` içinde modal + `useReadingCredits`
- Yorum ekranı: `LoveInterpretation` (pozisyon bazlı anlamlar)
- Kaydetme: `LoveTarot.tsx → saveReadingToSupabase` (tablo: `tarot_readings`)

### 2) Kullanıcı Paneli (Dashboard)
- `dashboard/page.tsx`: Profil oluşturma/çekme (`ensureProfileExists`), son okumalar (`tarot_readings`), işlemler (`transactions`), kredi bakiyesi (`profiles.credit_balance`) ve UI

### 3) Admin Paneli
- `admin/layout.tsx`: Admin shell (nav, session, bildirim)
- `admin/page.tsx`: Ana istatistikler (kullanıcı sayısı, toplam kredi, günlük kullanım)
- `admin/users/*`: Kullanıcı listesi, `UserDetailModal` ile ayrıntılar + geçmişler
- `admin/packages/page.tsx`: Paket CRUD (`packages` tablosu)

---

## Güvenlik ve Yetkilendirme
- Middleware güvenlik başlıkları + locale yönlendirme.
- Supabase Auth ile kullanıcı durumu: `useAuth`, `PWAAuthProvider` (SW senkronizasyonu).
- RBAC ve rate-limit geliştirme modunda pasif; üretimde açılabilir.

## i18n ve Dil Yönetimi
- `next-intl` tabanlı. Diller: `tr`, `en`, `sr`.
- Server tarafı konfig: `src/lib/i18n/config.ts`
- Mesajlar: `messages/*.json`
- Dil değiştirme: `BottomNavigation → LanguageSelector` (path korunarak locale değişimi)

## PWA
- Manifest ve ikonlar: `public/manifest.json`, `public/icons/*`
- SW’ler: `public/sw.js` (genel), `public/sw-auth.js` (auth)
- Sağlayıcı: `src/providers/PWAAuthProvider.tsx`

## Komutlar (package.json)
- `dev`: `next dev -p 3111`
- `build`, `start`
- `lint`, `lint:fix`, `format`, `format:check`
- `code-quality`, `code-quality:fix`
- `i18n:check` (sabit metin kontrolü), `i18n:test` (i18n testleri), `i18n:validate`

---

## Örnek Dosya Açıklamaları (Hızlı Referans)

- `src/features/tarot/components/Love-Spread/LoveTarot.tsx`: Aşk açılımı için ana sahne; kart akışı, form, kredi, yorum ve kaydetme.
- `src/features/tarot/components/Love-Spread/love-config.ts`: Pozisyon başlık/açıklama ve yerleşim; kart sayısı.
- `src/features/shared/ui/BaseCardGallery.tsx`: Kart listesi/galeri, seçilebilirlik ve karıştırma.
- `src/features/shared/ui/BaseCardPosition.tsx`: Kart pozisyonu (sıradaki/boş/dolu), temalı çerçeve.
- `src/features/tarot/components/standard/TarotSpreadSelector.tsx`: Spread seçimi butonları.
- `src/app/[locale]/(main)/tarotokumasi/page.tsx`: Tarot merkezi sayfa (spread seçimi + çalışma alanı).
- `src/lib/supabase/client.ts`: Supabase client ve DB tipleri.
- `src/lib/constants/reading-credits.ts`: Okuma tiplerine göre kredi gereksinimleri.
- `src/app/[locale]/dashboard/page.tsx`: Kullanıcı paneli; profil/kredi/okumalar/işlemler.
- `src/app/[locale]/admin/page.tsx`: Admin istatistik panosu.
- `src/app/[locale]/admin/packages/page.tsx`: Paketler için CRUD UI.
- `src/components/admin/UserDetailModal.tsx`: Admin panelde kullanıcı detay modal’ı (okuma/işlem/ödeme sekmeleri).

---

## Veritabanı Tabloları (Koddan Çıkarım)
- `profiles`: `id`, `display_name`, `credit_balance`, `created_at`...
- `transactions`: `user_id`, `delta_credits`, `reason`, `created_at`...
- `tarot_readings`: `user_id`, `reading_type`, `cards[]`, `interpretation`, `question`, `status`, `created_at`...
- `packages`: İsim, kredi, fiyat, aktiflik, zaman damgaları
- `admins`: Admin kullanıcı eşlemesi (role/erişim)
- `user_questions`, `detailed_questions`: Kullanıcı soruları ve detay form kayıtları (Love akışında kullanıma hazır)

Not: Şema ayrıntıları için kökteki SQL dosyalarına ve `supabaseschema.md` dokümanına bakın.

---

## Genişletme Önerileri
- Spread’leri konfigürasyondan dinamikleştirip registry yapısını genişletmek.
- RBAC + rate limit’i production’da aktifleştirmek.
- Yorum bileşenlerine erişilebilirlik (ARIA) iyileştirmeleri.
- i18n testlerini CI’a bağlamak; sabit metin kontrolünü pre-commit’e almak.

---

Bu harita, projeyi hızlıca kavramak ve geliştirme sırasında referans amaçlı hazırlanmıştır. Güncel kalması için yeni modül eklemelerinde bu dosyayı da güncelleyin.

