'use client';

import { useState } from 'react';
import { dynamicImports } from '@/lib/optimization/aggressive-bundle-optimizer';

interface PDFGeneratorProps {
  data: any;
  onGenerate?: (pdf: any) => void;
}

export function DynamicPDFGenerator({ onGenerate }: PDFGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Dinamik olarak PDF kütüphanelerini yükle
      const [jsPDF, html2canvas] = await Promise.all([
        dynamicImports.pdf.jsPDF(),
        dynamicImports.pdf.html2canvas(),
      ]);

      // PDF oluştur
      const pdf = new jsPDF();
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0);

      if (onGenerate) {
        onGenerate(pdf);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF oluşturma hatası');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <button
        onClick={generatePDF}
        disabled={isLoading}
        className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
      >
        {isLoading ? 'PDF Oluşturuluyor...' : 'PDF Oluştur'}
      </button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
