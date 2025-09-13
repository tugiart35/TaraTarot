/*
info:
---
Dosya Amacı:
- Tüm tarot açılımları için ortak kredi onay modalı
- Yeniden kullanılabilir, tema destekli, responsive tasarım
- Kredi kesintisi onayı ve işlem durumu yönetimi

Bağlantılı Dosyalar:
- @/hooks/useTranslations: i18n desteği için (gerekli)

Geliştirme ve Öneriler:
- Tema sistemi ile farklı açılımlar için özelleştirilebilir
- Loading durumu ve hata yönetimi dahil
- Responsive tasarım mobil öncelikli
- ESC tuşu ile kapatma desteği

Kullanım Durumu:
- CreditConfirmModal: Gerekli, tüm açılımlarda kullanılır
- Kredi onayı: Gerekli, güvenlik için
- Tema sistemi: Gerekli, görsel tutarlılık için
*/

'use client';

import { useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

// Tema konfigürasyonu
export interface ModalTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  text: string;
}

// Props interface
export interface CreditConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  theme: ModalTheme;
  isLoading?: boolean;
  creditAmount?: number;
  title?: string;
  message?: string;
}

// Varsayılan tema - Aşk açılımı için
const defaultTheme: ModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'slate-900',
  border: 'pink-500/40',
  text: 'pink-400',
};

export default function CreditConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  theme = defaultTheme,
  isLoading = false,
  creditAmount = 50,
  title,
  message,
}: CreditConfirmModalProps) {
  const { t } = useTranslations();

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
      <div className={`bg-${theme.background} border border-${theme.border} rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4`}>
        {/* Başlık */}
        <h2 className={`text-xl font-bold text-${theme.text} mb-4 text-center`}>
          {title || t('love.modals.creditConfirm')}
        </h2>

        {/* Mesaj */}
        <p className='text-gray-200 text-center mb-6'>
          {message || t('love.modals.creditConfirmMessage')}
        </p>

        {/* Kredi Miktarı Gösterimi */}
        {creditAmount > 0 && (
          <div className={`bg-${theme.primary}-800/30 border border-${theme.primary}-500/20 rounded-xl p-4 mb-6 text-center`}>
            <div className={`text-${theme.primary}-300 text-sm font-medium mb-1`}>
              Kredi Miktarı
            </div>
            <div className={`text-${theme.primary}-200 text-2xl font-bold`}>
              {creditAmount} Kredi
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className='flex justify-center gap-4'>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`bg-gradient-to-r from-${theme.primary}-600 to-${theme.accent}-500 hover:from-${theme.primary}-700 hover:to-${theme.accent}-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className='flex items-center'>
                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                {t('love.modals.processing')}
              </div>
            ) : (
              t('love.modals.confirm')
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {t('love.modals.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
