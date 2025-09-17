/*
info:
---
Dosya Amacı:
- İlişki Sorunları açılımı için pozisyon-spesifik kart anlamları
- Her pozisyon için özel yorum ve tavsiyeler
- İlişki sorunları analizi odaklı anlamlar

Bağlı Dosyalar:
- relationship-problems-config.ts (pozisyon bilgileri)
- RelationshipProblemsTarot.tsx (ana bileşen)

Üretime Hazır mı?:
- Evet, tüm pozisyon anlamları hazır
---

*/

import { TarotCard } from '@/types/tarot';
import { RELATIONSHIP_PROBLEMS_POSITIONS_INFO } from '@/features/tarot/components/Relationship-Problems/relationship-problems-config';

export function getRelationshipProblemsMeaningByCardAndPosition(
  card: TarotCard,
  positionId: number,
  isReversed: boolean
): { meaning: string; advice: string; keywords?: string[] } | null {
  const positionInfo = RELATIONSHIP_PROBLEMS_POSITIONS_INFO.find(p => p.id === positionId);
  if (!positionInfo) {
    return null;
  }

  const baseMeaning = isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
  const baseKeywords = card.keywords || []; // Ensure keywords is an array

  switch (positionId) {
    case 1: // Çelişki nedir?
      return {
        meaning: `${baseMeaning} Bu kart, ilişkinizdeki iç çelişkileri ve çatışmaları gösteriyor. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.`,
        advice: 'Çelişkileri görmezden gelmek yerine, onları konuşmaya açık olun. Farklılıklarınızı anlamak, ilişkinizi güçlendirebilir.',
        keywords: baseKeywords,
      };
    case 2: // Sorun nedir?
      return {
        meaning: `${baseMeaning} Bu kart, ilişkinizdeki ana problemi ve temel sorunu ortaya koyuyor. Hangi konunun en büyük zorluk yarattığını gösterir.`,
        advice: 'Ana sorunu tespit etmek, çözümün ilk adımıdır. Sorunu net bir şekilde tanımlayın ve çözüm yolları arayın.',
        keywords: baseKeywords,
      };
    case 3: // Sorunu ben mi yarattım?
      return {
        meaning: `${baseMeaning} Bu kart, sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösteriyor. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.`,
        advice: 'Kendi sorumluluğunuzu kabul etmek, ilişkinizde olgunluk göstergesidir. Kendi hatalarınızı düzeltmeye odaklanın.',
        keywords: baseKeywords,
      };
    case 4: // Bu sorundaki payımı görmezden mi geliyorum?
      return {
        meaning: `${baseMeaning} Bu kart, kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösteriyor. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.`,
        advice: 'Kendi payınızı kabul etmek, ilişkinizde güven oluşturur. Savunmacı olmak yerine, özeleştiri yapmaya açık olun.',
        keywords: baseKeywords,
      };
    case 5: // Birlikte olduğum kişiyle geçmişteki deneyimlerim
      return {
        meaning: `${baseMeaning} Bu kart, partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösteriyor. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.`,
        advice: 'Geçmiş deneyimlerinizi analiz edin ama onlara takılı kalmayın. Her gün yeni bir başlangıç yapabilirsiniz.',
        keywords: baseKeywords,
      };
    case 6: // Birbirimizi suistimal mi ediyoruz?
      return {
        meaning: `${baseMeaning} Bu kart, ilişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösteriyor. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.`,
        advice: 'Sağlıklı sınırlar koymak, ilişkinizi korur. Birbirinize saygı göstermek ve zarar vermemek temel prensip olmalı.',
        keywords: baseKeywords,
      };
    case 7: // Sorunumuza karışan başka insanlar var mı?
      return {
        meaning: `${baseMeaning} Bu kart, ilişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösteriyor. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.`,
        advice: 'Dış etkenleri kontrol edin ama ilişkinizi başkalarının yönetmesine izin vermeyin. İlişkiniz sadece ikinize aittir.',
        keywords: baseKeywords,
      };
    case 8: // İlişkimizi etkileyen maddi sorunlar var mı?
      return {
        meaning: `${baseMeaning} Bu kart, para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösteriyor. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.`,
        advice: 'Maddi sorunları birlikte çözmeye odaklanın. Para, sevginin yerini alamaz ama planlı hareket etmek önemlidir.',
        keywords: baseKeywords,
      };
    case 9: // Bu ilişki sürecek mi?
      return {
        meaning: `${baseMeaning} Bu kart, ilişkinizin geleceği hakkında öngörü sunuyor. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.`,
        advice: 'Gelecek, bugünkü kararlarınıza bağlıdır. İlişkinizi kurtarmak için birlikte çalışın ve umudunuzu kaybetmeyin.',
        keywords: baseKeywords,
      };
    default:
      return null;
  }
}
