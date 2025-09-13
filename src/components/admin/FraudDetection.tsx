'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Ban, Clock, TrendingUp, Users, CreditCard, Flag } from 'lucide-react';

interface FraudAlert {
  id: string;
  type: 'suspicious_login' | 'multiple_accounts' | 'payment_fraud' | 'rapid_transactions' | 'bot_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user_id: string;
  user_email: string;
  description: string;
  data: Record<string, unknown>;
  status: 'pending' | 'investigating' | 'resolved' | 'false_positive';
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

interface FraudRule {
  id: string;
  name: string;
  description: string;
  type: 'login' | 'payment' | 'behavior' | 'velocity';
  active: boolean;
  threshold: number;
  action: 'flag' | 'block' | 'require_verification';
  created_at: string;
}

interface FraudStats {
  total_alerts_today: number;
  pending_alerts: number;
  blocked_users: number;
  prevented_fraud_amount: number;
  detection_rate: number;
}

export default function FraudDetection() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [rules, setRules] = useState<FraudRule[]>([]);
  const [stats, setStats] = useState<FraudStats>({
    total_alerts_today: 0,
    pending_alerts: 0,
    blocked_users: 0,
    prevented_fraud_amount: 0,
    detection_rate: 0
  });
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  useEffect(() => {
    loadFraudData();
  }, []);

  const loadFraudData = () => {
    // Mock data - in production this would come from database
    const mockAlerts: FraudAlert[] = [
      {
        id: '1',
        type: 'suspicious_login',
        severity: 'high',
        user_id: 'user-123',
        user_email: 'suspicious@example.com',
        description: 'Farklı ülkelerden ardışık giriş denemeleri',
        data: {
          locations: ['Turkey', 'Nigeria', 'Russia'],
          timespan: '15 minutes',
          ip_addresses: ['192.168.1.1', '85.34.128.45', '95.211.47.82']
        },
        status: 'pending',
        created_at: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        type: 'multiple_accounts',
        severity: 'medium',
        user_id: 'user-456',
        user_email: 'multi.account@example.com',
        description: 'Aynı cihazdan çoklu hesap oluşturma',
        data: {
          device_fingerprint: 'abc123def456',
          accounts_created: 5,
          timespan: '2 hours'
        },
        status: 'investigating',
        created_at: '2024-01-15T12:15:00Z'
      },
      {
        id: '3',
        type: 'payment_fraud',
        severity: 'critical',
        user_id: 'user-789',
        user_email: 'fraudster@example.com',
        description: 'Çalıntı kredi kartı kullanımı şüphesi',
        data: {
          card_number: '****-****-****-1234',
          amount: 299.99,
          decline_reason: 'stolen_card',
          previous_attempts: 3
        },
        status: 'resolved',
        created_at: '2024-01-15T10:45:00Z',
        resolved_at: '2024-01-15T11:00:00Z',
        resolved_by: 'admin'
      },
      {
        id: '4',
        type: 'rapid_transactions',
        severity: 'medium',
        user_id: 'user-321',
        user_email: 'rapid.user@example.com',
        description: 'Anormal hızda ardışık işlemler',
        data: {
          transaction_count: 15,
          timespan: '5 minutes',
          total_amount: 1250
        },
        status: 'false_positive',
        created_at: '2024-01-15T09:20:00Z',
        resolved_at: '2024-01-15T16:30:00Z',
        resolved_by: 'admin'
      }
    ];

    const mockRules: FraudRule[] = [
      {
        id: '1',
        name: 'Çoklu Lokasyon Girişi',
        description: 'Kısa süre içinde farklı ülkelerden giriş',
        type: 'login',
        active: true,
        threshold: 2,
        action: 'flag',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Hızlı Ödeme Girişimi',
        description: 'Dakika başına 5+ ödeme denemesi',
        type: 'payment',
        active: true,
        threshold: 5,
        action: 'block',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Bot Aktivitesi',
        description: 'İnsan dışı aktivite paterni',
        type: 'behavior',
        active: true,
        threshold: 10,
        action: 'require_verification',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Velocity Check',
        description: 'Günlük işlem limiti aşımı',
        type: 'velocity',
        active: false,
        threshold: 1000,
        action: 'flag',
        created_at: '2024-01-01T00:00:00Z'
      }
    ];

    const mockStats: FraudStats = {
      total_alerts_today: 12,
      pending_alerts: 3,
      blocked_users: 7,
      prevented_fraud_amount: 4250.75,
      detection_rate: 94.2
    };

    setAlerts(mockAlerts);
    setRules(mockRules);
    setStats(mockStats);
  };

