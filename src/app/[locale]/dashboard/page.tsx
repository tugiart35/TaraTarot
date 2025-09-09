/*
info:
Bağlantılı dosyalar:
- @/hooks/useAuth: Kullanıcı giriş durumu kontrolü için (gerekli)
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)
- lucide-react: İkonlar için (gerekli)

Dosyanın amacı:
- Giriş yapmış kullanıcılar için dashboard sayfası oluşturur.
- Kullanıcı profil bilgilerini, okuma geçmişini ve istatistikleri gösterir.
- Kredi bakiyesi, hızlı işlemler ve profil yönetimi özellikleri sunar.

Backend bağlantısı:
- Supabase auth ile kullanıcı doğrulama
- profiles, readings, transactions tablolarından veri çekme
- Burada backend'e bağlanılacak - profil güncelleme işlemleri

Geliştirme ve öneriler:
- useAuth hook'u ile tutarlı auth kontrolü
- Responsive tasarım ve modern UI
- Kullanıcı deneyimi odaklı hızlı erişim menüleri
- Güvenli profil yönetimi ve veri işleme

Hatalar / Geliştirmeye Açık Noktalar:
- Auth kontrolü useAuth hook'u ile güçlendirilebilir
- Loading state'leri daha detaylı hale getirilebilir
- Error handling iyileştirilebilir
- PWA desteği eklenebilir

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz kod yapısı, açık fonksiyon isimleri
- Optimizasyon: Gereksiz re-render'lar önlenmiş
- Yeniden Kullanılabilirlik: Modüler bileşen yapısı
- Güvenlik: Auth kontrolü ve güvenli veri işleme

Gereklilik ve Kullanım Durumu:
- DashboardPage: Gerekli, kullanıcı dashboard'u için ana bileşen
- checkAuth: Gerekli, kullanıcı doğrulama için
- fetchRecentReadings: Gerekli, okuma geçmişi için
- fetchRecentTransactions: Gerekli, işlem geçmişi için
*/

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { useShopier } from '@/hooks/useShopier';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import {
  CREDIT_CONSTANTS,
  READING_CREDIT_CONFIGS,
} from '@/lib/constants/reading-credits';
import { ensureProfileExists } from '@/lib/utils/profile-utils';
import { 
  Moon, Coins, Star, Hash, TrendingUp, 
  Calendar, User, Download, Eye, BarChart3, 
  BookOpen,
  Clock, Award, Settings,
  Menu, X, AlertCircle, Edit, RefreshCw,
  Crown
} from 'lucide-react';

interface UserProfile {
  id: string;
  display_name?: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  credit_balance?: number;
  bio?: string;
  birth_date?: string;
  timezone?: string;
  full_name?: string;
  username?: string;
  gender?: string;
  website?: string;
  preferences?: any;
  last_login?: string;
  total_readings?: number;
  is_premium?: boolean;
}

interface Reading {
  id: string;
  type: 'tarot' | 'numerology' | 'love' | 'simple' | 'general' | 'career';
  title: string;
  summary: string;
  created_at: string;
  cost_credits: number;
  spread_name?: string;
}


interface Transaction {
  id: string;
  type: 'purchase' | 'usage' | 'refund';
  amount: number;
  description: string;
  created_at: string;
}

interface Package {
  id: number;
  name: string;
  credits: number;
  price_eur: number;
  price_try: number;
  active: boolean;
  created_at: string;
  description?: string;
  shopier_product_id?: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { t: translate } = useTranslations();
  const { initiatePayment, loading: paymentLoading, error: paymentError } = useShopier();
  const pathname = usePathname();
  const router = useRouter();
  
