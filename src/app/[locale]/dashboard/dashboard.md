# Dashboard Modüler Yapısı

Bu dosya, dashboard sayfasının modüler yapısını ve her dosyanın işlevini
açıklar.

## 📁 Ana Dashboard Sayfası

### `page.tsx` (210 satır)

- **İşlevi**: Ana dashboard sayfasının bileşeni
- **Açıklama**: Modüler yapıda organize edilmiş dashboard sayfası
- **Özellikler**:
  - Custom hook'lar ile veri yönetimi
  - Modüler UI bileşenleri
  - Loading state kontrolü
  - Modal yönetimi

## 🧩 Dashboard Bileşenleri (`src/components/dashboard/`)

### `NavigationHeader.tsx`

- **İşlevi**: Üst navigasyon çubuğu bileşeni
- **Açıklama**: Logo, menü linkleri ve mobil sidebar kontrolü
- **Özellikler**:
  - Desktop ve mobil navigasyon
  - Çıkış yapma fonksiyonu
  - Sidebar açma/kapama

### `WelcomeSection.tsx`

- **İşlevi**: Hoş geldin bölümü bileşeni
- **Açıklama**: Kullanıcı profil bilgilerini gösterir
- **Özellikler**:
  - Kullanıcı avatarı (baş harf)
  - Hoş geldin mesajı
  - Üyelik süresi
  - Admin etiketi

### `StatsCards.tsx`

- **İşlevi**: İstatistik kartları bileşeni
- **Açıklama**: Kullanıcı istatistiklerini gösterir
- **Özellikler**:
  - Kredi bakiyesi kartı
  - Toplam okuma sayısı
  - Üyelik süresi
  - Kullanıcı seviyesi
  - Kredi yenileme butonu

### `CreditPackages.tsx`

- **İşlevi**: Kredi paketleri bileşeni
- **Açıklama**: Satın alınabilir kredi paketlerini gösterir
- **Özellikler**:
  - 3 farklı paket türü (Başlangıç, Popüler, Premium)
  - Dinamik stil ve ikonlar
  - Popüler paket etiketi
  - Satın alma butonları

### `ProfileManagement.tsx`

- **İşlevi**: Profil yönetimi bileşeni
- **Açıklama**: Profil yönetimi kartlarını gösterir
- **Özellikler**:
  - Profil bilgileri kartı
  - Hesap ayarları kartı
  - Kredi geçmişi kartı
  - Hover efektleri

### `RecentActivity.tsx`

- **İşlevi**: Son aktiviteler bileşeni
- **Açıklama**: Son okumalar ve hızlı istatistikleri gösterir
- **Özellikler**:
  - Son okumalar listesi
  - Okuma görüntüleme/indirme butonları
  - Hızlı istatistikler
  - Boş durum gösterimi

## 🎣 Custom Hook'lar (`src/hooks/`)

### `useDashboardData.ts`

- **İşlevi**: Dashboard veri yönetimi hook'u
- **Açıklama**: Tüm dashboard verilerini yönetir
- **Özellikler**:
  - Authentication kontrolü
  - Profil verilerini çekme
  - Son okumaları getirme
  - Kredi paketlerini yükleme
  - Kredi bakiyesi yenileme
  - Event listener'lar

### `useDashboardActions.ts`

- **İşlevi**: Dashboard aksiyonları hook'u
- **Açıklama**: Dashboard'daki tüm aksiyonları yönetir
- **Özellikler**:
  - Paket satın alma
  - Profil kaydetme
  - Çıkış yapma
  - Modal yönetimi
  - Form state yönetimi

## 📋 Tip Tanımlamaları (`src/types/`)

### `dashboard.types.ts`

- **İşlevi**: Dashboard için TypeScript tip tanımlamaları
- **Açıklama**: Tüm dashboard veri yapılarını tanımlar
- **İçerik**:
  - `UserProfile` interface'i
  - `Reading` interface'i
  - `Package` interface'i
  - `DashboardState` interface'i
  - `DashboardActions` interface'i

## 🔧 Utility Fonksiyonları (`src/utils/`)

### `dashboard-utils.ts`

- **İşlevi**: Dashboard utility fonksiyonları
- **Açıklama**: Dashboard'da kullanılan yardımcı fonksiyonlar
- **Fonksiyonlar**:
  - `formatDate()` - Tarih formatlama
  - `getMemberSince()` - Üyelik süresi hesaplama
  - `downloadReading()` - Okuma indirme
  - `getPackageStyle()` - Paket stil hesaplama
  - `getCreditCost()` - Kredi maliyeti hesaplama
  - `getReadingTitle()` - Okuma başlığı oluşturma
  - `getFallbackPackages()` - Fallback paket verileri

## 📄 Alt Sayfalar

### `readings/page.tsx`

- **İşlevi**: Okumalar listesi sayfası
- **Açıklama**: Kullanıcının tüm okumalarını gösterir

### `statistics/page.tsx`

- **İşlevi**: İstatistikler sayfası
- **Açıklama**: Detaylı kullanıcı istatistiklerini gösterir

### `settings/page.tsx`

- **İşlevi**: Ayarlar sayfası
- **Açıklama**: Kullanıcı ayarlarını yönetir

### `credits/page.tsx`

- **İşlevi**: Kredi geçmişi sayfası
- **Açıklama**: Kredi işlemlerini gösterir

### `packages/page.tsx`

- **İşlevi**: Kredi paketleri sayfası
- **Açıklama**: Tüm kredi paketlerini gösterir

## 🔗 Bağlantılı Dosyalar

### Shared Bileşenler

- `@/features/shared/layout/BottomNavigation` - Alt navigasyon
- `@/features/shared/ui/ReadingDetailModal` - Okuma detay modal'ı
- `@/features/dashboard/components/shared/ProfileModal` - Profil modal'ı

### Hook'lar

- `@/hooks/useAuth` - Authentication hook'u
- `@/hooks/useTranslations` - Çeviri hook'u
- `@/hooks/useShopier` - Ödeme hook'u

### Sabitler

- `@/lib/constants/reading-credits` - Kredi sabitleri
- `@/lib/utils/profile-utils` - Profil utility fonksiyonları

## 📊 Dosya Boyutu Karşılaştırması

- **Öncesi**: 1322 satır (tek dosya)
- **Sonrası**: 210 satır (ana dosya) + 6 modüler bileşen
- **Toplam azalma**: %85 daha az kod

## 🎯 Modüler Yapının Avantajları

1. **Bakım Kolaylığı**: Her bileşen kendi sorumluluğunu alıyor
2. **Yeniden Kullanım**: Bileşenler başka sayfalarda da kullanılabilir
3. **Test Edilebilirlik**: Her bileşen bağımsız olarak test edilebilir
4. **Performans**: Custom hook'lar ile optimize edilmiş state yönetimi
5. **Okunabilirlik**: Kod organizasyonu çok daha net
6. **Tip Güvenliği**: TypeScript ile güçlü tip kontrolü

## 🚀 Geliştirme Önerileri

1. **Unit Test'ler**: Her bileşen için test yazılabilir
2. **Error Handling**: Daha detaylı hata yönetimi eklenebilir
3. **Loading States**: Daha granüler loading state'leri
4. **PWA Desteği**: Progressive Web App özellikleri
5. **Accessibility**: Erişilebilirlik iyileştirmeleri
