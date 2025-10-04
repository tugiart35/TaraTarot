import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  // Hreflang URLs - SEO-friendly (manuel mapping)
  const getHreflangUrls = (currentLocale: string) => {
    // Ana sayfa için hreflang URL'leri - SEO-friendly
    const homePageHreflang = {
      'tr': '/tr/anasayfa',
      'en': '/en/home',
      'sr': '/sr/pocetna'
    };

    return homePageHreflang;
  };

  const hreflangUrls = getHreflangUrls(locale);

  return {
    title: 'TaraTarot - Mistik Rehberlik',
    description: 'Profesyonel tarot okuma ve numeroloji hizmetleri',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${hreflangUrls[locale]}`,
      languages: {
        'tr': `${process.env.NEXT_PUBLIC_SITE_URL}${hreflangUrls.tr}`,
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}${hreflangUrls.en}`,
        'sr': `${process.env.NEXT_PUBLIC_SITE_URL}${hreflangUrls.sr}`
      }
    },
    openGraph: {
      title: 'TaraTarot - Mistik Rehberlik',
      description: 'Profesyonel tarot okuma ve numeroloji hizmetleri',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/anasayfa`,
      siteName: 'TaraTarot',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TaraTarot - Mistik Rehberlik',
      description: 'Profesyonel tarot okuma ve numeroloji hizmetleri',
    },
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
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}