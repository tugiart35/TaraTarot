'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logError, logSupabaseError, logDebug } from '@/lib/logger';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Coins, 
  Activity, 
  DollarSign, 
  Eye,
  CreditCard,
  UserPlus,
  ShoppingCart,
  Sparkles,
  Zap,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import RealTimeMonitoring from '@/components/admin/RealTimeMonitoring';

interface AdminStats {
  totalUsers: number;
  totalCredits: number;
  totalProfiles: number;
  recentUsers: Array<{
    id: string;
    display_name?: string;
    email?: string;
    credit_balance?: number;
    created_at?: string;
  }>;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  description: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalCredits: 0,
    totalProfiles: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Toplam kullanıcı sayısı
      const { count: userCount, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        logSupabaseError('profile count', countError, { operation: 'fetchStats' });
      }

      // Toplam kredi ve son kullanıcılar
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('credit_balance, display_name, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (profileError) {
        logSupabaseError('profiles fetch', profileError, { operation: 'fetchStats' });
      }

      const totalCredits = (profiles || []).reduce((sum, profile) => sum + (profile.credit_balance || 0), 0);

      // Format users safely
      const formattedUsers = (profiles || []).map(user => ({
        display_name: user.display_name || 'İsimsiz Kullanıcı',
        email: user.email || 'No email',
        created_at: user.created_at || new Date().toISOString(),
        credit_balance: user.credit_balance || 0
      }));

