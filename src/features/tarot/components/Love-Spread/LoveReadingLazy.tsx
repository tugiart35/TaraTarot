/*
info:
---
Dosya Amacı:
- LoveReadingRefactored bileşenini lazy load eden wrapper
- Code splitting için dynamic import kullanır
- Loading state ve error handling sağlar

Bağlantılı Dosyalar:
- ../spreads/love/LoveReadingRefactored: Ana bileşen (lazy load edilir)
- React.lazy: Lazy loading için
- React.Suspense: Loading state için

Geliştirme ve Öneriler:
- Bundle size optimizasyonu sağlar
- İlk yükleme hızını artırır
- Error boundary ile hata yönetimi
- Loading spinner ile kullanıcı deneyimi

Kullanım Durumu:
- LoveReadingLazy: Gerekli, lazy loading için
- Suspense: Gerekli, loading state için
- Error boundary: Gerekli, hata yönetimi için
*/

'use client';

import { Suspense, lazy, Component, ReactNode } from 'react';

// Lazy load the main component
const LoveReadingRefactored = lazy(() => import('../spreads/love/LoveReadingRefactored'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-cosmic-black">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
      <p className="text-text-celestial">Aşk açılımı yükleniyor...</p>
    </div>
  </div>
);

// Simple Error Boundary
class SimpleErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('LoveReadingLazy Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-cosmic-black">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-heading-2 text-gold mb-4">Bir Hata Oluştu</h2>
            <p className="text-text-muted mb-6">
              Aşk açılımı yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main lazy component
const LoveReadingLazy = () => {
  return (
    <SimpleErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <LoveReadingRefactored />
      </Suspense>
    </SimpleErrorBoundary>
  );
};

export default LoveReadingLazy;
