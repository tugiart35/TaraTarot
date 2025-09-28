/*
 * Admin Detection Service
 *
 * Bu dosya admin kullanıcı tespiti için ortak service fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan admin detection kodlarını önler.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export class AdminDetectionService {
  /**
   * Kullanıcının admin olup olmadığını kontrol et
   */
  static async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // Server Component'ten çağrıldığında ignore edilebilir
              }
            },
          },
        }
      );

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      return profile?.is_admin || false;
    } catch (error) {
      console.error('Admin detection error:', error);
      return false;
    }
  }

  /**
   * Admin durumuna göre redirect path belirle
   */
  static getRedirectPath(isAdmin: boolean, locale: string): string {
    if (isAdmin) {
      return `/${locale}/pakize`;
    } else {
      return `/${locale}/dashboard`;
    }
  }

  /**
   * Admin kullanıcı için özel log mesajı
   */
  static logAdminAccess(userId: string, isAdmin: boolean): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin detection:', {
        userId,
        isAdmin,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
