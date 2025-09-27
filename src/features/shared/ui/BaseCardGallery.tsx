/*
info:
Bağlantılı dosyalar:
- lib/tarot/a-tarot-helpers.ts: Tarot kartı tipi ve temel kart verileri için (gerekli)
- components/specific/tarot/3cardtarot/CardGallery.tsx: 3 kart açılımı için özel galeri (gerekli, BaseCardGallery'yi özelleştirerek kullanır)
- components/specific/tarot/hermit/CardGallery.tsx: Hermit açılımı için özel galeri (gerekli, BaseCardGallery'yi özelleştirerek kullanır)
- components/specific/tarot/Love-Spread/CardGallery.tsx: Aşk açılımı için özel galeri (gerekli, BaseCardGallery'yi özelleştirerek kullanır)
- components/specific/tarot/CareerTarot/CardGallery.tsx: Kariyer açılımı için özel galeri (gerekli, BaseCardGallery'yi özelleştirerek kullanır)
- Bu dosya, tarot açılımlarında kart seçimi için temel galeri altyapısı olarak kullanılır.

Dosyanın amacı:
- Tüm tarot açılımları için ortak, mobil uyumlu, yatay kaydırılabilir ve yeniden kullanılabilir bir kart galeri bileşeni sunmak. Kartların seçilebilirliğini, kullanılma durumunu ve özel render fonksiyonunu üst bileşenden alır.

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece görsel arayüz ve kart seçimi yönetimi sağlar.

Geliştirme ve öneriler:
- renderCard prop'u ile üst bileşenlerden tam özelleştirme sağlanıyor, bu iyi bir pratik.
- onShuffleDeck opsiyonel olarak eklenmiş, kart karıştırma işlevi için esnek yapı sunuyor.
- galleryTitle ve emptyMessage ile farklı açılımlar için kolayca özelleştirilebilir.
- Mobil öncelikli ve dokunmatik dostu tasarım uygulanmış.
- Kod sade, tekrar yok ve prop isimleri açık.
- Kartlar için opacity ve cursor değişimi ile kullanılabilirlik net gösteriliyor.

Hatalar / Geliştirmeye Açık Noktalar:
- galleryTitle prop'u tanımlı ama içeride kullanılmıyor, başlık olarak ekranda gösterilebilir.
- renderCard fonksiyonu zorunlu, ancak default bir fallback eklenebilir.
- Erişilebilirlik için ek ARIA özellikleri (ör. role="list", role="button") eklenebilir.
- onCardSelect fonksiyonu, kart kullanılabilir değilse tıklanamaz; bu doğru ancak tıklama animasyonu veya feedback eklenebilir.
- Web click sorunu düzeltildi: onClick event'inde hem stopPropagation hem preventDefault kullanılıyor.
- Event çakışması önlendi: stopPropagation ile parent event'ler engelleniyor.
- Wheel scroll sorunu çözüldü: onWheel olayı kaldırıldı, modern tarayıcılarda yatay scroll zaten çalışıyor.
- Debug logları kaldırıldı: Production için temiz kod.
- Web ve mobil uyumluluk: Tek onClick event'i hem web hem mobil için çalışıyor.
- preventDefault eklendi: Tarayıcı varsayılan davranışlarını engellemek için.
- Kodda gereksiz tekrar veya karmaşık yapı yok.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve prop isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Kartlar map ile render ediliyor, gereksiz render yok.
- Yeniden Kullanılabilirlik: Farklı açılım türleri ve kart tipleri için kolayca kullanılabilir, üst bileşenler renderCard ile özelleştirebilir.
- Güvenlik: Sadece görsel arayüz, dışarıdan gelen fonksiyonlar ve veriler üst bileşenlerden gelmeli. XSS riski yok, ancak renderCard ile gelen içerik sanitize edilmeli.

Gereklilik ve Kullanım Durumu:
- BaseCardGallery: Gerekli, tüm tarot açılımlarında ortak galeri altyapısı olarak kullanılmalı.
- renderCard: Gerekli, üst bileşenler tarafından özelleştirilerek kullanılmalı.
- onShuffleDeck: Opsiyonel, karıştırma özelliği istenirse kullanılmalı.
- galleryTitle, emptyMessage: Opsiyonel, açılım türüne göre kullanılabilir.
- Silinebilir veya gereksiz kod yoktur, sade ve amacına uygun bir altyapı bileşenidir.
*/

'use client';

import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';
import { ReactElement } from 'react';

interface BaseCardGalleryProps {
  deck: TarotCard[];
  usedCardIds: Set<number>;
  nextPosition: number | null;
  onCardSelect: (_card: TarotCard) => void;
  onShuffleDeck?: () => void;
  renderCard: (
    _card: TarotCard,
    _isUsed: boolean,
    _canSelect: boolean,
    _isReversed?: boolean
  ) => ReactElement;
  galleryTitle?: string;
  emptyMessage?: string;
  canSelectCards?: boolean;
  theme?: 'pink' | 'blue' | 'purple' | 'green';
  translations?: {
    nextPosition: string;
    allPositionsFull: string;
    shuffle: string;
    scrollToSeeAll: string;
    emptyDeck: string;
  };
}

