/*
 * Lazy Excel Utils Components
 *
 * Bu dosya Excel işleme kütüphanelerini lazy loading ile yükler.
 * Bundle size'ı optimize eder ve performansı artırır.
 */


// Lazy load XLSX (~200KB) - Promise-based approach
export const loadXlsx = () => import('xlsx');

// Lazy load specific XLSX functions
export const loadXlsxUtils = () => import('xlsx').then(mod => mod.utils);

// XLSX doesn't have a Workbook export, use the main module
export const loadXlsxWorkbook = () => import('xlsx');

// Lazy load XLSX with proper error handling
export const loadXlsxLazy = async () => {
  try {
    const xlsx = await import('xlsx');
    return xlsx;
  } catch (error) {
    console.error('XLSX yüklenirken hata:', error);
    throw error;
  }
};

// Loading component for Excel operations
export const ExcelLoadingComponent = () => (
  <div className="text-center text-gray-500">
    📊 Excel Utils yükleniyor...
  </div>
);
