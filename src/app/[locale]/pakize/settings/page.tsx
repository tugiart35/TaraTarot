'use client';

import { useState, useEffect } from 'react';
import { 
  Key,
  CreditCard,
  Mail,
  Shield,
  Users,
  Database,
  Check,
  Save,
  Plus,
  Trash,
  Trash2,
  Edit,
  TestTube,
  Settings,
  X,
  Code,
  Zap,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  Wrench,
  Bell
} from 'lucide-react';
import ABTestManager from '@/components/admin/ABTestManager';
import FraudDetection from '@/components/admin/FraudDetection';
import { APIKeyManager, APIKey } from '@/lib/admin/api-keys';
import { AdminUserManager, AdminUser } from '@/lib/admin/admin-users';
import { AddAdminUserModal, EditAdminUserModal } from '@/components/admin/AdminUserModals';
import { EmailSystemManager, EmailSettings, CreateEmailSettingsData, EmailTemplate } from '@/lib/admin/email-system';
import { AddEmailTemplateModal, EditEmailTemplateModal } from '@/components/admin/EmailTemplateModals';
import { MaintenanceSystemManager, MaintenanceStatus } from '@/lib/admin/maintenance-system';
import { ShopierSystemManager, ShopierSettings, ShopierTestResult } from '@/lib/admin/shopier-system';
import { createTestPayment, createShopierPayment } from '@/lib/payment/shopier-config';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';
import { DeleteConfirmationDialog } from '@/components/shared/ui/ConfirmationDialog';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';

// APIKey interface artık lib/admin/api-keys.ts'den import ediliyor

