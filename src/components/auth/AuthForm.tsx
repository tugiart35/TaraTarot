/*
 * AuthForm - Refactored Client Component
 * 
 * Bu dosya yeni utility'ler kullanılarak refactor edilmiş auth form component'idir.
 * Modern React patterns, hooks ve centralized services kullanır.
 */

'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRememberMe } from '@/hooks/auth/useRememberMe';
import { getAuthErrorMessage } from '@/lib/auth/auth-error-messages';
import type { LoginFormData, RegisterFormData } from '@/lib/auth/auth-validation';
import { validateEmail, validatePasswordStrength } from '@/lib/auth/auth-validation';
import Toast from '@/features/shared/ui/Toast';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';

interface AuthFormProps {
  locale: string;
  initialError: string | null;
  next: string | null;
}

function AuthForm({ locale, initialError, next }: AuthFormProps) {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const { loading: authLoading, signIn, signUp, signInWithGoogle, resetPassword, clearError } = useAuth();
  const { updateRememberMe, loadSavedEmail } = useRememberMe();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [message, setMessage] = useState('');

  // Form states
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initial error handling
  useEffect(() => {
    if (initialError) {
      const errorMessage = initialError === 'callback_failed' 
        ? 'Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.'
        : initialError;
      setMessage(errorMessage);
    }
  }, [initialError]);

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = loadSavedEmail();
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, [loadSavedEmail]);

  // Clear errors when switching modes
  useEffect(() => {
    setErrors({});
    setMessage('');
    clearError();
  }, [isLogin, clearError]);

  // Form validation - memoized
  const validateForm = useCallback((data: any): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Password validation
    if (!data.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (data.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    } else if (!isLogin) {
      // Enhanced password validation for registration
      const passwordValidation = validatePasswordStrength(data.password);
      if (!passwordValidation.isValid && passwordValidation.errors.length > 0) {
        newErrors.password = passwordValidation.errors[0] || 'Şifre geçersiz';
      }
    }

    // Registration-specific validations
    if (!isLogin) {
      const registerData = data as RegisterFormData;

      // Confirm password
      if (!registerData.confirmPassword) {
        newErrors.confirmPassword = 'Şifre onayı gerekli';
      } else if (registerData.password !== registerData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }

      // Name validation
      if (!registerData.name?.trim()) {
        newErrors.name = 'Ad gerekli';
      } else if (registerData.name.trim().length < 2) {
        newErrors.name = 'Ad en az 2 karakter olmalı';
      }

      // Surname validation
      if (!registerData.surname?.trim()) {
        newErrors.surname = 'Soyad gerekli';
      } else if (registerData.surname.trim().length < 2) {
        newErrors.surname = 'Soyad en az 2 karakter olmalı';
      }

      // Birth date validation
      if (!registerData.birthDate) {
        newErrors.birthDate = 'Doğum tarihi gerekli';
      } else {
        const age = new Date().getFullYear() - new Date(registerData.birthDate).getFullYear();
        if (age < 13) {
          newErrors.birthDate = 'En az 13 yaşında olmalısınız';
        } else if (age > 120) {
          newErrors.birthDate = 'Geçerli bir yaş girin';
        }
      }

      // Gender validation
      if (!registerData.gender) {
        newErrors.gender = 'Cinsiyet seçimi gerekli';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [isLogin]);

  // Form submission - memoized
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});
    setLoadingStep('Doğrulanıyor...');

    if (!validateForm(formData)) {
      setLoading(false);
      setLoadingStep('');
      return;
    }

    try {
      if (isLogin) {
        setLoadingStep('Giriş yapılıyor...');
        
        await signIn(formData.email, formData.password);
        
        // Update remember me
        if ('rememberMe' in formData && formData.rememberMe) {
          updateRememberMe(formData.email, true);
        }

        showToast('Başarıyla giriş yapıldı!', 'success');
        setLoadingStep('Yönlendiriliyor...');

        // Navigate using Next.js router
        setTimeout(() => {
          const redirectPath = next ? `/${locale}${next}` : `/${locale}/dashboard`;
          router.push(redirectPath);
        }, 1000);
      } else {
        setLoadingStep('Kayıt olunuyor...');
        
        await signUp(formData as RegisterFormData);
        
        showToast('Kayıt başarılı! E-posta onayı için kutunuzu kontrol edin.', 'info');

        // Switch to login mode and clear form
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            email: '',
            password: '',
            rememberMe: false,
          });
          setMessage('');
        }, 2000);
      }
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  }, [isLogin, formData, signIn, signUp, signInWithGoogle, resetPassword, locale, next, router, showToast, getAuthErrorMessage, validateForm]);

  // Google login - memoized
  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingStep('Google ile giriş yapılıyor...');
      setMessage('');
      setErrors({});

      await signInWithGoogle(locale);
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      showToast(errorMessage, 'error');
      setLoading(false);
      setLoadingStep('');
    }
  }, [signInWithGoogle, locale, showToast, getAuthErrorMessage]);

  // Password reset - memoized
  const handlePasswordReset = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    const resetEmail = (e.target as any).resetEmail?.value;
    if (!resetEmail) {
      setErrors({ email: 'E-posta adresi gerekli' });
      setLoading(false);
      return;
    }

    try {
      setLoadingStep('Şifre sıfırlama e-postası gönderiliyor...');
      
      await resetPassword(resetEmail, locale);
      
      showToast('Şifre sıfırlama e-postası gönderildi', 'success');
      setShowPasswordReset(false);
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  }, [formData.email, resetPassword, locale, showToast, getAuthErrorMessage]);

  // Input change handler - memoized
  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Switch between login/register - memoized
  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin);
    setErrors({});
    setMessage('');
    
    if (isLogin) {
      // Switching to register - add required fields
      setFormData({
        email: formData.email,
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        birthDate: '',
        gender: 'male' as const,
        rememberMe: false,
      });
    } else {
      // Switching to login - remove extra fields
      setFormData({
        email: formData.email,
        password: '',
        rememberMe: false,
      });
    }
  }, [isLogin, formData.email]);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
            }`}
            aria-label="E-posta adresi"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Registration Fields */}
        {!isLogin && (
          <>
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Adınız"
                value={(formData as RegisterFormData).name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
                }`}
                aria-label="Ad"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Surname Input */}
            <div>
              <input
                type="text"
                placeholder="Soyadınız"
                value={(formData as RegisterFormData).surname || ''}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.surname ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
                }`}
                aria-label="Soyad"
                aria-describedby={errors.surname ? "surname-error" : undefined}
                aria-invalid={!!errors.surname}
              />
              {errors.surname && (
                <p id="surname-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.surname}
                </p>
              )}
            </div>

            {/* Birth Date Input */}
            <div>
              <input
                type="date"
                value={(formData as RegisterFormData).birthDate || ''}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                  errors.birthDate ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
                }`}
                aria-label="Doğum tarihi"
                aria-describedby={errors.birthDate ? "birthdate-error" : undefined}
                aria-invalid={!!errors.birthDate}
              />
              {errors.birthDate && (
                <p id="birthdate-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.birthDate}
                </p>
              )}
            </div>

            {/* Gender Select */}
            <div>
              <select
                value={(formData as RegisterFormData).gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other' | 'prefer_not_to_say')}
                className={`w-full p-3 rounded bg-night/50 border text-white focus:outline-none ${
                  errors.gender ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
                }`}
                aria-label="Cinsiyet"
                aria-describedby={errors.gender ? "gender-error" : undefined}
                aria-invalid={!!errors.gender}
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
                <p id="gender-error" className="text-red-400 text-sm mt-1" role="alert">
                  {errors.gender}
                </p>
              )}
            </div>
          </>
        )}

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Şifreniz"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
            }`}
            aria-label="Şifre"
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p id="password-error" className="text-red-400 text-sm mt-1" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-lavender/80 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={'rememberMe' in formData ? (formData.rememberMe || false) : false}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="w-4 h-4 text-gold bg-night/50 border-lavender/30 rounded focus:ring-gold focus:ring-2"
                aria-label="Beni hatırla"
              />
              <span>Beni hatırla</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowPasswordReset(true);
              }}
              className="text-gold hover:text-gold/80 text-sm transition-colors"
              aria-label="Şifremi unuttum"
            >
              Şifremi unuttum
            </button>
          </div>
        )}

        {/* Confirm Password - Registration only */}
        {!isLogin && (
          <div>
            <input
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={(formData as RegisterFormData).confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full p-3 rounded bg-night/50 border text-white placeholder-lavender/70 focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-lavender/30 focus:border-gold'
              }`}
              aria-label="Şifre onayı"
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || authLoading}
          className="w-full bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50 relative"
          aria-label={isLogin ? 'Giriş yap' : 'Kayıt ol'}
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

      {/* Social Login */}
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
            disabled={loading || authLoading}
            className="w-full inline-flex justify-center py-3 px-4 border border-lavender/30 rounded-md shadow-sm bg-white/5 text-sm font-medium text-lavender hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transition-colors"
            aria-label={`Google ile ${isLogin ? 'giriş yap' : 'kayıt ol'}`}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
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

      {/* Password Reset Modal */}
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
              name="resetEmail"
              placeholder="E-posta adresiniz"
              defaultValue={formData.email || ''}
              className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:outline-none focus:border-gold"
              aria-label="Şifre sıfırlama e-posta adresi"
            />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gold hover:bg-gold/90 text-night py-3 rounded font-semibold transition-colors disabled:opacity-50"
                aria-label="Şifre sıfırlama e-postası gönder"
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
                  setErrors({});
                  setMessage('');
                }}
                className="px-4 py-3 bg-lavender/20 hover:bg-lavender/30 text-lavender rounded font-semibold transition-colors"
                aria-label="İptal"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div
          className={`p-4 rounded-lg text-center ${
            message.includes('başarılı') || message.includes('gönderildi')
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Mode Toggle */}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={toggleMode}
          className="text-lavender hover:text-gold transition-colors"
          aria-label={isLogin ? 'Kayıt olmaya geç' : 'Giriş yapmaya geç'}
        >
          {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </>
  );
}

// Memoized export
export default memo(AuthForm);
