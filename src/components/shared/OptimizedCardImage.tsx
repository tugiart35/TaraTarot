import Image from 'next/image';
import { memo, useState } from 'react';
import { validateImageSrc } from '@/utils/security';

interface OptimizedCardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  isReversed?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onError?: () => void;
}

const OptimizedCardImage = memo(function OptimizedCardImage({
  src,
  alt,
  width = 200,
  height = 300,
  className = '',
  isReversed = false,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onError,
}: OptimizedCardImageProps) {
  const [hasError, setHasError] = useState(false);

  // Güvenlik kontrolü
  if (!validateImageSrc(src) || hasError) {
    return (
      <div 
        className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className='text-gray-500 text-sm'>Güvenli olmayan resim</span>
      </div>
    );
  }

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        className={`object-cover transition-transform duration-500 ${
          isReversed ? 'rotate-180' : ''
        }`}
        onError={handleError}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
});

export default OptimizedCardImage;
