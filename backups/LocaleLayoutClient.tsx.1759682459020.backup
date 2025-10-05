/*
info:
Bağlantılı dosyalar:
- @/features/shared/layout/LanguageSelector: Dil seçici bileşeni (gerekli)
- @/hooks/useAuth: Kullanıcı kimlik doğrulama için (gerekli)
- next/link: Sayfa yönlendirmeleri için (gerekli)

Dosyanın amacı:
- Her sayfada görünür global header
- Dil seçici ve auth durumu gösterimi
- Responsive ve modern tasarım
- Layout seviyesinde client-side işlemler

Geliştirme önerileri:
- Modern UI/UX prensipleri uygulandı
- Accessibility desteği
- Mobile-first responsive tasarım
- Smooth animasyonlar

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Layout seviyesinde global header
- Tüm sayfalarda üst kısımda görünür
- Dil seçici ve auth durumu
*/

'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import { LanguageSelector } from '@/features/shared/layout/LanguageSelector';
import { useTranslations } from '@/hooks/useTranslations';
import {
  WebVitals,
  useWebVitals,
  usePerformanceBudget,
} from '@/components/performance/WebVitals';

interface LocaleLayoutClientProps {
  children: React.ReactNode;
  locale: string;
}

export function LocaleLayoutClient({
  children,
  locale,
}: LocaleLayoutClientProps) {
  const { user } = useAuth();
  const { t } = useTranslations();
  const isAuthenticated = !!user;

  // Performance monitoring
  useWebVitals();
  usePerformanceBudget();

  // Fallback çeviri fonksiyonu
  const translate = (key: string, fallback: string) => {
    try {
      return t ? t(key, fallback) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white'>
      {/* Modern Glassmorphism Header */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Modern Logo */}
            <Link
              href={`/${locale}`}
              className='flex items-center gap-3 text-white hover:text-white/90 transition-all duration-300 group'
            >
              <div className='relative'>
                <div className='text-2xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg'>
                  🔮
                </div>
                <div className='absolute inset-0 text-2xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300'>
                  ✨
                </div>
              </div>
              <span className='text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
                Büşbüşkiki
              </span>
            </Link>

            {/* Modern Right Section */}
            <div className='flex items-center gap-4'>
              {/* Language Selector */}
              <LanguageSelector locale={locale} />

              {/* Modern Auth Section */}
              {isAuthenticated ? (
                <div className='flex items-center gap-3'>
                  <div className='hidden sm:block text-sm text-white/70 font-medium'>
                    {user?.email}
                  </div>
                  <Link
                    href={`/${locale}/dashboard`}
                    className='px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl'
                  >
                    {translate('auth.dashboard', 'Panel')}
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/${locale}/auth`}
                  className='px-6 py-2.5 bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white text-black text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
                >
                  {translate('auth.signIn', 'Giriş')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='pt-16'>{children}</main>

      {/* Performance Monitoring */}
      <WebVitals />
    </div>
  );
}
