/*
info:
---
Dosya Amacı:
- Dashboard bileşenlerini lazy load eden wrapper
- Code splitting için dynamic import kullanır
- Loading state ve error handling sağlar

Bağlantılı Dosyalar:
- ../shared: Dashboard shared bileşenleri (lazy load edilir)
- React.lazy: Lazy loading için
- React.Suspense: Loading state için

Geliştirme ve Öneriler:
- Bundle size optimizasyonu sağlar
- İlk yükleme hızını artırır
- Error boundary ile hata yönetimi
- Loading spinner ile kullanıcı deneyimi

Kullanım Durumu:
- DashboardLazy: Gerekli, lazy loading için
- Suspense: Gerekli, loading state için
- Error boundary: Gerekli, hata yönetimi için
*/

'use client';

import { Suspense, lazy, Component, ReactNode } from 'react';

// Lazy load dashboard components
const DashboardHeader = lazy(() => import('./shared/DashboardHeader'));
const WelcomeSection = lazy(() => import('./shared/WelcomeSection'));
const StatsCards = lazy(() => import('./shared/StatsCards'));
const QuickActions = lazy(() => import('./shared/QuickActions'));
const RecentReadings = lazy(() => import('./shared/RecentReadings'));
const ProfileModal = lazy(() => import('./shared/ProfileModal'));

// Loading component
const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-screen bg-cosmic-black'>
    <div className='text-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4'></div>
      <p className='text-text-celestial'>Dashboard yükleniyor...</p>
    </div>
  </div>
);

// Simple Error Boundary
class SimpleErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Dashboard Lazy Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex items-center justify-center min-h-screen bg-cosmic-black'>
            <div className='text-center max-w-md mx-auto p-6'>
              <div className='text-red-500 text-6xl mb-4'>⚠️</div>
              <h2 className='text-heading-2 text-gold mb-4'>Bir Hata Oluştu</h2>
              <p className='text-text-muted mb-6'>
                Dashboard yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
              </p>
              <button
                onClick={() => window.location.reload()}
                className='btn btn-primary'
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Lazy component wrapper
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <SimpleErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
  </SimpleErrorBoundary>
);

// Export lazy components
export const LazyDashboardHeader = (props: any) => (
  <LazyComponent>
    <DashboardHeader {...props} />
  </LazyComponent>
);

export const LazyWelcomeSection = (props: any) => (
  <LazyComponent>
    <WelcomeSection {...props} />
  </LazyComponent>
);

export const LazyStatsCards = (props: any) => (
  <LazyComponent>
    <StatsCards {...props} />
  </LazyComponent>
);

export const LazyQuickActions = (props: any) => (
  <LazyComponent>
    <QuickActions {...props} />
  </LazyComponent>
);

export const LazyRecentReadings = (props: any) => (
  <LazyComponent>
    <RecentReadings {...props} />
  </LazyComponent>
);

export const LazyProfileModal = (props: any) => (
  <LazyComponent>
    <ProfileModal {...props} />
  </LazyComponent>
);
