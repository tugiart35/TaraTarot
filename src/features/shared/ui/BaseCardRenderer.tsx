/*
info:
Bağlantılı dosyalar:
- next/image: Next.js ile optimize görsel yönetimi için (gerekli)
- lib/tarot/a-tarot-helpers.ts: Tarot kartı tipi ve temel kart verileri için (gerekli)
- components/specific/tarot/3cardtarot/ThreeCardRenderer.tsx: 3 kart açılımı için özel kart renderı (gerekli, BaseCardRenderer'ı özelleştirerek kullanır)
- components/specific/tarot/hermit/CardRenderer.tsx: Hermit açılımı için özel kart renderı (gerekli, BaseCardRenderer'ı özelleştirerek kullanır)
- components/specific/tarot/Love-Spread/LoveCardRenderer.tsx: Aşk açılımı için özel kart renderı (gerekli, BaseCardRenderer'ı özelleştirerek kullanır)
- components/specific/tarot/CareerTarot/CareerCardRenderer.tsx: Kariyer açılımı için özel kart renderı (gerekli, BaseCardRenderer'ı özelleştirerek kullanır)
- components/common/BaseCardGallery.tsx ve BaseCardPosition.tsx: Kart galeri ve pozisyon bileşenlerinde kart görseli için kullanılır (gerekli)

Dosyanın amacı:
- Tüm tarot açılımları için ortak, mobil uyumlu, temalı ve yeniden kullanılabilir bir kart görselleştirme (render) altyapısı sunmak. Kartın farklı modlarda (galeri, pozisyon, detay) ve temalarda gösterimini sağlar. Kod tekrarını azaltır, bakım kolaylığı ve tutarlı tasarım sunar.

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece görsel arayüz ve kart render yönetimi sağlar.

Geliştirme ve öneriler:
- Tema ve boyut sistemleri sade ve genişletilebilir, yeni tema/boyut eklemek kolay.
- getSizeClasses, getStatusClasses gibi yardımcı fonksiyonlar ile kod okunabilirliği ve tekrar azaltılmış.
- Kart görseli, isim ve durum (ters/düz) gibi bilgiler prop ile kontrol ediliyor, esnek yapı sağlanmış.
- onClick, canSelect gibi event ve durum yönetimi iyi ayrılmış.
- Kodun başında açıklama mevcut, ancak info bloğu ile daha bütüncül analiz sağlandı.
- getCardText fonksiyonu ile uzun isimler kısaltılıyor, UX için iyi bir pratik.
- ARIA ve erişilebilirlik için ek özellikler (ör. role, aria-label) eklenebilir.
- Kart görseli için Next.js Image kullanımı performans ve optimizasyon açısından doğru.

Hatalar / Geliştirmeye Açık Noktalar:
- getImageSrc fonksiyonu, kart kapalıysa veya galeri modundaysa her zaman arka yüzü gösteriyor; bazı açılımlarda farklı görsel gerekebilir, opsiyon eklenebilir.
- getCardText fonksiyonu, showName false ise hiçbir şey döndürmüyor; bazen sadece durum göstergesi istenebilir.
- Erişilebilirlik için ek ARIA özellikleri ve klavye ile erişim desteği eklenmeli.
- pointer-events sorunu düzeltildi: canSelect false olduğunda pointer-events-none yerine opacity-50 kullanılıyor, böylece tıklama işlevi korunuyor.
- Kodda gereksiz tekrar veya karmaşık yapı yok, fonksiyonlar sade ve amacına uygun.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve prop isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Tema ve boyutlar nesne olarak tanımlanmış, tekrar yok. Next.js Image ile görsel optimizasyonu sağlanmış.
- Yeniden Kullanılabilirlik: Farklı açılım türleri ve kart tipleri için kolayca kullanılabilir, üst bileşenler tema ve mod ile özelleştirebilir.
- Güvenlik: Sadece görsel arayüz, dışarıdan gelen fonksiyonlar ve veriler üst bileşenlerden gelmeli. XSS riski yok, ancak alt ve src değerleri üstten geliyorsa sanitize edilmeli.

Gereklilik ve Kullanım Durumu:
- BaseCardRenderer: Gerekli, tüm tarot açılımlarında ortak kart render altyapısı olarak kullanılmalı.
- getSizeClasses, getStatusClasses: Gerekli, kod tekrarını önler ve özelleştirilebilirlik sağlar.
- CardImage, getCardText: Gerekli, kart görseli ve metin yönetimi için kullanılır.
- Silinebilir veya gereksiz kod yoktur, sade ve amacına uygun bir altyapı bileşenidir.
*/

