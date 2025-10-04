/*
info:
Bağlantılı dosyalar:
- @/features/shared/layout/BottomNavigation: Alt navigasyon bileşeni (gerekli)
- @/hooks/useTranslations: Çoklu dil desteği için (gerekli)
- @/hooks/useAuth: Kullanıcı kimlik doğrulama için (gerekli)
- next/link: Sayfa yönlendirmeleri için (gerekli)

Dosyanın amacı:
- Modern ve mistik anasayfa tasarımı
- Tarot ve Numeroloji hizmetlerini eşit şekilde öne çıkarma
- Kullanıcı deneyimini geliştirme ve dönüşüm oranlarını artırma
- Mobil-first responsive tasarım

Supabase değişkenleri ve tabloları:
- useAuth hook'u üzerinden kullanıcı durumu kontrol edilir
- Burada backend'e bağlanılacak - kullanıcı profil bilgileri

Geliştirme önerileri:
- Animasyonlar ve etkileşimli öğeler eklendi
- Hizmet karşılaştırması ve özellik vurguları
- Sosyal kanıt ve güven unsurları
- Modern UI/UX prensipleri uygulandı

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Ana sayfa bileşeni olarak aktif kullanımda
- Tüm cihazlarda responsive tasarım
- i18n desteği ile çoklu dil
*/

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BottomNavigation } from '@/features/shared/layout';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase/client';

interface HomePageClientProps {
  locale: string;
}

