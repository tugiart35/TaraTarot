const withNextIntl = require('next-intl/plugin')('./src/lib/i18n/config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async rewrites() {
    return [
      // Turkish SEO-friendly URLs
      {
        source: '/tr/anasayfa',
        destination: '/tr',
      },
      {
        source: '/tr/tarot-okuma',
        destination: '/tr/tarotokumasi',
      },
      {
        source: '/tr/giris',
        destination: '/tr/auth',
      },
      {
        source: '/tr/panel',
        destination: '/tr/dashboard',
      },

      // English SEO-friendly URLs
      {
        source: '/en/home',
        destination: '/en',
      },
      {
        source: '/en/tarot-reading',
        destination: '/en/tarotokumasi',
      },
      {
        source: '/en/numerology',
        destination: '/en/numeroloji',
      },
      {
        source: '/en/login',
        destination: '/en/auth',
      },

      // Serbian SEO-friendly URLs
      {
        source: '/sr/pocetna',
        destination: '/sr',
      },
      {
        source: '/sr/tarot-citanje',
        destination: '/sr/tarotokumasi',
      },
      {
        source: '/sr/numerologija',
        destination: '/sr/numeroloji',
      },
      {
        source: '/sr/prijava',
        destination: '/sr/auth',
      },
      {
        source: '/sr/panel',
        destination: '/sr/dashboard',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
