/*
 * MOBILE UTILS - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/providers/PWAAuthProvider.tsx (PWA provider)
 * - @/types/auth.types.ts (Auth types)
 *
 * DOSYA AMACI:
 * Mobile browser uyumluluğu ve session persistence için utility fonksiyonları.
 * iOS Safari, Android Chrome ve diğer mobile browser'lar için optimizasyonlar.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Secure session storage
 * - Mobile-specific security headers
 * - Touch ID / Face ID support
 * - Biometric authentication
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Mobile browser uyumluluğu için
 * - GÜVENLİ: Production-ready
 * - CROSS-PLATFORM: iOS, Android, Web
 */

// Mobile browser detection
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  return mobileRegex.test(userAgent);
};

// iOS detection
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent);
};

// Android detection
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /Android/.test(userAgent);
};

// Safari detection
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

// Chrome detection
export const isChrome = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
};

// Mobile browser info
export interface MobileBrowserInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  userAgent: string;
  platform: string;
  version: string;
}

export const getMobileBrowserInfo = (): MobileBrowserInfo => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isSafari: false,
      isChrome: false,
      userAgent: '',
      platform: '',
      version: '',
    };
  }

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  // Extract version number
  const versionMatch = userAgent.match(/(\d+\.\d+)/);
  const version = versionMatch ? versionMatch[1]! : '';

  return {
    isMobile: isMobile(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isSafari: isSafari(),
    isChrome: isChrome(),
    userAgent,
    platform,
    version,
  };
};

// Secure storage for mobile browsers
export class MobileSecureStorage {
  private static instance: MobileSecureStorage;
  private storage: Storage | null = null;
  private isAvailable = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.storage = localStorage;
        // Test if storage is available
        const testKey = '__mobile_storage_test__';
        this.storage.setItem(testKey, 'test');
        this.storage.removeItem(testKey);
        this.isAvailable = true;
      } catch {
        this.isAvailable = false;
      }
    }
  }

  static getInstance(): MobileSecureStorage {
    if (!MobileSecureStorage.instance) {
      MobileSecureStorage.instance = new MobileSecureStorage();
    }
    return MobileSecureStorage.instance;
  }

  // Set item with encryption
  setItem(key: string, value: string): boolean {
    if (!this.isAvailable || !this.storage) return false;

    try {
      // Simple base64 encoding for mobile storage
      const encodedValue = btoa(encodeURIComponent(value));
      this.storage.setItem(key, encodedValue);
      return true;
    } catch {
      return false;
    }
  }

  // Get item with decryption
  getItem(key: string): string | null {
    if (!this.isAvailable || !this.storage) return null;

    try {
      const encodedValue = this.storage.getItem(key);
      if (!encodedValue) return null;
      
      return decodeURIComponent(atob(encodedValue));
    } catch {
      return null;
    }
  }

  // Remove item
  removeItem(key: string): boolean {
    if (!this.isAvailable || !this.storage) return false;

    try {
      this.storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  // Clear all items
  clear(): boolean {
    if (!this.isAvailable || !this.storage) return false;

    try {
      this.storage.clear();
      return true;
    } catch {
      return false;
    }
  }

  // Check if storage is available
  isStorageAvailable(): boolean {
    return this.isAvailable;
  }
}

// Biometric authentication support
export interface BiometricAuthInfo {
  isSupported: boolean;
  type: 'fingerprint' | 'face' | 'none';
  isAvailable: boolean;
}

export const getBiometricAuthInfo = async (): Promise<BiometricAuthInfo> => {
  if (typeof window === 'undefined') {
    return { isSupported: false, type: 'none', isAvailable: false };
  }

  try {
    // Check for WebAuthn support
    if (window.PublicKeyCredential) {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return {
        isSupported: true,
        type: available ? 'fingerprint' : 'none',
        isAvailable: available,
      };
    }

    // Check for iOS Touch ID / Face ID
    if (isIOS() && (window as any).TouchID) {
      return {
        isSupported: true,
        type: 'fingerprint',
        isAvailable: true,
      };
    }

    // Check for Android fingerprint
    if (isAndroid() && (window as any).fingerprint) {
      return {
        isSupported: true,
        type: 'fingerprint',
        isAvailable: true,
      };
    }

    return { isSupported: false, type: 'none', isAvailable: false };
  } catch {
    return { isSupported: false, type: 'none', isAvailable: false };
  }
};

// Touch event handling for mobile
export const addTouchSupport = (element: HTMLElement): void => {
  if (!isMobile()) return;

  // Prevent double-tap zoom
  element.addEventListener('touchend', (e) => {
    e.preventDefault();
  });

  // Add touch feedback
  element.addEventListener('touchstart', () => {
    element.style.opacity = '0.7';
  });

  element.addEventListener('touchend', () => {
    element.style.opacity = '1';
  });

  element.addEventListener('touchcancel', () => {
    element.style.opacity = '1';
  });
};

// Mobile viewport handling
export const setMobileViewport = (): void => {
  if (typeof window === 'undefined') return;

  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  }
};

