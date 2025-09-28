/*
 * Geolocation Error Response Utility
 *
 * Bu dosya geolocation API endpoint'leri için ortak error response utility sağlar.
 * DRY principle uygulayarak tekrarlanan error handling kodlarını önler.
 */

import { NextResponse } from 'next/server';
import { GeolocationCORS } from './geolocation-cors';

const isProduction = process.env.NODE_ENV === 'production';

export class GeolocationErrorResponse {
  static missingCoordinates(): NextResponse {
    const message = 'Latitude and longitude are required';
    const response = NextResponse.json(
      {
        success: false,
        error: 'MISSING_COORDINATES',
        message: isProduction ? 'Invalid location data provided' : message,
      },
      { status: 400 }
    );
    return GeolocationCORS.wrapResponse(response);
  }

  static locationNotFound(): NextResponse {
    const message = 'Unable to determine location';
    const response = NextResponse.json(
      {
        success: false,
        error: 'LOCATION_NOT_FOUND',
        message: isProduction ? 'Location could not be determined' : message,
      },
      { status: 400 }
    );
    return GeolocationCORS.wrapResponse(response);
  }

  static reverseGeocodingFailed(status: number): NextResponse {
    const message = `Reverse geocoding failed: ${status}`;
    const response = NextResponse.json(
      {
        success: false,
        error: 'REVERSE_GEOCODING_FAILED',
        message: isProduction ? 'Location lookup failed' : message,
      },
      { status: 500 }
    );
    return GeolocationCORS.wrapResponse(response);
  }

  static rateLimitExceeded(limit: number, window: number): NextResponse {
    const message = `Rate limit exceeded. Maximum ${limit} requests per ${window / 1000} seconds.`;
    const response = NextResponse.json(
      {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: isProduction ? 'Too many requests' : message,
      },
      {
        status: 429,
        headers: {
          'Retry-After': window.toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
    return GeolocationCORS.wrapResponse(response);
  }

  static internalServerError(details?: string): NextResponse {
    const message = details || 'Internal server error';
    const response = NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: isProduction ? 'An unexpected error occurred' : message,
      },
      { status: 500 }
    );
    return GeolocationCORS.wrapResponse(response);
  }

  static invalidCoordinates(): NextResponse {
    const message = 'Invalid coordinates provided';
    const response = NextResponse.json(
      {
        success: false,
        error: 'INVALID_COORDINATES',
        message: isProduction ? 'Invalid location data' : message,
      },
      { status: 400 }
    );
    return GeolocationCORS.wrapResponse(response);
  }
}
