'use client';

import TarotCategoryPage from '@/components/tarot/TarotCategoryPage';

export default function MajorArcanaPage() {
  return (
    <TarotCategoryPage
      category='major'
      title='Major Arcana Kartları'
      description="Tarot'un en güçlü 22 kartı. Hayatın büyük derslerini ve ruhsal yolculuğunuzu temsil eder."
      showDescription={true}
      gridCols='8'
      cardSize='md'
      relatedCategories={[
        {
          title: 'Aşk Kartları',
          href: '/tr/kartlar/ask-kartlari',
          color: 'pink',
        },
        {
          title: 'Günlük Tarot',
          href: '/tr/gunluk-tarot',
          color: 'blue',
        },
      ]}
    />
  );
}
