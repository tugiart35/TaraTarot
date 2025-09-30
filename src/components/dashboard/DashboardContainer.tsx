// Dashboard ana container bileşeni

import React, { useState, useMemo } from 'react';
import NavigationHeader from './NavigationHeader';
import WelcomeSection from './WelcomeSection';
import StatsCards from './StatsCards';
import CreditPackages from './CreditPackages';
import ProfileManagement from './ProfileManagement';
import RecentActivity from './RecentActivity';
import { UserProfile, Package, Reading } from '@/types/dashboard.types';
import { EnhancedUser } from '@/types/auth.types';
import ErrorBoundary, {
  ErrorFallback,
} from '@/components/shared/ui/ErrorBoundary';

interface DashboardContainerProps {
  locale: string;
  profile: UserProfile | null;
  user: EnhancedUser | null;
  isAdmin: boolean;
  totalCount: number;
  recentReadings: Reading[];
  packages: Package[];
  refreshCreditBalance: () => Promise<void>;
  handlePackagePurchase: (_pkg: Package) => Promise<void>;
  openProfileModal: () => Promise<void>;
  setSelectedReading: (_reading: Reading | null) => void;
  handleLogout: () => Promise<void>;
  translate: (_key: string, _fallback?: string) => string;
  paymentLoading: boolean;
}

// Memoized Dashboard Container
const DashboardContainer: React.FC<DashboardContainerProps> = ({
  locale,
  profile,
  user,
  isAdmin,
  totalCount,
  recentReadings,
  packages,
  refreshCreditBalance,
  handlePackagePurchase,
  openProfileModal,
  setSelectedReading,
  handleLogout,
  translate,
  paymentLoading,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Memoized components to prevent unnecessary re-renders
  const MemoizedWelcomeSection = useMemo(
    () => (
      <section aria-labelledby='welcome-heading'>
        <h2 id='welcome-heading' className='sr-only'>
          Hoş Geldiniz
        </h2>
        <WelcomeSection profile={profile} user={user} isAdmin={isAdmin} />
      </section>
    ),
    [profile, user, isAdmin]
  );

  const MemoizedStatsCards = useMemo(
    () => (
      <section aria-labelledby='stats-heading'>
        <h2 id='stats-heading' className='sr-only'>
          İstatistikler
        </h2>
        <StatsCards
          profile={profile}
          totalCount={totalCount}
          isAdmin={isAdmin}
          recentReadings={recentReadings}
          refreshCreditBalance={refreshCreditBalance}
          translate={translate}
        />
      </section>
    ),
    [
      profile,
      totalCount,
      isAdmin,
      recentReadings,
      refreshCreditBalance,
      translate,
    ]
  );

  const MemoizedCreditPackages = useMemo(
    () => (
      <section aria-labelledby='packages-heading'>
        <h2 id='packages-heading' className='sr-only'>
          Kredi Paketleri
        </h2>
        <CreditPackages
          packages={packages}
          handlePackagePurchase={handlePackagePurchase}
          paymentLoading={paymentLoading}
          translate={translate}
        />
      </section>
    ),
    [packages, handlePackagePurchase, paymentLoading, translate]
  );

  const MemoizedProfileManagement = useMemo(
    () => (
      <section aria-labelledby='profile-heading'>
        <h2 id='profile-heading' className='sr-only'>
          Profil Yönetimi
        </h2>
        <ProfileManagement
          openProfileModal={openProfileModal}
          currentLocale={locale}
        />
      </section>
    ),
    [openProfileModal, locale]
  );

  const MemoizedRecentActivity = useMemo(
    () => (
      <section aria-labelledby='recent-activity-heading'>
        <h2 id='recent-activity-heading' className='sr-only'>
          Son Aktiviteler
        </h2>
        <RecentActivity
          recentReadings={recentReadings}
          setSelectedReading={setSelectedReading}
          totalReadings={totalCount}
          isAdmin={isAdmin}
          currentLocale={locale}
        />
      </section>
    ),
    [recentReadings, setSelectedReading, totalCount, isAdmin, locale]
  );

  const MemoizedNavigationHeader = useMemo(
    () => (
      <NavigationHeader
        currentLocale={locale}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
    ),
    [locale, sidebarOpen, setSidebarOpen, handleLogout]
  );

  return (
    <div
      className='dashboard-container min-h-screen bg-night'
      role='region'
      aria-label='Dashboard'
    >
      {MemoizedNavigationHeader}

      <main
        className='dashboard-main pt-16 px-4 md:px-6 pb-8'
        id='dashboard-main-content'
        tabIndex={-1}
      >
        <div className='max-w-7xl mx-auto' aria-live='polite'>
          <ErrorBoundary
            fallback={
              <ErrorFallback
                error={
                  new Error(
                    'Dashboard bileşenleri yüklenirken bir hata oluştu.'
                  )
                }
                resetError={() => window.location.reload()}
              />
            }
          >
            {MemoizedWelcomeSection}
            {MemoizedStatsCards}
            {MemoizedCreditPackages}
            {MemoizedProfileManagement}
            {MemoizedRecentActivity}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default React.memo(DashboardContainer);
