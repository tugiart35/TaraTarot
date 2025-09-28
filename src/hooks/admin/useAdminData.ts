/*
 * Admin Data Hook
 *
 * Bu dosya admin paneli için ortak data fetching hook'unu sağlar.
 * DRY principle uygulayarak tekrarlanan data fetching kodlarını önler.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { AdminDataHookReturn } from '@/types/admin.types';

interface UseAdminDataOptions {
  table: string;
  select?: string;
  filters?: Record<string, any> | undefined;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  enabled?: boolean;
}

export function useAdminData<T>(
  options: UseAdminDataOptions
): AdminDataHookReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!options.enabled) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(options.table).select(options.select || '*');

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? false,
        });
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setData(result || []);
    } catch (err: any) {
      const errorMessage = err.message || 'Veri yüklenirken hata oluştu';
      setError(errorMessage);
      console.error(`[ADMIN] ${options.table} fetch error:`, err);
    } finally {
      setLoading(false);
    }
  }, [
    options.table,
    options.select,
    options.filters,
    options.orderBy,
    options.limit,
    options.enabled,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Specific hooks for common admin data
export function useAdminUsers(userId?: string, limit?: number) {
  return useAdminData({
    table: 'profiles',
    select:
      'id, email, display_name, credit_balance, created_at, last_sign_in_at',
    filters: userId ? { id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    limit: limit || 50,
    enabled: true,
  });
}

export function useAdminReadings(userId?: string, limit?: number) {
  return useAdminData({
    table: 'readings',
    select: `
      id, user_id, reading_type, spread_name, title, interpretation, 
      cards, questions, cost_credits, status, metadata, created_at, updated_at
    `,
    filters: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    limit: limit || 100,
    enabled: true,
  });
}

export function useAdminPayments(userId?: string, limit?: number) {
  return useAdminData({
    table: 'transactions',
    select: `
      id, user_id, amount, currency, status, payment_method, 
      provider_ref, package_name, credits_granted, created_at, processed_at
    `,
    filters: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    limit: limit || 50,
    enabled: true,
  });
}

export function useAdminTransactions(userId?: string, limit?: number) {
  return useAdminData({
    table: 'transactions',
    select: `
      id, user_id, type, amount, delta_credits, reason, description, 
      reference_type, reference_id, created_at, credits, is_audio
    `,
    filters: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false },
    limit: limit || 100,
    enabled: true,
  });
}
