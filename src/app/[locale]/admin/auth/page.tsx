/*
 * Pakize Admin Auth Sayfası
 * Sadece admin kullanıcıları için özel giriş sayfası
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Crown,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function PakizeAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Pathname'den locale'i çıkar
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[1] || 'tr';

  const { user, isAdmin, loading: authLoading } = useAuth();

  // Auth sayfasında admin kontrolü yapmıyoruz - döngüyü önlemek için

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Supabase ile giriş yap
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Admin kontrolü yap
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile?.is_admin) {
          setError('Bu hesap admin yetkisine sahip değil.');
          await supabase.auth.signOut();
          return;
        }

        setSuccess('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...');

        // Simple admin auth için sessionStorage'a kaydet
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_email', email);
        sessionStorage.setItem('admin_login_time', new Date().toISOString());

        // 1 saniye bekle ve admin dashboard'a yönlendir
        setTimeout(() => {
          router.push(`/${locale}/admin`);
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Auth sayfasında loading kontrolü yapmıyoruz - döngüyü önlemek için

  // Eğer zaten admin kullanıcı ise dashboard'a yönlendir
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      // Simple admin auth için sessionStorage'a kaydet
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_email', user.email || '');
      sessionStorage.setItem('admin_login_time', new Date().toISOString());
      
      router.push(`/${locale}/admin`);
    }
  }, [authLoading, user, isAdmin, router, locale]);

  // Auth loading kontrolünü kaldırdık - direkt formu göster

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4'>
            <Crown className='h-10 w-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Pakize Paneli</h1>
          <p className='text-slate-400'>Admin yetkisi ile giriş yapın</p>
        </div>

        {/* Login Form */}
        <div className='admin-card rounded-2xl p-8'>
          <form onSubmit={handleLogin} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>
                Email Adresi
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none'
                  placeholder='admin@example.com'
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>
                Şifre
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full pl-10 pr-12 py-3 admin-glass rounded-lg border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none'
                  placeholder='••••••••'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='p-3 bg-red-500/20 border border-red-500/30 rounded-lg'>
                <p className='text-red-300 text-sm'>{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className='p-3 bg-green-500/20 border border-green-500/30 rounded-lg'>
                <p className='text-green-300 text-sm'>{success}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full admin-btn-primary py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <Shield className='h-5 w-5' />
                  <span>Pakize Paneline Giriş</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className='mt-6 text-center'>
            <button
              onClick={() => router.push(`/${locale}/tarotokumasi`)}
              className='inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors'
            >
              <ArrowLeft className='h-4 w-4' />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <div className='inline-flex items-center space-x-2 text-slate-500'>
            <Sparkles className='h-4 w-4' />
            <span className='text-sm'>Güvenli Admin Paneli</span>
          </div>
        </div>
      </div>
    </div>
  );
}
