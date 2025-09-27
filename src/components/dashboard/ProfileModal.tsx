/*
info:
Bağlantılı dosyalar:
- lucide-react: İkonlar için (gerekli)
- @/hooks/useTranslations: i18n desteği için (gerekli)
- @supabase/supabase-js: User tipi için (gerekli)
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)

Dosyanın amacı:
- Dashboard sayfasının profil düzenleme modalını oluşturur
- Kullanıcı profil bilgilerini düzenleme özelliği sunar
- Kişisel bilgiler (ad, soyad, doğum tarihi) ve hızlı erişim menüsü içerir
- Supabase ile güncel profil verilerini senkronize eder

Supabase değişkenleri ve tabloları:
- profiles tablosu: Kullanıcı profil bilgileri (full_name, first_name, last_name, birth_date)
- UserProfile interface: Genişletilmiş tip tanımı

Geliştirme önerileri:
- UserProfile tipi genişletildi (birth_date, full_name, first_name, last_name)
- Supabase bağlantısı güçlendirildi
- Form alanları genişletildi
- Responsive tasarım ve modern UI
- Form validasyonu ve error handling

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Dashboard profil düzenleme modalı olarak aktif
- Kullanıcı profil yönetimi için gerekli
- Supabase ile tam entegrasyon
*/

'use client';

import {
  X,
  Coins,
  BookOpen,
  TrendingUp,
  Crown,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/auth/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { UserProfile } from '@/types/dashboard.types';
import type { AuthUser } from '@/hooks/shared/useAuthBase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  user: AuthUser | null;
  onProfileUpdate: (updatedProfile: UserProfile) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  user,
  onProfileUpdate,
}: ProfileModalProps) {
  const { t } = useTranslations();
  const { signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    first_name: '',
    last_name: '',
    birth_date: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form verilerini profile'dan yükle
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        birth_date: profile.birth_date || '',
      });
    }
  }, [profile]);

  // Modal açık/kapalı durumunu kontrol et
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      // supabase already imported
      
      // Profil güncelleme
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          birth_date: formData.birth_date,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Güncellenmiş profili state'e kaydet
      const updatedProfile = {
        ...profile,
        ...formData,
      } as UserProfile;

      onProfileUpdate(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      setError(t('profile.updateError', 'Profil güncellenirken hata oluştu'));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Çıkış yapma hatası:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-night border border-lavender/20 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-lavender/20">
          <h2 className="text-2xl font-bold text-white">
            {t('profile.title', 'Profil Bilgileri')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-lavender/10 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-lavender" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-purple rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-night">
                  {profile?.first_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {profile?.full_name || t('profile.noName', 'İsim Belirtilmemiş')}
                </h3>
                <p className="text-lavender/80">{user?.email}</p>
                <div className="flex items-center mt-2">
                  <Crown className="h-4 w-4 text-gold mr-2" />
                  <span className="text-sm text-gold">
                    {t('dashboard.memberSince', 'Üye olma')}: {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('tr-TR') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-lavender/10 rounded-lg p-4 text-center">
                <Coins className="h-6 w-6 text-gold mx-auto mb-2" />
                <p className="text-sm text-lavender/80">{t('dashboard.credits', 'Kredi')}</p>
                <p className="text-lg font-bold text-white">{profile?.credit_balance || 0}</p>
              </div>
              <div className="bg-lavender/10 rounded-lg p-4 text-center">
                <BookOpen className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-lavender/80">{t('dashboard.readings', 'Okuma')}</p>
                <p className="text-lg font-bold text-white">{profile?.total_readings || 0}</p>
              </div>
              <div className="bg-lavender/10 rounded-lg p-4 text-center">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-lavender/80">{t('dashboard.level', 'Seviye')}</p>
                <p className="text-lg font-bold text-white">
                  {(profile?.total_readings || 0) > 50 ? t('dashboard.expert', 'Uzman') : 
                    (profile?.total_readings || 0) > 20 ? t('dashboard.intermediate', 'Orta') : 
                    t('dashboard.beginner', 'Başlangıç')}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Edit Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">
                {t('profile.personalInfo', 'Kişisel Bilgiler')}
              </h4>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-gold text-night rounded-lg hover:bg-gold/90 transition-colors font-medium"
                >
                  {t('common.edit', 'Düzenle')}
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {t('common.cancel', 'İptal')}
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? t('common.saving', 'Kaydediliyor...') : t('common.save', 'Kaydet')}
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lavender/80 mb-2">
                  {t('profile.firstName', 'Ad')}
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender/50 focus:outline-none focus:border-gold disabled:opacity-50"
                  placeholder={t('profile.firstNamePlaceholder', 'Adınızı girin')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lavender/80 mb-2">
                  {t('profile.lastName', 'Soyad')}
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender/50 focus:outline-none focus:border-gold disabled:opacity-50"
                  placeholder={t('profile.lastNamePlaceholder', 'Soyadınızı girin')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-lavender/80 mb-2">
                  {t('profile.fullName', 'Tam Ad')}
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender/50 focus:outline-none focus:border-gold disabled:opacity-50"
                  placeholder={t('profile.fullNamePlaceholder', 'Tam adınızı girin')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-lavender/80 mb-2">
                  {t('profile.birthDate', 'Doğum Tarihi')}
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="w-full px-4 py-3 bg-lavender/10 border border-lavender/20 rounded-lg text-white placeholder-lavender/50 focus:outline-none focus:border-gold disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-lavender/20">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <X className="h-5 w-5 mr-2" />
                {t('dashboard.signOut', 'Çıkış Yap')}
              </button>
              
              <button
                onClick={onClose}
                className="flex items-center justify-center px-6 py-3 bg-lavender/20 text-lavender rounded-lg hover:bg-lavender/30 transition-colors font-medium"
              >
                {t('common.close', 'Kapat')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
