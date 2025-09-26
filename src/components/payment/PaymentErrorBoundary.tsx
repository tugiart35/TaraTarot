'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | undefined;
}

export class PaymentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Payment Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen bg-cosmic-black flex items-center justify-center p-4'>
          <div className='max-w-md w-full'>
            <div className='card p-8 text-center'>
              <div className='mb-6'>
                <AlertTriangle className='h-16 w-16 text-red-400 mx-auto mb-4' />
                <h1 className='text-2xl font-bold text-text-celestial mb-2'>
                  Bir Hata Oluştu
                </h1>
                <p className='text-text-mystic mb-4'>
                  Ödeme sayfasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              </div>

              <div className='space-y-3'>
                <button
                  onClick={this.handleRetry}
                  className='w-full btn btn-primary flex items-center justify-center space-x-2'
                >
                  <RefreshCw className='h-4 w-4' />
                  <span>Tekrar Dene</span>
                </button>

                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className='w-full btn btn-secondary'
                >
                  Dashboard'a Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
