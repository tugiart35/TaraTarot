import { useEffect, useState } from 'react';

interface PreloadOptions {
  priority?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

/**
 * Kritik kart resimlerini preload eder
 */
export function useImagePreloader(
  imageUrls: string[],
  options: PreloadOptions = {}
) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map(url => {
        if (loadedImages.has(url) || loadingImages.has(url)) {
          return Promise.resolve();
        }

        setLoadingImages(prev => new Set(prev).add(url));

        return new Promise<void>((resolve, reject) => {
          const img = new Image();

          if (options.crossOrigin) {
            img.crossOrigin = options.crossOrigin;
          }

          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(url));
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
            resolve();
          };

          img.onerror = () => {
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
            reject(new Error(`Failed to load image: ${url}`));
          };

          img.src = url;
        });
      });

      try {
        await Promise.allSettled(promises);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    if (imageUrls.length > 0) {
      preloadImages();
    }
  }, [imageUrls, loadedImages, loadingImages, options]);

  return {
    loadedImages,
    loadingImages,
    isLoaded: (url: string) => loadedImages.has(url),
    isLoading: (url: string) => loadingImages.has(url),
    allLoaded: imageUrls.every(url => loadedImages.has(url)),
  };
}

/**
 * Intersection Observer ile lazy loading
 */
export function useLazyImageLoader(
  ref: React.RefObject<HTMLElement>,
  imageUrl: string,
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = imageUrl;
    }
  }, [isVisible, imageUrl, isLoaded]);

  return { isVisible, isLoaded };
}
