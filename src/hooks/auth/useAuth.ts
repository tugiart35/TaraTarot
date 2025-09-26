/*
 * useAuth Hook
 * 
 * Bu hook authentication state'ini yönetir ve auth işlemlerini sağlar.
 * Supabase auth state'ini takip eder.
 */

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { AuthService } from '@/lib/auth/auth-service';
import { AuthError } from '@/lib/auth/auth-service';
import type { LoginFormData, RegisterFormData } from '@/lib/auth/auth-validation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Component mount kontrolü
    
    // Initial user fetch
    const fetchUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
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
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
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

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await AuthService.signIn(email, password);
      setUser(result.user);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Giriş başarısız';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (userData: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await AuthService.signUp(userData);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Kayıt başarısız';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await AuthService.signOut();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Çıkış başarısız';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string, locale: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await AuthService.resetPassword(email, locale);
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Şifre sıfırlama başarısız';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async (locale: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await AuthService.signInWithGoogle(locale);
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Google girişi başarısız';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      setError(null);
      
      const result = await AuthService.refreshSession();
      setUser(result.user);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof AuthError ? err.message : 'Session yenileme başarısız';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: false, // TODO: Implement admin check
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
    refreshSession,
    clearError,
  };
}
