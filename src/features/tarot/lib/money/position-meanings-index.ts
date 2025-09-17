/*
info:
---
Dosya Amacı:
- Para Açılımı tarot açılımında her pozisyon için kart anlamlarını birleştirir
- Pozisyona, karta, anahtar kelimeye veya gruba göre anlam arama ve filtreleme fonksiyonları sunar
- Pozisyon başlıkları, açıklamaları ve ilgili meta verileri içerir

Bağlı Dosyalar:
- MoneyTarot.tsx (ana bileşen)
- money-config.ts (konfigürasyon)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, tüm pozisyon anlamları ve arama fonksiyonları tamamlandı
---

*/

import { TarotCard } from '@/types/tarot';

export interface MoneyPositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

/**
 * Para Açılımı pozisyon anlamları
 * Her pozisyon için kart anlamlarını içerir
 */
export const MONEY_POSITION_MEANINGS: Record<string, MoneyPositionMeaning[]> = {
  // Pozisyon 1: Mevcut Finansal Durum
  '1': [
    {
      id: '1-fool',
      card: 'The Fool',
      position: 1,
      upright: 'Yeni finansal başlangıçlar ve fırsatlar. Para konusunda cesur adımlar atma zamanı. Yatırım yapmak için uygun dönem.',
      reversed: 'Finansal riskler ve dikkatsiz harcamalar. Para konusunda aceleci kararlar. Yatırım yapmadan önce daha fazla araştırma yapın.',
      keywords: ['yeni başlangıç', 'fırsat', 'risk', 'cesaret'],
      context: 'Mevcut finansal durumunuzda yeni fırsatlar ve başlangıçlar',
      group: 'Majör Arkana',
    },
    {
      id: '1-magician',
      card: 'The Magician',
      position: 1,
      upright: 'Para konusunda güçlü kontrol ve yetenek. Finansal hedeflerinize ulaşmak için gerekli araçlara sahipsiniz.',
      reversed: 'Para konusunda kontrol eksikliği. Finansal yeteneklerinizi kullanamama. Hedeflerinize ulaşmak için daha fazla çaba gerekli.',
      keywords: ['kontrol', 'yetenek', 'güç', 'araçlar'],
      context: 'Mevcut finansal durumunuzda kontrol ve yetenek',
      group: 'Majör Arkana',
    },
    {
      id: '1-ace-pentacles',
      card: 'Ace of Pentacles',
      position: 1,
      upright: 'Yeni finansal fırsatlar ve başarı. Para kazanma potansiyeli yüksek. Yatırım yapmak için ideal zaman.',
      reversed: 'Finansal fırsatları kaçırma. Para kazanma konusunda zorluklar. Yatırım yapmadan önce daha fazla düşünün.',
      keywords: ['fırsat', 'başarı', 'potansiyel', 'yatırım'],
      context: 'Mevcut finansal durumunuzda yeni fırsatlar',
      group: 'Tılsımlar',
    },
  ],

  // Pozisyon 2: Para Akışı
  '2': [
    {
      id: '2-two-pentacles',
      card: 'Two of Pentacles',
      position: 2,
      upright: 'Para akışında denge ve uyum. Gelir ve giderleriniz dengeli. Finansal esneklik ve adaptasyon.',
      reversed: 'Para akışında dengesizlik. Gelir ve giderler arasında sorunlar. Finansal stres ve zorluklar.',
      keywords: ['denge', 'uyum', 'esneklik', 'adaptasyon'],
      context: 'Para akışınızda denge ve uyum',
      group: 'Tılsımlar',
    },
    {
      id: '2-three-pentacles',
      card: 'Three of Pentacles',
      position: 2,
      upright: 'Para kazanma konusunda işbirliği ve takım çalışması. Finansal başarı için ortaklıklar.',
      reversed: 'Para kazanma konusunda işbirliği eksikliği. Finansal başarı için yalnız çalışma gerekiyor.',
      keywords: ['işbirliği', 'takım çalışması', 'ortaklık', 'başarı'],
      context: 'Para akışınızda işbirliği ve takım çalışması',
      group: 'Tılsımlar',
    },
  ],

  // Pozisyon 3: Finansal Engeller
  '3': [
    {
      id: '3-five-pentacles',
      card: 'Five of Pentacles',
      position: 3,
      upright: 'Finansal zorluklar ve engeller. Para konusunda geçici sıkıntılar. Yardım arama zamanı.',
      reversed: 'Finansal zorlukların üstesinden gelme. Para konusunda iyileşme başlangıcı. Yeni fırsatlar yaklaşıyor.',
      keywords: ['zorluk', 'engel', 'sıkıntı', 'yardım'],
      context: 'Finansal engelleriniz ve zorluklarınız',
      group: 'Tılsımlar',
    },
    {
      id: '3-seven-swords',
      card: 'Seven of Swords',
      position: 3,
      upright: 'Finansal aldatma ve hile. Para konusunda güven sorunları. Dikkatli olun.',
      reversed: 'Finansal aldatmanın ortaya çıkması. Para konusunda gerçeklerin açığa çıkması. Güven yeniden kuruluyor.',
      keywords: ['aldatma', 'hile', 'güven', 'dikkat'],
      context: 'Finansal engellerinizde aldatma ve hile',
      group: 'Kılıçlar',
    },
  ],

  // Pozisyon 4: Fırsatlar
  '4': [
    {
      id: '4-wheel-of-fortune',
      card: 'Wheel of Fortune',
      position: 4,
      upright: 'Finansal şans ve fırsatlar. Para konusunda olumlu değişimler. Yeni fırsatlar yaklaşıyor.',
      reversed: 'Finansal şanssızlık ve fırsat kaybı. Para konusunda olumsuz değişimler. Sabırlı olun.',
      keywords: ['şans', 'fırsat', 'değişim', 'döngü'],
      context: 'Finansal fırsatlarınız ve şansınız',
      group: 'Majör Arkana',
    },
    {
      id: '4-nine-pentacles',
      card: 'Nine of Pentacles',
      position: 4,
      upright: 'Finansal başarı ve refah. Para konusunda güvenlik ve istikrar. Yatırımlarınız meyve veriyor.',
      reversed: 'Finansal başarısızlık ve refah kaybı. Para konusunda güvensizlik. Yatırımlarınızı gözden geçirin.',
      keywords: ['başarı', 'refah', 'güvenlik', 'istikrar'],
      context: 'Finansal fırsatlarınızda başarı ve refah',
      group: 'Tılsımlar',
    },
  ],

  // Pozisyon 5: Yakın Gelecek
  '5': [
    {
      id: '5-ten-pentacles',
      card: 'Ten of Pentacles',
      position: 5,
      upright: 'Finansal başarı ve aile refahı. Para konusunda uzun vadeli güvenlik. Yatırımlarınız başarılı.',
      reversed: 'Finansal başarısızlık ve aile sorunları. Para konusunda güvensizlik. Yatırımlarınızı gözden geçirin.',
      keywords: ['başarı', 'aile', 'güvenlik', 'yatırım'],
      context: 'Yakın gelecekteki finansal durumunuz',
      group: 'Tılsımlar',
    },
    {
      id: '5-king-pentacles',
      card: 'King of Pentacles',
      position: 5,
      upright: 'Finansal liderlik ve başarı. Para konusunda güçlü kontrol. Yatırım yapmak için ideal zaman.',
      reversed: 'Finansal liderlik eksikliği. Para konusunda kontrol kaybı. Yatırım yapmadan önce daha fazla düşünün.',
      keywords: ['liderlik', 'başarı', 'kontrol', 'güç'],
      context: 'Yakın gelecekteki finansal liderliğiniz',
      group: 'Tılsımlar',
    },
  ],

  // Pozisyon 6: Yeni Mali Planlar
  '6': [
    {
      id: '6-world',
      card: 'The World',
      position: 6,
      upright: 'Yeni mali planlarınızda başarı. Para konusunda tamamlanma ve başarı. Uzun vadeli planlarınız gerçekleşiyor.',
      reversed: 'Yeni mali planlarınızda başarısızlık. Para konusunda eksiklik ve başarısızlık. Planlarınızı gözden geçirin.',
      keywords: ['plan', 'tamamlanma', 'başarı', 'yeni'],
      context: 'Yeni mali planlarınız ve yatırımlarınız',
      group: 'Majör Arkana',
    },
    {
      id: '6-ace-cups',
      card: 'Ace of Cups',
      position: 6,
      upright: 'Yeni mali planlarınızda yeni başlangıçlar. Para konusunda duygusal tatmin. Yatırım yapmak için ideal zaman.',
      reversed: 'Yeni mali planlarınızda gecikme. Para konusunda duygusal tatminsizlik. Yatırım yapmadan önce daha fazla düşünün.',
      keywords: ['başlangıç', 'tatmin', 'duygu', 'plan'],
      context: 'Yeni mali planlarınızda yeni başlangıçlar',
      group: 'Kupalar',
    },
  ],

  // Pozisyon 7: Gelecek Para Planları
  '7': [
    {
      id: '7-star',
      card: 'The Star',
      position: 7,
      upright: 'Gelecekteki para planlarınızda umut ve rehberlik. Finansal hedeflerinize ulaşma yolunda ilham.',
      reversed: 'Gelecekteki para planlarınızda umutsuzluk. Finansal hedeflerinize ulaşma yolunda zorluklar.',
      keywords: ['umut', 'rehberlik', 'ilham', 'gelecek'],
      context: 'Gelecekteki para planlarınızda umut ve rehberlik',
      group: 'Majör Arkana',
    },
    {
      id: '7-eight-pentacles',
      card: 'Eight of Pentacles',
      position: 7,
      upright: 'Gelecekteki para planlarınızda çalışma ve gelişim. Finansal hedeflerinize ulaşmak için sürekli çaba.',
      reversed: 'Gelecekteki para planlarınızda tembellik. Finansal hedeflerinize ulaşmak için daha fazla çaba gerekli.',
      keywords: ['çalışma', 'gelişim', 'çaba', 'gelecek'],
      context: 'Gelecekteki para planlarınızda çalışma ve gelişim',
      group: 'Tılsımlar',
    },
  ],

  // Pozisyon 8: Para Kazanma Yetenekleri
  '8': [
    {
      id: '8-sun',
      card: 'The Sun',
      position: 8,
      upright: 'Para kazanma yeteneklerinizde başarı ve mutluluk. Finansal hedeflerinize ulaşma konusunda güçlü yetenekler.',
      reversed: 'Para kazanma yeteneklerinizde zorluklar. Finansal hedeflerinize ulaşma konusunda yetenek eksikliği.',
      keywords: ['başarı', 'mutluluk', 'yetenek', 'güç'],
      context: 'Para kazanma yeteneklerinizde başarı ve mutluluk',
      group: 'Majör Arkana',
    },
    {
      id: '8-queen-pentacles',
      card: 'Queen of Pentacles',
      position: 8,
      upright: 'Para kazanma yeteneklerinizde pratiklik ve başarı. Finansal hedeflerinize ulaşma konusunda güçlü yetenekler.',
      reversed: 'Para kazanma yeteneklerinizde pratiklik eksikliği. Finansal hedeflerinize ulaşma konusunda yetenek eksikliği.',
      keywords: ['pratiklik', 'başarı', 'yetenek', 'güç'],
      context: 'Para kazanma yeteneklerinizde pratiklik ve başarı',
      group: 'Tılsımlar',
    },
  ],
};

