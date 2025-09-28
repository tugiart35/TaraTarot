/*
 * Redirect Utility Functions
 *
 * Bu dosya redirect işlemleri için ortak utility fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan redirect kodlarını önler.
 */

import { NextRequest, NextResponse } from 'next/server';

export class RedirectUtils {
  /**
   * Environment-aware redirect response oluştur
   */
  static createRedirectResponse(
    request: NextRequest,
    path: string,
    locale?: string
  ): NextResponse {
    const origin = new URL(request.url).origin;
    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';

    const fullPath = locale ? `/${locale}${path}` : path;

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${fullPath}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${fullPath}`);
    } else {
      return NextResponse.redirect(`${origin}${fullPath}`);
    }
  }

  /**
   * Auth error redirect oluştur
   */
  static createAuthErrorRedirect(
    request: NextRequest,
    locale: string,
    error: string
  ): NextResponse {
    return this.createRedirectResponse(request, `/auth?error=${error}`, locale);
  }

  /**
   * Dashboard redirect oluştur
   */
  static createDashboardRedirect(
    request: NextRequest,
    locale: string
  ): NextResponse {
    return this.createRedirectResponse(request, '/dashboard', locale);
  }

  /**
   * Admin panel redirect oluştur
   */
  static createAdminRedirect(
    request: NextRequest,
    locale: string
  ): NextResponse {
    return this.createRedirectResponse(request, '/pakize', locale);
  }

  /**
   * Next.js URL constructor ile redirect oluştur
   */
  static createNextUrlRedirect(
    request: NextRequest,
    path: string,
    locale?: string
  ): NextResponse {
    const fullPath = locale ? `/${locale}${path}` : path;
    return NextResponse.redirect(new URL(fullPath, request.url));
  }
}
