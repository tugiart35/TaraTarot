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
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { getAuthErrorMessage } from '@/lib/auth/auth-error-messages';
// import { useTranslations } from '@/hooks/useTranslations';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  // const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  
  // Locale'i params'dan al
  const locale = (params.locale as string) || 'tr';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [type, setType] = useState('');

  // URL parametrelerini al - Sadece güvenli yeni sistem
  useEffect(() => {
    const codeParam = searchParams.get('code');
    
    // Error parametrelerini kontrol et
    const errorParam = searchParams.get('error');
    const errorCode = searchParams.get('error_code');

    if (errorParam) {
      let errorMessage = 'Şifre sıfırlama linki geçersiz veya süresi dolmuş.';
      
      if (errorCode === 'otp_expired') {
        errorMessage = 'Şifre sıfırlama linki süresi dolmuş. Lütfen yeni bir şifre sıfırlama talebinde bulunun.';
      } else if (errorCode === 'access_denied') {
        errorMessage = 'Şifre sıfırlama linki geçersiz. Lütfen yeni bir şifre sıfırlama talebinde bulunun.';
      }
      
      setError(errorMessage);
      return;
    }

    // Güvenli yeni Supabase auth sistemi için code parametresi
    if (codeParam) {
      setToken(codeParam);
      setType('recovery');
    } else {
      setError('Geçersiz şifre sıfırlama linki. Lütfen yeni bir şifre sıfırlama talebinde bulunun.');
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
      // En güvenli yöntem: Yeni Supabase auth sistemi
      // Code parametresi ile direkt şifre güncelleme
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        logger.error('Şifre güncelleme hatası', updateError);
        
        // Özel hata mesajları
        if (updateError.message.includes('session')) {
          setError('Oturum süresi dolmuş. Lütfen yeni bir şifre sıfırlama talebinde bulunun.');
        } else if (updateError.message.includes('password')) {
          setError('Şifre güvenlik gereksinimlerini karşılamıyor. Lütfen daha güçlü bir şifre seçin.');
        } else {
          const errorMessage = getAuthErrorMessage(updateError, locale);
          setError(errorMessage);
        }
      } else {
        setSuccess(true);
        // 3 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          router.push(`/${locale}/auth`);
        }, 3000);
      }
    } catch (error) {
      logger.error('Şifre sıfırlama hatası', error);
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Hata durumunda gösterilecek UI
  if (error && !token) {
    return (
      <div 
        className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(75, 0, 130, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)
          `
        }}
      >
        {/* Mystical background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-300 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className='relative bg-gradient-to-br from-slate-900/90 via-red-900/20 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-center border border-red-400/20 shadow-2xl'>
          {/* Error mystical symbol */}
          <div className="relative mb-6">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-red-400/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-red-400/40 rounded-full animate-pulse"></div>
            <AlertCircle className='h-16 w-16 text-red-400 mx-auto mb-4 relative z-10' />
          </div>
          
          <h1 className='text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4'>
            Link Geçersiz
          </h1>
          
          <p className='text-gray-300 mb-6 leading-relaxed'>
            {error}
          </p>
          
          <div className='space-y-4'>
            <button
              onClick={() => router.push(`/${locale}/auth`)}
              className='w-full bg-gradient-to-r from-gold to-amber-400 hover:from-gold/90 hover:to-amber-500 text-night py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
            >
              Yeni Şifre Sıfırlama Talebi
            </button>
            
            <button
              onClick={() => router.push(`/${locale}/auth`)}
              className='w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
            >
              Giriş Sayfasına Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div 
        className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(75, 0, 130, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)
          `
        }}
      >
        {/* Mystical background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lavender rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className='relative bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-center border border-lavender/20 shadow-2xl'>
          {/* Success mystical symbol */}
          <div className="relative mb-6">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-green-400/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-green-400/40 rounded-full animate-pulse"></div>
            <CheckCircle className='h-16 w-16 text-green-400 mx-auto mb-4 relative z-10' />
          </div>
          
          <h1 className='text-2xl font-bold bg-gradient-to-r from-green-400 via-gold to-green-400 bg-clip-text text-transparent mb-4'>
            🔮 Şifre Başarıyla Sıfırlandı! ✨
          </h1>
          <p className='text-lavender/90 mb-6'>
            Şifreniz başarıyla güncellendi. 3 saniye içinde giriş sayfasına
            yönlendirileceksiniz.
          </p>
          <button
            onClick={() => router.push(`/${locale}/auth`)}
            className='w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 hover:from-green-700 hover:via-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          >
            ✨ Giriş Sayfasına Git ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(75, 0, 130, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)
        `
      }}
    >
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lavender rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-lavender rounded-full animate-pulse delay-5000"></div>
      </div>

      <div className='relative bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-lavender/20 shadow-2xl'>
        <div className='text-center mb-8'>
          <div className="relative mb-6">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gold/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-lavender/40 rounded-full animate-pulse"></div>
            <Lock className='h-12 w-12 text-gold mx-auto mb-4 relative z-10' />
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-gold via-lavender to-purple-400 bg-clip-text text-transparent mb-2'>
            🔮 Yeni Şifre Belirle 🔮
          </h1>
          <p className='text-lavender/90'>
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
