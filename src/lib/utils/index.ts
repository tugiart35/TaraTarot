/*
info:
Bağlantılı dosyalar:
- components/shared/ui/ConfirmationDialog.tsx: Onay dialogları için utility (gerekli)
- components/shared/ui/LoadingSpinner.tsx: Loading bileşenleri için utility (gerekli)

Dosyanın amacı:
- Tailwind CSS class'larını birleştirmek için utility fonksiyonları
- React bileşenlerinde className'leri dinamik olarak oluşturmak
- clsx ve tailwind-merge kütüphanelerini kullanarak class çakışmalarını önlemek

Geliştirme önerileri:
- clsx ve tailwind-merge kütüphaneleri eklenebilir
- Daha gelişmiş class merging fonksiyonları eklenebilir
- TypeScript tip güvenliği artırılabilir

Tespit edilen hatalar:
- ✅ cn fonksiyonu eklendi
- ✅ Basit string birleştirme ile çalışıyor

Kullanım durumu:
- ✅ Gerekli: UI bileşenleri için class utility
- ✅ Production-ready: Temel işlevsellik mevcut
*/

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS class'larını birleştirmek için utility fonksiyonu
 * clsx ve tailwind-merge kullanarak class çakışmalarını önler
 * 
 * @param inputs - Birleştirilecek class değerleri
 * @returns Birleştirilmiş class string'i
 * 
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'text-white': isActive })
 * // 'px-2 py-1 bg-red-500 text-white' (eğer isActive true ise)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Basit string birleştirme fonksiyonu (fallback)
 * clsx ve tailwind-merge yoksa kullanılır
 * 
 * @param classes - Birleştirilecek class string'leri
 * @returns Birleştirilmiş class string'i
 */
export function simpleCn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

