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

interface AuthFormProps {
  locale: string;
  initialError: string | null;
  next: string | null;
}

function AuthForm({ locale, initialError, next }: AuthFormProps) {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const { loading: authLoading, signIn, signUp, signInWithGoogle, resetPassword, resendConfirmation, clearError } = useAuth();
  const { updateRememberMe, loadSavedEmail } = useRememberMe();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  
  const [message, setMessage] = useState('');
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Form states
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
    rememberMe: false,
  } as LoginFormData);

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
    const loadEmail = async () => {
      const savedEmail = await loadSavedEmail();
      if (savedEmail) {
        setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
      }
    };
    loadEmail();
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
        
        try {
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
        } catch (error: any) {
          console.log('Sign in error caught:', { 
            message: error.message, 
            error: error,
            includesEmailNotConfirmed: error.message?.includes('Email not confirmed'),
            includesTurkishMessage: error.message?.includes('E-posta adresinizi onaylamanız gerekiyor')
          });
          
          // E-posta onaylanmamış kullanıcılar için özel handling
          if (error.message?.includes('Email not confirmed') || 
              error.message?.includes('E-posta adresinizi onaylamanız gerekiyor')) {
            console.log('Setting up resend email UI');
            setMessage('E-posta adresinizi onaylamanız gerekiyor. Onay e-postasını tekrar göndermek ister misiniz?');
            setShowResendEmail(true);
            setPendingEmail(formData.email);
            console.log('State updated:', { 
              showResendEmail: true, 
              pendingEmail: formData.email,
              message: 'E-posta adresinizi onaylamanız gerekiyor. Onay e-postasını tekrar göndermek ister misiniz?'
            });
          } else {
            console.log('Throwing error to normal error handling');
            throw error; // Diğer hataları normal error handling'e bırak
          }
        }
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
      // Sadece gerçek RateLimitError için özel işlem
      if (error instanceof Error && error.name === 'RateLimitError') {
        const retryAfter = (error as any).retryAfter || 60;
        setRateLimitError('Çok fazla deneme yapıldı. Lütfen birkaç dakika bekleyip tekrar deneyin.');
        setRetryAfter(retryAfter);
        
        // Countdown timer
        const interval = setInterval(() => {
          setRetryAfter(prev => {
            if (prev && prev <= 1) {
              clearInterval(interval);
              setRateLimitError(null);
              return null;
            }
            return prev ? prev - 1 : null;
          });
        }, 1000);
        
        showToast('Rate limit aşıldı. Lütfen bekleyin.', 'warning');
      } else {
        // Normal hatalar için standart işlem
        const errorMessage = getAuthErrorMessage(error as Error, locale);
        showToast(errorMessage, 'error');
      }
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

  // Resend email confirmation - memoized
  const handleResendEmail = useCallback(async () => {
    console.log('handleResendEmail called', { pendingEmail, showResendEmail });
    
    if (!pendingEmail) {
      console.log('No pending email, returning');
      return;
    }
    
    try {
      console.log('Starting resend email process');
      setLoading(true);
      setLoadingStep('E-posta gönderiliyor...');
      setMessage('');
      
      console.log('Calling resendConfirmation with:', pendingEmail);
      await resendConfirmation(pendingEmail);
      
      console.log('Resend confirmation successful');
      showToast('Onay e-postası tekrar gönderildi!', 'success');
      setShowResendEmail(false);
      setPendingEmail('');
    } catch (error: unknown) {
      console.error('Resend confirmation error:', error);
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      showToast(errorMessage, 'error');
      setMessage(errorMessage);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  }, [pendingEmail, resendConfirmation, showToast, getAuthErrorMessage, locale]);

  // Password reset - memoized
  const handlePasswordReset = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});

    const formData = new FormData(e.target as HTMLFormElement);
    const resetEmail = formData.get('resetEmail') as string;
    
    if (!resetEmail) {
      setErrors({ email: 'E-posta adresi gerekli' });
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setErrors({ email: 'Geçerli bir e-posta adresi girin' });
      setLoading(false);
      return;
    }

    try {
      setLoadingStep('Şifre sıfırlama e-postası gönderiliyor...');
      
      await resetPassword(resetEmail, locale);
      
      showToast('Şifre sıfırlama e-postası gönderildi! E-posta kutunuzu kontrol edin.', 'success');
      setShowPasswordReset(false);
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage(error as Error, locale);
      showToast(errorMessage, 'error');
      setErrors({ email: errorMessage });
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  }, [resetPassword, locale, showToast, getAuthErrorMessage]);

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
      {/* Rate Limit Warning */}
      {rateLimitError && (
        <div className="mb-6 p-4 bg-orange-100 border border-orange-300 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="text-orange-600 text-xl">⏰</div>
            <div className="flex-1">
              <p className="text-orange-800 font-medium">{rateLimitError}</p>
              {retryAfter && (
                <p className="text-orange-700 text-sm mt-1">
                  Tekrar deneyebilirsiniz: {retryAfter} saniye
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative mb-6">
          {/* Mystical input container */}
          <div className="relative">
            {/* Input glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            {/* Input icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
              ✉️
            </div>
            
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                errors.email ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
              }`}
              aria-label="E-posta adresi"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
            />
            
            {/* Mystical border animation */}
            <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
              errors.email ? 'border-red-500/50' : 'border-gold/20'
            }`}></div>
          </div>
          
          {errors.email && (
            <p id="email-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
              <span>⚠️</span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Registration Fields */}
        {!isLogin && (
          <>
            {/* Name Input */}
            <div className="relative mb-6">
              {/* Mystical input container */}
              <div className="relative">
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Input icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
                  👤
                </div>
                
                <input
                  type="text"
                  placeholder="Adınız"
                  value={(formData as RegisterFormData).name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                    errors.name ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
                  }`}
                  aria-label="Ad"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                
                {/* Mystical border animation */}
                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                  errors.name ? 'border-red-500/50' : 'border-gold/20'
                }`}></div>
              </div>
              
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
                  <span>⚠️</span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Surname Input */}
            <div className="relative mb-6">
              {/* Mystical input container */}
              <div className="relative">
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Input icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
                  👥
                </div>
                
                <input
                  type="text"
                  placeholder="Soyadınız"
                  value={(formData as RegisterFormData).surname || ''}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                    errors.surname ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
                  }`}
                  aria-label="Soyad"
                  aria-describedby={errors.surname ? "surname-error" : undefined}
                  aria-invalid={!!errors.surname}
                />
                
                {/* Mystical border animation */}
                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                  errors.surname ? 'border-red-500/50' : 'border-gold/20'
                }`}></div>
              </div>
              
              {errors.surname && (
                <p id="surname-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
                  <span>⚠️</span>
                  {errors.surname}
                </p>
              )}
            </div>

            {/* Birth Date Input */}
            <div className="relative mb-6">
              {/* Mystical input container */}
              <div className="relative">
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Input icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
                  🎂
                </div>
                
                <input
                  type="date"
                  value={(formData as RegisterFormData).birthDate || ''}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                    errors.birthDate ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
                  }`}
                  aria-label="Doğum tarihi"
                  aria-describedby={errors.birthDate ? "birthdate-error" : undefined}
                  aria-invalid={!!errors.birthDate}
                />
                
                {/* Mystical border animation */}
                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                  errors.birthDate ? 'border-red-500/50' : 'border-gold/20'
                }`}></div>
              </div>
              
              {errors.birthDate && (
                <p id="birthdate-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
                  <span>⚠️</span>
                  {errors.birthDate}
                </p>
              )}
            </div>

            {/* Gender Select */}
            <div className="relative mb-6">
              {/* Mystical input container */}
              <div className="relative">
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                {/* Input icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
                  ⚧
                </div>
                
                <select
                  value={(formData as RegisterFormData).gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other' | 'prefer_not_to_say')}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                    errors.gender ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
                  }`}
                  aria-label="Cinsiyet"
                  aria-describedby={errors.gender ? "gender-error" : undefined}
                  aria-invalid={!!errors.gender}
                >
                  <option value="" className="bg-white text-black">
                    Cinsiyet seçin
                  </option>
                  <option value="male" className="bg-white text-black">
                    👨 Erkek
                  </option>
                  <option value="female" className="bg-white text-black">
                    👩 Kadın
                  </option>
                  <option value="other" className="bg-white text-black">
                    🏳️‍⚧️ Diğer
                  </option>
                  <option value="prefer_not_to_say" className="bg-white text-black">
                    🤐 Belirtmek istemiyorum
                  </option>
                </select>
                
                {/* Mystical border animation */}
                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                  errors.gender ? 'border-red-500/50' : 'border-gold/20'
                }`}></div>
              </div>
              
              {errors.gender && (
                <p id="gender-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
                  <span>⚠️</span>
                  {errors.gender}
                </p>
              )}
            </div>
          </>
        )}

        {/* Password Input */}
        <div className="relative mb-6">
          {/* Mystical input container */}
          <div className="relative">
            {/* Input glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            {/* Input icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
              🔒
            </div>
            
            <input
              type="password"
              placeholder="Şifreniz"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                errors.password ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
              }`}
              aria-label="Şifre"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
            />
            
            {/* Mystical border animation */}
            <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
              errors.password ? 'border-red-500/50' : 'border-gold/20'
            }`}></div>
          </div>
          
          {errors.password && (
            <p id="password-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
              <span>⚠️</span>
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        {isLogin && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <label className="flex items-center gap-3 text-black text-sm cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isLogin ? (formData as LoginFormData).rememberMe || false : false}
                  onChange={(e) => {
                    if (isLogin) {
                      handleInputChange('rememberMe', e.target.checked);
                    }
                  }}
                  className="sr-only"
                  aria-label="Beni hatırla"
                />
                <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-md flex items-center justify-center transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-sm">
                  {isLogin && (formData as LoginFormData).rememberMe && (
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Beni hatırla</span>
            </label>
            
            {/* Şifremi Unuttum Butonu */}
            <button
              type="button"
              onClick={() => setShowPasswordReset(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
              aria-label="Şifremi unuttum"
            >
              Şifremi Unuttum
            </button>
          </div>
        )}

        {/* Confirm Password - Registration only */}
        {!isLogin && (
          <div className="relative mb-6">
            {/* Mystical input container */}
            <div className="relative">
              {/* Input glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Input icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavender/60">
                🔐
              </div>
              
              <input
                type="password"
                placeholder="Şifrenizi tekrar girin"
                value={(formData as RegisterFormData).confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/90 to-gray-100/90 border text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300 hover:from-gray-200/90 hover:to-gray-300/90 group relative z-10 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500/40' : 'border-lavender/30 focus:border-gold'
                }`}
                aria-label="Şifre onayı"
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                aria-invalid={!!errors.confirmPassword}
              />
              
              {/* Mystical border animation */}
              <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                errors.confirmPassword ? 'border-red-500/50' : 'border-gold/20'
              }`}></div>
            </div>
            
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-red-400 text-sm mt-2 flex items-center gap-1" role="alert">
                <span>⚠️</span>
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Mystical Submit Button */}
        <div className="relative mb-6">
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-lavender/20 to-purple-400/20 rounded-xl blur-md opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
          
          <button
            type="submit"
            disabled={loading || authLoading || !!rateLimitError}
            className="relative w-full bg-gradient-to-r from-gold via-yellow-400 to-amber-400 hover:from-gold/90 hover:via-yellow-500 hover:to-amber-500 text-night py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:shadow-gold/30 transform hover:scale-105 active:scale-95 overflow-hidden"
            aria-label={isLogin ? 'Giriş yap' : 'Kayıt ol'}
          >
            {/* Mystical shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {loading ? (
              <div className="flex items-center justify-center gap-3 relative z-10">
                <div className="animate-spin w-5 h-5 border-2 border-night/30 border-t-night rounded-full"></div>
                <span>{loadingStep || 'İşleniyor...'}</span>
              </div>
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLogin ? '🔮 Giriş Yap' : '✨ Kayıt Ol'}
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Social Login */}
      <div className="mt-6">
        <div className="relative my-8">
          {/* Mystical divider */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>
          
          {/* Mystical orb in center */}
          <div className="relative flex justify-center">
            <div className="px-6 py-3 bg-gradient-to-r from-slate-800/90 to-purple-900/30 backdrop-blur-sm rounded-full border border-lavender/30 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                <span className="text-lavender/90 font-semibold text-sm">
                  ✨ veya ✨
                </span>
                <div className="w-2 h-2 bg-lavender rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || authLoading}
            className="w-full inline-flex justify-center py-4 px-4 border border-lavender/30 rounded-xl shadow-sm bg-gradient-to-r from-white/90 to-gray-100/90 text-sm font-semibold text-lavender hover:from-gray-200/90 hover:to-gray-300/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 relative overflow-hidden"
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
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/70 z-[99999] flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPasswordReset(false);
              setErrors({});
              setMessage('');
            }
          }}
        >
          <div 
            className="bg-white text-black p-6 rounded-xl max-w-md w-full shadow-2xl"
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '400px',
              width: '100%'
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Şifre Sıfırlama
              </h2>
              <p className="text-gray-600 text-sm">
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
                  className="w-full p-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300"
                  aria-label="Şifre sıfırlama e-posta adresi"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1" role="alert">
                    <span>⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-gold to-amber-400 hover:from-gold/90 hover:to-amber-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  aria-label="Şifre sıfırlama e-postası gönder"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                      <span>{loadingStep}</span>
                    </div>
                  ) : (
                    'E-posta Gönder'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordReset(false);
                    setErrors({});
                    setMessage('');
                  }}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:scale-105 active:scale-95"
                  aria-label="İptal"
                >
                  İptal
                </button>
              </div>
            </form>
        </div>
        </div>
      )}

      {/* Message Display */}
      {message && !showResendEmail && (
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

      {/* Resend Email Modal */}
      {showResendEmail && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/70 z-[99999] flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowResendEmail(false);
              setPendingEmail('');
              setMessage('');
            }
          }}
        >
          <div 
            className="bg-white text-black p-6 rounded-xl max-w-md w-full shadow-2xl"
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '448px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                E-posta Onayı
              </h3>
              <p className="text-gray-600 text-sm">
                E-posta adresinizi onaylamanız gerekiyor. Onay e-postasını tekrar göndermek ister misiniz?
              </p>
              <p className="text-gray-500 text-xs mt-2">
                E-posta: {pendingEmail}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  console.log('🔴 RESEND BUTTON CLICKED!', { loading, pendingEmail });
                  handleResendEmail();
                }}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:scale-105 active:scale-95"
                aria-label="E-postayı tekrar gönder"
              >
                {loading && loadingStep.includes('E-posta') ? loadingStep : 'E-postayı Tekrar Gönder'}
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('🔴 CANCEL BUTTON CLICKED!');
                  setShowResendEmail(false);
                  setPendingEmail('');
                  setMessage('');
                }}
                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:scale-105 active:scale-95"
                aria-label="İptal"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mystical Mode Toggle */}
      <div className="text-center mt-8">
        <div className="relative">
          {/* Mystical glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-lavender/5 to-purple-400/5 rounded-xl blur-sm opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
          
          <button
            type="button"
            onClick={toggleMode}
            className="relative text-lavender hover:text-gold transition-all duration-300 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-lavender/10 hover:to-purple-400/10 hover:shadow-lg transform hover:scale-105 border border-lavender/20 hover:border-gold/30"
            aria-label={isLogin ? 'Kayıt olmaya geç' : 'Giriş yapmaya geç'}
          >
            <span className="flex items-center gap-2">
              {isLogin ? '✨ Hesabınız yok mu? Kayıt olun' : '🔮 Zaten hesabınız var mı? Giriş yapın'}
            </span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  );
}

// Memoized export
export default memo(AuthForm);
