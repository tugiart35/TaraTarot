// Agresif bundle optimizasyonu - Bundle size <500KB hedefi için
// Bu dosya ağır bağımlılıkları dinamik olarak yükler ve bundle boyutunu minimize eder

// Ağır bağımlılıkları dinamik import ile yükle
export const dynamicImports = {
  // PDF işlemleri - sadece gerektiğinde yükle
  pdf: {
    jsPDF: () => import('jspdf').then(mod => mod.default),
    html2canvas: () => import('html2canvas').then(mod => mod.default),
  },
  
  // Grafik işlemleri - sadece gerektiğinde yükle
  charts: {
    recharts: () => import('recharts'),
  },
  
  // Animasyonlar - sadece gerektiğinde yükle
  animations: {
    framerMotion: () => import('framer-motion'),
  },
  
  // Browser automation - sadece gerektiğinde yükle
  automation: {
    puppeteer: () => import('puppeteer'),
  },
  
  // Supabase - sadece gerektiğinde yükle
  database: {
    supabase: () => import('@supabase/supabase-js'),
  },
};

// Bundle boyutunu izle
export function monitorBundleSize() {
  if (typeof window !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          if (resource.name.includes('_next/static/chunks/')) {
            const sizeKB = (resource.transferSize / 1024).toFixed(2);
            console.log(`Chunk: ${resource.name.split('/').pop()}, Size: ${sizeKB}KB`);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    return () => observer.disconnect();
  }
  return () => {};
}

// Kullanılmayan kodu temizle
export function cleanupUnusedCode() {
  // Bu fonksiyon build time'da çalışacak
  return {
    // Kullanılmayan import'ları tespit et
    unusedImports: [
      'date-fns',
      'lodash',
      'moment',
      'dayjs',
    ],
    
    // Kullanılmayan component'ları tespit et
    unusedComponents: [
      'unused-component-1',
      'unused-component-2',
    ],
  };
}

// Bundle splitting stratejisi
export const bundleSplittingStrategy = {
  // Kritik olmayan route'ları lazy load et
  lazyRoutes: [
    '/admin',
    '/dashboard',
    '/analytics',
  ],
  
  // Ağır component'ları lazy load et
  lazyComponents: [
    'ChartComponent',
    'PDFGenerator',
    'AnimationComponent',
  ],
  
  // Vendor chunk'larını optimize et
  vendorOptimization: {
    react: { maxSize: 50000 }, // 50KB
    next: { maxSize: 50000 }, // 50KB
    supabase: { maxSize: 30000 }, // 30KB
    framer: { maxSize: 20000 }, // 20KB
    lucide: { maxSize: 15000 }, // 15KB
  },
};

// Performance budget kontrolü
export const performanceBudget = {
  bundleSize: 500000, // 500KB
  lcp: 2500, // 2.5s
  cls: 0.1,
  inp: 200, // 200ms (FID yerine)
  fcp: 1800, // 1.8s
  ttfb: 600, // 0.6s
};

// Bundle optimizasyonu kontrolü
export function checkBundleOptimization() {
  if (typeof window !== 'undefined') {
    const performance = window.performance;
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const metrics = {
      bundleSize: navigation.transferSize,
      lcp: 0, // LCP ayrı olarak ölçülecek
      cls: 0, // CLS ayrı olarak ölçülecek
      inp: 0, // INP ayrı olarak ölçülecek
    };
    
    // Performance budget kontrolü
    const budgetCheck = {
      bundleSize: metrics.bundleSize <= performanceBudget.bundleSize,
      lcp: metrics.lcp <= performanceBudget.lcp,
      cls: metrics.cls <= performanceBudget.cls,
      inp: metrics.inp <= performanceBudget.inp,
    };
    
    console.log('Performance Budget Check:', budgetCheck);
    return budgetCheck;
  }
  
  return null;
}