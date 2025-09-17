'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin kontrolü için Supabase'den profil bilgilerini çek
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Admin status check error:', error);
        setIsAdmin(false);
        return false;
      }

      setIsAdmin(profile?.is_admin || false);
      return true;
    } catch (error) {
      console.error('Admin status check error:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    console.log('🔍 useAuth: Hook başlatılıyor...');
    
    // Basit timeout ile loading'i false yap
    const timeout = setTimeout(() => {
      console.log('⏰ useAuth: Timeout - loading false yapılıyor');
      setLoading(false);
    }, 2000);

    // Mevcut oturumu al
    const getSession = async () => {
      try {
        console.log('🔍 useAuth: Session alınıyor...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ useAuth: Session get error:', error);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        
        console.log('✅ useAuth: Session alındı:', !!session?.user);
        setUser(session?.user ?? null);
        setIsAdmin(false);
        setLoading(false);
      } catch (error) {
        console.error('❌ useAuth: Session get catch error:', error);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    getSession();

    // Auth state değişikliklerini dinle
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          console.log('🔄 useAuth: Auth state değişti:', _event);
          setUser(session?.user ?? null);
          setIsAdmin(false);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('❌ useAuth: Auth listener setup error:', error);
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin,
  };
}
