/**
 * Build time optimization for 234 static pages
 * Implements parallel generation, caching, and performance monitoring
 */

export interface BuildConfig {
  parallelPages: number;
  cacheEnabled: boolean;
  incrementalBuild: boolean;
  compressionEnabled: boolean;
  monitoringEnabled: boolean;
}

export interface BuildStats {
  totalPages: number;
  generatedPages: number;
  failedPages: number;
  buildTime: number;
  averagePageTime: number;
  memoryUsage: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface PageGenerationResult {
  success: boolean;
  pagePath: string;
  generationTime: number;
  error?: string;
  cacheHit?: boolean;
}

/**
 * Build optimization utilities
 */
export class BuildOptimizer {
  private static instance: BuildOptimizer;
  private cache = new Map<string, any>();
  private stats: BuildStats = {
    totalPages: 0,
    generatedPages: 0,
    failedPages: 0,
    buildTime: 0,
    averagePageTime: 0,
    memoryUsage: 0,
    cacheHits: 0,
    cacheMisses: 0,
  };

  static getInstance(): BuildOptimizer {
    if (!BuildOptimizer.instance) {
      BuildOptimizer.instance = new BuildOptimizer();
    }
    return BuildOptimizer.instance;
  }

  /**
   * Generate pages in parallel batches
   */
  async generatePagesInBatches(
    pages: Array<{ path: string; data: any }>,
    batchSize: number = 10
  ): Promise<PageGenerationResult[]> {
    const results: PageGenerationResult[] = [];
    const startTime = Date.now();

    this.stats.totalPages = pages.length;

    // Process pages in batches
    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(page => this.generatePage(page.path, page.data))
      );

      // Process batch results
      batchResults.forEach((result, index) => {
        const page = batch[index];
        if (page && result.status === 'fulfilled') {
          results.push({
            success: true,
            pagePath: page.path,
            generationTime: result.value.generationTime,
            cacheHit: result.value.cacheHit,
          });
          this.stats.generatedPages++;
        } else if (page) {
          results.push({
            success: false,
            pagePath: page.path,
            generationTime: 0,
            error:
              result.status === 'rejected'
                ? result.reason?.message || 'Unknown error'
                : 'Unknown error',
          });
          this.stats.failedPages++;
        }
      });

      // Update stats
      this.stats.buildTime = Date.now() - startTime;
      this.stats.averagePageTime = this.stats.buildTime / (i + batch.length);
    }

