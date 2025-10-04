'use client';

import { TarotCard, Locale } from '@/types/tarot-seo';
import Link from 'next/link';
import { generateBreadcrumb } from '@/features/tarot/lib/card-loader';

interface TarotCardBreadcrumbProps {
  card: TarotCard;
  locale: Locale;
}

export function TarotCardBreadcrumb({ card, locale }: TarotCardBreadcrumbProps) {
  const breadcrumb = generateBreadcrumb(card, locale);
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-300 fixed top-0 left-0 right-0 z-50" role="navigation" aria-label="Main navigation">
      
      {/* Skip to content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 py-3 focus:left-0 bg-blue-600 text-white p-2 z-50 text-sm sm:text-base leading-relaxed"
        onFocus={(e) => e.target.classList.remove('sr-only')}
        onBlur={(e) => e.target.classList.add('sr-only')}
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="announcements"
      />

      {/* High contrast mode support */}
      <style jsx>{`
        @media (prefers-contrast: high) {
          * {
            border-color: currentColor !important;
          }
          button, a {
            border: 2px solid currentColor !important;
          }
        }
      `}</style>

      {/* Motion accessibility */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 py-3 max-w-full sm:px-6 lg:px-8">
        <ol className="flex flex-col md:flex-row items-center space-x-2 text-sm sm:text-base leading-relaxed">
          {breadcrumb.map((item, index) => (
            <li key={index} className="flex flex-col md:flex-row items-center text-sm sm:text-base" tabIndex={-1} role="listitem">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-600 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {index === breadcrumb.length - 1 ? (
                <span className="text-gray-900 font-medium text-sm sm:text-base leading-relaxed">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-purple-600 hover:text-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm sm:text-base leading-relaxed"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}