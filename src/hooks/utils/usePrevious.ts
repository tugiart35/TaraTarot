'use client';

import { useRef, useEffect } from 'react';

/**
 * Hook to get the previous value of a state or prop
 * Useful for comparing current and previous values
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}
