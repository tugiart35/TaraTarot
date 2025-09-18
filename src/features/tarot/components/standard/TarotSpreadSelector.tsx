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
import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';

interface TarotSpreadSelectorProps {
  spreads: TarotSpread[];
  selectedSpread: string;
  onSpreadSelect: (_spreadId: string) => void;
  showDescription?: boolean; // Açıklama gösterilsin mi?
}

export default function TarotSpreadSelector({
  spreads,
  selectedSpread,
  onSpreadSelect,
  showDescription = true, // Varsayılan olarak açıklama göster
}: TarotSpreadSelectorProps) {
  const { t } = useTranslations();
  const [showAllPositions, setShowAllPositions] = useState(false);
  return (
    <div className='mb-8'>
      {/* Enhanced Tab Navigation */}
      <div className='mb-1'>
        {/* Desktop Tab Navigation */}
        <div className='hidden md:flex flex-wrap gap-3 justify-center'>
          {spreads.map(spread => (
            <button
              key={spread.id}
              onClick={() => onSpreadSelect(spread.id)}
              className={`group relative flex items-center gap-3 px-4 py-2 rounded-2xl font-medium transition-all duration-500 transform hover:scale-105 ${
                selectedSpread === spread.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-lg'
              }`}
            >
              <span className='text-xl transition-transform duration-300 group-hover:scale-110'>
                {spread.icon}
              </span>
              <span className='text-sm font-semibold'>{t(spread.name)}</span>
              <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>
                {spread.cardCount}
              </span>
              {selectedSpread === spread.id && (
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-50 -z-10'></div>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Tab Navigation - Horizontal Scroll */}
        <div className='md:hidden'>
          {/* Scroll indicator - shows there are more items */}
          {spreads.length > 2 && (
            <div className='flex justify-center mb-3'>
              <div className='flex items-center gap-2 text-gray-400 text-xs'>
                <span>{t('tarotSpreadSelector.scrollHint')}</span>
                <div className='flex gap-1'>
                  <div className='w-1 h-1 bg-purple-400 rounded-full animate-pulse'></div>
                  <div
                    className='w-1 h-1 bg-purple-400 rounded-full animate-pulse'
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className='w-1 h-1 bg-purple-400 rounded-full animate-pulse'
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className='relative'>
            {/* Fade effect on right edge to indicate scrollable content */}
            {spreads.length > 2 && (
              <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none'></div>
            )}

            <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth'>
              {spreads.map(spread => (
                <button
                  key={spread.id}
                  onClick={() => onSpreadSelect(spread.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedSpread === spread.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <span className='text-lg'>{spread.icon}</span>
                  <span className='text-sm whitespace-nowrap'>
                    {t(spread.name)}
                  </span>
                  <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>
                    {spread.cardCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Scroll dots indicator */}
            {spreads.length > 2 && (
              <div className='flex justify-center mt-3 gap-1'>
                {Array.from(
                  { length: Math.ceil(spreads.length / 2) },
                  (_, i) => (
                    <div
                      key={i}
                      className='w-2 h-2 rounded-full bg-gray-600 opacity-50'
                    ></div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Selected Spread Info */}
      {selectedSpread && showDescription && (
        <div className='text-center'>
          <br />

          {/* Açılım Açıklaması */}
          <div className='max-w-4xl mx-auto mb-6'>
            <div className='bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6'>
              <h3 className='text-lg font-semibold text-purple-300 mb-3 flex items-center justify-center gap-2'>
                <span className='text-2xl'>🔮</span>
                {t('tarotSpreadSelector.spreadMeaning')}
              </h3>
              <p className='text-gray-200 leading-relaxed text-base'>
                {t(
                  spreads.find(s => s.id === selectedSpread)?.description || ''
                )}
              </p>

              {/* Açılım Pozisyonları */}
              <div className='mt-4 pt-4 border-t border-purple-500/20'>
                <h4 className='text-sm font-medium text-purple-300 mb-3'>
                  📋 {t('tarotSpreadSelector.spreadPositions')}
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
                  {spreads
                    .find(s => s.id === selectedSpread)
                    ?.positions.slice(0, showAllPositions ? undefined : 4)
                    .map((position, index) => (
                      <div
                        key={position.id}
                        className='flex items-start gap-2 text-gray-300'
                      >
                        <span className='text-purple-400 font-medium min-w-[20px]'>
                          {index + 1}.
                        </span>
                        <span className='text-xs'>{t(position.title)}</span>
                      </div>
                    ))}
                  {spreads.find(s => s.id === selectedSpread)?.positions
                    .length &&
                    spreads.find(s => s.id === selectedSpread)!.positions
                      .length > 4 && (
                      <button
                        onClick={() => setShowAllPositions(!showAllPositions)}
                        className='text-xs text-purple-400 hover:text-purple-300 col-span-full text-center mt-2 transition-colors duration-200 cursor-pointer underline decoration-dotted underline-offset-2'
                      >
                        {showAllPositions
                          ? t('tarotSpreadSelector.showLess')
                          : `+${
                              spreads.find(s => s.id === selectedSpread)!
                                .positions.length - 4
                            } ${t('tarotSpreadSelector.morePositions')}`}
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
