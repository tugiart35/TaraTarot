// Dashboard routing utility fonksiyonları

/**
 * Dashboard route'ları için sabitler
 */
export const DASHBOARD_ROUTES = {
  MAIN: (locale: string) => `/${locale}/dashboard`,
  READINGS: (locale: string) => `/${locale}/dashboard/readings`,
  STATISTICS: (locale: string) => `/${locale}/dashboard/statistics`,
  SETTINGS: (locale: string) => `/${locale}/dashboard/settings`,
  PACKAGES: (locale: string) => `/${locale}/dashboard/packages`,
  CREDITS: (locale: string) => `/${locale}/dashboard/credits`,
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
