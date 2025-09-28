'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { BaseTarotModalProps } from '../types/tarot-modal.types';
import { getThemeClasses, getMaxWidthClass } from './theme-utils';

export default function BaseTarotModal({
  isOpen,
  onClose,
  theme,
  icon,
  titleKey,
  children,
  maxWidth = 'lg',
  className = '',
}: BaseTarotModalProps) {
  const { t } = useTranslations();
  const themeClasses = getThemeClasses(theme);
  const maxWidthClass = getMaxWidthClass(maxWidth);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-slate-900/95 border ${themeClasses.border} rounded-2xl shadow-2xl w-full ${maxWidthClass} max-h-[90vh] flex flex-col ${className}`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${themeClasses.headerBorder} flex-shrink-0`}
        >
          <div className='flex items-center'>
            <div
              className={`w-12 h-12 flex items-center justify-center ${themeClasses.iconBg} rounded-full mr-3 shadow-lg`}
            >
              <span className={`text-xl ${themeClasses.iconText}`}>{icon}</span>
            </div>
            <h2 className={`${themeClasses.titleText} text-lg font-semibold`}>
              {t(titleKey)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`text-gray-400 ${themeClasses.buttonHover} transition-colors p-2 rounded-lg`}
            title='Kapat'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>{children}</div>
      </div>
    </div>
  );
}
