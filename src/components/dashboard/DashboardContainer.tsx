// Dashboard ana container bileşeni

import React, { useState, useMemo } from 'react';
import NavigationHeader from './NavigationHeader';
import WelcomeSection from './WelcomeSection';
import StatsCards from './StatsCards';
import CreditPackages from './CreditPackages';
import ProfileManagement from './ProfileManagement';
import RecentActivity from './RecentActivity';
// import { DashboardUtils } from '@/components/dashboard/shared/DashboardBaseComponent';

interface DashboardContainerProps {
  locale: string;
  profile: any;
  user: any;
  isAdmin: boolean;
  totalCount: number;
  recentReadings: any[];
  packages: any[];
  refreshCreditBalance: () => Promise<void>;
  handlePackagePurchase: (pkg: any) => Promise<void>;
  openProfileModal: () => Promise<void>;
  setSelectedReading: (reading: any | null) => void;
  handleLogout: () => Promise<void>;
  translate: (key: string, fallback?: string) => string;
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
  const MemoizedWelcomeSection = useMemo(() => (
    <WelcomeSection 
      profile={profile} 
      user={user} 
      isAdmin={isAdmin} 
    />
  ), [profile, user, isAdmin]);

  const MemoizedStatsCards = useMemo(() => (
    <StatsCards
      profile={profile}
      totalCount={totalCount}
      isAdmin={isAdmin}
      recentReadings={recentReadings}
      refreshCreditBalance={refreshCreditBalance}
      translate={translate}
    />
  ), [profile, totalCount, isAdmin, recentReadings, refreshCreditBalance, translate]);

  const MemoizedCreditPackages = useMemo(() => (
    <CreditPackages
      packages={packages}
      handlePackagePurchase={handlePackagePurchase}
      paymentLoading={paymentLoading}
      translate={translate}
    />
  ), [packages, handlePackagePurchase, paymentLoading, translate]);

  const MemoizedProfileManagement = useMemo(() => (
    <ProfileManagement
      openProfileModal={openProfileModal}
      currentLocale={locale}
    />
  ), [openProfileModal, locale]);

  const MemoizedRecentActivity = useMemo(() => (
    <RecentActivity
      recentReadings={recentReadings}
      setSelectedReading={setSelectedReading}
      totalReadings={totalCount}
      isAdmin={isAdmin}
      currentLocale={locale}
    />
  ), [recentReadings, setSelectedReading, totalCount, isAdmin, locale]);

  const MemoizedNavigationHeader = useMemo(() => (
    <NavigationHeader
      currentLocale={locale}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      handleLogout={handleLogout}
    />
  ), [locale, sidebarOpen, setSidebarOpen, handleLogout]);

  return (
    <div className="dashboard-container min-h-screen bg-night">
      {MemoizedNavigationHeader}
      
      <main className="dashboard-main pt-16 px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {MemoizedWelcomeSection}
          {MemoizedStatsCards}
          {MemoizedCreditPackages}
          {MemoizedProfileManagement}
          {MemoizedRecentActivity}
        </div>
      </main>
    </div>
  );
};

export default React.memo(DashboardContainer);