  // Pathname'den locale'i çıkar (örn: /tr/dashboard -> tr)
  const currentLocale = pathname.split('/')[1] || 'tr';
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentReadings, setRecentReadings] = useState<Reading[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  
  // Toplam okuma sayısı
  const totalCount = recentReadings.length;

  useEffect(() => {
    if (!authLoading) {
      // Dashboard sadece giriş yapmış kullanıcılara açık
      if (!isAuthenticated) {
        // Giriş yapmamış kullanıcıları locale ile auth sayfasına yönlendir
        router.replace(`/${currentLocale}/auth`);
        return;
      }
      checkAuth();
    }
  }, [authLoading, isAuthenticated, currentLocale, router]);

  // Sayfa focus olduğunda kredi bakiyesini yenile
  useEffect(() => {
    const handleFocus = () => {
      if (isAuthenticated && user) {
        refreshCreditBalance();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated && user) {
        refreshCreditBalance();
      }
    };

    // Kredi değişikliği event listener'ı
    const handleCreditChange = () => {
      if (isAuthenticated && user) {
        refreshCreditBalance();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('creditBalanceChanged', handleCreditChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('creditBalanceChanged', handleCreditChange);
    };
  }, [isAuthenticated, user]);

  const checkAuth = async () => {
    // Sadece giriş yapmış kullanıcılar için profil bilgilerini al
    if (!user) {
      setLoading(false);
      return;
    }
      // Profile bilgilerini al veya oluştur
      const profileResult = await ensureProfileExists(user);
      
      if (profileResult.success) {
        setProfile(profileResult.profile);
      } else {
        console.error('Profile check/creation failed:', profileResult.error);
        // Hata durumunda da devam et, sadece profil bilgileri olmayacak
      }

      // Son okumaları al
      await fetchRecentReadings(user.id);
      
        // Son işlemleri al
        await fetchRecentTransactions(user.id);

        // Aktif paketleri al
        await fetchActivePackages();

      // Admin kontrolü - sadece kullanıcının kendi admin durumunu kontrol et
      const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('Admin kontrolü - user.id:', user.id, 'admin:', admin);

      if (admin) {
        setIsAdmin(true);
      }
    setLoading(false);
  };

  // Kredi bakiyesini yenile
  const refreshCreditBalance = async () => {
    if (!user) return;
    
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Kredi bakiyesi güncelleme hatası:', error);
        return;
      }
      
      if (profileData) {
        setProfile(prev => prev ? { ...prev, credit_balance: profileData.credit_balance } : null);
      }
    } catch (error) {
      console.error('Kredi bakiyesi yenileme hatası:', error);
    }
  };


  const fetchRecentReadings = async (userId: string) => {
    try {
      // tarot_readings tablosundan son 30 günün okumalarını çek
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      console.log('fetchRecentReadings - userId:', userId);
      
      // Sadece kullanıcının kendi okumalarını çek
      const { data, error } = await supabase
        .from('tarot_readings')
        .select(`
          id,
          user_id,
          reading_type,
          cards,
          interpretation,
          question,
          status,
          title,
          cost_credits,
          created_at
        `)
        .eq('user_id', userId)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching recent readings:', error);
        return;
      }

      console.log('fetchRecentReadings - data:', data);

      if (data) {
        const processedReadings: Reading[] = data.map((reading) => {
          // Başlık oluştur
          const title = reading.title || (reading.reading_type === 'love' ? 'Aşk Okuması' : 
                       reading.reading_type === 'general' ? 'Genel Okuma' : 
                       reading.reading_type === 'career' ? 'Kariyer Okuması' : 
                       reading.reading_type === 'simple' ? 'Basit Okuma' :
                       'Numeroloji Analizi');
          
          // Özet oluştur (interpretation'dan ilk 100 karakter)
          const summary = reading.interpretation.length > 100 ? 
                         reading.interpretation.substring(0, 100) + '...' : 
                         reading.interpretation;
          
          // Kredi maliyeti hesapla - sadece gerekli olanlar
          const getCreditCost = (readingType: string): number => {
            switch (readingType) {
              case 'LOVE_SPREAD_DETAILED':
                return READING_CREDIT_CONFIGS.LOVE_SPREAD_DETAILED.cost;
              case 'LOVE_SPREAD_WRITTEN':
                return READING_CREDIT_CONFIGS.LOVE_SPREAD_WRITTEN.cost;
              case 'simple':
                return 0; // Basit okuma ücretsiz
              default:
                return reading.cost_credits || 50; // Fallback - yazılı okuma varsayılan
            }
          };
          const cost_credits = getCreditCost(reading.reading_type);
          
          return {
            id: reading.id,
            type: reading.reading_type,
            title,
            summary,
            created_at: reading.created_at,
            cost_credits
          };
        });
        
        setRecentReadings(processedReadings);
      }
    } catch (error) {
      console.error('Error fetching recent readings:', error);
    }
  };

  const fetchRecentTransactions = async (userId: string) => {
    try {
      console.log('fetchRecentTransactions - userId:', userId);
      
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
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching transactions:', error);
        // Hata durumunda mock data kullan
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'purchase',
            amount: 50,
            description: 'Kredi satın alma',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            type: 'usage',
            amount: -2,
            description: 'Tarot okuması',
            created_at: new Date(Date.now() - 3600000).toISOString()
          }
        ];
        setRecentTransactions(mockTransactions);
        return;
      }

      console.log('fetchRecentTransactions - data:', data);

      if (data) {
        const processedTransactions: Transaction[] = data.map((transaction) => ({
          id: transaction.id,
          type: transaction.type as 'purchase' | 'usage' | 'refund',
          amount: transaction.amount,
          description: transaction.description || transaction.reason || 'İşlem',
          created_at: transaction.created_at
        }));
        
        setRecentTransactions(processedTransactions);
      } else {
        // Veri yoksa mock data kullan
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'purchase',
            amount: 50,
            description: 'Kredi satın alma',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            type: 'usage',
            amount: -2,
            description: 'Tarot okuması',
            created_at: new Date(Date.now() - 3600000).toISOString()
          }
        ];
        setRecentTransactions(mockTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchActivePackages = async () => {
    try {
      console.log('fetchActivePackages - fetching active packages');
      
      // packages tablosundan sadece aktif paketleri çek
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('active', true)
        .order('credits', { ascending: true })
        .limit(3); // Dashboard'da sadece 3 paket göster

      if (error) {
        console.error('Error fetching packages:', error);
        // Hata durumunda fallback paketler kullan
        const fallbackPackages: Package[] = [
          {
            id: 1,
            name: 'Başlangıç',
            credits: 100,
            price_eur: 0.99,
            price_try: 29.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'Temel okumalar için ideal',
            shopier_product_id: 'https://www.shopier.com/38014526'
          },
          {
            id: 2,
            name: 'Popüler',
            credits: 300,
            price_eur: 2.49,
            price_try: 79.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'En çok tercih edilen paket',
            shopier_product_id: 'https://www.shopier.com/38014551'
          },
          {
            id: 3,
            name: 'Premium',
            credits: 500,
            price_eur: 3.99,
            price_try: 119.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'Sınırsız okuma deneyimi',
            shopier_product_id: 'https://www.shopier.com/38014558'
          }
        ];
        setPackages(fallbackPackages);
        return;
      }

      console.log('fetchActivePackages - data:', data);

      if (data && data.length > 0) {
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
        
        setPackages(processedPackages);
      } else {
        // Veri yoksa fallback paketler kullan
        const fallbackPackages: Package[] = [
          {
            id: 1,
            name: 'Başlangıç',
            credits: 100,
            price_eur: 0.99,
            price_try: 29.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'Temel okumalar için ideal',
            shopier_product_id: 'https://www.shopier.com/38014526'
          },
          {
            id: 2,
            name: 'Popüler',
            credits: 300,
            price_eur: 2.49,
            price_try: 79.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'En çok tercih edilen paket',
            shopier_product_id: 'https://www.shopier.com/38014551'
          },
          {
            id: 3,
            name: 'Premium',
            credits: 500,
            price_eur: 3.99,
            price_try: 119.99,
            active: true,
            created_at: new Date().toISOString(),
            description: 'Sınırsız okuma deneyimi',
            shopier_product_id: 'https://www.shopier.com/38014558'
          }
        ];
        setPackages(fallbackPackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handlePackagePurchase = async (pkg: Package) => {
    if (!user || !profile) {
      alert('Lütfen giriş yapın');
      return;
    }

    try {
      // Shopier linki varsa direkt yönlendir
      if (pkg.shopier_product_id) {
        window.open(pkg.shopier_product_id, '_blank');
        return;
      }

      // Fallback: Shopier ödeme sistemi ile satın alma
      await initiatePayment(pkg.id.toString(), pkg);
    } catch (error) {
      console.error('Paket satın alma hatası:', error);
      alert('Paket satın alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMemberSince = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} gün`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay`;
    return `${Math.floor(diffDays / 365)} yıl`;
  };

  const openProfileModal = async () => {
    if (!user) return;
    
    try {
      // Supabase'den güncel profil verilerini çek
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profil verisi çekme hatası:', error);
        // Hata durumunda mevcut profile verilerini kullan
        setEditForm(profile || {});
      } else {
        console.log('Güncel profil verisi:', profileData);
        setEditForm(profileData || {});
        // State'i de güncelle
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Profil modal açma hatası:', error);
      setEditForm(profile || {});
    }
    
    setProfileModalOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      console.log('Profil güncelleme - user.id:', user.id);
      console.log('Profil güncelleme - editForm:', editForm);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(editForm)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profil güncelleme hatası:', error);
        throw error;
      }

      console.log('Profil başarıyla güncellendi:', data);
      
      // State'i güncelle
      setProfile(data);
      setEditing(false);
      setProfileModalOpen(false);
      
      // Başarı mesajı göster
      alert('Profil başarıyla güncellendi!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profil güncellenirken bir hata oluştu: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm(profile || {});
    setEditing(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-cosmic-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <div className="text-text-celestial text-lg">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-black">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 admin-sidebar border-b border-mystical-700/50">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-mystic rounded-lg flex items-center justify-center">
              <Moon className="h-5 w-5 text-cosmic-black" />
            </div>
            <span className="text-xl font-bold text-text-celestial">Busbuskimki</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a 
              href={`/${currentLocale}/dashboard`} 
              className="flex items-center space-x-2 px-4 py-2 text-gold bg-crystal-clear border-b-2 border-gold rounded-t-lg transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a 
              href={`/${currentLocale}/dashboard/readings`} 
              className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Okumalar</span>
            </a>
            <a 
              href={`/${currentLocale}/dashboard/statistics`} 
              className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>İstatistikler</span>
            </a>
            <a 
              href={`/${currentLocale}/dashboard/settings`} 
              className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Ayarlar</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-text-muted hover:text-text-celestial hover:bg-crystal-clear"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {sidebarOpen && (
          <div className="md:hidden border-t border-mystical-700/50">
            <nav className="px-4 py-2 space-y-1">
              <a 
                href={`/${currentLocale}/dashboard`} 
                className="flex items-center space-x-3 px-4 py-3 text-gold bg-crystal-clear border-l-4 border-gold rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </a>
              <a 
                href={`/${currentLocale}/dashboard/readings`} 
                className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <BookOpen className="h-5 w-5" />
                <span>Okumalar</span>
              </a>
              <a 
                href={`/${currentLocale}/dashboard/statistics`} 
                className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <TrendingUp className="h-5 w-5" />
                <span>İstatistikler</span>
              </a>
              <a 
                href={`/${currentLocale}/dashboard/settings`} 
                className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-16">
        {/* Dashboard Content */}
        <main className="p-4 md:p-6 pb-24 min-h-screen">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="card-mystic p-8 text-text-celestial mystic-glow">
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="w-20 h-20 bg-crystal-clear rounded-full flex items-center justify-center border-2 border-gold flex-shrink-0">
                  <span className="text-3xl font-bold text-gold">
                    {profile?.display_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <h1 className="text-heading-1 text-gold mb-3">
                    Hoş geldiniz, {profile?.display_name || user?.email?.split('@')[0] || 'Mistik Kullanıcı'} ✨
                  </h1>
                  <p className="text-text-mystic text-body-large mb-4">
                    Mistik yolculuğunuz {profile?.created_at ? getMemberSince(profile.created_at) : 'yeni'} süredir devam ediyor
                  </p>
                  {user?.email && (
                    <p className="text-text-muted text-sm mb-3">
                      📧 {user.email}
                    </p>
                  )}
                  {isAdmin && (
                    <div className="mb-3">
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30">
                        👑 Admin
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-crystal-clear px-3 py-1 rounded-full text-sm border border-gold/30">
                      {profile?.created_at ? formatDate(profile.created_at) : 'Yeni üye'}
                    </span>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="card hover-lift p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gold/20 rounded-lg">
                    <Coins className="h-6 w-6 text-gold" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-text-muted">Kredi Bakiyesi</p>
                    <p className="text-2xl font-bold text-text-celestial">{profile?.credit_balance || 0}</p>
                  </div>
                </div>
                <button
                  onClick={refreshCreditBalance}
                  className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                  title="Kredi bakiyesini yenile"
                >
                  <RefreshCw className="h-4 w-4 text-gold" />
                </button>
              </div>
            </div>
            
            <div className="card hover-lift p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <div className="ml-4">
                <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.totalReadings', 'Toplam Okuma')}</p>
                <p className="text-2xl font-bold text-admin-text">{totalCount}</p>
                  <p className="text-xs text-text-muted">Son 30 gün</p>
                </div>
              </div>
            </div>
            
            <div className="card hover-lift p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-muted">Üyelik Süresi</p>
                  <p className="text-2xl font-bold text-text-celestial">
                    {profile?.created_at ? getMemberSince(profile.created_at) : 'Yeni'}
                  </p>
                  <p className="text-xs text-text-muted">
                    {profile?.created_at ? formatDate(profile.created_at) : 'Bugün'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover-lift p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Award className="h-6 w-6 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-muted">Kullanıcı Seviyesi</p>
                  <p className="text-2xl font-bold text-text-celestial">
                    {isAdmin ? 'Admin' : recentReadings.length > 10 ? 'Uzman' : recentReadings.length > 5 ? 'Orta' : 'Başlangıç'}
                  </p>
              
                </div>
              </div>
            </div>
          </div>

          {/* Credit Balance Alert */}
          {profile?.credit_balance && profile.credit_balance < CREDIT_CONSTANTS.CREDIT_ALERTS.LOW_BALANCE_THRESHOLD && (
            <div className="card bg-warning/10 border-warning/30 p-4 mb-8">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-warning mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-warning">Düşük Kredi Bakiyesi</h3>
                  <p className="text-sm text-text-muted mt-1">
                    Daha fazla okuma yapmak için kredi satın alın
                  </p>
                </div>
                <a
                  href="/packages"
                  className="btn btn-primary ml-auto"
                >
                  Kredi Satın Al
                </a>
              </div>
            </div>
          )}

         
          

          {/* Credit Packages Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2 text-gold">{translate('dashboard.creditPackages')}</h2>
              <a 
                href="/dashboard/packages" 
                className="text-gold hover:text-gold/80 transition-colors text-sm flex items-center space-x-1"
              >
                <span>Tümünü Gör</span>
                <span>→</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                // Paket türüne göre renk ve ikon belirle
                const getPackageStyle = (credits: number) => {
                  if (credits >= 500) {
                    return {
                      icon: Crown,
                      iconColor: 'text-purple-400',
                      bgColor: 'bg-purple-500/10',
                      borderColor: 'border-purple-500/30',
                      creditColor: 'text-purple-400',
                      buttonClass: 'btn-secondary'
                    };
                  } else if (credits >= 300) {
                    return {
                      icon: Star,
                      iconColor: 'text-gold',
                      bgColor: 'bg-gold/10',
                      borderColor: 'border-gold/30',
                      creditColor: 'text-gold',
                      buttonClass: 'btn-primary',
                      isPopular: true
                    };
                  } else {
                    return {
                      icon: Coins,
                      iconColor: 'text-blue-400',
                      bgColor: 'bg-blue-500/10',
                      borderColor: 'border-blue-500/30',
                      creditColor: 'text-blue-400',
                      buttonClass: 'btn-secondary'
                    };
                  }
                };

                const style = getPackageStyle(pkg.credits);
                const IconComponent = style.icon;

                return (
                  <div 
                    key={pkg.id}
                    className={`card hover-lift p-6 relative ${style.isPopular ? 'ring-2 ring-gold/50' : ''}`}
                  >
                    {/* Popüler etiketi */}
                    {style.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gold text-cosmic-black px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>Popüler</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`inline-flex p-3 ${style.bgColor} border ${style.borderColor} rounded-lg mb-4`}>
                        <IconComponent className={`h-6 w-6 ${style.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-text-celestial mb-2">{pkg.name}</h3>
                      
                      <div className="mb-4">
                        <div className={`text-3xl font-bold ${style.creditColor} mb-1`}>
                          {pkg.credits.toLocaleString()}
                        </div>
                        <div className="text-sm text-text-muted">
                          kredi
                          {pkg.credits >= 500 && (
                            <span className="text-green-400 ml-1">+60 bonus</span>
                          )}
                          {pkg.credits >= 300 && pkg.credits < 500 && (
                            <span className="text-green-400 ml-1">+40 bonus</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="text-2xl font-bold text-text-celestial">
                          {pkg.price_try.toFixed(2)} TRY
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handlePackagePurchase(pkg)}
                        disabled={paymentLoading}
                        className={`w-full ${style.buttonClass} text-center block ${paymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {paymentLoading ? 'Yönlendiriliyor...' : 'Satın Al'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Management Section */}
          <div className="mb-8">
            <h2 className="text-heading-2 text-gold mb-4">Profil Yönetimi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={openProfileModal}
                className="card hover-lift p-6 group text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gold/20 rounded-lg group-hover:bg-gold/30 transition-colors">
                    <User className="h-6 w-6 text-gold" />
                  </div>
                  <span className="text-sm font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                    Ücretsiz
                  </span>
                </div>
                <h3 className="font-semibold text-text-celestial mb-2">Profil Bilgileri</h3>
                <p className="text-text-muted text-sm mb-4">Kişisel bilgilerinizi güncelleyin</p>
                <div className="flex items-center text-sm text-text-dim">
                  <Clock className="h-4 w-4 mr-2" />
                  Hemen erişim
                </div>
              </button>

              <a href="/dashboard/settings" className="card hover-lift p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-success/20 rounded-lg group-hover:bg-success/30 transition-colors">
                    <Settings className="h-6 w-6 text-success" />
                  </div>
                  <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                    Ücretsiz
                  </span>
                </div>
                <h3 className="font-semibold text-text-celestial mb-2">Hesap Ayarları</h3>
                <p className="text-text-muted text-sm mb-4">Güvenlik ve gizlilik ayarları</p>
                <div className="flex items-center text-sm text-text-dim">
                  <Clock className="h-4 w-4 mr-2" />
                  Hemen erişim
                </div>
              </a>

              <a href="/dashboard/credits" className="card hover-lift p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-warning/20 rounded-lg group-hover:bg-warning/30 transition-colors">
                    <Coins className="h-6 w-6 text-warning" />
                  </div>
                  <span className="text-sm font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
                    Ücretsiz
                  </span>
                </div>
                <h3 className="font-semibold text-text-celestial mb-2">Kredi Geçmişi</h3>
                <p className="text-text-muted text-sm mb-4">Tüm işlem geçmişinizi görün</p>
                <div className="flex items-center text-sm text-text-dim">
                  <Clock className="h-4 w-4 mr-2" />
                  Hemen erişim
                </div>
              </a>
            </div>
          </div>

         

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Readings */}
            <div className="card">
              <div className="p-6 border-b border-cosmic-fog">
                <div className="flex items-center justify-between">
                  <h3 className="text-heading-3 text-gold">Son Okumalar</h3>
                  <a href="/dashboard/readings" className="text-gold hover:text-gold/80 text-sm font-medium">
                    Tümünü Gör →
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                {recentReadings.length > 0 ? (
                  <div className="space-y-4">
                    {recentReadings.map((reading) => (
                      <div key={reading.id} className="flex items-center space-x-4 p-4 bg-crystal-clear rounded-lg">
                        <div className={`p-2 rounded-lg ${
                          reading.type === 'love' ? 'bg-purple/20' : 
                          reading.type === 'simple' ? 'bg-green/20' : 'bg-info/20'
                        }`}>
                          {reading.type === 'love' ? (
                            <Star className="h-5 w-5 text-purple" />
                          ) : reading.type === 'simple' ? (
                            <BookOpen className="h-5 w-5 text-green" />
                          ) : (
                            <Hash className="h-5 w-5 text-info" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-celestial truncate">{reading.title}</p>
                          <p className="text-sm text-text-muted">
                            {formatDate(reading.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-text-celestial mb-2">Henüz okuma yapılmamış</h3>
                    <p className="text-sm text-text-muted mb-4">İlk mistik deneyiminizi yaşamak için bir okuma başlatın</p>
                    <a href="/tarot" className="btn btn-primary">
                      Okuma Başlat
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <div className="p-6 border-b border-cosmic-fog">
                <h3 className="text-heading-3 text-gold">Hızlı İstatistikler</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Günlük Limit</span>
                    <span className="text-sm font-semibold text-text-celestial">5/5</span>
                  </div>
                  <div className="w-full bg-crystal-clear rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Haftalık Hedef</span>
                    <span className="text-sm font-semibold text-text-celestial">3/7</span>
                  </div>
                  <div className="w-full bg-crystal-clear rounded-full h-2">
                    <div className="bg-info h-2 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">Mistik Seviye</span>
                    <span className="text-sm font-semibold text-text-celestial">Başlangıç</span>
                  </div>
                  <div className="w-full bg-crystal-clear rounded-full h-2">
                    <div className="bg-purple h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  
                  <a 
                    href="/dashboard/statistics" 
                    className="btn btn-primary w-full"
                  >
                    Detaylı İstatistikler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-cosmic-black/80 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-cosmic-fog">
              <div className="flex items-center justify-between">
                <h2 className="text-heading-2 text-gold">Profil Düzenle</h2>
                <button
                  onClick={() => setProfileModalOpen(false)}
                  className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-heading-3 text-gold mb-4">Kişisel Bilgiler</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">Görünen Ad *</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.display_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                          className="form-input w-full"
                          placeholder="Görünen adınız"
                          required
                        />
                      ) : (
                        <p className="text-text-celestial">{profile?.display_name || 'Belirtilmemiş'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">E-posta</label>
                      <p className="text-text-celestial">{user?.email || profile?.email || 'Belirtilmemiş'}</p>
                      <p className="text-text-muted text-xs mt-1">E-posta adresi değiştirilemez</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">Tam Ad</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.full_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                          className="form-input w-full"
                          placeholder="Tam adınız"
                        />
                      ) : (
                        <p className="text-text-celestial">{profile?.full_name || 'Belirtilmemiş'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">Kullanıcı Adı</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.username || ''}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                          className="form-input w-full"
                          placeholder="Kullanıcı adınız"
                        />
                      ) : (
                        <p className="text-text-celestial">{profile?.username || 'Belirtilmemiş'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">Doğum Tarihi</label>
                      {editing ? (
                        <input
                          type="date"
                          value={editForm.birth_date || ''}
                          onChange={(e) => setEditForm({ ...editForm, birth_date: e.target.value })}
                          className="form-input w-full"
                        />
                      ) : (
                        <p className="text-text-celestial">{profile?.birth_date ? formatDate(profile.birth_date) : 'Belirtilmemiş'}</p>
                      )}
                      <p className="text-text-muted text-xs mt-1">Numeroloji hesaplamaları için kullanılır</p>
                    </div>

                   

                    

                    <div>
                      <label className="block text-sm font-medium text-text-mystic mb-2">Hakkımda</label>
                      {editing ? (
                        <textarea
                          value={editForm.bio || ''}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={3}
                          className="form-input w-full"
                          placeholder="Kendiniz hakkında kısa bir açıklama (isteğe bağlı)"
                        />
                      ) : (
                        <p className="text-text-celestial">{profile?.bio || 'Belirtilmemiş'}</p>
                      )}
                      <p className="text-text-muted text-xs mt-1">Maksimum 200 karakter</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-heading-3 text-gold mb-4">{translate('dashboard.quickAccess')}</h3>
                  <div className="space-y-3">
                    <a href="/dashboard/settings" className="flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-success/20 rounded-lg">
                          <Settings className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-text-celestial font-medium">{translate('dashboard.accountSettings')}</span>
                      </div>
                      <span className="text-success">→</span>
                    </a>

                    <a href="/dashboard/packages" className="flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gold/20 rounded-lg">
                          <Coins className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-text-celestial font-medium">{translate('dashboard.creditPackages')}</span>
                      </div>
                      <span className="text-gold">→</span>
                    </a>

                    <a href="/dashboard/credits" className="flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-info/20 rounded-lg">
                          <User className="h-4 w-4 text-info" />
                        </div>
                        <span className="text-text-celestial font-medium">{translate('dashboard.creditHistory')}</span>
                      </div>
                      <span className="text-info">→</span>
                    </a>

                    <a href="/dashboard/readings" className="flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple/20 rounded-lg">
                          <User className="h-4 w-4 text-purple" />
                        </div>
                        <span className="text-text-celestial font-medium">{translate('dashboard.readingHistory')}</span>
                      </div>
                      <span className="text-purple">→</span>
                    </a>

                    <a href="/dashboard/statistics" className="flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-warning/20 rounded-lg">
                          <User className="h-4 w-4 text-warning" />
                        </div>
                        <span className="text-text-celestial font-medium">{translate('dashboard.statistics')}</span>
                      </div>
                      <span className="text-warning">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-cosmic-fog">
              <div className="flex items-center justify-between">
                {editing ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setProfileModalOpen(false)}
                      className="px-4 py-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                    >
                      Kapat
                    </button>
                    <button
                      onClick={() => {
                        setEditForm({
                          display_name: profile?.display_name || '',
                          full_name: profile?.full_name || '',
                          username: profile?.username || '',
                          bio: profile?.bio || '',
                          timezone: profile?.timezone || '',
                          birth_date: profile?.birth_date || '',
                        });
                        setEditing(true);
                      }}
                      className="btn btn-primary"
                    >
                      <Edit className="h-4 w-4 inline mr-2" />
                      Düzenle
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-cosmic-black/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
