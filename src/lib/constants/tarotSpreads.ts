/*
info:
Bağlantılı dosyalar:
- next/dynamic: Dinamik bileşen yükleme için (gerekli)
- @/components/specific/tarot/Love-Spread/LoveTarot: Aşk açılımı ana bileşeni (gerekli)
- @/lib/tarot/spreads/registry: Yeni modüler spread registry sistemi (modülerleştirme)

Dosyanın amacı:
- Tarot açılım türlerini, pozisyonlarını ve ilgili bileşenleri merkezi ve dinamik olarak tanımlamak. 
- Şu anda sadece Love spread desteklenmektedir.
- MODÜLERLEŞTIRME: Bu dosya artık eski sistemle yeni modüler sistem arasında köprü görevi görür.

Backend bağlantısı:
- Backend ile doğrudan bir bağlantı veya değişken yoktur. Ancak, tarot açılımı sonuçları backend'de user_readings, tarot_spreads gibi tablolarla ilişkili olabilir.

Geliştirme ve öneriler:
- Açıklamalar yeterli ve Türkçe, okunabilirlik yüksek.
- Dinamik import ile SSR uyumsuz bileşenler için iyi bir çözüm kullanılmış.
- Pozisyonlar ve layout yapısı esnek, yeni açılımlar kolayca eklenebilir.
- Yardımcı fonksiyonlar (findSpreadById, findPositionById) sade ve kullanışlı.
- MODÜLERLEŞTIRME: Yeni modüler sistem ile backward compatibility sağlanmış.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik ve sade yapı çok iyi.
- Tekrarsız, modüler ve merkezi yönetim sağlanmış.
- Güvenlik açısından risk yok, sadece frontend sabitleri ve bileşen referansları içeriyor.
- MODÜLERLEŞTIRME: İki sistem arasında geçiş güvenli ve kademeli yapılmış.

Gereklilik ve Kullanım Durumu:
- Dinamik import: Gerekli, Love açılım bileşeni için kullanılır.
- TarotCardPosition ve TarotSpread arayüzleri: Gerekli, tip güvenliği ve merkezi yönetim için kullanılır.
- tarotSpreads: Gerekli, açılım türlerinin merkezi yönetimi için ana kaynak.
- findSpreadById, findPositionById: Gerekli, açılım ve pozisyon bulma işlemleri için kullanılır.
- MODÜLERLEŞTIRME: Yeni modüler fonksiyonlar eklendi, eski fonksiyonlar korundu.
*/
import dynamic from 'next/dynamic';

const LoveReading = dynamic(
  () => import('@/features/tarot/components/Love-Spread/LoveTarot'),
  { ssr: false }
);

const CareerReading = dynamic(
  () => import('@/features/tarot/components/Career-Spread/CareerTarot'),
  { ssr: false }
);

const ProblemSolvingReading = dynamic(
  () =>
    import('@/features/tarot/components/Problem-Solving/ProblemSolvingTarot'),
  { ssr: false }
);

const SituationAnalysisReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Situation-Analysis/SituationAnalysisTarot'
    ),
  { ssr: false }
);

const RelationshipAnalysisReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Relationship-Analysis/RelationshipAnalysisTarot'
    ),
  { ssr: false }
);

const RelationshipProblemsReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Relationship-Problems/RelationshipProblemsTarot'
    ),
  { ssr: false }
);

const MarriageReading = dynamic(
  () => import('@/features/tarot/components/Marriage/MarriageTarot'),
  { ssr: false }
);

const NewLoverReading = dynamic(
  () => import('@/features/tarot/components/New-Lover/NewLoverTarot'),
  { ssr: false }
);

const MoneyReading = dynamic(
  () => import('@/features/tarot/components/Money-Spread/MoneyTarot'),
  { ssr: false }
);

// Tarot kart pozisyonu interface'i
export interface TarotCardPosition {
  id: number;
  title: string;
  description: string;
  className: string; // CSS pozisyon sınıfı
  x?: number; // Yüzde cinsinden X koordinatı (opsiyonel)
  y?: number; // Yüzde cinsinden Y koordinatı (opsiyonel)
}

