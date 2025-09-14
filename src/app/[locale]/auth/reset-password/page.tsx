/*
info:
Bağlantılı dosyalar:
- @/hooks/useAuth: Kullanıcı kimlik doğrulama için (gerekli)
- @/hooks/useTranslations: Çoklu dil desteği için (gerekli)
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)

Dosyanın amacı:
- Şifre sıfırlama sayfası oluşturur
- URL parametrelerinden token ve type bilgilerini alır
- Yeni şifre belirleme formu sunar
- Supabase auth ile şifre sıfırlama işlemini gerçekleştirir

Backend bağlantısı:
- Supabase auth ile şifre sıfırlama
- Burada backend'e bağlanılacak - şifre güncelleme işlemi

Geliştirme önerileri:
- Güvenli şifre validasyonu
- Kullanıcı dostu hata mesajları
- Loading state'leri ve feedback
- Responsive tasarım

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Şifre sıfırlama işlemi için aktif kullanımda
- Email linkinden gelen kullanıcılar için
*/

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useTranslations } from '@/hooks/useTranslations';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pathname'den locale'i çıkar
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[1] || 'tr';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [type, setType] = useState('');

  // URL parametrelerini al
  useEffect(() => {
    const tokenParam = searchParams.get('token_hash');
    const typeParam = searchParams.get('type');

    if (tokenParam && typeParam) {
      setToken(tokenParam);
      setType(typeParam);
    } else {
      setError(
        'Geçersiz şifre sıfırlama linki. Lütfen yeni bir şifre sıfırlama talebi oluşturun.'
      );
    }
  }, [searchParams]);

  // Şifre validasyonu
  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) {
      return 'Şifre en az 6 karakter olmalıdır';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) {
      return 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Şifre validasyonu
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    try {
      // Supabase ile şifre sıfırlama
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type as any,
        password: password,
      });

      if (error) {
        console.error('Şifre sıfırlama hatası:', error);
        if (
          error.message.includes('expired') ||
          error.message.includes('invalid')
        ) {
          setError(
            'Şifre sıfırlama linki süresi dolmuş veya geçersiz. Lütfen yeni bir şifre sıfırlama talebi oluşturun.'
          );
        } else {
          setError('Şifre sıfırlama işlemi başarısız. Lütfen tekrar deneyin.');
        }
      } else {
        setSuccess(true);
        // 3 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          router.push(`/${locale}/auth`);
        }, 3000);
      }
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center'>
          <CheckCircle className='h-16 w-16 text-green-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-4'>
            Şifre Başarıyla Sıfırlandı!
          </h1>
          <p className='text-gray-300 mb-6'>
            Şifreniz başarıyla güncellendi. 3 saniye içinde giriş sayfasına
            yönlendirileceksiniz.
          </p>
          <button
            onClick={() => router.push(`/${locale}/auth`)}
            className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            Giriş Sayfasına Git
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
      <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full'>
        <div className='text-center mb-8'>
          <Lock className='h-12 w-12 text-purple-400 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white mb-2'>
            Yeni Şifre Belirle
          </h1>
          <p className='text-gray-300'>
            Hesabınız için yeni bir şifre oluşturun
          </p>
        </div>

        {error && (
          <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6'>
            <div className='flex items-center space-x-2'>
              <AlertCircle className='h-5 w-5 text-red-400' />
              <p className='text-red-300 text-sm'>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Yeni Şifre
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='Yeni şifrenizi girin'
                required
                disabled={loading}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Şifre Tekrar
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='Şifrenizi tekrar girin'
                required
                disabled={loading}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading || !token || !type}
            className='w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            {loading ? 'Şifre Sıfırlanıyor...' : 'Şifreyi Sıfırla'}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <button
            onClick={() => router.push(`/${locale}/auth`)}
            className='text-purple-400 hover:text-purple-300 text-sm transition-colors'
          >
            Giriş sayfasına dön
          </button>
        </div>
      </div>
    </div>
  );
}
