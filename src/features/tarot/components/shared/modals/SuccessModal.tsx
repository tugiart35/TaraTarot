/*
info:
---
Dosya Amacı:
- Tüm tarot açılımları için ortak başarı modalı
- Yeniden kullanılabilir, tema destekli, responsive tasarım
- Okuma tamamlandı bildirimi ve yönlendirme

Bağlantılı Dosyalar:
- @/hooks/useTranslations: i18n desteği için (gerekli)

Geliştirme ve Öneriler:
- Tema sistemi ile farklı açılımlar için özelleştirilebilir
- Otomatik kapanma ve yönlendirme desteği
- Responsive tasarım mobil öncelikli
- Progress bar ile görsel geri bildirim

Kullanım Durumu:
- SuccessModal: Gerekli, tüm açılımlarda kullanılır
- Başarı bildirimi: Gerekli, kullanıcı deneyimi için
- Tema sistemi: Gerekli, görsel tutarlılık için
*/

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

// Tema konfigürasyonu
export interface SuccessModalTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  text: string;
  success: string;
}

// Props interface
export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: SuccessModalTheme;
  title?: string;
  message?: string;
  info?: string;
  redirectDelay?: number;
  showProgress?: boolean;
  icon?: string;
}

// Varsayılan tema - Aşk açılımı için
const defaultTheme: SuccessModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'pink-900/95',
  border: 'pink-500/30',
  text: 'pink-200',
  success: 'green',
};

export default function SuccessModal({
  isOpen,
  onClose,
  theme = defaultTheme,
  title,
  message,
  info,
  redirectDelay = 3000,
  showProgress = true,
  icon = '✅',
}: SuccessModalProps) {
  const { t } = useTranslations();
  const [progress, setProgress] = useState(0);

  // Otomatik kapanma ve progress bar
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 100 / (redirectDelay / 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, redirectDelay, onClose]);

  // Modal açıldığında progress'i sıfırla
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div
        className={`bg-gradient-to-br from-${theme.background} to-${theme.secondary}-900/95 border border-${theme.border} rounded-3xl shadow-2xl max-w-md w-full p-8 text-center`}
      >
        {/* Başarı İkonu */}
        <div
          className={`w-20 h-20 bg-gradient-to-br from-${theme.success}-400 to-${theme.success}-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
        >
          <span className='text-3xl'>{icon}</span>
        </div>

        {/* Başlık */}
        <h2 className={`text-2xl font-bold text-${theme.success}-400 mb-4`}>
          {title || t('love.modals.successTitle')}
        </h2>

        {/* Mesaj */}
        <p className={`text-${theme.text} mb-6 leading-relaxed`}>
          {message || t('love.modals.successMessage')}
        </p>

        {/* Bilgi */}
        {info && (
          <div
            className={`bg-${theme.primary}-800/30 border border-${theme.primary}-500/20 rounded-xl p-4 mb-6`}
          >
            <p className={`text-${theme.primary}-300 text-sm`}>{info}</p>
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div
            className={`w-full bg-${theme.primary}-800/30 rounded-full h-2 mb-4`}
          >
            <div
              className={`bg-gradient-to-r from-${theme.success}-400 to-${theme.success}-600 h-2 rounded-full transition-all duration-100 ease-linear`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Manuel Kapatma Butonu */}
        <button
          onClick={onClose}
          className={`mt-4 px-6 py-2 bg-${theme.primary}-600/20 border border-${theme.primary}-500/30 text-${theme.primary}-300 rounded-lg hover:bg-${theme.primary}-600/30 transition-colors text-sm`}
        >
          Şimdi Kapat
        </button>
      </div>
    </div>
  );
}
