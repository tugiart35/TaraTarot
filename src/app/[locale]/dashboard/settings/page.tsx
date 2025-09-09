'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Settings, Bell, Shield, Download, Trash2, Lock } from 'lucide-react';

interface NotificationSettings {
  reading_completed: boolean;
  low_credit_warning: boolean;
  monthly_insights: boolean;
  promotional_offers: boolean;
}

interface PrivacySettings {
  profile_public: boolean;
  reading_history_visible: boolean;
  stats_visible: boolean;
  allow_analytics: boolean;
}

export default function SettingsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    reading_completed: true,
    low_credit_warning: true,
    monthly_insights: true,
    promotional_offers: false
  });
  
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profile_public: false,
    reading_history_visible: false,
    stats_visible: false,
    allow_analytics: true
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'security'>('notifications');

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/tr/auth');
        return;
      }
      fetchUserSettings();
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchUserSettings = async () => {
    if (!user) return;
    
    try {

      // Fetch notification preferences (from user_preferences table if exists)
      // For now, using default values
      
      // Fetch privacy settings (from user_preferences table if exists)
      // For now, using default values

      setLoading(false);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('Yeni şifreler eşleşmiyor!');
        return;
      }

      if (passwordData.newPassword.length < 6) {
        alert('Yeni şifre en az 6 karakter olmalıdır!');
        return;
      }

      setSaving(true);

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      alert('Şifre başarıyla güncellendi!');
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Şifre güncellenirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDataExport = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Export user data
      const data = {
        user_id: user.id,
        email: user.email,
        created_at: user.created_at,
        notifications,
        privacy
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-${user.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert('Verileriniz başarıyla indirildi!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Veri indirme sırasında hata oluştu.');
    }
  };

  const handleAccountDeletion = async () => {
    if (!confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Delete user data
      await supabase.from('readings').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);

      // Delete user account
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;

      alert('Hesabınız başarıyla silindi.');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Hesap silinirken hata oluştu.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="text-gold text-xl">🔮 Ayarlar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night text-white">
      {/* Header */}
      <header className="border-b border-lavender/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold">Hesap Ayarları</span>
          </div>
          <a href="/dashboard" className="text-lavender hover:text-gold transition-colors">
            ← Dashboard'a Dön
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Hesap Ayarları</h1>
          <p className="text-lavender">
            Bildirim tercihlerinizi, gizlilik ayarlarınızı ve güvenlik seçeneklerinizi yönetin
          </p>
        </div>

        {/* Info Note */}
        <div className="mb-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5 text-gold" />
            <div>
              <h3 className="text-sm font-medium text-white">Profil Bilgileri</h3>
              <p className="text-sm text-lavender">
                Profil bilgilerinizi düzenlemek için dashboard&apos;daki profil kartına tıklayın veya üst menüdeki kullanıcı avatarına tıklayın.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-lavender/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Bildirimler</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Gizlilik</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>Güvenlik</span>
            </button>
          </div>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Bell className="h-6 w-6 text-gold mr-2" />
                Bildirim Tercihleri
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Okuma Tamamlandı</h4>
                    <p className="text-sm text-lavender">Tarot veya numeroloji okumanız tamamlandığında bildirim alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.reading_completed}
                      onChange={(e) => setNotifications(prev => ({ ...prev, reading_completed: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Düşük Kredi Uyarısı</h4>
                    <p className="text-sm text-lavender">Kredi bakiyeniz düştüğünde bildirim alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.low_credit_warning}
                      onChange={(e) => setNotifications(prev => ({ ...prev, low_credit_warning: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Aylık İçgörüler</h4>
                    <p className="text-sm text-lavender">Aylık numeroloji ve tarot özetinizi alın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.monthly_insights}
                      onChange={(e) => setNotifications(prev => ({ ...prev, monthly_insights: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Promosyon Teklifleri</h4>
                    <p className="text-sm text-lavender">Özel indirimler ve kampanyalardan haberdar olun</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.promotional_offers}
                      onChange={(e) => setNotifications(prev => ({ ...prev, promotional_offers: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Shield className="h-6 w-6 text-gold mr-2" />
                Gizlilik Ayarları
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Profil Herkese Açık</h4>
                    <p className="text-sm text-lavender">Profilinizi diğer kullanıcılar görebilsin</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.profile_public}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, profile_public: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Okuma Geçmişi Görünür</h4>
                    <p className="text-sm text-lavender">Okuma geçmişinizi diğer kullanıcılar görebilsin</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.reading_history_visible}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, reading_history_visible: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">İstatistikler Görünür</h4>
                    <p className="text-sm text-lavender">İstatistiklerinizi diğer kullanıcılar görebilsin</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.stats_visible}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, stats_visible: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Analitik Veriler</h4>
                    <p className="text-sm text-lavender">Hizmet kalitesini artırmak için anonim veriler toplansın</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.allow_analytics}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, allow_analytics: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Management */}
            <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Lock className="h-6 w-6 text-gold mr-2" />
                Şifre Yönetimi
              </h3>
              
              {!showPasswordForm ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Şifre Değiştir</h4>
                    <p className="text-sm text-lavender">Hesap güvenliğiniz için şifrenizi güncelleyin</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Şifre Değiştir
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-lavender mb-2">
                      Mevcut Şifre
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Mevcut şifrenizi girin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lavender mb-2">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Yeni şifrenizi girin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-lavender mb-2">
                      Yeni Şifre Tekrar
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handlePasswordChange}
                      disabled={saving}
                      className="bg-gold hover:bg-gold/80 disabled:bg-lavender/20 disabled:cursor-not-allowed text-night font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      {saving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </button>
                    <button
                      onClick={() => setShowPasswordForm(false)}
                      className="bg-lavender/20 hover:bg-lavender/30 text-lavender font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Data Management */}
            <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Download className="h-6 w-6 text-gold mr-2" />
                Veri Yönetimi
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-lavender/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Veri İndir</h4>
                    <p className="text-sm text-lavender">Tüm verilerinizi JSON formatında indirin</p>
                  </div>
                  <button
                    onClick={handleDataExport}
                    className="bg-gold hover:bg-gold/80 text-night font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    İndir
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div>
                    <h4 className="font-medium text-white">Hesap Sil</h4>
                    <p className="text-sm text-red-300">Hesabınızı ve tüm verilerinizi kalıcı olarak silin</p>
                  </div>
                  <button
                    onClick={handleAccountDeletion}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/dashboard"
            className="bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Dashboard'a Dön
          </a>
        </div>
      </main>
    </div>
  );
}
