/*
 * Lazy Loading Components
 * Bundle size optimizasyonu için lazy loading implementasyonu
 */

import { lazy } from 'react';

// Büyük bileşenler için lazy loading
export const LazyReadingDetailModal = lazy(
  () => import('./ReadingDetailModal')
);
export const LazyCardDetails = lazy(() => import('./CardDetails'));
export const LazyBaseInterpretation = lazy(
  () => import('./BaseInterpretation')
);

// PDF export için ayrı lazy component
export const LazyPDFExport = lazy(() => import('./PDFExport'));

// Loading fallback component
export const LazyLoadingFallback = () => (
  <div className='flex items-center justify-center p-8'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500'></div>
    <span className='ml-2 text-gray-400'>Yükleniyor...</span>
  </div>
);
