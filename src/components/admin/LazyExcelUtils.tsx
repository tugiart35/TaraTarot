/*
 * Lazy Excel Utils Components
 *
 * Bu dosya Excel işleme kütüphanelerini lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';

// Lazy load XLSX (~200KB)
export const XlsxLazy = dynamic(
  () => import('xlsx').then(mod => ({
    default: mod,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          📊 Excel Utils yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);

// Lazy load specific XLSX functions
export const XlsxUtilsLazy = dynamic(
  () => import('xlsx').then(mod => ({
    default: mod.utils,
  })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);

export const XlsxWorkbookLazy = dynamic(
  () => import('xlsx').then(mod => ({
    default: mod.Workbook,
  })),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
);
