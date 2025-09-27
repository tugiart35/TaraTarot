'use client';

import { useEffect } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { CRITICAL_CARDS } from '@/utils/image-optimization';

interface CardImagePreloaderProps {
  cardImages?: string[];
  children: React.ReactNode;
}

/**
 * Kritik kart resimlerini preload eden component
 */
export default function CardImagePreloader({ 
  cardImages = CRITICAL_CARDS, 
  children 
}: CardImagePreloaderProps) {
  const { allLoaded } = useImagePreloader(cardImages, {
    priority: true,
    crossOrigin: 'anonymous',
  });

  useEffect(() => {
    if (allLoaded) {
      console.log('Critical card images preloaded successfully');
    }
  }, [allLoaded]);

  return <>{children}</>;
}
