// Dashboard routing utility fonksiyonları

// SEO-friendly URL mapping'leri
const getSeoFriendlyDashboardPath = (locale: string, path: string): string => {
  const mappings = {
    tr: {
      '/dashboard': '/panel',
      '/dashboard/readings': '/panel/readings',
      '/dashboard/statistics': '/panel/statistics',
      '/dashboard/settings': '/panel/settings',
      '/dashboard/packages': '/panel/packages',
      '/dashboard/credits': '/panel/credits'
    },
    en: {
      '/dashboard': '/dashboard',
      '/dashboard/readings': '/dashboard/readings',
      '/dashboard/statistics': '/dashboard/statistics',
      '/dashboard/settings': '/dashboard/settings',
      '/dashboard/packages': '/dashboard/packages',
      '/dashboard/credits': '/dashboard/credits'
    },
    sr: {
      '/dashboard': '/panel',
      '/dashboard/readings': '/panel/readings',
      '/dashboard/statistics': '/panel/statistics',
      '/dashboard/settings': '/panel/settings',
      '/dashboard/packages': '/panel/packages',
      '/dashboard/credits': '/panel/credits'
    }
  };
  
  return mappings[locale]?.[path] || path;
};

/**
 * Dashboard route'ları için sabitler - SEO-friendly URLs
 */
export const DASHBOARD_ROUTES = {
  MAIN: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard')}`,
  READINGS: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard/readings')}`,
  STATISTICS: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard/statistics')}`,
  SETTINGS: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard/settings')}`,
  PACKAGES: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard/packages')}`,
  CREDITS: (locale: string) => `/${locale}${getSeoFriendlyDashboardPath(locale, '/dashboard/credits')}`,
} as const;

/**
 * Dashboard route'ları için type
 */
export type DashboardRouteKey = keyof typeof DASHBOARD_ROUTES;

/**
 * Dashboard route'u oluşturur
 * @param routeKey Route anahtarı
 * @param locale Locale bilgisi
 * @returns Oluşturulan route string'i
 */
export const getDashboardRoute = (
  routeKey: DashboardRouteKey,
  locale: string
): string => {
  return DASHBOARD_ROUTES[routeKey](locale);
};

/**
 * Dashboard route'larını locale ile birlikte döndürür
 * @param locale Locale bilgisi
 * @returns Tüm dashboard route'ları
 */
export const getDashboardRoutes = (locale: string) => {
  return {
    main: DASHBOARD_ROUTES.MAIN(locale),
    readings: DASHBOARD_ROUTES.READINGS(locale),
    statistics: DASHBOARD_ROUTES.STATISTICS(locale),
    settings: DASHBOARD_ROUTES.SETTINGS(locale),
    packages: DASHBOARD_ROUTES.PACKAGES(locale),
    credits: DASHBOARD_ROUTES.CREDITS(locale),
  };
};
