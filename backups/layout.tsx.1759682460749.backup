/*
 * DASHBOARD LAYOUT - SEO OPTIMIZED
 *
 * Bu dosya dashboard sayfası için SEO metadata ve structured data sağlar.
 * Dashboard sayfası kullanıcıya özel olduğu için genel SEO'dan farklı yaklaşım gerektirir.
 *
 * SEO ÖZELLİKLERİ:
 * - Kullanıcıya özel meta tags
 * - Dashboard-specific structured data
 * - Privacy-focused robots meta
 * - Performance optimization
 *
 * GÜVENLİK:
 * - Dashboard sayfası index edilmemeli (noindex)
 * - Kullanıcı verileri korunmalı
 * - Private content için özel meta tags
 */

import { Metadata } from 'next';

// Dashboard sayfası için SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3111';

  const seoData = {
    tr: {
      title: 'Dashboard - Büşbüşkimki',
      shortTitle: 'Dashboard',
      description:
        'Kişisel dashboard sayfanız - tarot okumalarınız, kredi bakiyeniz ve profil bilgileriniz',
      keywords:
        'dashboard, kişisel sayfa, tarot okumaları, kredi bakiyesi, profil',
      canonical: `${baseUrl}/${locale}/dashboard`,
    },
    en: {
      title: 'Dashboard - Büşbüşkimki',
      shortTitle: 'Dashboard',
      description:
        'Your personal dashboard - tarot readings, credit balance and profile information',
      keywords:
        'dashboard, personal page, tarot readings, credit balance, profile',
      canonical: `${baseUrl}/${locale}/dashboard`,
    },
    sr: {
      title: 'Dashboard - Büşbüşkimki',
      shortTitle: 'Dashboard',
      description:
        'Vaš lični dashboard - tarot čitanja, kreditni balans i profilne informacije',
      keywords:
        'dashboard, lična stranica, tarot čitanja, kreditni balans, profil',
      canonical: `${baseUrl}/${locale}/dashboard`,
    },
  };

  const currentSeo = seoData[locale as keyof typeof seoData] || seoData.tr;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    authors: [{ name: 'Büşbüşkimki', url: baseUrl }],
    creator: 'Büşbüşkimki - Mistik Rehberlik',
    publisher: 'Büşbüşkimki',
    category: 'Personal Dashboard',
    classification: 'User Dashboard',

    // Dashboard sayfası için özel robots meta
    robots: {
      index: false, // Dashboard sayfası index edilmemeli
      follow: true,
      nocache: true, // Cache edilmemeli (kullanıcı verileri)
      googleBot: {
        index: false,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'none',
        'max-snippet': -1,
      },
    },

    // Open Graph - Dashboard için özel
    openGraph: {
      title: currentSeo.shortTitle,
      description: currentSeo.description,
      url: currentSeo.canonical,
      siteName: 'Büşbüşkimki - Mistik Rehberlik',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
      type: 'profile', // Dashboard bir profil sayfası
      images: [
        {
          url: '/images/dashboard-og-image.jpg',
          width: 1200,
          height: 630,
          alt:
            locale === 'tr'
              ? 'Dashboard - Büşbüşkimki'
              : locale === 'en'
                ? 'Dashboard - Büşbüşkimki'
                : 'Dashboard - Büşbüşkimki',
          type: 'image/jpeg',
        },
      ],
    },

    // Twitter Card - Dashboard için
    twitter: {
      card: 'summary',
      site: '@busbuskimki',
      creator: '@busbuskimki',
      title: currentSeo.shortTitle,
      description: currentSeo.description,
    },

    // Dashboard için özel meta tags
    other: {
      // Privacy ve güvenlik
      robots: 'noindex, nofollow, noarchive, nosnippet',
      googlebot: 'noindex, nofollow, noarchive, nosnippet',

      // Dashboard özel
      dashboard: 'true',
      'user-specific': 'true',
      'private-content': 'true',

      // Performance
      'dns-prefetch': baseUrl,
      preconnect: 'https://fonts.googleapis.com',

      // Security
      referrer: 'strict-origin-when-cross-origin',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'x-xss-protection': '1; mode=block',
    },
  };
}

// Dashboard için structured data
function generateDashboardStructuredData(locale: string, baseUrl: string) {
  const localeTexts = {
    tr: {
      name: 'Dashboard',
      description: 'Kişisel dashboard sayfası',
      provider: 'Büşbüşkimki',
    },
    en: {
      name: 'Dashboard',
      description: 'Personal dashboard page',
      provider: 'Büşbüşkimki',
    },
    sr: {
      name: 'Dashboard',
      description: 'Lična dashboard stranica',
      provider: 'Büşbüşkimki',
    },
  };

  const texts =
    localeTexts[locale as keyof typeof localeTexts] || localeTexts.tr;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: texts.name,
    description: texts.description,
    url: `${baseUrl}/${locale}/dashboard`,
    provider: {
      '@type': 'Organization',
      name: texts.provider,
      url: baseUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Büşbüşkimki - Mistik Rehberlik',
      url: baseUrl,
    },
    // Dashboard sayfası için özel özellikler
    mainEntity: {
      '@type': 'Dashboard',
      name: texts.name,
      description: texts.description,
    },
    // Privacy ve güvenlik
    accessMode: 'private',
    accessModeSufficient: 'private',
    audience: {
      '@type': 'Audience',
      audienceType: 'registered users',
    },
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Dashboard için structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateDashboardStructuredData('tr', 'http://localhost:3111')
          ), // Default to Turkish
        }}
      />
      {children}
    </>
  );
}
