/*
info:
Bağlantılı dosyalar:
- lib/tarot/a-tarot-helpers.ts: Tarot kartı tipi ve temel kart verileri için (gerekli)
- components/common/CardDetails.tsx: Bu modalın özelleştirilmiş içeriğini sağlayan üst seviye bileşen (gerekli, ana kullanım noktası)
- components/specific/tarot/(ör. 3cardtarot, hermit, Love-Spread, CareerTarot): Kart detaylarını göstermek için CardDetails üzerinden dolaylı olarak kullanılır (gerekli)

Dosyanın amacı:
- Tüm tarot açılımları için ortak, mobil uyumlu, temalı ve yeniden kullanılabilir bir kart detay modalı sunmak. Kart görseli, başlık, pozisyon ve özel içerik alanı ile esnek yapı sağlar. Farklı açılım türleri için özelleştirilebilir.

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece görsel arayüz ve modal yönetimi sağlar.

Geliştirme ve öneriler:
- Modal temaları sade ve iyi ayrılmış, yeni tema eklemek kolay.
- renderCardImage ve renderContent prop'ları ile üst bileşenlerden tam özelleştirme sağlanıyor, bu iyi bir pratik.
- Modal dışına tıklayınca kapanma ve kapatma butonu erişilebilirlik açısından doğru uygulanmış.
- maxWidth ve tema gibi görsel parametreler prop ile kontrol edilebiliyor, esnek ve yeniden kullanılabilir.
- Dosya başında açıklama mevcut, ancak info bloğu ile daha bütüncül analiz sağlandı.

Hatalar / Geliştirmeye Açık Noktalar:
- title prop'u kullanılmasına rağmen modalda başlık olarak doğrudan kullanılmıyor, sadece kart adı gösteriliyor. Gerekirse title da ekranda gösterilebilir.
- renderCardImage ve renderContent zorunlu prop'lar gibi, ancak default bir fallback daha açıklayıcı olabilir.
- Modal animasyonları ve erişilebilirlik için ek ARIA özellikleri eklenebilir (ör. role="dialog", aria-modal, focus trap).
- onClose fonksiyonu hem overlay'e hem kapatma butonuna bağlı, ancak ESC tuşu ile kapatma desteği eklenebilir.
- Gereksiz tekrar veya karmaşık kod yok, kod sade ve okunabilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve prop isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Tema ve boyutlar nesne olarak tanımlanmış, tekrar yok. renderContent ile gereksiz render engellenmiş.
- Yeniden Kullanılabilirlik: Farklı açılım türleri ve kart tipleri için kolayca kullanılabilir, üst bileşenler içerik ve görseli özelleştirebilir.
- Güvenlik: Sadece görsel arayüz, dışarıdan gelen fonksiyonlar ve veriler üst bileşenlerden gelmeli. XSS riski yok, ancak img src ve alt değerleri üstten geliyorsa sanitize edilmeli.

Gereklilik ve Kullanım Durumu:
- BaseCardDetails: Gerekli, tüm tarot açılımlarında ortak modal altyapısı olarak kullanılmalı.
- renderCardImage ve renderContent: Gerekli, üst bileşenler tarafından özelleştirilerek kullanılmalı.
- title, maxWidth, theme, positionInfo: Gerekli/opsiyonel, açılım türüne göre kullanılabilir.
- spreadType: Şu an sadece prop olarak var, içeride kullanılmıyor; ileride temaya göre davranış eklenebilir.
- Silinebilir veya gereksiz kod yoktur, sade ve amacına uygun bir altyapı bileşenidir.
*/

'use client';

import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';
import { ReactElement } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export interface BaseCardDetailsProps {
  card: TarotCard | null;
  isReversed: boolean;
  position: number | null;
  onClose: () => void;
  renderCardImage?: (_card: TarotCard, _isReversed: boolean) => ReactElement;
  renderContent: (
    _card: TarotCard,
    _isReversed: boolean,
    _position: number | null
  ) => ReactElement;
  theme?: 'default' | 'amber' | 'pink' | 'purple' | 'blue';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  positionInfo?:
    | {
        title: string;
        desc: string;
      }
    | undefined;
}

