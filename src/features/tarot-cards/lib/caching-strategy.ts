/**
 * Caching strategy implementation for tarot cards
 * Handles frequently accessed cards, static generation, and performance optimization
 */

export interface CacheConfig {
  ttl: number; // Time to live in seconds
  maxSize: number; // Maximum cache size
  strategy: 'lru' | 'fifo' | 'lfu'; // Cache eviction strategy
  preload: boolean; // Whether to preload popular cards
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
  evictions: number;
}

export class TarotCardCache {
  private cache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    size: 0,
    hitRate: 0,
    evictions: 0,
  };
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  /**
   * Get data from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.config.ttl * 1000) {
      this.cache.delete(key);
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    this.updateHitRate();

    return entry.data;
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T): void {
    // Check if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictEntry();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now(),
    };

    this.cache.set(key, entry);
    this.stats.size = this.cache.size;
  }

  /**
   * Evict an entry based on strategy
   */
  private evictEntry(): void {
    let keyToEvict: string | null = null;

    switch (this.config.strategy) {
      case 'lru':
        keyToEvict = this.getLRUKey();
        break;
      case 'fifo':
        keyToEvict = this.getFIFOKey();
        break;
      case 'lfu':
        keyToEvict = this.getLFUKey();
        break;
    }

    if (keyToEvict) {
      this.cache.delete(keyToEvict);
      this.stats.evictions++;
      this.stats.size = this.cache.size;
    }
  }

  /**
   * Get Least Recently Used key
   */
  private getLRUKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * Get First In First Out key
   */
  private getFIFOKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * Get Least Frequently Used key
   */
  private getLFUKey(): string | null {
    let leastUsedKey: string | null = null;
    let leastUsedCount = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.accessCount < leastUsedCount) {
        leastUsedCount = entry.accessCount;
        leastUsedKey = key;
      }
    }

    return leastUsedKey;
  }

  /**
   * Update hit rate
   */
  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0,
      hitRate: 0,
      evictions: 0,
    };
  }

  /**
   * Preload popular cards
   */
  async preloadPopularCards(): Promise<void> {
    if (!this.config.preload) {
      return;
    }

    const popularCards = [
      'the-fool',
      'the-magician',
      'the-high-priestess',
      'the-empress',
      'the-emperor',
      'the-lovers',
      'the-chariot',
      'the-strength',
      'the-hermit',
      'the-wheel-of-fortune',
    ];

    for (const cardId of popularCards) {
      if (!this.cache.has(cardId)) {
        try {
          // In a real implementation, this would fetch from API
          const cardData = await this.fetchCardData(cardId);
          this.set(cardId, cardData);
        } catch (error) {
          console.warn(`Failed to preload card ${cardId}:`, error);
        }
      }
    }
  }

  /**
   * Fetch card data (mock implementation)
   */
  private async fetchCardData(cardId: string): Promise<any> {
    // Mock implementation - in real app, this would fetch from API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: cardId,
          name: `Card ${cardId}`,
          // ... other card data
        });
      }, 100);
    });
  }
}

/**
 * Static generation cache for Next.js
 */
export class StaticGenerationCache {
  private static cache = new Map<string, any>();
  private static revalidateTime = new Map<string, number>();

  /**
   * Get cached static data
   */
  static get<T>(key: string, revalidate: number = 3600): T | null {
    const data = this.cache.get(key);
    const lastRevalidate = this.revalidateTime.get(key);

    if (!data || !lastRevalidate) {
      return null;
    }

    // Check if data needs revalidation
    if (Date.now() - lastRevalidate > revalidate * 1000) {
      this.cache.delete(key);
      this.revalidateTime.delete(key);
      return null;
    }

    return data;
  }

  /**
   * Set cached static data
   */
  static set<T>(key: string, data: T): void {
    this.cache.set(key, data);
    this.revalidateTime.set(key, Date.now());
  }

  /**
   * Generate cache key for card page
   */
  static getCardPageKey(cardId: string, locale: string): string {
    return `card-page-${cardId}-${locale}`;
  }

  /**
   * Generate cache key for card list
   */
  static getCardListKey(locale: string, filters?: Record<string, any>): string {
    const filterString = filters ? JSON.stringify(filters) : '';
    return `card-list-${locale}-${filterString}`;
  }

