/*
Error Boundary Component
React hatalarını yakalar ve kullanıcıya dostça hata mesajları gösterir.
Production'da kritik hataların uygulamayı çökertmesini önler.
*/

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (_error: Error, _errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Hata durumunda state'i güncelle
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Hata loglama (production'da sadece kritik hatalar)
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary yakaladı:', error, errorInfo);
    }

    // Custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
          <div className='max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center'>
            <div className='w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>⚠️</span>
            </div>

            <h2 className='text-xl font-bold text-white mb-2'>
              Bir Hata Oluştu
            </h2>

            <p className='text-gray-300 mb-6'>
              Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya daha
              sonra tekrar deneyin.
            </p>

            <div className='space-y-3'>
              <button
                onClick={() => window.location.reload()}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors'
              >
                Sayfayı Yenile
              </button>

              <button
                onClick={() => this.setState({ hasError: false })}
                className='w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors'
              >
                Tekrar Dene
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-6 text-left'>
                <summary className='text-gray-400 cursor-pointer text-sm'>
                  Hata Detayları (Geliştirici Modu)
                </summary>
                <pre className='mt-2 text-xs text-red-400 bg-slate-900 p-3 rounded overflow-auto'>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary (React 18+ için)
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);

    if (process.env.NODE_ENV === 'development') {
      console.error('useErrorHandler yakaladı:', error);
    }
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
}

// Async error boundary hook
export function useAsyncError() {
  const [, setError] = React.useState();
  return React.useCallback((e: Error) => {
    setError(() => {
      throw e;
    });
  }, []);
}
