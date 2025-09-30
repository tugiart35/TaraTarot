import type { Reading } from '@/types/dashboard.types';

export interface ReadingStatusInfo {
  label: string;
  badgeClassName: string;
  icon: string;
}

const STATUS_PRESENTATION: Record<string, ReadingStatusInfo> = {
  completed: {
    label: 'readingModal.completed',
    icon: '✅',
    badgeClassName: 'bg-green-500/20 text-green-300 border border-green-500/30',
  },
  reviewed: {
    label: 'readingModal.reviewed',
    icon: '👁️',
    badgeClassName:
      'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  },
  pending: {
    label: 'readingModal.pending',
    icon: '⏳',
    badgeClassName: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
  },
};

/**
 * Reading status bilgilerini al
 */
export function getReadingStatusInfo(
  reading: Reading | null,
  translate: (key: string, fallback?: string) => string
): ReadingStatusInfo {
  const statusKey = reading?.status ?? 'pending';
  const presentation =
    STATUS_PRESENTATION[statusKey] ?? STATUS_PRESENTATION.pending;

  return {
    icon: presentation?.icon ?? '⏳',
    badgeClassName:
      presentation?.badgeClassName ??
      'bg-blue-500/20 text-blue-200 border border-blue-500/30',
    label: translate(presentation?.label ?? 'readingModal.pending', statusKey),
  };
}

/**
 * Reading status'u kontrol et
 */
export function isReadingCompleted(reading: Reading | null): boolean {
  return reading?.status === 'completed';
}

/**
 * Reading status'u kontrol et
 */
export function isReadingPending(reading: Reading | null): boolean {
  return reading?.status === 'pending';
}

/**
 * Reading status'u kontrol et
 */
export function isReadingReviewed(reading: Reading | null): boolean {
  return reading?.status === 'reviewed';
}

/**
 * Reading status'u string olarak al
 */
export function getReadingStatusString(reading: Reading | null): string {
  return reading?.status ?? 'pending';
}
