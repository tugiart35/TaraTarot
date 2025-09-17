/*
  Login Sayfası - Mistik Tarot Teması
  Kullanıcı girişi için modern ve responsive tasarım
  Form validasyonu ve state yönetimi dahil
  Backend entegrasyonu için hazır yapı
  Locale routing desteği ile
*/

'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Pathname'den locale'i çıkar (/tr/login -> tr)
  const locale = pathname.split('/')[1] || 'tr';
  
  // Form state yönetimi
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Form input değişikliklerini handle et
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validasyonu
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Burada backend'e bağlanılacak
      console.log('Login attempt:', formData);
      
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı giriş sonrası yönlendirme
      router.push(`/${locale}/dashboard`);
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Giriş yapılırken bir hata oluştu' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mystical-950 flex items-center justify-center p-4">
      {/* Arka plan mistik efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Login kartı */}
      <div className="relative w-full max-w-md">
        <div className="bg-mystical-900/50 backdrop-blur-sm border border-mystical-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Logo ve başlık */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-mystical text-white">🔮</span>
            </div>
            <h1 className="text-3xl font-mystical font-bold text-transparent bg-gradient-to-r from-golden-400 via-purple-400 to-indigo-400 bg-clip-text mb-2">
              Giriş Yap
            </h1>
            <p className="text-mystical-400">
              Mistik dünyaya hoş geldiniz
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Genel hata mesajı */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            {/* E-posta alanı */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-mystical-300 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-mystical-800/50 border rounded-lg text-mystical-100 placeholder-mystical-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-mystical-600'
                }`}
                placeholder="ornek@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Şifre alanı */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-mystical-300 mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-mystical-800/50 border rounded-lg text-mystical-100 placeholder-mystical-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-mystical-600'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mystical-400 hover:text-mystical-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Şifremi unuttum linki */}
            <div className="flex justify-end">
              <a
                href={`/${locale}/auth`}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Şifremi Unuttum?
              </a>
            </div>

            {/* Giriş butonu */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Alt linkler */}
          <div className="mt-8 text-center">
            <p className="text-mystical-400 text-sm">
              Hesabınız yok mu?{' '}
              <a
                href={`/${locale}/auth`}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Kayıt Ol
              </a>
            </p>
          </div>
        </div>

        {/* Mistik dekoratif elementler */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-golden-500/30 rounded-full blur-sm animate-pulse delay-500"></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-indigo-500/30 rounded-full blur-sm animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