export default function BaseCardDetails({
  card,
  isReversed,
  position,
  onClose,
  renderCardImage,
  renderContent,
  theme = 'default',
  maxWidth = 'lg',
  positionInfo: _positionInfo,
}: BaseCardDetailsProps) {
  const focusTrapRef = useFocusTrap(true);

  if (!card) {
    return null;
  }

  // Tema renk şemalarını tanımla
  const themes = {
    default: {
      overlay: 'bg-black/80 backdrop-blur-[2px]',
      container:
        'bg-gradient-to-br from-slate-900 via-gray-900/80 to-zinc-900 border-amber-500/30',
      closeButton: 'text-gray-400 hover:text-white',
      title: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300',
    },
    amber: {
      overlay: 'bg-black/70 backdrop-blur-sm',
      container:
        'bg-gradient-to-br from-slate-900 via-gray-900/80 to-zinc-900 border-amber-700/80',
      closeButton: 'text-amber-300 hover:text-white',
      title: 'text-amber-200',
      badge: 'bg-amber-500/20 text-amber-300',
    },
    pink: {
      overlay: 'bg-black/70 backdrop-blur-sm',
      container:
        'bg-gradient-to-br from-pink-900 via-red-900/80 to-purple-900 border-pink-700/80',
      closeButton: 'text-pink-300 hover:text-white',
      title: 'text-pink-200',
      badge: 'bg-pink-500/20 text-pink-300',
    },
    purple: {
      overlay: 'bg-black/80 backdrop-blur-[2px]',
      container:
        'bg-gradient-to-br from-slate-900 via-purple-900/80 to-zinc-900 border-purple-500/30',
      closeButton: 'text-gray-400 hover:text-white',
      title: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-300',
    },
    blue: {
      overlay: 'bg-black/70 backdrop-blur-sm',
      container:
        'bg-gradient-to-br from-blue-900 via-slate-900/80 to-indigo-900 border-blue-700/80',
      closeButton: 'text-blue-300 hover:text-white',
      title: 'text-blue-200',
      badge: 'bg-blue-500/20 text-blue-300',
    },
  };

  const currentTheme = themes[theme];

  // Max width sınıflarını tanımla
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div
      className={`fixed inset-0 ${currentTheme.overlay} flex items-center justify-center z-50 p-4 animate-fade-in`}
      onClick={onClose}
    >
      <div
        ref={focusTrapRef}
        className={`${currentTheme.container} rounded-3xl p-6 md:p-8 ${maxWidthClasses[maxWidth]} w-full border shadow-2xl relative max-h-[90vh] overflow-y-auto animate-slide-in-up`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${currentTheme.closeButton} transition-colors text-2xl font-bold z-10`}
          aria-label='Kapat'
          data-close-modal
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* İçerik Area - Responsive Layout */}
        <div
          className={`flex flex-col ${maxWidth === '2xl' ? 'md:flex-row' : ''} gap-6 md:gap-8`}
        >
          {/* Kart Görseli ve Temel Bilgiler */}
          <div
            className={`flex-shrink-0 text-center ${maxWidth === '2xl' ? 'md:w-1/3' : ''}`}
          >
            {/* Kart Başlığı */}
            <h3
              className={`${currentTheme.title} font-bold text-xl text-center mt-4`}
            >
              {card.nameTr}
            </h3>

            {/* İngilizce İsim */}
            <p className='text-gray-400 text-sm mt-1'>{card.name}</p>
            {/* Kart Görseli */}
            {renderCardImage ? (
              renderCardImage(card, isReversed)
            ) : (
              <img
                src={card.image || '/cards/CardBack (1).jpg'}
                alt={card.nameTr}
                className={`w-32 h-48 mx-auto rounded-lg border-2 border-current/30 shadow-lg object-cover ${isReversed ? 'transform rotate-180' : ''}`}
              />
            )}

            {/* Yönelim Durumu (pozisyon olmadan) */}
            {!position && (
              <p
                className={`mt-2 text-sm font-semibold ${isReversed ? 'text-red-400' : 'text-green-400'}`}
              >
                ({isReversed ? 'Ters' : 'Düz'})
              </p>
            )}
          </div>

          {/* Detay İçeriği */}
          <div className={`${maxWidth === '2xl' ? 'flex-1' : 'w-full'}`}>
            {renderContent(card, isReversed, position)}
          </div>
        </div>
      </div>
    </div>
  );
}
