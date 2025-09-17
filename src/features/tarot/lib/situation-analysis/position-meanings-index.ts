/**
 * Situation Analysis (Durum Analizi) Açılımı Pozisyon Anlamları
 * Her kartın pozisyonuna göre özel anlamları
 */

import { TarotCard } from '@/lib/types/tarot';

export interface SituationAnalysisPositionMeaning {
  position: string;
  cardName: string;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
  advice?: string;
}

/**
 * Durum Analizi açılımında kartın pozisyonuna göre anlamını döndürür
 */
export function getSituationAnalysisMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): SituationAnalysisPositionMeaning {
  const baseMeaning = isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
  const baseKeywords = card.keywords || [];

  // Pozisyona göre özel anlamlar
  switch (position) {
    case 1:
      return {
        position: 'Geçmiş ya da Sebepler',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, mevcut durumunuzun geçmişteki kökenlerini ve sebeplerini gösteriyor. Yaşadığınız durumun temelinde yatan faktörleri anlamanıza yardımcı olur.`,
        keywords: [...baseKeywords, 'geçmiş', 'sebepler', 'köken'],
        advice: 'Geçmişi anlayın ama ona takılı kalmayın. Önemli olan şu anki durumunuzu iyileştirmektir.'
      };

    case 2:
      return {
        position: 'Şu Anki Durum',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, şu anda yaşadığınız durumu ve mevcut koşulları yansıtıyor. Gündemdeki konular ve anlık durumunuz hakkında bilgi verir.`,
        keywords: [...baseKeywords, 'şimdi', 'mevcut durum', 'gündem'],
        advice: 'Şu anki durumunuzu objektif olarak değerlendirin ve gerçekçi adımlar atın.'
      };

    case 3:
      return {
        position: 'Gizli Etkenler',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, bilinçaltınızda veya fark etmediğiniz alanlarda işleyen gizli faktörleri gösteriyor. Farkında olmadığınız etkileri ortaya çıkarır.`,
        keywords: [...baseKeywords, 'gizli', 'bilinçaltı', 'fark edilmeyen'],
        advice: 'Gizli faktörleri keşfetmek için iç gözlem yapın ve sezgilerinize güvenin.'
      };

    case 4:
      return {
        position: 'Merkez Kart',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, durumunuzun merkezini ve en önemli unsurlarını temsil ediyor. Hayatınızdaki en merkezi alanı veya kişiyi gösterir.`,
        keywords: [...baseKeywords, 'merkez', 'odak', 'ana unsur'],
        advice: 'Merkezi konulara odaklanın ve enerjinizi doğru yerlere yönlendirin.'
      };

    case 5:
      return {
        position: 'Dış Etkenler',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, dış dünyadan gelen etkileri ve farklı kaynaklardan gelecek bilgileri gösteriyor. Çevresel faktörleri yansıtır.`,
        keywords: [...baseKeywords, 'dış etkenler', 'çevre', 'dış dünya'],
        advice: 'Dış etkenleri göz önünde bulundurun ama kontrol edemeyeceğiniz şeylere odaklanmayın.'
      };

    case 6:
      return {
        position: 'Tavsiye',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, mevcut durumunuz için en uygun tavsiyeleri ve hareket tarzlarını sunuyor. Çözüm yollarını gösterir.`,
        keywords: [...baseKeywords, 'tavsiye', 'çözüm', 'hareket tarzı'],
        advice: 'Bu tavsiyeleri dikkate alın ve uygulanabilir adımlar atın.'
      };

    case 7:
      return {
        position: 'Olası Gelecek - Sonuç',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, mevcut gidişatın nereye varacağını ve olası sonuçları gösteriyor. Gelecekteki potansiyel durumu yansıtır.`,
        keywords: [...baseKeywords, 'gelecek', 'sonuç', 'potansiyel'],
        advice: 'Geleceği şekillendirmek için şimdi doğru kararlar alın ve harekete geçin.'
      };

    default:
      return {
        position: 'Bilinmeyen Pozisyon',
        cardName: card.nameTr,
        isReversed,
        meaning: baseMeaning,
        keywords: baseKeywords,
        advice: 'Bu pozisyon için özel bir anlam tanımlanmamış.'
      };
  }
}