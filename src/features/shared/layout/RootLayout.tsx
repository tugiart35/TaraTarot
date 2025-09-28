/*
 info:
 Bu değişiklikte Google Analytics entegrasyonu eklendi. <head> içine G-Y2HESMXJXD kodunu kullanan gtag scriptleri eklendi. Artık analytics event'leri (ör: signup_success, signup_error) Google Analytics'e iletilebilir. Kodun genel yapısı ve stiline dokunulmadı.
 */

'use client';

import { ReactNode, Suspense } from 'react';
import { APP_CONFIG } from '@/lib/config/app-config';
import dynamic from 'next/dynamic';
import HeadTags from './HeadTags';

// Lazy load heavy components
const Footer = dynamic(() => import('./Footer'), {
  loading: () => <div className='h-16 bg-slate-900/95' />,
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={APP_CONFIG.defaultLanguage} className='h-full'>
      <head>
        <HeadTags />

        {/* Security Headers */}
        <meta
          httpEquiv='Content-Security-Policy'
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'none';"
        />
        <meta httpEquiv='X-Frame-Options' content='DENY' />
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta
          httpEquiv='Referrer-Policy'
          content='strict-origin-when-cross-origin'
        />
        <meta
          httpEquiv='Permissions-Policy'
          content='camera=(), microphone=(), geolocation=(), interest-cohort=()'
        />

        {/* Google Analytics - G-Y2HESMXJXD */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-Y2HESMXJXD'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y2HESMXJXD');
            `,
          }}
        />
      </head>
      <body
        className='h-full overflow-x-hidden'
        style={{ backgroundColor: APP_CONFIG.theme.backgroundColor }}
      >
        {/* Ana içerik wrapper - mobil öncelikli */}
        <div className='min-h-full flex flex-col'>
          {/* İçerik alanı */}
          <main className='flex-1'>{children}</main>

          {/* Footer bileşeni - Lazy loaded */}
          <Suspense fallback={<div className='h-16 bg-slate-900/95' />}>
            <Footer />
          </Suspense>

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
