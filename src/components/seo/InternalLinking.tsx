/**
 * Internal Linking Component for SEO Optimization
 * Provides strategic internal links to improve site structure and SEO
 */

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface InternalLinkingProps {
  currentPage?: string;
  showRelatedServices?: boolean;
  showPopularPages?: boolean;
  showBreadcrumbs?: boolean;
}

export function InternalLinking({
  currentPage,
  showRelatedServices = true,
  showPopularPages = true,
  showBreadcrumbs = true,
}: InternalLinkingProps) {
  const t = useTranslations('SEO');

  // Strategic internal links based on page type
  const getRelatedLinks = (page: string) => {
    const baseLinks = {
      home: [
        { href: '/tarotokumasi', label: t('tarotReading'), description: t('tarotDescription') },
        { href: '/numeroloji', label: t('numerology'), description: t('numerologyDescription') },
        { href: '/auth', label: t('login'), description: t('loginDescription') },
      ],
      tarot: [
        { href: '/numeroloji', label: t('numerologyAnalysis'), description: t('numerologyAnalysisDescription') },
        { href: '/auth', label: t('freeTrial'), description: t('freeTrialDescription') },
        { href: '/dashboard', label: t('myAccount'), description: t('myAccountDescription') },
      ],
      numerology: [
        { href: '/tarotokumasi', label: t('tarotReading'), description: t('tarotDescription') },
        { href: '/auth', label: t('freeTrial'), description: t('freeTrialDescription') },
        { href: '/dashboard', label: t('myAccount'), description: t('analysisHistoryDescription') },
      ],
      auth: [
        { href: '/tarotokumasi', label: t('tarotReading'), description: t('tarotDescription') },
        { href: '/numeroloji', label: t('numerology'), description: t('numerologyDescription') },
        { href: '/dashboard', label: t('dashboard'), description: t('loginDescription') },
      ],
      dashboard: [
        { href: '/tarotokumasi', label: t('newTarotReading'), description: t('freeTrialDescription') },
        { href: '/numeroloji', label: t('numerologyAnalysis'), description: t('numerologyDescription') },
        { href: '/dashboard/readings', label: t('readingHistory'), description: t('readingHistoryDescription') },
      ],
    };

    return baseLinks[page as keyof typeof baseLinks] || baseLinks.home;
  };

  // Popular pages for site-wide internal linking
  const popularPages = [
    { href: '/tarotokumasi', label: t('tarotReading'), description: t('tarotDescription') },
    { href: '/numeroloji', label: t('numerology'), description: t('numerologyDescription') },
    { href: '/auth', label: t('login'), description: t('loginDescription') },
    { href: '/dashboard', label: t('dashboard'), description: t('dashboardDescription') },
  ];

  // Breadcrumb navigation
  const getBreadcrumbs = (page: string) => {
    const breadcrumbs = {
      tarot: [
        { href: '/', label: t('homePage') },
        { href: '/tarotokumasi', label: t('tarotReading') },
      ],
      numerology: [
        { href: '/', label: t('homePage') },
        { href: '/numeroloji', label: t('numerology') },
      ],
      dashboard: [
        { href: '/', label: t('homePage') },
        { href: '/dashboard', label: t('dashboard') },
      ],
      auth: [
        { href: '/', label: t('homePage') },
        { href: '/auth', label: t('login') },
      ],
    };

    return breadcrumbs[page as keyof typeof breadcrumbs] || [{ href: '/', label: t('homePage') }];
  };

  const relatedLinks = currentPage ? getRelatedLinks(currentPage) : [];
  const breadcrumbs = currentPage ? getBreadcrumbs(currentPage) : [];

  return (
    <div className="internal-linking-container space-y-6">
      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 1 && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Related Services */}
      {showRelatedServices && relatedLinks.length > 0 && (
        <section className="related-services">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('relatedServices')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all duration-200"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  {link.label}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {link.description}
                </p>
                <span className="inline-block mt-2 text-xs text-purple-600 font-medium">
                  {t('continueReading')} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Popular Pages */}
      {showPopularPages && (
        <section className="popular-pages">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('popularPages')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularPages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                className="group p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all duration-200 text-center"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors text-sm">
                  {page.label}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Site-wide navigation hints */}
      <section className="navigation-hints">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 mb-2">
            {t('siteMap')}
          </h4>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/tarotokumasi" className="text-purple-700 hover:text-purple-900 transition-colors">
              {t('tarotReading')}
            </Link>
            <span className="text-purple-400">•</span>
            <Link href="/numeroloji" className="text-purple-700 hover:text-purple-900 transition-colors">
              {t('numerology')}
            </Link>
            <span className="text-purple-400">•</span>
            <Link href="/dashboard" className="text-purple-700 hover:text-purple-900 transition-colors">
              {t('dashboard')}
            </Link>
            <span className="text-purple-400">•</span>
            <Link href="/legal/privacy-policy" className="text-purple-700 hover:text-purple-900 transition-colors">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InternalLinking;
