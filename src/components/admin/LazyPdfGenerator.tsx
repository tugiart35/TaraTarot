/*
 * Lazy PDF Generator Components
 *
 * Bu dosya PDF generation ile ilgili ağır bileşenleri lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';

// Lazy load PDF generator (puppeteer ~300MB)
export const PdfGeneratorLazy = dynamic(
  () => import('@/lib/pdf/pdf-generator').then(mod => ({
    default: mod.PdfGenerator,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          📄 PDF Generator yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);

// Lazy load Export Utils (html2canvas + jspdf ~3MB)
export const ExportUtilsLazy = dynamic(
  () => import('@/lib/reporting/export-utils').then(mod => ({
    default: mod.ExportUtils,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          📊 Export Utils yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);

// Lazy load HTML2Canvas (~2MB)
export const Html2CanvasLazy = dynamic(
  () => import('html2canvas').then(mod => ({
    default: mod.default,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          🖼️ HTML2Canvas yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);

// Lazy load jsPDF (~1MB)
export const JsPdfLazy = dynamic(
  () => import('jspdf').then(mod => ({
    default: mod.jsPDF,
  })),
  {
    loading: () => (
      <CardSkeleton>
        <div className="text-center text-gray-500">
          📄 jsPDF yükleniyor...
        </div>
      </CardSkeleton>
    ),
    ssr: false,
  }
);
