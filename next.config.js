const withNextIntl = require('next-intl/plugin')(
  // next-intl yapılandırması
  './src/lib/i18n/config.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workspace root ayarı - birden fazla lockfile uyarısını önler
  outputFileTracingRoot: __dirname,
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true, // Geliştirme için görsel optimizasyonunu kapat
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  // External packages for server components - Supabase çakışmasını önle
  // serverExternalPackages: ['@supabase/supabase-js'],
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'html2canvas',
      'jspdf',
      'framer-motion',
      'react-hook-form',
      'zod',
    ],
  },
  
  // SEO-friendly redirects
  async redirects() {
    return [
      // Ana sayfa redirects
      {
        source: '/tr',
        destination: '/tr/anasayfa',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/home',
        permanent: true,
      },
      {
        source: '/sr',
        destination: '/sr/pocetna',
        permanent: true,
      },
      
      // Tarot redirects
      {
        source: '/tr/tarotokumasi',
        destination: '/tr/tarot-okuma',
        permanent: true,
      },
      {
        source: '/en/tarotokumasi',
        destination: '/en/tarot-reading',
        permanent: true,
      },
      {
        source: '/sr/tarotokumasi',
        destination: '/sr/tarot-citanje',
        permanent: true,
      },
      
      // Numeroloji redirects
      {
        source: '/en/numeroloji',
        destination: '/en/numerology',
        permanent: true,
      },
      {
        source: '/sr/numeroloji',
        destination: '/sr/numerologija',
        permanent: true,
      },
      
      // Dashboard redirects
      {
        source: '/tr/dashboard',
        destination: '/tr/panel',
        permanent: true,
      },
      {
        source: '/sr/dashboard',
        destination: '/sr/panel',
        permanent: true,
      },
      
      // Auth redirects
      {
        source: '/tr/auth',
        destination: '/tr/giris',
        permanent: true,
      },
      {
        source: '/en/auth',
        destination: '/en/login',
        permanent: true,
      },
      {
        source: '/sr/auth',
        destination: '/sr/prijava',
        permanent: true,
      },
    ];
  },

  // SEO-friendly rewrites
  async rewrites() {
    return [
      // Ana sayfa rewrites
      {
        source: '/tr/anasayfa',
        destination: '/tr',
      },
      {
        source: '/en/home',
        destination: '/en',
      },
      {
        source: '/sr/pocetna',
        destination: '/sr',
      },
      
      // Tarot rewrites
      {
        source: '/tr/tarot-okuma',
        destination: '/tr/tarotokumasi',
      },
      {
        source: '/en/tarot-reading',
        destination: '/en/tarotokumasi',
      },
      {
        source: '/sr/tarot-citanje',
        destination: '/sr/tarotokumasi',
      },
      
      // Numeroloji rewrites
      {
        source: '/en/numerology',
        destination: '/en/numeroloji',
      },
      {
        source: '/sr/numerologija',
        destination: '/sr/numeroloji',
      },
      
      // Dashboard rewrites
      {
        source: '/tr/panel',
        destination: '/tr/dashboard',
      },
      {
        source: '/sr/panel',
        destination: '/sr/dashboard',
      },
      
      // Auth rewrites
      {
        source: '/tr/giris',
        destination: '/tr/auth',
      },
      {
        source: '/en/login',
        destination: '/en/auth',
      },
      {
        source: '/sr/prijava',
        destination: '/sr/auth',
      },
      
      // Mevcut numeroloji rewrites (korunuyor)
      {
        source: '/numerology/:path*',
        destination: '/numeroloji/:path*',
      },
      {
        source: '/numerologija/:path*',
        destination: '/numeroloji/:path*',
      },
      {
        source: '/:locale(numerology|numerologija)/:path*',
        destination: '/:locale/numeroloji/:path*',
      },
      {
        source: '/:locale(tr|en|sr)/numerology/:path*',
        destination: '/:locale/numeroloji/:path*',
      },
      {
        source: '/:locale(tr|en|sr)/numerologija/:path*',
        destination: '/:locale/numeroloji/:path*',
      },
    ];
  },
  
  // Development server settings - deprecated uyarısını kaldır
  // devIndicators: {
  //   buildActivity: false,
  // },
  // Content Security Policy headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://ipapi.co http://localhost:3111",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);