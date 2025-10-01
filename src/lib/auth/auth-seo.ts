/*
 * Auth SEO Meta Management
 *
 * Bu dosya authentication sayfaları için SEO meta tag yönetimini içerir.
 * Dynamic meta tags, Open Graph ve Twitter Cards sağlar.
 */

export interface AuthPageMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
}

export interface AuthPageConfig {
  page: 'login' | 'register' | 'reset' | 'callback';
  locale: string;
  baseUrl: string;
}

export class AuthSEO {
  private static readonly DEFAULT_META: Record<string, AuthPageMeta> = {
    login: {
      title: 'Sign In - Tarot Reading',
      description:
        'Sign in to your tarot reading account to access your personalized readings and insights.',
      keywords: 'tarot, sign in, login, authentication, reading',
      ogTitle: 'Sign In - Tarot Reading',
      ogDescription:
        'Sign in to your tarot reading account to access your personalized readings and insights.',
      ogImage: '/images/auth/login-og.jpg',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Sign In - Tarot Reading',
      twitterDescription:
        'Sign in to your tarot reading account to access your personalized readings and insights.',
      twitterImage: '/images/auth/login-twitter.jpg',
      canonicalUrl: '',
    },
    register: {
      title: 'Sign Up - Tarot Reading',
      description:
        'Create your tarot reading account to start your journey of self-discovery and spiritual guidance.',
      keywords: 'tarot, sign up, register, account, reading',
      ogTitle: 'Sign Up - Tarot Reading',
      ogDescription:
        'Create your tarot reading account to start your journey of self-discovery and spiritual guidance.',
      ogImage: '/images/auth/register-og.jpg',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Sign Up - Tarot Reading',
      twitterDescription:
        'Create your tarot reading account to start your journey of self-discovery and spiritual guidance.',
      twitterImage: '/images/auth/register-twitter.jpg',
      canonicalUrl: '',
    },
    reset: {
      title: 'Reset Password - Tarot Reading',
      description:
        'Reset your password to regain access to your tarot reading account.',
      keywords: 'tarot, password reset, account recovery, authentication',
      ogTitle: 'Reset Password - Tarot Reading',
      ogDescription:
        'Reset your password to regain access to your tarot reading account.',
      ogImage: '/images/auth/reset-og.jpg',
      twitterCard: 'summary',
      twitterTitle: 'Reset Password - Tarot Reading',
      twitterDescription:
        'Reset your password to regain access to your tarot reading account.',
      twitterImage: '/images/auth/reset-twitter.jpg',
      canonicalUrl: '',
    },
    callback: {
      title: 'Authentication - Tarot Reading',
      description:
        'Completing your authentication to access your tarot reading account.',
      keywords: 'tarot, authentication, callback, oauth',
      ogTitle: 'Authentication - Tarot Reading',
      ogDescription:
        'Completing your authentication to access your tarot reading account.',
      ogImage: '/images/auth/callback-og.jpg',
      twitterCard: 'summary',
      twitterTitle: 'Authentication - Tarot Reading',
      twitterDescription:
        'Completing your authentication to access your tarot reading account.',
      twitterImage: '/images/auth/callback-twitter.jpg',
      canonicalUrl: '',
    },
  };

  /**
   * Auth sayfası için meta tag'leri güncelle
   */
  static updateAuthPageMeta(
    config: AuthPageConfig,
    customMeta?: Partial<AuthPageMeta>
  ): void {
    if (typeof window === 'undefined') {
      return;
    }

    const baseMeta = AuthSEO.DEFAULT_META[config.page];
    const meta: AuthPageMeta = { ...baseMeta, ...customMeta } as AuthPageMeta;

    // Canonical URL'i ayarla
    meta.canonicalUrl = `${config.baseUrl}/${config.locale}/auth/${config.page}`;

    // Document title'ı güncelle
    if (meta.title) {
      document.title = meta.title;
    }

    // Meta description'ı güncelle
    if (meta.description) {
      AuthSEO.updateMetaTag('description', meta.description);
    }

    // Meta keywords'ü güncelle
    if (meta.keywords) {
      AuthSEO.updateMetaTag('keywords', meta.keywords);
    }

    // Open Graph meta tag'lerini güncelle
    AuthSEO.updateOpenGraphMeta(meta);

    // Twitter Card meta tag'lerini güncelle
    AuthSEO.updateTwitterMeta(meta);

    // Canonical URL'i güncelle
    AuthSEO.updateCanonicalUrl(meta.canonicalUrl);

    // Language meta tag'ini güncelle
    AuthSEO.updateLanguageMeta(config.locale);
  }