// Tarot açılım türü interface'i - Genişletilmiş ve dinamik
export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  component: React.ComponentType<any> | null;
  icon: string;
  color: string;
  positions: TarotCardPosition[];
  layout: {
    type: 'custom' | 'grid' | 'circle' | 'linear';
    containerClass?: string;
    cardSize?: 'small' | 'medium' | 'large' | 'xlarge';
  };
  prompts?: {
    systemPrompt?: string;
    interpretationTemplate?: string;
  };
}

// Love spread pozisyonları
const lovePositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.love.positions.1.title',
    description: 'spreads.love.positions.1.description',
    className:
      'absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 25,
  },
  {
    id: 2,
    title: 'spreads.love.positions.2.title',
    description: 'spreads.love.positions.2.description',
    className:
      'absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 50,
  },
  {
    id: 3,
    title: 'spreads.love.positions.3.title',
    description: 'spreads.love.positions.3.description',
    className:
      'absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 50,
  },
  {
    id: 4,
    title: 'spreads.love.positions.4.title',
    description: 'spreads.love.positions.4.description',
    className:
      'absolute top-[75%] left-[37.5%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 37.5,
    y: 75,
  },
];

// Career spread pozisyonları
const careerPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.career.positions.1.title',
    description: 'spreads.career.positions.1.description',
    className: 'career-position-1',
  },
  {
    id: 2,
    title: 'spreads.career.positions.2.title',
    description: 'spreads.career.positions.2.description',
    className: 'career-position-2',
  },
  {
    id: 3,
    title: 'spreads.career.positions.3.title',
    description: 'spreads.career.positions.3.description',
    className: 'career-position-3',
  },
  {
    id: 4,
    title: 'spreads.career.positions.4.title',
    description: 'spreads.career.positions.4.description',
    className: 'career-position-4',
  },
  {
    id: 5,
    title: 'spreads.career.positions.5.title',
    description: 'spreads.career.positions.5.description',
    className: 'career-position-5',
  },
  {
    id: 6,
    title: 'spreads.career.positions.6.title',
    description: 'spreads.career.positions.6.description',
    className: 'career-position-6',
  },
  {
    id: 7,
    title: 'spreads.career.positions.7.title',
    description: 'spreads.career.positions.7.description',
    className: 'career-position-7',
  },
];

// Problem Solving spread pozisyonları
const problemSolvingPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.problemSolving.positions.1.title',
    description: 'spreads.problemSolving.positions.1.description',
    className:
      'absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 5,
  },
  {
    id: 2,
    title: 'spreads.problemSolving.positions.2.title',
    description: 'spreads.problemSolving.positions.2.description',
    className:
      'absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 25,
  },
  {
    id: 3,
    title: 'spreads.problemSolving.positions.3.title',
    description: 'spreads.problemSolving.positions.3.description',
    className:
      'absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 45,
  },
  {
    id: 4,
    title: 'spreads.problemSolving.positions.4.title',
    description: 'spreads.problemSolving.positions.4.description',
    className:
      'absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 15,
  },
  {
    id: 5,
    title: 'spreads.problemSolving.positions.5.title',
    description: 'spreads.problemSolving.positions.5.description',
    className:
      'absolute top-[15%] right-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 15,
  },
  {
    id: 6,
    title: 'spreads.problemSolving.positions.6.title',
    description: 'spreads.problemSolving.positions.6.description',
    className:
      'absolute top-[35%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 35,
  },
  {
    id: 7,
    title: 'spreads.problemSolving.positions.7.title',
    description: 'spreads.problemSolving.positions.7.description',
    className:
      'absolute top-[35%] right-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 35,
  },
  {
    id: 8,
    title: 'spreads.problemSolving.positions.8.title',
    description: 'spreads.problemSolving.positions.8.description',
    className:
      'absolute bottom-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 20,
    y: 85,
  },
  {
    id: 9,
    title: 'spreads.problemSolving.positions.9.title',
    description: 'spreads.problemSolving.positions.9.description',
    className:
      'absolute bottom-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 10,
    title: 'spreads.problemSolving.positions.10.title',
    description: 'spreads.problemSolving.positions.10.description',
    className:
      'absolute bottom-[15%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 80,
    y: 85,
  },
];

