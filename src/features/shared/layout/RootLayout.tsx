/*
 info:
 Bu değişiklikte Google Analytics entegrasyonu eklendi. <head> içine G-Y2HESMXJXD kodunu kullanan gtag scriptleri eklendi. Artık analytics event'leri (ör: signup_success, signup_error) Google Analytics'e iletilebilir. Kodun genel yapısı ve stiline dokunulmadı.
 */

'use client';

import { ReactNode, Suspense } from 'react';
import { APP_CONFIG } from '@/lib/config/app-config';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import HeadTags from './HeadTags';

// Lazy load heavy components
const Footer = dynamic(() => import('./Footer'), {
  loading: () => <div className='h-16 bg-slate-900/95' />,
});

/**
 * Root Layout bileşeni için props interface'i
 * @property {ReactNode} children - Layout içine yerleştirilecek içerik
 * @property {string} [className] - Opsiyonel ek CSS sınıfları
 * @property {boolean} [hideFooter] - Footer'ı gizlemek için opsiyonel bayrak
 */
interface RootLayoutProps {
  /** Layout içine yerleştirilecek içerik */
  children: ReactNode;
  /** Opsiyonel ek CSS sınıfları */
  className?: string;
  /** Footer'ı gizlemek için opsiyonel bayrak */
  hideFooter?: boolean;
}

/**
 * Uygulamanın ana layout bileşeni
 * 
 * @param {RootLayoutProps} props - Bileşen props'ları
 * @returns {JSX.Element} Root layout bileşeni
 */
export default function RootLayout({ 
  children, 
  className = '',
  hideFooter = false 
}: RootLayoutProps): JSX.Element {
  return (
    <html lang={APP_CONFIG.defaultLanguage} className='h-full'>
      {/* HeadTags artık metadata API ile değiştirilmeli */}
      <HeadTags />

      {/* Google Analytics - G-Y2HESMXJXD */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-Y2HESMXJXD"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y2HESMXJXD');
          `,
        }}
      />
      
      <body
        className='h-full overflow-x-hidden'
        style={{ backgroundColor: APP_CONFIG.theme.backgroundColor }}
      >
        {/* Ana içerik wrapper - mobil öncelikli */}
        <div className={`min-h-full flex flex-col ${className}`}>
          {/* İçerik alanı */}
          <main className='flex-1'>{children}</main>

          {/* Footer bileşeni - Lazy loaded */}
          {!hideFooter && (
            <Suspense fallback={<div className='h-16 bg-slate-900/95' />}>
              <Footer />
            </Suspense>
          )}

          {/* Burada ileride backend bağlantısı için loading state eklenebilir */}
          {/* <LoadingProvider> */}
          {/* <ErrorBoundary> */}

          {/* Mobil navigation için reserved alan */}
          <div id='mobile-navigation-placeholder' className='h-16 md:h-0' />
        </div>
      </body>
    </html>
  );
}
