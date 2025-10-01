/*
info:
Performance monitoring hook for layout components.
Tracks navigation performance, user interactions, and layout metrics.

Bağlantılı dosyalar:
- @/hooks/useNavigation: Navigation hook integration
- Google Analytics: Performance tracking

Dosyanın amacı:
- Navigation performance tracking
- User interaction analytics
- Layout load time monitoring
- Performance metrics collection

Backend bağlantısı:
- Google Analytics integration
- Performance data collection
- User behavior tracking

Geliştirme ve öneriler:
- Real-time performance monitoring
- User experience optimization
- Performance bottleneck identification
- Analytics integration
*/

'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface PerformanceMetrics {
  navigationLoadTime: number;
  layoutRenderTime: number;
  userInteractionTime: number;
  totalLayoutTime: number;
}

interface NavigationEvent {
  type: 'click' | 'hover' | 'focus';
  item: string;
  timestamp: number;
  pathname: string;
}

export function usePerformanceMonitoring() {
  const pathname = usePathname();

  // Performance metrics collection
  const trackPerformance = useCallback((metrics: PerformanceMetrics) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metrics', {
        event_category: 'Layout',
        event_label: 'Performance',
        value: Math.round(metrics.totalLayoutTime),
        custom_map: {
          navigation_load_time: metrics.navigationLoadTime,
          layout_render_time: metrics.layoutRenderTime,
          user_interaction_time: metrics.userInteractionTime,
        },
      });
    }
  }, []);

  // Navigation event tracking
  const trackNavigationEvent = useCallback((event: NavigationEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'navigation_interaction', {
        event_category: 'Navigation',
        event_label: event.item,
        value: 1,
        custom_map: {
          interaction_type: event.type,
          pathname: event.pathname,
          timestamp: event.timestamp,
        },
      });
    }
  }, []);

  // Layout load time tracking
  const trackLayoutLoad = useCallback(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      trackPerformance({
        navigationLoadTime: loadTime,
        layoutRenderTime: 0,
        userInteractionTime: 0,
        totalLayoutTime: loadTime,
      });
    };
  }, [trackPerformance]);

  // User interaction tracking
  const trackUserInteraction = useCallback(
    (item: string, type: 'click' | 'hover' | 'focus') => {
      const event: NavigationEvent = {
        type,
        item,
        timestamp: Date.now(),
        pathname,
      };

      trackNavigationEvent(event);
    },
    [pathname, trackNavigationEvent]
  );

  // Page view tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-HYE4L3NKCL', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);

  // Performance observer for layout components
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming;
          trackPerformance({
            navigationLoadTime:
              navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            layoutRenderTime:
              navigationEntry.domContentLoadedEventEnd -
              navigationEntry.domContentLoadedEventStart,
            userInteractionTime: 0,
            totalLayoutTime:
              navigationEntry.loadEventEnd - navigationEntry.fetchStart,
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint'] });

    return () => observer.disconnect();
  }, [trackPerformance]);

  return {
    trackPerformance,
    trackNavigationEvent,
    trackLayoutLoad,
    trackUserInteraction,
  };
}
