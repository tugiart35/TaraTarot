/*
 * API Base - Ortak API Logic'i
 *
 * Bu dosya tüm API route'ları için ortak error handling, validation ve response pattern'leri sağlar.
 * DRY principle uygulayarak tekrarlanan API kodlarını önler.
 */

import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/utils/rate-limiting';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export class ApiBase {
  private static readonly DEFAULT_RATE_LIMIT = 10;
  private static readonly DEFAULT_RATE_WINDOW = 60 * 1000; // 1 dakika

  /**
   * Rate limiting kontrolü
   */
  static checkRateLimit(
    request: NextRequest,
    limit: number = this.DEFAULT_RATE_LIMIT,
    window: number = this.DEFAULT_RATE_WINDOW
  ): NextResponse | null {
    const ip = this.getClientIP(request);

    if (!RateLimiter.checkLimit('api', ip, limit, window)) {
      return this.createRateLimitResponse(limit, window);
    }

    return null;
  }

  /**
   * Client IP adresini al
   */
  static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }

    if (realIP) {
      return realIP;
    }

    return 'unknown';
  }

  /**
   * Başarılı response oluştur
   */
  static success<T>(data: T, message?: string): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: this.getCORSHeaders(),
    });
  }

  /**
   * Hata response oluştur
   */
  static error(error: ApiError, statusCode: number = 400): NextResponse {
    const response: ApiResponse = {
      success: false,
      error: error.message,
      message: error.message,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: statusCode,
      headers: this.getCORSHeaders(),
    });
  }

  /**
   * Rate limit response oluştur
   */
  static createRateLimitResponse(limit: number, window: number): NextResponse {
    const response: ApiResponse = {
      success: false,
      error: 'Rate limit exceeded',
      message: `Too many requests. Limit: ${limit} per ${window / 1000} seconds`,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 429,
      headers: {
        ...this.getCORSHeaders(),
        'Retry-After': Math.ceil(window / 1000).toString(),
      },
    });
  }

  /**
   * CORS headers
   */
  static getCORSHeaders(): Record<string, string> {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };
  }

  /**
   * Request body validation
   */
  static validateRequestBody<T>(
    request: NextRequest,
    validator: (body: any) => T
  ): { success: true; data: T } | { success: false; error: NextResponse } {
    try {
      const body = request.json();
      const validatedData = validator(body);
      return { success: true, data: validatedData };
    } catch (error) {
      return {
        success: false,
        error: this.error(
          {
            code: 'INVALID_BODY',
            message: 'Invalid request body',
            details: error,
          },
          400
        ),
      };
    }
  }

  /**
   * Email validation
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Required fields validation
   */
  static validateRequiredFields(
    body: any,
    requiredFields: string[]
  ): { success: true } | { success: false; error: NextResponse } {
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: this.error(
          {
            code: 'MISSING_FIELDS',
            message: `Missing required fields: ${missingFields.join(', ')}`,
            details: { missingFields },
          },
          400
        ),
      };
    }

    return { success: true };
  }

  /**
   * String length validation
   */
  static validateStringLength(
    value: string,
    minLength: number,
    maxLength: number,
    fieldName: string
  ): { success: true } | { success: false; error: NextResponse } {
    if (value.length < minLength) {
      return {
        success: false,
        error: this.error(
          {
            code: 'STRING_TOO_SHORT',
            message: `${fieldName} must be at least ${minLength} characters long`,
            details: { fieldName, minLength, actualLength: value.length },
          },
          400
        ),
      };
    }

    if (value.length > maxLength) {
      return {
        success: false,
        error: this.error(
          {
            code: 'STRING_TOO_LONG',
            message: `${fieldName} must be at most ${maxLength} characters long`,
            details: { fieldName, maxLength, actualLength: value.length },
          },
          400
        ),
      };
    }

    return { success: true };
  }

  /**
   * Number range validation
   */
  static validateNumberRange(
    value: number,
    min: number,
    max: number,
    fieldName: string
  ): { success: true } | { success: false; error: NextResponse } {
    if (value < min) {
      return {
        success: false,
        error: this.error(
          {
            code: 'NUMBER_TOO_SMALL',
            message: `${fieldName} must be at least ${min}`,
            details: { fieldName, min, actualValue: value },
          },
          400
        ),
      };
    }

    if (value > max) {
      return {
        success: false,
        error: this.error(
          {
            code: 'NUMBER_TOO_LARGE',
            message: `${fieldName} must be at most ${max}`,
            details: { fieldName, max, actualValue: value },
          },
          400
        ),
      };
    }

    return { success: true };
  }

  /**
   * OPTIONS request handler
   */
  static handleOptions(): NextResponse {
    return new NextResponse(null, {
      status: 200,
      headers: this.getCORSHeaders(),
    });
  }

  /**
   * Error logging
   */
  static logError(error: any, context: string): void {
    console.error(`[API Error] ${context}:`, {
      error: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Request logging
   */
  static logRequest(request: NextRequest, context: string): void {
    console.log(`[API Request] ${context}:`, {
      method: request.method,
      url: request.url,
      ip: this.getClientIP(request),
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });
  }
}

// Export utility functions
export const {
  checkRateLimit,
  getClientIP,
  success,
  error,
  createRateLimitResponse,
  getCORSHeaders,
  validateRequestBody,
  validateEmail,
  validateRequiredFields,
  validateStringLength,
  validateNumberRange,
  handleOptions,
  logError,
  logRequest,
} = ApiBase;
