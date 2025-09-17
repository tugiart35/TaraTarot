/*
info:
---
Dosya Amacı:
- İlişki Sorunları tarot açılımı konfigürasyonu
- 9 kartlık özel Venn diyagramı düzeni
- İlişki sorunları analizi ve çözüm odaklı açılım

Bağlı Dosyalar:
- position-meanings-index.ts (pozisyon anlamları)
- RelationshipProblemsTarot.tsx (ana bileşen)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, tam konfigürasyon hazır
---

*/

import { PositionLayout, PositionInfo } from '@/types/tarot';

export const RELATIONSHIP_PROBLEMS_CARD_COUNT = 9;

// İlişki Sorunları açılımı pozisyon düzeni - Venn diyagramı + üst sıra
export const RELATIONSHIP_PROBLEMS_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  // Üst sıra (7, 8, 9)
  { id: 1, className: 'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol üst
  { id: 2, className: 'absolute top-[65%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Merkez üst
  { id: 3, className: 'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ üst
  
  // Sağ daire (1, 2)
  { id: 4, className: 'absolute top-[65%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ daire alt
  { id: 5, className: 'absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ daire üst
  
  // Sol daire (3, 4)
  { id: 6, className: 'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol daire alt
  { id: 7, className: 'absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol daire üst
  
  // Merkez kesişim (5, 6)
  { id: 8, className: 'absolute top-[12%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30' }, // Merkez alt
  { id: 9, className: 'absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-30' }, // Merkez üst
] as const;

// İlişki Sorunları açılımı pozisyon bilgileri
export const RELATIONSHIP_PROBLEMS_POSITIONS_INFO: readonly PositionInfo[] = [
  {
    id: 1,
    title: 'Çelişki nedir?',
    desc: 'İlişkinizdeki iç çelişkileri ve çatışmaları gösterir. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.',
    description: 'İlişkinizdeki iç çelişkileri ve çatışmaları gösterir. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.',
  },
  {
    id: 2,
    title: 'Sorun nedir?',
    desc: 'İlişkinizdeki ana problemi ve temel sorunu ortaya koyar. Hangi konunun en büyük zorluk yarattığını gösterir.',
    description: 'İlişkinizdeki ana problemi ve temel sorunu ortaya koyar. Hangi konunun en büyük zorluk yarattığını gösterir.',
  },
  {
    id: 3,
    title: 'Sorunu ben mi yarattım?',
    desc: 'Sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösterir. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.',
    description: 'Sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösterir. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.',
  },
  {
    id: 4,
    title: 'Bu sorundaki payımı görmezden mi geliyorum?',
    desc: 'Kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösterir. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.',
    description: 'Kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösterir. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.',
  },
  {
    id: 5,
    title: 'Birlikte olduğum kişiyle geçmişteki deneyimlerim',
    desc: 'Partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösterir. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.',
    description: 'Partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösterir. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.',
  },
  {
    id: 6,
    title: 'Birbirimizi suistimal mi ediyoruz?',
    desc: 'İlişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösterir. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.',
    description: 'İlişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösterir. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.',
  },
  {
    id: 7,
    title: 'Sorunumuza karışan başka insanlar var mı?',
    desc: 'İlişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösterir. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.',
    description: 'İlişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösterir. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.',
  },
  {
    id: 8,
    title: 'İlişkimizi etkileyen maddi sorunlar var mı?',
    desc: 'Para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösterir. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.',
    description: 'Para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösterir. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.',
  },
  {
    id: 9,
    title: 'Bu ilişki sürecek mi?',
    desc: 'İlişkinizin geleceği hakkında öngörü sunar. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.',
    description: 'İlişkinizin geleceği hakkında öngörü sunar. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.',
  },
] as const;
