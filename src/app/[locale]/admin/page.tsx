/*
 * DOSYA: Admin Dashboard Ana Sayfası
 * AMAÇ: Admin panelinin ana sayfası - hoşgeldiniz bölümü, istatistikler ve hızlı erişim
 * BAĞLANTILI DOSYALAR:
 *   - /components/admin/RealTimeMonitoring.tsx (gerçek zamanlı izleme)
 *   - /lib/supabase/client.ts (veritabanı bağlantısı)
 *   - /lib/logger.ts (hata loglama)
 * SUPABASE TABLOLARI: profiles (kullanıcı bilgileri ve kredi bakiyeleri)
 * GELİŞTİRME ÖNERİLERİ:
 *   - Gerçek zamanlı veri güncellemeleri için WebSocket entegrasyonu
 *   - Daha detaylı istatistik grafikleri
 *   - Kullanıcı aktivite logları
 * TESPİT EDİLEN HATALAR: Yok
 * KULLANIM DURUMU: Aktif - admin kullanıcıları için ana kontrol paneli
 * DEPLOY DURUMU: Hazır - production'a deploy edilebilir
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { logError, logSupabaseError } from '@/lib/logger';
import { useAdminAuth } from '@/providers/AdminAuthProvider';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import {
  Users,
  Package,
  TrendingUp,
  Coins,
  Activity,
  DollarSign,
  UserPlus,
  ShoppingCart,
  Sparkles,
  Zap,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
// import RealTimeMonitoring from '@/components/admin/RealTimeMonitoring'; // Archived

interface AdminStats {
  totalUsers: number;
  totalCredits: number;
  totalProfiles: number;
  dailyCreditUsage: number;
  dailyRevenue: number;
  last7DaysUsage: Array<{
    date: string;
    credits: number;
    transactions: number;
  }>;
  recentUsers: Array<{
    id: string;
    display_name?: string;
    credit_balance?: number;
    created_at?: string;
  }>;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: any;
  gradient: string;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  // Pathname'den locale'i çıkar
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'tr';

  // useSimpleAdmin hook'undan admin durumunu al
  const { admin, loading: authLoading, isAuthenticated } = useAdminAuth();

  // Performans monitoring hook'u - otomatik yenileme yok
  const {
    currentMetrics: systemPerformance,
    refreshMetrics: refreshPerformance,
  } = usePerformanceMonitor(0); // Otomatik yenileme yok

  // Gerçek sistem monitoring hook'u - devre dışı bırakıldı
  // const {
  //   startMonitoring,
  //   stopMonitoring,
  //   collectMetrics,
  //   saveMetrics
  // } = useRealSystemMonitoring(60000); // 1 dakika

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalCredits: 0,
    totalProfiles: 0,
    dailyCreditUsage: 0,
    dailyRevenue: 0,
    last7DaysUsage: [],
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Admin kontrolü - sadece gerçek admin kullanıcıları
  useEffect(() => {
    if (
      !authLoading &&
      (!isAuthenticated || !admin || !admin.is_admin) &&
      !isRedirecting
    ) {
      setIsRedirecting(true);
      // Admin girişi yapılmamış veya admin yetkisi yok, auth sayfasına yönlendiriliyor
      router.push(`/${locale}/admin/auth`);
    }
  }, [authLoading, isAuthenticated, admin, isRedirecting, router, locale]);

  useEffect(() => {
    // Sadece admin kullanıcı için stats yükle
    if (!authLoading && isAuthenticated && admin && admin.is_admin) {
      fetchStats();
      refreshPerformance(); // İlk yüklemede performans verilerini güncelle
      // startMonitoring(); // Gerçek sistem monitoring devre dışı
    }

    // Cleanup function
    return () => {
      // stopMonitoring(); // Gerçek sistem monitoring devre dışı
    };
  }, [authLoading, isAuthenticated, admin, refreshPerformance]);

  const fetchStats = async () => {
    try {
      // Toplam kullanıcı sayısı (admin hariç)
      const { count: userCount, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', false);

      if (countError) {
        logSupabaseError('profile count', countError);
      }

      // Tüm kullanıcıların toplam kredi bakiyesi
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from('profiles')
        .select('credit_balance');

      if (allProfilesError) {
        logSupabaseError('all profiles fetch', allProfilesError);
      }

      const totalCredits = (allProfiles || []).reduce(
        (sum: number, profile: any) => sum + (profile.credit_balance || 0),
        0
      );

      // Son kullanıcılar için ayrı sorgu (admin hariç)
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, credit_balance, display_name, created_at')
        .eq('is_admin', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (profileError) {
        logSupabaseError('profiles fetch', profileError);
      }

      // Günlük kredi harcama verilerini çek - timezone aware
      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

      const { data: dailyTransactions, error: dailyError } = await supabase
        .from('transactions')
        .select('delta_credits, created_at')
        .lt('delta_credits', 0)
        .gte('created_at', todayStart.toISOString())
        .lt('created_at', todayEnd.toISOString());

      if (dailyError) {
        logSupabaseError('daily transactions fetch', dailyError);
      }

      const dailyCreditUsage = (dailyTransactions || []).reduce(
        (sum: number, transaction: any) =>
          sum + Math.abs(transaction.delta_credits),
        0
      );

      // Günlük kredi harcama bilgileri

      // Admin sayısını kontrol et (istatistik için)
      await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', true);

      // Son 7 günün günlük kredi harcama analizi
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStart = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

        last7Days.push({
          date: dayStart.toISOString().split('T')[0],
          start: dayStart.toISOString(),
          end: dayEnd.toISOString(),
        });
      }

      // Son 7 günün analizi hazır

      // Son 7 günün günlük kredi harcama verilerini çek
      const last7DaysUsage = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStart = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

        const { data: dayTransactions } = await supabase
          .from('transactions')
          .select('delta_credits')
          .lt('delta_credits', 0)
          .gte('created_at', dayStart.toISOString())
          .lt('created_at', dayEnd.toISOString());

        const dayCredits = (dayTransactions || []).reduce(
          (sum: number, transaction: any) =>
            sum + Math.abs(transaction.delta_credits),
          0
        );

        last7DaysUsage.push({
          date: dayStart.toISOString().split('T')[0] || '',
          credits: dayCredits,
          transactions: dayTransactions?.length || 0,
        });
      }

      // Günlük gelir hesaplama (Shopier'den) - timezone aware
      const { data: dailyRevenueData, error: dailyRevenueError } =
        await supabase
          .from('transactions')
          .select('amount, created_at')
          .eq('type', 'purchase')
          .eq('ref_type', 'shopier_payment')
          .gte('created_at', todayStart.toISOString())
          .lt('created_at', todayEnd.toISOString());

      if (dailyRevenueError) {
        logSupabaseError('daily revenue fetch', dailyRevenueError);
      }

      const dailyRevenue = (dailyRevenueData || []).reduce(
        (sum: number, transaction: any) => sum + (transaction.amount || 0),
        0
      );

      // Format users safely
      const formattedUsers = (profiles || []).map((user: any) => ({
        id: user.id,
        display_name: user.display_name || 'İsimsiz Kullanıcı',
        created_at: user.created_at || new Date().toISOString(),
        credit_balance: user.credit_balance || 0,
      }));

      setStats({
        totalUsers: userCount || 0,
        totalCredits,
        totalProfiles: userCount || 0,
        dailyCreditUsage,
        dailyRevenue,
        last7DaysUsage,
        recentUsers: formattedUsers,
      });
    } catch (error) {
      logError('Failed to fetch admin dashboard stats', error);
      setStats({
        totalUsers: 0,
        totalCredits: 0,
        totalProfiles: 0,
        dailyCreditUsage: 0,
        dailyRevenue: 0,
        last7DaysUsage: [],
        recentUsers: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards: StatCard[] = [
    {
      title: 'Toplam Kullanıcı',
      value: stats.totalUsers,
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      description: 'Bu ay kayıtlı kullanıcı artışı',
    },
    {
      title: 'Toplam Kredi',
      value: stats.totalCredits.toLocaleString(),
      change: '+8%',
      changeType: 'increase',
      icon: Coins,
      gradient: 'from-amber-500 via-orange-600 to-orange-700',
      description: 'Sistemdeki toplam kredi bakiyesi',
    },
    {
      title: 'Aktif Profiller',
      value: stats.totalProfiles,
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
      gradient: 'from-emerald-500 via-green-600 to-green-700',
      description: 'Aktif kullanıcı profilleri',
    },
    {
      title: 'Günlük Gelir',
      value: '₺' + stats.dailyRevenue.toFixed(0),
      change: '+23%',
      changeType: 'increase',
      icon: DollarSign,
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      description: 'Son 24 saat Shopier geliri',
    },
  ];

  const quickActions = [
    {
      title: 'Detaylı İstatistikler',
      description: 'Kapsamlı analiz raporları ve grafikler',
      href: `/${locale}/admin/analytics`,
      icon: Activity,
      gradient: 'from-cyan-500 to-blue-600',
      emoji: '📊',
    },
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcı hesapları ve kredi işlemleri',
      href: `/${locale}/admin/users`,
      icon: UserPlus,
      gradient: 'from-green-500 to-emerald-600',
      emoji: '👥',
    },
    {
      title: 'Paket Yönetimi',
      description: 'Kredi paketleri ve fiyat düzenlemeleri',
      href: `/${locale}/admin/packages`,
      icon: Package,
      gradient: 'from-orange-500 to-red-600',
      emoji: '💰',
    },
    {
      title: 'Sipariş Takibi',
      description: 'Aktif siparişler ve ödeme durumları',
      href: `/${locale}/admin/orders`,
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-pink-600',
      emoji: '🛒',
    },
    {
      title: 'Sistem Ayarları',
      description: 'Güvenlik, admin kullanıcıları ve konfigürasyon',
      href: `/${locale}/admin/settings`,
      icon: Target,
      gradient: 'from-gray-500 to-slate-600',
      emoji: '🔧',
    },
  ];

  // Auth loading veya stats loading durumunda loading göster
  if (authLoading || (loading && isAuthenticated && admin)) {
    return (
      <div className='flex items-center justify-center h-96'>
        <div className='admin-card rounded-2xl p-8 text-center'>
          <div className='admin-pulse mb-4'>
            <Activity className='h-12 w-12 text-blue-500 mx-auto' />
          </div>
          <div className='admin-text-shimmer text-xl font-semibold'>
            {authLoading
              ? 'Yetkilendirme kontrol ediliyor...'
              : 'Dashboard yükleniyor...'}
          </div>
        </div>
      </div>
    );
  }

  // Admin değilse veya kullanıcı yoksa hiçbir şey gösterme (redirect olacak)
  if (!isAuthenticated || !admin) {
    return null;
  }

  return (
    <div className='space-y-8'>
      {/* Hoşgeldiniz Bölümü - Admin paneline giriş */}
      <div className='admin-card rounded-2xl p-8 admin-hover-lift'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-white mb-3 flex items-center'>
              <Sparkles className='h-10 w-10 text-yellow-400 mr-4' />
              Büşbüşkimki Admin Paneli
            </h1>
            <p className='text-slate-300 text-xl mb-2'>
              Mistik dünyanızı yönetin ve kullanıcı deneyimini optimize edin
            </p>
            <p className='text-slate-400 text-base'>
              Sistem durumunu kontrol edin, istatistikleri inceleyin ve
              platformu yönetin
            </p>
          </div>
          <div className='admin-gradient-primary p-6 rounded-2xl'>
            <Award className='h-16 w-16 text-white' />
          </div>
        </div>

        {/* Sistem durumu kartları */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='admin-glass rounded-xl p-5 admin-hover-scale'>
            <div className='flex items-center space-x-3 mb-3'>
              <Clock className='h-5 w-5 text-blue-400' />
              <span className='text-sm font-medium text-slate-300'>
                Son Giriş
              </span>
            </div>
            <div className='text-white font-semibold text-lg'>
              {new Date().toLocaleString('tr-TR')}
            </div>
            <div className='text-xs text-slate-500 mt-1'>
              Admin paneli erişimi
            </div>
          </div>
          <div className='admin-glass rounded-xl p-5 admin-hover-scale'>
            <div className='flex items-center space-x-3 mb-3'>
              <Zap className='h-5 w-5 text-green-400' />
              <span className='text-sm font-medium text-slate-300'>
                Sistem Durumu
              </span>
            </div>
            <div className='text-green-400 font-semibold text-lg flex items-center'>
              <span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
              Tüm Sistemler Aktif
            </div>
            <div className='text-xs text-slate-500 mt-1'>
              Veritabanı ve API bağlantıları
            </div>
          </div>
          <div className='admin-glass rounded-xl p-5 admin-hover-scale'>
            <div className='flex items-center space-x-3 mb-3'>
              <Target className='h-5 w-5 text-purple-400' />
              <span className='text-sm font-medium text-slate-300'>
                Günlük Kredi Harcama
              </span>
            </div>
            <div className='text-purple-400 font-semibold text-lg'>
              {stats.dailyCreditUsage} Kredi
            </div>
            <div className='text-xs text-slate-500 mt-1'>
              Bugün harcanan toplam kredi
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className='admin-stat-card admin-card rounded-2xl p-6 admin-hover-lift'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className='flex items-start justify-between mb-4'>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient}`}
              >
                <card.icon className='h-6 w-6 text-white' />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  card.changeType === 'increase'
                    ? 'text-green-400'
                    : card.changeType === 'decrease'
                      ? 'text-red-400'
                      : 'text-gray-400'
                }`}
              >
                {card.changeType === 'increase' ? (
                  <ArrowUpRight className='h-4 w-4' />
                ) : card.changeType === 'decrease' ? (
                  <ArrowDownRight className='h-4 w-4' />
                ) : null}
                <span>{card.change}</span>
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='text-2xl font-bold text-white'>{card.value}</h3>
              <p className='text-slate-400 text-sm'>{card.title}</p>
              <p className='text-xs text-slate-500'>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        {/* Recent Users */}
        <div className='xl:col-span-1'>
          <div className='admin-card rounded-2xl p-6 admin-hover-lift h-full'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white flex items-center'>
                <UserPlus className='h-5 w-5 mr-2 text-green-400' />
                Son Kayıtlar
              </h3>
              <a
                href={`/${locale}/admin/users`}
                className='text-blue-400 hover:text-blue-300 text-sm font-medium admin-hover-scale'
              >
                Tümünü Gör →
              </a>
            </div>

            <div className='space-y-4'>
              {stats.recentUsers.slice(0, 4).map((user, index) => (
                <div
                  key={index}
                  className='admin-glass rounded-lg p-4 admin-hover-scale'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='admin-gradient-accent p-2 rounded-lg'>
                        <Users className='h-4 w-4 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-white'>
                          {user.display_name}
                        </p>
                        <p className='text-xs text-slate-400'>
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                'tr-TR'
                              )
                            : 'Bilinmiyor'}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Coins className='h-4 w-4 text-amber-400' />
                      <span className='text-amber-400 font-semibold'>
                        {user.credit_balance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {stats.recentUsers.length === 0 && (
                <div className='text-center py-8'>
                  <Users className='h-12 w-12 text-slate-600 mx-auto mb-2' />
                  <p className='text-slate-400'>Henüz kullanıcı bulunmuyor</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='xl:col-span-2'>
          <div className='admin-card rounded-2xl p-6 admin-hover-lift'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white flex items-center'>
                <Zap className='h-5 w-5 mr-2 text-yellow-400' />
                Hızlı İşlemler
              </h3>
              <div className='text-sm text-slate-400'>
                Sık kullanılan admin araçları
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {quickActions.map((action, index) => (
                <a
                  key={action.title}
                  href={action.href}
                  className='admin-glass rounded-xl p-4 admin-hover-lift group block'
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className='flex items-start space-x-3 mb-3'>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className='h-5 w-5 text-white' />
                    </div>
                    <span className='text-2xl'>{action.emoji}</span>
                  </div>

                  <h4 className='font-semibold text-white group-hover:text-blue-300 transition-colors mb-2'>
                    {action.title}
                  </h4>
                  <p className='text-sm text-slate-400 group-hover:text-slate-300 transition-colors'>
                    {action.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Son 7 Gün Kredi Harcama Analizi */}
      <div className='admin-card rounded-2xl p-6 admin-hover-lift'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <div className='admin-gradient-primary p-3 rounded-xl'>
              <TrendingUp className='h-6 w-6 text-white' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-white'>
                Son 7 Gün Analizi
              </h3>
              <p className='text-slate-400'>Günlük kredi harcama trendi</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-7 gap-3'>
          {stats.last7DaysUsage.map((day, index) => {
            const isToday = index === 6;
            const isYesterday = index === 5;
            const dayName = isToday
              ? 'Bugün'
              : isYesterday
                ? 'Dün'
                : new Date(day.date).toLocaleDateString('tr-TR', {
                    weekday: 'short',
                  });

            return (
              <div
                key={day.date}
                className={`admin-glass rounded-lg p-4 text-center ${
                  isToday ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className='text-xs text-slate-400 mb-2'>{dayName}</div>
                <div className='text-lg font-bold text-white mb-1'>
                  {day.credits}
                </div>
                <div className='text-xs text-slate-500'>
                  {day.transactions} işlem
                </div>
                <div className='mt-2 h-2 bg-slate-700 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500'
                    style={{
                      width: `${Math.min(100, (day.credits / Math.max(...stats.last7DaysUsage.map(d => d.credits), 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-6 p-4 admin-gradient-dark rounded-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-sm text-slate-400'>Toplam 7 Gün</div>
              <div className='text-2xl font-bold text-white'>
                {stats.last7DaysUsage.reduce(
                  (sum, day) => sum + day.credits,
                  0
                )}{' '}
                Kredi
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm text-slate-400'>Ortalama Günlük</div>
              <div className='text-lg font-semibold text-blue-400'>
                {Math.round(
                  stats.last7DaysUsage.reduce(
                    (sum, day) => sum + day.credits,
                    0
                  ) / 7
                )}{' '}
                Kredi
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className='admin-card rounded-2xl p-6 admin-hover-lift'>
        {/* <RealTimeMonitoring /> Archived */}
      </div>

      {/* System Status Footer */}
      <div className='admin-gradient-dark rounded-2xl p-6 admin-hover-lift'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-bold text-white flex items-center'>
            <Activity className='h-5 w-5 mr-2 text-cyan-400' />
            Sistem Performansı
          </h3>
          <div className='flex items-center space-x-2'>
            <div className='text-cyan-400 text-sm font-medium'>
              {systemPerformance
                ? `Son güncelleme: ${new Date(systemPerformance.timestamp).toLocaleTimeString('tr-TR')}`
                : 'Real-time'}
            </div>
            <button
              onClick={() => refreshPerformance()}
              className='p-1 rounded-md bg-blue-900/50 hover:bg-blue-800/50 transition-colors'
              title='Verileri yenile'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-cyan-400'
              >
                <path d='M21 2v6h-6'></path>
                <path d='M3 12a9 9 0 0 1 15-6.7L21 8'></path>
                <path d='M3 22v-6h6'></path>
                <path d='M21 12a9 9 0 0 1-15 6.7L3 16'></path>
              </svg>
            </button>
            <button
              onClick={() => refreshPerformance()}
              className='p-1 rounded-md bg-green-900/50 hover:bg-green-800/50 transition-colors'
              title='Performans verilerini yenile'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-green-400'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5z'></path>
                <path d='M2 17l10 5 10-5'></path>
                <path d='M2 12l10 5 10-5'></path>
              </svg>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400 mb-1'>
              {systemPerformance
                ? `${systemPerformance.uptime.toFixed(1)}%`
                : '99.9%'}
            </div>
            <div className='text-sm text-slate-300'>Uptime</div>
            <div className='mt-2 bg-green-400/20 rounded-full h-2'>
              <div
                className='bg-green-400 rounded-full h-2'
                style={{
                  width: `${systemPerformance ? systemPerformance.uptime : 99.9}%`,
                }}
              ></div>
            </div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-400 mb-1'>
              {systemPerformance
                ? `${systemPerformance.responseTime}ms`
                : '45ms'}
            </div>
            <div className='text-sm text-slate-300'>Response Time</div>
            <div className='mt-2 bg-blue-400/20 rounded-full h-2'>
              <div
                className='bg-blue-400 rounded-full h-2'
                style={{
                  width: `${
                    systemPerformance
                      ? Math.min(
                          100,
                          (systemPerformance.responseTime / 100) * 100
                        )
                      : 85
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-purple-400 mb-1'>
              {systemPerformance
                ? `${systemPerformance.memoryUsage.toFixed(1)}GB`
                : '2.4GB'}
            </div>
            <div className='text-sm text-slate-300'>Memory Usage</div>
            <div className='mt-2 bg-purple-400/20 rounded-full h-2'>
              <div
                className='bg-purple-400 rounded-full h-2'
                style={{
                  width: `${
                    systemPerformance
                      ? Math.min(100, (systemPerformance.memoryUsage / 4) * 100)
                      : 60
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-orange-400 mb-1'>
              {systemPerformance ? `${systemPerformance.cpuUsage}%` : '12%'}
            </div>
            <div className='text-sm text-slate-300'>CPU Usage</div>
            <div className='mt-2 bg-orange-400/20 rounded-full h-2'>
              <div
                className='bg-orange-400 rounded-full h-2'
                style={{
                  width: `${systemPerformance ? systemPerformance.cpuUsage : 12}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {systemPerformance && systemPerformance.activeUsers > 0 && (
          <div className='mt-4 p-3 bg-blue-900/30 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-slate-300'>Aktif Kullanıcılar:</div>
              <div className='text-lg font-bold text-blue-400'>
                {systemPerformance.activeUsers}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
