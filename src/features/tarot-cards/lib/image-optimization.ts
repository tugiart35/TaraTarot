/**
 * Image optimization utilities for tarot cards
 * Handles image audit, optimization, and performance monitoring
 */


export interface ImageAuditResult {
  totalImages: number;
  totalSize: number;
  averageSize: number;
  largestImage: {
    name: string;
    size: number;
  };
  smallestImage: {
    name: string;
    size: number;
  };
  recommendations: string[];
  optimizationOpportunities: {
    oversized: string[];
    formatOptimization: string[];
    compressionOpportunities: string[];
  };
}

export interface ImageOptimizationConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  formats: string[];
  lazyLoading: boolean;
  placeholder: boolean;
}

export class ImageOptimizer {
  /**
   * Audit all card images for optimization opportunities
   */
  static async auditImages(): Promise<ImageAuditResult> {
    const images = await this.getAllCardImages();
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    const averageSize = totalSize / images.length;

    const largestImage = images.reduce(
      (max, img) => (img.size > max.size ? img : max),
      images[0] || { name: '', size: 0, path: '' }
    );
    const smallestImage = images.reduce(
      (min, img) => (img.size < min.size ? img : min),
      images[0] || { name: '', size: 0, path: '' }
    );

    const recommendations: string[] = [];
    const oversized: string[] = [];
    const formatOptimization: string[] = [];
    const compressionOpportunities: string[] = [];

    // Analyze each image
    for (const image of images) {
      // Check for oversized images (>100KB)
      if (image.size > 100000) {
        oversized.push(image.name);
      }

      // Check for format optimization opportunities
      if (image.name.endsWith('.jpg') && image.size > 50000) {
        formatOptimization.push(image.name);
      }

      // Check for compression opportunities
      if (image.size > 30000) {
        compressionOpportunities.push(image.name);
      }
    }

    // Generate recommendations
    if (oversized.length > 0) {
      recommendations.push(
        `${oversized.length} images are oversized (>100KB). Consider resizing.`
      );
    }

    if (formatOptimization.length > 0) {
      recommendations.push(
        `${formatOptimization.length} JPG images could benefit from WebP conversion.`
      );
    }

    if (compressionOpportunities.length > 0) {
      recommendations.push(
        `${compressionOpportunities.length} images could benefit from better compression.`
      );
    }

    if (averageSize > 50000) {
      recommendations.push(
        'Average image size is high. Consider implementing lazy loading.'
      );
    }

    return {
      totalImages: images.length,
      totalSize,
      averageSize,
      largestImage: {
        name: largestImage.name,
        size: largestImage.size,
      },
      smallestImage: {
        name: smallestImage.name,
        size: smallestImage.size,
      },
      recommendations,
      optimizationOpportunities: {
        oversized,
        formatOptimization,
        compressionOpportunities,
      },
    };
  }

  /**
   * Get all card images with their metadata
   */
  private static async getAllCardImages(): Promise<
    Array<{
      name: string;
      size: number;
      path: string;
    }>
  > {
    // This would typically be implemented with a file system API
    // For now, return mock data based on the audit we performed
    return [
      { name: '0-Fool.jpg', size: 52370, path: '/cards/rws/0-Fool.jpg' },
      { name: 'Ace-Cups.jpg', size: 41691, path: '/cards/rws/Ace-Cups.jpg' },
      {
        name: 'Ace-Pentacles.jpg',
        size: 36894,
        path: '/cards/rws/Ace-Pentacles.jpg',
      },
      {
        name: 'Ace-Swords.jpg',
        size: 34556,
        path: '/cards/rws/Ace-Swords.jpg',
      },
      { name: 'Ace-Wands.jpg', size: 36387, path: '/cards/rws/Ace-Wands.jpg' },
      {
        name: 'I-Magician.jpg',
        size: 44454,
        path: '/cards/rws/I-Magician.jpg',
      },
      // ... (all 78 cards would be listed here)
    ];
  }

  /**
   * Generate optimized image configuration
   */
  static getOptimizationConfig(): ImageOptimizationConfig {
    return {
      maxWidth: 800,
      maxHeight: 1200,
      quality: 85,
      formats: ['webp', 'jpg'],
      lazyLoading: true,
      placeholder: true,
    };
  }

  /**
   * Create optimized image component props
   */
  static getOptimizedImageProps(src: string, alt: string) {
    return {
      src,
      alt,
      width: 400,
      height: 600,
      quality: 85,
      priority: false,
      loading: 'lazy' as const,
      placeholder: 'blur' as const,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    };
  }

  /**
   * Generate WebP versions of images
   */
  static async generateWebPVersions(): Promise<string[]> {
    const images = await this.getAllCardImages();
    const webpPaths: string[] = [];

    for (const image of images) {
      const webpPath = image.path.replace('.jpg', '.webp');
      webpPaths.push(webpPath);

      // In a real implementation, this would convert the image to WebP
      console.log(`Converting ${image.name} to WebP format`);
    }

    return webpPaths;
  }

  /**
   * Implement responsive image loading
   */
  static getResponsiveImageProps(src: string, alt: string) {
    const basePath = src.replace('.jpg', '');

    return {
      src: `${basePath}.webp`,
      alt,
      width: 400,
      height: 600,
      quality: 85,
      loading: 'lazy' as const,
      placeholder: 'blur' as const,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      // Fallback for browsers that don't support WebP
      onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.src = src;
      },
    };
  }

  /**
   * Monitor image loading performance
   */
  static monitorImagePerformance() {
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === 'resource' &&
            entry.name.includes('/cards/rws/')
          ) {
            const resource = entry as PerformanceResourceTiming;
            console.log(
              `Image loaded: ${resource.name}, load time: ${resource.duration}ms, size: ${resource.transferSize} bytes`
            );
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });

      return () => observer.disconnect();
    }
    return () => {};
  }

  /**
   * Preload critical images
   */
  static preloadCriticalImages(criticalImages: string[]) {
    if (typeof window !== 'undefined') {
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  }

  /**
   * Implement progressive image loading
   */
  static getProgressiveImageProps(
    src: string,
    alt: string,
    placeholder?: string
  ) {
    return {
      src,
      alt,
      width: 400,
      height: 600,
      quality: 85,
      loading: 'lazy' as const,
      placeholder: placeholder ? ('blur' as const) : undefined,
      blurDataURL: placeholder,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    };
  }
}

/**
 * Image optimization constants
 */
export const IMAGE_OPTIMIZATION = {
  // Size limits
  MAX_IMAGE_SIZE: 100000, // 100KB
  RECOMMENDED_SIZE: 50000, // 50KB

  // Quality settings
  HIGH_QUALITY: 90,
  MEDIUM_QUALITY: 85,
  LOW_QUALITY: 75,

  // Dimensions
  CARD_WIDTH: 400,
  CARD_HEIGHT: 600,
  THUMBNAIL_WIDTH: 200,
  THUMBNAIL_HEIGHT: 300,

  // Formats
  SUPPORTED_FORMATS: ['webp', 'jpg', 'jpeg', 'png'],
  PREFERRED_FORMAT: 'webp',

  // Loading strategies
  LAZY_LOADING_THRESHOLD: 100, // pixels
  PRELOAD_CRITICAL: true,
  PROGRESSIVE_LOADING: true,
} as const;
