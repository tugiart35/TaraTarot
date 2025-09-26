/*
 * Environment Utility Functions
 * 
 * Bu dosya environment detection işlemleri için ortak utility fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan environment kodlarını önler.
 */

import { NextRequest } from 'next/server';

export class EnvironmentUtils {
  /**
   * Development environment kontrolü
   */
  static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
  
  /**
   * Production environment kontrolü
   */
  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
  
  /**
   * Test environment kontrolü
   */
  static isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  }
  
  /**
   * Request'ten base URL oluştur
   */
  static getBaseUrl(request: NextRequest): string {
    const forwardedHost = request.headers.get('x-forwarded-host');
    const origin = new URL(request.url).origin;
    
    if (this.isDevelopment()) {
      return origin;
    } else if (forwardedHost) {
      return `https://${forwardedHost}`;
    } else {
      return origin;
    }
  }
  
  /**
   * Forwarded host kontrolü
   */
  static getForwardedHost(request: NextRequest): string | null {
    return request.headers.get('x-forwarded-host');
  }
  
  /**
   * Environment-specific security headers
   */
  static getSecurityHeaders(): Record<string, string> {
    const baseHeaders = {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'X-XSS-Protection': '1; mode=block',
    };
    
    // Production'da ek security headers
    if (this.isProduction()) {
      return {
        ...baseHeaders,
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      };
    }
    
    return baseHeaders;
  }
  
  /**
   * Debug mode kontrolü
   */
  static isDebugMode(): boolean {
    return process.env.NODE_ENV === 'development' || 
           process.env.DEBUG === 'true';
  }
}
