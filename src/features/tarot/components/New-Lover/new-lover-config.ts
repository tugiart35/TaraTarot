// Yeni Bir Sevgili açılımı konfigürasyonu
// 6 kartlık özel düzen

import { PositionInfo, PositionLayout } from '@/types/tarot';

// Yeni Bir Sevgili açılımı için pozisyon bilgileri
export const NEW_LOVER_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Yakında yeni bir ilişki yaşayacak mıyım?',
    desc: 'Gelecekteki ilişki potansiyelinizi gösterir',
    description: 'Bu pozisyon, yakın gelecekte yeni bir ilişki yaşayıp yaşamayacağınızı ve bu ilişkinin nasıl başlayacağını gösterir.'
  },
  {
    id: 2,
    title: 'Bu kişi hangi burçtan olacak?',
    desc: 'Gelecekteki partnerinizin astrolojik özelliklerini gösterir',
    description: 'Bu pozisyon, gelecekteki partnerinizin burç özelliklerini ve kişilik yapısını ortaya koyar.'
  },
  {
    id: 3,
    title: 'Birbirimizle uyumlu olacak mıyız?',
    desc: 'İlişkinizdeki uyum ve uyumsuzlukları gösterir',
    description: 'Bu pozisyon, gelecekteki partnerinizle aranızdaki uyumu, ortak noktaları ve potansiyel zorlukları gösterir.'
  },
  {
    id: 4,
    title: 'Uzun süreli bir ilişki olacak mı?',
    desc: 'İlişkinizin sürekliliğini ve derinliğini gösterir',
    description: 'Bu pozisyon, gelecekteki ilişkinizin ne kadar süreceğini ve ne kadar derin olacağını gösterir.'
  },
  {
    id: 5,
    title: 'Bu kişi benim ruh eşim olabilir mi?',
    desc: 'Ruhsal bağlantı ve derin aşk potansiyelini gösterir',
    description: 'Bu pozisyon, gelecekteki partnerinizin ruh eşiniz olup olmadığını ve aranızdaki ruhsal bağı gösterir.'
  },
  {
    id: 6,
    title: 'Dileğim gerçekleşecek mi?',
    desc: 'Aşk dileğinizin gerçekleşme olasılığını gösterir',
    description: 'Bu pozisyon, aşk dileğinizin gerçekleşip gerçekleşmeyeceğini ve bunun için ne yapmanız gerektiğini gösterir.'
  }
];

// Yeni Bir Sevgili açılımı için pozisyon düzeni
// Resimdeki düzene göre: alt sağ, alt sol, orta sol (hafif eğik), üst sol, üst sağ, orta sağ (hafif eğik)
export const NEW_LOVER_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1, // sağ altta
    className:
      'absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2, // sol altta
    className:
      'absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3, // en sol (hafif yana kayık)
    className:
      'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 -rotate-6 z-20',
  },
  {
    id: 4, // üst sol
    className:
      'absolute top-[30%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5, // üst sağ
    className:
      'absolute top-[30%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6, // en sağ (hafif yana kayık)
    className:
      'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 rotate-6 z-20',
  },
] as const;

// Yeni Bir Sevgili açılımı için toplam kart sayısı
export const NEW_LOVER_CARD_COUNT = 6;