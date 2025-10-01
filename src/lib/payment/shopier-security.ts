/*
 * Shopier Security Utilities
 *
 * Bu dosya Shopier ödeme sisteminin güvenlik özelliklerini sağlar:
 * - HMAC-SHA256 signature generation/verification
 * - IP whitelisting
 * - Rate limiting
 * - Request validation
 */

import crypto from 'crypto';

/**
 * HMAC-SHA256 ile güvenli signature oluşturma
 */
export function generateSecureSignature(
  params: Record<string, string>,
  secret: string
): string {
  // Parametreleri alfabetik sıraya koy
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  // HMAC-SHA256 ile hash oluştur
  return crypto.createHmac('sha256', secret).update(sortedParams).digest('hex');
}

/**
 * Signature doğrulama (timing attack safe)
 */
export function verifySecureSignature(
  params: Record<string, string>,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = generateSecureSignature(params, secret);

    // Timing attack'a karşı güvenli karşılaştırma
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Legacy base64 signature (geriye dönük uyumluluk için)
 */
export function generateLegacySignature(
  params: Record<string, string>,
  secret: string
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return Buffer.from(sortedParams + secret).toString('base64');
}

/**
 * Shopier IP whitelist kontrolü
 */
export class ShopierIPWhitelist {
  private static readonly SHOPIER_IP_RANGES = [
    '185.93.239.0/24', // Shopier ana IP aralığı
    '185.93.240.0/24', // Shopier yedek IP aralığı
    '127.0.0.1', // Localhost (test için)
    '::1', // IPv6 localhost (test için)
  ];

  /**
   * IP adresinin whitelist'te olup olmadığını kontrol et
   */
  static isWhitelisted(ip: string): boolean {
    // Test modunda tüm IP'leri kabul et
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    // Tek IP kontrolü
    if (this.SHOPIER_IP_RANGES.includes(ip)) {
      return true;
    }

    // CIDR range kontrolü
    return this.SHOPIER_IP_RANGES.some(range => {
      if (range.includes('/')) {
        return this.isIPInRange(ip, range);
      }
      return false;
    });
  }

  /**
   * IP'nin CIDR range içinde olup olmadığını kontrol et
   */
  private static isIPInRange(ip: string, cidr: string): boolean {
    try {
      const [range, bits] = cidr.split('/');
      const mask = ~(2 ** (32 - parseInt(bits)) - 1);

      const ipInt = this.ipToInt(ip);
      const rangeInt = this.ipToInt(range);

      return (ipInt & mask) === (rangeInt & mask);
    } catch (error) {
      console.error('IP range check error:', error);
      return false;
    }
  }

  /**
   * IP adresini integer'a çevir
   */
  private static ipToInt(ip: string): number {
    return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct), 0);
  }

  /**
   * Request'ten IP adresini çıkar
   */
  static extractIP(request: Request): string | null {
    // Vercel/Cloudflare proxy headers
    const headers = request.headers;
    const forwardedFor = headers.get('x-forwarded-for');
    const realIP = headers.get('x-real-ip');
    const cfConnectingIP = headers.get('cf-connecting-ip');

    // Öncelik sırası: CF > X-Real-IP > X-Forwarded-For
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || null;

    return null;
  }
}

/**
 * Rate limiting sistemi (in-memory)
 */
export class ShopierRateLimiter {
  private static requestCounts = new Map<
    string,
    { count: number; resetTime: number }
  >();
  private static readonly CLEANUP_INTERVAL = 60000; // 1 dakika
  private static cleanupTimer: NodeJS.Timeout | null = null;

  /**
   * Rate limit kontrolü
   */
  static checkLimit(
    identifier: string,
    maxRequests = 10,
    windowMs = 60000
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = this.requestCounts.get(identifier);

    // İlk istek veya reset zamanı geçmiş
    if (!record || now > record.resetTime) {
      const resetTime = now + windowMs;
      this.requestCounts.set(identifier, { count: 1, resetTime });
      this.startCleanupTimer();

      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime,
      };
    }

