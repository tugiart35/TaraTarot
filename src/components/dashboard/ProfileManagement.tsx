// Dashboard profil yönetimi bileşeni

import { User, Settings, Coins } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { getDashboardRoutes } from '@/utils/dashboard/routing-utils';

interface ProfileManagementProps {
  openProfileModal: () => Promise<void>;
  currentLocale?: string;
}

// Profil yönetimi bileşeni
export default function ProfileManagement({
  openProfileModal,
  currentLocale = 'tr',
}: ProfileManagementProps) {
  const { t } = useTranslations();
  const routes = getDashboardRoutes(currentLocale);
  return (
    <div className='mb-8'>
      <h2 className='text-heading-2 text-gold mb-4'>
        {t('dashboard.profile', 'Profil Yönetimi')}
      </h2>
      <div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        role='group'
        aria-label={t('dashboard.ariaLabel.profileOptions', 'Profil yönetimi seçenekleri')}
      >
        {/* Profil bilgileri kartı */}
        <button
          onClick={openProfileModal} // Profil modal'ını aç
          className='card hover-lift p-6 group text-left w-full'
          aria-label={t('dashboard.profile', 'Profil Bilgileri')}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-gold/20 rounded-lg group-hover:bg-gold/30 transition-colors'>
              <User className='h-6 w-6 text-gold' />
            </div>
          </div>
          <h3 className='font-semibold text-text-celestial mb-2'>
            {t('dashboard.profile', 'Profil Bilgileri')}
          </h3>
          <p className='text-text-muted text-sm mb-4'>
            {t('dashboard.editProfile', 'Kişisel bilgilerinizi güncelleyin')}
          </p>
        </button>

        {/* Hesap ayarları kartı */}
        <a
          href={routes.settings}
          className='card hover-lift p-6 group'
          aria-label={t('dashboard.profile', 'Hesap Ayarları')}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-success/20 rounded-lg group-hover:bg-success/30 transition-colors'>
              <Settings className='h-6 w-6 text-success' />
            </div>
          </div>
          <h3 className='font-semibold text-text-celestial mb-2'>
            {t('dashboard.profile', 'Hesap Ayarları')}
          </h3>
          <p className='text-text-muted text-sm mb-4'>
            {t('dashboard.settings', 'Güvenlik ve gizlilik ayarları')}
          </p>
        </a>

        {/* Kredi geçmişi kartı */}
        <a
          href={routes.credits}
          className='card hover-lift p-6 group'
          aria-label={t('dashboard.profile', 'Kredi Geçmişi')}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-warning/20 rounded-lg group-hover:bg-warning/30 transition-colors'>
              <Coins className='h-6 w-6 text-warning' />
            </div>
          </div>
          <h3 className='font-semibold text-text-celestial mb-2'>
            {t('dashboard.profile', 'Kredi Geçmişi')}
          </h3>
          <p className='text-text-muted text-sm mb-4'>
            {t(
              'dashboard.creditHistory.description',
              'Tüm işlem geçmişinizi görün'
            )}
          </p>
        </a>
      </div>
    </div>
  );
}
