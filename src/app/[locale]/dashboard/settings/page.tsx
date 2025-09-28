'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { BottomNavigation } from '@/features/shared/layout';
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
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();

  // Pathname'den locale'i çıkar
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[1] || 'tr';

  const [notifications, setNotifications] = useState<NotificationSettings>({
    reading_completed: true,
    low_credit_warning: true,
    monthly_insights: true,
    promotional_offers: false,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profile_public: false,
    reading_history_visible: false,
    stats_visible: false,
    allow_analytics: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState<
    'notifications' | 'privacy' | 'security'
  >('notifications');

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace(`/${locale}/auth`);
        return;
      }
      fetchUserSettings();
    }
  }, [authLoading, user, router, locale]);

  const fetchUserSettings = async () => {
    if (!user) {
      return;
    }

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
        alert(t('settings.passwordsDoNotMatch', 'Yeni şifreler eşleşmiyor!'));
        return;
      }

      if (passwordData.newPassword.length < 6) {
        alert(
          t(
            'settings.passwordTooShort',
            'Yeni şifre en az 6 karakter olmalıdır!'
          )
        );
        return;
      }

      setSaving(true);

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) {
        throw error;
      }

      alert(
        t('settings.passwordUpdatedSuccess', 'Şifre başarıyla güncellendi!')
      );
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      alert(
        t('settings.passwordUpdateError', 'Şifre güncellenirken hata oluştu.')
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDataExport = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      // Export user data
      const data = {
        user_id: user.id,
        email: user.email,
        created_at: user.created_at,
        notifications,
        privacy,
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-${user.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert(
        t('settings.dataExportedSuccess', 'Verileriniz başarıyla indirildi!')
      );
    } catch (error) {
      console.error('Error exporting data:', error);
      alert(
        t('settings.dataExportError', 'Veri indirme sırasında hata oluştu.')
      );
    }
  };

  const handleAccountDeletion = async () => {
    if (
      !confirm(
        t(
          'settings.deleteAccountConfirm',
          'Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!'
        )
      )
    ) {
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      // Delete user data
      await supabase.from('readings').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);

      // Delete user account
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) {
        throw error;
      }

      alert(
        t('settings.accountDeletedSuccess', 'Hesabınız başarıyla silindi.')
      );
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t('settings.accountDeleteError', 'Hesap silinirken hata oluştu.'));
    }
  };

  if (authLoading || loading) {
    return (
      <div className='flex flex-col min-h-screen bg-night pb-16'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-gold text-xl'>
            🔮 {t('settings.loading', 'Ayarlar yükleniyor...')}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-night text-white pb-16'>
      {/* Header */}
      <header className='border-b border-lavender/20 p-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Settings className='h-8 w-8 text-gold' />
            <span className='text-xl font-bold'>
              {t('settings.accountSettings', 'Hesap Ayarları')}
            </span>
          </div>
          <a
            href='/dashboard'
            className='text-lavender hover:text-gold transition-colors'
          >
            ← {t('settings.backToDashboard', "Dashboard'a Dön")}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2 text-white'>
            {t('settings.accountSettings', 'Hesap Ayarları')}
          </h1>
          <p className='text-lavender'>
            {t(
              'settings.settingsDescription',
              'Bildirim tercihlerinizi, gizlilik ayarlarınızı ve güvenlik seçeneklerinizi yönetin'
            )}
          </p>
        </div>

        {/* Info Note */}
        <div className='mb-6 p-4 bg-gold/10 border border-gold/20 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <Settings className='h-5 w-5 text-gold' />
            <div>
              <h3 className='text-sm font-medium text-white'>
                {t('settings.profileInfo', 'Profil Bilgileri')}
              </h3>
              <p className='text-sm text-lavender'>
                {t(
                  'settings.profileInfoDescription',
                  "Profil bilgilerinizi düzenlemek için dashboard'daki profil kartına tıklayın veya üst menüdeki kullanıcı avatarına tıklayın."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='mb-8'>
          <div className='flex space-x-1 bg-lavender/10 rounded-lg p-1'>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Bell className='h-4 w-4' />
              <span>{t('settings.notifications', 'Bildirimler')}</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Shield className='h-4 w-4' />
              <span>{t('settings.privacy', 'Gizlilik')}</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              <Lock className='h-4 w-4' />
              <span>{t('settings.security', 'Güvenlik')}</span>
            </button>
          </div>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className='space-y-6'>
            <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                <Bell className='h-6 w-6 text-gold mr-2' />
                {t('settings.notificationPreferences', 'Bildirim Tercihleri')}
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.readingCompleted', 'Okuma Tamamlandı')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.readingCompletedDesc',
                        'Tarot veya numeroloji okumanız tamamlandığında bildirim alın'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={notifications.reading_completed}
                      onChange={e =>
                        setNotifications(prev => ({
                          ...prev,
                          reading_completed: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.lowCreditWarning', 'Düşük Kredi Uyarısı')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.lowCreditWarningDesc',
                        'Kredi bakiyeniz düştüğünde bildirim alın'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={notifications.low_credit_warning}
                      onChange={e =>
                        setNotifications(prev => ({
                          ...prev,
                          low_credit_warning: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.monthlyInsights', 'Aylık İçgörüler')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.monthlyInsightsDesc',
                        'Aylık numeroloji ve tarot özetinizi alın'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={notifications.monthly_insights}
                      onChange={e =>
                        setNotifications(prev => ({
                          ...prev,
                          monthly_insights: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.promotionalOffers', 'Promosyon Teklifleri')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.promotionalOffersDesc',
                        'Özel indirimler ve kampanyalardan haberdar olun'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={notifications.promotional_offers}
                      onChange={e =>
                        setNotifications(prev => ({
                          ...prev,
                          promotional_offers: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
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
          <div className='space-y-6'>
            <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                <Shield className='h-6 w-6 text-gold mr-2' />
                {t('settings.privacySettings', 'Gizlilik Ayarları')}
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.profilePublic', 'Profil Herkese Açık')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.profilePublicDesc',
                        'Profilinizi diğer kullanıcılar görebilsin'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={privacy.profile_public}
                      onChange={e =>
                        setPrivacy(prev => ({
                          ...prev,
                          profile_public: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t(
                        'settings.readingHistoryVisible',
                        'Okuma Geçmişi Görünür'
                      )}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.readingHistoryVisibleDesc',
                        'Okuma geçmişinizi diğer kullanıcılar görebilsin'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={privacy.reading_history_visible}
                      onChange={e =>
                        setPrivacy(prev => ({
                          ...prev,
                          reading_history_visible: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.statsVisible', 'İstatistikler Görünür')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.statsVisibleDesc',
                        'İstatistiklerinizi diğer kullanıcılar görebilsin'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={privacy.stats_visible}
                      onChange={e =>
                        setPrivacy(prev => ({
                          ...prev,
                          stats_visible: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-lavender/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.analyticsData', 'Analitik Veriler')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.analyticsDataDesc',
                        'Hizmet kalitesini artırmak için anonim veriler toplansın'
                      )}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={privacy.allow_analytics}
                      onChange={e =>
                        setPrivacy(prev => ({
                          ...prev,
                          allow_analytics: e.target.checked,
                        }))
                      }
                      className='sr-only peer'
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
          <div className='space-y-6'>
            {/* Password Management */}
            <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                <Lock className='h-6 w-6 text-gold mr-2' />
                {t('settings.passwordManagement', 'Şifre Yönetimi')}
              </h3>

              {!showPasswordForm ? (
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.changePassword', 'Şifre Değiştir')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.changePasswordDesc',
                        'Hesap güvenliğiniz için şifrenizi güncelleyin'
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className='bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors'
                  >
                    {t('settings.changePassword', 'Şifre Değiştir')}
                  </button>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-lavender mb-2'>
                      {t('settings.currentPassword', 'Mevcut Şifre')}
                    </label>
                    <input
                      type='password'
                      value={passwordData.currentPassword}
                      onChange={e =>
                        setPasswordData(prev => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className='w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50'
                      placeholder={t(
                        'settings.currentPasswordPlaceholder',
                        'Mevcut şifrenizi girin'
                      )}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-lavender mb-2'>
                      {t('settings.newPassword', 'Yeni Şifre')}
                    </label>
                    <input
                      type='password'
                      value={passwordData.newPassword}
                      onChange={e =>
                        setPasswordData(prev => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className='w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50'
                      placeholder={t(
                        'settings.newPasswordPlaceholder',
                        'Yeni şifrenizi girin'
                      )}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-lavender mb-2'>
                      {t('settings.confirmPassword', 'Yeni Şifre Tekrar')}
                    </label>
                    <input
                      type='password'
                      value={passwordData.confirmPassword}
                      onChange={e =>
                        setPasswordData(prev => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className='w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender focus:outline-none focus:ring-2 focus:ring-gold/50'
                      placeholder={t(
                        'settings.confirmPasswordPlaceholder',
                        'Yeni şifrenizi tekrar girin'
                      )}
                    />
                  </div>

                  <div className='flex space-x-3'>
                    <button
                      onClick={handlePasswordChange}
                      disabled={saving}
                      className='bg-gold hover:bg-gold/80 disabled:bg-lavender/20 disabled:cursor-not-allowed text-night font-semibold py-3 px-6 rounded-lg transition-colors'
                    >
                      {saving
                        ? t('settings.updating', 'Güncelleniyor...')
                        : t('settings.updatePassword', 'Şifreyi Güncelle')}
                    </button>
                    <button
                      onClick={() => setShowPasswordForm(false)}
                      className='bg-lavender/20 hover:bg-lavender/30 text-lavender font-medium py-3 px-6 rounded-lg transition-colors'
                    >
                      {t('settings.cancel', 'İptal')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Data Management */}
            <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                <Download className='h-6 w-6 text-gold mr-2' />
                {t('settings.dataManagement', 'Veri Yönetimi')}
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center justify-between p-4 bg-lavender/5 rounded-lg'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.downloadData', 'Veri İndir')}
                    </h4>
                    <p className='text-sm text-lavender'>
                      {t(
                        'settings.downloadDataDesc',
                        'Tüm verilerinizi JSON formatında indirin'
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleDataExport}
                    className='bg-gold hover:bg-gold/80 text-night font-semibold py-2 px-4 rounded-lg transition-colors text-sm'
                  >
                    {t('settings.download', 'İndir')}
                  </button>
                </div>

                <div className='flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20'>
                  <div>
                    <h4 className='font-medium text-white'>
                      {t('settings.deleteAccount', 'Hesap Sil')}
                    </h4>
                    <p className='text-sm text-red-300'>
                      {t(
                        'settings.deleteAccountDesc',
                        'Hesabınızı ve tüm verilerinizi kalıcı olarak silin'
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleAccountDeletion}
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm'
                  >
                    <Trash2 className='h-4 w-4 inline mr-1' />
                    {t('settings.delete', 'Sil')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className='mt-12 text-center'>
          <a
            href='/dashboard'
            className='bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            {t('settings.backToDashboard', "Dashboard'a Dön")}
          </a>
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
