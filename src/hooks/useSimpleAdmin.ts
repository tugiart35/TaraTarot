'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthBase, type AuthUser } from '@/hooks/shared/useAuthBase';

interface AdminUser extends AuthUser {
  email: string;
  isAuthenticated: boolean;
  loginTime: string;
}

export function useSimpleAdmin() {
  const { user, loading, error, isAuthenticated, clearError } =
    useAuthBase<AdminUser>();
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, [user]);

  const checkAdminAuth = useCallback(() => {
    try {
      if (user && user.email) {
        const adminUser: AdminUser = {
          ...user,
          email: user.email,
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        };

        setAdmin(adminUser);
        console.log('Admin girişi onaylandı:', user.email);
      } else {
        setAdmin(null);
        console.log('Admin girişi bulunamadı');
      }
    } catch (error) {
      console.error('Admin auth check failed:', error);
      setAdmin(null);
    }
  }, [user]);

  const logout = useCallback(() => {
    try {
      setAdmin(null);
    } catch (error) {
      console.error('Admin logout failed:', error);
    }
  }, []);

  return {
    admin,
    loading,
    isAuthenticated: admin?.isAuthenticated || false,
    logout,
    checkAdminAuth,
  };
}
