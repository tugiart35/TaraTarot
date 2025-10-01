'use client';

import { useEffect } from 'react';
import { initWebVitals, initPerformanceObserver } from '@/lib/analytics/web-vitals';

export function WebVitalsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Web Vitals monitoring'i başlat
    initWebVitals();
    initPerformanceObserver();
  }, []);

  return <>{children}</>;
}
