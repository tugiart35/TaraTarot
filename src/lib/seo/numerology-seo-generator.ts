import { Metadata } from 'next';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './schema-markup';

interface NumerologyPageStructuredData {
  organization: ReturnType<typeof generateOrganizationSchema>;
  website: ReturnType<typeof generateWebSiteSchema>;
  service: ReturnType<typeof generateServiceSchema>;
  breadcrumb: ReturnType<typeof generateBreadcrumbSchema>;
  faq: ReturnType<typeof generateFAQSchema>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

// Numeroloji sayfası için SEO bilgileri - numeroloji.md verilerine göre
const numerologyPageSeoData: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
    ogImage: string;
    twitterImage: string;
    breadcrumbs: Array<{ name: string; url: string }>;
    faq: Array<{ question: string; answer: string }>;
  }
> = {
  tr: {
    title: 'Ücretsiz Numeroloji Analizi - Yaşam Yolu Hesaplama | BüşBüşKimKi',
    description:
      'Ücretsiz numeroloji analizi ile yaşam yolunuzu, kader sayınızı ve kişilik özelliklerinizi keşfedin. 9 farklı numeroloji hesaplaması, detaylı analizler ve kişisel rehberlik.',
    keywords: [
      'numeroloji analizi',
      'yaşam yolu hesaplama',
      'kader sayısı',
      'kişilik analizi',
      'numeroloji hesaplama',
      'ücretsiz numeroloji',
      'numeroloji danışmanlığı',
      'kişisel rehberlik',
      'numeroloji yorumu',
    ],
    canonicalPath: '/tr/numeroloji',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Anasayfa', url: `${baseUrl}/tr/anasayfa` },
      { name: 'Numeroloji', url: `${baseUrl}/tr/numeroloji` },
    ],
    faq: [
      {
        question: 'Numeroloji analizi nasıl yapılır?',
        answer:
          'Numeroloji analizi, kişinin doğum tarihi ve adı kullanılarak özel matematiksel hesaplamalar yapılması ve sonuçların detaylı yorumlanması ile gerçekleştirilir.',
      },
      {
        question: 'Hangi konularda numeroloji analizi yapılabilir?',
        answer:
          'Yaşam yolu, kader sayısı, kişilik analizi, uyumluluk testi, kariyer rehberliği ve kişisel gelişim konularında detaylı numeroloji analizi yapılabilir.',
      },
      {
        question: 'Numeroloji analizi ücretsiz mi?',
        answer:
          'Evet, temel numeroloji analizi tamamen ücretsizdir. Gelişmiş özellikler ve detaylı raporlar için premium seçenekler mevcuttur.',
      },
      {
        question: 'Numeroloji analizi ne kadar doğru?',
        answer:
          'Numeroloji, binlerce yıllık bir bilim dalıdır ve matematiksel hesaplamalara dayanır. Ancak sonuçlar rehber niteliğindedir ve kişisel gelişim için kullanılmalıdır.',
      },
      {
        question: 'Numeroloji analizi için hangi bilgilere ihtiyaç var?',
        answer:
          'Temel numeroloji analizi için doğum tarihi yeterlidir. Gelişmiş analizler için tam ad ve soyad bilgisi gerekebilir.',
      },
    ],
  },
  en: {
    title: 'Free Numerology Analysis - Life Path Calculation | BüşBüşKimKi',
    description:
      'Discover your life path, destiny number and personality traits with free numerology analysis. 9 different numerology calculations, detailed analyses and personal guidance.',
    keywords: [
      'numerology analysis',
      'life path calculation',
      'destiny number',
      'personality analysis',
      'numerology calculator',
      'free numerology',
      'numerology consultation',
      'personal guidance',
      'numerology reading',
    ],
    canonicalPath: '/en/numerology',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Home', url: `${baseUrl}/en/home` },
      { name: 'Numerology', url: `${baseUrl}/en/numerology` },
    ],
    faq: [
      {
        question: 'How is numerology analysis done?',
        answer:
          "Numerology analysis is performed by making special mathematical calculations using a person's birth date and name, and providing detailed interpretations of the results.",
      },
      {
        question: 'What topics can numerology analysis cover?',
        answer:
          'Detailed numerology analysis can be done on life path, destiny number, personality analysis, compatibility testing, career guidance and personal development.',
      },
      {
        question: 'Is numerology analysis free?',
        answer:
          'Yes, basic numerology analysis is completely free. Premium options are available for advanced features and detailed reports.',
      },
      {
        question: 'How accurate is numerology analysis?',
        answer:
          'Numerology is a science that has been practiced for thousands of years and is based on mathematical calculations. However, results are for guidance purposes and should be used for personal development.',
      },
      {
        question: 'What information is needed for numerology analysis?',
        answer:
          'Birth date is sufficient for basic numerology analysis. Full name and surname information may be required for advanced analyses.',
      },
    ],
  },
  sr: {
    title:
      'Besplatna Numerološka Analiza - Izračun Životnog Puta | BüşBüşKimKi',
    description:
      'Otkrijte svoj životni put, broj sudbine i osobine ličnosti sa besplatnom numerološkom analizom. 9 različitih numeroloških izračuna, detaljne analize i lično vođstvo.',
    keywords: [
      'numerološka analiza',
      'izračun životnog puta',
      'broj sudbine',
      'analiza ličnosti',
      'numerološki kalkulator',
      'besplatna numerologija',
      'numerološke konsultacije',
      'lično vođstvo',
      'numerološko čitanje',
    ],
    canonicalPath: '/sr/numerologija',
    ogImage: '/assets/seo/og-image-numerology.jpg',
    twitterImage: '/assets/seo/twitter-image-numerology.jpg',
    breadcrumbs: [
      { name: 'Početna', url: `${baseUrl}/sr/pocetna` },
      { name: 'Numerologija', url: `${baseUrl}/sr/numerologija` },
    ],
    faq: [
      {
        question: 'Kako se izvodi numerološka analiza?',
        answer:
          'Numerološka analiza se izvodi posebnim matematičkim izračunima koristeći datum rođenja i ime osobe, i pružanjem detaljnih tumačenja rezultata.',
      },
      {
        question: 'Koje teme može pokriti numerološka analiza?',
        answer:
          'Detaljna numerološka analiza može se uraditi na teme životnog puta, broja sudbine, analize ličnosti, testova kompatibilnosti, karijernog vođstva i ličnog razvoja.',
      },
      {
        question: 'Da li je numerološka analiza besplatna?',
        answer:
          'Da, osnovna numerološka analiza je potpuno besplatna. Premium opcije su dostupne za napredne funkcije i detaljne izveštaje.',
      },
      {
        question: 'Koliko je tačna numerološka analiza?',
        answer:
          'Numerologija je nauka koja se praktikuje hiljadama godina i zasniva se na matematičkim izračunima. Međutim, rezultati su za vođstvo i treba ih koristiti za lični razvoj.',
      },
      {
        question: 'Koje informacije su potrebne za numerološku analizu?',
        answer:
          'Datum rođenja je dovoljan za osnovnu numerološku analizu. Za napredne analize mogu biti potrebni podaci o punom imenu i prezimenu.',
      },
    ],
  },
};

