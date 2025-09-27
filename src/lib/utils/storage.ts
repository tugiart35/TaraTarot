/*
 * Storage Utility
 * 
 * Bu dosya Supabase ile entegre çalışan güvenli storage utility fonksiyonları içerir.
 * localStorage yerine Supabase session kullanır.
 */

import { supabase } from '@/lib/supabase/client';

export class Storage {
  /**
   * Supabase session'dan veri okuma
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // User metadata'dan veri al
        return session.user.user_metadata?.[key] || null;
      }
      return null;
    } catch (error) {
      console.error(`Storage get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Supabase session'a veri yazma
   */
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // User metadata'yı güncelle
        const { error } = await supabase.auth.updateUser({
          data: { ...user.user_metadata, [key]: value }
        });
        
        if (error) {
          console.error(`Storage set error for key ${key}:`, error);
        }
      }
    } catch (error) {
      console.error(`Storage set error for key ${key}:`, error);
    }
  }

  /**
   * Supabase session'dan veri silme
   */
  static async remove(key: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const updatedMetadata = { ...user.user_metadata };
        delete updatedMetadata[key];
        
        const { error } = await supabase.auth.updateUser({
          data: updatedMetadata
        });
        
        if (error) {
          console.error(`Storage remove error for key ${key}:`, error);
        }
      }
    } catch (error) {
      console.error(`Storage remove error for key ${key}:`, error);
    }
  }

  /**
   * Supabase session'ı temizleme
   */
  static async clear(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  /**
   * Supabase session key'inin var olup olmadığını kontrol etme
   */
  static async has(key: string): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user?.user_metadata?.[key] !== undefined;
    } catch (error) {
      console.error(`Storage has error for key ${key}:`, error);
      return false;
    }
  }
}

// Auth-specific storage helpers - Supabase ile entegre
export class AuthStorage {
  /**
   * Remember me bilgilerini kaydetme
   */
  static async setRememberMe(email: string, rememberMe: boolean): Promise<void> {
    if (rememberMe && email) {
      await Storage.set('rememberMe', { email, rememberMe });
    } else {
      await Storage.remove('rememberMe');
    }
  }

  /**
   * Remember me bilgilerini alma
   */
  static async getRememberMe(): Promise<{ email: string; rememberMe: boolean } | null> {
    return await Storage.get('rememberMe');
  }

  /**
   * Remember me bilgilerini temizleme
   */
  static async clearRememberMe(): Promise<void> {
    await Storage.remove('rememberMe');
  }

  /**
   * Session bilgilerini kaydetme
   */
  static async setSession(sessionData: any): Promise<void> {
    await Storage.set('session', sessionData);
  }

  /**
   * Session bilgilerini alma
   */
  static async getSession(): Promise<any> {
    return await Storage.get('session');
  }

  /**
   * Session bilgilerini temizleme
   */
  static async clearSession(): Promise<void> {
    await Storage.remove('session');
  }

  /**
   * Tüm auth bilgilerini temizleme
   */
  static async clearAll(): Promise<void> {
    await AuthStorage.clearRememberMe();
    await AuthStorage.clearSession();
    await Storage.clear();
  }
}