export default function BaseCardGallery({
  deck,
  usedCardIds,
  nextPosition,
  onCardSelect,
  onShuffleDeck,
  renderCard,
  galleryTitle: _galleryTitle,
  emptyMessage,
  canSelectCards = true,
  theme = 'purple',
  translations,
}: BaseCardGalleryProps) {
  // Varsayılan çeviriler (fallback)
  const defaultTranslations = {
    nextPosition: 'Sıradaki pozisyon:',
    allPositionsFull: 'Tüm pozisyonlar dolu',
    shuffle: 'Karıştır',
    scrollToSeeAll: 'Kaydırarak tüm kartları görün',
    emptyDeck: 'Kart destesi boş',
  };

  const t = translations || defaultTranslations;

  // Theme'e göre renkleri belirle
  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'pink':
        return {
          icon: 'text-pink-400',
          iconBg: 'bg-pink-500/20',
          border: 'border-pink-500/50',
          button:
            'bg-pink-500/20 border-pink-500/50 text-pink-400 hover:bg-pink-500/30',
          scrollbar: 'scrollbar-thumb-pink-500 hover:scrollbar-thumb-pink-400',
          scrollbarColor: '#ec4899 transparent',
        };
      case 'blue':
        return {
          icon: 'text-blue-400',
          iconBg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          button:
            'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30',
          scrollbar: 'scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-400',
          scrollbarColor: '#3b82f6 transparent',
        };
      case 'green':
        return {
          icon: 'text-green-400',
          iconBg: 'bg-green-500/20',
          border: 'border-green-500/50',
          button:
            'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30',
          scrollbar:
            'scrollbar-thumb-green-500 hover:scrollbar-thumb-green-400',
          scrollbarColor: '#10b981 transparent',
        };
      default: // purple
        return {
          icon: 'text-purple-400',
          iconBg: 'bg-purple-500/20',
          border: 'border-purple-500/50',
          button:
            'bg-purple-500/20 border-purple-500/50 text-purple-400 hover:bg-purple-500/30',
          scrollbar:
            'scrollbar-thumb-purple-500 hover:scrollbar-thumb-purple-400',
          scrollbarColor: '#8b5cf6 transparent',
        };
    }
  };

  const colors = getThemeColors(theme);

  if (deck.length === 0) {
    return (
      <div
        className={`bg-slate-900/80 border ${colors.border} rounded-2xl p-4 shadow-lg`}
      >
        <div className='text-center text-gray-400'>
          {emptyMessage || t.emptyDeck}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-900/80 border ${colors.border} rounded-2xl p-4 shadow-lg`}
    >
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div
            className={`w-8 h-8 ${colors.iconBg} rounded-full flex items-center justify-center shadow-md`}
          >
            <span className={`${colors.icon} text-lg`}>🃏</span>
          </div>
          <div>
            <p className='text-gray-400 text-xs'>
              {nextPosition
                ? `${t.nextPosition} ${nextPosition}`
                : t.allPositionsFull}
            </p>
          </div>
        </div>

        {/* Karıştırma Butonu */}
        {onShuffleDeck && (
          <button
            onClick={onShuffleDeck}
            className={`px-3 py-1 ${colors.button} transition-all duration-200 text-xs`}
          >
            🔄 {t.shuffle}
          </button>
        )}
      </div>

      <div
        className={`horizontal-scroll mobile-scroll touch-scroll pb-2 ${colors.scrollbar}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: colors.scrollbarColor,
        }}
      >
        <div
          className='flex space-x-2 md:space-x-3 pb-2 scroll-snap-x'
          style={{ width: 'max-content' }}
        >
          {deck.map(card => {
            const isUsed = usedCardIds.has(card.id);
            const canSelect =
              canSelectCards && !isUsed && nextPosition !== null;

            return (
              <div
                key={card.id}
                className='flex-shrink-0 scroll-snap-start'
                data-card-clickable='true'
                style={{
                  cursor: canSelect ? 'pointer' : 'default',
                }}
                onClick={e => {
                  // Web ve mobil için click olayı
                  e.stopPropagation();
                  e.preventDefault();

                  if (canSelect) {
                    onCardSelect(card);
                  }
                }}
              >
                {renderCard(card, isUsed, canSelect, false)}
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex justify-center mt-2'>
        <div className='text-gray-500 text-xs flex items-center space-x-1'>
          <span>⟵</span>
          <span>{t.scrollToSeeAll}</span>
          <span>⟶</span>
        </div>
      </div>
    </div>
  );
}
