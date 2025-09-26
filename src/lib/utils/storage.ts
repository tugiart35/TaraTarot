/*
 * Storage Utility
 * 
 * Bu dosya localStorage işlemleri için güvenli utility fonksiyonları içerir.
 * Error handling ve SSR uyumluluğu sağlar.
 */

export class Storage {
  /**
   * localStorage'dan veri okuma
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Storage get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * localStorage'a veri yazma
   */
  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Storage set error for key ${key}:`, error);
    }
  }

  /**
   * localStorage'dan veri silme
   */
  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage remove error for key ${key}:`, error);
    }
  }

  /**
   * localStorage'ı temizleme
   */
  static clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  /**
   * localStorage key'inin var olup olmadığını kontrol etme
   */
  static has(key: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Storage has error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * localStorage boyutunu kontrol etme
   */
  static getSize(): number {
    if (typeof window === 'undefined') return 0;
    
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Storage size calculation error:', error);
      return 0;
    }
  }
}

// Auth-specific storage helpers
export class AuthStorage {
  private static readonly REMEMBER_ME_KEY = 'auth_remember';
  private static readonly SESSION_KEY = 'auth_session';

  /**
   * Remember me bilgilerini kaydetme
   */
  static setRememberMe(email: string, rememberMe: boolean): void {
    if (rememberMe && email) {
      Storage.set(AuthStorage.REMEMBER_ME_KEY, { email, rememberMe });
    } else {
      Storage.remove(AuthStorage.REMEMBER_ME_KEY);
    }
  }

  /**
   * Remember me bilgilerini alma
   */
  static getRememberMe(): { email: string; rememberMe: boolean } | null {
    return Storage.get(AuthStorage.REMEMBER_ME_KEY);
  }

  /**
   * Remember me bilgilerini temizleme
   */
  static clearRememberMe(): void {
    Storage.remove(AuthStorage.REMEMBER_ME_KEY);
  }

  /**
   * Session bilgilerini kaydetme
   */
  static setSession(sessionData: any): void {
    Storage.set(AuthStorage.SESSION_KEY, sessionData);
  }

  /**
   * Session bilgilerini alma
   */
  static getSession(): any {
    return Storage.get(AuthStorage.SESSION_KEY);
  }

  /**
   * Session bilgilerini temizleme
   */
  static clearSession(): void {
    Storage.remove(AuthStorage.SESSION_KEY);
  }

  /**
   * Tüm auth bilgilerini temizleme
   */
  static clearAll(): void {
    AuthStorage.clearRememberMe();
    AuthStorage.clearSession();
  }
}
