'use client';

import { useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin kontrolü için profiles tablosundaki is_admin alanını kullan
  const checkAdminStatus = useCallback(async (_userId: string) => {
    try {
      // Basit admin kontrolü - sadece false döndür (şimdilik admin yok)
      setIsAdmin(false);
      return false;
    } catch (error) {
      setIsAdmin(false);
      return false;
    }
  }, []);

  // Session'ı kontrol et ve kullanıcı bilgilerini al
  const checkSession = useCallback(async () => {
    try {
      // Client-side için getUser() kullan
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (user) {
        setUser(user);
        await checkAdminStatus(user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (error) {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, [checkAdminStatus]);

  useEffect(() => {
    let mounted = true;

    // İlk session kontrolü
    checkSession();

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: string, session: any) => {
        if (!mounted) {
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkSession, checkAdminStatus]);

  return {
    user,
    loading,
    isAdmin,
    isAuthenticated: !!user, // ✅ isAuthenticated değerini ekle
    checkAdminStatus,
  };
}
