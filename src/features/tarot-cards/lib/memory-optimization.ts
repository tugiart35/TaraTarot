/**
 * Memory usage optimization for large datasets
 * Implements memory management, garbage collection, and performance monitoring
 */

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';

export interface MemoryConfig {
  maxCacheSize: number;
  gcThreshold: number;
  monitoring: boolean;
  compression: boolean;
  virtualization: boolean;
}

export interface MemoryStats {
  used: number;
  total: number;
  limit: number;
  percentage: number;
  gcCount: number;
  lastGC: number;
}

export interface MemoryOptimizationOptions {
  enableCompression: boolean;
  enableVirtualization: boolean;
  enableGarbageCollection: boolean;
  enableMonitoring: boolean;
}

/**
 * Memory optimization hook
 */
export function useMemoryOptimization(options: Partial<MemoryOptimizationOptions> = {}) {
  const {
    enableCompression: _enableCompression = true,
    enableVirtualization: _enableVirtualization = true,
    enableGarbageCollection = true,
    enableMonitoring = true,
  } = options;

  const memoryStats = useRef<MemoryStats>({
    used: 0,
    total: 0,
    limit: 0,
    percentage: 0,
    gcCount: 0,
    lastGC: 0,
  });

  const gcInterval = useRef<NodeJS.Timeout | null>(null);
  const monitoringInterval = useRef<NodeJS.Timeout | null>(null);

  // Monitor memory usage
  useEffect(() => {
    if (!enableMonitoring || typeof window === 'undefined') {
      return;
    }

    const updateMemoryStats = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryStats.current = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
          gcCount: memoryStats.current.gcCount,
          lastGC: memoryStats.current.lastGC,
        };
      }
    };

    monitoringInterval.current = setInterval(updateMemoryStats, 1000);
    updateMemoryStats();

    return () => {
      if (monitoringInterval.current) {
        clearInterval(monitoringInterval.current);
      }
    };
  }, [enableMonitoring]);

  // Garbage collection
  useEffect(() => {
    if (!enableGarbageCollection || typeof window === 'undefined') {
      return;
    }

    const performGC = () => {
      if (memoryStats.current.percentage > 80) {
        // Force garbage collection if available
        if ('gc' in window) {
          (window as any).gc();
          memoryStats.current.gcCount++;
          memoryStats.current.lastGC = Date.now();
        }
      }
    };

    gcInterval.current = setInterval(performGC, 5000);
    performGC();

    return () => {
      if (gcInterval.current) {
        clearInterval(gcInterval.current);
      }
    };
  }, [enableGarbageCollection]);

  const getMemoryStats = useCallback(() => memoryStats.current, []);

  const forceGC = useCallback(() => {
    if ('gc' in window) {
      (window as any).gc();
      memoryStats.current.gcCount++;
      memoryStats.current.lastGC = Date.now();
    }
  }, []);

  return {
    memoryStats: memoryStats.current,
    getMemoryStats,
    forceGC,
  };
}

/**
 * Memory-efficient data structures
 */
export class MemoryEfficientCache<T> {
  private cache = new Map<string, T>();
  private accessOrder = new Map<string, number>();
  private maxSize: number;
  private compressionEnabled: boolean;

  constructor(maxSize: number = 1000, compressionEnabled: boolean = true) {
    this.maxSize = maxSize;
    this.compressionEnabled = compressionEnabled;
  }

  set(key: string, value: T): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, this.compress(value));
    this.accessOrder.set(key, Date.now());
  }

  get(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value) {
      this.accessOrder.set(key, Date.now());
      return this.decompress(value);
    }
    return value;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    this.accessOrder.delete(key);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
  }

  size(): number {
    return this.cache.size;
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    this.accessOrder.forEach((time, key) => {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  // Compress data if enabled
  private compress(data: T): T {
    if (!this.compressionEnabled) {
      return data;
    }

    // Simple compression simulation
    // In real implementation, use actual compression algorithms
    return data;
  }

  // Decompress data if enabled
  private decompress(data: T): T {
    if (!this.compressionEnabled) {
      return data;
    }

    // Simple decompression simulation
    // In real implementation, use actual decompression algorithms
    return data;
  }
}

/**
 * Virtual scrolling for large datasets
 */
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [, setContainerRef] = useState<HTMLDivElement | null>(null);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    containerRef: setContainerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange,
  };
}

