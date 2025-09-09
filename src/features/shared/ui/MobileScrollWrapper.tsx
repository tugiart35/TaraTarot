'use client';

import React from 'react';
import { useTouchScroll } from '@/hooks/useTouchScroll';

interface MobileScrollWrapperProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  momentum?: boolean;
  snapToGrid?: boolean;
  onScroll?: (_scrollLeft: number, _scrollTop: number) => void;
  onScrollEnd?: () => void;
}

export default function MobileScrollWrapper({
  children,
  direction = 'horizontal',
  className = '',
  momentum = true,
  snapToGrid = false,
  onScroll,
  onScrollEnd,
}: MobileScrollWrapperProps) {
  const { scrollRef, isScrolling } = useTouchScroll({
    direction,
    momentum,
    snapToGrid,
    onScroll,
    onScrollEnd,
  });

  const getScrollClasses = () => {
    const baseClasses = 'mobile-scroll touch-scroll';

    if (direction === 'horizontal') {
      return `${baseClasses} horizontal-scroll`;
    } else {
      return `${baseClasses} vertical-scroll`;
    }
  };

  return (
    <div
      ref={scrollRef}
      className={`${getScrollClasses()} ${className}`}
      style={{
        pointerEvents: isScrolling ? 'none' : 'auto',
        userSelect: 'none',
      }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            style: {
              ...child.props.style,
              pointerEvents: isScrolling ? 'none' : 'auto',
            },
          } as any);
        }
        return child;
      })}
    </div>
  );
}
