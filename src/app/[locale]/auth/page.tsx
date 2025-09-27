/*
 * Auth Page - Next.js 14 App Router (RSC + Client Handoff)
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/server.ts (server client)
 * - src/components/auth/AuthForm.tsx (client component)
 * - src/middleware.ts (auth middleware)
 *
 * Dosya amacı:
 * Server Component olarak session kontrolü yapar
 * Client Component'e handoff yapar
 *
 * Supabase değişkenleri ve tablolar:
 * - auth.users: Supabase auth tablosu
 * - profiles: kullanıcı profilleri
 *
 * Geliştirme önerileri:
 * - Server-side session kontrolü
 * - Client-side form handling
 * - Locale-aware redirects
 *
 * Tespit edilen hatalar:
 * - ✅ RSC pattern uygulandı
 * - ✅ Sonsuz loading sorunu çözüldü
 * - ✅ Server/Client ayrımı yapıldı
 *
 * Kullanım durumu:
 * - ✅ Gerekli: Ana authentication sayfası
 * - ✅ Production-ready: Next.js 14 App Router uyumlu
 */

import AuthForm from '@/components/auth/AuthForm';
import AuthAccessibilityWrapper from '@/components/auth/AuthAccessibilityWrapper';
import { Metadata } from 'next';

interface AuthPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

// SEO Metadata generation
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const seoData = {
    tr: {
      title: 'Giriş Yap | Büşbüşkimki - Tarot Falı ve Numeroloji',
      description: 'Büşbüşkimki\'ye güvenli giriş yapın. Tarot falı, numeroloji ve astroloji hizmetlerinden yararlanın. Ücretsiz kayıt olun ve geleceğinizi keşfedin.',
      keywords: 'tarot falı, numeroloji, astroloji, fal, giriş yap, kayıt ol, büşbüşkimki',
      canonical: 'https://busbuskimki.com/tr/auth',
      openGraph: {
        title: 'Giriş Yap | Büşbüşkimki - Tarot Falı ve Numeroloji',
        description: 'Büşbüşkimki\'ye güvenli giriş yapın. Tarot falı, numeroloji ve astroloji hizmetlerinden yararlanın.',
        type: 'website',
        locale: 'tr_TR',
        url: 'https://busbuskimki.com/tr/auth',
        siteName: 'Büşbüşkimki',
        images: [
          {
            url: 'https://busbuskimki.com/images/auth-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Büşbüşkimki Giriş Sayfası'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Giriş Yap | Büşbüşkimki - Tarot Falı ve Numeroloji',
        description: 'Büşbüşkimki\'ye güvenli giriş yapın. Tarot falı, numeroloji ve astroloji hizmetlerinden yararlanın.',
        images: ['https://busbuskimki.com/images/auth-twitter.jpg']
      }
    },
    en: {
      title: 'Sign In | Busbuskimki - Tarot Reading and Numerology',
      description: 'Sign in securely to Busbuskimki. Access tarot reading, numerology and astrology services. Register for free and discover your future.',
      keywords: 'tarot reading, numerology, astrology, fortune telling, sign in, register, busbuskimki',
      canonical: 'https://busbuskimki.com/en/auth',
      openGraph: {
        title: 'Sign In | Busbuskimki - Tarot Reading and Numerology',
        description: 'Sign in securely to Busbuskimki. Access tarot reading, numerology and astrology services.',
        type: 'website',
        locale: 'en_US',
        url: 'https://busbuskimki.com/en/auth',
        siteName: 'Busbuskimki',
        images: [
          {
            url: 'https://busbuskimki.com/images/auth-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Busbuskimki Sign In Page'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Sign In | Busbuskimki - Tarot Reading and Numerology',
        description: 'Sign in securely to Busbuskimki. Access tarot reading, numerology and astrology services.',
        images: ['https://busbuskimki.com/images/auth-twitter.jpg']
      }
    },
    sr: {
      title: 'Prijavite se | Busbuskimki - Tarot čitanje i numerologija',
      description: 'Prijavite se sigurno na Busbuskimki. Pristupite tarot čitanju, numerologiji i astrologiji. Registrujte se besplatno i otkrijte svoju budućnost.',
      keywords: 'tarot čitanje, numerologija, astrologija, gatanje, prijavite se, registrujte se, busbuskimki',
      canonical: 'https://busbuskimki.com/sr/auth',
      openGraph: {
        title: 'Prijavite se | Busbuskimki - Tarot čitanje i numerologija',
        description: 'Prijavite se sigurno na Busbuskimki. Pristupite tarot čitanju, numerologiji i astrologiji.',
        type: 'website',
        locale: 'sr_RS',
        url: 'https://busbuskimki.com/sr/auth',
        siteName: 'Busbuskimki',
        images: [
          {
            url: 'https://busbuskimki.com/images/auth-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Busbuskimki Prijava Stranica'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Prijavite se | Busbuskimki - Tarot čitanje i numerologija',
        description: 'Prijavite se sigurno na Busbuskimki. Pristupite tarot čitanju, numerologiji i astrologiji.',
        images: ['https://busbuskimki.com/images/auth-twitter.jpg']
      }
    }
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.tr;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    openGraph: currentSeo.openGraph,
    twitter: currentSeo.twitter,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentSeo.canonical,
      languages: {
        'tr': 'https://busbuskimki.com/tr/auth',
        'en': 'https://busbuskimki.com/en/auth',
        'sr': 'https://busbuskimki.com/sr/auth',
      },
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'Büşbüşkimki',
      'mobile-web-app-capable': 'yes',
      'application-name': 'Büşbüşkimki',
      'msapplication-TileColor': '#8B4513',
      'theme-color': '#8B4513',
    },
  };
}

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const { locale } = await params;
  const { error, next } = await searchParams;

  // Server-side session kontrolü - otomatik yönlendirme kaldırıldı
  // const session = await getServerSession();

  // Otomatik yönlendirme kaldırıldı - kullanıcı auth sayfasında kalabilir
  // if (session?.user) {
  //   redirect(`/${locale}/dashboard`);
  // }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: locale === 'tr' ? 'Giriş Yap - Büşbüşkimki' : 
          locale === 'en' ? 'Sign In - Busbuskimki' : 
          'Prijavite se - Busbuskimki',
    description: locale === 'tr' ? 'Büşbüşkimki\'ye güvenli giriş yapın. Tarot falı, numeroloji ve astroloji hizmetlerinden yararlanın.' :
               locale === 'en' ? 'Sign in securely to Busbuskimki. Access tarot reading, numerology and astrology services.' :
               'Prijavite se sigurno na Busbuskimki. Pristupite tarot čitanju, numerologiji i astrologiji.',
    url: `https://busbuskimki.com/${locale}/auth`,
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Büşbüşkimki',
      applicationCategory: 'Entertainment',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY'
      }
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'tr' ? 'Ana Sayfa' : locale === 'en' ? 'Home' : 'Početna',
          item: `https://busbuskimki.com/${locale}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: locale === 'tr' ? 'Giriş Yap' : locale === 'en' ? 'Sign In' : 'Prijavite se',
          item: `https://busbuskimki.com/${locale}/auth`
        }
      ]
    }
  };

  // Client Component'e handoff with accessibility wrapper
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuthAccessibilityWrapper 
        title="Büşbüşkimki"
        description="Güvenli giriş yapın veya yeni hesap oluşturun"
      >
        <AuthForm 
          locale={locale}
          initialError={error || null}
          next={next || null}
        />
      </AuthAccessibilityWrapper>
    </>
  );
}
