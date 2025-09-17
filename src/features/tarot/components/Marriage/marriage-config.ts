/*
info:
---
Dosya Amacı:
- Evlilik tarot açılımı konfigürasyonu
- 10 kartlık özel düzen (üst-orta-alt sıralar + daireler)
- Evlilik ve eş bulma odaklı açılım

Bağlı Dosyalar:
- position-meanings-index.ts (pozisyon anlamları)
- MarriageTarot.tsx (ana bileşen)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, tam konfigürasyon hazır
---

*/

import { PositionLayout, PositionInfo } from '@/types/tarot';

export const MARRIAGE_CARD_COUNT = 10;

// Evlilik açılımı pozisyon düzeni - üst-orta-alt sıralar + daireler
export const MARRIAGE_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  // Üst sıra (10, 9, 8)
  { id: 10, className: 'absolute top-[10%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol üst
  {
    id: 9,
    className:
      'absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Merkez üst
  { id: 8, className: 'absolute top-[10%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sağ üst
  
  // Orta sıra - Sol daire (7, 6)
  { id: 7, className: 'absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol daire üst
  { id: 6, className: 'absolute top-[55%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sol daire alt

  // Orta sıra - Sağ daire (5, 4)
  {
    id: 5,
    className:
      'absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire üst
  {
    id: 4,
    className:
      'absolute top-[55%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire alt

  // Alt sıra (3, 2, 1)
  {
    id: 3,
    className:
      'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol alt
  {
    id: 2,
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Merkez alt
  {
    id: 1,
    className:
      'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ alt
] as const;

// Evlilik açılımı pozisyon bilgileri
export const MARRIAGE_POSITIONS_INFO: readonly PositionInfo[] = [
  {
    id: 1,
    title: 'Sonuç ne olacak?',
    desc: 'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
    description:
      'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
  },
  {
    id: 2,
    title: 'Eşimi beklerken benim ne yapmam gerekiyor?',
    desc: 'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
    description:
      'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
  },
  {
    id: 3,
    title: 'Mali kaynaklarımızı birbirimizle paylaşacak mıyız?',
    desc: 'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
    description:
      'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
  },
  {
    id: 4,
    title: 'Her ikimiz de bağlanmak isteyecek miyiz?',
    desc: 'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
    description:
      'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
  },
  {
    id: 5,
    title: 'Benzer yanlarımız olacak mı?',
    desc: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
    description: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
  },
  {
    id: 6,
    title: 'Bu kişinin ailesi beni kabul edecek mi?',
    desc: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
    description: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
  },
  {
    id: 7,
    title: 'Birbirimizi nasıl bulacağız?',
    desc: 'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
    description:
      'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
  },
  {
    id: 8,
    title: 'Anlaşabilecek miyiz?',
    desc: 'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
    description:
      'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
  },
  {
    id: 9,
    title: 'Benim için nasıl bir eş uygundur?',
    desc: 'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
    description:
      'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
  },
  {
    id: 10,
    title: 'Evlenebilecek miyim?',
    desc: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
    description: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
  },
] as const;
