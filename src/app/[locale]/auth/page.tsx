/*
 * DOSYA ANALİZİ - AUTH PAGE
 *
 * BAĞLANTILI DOSYALAR:
 * - @/lib/supabase/client.ts (Supabase bağlantısı)
 * - @/hooks/useTranslations.ts (Çeviri hook'u)
 * - messages/tr.json, en.json, sr.json (Çeviri dosyaları)
 *
 * DOSYA AMACI:
 * Kullanıcı girişi ve kayıt işlemlerini yöneten authentication sayfası.
 * Login/Register formu, Supabase auth entegrasyonu ve çoklu dil desteği içerir.
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - supabase.auth.signInWithPassword() - Giriş işlemi
 * - supabase.auth.signUp() - Kayıt işlemi
 * - auth.users tablosu (otomatik Supabase tablosu)
 *
 * GELİŞTİRME ÖNERİLERİ:
 * - Form validasyonu eklenebilir (email format, password strength)
 * - Loading state'leri daha detaylı olabilir
 * - Error handling daha spesifik olabilir
 * - Password reset özelliği eklenebilir
 * - Social login (Google, Facebook) entegrasyonu
 * - Remember me checkbox eklenebilir
 *
 * TESPİT EDİLEN HATALAR:
 * - Linter: Satır 27'de gereksiz boşluklar
 * - Dashboard yönlendirmesi hardcoded (/dashboard)
 * - Error mesajları sadece İngilizce
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Ana authentication sayfası
 * - GÜVENLİ: Production'a hazır
 * - İYİLEŞTİRİLEBİLİR: Form validasyonu ve error handling
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Moon } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import Toast from '@/features/shared/ui/Toast';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';

export default function AuthPage() {
  const { t } = useTranslations();
  const { toast, showToast, hideToast } = useToast();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Pathname'den locale'i çıkar (/tr/auth -> tr)
  const currentLocale = pathname.split('/')[1] || 'tr';
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
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

  const [validationStates, setValidationStates] = useState<{
    email?: 'valid' | 'invalid' | 'checking';
    password?: 'valid' | 'invalid' | 'checking';
    confirmPassword?: 'valid' | 'invalid' | 'checking' | undefined;
    name?: 'valid' | 'invalid' | 'checking';
    surname?: 'valid' | 'invalid' | 'checking';
    birthDate?: 'valid' | 'invalid' | 'checking';
  }>({});

  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: '', color: '' });

  // URL'den hata parametresini kontrol et
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error === 'confirmation_failed') {
      setMessage('E-posta onay linki geçersiz veya süresi dolmuş. Lütfen yeni bir onay e-postası isteyin.');
      // URL'den error parametresini temizle
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error === 'token_expired') {
      setMessage('E-posta onay linkinin süresi dolmuş. Lütfen yeni bir onay e-postası isteyin.');
      // URL'den error parametresini temizle
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [showToast]);

  // Kullanıcı giriş yapmışsa dashboard'a yönlendir
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      // Mevcut pathname'i kontrol et, sadece auth sayfasındaysa yönlendir
      const currentPath = window.location.pathname;
      if (currentPath.includes('/auth')) {
        router.replace('/tr/dashboard');
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

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

  // Şifre sıfırlama fonksiyonu
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    if (!resetEmail) {
      setErrors({ email: t('auth.page.emailRequired') });
      setLoading(false);
      return;
    }

    try {
      setLoadingStep('Şifre sıfırlama e-postası gönderiliyor...');
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/${currentLocale}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      showToast(t('auth.page.resetPasswordEmailSent'), 'success');
      setShowPasswordReset(false);
      setResetEmail('');
    } catch (error: unknown) {
      let errorMessage = t('auth.page.resetPasswordError');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Social login fonksiyonları
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setLoadingStep('Google ile giriş yapılıyor...');
      setMessage('');
      setErrors({});

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/tr`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      let errorMessage = t('auth.page.socialLoginError');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'error');
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setLoadingStep('Facebook ile giriş yapılıyor...');
      setMessage('');
      setErrors({});

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/tr`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      let errorMessage = t('auth.page.socialLoginError');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(errorMessage, 'error');
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Yeni onay e-postası gönderme fonksiyonu
  const resendConfirmationEmail = async (email: string) => {
    try {
      setLoading(true);
      setLoadingStep('Yeni onay e-postası gönderiliyor...');
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/tr/auth/confirm`,
        },
      });

      if (error) {
        throw error;
      }

      setMessage('Yeni onay e-postası gönderildi. Lütfen e-posta kutunuzu kontrol edin.');
    } catch (error: unknown) {
      let errorMessage = 'Onay e-postası gönderilemedi. Lütfen tekrar kayıt olmayı deneyin.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Şifre gücü hesaplama fonksiyonu
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let label = '';
    let color = '';

    if (password.length >= 8) {
      score += 1;
    }
    if (/[a-z]/.test(password)) {
      score += 1;
    }
    if (/[A-Z]/.test(password)) {
      score += 1;
    }
    if (/[0-9]/.test(password)) {
      score += 1;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }
    if (password.length >= 12) {
      score += 1;
    }

    switch (score) {
      case 0:
      case 1:
        label = t('validation.password.strength.weak');
        color = 'text-red-400';
        break;
      case 2:
      case 3:
        label = t('validation.password.strength.medium');
        color = 'text-yellow-400';
        break;
      case 4:
      case 5:
        label = t('validation.password.strength.strong');
        color = 'text-green-400';
        break;
      case 6:
        label = t('validation.password.strength.veryStrong');
        color = 'text-green-500';
        break;
    }

    return { score, label, color };
  };

  // Real-time email validasyonu
  const validateEmailRealTime = async (email: string) => {
    if (!email) {
      return;
    }

    setValidationStates(prev => ({ ...prev, email: 'checking' }));

    // Simüle edilmiş gecikme (gerçek uygulamada API çağrısı olabilir)
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);

      setValidationStates(prev => ({
        ...prev,
        email: isValid ? 'valid' : 'invalid',
      }));
    }, 500);
  };

  // Form validasyonu
  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      name?: string;
      surname?: string;
      birthDate?: string;
      gender?: string;
    } = {};

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = t('auth.page.emailRequired');
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('auth.page.emailInvalid');
    }

    // Şifre validasyonu
    if (!password) {
      newErrors.password = t('auth.page.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('auth.page.passwordMinLength');
    }

    // Kayıt sırasında ek alanlar
    if (!isLogin) {
      // Şifre onayı
      if (!confirmPassword) {
        newErrors.confirmPassword = t('auth.page.confirmPasswordRequired');
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = t('auth.page.passwordsNotMatch');
      }

      // Ad validasyonu
      if (!name.trim()) {
        newErrors.name = t('auth.page.nameRequired');
      } else if (name.trim().length < 2) {
        newErrors.name = t('auth.page.nameMinLength');
      }

      // Soyad validasyonu
      if (!surname.trim()) {
        newErrors.surname = t('auth.page.surnameRequired');
      } else if (surname.trim().length < 2) {
        newErrors.surname = t('auth.page.surnameMinLength');
      }

      // Doğum tarihi validasyonu
      if (!birthDate) {
        newErrors.birthDate = t('auth.page.birthDateRequired');
      } else {
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        if (age < 13) {
          newErrors.birthDate = t('auth.page.birthDateMinAge');
        } else if (age > 120) {
          newErrors.birthDate = t('auth.page.birthDateMaxAge');
        }
      }

      // Cinsiyet validasyonu
      if (!gender) {
        newErrors.gender = t('auth.page.genderRequired');
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
    // Form validasyonu
    setLoadingStep(t('auth.page.validating'));
    if (!validateForm()) {
      setLoading(false);
      setLoadingStep('');
      return;
    }

    try {
      if (isLogin) {
        // Giriş işlemi
        setLoadingStep(t('auth.page.loggingIn'));
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        showToast(t('auth.page.successLogin'), 'success');

        // Başarılı giriş sonrası ana sayfaya yönlendir
        setTimeout(() => {
          window.location.href = '/tr'; // Locale ile birlikte ana sayfa
        }, 2000); // Toast'ın görünmesi için biraz daha uzun
      } else {
        // Kayıt işlemi
        setLoadingStep(t('auth.page.registering'));
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

        // Profil otomatik olarak trigger ile oluşturuluyor
        if (data.user) {
        }

        // E-posta onayı gerekiyorsa kullanıcıya bilgi ver
        if (data.user && !data.user.email_confirmed_at) {
          showToast(t('auth.notice.checkEmail'), 'info');
        } else {
          showToast(t('auth.page.successRegister'), 'success');
        }

        // Kayıt sonrası giriş moduna geç
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
      let errorMessage = t('auth.page.errorOccurred');

      if (error instanceof Error) {

        // Supabase hata mesajlarını Türkçe'ye çevir
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = t('auth.page.invalidCredentials');
        } else if (error.message.includes('User already registered')) {
          errorMessage = t('auth.page.userAlreadyExists');
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = t('auth.page.passwordMinLength');
        } else if (error.message.includes('Database error saving new user')) {
          errorMessage =
            'Kullanıcı kaydı sırasında veritabanı hatası oluştu. Lütfen daha sonra tekrar deneyin veya farklı bir e-posta adresi kullanın.';
        } else if (error.message.includes('unexpected_failure')) {
          errorMessage =
            'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage =
            'E-posta adresinizi onaylamanız gerekiyor. Lütfen e-posta kutunuzu kontrol edin.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage =
            'Çok fazla deneme yapıldı. Lütfen birkaç dakika bekleyip tekrar deneyin.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage =
            'Geçersiz e-posta adresi. Lütfen doğru bir e-posta adresi girin.';
        } else {
          errorMessage = `Kayıt işlemi sırasında bir hata oluştu: ${
            error.message
          }`;
        }
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Auth durumu yüklenirken loading göster
  if (authLoading) {
    return (
      <div className='min-h-screen bg-night flex items-center justify-center p-4 pb-20'>
        <div className='max-w-md w-full bg-lavender/10 backdrop-blur-sm rounded-lg p-8 border border-lavender/20 text-center'>
          <Moon className='h-12 w-12 text-gold mx-auto mb-4 animate-pulse' />
          <div className='text-white text-lg mb-4'>
            {t('auth.page.checkingAuth')}
          </div>
          <div className='animate-spin w-8 h-8 border-2 border-lavender/30 border-t-gold rounded-full mx-auto'></div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-night flex items-center justify-center p-4 pb-20'>
      <div className='max-w-md w-full bg-lavender/10 backdrop-blur-sm rounded-lg p-8 border border-lavender/20'>
        <div className='text-center mb-8'>
          <Moon className='h-12 w-12 text-gold mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-white'>
            {isLogin
              ? t('auth.page.mysticalEntry')
              : t('auth.page.journeyStart')}
          </h1>
        </div>

        <form onSubmit={handleAuth} className='space-y-4'>
          <div>
            <div className='relative'>
              <input
                type='email'
                placeholder={t('auth.page.emailPlaceholder')}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (e.target.value.length > 3) {
                    validateEmailRealTime(e.target.value);
                  }
                }}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.email
                    ? 'border-red-500'
                    : validationStates.email === 'valid'
                      ? 'border-green-500'
                      : validationStates.email === 'invalid'
                        ? 'border-red-500'
                        : 'border-lavender/30 focus:border-gold'
                }`}
              />
              {validationStates.email === 'checking' && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <div className='animate-spin w-4 h-4 border-2 border-lavender/30 border-t-gold rounded-full'></div>
                </div>
              )}
              {validationStates.email === 'valid' && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2 text-green-400'>
                  ✓
                </div>
              )}
              {validationStates.email === 'invalid' && email.length > 3 && (
                <div className='absolute right-3 top-1/2 -translate-y-1/2 text-red-400'>
                  ✗
                </div>
              )}
            </div>
            {errors.email && (
              <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
            )}
            {validationStates.email === 'valid' && !errors.email && (
              <p className='text-green-400 text-sm mt-1'>
                {t('validation.realTime.valid')}
              </p>
            )}
          </div>

          {/* Ad - Sadece kayıt modunda göster */}
          {!isLogin && (
            <div>
              <input
                type='text'
                placeholder={t('auth.page.namePlaceholder')}
                value={name}
                onChange={e => setName(e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-lavender/30 focus:border-gold'
                }`}
              />
              {errors.name && (
                <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
              )}
            </div>
          )}

          {/* Soyad - Sadece kayıt modunda göster */}
          {!isLogin && (
            <div>
              <input
                type='text'
                placeholder={t('auth.page.surnamePlaceholder')}
                value={surname}
                onChange={e => setSurname(e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.surname
                    ? 'border-red-500'
                    : 'border-lavender/30 focus:border-gold'
                }`}
              />
              {errors.surname && (
                <p className='text-red-400 text-sm mt-1'>{errors.surname}</p>
              )}
            </div>
          )}

          {/* Doğum Tarihi - Sadece kayıt modunda göster */}
          {!isLogin && (
            <div>
              <input
                type='date'
                placeholder={t('auth.page.birthDatePlaceholder')}
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.birthDate
                    ? 'border-red-500'
                    : 'border-lavender/30 focus:border-gold'
                }`}
              />
              {errors.birthDate && (
                <p className='text-red-400 text-sm mt-1'>{errors.birthDate}</p>
              )}
            </div>
          )}

          {/* Cinsiyet - Sadece kayıt modunda göster */}
          {!isLogin && (
            <div>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white focus:outline-none ${
                  errors.gender
                    ? 'border-red-500'
                    : 'border-lavender/30 focus:border-gold'
                }`}
              >
                <option value='' className='bg-night text-white'>
                  {t('auth.page.genderPlaceholder')}
                </option>
                <option value='male' className='bg-night text-white'>
                  {t('auth.page.genderMale')}
                </option>
                <option value='female' className='bg-night text-white'>
                  {t('auth.page.genderFemale')}
                </option>
                <option value='other' className='bg-night text-white'>
                  {t('auth.page.genderOther')}
                </option>
                <option
                  value='prefer_not_to_say'
                  className='bg-night text-white'
                >
                  {t('auth.page.genderPreferNotToSay')}
                </option>
              </select>
              {errors.gender && (
                <p className='text-red-400 text-sm mt-1'>{errors.gender}</p>
              )}
            </div>
          )}

          <div>
            <input
              type='password'
              placeholder={t('auth.page.passwordPlaceholder')}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (e.target.value.length > 0) {
                  setPasswordStrength(
                    calculatePasswordStrength(e.target.value)
                  );
                } else {
                  setPasswordStrength({ score: 0, label: '', color: '' });
                }
              }}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.password
                  ? 'border-red-500'
                  : 'border-lavender/30 focus:border-gold'
              }`}
            />
            {password.length > 0 && (
              <div className='mt-2'>
                <div className='flex items-center justify-between text-xs mb-1'>
                  <span className='text-lavender/70'>Şifre Gücü:</span>
                  <span className={passwordStrength.color}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className='w-full bg-lavender/20 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score <= 1
                        ? 'bg-red-500'
                        : passwordStrength.score <= 3
                          ? 'bg-yellow-500'
                          : passwordStrength.score <= 5
                            ? 'bg-green-500'
                            : 'bg-green-600'
                    }`}
                    style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {errors.password && (
              <p className='text-red-400 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Remember Me - Sadece giriş modunda göster */}
          {isLogin && (
            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-2 text-lavender/80 text-sm cursor-pointer'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className='w-4 h-4 text-gold bg-night/50 border-lavender/30 rounded focus:ring-gold focus:ring-2'
                />
                <span>{t('auth.page.rememberMe')}</span>
              </label>
              <button
                type='button'
                onClick={() => {
                  setShowPasswordReset(true);
                  setResetEmail(email); // Mevcut email'i kullan
                }}
                className='text-gold hover:text-gold/80 text-sm transition-colors'
              >
                {t('auth.page.forgotPassword')}
              </button>
            </div>
          )}

          {!isLogin && (
            <div>
              <div className='relative'>
                <input
                  type='password'
                  placeholder={t('auth.page.confirmPasswordPlaceholder')}
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value.length > 0) {
                      const isValid = e.target.value === password;
                      setValidationStates(prev => ({
                        ...prev,
                        confirmPassword: isValid ? 'valid' : 'invalid',
                      }));
                    } else {
                      setValidationStates(prev => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : validationStates.confirmPassword === 'valid'
                        ? 'border-green-500'
                        : validationStates.confirmPassword === 'invalid'
                          ? 'border-red-500'
                          : 'border-lavender/30 focus:border-gold'
                  }`}
                />
                {validationStates.confirmPassword === 'valid' && (
                  <div className='absolute right-3 top-1/2 -translate-y-1/2 text-green-400'>
                    ✓
                  </div>
                )}
                {validationStates.confirmPassword === 'invalid' &&
                  confirmPassword.length > 0 && (
                    <div className='absolute right-3 top-1/2 -translate-y-1/2 text-red-400'>
                      ✗
                    </div>
                  )}
              </div>
              {errors.confirmPassword && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
              {validationStates.confirmPassword === 'valid' &&
                !errors.confirmPassword && (
                  <p className='text-green-400 text-sm mt-1'>
                    {t('validation.realTime.valid')}
                  </p>
                )}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50 relative'
          >
            {loading ? (
              <div className='flex items-center justify-center gap-3'>
                <div className='animate-spin w-5 h-5 border-2 border-night/30 border-t-night rounded-full'></div>
                <span>{loadingStep || t('auth.page.processing')}</span>
              </div>
            ) : (
              <span>
                {isLogin ? t('auth.page.signIn') : t('auth.page.signUp')}
              </span>
            )}
          </button>
        </form>

        {/* Social Login Butonları */}
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-lavender/20'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-night text-lavender/70'>
                {t('auth.page.orContinueWith')}
              </span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button
              type='button'
              onClick={handleGoogleLogin}
              disabled={loading}
              className='w-full inline-flex justify-center py-3 px-4 border border-lavender/30 rounded-md shadow-sm bg-white/5 text-sm font-medium text-lavender hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transition-colors'
            >
              <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              {isLogin
                ? t('auth.page.googleSignIn')
                : t('auth.page.googleSignUp')}
            </button>

            <button
              type='button'
              onClick={handleFacebookLogin}
              disabled={loading}
              className='w-full inline-flex justify-center py-3 px-4 border border-lavender/30 rounded-md shadow-sm bg-white/5 text-sm font-medium text-lavender hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transition-colors'
            >
              <svg
                className='w-5 h-5 mr-2'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
              </svg>
              {isLogin
                ? t('auth.page.facebookSignIn')
                : t('auth.page.facebookSignUp')}
            </button>
          </div>
        </div>

        {/* Şifre Sıfırlama Formu */}
        {showPasswordReset && (
          <div className='mt-6 p-4 bg-lavender/5 rounded-lg border border-lavender/20'>
            <div className='text-center mb-4'>
              <h2 className='text-lg font-semibold text-white mb-2'>
                {t('auth.page.resetPasswordTitle')}
              </h2>
              <p className='text-lavender/80 text-sm'>
                {t('auth.page.resetPasswordSubtitle')}
              </p>
            </div>

            <form onSubmit={handlePasswordReset} className='space-y-4'>
              <div>
                <input
                  type='email'
                  placeholder={t('auth.page.emailPlaceholder')}
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  className='w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:outline-none focus:border-gold'
                />
                {errors.email && (
                  <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
                )}
              </div>

              <div className='flex gap-3'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50'
                >
                  {loading ? (
                    <div className='flex items-center justify-center gap-2'>
                      <div className='animate-spin w-4 h-4 border-2 border-night/30 border-t-night rounded-full'></div>
                      <span>{loadingStep}</span>
                    </div>
                  ) : (
                    t('auth.page.resetPassword')
                  )}
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setShowPasswordReset(false);
                    setResetEmail('');
                    setErrors({});
                    setMessage('');
                  }}
                  className='px-4 py-3 bg-lavender/20 hover:bg-lavender/30 text-lavender rounded font-semibold transition-colors'
                >
                  {t('auth.page.backToLogin')}
                </button>
              </div>
            </form>
          </div>
        )}

        {message && (
          <div
            className={`p-4 rounded-lg text-center ${
              message.includes(t('auth.page.successLogin')) ||
              message.includes(t('auth.page.successRegister')) ||
              message.includes(t('auth.notice.confirmationEmailSent'))
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            <div className='mb-3'>{message}</div>

            {/* E-posta onay mesajı ise e-posta açma butonları göster */}
            {message.includes(t('auth.notice.confirmationEmailSent')) &&
              email && (
                <div className='flex flex-wrap gap-2 justify-center'>
                  <button
                    type='button'
                    onClick={() =>
                      window.open(
                        `https://mail.google.com/mail/u/0/#search/from%3Asupabase`,
                        '_blank'
                      )
                    }
                    className='px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm hover:bg-red-500/30 transition-colors'
                  >
                    {t('auth.notice.openGmail')}
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      window.open(`https://outlook.live.com/mail/0/`, '_blank')
                    }
                    className='px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition-colors'
                  >
                    {t('auth.notice.openOutlook')}
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      window.open(`https://mail.yahoo.com/`, '_blank')
                    }
                    className='px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30 transition-colors'
                  >
                    {t('auth.notice.openYahoo')}
                  </button>
                  <button
                    type='button'
                    onClick={() => window.open(`mailto:`, '_blank')}
                    className='px-3 py-1 bg-gray-500/20 text-gray-300 rounded text-sm hover:bg-gray-500/30 transition-colors'
                  >
                    {t('auth.notice.openEmailApp')}
                  </button>
                </div>
              )}

            {/* E-posta onay hatası mesajı ise yeni onay e-postası gönderme butonu göster */}
            {(message.includes('E-posta onay linki geçersiz') || message.includes('süresi dolmuş')) && email && (
              <div className='flex justify-center gap-2 mt-3'>
                <button
                  type='button'
                  onClick={() => resendConfirmationEmail(email)}
                  disabled={loading}
                  className='px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition-colors disabled:opacity-50'
                >
                  {loading ? 'Gönderiliyor...' : 'Yeni Onay E-postası Gönder'}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setMessage('');
                    setIsLogin(false);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setName('');
                    setSurname('');
                    setBirthDate('');
                    setGender('');
                  }}
                  className='px-4 py-2 bg-green-500/20 text-green-300 rounded text-sm hover:bg-green-500/30 transition-colors'
                >
                  Tekrar Kayıt Ol
                </button>
              </div>
            )}
          </div>
        )}

        <div className='text-center mt-6'>
          <button
            type='button'
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
              setValidationStates({});
              setPasswordStrength({ score: 0, label: '', color: '' });
              setLoadingStep('');
              setRememberMe(false);
              setShowPasswordReset(false);
              setResetEmail('');
            }}
            className='text-lavender hover:text-gold transition-colors'
          >
            {isLogin ? t('auth.page.noAccount') : t('auth.page.hasAccount')}
          </button>
        </div>
      </div>

      {/* Toast Bildirimi */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
