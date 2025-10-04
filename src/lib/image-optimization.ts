import { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  isLCP?: boolean;
}

export const getOptimizedImageProps = (
  src: string,
  alt: string,
  options: { priority?: boolean; isLCP?: boolean; quality?: number } = {}
): OptimizedImageProps => {
  const { priority = false, isLCP = false, quality = 85 } = options;

  return {
    src,
    alt,
    priority: priority || isLCP,
    quality,
    loading: priority || isLCP ? 'eager' : 'lazy',
    fetchPriority: priority || isLCP ? 'high' : 'auto',
    sizes: isLCP
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      : '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw',
    placeholder: 'blur',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  };
};

export const preloadImage = (src: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }
};

export const generateResponsiveImages = (baseSrc: string): string[] => {
  const sizes = [400, 600, 800, 1200];
  return sizes.map(size => `${baseSrc}?w=${size}&q=85&f=webp`);
};
