/*
 * MINIMAL AUTH PROVIDER - BASIT AUTH YÖNETİMİ
 *
 * BAĞLANTILI DOSYALAR:
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/types/auth.types.ts (Auth types)
 *
 * DOSYA AMACI:
 * Basit authentication provider.
 * Minimal overhead ile temel auth işlevselliği sağlar.
 *
 * ÖZELLİKLER:
 * - Basit session yönetimi
 * - Kullanıcı durumu takibi
 * - Admin kontrolü
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Layout auth desteği için
 * - GÜVENLİ: Production-ready
 * - BASIT: Minimal implementation
 */

'use client';

import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Minimal auth context type (useAuth hook'unun döndürdüğü değerler)
interface MinimalAuthContextType {
  user: any;
  loading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  checkAdminStatus: (userId: string) => Promise<boolean>;
}

const MinimalAuthContext = createContext<MinimalAuthContextType | null>(null);

interface MinimalAuthProviderProps {
  children: React.ReactNode;
}

export function MinimalAuthProvider({ children }: MinimalAuthProviderProps) {
  const auth = useAuth();

  return (
    <MinimalAuthContext.Provider value={auth}>
      {children}
    </MinimalAuthContext.Provider>
  );
}

export function useMinimalAuth() {
  const context = useContext(MinimalAuthContext);
  if (!context) {
    throw new Error('useMinimalAuth must be used within a MinimalAuthProvider');
  }
  return context;
}
