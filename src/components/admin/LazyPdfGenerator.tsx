/*
 * Lazy PDF Generator Components
 *
 * Bu dosya PDF generation ile ilgili ağır bileşenleri lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */

// Lazy load PDF generator (puppeteer ~300MB) - Promise-based approach
export const loadPdfGenerator = () => import('@/lib/pdf/pdf-generator');

// Lazy load Export Utils (html2canvas + jspdf ~3MB)
export const loadExportUtils = () => import('@/lib/reporting/export-utils');

// Lazy load HTML2Canvas (~2MB)
export const loadHtml2Canvas = () => import('html2canvas');

// Lazy load jsPDF (~1MB)
export const loadJsPdf = () => import('jspdf');

// Loading components for PDF operations
export const PdfLoadingComponent = () => (
  <div className="text-center text-gray-500">
    📄 PDF Generator yükleniyor...
  </div>
);

export const ExportLoadingComponent = () => (
  <div className="text-center text-gray-500">
    📊 Export Utils yükleniyor...
  </div>
);

export const Html2CanvasLoadingComponent = () => (
  <div className="text-center text-gray-500">
    🖼️ HTML2Canvas yükleniyor...
  </div>
);

export const JsPdfLoadingComponent = () => (
  <div className="text-center text-gray-500">
    📄 jsPDF yükleniyor...
  </div>
);
