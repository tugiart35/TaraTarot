'use client';

import { useState, useEffect } from 'react';
import { dynamicImports } from '@/lib/optimization/aggressive-bundle-optimizer';

interface AnimationProps {
  children: React.ReactNode;
  animation: 'fade' | 'slide' | 'bounce';
  onAnimate?: (animation: any) => void;
}

export function DynamicAnimation({
  children,
  animation,
  onAnimate,
}: AnimationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [AnimationComponent, setAnimationComponent] = useState<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dinamik olarak framer-motion kütüphanesini yükle
        const framerMotion = await dynamicImports.animations.framerMotion();

        // Animation component'ini seç
        let component;
        switch (animation) {
          case 'fade':
            component = framerMotion.motion.div;
            break;
          case 'slide':
            component = framerMotion.motion.div;
            break;
          case 'bounce':
            component = framerMotion.motion.div;
            break;
          default:
            component = framerMotion.motion.div;
        }

        setAnimationComponent(() => component);

        if (onAnimate) {
          onAnimate(component);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Animation yükleme hatası'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, [animation, onAnimate]);

  if (isLoading) {
    return <div className='p-4'>Animation yükleniyor...</div>;
  }

  if (error) {
    return <div className='p-4 text-red-500'>{error}</div>;
  }

  if (!AnimationComponent) {
    return <div className='p-4'>{children}</div>;
  }

  // Animation props'ları
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <AnimationComponent {...animationProps}>{children}</AnimationComponent>
  );
}
