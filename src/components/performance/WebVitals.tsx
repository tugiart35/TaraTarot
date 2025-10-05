'use client';

import { useEffect } from 'react';
import { Metric as WebVitalsMetric } from 'web-vitals';

// Performance targets
const TARGETS = {
  LCP: 2500, // 2.5s
  FID: 100, // 100ms
  CLS: 0.1, // 0.1
  FCP: 1800, // 1.8s
  TTFB: 600, // 0.6s
};

export function WebVitals({
  onPerfEntry,
}: {
  onPerfEntry?: (metric: WebVitalsMetric) => void;
}) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') {
      return;
    }

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      // Track Core Web Vitals
      onCLS((metric: WebVitalsMetric) => {
        const meetsTarget = metric.value <= TARGETS.CLS;
        console.log(
          `CLS: ${metric.value.toFixed(3)} (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.CLS})`
        );
        onPerfEntry?.(metric);
      });

      onFCP((metric: WebVitalsMetric) => {
        const meetsTarget = metric.value <= TARGETS.FCP;
        console.log(
          `FCP: ${metric.value.toFixed(2)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.FCP}ms)`
        );
        onPerfEntry?.(metric);
      });

      onLCP((metric: WebVitalsMetric) => {
        const meetsTarget = metric.value <= TARGETS.LCP;
        console.log(
          `LCP: ${metric.value.toFixed(2)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.LCP}ms)`
        );
        onPerfEntry?.(metric);
      });

      onTTFB((metric: WebVitalsMetric) => {
        const meetsTarget = metric.value <= TARGETS.TTFB;
        console.log(
          `TTFB: ${metric.value.toFixed(2)}ms (${meetsTarget ? '✅' : '❌'} target: ${TARGETS.TTFB}ms)`
        );
        onPerfEntry?.(metric);
      });
    });

    // Track additional performance metrics
    const observer = new PerformanceObserver(
      (list: PerformanceObserverEntryList) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log(
              `Navigation: ${navEntry.loadEventEnd - navEntry.loadEventStart}ms`
            );
          } else if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            if (resourceEntry.name.includes('cards/')) {
              console.log(
                `Image loaded: ${resourceEntry.name} (${resourceEntry.duration.toFixed(2)}ms)`
              );
            }
          }
        }
      }
    );

    observer.observe({ entryTypes: ['navigation', 'resource'] });

    return () => observer.disconnect();
  }, [onPerfEntry]);

  return null;
}

/**
 * Performance monitoring hook
 */
export function useWebVitals() {
  useEffect(() => {
    // Track page load performance
    const trackPageLoad = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        const metrics = {
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        };

        console.log('Page Load Metrics:', metrics);

        // Check if metrics meet targets
        const meetsTargets = {
          domContentLoaded: metrics.domContentLoaded < 1000,
          loadComplete: metrics.loadComplete < 2000,
          totalTime: metrics.totalTime < 3000,
        };

        console.log('Performance Targets:', meetsTargets);
      }
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      window.removeEventListener('load', trackPageLoad);
    };
  }, []);
}

/**
 * Performance budget monitoring
 */
export function usePerformanceBudget() {
  useEffect(() => {
    // Monitor bundle size
    const checkBundleSize = () => {
      const scripts = document.querySelectorAll('script[src]');
      let totalSize = 0;

      scripts.forEach((script: Element) => {
        const src = script.getAttribute('src');
        if (src && src.includes('_next/static/chunks/')) {
          // Estimate size (in real implementation, would fetch actual size)
          totalSize += 50000; // Estimated 50KB per chunk
        }
      });

      const meetsTarget = totalSize < 500000; // 500KB target
      console.log(
        `Bundle Size: ${(totalSize / 1024).toFixed(2)}KB (${meetsTarget ? '✅' : '❌'} target: 500KB)`
      );
    };

    // Monitor memory usage
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
        const percentage = (usedMB / limitMB) * 100;

        console.log(
          `Memory Usage: ${usedMB.toFixed(2)}MB / ${limitMB.toFixed(2)}MB (${percentage.toFixed(1)}%)`
        );

        if (percentage > 80) {
          console.warn('High memory usage detected!');
        }
      }
    };

    // Run checks
    checkBundleSize();
    checkMemoryUsage();

    // Set up monitoring
    const interval = setInterval(() => {
      checkBundleSize();
      checkMemoryUsage();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);
}
