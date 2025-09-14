/*
 * Kullanıcı Dostu Hata Gösterim Bileşeni
 * Bu bileşen, farklı hata tiplerini güzel ve anlaşılır şekilde gösterir
 * Kullanıcıya ne yapması gerektiğini açık şekilde belirtir
 * Retry, dismiss ve detay gösterme özellikleri içerir
 */

'use client';

import { useState } from 'react';

export type ErrorDisplayType = 'inline' | 'toast' | 'modal' | 'banner';

export interface ErrorDisplayProps {
  error: {
    message: string;
    code?: string;
    category?: string;
    userMessage?: string;
    isRetryable?: boolean;
    statusCode?: number;
  };
  type?: ErrorDisplayType;
  onRetry?: () => void;
  onDismiss?: () => void;
  showDetails?: boolean;
  className?: string;
}

// Hata kategorilerine göre ikonlar ve renkler
const errorConfig = {
  VALIDATION: {
    icon: '⚠️',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-200',
    title: 'Doğrulama Hatası',
  },
  AUTHENTICATION: {
    icon: '🔐',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-200',
    title: 'Kimlik Doğrulama Hatası',
  },
  NETWORK: {
    icon: '🌐',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-200',
    title: 'Ağ Hatası',
  },
  SERVER: {
    icon: '🖥️',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-200',
    title: 'Sunucu Hatası',
  },
  RATE_LIMIT: {
    icon: '⏱️',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-200',
    title: 'Hız Sınırı Aşıldı',
  },
  NOT_FOUND: {
    icon: '🔍',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30',
    textColor: 'text-gray-200',
    title: 'Bulunamadı',
  },
  UNKNOWN: {
    icon: '❓',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30',
    textColor: 'text-gray-200',
    title: 'Bilinmeyen Hata',
  },
};

export default function ErrorDisplay({
  error,
  type = 'inline',
  onRetry,
  onDismiss,
  showDetails = false,
  className = '',
}: ErrorDisplayProps) {
  const [showFullDetails, setShowFullDetails] = useState(showDetails);

  const config =
    errorConfig[error.category as keyof typeof errorConfig] ||
    errorConfig.UNKNOWN;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const baseClasses = `
    ${config.bgColor} ${config.borderColor} ${config.textColor}
    border rounded-lg p-4 backdrop-blur-sm
    ${className}
  `;

  const content = (
    <div className={baseClasses}>
      <div className='flex items-start space-x-3'>
        <div className='text-2xl'>{config.icon}</div>
        <div className='flex-1 min-w-0'>
          <h3 className='font-semibold text-lg mb-1'>{config.title}</h3>
          <p className='text-sm opacity-90 mb-3'>
            {error.userMessage || error.message}
          </p>

          {showFullDetails && (
            <div className='mt-3 p-3 bg-black/20 rounded border'>
              <h4 className='font-medium mb-2'>Teknik Detaylar:</h4>
              <p className='text-xs font-mono break-all'>{error.message}</p>
              {error.code && (
                <p className='text-xs mt-1'>
                  <strong>Kod:</strong> {error.code}
                </p>
              )}
              {error.statusCode && (
                <p className='text-xs mt-1'>
                  <strong>HTTP Durum:</strong> {error.statusCode}
                </p>
              )}
            </div>
          )}

          <div className='flex items-center space-x-3 mt-4'>
            {error.isRetryable && onRetry && (
              <button
                onClick={handleRetry}
                className='px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors'
              >
                Tekrar Dene
              </button>
            )}

            <button
              onClick={toggleDetails}
              className='px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors'
            >
              {showFullDetails ? 'Detayları Gizle' : 'Detayları Göster'}
            </button>

            {onDismiss && (
              <button
                onClick={handleDismiss}
                className='px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors'
              >
                Kapat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (type === 'modal') {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
        <div className='max-w-md w-full'>{content}</div>
      </div>
    );
  }

  if (type === 'toast') {
    return (
      <div className='fixed top-4 right-4 max-w-sm w-full z-50'>{content}</div>
    );
  }

  if (type === 'banner') {
    return <div className='w-full'>{content}</div>;
  }

  return content;
}
