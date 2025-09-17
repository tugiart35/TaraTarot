/*
info:
Bağlantılı dosyalar:
- Tüm admin sayfaları: Silme ve kritik işlemler için (gerekli)

Dosyanın amacı:
- Onay dialog bileşeni
- Farklı tip işlemler için
- Güvenli silme ve kritik işlemler

Geliştirme önerileri:
- Farklı dialog tipleri (delete, warning, info)
- Customizable buttons
- Keyboard navigation

Tespit edilen hatalar:
- ✅ Confirmation dialog bileşeni oluşturuldu
- ✅ Farklı tipler eklendi
- ✅ Admin temasına uygun tasarım

Kullanım durumu:
- ✅ Gerekli: Tüm admin sayfalarında onay dialogları
- ✅ Production-ready: Güvenli ve test edilmiş
*/

'use client';

import { useEffect } from 'react';
import { X, AlertTriangle, Trash2, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DialogType = 'delete' | 'warning' | 'info' | 'danger';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

const dialogConfig = {
  delete: {
    icon: Trash2,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
    borderColor: 'border-red-500/20',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-500/10',
    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    borderColor: 'border-yellow-500/20',
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    borderColor: 'border-blue-500/20',
  },
  danger: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
    borderColor: 'border-red-500/20',
  },
};

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'delete',
  confirmText,
  cancelText = 'İptal',
  loading = false,
  className,
}: ConfirmationDialogProps) {
  const config = dialogConfig[type];
  const Icon = config.icon;

  // Default confirm text based on type
  const defaultConfirmText = {
    delete: 'Sil',
    warning: 'Devam Et',
    info: 'Tamam',
    danger: 'Onayla',
  };

  const finalConfirmText = confirmText || defaultConfirmText[type];

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'bg-slate-800 rounded-2xl shadow-2xl border max-w-md w-full',
          config.borderColor,
          className
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-700'>
          <div className='flex items-center space-x-3'>
            <div className={cn('p-2 rounded-lg', config.iconBg)}>
              <Icon className={cn('h-5 w-5', config.iconColor)} />
            </div>
            <h3 className='text-lg font-semibold text-white'>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-white transition-colors'
            disabled={loading}
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <p className='text-slate-300 leading-relaxed'>{message}</p>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end space-x-3 p-6 border-t border-slate-700'>
          <button
            onClick={onClose}
            disabled={loading}
            className='px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              config.confirmButton
            )}
          >
            {loading ? (
              <div className='flex items-center space-x-2'>
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white'></div>
                <span>İşleniyor...</span>
              </div>
            ) : (
              finalConfirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Preset dialogs for common use cases
export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='Silme Onayı'
      message={`"${itemName}" öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
      type='delete'
      confirmText='Sil'
      loading={loading}
    />
  );
}

export function WarningConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      type='warning'
      confirmText='Devam Et'
      loading={loading}
    />
  );
}

export function DangerConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      type='danger'
      confirmText='Onayla'
      loading={loading}
    />
  );
}
