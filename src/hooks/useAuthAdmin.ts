'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuthBase, type AuthUser } from '@/hooks/shared/useAuthBase';

interface AdminUser extends AuthUser {
  id: string;
  email: string;
  is_admin: boolean;
  display_name: string;
}

export function useAuthAdmin() {
  const { user, loading, error, isAuthenticated, clearError, refreshSession } = useAuthBase<AdminUser>();
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  // Admin session kontrolü - Supabase ile entegre
  const checkAdminSession = useCallback(async () => {
    try {
      if (user && user.is_admin) {
        setAdmin(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin session kontrol hatası:', error);
      return false;
    }
  }, [user]);

  // Supabase'den admin kontrolü yap
  const checkSupabaseAdmin = useCallback(async () => {
    try {
      if (!user) return false;

      // Profiles tablosundan admin kontrolü yap
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, is_admin, display_name')
        .eq('id', user.id)
        .eq('is_admin', true)
        .single();

      if (profileError || !profile) {
        return false;
      }

      // Admin kullanıcı bulundu
      const adminUser: AdminUser = {
        id: profile.id,
        email: profile.email,
        is_admin: profile.is_admin,
        display_name: profile.display_name
      };
      
      setAdmin(adminUser);
      return true;
    } catch (error) {
      console.error('Supabase admin kontrol hatası:', error);
      return false;
    }
  }, [user]);

  // Admin session'ını temizle
  const clearAdminSession = useCallback(async () => {
    setAdmin(null);
    await supabase.auth.signOut();
  }, []);

  // Admin girişi yap
  const loginAdmin = useCallback(async (email: string, password: string) => {
    try {
      // Önce basit admin kontrolü yap (SimpleAdminLogin ile uyumlu)
      if (email === 'tugi@admin.com' && password === 'Tugay.888') {
        console.log('🔐 Basit admin girişi başarılı:', email);
        
        const adminUser: AdminUser = {
          id: 'admin-session',
          email: email,
          is_admin: true,
          display_name: 'Admin User'
        };
        
        setAdmin(adminUser);
        return { success: true, error: null };
      }

      console.log('🔐 Supabase admin kontrolü yapılıyor...');

      // Supabase admin kontrolü
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('🔐 Supabase giriş hatası:', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('🔐 Supabase giriş başarılı, admin kontrolü yapılıyor...');
        
        // Admin kontrolü yap
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, is_admin, display_name')
          .eq('id', data.user.id)
          .eq('is_admin', true)
          .single();

        if (profileError || !profile) {
          console.log('🔐 Admin yetkisi yok, çıkış yapılıyor...');
          await supabase.auth.signOut();
          return { success: false, error: 'Bu hesap admin yetkisine sahip değil.' };
        }

        console.log('🔐 Supabase admin girişi başarılı:', profile.email);

        // Başarılı admin girişi
        const adminUser: AdminUser = {
          id: profile.id,
          email: profile.email,
          is_admin: profile.is_admin,
          display_name: profile.display_name
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

  // Admin çıkışı yap
  const logoutAdmin = useCallback(async () => {
    try {
      await clearAdminSession();
      return { success: true };
    } catch (error) {
      console.error('Admin logout error:', error);
      return { success: false, error: 'Çıkış sırasında bir hata oluştu.' };
    }
  }, [clearAdminSession]);

  // İlk yükleme kontrolü
  useEffect(() => {
    const initializeAdmin = async () => {
      // Önce Supabase kontrolü yap
      await checkSupabaseAdmin();
    };

    initializeAdmin();
  }, [checkSupabaseAdmin]);

  return {
    admin,
    loading,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    clearAdminSession,
  };
}
