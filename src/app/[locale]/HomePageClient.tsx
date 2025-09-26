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
// import { useRouter } from 'next/navigation';
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
  // const router = useRouter();
  const [totalReadings, setTotalReadings] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // Ana sayfada otomatik yönlendirme kaldırıldı
  // Kullanıcı ana sayfayı görebilir ve isterse dashboard'a gidebilir

  // Fallback çeviri fonksiyonu
  const translate = (key: string, fallback: string) => {
    try {
      return t ? t(key, fallback) : fallback;
    } catch (error) {
      console.error('Translation error:', error);
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
        console.error('Okuma sayısı çekme hatası:', error);
        setTotalReadings(0);
      } else {
        setTotalReadings(count || 0);
      }
    } catch (error) {
      console.error('Okuma sayısı çekme hatası:', error);
      setTotalReadings(0);
    } finally {
      setLoadingStats(false);
    }
  };

  // Component mount olduğunda okuma sayısını çek
  useEffect(() => {
    fetchTotalReadings();
  }, []);

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Büşbüşkimki - Mistik Rehberlik',
    description:
      'Profesyonel tarot okuması ve numeroloji analizi ile geleceğinizi keşfedin. Aşk, kariyer ve yaşam sorularınıza mistik cevaplar bulun.',
    url: 'https://busbuskimki.com',
    logo: 'https://busbuskimki.com/images/logo.png',
    sameAs: [
      'https://www.facebook.com/busbuskimki',
      'https://www.instagram.com/busbuskimki',
      'https://twitter.com/busbuskimki',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English', 'Serbian'],
    },
    service: [
      {
        '@type': 'Service',
        name: 'Tarot Okuması',
        description:
          'Profesyonel tarot kartları ile aşk, kariyer ve yaşam rehberliği',
        provider: {
          '@type': 'Organization',
          name: 'Büşbüşkimki',
        },
        areaServed: 'Turkey',
        availableLanguage: ['Turkish', 'English', 'Serbian'],
      },
      {
        '@type': 'Service',
        name: 'Numeroloji Analizi',
        description: 'Sayıların sırlarını keşfederek yaşam yolunuzu anlayın',
        provider: {
          '@type': 'Organization',
          name: 'Büşbüşkimki',
        },
        areaServed: 'Turkey',
        availableLanguage: ['Turkish', 'English', 'Serbian'],
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            {/* Auth Section - Top Right */}
            <div className='absolute top-4 right-4 z-20'>
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
                  {translate('home.hero.title', 'Mistik Tarot & Numeroloji')}
                </span>
              </h1>
              <h2 className='text-xl md:text-2xl lg:text-3xl text-cosmic-300 font-body mb-4'>
                {translate(
                  'home.hero.subtitle',
                  'Geleceğinizi Keşfedin, Kaderinizi Anlayın'
                )}
              </h2>
              <p className='text-lg md:text-xl text-cosmic-400 max-w-4xl mx-auto leading-relaxed'>
                {translate(
                  'home.hero.description',
                  'Kartların ve sayıların gizemli dünyasında yolculuğa çıkın. Profesyonel tarot okumaları ve numeroloji analizleri ile hayatınızın sırlarını keşfedin.'
                )}
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
                    {translate('home.services.tarot.title', 'Tarot Okuması')}
                  </h2>
                  <p className='text-cosmic-200 leading-relaxed mb-6'>
                    {translate(
                      'home.services.tarot.description',
                      'Kartların gizemli dünyasında yolculuğa çıkın. Geçmiş, şimdi ve geleceğinizi keşfedin.'
                    )}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    {[
                      'Aşk Açılımı',
                      'Kariyer Rehberliği',
                      'Günlük Rehberlik',
                      'Detaylı Yorumlama',
                    ].map((feature, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-golden-500/20 text-golden-300 text-sm rounded-full border border-golden-500/30'
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className='text-golden-400 font-medium group-hover:text-golden-300 transition-colors text-lg'>
                    {translate('home.services.tarot.button', 'Tarot Okuması')} →
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
                    {translate(
                      'home.services.numerology.title',
                      'Numeroloji Analizi'
                    )}
                  </h2>
                  <p className='text-cosmic-200 leading-relaxed mb-6'>
                    {translate(
                      'home.services.numerology.description',
                      'Sayıların sırlarını keşfedin. Yaşam yolunuzu, ifade sayınızı ve ruhsal arzunuzu öğrenin.'
                    )}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    {[
                      'Yaşam Yolu',
                      'İfade Sayısı',
                      'Ruhsal Arzu',
                      'Günlük Sayı',
                    ].map((feature, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-golden-500/20 text-golden-300 text-sm rounded-full border border-golden-500/30'
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className='text-golden-400 font-medium group-hover:text-golden-300 transition-colors text-lg'>
                    {translate(
                      'home.services.numerology.button',
                      'Numeroloji Analizi'
                    )}{' '}
                    →
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
                {translate('home.features.title', 'Neden Bizi Seçmelisiniz?')}
              </h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {[
                  {
                    icon: '✨',
                    title: translate(
                      'home.features.authentic.title',
                      'Orijinal Rehberlik'
                    ),
                    description: translate(
                      'home.features.authentic.description',
                      'Geleneksel tarot ve numeroloji yöntemleri'
                    ),
                  },
                  {
                    icon: '🎯',
                    title: translate(
                      'home.features.personalized.title',
                      'Kişiselleştirilmiş'
                    ),
                    description: translate(
                      'home.features.personalized.description',
                      'Size özel detaylı analizler'
                    ),
                  },
                  {
                    icon: '🔒',
                    title: translate('home.features.secure.title', 'Güvenli'),
                    description: translate(
                      'home.features.secure.description',
                      'Verileriniz tamamen güvende'
                    ),
                  },
                  {
                    icon: '🌍',
                    title: translate(
                      'home.features.multilingual.title',
                      'Çok Dilli'
                    ),
                    description: translate(
                      'home.features.multilingual.description',
                      'Türkçe, İngilizce ve Sırpça destek'
                    ),
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
                {translate('home.stats.title', 'Güvenilir Hizmet')}
              </h4>
              <div className='grid grid-cols-3 gap-8 text-center'>
                <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                  <div className='text-3xl font-bold text-golden-400 mb-2'>
                    10K+
                  </div>
                  <div className='text-cosmic-300 text-sm'>
                    {translate('home.stats.users', 'Aktif Kullanıcı')}
                  </div>
                </div>
                <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                  <div className='text-3xl font-bold text-golden-400 mb-2'>
                    {loadingStats ? (
                      <div className='animate-pulse'>...</div>
                    ) : (
                      totalReadings.toLocaleString('tr-TR')
                    )}
                  </div>
                  <div className='text-cosmic-300 text-sm'>
                    {translate('home.stats.readings', 'Tamamlanan Okuma')}
                  </div>
                </div>
                <div className='bg-gradient-to-br from-cosmic-800/30 to-mystical-800/30 backdrop-blur-mystical border border-cosmic-500/20 rounded-mystical p-6'>
                  <div className='text-3xl font-bold text-golden-400 mb-2'>
                    94%
                  </div>
                  <div className='text-cosmic-300 text-sm'>
                    {translate('home.stats.satisfaction', 'Memnuniyet Oranı')}
                  </div>
                </div>
              </div>
            </section>
            {/* SEO Content */}
            <footer className='mt-16 text-center animate-slideUp'>
              <div className='text-cosmic-500 text-xs max-w-4xl mx-auto leading-relaxed'>
                <p>
                  Büşbüşkimki olarak, profesyonel tarot okuması ve numeroloji
                  analizi hizmetleri sunuyoruz. Aşk rehberliği, kariyer
                  rehberliği, günlük rehberlik ve detaylı numeroloji analizleri
                  ile hayatınızın her alanında rehberlik alabilirsiniz. Mistik
                  rehberlik, ruhani danışmanlık ve kader analizi konularında
                  uzman ekibimizle hizmetinizdeyiz.
                </p>
              </div>
            </footer>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </>
  );
}
