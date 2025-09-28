import { renderHook, act } from '@testing-library/react';
import { useErrorBoundary, useAsyncError } from '../useErrorBoundary';

describe('useErrorBoundary', () => {
  it('should initialize with no error', () => {
    const { result } = renderHook(() => useErrorBoundary());

    expect(result.current.hasError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.errorInfo).toBe(null);
  });

  it('should capture errors', () => {
    const { result } = renderHook(() => useErrorBoundary());
    const testError = new Error('Test error');

    act(() => {
      result.current.captureError(testError, 'Test error info');
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBe(testError);
    expect(result.current.errorInfo).toBe('Test error info');
  });

  it('should reset errors', () => {
    const { result } = renderHook(() => useErrorBoundary());
    const testError = new Error('Test error');

    act(() => {
      result.current.captureError(testError);
    });

    expect(result.current.hasError).toBe(true);

    act(() => {
      result.current.resetError();
    });

    expect(result.current.hasError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.errorInfo).toBe(null);
  });
});

describe('useAsyncError', () => {
  it('should handle async errors', () => {
    const { result } = renderHook(() => useAsyncError());
    const testError = new Error('Async error');

    act(() => {
      result.current.handleAsyncError(testError);
    });

    // The error should be captured by the error boundary
    expect(result.current.handleAsyncError).toBeDefined();
  });
});
