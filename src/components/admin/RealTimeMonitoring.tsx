'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Activity, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface RealTimeStats {
  activeUsers: number;
  onlineAdmins: number;
  recentTransactions: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  lastUpdate: string;
  todayRevenue: number;
  todaySignups: number;
  serverLoad: number;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function RealTimeMonitoring() {
  const [stats, setStats] = useState<RealTimeStats>({
    activeUsers: 0,
    onlineAdmins: 0,
    recentTransactions: 0,
    systemHealth: 'healthy',
    lastUpdate: new Date().toISOString(),
    todayRevenue: 0,
    todaySignups: 0,
    serverLoad: 0
  });
  
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchRealTimeData = async () => {
    try {
      setIsConnected(true);
      
      // Fetch active users (users who logged in within last 15 minutes)
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
      const { data: activeUsers } = await supabase
        .from('profiles')
        .select('id')
        .gte('last_sign_in_at', fifteenMinutesAgo);

      // Fetch today's signups
      const today = new Date().toISOString().split('T')[0];
      const { data: todaySignups } = await supabase
        .from('profiles')
        .select('id')
        .gte('created_at', today + 'T00:00:00.000Z');

      // Fetch recent transactions (last hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { data: recentTransactions } = await supabase
        .from('transactions')
        .select('delta_credits')
        .gte('created_at', oneHourAgo);

      // Bugünkü satılan kredi sayısını hesapla
      const { data: todayCreditsSold } = await supabase
        .from('transactions')
        .select('delta_credits')
        .gt('delta_credits', 0)
        .gte('created_at', today + 'T00:00:00.000Z')
        .lt('created_at', today + 'T23:59:59.999Z');

      const todayRevenue = (todayCreditsSold || []).reduce((sum, transaction) => 
        sum + transaction.delta_credits, 0);
      
      // Mock server load
      const serverLoad = Math.random() * 100;
      
      // Determine system health
      let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (serverLoad > 80) systemHealth = 'critical';
      else if (serverLoad > 60) systemHealth = 'warning';

      setStats({
        activeUsers: activeUsers?.length || 0,
        onlineAdmins: Math.floor(Math.random() * 3) + 1, // Mock admin count
        recentTransactions: recentTransactions?.length || 0,
        systemHealth,
        lastUpdate: new Date().toISOString(),
        todayRevenue,
        todaySignups: todaySignups?.length || 0,
        serverLoad
      });

      // Generate system alerts based on conditions
      updateSystemAlerts(systemHealth, serverLoad);
      
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setIsConnected(false);
    }
  };

  const updateSystemAlerts = (health: string, load: number) => {
    const newAlerts: SystemAlert[] = [];
    
    if (health === 'critical') {
      newAlerts.push({
        id: `alert-${Date.now()}`,
        type: 'error',
        message: `Sistem yükü kritik seviyede: %${load.toFixed(1)}`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    } else if (health === 'warning') {
      newAlerts.push({
        id: `alert-${Date.now()}`,
        type: 'warning',
        message: `Sistem yükü yüksek: %${load.toFixed(1)}`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    if (stats.activeUsers > 100) {
      newAlerts.push({
        id: `traffic-${Date.now()}`,
        type: 'info',
        message: `Yüksek trafik: ${stats.activeUsers} aktif kullanıcı`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    setAlerts(prev => [...newAlerts, ...prev.slice(0, 4)]); // Keep last 5 alerts
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-lavender';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <AlertTriangle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gold">Gerçek Zamanlı İzleme</h3>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-lavender">
            {isConnected ? 'Bağlı' : 'Bağlantı Kesildi'}
          </span>
          <span className="text-xs text-lavender">
            Son güncelleme: {formatTime(stats.lastUpdate)}
          </span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Aktif Kullanıcılar</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-green-400/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Online Adminler</p>
              <p className="text-2xl font-bold text-blue-400">{stats.onlineAdmins}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-400/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Son Saat İşlemler</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.recentTransactions}</p>
            </div>
            <CreditCard className="h-8 w-8 text-yellow-400/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Bugün Satılan Kredi</p>
              <p className="text-2xl font-bold text-gold">{stats.todayRevenue} Kredi</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gold/50" />
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gold">Sistem Durumu</h4>
          <div className={`flex items-center space-x-2 ${getHealthColor(stats.systemHealth)}`}>
            {getHealthIcon(stats.systemHealth)}
            <span className="capitalize">{stats.systemHealth}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-lavender mb-1">Server Yükü</p>
            <div className="w-full bg-night rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  stats.serverLoad > 80 ? 'bg-red-400' : 
                  stats.serverLoad > 60 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: `${stats.serverLoad}%` }}
              ></div>
            </div>
            <p className="text-xs text-lavender mt-1">{stats.serverLoad.toFixed(1)}%</p>
          </div>
          
          <div>
            <p className="text-xs text-lavender mb-1">Bugün Yeni Kullanıcılar</p>
            <p className="text-lg font-bold text-white">{stats.todaySignups}</p>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
        <h4 className="font-medium text-gold mb-4">Sistem Uyarıları</h4>
        
        {alerts.length === 0 ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-400/50 mx-auto mb-2" />
            <p className="text-lavender">Aktif uyarı bulunmuyor</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded border ${
                  alert.resolved 
                    ? 'bg-lavender/5 border-lavender/10 opacity-50' 
                    : alert.type === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : alert.type === 'warning'
                        ? 'bg-yellow-500/10 border-yellow-500/20'
                        : 'bg-blue-500/10 border-blue-500/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    alert.resolved
                      ? 'bg-lavender'
                      : alert.type === 'error' 
                        ? 'bg-red-400' 
                        : alert.type === 'warning'
                          ? 'bg-yellow-400'
                          : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className={`text-sm ${
                      alert.resolved ? 'text-lavender' : 'text-white'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-lavender">
                      {formatTime(alert.timestamp)}
                    </p>
                  </div>
                </div>
                
                {!alert.resolved && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="text-xs bg-lavender/20 hover:bg-lavender/30 text-lavender px-2 py-1 rounded"
                  >
                    Çözüldü
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
