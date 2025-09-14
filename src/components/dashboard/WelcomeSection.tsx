// Dashboard hoş geldin bölümü bileşeni

import { UserProfile } from '@/types/dashboard.types';
import { formatDate, getMemberSince } from '@/utils/dashboard-utils';
import { useTranslations } from '@/hooks/useTranslations';

interface WelcomeSectionProps {
  profile: UserProfile | null;
  user: any;
  isAdmin: boolean;
}

// Hoş geldin bölümü bileşeni
export default function WelcomeSection({ profile, user, isAdmin }: WelcomeSectionProps) {
  const { t } = useTranslations();
  return (
    <div className="mb-8">
      <div className="card-mystic p-8 text-text-celestial mystic-glow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Profil avatar - kullanıcı baş harfi */}
          <div className="w-20 h-20 bg-crystal-clear rounded-full flex items-center justify-center border-2 border-gold flex-shrink-0">
            <span className="text-3xl font-bold text-gold">
              {profile?.display_name?.charAt(0)?.toUpperCase() || 'U'} {/* İsim baş harfi */}
            </span>
          </div>
          {/* Kullanıcı bilgileri */}
          <div className="flex-1 w-full">
            {/* Hoş geldin mesajı */}
            <h1 className="text-heading-1 text-gold mb-3">
              {t('dashboard.welcome', 'Hoş geldiniz')}, {profile?.display_name || user?.email?.split('@')[0] || t('dashboard.user', 'Mistik Kullanıcı')} ✨
            </h1>
            {/* Üyelik süresi */}
            <p className="text-text-mystic text-body-large mb-4">
              {t('dashboard.membershipDuration', 'Mistik yolculuğunuz')} {profile?.created_at ? getMemberSince(profile.created_at) : t('common.new', 'yeni')} süredir devam ediyor
            </p>
            {/* E-posta adresi */}
            {user?.email && (
              <p className="text-text-muted text-sm mb-3">
                📧 {user.email}
              </p>
            )}
            {/* Admin etiketi */}
            {isAdmin && (
              <div className="mb-3">
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30">
                  👑 {t('dashboard.admin', 'Admin')}
                </span>
              </div>
            )}
            {/* Üyelik tarihi */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-crystal-clear px-3 py-1 rounded-full text-sm border border-gold/30">
                {profile?.created_at ? formatDate(profile.created_at) : t('common.new', 'Yeni üye')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
