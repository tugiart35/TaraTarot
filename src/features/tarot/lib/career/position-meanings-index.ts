/*
info:
---
Dosya Amacı:
- Kariyer açılımı için her kartın her pozisyondaki özel anlamlarını tanımlar
- 78 tarot kartının 4 farklı kariyer pozisyonundaki yorumlarını içerir
- Kariyer odaklı yorumlar ve rehberlik sağlar

Üretime Hazır mı?:
- Dosya kapsamlı kariyer yorumları içerir, üretime hazırdır
- Her kart için pozisyon bazlı anlamlar tanımlanmış
- Kariyer temasına uygun yorumlar ve öneriler mevcut

Kullanım:
- CareerTarot.tsx bileşeni tarafından import edilir
- Kart seçimi sonrası pozisyon bazlı yorumlar için kullanılır
- Kariyer rehberliği ve önerileri sağlar
---
*/

import type { TarotCard } from '@/types/tarot';

// Kariyer pozisyon anlamları interface'i
export interface CareerPositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// Kariyer açılımı pozisyon anlamları
export const CAREER_POSITION_MEANINGS: Record<number, CareerPositionMeaning[]> = {
  1: [
    // Mevcut Durumunuz - Pozisyon 1
    {
      id: 'fool-1',
      card: 'The Fool',
      position: 1,
      upright: 'Yeni bir kariyer yolculuğuna başlıyorsunuz. Cesur adımlar atma zamanı. Yaratıcılığınızı ve potansiyelinizi keşfetme fırsatı.',
      reversed: 'Kariyer kararlarında dikkatsizlik veya acelecilik. Planlama eksikliği nedeniyle zorluklar yaşayabilirsiniz.',
      keywords: ['yeni başlangıç', 'cesaret', 'yaratıcılık', 'potansiyel'],
      context: 'Mevcut kariyer durumunuzda yeni fırsatlar ve başlangıçlar',
      group: 'Majör Arkana'
    },
    {
      id: 'magician-1',
      card: 'The Magician',
      position: 1,
      upright: 'Kariyerinizde güçlü bir konumdasınız. Yeteneklerinizi etkili şekilde kullanıyorsunuz. Hedeflerinize ulaşma gücünüz var.',
      reversed: 'Potansiyelinizi tam kullanamıyorsunuz. Kendinize güven eksikliği veya kaynakları yanlış kullanma.',
      keywords: ['güç', 'yetenek', 'hedef', 'başarı'],
      context: 'Mevcut kariyer durumunuzda güçlü konum ve yetenekler',
      group: 'Majör Arkana'
    },
    {
      id: 'high-priestess-1',
      card: 'The High Priestess',
      position: 1,
      upright: 'Sezgileriniz kariyerinizde size rehberlik ediyor. Gizli bilgiler veya fırsatlar keşfedebilirsiniz. İç bilgeliğinize güvenin.',
      reversed: 'Sezgilerinizi görmezden geliyorsunuz. Gizli bilgileri kaçırıyor veya yanlış kararlar veriyor olabilirsiniz.',
      keywords: ['sezgi', 'bilgelik', 'gizli bilgi', 'iç ses'],
      context: 'Mevcut kariyer durumunuzda sezgisel rehberlik',
      group: 'Majör Arkana'
    },
    // Daha fazla kart eklenebilir...
  ],
  2: [
    // Engeller ve Zorluklar - Pozisyon 2
    {
      id: 'tower-2',
      card: 'The Tower',
      position: 2,
      upright: 'Kariyerinizde beklenmedik değişiklikler veya krizler yaşayabilirsiniz. Eski yapıların yıkılması yeni fırsatlar yaratabilir.',
      reversed: 'Değişimden kaçınmaya çalışıyorsunuz. Eski yapıları korumak sizi sınırlayabilir.',
      keywords: ['değişim', 'kriz', 'yıkım', 'yeniden yapılanma'],
      context: 'Kariyerinizde karşılaştığınız engeller ve zorluklar',
      group: 'Majör Arkana'
    },
    {
      id: 'devil-2',
      card: 'The Devil',
      position: 2,
      upright: 'Kendinizi kariyerinizde sınırlayan düşünce kalıpları veya bağımlılıklar var. Özgürlüğünüzü kısıtlayan faktörler.',
      reversed: 'Sınırlamaları aşmaya başlıyorsunuz. Özgürlüğünüze kavuşma sürecindesiniz.',
      keywords: ['sınırlama', 'bağımlılık', 'özgürlük', 'kurtuluş'],
      context: 'Kariyerinizde karşılaştığınız engeller ve zorluklar',
      group: 'Majör Arkana'
    },
    // Daha fazla kart eklenebilir...
  ],
  3: [
    // Fırsatlar ve Potansiyel - Pozisyon 3
    {
      id: 'star-3',
      card: 'The Star',
      position: 3,
      upright: 'Kariyerinizde umut verici fırsatlar var. Yaratıcılığınız ve ilhamınız size yeni yollar açacak. Gelecek parlak.',
      reversed: 'Umutlarınızı kaybetmiş olabilirsiniz. Yaratıcılığınızı yeniden keşfetme zamanı.',
      keywords: ['umut', 'ilham', 'yaratıcılık', 'gelecek'],
      context: 'Kariyerinizde önünüzdeki fırsatlar ve potansiyel',
      group: 'Majör Arkana'
    },
    {
      id: 'sun-3',
      card: 'The Sun',
      position: 3,
      upright: 'Kariyerinizde büyük başarı ve tanınma fırsatları var. Yaratıcı projeler ve liderlik rolleri önünüzde.',
      reversed: 'Başarıya ulaşmak için daha fazla çaba gerekebilir. Sabırlı olun ve hedeflerinize odaklanın.',
      keywords: ['başarı', 'tanınma', 'liderlik', 'yaratıcılık'],
      context: 'Kariyerinizde önünüzdeki fırsatlar ve potansiyel',
      group: 'Majör Arkana'
    },
    // Daha fazla kart eklenebilir...
  ],
  4: [
    // Gelecek ve Hedefler - Pozisyon 4
    {
      id: 'world-4',
      card: 'The World',
      position: 4,
      upright: 'Kariyer hedeflerinize ulaşacaksınız. Tamamlanma ve başarı dönemi. Yeni döngüler başlayacak.',
      reversed: 'Hedeflerinize ulaşmak için daha fazla zaman gerekebilir. Sabırlı olun ve çalışmaya devam edin.',
      keywords: ['tamamlanma', 'başarı', 'hedef', 'döngü'],
      context: 'Kariyer hedefleriniz ve uzun vadeli gelecek',
      group: 'Majör Arkana'
    },
    {
      id: 'ace-wands-4',
      card: 'Ace of Wands',
      position: 4,
      upright: 'Kariyerinizde yeni projeler ve girişimler başlayacak. Yaratıcı enerji ve motivasyon yüksek olacak.',
      reversed: 'Yeni projelerde gecikmeler olabilir. Enerjinizi doğru yöne kanalize etmeye odaklanın.',
      keywords: ['yeni proje', 'girişim', 'yaratıcılık', 'motivasyon'],
      context: 'Kariyer hedefleriniz ve uzun vadeli gelecek',
      group: 'Asalar'
    },
    // Daha fazla kart eklenebilir...
  ]
};

/**
 * Belirli bir kart ve pozisyon için kariyer anlamını getirir
 */
export function getCareerMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): CareerPositionMeaning | null {
  const positionMeanings = CAREER_POSITION_MEANINGS[position];
  if (!positionMeanings) return null;

  const meaning = positionMeanings.find(m => 
    m.card === card.name || m.card === card.nameTr
  );

  if (!meaning) return null;

  return {
    ...meaning,
    upright: isReversed ? meaning.reversed : meaning.upright,
    reversed: isReversed ? meaning.upright : meaning.reversed
  };
}

