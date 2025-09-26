/*
 * useRememberMe Hook
 * 
 * Bu hook "Beni hatırla" işlevselliğini yönetir.
 * localStorage'ı güvenli şekilde kullanır.
 */

import { useState, useEffect, useCallback } from 'react';
import { AuthStorage } from '@/lib/utils/storage';

export function useRememberMe() {
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    // Load saved remember me data
    const saved = AuthStorage.getRememberMe();
    if (saved?.rememberMe && saved?.email) {
      setRememberMe(true);
      setSavedEmail(saved.email);
    }
  }, []);

  const updateRememberMe = useCallback((email: string, remember: boolean) => {
    setRememberMe(remember);
    setSavedEmail(email);
    
    // Update localStorage
    AuthStorage.setRememberMe(email, remember);
  }, []);

  const clearRememberMe = useCallback(() => {
    setRememberMe(false);
    setSavedEmail('');
    AuthStorage.clearRememberMe();
  }, []);

  const loadSavedEmail = useCallback(() => {
    const saved = AuthStorage.getRememberMe();
    if (saved?.rememberMe && saved?.email) {
      setRememberMe(true);
      setSavedEmail(saved.email);
      return saved.email;
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
