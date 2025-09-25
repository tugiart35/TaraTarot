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
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },
}

module.exports = nextConfig
