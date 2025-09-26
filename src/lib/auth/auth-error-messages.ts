/*
 * Auth Error Messages
 * 
 * Bu dosya authentication hataları için lokalize edilmiş mesajları içerir.
 * i18n sistem entegrasyonu için hazırlanmıştır.
 */

export const getAuthErrorMessage = (error: Error, locale: string = 'tr'): string => {
  const errorMap: Record<string, Record<string, string>> = {
    tr: {
      'Invalid login credentials': 'Geçersiz e-posta veya şifre',
      'User already registered': 'Bu e-posta adresi zaten kayıtlı',
      'Email not confirmed': 'E-posta adresinizi onaylamanız gerekiyor',
      'Too many requests': 'Çok fazla deneme yapıldı. Lütfen bekleyin.',
      'Password should be at least': 'Şifre en az 6 karakter olmalı',
      'Signup is disabled': 'Kayıt işlemi şu anda devre dışı',
      'Email rate limit exceeded': 'E-posta gönderme limiti aşıldı',
      'User not found': 'Kullanıcı bulunamadı',
      'Invalid email': 'Geçersiz e-posta adresi',
      'Weak password': 'Şifre çok zayıf',
      'Network error': 'Ağ bağlantısı hatası',
      'Server error': 'Sunucu hatası',
      'Unknown error': 'Bilinmeyen hata',
    },
    en: {
      'Invalid login credentials': 'Invalid email or password',
      'User already registered': 'This email address is already registered',
      'Email not confirmed': 'Please confirm your email address',
      'Too many requests': 'Too many attempts. Please wait.',
      'Password should be at least': 'Password should be at least 6 characters',
      'Signup is disabled': 'Signup is currently disabled',
      'Email rate limit exceeded': 'Email sending rate limit exceeded',
      'User not found': 'User not found',
      'Invalid email': 'Invalid email address',
      'Weak password': 'Password is too weak',
      'Network error': 'Network connection error',
      'Server error': 'Server error',
      'Unknown error': 'Unknown error',
    },
  };

  // Get localized message or fallback to original error message
  const localizedMessage = errorMap[locale]?.[error.message] || 
                          errorMap['en']?.[error.message] || 
                          error.message;

  return localizedMessage;
};

// Error message categories for better UX
export const getAuthErrorCategory = (error: Error): 'validation' | 'network' | 'auth' | 'server' | 'unknown' => {
  const message = error.message.toLowerCase();
  
  if (message.includes('invalid') || message.includes('password') || message.includes('email')) {
    return 'validation';
  }
  
  if (message.includes('network') || message.includes('connection')) {
    return 'network';
  }
  
  if (message.includes('credentials') || message.includes('confirmed') || message.includes('registered')) {
    return 'auth';
  }
  
  if (message.includes('server') || message.includes('rate limit')) {
    return 'server';
  }
  
  return 'unknown';
};

// User-friendly error messages with suggestions
export const getAuthErrorWithSuggestion = (error: Error, locale: string = 'tr'): {
  message: string;
  suggestion?: string;
} => {
  const category = getAuthErrorCategory(error);
  const message = getAuthErrorMessage(error, locale);
  
  const suggestions: Record<string, Record<string, string>> = {
    tr: {
      validation: 'Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
      network: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
      auth: 'E-posta adresinizi ve şifrenizi kontrol edin.',
      server: 'Lütfen birkaç dakika sonra tekrar deneyin.',
      unknown: 'Teknik destek ile iletişime geçin.',
    },
    en: {
      validation: 'Please check your information and try again.',
      network: 'Check your internet connection and try again.',
      auth: 'Check your email address and password.',
      server: 'Please try again in a few minutes.',
      unknown: 'Contact technical support.',
    },
  };
  
  return {
    message,
    suggestion: suggestions[locale]?.[category],
  };
};