export function HomePageClient({ locale }: HomePageClientProps) {
  const { t } = useTranslations();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const router = useRouter();
  const pathname = usePathname();
  const [totalReadings, setTotalReadings] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(true); // SSR ile uyumlu olması için true başlat
  const [mounted, setMounted] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  // Ana sayfada otomatik yönlendirme kaldırıldı
  // Kullanıcı ana sayfayı görebilir ve isterse dashboard'a gidebilir

  // Fallback çeviri fonksiyonu
  const translate = (key: string, fallback: string) => {
    try {
      return t ? t(key, fallback) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Database'den toplam okuma sayısını çek
  const fetchTotalReadings = async () => {
    try {
      setLoadingStats(true);
      const { count, error } = await supabase
        .from('readings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      if (error) {
        setTotalReadings(0);
      } else {
        setTotalReadings(count || 0);
      }
    } catch (error) {
      setTotalReadings(0);
    } finally {
      setLoadingStats(false);
    }
  };

  // Component mount olduğunda okuma sayısını çek
  useEffect(() => {
    setMounted(true);
    fetchTotalReadings();
  }, []);

  // Dil değiştirme fonksiyonu - SEO-friendly URL mapping ile
  const handleLanguageChange = (newLocale: string) => {
    // Mevcut path'i locale olmadan al
    let pathWithoutLocale = pathname;
    
    // Eğer pathname locale ile başlıyorsa, onu kaldır
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.substring(`/${locale}`.length);
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = '/';
    }

    // SEO-friendly path mapping uygula
    const seoFriendlyMappings = {
      tr: {
        '/': '/anasayfa',
        '/anasayfa': '/anasayfa',
        '/tarotokumasi': '/tarot-okuma',
        '/tarot-okuma': '/tarot-okuma',
        '/numeroloji': '/numeroloji',
        '/dashboard': '/panel',
        '/panel': '/panel',
        '/auth': '/giris',
        '/giris': '/giris'
      },
      en: {
        '/': '/home',
        '/home': '/home',
        '/anasayfa': '/home',
        '/tarotokumasi': '/tarot-reading',
        '/tarot-reading': '/tarot-reading',
        '/tarot-okuma': '/tarot-reading',
        '/numeroloji': '/numerology',
        '/numerology': '/numerology',
        '/dashboard': '/dashboard',
        '/auth': '/login',
        '/login': '/login'
      },
      sr: {
        '/': '/pocetna',
        '/pocetna': '/pocetna',
        '/anasayfa': '/pocetna',
        '/home': '/pocetna',
        '/tarotokumasi': '/tarot-citanje',
        '/tarot-citanje': '/tarot-citanje',
        '/tarot-okuma': '/tarot-citanje',
        '/tarot-reading': '/tarot-citanje',
        '/numeroloji': '/numerologija',
        '/numerologija': '/numerologija',
        '/numerology': '/numerologija',
        '/dashboard': '/panel',
        '/panel': '/panel',
        '/auth': '/prijava',
        '/prijava': '/prijava',
        '/giris': '/prijava',
        '/login': '/prijava'
      }
    };

    const getSeoFriendlyPath = (locale: string, path: string): string => {
      const mapping = seoFriendlyMappings[locale];
      return mapping?.[path] || path;
    };

    // SEO-friendly path mapping uygula
    const seoFriendlyPath = getSeoFriendlyPath(newLocale, pathWithoutLocale);
    
    // Yeni path oluştur - SEO-friendly URL kullan
    const newPath = seoFriendlyPath === '/' 
      ? `/${newLocale}${getSeoFriendlyPath(newLocale, '/')}` 
      : `/${newLocale}${seoFriendlyPath}`;

    // Cookie'yi güncelle
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Router ile yönlendir
    router.push(newPath);
    setIsLanguageMenuOpen(false);
  };

  // Dil seçenekleri
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Structured Data for SEO - moved to layout.tsx for better SEO

  return (
    <div className='min-h-screen bg-mystical-950 text-cosmic-100'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        {/* Background Effects */}
        <div className='absolute inset-0 bg-gradient-to-br from-mystical-900 via-cosmic-900 to-mystical-950' />
        <div className='absolute inset-0 bg-star-field opacity-30' />

        {/* Floating Mystical Elements */}
        <div
          className='absolute top-20 left-10 text-4xl opacity-20 animate-float'
          aria-hidden='true'
        >
          ✨
        </div>
        <div
          className='absolute top-40 right-20 text-3xl opacity-30 animate-ethereal-drift'
          aria-hidden='true'
        >
          🔮
        </div>
        <div
          className='absolute bottom-40 left-20 text-2xl opacity-25 animate-crystal-rotate'
          aria-hidden='true'
        >
          💎
        </div>
        <div
          className='absolute top-60 right-10 text-3xl opacity-20 animate-moon-phase'
          aria-hidden='true'
        >
          🌙
        </div>

        {/* Main Content */}
        <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center'>
          {/* Top Right Section - Auth & Language */}
          <div className='absolute top-4 right-4 z-20 flex items-center gap-4'>
            {/* Language Selector */}
            <div className='relative'>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className='flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-cosmic-300 hover:text-white hover:bg-white/20 transition-all duration-300'
                aria-label='Dil seçici menüsünü aç'
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup='menu'
                role='button'
              >
                <span className='text-lg'>{currentLanguage?.flag}</span>
                <span className='text-sm font-medium'>{currentLanguage?.code.toUpperCase()}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div className='absolute right-0 top-full mt-2 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600 rounded-lg shadow-xl min-w-[160px]'>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-3 ${
                          language.code === locale 
                            ? 'bg-slate-700/50 text-amber-400' 
                            : 'text-gray-300'
                        }`}
                        role='menuitem'
                        aria-label={`${language.name} dilini seç`}
                        aria-current={language.code === locale ? 'true' : 'false'}
                      >
                        <span className='text-lg'>{language.flag}</span>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium'>{language.name}</span>
                          <span className='text-xs text-gray-400'>{language.code.toUpperCase()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className='flex items-center gap-3'>
                <div className='text-sm text-cosmic-300'>{user?.email}</div>
              </div>
            ) : (
              <Link
                href={`/${locale}/auth`}
                className='px-6 py-3 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-400 hover:to-golden-500 text-mystical-950 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-golden-500/25 transform hover:scale-105'
              >
                {translate('auth.signIn', 'Giriş Yap')}
              </Link>
            )}
          </div>

          {/* Hero Content */}
          <header className='mb-12 animate-mystical-entrance'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-mystical font-bold mb-6'>
              <span className='bg-gradient-to-r from-golden-400 via-ethereal-blue to-cosmic-400 bg-clip-text text-transparent'>
                {t('homepage.hero.title')}
              </span>
            </h1>
            <h2 className='text-xl md:text-2xl lg:text-3xl text-cosmic-300 font-body mb-4'>
              {t('homepage.hero.subtitle')}
            </h2>
            <p className='text-lg md:text-xl text-cosmic-400 max-w-4xl mx-auto leading-relaxed'>
              {t('homepage.hero.description')}
            </p>
          </header>

          {/* Services Showcase */}
          <section
            className='grid md:grid-cols-2 gap-8 max-w-6xl w-full mb-16 animate-fadeIn'
            aria-label='Hizmetlerimiz'
          >
            {/* Tarot Service Card */}
            <Link
              href={`/${locale}/tarotokumasi`}
              className='group relative overflow-hidden rounded-mystical bg-gradient-to-br from-cosmic-800/50 to-mystical-800/50 backdrop-blur-mystical border border-cosmic-500/30 p-8 transition-all duration-500 hover:scale-105 hover:shadow-mystical'
            >
              <div className='absolute inset-0 bg-ethereal-mist opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative z-10'>
                <div
                  className='text-6xl mb-6 group-hover:animate-float'
                  aria-hidden='true'
                >
                  🔮
                </div>
                <h2 className='text-3xl font-mystical font-semibold text-golden-300 mb-4'>
                  {t('homepage.services.tarot.title')}
                </h2>
                <p className='text-cosmic-200 leading-relaxed mb-6'>
                  {t('homepage.services.tarot.description')}
                </p>
                <div className='flex flex-wrap gap-2 mb-6'>
                  {(() => {
                    const features = t('homepage.services.tarot.features');
                    return Array.isArray(features)
                      ? features.map((feature: string, index: number) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-golden-500/20 text-golden-300 text-sm rounded-full border border-golden-500/30'
                          >
                            {feature}
                          </span>
                        ))
                      : null;
                  })()}
                </div>
                <div className='text-golden-400 font-medium group-hover:text-golden-300 transition-colors text-lg'>
                  {t('homepage.services.tarot.button')} →
                </div>
              </div>
            </Link>

            {/* Numerology Service Card */}
            <Link
              href={`/${locale}/numeroloji`}
              className='group relative overflow-hidden rounded-mystical bg-gradient-to-br from-mystical-800/50 to-cosmic-800/50 backdrop-blur-mystical border border-mystical-500/30 p-8 transition-all duration-500 hover:scale-105 hover:shadow-mystical'
            >
              <div className='absolute inset-0 bg-ethereal-mist opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative z-10'>
                <div
                  className='text-6xl mb-6 group-hover:animate-float'
                  aria-hidden='true'
                >
                  🔢
                </div>
                <h2 className='text-3xl font-mystical font-semibold text-golden-300 mb-4'>
                  {t('homepage.services.numerology.title')}
                </h2>
                <p className='text-cosmic-200 leading-relaxed mb-6'>
                  {t('homepage.services.numerology.description')}
                </p>
                <div className='flex flex-wrap gap-2 mb-6'>
                  {(() => {
                    const features = t('homepage.services.numerology.features');
                    return Array.isArray(features)
                      ? features.map((feature: string, index: number) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-golden-500/20 text-golden-300 text-sm rounded-full border border-golden-500/30'
                          >
                            {feature}
                          </span>
                        ))
                      : null;
                  })()}
                </div>
                <div className='text-golden-400 font-medium group-hover:text-golden-300 transition-colors text-lg'>
                  {t('homepage.services.numerology.button')} →
                </div>
              </div>
            </Link>
          </section>

          {/* Features Section */}
          <section
            className='max-w-6xl w-full mb-16 animate-slideUp'
            aria-label='Özelliklerimiz'
          >
            <h3 className='text-3xl md:text-4xl font-mystical font-bold text-golden-300 mb-12 text-center'>
              {t('homepage.features.title')}
            </h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  icon: '✨',
                  title: t('homepage.features.authentic.title'),
                  description: t('homepage.features.authentic.description'),
                },
                {
                  icon: '🎯',
                  title: t('homepage.features.personalized.title'),
                  description: t('homepage.features.personalized.description'),
                },
                {
                  icon: '🔒',
                  title: t('homepage.features.secure.title'),
                  description: t('homepage.features.secure.description'),
                },
                {
                  icon: '🌍',
                  title: t('homepage.features.multilingual.title'),
                  description: t('homepage.features.multilingual.description'),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className='group bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6 transition-all duration-300 hover:scale-105 hover:shadow-ethereal'
                >
                  <div
                    className='text-4xl mb-4 group-hover:animate-float'
                    aria-hidden='true'
                  >
                    {feature.icon}
                  </div>
                  <h4 className='text-xl font-mystical font-semibold text-golden-300 mb-3'>
                    {feature.title}
                  </h4>
                  <p className='text-cosmic-300 text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section
            className='max-w-4xl w-full mb-16 animate-fadeIn'
            aria-label='İstatistiklerimiz'
          >
            <h4 className='text-2xl md:text-3xl font-mystical font-bold text-golden-300 mb-8 text-center'>
              {t('homepage.stats.title')}
            </h4>
            <div className='grid grid-cols-3 gap-8 text-center'>
              <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                <div className='text-3xl font-bold text-golden-400 mb-2'>
                  10K+
                </div>
                <div className='text-cosmic-300 text-sm'>
                  {t('homepage.stats.users')}
                </div>
              </div>
              <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                <div className='text-3xl font-bold text-golden-400 mb-2'>
                  {!mounted || loadingStats ? (
                    <div className='animate-pulse'>...</div>
                  ) : (
                    totalReadings.toLocaleString('tr-TR')
                  )}
                </div>
                <div className='text-cosmic-300 text-sm'>
                  {t('homepage.stats.readings')}
                </div>
              </div>
              <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                <div className='text-3xl font-bold text-golden-400 mb-2'>
                  94%
                </div>
                <div className='text-cosmic-300 text-sm'>
                  {t('homepage.stats.satisfaction')}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
