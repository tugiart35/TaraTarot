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
  type: 'all' | 'love' | 'general' | 'career' | 'numerology';
  dateRange: 'week' | 'month' | 'year' | 'all';
  search: string;
}

export interface DashboardBaseComponentProps {
  onStatsUpdate?: (stats: DashboardStats) => void;
  onFiltersChange?: (filters: DashboardFilters) => void;
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
        err instanceof Error ? err.message : 'İstatistikler yüklenemedi';
      setError(errorMessage);
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user, onStatsUpdate, showToast]);

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
        'success',
        t('dashboard.creditBalanceRefreshed', 'Kredi bakiyesi yenilendi')
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Kredi bakiyesi yenilenemedi';
      showToast('error', errorMessage);
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
  formatDate: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  formatCreditBalance: (balance: number): string => {
    return balance.toLocaleString('tr-TR');
  },

  getMemberSince: (createdAt: string | Date): string => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} gün`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ay`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} yıl`;
    }
  },

  getUserLevel: (totalReadings: number): string => {
    if (totalReadings >= 100) {
      return 'Usta';
    }
    if (totalReadings >= 50) {
      return 'Deneyimli';
    }
    if (totalReadings >= 20) {
      return 'Orta';
    }
    if (totalReadings >= 5) {
      return 'Başlangıç';
    }
    return 'Yeni';
  },

  getReadingTypeIcon: (type: string): string => {
    const icons: Record<string, string> = {
      love: '💕',
      career: '💼',
      money: '💰',
      general: '🔮',
      numerology: '🔢',
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
    };
    return colors[type] || 'text-gray-500';
  },
};
