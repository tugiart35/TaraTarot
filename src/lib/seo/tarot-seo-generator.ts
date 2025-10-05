import { Metadata } from 'next';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './schema-markup';

interface TarotPageStructuredData {
  organization: ReturnType<typeof generateOrganizationSchema>;
  website: ReturnType<typeof generateWebSiteSchema>;
  service: ReturnType<typeof generateServiceSchema>;
  breadcrumb: ReturnType<typeof generateBreadcrumbSchema>;
  faq: ReturnType<typeof generateFAQSchema>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

const tarotPageSeoData = {
  tr: {
    title: 'BüşBüşKimKi - Tarot Okuması & Kişisel Açılımlar',
    description:
      'Ücretsiz ve ücretli tarot açılımlarıyla aşk, kariyer, para ve evlilik konularında rehberlik alın.',
    keywords: [
      'tarot okuma',
      'ücretsiz tarot',
      'ücretli tarot',
      'aşk tarot',
      'kariyer tarot',
      'para tarot',
      'evlilik tarot',
      'sevgililik tarot',
      'kişisel açılım',
      'tarot rehberlik',
    ],
    canonicalPath: '/tr/tarot-okumasi',
    ogImage: 'https://busbuskimki.com/assets/logo/social-og-tarot.jpg',
    twitterImage: 'https://busbuskimki.com/assets/logo/twitter-card-tarot.jpg',
    breadcrumbs: [
      { name: 'Anasayfa', url: `${baseUrl}/tr/anasayfa` },
      { name: 'Tarot Okuması', url: `${baseUrl}/tr/tarot-okumasi` },
    ],
    faq: [
      {
        question: 'Tarot açılımları nelerdir?',
        answer:
          '9 farklı açılım vardır: aşk, kariyer, para, evlilik ve sevgililik üzerine ücretsiz ve ücretli rehberlik sunar.',
      },
      {
        question: 'Ücretsiz açılımlar nasıl alınır?',
        answer:
          'Web sitesinden istediğiniz ücretsiz açılımı seçip direkt olarak deneyebilirsiniz.',
      },
      {
        question: 'Ücretli açılımlar nasıl çalışır?',
        answer:
          'Seçtiğiniz açılım için ödeme yaparak detaylı, kişisel ve rehberlik odaklı yorum alabilirsiniz.',
      },
    ],
  },
  en: {
    title: 'BüşBüşKimKi - Tarot Readings & Personal Spreads',
    description:
      'Get free and paid tarot spreads for love, career, money, marriage, and relationship guidance.',
    keywords: [
      'tarot reading',
      'free tarot',
      'paid tarot',
      'love tarot',
      'career tarot',
      'money tarot',
      'marriage tarot',
      'relationship tarot',
      'personal spread',
      'tarot guidance',
    ],
    canonicalPath: '/en/tarot-reading',
    ogImage: 'https://busbuskimki.com/assets/logo/social-og-tarot.jpg',
    twitterImage: 'https://busbuskimki.com/assets/logo/twitter-card-tarot.jpg',
    breadcrumbs: [
      { name: 'Home', url: `${baseUrl}/en/home` },
      { name: 'Tarot Reading', url: `${baseUrl}/en/tarot-reading` },
    ],
    faq: [
      {
        question: 'What are the tarot spreads?',
        answer:
          'There are 9 different spreads: love, career, money, marriage, and relationship, offering free and paid guidance.',
      },
      {
        question: 'How to use free spreads?',
        answer: 'Select any free spread on the website and try it directly.',
      },
      {
        question: 'How do paid spreads work?',
        answer:
          'Make a payment for the chosen spread to receive detailed, personal guidance.',
      },
    ],
  },
  sr: {
    title: 'BüşBüşKimKi - Tarot Čitanje & Lični Rasporedi',
    description:
      'Isprobajte besplatne i plaćene tarot rasporede za ljubav, karijeru, novac, brak i odnose.',
    keywords: [
      'tarot čitanje',
      'besplatan tarot',
      'plaćeni tarot',
      'ljubavni tarot',
      'karijerni tarot',
      'novčani tarot',
      'bračni tarot',
      'odnosni tarot',
      'lični raspored',
      'tarot vodič',
    ],
    canonicalPath: '/sr/tarot-čitaje',
    ogImage: 'https://busbuskimki.com/assets/logo/social-og-tarot.jpg',
    twitterImage: 'https://busbuskimki.com/assets/logo/twitter-card-tarot.jpg',
    breadcrumbs: [
      { name: 'Početna', url: `${baseUrl}/sr/pocetna` },
      { name: 'Tarot Čitanje', url: `${baseUrl}/sr/tarot-čitaje` },
    ],
    faq: [
      {
        question: 'Koji su tarot rasporedi?',
        answer:
          'Postoji 9 različitih rasporeda: ljubav, karijera, novac, brak i odnosi, nudeći besplatnu i plaćenu pomoć.',
      },
      {
        question: 'Kako koristiti besplatne rasporede?',
        answer:
          'Odaberite bilo koji besplatni raspored na sajtu i isprobajte ga direktno.',
      },
      {
        question: 'Kako funkcionišu plaćeni rasporedi?',
        answer:
          'Platite za odabrani raspored da biste dobili detaljno, personalizovano vođenje.',
      },
    ],
  },
};

export function generateTarotPageMetadata(locale: string): Metadata {
  const data =
    tarotPageSeoData[locale as keyof typeof tarotPageSeoData] ||
    tarotPageSeoData.tr;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${data.canonicalPath}`,
      languages: {
        tr: `${baseUrl}/tr/tarot-okumasi`,
        en: `${baseUrl}/en/tarot-reading`,
        sr: `${baseUrl}/sr/tarot-čitaje`,
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${baseUrl}${data.canonicalPath}`,
      siteName: 'BüşBüşKimKi',
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.twitterImage],
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

export function generateTarotPageStructuredData(
  locale: string
): TarotPageStructuredData {
  const data =
    tarotPageSeoData[locale as keyof typeof tarotPageSeoData] ||
    tarotPageSeoData.tr;

  return {
    organization: generateOrganizationSchema(),
    website: generateWebSiteSchema(),
    service: generateServiceSchema(),
    breadcrumb: generateBreadcrumbSchema(data.breadcrumbs),
    faq: generateFAQSchema(),
  };
}