    // Limit aşıldı
    if (record.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    // İsteği artır
    record.count++;
    this.requestCounts.set(identifier, record);

    return {
      allowed: true,
      remaining: maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  /**
   * Eski kayıtları temizle
   */
  private static startCleanupTimer(): void {
    if (this.cleanupTimer) return;

    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.requestCounts.entries()) {
        if (now > value.resetTime) {
          this.requestCounts.delete(key);
        }
      }
    }, this.CLEANUP_INTERVAL);
  }

  /**
   * Rate limiter'ı temizle (test için)
   */
  static reset(): void {
    this.requestCounts.clear();
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * İstatistikler
   */
  static getStats(): {
    totalIdentifiers: number;
    activeIdentifiers: number;
  } {
    const now = Date.now();
    let activeCount = 0;

    for (const record of this.requestCounts.values()) {
      if (now <= record.resetTime) {
        activeCount++;
      }
    }

    return {
      totalIdentifiers: this.requestCounts.size,
      activeIdentifiers: activeCount,
    };
  }
}

/**
 * Webhook request validation
 */
export class ShopierRequestValidator {
  /**
   * Timestamp validation (replay attack prevention)
   */
  static validateTimestamp(timestamp: string, maxAgeSeconds = 300): boolean {
    try {
      const requestTime = new Date(timestamp).getTime();
      const now = Date.now();
      const age = Math.abs(now - requestTime) / 1000;

      return age <= maxAgeSeconds;
    } catch (error) {
      console.error('Timestamp validation error:', error);
      return false;
    }
  }

  /**
   * Order ID format validation
   */
  static validateOrderId(orderId: string): boolean {
    // ORDER_timestamp_userId veya TEST_timestamp_userId formatı
    const pattern = /^(ORDER|TEST)_\d+_[a-zA-Z0-9-]+$/;
    return pattern.test(orderId);
  }

  /**
   * Amount validation
   */
  static validateAmount(amount: number, min = 1, max = 10000): boolean {
    return (
      typeof amount === 'number' &&
      !isNaN(amount) &&
      amount >= min &&
      amount <= max
    );
  }

  /**
   * Currency validation
   */
  static validateCurrency(currency: string): boolean {
    const validCurrencies = ['TRY', 'USD', 'EUR'];
    return validCurrencies.includes(currency.toUpperCase());
  }

  /**
   * Full webhook data validation
   */
  static validateWebhookData(data: any): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!data.orderId || !this.validateOrderId(data.orderId)) {
      errors.push('Invalid order ID format');
    }

    if (!data.timestamp || !this.validateTimestamp(data.timestamp)) {
      errors.push('Invalid or expired timestamp');
    }

    if (
      data.amount === undefined ||
      !this.validateAmount(parseFloat(data.amount))
    ) {
      errors.push('Invalid amount');
    }

    if (!data.currency || !this.validateCurrency(data.currency)) {
      errors.push('Invalid currency');
    }

    if (!data.status || !['success', 'failed', 'pending'].includes(data.status)) {
      errors.push('Invalid status');
    }

    if (!data.transactionId) {
      errors.push('Missing transaction ID');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Comprehensive security check
 */
export async function performSecurityCheck(request: Request): Promise<{
  passed: boolean;
  reason?: string;
  details?: any;
}> {
  // 1. IP Whitelist kontrolü
  const ip = ShopierIPWhitelist.extractIP(request);
  if (!ip) {
    return { passed: false, reason: 'Could not extract IP address' };
  }

  if (!ShopierIPWhitelist.isWhitelisted(ip)) {
    return { passed: false, reason: 'IP not whitelisted', details: { ip } };
  }

  // 2. Rate limiting kontrolü
  const rateLimit = ShopierRateLimiter.checkLimit(ip);
  if (!rateLimit.allowed) {
    return {
      passed: false,
      reason: 'Rate limit exceeded',
      details: {
        ip,
        resetTime: new Date(rateLimit.resetTime).toISOString(),
      },
    };
  }

  return { passed: true };
}

