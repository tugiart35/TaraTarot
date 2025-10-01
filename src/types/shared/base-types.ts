/*
 * Base Types - Ortak Type Definition'ları
 *
 * Bu dosya tüm proje için ortak type definition'ları sağlar.
 * DRY principle uygulayarak tekrarlanan type kodlarını önler.
 */

// Base Entity Interface
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

// User Related Types
export interface UserProfile extends BaseEntity {
  user_id: string;
  email: string;
  display_name?: string;
  birth_date?: string;
  phone?: string;
  credit_balance: number;
  is_admin?: boolean;
  is_premium?: boolean;
  subscription_expires_at?: string;
}

// Reading Related Types
export interface TarotReading extends BaseEntity {
  user_id: string;
  reading_type: string;
  cards: string; // JSON string
  interpretation: string;
  questions: string; // JSON string
  status: 'pending' | 'reviewed' | 'completed';
  admin_notes?: string;
  cost_credits: number;
  format?: 'audio' | 'written' | 'simple';
}

// Payment Related Types
export interface PaymentTransaction extends BaseEntity {
  user_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  transaction_id: string;
  package_type?: string;
  credits_purchased?: number;
}

// Admin Related Types
export interface AdminAction extends BaseEntity {
  admin_id: string;
  action_type: string;
  target_type: string;
  target_id: string;
  details: string; // JSON string
  ip_address?: string;
  user_agent?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface BaseFormData {
  [key: string]: any;
}

export interface LoginFormData extends BaseFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData extends BaseFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  birthDate?: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface TarotFormData extends BaseFormData {
  question: string;
  personalInfo: {
    name: string;
    birthDate: string;
    relationshipStatus: string;
  };
}

// Filter Types
export interface BaseFilters {
  search?: string;
  dateRange?: 'week' | 'month' | 'year' | 'all';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ReadingFilters extends BaseFilters {
  type?: 'all' | 'love' | 'general' | 'career' | 'numerology';
  status?: 'pending' | 'reviewed' | 'completed';
  format?: 'audio' | 'written' | 'simple';
}

export interface UserFilters extends BaseFilters {
  isAdmin?: boolean;
  isPremium?: boolean;
  creditRange?: {
    min: number;
    max: number;
  };
}

// Statistics Types
export interface DashboardStats {
  totalReadings: number;
  monthlyReadings: number;
  favoriteSpread: string;
  creditBalance: number;
  recentActivity: any[];
  userLevel: string;
  memberSince: string;
}

export interface AdminStats {
  totalUsers: number;
  totalReadings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeUsers: number;
  newUsers: number;
  popularSpreads: Array<{
    type: string;
    count: number;
  }>;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ValidationError extends AppError {
  field: string;
  value: any;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Theme Types
export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Locale Types
export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
  currency: string;
}

// Export utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Export common type guards
export const TypeGuards = {
  isString: (value: any): value is string => typeof value === 'string',
  isNumber: (value: any): value is number => typeof value === 'number',
  isBoolean: (value: any): value is boolean => typeof value === 'boolean',
  isObject: (value: any): value is object =>
    typeof value === 'object' && value !== null,
  isArray: (value: any): value is any[] => Array.isArray(value),
  isDate: (value: any): value is Date => value instanceof Date,
  isEmail: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  isPhone: (value: string): boolean => /^(\+90|0)?[5][0-9]{9}$/.test(value),
  isUUID: (value: string): boolean =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value
    ),
};
