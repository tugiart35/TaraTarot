/**
 * Bundle size optimization utilities
 */

// Dynamic imports for heavy libraries
export const dynamicImports = {
  // Only import what we need from framer-motion
  motion: () => import('framer-motion').then(mod => ({ default: mod.motion })),
  
  // Lazy load heavy components
  CardPage: () => import('@/features/tarot-cards/components/CardPage'),
  CardHero: () => import('@/features/tarot-cards/components/CardHero'),
  CardMeanings: () => import('@/features/tarot-cards/components/CardMeanings'),
  
  // Lazy load utilities
  html2canvas: () => import('html2canvas'),
  jspdf: () => import('jspdf'),
  
  // Lazy load Supabase only when needed
  supabase: () => import('@supabase/supabase-js'),
};

// Tree shaking helpers
export const treeShakingHelpers = {
  // Only import specific icons from lucide-react
  getIcon: (iconName: string) => {
    return import('lucide-react').then(mod => mod[iconName]);
  },
};

// Bundle size monitoring
export function monitorBundleSize() {
  if (typeof window !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          if (resource.name.includes('_next/static/chunks/')) {
            const sizeKB = Math.round(resource.transferSize / 1024);
            if (sizeKB > 100) {
              console.warn(`Large chunk detected: ${resource.name} (${sizeKB}KB)`);
            }
          }
        }
      }
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    return () => observer.disconnect();
  }
  return () => {};
}

// Code splitting utilities
export const codeSplitting = {
  // Split by feature
  tarotCards: () => import('@/features/tarot-cards'),
  numerology: () => import('@/features/numerology'),

  // Split by route
  dashboard: () => import('@/app/[locale]/dashboard/page'),
  auth: () => import('@/app/[locale]/auth/page'),
};

// Memory optimization
export const memoryOptimization = {
  // Clear unused data
  clearCache: () => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('nextjs')) {
            caches.delete(name);
          }
        });
      });
    }
  },
  
  // Garbage collection hint
  forceGC: () => {
    if (typeof window !== 'undefined' && 'gc' in window) {
      (window as any).gc();
    }
  },
};

// Performance budgets
export const performanceBudgets = {
  // Bundle size limits
  maxBundleSize: 500 * 1024, // 500KB
  maxChunkSize: 244 * 1024,  // 244KB
  
  // Performance limits
  maxLCP: 2500,  // 2.5s
  maxFID: 100,   // 100ms
  maxCLS: 0.1,   // 0.1
  
  // Check if bundle exceeds limits
  checkBundleSize: (size: number) => {
    return size <= performanceBudgets.maxBundleSize;
  },
  
  // Check if chunk exceeds limits
  checkChunkSize: (size: number) => {
    return size <= performanceBudgets.maxChunkSize;
  },
};

// Export all optimizations
export const BundleOptimizer = {
  dynamicImports,
  treeShakingHelpers,
  monitorBundleSize,
  codeSplitting,
  memoryOptimization,
  performanceBudgets,
};
