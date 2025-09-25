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
  Settings,
  Coins,
  User,
  BookOpen,
  TrendingUp,
  Calendar,
  Crown,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';

// UserProfile type defined locally - genişletilmiş
interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  surname?: string | null;
  birth_date?: string | null;
  credit_balance: number;
  created_at: string;
  updated_at: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  user: SupabaseUser | null;
  editing: boolean;
  editForm: Partial<UserProfile>;
  saving: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onFormChange: (_field: keyof UserProfile, _value: string) => void;
  currentLocale: string;
}

// formatDate function removed as it was unused

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  user,
  editing,
  editForm,
  saving,
  onEdit,
  onCancelEdit,
  onSave,
  onFormChange: _onFormChange,
  currentLocale,
}: ProfileModalProps) {
  const { t: translate } = useTranslations();
  const { isAdmin } = useAuth();

  if (!isOpen) {
    return null;
  }

  const quickActions = [
    // Admin kullanıcıları için Pakize erişimi
    ...(isAdmin ? [{
      href: `/${currentLocale}/pakize`,
      icon: Crown,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/20',
      label: '👑 Pakize Admin Panel',
      arrowColor: 'text-red-400',
    }] : []),
    {
      href: `/${currentLocale}/dashboard/settings`,
      icon: Settings,
      iconColor: 'text-success',
      bgColor: 'bg-success/20',
      label: translate('dashboard.accountSettings', 'Hesap Ayarları'),
      arrowColor: 'text-success',
    },
    {
      href: `/${currentLocale}/dashboard/packages`,
      icon: Coins,
      iconColor: 'text-gold',
      bgColor: 'bg-gold/20',
      label: translate('dashboard.creditPackages', 'Kredi Paketleri'),
      arrowColor: 'text-gold',
    },
    {
      href: `/${currentLocale}/dashboard/credits`,
      icon: User,
      iconColor: 'text-info',
      bgColor: 'bg-info/20',
      label: translate('dashboard.creditHistory', 'Kredi Geçmişi'),
      arrowColor: 'text-info',
    },
    {
      href: `/${currentLocale}/dashboard/readings`,
      icon: BookOpen,
      iconColor: 'text-purple',
      bgColor: 'bg-purple/20',
      label: translate('dashboard.readingHistory', 'Okuma Geçmişi'),
      arrowColor: 'text-purple',
    },
    {
      href: `/${currentLocale}/dashboard/statistics`,
      icon: TrendingUp,
      iconColor: 'text-warning',
      bgColor: 'bg-warning/20',
      label: translate('dashboard.statistics', 'İstatistikler'),
      arrowColor: 'text-warning',
    },
  ];

  return (
    <div className='fixed inset-0 z-50 bg-cosmic-black/80 flex items-center justify-center p-4'>
      <div className='card w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        {/* Modal Header */}
        <div className='p-6 border-b border-cosmic-fog'>
          <div className='flex items-center justify-between'>
            <h2 className='text-heading-2 text-gold'>Profil Düzenle</h2>
            <button
              onClick={onClose}
              className='p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
              aria-label='Modalı kapat'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Personal Information */}
            <div>
              <h3 className='text-heading-3 text-gold mb-4'>
                Kişisel Bilgiler
              </h3>
              <div className='space-y-4'>
                {/* Ad ve Soyad Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-text-mystic mb-2'>
                      Ad *
                    </label>
                    {editing ? (
                      <input
                        type='text'
                        value={editForm.name || editForm.first_name || ''}
                        onChange={e => _onFormChange('name', e.target.value)}
                        className='form-input w-full'
                        placeholder='Adınız'
                        required
                      />
                    ) : (
                      <p className='text-text-celestial'>
                        {profile?.name ||
                          profile?.first_name ||
                          profile?.display_name ||
                          'Belirtilmemiş'}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-text-mystic mb-2'>
                      Soyad
                    </label>
                    {editing ? (
                      <input
                        type='text'
                        value={editForm.surname || editForm.last_name || ''}
                        onChange={e => _onFormChange('surname', e.target.value)}
                        className='form-input w-full'
                        placeholder='Soyadınız'
                      />
                    ) : (
                      <p className='text-text-celestial'>
                        {profile?.surname ||
                          profile?.last_name ||
                          'Belirtilmemiş'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tam Ad */}
                <div>
                  <label className='block text-sm font-medium text-text-mystic mb-2'>
                    Tam Ad
                  </label>
                  {editing ? (
                    <input
                      type='text'
                      value={editForm.full_name || ''}
                      onChange={e => _onFormChange('full_name', e.target.value)}
                      className='form-input w-full'
                      placeholder='Tam adınız'
                    />
                  ) : (
                    <p className='text-text-celestial'>
                      {profile?.full_name || 'Belirtilmemiş'}
                    </p>
                  )}
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className='block text-sm font-medium text-text-mystic mb-2'>
                    <Calendar className='inline h-4 w-4 mr-1' />
                    Doğum Tarihi
                  </label>
                  {editing ? (
                    <input
                      type='date'
                      value={editForm.birth_date || ''}
                      onChange={e =>
                        _onFormChange('birth_date', e.target.value)
                      }
                      className='form-input w-full'
                    />
                  ) : (
                    <p className='text-text-celestial'>
                      {profile?.birth_date
                        ? new Date(profile.birth_date).toLocaleDateString(
                            'tr-TR'
                          )
                        : 'Belirtilmemiş'}
                    </p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-text-mystic mb-2'>
                    E-posta
                  </label>
                  <p className='text-text-celestial'>
                    {user?.email || profile?.email || 'Belirtilmemiş'}
                  </p>
                  <p className='text-text-muted text-xs mt-1'>
                    E-posta adresi değiştirilemez
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className='text-heading-3 text-gold mb-4'>
                {translate('dashboard.quickAccess', 'Hızlı Erişim')}
              </h3>
              <div className='space-y-3'>
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;

                  return (
                    <a
                      key={index}
                      href={action.href}
                      className='flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className={`p-2 ${action.bgColor} rounded-lg`}>
                          <IconComponent
                            className={`h-4 w-4 ${action.iconColor}`}
                          />
                        </div>
                        <span className='text-text-celestial font-medium'>
                          {action.label}
                        </span>
                      </div>
                      <span className={action.arrowColor}>→</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='p-6 border-t border-cosmic-fog'>
          <div className='flex items-center justify-between'>
            {editing ? (
              <>
                <button
                  onClick={onCancelEdit}
                  className='px-4 py-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
                >
                  İptal
                </button>
                <button
                  onClick={onSave}
                  disabled={saving}
                  className='btn btn-primary disabled:opacity-50'
                >
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className='px-4 py-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
                >
                  Kapat
                </button>
                <button onClick={onEdit} className='btn btn-primary'>
                  Düzenle
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