/**
 * Memory-efficient image loading
 */
export function useMemoryEfficientImages(
  _imageUrls: string[],
  options: {
    maxConcurrent: number;
    preloadDistance: number;
    compressionQuality: number;
  } = {
    maxConcurrent: 3,
    preloadDistance: 2,
    compressionQuality: 0.8,
  }
) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const loadImage = useCallback(
    async (url: string): Promise<void> => {
      if (loadedImages.has(url) || loadingImages.has(url)) {
        return;
      }

      setLoadingImages((prev: Set<string>) => new Set(prev).add(url));

      try {
        const img = new Image();
        img.src = url;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setLoadedImages((prev: Set<string>) => new Set(prev).add(url));
      } catch (error) {
        setFailedImages((prev: Set<string>) => new Set(prev).add(url));
      } finally {
        setLoadingImages((prev: Set<string>) => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
      }
    },
    [loadedImages, loadingImages]
  );

  const preloadImages = useCallback(
    async (urls: string[]) => {
      const promises = urls.slice(0, options.maxConcurrent).map(loadImage);
      await Promise.allSettled(promises);
    },
    [loadImage, options.maxConcurrent]
  );

  const isImageLoaded = useCallback(
    (url: string) => {
      return loadedImages.has(url);
    },
    [loadedImages]
  );

  const isImageLoading = useCallback(
    (url: string) => {
      return loadingImages.has(url);
    },
    [loadingImages]
  );

  const isImageFailed = useCallback(
    (url: string) => {
      return failedImages.has(url);
    },
    [failedImages]
  );

  return {
    loadImage,
    preloadImages,
    isImageLoaded,
    isImageLoading,
    isImageFailed,
    loadedImages: Array.from(loadedImages),
    loadingImages: Array.from(loadingImages),
    failedImages: Array.from(failedImages),
  };
}

/**
 * Memory monitoring utilities
 */
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private observers: Set<(stats: MemoryStats) => void> = new Set();
  private monitoringInterval: NodeJS.Timeout | null = null;

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  startMonitoring(interval: number = 1000): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.monitoringInterval = setInterval(() => {
      this.updateStats();
    }, interval);
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  subscribe(callback: (stats: MemoryStats) => void): () => void {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private updateStats(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const stats: MemoryStats = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        gcCount: 0, // This would need to be tracked separately
        lastGC: 0,
      };

      this.observers.forEach(callback => callback(stats));
    }
  }

  getCurrentStats(): MemoryStats | null {
    if (typeof window === 'undefined' || !('memory' in performance)) {
      return null;
    }

    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      gcCount: 0,
      lastGC: 0,
    };
  }
}

/**
 * Memory optimization configuration
 */
export const MEMORY_CONFIG: MemoryConfig = {
  maxCacheSize: 1000,
  gcThreshold: 80,
  monitoring: true,
  compression: true,
  virtualization: true,
};

/**
 * Initialize memory optimization
 */
export function initializeMemoryOptimization() {
  if (typeof window === 'undefined') {
    return;
  }

  // Start memory monitoring
  const monitor = MemoryMonitor.getInstance();
  monitor.startMonitoring();

  // Set up memory warnings
  monitor.subscribe(stats => {
    if (stats.percentage > 90) {
      console.warn('High memory usage detected:', stats);
    }
  });

  // Set up automatic cleanup
  const cleanup = () => {
    // Clear unused caches
    if ('gc' in window) {
      (window as any).gc();
    }
  };

  // Cleanup every 30 seconds
  setInterval(cleanup, 30000);

  return () => {
    monitor.stopMonitoring();
  };
}