// Situation Analysis spread pozisyonları
const situationAnalysisPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.situationAnalysis.positions.1.title',
    description: 'spreads.situationAnalysis.positions.1.description',
    className: 'absolute bottom-0 left-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 100,
  },
  {
    id: 2,
    title: 'spreads.situationAnalysis.positions.2.title',
    description: 'spreads.situationAnalysis.positions.2.description',
    className: 'absolute left-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 60,
  },
  {
    id: 3,
    title: 'spreads.situationAnalysis.positions.3.title',
    description: 'spreads.situationAnalysis.positions.3.description',
    className: 'absolute left-0 top-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 0,
  },
  {
    id: 4,
    title: 'spreads.situationAnalysis.positions.4.title',
    description: 'spreads.situationAnalysis.positions.4.description',
    className: 'absolute top-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 50,
    y: 0,
  },
  {
    id: 5,
    title: 'spreads.situationAnalysis.positions.5.title',
    description: 'spreads.situationAnalysis.positions.5.description',
    className: 'absolute right-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 100,
    y: 60,
  },
  {
    id: 6,
    title: 'spreads.situationAnalysis.positions.6.title',
    description: 'spreads.situationAnalysis.positions.6.description',
    className: 'absolute bottom-0 right-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 100,
    y: 100,
  },
  {
    id: 7,
    title: 'spreads.situationAnalysis.positions.7.title',
    description: 'spreads.situationAnalysis.positions.7.description',
    className: 'absolute bottom-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 50,
    y: 100,
  },
];

// Relationship Analysis spread pozisyonları
const relationshipAnalysisPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.relationshipAnalysis.positions.1.title',
    description: 'spreads.relationshipAnalysis.positions.1.description',
    className:
      'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 50,
  },
  {
    id: 2,
    title: 'spreads.relationshipAnalysis.positions.2.title',
    description: 'spreads.relationshipAnalysis.positions.2.description',
    className:
      'absolute top-[20%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 70,
    y: 20,
  },
  {
    id: 3,
    title: 'spreads.relationshipAnalysis.positions.3.title',
    description: 'spreads.relationshipAnalysis.positions.3.description',
    className:
      'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 50,
  },
  {
    id: 4,
    title: 'spreads.relationshipAnalysis.positions.4.title',
    description: 'spreads.relationshipAnalysis.positions.4.description',
    className:
      'absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 70,
    y: 80,
  },
  {
    id: 5,
    title: 'spreads.relationshipAnalysis.positions.5.title',
    description: 'spreads.relationshipAnalysis.positions.5.description',
    className:
      'absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 30,
    y: 80,
  },
  {
    id: 6,
    title: 'spreads.relationshipAnalysis.positions.6.title',
    description: 'spreads.relationshipAnalysis.positions.6.description',
    className:
      'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 50,
  },
  {
    id: 7,
    title: 'spreads.relationshipAnalysis.positions.7.title',
    description: 'spreads.relationshipAnalysis.positions.7.description',
    className:
      'absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 30,
    y: 20,
  },
];

// Relationship Problems spread pozisyonları
const relationshipProblemsPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.relationshipProblems.positions.1.title',
    description: 'spreads.relationshipProblems.positions.1.description',
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 45,
  },
  {
    id: 2,
    title: 'spreads.relationshipProblems.positions.2.title',
    description: 'spreads.relationshipProblems.positions.2.description',
    className:
      'absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 25,
  },
  {
    id: 3,
    title: 'spreads.relationshipProblems.positions.3.title',
    description: 'spreads.relationshipProblems.positions.3.description',
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 45,
  },
  {
    id: 4,
    title: 'spreads.relationshipProblems.positions.4.title',
    description: 'spreads.relationshipProblems.positions.4.description',
    className:
      'absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 25,
  },
  {
    id: 5,
    title: 'spreads.relationshipProblems.positions.5.title',
    description: 'spreads.relationshipProblems.positions.5.description',
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 45,
  },
  {
    id: 6,
    title: 'spreads.relationshipProblems.positions.6.title',
    description: 'spreads.relationshipProblems.positions.6.description',
    className:
      'absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 25,
  },
  {
    id: 7,
    title: 'spreads.relationshipProblems.positions.7.title',
    description: 'spreads.relationshipProblems.positions.7.description',
    className:
      'absolute top-[8%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 8,
  },
  {
    id: 8,
    title: 'spreads.relationshipProblems.positions.8.title',
    description: 'spreads.relationshipProblems.positions.8.description',
    className:
      'absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 8,
  },
  {
    id: 9,
    title: 'spreads.relationshipProblems.positions.9.title',
    description: 'spreads.relationshipProblems.positions.9.description',
    className:
      'absolute top-[8%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 8,
  },
];

