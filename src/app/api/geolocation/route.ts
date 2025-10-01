/*
 * DOSYA ANALİZİ - GEOLOCATION API ENDPOINT (PRODUCTION-READY)
 *
 * BAĞLANTILI DOSYALAR:
 * - src/lib/utils/geolocation.ts (geolocation utility fonksiyonları)
 * - src/middleware.ts (IP tabanlı dil yönlendirmesi için)
 * - src/lib/i18n/config.ts (desteklenen diller)
 *
 * DOSYA AMACI:
 * Client-side coğrafi konum tespiti için API endpoint
 * IP tabanlı ve browser geolocation fallback desteği
 *
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (API endpoint)
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Rate limiting
 * - Input validation
 * - Error handling
 * - CORS headers
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Client-side coğrafi konum tespiti için
 * - GÜVENLİ: Production-ready with security
 * - PERFORMANSLI: Cache mekanizması ile
 */

import { NextRequest } from 'next/server';
import {
  getGeolocationFromIP,
  getClientIP,
  type GeolocationData,
} from '@/lib/utils/geolocation';
import { determineLocale } from '@/lib/utils/locale-utils';
import { GeolocationCORS } from '@/lib/api/geolocation-cors';
import { GeolocationErrorResponse } from '@/lib/api/geolocation-responses';
import { ApiBase } from '@/lib/api/shared/api-base';
import { AuthSecurity } from '@/lib/auth/auth-security';

// Rate limiting için AuthSecurity kullanılıyor

// GET endpoint - IP tabanlı coğrafi konum tespiti
export async function GET(request: NextRequest) {
  // Rate limiting kontrolü using AuthSecurity
  const ip = ApiBase.getClientIP(request);
  const rateLimitResult = await AuthSecurity.checkIPRateLimit(ip, 'geolocation-get');
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  // Request logging
  ApiBase.logRequest(request, 'Geolocation API');

  try {
    const ip = ApiBase.getClientIP(request);

    // IP tabanlı coğrafi konum tespiti
    const geolocation = await getGeolocationFromIP(ip);

    if (!geolocation) {
      return GeolocationErrorResponse.locationNotFound();
    }

    // Success response with CORS headers
    return GeolocationCORS.createSuccessResponse(geolocation, ip);
  } catch (error) {
    console.error('Geolocation API error:', error);
    return GeolocationErrorResponse.internalServerError(
      (error as Error).message
    );
  }
}

// POST endpoint - Client-side coğrafi konum bilgisi ile dil belirleme
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting kontrolü using AuthSecurity
    const rateLimitResult = await AuthSecurity.checkIPRateLimit(ip, 'geolocation-post');
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }

    const body = await request.json();

    // Input validation and sanitization
    if (!body.latitude || !body.longitude) {
      return GeolocationErrorResponse.missingCoordinates();
    }

    // Sanitize and validate coordinates
    const latitude = parseFloat(body.latitude);
    const longitude = parseFloat(body.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return GeolocationErrorResponse.invalidCoordinates();
    }

    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return GeolocationErrorResponse.invalidCoordinates();
    }

    // Additional security: Check for reasonable precision (prevent coordinate injection)
    if (latitude.toString().length > 15 || longitude.toString().length > 15) {
      return GeolocationErrorResponse.invalidCoordinates();
    }

    // Reverse geocoding - Use sanitized coordinates
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'TarotApp/1.0',
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return GeolocationErrorResponse.reverseGeocodingFailed(response.status);
    }

    const data = await response.json();

    // Dil belirleme
    const locale = determineLocale(data.countryCode);

    const geolocationData: GeolocationData = {
      country: data.countryName || 'Unknown',
      countryCode: data.countryCode || 'XX',
      region: data.principalSubdivision || 'Unknown',
      city: data.locality || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale,
    };

    // Success response with CORS headers
    return GeolocationCORS.createSuccessResponse(geolocationData, ip);
  } catch (error) {
    console.error('Geolocation POST API error:', error);
    return GeolocationErrorResponse.internalServerError(
      (error as Error).message
    );
  }
}

// OPTIONS endpoint - CORS preflight
export async function OPTIONS(_request: NextRequest) {
  return GeolocationCORS.handlePreflightRequest();
}
