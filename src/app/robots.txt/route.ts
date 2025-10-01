import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /profile/
Disallow: /settings/

# Allow main content
Allow: /tr/
Allow: /en/
Allow: /sr/
Allow: /tarot/
Allow: /numeroloji/
Allow: /numerology/
Allow: /numerologija/

# Crawl delay (optional)
Crawl-delay: 1`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
