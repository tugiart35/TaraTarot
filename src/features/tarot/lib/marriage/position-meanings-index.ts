/*
info:
---
Dosya Amacı:
- Evlilik açılımı pozisyon anlamları
- 10 pozisyon için özel evlilik odaklı yorumlar
- Sylvia Abraha kitabından uyarlanmış

Bağlı Dosyalar:
- marriage-config.ts (pozisyon tanımları)
- MarriageTarot.tsx (ana bileşen)

Üretime Hazır mı?:
- Evet, tam anlam seti hazır
---

*/

import { TarotCard } from '@/types/tarot';

export interface MarriagePositionMeaning {
  position: string;
  cardName: string;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
  advice?: string;
}

export function getMarriageMeaningByCardAndPosition(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): MarriagePositionMeaning {
  const baseMeaning = isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
  const baseKeywords = card.keywords || [];

  switch (position) {
    case 1:
      return {
        position: 'Sonuç ne olacak?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir. Evlilik yolculuğunuzun nereye varacağını anlamanıza yardımcı olur.`,
        keywords: [...baseKeywords, 'sonuç', 'evlilik', 'gelecek'],
        advice: 'Sabırlı olun ve sürecin doğal akışına güvenin.'
      };
    case 2:
      return {
        position: 'Eşimi beklerken benim ne yapmam gerekiyor?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir. Bekleme sürecinde odaklanmanız gereken alanları ortaya koyar.`,
        keywords: [...baseKeywords, 'bekleme', 'gelişim', 'hazırlık'],
        advice: 'Kendinizi geliştirmeye odaklanın ve sabırlı olun.'
      };
    case 3:
      return {
        position: 'Mali kaynaklarımızı birbirimizle paylaşacak mıyız?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir. Para konularında nasıl anlaşacağınızı ortaya koyar.`,
        keywords: [...baseKeywords, 'mali', 'paylaşım', 'uyum'],
        advice: 'Mali konularda açık ve dürüst olun.'
      };
    case 4:
      return {
        position: 'Her ikimiz de bağlanmak isteyecek miyiz?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir. Karşılıklı taahhüt durumunu ortaya koyar.`,
        keywords: [...baseKeywords, 'bağlanma', 'taahhüt', 'hazırlık'],
        advice: 'Karşılıklı istek ve hazırlık önemlidir.'
      };
    case 5:
      return {
        position: 'Benzer yanlarımız olacak mı?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir. Hangi konularda uyumlu olacağınızı ortaya koyar.`,
        keywords: [...baseKeywords, 'benzerlik', 'uyum', 'değerler'],
        advice: 'Ortak değerlerinizi keşfedin ve geliştirin.'
      };
    case 6:
      return {
        position: 'Bu kişinin ailesi beni kabul edecek mi?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir. Aile entegrasyonu konusunda bilgi verir.`,
        keywords: [...baseKeywords, 'aile', 'onay', 'kabul'],
        advice: 'Aile ilişkilerine özen gösterin.'
      };
    case 7:
      return {
        position: 'Birbirimizi nasıl bulacağız?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir. Tanışma yollarınızı ortaya koyar.`,
        keywords: [...baseKeywords, 'tanışma', 'buluşma', 'yol'],
        advice: 'Doğal yolları takip edin ve kendiniz olun.'
      };
    case 8:
      return {
        position: 'Anlaşabilecek miyiz?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, iletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir. Anlaşma potansiyelinizi ortaya koyar.`,
        keywords: [...baseKeywords, 'anlaşma', 'iletişim', 'uyum'],
        advice: 'Açık iletişim kurun ve dinlemeyi öğrenin.'
      };
    case 9:
      return {
        position: 'Benim için nasıl bir eş uygundur?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, ideal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir. Aradığınız kişinin profilini ortaya koyar.`,
        keywords: [...baseKeywords, 'ideal eş', 'özellikler', 'uyum'],
        advice: 'Gerçekçi beklentiler oluşturun.'
      };
    case 10:
      return {
        position: 'Evlenebilecek miyim?',
        cardName: card.nameTr,
        isReversed,
        meaning: `${baseMeaning} Bu kart, evlilik potansiyelinizi ve evlenme şansınızı gösterir. Evlilik yolculuğunuzun başlangıcını ortaya koyar.`,
        keywords: [...baseKeywords, 'evlilik', 'potansiyel', 'şans'],
        advice: 'Kendinize güvenin ve pozitif düşünün.'
      };
    default:
      return {
        position: `Pozisyon ${position}`,
        cardName: card.nameTr,
        isReversed,
        meaning: baseMeaning,
        keywords: baseKeywords,
      };
  }
}