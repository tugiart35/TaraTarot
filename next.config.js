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
}

module.exports = nextConfig
