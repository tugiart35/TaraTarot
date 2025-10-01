/**
 * Advanced Image Optimization Component
 * Provides comprehensive image optimization with multiple formats and lazy loading
 */

import Image from 'next/image';
import { useState } from 'react';

interface AdvancedImageOptimizationProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export function AdvancedImageOptimization({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
}: AdvancedImageOptimizationProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasError ? (
        <div className="flex items-center justify-center bg-gray-100 text-gray-400 w-full h-full min-h-[200px]">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Görsel yüklenemedi</p>
          </div>
        </div>
      ) : (
        <Image
          {...({
            src,
            alt,
            width,
            height,
            priority,
            quality,
            sizes,
            placeholder,
            blurDataURL,
            loading,
            onLoad: handleLoad,
            onError: handleError,
            className: `transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`,
            style: {
              objectFit: 'cover',
            }
          } as any)}
        />
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
}

// Specialized components for different image types
export function TarotCardImage({ 
  src, 
  alt, 
  cardName,
  className = '' 
}: { 
  src: string; 
  alt: string; 
  cardName: string;
  className?: string;
}) {
  return (
    <AdvancedImageOptimization
      src={src}
      alt={`${cardName} tarot kartı - ${alt}`}
      width={300}
      height={500}
      quality={90}
      sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 300px"
      className={`rounded-lg shadow-lg ${className}`}
      placeholder="blur"
    />
  );
}

export function HeroImage({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <AdvancedImageOptimization
      src={src}
      alt={alt}
      width={1200}
      height={630}
      priority={true}
      quality={85}
      sizes="100vw"
      className={`w-full h-auto ${className}`}
      placeholder="blur"
    />
  );
}

export function ThumbnailImage({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <AdvancedImageOptimization
      src={src}
      alt={alt}
      width={150}
      height={150}
      quality={80}
      sizes="(max-width: 640px) 100px, 150px"
      className={`rounded-md ${className}`}
      placeholder="blur"
    />
  );
}

export default AdvancedImageOptimization;
