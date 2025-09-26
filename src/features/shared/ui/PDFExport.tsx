/*
 * PDF Export Component
 * ReadingDetailModal'dan ayrılarak bundle size azaltıldı
 */

'use client';

import { Download } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface PDFExportProps {
  onDownload: () => void;
  isDisabled?: boolean;
  className?: string;
}

export default function PDFExport({ 
  onDownload, 
  isDisabled = false, 
  className = '' 
}: PDFExportProps) {
  const { t } = useTranslations();

  return (
    <button
      onClick={onDownload}
      disabled={isDisabled}
      className={`px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Download className="h-4 w-4" />
      <span>{t('readingModal.downloadPdf', 'PDF İndir')}</span>
    </button>
  );
}