    return results;
  }

  /**
   * Generate a single page with caching
   */
  private async generatePage(
    path: string,
    data: any
  ): Promise<{ generationTime: number; cacheHit: boolean }> {
    const startTime = Date.now();
    const cacheKey = this.getCacheKey(path, data);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return {
        generationTime: Date.now() - startTime,
        cacheHit: true,
      };
    }

    this.stats.cacheMisses++;

    try {
      // Simulate page generation
      await this.simulatePageGeneration(path, data);

      // Cache the result
      this.cache.set(cacheKey, {
        path,
        data,
        timestamp: Date.now(),
      });

      return {
        generationTime: Date.now() - startTime,
        cacheHit: false,
      };
    } catch (error) {
      throw new Error(`Failed to generate page ${path}: ${error}`);
    }
  }

  /**
   * Simulate page generation
   */
  private async simulatePageGeneration(
    _path: string,
    data: any
  ): Promise<void> {
    // Simulate different generation times based on content complexity
    const complexity = this.calculateContentComplexity(data);
    const delay = Math.random() * complexity * 100; // 0-1000ms based on complexity

    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Calculate content complexity for optimization
   */
  private calculateContentComplexity(data: any): number {
    let complexity = 1;

    // Factor in content size
    const contentSize = JSON.stringify(data).length;
    complexity += Math.log(contentSize) / 10;

    // Factor in number of images
    if (data.images) {
      complexity += data.images.length * 0.1;
    }

    // Factor in FAQ items
    if (data.faq) {
      complexity += data.faq.length * 0.05;
    }

    return Math.min(complexity, 10); // Cap at 10
  }

  /**
   * Generate cache key for page
   */
  private getCacheKey(path: string, data: any): string {
    const dataHash = this.hashObject(data);
    return `${path}-${dataHash}`;
  }

  /**
   * Simple hash function for objects
   */
  private hashObject(obj: any): string {
    return JSON.stringify(obj)
      .split('')
      .reduce((hash, char) => {
        const code = char.charCodeAt(0);
        return ((hash << 5) - hash + code) & 0xffffffff;
      }, 0)
      .toString(36);
  }

  /**
   * Get build statistics
   */
  getStats(): BuildStats {
    return { ...this.stats };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    this.stats.cacheHits = 0;
    this.stats.cacheMisses = 0;
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

/**
 * Incremental build optimization
 */
export class IncrementalBuildOptimizer {
  private static instance: IncrementalBuildOptimizer;
  private changedPages = new Set<string>();
  private dependencyGraph = new Map<string, Set<string>>();

  static getInstance(): IncrementalBuildOptimizer {
    if (!IncrementalBuildOptimizer.instance) {
      IncrementalBuildOptimizer.instance = new IncrementalBuildOptimizer();
    }
    return IncrementalBuildOptimizer.instance;
  }

  /**
   * Track page dependencies
   */
  addDependency(page: string, dependency: string): void {
    if (!this.dependencyGraph.has(page)) {
      this.dependencyGraph.set(page, new Set());
    }
    this.dependencyGraph.get(page)!.add(dependency);
  }

  /**
   * Mark page as changed
   */
  markPageChanged(page: string): void {
    this.changedPages.add(page);

    // Mark dependent pages as changed
    this.dependencyGraph.forEach((dependencies, dependentPage) => {
      if (dependencies.has(page)) {
        this.changedPages.add(dependentPage);
      }
    });
  }

  /**
   * Get pages that need regeneration
   */
  getPagesToRegenerate(): string[] {
    return Array.from(this.changedPages);
  }

  /**
   * Clear changed pages
   */
  clearChangedPages(): void {
    this.changedPages.clear();
  }

  /**
   * Check if page needs regeneration
   */
  needsRegeneration(page: string): boolean {
    return this.changedPages.has(page);
  }
}

/**
 * Build performance monitoring
 */
export class BuildPerformanceMonitor {
  private static instance: BuildPerformanceMonitor;
  private metrics: Array<{
    timestamp: number;
    operation: string;
    duration: number;
    memoryUsage: number;
  }> = [];

  static getInstance(): BuildPerformanceMonitor {
    if (!BuildPerformanceMonitor.instance) {
      BuildPerformanceMonitor.instance = new BuildPerformanceMonitor();
    }
    return BuildPerformanceMonitor.instance;
  }

  /**
   * Start monitoring an operation
   */
  startOperation(operation: string): () => void {
    const startTime = Date.now();
    const startMemory = this.getMemoryUsage();

    return () => {
      const endTime = Date.now();
      const endMemory = this.getMemoryUsage();

      this.metrics.push({
        timestamp: startTime,
        operation,
        duration: endTime - startTime,
        memoryUsage: endMemory - startMemory,
      });
    };
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Array<{
    operation: string;
    averageDuration: number;
    totalDuration: number;
    count: number;
    averageMemoryUsage: number;
  }> {
    const operationMap = new Map<string, number[]>();
    const memoryMap = new Map<string, number[]>();

    this.metrics.forEach(metric => {
      if (!operationMap.has(metric.operation)) {
        operationMap.set(metric.operation, []);
        memoryMap.set(metric.operation, []);
      }
      operationMap.get(metric.operation)!.push(metric.duration);
      memoryMap.get(metric.operation)!.push(metric.memoryUsage);
    });

    return Array.from(operationMap.entries()).map(([operation, durations]) => ({
      operation,
      averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      totalDuration: durations.reduce((a, b) => a + b, 0),
      count: durations.length,
      averageMemoryUsage:
        memoryMap.get(operation)!.reduce((a, b) => a + b, 0) / durations.length,
    }));
  }

  /**
   * Get memory usage
   */
  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Clear metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }
}

/**
 * Build configuration
 */
export const BUILD_CONFIG: BuildConfig = {
  parallelPages: 10,
  cacheEnabled: true,
  incrementalBuild: true,
  compressionEnabled: true,
  monitoringEnabled: true,
};

/**
 * Optimize build process
 */
export async function optimizeBuild(
  pages: Array<{ path: string; data: any }>,
  config: Partial<BuildConfig> = {}
): Promise<PageGenerationResult[]> {
  const finalConfig = { ...BUILD_CONFIG, ...config };
  const optimizer = BuildOptimizer.getInstance();
  const monitor = BuildPerformanceMonitor.getInstance();

  // Start monitoring
  const stopMonitoring = monitor.startOperation('build-optimization');

  try {
    // Generate pages in parallel batches
    const results = await optimizer.generatePagesInBatches(
      pages,
      finalConfig.parallelPages
    );

    // Stop monitoring
    stopMonitoring();

    // Log performance metrics
    if (finalConfig.monitoringEnabled) {
      const metrics = monitor.getMetrics();
      console.log('Build Performance Metrics:', metrics);
    }

    return results;
  } catch (error) {
    stopMonitoring();
    throw error;
  }
}

/**
 * Initialize build optimization
 */
export function initializeBuildOptimization(): void {
  // Initialize optimizers
  BuildOptimizer.getInstance();
  IncrementalBuildOptimizer.getInstance();
  BuildPerformanceMonitor.getInstance();

  console.log('Build optimization initialized');
}
