/**
 * Situation Analysis (Durum Analizi) Tarot Açılımı Konfigürasyonu
 * 7 kartlık durum analizi açılımı
 */

export interface TarotCardPosition {
  id: number;
  className: string;
  title: string;
  desc: string;
  description: string;
}

export interface PositionLayout {
  id: number;
  className: string;
}

// 7 kartlık durum analizi pozisyon bilgileri
export const SITUATION_ANALYSIS_POSITIONS_INFO: TarotCardPosition[] = [
  {
    id: 1,
    className: 'situation-past',
    title: 'Geçmiş ya da Sebepler',
    desc: 'Yaşanan durumun sebepleri, neden şu anda böyle bir durumun yaşandığı ve yapılan tüm hatalar bu kartta belirtilir. Geçmişin değiştirilemez olduğu vurgulanır.',
    description: 'Yaşanan durumun sebepleri, neden şu anda böyle bir durumun yaşandığı ve yapılan tüm hatalar bu kartta belirtilir. Geçmişin değiştirilemez olduğu vurgulanır.'
  },
  {
    id: 2,
    className: 'situation-present',
    title: 'Şu Anki Durum',
    desc: 'Şu anda neler yaşandığı, gündemdeki konular ve geçmişin bugüne göre nasıl bir etkisi olduğu belirtilir.',
    description: 'Şu anda neler yaşandığı, gündemdeki konular ve geçmişin bugüne göre nasıl bir etkisi olduğu belirtilir.'
  },
  {
    id: 3,
    className: 'situation-hidden',
    title: 'Gizli Etkenler',
    desc: 'Kişinin bilgisi dışında gelişen olaylar, arkasından konuşanlar, gizli işler ve bilinmeyen gerçekler bu kartta gizlidir.',
    description: 'Kişinin bilgisi dışında gelişen olaylar, arkasından konuşanlar, gizli işler ve bilinmeyen gerçekler bu kartta gizlidir.'
  },
  {
    id: 4,
    className: 'situation-center',
    title: 'Merkez Kart',
    desc: 'Açılımın merkezini temsil eder. Durumun merkezindeki kişiyi veya hayatınızdaki en merkezi alanı ifade eder.',
    description: 'Açılımın merkezini temsil eder. Durumun merkezindeki kişiyi veya hayatınızdaki en merkezi alanı ifade eder.'
  },
  {
    id: 5,
    className: 'situation-external',
    title: 'Dış Etkenler',
    desc: 'Farklı kaynaklardan gelecek bilgiler ve geleceğe dair açılar sunar. Dış saldırılar ve olası entrikalara da işaret edebilir.',
    description: 'Farklı kaynaklardan gelecek bilgiler ve geleceğe dair açılar sunar. Dış saldırılar ve olası entrikalara da işaret edebilir.'
  },
  {
    id: 6,
    className: 'situation-advice',
    title: 'Tavsiye',
    desc: 'Yaşanan durumla ilgili en uygun hareketlerin ne olduğu hakkında bilgi verir. Çözüm veya çıkış yolu sunabileceği belirtilir.',
    description: 'Yaşanan durumla ilgili en uygun hareketlerin ne olduğu hakkında bilgi verir. Çözüm veya çıkış yolu sunabileceği belirtilir.'
  },
  {
    id: 7,
    className: 'situation-outcome',
    title: 'Olası Gelecek - Sonuç',
    desc: 'Mevcut gidişatın nereye varacağını, olası engelleri veya sürprizleri gösterir. Geleceğin, alınacak kararlara bağlı olarak değişebileceği belirtilir.',
    description: 'Mevcut gidişatın nereye varacağını, olası engelleri veya sürprizleri gösterir. Geleceğin, alınacak kararlara bağlı olarak değişebileceği belirtilir.'
  }
];

// 1–7 yayılımı: Solda dikey 1-2-3, sağda 5-6-7, tepede 4 (biraz üst üste gelir)
export const SITUATION_ANALYSIS_POSITIONS_LAYOUT: readonly PositionLayout[] = [
    { id: 1, className: 'absolute top-[86%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10' }, // Geçmiş
    { id: 2, className: 'absolute top-[61%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Şimdi (1 ve 3 ile hafif overlap)
    { id: 3, className: 'absolute top-[36%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10' }, // Gelecek
  
    { id: 4, className: 'absolute top-[18%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30' }, // Tavsiye (üstte, 3’ün üstüne biner)
  
    { id: 5, className: 'absolute top-[36%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Etkiler
    { id: 6, className: 'absolute top-[61%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Engeller
    { id: 7, className: 'absolute top-[86%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20' }, // Sonuç
  ] as const;

// Kart sayısı
export const SITUATION_ANALYSIS_CARD_COUNT = 7;
