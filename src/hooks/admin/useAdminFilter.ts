/*
 * Admin Filter Hook
 *
 * Bu dosya admin paneli için ortak filter management hook'unu sağlar.
 * DRY principle uygulayarak tekrarlanan filter logic'ini önler.
 */

import { useState, useMemo } from 'react';
import {
  AdminFilterHookReturn,
  ReadingFilter,
  PaymentFilter,
  TransactionFilter,
} from '@/types/admin.types';

export function useAdminFilter<T>(
  data: T[],
  filterKey: keyof T,
  defaultFilter: string = 'all'
): AdminFilterHookReturn<T> {
  const [filter, setFilter] = useState<string>(defaultFilter);

  const filteredData = useMemo(() => {
    if (filter === 'all') {
      return data;
    }
    return data.filter(item => item[filterKey] === filter);
  }, [data, filter, filterKey]);

  return {
    filter,
    setFilter,
    filteredData,
  };
}

// Specific filter hooks for admin components
export function useReadingFilter(data: any[]) {
  return useAdminFilter(data, 'spread_type', 'all' as ReadingFilter);
}

export function usePaymentFilter(data: any[]) {
  return useAdminFilter(data, 'status', 'all' as PaymentFilter);
}

export function useTransactionFilter(data: any[]) {
  return useAdminFilter(data, 'type', 'all' as TransactionFilter);
}

// Advanced filter hook with multiple criteria
export function useAdvancedAdminFilter<T>(
  data: T[],
  filters: Record<keyof T, string>
) {
  const [filterState, setFilterState] =
    useState<Record<keyof T, string>>(filters);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filterState).every(([key, value]) => {
        if (value === 'all' || value === '') {
          return true;
        }
        return item[key as keyof T] === value;
      });
    });
  }, [data, filterState]);

  const setFilter = (key: keyof T, value: string) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilterState(filters);
  };

  const hasActiveFilters = Object.values(filterState).some(
    value => value !== 'all' && value !== ''
  );

  return {
    filters: filterState,
    setFilter,
    filteredData,
    resetFilters,
    hasActiveFilters,
  };
}

// Search and filter combined hook
export function useAdminSearchAndFilter<T>(
  data: T[],
  searchKeys: (keyof T)[],
  filterKey?: keyof T,
  defaultFilter: string = 'all'
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>(defaultFilter);

  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => {
        return searchKeys.some(key => {
          const value = item[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      });
    }

    // Apply category filter
    if (filter !== 'all' && filterKey) {
      result = result.filter(item => item[filterKey] === filter);
    }

    return result;
  }, [data, searchTerm, filter, searchKeys, filterKey]);

  return {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filteredData,
    clearSearch: () => setSearchTerm(''),
    clearFilters: () => {
      setSearchTerm('');
      setFilter(defaultFilter);
    },
  };
}
