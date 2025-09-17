/*
info:
Gelişmiş Loading ve Skeleton bileşenleri.
Bu dosya farklı loading durumları, skeleton animasyonları ve progress göstergeleri içerir.
Mobil uyumlu, erişilebilir ve tekrar kullanılabilir şekilde tasarlanmıştır.

Kullanım Örnekleri:
- <LoadingSpinner /> - Basit spinner
- <LoadingSpinner variant="pulse" /> - Pulse animasyonu
- <LoadingSpinner variant="dots" /> - Nokta animasyonu
- <LoadingSpinner text="Giriş yapılıyor..." /> - Metin ile birlikte
- <LoadingSkeleton type="text" /> - Metin skeleton'u
- <LoadingSkeleton type="card" /> - Kart skeleton'u
*/

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';

export type LoadingVariant = 'spinner' | 'pulse' | 'dots' | 'bars';
export type SkeletonType = 'text' | 'avatar' | 'card' | 'button';

interface LoadingSpinnerProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: LoadingVariant;
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

interface LoadingSkeletonProps {
  type: SkeletonType;
  count?: number;
  className?: string;
  width?: string;
  height?: string;
}

// Spinner boyutları
const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

// Ana Loading Spinner bileşeni
export default function LoadingSpinner({
  size = 'md',
  color = 'text-purple-500',
  variant = 'spinner',
  text,
  className = '',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const { t } = useTranslations();
  const spinnerSize = typeof size === 'number' ? size : sizeMap[size];

  const wrapperClass = fullScreen
    ? 'fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  const content = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <LoadingIndicator variant={variant} size={spinnerSize} color={color} />
      {text && (
        <span className='text-sm text-gray-300 font-medium animate-pulse'>
          {text}
        </span>
      )}
    </div>
  );

  return fullScreen ? (
    <div
      className={wrapperClass}
      role='dialog'
      aria-label={t('common.loading')}
    >
      {content}
    </div>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}

// Loading indicator varyantları
function LoadingIndicator({
  variant,
  size,
  color,
}: {
  variant: LoadingVariant;
  size: number;
  color: string;
}) {
  switch (variant) {
    case 'pulse':
      return (
        <div
          className={`rounded-full ${color} bg-current animate-pulse`}
          style={{ width: size, height: size }}
          role='status'
          aria-label='Loading'
        />
      );

    case 'dots':
      return (
        <div className='flex gap-1' role='status' aria-label='Loading'>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`rounded-full ${color} bg-current animate-bounce`}
              style={{
                width: size / 3,
                height: size / 3,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      );

    case 'bars':
      return (
        <div
          className='flex gap-1 items-end'
          role='status'
          aria-label='Loading'
        >
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`${color} bg-current animate-pulse`}
              style={{
                width: size / 6,
                height: size * (0.4 + Math.random() * 0.6),
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      );

    default: // spinner
      return (
        <span
          className={`inline-block animate-spin ${color}`}
          style={{ width: size, height: size }}
          role='status'
          aria-label='Loading'
        >
          <svg
            className='w-full h-full'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
        </span>
      );
  }
}

// Skeleton loading bileşeni
export function LoadingSkeleton({
  type,
  count = 1,
  className = '',
  width,
  height,
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <SkeletonItem
      key={i}
      type={type}
      className={className}
      {...(width && { width })}
      {...(height && { height })}
    />
  ));

  return <>{skeletons}</>;
}

function SkeletonItem({
  type,
  className,
  width,
  height,
}: {
  type: SkeletonType;
  className?: string;
  width?: string;
  height?: string;
}) {
  const baseClass = 'animate-pulse bg-gray-300/20 rounded';

  switch (type) {
    case 'text':
      return (
        <div
          className={`${baseClass} h-4 ${className}`}
          style={{ width: width || '100%', height: height || '1rem' }}
        />
      );

    case 'avatar':
      return (
        <div
          className={`${baseClass} rounded-full ${className}`}
          style={{
            width: width || '48px',
            height: height || '48px',
          }}
        />
      );

    case 'button':
      return (
        <div
          className={`${baseClass} rounded-lg ${className}`}
          style={{
            width: width || '100px',
            height: height || '40px',
          }}
        />
      );

    case 'card':
      return (
        <div className={`${baseClass} ${className}`}>
          <div className='p-4 space-y-3'>
            <div className='h-4 bg-gray-300/30 rounded w-3/4' />
            <div className='space-y-2'>
              <div className='h-3 bg-gray-300/30 rounded' />
              <div className='h-3 bg-gray-300/30 rounded w-5/6' />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`${baseClass} ${className}`}
          style={{ width: width || '100%', height: height || '20px' }}
        />
      );
  }
}

// Progress bar bileşeni
export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'bg-purple-500',
  bgColor = 'bg-gray-300/20',
  showLabel = false,
  label,
  className = '',
}: {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}) {
  const { t } = useTranslations();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heightClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className='flex justify-between text-xs text-gray-300 mb-1'>
          <span>{label || t('common.progress')}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`w-full ${bgColor} rounded-full ${heightClass} overflow-hidden`}
      >
        <div
          className={`h-full ${color} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
          role='progressbar'
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

// Step indicator bileşeni
export function StepIndicator({
  steps,
  currentStep,
  className = '',
}: {
  steps: string[];
  currentStep: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const stepNumber = index + 1;

        return (
          <React.Fragment key={index}>
            <div className='flex flex-col items-center'>
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-300/20 text-gray-400'
                  }
                `}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`mt-2 text-xs ${
                  isCurrent ? 'text-purple-300' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300/20'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
