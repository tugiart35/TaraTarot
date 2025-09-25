'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  is_admin: boolean;
  display_name: string;
}

export function useAuthAdmin() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // SessionStorage'dan admin bilgilerini kontrol et
  const checkAdminSession = useCallback(() => {
    try {
      const adminAuth = sessionStorage.getItem('admin_authenticated');
      const adminEmail = sessionStorage.getItem('admin_email');
      const loginTime = sessionStorage.getItem('admin_login_time');

      if (adminAuth === 'true' && adminEmail && loginTime) {
        // Session süresini kontrol et (24 saat)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const diffHours = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);

        if (diffHours < 24) {
          // Geçerli session
          setAdmin({
            id: 'admin-session',
            email: adminEmail,
            is_admin: true,
            display_name: 'Admin User'
          });
          setIsAuthenticated(true);
          return true;
        } else {
          // Session süresi dolmuş
          clearAdminSession();
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Admin session kontrol hatası:', error);
      return false;
    }
  }, []);

  // Supabase'den admin kontrolü yap
  const checkSupabaseAdmin = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return false;
      }

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
      setAdmin({
        id: profile.id,
        email: profile.email,
        is_admin: profile.is_admin,
        display_name: profile.display_name
      });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Supabase admin kontrol hatası:', error);
      return false;
    }
  }, []);

  // Admin session'ını temizle
  const clearAdminSession = useCallback(() => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_email');
    sessionStorage.removeItem('admin_login_time');
    setAdmin(null);
    setIsAuthenticated(false);
  }, []);

  // Admin girişi yap
  const loginAdmin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);

      // Önce basit admin kontrolü yap (SimpleAdminLogin ile uyumlu)
      if (email === 'tugi@admin.com' && password === 'Tugay.888') {
        console.log('🔐 Basit admin girişi başarılı:', email);
        
        // SessionStorage'a kaydet
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_email', email);
        sessionStorage.setItem('admin_login_time', new Date().toISOString());
        
        setAdmin({
          id: 'admin-session',
          email: email,
          is_admin: true,
          display_name: 'Admin User'
        });
        setIsAuthenticated(true);
        
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
        setAdmin({
          id: profile.id,
          email: profile.email,
          is_admin: profile.is_admin,
          display_name: profile.display_name
        });
        setIsAuthenticated(true);

        return { success: true, error: null };
      }

      return { success: false, error: 'Kullanıcı bulunamadı.' };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Giriş sırasında bir hata oluştu.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin çıkışı yap
  const logoutAdmin = useCallback(async () => {
    try {
      // Supabase'den çıkış yap
      await supabase.auth.signOut();
      
      // SessionStorage'ı temizle
      clearAdminSession();
      
      return { success: true };
    } catch (error) {
      console.error('Admin logout error:', error);
      return { success: false, error: 'Çıkış sırasında bir hata oluştu.' };
    }
  }, [clearAdminSession]);

  // İlk yükleme kontrolü
  useEffect(() => {
    const initializeAdmin = async () => {
      setLoading(true);
      
      // Önce sessionStorage kontrolü
      const hasSession = checkAdminSession();
      
      if (!hasSession) {
        // SessionStorage yoksa Supabase kontrolü yap
        await checkSupabaseAdmin();
      }
      
      setLoading(false);
    };

    initializeAdmin();
  }, [checkAdminSession, checkSupabaseAdmin]);

  return {
    admin,
    loading,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    clearAdminSession,
  };
}
