/*
 * DOSYA ANALİZİ - GEOLOCATION DETECTOR COMPONENT (PRODUCTION-READY)
 * 
 * BAĞLANTILI DOSYALAR:
 * - src/hooks/useGeolocation.ts (geolocation hook)
 * - src/lib/utils/geolocation.ts (geolocation utility)
 * - src/lib/i18n/config.ts (desteklenen diller)
 * 
 * DOSYA AMACI:
 * Kullanıcıya coğrafi konum tespiti ve dil seçimi sunma
 * IP tabanlı otomatik dil belirleme
 * 
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (UI component)
 * 
 * GÜVENLİK ÖZELLİKLERİ:
 * - Permission handling
 * - Error handling
 * - User consent
 * 
 * KULLANIM DURUMU:
 * - OPSIYONEL: Kullanıcı deneyimi için
 * - GÜVENLİ: Production-ready with error handling
 * - KULLANICI DOSTU: Türkçe arayüz
 */

'use client';

import { useEffect, useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useRouter, usePathname } from 'next/navigation';
import type { SupportedLocale } from '@/lib/utils/geolocation';

interface GeolocationDetectorProps {
  onLocaleDetected?: (locale: SupportedLocale) => void;
  showUI?: boolean;
  autoRedirect?: boolean;
}

export default function GeolocationDetector({
  onLocaleDetected,
  showUI = true,
  autoRedirect = true,
}: GeolocationDetectorProps) {
  const { data, loading, error, requestLocation, clearError } = useGeolocation();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRequested, setHasRequested] = useState(false);

  // Otomatik coğrafi konum tespiti
  useEffect(() => {
    if (!hasRequested && !data && !loading) {
      setHasRequested(true);
      requestLocation();
    }
  }, [hasRequested, data, loading, requestLocation]);

  // Dil tespit edildiğinde callback çağır
  useEffect(() => {
    if (data && onLocaleDetected) {
      onLocaleDetected(data.locale);
    }
  }, [data, onLocaleDetected]);

  // Otomatik yönlendirme
  useEffect(() => {
    if (data && autoRedirect && pathname) {
      const currentLocale = pathname.split('/')[1];
      const detectedLocale = data.locale;
      
      // Mevcut dil tespit edilen dilden farklıysa yönlendir
      if (currentLocale !== detectedLocale) {
        const newPath = pathname.replace(`/${currentLocale}`, `/${detectedLocale}`);
        router.push(newPath);
      }
    }
  }, [data, autoRedirect, pathname, router]);

  // UI gösterme kapalıysa sadece arka planda çalış
  if (!showUI) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        {loading && (
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Konumunuz tespit ediliyor...
            </span>
          </div>
        )}

        {error && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-red-600 dark:text-red-400">
                {error}
              </span>
            </div>
            <button
              onClick={() => {
                clearError();
                requestLocation();
              }}
              className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {data && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Konumunuz tespit edildi
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {data.city}, {data.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Önerilen dil:
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {data.locale === 'tr' ? 'Türkçe' : 
                 data.locale === 'sr' ? 'Srpski' : 'English'}
              </span>
            </div>

            {pathname && (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const currentLocale = pathname.split('/')[1];
                    const newPath = pathname.replace(`/${currentLocale}`, `/${data.locale}`);
                    router.push(newPath);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Dil Değiştir
                </button>
                <button
                  onClick={() => {
                    // Component'i gizle
                    const element = document.querySelector('[data-geolocation-detector]');
                    if (element) {
                      element.remove();
                    }
                  }}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Kapat
                </button>
              </div>
            )}
          </div>
        )}

        {!data && !loading && !error && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Konumunuzu tespit etmek için izin verin
              </span>
            </div>
            <button
              onClick={requestLocation}
              className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Konumu Tespit Et
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Basit dil tespit component'i
export function LocaleDetector({ onLocaleDetected }: { onLocaleDetected?: (locale: SupportedLocale) => void }) {
  return (
    <GeolocationDetector
      {...(onLocaleDetected && { onLocaleDetected })}
      showUI={false}
      autoRedirect={false}
    />
  );
}
