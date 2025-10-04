import { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
}

export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const params = new URLSearchParams();
  params.append('w', width.toString());
  if (quality) {
    params.append('q', quality.toString());
  }
  return `/api/image?${params.toString()}&url=${encodeURIComponent(src)}`;
};

export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = src;
  });
};

export const optimizeImageProps = (
  src: string,
  alt: string,
  priority = false
): OptimizedImageProps => ({
  src,
  alt,
  priority,
  quality: 85,
  loading: priority ? 'eager' : 'lazy',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
});
