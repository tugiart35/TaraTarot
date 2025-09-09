// app/[locale]/(main)/a-tarot/page.tsx
/*
  Ana Tarot Sayfası - Mobil Uyumlu Tarot Okuma Merkezi
  Bu sayfa projenin tarot okuma sisteminin ana kontrol noktasıdır.
  Farklı tarot açılım türlerini dinamik olarak yükler ve yönetir.
  Kullanıcılar buradan açılım seçimi yapabilir, okuma gerçekleştirebilir 
  ve sonuçlarını görüntüleyebilir.
  
  Özellikler:
  - Dinamik açılım yükleme sistemi
  - Son okuma özeti gösterimi  
  - Mobil uyumlu tasarım
  - Modüler bileşen yapısı
  - i18n desteği (TR, EN, SR)
*/
/*
info:
Bağlantılı dosyalar:
- components/layout/BottomNavigation.tsx: Alt kısımda sabit, mobil uyumlu navigasyon çubuğu sağlar. Kullanıcı oturumuna göre dinamik menü gösterir.
- constants/tarotSpreads.ts: Tüm tarot açılım türlerinin merkezi ve dinamik tanımlarını içerir. Her açılımın bileşenini, pozisyonlarını ve meta bilgisini tutar.
- components/specific/tarot/standard/TarotSpreadSelector.tsx: Kullanıcıya tarot açılım türlerini seçtiren, yatay kaydırmalı butonlar sunan bileşen.
- components/specific/tarot/standard/LastReadingSummary.tsx: Kullanıcının son tarot okumasının özetini gösteren bileşen.
- lib/tarot/full-tarot-deck.ts: Tarot kartlarının tipini (`TarotCard`) ve tam kart listesini içerir.

Dosyanın amacı:
- Ana tarot okuma sayfası olarak görev yapar. Kullanıcıya farklı tarot açılım türleri arasında seçim yapma, seçilen açılımı dinamik olarak yükleme ve okuma işlemini tamamlama imkanı sunar. Son yapılan okumanın özetini de gösterir. Tamamen mobil uyumlu ve modülerdir.

Geliştirme ve öneriler:
- Fonksiyonlar sade ve okunabilir, ancak bazı işlevler (ör. handleReadingComplete, handleSpreadSelect) küçük yardımcı fonksiyonlara bölünebilir.
- `selectedPositionTitle` sadece pozisyon başlığı için tutuluyor, ileride pozisyon objesi olarak genişletilebilir.
- `console.log` satırı gereksiz, kaldırılabilir.
- Bileşenlerin prop tipleri ve açıklamaları yeterli, ancak ana sayfa fonksiyonunun başına kısa bir Türkçe açıklama eklenebilir.
- Backend entegrasyonu için uygun noktalar yorumla işaretlenebilir (ör: okuma kaydı, kullanıcı geçmişi).

Hatalar ve potansiyel sorunlar:
- `console.log('Current position:', selectedPositionTitle);` satırı gereksiz ve prod ortamda bırakılmamalı.
- `handlePositionChange` fonksiyonunda parametre tipi `any` olarak tanımlanmış, daha tipli yapılabilir.
- `CurrentComponent` null ise hiçbir şey render edilmiyor, kullanıcıya "Yakında" veya "Seçim yapın" gibi bir mesaj gösterilebilir.
- Güvenlik açısından kullanıcıdan alınan veri yok, ancak ileride form veya giriş alanı eklenirse XSS/CSRF için önlem alınmalı.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Kod okunabilir ve modüler, bileşenler ayrık ve tekrar kullanılabilir şekilde tasarlanmış.
- Mobil öncelikli ve sade bir yapı var, Tailwind ile responsive tasarım sağlanmış.
- Dinamik bileşen yükleme ve spread yönetimi iyi uygulanmış.
- Güvenlik açısından şimdilik risk yok, ancak ileride kullanıcı girdisi eklenirse dikkat edilmeli.
- Gereksiz tekrar veya karmaşık bloklar yok, kod sade.

Kodda tekrar, gereksiz satır, eksik açıklama, potansiyel hata veya kötü pratikler:
- `console.log` satırı gereksiz.
- `handlePositionChange` fonksiyonunda tip eksikliği var.
- Ana fonksiyonun başında kısa bir Türkçe açıklama eklenebilir.
- `CurrentComponent` null olduğunda kullanıcıya bilgi verilmiyor.

Yapılan veya önerilen geliştirmeler:
- Kullanıcı deneyimini artırmak için açılım seçilmediğinde veya açılım bileşeni yoksa bilgilendirici bir mesaj eklenebilir.
- Fonksiyonel bileşenlerin başına kısa Türkçe açıklamalar eklenmeli.
- Gereksiz `console.log` kaldırılmalı.
- Parametre tipleri daha kesin tanımlanmalı.
- Backend entegrasyon noktaları yorumla işaretlenmeli.

*/
'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/features/shared/layout';
import { TarotCard } from '@/features/tarot/lib/full-tarot-deck';
import { tarotSpreads } from '@/lib/constants/tarotSpreads';
import {
  TarotSpreadSelector,
  LastReadingSummary,
} from '@/features/tarot/components';

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState('love-spread');
  const [lastReading, setLastReading] = useState<{
    cards: TarotCard[];
    interpretation: string;
    spreadId: string;
  } | null>(null);

  const currentSpread = tarotSpreads.find(s => s.id === selectedSpread);
  const CurrentComponent = currentSpread?.component;

  const handleReadingComplete = (
    cards: TarotCard[],
    interpretation: string
  ) => {
    setLastReading({
      cards,
      interpretation,
      spreadId: selectedSpread,
    });
  };

  const handleSpreadSelect = (spreadId: string) => {
    setSelectedSpread(spreadId);
    setLastReading(null);
  };

  return (
    <div className='flex flex-col min-h-screen pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <main className='flex-1 px-6 py-8'>
        <TarotSpreadSelector
          spreads={tarotSpreads}
          selectedSpread={selectedSpread}
          onSpreadSelect={handleSpreadSelect}
        />
        <div className='mb-8'>
          {CurrentComponent ? (
            <CurrentComponent onComplete={handleReadingComplete} />
          ) : null}
        </div>
        <LastReadingSummary
          lastReading={lastReading}
          currentSpreadId={selectedSpread}
        />
      </main>
      <BottomNavigation />
    </div>
  );
}
