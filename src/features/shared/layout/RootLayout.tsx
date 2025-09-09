/*
 info:
 Bu değişiklikte Google Analytics entegrasyonu eklendi. <head> içine G-Y2HESMXJXD kodunu kullanan gtag scriptleri eklendi. Artık analytics event'leri (ör: signup_success, signup_error) Google Analytics'e iletilebilir. Kodun genel yapısı ve stiline dokunulmadı.
 */

import { ReactNode } from 'react';
import { APP_CONFIG } from '@/lib/config/app-config';
import HeadTags from './HeadTags';
import Footer from './Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={APP_CONFIG.defaultLanguage} className='h-full'>
      <head>
        <HeadTags />
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

          {/* Footer bileşeni */}
          <Footer />

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
