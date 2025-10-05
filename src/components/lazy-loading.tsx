'use client';

import { Suspense, lazy, ComponentType } from 'react';

// Lazy load heavy components
export const LazyCardPage = lazy(() => import('@/features/tarot-cards/components/CardPage'));
export const LazyCardHero = lazy(() => import('@/features/tarot-cards/components/CardHero').then(mod => ({ default: mod.CardHero })));
export const LazyCardMeanings = lazy(() => import('@/features/tarot-cards/components/CardMeanings').then(mod => ({ default: mod.CardMeanings })));
export const LazyCardKeywords = lazy(() => import('@/features/tarot-cards/components/CardKeywords').then(mod => ({ default: mod.CardKeywords })));
export const LazyCardStory = lazy(() => import('@/features/tarot-cards/components/CardStory').then(mod => ({ default: mod.CardStory })));
export const LazyCardFAQ = lazy(() => import('@/features/tarot-cards/components/CardFAQ').then(mod => ({ default: mod.CardFAQ })));
export const LazyCardCTA = lazy(() => import('@/features/tarot-cards/components/CardCTA').then(mod => ({ default: mod.CardCTA })));
export const LazyRelatedCards = lazy(() => import('@/features/tarot-cards/components/RelatedCards').then(mod => ({ default: mod.RelatedCards })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: ComponentType
) {
  return function LazyComponent(props: T) {
    const FallbackComponent = fallback || LoadingFallback;
    return (
      <Suspense fallback={<FallbackComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Preload critical components
export function preloadComponents() {
  if (typeof window !== 'undefined') {
    // Preload critical components after initial load
    setTimeout(() => {
      import('@/features/tarot-cards/components/CardPage');
      import('@/features/tarot-cards/components/CardHero');
    }, 1000);
  }
}
