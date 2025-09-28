/**
 * Image optimization utilities
 * Kart resimlerinin optimizasyonu için yardımcı fonksiyonlar
 */

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  blur?: boolean;
}

/**
 * Responsive image sizes için breakpoint'ler
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xlarge: 1536,
} as const;

/**
 * Kart boyutlarına göre optimal image sizes
 */
export const CARD_IMAGE_SIZES = {
  small: {
    width: 100,
    height: 150,
    sizes: '(max-width: 640px) 100px, 100px',
  },
  medium: {
    width: 150,
    height: 225,
    sizes: '(max-width: 640px) 120px, (max-width: 768px) 150px, 150px',
  },
  large: {
    width: 200,
    height: 300,
    sizes:
      '(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 200px',
  },
  xlarge: {
    width: 250,
    height: 375,
    sizes:
      '(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 250px, 250px',
  },
} as const;

/**
 * Kart tipine göre optimal quality ayarları
 */
export const CARD_QUALITY_SETTINGS = {
  thumbnail: 60,
  preview: 75,
  detail: 85,
  print: 95,
} as const;

/**
 * Kritik kartlar (ilk yüklenenler)
 */
export const CRITICAL_CARDS = [
  '/cards/CardBack.jpg',
  '/cards/rws/0-Fool.jpg',
  '/cards/rws/I-Magician.jpg',
  '/cards/rws/II-HighPriestess.jpg',
  '/cards/rws/III-Empress.jpg',
  '/cards/rws/IV-Emperor.jpg',
];

/**
 * Image format detection
 */
export function getOptimalImageFormat(): 'webp' | 'avif' | 'jpeg' {
  if (typeof window === 'undefined') {
    return 'jpeg';
  }

  // AVIF support check
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  try {
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
      ? 'avif'
      : 'webp';
  } catch {
    return 'webp';
  }
}

/**
 * Device pixel ratio'ya göre optimal quality
 */
export function getOptimalQuality(baseQuality: number = 85): number {
  if (typeof window === 'undefined') {
    return baseQuality;
  }

  const dpr = window.devicePixelRatio || 1;

  // Yüksek DPR'da quality'yi düşür (dosya boyutu için)
  if (dpr >= 3) {
    return Math.max(60, baseQuality - 15);
  }
  if (dpr >= 2) {
    return Math.max(70, baseQuality - 10);
  }

  return baseQuality;
}

/**
 * Network connection'a göre optimal settings
 */
export function getNetworkOptimizedSettings() {
  if (typeof navigator === 'undefined') {
    return { quality: 85, format: 'jpeg' as const };
  }

  const connection = (navigator as any).connection;

  if (!connection) {
    return { quality: 85, format: getOptimalImageFormat() };
  }

  const { effectiveType, saveData } = connection;

  // Data saver mode
  if (saveData) {
    return { quality: 60, format: 'jpeg' as const };
  }

  // Network speed based optimization
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return { quality: 50, format: 'jpeg' as const };
    case '3g':
      return { quality: 70, format: 'webp' as const };
    case '4g':
    default:
      return { quality: 85, format: getOptimalImageFormat() };
  }
}

/**
 * Image preload priority calculation
 */
export function getImagePriority(imageUrl: string): boolean {
  return CRITICAL_CARDS.includes(imageUrl);
}

/**
 * Lazy loading threshold calculation
 */
export function getLazyLoadingThreshold(): number {
  if (typeof window === 'undefined') {
    return 0.1;
  }

  const connection = (navigator as any).connection;

  if (!connection) {
    return 0.1;
  }

  const { effectiveType } = connection;

  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 0.5; // Daha erken yükle
    case '3g':
      return 0.3;
    case '4g':
    default:
      return 0.1;
  }
}

/**
 * Image cache key generation
 */
export function generateImageCacheKey(
  imageUrl: string,
  options: ImageOptimizationOptions
): string {
  const params = new URLSearchParams({
    q: String(options.quality || 85),
    f: options.format || 'webp',
    w: String(options.width || 0),
    h: String(options.height || 0),
  });

  return `${imageUrl}?${params.toString()}`;
}

/**
 * Image loading error handling
 */
export function handleImageError(
  error: Error,
  imageUrl: string,
  fallbackUrl?: string
): string {
  console.warn(`Image loading failed: ${imageUrl}`, error);

  if (fallbackUrl) {
    return fallbackUrl;
  }

  // Default fallback
  return '/cards/CardBack.jpg';
}
