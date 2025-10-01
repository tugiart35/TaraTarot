/*
 * Email API CORS Middleware
 *
 * Bu dosya email API endpoint'leri için ortak CORS middleware sağlar.
 * DRY principle uygulayarak tekrarlanan CORS kodlarını önler.
 */

import { NextResponse } from 'next/server';

export class EmailCORS {
  static createCORSResponse(): NextResponse {
    const response = new NextResponse(null, { status: 200 });

    // Production'da daha güvenli CORS ayarları
    const allowedOrigins =
      process.env.NODE_ENV === 'production'
        ? [process.env.NEXT_PUBLIC_SITE_URL || 'https://busbuskimki.com']
        : ['*'];

    response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0] || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set('Access-Control-Max-Age', '86400'); // 24 saat cache
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Güvenlik headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // CSP header (email API için minimal)
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'none'; style-src 'none'; img-src 'none';"
    );

    return response;
  }

  static addSecurityHeaders(response: NextResponse): NextResponse {
    // Rate limiting headers
    response.headers.set('X-RateLimit-Policy', 'email-api');

    // Cache control
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, must-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  }

  static handlePreflightRequest(): NextResponse {
    return this.addSecurityHeaders(this.createCORSResponse());
  }

  static wrapResponse(response: NextResponse): NextResponse {
    return this.addSecurityHeaders(response);
  }
}
