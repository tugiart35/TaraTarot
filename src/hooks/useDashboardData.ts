// Dashboard sayfası için veri yönetimi hook'u

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { useShopier } from '@/hooks/useShopier';
import { ensureProfileExists } from '@/lib/utils/profile-utils';
import { UserProfile, Reading, Package } from '@/types/dashboard.types';
import { getReadingTitle, getReadingSummary, getCreditCost, getFallbackPackages } from '@/utils/dashboard-utils';

// Dashboard veri yönetimi için custom hook
export const useDashboardData = () => {
  // useAuth hook'undan kullanıcı bilgilerini al
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  // useTranslations hook'undan çeviri fonksiyonunu al
  const { t: translate } = useTranslations();
  // useShopier hook'undan ödeme fonksiyonlarını al
  const { loading: paymentLoading } = useShopier();
  // Mevcut sayfa URL'ini al
  const pathname = usePathname();
  // Programatik sayfa yönlendirme için router
  const router = useRouter();
  
  // Pathname'den locale'i çıkar (örn: /tr/dashboard -> tr)
  const currentLocale = pathname.split('/')[1] || 'tr';
  
  // Component state'leri - kullanıcı profil bilgileri
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Son okumalar listesi
  const [recentReadings, setRecentReadings] = useState<Reading[]>([]);
  // Kredi paketleri listesi
  const [packages, setPackages] = useState<Package[]>([]);
  // Sayfa yükleme durumu
  const [loading, setLoading] = useState(true);
  // Admin kullanıcı kontrolü
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Toplam okuma sayısı - hesaplanan değer
  const totalCount = recentReadings.length;

  // Sayfa yüklendiğinde çalışacak useEffect - authentication kontrolü
  useEffect(() => {
    if (!authLoading) { // Auth yüklemesi tamamlandıysa
      // Dashboard sadece giriş yapmış kullanıcılara açık
      if (!isAuthenticated) {
        // Giriş yapmamış kullanıcıları locale ile auth sayfasına yönlendir
        router.replace(`/${currentLocale}/auth`);
        return;
      }
      checkAuth(); // Giriş yapmışsa auth kontrolü yap
    }
  }, [authLoading, isAuthenticated, currentLocale, router]); // Bu değerler değiştiğinde tekrar çalış

  // Sayfa focus olduğunda kredi bakiyesini yenile - gerçek zamanlı güncelleme için
  useEffect(() => {
    // Pencere odaklandığında çalışacak fonksiyon
    const handleFocus = () => {
      if (isAuthenticated && user?.id) {
        refreshCreditBalance(); // Kredi bakiyesini yenile
      }
    };

    // Sayfa görünürlüğü değiştiğinde çalışacak fonksiyon
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated && user?.id) {
        refreshCreditBalance(); // Kredi bakiyesini yenile
      }
    };

    // Kredi değişikliği event listener'ı - custom event
    const handleCreditChange = () => {
      if (isAuthenticated && user?.id) {
        refreshCreditBalance(); // Kredi bakiyesini yenile
      }
    };

    // Event listener'ları ekle
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('creditBalanceChanged', handleCreditChange);

    // Cleanup fonksiyonu - component unmount olduğunda event listener'ları kaldır
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('creditBalanceChanged', handleCreditChange);
    };
  }, [isAuthenticated, user]); // Bu değerler değiştiğinde tekrar çalış

  // Kullanıcı authentication kontrolü ve veri yükleme fonksiyonu
  const checkAuth = async () => {
    // Sadece giriş yapmış kullanıcılar için profil bilgilerini al
    if (!user?.id) {
      setLoading(false); // Loading'i kapat
      return;
    }
      // Profile bilgilerini al veya oluştur - utility fonksiyonu ile
      const profileResult = await ensureProfileExists(user);
      
      if (profileResult.success) {
        setProfile(profileResult.profile); // Profil bilgilerini state'e set et
      } else {
        // Hata durumunda da devam et, sadece profil bilgileri olmayacak
      }

      // Son okumaları al - kullanıcının son okumalarını getir
      await fetchRecentReadings(user.id);
      
        // Son işlemleri al - kullanıcının kredi işlemlerini getir
        await fetchRecentTransactions(user.id);

        // Aktif paketleri al - satın alınabilir kredi paketlerini getir
        await fetchActivePackages();

      // Admin kontrolü - sadece kullanıcının kendi admin durumunu kontrol et
      const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (admin) {
        setIsAdmin(true); // Admin ise state'i güncelle
      }
    setLoading(false); // Tüm veriler yüklendi, loading'i kapat
  };

  // Kredi bakiyesini yenile - gerçek zamanlı güncelleme için
  const refreshCreditBalance = async () => {
    if (!user?.id) {
      return; // Kullanıcı yoksa çık
    }
    
    try {
      // Supabase'den güncel kredi bakiyesini çek
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();
      
      if (error) {
        return; // Hata varsa çık
      }
      
      if (profileData) {
        // Profil state'ini güncelle - sadece credit_balance'ı değiştir
        setProfile(prev => prev ? { ...prev, credit_balance: profileData.credit_balance } : null);
      } else {
        // Veri yoksa hiçbir şey yapma
      }
    } catch (error) {
      // Hata durumunda sessizce devam et
    }
  };

  // Son okumaları getir - kullanıcının son 30 günlük okumalarını çek
  const fetchRecentReadings = async (userId: string) => {
    try {
      // tarot_readings tablosundan son 30 günün okumalarını çek
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 30 gün öncesini hesapla
      
      
      // Sadece kullanıcının kendi okumalarını çek - doğrudan readings tablosundan
      const { data, error } = await supabase
        .from('readings')
        .select(`
          id,
          user_id,
          reading_type,
          cards,
          interpretation,
          questions,
          status,
          title,
          cost_credits,
          created_at
        `)
        .eq('user_id', userId) // Sadece bu kullanıcının okumaları
        .gte('created_at', thirtyDaysAgo.toISOString()) // Son 30 gün
        .order('created_at', { ascending: false }) // En yeni önce
        .limit(10); // Maksimum 10 okuma

      if (error) {
        // Hata durumunda boş array set et
        setRecentReadings([]);
        return;
      }
      if (data) {
        // Verileri işle ve formatla
        const processedReadings: Reading[] = data.map((reading) => {
          // Başlık oluştur - okuma türüne göre
          const title = reading.title || getReadingTitle(reading.reading_type);
          
          // Özet oluştur (interpretation'dan ilk 100 karakter)
          const summary = getReadingSummary(reading.interpretation);
          
          // Kredi maliyeti hesapla - sadece gerekli olanlar
          const cost_credits = getCreditCost(reading.reading_type);
          
          // Reading objesini oluştur
          return {
            id: reading.id,
            user_id: reading.user_id,
            reading_type: reading.reading_type,
            cards: reading.cards || '',
            interpretation: reading.interpretation || '',
            questions: reading.questions || {},
            status: reading.status || 'completed',
            created_at: reading.created_at,
            title,
            cost_credits,
            // Eski uyumluluk için
            type: reading.reading_type as 'tarot' | 'numerology' | 'love' | 'simple' | 'general' | 'career',
            summary
          };
        });
        
        setRecentReadings(processedReadings); // State'i güncelle
      } else {
        // Veri yoksa boş array set et
        setRecentReadings([]);
      }
    } catch (error) {
      // Hata durumunda boş array set et
      setRecentReadings([]);
    }
  };

  // Son işlemleri getir - kullanıcının kredi işlemlerini çek
  const fetchRecentTransactions = async (userId: string) => {
    try {
      
      // transactions tablosundan sadece kullanıcının kendi işlemlerini çek
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          user_id,
          type,
          amount,
          description,
          delta_credits,
          reason,
          created_at
        `)
        .eq('user_id', userId) // Sadece bu kullanıcının işlemleri
        .order('created_at', { ascending: false }) // En yeni önce
        .limit(10); // Maksimum 10 işlem

      if (error) {
        return; // Hata varsa çık
      }
      if (data) {
        // Transactions processed but not stored since state was removed
        // İşlemler işlendi ama state kaldırıldığı için saklanmıyor
      }
    } catch (error) {
      // Hata durumunda sessizce devam et
    }
  };

  // Aktif kredi paketlerini getir - satın alınabilir paketleri çek
  const fetchActivePackages = async () => {
    try {
      
      // packages tablosundan sadece aktif paketleri çek
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('active', true) // Sadece aktif paketler
        .order('credits', { ascending: true }) // Kredi miktarına göre sırala
        .limit(3); // Dashboard'da sadece 3 paket göster

      if (error) {
        // Hata durumunda fallback paketler kullan
        setPackages(getFallbackPackages()); // Fallback paketleri set et
        return;
      }
      if (data && data.length > 0) {
        // Veritabanından gelen paketleri işle
        const processedPackages: Package[] = data.map((pkg) => ({
          id: pkg.id || Date.now(),
          name: pkg.name || 'Unnamed Package',
          description: pkg.description || '',
          credits: pkg.credits || 0,
          price_eur: pkg.price_eur || 0,
          price_try: pkg.price_try || 0,
          active: pkg.active !== false,
          created_at: pkg.created_at || new Date().toISOString(),
          shopier_product_id: pkg.shopier_product_id || null
        }));
        
        setPackages(processedPackages); // İşlenmiş paketleri set et
      } else {
        // Veri yoksa fallback paketler kullan
        setPackages(getFallbackPackages()); // Fallback paketleri set et
      }
    } catch (error) {
      // Hata durumunda sessizce devam et
    }
  };

  return {
    // State
    profile,
    recentReadings,
    packages,
    loading: authLoading || loading,
    isAdmin,
    totalCount,
    currentLocale,
    
    // Actions
    refreshCreditBalance,
    
    // User data
    user,
    isAuthenticated,
    paymentLoading,
    translate
  };
};
