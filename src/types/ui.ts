/*
 * UI Bileşenleri için Merkezi Type Tanımları
 * Duplikasyonu önlemek ve type safety sağlamak için
 */

// Kart anlamı tipi (genel)
export interface CardMeaningData {
  card?: string;
  name?: string;
  upright?: string;
  reversed?: string;
  upcontent?: string;
  reversedcontent?: string;
  careerMeaning?: {
    upright: string;
    reversed: string;
  };
  relationshipAnalysisMeaning?: {
    upright: string;
    reversed: string;
  };
  moneyMeaning?: {
    upright: string;
    reversed: string;
  };
  newLoverMeaning?: {
    upright: string;
    reversed: string;
  };
  marriageMeaning?: {
    upright: string;
    reversed: string;
  };
  keywords?: string[];
  context?: string;
}

// Pozisyon bilgisi tipi
export interface PositionInfo {
  readonly title: string;
  readonly desc: string;
  readonly id?: number;
}

// Tema tipi
export type Theme = 'default' | 'amber' | 'pink' | 'purple' | 'blue' | 'green' | 'emerald';

// Toast tipi
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Loading varyantları
export type LoadingVariant = 'spinner' | 'pulse' | 'dots' | 'bars';
export type SkeletonType = 'text' | 'avatar' | 'card' | 'button';

// Card renderer tipleri
export type CardTheme = 'default' | 'amber' | 'pink' | 'purple' | 'blue' | 'green';
export type CardMode = 'gallery' | 'position' | 'detail';
export type CardSize = 'small' | 'medium' | 'large';
