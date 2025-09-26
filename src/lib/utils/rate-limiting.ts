/*
 * Rate Limiting Utility
 * 
 * Bu dosya API endpoint'leri için ortak rate limiting utility sağlar.
 * DRY principle uygulayarak tekrarlanan rate limiting kodlarını önler.
 */

import { NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private static stores = new Map<string, Map<string, RateLimitEntry>>();

  /**
   * Rate limit kontrolü yap
   */
  static checkLimit(
    endpoint: string,
    ip: string,
    limit: number,
    windowMs: number
  ): boolean {
    const now = Date.now();
    const key = `${endpoint}:${ip}`;
    
    // Store'u al veya oluştur
    let store = this.stores.get(endpoint);
    if (!store) {
      store = new Map();
      this.stores.set(endpoint, store);
    }

    const entry = store.get(key);

    if (!entry || now > entry.resetTime) {
      store.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (entry.count >= limit) {
      return false;
    }

    entry.count++;
    return true;
  }

  /**
   * Rate limit headers oluştur
   */
  static getHeaders(limit: number, remaining: number, resetTime: number): Headers {
    const headers = new Headers();
    
    headers.set('X-RateLimit-Limit', limit.toString());
    headers.set('X-RateLimit-Remaining', remaining.toString());
    headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString());
    
    if (remaining === 0) {
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
      headers.set('Retry-After', retryAfter.toString());
    }

    return headers;
  }

  /**
   * Rate limit exceeded response oluştur
   */
  static createRateLimitResponse(
    limit: number,
    windowMs: number,
    customMessage?: string
  ): NextResponse {
    const retryAfter = Math.ceil(windowMs / 1000);
    const resetTime = Date.now() + windowMs;
    
    return NextResponse.json(
      {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: customMessage || `Çok fazla istek. ${limit} istek/${retryAfter} saniye limiti aşıldı.`,
        retryAfter: retryAfter,
      },
      {
        status: 429,
        headers: this.getHeaders(limit, 0, resetTime),
      }
    );
  }

  /**
   * Store temizleme (memory management)
   */
  static cleanupExpiredEntries(): void {
    const now = Date.now();
    
    for (const [endpoint, store] of this.stores) {
      for (const [key, entry] of store) {
        if (now > entry.resetTime) {
          store.delete(key);
        }
      }
      
      // Boş store'ları kaldır
      if (store.size === 0) {
        this.stores.delete(endpoint);
      }
    }
  }

  /**
   * Store istatistikleri
   */
  static getStats(): { [endpoint: string]: { totalEntries: number; activeEntries: number } } {
    const stats: { [endpoint: string]: { totalEntries: number; activeEntries: number } } = {};
    const now = Date.now();
    
    for (const [endpoint, store] of this.stores) {
      let activeEntries = 0;
      
      for (const [_, entry] of store) {
        if (now <= entry.resetTime) {
          activeEntries++;
        }
      }
      
      stats[endpoint] = {
        totalEntries: store.size,
        activeEntries,
      };
    }
    
    return stats;
  }

  /**
   * Tüm store'ları temizle
   */
  static clearAll(): void {
    this.stores.clear();
  }
}

// Otomatik cleanup (production'da dikkatli kullan)
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    RateLimiter.cleanupExpiredEntries();
  }, 5 * 60 * 1000); // 5 dakikada bir temizle
}
