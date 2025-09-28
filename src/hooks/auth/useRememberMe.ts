/*
 * useRememberMe Hook
 *
 * Bu hook "Beni hatırla" işlevselliğini yönetir.
 * Supabase session ile entegre çalışır.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useRememberMe() {
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    // Load saved remember me data from Supabase session
    const loadRememberMeData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user?.email) {
          setRememberMe(true);
          setSavedEmail(session.user.email);
        }
      } catch (error) {
        console.error('Error loading remember me data:', error);
      }
    };

    loadRememberMeData();
  }, []);

  const updateRememberMe = useCallback((email: string, remember: boolean) => {
    setRememberMe(remember);
    setSavedEmail(email);

    // Supabase session zaten email'i saklıyor, ekstra storage gerekmez
    if (!remember) {
      // Eğer remember me false ise, session'ı temizle
      supabase.auth.signOut();
    }
  }, []);

  const clearRememberMe = useCallback(async () => {
    setRememberMe(false);
    setSavedEmail('');

    // Supabase session'ı temizle
    await supabase.auth.signOut();
  }, []);

  const loadSavedEmail = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setRememberMe(true);
        setSavedEmail(session.user.email);
        return session.user.email;
      }
    } catch (error) {
      console.error('Error loading saved email:', error);
    }
    return '';
  }, []);

  return {
    rememberMe,
    savedEmail,
    updateRememberMe,
    clearRememberMe,
    loadSavedEmail,
  };
}
