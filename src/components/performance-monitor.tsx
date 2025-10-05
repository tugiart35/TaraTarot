'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetrics {
  lcp: number;
  inp: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

const TARGETS = {
  LCP: 2500, // 2.5s
  INP: 200,  // 200ms (replaces FID)
  CLS: 0.1,  // 0.1
  FCP: 1800, // 1.8s
  TTFB: 600, // 0.6s
  BUNDLE_SIZE: 500000, // 500KB
};

export function PerformanceMonitor() {
  useEffect(() => {
    const metrics: PerformanceMetrics = {
      lcp: 0,
      inp: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
    };

    // Track Core Web Vitals
    onCLS((metric) => {
      metrics.cls = metric.value;
      const meetsTarget = metric.value <= TARGETS.CLS;
      console.log(`CLS: ${metric.value.toFixed(3)} (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.CLS})`);
    });

    onINP((metric) => {
      metrics.inp = metric.value;
      const meetsTarget = metric.value <= TARGETS.INP;
      console.log(`INP: ${metric.value.toFixed(0)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.INP}ms)`);
    });

    onFCP((metric) => {
      metrics.fcp = metric.value;
      const meetsTarget = metric.value <= TARGETS.FCP;
      console.log(`FCP: ${metric.value.toFixed(0)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.FCP}ms)`);
    });

    onLCP((metric) => {
      metrics.lcp = metric.value;
      const meetsTarget = metric.value <= TARGETS.LCP;
      console.log(`LCP: ${metric.value.toFixed(0)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.LCP}ms)`);
    });

            onTTFB((metric) => {
              metrics.ttfb = metric.value;
              const meetsTarget = metric.value <= TARGETS.TTFB;
              console.log(`TTFB: ${metric.value.toFixed(0)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.TTFB}ms)`);
            });

            // Bundle size kontrolü
            const checkBundleSize = () => {
              const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
              const bundleSize = navigation.transferSize;
              const meetsTarget = bundleSize <= TARGETS.BUNDLE_SIZE;
              console.log(`Bundle Size: ${(bundleSize/1024).toFixed(1)}KB (${meetsTarget ? '✅' : '❌'} target: ${(TARGETS.BUNDLE_SIZE/1024).toFixed(0)}KB)`);
            };
            
            // Bundle size kontrolünü çalıştır
            setTimeout(checkBundleSize, 1000);

    // Monitor bundle size
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
  }, []);

  return null;
}

export function usePerformanceBudget() {
  useEffect(() => {
    const checkBudget = (metric: any) => {
      let meetsBudget = true;
      let message = '';

      switch (metric.name) {
        case 'LCP':
          if (metric.value > TARGETS.LCP) {
            meetsBudget = false;
            message = `LCP budget exceeded: ${metric.value.toFixed(0)}ms (target: ${TARGETS.LCP}ms)`;
          }
          break;
        case 'INP':
          if (metric.value > TARGETS.INP) {
            meetsBudget = false;
            message = `INP budget exceeded: ${metric.value.toFixed(0)}ms (target: ${TARGETS.INP}ms)`;
          }
          break;
        case 'CLS':
          if (metric.value > TARGETS.CLS) {
            meetsBudget = false;
            message = `CLS budget exceeded: ${metric.value.toFixed(3)} (target: ${TARGETS.CLS})`;
          }
          break;
        case 'FCP':
          if (metric.value > TARGETS.FCP) {
            meetsBudget = false;
            message = `FCP budget exceeded: ${metric.value.toFixed(0)}ms (target: ${TARGETS.FCP}ms)`;
          }
          break;
        case 'TTFB':
          if (metric.value > TARGETS.TTFB) {
            meetsBudget = false;
            message = `TTFB budget exceeded: ${metric.value.toFixed(0)}ms (target: ${TARGETS.TTFB}ms)`;
          }
          break;
      }

      if (!meetsBudget) {
        console.warn(`Performance Budget Alert: ${message}`);
      }
    };

    onCLS(checkBudget);
    onINP(checkBudget);
    onFCP(checkBudget);
    onLCP(checkBudget);
    onTTFB(checkBudget);
  }, []);
}
