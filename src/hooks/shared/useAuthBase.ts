/*
 * useAuthBase Hook
 * 
 * Bu hook tüm auth hook'ları için ortak base logic'i sağlar.
 * DRY principle uygulayarak tekrarlanan auth kodlarını önler.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

export interface AuthUser {
  id: string;
  email: string;
  is_admin?: boolean;
  display_name?: string;
}

export interface AuthState<T extends AuthUser> {
  user: T | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  clearError: () => void;
  refreshSession: () => Promise<void>;
}

export function useAuthBase<T extends AuthUser>(): AuthState<T> & AuthActions {
  const [user, setUser] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Refresh session function
  const refreshSession = useCallback(async () => {
    try {
      setError(null);
      const { data, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        throw refreshError;
      }
      
      if (data.user) {
        setUser(data.user as T);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Session yenileme başarısız';
      setError(errorMessage);
    }
  }, []);

  // Initial user fetch
  useEffect(() => {
    let isMounted = true;
    
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (isMounted) {
          if (error) {
            setError(error.message);
          } else {
            setUser(user as T);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Auth error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          setUser(session?.user as T ?? null);
          setLoading(false);
          
          if (event === 'SIGNED_OUT') {
            setError(null);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    clearError,
    refreshSession,
  };
}
