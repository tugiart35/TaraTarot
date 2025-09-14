/*
info:
Bağlantılı dosyalar:
- Tüm admin sayfaları: Loading state'leri için (gerekli)

Dosyanın amacı:
- Tutarlı loading spinner bileşeni
- Farklı boyutlar ve stiller
- Admin paneli için özel tasarım

Geliştirme önerileri:
- Farklı boyutlar (sm, md, lg, xl)
- Farklı renkler (primary, secondary, success, warning)
- Animasyon seçenekleri

Tespit edilen hatalar:
- ✅ Loading spinner bileşeni oluşturuldu
- ✅ Farklı boyutlar eklendi
- ✅ Admin temasına uygun renkler

Kullanım durumu:
- ✅ Gerekli: Tüm admin sayfalarında loading state'leri
- ✅ Production-ready: Güvenli ve test edilmiş
*/

'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

const colorClasses = {
  primary: 'border-purple-500',
  secondary: 'border-slate-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  error: 'border-red-500'
};

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className,
  text,
  fullScreen = false
}: LoadingSpinnerProps) {
  const spinnerElement = (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-transparent border-t-current',
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        {text && (
          <p className="text-sm text-slate-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
          {spinnerElement}
        </div>
      </div>
    );
  }

  return spinnerElement;
}

// Özel admin loading spinner
export function AdminLoadingSpinner({ text = 'Yükleniyor...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-purple-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-4 border-purple-500/20"></div>
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}

// Skeleton loader
export function SkeletonLoader({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-slate-700 rounded',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={cn('admin-card rounded-2xl p-6', className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-slate-700 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-4/6"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 bg-slate-700 rounded w-20"></div>
          <div className="h-8 bg-slate-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ 
  rows = 5, 
  columns = 4,
  className = '' 
}: { 
  rows?: number; 
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('admin-card rounded-2xl p-6', className)}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-700 rounded"></div>
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 mb-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-3 bg-slate-700 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

