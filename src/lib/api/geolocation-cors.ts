/*
 * Geolocation CORS Utility
 * 
 * Bu dosya geolocation API endpoint'leri için ortak CORS utility sağlar.
 * DRY principle uygulayarak tekrarlanan CORS kodlarını önler.
 */

import { NextResponse } from 'next/server';

export class GeolocationCORS {
  static getCORSHeaders(): HeadersInit {
    return {
      'Access-Control-Allow-Origin': '*', // Production'da daha kısıtlayıcı olmalı
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 saat
      'Cache-Control': 'public, max-age=3600', // 1 saat cache
      'Content-Security-Policy': "default-src 'self'",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer-when-downgrade',
    };
  }

  static handlePreflightRequest(): NextResponse {
    return new NextResponse(null, {
      status: 200,
      headers: GeolocationCORS.getCORSHeaders(),
    });
  }

  static wrapResponse(response: NextResponse): NextResponse {
    const wrappedResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

    // CORS headers ekle
    for (const [key, value] of Object.entries(GeolocationCORS.getCORSHeaders())) {
      wrappedResponse.headers.set(key, value);
    }

    return wrappedResponse;
  }

  static createSuccessResponse(data: any, ip?: string): NextResponse {
    const response = NextResponse.json({
      success: true,
      data,
      ip,
      timestamp: new Date().toISOString(),
    });

    return GeolocationCORS.wrapResponse(response);
  }
}
