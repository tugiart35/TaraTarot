/*
 * Common Helpers - Ortak Utility Function'ları
 *
 * Bu dosya tüm proje için ortak utility function'ları sağlar.
 * DRY principle uygulayarak tekrarlanan utility kodlarını önler.
 */

// Date Utilities
export const DateUtils = {
  formatDate: (
    date: string | Date,
    format: 'short' | 'long' | 'time' = 'short'
  ): string => {
    const d = new Date(date);
    let options: Intl.DateTimeFormatOptions;
    
    switch (format) {
      case 'short':
        options = { year: 'numeric', month: 'short', day: 'numeric' };
        break;
      case 'long':
        options = { year: 'numeric', month: 'long', day: 'numeric' };
        break;
      case 'time':
        options = { hour: '2-digit', minute: '2-digit' };
        break;
      default:
        options = { year: 'numeric', month: 'short', day: 'numeric' };
    }
    
    return d.toLocaleDateString('tr-TR', options);
  },

  formatRelativeTime: (date: string | Date): string => {
    const now = new Date();
    const target = new Date(date);
    const diffMs = now.getTime() - target.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} gün önce`;
    } else if (diffHours > 0) {
      return `${diffHours} saat önce`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} dakika önce`;
    } else {
      return 'Az önce';
    }
  },

  getAge: (birthDate: string | Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  },

  isToday: (date: string | Date): boolean => {
    const today = new Date();
    const target = new Date(date);
    return today.toDateString() === target.toDateString();
  },

  isThisWeek: (date: string | Date): boolean => {
    const today = new Date();
    const target = new Date(date);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return target >= weekAgo && target <= today;
  },

  isThisMonth: (date: string | Date): boolean => {
    const today = new Date();
    const target = new Date(date);
    return (
      today.getMonth() === target.getMonth() &&
      today.getFullYear() === target.getFullYear()
    );
  },
};

// String Utilities
export const StringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  capitalizeWords: (str: string): string => {
    return str
      .split(' ')
      .map(word => StringUtils.capitalize(word))
      .join(' ');
  },

  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length - suffix.length) + suffix;
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  removeHtml: (str: string): string => {
    return str.replace(/<[^>]*>/g, '');
  },

  extractEmails: (str: string): string[] => {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
    return str.match(emailRegex) || [];
  },

  extractPhones: (str: string): string[] => {
    const phoneRegex = /(\+90|0)?[5][0-9]{9}/g;
    return str.match(phoneRegex) || [];
  },
};

// Number Utilities
export const NumberUtils = {
  formatCurrency: (amount: number, currency: string = 'TRY'): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  formatNumber: (num: number, decimals: number = 0): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  },

  formatPercentage: (value: number, total: number): string => {
    const percentage = (value / total) * 100;
    return `${NumberUtils.formatNumber(percentage, 1)}%`;
  },

  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },

  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  round: (value: number, decimals: number = 0): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
};

// Array Utilities
export const ArrayUtils = {
  unique: <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  groupBy: <T, K extends string | number>(
    arr: T[],
    key: (item: T) => K
  ): Record<K, T[]> => {
    return arr.reduce(
      (groups, item) => {
        const groupKey = key(item);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<K, T[]>
    );
  },

  sortBy: <T>(
    arr: T[],
    key: (item: T) => any,
    order: 'asc' | 'desc' = 'asc'
  ): T[] => {
    return [...arr].sort((a, b) => {
      const aVal = key(a);
      const bVal = key(b);
      if (aVal < bVal) {
        return order === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  },

  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      if (shuffled[j] !== undefined && temp !== undefined) {
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
    }
    return shuffled;
  },
};

// Object Utilities
export const ObjectUtils = {
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  deepMerge: <T extends Record<string, any>>(
    target: T,
    source: Partial<T>
  ): T => {
    const result = { ...target };
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        result[key] = ObjectUtils.deepMerge(target[key] || ({} as any), source[key]);
      } else if (source[key] !== undefined) {
        result[key] = source[key];
      }
    }
    return result;
  },

  pick: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  isEmpty: (obj: any): boolean => {
    if (obj == null) {
      return true;
    }
    if (Array.isArray(obj) || typeof obj === 'string') {
      return obj.length === 0;
    }
    if (typeof obj === 'object') {
      return Object.keys(obj).length === 0;
    }
    return false;
  },
};

// Validation Utilities
export const ValidationUtils = {
  isEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isPhone: (phone: string): boolean => {
    return /^(\+90|0)?[5][0-9]{9}$/.test(phone);
  },

  isURL: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isUUID: (uuid: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      uuid
    );
  },

  isStrongPassword: (password: string): boolean => {
    return (
      password.length >= 8 &&
      /(?=.*[a-z])/.test(password) &&
      /(?=.*[A-Z])/.test(password) &&
      /(?=.*\d)/.test(password)
    );
  },
};

// Storage Utilities
export const StorageUtils = {
  setItem: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },

  getItem: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return defaultValue || null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

// Export all utilities as a single object
export const CommonHelpers = {
  DateUtils,
  StringUtils,
  NumberUtils,
  ArrayUtils,
  ObjectUtils,
  ValidationUtils,
  StorageUtils,
};