/**
 * Para Açılımı pozisyon anlamlarını al
 */
export function getMoneyPositionMeanings(position: number): MoneyPositionMeaning[] {
  return MONEY_POSITION_MEANINGS[position.toString()] || [];
}

/**
 * Belirli bir kart ve pozisyon için anlam al
 */
export function getMoneyCardMeaning(
  card: TarotCard,
  position: number,
  isReversed: boolean = false
): string {
  const positionMeanings = getMoneyPositionMeanings(position);
  const cardMeaning = positionMeanings.find(
    meaning => meaning.card === card.name
  );

  if (cardMeaning) {
    return isReversed ? cardMeaning.reversed : cardMeaning.upright;
  }

  // Eğer pozisyona özel anlam bulunamazsa, genel kart anlamını döndür
  return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
}

/**
 * Anahtar kelimeye göre anlam ara
 */
export function searchMoneyMeaningsByKeyword(keyword: string): MoneyPositionMeaning[] {
  const allMeanings: MoneyPositionMeaning[] = [];
  
  Object.values(MONEY_POSITION_MEANINGS).forEach(meanings => {
    allMeanings.push(...meanings);
  });

  return allMeanings.filter(meaning =>
    meaning.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())) ||
    meaning.upright.toLowerCase().includes(keyword.toLowerCase()) ||
    meaning.reversed.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Kart grubuna göre anlam ara
 */
export function getMoneyMeaningsByGroup(group: string): MoneyPositionMeaning[] {
  const allMeanings: MoneyPositionMeaning[] = [];
  
  Object.values(MONEY_POSITION_MEANINGS).forEach(meanings => {
    allMeanings.push(...meanings);
  });

  return allMeanings.filter(meaning => meaning.group === group);
}