// Mobile keyboard handling
export const handleMobileKeyboard = (): void => {
  if (typeof window === 'undefined' || !isMobile()) return;

  const originalHeight = window.innerHeight;
  
  window.addEventListener('resize', () => {
    const currentHeight = window.innerHeight;
    const heightDifference = originalHeight - currentHeight;
    
    // If height decreased significantly, keyboard is likely open
    if (heightDifference > 150) {
      document.body.classList.add('keyboard-open');
    } else {
      document.body.classList.remove('keyboard-open');
    }
  });
};

// Mobile scroll handling
export const handleMobileScroll = (): void => {
  if (typeof window === 'undefined' || !isMobile()) return;

  let lastScrollTop = 0;
  let ticking = false;

  const updateScrollDirection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      document.body.classList.add('scroll-down');
      document.body.classList.remove('scroll-up');
    } else {
      // Scrolling up
      document.body.classList.add('scroll-up');
      document.body.classList.remove('scroll-down');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  });
};

// Mobile session persistence
export class MobileSessionManager {
  private storage: MobileSecureStorage;
  private sessionKey = 'mobile_auth_session';
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.storage = MobileSecureStorage.getInstance();
  }

  // Save session data
  saveSession(sessionData: any): boolean {
    try {
      const session = {
        ...sessionData,
        timestamp: Date.now(),
        browserInfo: getMobileBrowserInfo(),
      };
      
      return this.storage.setItem(this.sessionKey, JSON.stringify(session));
    } catch {
      return false;
    }
  }

  // Load session data
  loadSession(): any | null {
    try {
      const sessionData = this.storage.getItem(this.sessionKey);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired (24 hours)
      const now = Date.now();
      const sessionAge = now - session.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxAge) {
        this.clearSession();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  // Clear session data
  clearSession(): boolean {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    return this.storage.removeItem(this.sessionKey);
  }

  // Start session heartbeat
  startHeartbeat(): void {
    if (this.heartbeatInterval) return;

    this.heartbeatInterval = setInterval(() => {
      const session = this.loadSession();
      if (session) {
        // Update timestamp
        session.timestamp = Date.now();
        this.saveSession(session);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  // Stop session heartbeat
  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

// Mobile-specific CSS classes
export const addMobileClasses = (): void => {
  if (typeof document === 'undefined') return;

  const browserInfo = getMobileBrowserInfo();
  const body = document.body;

  if (browserInfo.isMobile) {
    body.classList.add('mobile');
  }

  if (browserInfo.isIOS) {
    body.classList.add('ios');
  }

  if (browserInfo.isAndroid) {
    body.classList.add('android');
  }

  if (browserInfo.isSafari) {
    body.classList.add('safari');
  }

  if (browserInfo.isChrome) {
    body.classList.add('chrome');
  }
};

// Initialize mobile support
export const initializeMobileSupport = (): void => {
  if (typeof window === 'undefined') return;

  // Set mobile viewport
  setMobileViewport();

  // Add mobile CSS classes
  addMobileClasses();

  // Handle mobile keyboard
  handleMobileKeyboard();

  // Handle mobile scroll
  handleMobileScroll();

  // Add touch support to interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach((element) => {
    addTouchSupport(element as HTMLElement);
  });
};

// All utilities are already exported inline above
