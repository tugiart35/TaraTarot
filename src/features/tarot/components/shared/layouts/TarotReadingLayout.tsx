/*
info:
---
Dosya Amacı:
- Tüm tarot açılımları için ortak layout wrapper
- Yeniden kullanılabilir, tema destekli, responsive tasarım
- Arka plan, overlay ve temel yapı sağlar

Bağlantılı Dosyalar:
- @/hooks/useTranslations: i18n desteği için (gerekli)

Geliştirme ve Öneriler:
- Tema sistemi ile farklı açılımlar için özelleştirilebilir
- Arka plan görseli ve gradient desteği
- Overlay katmanları ve z-index yönetimi
- Responsive tasarım mobil öncelikli

Kullanım Durumu:
- TarotReadingLayout: Gerekli, tüm açılımlarda kullanılır
- Layout wrapper: Gerekli, görsel tutarlılık için
- Tema sistemi: Gerekli, özelleştirilebilirlik için
*/

'use client';

import { ReactNode } from 'react';
// import { useTranslations } from '@/hooks/useTranslations';

// Tema konfigürasyonu
export interface LayoutTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  text: string;
  overlay: string;
}

// Props interface
export interface TarotReadingLayoutProps {
  children: ReactNode;
  theme: LayoutTheme;
  backgroundImage?: string;
  showOverlay?: boolean;
  overlayContent?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
}

// Varsayılan tema - Aşk açılımı için
const defaultTheme: LayoutTheme = {
  primary: 'red',
  secondary: 'pink',
  accent: 'purple',
  background: 'red-900/90',
  border: 'pink-700/60',
  text: 'red-200',
  overlay: 'black/60',
};

export default function TarotReadingLayout({
  children,
  theme = defaultTheme,
  backgroundImage = '/images/bg-love-tarot.jpg',
  showOverlay = false,
  overlayContent,
  className = '',
  title,
  subtitle,
  icon = '❤️',
}: TarotReadingLayoutProps) {
  // const { t } = useTranslations();

  return (
    <div className={`w-full space-y-6 md:space-y-8 ${className}`}>
      {/* Ana Açılım Sahnesi */}
      <div
        className={`w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-${theme.background} via-${theme.secondary}-900/80 to-${theme.accent}-800/80 border border-${theme.border}`}
      >
        {/* Overlay Content */}
        {showOverlay && overlayContent && (
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-${theme.overlay} backdrop-blur-[2px] rounded-2xl`}
          >
            {overlayContent}
          </div>
        )}

        {/* Arka Plan Katmanları */}
        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          {/* Arka Plan Görseli */}
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt='Tarot Reading background'
              className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
              loading='lazy'
              style={{ zIndex: 0 }}
            />
          )}

          {/* Gradient Overlay 1 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${theme.primary}-900/10 via-${theme.secondary}-900/60 to-${theme.accent}-900/20 backdrop-blur-[2px]`}
            style={{ zIndex: 1 }}
          />

          {/* Gradient Overlay 2 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${theme.primary}-900/80 via-${theme.secondary}-900/10 to-${theme.accent}-900/80`}
            style={{ zIndex: 2 }}
          />
        </div>

        {/* Ana Overlay */}
        <div
          className={`absolute inset-0 bg-${theme.overlay} backdrop-blur-[1.5px] rounded-2xl`}
          style={{ zIndex: 4 }}
        />

        {/* İçerik */}
        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          {/* Başlık ve Alt Başlık */}
          {(title || subtitle) && (
            <div className='text-center mb-6'>
              {icon && (
                <div
                  className={`w-16 h-16 flex items-center justify-center bg-${theme.primary}-800/70 rounded-full mb-4 mx-auto shadow-lg`}
                >
                  <span className='text-3xl'>{icon}</span>
                </div>
              )}
              {title && (
                <h1
                  className={`text-${theme.text} text-2xl md:text-3xl font-bold mb-2`}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <p
                  className={`text-${theme.text}/80 text-sm md:text-base max-w-md mx-auto`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Ana İçerik */}
          <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
