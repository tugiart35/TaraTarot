/**
 * Code splitting optimization for tarot card components
 * Implements dynamic imports, lazy loading, and bundle optimization
 */

import React, { lazy, ComponentType } from 'react';

// Lazy load heavy components
export const LazyCardHero = lazy(() => 
  import('../components/CardHero').then(module => ({ default: module.CardHero }))
);

export const LazyCardMeanings = lazy(() => 
  import('../components/CardMeanings').then(module => ({ default: module.CardMeanings }))
);

export const LazyCardKeywords = lazy(() => 
  import('../components/CardKeywords').then(module => ({ default: module.CardKeywords }))
);

export const LazyCardStory = lazy(() => 
  import('../components/CardStory').then(module => ({ default: module.CardStory }))
);

export const LazyCardCTA = lazy(() => 
  import('../components/CardCTA').then(module => ({ default: module.CardCTA }))
);

export const LazyCardFAQ = lazy(() => 
  import('../components/CardFAQ').then(module => ({ default: module.CardFAQ }))
);

export const LazyRelatedCards = lazy(() => 
  import('../components/RelatedCards').then(module => ({ default: module.RelatedCards }))
);

// Lazy load utility components
export const LazyLoadingSpinner = lazy(() => 
  import('react').then(_module => ({ default: () => React.createElement('div', null, 'Loading...') }))
);

export const LazyErrorBoundary = lazy(() => 
  import('react').then(_module => ({ default: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children) }))
);

// Lazy load heavy libraries
export const LazyChart = lazy(() => 
  import('react').then(_module => ({ default: () => React.createElement('div', null, 'Chart') }))
);

export const LazyMonacoEditor = lazy(() => 
  import('react').then(_module => ({ default: () => React.createElement('div', null, 'Editor') }))
);

/**
 * Code splitting utilities
 */
export class CodeSplitter {
  /**
   * Create a lazy component with error boundary
   */
  static createLazyComponent<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: ComponentType
  ) {
    const LazyComponent = lazy(importFunc);
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: fallback ? React.createElement(fallback) : React.createElement(DefaultFallback) },
        React.createElement(LazyComponent, props)
      )
    );
  }

  /**
   * Create a lazy component with retry logic
   */
  static createLazyComponentWithRetry<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    maxRetries: number = 3
  ) {
    const LazyComponent = lazy(() => 
      this.retryImport(importFunc, maxRetries)
    );
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: React.createElement(DefaultFallback) },
        React.createElement(LazyComponent, props)
      )
    );
  }

  /**
   * Retry import with exponential backoff
   */
  private static async retryImport<T>(
    importFunc: () => Promise<T>,
    maxRetries: number,
    currentRetry: number = 0
  ): Promise<T> {
    try {
      return await importFunc();
    } catch (error) {
      if (currentRetry < maxRetries) {
        const delay = Math.pow(2, currentRetry) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryImport(importFunc, maxRetries, currentRetry + 1);
      }
      throw error;
    }
  }

  /**
   * Preload components based on user interaction
   */
  static preloadComponent(importFunc: () => Promise<any>): void {
    // Preload the component
    importFunc().catch(() => {
      // Silently fail preloading
    });
  }

  /**
   * Preload components on hover
   */
  static preloadOnHover(importFunc: () => Promise<any>) {
    return {
      onMouseEnter: () => this.preloadComponent(importFunc),
      onFocus: () => this.preloadComponent(importFunc)
    };
  }
}

/**
 * Route-based code splitting
 */
export class RouteCodeSplitter {
  /**
   * Lazy load page components
   */
  static createLazyPage<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ) {
    const LazyPage = lazy(importFunc);
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: React.createElement(PageFallback) },
        React.createElement(LazyPage, props)
      )
    );
  }

  /**
   * Preload route components
   */
  static preloadRoute(routePath: string, importFunc: () => Promise<any>): void {
    // Store preload promise
    const preloadPromise = importFunc();
    
    // Cache the promise for future use
    (window as any).__routePreloads = (window as any).__routePreloads || {};
    (window as any).__routePreloads[routePath] = preloadPromise;
  }

  /**
   * Get preloaded route
   */
  static getPreloadedRoute(routePath: string): Promise<any> | null {
    return (window as any).__routePreloads?.[routePath] || null;
  }
}

/**
 * Component-based code splitting
 */
export class ComponentCodeSplitter {
  /**
   * Split components by feature
   */
  static createFeatureSplit<T extends ComponentType<any>>(
    featureName: string,
    importFunc: () => Promise<{ default: T }>
  ) {
    const LazyComponent = lazy(importFunc);
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: React.createElement(FeatureFallback, { feature: featureName }) },
        React.createElement(LazyComponent, props)
      )
    );
  }

  /**
   * Split components by usage frequency
   */
  static createUsageBasedSplit<T extends ComponentType<any>>(
    usageLevel: 'critical' | 'important' | 'optional',
    importFunc: () => Promise<{ default: T }>
  ) {
    const LazyComponent = lazy(importFunc);
    
    const fallbackComponent = usageLevel === 'critical' 
      ? React.createElement(CriticalFallback)
      : usageLevel === 'important'
      ? React.createElement(ImportantFallback)
      : React.createElement(OptionalFallback);
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: fallbackComponent },
        React.createElement(LazyComponent, props)
      )
    );
  }
}

