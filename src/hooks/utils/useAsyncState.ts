'use client';

import { useState, useCallback, useRef } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncStateReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic async state management hook
 * Provides loading, error, and data state for async operations
 */
export function useAsyncState<T = any>(
  asyncFn: (...args: any[]) => Promise<T>,
  initialData: T | null = null
): UseAsyncStateReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const isMountedRef = useRef(true);

  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    if (!isMountedRef.current) return null;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFn(...args);
      
      if (isMountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
      
      return result;
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      }
      return null;
    }
  }, [asyncFn]);

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}