  /**
   * Generate cache key for related cards
   */
  static getRelatedCardsKey(cardId: string, locale: string): string {
    return `related-cards-${cardId}-${locale}`;
  }
}

/**
 * CDN caching strategy
 */
export class CDNCacheStrategy {
  /**
   * Get CDN cache headers for different content types
   */
  static getCacheHeaders(contentType: 'card' | 'image' | 'api' | 'static') {
    const headers: Record<string, string> = {};

    switch (contentType) {
      case 'card':
        headers['Cache-Control'] =
          'public, max-age=3600, stale-while-revalidate=86400';
        headers['CDN-Cache-Control'] = 'max-age=3600';
        break;
      case 'image':
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        headers['CDN-Cache-Control'] = 'max-age=31536000';
        break;
      case 'api':
        headers['Cache-Control'] =
          'public, max-age=300, stale-while-revalidate=600';
        headers['CDN-Cache-Control'] = 'max-age=300';
        break;
      case 'static':
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        headers['CDN-Cache-Control'] = 'max-age=31536000';
        break;
    }

    return headers;
  }

  /**
   * Get cache invalidation strategy
   */
  static getInvalidationStrategy() {
    return {
      // Invalidate by pattern
      invalidateByPattern: (pattern: string) => {
        console.log(`Invalidating cache for pattern: ${pattern}`);
        // In real implementation, this would call CDN API
      },

      // Invalidate by tag
      invalidateByTag: (tag: string) => {
        console.log(`Invalidating cache for tag: ${tag}`);
        // In real implementation, this would call CDN API
      },

      // Invalidate specific URLs
      invalidateUrls: (urls: string[]) => {
        console.log(`Invalidating cache for URLs: ${urls.join(', ')}`);
        // In real implementation, this would call CDN API
      },
    };
  }
}

/**
 * Cache warming strategy
 */
export class CacheWarmingStrategy {
  /**
   * Warm cache with popular content
   */
  static async warmCache(): Promise<void> {
    const popularCards = [
      'the-fool',
      'the-magician',
      'the-high-priestess',
      'the-empress',
      'the-emperor',
      'the-lovers',
      'the-chariot',
      'the-strength',
      'the-hermit',
      'the-wheel-of-fortune',
    ];

    const locales = ['tr', 'en', 'sr'];

    for (const cardId of popularCards) {
      for (const locale of locales) {
        try {
          // Warm card page cache
          const cardPageKey = StaticGenerationCache.getCardPageKey(
            cardId,
            locale
          );
          if (!StaticGenerationCache.get(cardPageKey)) {
            // In real implementation, this would pre-generate the page
            console.log(`Warming cache for ${cardId} in ${locale}`);
          }

          // Warm related cards cache
          const relatedCardsKey = StaticGenerationCache.getRelatedCardsKey(
            cardId,
            locale
          );
          if (!StaticGenerationCache.get(relatedCardsKey)) {
            console.log(
              `Warming related cards cache for ${cardId} in ${locale}`
            );
          }
        } catch (error) {
          console.warn(
            `Failed to warm cache for ${cardId} in ${locale}:`,
            error
          );
        }
      }
    }
  }

  /**
   * Schedule cache warming
   */
  static scheduleCacheWarming(interval: number = 3600000): void {
    // Warm cache immediately
    this.warmCache();

    // Schedule periodic warming
    setInterval(() => {
      this.warmCache();
    }, interval);
  }
}

/**
 * Cache configuration for different environments
 */
export const CACHE_CONFIGS = {
  development: {
    ttl: 300, // 5 minutes
    maxSize: 50,
    strategy: 'lru' as const,
    preload: false,
  },
  production: {
    ttl: 3600, // 1 hour
    maxSize: 1000,
    strategy: 'lru' as const,
    preload: true,
  },
  staging: {
    ttl: 1800, // 30 minutes
    maxSize: 500,
    strategy: 'lru' as const,
    preload: true,
  },
} as const;

/**
 * Initialize cache based on environment
 */
export function initializeCache(
  environment: keyof typeof CACHE_CONFIGS = 'production'
) {
  const config = CACHE_CONFIGS[environment];
  const cache = new TarotCardCache(config);

  // Preload popular cards in production
  if (config.preload) {
    cache.preloadPopularCards();
  }

  return cache;
}
