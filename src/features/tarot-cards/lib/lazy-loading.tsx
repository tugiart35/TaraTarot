/**
 * Lazy loading optimization for tarot card images and components
 * Implements intersection observer, progressive loading, and performance optimization
 */

import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';

export interface LazyLoadingConfig {
  rootMargin: string;
  threshold: number;
  delay: number;
  placeholder: boolean;
  progressive: boolean;
  preload: boolean;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lazy loading hook for images
 */
export function useLazyImage(
  _src: string,
  options: {
    threshold?: number;
    rootMargin?: string;
    delay?: number;
  } = {}
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { threshold = 0.1, rootMargin = '50px', delay = 0 } = options;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsInView(true), delay);
          } else {
            setIsInView(true);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return {
    imgRef,
    isLoaded,
    isInView,
    hasError,
    handleLoad,
    handleError,
  };
}

/**
 * Lazy loading hook for components
 */
export function useLazyComponent(
  options: {
    threshold?: number;
    rootMargin?: string;
    delay?: number;
  } = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { threshold = 0.1, rootMargin = '100px', delay = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setIsLoaded(true);
            }, delay);
          } else {
            setIsVisible(true);
            setIsLoaded(true);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible, isLoaded };
}

/**
 * Lazy Image Component
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  onLoad,
  onError,
}: LazyImageProps) {
  const { imgRef, isLoaded, isInView, hasError, handleLoad, handleError } =
    useLazyImage(src, {
      threshold: 0.1,
      rootMargin: '50px',
    });

  const handleImageLoad = useCallback(() => {
    handleLoad();
    onLoad?.();
  }, [handleLoad, onLoad]);

  const handleImageError = useCallback(() => {
    handleError();
    onError?.();
  }, [handleError, onError]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center'
          style={{ width, height }}
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=''
              className='w-full h-full object-cover opacity-50'
            />
          ) : (
            <div className='w-8 h-8 bg-gray-300 rounded'></div>
          )}
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading='lazy'
          decoding='async'
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className='absolute inset-0 bg-gray-100 flex items-center justify-center'
          style={{ width, height }}
        >
          <div className='text-center text-gray-500'>
            <div className='w-8 h-8 mx-auto mb-2'>📷</div>
            <p className='text-sm'>Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Lazy Component Wrapper
 */
export function LazyComponent({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
}: LazyComponentProps) {
  const { ref, isVisible } = useLazyComponent({
    threshold,
    rootMargin,
  });

  return (
    <div ref={ref}>
      {isVisible ? (
        <div className='animate-fade-in'>{children}</div>
      ) : (
        fallback || <DefaultLazyFallback />
      )}
    </div>
  );
}

/**
 * Progressive Image Loading
 */
export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  lowQualitySrc,
  onLoad,
  onError,
}: LazyImageProps & { lowQualitySrc?: string }) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || '');
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const {
    imgRef,
    isLoaded: _isLoaded,
    isInView,
    hasError,
    handleLoad,
    handleError,
  } = useLazyImage(src, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (isInView && !isHighQualityLoaded) {
      setCurrentSrc(src);
    }
  }, [isInView, src, isHighQualityLoaded]);

  const handleImageLoad = useCallback(() => {
    if (currentSrc === src) {
      setIsHighQualityLoaded(true);
    }
    handleLoad();
    onLoad?.();
  }, [currentSrc, src, handleLoad, onLoad]);

  const handleImageError = useCallback(() => {
    handleError();
    onError?.();
  }, [handleError, onError]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Low quality image */}
      {lowQualitySrc && !isHighQualityLoaded && (
        <img
          src={lowQualitySrc}
          alt={alt}
          width={width}
          height={height}
          className='absolute inset-0 w-full h-full object-cover filter blur-sm'
        />
      )}

      {/* High quality image */}
      {isInView && currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHighQualityLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading='lazy'
          decoding='async'
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className='absolute inset-0 bg-gray-100 flex items-center justify-center'
          style={{ width, height }}
        >
          <div className='text-center text-gray-500'>
            <div className='w-8 h-8 mx-auto mb-2'>📷</div>
            <p className='text-sm'>Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Lazy Loading Configuration
 */
export const LAZY_LOADING_CONFIG: LazyLoadingConfig = {
  rootMargin: '50px',
  threshold: 0.1,
  delay: 0,
  placeholder: true,
  progressive: true,
  preload: true,
};

/**
 * Default fallback component
 */
const DefaultLazyFallback = () => (
  <div className='flex items-center justify-center p-4'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
  </div>
);

/**
 * Lazy loading utilities
 */
export class LazyLoadingUtils {
  /**
   * Preload images based on user behavior
   */
  static preloadImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  /**
   * Preload images on hover
   */
  static preloadOnHover(imageUrl: string) {
    return {
      onMouseEnter: () => {
        const img = new Image();
        img.src = imageUrl;
      },
    };
  }

  /**
   * Preload images on focus
   */
  static preloadOnFocus(imageUrl: string) {
    return {
      onFocus: () => {
        const img = new Image();
        img.src = imageUrl;
      },
    };
  }

  /**
   * Generate responsive image sources
   */
  static generateResponsiveSources(baseSrc: string, sizes: number[]) {
    return sizes.map(size => ({
      src: `${baseSrc}?w=${size}`,
      width: size,
      media: `(max-width: ${size}px)`,
    }));
  }

  /**
   * Generate WebP sources with fallback
   */
  static generateWebPSources(baseSrc: string, sizes: number[]) {
    const webpSources = sizes.map(size => ({
      src: `${baseSrc.replace('.jpg', '.webp')}?w=${size}`,
      width: size,
      type: 'image/webp',
    }));

    const fallbackSources = sizes.map(size => ({
      src: `${baseSrc}?w=${size}`,
      width: size,
      type: 'image/jpeg',
    }));

    return [...webpSources, ...fallbackSources];
  }

  /**
   * Monitor lazy loading performance
   */
  static monitorLazyLoading() {
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === 'resource' &&
            entry.name.includes('/cards/rws/')
          ) {
            const resource = entry as PerformanceResourceTiming;
            console.log(
              `Lazy loaded image: ${resource.name}, load time: ${resource.duration}ms`
            );
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      return () => observer.disconnect();
    }
    return () => {};
  }
}

/**
 * Initialize lazy loading
 */
export function initializeLazyLoading() {
  // Set up global lazy loading configuration
  if (typeof window !== 'undefined') {
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    // Start monitoring
    LazyLoadingUtils.monitorLazyLoading();
  }
}
