/*
info:
Bağlantılı dosyalar:
- @/lib/tarot/a-tarot-helpers: TarotCard tipini almak için (gerekli)

Dosyanın amacı:
- Kullanıcının son yaptığı tarot okumasının özetini gösterir. Kart isimleri ve sayısı ile birlikte, ilgili açılım türüne göre kompakt bir özet sunar. Mobil ve sade arayüzde, kullanıcıya hızlı bilgi verir.

Backend bağlantısı:
- Bu dosyada doğrudan backend ile ilgili bir değişken veya tablo kullanılmıyor. Son okuma verisi üst bileşenden props ile geliyor. Eğer backend'den veri çekiliyorsa, bu üst katmanda gerçekleşiyor.

Geliştirme ve öneriler:
- Linter uyarısı: map fonksiyonunda 'index' parametresi kullanılmıyor, '_' ile işaretlenmeli veya kaldırılmalı.
- Bileşen sade ve okunabilir, prop açıklamaları yeterli.
- Son okuma ve açılım türü kontrolü doğru yapılmış.
- Kart sayısı ve isimleri sade şekilde gösteriliyor, erişilebilirlik için kart isimleri daha uzun gösterilebilir.
- Yorum satırı olarak üstte kısa açıklama var, daha detaylı info bloğu eklendi.

Hatalar ve açık noktalar:
- Kullanılmayan 'index' parametresi var (linter uyarısı).
- Kart ismi çok uzun olursa 'truncate' ile kesiliyor, UX açısından tam isim tooltip ile gösterilebilir.
- Güvenlik açığı yok, veri sadece gösterim amaçlı.

Okunabilirlik, optimizasyon, yeniden kullanılabilirlik ve güvenlik:
- Kod okunabilir ve fonksiyonel, gereksiz tekrar yok.
- Bileşen başka tarot açılımları için de kolayca uyarlanabilir.
- Mobil uyumlu ve sade tasarım korunmuş.
- Güvenlik açısından risk yok, sadece gösterim.

Gereklilik ve Kullanım Durumu:
- TarotCard tipi: Gerekli ve doğru kullanılmış.
- lastReading, currentSpreadId prop'ları: Gerekli ve işlevsel.
- 'index' parametresi: Gereksiz, '_' ile işaretlenmeli veya kaldırılmalı.
- Bileşenin tamamı: Gerekli, sade ve amacına uygun.

Özetle: Dosya amacına uygun, sade ve okunabilir. Linter uyarısı dışında önemli bir hata yok. backend ile doğrudan ilişkisi yok, veri üstten geliyor. Kodun yeniden kullanılabilirliği ve güvenliği yüksek.
*/

'use client';

import { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';

interface LastReadingSummaryProps {
  lastReading: {
    cards: TarotCard[];
    interpretation: string;
    spreadId: string;
  } | null;
  currentSpreadId: string;
}

export default function LastReadingSummary({
  lastReading,
  currentSpreadId,
}: LastReadingSummaryProps) {
  // Eğer son okuma yoksa veya farklı bir açılım türündeyse gösterme
  if (!lastReading || lastReading.spreadId !== currentSpreadId) {
    return null;
  }

  return (
    <div className='mb-8'>
      <div className='bg-slate-800/30 border border-slate-600 rounded-xl p-4'>
        <div className='flex items-center space-x-3 mb-3'>
          <div className='w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center'>
            <span className='text-amber-400 text-sm'>📜</span>
          </div>
          <div>
            <p className='text-amber-400 font-medium text-sm'>Son Okuma</p>
            <p className='text-gray-400 text-xs'>
              {lastReading.cards.length} kart çekildi
            </p>
          </div>
        </div>
        <div className='flex space-x-2'>
          {lastReading.cards.map(card => (
            <div key={card.id} className='text-center'>
              <div className='w-8 h-10 bg-amber-500/20 border border-amber-500/40 rounded text-xs flex items-center justify-center mb-1'>
                🃏
              </div>
              <p className='text-amber-400 text-xs truncate w-8'>
                {card.nameTr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
