/*
 * DOSYA ANALİZİ - GEOLOCATION HOOK (PRODUCTION-READY)
 *
 * BAĞLANTILI DOSYALAR:
 * - src/lib/utils/geolocation.ts (geolocation utility fonksiyonları)
 * - src/app/api/geolocation/route.ts (API endpoint)
 * - src/lib/i18n/config.ts (desteklenen diller)
 *
 * DOSYA AMACI:
 * Client-side coğrafi konum tespiti ve dil belirleme
 * Browser geolocation API ve IP tabanlı fallback
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (client-side hook)
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Permission handling
 * - Error handling
 * - Timeout management
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Client-side coğrafi konum tespiti için
 * - GÜVENLİ: Production-ready with error handling
 * - PERFORMANSLI: Cache ve fallback mekanizması ile
 */

import { useState, useEffect, useCallback } from 'react';
import type { GeolocationData } from '@/lib/utils/geolocation';

interface GeolocationState {
  data: GeolocationData | null;
  loading: boolean;
  error: string | null;
  permission: PermissionState | null;
}

interface GeolocationHookReturn extends GeolocationState {
  requestLocation: () => Promise<void>;
  clearError: () => void;
  getLocale: () => string;
}

// Local storage key for caching
const GEOLOCATION_CACHE_KEY = 'tarot_geolocation_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 saat

// Cache interface
interface GeolocationCache {
  data: GeolocationData;
  timestamp: number;
}

// Cache'den veri al
function getCachedGeolocation(): GeolocationData | null {
  try {
    const cached = localStorage.getItem(GEOLOCATION_CACHE_KEY);
    if (!cached) {
      return null;
    }

    const parsed: GeolocationCache = JSON.parse(cached);
    const now = Date.now();

    // Cache süresi dolmuş mu kontrol et
    if (now - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(GEOLOCATION_CACHE_KEY);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

// Cache'e veri kaydet
function setCachedGeolocation(data: GeolocationData): void {
  try {
    const cache: GeolocationCache = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

// IP tabanlı coğrafi konum tespiti
async function getIPBasedGeolocation(): Promise<GeolocationData | null> {
  try {
    const response = await fetch('/api/geolocation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }

    return result.data;
  } catch (error) {
    console.error('IP-based geolocation error:', error);
    return null;
  }
}

// Browser geolocation API ile coğrafi konum tespiti
async function getBrowserGeolocation(): Promise<GeolocationData | null> {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const response = await fetch('/api/geolocation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error || 'Unknown error');
          }

          resolve(result.data);
        } catch (error) {
          console.error('Browser geolocation API error:', error);
          resolve(null);
        }
      },
      error => {
        console.warn('Browser geolocation error:', error);
        resolve(null);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 300000, // 5 dakika
      }
    );
  });
}

// Permission durumunu kontrol et
async function checkPermission(): Promise<PermissionState | null> {
  try {
    if (!navigator.permissions) {
      return null;
    }

    const permission = await navigator.permissions.query({
      name: 'geolocation' as PermissionName,
    });
    return permission.state;
  } catch (error) {
    console.warn('Permission check error:', error);
    return null;
  }
}

export function useGeolocation(): GeolocationHookReturn {
  const [state, setState] = useState<GeolocationState>({
    data: null,
    loading: false,
    error: null,
    permission: null,
  });

  // Cache'den veri yükle
  useEffect(() => {
    const cached = getCachedGeolocation();
    if (cached) {
      setState(prev => ({
        ...prev,
        data: cached,
        loading: false,
      }));
    }

    // Permission durumunu kontrol et
    checkPermission().then(permission => {
      setState(prev => ({
        ...prev,
        permission,
      }));
    });
  }, []);

  // Coğrafi konum iste
  const requestLocation = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      let geolocationData: GeolocationData | null = null;

      // Önce browser geolocation API'sini dene
      if (navigator.geolocation && state.permission !== 'denied') {
        geolocationData = await getBrowserGeolocation();
      }

      // Browser geolocation başarısız olursa IP tabanlı tespiti dene
      if (!geolocationData) {
        geolocationData = await getIPBasedGeolocation();
      }

      if (geolocationData) {
        // Cache'e kaydet
        setCachedGeolocation(geolocationData);

        setState(prev => ({
          ...prev,
          data: geolocationData,
          loading: false,
          error: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Konum tespit edilemedi',
        }));
      }
    } catch (error) {
      console.error('Geolocation request error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      }));
    }
  }, [state.permission]);

  // Hata temizle
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  // Dil belirle
  const getLocale = useCallback((): string => {
    return state.data?.locale || 'en';
  }, [state.data]);

  return {
    ...state,
    requestLocation,
    clearError,
    getLocale,
  };
}

// Basit coğrafi konum hook'u (sadece dil için)
export function useLocaleFromGeolocation(): {
  locale: string;
  loading: boolean;
  error: string | null;
  requestLocale: () => Promise<void>;
} {
  const { data, loading, error, requestLocation } = useGeolocation();

  const requestLocale = useCallback(async () => {
    await requestLocation();
  }, [requestLocation]);

  return {
    locale: data?.locale || 'en',
    loading,
    error,
    requestLocale,
  };
}
