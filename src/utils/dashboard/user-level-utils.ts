// Dashboard kullanıcı seviyesi utility fonksiyonları

import {
  Star,
  BookOpen,
  Heart,
  Target,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export interface UserLevel {
  level: string;
  icon: any;
  color: string;
  progress: number;
  translationKey: string;
}

/**
 * Kullanıcı seviyesini hesaplar
 * @param totalReadings Toplam okuma sayısı
 * @param isAdmin Admin kullanıcı mı
 * @param recentReadings Son okumalar
 * @returns Kullanıcı seviye bilgisi
 */
export const calculateUserLevel = (
  totalReadings: number,
  isAdmin: boolean,
  recentReadings: any[]
): UserLevel => {
  if (isAdmin) {
    return {
      level: 'Admin',
      icon: Sparkles,
      color: 'text-purple-400',
      progress: 100,
      translationKey: 'dashboard.admin',
    };
  }

  if (totalReadings > 50) {
    return {
      level: 'Usta',
      icon: Star,
      color: 'text-gold',
      progress: 100,
      translationKey: 'dashboard.expert',
    };
  }

  if (totalReadings > 20) {
    return {
      level: 'Uzman',
      icon: TrendingUp,
      color: 'text-blue-400',
      progress: 80,
      translationKey: 'dashboard.expert',
    };
  }

  if (totalReadings > 10) {
    return {
      level: 'Orta',
      icon: Target,
      color: 'text-green-400',
      progress: 60,
      translationKey: 'dashboard.intermediate',
    };
  }

  if (totalReadings > 5) {
    return {
      level: 'Gelişen',
      icon: Heart,
      color: 'text-pink-400',
      progress: 40,
      translationKey: 'dashboard.intermediate',
    };
  }

  return {
    level: 'Başlangıç',
    icon: BookOpen,
    color: 'text-gray-400',
    progress: 20,
    translationKey: 'dashboard.beginner',
  };
};

/**
 * Basit kullanıcı seviyesi string'i döndürür (StatsCards için)
 * @param totalReadings Toplam okuma sayısı
 * @param isAdmin Admin kullanıcı mı
 * @param recentReadings Son okumalar
 * @returns Kullanıcı seviyesi string'i
 */
export const getUserLevelString = (
  totalReadings: number,
  isAdmin: boolean,
  recentReadings: any[]
): string => {
  if (isAdmin) {
    return 'Admin';
  }
  if (recentReadings.length > 30) {
    return 'Uzman';
  }
  if (recentReadings.length > 13) {
    return 'Orta';
  }
  return 'Başlangıç';
};
