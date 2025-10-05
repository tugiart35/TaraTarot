/*
 * Gerçek zamanlı sistem performans monitörü
 *
 * Bu dosya, sistem performans metriklerini gerçek zamanlı olarak izlemek için kullanılır.
 * Admin panelinde gösterilecek performans verileri için API sağlar.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  SystemPerformanceMetrics,
  logSystemPerformance,
} from '@/lib/admin/system-performance';

/**
 * Aktif kullanıcı sayısını hesaplar
 */
export async function getActiveUserCount(): Promise<number> {
  try {
    // Son 15 dakika içinde aktif olan kullanıcıları say
    const fifteenMinutesAgo = new Date();
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);

    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gt('last_login_at', fifteenMinutesAgo.toISOString());

    if (error) {
      // Rate limit hatası için özel mesaj
      if (error.message && error.message.includes('Failed to fetch')) {
        console.warn(
          'Supabase rate limit - aktif kullanıcı sayısı alınamadı, varsayılan değer kullanılıyor'
        );
        return 0;
      }
      console.error('Supabase get active user count failed', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting active user count:', error);
    return 0;
  }
}

/**
 * Sunucu uptime değerini alır
 * Production ortamında gerçek değeri almak için implement edilmeli
 */
export async function getServerUptime(): Promise<number> {
  // Production ortamında gerçek uptime değeri alınmalı
  // Şimdilik sabit bir değer döndürüyoruz
  return 99.98;
}

/**
 * Ortalama yanıt süresini hesaplar
 */
export async function getAverageResponseTime(): Promise<number> {
  try {
    // Son 10 request'in ortalama yanıt süresini hesapla
    const { data, error } = await supabase
      .from('system_performance')
      .select('response_time')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      // Rate limit hatası için özel mesaj
      if (error.message && error.message.includes('Failed to fetch')) {
        console.warn(
          'Supabase rate limit - ortalama yanıt süresi alınamadı, varsayılan değer kullanılıyor'
        );
        return 45; // Varsayılan değer
      }
      console.error('Supabase get average response time failed', error);
      return 45; // Varsayılan değer
    }

    if (!data || data.length === 0) {
      return 45; // Varsayılan değer
    }

    // Sıfır olmayan değerleri filtrele ve ortalama hesapla
    const validTimes = data.filter((item: any) => item.response_time > 0);

    if (validTimes.length === 0) {
      return 45; // Varsayılan değer
    }

    const sum = validTimes.reduce(
      (acc: number, item: any) => acc + item.response_time,
      0
    );
    return Math.round(sum / validTimes.length);
  } catch (error) {
    console.error('Error getting average response time:', error);
    return 45; // Varsayılan değer
  }
}

/**
 * Sunucu bellek kullanımını alır
 * Production ortamında gerçek değeri almak için implement edilmeli
 */
export async function getMemoryUsage(): Promise<number> {
  // Production ortamında gerçek memory kullanımı alınmalı
  // Şimdilik sabit bir değer döndürüyoruz
  return 2.4;
}

/**
 * Sunucu CPU kullanımını alır
 * Production ortamında gerçek değeri almak için implement edilmeli
 */
export async function getCpuUsage(): Promise<number> {
  // Production ortamında gerçek CPU kullanımı alınmalı
  // Şimdilik sabit bir değer döndürüyoruz
  return 12;
}

/**
 * Tüm sistem performans metriklerini toplar ve kaydeder
 */
export async function collectAndLogSystemPerformance(): Promise<SystemPerformanceMetrics | null> {
  try {
    // Tüm metrikleri topla
    const [uptime, responseTime, memoryUsage, cpuUsage, activeUsers] =
      await Promise.all([
        getServerUptime(),
        getAverageResponseTime(),
        getMemoryUsage(),
        getCpuUsage(),
        getActiveUserCount(),
      ]);

    // Metrikleri kaydet
    const metrics = {
      uptime,
      responseTime,
      memoryUsage,
      cpuUsage,
      activeUsers,
    };

    const success = await logSystemPerformance(metrics);

    if (!success) {
      console.error('Failed to log system performance metrics');
      return null;
    }

    return {
      ...metrics,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error collecting system performance metrics:', error);
    return null;
  }
}

/**
 * Düzenli aralıklarla sistem performans metriklerini toplar ve kaydeder
 * Bu fonksiyon genellikle bir background job olarak çalıştırılır
 */
export function startPerformanceMonitoring(
  intervalMinutes = 5
): NodeJS.Timeout {
  console.log(
    `Starting system performance monitoring every ${intervalMinutes} minutes`
  );

  // İlk çalıştırma
  collectAndLogSystemPerformance();

  // Düzenli aralıklarla çalıştır
  return setInterval(
    () => {
      collectAndLogSystemPerformance();
    },
    intervalMinutes * 60 * 1000
  );
}

/**
 * Performans izlemeyi durdurur
 */
export function stopPerformanceMonitoring(intervalId: NodeJS.Timeout): void {
  console.log('Stopping system performance monitoring');
  clearInterval(intervalId);
}

/**
 * React hook olarak sistem performans izleme
 */
export function useRealSystemMonitoring(intervalMinutes = 1) {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metrics, setMetrics] = useState<SystemPerformanceMetrics | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startMonitoring = () => {
    if (isMonitoring) {
      return;
    }

    console.log('Starting real-time system monitoring');
    setIsMonitoring(true);

    // İlk metrikleri topla
    collectAndLogSystemPerformance().then(setMetrics);

    // Düzenli aralıklarla topla
    const id = setInterval(
      () => {
        collectAndLogSystemPerformance().then(setMetrics);
      },
      intervalMinutes * 60 * 1000
    );

    setIntervalId(id);
  };

  const stopMonitoring = () => {
    if (!isMonitoring || !intervalId) {
      return;
    }

    console.log('Stopping real-time system monitoring');
    setIsMonitoring(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const collectMetrics = async () => {
    const newMetrics = await collectAndLogSystemPerformance();
    setMetrics(newMetrics);
    return newMetrics;
  };

  const saveMetrics = async (
    customMetrics?: Partial<SystemPerformanceMetrics>
  ) => {
    const metricsToSave = customMetrics
      ? { ...metrics, ...customMetrics }
      : metrics;
    if (!metricsToSave) {
      return false;
    }

    return await logSystemPerformance({
      uptime: metricsToSave.uptime || 0,
      responseTime: metricsToSave.responseTime || 0,
      memoryUsage: metricsToSave.memoryUsage || 0,
      cpuUsage: metricsToSave.cpuUsage || 0,
      activeUsers: metricsToSave.activeUsers || 0,
    });
  };

  // Component unmount olduğunda temizlik yap
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return {
    isMonitoring,
    metrics,
    startMonitoring,
    stopMonitoring,
    collectMetrics,
    saveMetrics,
  };
}
