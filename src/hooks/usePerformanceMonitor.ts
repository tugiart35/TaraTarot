'use client';

import { useState, useEffect } from 'react';
import { 
  fetchCurrentSystemPerformance, 
  fetchAllPerformanceMetrics,
  SystemPerformanceMetrics,
  PerformanceHistory
} from '@/lib/admin/system-performance';

/**
 * Admin paneli için sistem performans metriklerini çeken hook
 */
export function usePerformanceMonitor(refreshInterval = 60000) {
  const [currentMetrics, setCurrentMetrics] = useState<SystemPerformanceMetrics | null>(null);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // İlk yüklemede ve belirli aralıklarla performans metriklerini çek
  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Anlık metrikleri çek
        const metrics = await fetchCurrentSystemPerformance();
        if (isMounted) {
          setCurrentMetrics(metrics);
        }
        
        // Tüm performans geçmişini çek
        const history = await fetchAllPerformanceMetrics();
        if (isMounted) {
          setPerformanceHistory(history);
        }
      } catch (err) {
        console.error('Performance metrics fetch error:', err);
        if (isMounted) {
          setError('Performans metrikleri yüklenirken bir hata oluştu.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // İlk çağrı
    fetchMetrics();

    // Belirli aralıklarla tekrar çağır
    if (refreshInterval > 0) {
      intervalId = setInterval(fetchMetrics, refreshInterval);
    }

    // Cleanup
    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refreshInterval]);

  // Performans metriklerini manuel olarak yenileme fonksiyonu
  const refreshMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Anlık metrikleri çek
      const metrics = await fetchCurrentSystemPerformance();
      setCurrentMetrics(metrics);
      
      // Tüm performans geçmişini çek
      const history = await fetchAllPerformanceMetrics();
      setPerformanceHistory(history);
      
      return true;
    } catch (err) {
      console.error('Performance metrics refresh error:', err);
      setError('Performans metrikleri yenilenirken bir hata oluştu.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentMetrics,
    performanceHistory,
    loading,
    error,
    refreshMetrics,
  };
}