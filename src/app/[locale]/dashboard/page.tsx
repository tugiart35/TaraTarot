/*
info:
Bağlantılı dosyalar:
- @/hooks/useDashboardData: Dashboard veri yönetimi için (gerekli) - GitHub'dan geri yüklendi
- @/hooks/useDashboardActions: Dashboard aksiyonları için (gerekli)
- @/components/dashboard/*: Dashboard UI bileşenleri (gerekli)
- @/types/dashboard.types: Dashboard tip tanımlamaları (gerekli)
- @/utils/dashboard-utils: Dashboard utility fonksiyonları (gerekli)

Dosyanın amacı:
- Giriş yapmış kullanıcılar için modüler dashboard sayfası oluşturur.
- Kullanıcı profil bilgilerini, okuma geçmişini ve istatistikleri gösterir.
- Kredi bakiyesi, hızlı işlemler ve profil yönetimi özellikleri sunar.
- Modüler yapı ile bakım kolaylığı sağlar.

Backend bağlantısı:
- Supabase auth ile kullanıcı doğrulama
- profiles, readings, transactions tablolarından veri çekme
- Burada backend'e bağlanılacak - profil güncelleme işlemleri

Geliştirme ve öneriler:
- Modüler bileşen yapısı ile kolay bakım
- Custom hook'lar ile state yönetimi
- Utility fonksiyonları ile kod tekrarını önleme
- TypeScript ile tip güvenliği

Hatalar / Geliştirmeye Açık Noktalar:
- Loading state'leri daha detaylı hale getirilebilir
- Error handling iyileştirilebilir
- PWA desteği eklenebilir
- Unit test'ler eklenebilir

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Modüler yapı ile temiz kod organizasyonu
- Optimizasyon: Custom hook'lar ile performans optimizasyonu
- Yeniden Kullanılabilirlik: Ayrı bileşenler ile yeniden kullanım
- Güvenlik: Auth kontrolü ve güvenli veri işleme

Gereklilik ve Kullanım Durumu:
- DashboardPage: Gerekli, kullanıcı dashboard'u için ana bileşen
- useDashboardData: Gerekli, veri yönetimi için - GitHub'dan geri yüklendi
- useDashboardActions: Gerekli, aksiyon fonksiyonları için
- Dashboard bileşenleri: Gerekli, UI organizasyonu için

Deploy Durumu: Hazır - useDashboardData hook'u geri yüklendi ve entegrasyon tamamlandı
*/

'use client'; // Bu dosya client-side'da çalışacak (tarayıcıda)

// React hook'larını import et - component state yönetimi için
import { useState } from 'react';
// Dashboard veri yönetimi için custom hook
import { useDashboardData } from '@/hooks/useDashboardData';
// Dashboard aksiyonları için custom hook
import { useDashboardActions } from '@/hooks/useDashboardActions';
// Dashboard UI bileşenleri
import NavigationHeader from '@/components/dashboard/NavigationHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsCards from '@/components/dashboard/StatsCards';
import CreditPackages from '@/components/dashboard/CreditPackages';
import ProfileManagement from '@/components/dashboard/ProfileManagement';
import RecentActivity from '@/components/dashboard/RecentActivity';
// Alt navigasyon bileşeni
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
// Okuma detay modal bileşeni
import ReadingDetailModal from '@/features/shared/ui/ReadingDetailModal';
// Profil düzenleme modal bileşeni
import ProfileModal from '@/features/dashboard/components/shared/ProfileModal';
// i18n hook'u - şu an kullanılmıyor
// import { useTranslations } from '@/hooks/useTranslations';

// Ana Dashboard sayfası bileşeni - Modüler yapı
export default function DashboardPage() {
  // i18n hook'u - şu an kullanılmıyor
  // const { t } = useTranslations();

  // Dashboard veri yönetimi hook'u
  const {
    profile,
    recentReadings,
    packages,
    isAdmin,
    totalCount,
    currentLocale,
    refreshCreditBalance,
    setProfile,
    user,
    paymentLoading,
    translate,
  } = useDashboardData();

  // Dashboard aksiyonları hook'u
  const {
    profileModalOpen,
    editing,
    editForm,
    saving,
    selectedReading,
    handlePackagePurchase,
    handleLogout,
    openProfileModal,
    handleSaveProfile,
    setProfileModalOpen,
    setEditing,
    setEditForm,
    setSelectedReading,
  } = useDashboardActions(profile, user, currentLocale, setProfile);

  // Mobil sidebar state'i
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth kontrolü yok - dashboard herkese açık

  // Ana dashboard sayfası JSX'i - Modüler yapı
  return (
    <div className='min-h-screen bg-cosmic-black'>
      {/* Navigation Header - Üst navigasyon bileşeni */}
      <NavigationHeader
        currentLocale={currentLocale}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content - Ana içerik alanı */}
      <div className='pt-16'>
        {' '}
        {/* Üst navigasyon için padding */}
        {/* Dashboard Content - Dashboard içeriği */}
        <main className='p-4 md:p-6 pb-24 min-h-screen'>
          {/* Welcome Section - Hoş geldin bölümü */}
          <WelcomeSection profile={profile} user={user} isAdmin={isAdmin} />

          {/* Stats Cards - İstatistik kartları */}
          <StatsCards
            profile={profile}
            totalCount={totalCount}
            isAdmin={isAdmin}
            recentReadings={recentReadings}
            refreshCreditBalance={refreshCreditBalance}
            translate={translate}
          />

          {/* Credit Packages Section - Kredi paketleri bölümü */}
          <CreditPackages
            packages={packages}
            handlePackagePurchase={handlePackagePurchase}
            paymentLoading={paymentLoading}
            translate={translate}
          />

          {/* Profile Management - Profil yönetimi bölümü */}
          <ProfileManagement openProfileModal={openProfileModal} />

          {/* Recent Activity - Son aktiviteler bölümü */}
          <RecentActivity
            recentReadings={recentReadings}
            setSelectedReading={setSelectedReading}
            totalReadings={totalCount}
            isAdmin={isAdmin}
          />
        </main>
      </div>

      {/* Mobile Overlay - Mobil overlay (sidebar arka planı) */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-cosmic-black/80 md:hidden'
          onClick={() => setSidebarOpen(false)} // Overlay'e tıklayınca sidebar'ı kapat
        />
      )}

      {/* Reading Detail Modal - Okuma detay modal'ı */}
      {selectedReading && (
        <ReadingDetailModal
          reading={selectedReading}
          isOpen={!!selectedReading}
          onClose={() => setSelectedReading(null)} // Modal'ı kapat
        />
      )}

      {/* Profile Modal - Profil düzenleme modal'ı */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)} // Modal'ı kapat
        profile={profile}
        user={user}
        editing={editing}
        editForm={editForm}
        saving={saving}
        onEdit={() => setEditing(true)} // Düzenleme modunu aç
        onCancelEdit={() => setEditing(false)} // Düzenleme modunu kapat
        onSave={handleSaveProfile} // Profil kaydetme işlemi
        onFormChange={(field, value) =>
          setEditForm(prev => ({ ...prev, [field]: value }))
        } // Form değişikliklerini işle
        currentLocale={currentLocale}
      />

      {/* Bottom Navigation - Alt navigasyon */}
      <BottomNavigation />
    </div>
  );
}
