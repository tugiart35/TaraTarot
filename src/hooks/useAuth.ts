'use client';

import { useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        return;
      }

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

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
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkSession]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
