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
    title: 'İlgi Duyduğun Kişi',
    description: 'Hakkında soru sorduğun kişi',
    className:
      'absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 25,
  },
  {
    id: 2,
    title: 'Fiziksel/Cinsel Bağlantı',
    description: 'Fiziksel ve cinsel bağlantınız',
    className:
      'absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 50,
  },
  {
    id: 3,
    title: 'Duygusal/Ruhsal Bağlantı',
    description: 'Duygusal ve ruhsal bağlantınız',
    className:
      'absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 50,
  },
  {
    id: 4,
    title: 'Uzun Vadeli Sonuç',
    description: 'İlişkinin uzun vadeli sonucu',
    className:
      'absolute top-[75%] left-[37.5%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 37.5,
    y: 75,
  },
];

// Tüm tarot açılım türleri - Şu anda sadece Love spread desteklenmektedir
export const tarotSpreads: TarotSpread[] = [
  {
    id: 'love-spread',
    name: 'Aşk Açılımı',
    description: 'İlişkiler ve duygusal bağlar için 4 kartlık özel açılım',
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
export type SpreadId = 'love-spread';