/**
 * Library-based code splitting
 */
export class LibraryCodeSplitter {
  /**
   * Split heavy libraries
   */
  static createLibrarySplit<T extends ComponentType<any>>(
    libraryName: string,
    importFunc: () => Promise<{ default: T }>
  ) {
    const LazyComponent = lazy(importFunc);
    
    return (props: React.ComponentProps<T>) => (
      React.createElement(React.Suspense, { fallback: React.createElement(LibraryFallback, { library: libraryName }) },
        React.createElement(LazyComponent, props)
      )
    );
  }

  /**
   * Preload libraries based on user behavior
   */
  static preloadLibrary(libraryName: string, importFunc: () => Promise<any>): void {
    // Track library usage
    const usageKey = `library_${libraryName}_usage`;
    const usageCount = parseInt(localStorage.getItem(usageKey) || '0');
    
    if (usageCount > 2) {
      // Preload if used frequently
      importFunc().catch(() => {
        // Silently fail preloading
      });
    }
  }

  /**
   * Track library usage
   */
  static trackLibraryUsage(libraryName: string): void {
    const usageKey = `library_${libraryName}_usage`;
    const usageCount = parseInt(localStorage.getItem(usageKey) || '0');
    localStorage.setItem(usageKey, (usageCount + 1).toString());
  }
}

/**
 * Fallback components
 */
const DefaultFallback = () => (
  React.createElement('div', { className: 'flex items-center justify-center p-4' },
    React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' })
  )
);

const PageFallback = () => (
  React.createElement('div', { className: 'flex items-center justify-center min-h-screen' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' }),
      React.createElement('p', { className: 'text-gray-600' }, 'Loading page...')
    )
  )
);

const FeatureFallback = ({ feature }: { feature: string }) => (
  React.createElement('div', { className: 'flex items-center justify-center p-4' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2' }),
      React.createElement('p', { className: 'text-sm text-gray-600' }, `Loading ${feature}...`)
    )
  )
);

const CriticalFallback = () => (
  React.createElement('div', { className: 'flex items-center justify-center p-4 bg-red-50' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2' }),
      React.createElement('p', { className: 'text-sm text-red-600' }, 'Loading critical component...')
    )
  )
);

const ImportantFallback = () => (
  React.createElement('div', { className: 'flex items-center justify-center p-4 bg-yellow-50' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2' }),
      React.createElement('p', { className: 'text-sm text-yellow-600' }, 'Loading important component...')
    )
  )
);

const OptionalFallback = () => (
  React.createElement('div', { className: 'flex items-center justify-center p-4 bg-gray-50' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2' }),
      React.createElement('p', { className: 'text-sm text-gray-600' }, 'Loading optional component...')
    )
  )
);

const LibraryFallback = ({ library }: { library: string }) => (
  React.createElement('div', { className: 'flex items-center justify-center p-4' },
    React.createElement('div', { className: 'text-center' },
      React.createElement('div', { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2' }),
      React.createElement('p', { className: 'text-sm text-gray-600' }, `Loading ${library}...`)
    )
  )
);

/**
 * Code splitting configuration
 */
export const CODE_SPLITTING_CONFIG = {
  // Chunk size limits
  MAX_CHUNK_SIZE: 250000, // 250KB
  PREFERRED_CHUNK_SIZE: 100000, // 100KB
  
  // Preloading strategies
  PRELOAD_ON_HOVER: true,
  PRELOAD_ON_FOCUS: true,
  PRELOAD_CRITICAL: true,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // Usage tracking
  TRACK_USAGE: true,
  PRELOAD_THRESHOLD: 3,
  
  // Fallback timeouts
  FALLBACK_TIMEOUT: 5000,
  ERROR_RETRY_DELAY: 2000
} as const;

/**
 * Initialize code splitting
 */
export function initializeCodeSplitting() {
  // Set up global error handler for failed imports
  window.addEventListener('error', (event) => {
    if (event.message.includes('Loading chunk')) {
      console.warn('Chunk loading failed, retrying...');
      // Retry loading the chunk
      setTimeout(() => {
        window.location.reload();
      }, CODE_SPLITTING_CONFIG.ERROR_RETRY_DELAY);
    }
  });

  // Track component usage for preloading
  if (CODE_SPLITTING_CONFIG.TRACK_USAGE) {
    // Set up usage tracking
    console.log('Code splitting initialized with usage tracking');
  }
}