  const updateAlertStatus = async (alertId: string, status: FraudAlert['status']) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              status,
              ...(status !== 'pending' && {
                resolved_at: new Date().toISOString(),
                resolved_by: 'admin'
              })
            } 
          : alert
      ));
    } catch (error) {
      console.error('Error updating alert status:', error);
    }
  };

  const toggleRule = async (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-lavender bg-lavender/20 border-lavender/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'investigating': return 'text-blue-400 bg-blue-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      case 'false_positive': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-lavender bg-lavender/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suspicious_login': return <Shield className="h-4 w-4" />;
      case 'multiple_accounts': return <Users className="h-4 w-4" />;
      case 'payment_fraud': return <CreditCard className="h-4 w-4" />;
      case 'rapid_transactions': return <TrendingUp className="h-4 w-4" />;
      case 'bot_activity': return <Eye className="h-4 w-4" />;
      default: return <Flag className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'suspicious_login': return 'Şüpheli Giriş';
      case 'multiple_accounts': return 'Çoklu Hesap';
      case 'payment_fraud': return 'Ödeme Dolandırıcılığı';
      case 'rapid_transactions': return 'Hızlı İşlemler';
      case 'bot_activity': return 'Bot Aktivitesi';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-gold" />
          <h3 className="text-lg font-semibold text-gold">Fraud Algılama Sistemi</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
          <span className="text-sm text-lavender">Sistem Aktif</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-400">Bugünkü Uyarılar</p>
              <p className="text-2xl font-bold text-red-400">{stats.total_alerts_today}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400/50" />
          </div>
        </div>

        <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-yellow-400">Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending_alerts}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400/50" />
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400">Bloklu Kullanıcılar</p>
              <p className="text-2xl font-bold text-blue-400">{stats.blocked_users}</p>
            </div>
            <Ban className="h-8 w-8 text-blue-400/50" />
          </div>
        </div>

        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-400">Engellenen Zarar</p>
              <p className="text-2xl font-bold text-green-400">${stats.prevented_fraud_amount.toFixed(0)}</p>
            </div>
            <Shield className="h-8 w-8 text-green-400/50" />
          </div>
        </div>

        <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gold">Algılama Oranı</p>
              <p className="text-2xl font-bold text-gold">{stats.detection_rate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gold/50" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <h4 className="font-medium text-gold mb-4">Son Fraud Uyarıları</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`rounded p-3 border ${getSeverityColor(alert.severity)} cursor-pointer hover:opacity-80`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(alert.type)}
                    <span className="font-medium text-white">{getTypeText(alert.type)}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
                
                <p className="text-sm text-lavender mb-2">{alert.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-lavender">{alert.user_email}</span>
                  <span className="text-lavender">{formatDate(alert.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Rules */}
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <h4 className="font-medium text-gold mb-4">Fraud Algılama Kuralları</h4>
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-night/30 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white">{rule.name}</h5>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      rule.active 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {rule.active ? 'Aktif' : 'Pasif'}
                  </button>
                </div>
                
                <p className="text-sm text-lavender mb-2">{rule.description}</p>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-lavender">
                  <div>
                    <span className="font-medium">Tip:</span> {rule.type}
                  </div>
                  <div>
                    <span className="font-medium">Eşik:</span> {rule.threshold}
                  </div>
                  <div>
                    <span className="font-medium">Aksiyon:</span> {rule.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gold">Fraud Uyarısı Detayları</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-lavender hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                {getTypeIcon(selectedAlert.type)}
                <span className="text-white font-medium">{getTypeText(selectedAlert.type)}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(selectedAlert.severity)}`}>
                  {selectedAlert.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="bg-lavender/5 rounded p-3">
                <h4 className="font-medium text-gold mb-2">Kullanıcı Bilgileri</h4>
                <p className="text-white">Email: {selectedAlert.user_email}</p>
                <p className="text-lavender text-sm">ID: {selectedAlert.user_id}</p>
              </div>
              
              <div className="bg-lavender/5 rounded p-3">
                <h4 className="font-medium text-gold mb-2">Uyarı Detayları</h4>
                <p className="text-white mb-2">{selectedAlert.description}</p>
                <pre className="text-sm text-lavender bg-night/50 rounded p-2 overflow-auto">
                  {JSON.stringify(selectedAlert.data, null, 2)}
                </pre>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-lavender">Oluşturulma: {formatDate(selectedAlert.created_at)}</span>
                {selectedAlert.resolved_at && (
                  <span className="text-lavender">Çözülme: {formatDate(selectedAlert.resolved_at)}</span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => updateAlertStatus(selectedAlert.id, 'investigating')}
                  className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded"
                >
                  İnceleme Başlat
                </button>
                <button
                  onClick={() => updateAlertStatus(selectedAlert.id, 'false_positive')}
                  className="flex-1 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded"
                >
                  Yanlış Pozitif
                </button>
                <button
                  onClick={() => updateAlertStatus(selectedAlert.id, 'resolved')}
                  className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded"
                >
                  Çözüldü
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
