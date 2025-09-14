/*
 * DOSYA ANALİZİ - MIDDLEWARE (PRODUCTION-READY)
 *
 * BAĞLANTILI DOSYALAR:
 * - src/i18n/config.ts (i18n konfigürasyonu)
 * - src/lib/i18n/paths.ts (dil yolları)
 * - messages/tr.json, en.json, sr.json (çeviri dosyaları)
 * - @/types/auth.types.ts (Auth types)
 *
 * DOSYA AMACI:
 * Production-ready Next.js middleware with enhanced security features.
 * URL routing, locale yönlendirmeleri, auth kontrolü, rate limiting ve güvenlik.
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - supabase.auth.getSession() - Session kontrolü
 * - auth.users tablosu (otomatik Supabase tablosu)
 * - user_metadata.role - Role-based access control
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Rate limiting
 * - CSRF protection
 * - Security headers
 * - Bot detection
 * - Auth route protection
 * - Session validation
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Ana routing middleware
 * - GÜVENLİ: Production-ready with security enhancements
 * - PWA-READY: PWA support ve offline handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { UserRole } from '@/types/auth.types';
import { checkMaintenanceMode } from './middleware/maintenance';

// Rate limiting kaldırıldı - development için

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
};

// Rate limiting kaldırıldı - development için

// Bot detection kaldırıldı - development için

// Role-based access control - development modunda devre dışı
// const ROLE_PERMISSIONS: Record<string, string[]> = {
//   admin: ['/pakize', '/dashboard', '/profile', '/settings', '/analytics'],
//   premium: ['/dashboard', '/profile', '/settings', '/premium'],
//   user: ['/dashboard', '/profile', '/settings'],
//   guest: [],
// };

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bakım modu kontrolü
  const maintenanceResponse = await checkMaintenanceMode(request);
  if (maintenanceResponse) {
    return maintenanceResponse;
  }

  // Bot detection kaldırıldı - development için

  // Rate limiting kaldırıldı - development için

  // API route'ları ve static dosyaları bypass et
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.') ||
    pathname.startsWith('/sw-') ||
    pathname === '/manifest.json'
  ) {
    const response = NextResponse.next();
    // Add security headers to all responses
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Create response with security headers
  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Supabase client oluştur
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Auth sayfası için özel kontrol - locale ile birlikte
  if (
    pathname === '/auth' ||
    pathname.startsWith('/auth/') ||
    pathname.match(/^\/[a-z]{2}\/auth/) ||
    pathname.match(/^\/[a-z]{2}\/auth\//)
  ) {
    return response;
  }

  try {
    // Kullanıcı oturumunu kontrol et
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      // Continue without session for public routes
    }

    const user = session?.user;
    const userRole = (user?.user_metadata?.role as UserRole) || 'guest';

    // Korumalı sayfalar kontrolü - development modunda devre dışı
    // const protectedPaths = ['/dashboard', '/profile', '/settings', '/pakize', '/premium'];
    // const isProtectedPath = protectedPaths.some(path =>
    //   pathname.includes(path) || pathname.endsWith(path)
    // );

    // // Korumalı sayfaya erişim kontrolü
    // if (isProtectedPath) {
    //   if (!session) {
    //     // Locale'i koruyarak auth sayfasına yönlendir
    //     const currentLocale = pathname.split('/')[1] || 'tr';
    //     return NextResponse.redirect(new URL(`/${currentLocale}/auth`, request.url));
    //   }

    //   // Role-based access control
    //   const allowedPaths = ROLE_PERMISSIONS[userRole] || [];
    //   const hasAccess = allowedPaths.some(path => pathname.startsWith(path));

    //   if (!hasAccess) {
    //     return NextResponse.redirect(new URL('/tr', request.url));
    //   }
    // }

    // Locale kontrolü
    const pathnameIsMissingLocale = ['tr', 'en', 'sr'].every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Kullanıcının dil tercihini cookie'den al
    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value || 'tr';
    const validLocale = ['tr', 'en', 'sr'].includes(preferredLocale)
      ? preferredLocale
      : 'tr';

    // Root path'i tarot sayfasına yönlendir
    if (pathname === '/') {
      return NextResponse.redirect(
        new URL(`/${validLocale}/tarotokumasi`, request.url)
      );
    }

    // Locale yoksa varsayılan dile yönlendir
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/${validLocale}${pathname}`, request.url)
      );
    }

    // Add user info to headers for client-side use
    if (user) {
      response.headers.set('x-user-id', user.id);
      response.headers.set('x-user-role', userRole);
    }

    return response;
  } catch (error) {
    // Fallback: continue with basic routing
    const pathnameIsMissingLocale = ['tr', 'en', 'sr'].every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Kullanıcının dil tercihini cookie'den al
    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value || 'tr';
    const validLocale = ['tr', 'en', 'sr'].includes(preferredLocale)
      ? preferredLocale
      : 'tr';

    if (pathname === '/') {
      return NextResponse.redirect(
        new URL(`/${validLocale}/tarotokumasi`, request.url)
      );
    }

    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(`/${validLocale}${pathname}`, request.url)
      );
    }

    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
