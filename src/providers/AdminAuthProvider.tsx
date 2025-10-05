'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { supabase } from '@/lib/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  is_admin: boolean;
  display_name: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginAdmin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  logoutAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // İlk yüklemede session kontrolü
  useEffect(() => {
    let mounted = true;

    const initializeAdmin = async () => {
      try {
        // DEVELOPMENT ONLY - Otomatik test admin girişi - şimdilik devre dışı bırakıldı
        // if (process.env.NODE_ENV === 'development') {
        //   // Hemen admin ayarla
        //   const adminUser: AdminUser = {
        //     id: 'dev-admin-session',
        //     email: 'admin@test.com',
        //     is_admin: true,
        //     display_name: 'Test Admin',
        //   };
        //
        //   if (mounted) {
        //     setAdmin(adminUser);
        //     setLoading(false);
        //     console.log('Development admin set immediately:', adminUser);
        //     return;
        //   }
        // }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          // Admin kontrolü yap
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, email, is_admin, display_name')
            .eq('id', session.user.id)
            .eq('is_admin', true)
            .single();

          if (profile && mounted) {
            setAdmin({
              id: profile.id,
              email: profile.email,
              is_admin: profile.is_admin,
              display_name: profile.display_name,
            });
          }
        }
      } catch (error) {
        console.error('Session initialize error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAdmin();

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (!mounted) {
        return;
      }

      if (event === 'SIGNED_OUT') {
        setAdmin(null);
      } else if (event === 'SIGNED_IN' && session?.user) {
        // Admin kontrolü yap
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email, is_admin, display_name')
          .eq('id', session.user.id)
          .eq('is_admin', true)
          .single();

        if (profile && mounted) {
          setAdmin({
            id: profile.id,
            email: profile.email,
            is_admin: profile.is_admin,
            display_name: profile.display_name,
          });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginAdmin = useCallback(async (email: string, password: string) => {
    try {
      // DEVELOPMENT ONLY - Test için hardcoded admin - şimdilik devre dışı bırakıldı
      // if (process.env.NODE_ENV === 'development') {
      //   if (email === 'admin@test.com' && password === 'admin123') {
      //     const adminUser: AdminUser = {
      //       id: 'dev-admin-session',
      //       email: email,
      //       is_admin: true,
      //       display_name: 'Test Admin',
      //     };
      //
      //     setAdmin(adminUser);
      //     return { success: true, error: null };
      //   }
      // }

      // Supabase admin authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Admin kontrolü yap
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, is_admin, display_name')
          .eq('id', data.user.id)
          .eq('is_admin', true)
          .single();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          return {
            success: false,
            error: 'Bu hesap admin yetkisine sahip değil.',
          };
        }

        const adminUser: AdminUser = {
          id: profile.id,
          email: profile.email,
          is_admin: profile.is_admin,
          display_name: profile.display_name,
        };

        setAdmin(adminUser);
        return { success: true, error: null };
      }

      return { success: false, error: 'Kullanıcı bulunamadı.' };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Giriş sırasında bir hata oluştu.' };
    }
  }, []);

  const logoutAdmin = useCallback(async () => {
    try {
      setAdmin(null);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: !!admin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
