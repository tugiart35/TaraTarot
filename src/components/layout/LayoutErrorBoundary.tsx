'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | undefined;
}

export class LayoutErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Layout Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/tr';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
          <div className='max-w-md w-full'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl'>
              <div className='mb-6'>
                <AlertTriangle className='h-16 w-16 text-red-400 mx-auto mb-4' />
                <h1 className='text-2xl font-bold text-white mb-2'>
                  Layout Hatası
                </h1>
                <p className='text-gray-300 mb-4'>
                  Navigasyon veya layout bileşeninde beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              </div>

              <div className='space-y-3'>
                <button
                  onClick={this.handleRetry}
                  className='w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2'
                >
                  <RefreshCw className='h-4 w-4' />
                  <span>Tekrar Dene</span>
                </button>

                <button
                  onClick={this.handleGoHome}
                  className='w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 flex items-center justify-center space-x-2'
                >
                  <Home className='h-4 w-4' />
                  <span>Ana Sayfa</span>
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
