/*
 * Web Vitals Monitoring
 *
 * Bu dosya Core Web Vitals metriklerini takip eder ve analytics servisine gönderir.
 * Performance monitoring için kullanılır.
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

// Analytics servisine gönder
function sendToAnalytics(metric: WebVitalsMetric) {
  // Google Analytics 4 için
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_rating: metric.value <= (metric.name === 'CLS' ? 0.1 : metric.name === 'FID' ? 100 : metric.name === 'LCP' ? 2500 : 1800) ? 'good' : metric.value <= (metric.name === 'CLS' ? 0.25 : metric.name === 'FID' ? 300 : metric.name === 'LCP' ? 4000 : 3000) ? 'needs-improvement' : 'poor'
      }
    });
  }

  // Console'da da göster (development için)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', {
      metric: metric.name,
      value: metric.value,
      rating: metric.value <= (metric.name === 'CLS' ? 0.1 : metric.name === 'FID' ? 100 : metric.name === 'LCP' ? 2500 : 1800) ? '🟢 Good' : metric.value <= (metric.name === 'CLS' ? 0.25 : metric.name === 'FID' ? 300 : metric.name === 'LCP' ? 4000 : 3000) ? '🟡 Needs Improvement' : '🔴 Poor'
    });
  }
}

// Core Web Vitals'ları başlat
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Cumulative Layout Shift (CLS)
  onCLS(sendToAnalytics);

  // Interaction to Next Paint (INP) - FID'in yerini aldı
  onINP(sendToAnalytics);

  // First Contentful Paint (FCP)
  onFCP(sendToAnalytics);

  // Largest Contentful Paint (LCP)
  onLCP(sendToAnalytics);

  // Time to First Byte (TTFB)
  onTTFB(sendToAnalytics);
}

// Performance observer ile ek metrikler
export function initPerformanceObserver() {
  if (typeof window === 'undefined') return;

  // Long Task API
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // 50ms'den uzun görevler
            console.warn('⚠️ Long Task detected:', {
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long Task API desteklenmiyor
    }
  }
}
