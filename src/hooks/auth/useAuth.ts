/*
 * useAuth Hook
 * 
 * Bu hook authentication state'ini yönetir ve auth işlemlerini sağlar.
 * useAuthBase hook'unu kullanarak DRY principle uygular.
 */

import { useState, useCallback } from 'react';
// import { User } from '@supabase/supabase-js';
import { AuthService } from '@/lib/auth/auth-service';
// import { AuthError } from '@/lib/auth/auth-service';
import type { RegisterFormData } from '@/lib/auth/auth-validation';
import { useAuthBase } from '@/hooks/shared/useAuthBase';

export function useAuth() {
  const { user, loading, error, isAuthenticated, clearError, refreshSession } = useAuthBase();

  const [authLoading, setAuthLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      clearError();
      
      const result = await AuthService.signIn(email, password);
      
      return result;
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [clearError]);

  const signUp = useCallback(async (userData: RegisterFormData) => {
    try {
      setAuthLoading(true);
      clearError();
      
      const result = await AuthService.signUp(userData);
      
      return result;
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [clearError]);

  const signOut = useCallback(async () => {
    try {
      setAuthLoading(true);
      clearError();
      
      await AuthService.signOut();
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [clearError]);

  const resetPassword = useCallback(async (email: string, locale: string) => {
    try {
      setAuthLoading(true);
      clearError();
      
      await AuthService.resetPassword(email, locale);
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [clearError]);

  const signInWithGoogle = useCallback(async (locale: string) => {
    try {
      setAuthLoading(true);
      clearError();
      
      await AuthService.signInWithGoogle(locale);
    } catch (err) {
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, [clearError]);

  const resendConfirmation = useCallback(async (email: string) => {
    try {
      console.log('useAuth.resendConfirmation called with email:', email);
      setAuthLoading(true);
      clearError();
      
      console.log('Calling AuthService.resendConfirmation');
      await AuthService.resendConfirmation(email);
      console.log('AuthService.resendConfirmation completed successfully');
    } catch (err) {
      console.error('useAuth.resendConfirmation error:', err);
      throw err;
    } finally {
      console.log('useAuth.resendConfirmation finally block');
      setAuthLoading(false);
    }
  }, [clearError]);

  return {
    user,
    loading: loading || authLoading,
    error,
    isAuthenticated,
    isAdmin: false, // TODO: Implement admin check
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
    resendConfirmation,
    refreshSession,
    clearError,
  };
}
