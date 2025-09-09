'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: '✅',
    bg: 'bg-green-600',
    duration: 4000, // 4 saniye
  },
  error: {
    icon: '❌',
    bg: 'bg-red-600',
    duration: 8000, // 8 saniye - hatalar daha uzun görünsün
  },
  info: {
    icon: '💡',
    bg: 'bg-blue-600',
    duration: 6000, // 6 saniye
  },
  warning: {
    icon: '⚠️',
    bg: 'bg-yellow-600',
    duration: 7000, // 7 saniye
  },
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const config = toastConfig[type];
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = config.duration;
    const interval = 50; // Her 50ms'de bir güncelle
    const totalSteps = duration / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = Math.max(0, 100 - (currentStep / totalSteps) * 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
        onClose();
      }
    }, interval);

    return () => clearInterval(progressTimer);
  }, [onClose, config.duration]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${config.bg} text-white px-6 py-3 rounded-xl shadow-lg z-[1000] animate-fade-in min-w-[300px] max-w-[500px]`}
      role='status'
      aria-live='polite'
    >
      <div className='flex items-center gap-3'>
        <span>{config.icon}</span>
        <span className='flex-1'>{message}</span>
        <button
          className='ml-4 text-white/80 hover:text-white text-sm font-bold'
          onClick={onClose}
          aria-label='Uyarı mesajını kapat'
        >
          Kapat
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className='mt-2 w-full bg-white/20 rounded-full h-1'>
        <div 
          className='bg-white/60 h-1 rounded-full transition-all duration-75 ease-linear'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