export function generateNumerologyPageMetadata(locale: string): Metadata {
  // Ensure we always have valid data with explicit type assertion
  const data =
    locale === 'tr' || locale === 'en' || locale === 'sr'
      ? numerologyPageSeoData[locale as 'tr' | 'en' | 'sr']
      : numerologyPageSeoData.tr;

  return {
    title: data!.title,
    description: data!.description,
    keywords: data!.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${data!.canonicalPath}`,
      languages: {
        tr: `${baseUrl}/tr/numeroloji`,
        en: `${baseUrl}/en/numerology`,
        sr: `${baseUrl}/sr/numerologija`,
      },
    },
    openGraph: {
      title: data!.title,
      description: data!.description,
      url: `${baseUrl}${data!.canonicalPath}`,
      siteName: 'BüşBüşKimKi',
      images: [
        {
          url: data!.ogImage,
          width: 1200,
          height: 630,
          alt: data!.title,
        },
      ],
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: 'summary_large_image',
      title: data!.title,
      description: data!.description,
      images: [data!.twitterImage],
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

export function generateNumerologyPageStructuredData(
  locale: string
): NumerologyPageStructuredData {
  // Ensure we always have valid data with explicit type assertion
  const data =
    locale === 'tr' || locale === 'en' || locale === 'sr'
      ? numerologyPageSeoData[locale as 'tr' | 'en' | 'sr']
      : numerologyPageSeoData.tr;

  return {
    organization: generateOrganizationSchema(),
    website: generateWebSiteSchema(),
    service: generateServiceSchema(),
    breadcrumb: generateBreadcrumbSchema(data!.breadcrumbs),
    faq: generateFAQSchema(),
  };
}

/**
 * SEO-friendly URL oluşturur
 */
export function getNumerologySeoFriendlyUrl(
  locale: string,
  path: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

  const seoFriendlyPaths = {
    tr: {
      '/numeroloji': '/numeroloji',
      '/numerology': '/numeroloji',
      '/numerologija': '/numeroloji',
    },
    en: {
      '/numeroloji': '/numerology',
      '/numerology': '/numerology',
      '/numerologija': '/numerology',
    },
    sr: {
      '/numeroloji': '/numerologija',
      '/numerology': '/numerologija',
      '/numerologija': '/numerologija',
    },
  };

  const mapping = seoFriendlyPaths[locale as keyof typeof seoFriendlyPaths];
  const seoPath =
    mapping && path in mapping ? mapping[path as keyof typeof mapping] : path;
  return `${baseUrl}/${locale}${seoPath}`;
}
