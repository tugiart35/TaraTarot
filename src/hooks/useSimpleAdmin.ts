'use client';

import { useState, useEffect } from 'react';

interface AdminUser {
  email: string;
  isAuthenticated: boolean;
  loginTime: string;
}

export function useSimpleAdmin() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    try {
      const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
      const email = sessionStorage.getItem('admin_email');
      const loginTime = sessionStorage.getItem('admin_login_time');

      console.log('Admin auth kontrolü:', { isAuthenticated, email, loginTime });

      if (isAuthenticated && email) {
        setAdmin({
          email,
          isAuthenticated: true,
          loginTime: loginTime || new Date().toISOString(),
        });
        console.log('Admin girişi onaylandı:', email);
      } else {
        setAdmin(null);
        console.log('Admin girişi bulunamadı');
      }
    } catch (error) {
      console.error('Admin auth check failed:', error);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('admin_authenticated');
      sessionStorage.removeItem('admin_email');
      sessionStorage.removeItem('admin_login_time');
      setAdmin(null);
    } catch (error) {
      console.error('Admin logout failed:', error);
    }
  };

  return {
    admin,
    loading,
    isAuthenticated: admin?.isAuthenticated || false,
    logout,
    checkAdminAuth,
  };
}
