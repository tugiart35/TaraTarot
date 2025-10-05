import { Metadata } from 'next';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from './schema-markup';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com';

// SEO data for Auth page
const authSeoData: Record<
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
    title: 'Giriş — BüşBüşKimKi',
    description:
      'BüşBüşKimKi hesabınıza güvenli şekilde giriş yapın. Tarot ve numeroloji hizmetlerinize erişim sağlayın.',
    keywords: [
      'giriş yap',
      'hesap girişi',
      'kullanıcı girişi',
      'güvenli giriş',
      'tarot hesabı',
      'numeroloji hesabı',
      'mistik rehberlik',
      'kişisel hesap',
    ],
    canonicalPath: '/tr/giris',
    ogImage: '/assets/logo/social-og-auth.jpg',
    twitterImage: '/assets/logo/twitter-card-auth.jpg',
    breadcrumbs: [
      { name: 'Anasayfa', url: `${baseUrl}/tr/anasayfa` },
      { name: 'Giriş', url: `${baseUrl}/tr/giris` },
    ],
    faq: [
      {
        question: 'Hesabıma nasıl giriş yapabilirim?',
        answer:
          'E-posta adresiniz ve şifrenizle güvenli şekilde giriş yapabilirsiniz.',
      },
      {
        question: 'Şifremi unuttum, ne yapmalıyım?',
        answer: 'Şifre sıfırlama linkini e-posta adresinize gönderebiliriz.',
      },
      {
        question: 'Hesabım güvenli mi?',
        answer:
          'Tüm verileriniz şifrelenmiş olarak saklanır ve güvenli bağlantı kullanılır.',
      },
    ],
  },
  en: {
    title: 'Sign In — BüşBüşKimKi',
    description:
      'Sign in to your BüşBüşKimKi account securely. Access your tarot and numerology services.',
    keywords: [
      'sign in',
      'account login',
      'user login',
      'secure login',
      'tarot account',
      'numerology account',
      'mystical guidance',
      'personal account',
    ],
    canonicalPath: '/en/login',
    ogImage: '/assets/logo/social-og-auth.jpg',
    twitterImage: '/assets/logo/twitter-card-auth.jpg',
    breadcrumbs: [
      { name: 'Home', url: `${baseUrl}/en/home` },
      { name: 'Sign In', url: `${baseUrl}/en/login` },
    ],
    faq: [
      {
        question: 'How can I sign in to my account?',
        answer:
          'You can sign in securely using your email address and password.',
      },
      {
        question: 'I forgot my password, what should I do?',
        answer: 'We can send a password reset link to your email address.',
      },
      {
        question: 'Is my account secure?',
        answer:
          'All your data is encrypted and stored securely with secure connections.',
      },
    ],
  },
  sr: {
    title: 'Пријава — BüşBüşKimKi',
    description:
      'Пријавите се на свој BüşBüşKimKi налог сигурно. Приступите својим тарот и нумеролошким услугама.',
    keywords: [
      'пријава',
      'пријава на налог',
      'корисничка пријава',
      'сигурна пријава',
      'тарот налог',
      'нумеролошки налог',
      'мистичко вођство',
      'лични налог',
    ],
    canonicalPath: '/sr/prijava',
    ogImage: '/assets/logo/social-og-auth.jpg',
    twitterImage: '/assets/logo/twitter-card-auth.jpg',
    breadcrumbs: [
      { name: 'Početna', url: `${baseUrl}/sr/pocetna` },
      { name: 'Пријава', url: `${baseUrl}/sr/prijava` },
    ],
    faq: [
      {
        question: 'Како се могу пријавити на свој налог?',
        answer:
          'Можете се сигурно пријавити користећи своју е-маил адресу и лозинку.',
      },
      {
        question: 'Заборавио сам лозинку, шта да радим?',
        answer:
          'Можемо послати линк за ресетовање лозинке на вашу е-маил адресу.',
      },
      {
        question: 'Да ли је мој налог сигуран?',
        answer:
          'Сви ваши подаци су шифровани и безбедно чувани са сигурним везама.',
      },
    ],
  },
};

// Metadata generation function for Auth page
export function generateAuthPageMetadata(locale: string): Metadata {
  const data =
    authSeoData[locale as keyof typeof authSeoData] ?? authSeoData.tr;

  return {
    title: data!.title,
    description: data!.description,
    keywords: data!.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${data!.canonicalPath}`,
      languages: {
        tr: `${baseUrl}/tr/giris`,
        en: `${baseUrl}/en/login`,
        sr: `${baseUrl}/sr/prijava`,
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
      card: 'summary',
      title: data!.title,
      description: data!.description,
      images: [data!.twitterImage],
    },
    robots: {
      index: false, // Auth pages should not be indexed
      follow: false,
      nocache: true,
    },
  };
}

// Structured data generation function for Auth page
export function generateAuthPageStructuredData(locale: string) {
  const data =
    authSeoData[locale as keyof typeof authSeoData] ?? authSeoData.tr;

  return {
    organization: generateOrganizationSchema(),
    website: generateWebSiteSchema(),
    service: generateServiceSchema(),
    breadcrumb: generateBreadcrumbSchema(data!.breadcrumbs),
    faq: generateFAQSchema(),
  };
}
