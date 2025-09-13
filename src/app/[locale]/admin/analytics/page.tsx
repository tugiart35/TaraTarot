'use client';

import { useState, useEffect } from 'react';
import AutoReporting from '@/components/admin/AutoReporting';
import { 
  Calendar,
  Download,
  TrendingUp,
  Users,
  CreditCard,
  Coins,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  DollarSign
} from 'lucide-react';

// Recharts bileşenleri
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  dailyUsers: number;
  totalUsers: number;
  userGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  creditsSold: number;
  creditUsage: number;
  dailyRevenue: number[];
  userRegistrations: { name: string; value: number }[];
  packageSales: { name: string; value: number; color: string }[];
  featureUsage: { name: string; value: number; color: string }[];
  revenueData: { date: string; revenue: number }[];
  userGrowthData: { date: string; users: number }[];
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    dailyUsers: 0,
    totalUsers: 0,
    userGrowth: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
    creditsSold: 0,
    creditUsage: 0,
    dailyRevenue: [],
    userRegistrations: [],
    packageSales: [],
    featureUsage: [],
    revenueData: [],
    userGrowthData: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Gerçek veriler yerine mock data kullanıyoruz
      const mockData: AnalyticsData = {
        dailyUsers: 24,
        totalUsers: 1247,
        userGrowth: 12.5,
        totalRevenue: 15680,
        revenueGrowth: 8.3,
        creditsSold: 45230,
        creditUsage: 38950,
        dailyRevenue: [1200, 1350, 1100, 1450, 1600, 1550, 1700],
        userRegistrations: [
          { name: 'Pazartesi', value: 30 },
          { name: 'Salı', value: 45 },
          { name: 'Çarşamba', value: 28 },
          { name: 'Perşembe', value: 52 },
          { name: 'Cuma', value: 38 },
          { name: 'Cumartesi', value: 65 },
          { name: 'Pazar', value: 42 }
        ],
        packageSales: [
          { name: 'Başlangıç Paketi', value: 35, color: '#3B82F6' },
          { name: 'Standart Paket', value: 45, color: '#8B5CF6' },
          { name: 'Premium Paket', value: 15, color: '#06B6D4' },
          { name: 'VIP Paket', value: 5, color: '#F59E0B' }
        ],
        featureUsage: [
          { name: 'Tarot Okuma', value: 65, color: '#10B981' },
          { name: 'Numeroloji', value: 25, color: '#F59E0B' },
          { name: 'Günlük Fal', value: 10, color: '#EF4444' }
        ],
        revenueData: [
          { date: '01 Oca', revenue: 12500 },
          { date: '08 Oca', revenue: 13200 },
          { date: '15 Oca', revenue: 14100 },
          { date: '22 Oca', revenue: 15680 },
          { date: '29 Oca', revenue: 16200 }
        ],
        userGrowthData: [
          { date: '01 Oca', users: 1100 },
          { date: '08 Oca', users: 1145 },
          { date: '15 Oca', users: 1190 },
          { date: '22 Oca', users: 1220 },
          { date: '29 Oca', users: 1247 }
        ]
      };

      setAnalytics(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="h-4 w-4 text-green-400" />;
    if (growth < 0) return <ArrowDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-slate-400" />;
  };

  const getTrendColor = (growth: number) => {
    if (growth > 0) return 'text-green-400';
    if (growth < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const statCards = [
    {
      title: 'Günlük Kullanıcı',
      value: analytics.dailyUsers,
      change: '+5.2%',
      icon: Users,
      gradient: 'from-blue-500 to-blue-700',
      description: 'Son 24 saat'
    },
    {
      title: 'Toplam Kullanıcı',
      value: analytics.totalUsers.toLocaleString(),
      change: `+${analytics.userGrowth}%`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-700',
      description: 'Bu ay'
    },
    {
      title: 'Toplam Gelir',
      value: `€${analytics.totalRevenue.toLocaleString()}`,
      change: `+${analytics.revenueGrowth}%`,
      icon: DollarSign,
      gradient: 'from-purple-500 to-purple-700',
      description: 'Bu ay'
    },
    {
      title: 'Kredi Kullanımı',
      value: analytics.creditUsage.toLocaleString(),
      change: '+15.3%',
      icon: Coins,
      gradient: 'from-orange-500 to-orange-700',
      description: 'Bu hafta'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <BarChart3 className="h-12 w-12 text-cyan-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Analytics yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="admin-gradient-primary p-3 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics & Raporlama</h1>
              <p className="text-slate-400">Detaylı istatistikler ve performans analizi</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Rapor İndir</span>
            </button>
            <button className="admin-glass hover:bg-slate-700/50 text-white px-4 py-2 rounded-lg admin-hover-scale transition-colors flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Tarih Seç</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, index) => (
          <div 
            key={card.title}
            className="admin-card rounded-2xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor(parseFloat(card.change))}`}>
                {getTrendIcon(parseFloat(card.change))}
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center">
              <div className="admin-gradient-success p-2 rounded-lg mr-2 md:mr-3">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <span className="text-sm md:text-base">Gelir Trendi</span>
            </h3>
            <div className="admin-glass rounded-lg px-2 md:px-3 py-1">
              <span className="text-xs md:text-sm text-green-400">↗ %8.3</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center">
              <div className="admin-gradient-accent p-2 rounded-lg mr-2 md:mr-3">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <span className="text-sm md:text-base">Kullanıcı Büyümesi</span>
            </h3>
            <div className="admin-glass rounded-lg px-2 md:px-3 py-1">
              <span className="text-xs md:text-sm text-blue-400">↗ %12.5</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.userRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="url(#blueGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Package Sales */}
        <div className="admin-card rounded-2xl p-6 admin-hover-lift">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="admin-gradient-warning p-2 rounded-lg mr-3">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              Paket Satışları
            </h3>
            <div className="admin-glass rounded-lg px-3 py-1">
              <span className="text-sm text-slate-400">Bu ay</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={analytics.packageSales}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {analytics.packageSales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }} 
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Usage */}
        <div className="admin-card rounded-2xl p-6 admin-hover-lift">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="admin-gradient-danger p-2 rounded-lg mr-3">
                <Activity className="h-5 w-5 text-white" />
              </div>
              Özellik Kullanımı
            </h3>
            <div className="admin-glass rounded-lg px-3 py-1">
              <span className="text-sm text-slate-400">Bu hafta</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={analytics.featureUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {analytics.featureUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }} 
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="admin-card rounded-xl p-6 admin-hover-lift">
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-cyan-400" />
            Sayfa Görüntülemeleri
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Dashboard</span>
              <span className="text-white font-medium">2,340</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Tarot Okuma</span>
              <span className="text-white font-medium">1,890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Numeroloji</span>
              <span className="text-white font-medium">1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Profil</span>
              <span className="text-white font-medium">987</span>
            </div>
          </div>
        </div>

        <div className="admin-card rounded-xl p-6 admin-hover-lift">
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
            Ödeme Yöntemleri
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">💳 Kredi Kartı</span>
              <span className="text-white font-medium">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">🅿️ PayPal</span>
              <span className="text-white font-medium">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">🏦 Banka Havalesi</span>
              <span className="text-white font-medium">10%</span>
            </div>
          </div>
        </div>

        <div className="admin-card rounded-xl p-6 admin-hover-lift">
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <Coins className="h-5 w-5 mr-2 text-amber-400" />
            Kredi İstatistikleri
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Satılan</span>
              <span className="text-amber-400 font-medium">{analytics.creditsSold.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Kullanılan</span>
              <span className="text-blue-400 font-medium">{analytics.creditUsage.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Kalan</span>
              <span className="text-green-400 font-medium">
                {(analytics.creditsSold - analytics.creditUsage).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Reporting Component */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        <AutoReporting />
      </div>
    </div>
  );
}