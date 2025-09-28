'use client';

import { useState, useCallback } from 'react';
import { useValidation, ValidationUtils } from '@/hooks/shared/useValidation';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

interface UseErrorBoundaryReturn {
  error: Error | null;
  hasError: boolean;
  errorInfo: string | null;
  resetError: () => void;
  captureError: (error: Error, errorInfo?: string) => void;
}

/**
 * Custom hook for error boundary functionality
 * Provides error state management and error capturing
 */
export function useErrorBoundary(): UseErrorBoundaryReturn {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    errorInfo: null,
  });

  const resetError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  }, []);

  const captureError = useCallback((error: Error, errorInfo?: string) => {
    setErrorState({
      hasError: true,
      error,
      errorInfo: errorInfo || null,
    });
  }, []);

  return {
    error: errorState.error,
    hasError: errorState.hasError,
    errorInfo: errorState.errorInfo,
    resetError,
    captureError,
  };
}

/**
 * Hook for handling async operations with error boundaries
 */
export function useAsyncError() {
  const { captureError } = useErrorBoundary();

  const handleAsyncError = useCallback(
    (error: Error) => {
      captureError(error, 'Async operation failed');
    },
    [captureError]
  );

  return { handleAsyncError };
}