'use client';

import Image from 'next/image';
import type { TarotCard } from '@/features/tarot/lib/a-tarot-helpers';

export type CardTheme =
  | 'default'
  | 'amber'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'green';
export type CardMode = 'gallery' | 'position' | 'detail';
export type CardSize = 'small' | 'medium' | 'large';

export interface BaseCardRendererProps {
  // Kart bilgileri
  card: TarotCard | null;
  isReversed?: boolean;
  // Görünüm modu
  mode: CardMode;
  // Durum bilgileri
  _isOpen?: boolean;
  isUsed?: boolean;
  isSelected?: boolean;
  canSelect?: boolean;
  // Boyut ve tema ayarları
  size?: CardSize;
  theme?: CardTheme;
  // İsteğe bağlı özellikler
  showName?: boolean;
  showStatus?: boolean;
  className?: string;
}

export default function BaseCardRenderer({
  card,
  isReversed = false,
  mode,
  _isOpen = false,
  isUsed = false,
  isSelected = false,
  canSelect = true,
  size = 'medium',
  theme = 'default',
  showName = false,
  showStatus = false,
  className = '',
}: BaseCardRendererProps) {
  // Tema renk şemalarını tanımla
  const themes = {
    default: {
      border: 'border-purple-400/70',
      shadow: 'shadow-purple-500/30',
      hover: 'hover:border-purple-300/80 hover:shadow-purple-500/40',
      selectedBg: 'from-blue-500/60 to-purple-500/60',
      cardBg: 'from-amber-500/60 to-orange-500/60',
      cardBorder: 'border-amber-400/60',
      hoverRing: 'hover:ring-amber-300/30',
      textColor: 'text-amber-200',
    },
    amber: {
      border: 'border-amber-400/70',
      shadow: 'shadow-amber-500/30',
      hover: 'hover:border-amber-300/80 hover:shadow-amber-500/40',
      selectedBg: 'from-blue-500/60 to-amber-500/60',
      cardBg: 'from-amber-500/60 to-yellow-500/60',
      cardBorder: 'border-amber-400/60',
      hoverRing: 'hover:ring-amber-300/30',
      textColor: 'text-amber-200',
    },
    pink: {
      border: 'border-pink-400/70',
      shadow: 'shadow-pink-500/30',
      hover: 'hover:border-pink-300/80 hover:shadow-pink-500/40',
      selectedBg: 'from-blue-500/60 to-pink-500/60',
      cardBg: 'from-pink-500/60 to-red-500/60',
      cardBorder: 'border-pink-400/60',
      hoverRing: 'hover:ring-pink-300/30',
      textColor: 'text-pink-200',
    },
    purple: {
      border: 'border-purple-400/70',
      shadow: 'shadow-purple-500/30',
      hover: 'hover:border-purple-300/80 hover:shadow-purple-500/40',
      selectedBg: 'from-blue-500/60 to-purple-500/60',
      cardBg: 'from-purple-500/60 to-indigo-500/60',
      cardBorder: 'border-purple-400/60',
      hoverRing: 'hover:ring-purple-300/30',
      textColor: 'text-purple-200',
    },
    blue: {
      border: 'border-blue-400/70',
      shadow: 'shadow-blue-500/30',
      hover: 'hover:border-blue-300/80 hover:shadow-blue-500/40',
      selectedBg: 'from-cyan-500/60 to-blue-500/60',
      cardBg: 'from-blue-500/60 to-indigo-500/60',
      cardBorder: 'border-blue-400/60',
      hoverRing: 'hover:ring-blue-300/30',
      textColor: 'text-blue-200',
    },
    green: {
      border: 'border-green-400/70',
      shadow: 'shadow-green-500/30',
      hover: 'hover:border-green-300/80 hover:shadow-green-500/40',
      selectedBg: 'from-blue-500/60 to-green-500/60',
      cardBg: 'from-green-500/60 to-emerald-500/60',
      cardBorder: 'border-green-400/60',
      hoverRing: 'hover:ring-green-300/30',
      textColor: 'text-green-200',
    },
  };

  const currentTheme = themes[theme];

  // Boyut sınıflarını belirle
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'w-12 h-18 xs:w-14 xs:h-20 sm:w-32 sm:h-56';
      case 'medium':
        return 'w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-32 md:h-56';
      case 'large':
        return 'w-24 h-36 xs:w-28 xs:h-42 sm:w-32 sm:h-48 md:w-36 md:h-56';
      default:
        return 'w-16 h-24 xs:w-18 xs:h-28 sm:w-20 sm:h-32 md:w-24 md:h-56';
    }
  };

  // Border ve durum sınıflarını belirle
  const getStatusClasses = (): string => {
    if (mode === 'gallery') {
      return isUsed
        ? 'border-gray-600/40 opacity-40 cursor-not-allowed'
        : `${currentTheme.border} shadow-lg ${currentTheme.shadow} cursor-pointer ${currentTheme.hover} hover:shadow-xl`;
    }

    if (mode === 'position') {
      return isSelected
        ? `border-blue-400/90 bg-gradient-to-br ${currentTheme.selectedBg} ring-2 ring-blue-400/60 animate-pulse scale-105`
        : card
          ? `border-amber-400/90 bg-gradient-to-br ${currentTheme.cardBg} ring-1 ring-amber-400/40 hover:ring-2 hover:ring-amber-300/60`
          : 'border-gray-400/70 bg-gradient-to-br from-slate-700/95 to-slate-800/95 ring-1 ring-gray-400/30';
    }

    return currentTheme.cardBorder;
  };

  // Kart görseli kaynak URL'si
  const getImageSrc = (): string => {
    // Galeri modunda arka yüzü göster
    if (mode === 'gallery') {
      return '/cards/CardBack.jpg';
    }

    // Pozisyon modunda kart seçilmişse ön yüzünü göster
    if (mode === 'position' && card) {
      return card.image || '/cards/CardBack.jpg';
    }

    // Detay modunda kart seçilmişse ön yüzünü göster
    if (mode === 'detail' && card) {
      return card.image || '/cards/CardBack.jpg';
    }

    // Diğer durumlarda arka yüzü göster
    return '/cards/CardBack.jpg';
  };

  // Kart bileşeni
  const CardImage = () => (
    <div className='relative w-full h-full'>
      <Image
        src={getImageSrc()}
        alt={card?.nameTr || 'Tarot Kartı'}
        fill
        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
        priority={mode === 'position'}
        className={`object-cover transition-transform duration-500 ${
          isReversed ? 'rotate-180' : ''
        }`}
        unoptimized={true}
        onError={(e) => {
          console.error('Image load error:', getImageSrc());
          // Fallback olarak arka plan rengi göster
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );

  // Kart alt metnini belirle
  const getCardText = () => {
    if (!card || !showName) {
      return null;
    }

    const truncatedName =
      card.nameTr.length > 12
        ? card.nameTr.substring(0, 12) + '...'
        : card.nameTr;

    return (
      <div className='text-center mt-1'>
        <span
          className={`text-[10px] md:text-xs lg:text-sm ${currentTheme.textColor} font-semibold leading-tight break-words hyphens-auto`}
        >
          {truncatedName}
        </span>
        {showStatus && (
          <span
            className={`text-xs font-bold mt-0.5 block ${isReversed ? 'text-red-400' : 'text-green-400'}`}
          >
            {isReversed ? 'Ters' : 'Düz'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`
        ${getSizeClasses()}
        border-2 rounded-xl overflow-hidden relative transition-all duration-300
        ${getStatusClasses()}
        ${className}
        ${!canSelect ? 'opacity-50' : ''}
      `}
    >
      <CardImage />
      {getCardText()}
    </div>
  );
}
