/*
info:
---
Dosya Amacı:
- Kariyer açılımı için özelleştirilmiş okuma tipi seçici bileşeni
- BaseReadingTypeSelector'ı kariyer temasına uygun şekilde özelleştirir
- Kariyer açılımı için doğru kredi hook'larını kullanır

Üretime Hazır mı?:
- Dosya kariyer açılımı için özelleştirilmiş okuma tipi seçici içerir, üretime hazırdır
- BaseReadingTypeSelector'ı kariyer temasıyla kullanır
- Kariyer açılımı için doğru kredi kontrolü sağlar

Kullanım:
- CareerTarot.tsx ana bileşeni tarafından kullanılır
- Kariyer açılımı için okuma tipi seçimi sağlar
- Mavi tema ile kariyer odaklı tasarım
---
*/

'use client';

import React from 'react';
import BaseReadingTypeSelector from '@/features/shared/ui/BaseReadingTypeSelector';
import { useReadingCredits } from '@/hooks/useReadingCredits';

interface CareerReadingTypeSelectorProps {
  selectedType: string | null;
  onTypeChange: (type: string) => void;
  onCreditInfoClick?: () => void;
}

export default function CareerReadingTypeSelector({
  selectedType,
  onTypeChange,
  onCreditInfoClick,
}: CareerReadingTypeSelectorProps) {
  // Kariyer açılımı için kredi hook'ları
  const detailedCredits = useReadingCredits('CAREER_SPREAD_DETAILED');
  const writtenCredits = useReadingCredits('CAREER_SPREAD_WRITTEN');

  return (
    <BaseReadingTypeSelector
      selectedType={selectedType}
      onTypeSelect={onTypeChange}
      onCreditInfoClick={onCreditInfoClick}
      readingTypes={{
        SIMPLE: 'simple',
        DETAILED: 'detailed',
        WRITTEN: 'written',
      }}
      creditStatus={detailedCredits.creditStatus}
      theme="blue"
      className=""
      simpleText="Basit Kariyer Okuması"
      detailedText="Detaylı Kariyer Okuması"
      writtenText="Yazılı Kariyer Okuması"
      simpleIcon="💼"
      detailedIcon="👔"
      writtenIcon="📋"
      noSelectionMessage="Kariyer okuma tipinizi seçin"
      simpleSelectedMessage="Basit kariyer okuması seçildi"
      detailedSelectedMessage="Detaylı kariyer okuması seçildi"
      writtenSelectedMessage="Yazılı kariyer okuması seçildi"
      readingType="LOVE_SPREAD" // BaseReadingTypeSelector için gerekli
    />
  );
}

