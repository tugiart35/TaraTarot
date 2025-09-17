/**
 * Relationship Analysis (İlişki Analizi) Açılımı Pozisyon Anlamları
 * Her kartın pozisyonuna göre özel anlamları
 */

import { TarotCard } from '@/lib/types/tarot';

export interface RelationshipAnalysisPositionMeaning {
  position: string;
  cardName: string;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
  advice?: string;
}

/**
 * İlişki Analizi açılımında kartın pozisyonuna göre anlamını döndürür
 */
export function getRelationshipAnalysisMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): RelationshipAnalysisPositionMeaning {
  const baseMeaning = isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
  const baseKeywords = card.keywords || [];

  // Pozisyona göre özel anlamlar
  switch (position) {
    case 1: // Mevcut Durum
      return {
        position: 'Mevcut Durum',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, ilişkinizin mevcut şartlarını ve içinde bulunduğu durumu anlatır. Eğer ilişkinizde herhangi bir problem söz konusu ise, bu kart problemin yarattığı atmosfer hakkında size bilgi verecektir.`,
        keywords: [...baseKeywords, 'mevcut durum', 'ilişki şartları', 'atmosfer'],
        advice: 'Mevcut durumu objektif olarak değerlendirin ve gerçekçi bir bakış açısı benimseyin.'
      };

    case 2: // Sizin Hissleriniz
      return {
        position: 'Sizin Hissleriniz',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart sizin hislerinizi, düşüncelerinizi ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu ve iç dünyanızı yansıtır.`,
        keywords: [...baseKeywords, 'sizin hisleriniz', 'duygusal durum', 'bakış açısı'],
        advice: 'Duygularınızı tanıyın ve ifade etmekten çekinmeyin. Açık iletişim önemlidir.'
      };

    case 3: // Sizin Beklentileriniz
      return {
        position: 'Sizin Beklentileriniz',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.`,
        keywords: [...baseKeywords, 'beklentiler', 'endişeler', 'hayaller'],
        advice: 'Beklentilerinizi partnerinizle paylaşın ve gerçekçi hedefler belirleyin.'
      };

    case 4: // Tavsiyeler
      return {
        position: 'Tavsiyeler',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, ilişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.`,
        keywords: [...baseKeywords, 'tavsiyeler', 'tutum', 'davranış'],
        advice: 'Tavsiyeleri dikkate alın ve ilişkiniz için olumlu adımlar atın.'
      };

    case 5: // Yol Haritası
      return {
        position: 'Yol Haritası',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.`,
        keywords: [...baseKeywords, 'yol haritası', 'tavır', 'çözüm yolu'],
        advice: 'Sabırlı olun ve adım adım ilerleyin. Aceleci kararlar vermeyin.'
      };

    case 6: // Partnerinizin Beklentileri
      return {
        position: 'Partnerinizin Beklentileri',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.`,
        keywords: [...baseKeywords, 'partner beklentileri', 'partner endişeleri', 'partner hayalleri'],
        advice: 'Partnerinizin beklentilerini anlamaya çalışın ve empati kurun.'
      };

    case 7: // Partnerinizin Hissleri
      return {
        position: 'Partnerinizin Hissleri',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.`,
        keywords: [...baseKeywords, 'partner hisleri', 'partner düşünceleri', 'partner bakış açısı'],
        advice: 'Partnerinizin duygularına saygı gösterin ve onu dinleyin.'
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