// AdminUser interface artık lib/admin/admin-users.ts'den import ediliyor


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'api' | 'payment' | 'email' | 'security' | 'admins' | 'maintenance' | 'testing' | 'shopier'>('api');
  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  
  // Toast system
  const { toast, showToast, hideToast } = useToast();
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'delete' | 'warning' | 'info';
    title: string;
    message: string;
    onConfirm: () => void;
    itemName?: string;
  }>({
    isOpen: false,
    type: 'delete',
    title: '',
    message: '',
    onConfirm: () => {}
  });
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [apiKeysLoading, setApiKeysLoading] = useState(true);
  const [showAddAPIKeyModal, setShowAddAPIKeyModal] = useState(false);
  const [editingAPIKey, setEditingAPIKey] = useState<APIKey | null>(null);

  // Admin Users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminUsersLoading, setAdminUsersLoading] = useState(true);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [editingAdminUser, setEditingAdminUser] = useState<AdminUser | null>(null);

  // Email Settings state
  const [emailSettings, setEmailSettings] = useState<EmailSettings | null>(null);
  const [emailSettingsLoading, setEmailSettingsLoading] = useState(true);
  const [showEmailSettingsModal, setShowEmailSettingsModal] = useState(false);

  // Email Templates state
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [emailTemplatesLoading, setEmailTemplatesLoading] = useState(true);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  // Maintenance state
  const [maintenanceStatus, setMaintenanceStatus] = useState<MaintenanceStatus | null>(null);
  const [maintenanceLoading, setMaintenanceLoading] = useState(true);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [allowedIPs, setAllowedIPs] = useState<string[]>([]);

  // Shopier state
  const [shopierSettings, setShopierSettings] = useState<ShopierSettings | null>(null);
  const [shopierLoading, setShopierLoading] = useState(true);
  const [shopierTestResult, setShopierTestResult] = useState<ShopierTestResult | null>(null);


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
    },
    { 
      id: 'shopier', 
      name: 'Shopier Ayarları', 
      icon: CreditCard,
      gradient: 'from-purple-500 to-purple-700',
      description: 'Shopier ödeme sistemi konfigürasyonu'
    }
  ];

  // API Keys verilerini çek
  const fetchAPIKeys = async () => {
    try {
      setApiKeysLoading(true);
      const keys = await APIKeyManager.getAllAPIKeys();
      setApiKeys(keys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setSavedMessage('API key\'leri yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setApiKeysLoading(false);
    }
  };

  // Admin Users verilerini çek
  const fetchAdminUsers = async () => {
    try {
      setAdminUsersLoading(true);
      const users = await AdminUserManager.getAllAdminUsers();
      setAdminUsers(users);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      setSavedMessage('Admin kullanıcıları yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setAdminUsersLoading(false);
    }
  };

  // Email Settings verilerini çek
  const fetchEmailSettings = async () => {
    try {
      setEmailSettingsLoading(true);
      const settings = await EmailSystemManager.getEmailSettings();
      setEmailSettings(settings);
    } catch (error) {
      console.error('Error fetching email settings:', error);
      setSavedMessage('Email ayarları yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setEmailSettingsLoading(false);
    }
  };

  // Email Templates verilerini çek
  const fetchEmailTemplates = async () => {
    try {
      setEmailTemplatesLoading(true);
      const templates = await EmailSystemManager.getEmailTemplates();
      setEmailTemplates(templates);
    } catch (error) {
      console.error('Error fetching email templates:', error);
      setSavedMessage('Email template\'leri yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setEmailTemplatesLoading(false);
    }
  };

  // Maintenance durumunu çek
  const fetchMaintenanceStatus = async () => {
    try {
      setMaintenanceLoading(true);
      const status = await MaintenanceSystemManager.getMaintenanceStatus();
      setMaintenanceStatus(status);
      setMaintenanceMessage(status.message);
      setAllowedIPs(status.allowedIPs);
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
      setSavedMessage('Bakım modu durumu yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setMaintenanceLoading(false);
    }
  };

  // Shopier ayarlarını çek
  const fetchShopierSettings = async () => {
    try {
      setShopierLoading(true);
      const settings = await ShopierSystemManager.getShopierSettings();
      setShopierSettings(settings);
    } catch (error) {
      console.error('Error fetching shopier settings:', error);
      setSavedMessage('Shopier ayarları yüklerken hata oluştu');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setShopierLoading(false);
    }
  };

  // Component mount olduğunda verileri çek
  useEffect(() => {
    if (activeTab === 'api') {
      fetchAPIKeys();
    } else if (activeTab === 'admins') {
      fetchAdminUsers();
    } else if (activeTab === 'email') {
      fetchEmailSettings();
      fetchEmailTemplates();
    } else if (activeTab === 'maintenance') {
      fetchMaintenanceStatus();
    } else if (activeTab === 'shopier') {
      fetchShopierSettings();
    }
  }, [activeTab]);

  const handleSave = () => {
    setLoading(true);
    // Simulate save operation
    setTimeout(() => {
      setLoading(false);
      setSavedMessage('Ayarlar başarıyla kaydedildi!');
      setTimeout(() => setSavedMessage(''), 3000);
    }, 1000);
  };



  // API Key işlemleri
  const handleDeleteAPIKey = async (id: string) => {
    const apiKey = apiKeys.find(key => key.id === id);
    if (!apiKey) return;

    showDeleteConfirmation(apiKey.name, async () => {
      try {
    setLoading(true);
        await APIKeyManager.deleteAPIKey(id);
        showToast('API key başarıyla silindi!', 'success');
        await fetchAPIKeys(); // Listeyi yenile
      } catch (error) {
        console.error('Error deleting API key:', error);
        showToast('API key silinirken hata oluştu: ' + (error as Error).message, 'error');
      } finally {
      setLoading(false);
        closeConfirmationDialog();
      }
    });
  };


  // Admin User işlemleri
  const handleDeleteAdminUser = async (userId: string) => {
    if (!confirm('Bu admin kullanıcısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      await AdminUserManager.deleteAdminUser(userId);
      setSavedMessage('Admin kullanıcısı başarıyla silindi!');
      await fetchAdminUsers(); // Listeyi yenile
    } catch (error) {
      console.error('Error deleting admin user:', error);
      setSavedMessage('Admin kullanıcısı silinirken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  // Email işlemleri
  const handleTestSMTP = async (settingsData: CreateEmailSettingsData) => {
    try {
      setLoading(true);
      const result = await EmailSystemManager.testSMTPConnection(settingsData);
      setSavedMessage(result.success ? '✅ ' + result.message : '❌ ' + result.message);
    } catch (error) {
      console.error('Error testing SMTP:', error);
      setSavedMessage('SMTP test edilirken hata oluştu');
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 5000);
    }
  };

  // Email Template işlemleri
  const handleDeleteEmailTemplate = async (templateId: string) => {
    if (!confirm('Bu email template\'ini silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      await EmailSystemManager.deleteEmailTemplate(templateId);
      setSavedMessage('Email template başarıyla silindi!');
      await fetchEmailTemplates(); // Listeyi yenile
    } catch (error) {
      console.error('Error deleting email template:', error);
      setSavedMessage('Email template silinirken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  // Varsayılan template'leri oluştur
  const handleCreateDefaultTemplates = async () => {
    try {
      setLoading(true);
      await EmailSystemManager.createDefaultTemplates();
      setSavedMessage('Varsayılan email template\'leri başarıyla oluşturuldu!');
      await fetchEmailTemplates(); // Listeyi yenile
    } catch (error) {
      console.error('Error creating default templates:', error);
      setSavedMessage('Varsayılan template\'ler oluşturulurken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  // Maintenance işlemleri
  const handleToggleMaintenance = async (enabled: boolean) => {
    try {
      setLoading(true);
      await MaintenanceSystemManager.toggleMaintenanceMode(enabled, maintenanceMessage);
      setSavedMessage(enabled ? 'Bakım modu açıldı!' : 'Bakım modu kapatıldı!');
      await fetchMaintenanceStatus(); // Durumu yenile
    } catch (error) {
      console.error('Error toggling maintenance mode:', error);
      setSavedMessage('Bakım modu değiştirilirken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleUpdateMaintenanceMessage = async () => {
    try {
      setLoading(true);
      await MaintenanceSystemManager.updateMaintenanceMessage(maintenanceMessage);
      setSavedMessage('Bakım mesajı güncellendi!');
      await fetchMaintenanceStatus(); // Durumu yenile
    } catch (error) {
      console.error('Error updating maintenance message:', error);
      setSavedMessage('Bakım mesajı güncellenirken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  // Shopier işlemleri
  const handleSaveShopierSettings = async (settings: ShopierSettings) => {
    try {
      setLoading(true);
      await ShopierSystemManager.saveShopierSettings(settings);
      setSavedMessage('Shopier ayarları başarıyla kaydedildi!');
      await fetchShopierSettings(); // Ayarları yenile
    } catch (error) {
      console.error('Error saving shopier settings:', error);
      setSavedMessage('Shopier ayarları kaydedilirken hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleTestShopierConnection = async (settings: ShopierSettings) => {
    try {
      setLoading(true);
      const result = await ShopierSystemManager.testShopierConnection(settings);
      setShopierTestResult(result);
      showToast(result.success ? result.message : result.message, result.success ? 'success' : 'error');
    } catch (error) {
      console.error('Error testing shopier connection:', error);
      showToast('Shopier test edilirken hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Confirmation dialog helpers
  const showDeleteConfirmation = (itemName: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      type: 'delete',
      title: 'Silme Onayı',
      message: `"${itemName}" öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      onConfirm,
      itemName
    });
  };

  const showWarningConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title,
      message,
      onConfirm
    });
  };

  const closeConfirmationDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
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
              <button 
                onClick={() => setShowAddAPIKeyModal(true)}
                className="admin-btn-primary px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 touch-target"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Yeni API Key</span>
                <span className="sm:hidden">+ API</span>
              </button>
            </div>

            {apiKeysLoading ? (
              <div className="space-y-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
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
                              {APIKeyManager.maskKey(apiKey.key_value)}
                          </span>
                            <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">
                              {apiKey.service_type}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Oluşturulma: {new Date(apiKey.created_at).toLocaleDateString('tr-TR')}
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
                        <button 
                          onClick={() => setEditingAPIKey(apiKey)}
                          className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale"
                        >
                        <Edit className="h-4 w-4" />
                      </button>
                        <button 
                          onClick={() => handleDeleteAPIKey(apiKey.id)}
                          className="admin-gradient-danger p-2 rounded-lg admin-hover-scale"
                        >
                        <Trash className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

                {apiKeys.length === 0 && (
                  <div className="text-center py-12">
                    <Key className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Henüz API Key Yok</h3>
                    <p className="text-slate-400 mb-6">İlk API key'inizi ekleyin</p>
                    <button 
                      onClick={() => setShowAddAPIKeyModal(true)}
                      className="admin-btn-primary px-6 py-2 rounded-lg"
                    >
                      API Key Ekle
                    </button>
            </div>
                )}
              </div>
            )}
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
            <div className="admin-glass rounded-xl p-6 admin-hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                <Mail className="h-5 w-5 text-white" />
              </div>
                  E-posta Ayarları
            </h3>
                <button 
                  onClick={() => setShowEmailSettingsModal(true)}
                  className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>SMTP Ayarları</span>
                </button>
              </div>

              {emailSettingsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="admin-pulse">
                    <Mail className="h-8 w-8 text-blue-500" />
                  </div>
                  <span className="ml-3 text-slate-400">Email ayarları yükleniyor...</span>
                </div>
              ) : emailSettings ? (
                <div className="space-y-6">
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Mevcut SMTP Ayarları</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">SMTP Host:</span>
                        <span className="text-white font-mono">{emailSettings.smtp_host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Port:</span>
                        <span className="text-white">{emailSettings.smtp_port}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Güvenli:</span>
                        <span className={`px-2 py-1 rounded text-xs ${emailSettings.smtp_secure ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {emailSettings.smtp_secure ? 'SSL/TLS' : 'STARTTLS'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Kullanıcı:</span>
                        <span className="text-white">{emailSettings.smtp_user}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-slate-400">Gönderen:</span>
                        <span className="text-white">{emailSettings.from_name} &lt;{emailSettings.from_email}&gt;</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-slate-400">Durum:</span>
                        <span className={`px-2 py-1 rounded text-xs ${emailSettings.active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                          {emailSettings.active ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleTestSMTP(emailSettings)}
                        className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale"
                      >
                        <TestTube className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-slate-400">Test Bağlantısı</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setShowEmailSettingsModal(true)}
                        className="admin-glass hover:bg-slate-700/50 px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Düzenle</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">SMTP Ayarları Yok</h3>
                  <p className="text-slate-400 mb-6">Email gönderimi için SMTP ayarlarını yapılandırın</p>
                  <button 
                    onClick={() => setShowEmailSettingsModal(true)}
                    className="admin-btn-primary px-6 py-2 rounded-lg"
                  >
                    SMTP Ayarları Ekle
                  </button>
                </div>
              )}

              {/* Email Templates Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <div className="admin-gradient-accent p-2 rounded-lg mr-3">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    Email Template'leri
                  </h4>
                  <div className="flex space-x-2">
                    {emailTemplates.length === 0 && (
                      <button 
                        onClick={handleCreateDefaultTemplates}
                        className="admin-glass hover:bg-slate-700/50 px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <Code className="h-4 w-4" />
                        <span>Varsayılan Template'ler</span>
                      </button>
                    )}
                    <button 
                      onClick={() => setShowAddTemplateModal(true)}
                      className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Yeni Template</span>
                    </button>
                  </div>
                </div>

                {emailTemplatesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="admin-pulse">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="ml-3 text-slate-400">Template'ler yükleniyor...</span>
                  </div>
                ) : emailTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {emailTemplates.map((template) => (
                      <div key={template.id} className="admin-glass rounded-lg p-4 admin-hover-lift">
                        <div className="flex items-start justify-between mb-3">
                <div>
                            <h5 className="font-semibold text-white">{template.name}</h5>
                            <p className="text-sm text-slate-400">{template.template_type}</p>
                </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setEditingTemplate(template)}
                              className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmailTemplate(template.id)}
                              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-slate-400">Konu:</span>
                            <span className="text-white ml-2">{template.subject}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-slate-400">Değişkenler:</span>
                            <span className="text-white ml-2">
                              {Object.keys(template.variables || {}).length} adet
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs ${
                              template.active 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {template.active ? 'Aktif' : 'Pasif'}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(template.created_at).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Template Yok</h4>
                    <p className="text-slate-400 mb-4">Henüz email template'i oluşturulmamış</p>
                    <button 
                      onClick={() => setShowAddTemplateModal(true)}
                      className="admin-btn-primary px-4 py-2 rounded-lg"
                    >
                      İlk Template'i Oluştur
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
                <div>
            <div className="admin-glass rounded-xl p-6 admin-hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                    <Database className="h-5 w-5 text-white" />
                </div>
                  Bakım Modu Yönetimi
                </h3>
              </div>

              {maintenanceLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="admin-pulse">
                    <Database className="h-8 w-8 text-orange-500" />
                  </div>
                  <span className="ml-3 text-slate-400">Bakım modu durumu yükleniyor...</span>
                </div>
              ) : maintenanceStatus ? (
                <div className="space-y-6">
                  {/* Mevcut Durum */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Mevcut Durum</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bakım Modu:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          maintenanceStatus.isMaintenanceMode 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {maintenanceStatus.isMaintenanceMode ? 'Açık' : 'Kapalı'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Erişim:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          maintenanceStatus.canAccess 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {maintenanceStatus.canAccess ? 'İzinli' : 'Kısıtlı'}
                        </span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-slate-400">Kullanıcı IP:</span>
                        <span className="text-white font-mono">{maintenanceStatus.userIP}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-slate-400">İzinli IP'ler:</span>
                        <span className="text-white">
                          {maintenanceStatus.allowedIPs.length > 0 
                            ? maintenanceStatus.allowedIPs.join(', ') 
                            : 'Yok'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bakım Modu Toggle */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-4">Bakım Modu Kontrolü</h4>
                    <div className="flex items-center justify-between">
                <div>
                        <div className="font-medium text-white">Bakım Modu</div>
                        <div className="text-sm text-slate-400">
                          {maintenanceStatus.isMaintenanceMode 
                            ? 'Sistem şu anda bakım modunda' 
                            : 'Sistem normal çalışıyor'
                          }
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleMaintenance(!maintenanceStatus.isMaintenanceMode)}
                        disabled={loading}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          maintenanceStatus.isMaintenanceMode ? 'bg-red-600' : 'bg-gray-600'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            maintenanceStatus.isMaintenanceMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                </div>
                  </div>

                  {/* Bakım Mesajı */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-4">Bakım Mesajı</h4>
                    <div className="space-y-4">
                      <textarea
                        value={maintenanceMessage}
                        onChange={(e) => setMaintenanceMessage(e.target.value)}
                        className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                        placeholder="Bakım modu mesajını buraya yazın..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleUpdateMaintenanceMessage}
                          disabled={loading}
                          className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                          <span>Mesajı Güncelle</span>
                        </button>
                      </div>
                </div>
              </div>
              
                  {/* Hızlı Mesajlar */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-4">Hızlı Mesajlar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {MaintenanceSystemManager.getDefaultMessages().map((msg) => (
                        <button
                          key={msg.key}
                          onClick={() => setMaintenanceMessage(msg.message)}
                          className="text-left p-3 admin-glass rounded-lg hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="font-medium text-white text-sm">{msg.key}</div>
                          <div className="text-slate-400 text-xs mt-1">{msg.message}</div>
                        </button>
                      ))}
                </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Database className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Bakım Modu Bilgisi Yok</h3>
                  <p className="text-slate-400 mb-6">Bakım modu durumu yüklenemedi</p>
                  <button 
                    onClick={fetchMaintenanceStatus}
                    className="admin-btn-primary px-6 py-2 rounded-lg"
                  >
                    Tekrar Dene
                </button>
              </div>
              )}
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
              <button 
                onClick={() => setShowAddAdminModal(true)}
                className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Yeni Admin</span>
              </button>
            </div>

            {adminUsersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="admin-pulse">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <span className="ml-3 text-slate-400">Admin kullanıcıları yükleniyor...</span>
              </div>
            ) : (
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
                                : admin.role === 'admin'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                              {admin.role === 'super_admin' ? '👑 Super Admin' : 
                               admin.role === 'admin' ? '👤 Admin' : '🛡️ Moderator'}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(admin.created_at).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Yetkiler: {Object.keys(admin.permissions).filter(key => admin.permissions[key]).length} aktif
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setEditingAdminUser(admin)}
                          className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale"
                        >
                        <Edit className="h-4 w-4" />
                      </button>
                      {admin.role !== 'super_admin' && (
                          <button 
                            onClick={() => handleDeleteAdminUser(admin.user_id)}
                            className="admin-gradient-danger p-2 rounded-lg admin-hover-scale"
                          >
                          <Trash className="h-4 w-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

                {adminUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Henüz Admin Kullanıcı Yok</h3>
                    <p className="text-slate-400 mb-6">İlk admin kullanıcısını ekleyin</p>
                    <button 
                      onClick={() => setShowAddAdminModal(true)}
                      className="admin-btn-primary px-6 py-2 rounded-lg"
                    >
                      Admin Kullanıcı Ekle
                    </button>
            </div>
                )}
              </div>
            )}
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

        {activeTab === 'shopier' && (
          <div>
            <div className="admin-glass rounded-xl p-6 admin-hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              Shopier Ödeme Sistemi
            </h3>
                </div>

              {shopierLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="admin-pulse">
                    <CreditCard className="h-8 w-8 text-purple-500" />
                </div>
                  <span className="ml-3 text-slate-400">Shopier ayarları yükleniyor...</span>
                </div>
              ) : shopierSettings ? (
                <div className="space-y-6">
                  {/* Mevcut Ayarlar */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Mevcut Ayarlar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Merchant ID:</span>
                        <span className="text-white font-mono">{shopierSettings.merchantId || 'Ayarlanmamış'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Test Modu:</span>
                        <span className={`px-2 py-1 rounded text-xs ${shopierSettings.testMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                          {shopierSettings.testMode ? 'Açık' : 'Kapalı'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">API Key:</span>
                        <span className="text-white font-mono text-xs">
                          {shopierSettings.apiKey ? `${shopierSettings.apiKey.substring(0, 8)}...` : 'Ayarlanmamış'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">API Secret:</span>
                        <span className="text-white font-mono text-xs">
                          {shopierSettings.apiSecret ? `${shopierSettings.apiSecret.substring(0, 8)}...` : 'Ayarlanmamış'}
                        </span>
                      </div>
                      <div className="flex justify-between col-span-1 md:col-span-2">
                        <span className="text-slate-400">Webhook URL:</span>
                        <span className="text-white text-xs break-all">{shopierSettings.webhookUrl}</span>
                      </div>
                      <div className="flex justify-between col-span-1 md:col-span-2">
                        <span className="text-slate-400">Callback URL:</span>
                        <span className="text-white text-xs break-all">{shopierSettings.callbackUrl}</span>
                      </div>
                      <div className="flex justify-between col-span-1 md:col-span-2">
                        <span className="text-slate-400">Success URL:</span>
                        <span className="text-white text-xs break-all">{shopierSettings.successUrl}</span>
                      </div>
                      <div className="flex justify-between col-span-1 md:col-span-2">
                        <span className="text-slate-400">Cancel URL:</span>
                        <span className="text-white text-xs break-all">{shopierSettings.cancelUrl}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ödeme İstatistikleri */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Ödeme İstatistikleri</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">₺0</div>
                        <div className="text-xs text-slate-400">Toplam Gelir</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">0</div>
                        <div className="text-xs text-slate-400">Başarılı Ödeme</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">0</div>
                        <div className="text-xs text-slate-400">Bekleyen Ödeme</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">0</div>
                        <div className="text-xs text-slate-400">Başarısız Ödeme</div>
                      </div>
                    </div>
                  </div>

                  {/* Test Sonuçları */}
                  {shopierTestResult && (
                    <div className="admin-glass rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3">Test Sonuçları</h4>
                      <div className={`p-3 rounded-lg ${
                        shopierTestResult.success 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        <p className="text-sm font-medium">{shopierTestResult.message}</p>
                        {shopierTestResult.details && (
                          <div className="mt-2 text-xs opacity-75">
                            <pre>{JSON.stringify(shopierTestResult.details, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Düzenleme Formu */}
                  <div className="admin-glass rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-4">Ayarları Düzenle</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                        <label className="block text-sm text-slate-400 mb-2">Merchant ID</label>
                  <input
                    type="text"
                          value={shopierSettings.merchantId}
                          onChange={(e) => setShopierSettings({...shopierSettings, merchantId: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="Merchant ID girin"
                  />
                </div>
                <div>
                        <label className="block text-sm text-slate-400 mb-2">API Key</label>
                  <input
                    type="password"
                          value={shopierSettings.apiKey}
                          onChange={(e) => setShopierSettings({...shopierSettings, apiKey: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="API Key girin"
                  />
                </div>
                <div>
                        <label className="block text-sm text-slate-400 mb-2">API Secret</label>
                  <input
                    type="password"
                          value={shopierSettings.apiSecret}
                          onChange={(e) => setShopierSettings({...shopierSettings, apiSecret: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="API Secret girin"
                  />
                </div>
                      <div className="flex items-center">
                        <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                            checked={shopierSettings.testMode}
                            onChange={(e) => setShopierSettings({...shopierSettings, testMode: e.target.checked})}
                            className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                          />
                          <span className="text-sm text-slate-400">Test Modu</span>
                  </label>
                </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-2">Webhook URL</label>
                        <input
                          type="url"
                          value={shopierSettings.webhookUrl}
                          onChange={(e) => setShopierSettings({...shopierSettings, webhookUrl: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="Webhook URL girin"
                        />
              </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-2">Callback URL</label>
                  <input
                    type="url"
                          value={shopierSettings.callbackUrl}
                          onChange={(e) => setShopierSettings({...shopierSettings, callbackUrl: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="Callback URL girin"
                        />
                </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-2">Success URL</label>
                    <input
                      type="url"
                          value={shopierSettings.successUrl}
                          onChange={(e) => setShopierSettings({...shopierSettings, successUrl: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="Success URL girin"
                    />
                  </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-2">Cancel URL</label>
                    <input
                      type="url"
                          value={shopierSettings.cancelUrl}
                          onChange={(e) => setShopierSettings({...shopierSettings, cancelUrl: e.target.value})}
                          className="w-full px-3 py-2 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                          placeholder="Cancel URL girin"
                        />
                </div>
              </div>
            </div>

                  {/* Aksiyon Butonları */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleTestShopierConnection(shopierSettings)}
                        className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale touch-target"
                        title="Bağlantıyı Test Et"
                      >
                        <TestTube className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={async () => {
                          try {
                            setLoading(true);
                            // Test ödeme oluştur
                            const testPayment = createTestPayment('test-package', 'test-user');
                            
                            // Test ödeme için gerçek ödeme URL'i oluştur
                            const paymentResponse = await createShopierPayment(testPayment);
                            
                            if (paymentResponse.success) {
                              showToast('Test ödeme başarıyla oluşturuldu!', 'success');
                              // Test ödeme URL'ini yeni sekmede aç
                              window.open(paymentResponse.paymentUrl, '_blank');
                            } else {
                              showToast('Test ödeme oluşturulamadı', 'error');
                            }
                          } catch (error) {
                            console.error('Test payment error:', error);
                            showToast('Test ödeme sırasında hata oluştu', 'error');
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale touch-target"
                        title="Test Ödeme Oluştur"
                      >
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={async () => {
                          try {
                            setLoading(true);
                            // Webhook test endpoint'ini çağır
                            const response = await fetch('/api/webhook/shopier', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                test: true,
                                orderId: `WEBHOOK_TEST_${Date.now()}`,
                                status: 'success',
                                amount: 1.00,
                                currency: 'TRY'
                              })
                            });
                            
                            if (response.ok) {
                              showToast('Webhook test başarılı!', 'success');
                            } else {
                              showToast('Webhook test başarısız', 'error');
                            }
                          } catch (error) {
                            console.error('Webhook test error:', error);
                            showToast('Webhook test sırasında hata oluştu', 'error');
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="admin-glass hover:bg-slate-700/50 p-2 rounded-lg admin-hover-scale touch-target"
                        title="Webhook Test"
                      >
                        <Zap className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-slate-400">API, Ödeme & Webhook Testi</span>
            </div>

                    <div className="flex space-x-2">
                <button
                        onClick={() => {
                          const defaultSettings = ShopierSystemManager.getDefaultSettings();
                          setShopierSettings(defaultSettings);
                          showToast('Varsayılan ayarlar yüklendi', 'success');
                        }}
                        className="admin-glass hover:bg-slate-700/50 px-3 py-2 rounded-lg flex items-center space-x-2 touch-target mr-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span className="hidden sm:inline">Varsayılan Ayarlar</span>
                        <span className="sm:hidden">Varsayılan</span>
                </button>
                <button
                        onClick={() => handleSaveShopierSettings(shopierSettings)}
                        className="admin-btn-primary px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 touch-target"
                >
                  <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">Ayarları Kaydet</span>
                        <span className="sm:hidden">Kaydet</span>
                </button>
              </div>
                </div>
              </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Shopier Ayarları Yok</h3>
                  <p className="text-slate-400 mb-6">Shopier ödeme sistemi için ayarları yapılandırın</p>
                      <button 
                    onClick={() => {
                      const defaultSettings = ShopierSystemManager.getDefaultSettings();
                      setShopierSettings(defaultSettings);
                    }}
                    className="admin-btn-primary px-6 py-2 rounded-lg"
                  >
                    Varsayılan Ayarları Yükle
                      </button>
                    </div>
              )}
            </div>
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

      {/* API Key Ekleme Modal */}
      {showAddAPIKeyModal && (
        <AddAPIKeyModal 
          onClose={() => setShowAddAPIKeyModal(false)}
          onSuccess={() => {
            setShowAddAPIKeyModal(false);
            fetchAPIKeys();
          }}
        />
      )}

      {/* API Key Düzenleme Modal */}
      {editingAPIKey && (
        <EditAPIKeyModal 
          apiKey={editingAPIKey}
          onClose={() => setEditingAPIKey(null)}
          onSuccess={() => {
            setEditingAPIKey(null);
            fetchAPIKeys();
          }}
        />
      )}

      {/* Admin User Ekleme Modal */}
      {showAddAdminModal && (
        <AddAdminUserModal 
          onClose={() => setShowAddAdminModal(false)}
          onSuccess={() => {
            setShowAddAdminModal(false);
            fetchAdminUsers();
          }}
        />
      )}

      {/* Admin User Düzenleme Modal */}
      {editingAdminUser && (
        <EditAdminUserModal 
          adminUser={editingAdminUser}
          onClose={() => setEditingAdminUser(null)}
          onSuccess={() => {
            setEditingAdminUser(null);
            fetchAdminUsers();
          }}
        />
      )}

      {/* Email Template Ekleme Modal */}
      {showAddTemplateModal && (
        <AddEmailTemplateModal
          onClose={() => setShowAddTemplateModal(false)}
          onSuccess={() => {
            setShowAddTemplateModal(false);
            fetchEmailTemplates();
          }}
        />
      )}

      {/* Email Template Düzenleme Modal */}
      {editingTemplate && (
        <EditEmailTemplateModal
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSuccess={() => {
            setEditingTemplate(null);
            fetchEmailTemplates();
          }}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={confirmDialog.onConfirm}
        itemName={confirmDialog.itemName || ''}
        loading={loading}
      />
                </div>
  );
}

// API Key Ekleme Modal Component
function AddAPIKeyModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    service_type: 'groq',
    key_value: '',
    active: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await APIKeyManager.createAPIKey(formData);
      onSuccess();
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('API key oluşturulurken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="admin-card rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Yeni API Key</h3>
          <button onClick={onClose} className="p-2 admin-glass rounded-lg">
            <X className="h-5 w-5" />
          </button>
              </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ad</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="API Key Adı"
              required
            />
            </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Servis Tipi</label>
            <select
              value={formData.service_type}
              onChange={(e) => setFormData({...formData, service_type: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="groq">Groq</option>
              <option value="openai">OpenAI</option>
              <option value="stripe">Stripe</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
            <input
              type="password"
              value={formData.key_value}
              onChange={(e) => setFormData({...formData, key_value: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="API Key Değeri"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              className="rounded"
            />
            <label htmlFor="active" className="text-sm text-slate-300">Aktif</label>
          </div>

          <div className="flex space-x-3 pt-4">
                <button
              type="button"
              onClick={onClose}
              className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg"
                >
              İptal
                </button>
                <button
              type="submit"
                  disabled={loading}
              className="flex-1 admin-btn-primary p-3 rounded-lg disabled:opacity-50"
                >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
        </form>
      </div>
    </div>
  );
}

// API Key Düzenleme Modal Component
function EditAPIKeyModal({ apiKey, onClose, onSuccess }: { 
  apiKey: APIKey; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: apiKey.name,
    service_type: apiKey.service_type,
    key_value: '',
    active: apiKey.active
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const updateData: any = {
        name: formData.name,
        service_type: formData.service_type,
        active: formData.active
      };
      
      // Sadece key değiştirilmişse ekle
      if (formData.key_value) {
        updateData.key_value = formData.key_value;
      }
      
      await APIKeyManager.updateAPIKey(apiKey.id, updateData);
      onSuccess();
    } catch (error) {
      console.error('Error updating API key:', error);
      alert('API key güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="admin-card rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">API Key Düzenle</h3>
          <button onClick={onClose} className="p-2 admin-glass rounded-lg">
            <X className="h-5 w-5" />
          </button>
                </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ad</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
              </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Servis Tipi</label>
            <select
              value={formData.service_type}
              onChange={(e) => setFormData({...formData, service_type: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="groq">Groq</option>
              <option value="openai">OpenAI</option>
              <option value="stripe">Stripe</option>
              <option value="other">Diğer</option>
            </select>
            </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Yeni API Key (opsiyonel)</label>
            <input
              type="password"
              value={formData.key_value}
              onChange={(e) => setFormData({...formData, key_value: e.target.value})}
              className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Yeni API Key (değiştirmek için)"
            />
            <p className="text-xs text-slate-400 mt-1">Boş bırakırsanız mevcut key korunur</p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              className="rounded"
            />
            <label htmlFor="active" className="text-sm text-slate-300">Aktif</label>
          </div>

          <div className="flex space-x-3 pt-4">
          <button
              type="button"
              onClick={onClose}
              className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
            disabled={loading}
              className="flex-1 admin-btn-primary p-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}