// Evlilik açılımı pozisyonları
export const marriagePositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.marriage.positions.1.title',
    description: 'spreads.marriage.positions.1.description',
    className:
      'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 85,
  },
  {
    id: 2,
    title: 'spreads.marriage.positions.2.title',
    description: 'spreads.marriage.positions.2.description',
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 3,
    title: 'spreads.marriage.positions.3.title',
    description: 'spreads.marriage.positions.3.description',
    className:
      'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 85,
  },
  {
    id: 4,
    title: 'spreads.marriage.positions.4.title',
    description: 'spreads.marriage.positions.4.description',
    className:
      'absolute top-[55%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 55,
  },
  {
    id: 5,
    title: 'spreads.marriage.positions.5.title',
    description: 'spreads.marriage.positions.5.description',
    className:
      'absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 35,
  },
  {
    id: 6,
    title: 'spreads.marriage.positions.6.title',
    description: 'spreads.marriage.positions.6.description',
    className:
      'absolute top-[55%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 55,
  },
  {
    id: 7,
    title: 'spreads.marriage.positions.7.title',
    description: 'spreads.marriage.positions.7.description',
    className:
      'absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 35,
  },
  {
    id: 8,
    title: 'spreads.marriage.positions.8.title',
    description: 'spreads.marriage.positions.8.description',
    className:
      'absolute top-[8%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 8,
  },
  {
    id: 9,
    title: 'spreads.marriage.positions.9.title',
    description: 'spreads.marriage.positions.9.description',
    className:
      'absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 8,
  },
  {
    id: 10,
    title: 'spreads.marriage.positions.10.title',
    description: 'spreads.marriage.positions.10.description',
    className:
      'absolute top-[8%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 8,
  },
];

// Yeni Bir Sevgili açılımı pozisyonları
export const newLoverPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.newLover.positions.1.title',
    description: 'spreads.newLover.positions.1.description',
    className:
      'absolute top-[85%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 85,
  },
  {
    id: 2,
    title: 'spreads.newLover.positions.2.title',
    description: 'spreads.newLover.positions.2.description',
    className:
      'absolute top-[85%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 85,
  },
  {
    id: 3,
    title: 'spreads.newLover.positions.3.title',
    description: 'spreads.newLover.positions.3.description',
    className:
      'absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 50,
  },
  {
    id: 4,
    title: 'spreads.newLover.positions.4.title',
    description: 'spreads.newLover.positions.4.description',
    className:
      'absolute top-[15%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 15,
  },
  {
    id: 5,
    title: 'spreads.newLover.positions.5.title',
    description: 'spreads.newLover.positions.5.description',
    className:
      'absolute top-[15%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 15,
  },
  {
    id: 6,
    title: 'spreads.newLover.positions.6.title',
    description: 'spreads.newLover.positions.6.description',
    className:
      'absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 50,
  },
];

// Para açılımı pozisyonları (8 kartlık piramit düzen)
export const moneyPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'spreads.money.positions.1.title',
    description: 'spreads.money.positions.1.description',
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 2,
    title: 'spreads.money.positions.2.title',
    description: 'spreads.money.positions.2.description',
    className:
      'absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 70,
  },
  {
    id: 3,
    title: 'spreads.money.positions.3.title',
    description: 'spreads.money.positions.3.description',
    className:
      'absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 70,
  },
  {
    id: 4,
    title: 'spreads.money.positions.4.title',
    description: 'spreads.money.positions.4.description',
    className:
      'absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 70,
  },
  {
    id: 5,
    title: 'spreads.money.positions.5.title',
    description: 'spreads.money.positions.5.description',
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 45,
  },
  {
    id: 6,
    title: 'spreads.money.positions.6.title',
    description: 'spreads.money.positions.6.description',
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 45,
  },
  {
    id: 7,
    title: 'spreads.money.positions.7.title',
    description: 'spreads.money.positions.7.description',
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 45,
  },
  {
    id: 8,
    title: 'spreads.money.positions.8.title',
    description: 'spreads.money.positions.8.description',
    className:
      'absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 20,
  },
];

