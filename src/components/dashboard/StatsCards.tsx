// Dashboard istatistik kartları bileşeni

import { memo } from 'react';
import { UserProfile } from '@/types/dashboard.types';
import { formatDate, getMemberSince } from '@/utils/dashboard-utils';
import { getUserLevelString } from '@/utils/dashboard/user-level-utils';
import { Coins, BookOpen, Calendar, Award, RefreshCw } from 'lucide-react';
import { DashboardUtils } from '@/components/dashboard/shared/DashboardBaseComponent';

interface StatsCardsProps {
  profile: UserProfile | null;
  totalCount: number;
  isAdmin: boolean;
  recentReadings: any[];
  refreshCreditBalance: () => Promise<void>;
  translate: (key: string, fallback?: string) => string;
}

// İstatistik kartları bileşeni
const StatsCards = memo(function StatsCards({
  profile,
  totalCount,
  isAdmin,
  recentReadings,
  refreshCreditBalance,
  translate,
}: StatsCardsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
      {/* Kredi bakiyesi kartı */}
      <div className='card hover-lift p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='p-2 bg-gold/20 rounded-lg'>
              <Coins className='h-6 w-6 text-gold' />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-text-muted'>
                {translate('dashboard.creditBalance', 'Kredi Bakiyesi')}
              </p>
              <p className='text-2xl font-bold text-text-celestial'>
                {DashboardUtils.formatCreditBalance(
                  profile?.credit_balance || 0
                )}
              </p>
            </div>
          </div>
          {/* Yenile butonu - debounced */}
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              refreshCreditBalance();
            }}
            className='p-2 hover:bg-gold/10 rounded-lg transition-colors'
            title={translate('common.refresh', 'Kredi bakiyesini yenile')}
          >
            <RefreshCw className='h-4 w-4 text-gold' />
          </button>
        </div>
      </div>

      {/* Toplam okuma sayısı kartı */}
      <div className='card hover-lift p-6'>
        <div className='flex items-center'>
          <div className='p-2 bg-success/20 rounded-lg'>
            <BookOpen className='h-6 w-6 text-success' />
          </div>
          <div className='ml-4'>
            <p className='text-sm text-admin-text-muted'>
              {translate(
                'dashboard.readingsPage.totalReadings',
                'Toplam Okuma'
              )}
            </p>
            <p className='text-2xl font-bold text-admin-text'>{totalCount}</p>
            <p className='text-xs text-text-muted'>
              {translate('dashboard.last30Days', 'Son 30 gün')}
            </p>
          </div>
        </div>
      </div>

      {/* Üyelik süresi kartı */}
      <div className='card hover-lift p-6'>
        <div className='flex items-center'>
          <div className='p-2 bg-purple/20 rounded-lg'>
            <Calendar className='h-6 w-6 text-purple' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-text-muted'>
              {translate('dashboard.membershipDuration', 'Üyelik Süresi')}
            </p>
            <p className='text-2xl font-bold text-text-celestial'>
              {profile?.created_at
                ? getMemberSince(profile.created_at)
                : translate('common.new', 'Yeni')}
            </p>
            <p className='text-xs text-text-muted'>
              {profile?.created_at
                ? formatDate(profile.created_at)
                : translate('common.today', 'Bugün')}
            </p>
          </div>
        </div>
      </div>

      {/* Kullanıcı seviyesi kartı */}
      <div className='card hover-lift p-6'>
        <div className='flex items-center'>
          <div className='p-2 bg-warning/20 rounded-lg'>
            <Award className='h-6 w-6 text-warning' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-text-muted'>
              {translate('dashboard.userLevel', 'Kullanıcı Seviyesi')}
            </p>
            <p className='text-2xl font-bold text-text-celestial'>
              {translate(
                `dashboard.${getUserLevelString(totalCount, isAdmin, recentReadings).toLowerCase()}`,
                getUserLevelString(totalCount, isAdmin, recentReadings)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StatsCards;
