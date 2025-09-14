'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

interface UseTouchScrollOptions {
  direction?: 'horizontal' | 'vertical';
  snapToGrid?: boolean;
  snapThreshold?: number;
  momentum?: boolean;
  onScroll?: (scrollLeft: number, scrollTop: number) => void;
  onScrollEnd?: () => void;
}

interface UseTouchScrollReturn {
  scrollRef: React.RefObject<HTMLDivElement>;
  isScrolling: boolean;
  scrollTo: (position: number, smooth?: boolean) => void;
  scrollToElement: (element: HTMLElement, smooth?: boolean) => void;
}

export function useTouchScroll({
  direction = 'horizontal',
  // snapToGrid = false,
  // snapThreshold = 50,
  momentum = true,
  onScroll,
  onScrollEnd,
}: UseTouchScrollOptions = {}): UseTouchScrollReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const animationId = useRef<number>();

  // Touch start handler
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      startPos.current = { x: touch.clientX, y: touch.clientY };
      currentPos.current = { x: touch.clientX, y: touch.clientY };
    }
    lastTime.current = Date.now();
    velocity.current = { x: 0, y: 0 };

    setIsScrolling(true);

    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
    }
  }, []);

  // Touch move handler
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!scrollRef.current) {
        return;
      }

      e.preventDefault();

      const touch = e.touches[0];
      if (touch) {
        const deltaX = touch.clientX - currentPos.current.x;
        const deltaY = touch.clientY - currentPos.current.y;
        const deltaTime = Date.now() - lastTime.current;

        // Calculate velocity
        if (deltaTime > 0) {
          velocity.current.x = deltaX / deltaTime;
          velocity.current.y = deltaY / deltaTime;
        }

        currentPos.current = { x: touch.clientX, y: touch.clientY };
      }
      lastTime.current = Date.now();

      // Apply scroll
      if (touch) {
        const deltaX = touch.clientX - currentPos.current.x;
        const deltaY = touch.clientY - currentPos.current.y;
        if (direction === 'horizontal') {
          scrollRef.current.scrollLeft -= deltaX;
        } else {
          scrollRef.current.scrollTop -= deltaY;
        }
      }

      // Call onScroll callback
      if (onScroll) {
        onScroll(scrollRef.current.scrollLeft, scrollRef.current.scrollTop);
      }
    },
    [direction, onScroll]
  );

  // Touch end handler
  const handleTouchEnd = useCallback(() => {
    setIsScrolling(false);

    if (!scrollRef.current || !momentum) {
      if (onScrollEnd) {
        onScrollEnd();
      }
      return;
    }

    // Apply momentum scrolling
    const applyMomentum = () => {
      if (!scrollRef.current) {
        return;
      }

      const decay = 0.95;
      velocity.current.x *= decay;
      velocity.current.y *= decay;

      if (
        Math.abs(velocity.current.x) > 0.1 ||
        Math.abs(velocity.current.y) > 0.1
      ) {
        if (direction === 'horizontal') {
          scrollRef.current.scrollLeft -= velocity.current.x * 16; // 60fps
        } else {
          scrollRef.current.scrollTop -= velocity.current.y * 16;
        }

        if (onScroll) {
          onScroll(scrollRef.current.scrollLeft, scrollRef.current.scrollTop);
        }

        animationId.current = requestAnimationFrame(applyMomentum);
      } else {
        if (onScrollEnd) {
          onScrollEnd();
        }
      }
    };

    animationId.current = requestAnimationFrame(applyMomentum);
  }, [direction, momentum, onScroll, onScrollEnd]);

  // Scroll to position
  const scrollTo = useCallback(
    (position: number, smooth = true) => {
      if (!scrollRef.current) {
        return;
      }

      if (direction === 'horizontal') {
        scrollRef.current.scrollTo({
          left: position,
          behavior: smooth ? 'smooth' : 'auto',
        });
      } else {
        scrollRef.current.scrollTo({
          top: position,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    },
    [direction]
  );

  // Scroll to element
  const scrollToElement = useCallback(
    (element: HTMLElement, smooth = true) => {
      if (!scrollRef.current) {
        return;
      }

      const containerRect = scrollRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (direction === 'horizontal') {
        const scrollLeft =
          scrollRef.current.scrollLeft +
          (elementRect.left - containerRect.left);
        scrollTo(scrollLeft, smooth);
      } else {
        const scrollTop =
          scrollRef.current.scrollTop + (elementRect.top - containerRect.top);
        scrollTo(scrollTop, smooth);
      }
    },
    [direction, scrollTo]
  );

  // Add event listeners
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }

    element.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);

      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    scrollRef,
    isScrolling,
    scrollTo,
    scrollToElement,
  };
}
