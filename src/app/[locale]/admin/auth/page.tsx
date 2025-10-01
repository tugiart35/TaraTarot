/*
 * Pakize Admin Auth Sayfası
 * Sadece admin kullanıcıları için özel giriş sayfası
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@/providers/AdminAuthProvider';
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
  const pathname = usePathname();

  // Pathname'den locale'i çıkar
  const locale = pathname.split('/')[1] || 'tr';

  const {
    loading: authLoading,
    loginAdmin,
    isAuthenticated,
  } = useAdminAuth();

  // Auth sayfasında admin kontrolü yapmıyoruz - döngüyü önlemek için

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        setSuccess('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...');
        // Router otomatik olarak yönlendirecek (useEffect)
      } else {
        setError(result.error || 'Giriş sırasında bir hata oluştu.');
      }
    } catch (error: any) {
      setError(error.message || 'Giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Auth sayfasında loading kontrolü yapmıyoruz - döngüyü önlemek için

  // Eğer zaten admin kullanıcı ise dashboard'a yönlendir
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(`/${locale}/admin`);
    }
  }, [authLoading, isAuthenticated, router, locale]);

  // Loading durumu
  if (authLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 safe-top safe-bottom'>
        <div className='w-full max-w-md mx-auto'>
          <div className='bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center'>
            <div className='animate-pulse mb-4'>
              <Crown className='h-12 w-12 text-blue-500 mx-auto' />
            </div>
            <div className='bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-xl font-semibold'>
              Admin paneli yükleniyor...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Auth loading kontrolünü kaldırdık - direkt formu göster

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 safe-top safe-bottom'>
      <div className='w-full max-w-md mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4'>
            <Crown className='h-10 w-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Pakize Paneli</h1>
          <p className='text-slate-400'>Admin yetkisi ile giriş yapın</p>
        </div>

        {/* Login Form */}
        <div className='bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50'>
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
                  className='w-full pl-10 pr-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none touch-target'
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
                  className='w-full pl-10 pr-12 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:outline-none touch-target'
                  placeholder='••••••••'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white touch-target'
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
              className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 touch-target'
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
              className='inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors touch-target'
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
