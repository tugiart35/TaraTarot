'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Key,
  CreditCard,
  Mail,
  Shield,
  Users,
  Database,
  AlertTriangle,
  Check,
  X,
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash,
  Edit,
  TestTube,
  Settings,
  Lock,
  Server
} from 'lucide-react';
import ABTestManager from '@/components/admin/ABTestManager';
import FraudDetection from '@/components/admin/FraudDetection';

interface APIKey {
  id: number;
  name: string;
  key: string;
  masked: boolean;
  active: boolean;
  created_at: string;
}

interface AdminUser {
  user_id: string;
  email: string;
  display_name: string;
  role: string;
  created_at: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'api' | 'payment' | 'email' | 'security' | 'admins' | 'maintenance' | 'testing'>('api');
  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    { id: 1, name: 'Groq API Key', key: 'gsk_xxxxxxxxxxxxxxxxxx', masked: true, active: true, created_at: new Date().toISOString() },
    { id: 2, name: 'OpenAI API Key', key: 'sk-xxxxxxxxxxxxxxxxxx', masked: true, active: false, created_at: new Date().toISOString() },
  ]);

  // Admin Users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { user_id: '1', email: 'admin@busbuskimki.com', display_name: 'Super Admin', role: 'super_admin', created_at: new Date().toISOString() }
  ]);

  const tabs = [
    { 
      id: 'api', 
      name: 'API Anahtarları', 
      icon: Key,
      gradient: 'from-blue-500 to-blue-700',
      description: 'AI servisleri ve üçüncü taraf entegrasyonları'
    },
    { 
      id: 'payment', 
      name: 'Ödeme Ayarları', 
      icon: CreditCard,
      gradient: 'from-green-500 to-green-700',
      description: 'Stripe, PayPal ve diğer ödeme sağlayıcıları'
    },
    { 
      id: 'email', 
      name: 'E-posta Ayarları', 
      icon: Mail,
      gradient: 'from-purple-500 to-purple-700',
      description: 'SMTP ayarları ve e-posta şablonları'
    },
    { 
      id: 'security', 
      name: 'Güvenlik', 
      icon: Shield,
      gradient: 'from-red-500 to-red-700',
      description: 'Güvenlik politikaları ve fraud detection'
    },
    { 
      id: 'admins', 
      name: 'Admin Kullanıcıları', 
      icon: Users,
      gradient: 'from-indigo-500 to-indigo-700',
      description: 'Admin yetkilerini yönet'
    },
    { 
      id: 'maintenance', 
      name: 'Bakım Modu', 
      icon: Database,
      gradient: 'from-orange-500 to-orange-700',
      description: 'Sistem bakımı ve güncellemeler'
    },
    { 
      id: 'testing', 
      name: 'A/B Testing', 
      icon: TestTube,
      gradient: 'from-cyan-500 to-cyan-700',
      description: 'A/B testleri ve kullanıcı deneyimi'
    }
  ];

  const handleSave = () => {
    setLoading(true);
    // Simulate save operation
    setTimeout(() => {
      setLoading(false);
      setSavedMessage('Ayarlar başarıyla kaydedildi!');
      setTimeout(() => setSavedMessage(''), 3000);
    }, 1000);
  };

  const toggleAPIKeyVisibility = (id: number) => {
    setApiKeys(keys => keys.map(key => 
      key.id === id ? { ...key, masked: !key.masked } : key
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="admin-gradient-dark p-3 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Sistem Ayarları</h1>
              <p className="text-slate-400">API anahtarları, ödeme ayarları ve güvenlik</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="admin-glass rounded-lg px-4 py-2">
              <div className="text-sm text-slate-400">Son Güncelleme</div>
              <div className="text-lg font-bold text-white">{new Date().toLocaleDateString('tr-TR')}</div>
            </div>
            {savedMessage && (
              <div className="admin-gradient-success rounded-lg px-4 py-2">
                <div className="text-white text-sm flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  {savedMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-card rounded-2xl p-2">
        <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'api' | 'payment' | 'email' | 'security' | 'admins' | 'maintenance' | 'testing')}
              className={`flex flex-col items-center space-y-1 sm:space-y-2 px-2 sm:px-4 py-3 sm:py-4 rounded-xl font-medium transition-all admin-hover-scale touch-target ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white`
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <div className={`p-1 sm:p-2 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-700/30'}`}>
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-xs sm:text-sm truncate">{tab.name}</div>
                <div className="text-xs opacity-80 hidden lg:block">{tab.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        {activeTab === 'api' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                  <Key className="h-5 w-5 text-white" />
                </div>
                API Anahtarları
              </h3>
              <button className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Yeni API Key</span>
              </button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="admin-glass rounded-xl p-6 admin-hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${apiKey.active ? 'admin-gradient-success' : 'bg-slate-600'}`}>
                        <Key className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{apiKey.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-mono text-sm text-slate-300">
                            {apiKey.masked 
                              ? apiKey.key.slice(0, 8) + '*'.repeat(20) 
                              : apiKey.key}
                          </span>
                          <button
                            onClick={() => toggleAPIKeyVisibility(apiKey.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            {apiKey.masked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        apiKey.active 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {apiKey.active ? '🟢 Aktif' : '🔴 Pasif'}
                      </div>
                      <button className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="admin-gradient-danger p-2 rounded-lg admin-hover-scale">
                        <Trash className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="admin-gradient-success p-2 rounded-lg mr-3">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              Ödeme Sağlayıcı Ayarları
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="admin-glass rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">💳</span>
                  Stripe Ayarları
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Publishable Key</label>
                    <input
                      type="text"
                      className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="pk_test_..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Secret Key</label>
                    <input
                      type="password"
                      className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="sk_test_..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="stripe-live" className="rounded" />
                    <label htmlFor="stripe-live" className="text-sm text-slate-300">Live modda çalıştır</label>
                  </div>
                </div>
              </div>

              <div className="admin-glass rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🅿️</span>
                  PayPal Ayarları
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Client ID</label>
                    <input
                      type="text"
                      className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PayPal Client ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Client Secret</label>
                    <input
                      type="password"
                      className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PayPal Client Secret"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="paypal-sandbox" className="rounded" />
                    <label htmlFor="paypal-sandbox" className="text-sm text-slate-300">Sandbox modda test et</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="admin-gradient-accent p-2 rounded-lg mr-3">
                <Mail className="h-5 w-5 text-white" />
              </div>
              E-posta Konfigürasyonu
            </h3>
            
            <div className="admin-glass rounded-xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Sunucusu</label>
                  <input
                    type="text"
                    className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Port</label>
                  <input
                    type="number"
                    className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Kullanıcı Adı</label>
                  <input
                    type="email"
                    className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="noreply@busbuskimki.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Şifre</label>
                  <input
                    type="password"
                    className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="•••••••••••"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="tls" className="rounded" />
                  <label htmlFor="tls" className="text-sm text-slate-300">TLS Kullan</label>
                </div>
                <button className="admin-btn-primary px-4 py-2 rounded-lg">
                  Test E-postası Gönder
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="admin-gradient-danger p-2 rounded-lg mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              Güvenlik Ayarları
            </h3>
            
            <div className="space-y-6">
              <div className="admin-glass rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4">🔐 Genel Güvenlik</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">İki Faktörlü Kimlik Doğrulama</div>
                      <div className="text-sm text-slate-400">Admin hesapları için 2FA zorunlu kıl</div>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Şifre Karmaşıklığı</div>
                      <div className="text-sm text-slate-400">Güçlü şifre gereksinimleri</div>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              <FraudDetection />
            </div>
          </div>
        )}

        {activeTab === 'admins' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Admin Kullanıcıları
              </h3>
              <button className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Yeni Admin</span>
              </button>
            </div>

            <div className="space-y-4">
              {adminUsers.map((admin) => (
                <div key={admin.user_id} className="admin-glass rounded-xl p-6 admin-hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="admin-gradient-accent p-3 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{admin.display_name}</h4>
                        <p className="text-sm text-slate-400">{admin.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            admin.role === 'super_admin' 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {admin.role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(admin.created_at).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale">
                        <Edit className="h-4 w-4" />
                      </button>
                      {admin.role !== 'super_admin' && (
                        <button className="admin-gradient-danger p-2 rounded-lg admin-hover-scale">
                          <Trash className="h-4 w-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="admin-gradient-warning p-2 rounded-lg mr-3">
                <Database className="h-5 w-5 text-white" />
              </div>
              Sistem Bakımı
            </h3>
            
            <div className="admin-glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-white">Bakım Modu</div>
                  <div className="text-sm text-slate-400">Sistemi geçici olarak devre dışı bırak</div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </button>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Bakım Mesajı</label>
                <textarea
                  className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Sistem bakımda. Lütfen daha sonra tekrar deneyin."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testing' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                <TestTube className="h-5 w-5 text-white" />
              </div>
              A/B Test Yönetimi
            </h3>
            
            <ABTestManager />
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-slate-700">
          <button
            onClick={handleSave}
            disabled={loading}
            className="admin-btn-primary px-6 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Ayarları Kaydet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}