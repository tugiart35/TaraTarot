/*
info:
---
Dosya Amacı:
- Kariyer açılımı için pozisyon bilgilerini ve layout konfigürasyonunu tanımlar
- 4 kartlık kariyer odaklı tarot açılımı için gerekli sabitler

Üretime Hazır mı?:
- Dosya basit konfigürasyon sabitleri içerir, üretime hazırdır
- Pozisyon başlıkları ve açıklamaları kariyer temasına uygun
- CSS layout sınıfları responsive tasarım için optimize edilmiş

Kullanım:
- CareerTarot.tsx ana bileşeni tarafından import edilir
- Pozisyon bilgileri ve layout konfigürasyonu sağlar
- Kart sayısı ve pozisyon düzeni merkezi olarak yönetilir
---
*/

import type { PositionInfo, PositionLayout } from '@/types/tarot';

/**
 * Kariyer Açılımı pozisyon başlıkları ve açıklamaları (7 kartlık)
 * Fotograftaki dizilime göre güncellendi
 */
export const CAREER_POSITIONS_INFO: readonly PositionInfo[] = [
  {
    id: 1,
    title: 'Gerçekten istediğim kariyer bu mu?',
    desc: 'Kariyer tercihlerinizi sorgulayın',
    description:
      'Mevcut kariyerinizin gerçekten istediğiniz kariyer olup olmadığını değerlendirin',
  },
  {
    id: 2,
    title: 'Kariyerimi geliştirmek için hangi adımları atabilirim?',
    desc: 'Kariyer gelişim adımları',
    description: 'Kariyerinizi ilerletmek için atabileceğiniz somut adımlar',
  },
  {
    id: 3,
    title: 'Kariyerimde değiştiremediğim taraflar var mı?',
    desc: 'Değiştirilemeyen faktörler',
    description:
      'Kariyerinizde kontrol edemediğiniz veya değiştiremediğiniz unsurlar',
  },
  {
    id: 4,
    title: 'Kariyerimde elimden gelenin en iyisini yapıyor muyum?',
    desc: 'Mevcut performans değerlendirmesi',
    description:
      'Şu anki kariyerinizde gösterdiğiniz performans ve çaba seviyesi',
  },
  {
    id: 5,
    title: 'Kariyerime yardımcı olacak ne gibi değişiklikler yapabilirim?',
    desc: 'Yapılabilecek değişiklikler',
    description:
      'Kariyerinize olumlu katkı sağlayacak değişiklikler ve iyileştirmeler',
  },
  {
    id: 6,
    title: 'Geçmişimdeki hangi engeller şimdiki kariyerimi etkiliyor?',
    desc: 'Geçmişten gelen engeller',
    description: 'Geçmiş deneyimlerinizin mevcut kariyerinizi nasıl etkilediği',
  },
  {
    id: 7,
    title: 'Sonuç ne olacak?',
    desc: 'Genel sonuç ve öngörü',
    description: 'Kariyer yolculuğunuzun genel sonucu ve gelecekteki öngörüler',
  },
] as const;

/**
 * Kartların canvas üzerindeki CSS konumları (7 kart için fotograftaki dizilim)
 * Fotograftaki kariyer açılımı dizilimine göre güncellendi
 */
export const CAREER_POSITIONS_LAYOUT: readonly PositionLayout[] = [
  {
    id: 1, // Sağ üst
    className:
      'absolute top-[15%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2, // Sol üst
    className:
      'absolute top-[15%] left-[35%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3, // Orta
    className:
      'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4, // En sağ (3’ün hizasında sağ kenarda)
    className:
      'absolute top-[85%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5, // 3’ün sağ altı
    className:
      'absolute top-[85%] left-[60%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6, // 3’ün sol altı
    className:
      'absolute top-[85%] left-[40%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 7, // En sol (6’nın hizasında)
    className:
      'absolute top-[85%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
] as const;

/**
 * Kariyer Açılımı için toplam kart sayısı
 */
export const CAREER_CARD_COUNT = 7;
