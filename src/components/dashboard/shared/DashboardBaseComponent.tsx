/*
 * Dashboard Base Component - Ortak Dashboard Logic'i
 *
 * Bu component tüm dashboard component'leri için ortak state yönetimi ve logic sağlar.
 * DRY principle uygulayarak tekrarlanan dashboard kodlarını önler.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from '@/hooks/useToast';

export interface DashboardStats {
  totalCount: number;
  monthlyCount: number;
  favoriteSpread: string;
  creditBalance: number;
  recentActivity: any[];
}

export interface DashboardFilters {
  type:
    | 'all'
    | 'love'
    | 'general'
    | 'career'
    | 'numerology'
    | 'situation-analysis'
    | 'problem-solving';
  dateRange: 'week' | 'month' | 'year' | 'all';
  search: string;
}

export interface DashboardBaseComponentProps {
  onStatsUpdate?: (_stats: DashboardStats) => void;
  onFiltersChange?: (_filters: DashboardFilters) => void;
}

export function useDashboardBaseComponent({
  onStatsUpdate,
  onFiltersChange,
}: DashboardBaseComponentProps = {}) {
  // State management
  const [stats, setStats] = useState<DashboardStats>({
    totalCount: 0,
    monthlyCount: 0,
    favoriteSpread: '',
    creditBalance: 0,
    recentActivity: [],
  });

  const [filters, setFilters] = useState<DashboardFilters>({
    type: 'all',
    dateRange: 'month',
    search: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { user } = useAuth();
  const { t } = useTranslations();
  const { showToast } = useToast();
  const router = useRouter();

  // Stats fetching
  const fetchStats = useCallback(async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch user profile for credit balance
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      // Fetch reading statistics
      const { data: readings, error: readingsError } = await supabase
        .from('readings')
        .select('reading_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (readingsError) {
        throw readingsError;
      }

      // Calculate statistics
      const totalCount = readings?.length || 0;
      const monthlyCount =
        readings?.filter((reading: any) => {
          const readingDate = new Date(reading.created_at);
          const now = new Date();
          const monthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          return readingDate >= monthAgo;
        }).length || 0;

      // Find favorite spread
      const spreadCounts =
        readings?.reduce(
          (acc: any, reading: any) => {
            acc[reading.reading_type] = (acc[reading.reading_type] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ) || {};

      const favoriteSpread = Object.keys(spreadCounts).reduce(
        (a, b) => (spreadCounts[a] > spreadCounts[b] ? a : b),
        'love'
      );

      // Get recent activity
      const recentActivity = readings?.slice(0, 5) || [];

      const newStats: DashboardStats = {
        totalCount,
        monthlyCount,
        favoriteSpread,
        creditBalance: profile?.credit_balance || 0,
        recentActivity,
      };

      setStats(newStats);
      onStatsUpdate?.(newStats);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : t('dashboard.errors.statsLoadFailed', 'İstatistikler yüklenemedi');

      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, [user, onStatsUpdate, showToast, t]);

  // Filters handling
  const updateFilters = useCallback(
    (newFilters: Partial<DashboardFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      onFiltersChange?.(updatedFilters);
    },
    [filters, onFiltersChange]
  );

  const resetFilters = useCallback(() => {
    const defaultFilters: DashboardFilters = {
      type: 'all',
      dateRange: 'month',
      search: '',
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  }, [onFiltersChange]);

  // Credit balance refresh
  const refreshCreditBalance = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      setStats(prev => ({
        ...prev,
        creditBalance: profile?.credit_balance || 0,
      }));

      showToast(
        t('dashboard.creditBalanceRefreshed', 'Kredi bakiyesi yenilendi'),
        'success'
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : t(
              'dashboard.errors.creditRefreshFailed',
              'Kredi bakiyesi yenilenemedi'
            );

      showToast(errorMessage, 'error');
    }
  }, [user, showToast, t]);

  // Navigation helpers
  const navigateToReadings = useCallback(() => {
    router.push('/dashboard/readings');
  }, [router]);

  const navigateToStatistics = useCallback(() => {
    router.push('/dashboard/statistics');
  }, [router]);

  const navigateToSettings = useCallback(() => {
    router.push('/dashboard/settings');
  }, [router]);

  const navigateToCredits = useCallback(() => {
    router.push('/dashboard/credits');
  }, [router]);

  // Error handling
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-refresh on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    // State
    stats,
    filters,
    loading,
    error,

    // Actions
    fetchStats,
    updateFilters,
    resetFilters,
    refreshCreditBalance,
    navigateToReadings,
    navigateToStatistics,
    navigateToSettings,
    navigateToCredits,
    clearError,

    // Setters
    setStats,
    setFilters,
    setLoading,
    setError,
  };
}

// Export utility functions for common dashboard operations
export const DashboardUtils = {
  /**
   * Format date according to locale
   * @param date - Date to format
   * @param locale - Locale code (tr, en, sr)
   */
  formatDate: (date: string | Date, locale: string = 'tr'): string => {
    const d = new Date(date);
    const localeMap: Record<string, string> = {
      tr: 'tr-TR',
      en: 'en-US',
      sr: 'sr-RS',
    };
    return d.toLocaleDateString(localeMap[locale] || 'tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  formatCreditBalance: (balance: number): string => {
    // Number formatting is locale-agnostic
    return balance.toLocaleString('tr-TR');
  },

  /**
   * Get member since duration with i18n
   * @param createdAt - User creation date
   * @param t - Translation function
   */
  getMemberSince: (
    createdAt: string | Date,
    t: (_key: string) => string
  ): string => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} ${t(diffDays === 1 ? 'dashboard.time.day' : 'dashboard.time.days')}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${t(months === 1 ? 'dashboard.time.month' : 'dashboard.time.months')}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${t(years === 1 ? 'dashboard.time.year' : 'dashboard.time.years')}`;
    }
  },

  /**
   * Get user level based on reading count with i18n
   * @param totalReadings - Total reading count
   * @param t - Translation function
   */
  getUserLevel: (
    totalReadings: number,
    t: (_key: string) => string
  ): string => {
    if (totalReadings >= 100) {
      return t('dashboard.userLevels.master');
    }
    if (totalReadings >= 50) {
      return t('dashboard.userLevels.experienced');
    }
    if (totalReadings >= 20) {
      return t('dashboard.userLevels.intermediate');
    }
    if (totalReadings >= 5) {
      return t('dashboard.userLevels.beginner');
    }
    return t('dashboard.userLevels.new');
  },

  getReadingTypeIcon: (type: string): string => {
    const icons: Record<string, string> = {
      love: '💕',
      career: '💼',
      money: '💰',
      general: '🔮',
      numerology: '🔢',
      situationAnalysis: '📊',
      problemSolving: '🔍',
      relationshipAnalysis: '💙',
      relationshipProblems: '💔',
      marriage: '💒',
      newLover: '💖',
      moneySpread: '💰',
    };
    return icons[type] || '🔮';
  },

  getReadingTypeColor: (type: string): string => {
    const colors: Record<string, string> = {
      love: 'text-pink-500',
      career: 'text-blue-500',
      money: 'text-green-500',
      general: 'text-purple-500',
      numerology: 'text-orange-500',
      situationAnalysis: 'text-blue-500',
      problemSolving: 'text-green-500',
    };
    return colors[type] || 'text-gray-500';
  },
};
