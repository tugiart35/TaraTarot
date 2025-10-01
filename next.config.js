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
  // External packages for server components
  serverExternalPackages: ['@supabase/supabase-js'],
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'html2canvas',
      'jspdf',
      'framer-motion',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Development server configuration
  // Force HTTP in development
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
  // Development server settings
  devIndicators: {
    buildActivity: false,
  },
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

module.exports = nextConfig;
