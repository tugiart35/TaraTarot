// Dashboard sayfası için aksiyon fonksiyonları hook'u

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useShopier } from '@/hooks/useShopier';
import { UserProfile, Reading, Package } from '@/types/dashboard.types';
import { downloadReading } from '@/utils/dashboard-utils';

// Dashboard aksiyonları için custom hook
interface User {
  id: string;
  email?: string;
}

export const useDashboardActions = (
  profile: UserProfile | null,
  user: User | null,
  currentLocale: string,
  setProfile: (profile: UserProfile | null) => void
) => {
  // useShopier hook'undan ödeme fonksiyonlarını al
  const { initiatePayment, loading: paymentLoading } = useShopier();
  // Programatik sayfa yönlendirme için router
  const router = useRouter();

  // Modal state'leri
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);

  // Paket satın alma işlemini yönet - Shopier entegrasyonu
  const handlePackagePurchase = async (pkg: Package) => {
    if (!user || !profile) {
      alert('Lütfen giriş yapın'); // Kullanıcı giriş yapmamışsa uyar
      return;
    }

    try {
      // Shopier linki varsa direkt yönlendir
      if (pkg.shopier_product_id) {
        window.open(pkg.shopier_product_id, '_blank'); // Yeni sekmede aç
        return;
      }

      // Fallback: Shopier ödeme sistemi ile satın alma
      await initiatePayment(pkg.id.toString(), pkg); // useShopier hook'u ile ödeme başlat
    } catch (error) {
      alert('Paket satın alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Çıkış yap fonksiyonu - Basitleştirilmiş logout
  const handleLogout = async () => {
    console.log('🚪 Çıkış yapma işlemi başlatılıyor...');
    
    try {
      // Direkt Supabase signOut çağrısı - session kontrolü yapmadan
      console.log('🔐 Supabase signOut çağrılıyor...');
      const { error } = await supabase.auth.signOut();
      
      console.log('🔍 SignOut sonucu:', { hasError: !!error, errorMessage: error?.message });
      
      // Her durumda temizlik yap
      console.log('🧹 Veriler temizleniyor...');
      localStorage.clear();
      sessionStorage.clear();
      
      // Cookie'leri temizle
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      console.log('✅ Temizlik tamamlandı, yönlendiriliyor...');
      
      // Kısa bir bekleme sonrası yönlendir
      setTimeout(() => {
        console.log('🔄 Yönlendirme:', `/${currentLocale}`);
        window.location.href = `/${currentLocale}`;
      }, 100);
      
    } catch (error) {
      console.error('❌ Çıkış yapma hatası:', error);
      
      // Hata durumunda da temizlik yap
      localStorage.clear();
      sessionStorage.clear();
      
      // Cookie'leri temizle
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      console.log('🔄 Hata durumunda yönlendiriliyor...');
      window.location.href = `/${currentLocale}`;
    }
  };

  // Profil modal'ını aç ve güncel verileri yükle
  const openProfileModal = async () => {
    if (!user) return; // Kullanıcı yoksa çık

    try {
      // Supabase'den güncel profil verilerini çek
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id) // Sadece bu kullanıcının profilini
        .single();

      if (error) {
        // Hata durumunda mevcut profile verilerini kullan
        setEditForm(profile || {});
      } else {
        setEditForm(profileData || {}); // Edit form'a veriyi set et
        // State'i de güncelle
        setProfile(profileData);
      }
    } catch (error) {
      setEditForm(profile || {}); // Hata durumunda mevcut profili kullan
    }

    setProfileModalOpen(true); // Modal'ı aç
  };

  // Profil kaydetme işlemini yönet - Supabase'e güncelleme gönder
  const handleSaveProfile = async () => {
    if (!user) return; // Kullanıcı yoksa çık

    setSaving(true); // Kaydetme durumunu başlat
    try {
      // Supabase'de profil güncelleme işlemi
      const { data, error } = await supabase
        .from('profiles')
        .update(editForm) // Düzenlenen form verilerini güncelle
        .eq('id', user.id) // Sadece bu kullanıcının profilini
        .select() // Güncellenmiş veriyi geri getir
        .single();

      if (error) {
        throw error; // Hata varsa fırlat
      }

      // State'i güncelle - başarılı güncelleme sonrası
      setProfile(data); // Profil state'ini güncelle
      setEditing(false); // Düzenleme modunu kapat
      setProfileModalOpen(false); // Modal'ı kapat

      // Başarı mesajı göster
      alert('Profil başarıyla güncellendi!');
    } catch (error) {
      alert(
        'Profil güncellenirken bir hata oluştu: ' + (error as Error).message
      );
    } finally {
      setSaving(false); // Kaydetme durumunu sonlandır
    }
  };

  return {
    // State
    profileModalOpen,
    editing,
    editForm,
    saving,
    selectedReading,
    paymentLoading,

    // Actions
    handlePackagePurchase,
    handleLogout,
    openProfileModal,
    handleSaveProfile,
    downloadReading,

    // Setters
    setProfileModalOpen,
    setEditing,
    setEditForm,
    setSelectedReading,
  };
};