// Tüm tarot açılım türleri
export const tarotSpreads: TarotSpread[] = [
  {
    id: 'love-spread',
    name: 'spreads.love.name',
    description: 'spreads.love.description',
    cardCount: 4,
    component: LoveReading,
    icon: '💝',
    color: 'pink',
    positions: lovePositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-96 md:h-[500px] bg-gradient-to-br from-pink-800/50 to-slate-900/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve ilişki uzmanısın...',
    },
  },
  {
    id: 'career-spread',
    name: 'spreads.career.name',
    description: 'spreads.career.description',
    cardCount: 7,
    component: CareerReading,
    icon: '💼',
    color: 'blue',
    positions: careerPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-96 md:h-[500px] bg-gradient-to-br from-blue-800/50 to-green-800/50 rounded-xl border border-blue-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve kariyer uzmanısın...',
    },
  },
  {
    id: 'problem-solving-spread',
    name: 'spreads.problemSolving.name',
    description: 'spreads.problemSolving.description',
    cardCount: 10,
    component: ProblemSolvingReading,
    icon: '🔍',
    color: 'purple',
    positions: problemSolvingPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[600px] md:h-[700px] bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-xl border border-purple-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve problem çözme uzmanısın...',
    },
  },
  {
    id: 'situation-analysis-spread',
    name: 'spreads.situationAnalysis.name',
    description: 'spreads.situationAnalysis.description',
    cardCount: 7,
    component: SituationAnalysisReading,
    icon: '🔍',
    color: 'green',
    positions: situationAnalysisPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-green-800/50 to-emerald-800/50 rounded-xl border border-green-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve durum analizi uzmanısın...',
    },
  },
  {
    id: 'relationship-analysis-spread',
    name: 'spreads.relationshipAnalysis.name',
    description: 'spreads.relationshipAnalysis.description',
    cardCount: 7,
    component: RelationshipAnalysisReading,
    icon: '💕',
    color: 'blue',
    positions: relationshipAnalysisPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-blue-800/50 to-cyan-800/50 rounded-xl border border-blue-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve ilişki analizi uzmanısın...',
    },
  },
  {
    id: 'relationship-problems-spread',
    name: 'spreads.relationshipProblems.name',
    description: 'spreads.relationshipProblems.description',
    cardCount: 9,
    component: RelationshipProblemsReading,
    icon: '💔',
    color: 'gold',
    positions: relationshipProblemsPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-yellow-800/50 to-amber-800/50 rounded-xl border border-yellow-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve ilişki sorunları uzmanısın...',
    },
  },
  {
    id: 'marriage-spread',
    name: 'spreads.marriage.name',
    description: 'spreads.marriage.description',
    cardCount: 10,
    component: MarriageReading,
    icon: '💒',
    color: 'pink',
    positions: marriagePositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-pink-800/50 to-rose-800/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve evlilik uzmanısın...',
    },
  },
  {
    id: 'new-lover-spread',
    name: 'spreads.newLover.name',
    description: 'spreads.newLover.description',
    cardCount: 6,
    component: NewLoverReading,
    icon: '💕',
    color: 'pink',
    positions: newLoverPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-pink-800/50 to-rose-800/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve aşk uzmanısın...',
    },
  },
  {
    id: 'money-spread',
    name: 'spreads.money.name',
    description: 'spreads.money.description',
    cardCount: 8,
    component: MoneyReading,
    icon: '💰',
    color: 'yellow',
    positions: moneyPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-yellow-800/50 to-orange-800/50 rounded-xl border border-yellow-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve finans uzmanısın...',
    },
  },
];

// Spread bulmak için yardımcı fonksiyon
export function findSpreadById(spreadId: string): TarotSpread | undefined {
  return tarotSpreads.find(spread => spread.id === spreadId);
}

// Pozisyon bulmak için yardımcı fonksiyon
export function findPositionById(
  spread: TarotSpread,
  positionId: number
): TarotCardPosition | undefined {
  return spread.positions.find(pos => pos.id === positionId);
}

// SpreadId türü sadece mevcut spread'ler için
export type SpreadId =
  | 'love-spread'
  | 'career-spread'
  | 'problem-solving-spread'
  | 'situation-analysis-spread'
  | 'relationship-analysis-spread'
  | 'relationship-problems-spread'
  | 'marriage-spread'
  | 'new-lover-spread'
  | 'money-spread';
