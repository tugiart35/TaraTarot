/*
info:
Bağlantılı dosyalar:
- ./globals.css: Tüm uygulama genelinde geçerli stiller için (gerekli)
- ../config/metadata.ts: Metadata ve viewport ayarları için (gerekli)
- ../lib/i18n/config.ts: i18n yapılandırması için (gerekli)
- ../components/layout/HeadTags.tsx: HTML head etiketlerini yönetmek için (gerekli)
- ../components/layout/Footer.tsx: Alt bilgi bileşeni için (gerekli)

Dosyanın amacı:
- Next.js projesi için zorunlu olan kök layout'u sağlamak.
- Global metadata ve viewport ayarlarını dışa aktarmak.
- i18n desteği ile locale routing sağlamak.
- Tüm sayfa ve bileşenleri ortak layout yapısı ile sarmalamak.

Güncellemeler:
- i18n desteği eklendi
- Locale routing için yapılandırma
- Metadata güncellemeleri
*/

import { ReactNode } from 'react';
import './globals.css';

// Modüler dosyalardan import'lar
import { defaultMetadata, viewport } from '@/lib/config/metadata';
import { APP_CONFIG } from '@/lib/config/app-config';
import { HeadTags, Footer } from '@/features/shared/layout';
import { defaultLocale } from '@/lib/i18n/config';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { generateHomepageSchemas } from '@/lib/seo/schema-markup';
import { WebVitalsProvider } from '@/components/analytics/WebVitalsProvider';

const inter = Inter({ subsets: ['latin'] });

// Next.js için metadata export'u
export const metadata = defaultMetadata;

// Next.js 14 için viewport export'u
export { viewport };

// Ana layout fonksiyonu
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} className={`h-full ${inter.className}`} data-scroll-behavior='smooth'>
      <head>
        <HeadTags />
        
        {/* Performance Optimization: DNS Prefetch */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />
        <link rel='dns-prefetch' href='//www.google-analytics.com' />
        <link rel='dns-prefetch' href='//www.googletagmanager.com' />
        <link rel='dns-prefetch' href='//connect.facebook.net' />
        
        {/* Preconnect for critical external resources */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://www.google-analytics.com' />
        
                {/* Font preload removed - no mystical font file */}
        
        {/* Preload critical images */}
        <link
          rel='preload'
          href='/images/tarot-og-image.jpg'
          as='image'
        />

        {/* Preload Critical Resources */}
        <link
          rel='preload'
          href='/fonts/mystical-font.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />

        {/* Google Analytics - G-HYE4L3NKCL */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-HYE4L3NKCL'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HYE4L3NKCL');
            `,
          }}
        />

        {/* Schema.org JSON-LD Structured Data */}
        {generateHomepageSchemas().map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </head>
      <body
        className='h-full overflow-x-hidden antialiased'
        style={{ backgroundColor: APP_CONFIG.theme.backgroundColor }}
      >
        <WebVitalsProvider>
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </WebVitalsProvider>
      </body>
    </html>
  );
}