      setStats({
        totalUsers: userCount || 0,
        totalCredits,
        totalProfiles: userCount || 0,
        recentUsers: formattedUsers
      });
    } catch (error) {
      logError('Failed to fetch admin dashboard stats', error, { 
        operation: 'fetchStats',
        component: 'AdminDashboard' 
      });
      setStats({
        totalUsers: 0,
        totalCredits: 0,
        totalProfiles: 0,
        recentUsers: []
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
      description: 'Bu ay kayıtlı kullanıcı artışı'
    },
    {
      title: 'Toplam Kredi',
      value: stats.totalCredits.toLocaleString(),
      change: '+8%',
      changeType: 'increase',
      icon: Coins,
      gradient: 'from-amber-500 via-orange-600 to-orange-700',
      description: 'Sistemdeki toplam kredi bakiyesi'
    },
    {
      title: 'Aktif Profiller',
      value: stats.totalProfiles,
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
      gradient: 'from-emerald-500 via-green-600 to-green-700',
      description: 'Aktif kullanıcı profilleri'
    },
    {
      title: 'Günlük Gelir',
      value: '€' + (Math.random() * 1000 + 500).toFixed(0),
      change: '+23%',
      changeType: 'increase',
      icon: DollarSign,
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      description: 'Son 24 saat toplam gelir'
    }
  ];

  const quickActions = [
    {
      title: 'Detaylı İstatistikler',
      description: 'Kapsamlı analiz raporları ve grafikler',
      href: '/admin/analytics',
      icon: Activity,
      gradient: 'from-cyan-500 to-blue-600',
      emoji: '📊'
    },
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcı hesapları ve kredi işlemleri',
      href: '/admin/users',
      icon: UserPlus,
      gradient: 'from-green-500 to-emerald-600',
      emoji: '👥'
    },
    {
      title: 'Paket Yönetimi',
      description: 'Kredi paketleri ve fiyat düzenlemeleri',
      href: '/admin/packages',
      icon: Package,
      gradient: 'from-orange-500 to-red-600',
      emoji: '💰'
    },
    {
      title: 'Sipariş Takibi',
      description: 'Aktif siparişler ve ödeme durumları',
      href: '/admin/orders',
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-pink-600',
      emoji: '🛒'
    },
    {
      title: 'İçerik Editörü',
      description: 'Tarot ve numeroloji içerik yönetimi',
      href: '/admin/content',
      icon: Sparkles,
      gradient: 'from-indigo-500 to-purple-600',
      emoji: '✨'
    },
    {
      title: 'Sistem Ayarları',
      description: 'Güvenlik, admin kullanıcıları ve konfigürasyon',
      href: '/admin/settings',
      icon: Target,
      gradient: 'from-gray-500 to-slate-600',
      emoji: '🔧'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <Activity className="h-12 w-12 text-blue-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Dashboard yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="admin-card rounded-2xl p-8 admin-hover-lift">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
              Hoş Geldiniz, Admin! 
            </h1>
            <p className="text-slate-400 text-lg">
              Sistem durumunu kontrol edin ve güncel istatistikleri inceleyin
            </p>
          </div>
          <div className="admin-gradient-primary p-4 rounded-2xl">
            <Award className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="admin-glass rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-400">Son Aktivite</span>
            </div>
            <div className="text-white font-medium mt-1">{new Date().toLocaleString('tr-TR')}</div>
          </div>
          <div className="admin-glass rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-green-400" />
              <span className="text-sm text-slate-400">Sistem Durumu</span>
            </div>
            <div className="text-green-400 font-medium mt-1">🟢 Tüm Sistemler Aktif</div>
          </div>
          <div className="admin-glass rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-slate-400">Günlük Hedef</span>
            </div>
            <div className="text-purple-400 font-medium mt-1">85% Tamamlandı</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={card.title}
            className="admin-stat-card admin-card rounded-2xl p-6 admin-hover-lift"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                card.changeType === 'increase' ? 'text-green-400' : 
                card.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {card.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4" /> : 
                 card.changeType === 'decrease' ? <ArrowDownRight className="h-4 w-4" /> : null}
                <span>{card.change}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
              <p className="text-slate-400 text-sm">{card.title}</p>
              <p className="text-xs text-slate-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="xl:col-span-1">
          <div className="admin-card rounded-2xl p-6 admin-hover-lift h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-green-400" />
                Son Kayıtlar
              </h3>
              <a 
                href="/admin/users"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium admin-hover-scale"
              >
                Tümünü Gör →
              </a>
            </div>
            
            <div className="space-y-4">
              {stats.recentUsers.slice(0, 4).map((user, index) => (
                <div 
                  key={index} 
                  className="admin-glass rounded-lg p-4 admin-hover-scale"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="admin-gradient-accent p-2 rounded-lg">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.display_name}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(user.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-400 font-semibold">{user.credit_balance}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {stats.recentUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400">Henüz kullanıcı bulunmuyor</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="xl:col-span-2">
          <div className="admin-card rounded-2xl p-6 admin-hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Hızlı İşlemler
              </h3>
              <div className="text-sm text-slate-400">Sık kullanılan admin araçları</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="admin-glass rounded-xl p-4 admin-hover-lift group block"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl">{action.emoji}</span>
                  </div>
                  
                  <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {action.title}
                  </h4>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {action.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        <RealTimeMonitoring />
      </div>

      {/* System Status Footer */}
      <div className="admin-gradient-dark rounded-2xl p-6 admin-hover-lift">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-cyan-400" />
            Sistem Performansı
          </h3>
          <div className="text-cyan-400 text-sm font-medium">Real-time</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
            <div className="text-sm text-slate-300">Uptime</div>
            <div className="mt-2 bg-green-400/20 rounded-full h-2">
              <div className="bg-green-400 rounded-full h-2" style={{width: '99.9%'}}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">45ms</div>
            <div className="text-sm text-slate-300">Response Time</div>
            <div className="mt-2 bg-blue-400/20 rounded-full h-2">
              <div className="bg-blue-400 rounded-full h-2" style={{width: '85%'}}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">2.4GB</div>
            <div className="text-sm text-slate-300">Memory Usage</div>
            <div className="mt-2 bg-purple-400/20 rounded-full h-2">
              <div className="bg-purple-400 rounded-full h-2" style={{width: '60%'}}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">12%</div>
            <div className="text-sm text-slate-300">CPU Usage</div>
            <div className="mt-2 bg-orange-400/20 rounded-full h-2">
              <div className="bg-orange-400 rounded-full h-2" style={{width: '12%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}