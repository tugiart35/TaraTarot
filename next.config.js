const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workspace root ayarı - birden fazla lockfile uyarısını önler
  outputFileTracingRoot: __dirname,
  // Image optimization
  images: {
    domains: ['localhost', 'busbuskimki.com'],
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint configuration (temporarily disabled for production build)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // External packages for server components
  serverExternalPackages: ['@supabase/supabase-js'],
  // Performance optimizations
  compress: true,
  
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'html2canvas',
      'jspdf',
      'framer-motion',
    ],
    // optimizeCss: true, // Temporarily disabled - causing critters dependency issues
    webpackBuildWorker: true,
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
                  // styles: {
                  //   name: 'styles',
                  //   test: /\.(css|scss)$/,
                  //   chunks: 'all',
                  //   enforce: true,
                  //   priority: 15,
                  // },
        },
      };
    }
    
    return config;
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
  // Development server settings (deprecated - removed)
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
              "script-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
              "style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "style-src-elem 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net",
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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=900, s-maxage=900, stale-while-revalidate=900',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source: '/cards/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=2592000',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
