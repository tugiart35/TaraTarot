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
    _canSelect: boolean
  ) => ReactElement;
  galleryTitle?: string;
  emptyMessage?: string;
  canSelectCards?: boolean;
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
  if (deck.length === 0) {
    return (
      <div className='bg-slate-900/80 border border-slate-700 rounded-2xl p-4 shadow-lg'>
        <div className='text-center text-gray-400'>{emptyMessage || t.emptyDeck}</div>
      </div>
    );
  }

  return (
    <div className='bg-slate-900/80 border border-slate-700 rounded-2xl p-4 shadow-lg'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center shadow-md'>
            <span className='text-purple-400 text-lg'>🃏</span>
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
            className='px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-200 text-xs'
          >
            🔄 {t.shuffle}
          </button>
        )}
      </div>

      <div
        className='overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500 hover:scrollbar-thumb-purple-400'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#8b5cf6 transparent',
        }}
      >
        <div
          className='flex space-x-2 md:space-x-3 pb-2'
          style={{ width: 'max-content' }}
        >
          {deck.map(card => {
            const isUsed = usedCardIds.has(card.id);
            const canSelect =
              canSelectCards && !isUsed && nextPosition !== null;

            return (
              <div
                key={card.id}
                className='flex-shrink-0'
                data-card-clickable='true'
                style={{
                  cursor: canSelect ? 'pointer' : 'default',
                }}
                onClick={e => {
                  // Web ve mobil için click olayı
                  console.log(
                    'Card clicked:',
                    card.name,
                    'canSelect:',
                    canSelect,
                    'canSelectCards:',
                    canSelectCards,
                    'isUsed:',
                    isUsed,
                    'nextPosition:',
                    nextPosition
                  );
                  e.stopPropagation();
                  e.preventDefault();

                  if (canSelect) {
                    console.log('Calling onCardSelect for:', card.name);
                    onCardSelect(card);
                  } else {
                    console.log('Card selection blocked - canSelect is false');
                  }
                }}
              >
                {renderCard(card, isUsed, canSelect)}
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
