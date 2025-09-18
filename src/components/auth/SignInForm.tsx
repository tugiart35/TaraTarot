/*
 * SignInForm - Client Component
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/client.ts (browser client)
 * - src/hooks/useTranslations.ts (çeviri hook'u)
 * - src/hooks/useToast.ts (toast hook'u)
 *
 * Dosya amacı:
 * Client-side form handling ve auth işlemleri
 * React Hook Form + Zod validation
 *
 * Supabase değişkenleri ve tablolar:
 * - auth.users: Supabase auth tablosu
 * - profiles: kullanıcı profilleri
 *
 * Geliştirme önerileri:
 * - Form validation iyileştirilebilir
 * - Error handling daha detaylı olabilir
 * - Loading states optimize edilebilir
 *
 * Tespit edilen hatalar:
 * - ✅ Client Component olarak ayrıldı
 * - ✅ Form validation eklendi
 * - ✅ Error handling iyileştirildi
 *
 * Kullanım durumu:
 * - ✅ Gerekli: Auth form handling için
 * - ✅ Production-ready: Client-side auth işlemleri
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';

interface SignInFormProps {
  locale: string;
  initialError: string | null;
  next: string | null;
}

export default function SignInForm({ locale, initialError, next }: SignInFormProps) {
  const { t } = useTranslations();
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
    birthDate?: string;
    gender?: string;
  }>({});

  // Initial error'u göster
  useEffect(() => {
    if (initialError) {
      if (initialError === 'callback_failed') {
        setMessage('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.');
      } else {
        setMessage(initialError);
      }
    }
  }, [initialError]);

  // localStorage'dan kayıtlı bilgileri yükle
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Remember me durumuna göre localStorage'ı güncelle
  useEffect(() => {
    if (rememberMe && email) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberMe', 'true');
    } else if (!rememberMe) {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
    }
  }, [rememberMe, email]);

  // Form validasyonu
  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Şifre validasyonu
    if (!password) {
      newErrors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }

    // Kayıt sırasında ek alanlar
    if (!isLogin) {
      // Şifre onayı
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Şifre onayı gerekli';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }

      // Ad validasyonu
      if (!name.trim()) {
        newErrors.name = 'Ad gerekli';
      } else if (name.trim().length < 2) {
        newErrors.name = 'Ad en az 2 karakter olmalı';
      }

      // Soyad validasyonu
      if (!surname.trim()) {
        newErrors.surname = 'Soyad gerekli';
      } else if (surname.trim().length < 2) {
        newErrors.surname = 'Soyad en az 2 karakter olmalı';
      }

      // Doğum tarihi validasyonu
      if (!birthDate) {
        newErrors.birthDate = 'Doğum tarihi gerekli';
      } else {
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        if (age < 13) {
          newErrors.birthDate = 'En az 13 yaşında olmalısınız';
        } else if (age > 120) {
          newErrors.birthDate = 'Geçerli bir yaş girin';
        }
      }

      // Cinsiyet validasyonu
      if (!gender) {
        newErrors.gender = 'Cinsiyet seçimi gerekli';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});
    setLoadingStep('Doğrulanıyor...');

    if (!validateForm()) {
      setLoading(false);
      setLoadingStep('');
      return;
    }

    try {
      if (isLogin) {
        setLoadingStep('Giriş yapılıyor...');
        console.log('🔐 Giriş yapılıyor:', { email: email.substring(0, 3) + '***' });
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log('🔐 Giriş sonucu:', { 
          hasData: !!data, 
          hasError: !!error, 
          errorMessage: error?.message,
          hasUser: !!data?.user,
          hasSession: !!data?.session
        });

        if (error) {
          console.error('🔐 Giriş hatası:', error);
          throw error;
        }

        console.log('🔐 Giriş başarılı, yönlendiriliyor...');
        showToast('Başarıyla giriş yapıldı!', 'success');
        setLoadingStep('Yönlendiriliyor...');

        // Başarılı giriş sonrası yönlendirme
        setTimeout(() => {
          const redirectPath = next ? `/${locale}${next}` : `/${locale}/dashboard`;
          console.log('🔐 Yönlendirme:', redirectPath);
          // Router.push yerine window.location.href kullan - daha güvenli
          window.location.href = redirectPath;
        }, 1000);
      } else {
        setLoadingStep('Kayıt olunuyor...');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: name,
              last_name: surname,
              birth_date: birthDate,
              gender: gender,
            },
          },
        });

        if (error) {
          throw error;
        }

        if (data.user && !data.user.email_confirmed_at) {
          showToast('Kayıt başarılı! E-posta onayı için kutunuzu kontrol edin.', 'info');
        } else {
          showToast('Kayıt başarılı!', 'success');
        }

        // Form'u temizle ve login moduna geç
        setTimeout(() => {
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
          setSurname('');
          setBirthDate('');
          setGender('');
          setMessage('');
        }, 2000);
      }
    } catch (error: unknown) {
      let errorMessage = 'Bir hata oluştu';

      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Geçersiz e-posta veya şifre';
        } else if (error.message.includes('User already registered')) {
          errorMessage = 'Bu e-posta adresi zaten kayıtlı';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Şifre en az 6 karakter olmalı';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'E-posta adresinizi onaylamanız gerekiyor';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Çok fazla deneme yapıldı. Lütfen bekleyin.';
        } else {
          errorMessage = error.message;
        }
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setLoadingStep('Google ile giriş yapılıyor...');
      setMessage('');
      setErrors({});

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?locale=${locale}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      let errorMessage = 'Google girişi başarısız';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'error');
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Şifre sıfırlama
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    if (!resetEmail) {
      setErrors({ email: 'E-posta adresi gerekli' });
      setLoading(false);
      return;
    }

    try {
      setLoadingStep('Şifre sıfırlama e-postası gönderiliyor...');
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      showToast('Şifre sıfırlama e-postası gönderildi', 'success');
      setShowPasswordReset(false);
      setResetEmail('');
    } catch (error: unknown) {
      let errorMessage = 'Şifre sıfırlama e-postası gönderilemedi';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Ad - Sadece kayıt modunda göster */}
        {!isLogin && (
          <div>
            <input
              type="text"
              placeholder="Adınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        )}

        {/* Soyad - Sadece kayıt modunda göster */}
        {!isLogin && (
          <div>
            <input
              type="text"
              placeholder="Soyadınız"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.surname ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
            />
            {errors.surname && (
              <p className="text-red-400 text-sm mt-1">{errors.surname}</p>
            )}
          </div>
        )}

        {/* Doğum Tarihi - Sadece kayıt modunda göster */}
        {!isLogin && (
          <div>
            <input
              type="date"
              placeholder="Doğum tarihiniz"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.birthDate ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
            />
            {errors.birthDate && (
              <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>
            )}
          </div>
        )}

        {/* Cinsiyet - Sadece kayıt modunda göster */}
        {!isLogin && (
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white focus:outline-none ${
                errors.gender ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
            >
              <option value="" className="bg-night text-white">
                Cinsiyet seçin
              </option>
              <option value="male" className="bg-night text-white">
                Erkek
              </option>
              <option value="female" className="bg-night text-white">
                Kadın
              </option>
              <option value="other" className="bg-night text-white">
                Diğer
              </option>
              <option value="prefer_not_to_say" className="bg-night text-white">
                Belirtmek istemiyorum
              </option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        )}

        <div>
          <input
            type="password"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
            }`}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me - Sadece giriş modunda göster */}
        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-lavender/80 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-gold bg-night/50 border-lavender/30 rounded focus:ring-gold focus:ring-2"
              />
              <span>Beni hatırla</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowPasswordReset(true);
                setResetEmail(email);
              }}
              className="text-gold hover:text-gold/80 text-sm transition-colors"
            >
              Şifremi unuttum
            </button>
          </div>
        )}

        {/* Şifre Onayı - Sadece kayıt modunda göster */}
        {!isLogin && (
          <div>
            <input
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50 relative"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-night/30 border-t-night rounded-full"></div>
              <span>{loadingStep || 'İşleniyor...'}</span>
            </div>
          ) : (
            <span>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</span>
          )}
        </button>
      </form>

      {/* Social Login Butonları */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-lavender/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-night text-lavender/70">
              veya
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full inline-flex justify-center py-3 px-4 border border-lavender/30 rounded-md shadow-sm bg-white/5 text-sm font-medium text-lavender hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </div>
      </div>

      {/* Şifre Sıfırlama Formu */}
      {showPasswordReset && (
        <div className="mt-6 p-4 bg-lavender/5 rounded-lg border border-lavender/20">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Şifre Sıfırlama
            </h2>
            <p className="text-lavender/80 text-sm">
              E-posta adresinize şifre sıfırlama linki gönderilecek
            </p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:outline-none focus:border-gold"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-night/30 border-t-night rounded-full"></div>
                    <span>{loadingStep}</span>
                  </div>
                ) : (
                  'Şifre Sıfırlama E-postası Gönder'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPasswordReset(false);
                  setResetEmail('');
                  setErrors({});
                  setMessage('');
                }}
                className="px-4 py-3 bg-lavender/20 hover:bg-lavender/30 text-lavender rounded font-semibold transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {message && (
        <div
          className={`p-4 rounded-lg text-center ${
            message.includes('başarılı') || message.includes('gönderildi')
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {message}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setErrors({});
            setMessage('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setSurname('');
            setBirthDate('');
            setGender('');
            setLoadingStep('');
            setRememberMe(false);
            setShowPasswordReset(false);
            setResetEmail('');
          }}
          className="text-lavender hover:text-gold transition-colors"
        >
          {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
        </button>
      </div>

      {/* Toast Bildirimi */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </>
  );
}
