import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/lib/i18n/config';

// SEO-friendly URL mappings
const urlMappings: Record<string, string> = {
  // Turkish
  '/tr/anasayfa': '/tr',
  '/tr/tarot-okuma': '/tr/tarotokumasi',
  '/tr/giris': '/tr/auth',
  '/tr/panel': '/tr/dashboard',

  // English
  '/en/home': '/en',
  '/en/tarot-reading': '/en/tarotokumasi',
  '/en/numerology': '/en/numeroloji',
  '/en/login': '/en/auth',

  // Serbian
  '/sr/pocetna': '/sr',
  '/sr/tarot-citanje': '/sr/tarotokumasi',
  '/sr/numerologija': '/sr/numeroloji',
  '/sr/prijava': '/sr/auth',
  '/sr/panel': '/sr/dashboard',
};

// Initialize next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`🔍 Middleware processing: ${pathname}`);

  // First, apply SEO URL rewrites
  const mapping = urlMappings[pathname];
  if (mapping) {
    console.log(`🔄 Redirecting ${pathname} to ${mapping}`);
    return NextResponse.redirect(new URL(mapping, request.url));
  }

  // Handle dynamic routes with parameters
  for (const [pattern, destination] of Object.entries(urlMappings)) {
    if (pathname.startsWith(pattern + '/')) {
      const remainingPath = pathname.slice(pattern.length);
      const url = request.nextUrl.clone();
      url.pathname = destination + remainingPath;
      console.log(`🔄 Dynamic redirect: ${pathname} to ${url.pathname}`);
      return NextResponse.redirect(new URL(url.pathname, request.url));
    }
  }

  console.log(`➡️ Passing to intl middleware: ${pathname}`);
  // Then apply next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};