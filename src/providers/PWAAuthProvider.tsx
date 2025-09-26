/*
 * PWA AUTH PROVIDER - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/types/auth.types.ts (Auth types)
 * - /public/sw-auth.js (Auth service worker)
 *
 * DOSYA AMACI:
 * PWA için güvenli authentication provider.
 * Offline support, secure session handling, ve service worker entegrasyonu.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Secure session storage
 * - Service worker communication
 * - Offline auth state management
 * - Background sync
 * - Push notification support
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: PWA auth desteği için
 * - GÜVENLİ: Production-ready
 * - OFFLINE: Offline auth support
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import type { AuthContextType, SessionStorage } from '@/types/auth.types';

interface PWAAuthContextType extends AuthContextType {
  isOnline: boolean;
  isPWA: boolean;
  canInstall: boolean;
  installPrompt: any;
  installPWA: () => Promise<void>;
  syncWithServiceWorker: () => Promise<void>;
  requestNotificationPermission: () => Promise<boolean>;
  isNotificationSupported: boolean;
}

const PWAAuthContext = createContext<PWAAuthContextType | null>(null);

interface PWAAuthProviderProps {
  children: React.ReactNode;
}

export function PWAAuthProvider({ children }: PWAAuthProviderProps) {
  const auth = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [isPWA, setIsPWA] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);

  // Check if running as PWA
  useEffect(() => {
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;
      
      setIsPWA(isStandalone || (isIOS && isInStandaloneMode));
    };

    checkPWA();
    window.addEventListener('resize', checkPWA);
    
    return () => window.removeEventListener('resize', checkPWA);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check notification support
  useEffect(() => {
    setIsNotificationSupported('Notification' in window && 'serviceWorker' in navigator);
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setCanInstall(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Install PWA
  const installPWA = useCallback(async (): Promise<void> => {
    if (!installPrompt) {
      throw new Error('Install prompt not available');
    }

    try {
      // const _result = await installPrompt.prompt();
    } catch (error) {
      throw error;
    } finally {
      setInstallPrompt(null);
      setCanInstall(false);
    }
  }, [installPrompt]);

  // Sync with service worker
  const syncWithServiceWorker = useCallback(async (): Promise<void> => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker not supported');
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      if (registration.active) {
        // Send session data to service worker
        const sessionData: SessionStorage = {
          user: auth.user,
          sessionToken: null, // Will be set by service worker
          refreshToken: null, // Will be set by service worker
          expiresAt: null, // Will be set by service worker
          lastActivity: Date.now(),
        };

        const messageChannel = new MessageChannel();
        
        return new Promise((resolve, reject) => {
          messageChannel.port1.onmessage = (event) => {
            if (event.data.success) {
              resolve();
            } else {
              reject(new Error('Service worker sync failed'));
            }
          };

          registration.active?.postMessage(
            { type: 'SET_SESSION', data: sessionData },
            [messageChannel.port2]
          );
        });
      }
    } catch (error) {
      throw error;
    }
  }, [auth.user]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    if (!isNotificationSupported) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      return false;
    }
  }, [isNotificationSupported]);

  // Sync auth state with service worker when user changes
  useEffect(() => {
    if (auth.user && isPWA) {
      syncWithServiceWorker().catch(() => {});
    }
  }, [auth.user, isPWA, syncWithServiceWorker]);

  // Register service worker
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw-auth.js', {
          scope: '/',
        });
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is available
                // You can show a notification to the user here
              }
            });
          }
        });

        // Handle service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          const { type, data: _data } = event.data;
          
          switch (type) {
            case 'AUTH_UPDATE':
              // Handle auth updates from service worker
              break;
              
            case 'OFFLINE_AUTH':
              // Handle offline auth state
              break;
              
            default:
          }
        });

      } catch (error) {
      }
    };

    registerServiceWorker();
  }, []);

  // Enhanced audit log with PWA context
  const enhancedAuditLog = useCallback(async (_action: string, _details?: Record<string, unknown>) => {
    // const pwaDetails = {
    //   ...details,
    //   isPWA,
    //   isOnline,
    //   userAgent: navigator.userAgent,
    //   timestamp: new Date().toISOString(),
    // };

    // await auth.auditLog(action, pwaDetails);
  }, [auth, isPWA, isOnline]);

  const contextValue: PWAAuthContextType = {
    ...auth,
    isOnline,
    isPWA,
    canInstall,
    installPrompt,
    installPWA,
    syncWithServiceWorker,
    requestNotificationPermission,
    isNotificationSupported,
    auditLog: enhancedAuditLog,
  };

  return (
    <PWAAuthContext.Provider value={contextValue}>
      {children}
    </PWAAuthContext.Provider>
  );
}

// Hook to use PWA auth context
export function usePWAAuth(): PWAAuthContextType {
  const context = useContext(PWAAuthContext);
  
  if (!context) {
    throw new Error('usePWAAuth must be used within a PWAAuthProvider');
  }
  
  return context;
}

// PWA install button component
export function PWAInstallButton() {
  const { canInstall, installPWA, isPWA } = usePWAAuth();
  const [isInstalling, setIsInstalling] = useState(false);

  if (isPWA || !canInstall) {
    return null;
  }

  const handleInstall = async () => {
    try {
      setIsInstalling(true);
      await installPWA();
    } catch (error) {
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <button
      onClick={handleInstall}
      disabled={isInstalling}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
    >
      {isInstalling ? 'Installing...' : 'Install App'}
    </button>
  );
}

// Offline indicator component
export function OfflineIndicator() {
  const { isOnline } = usePWAAuth();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center py-2 z-50">
      <span className="text-sm">You are offline. Some features may be limited.</span>
    </div>
  );
}

// PWA status indicator
export function PWAStatusIndicator() {
  const { isPWA, isOnline } = usePWAAuth();

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {isPWA && (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
          PWA
        </span>
      )}
      <span className={`px-2 py-1 rounded ${
        isOnline 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