  /**
   * Meta tag'i güncelle veya oluştur
   */
  private static updateMetaTag(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  /**
   * Open Graph meta tag'lerini güncelle
   */
  private static updateOpenGraphMeta(meta: AuthPageMeta): void {
    const ogTags = [
      { property: 'og:title', content: meta.ogTitle },
      { property: 'og:description', content: meta.ogDescription },
      { property: 'og:image', content: meta.ogImage },
      { property: 'og:url', content: meta.canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Tarot Reading' },
    ];

    ogTags.forEach(({ property, content }) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });
  }

  /**
   * Twitter Card meta tag'lerini güncelle
   */
  private static updateTwitterMeta(meta: AuthPageMeta): void {
    const twitterTags = [
      { name: 'twitter:card', content: meta.twitterCard },
      { name: 'twitter:title', content: meta.twitterTitle },
      { name: 'twitter:description', content: meta.twitterDescription },
      { name: 'twitter:image', content: meta.twitterImage },
    ];

    twitterTags.forEach(({ name, content }) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });
  }

  /**
   * Canonical URL'i güncelle
   */
  private static updateCanonicalUrl(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  /**
   * Language meta tag'ini güncelle
   */
  private static updateLanguageMeta(locale: string): void {
    const langMeta = document.querySelector('html');
    if (langMeta) {
      langMeta.setAttribute('lang', locale);
    }
  }

  /**
   * Auth sayfası için structured data oluştur
   */
  static generateStructuredData(config: AuthPageConfig): object {
    const baseUrl = config.baseUrl;
    const locale = config.locale;
    const page = config.page;

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: AuthSEO.DEFAULT_META[page]?.title || 'Auth Page',
      description: AuthSEO.DEFAULT_META[page]?.description || 'Authentication page',
      url: `${baseUrl}/${locale}/auth/${page}`,
      inLanguage: locale,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Tarot Reading',
        url: baseUrl,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Authentication',
            item: `${baseUrl}/${locale}/auth`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: AuthSEO.DEFAULT_META[page]?.title || 'Auth Page',
            item: `${baseUrl}/${locale}/auth/${page}`,
          },
        ],
      },
    };
  }

  /**
   * Auth sayfası için robots meta tag'ini güncelle
   */
  static updateRobotsMeta(allowIndexing: boolean = true): void {
    const content = allowIndexing ? 'index, follow' : 'noindex, nofollow';
    AuthSEO.updateMetaTag('robots', content);
  }

  /**
   * Auth sayfası için viewport meta tag'ini güncelle
   */
  static updateViewportMeta(): void {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  }

  /**
   * Auth sayfası için theme color meta tag'ini güncelle
   */
  static updateThemeColorMeta(color: string = '#6366f1'): void {
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', color);
  }

  /**
   * Auth sayfası için favicon'u güncelle
   */
  static updateFavicon(href: string = '/favicon.ico'): void {
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('href', href);
  }

  /**
   * Auth sayfası için tüm meta tag'leri temizle
   */
  static clearAuthPageMeta(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Open Graph meta tag'lerini temizle
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    ogTags.forEach(tag => tag.remove());

    // Twitter Card meta tag'lerini temizle
    const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
    twitterTags.forEach(tag => tag.remove());

    // Canonical URL'i temizle
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.remove();
    }
  }

  /**
   * Auth sayfası için meta tag'leri yenile
   */
  static refreshAuthPageMeta(config: AuthPageConfig): void {
    AuthSEO.clearAuthPageMeta();
    AuthSEO.updateAuthPageMeta(config);
    AuthSEO.updateViewportMeta();
    AuthSEO.updateThemeColorMeta();
    AuthSEO.updateFavicon();
  }
}
