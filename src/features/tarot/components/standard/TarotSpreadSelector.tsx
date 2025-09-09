/*
info:
Bağlantılı dosyalar:
- @/constants/tarotSpreads: Tarot açılım türlerinin merkezi tanımları (gerekli)
- @/app/(main)/a-tarot/page.tsx: Ana tarot sayfası, bu bileşeni kullanır (gerekli)

Dosyanın amacı:
- Kullanıcıya farklı tarot açılım türleri arasında seçim yapma imkanı sunar
- Yatay kaydırmalı butonlar ile modern ve mobil uyumlu tasarım
- Seçilen açılım türünü parent bileşene bildirir

Geliştirme ve öneriler:
- Mobil öncelikli tasarım, yatay kaydırma ile kullanıcı deneyimi optimize edilmiş
- Glassmorphism efekti ile modern görünüm
- Hover ve aktif durumlar için smooth geçişler
- Responsive tasarım, farklı ekran boyutlarına uyumlu

Hatalar ve potansiyel sorunlar:
- Şu anda herhangi bir hata tespit edilmedi
- Kod temiz ve güvenli, kullanıcı girdisi yok

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Kod okunabilir ve modüler
- TypeScript ile tip güvenliği sağlanmış
- Tailwind CSS ile responsive ve modern tasarım
- Güvenlik açısından risk yok, sadece UI bileşeni

Kullanım durumu:
- TarotSpreadSelector: Gerekli, ana tarot sayfasında kullanılır
- TarotSpread interface: Gerekli, tip güvenliği için
- onSpreadSelect callback: Gerekli, parent bileşenle iletişim için
*/

'use client';

import { TarotSpread } from '@/lib/constants/tarotSpreads';

interface TarotSpreadSelectorProps {
  spreads: TarotSpread[];
  selectedSpread: string;
  onSpreadSelect: (spreadId: string) => void;
}

export default function TarotSpreadSelector({
  spreads,
  selectedSpread,
  onSpreadSelect,
}: TarotSpreadSelectorProps) {
  return (
    <div className='mb-8'>
      <div className='mb-6 text-center'>
        <div className='text-4xl mb-2 opacity-60'>🔮</div>
        <h2 className='text-xl font-light text-slate-300 mb-1'>
          Kaderinizi Keşfedin
        </h2>
        <div className='w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto'></div>
      </div>

      <div className='flex justify-center gap-6'>
        {spreads.map(spread => (
          <button
            key={spread.id}
            onClick={() => onSpreadSelect(spread.id)}
            className={`
              group relative w-20 h-20 rounded-full border transition-all duration-500
              ${
                selectedSpread === spread.id
                  ? 'border-purple-400 bg-purple-400/10 shadow-lg shadow-purple-400/20 scale-110'
                  : 'border-slate-600 bg-slate-900/30 hover:border-purple-500/50 hover:bg-purple-500/5 hover:scale-105'
              }
            `}
          >
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='relative flex flex-col items-center justify-center h-full'>
              <div className='text-2xl mb-1 opacity-80'>{spread.icon}</div>
              <div className='text-xs text-slate-400 font-light'>
                {spread.cardCount}
              </div>
            </div>

            {/* Tooltip */}
            <div className='absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
              <div className='bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-3 py-2 text-xs text-slate-200 whitespace-nowrap'>
                {spread.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedSpread && (
        <div className='mt-4 text-center'>
          <div className='text-sm text-purple-300 font-light'>
            {spreads.find(s => s.id === selectedSpread)?.name}
          </div>
        </div>
      )}
    </div>
  );
}
