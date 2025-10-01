/*
 * Admin Types
 *
 * Bu dosya admin paneli için ortak type tanımlarını içerir.
 * DRY principle uygulayarak duplicate interface'leri önler.
 */

export interface AdminUser {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
  created_at: string;
  last_sign_in_at: string | null;
  status?: string;
  is_admin?: boolean;
}

export interface AdminReading {
  id: string;
  user_id: string;
  spread_type: string;
  spread_name: string;
  cards_drawn: string[];
  interpretation: string;
  cost_credits: number;
  rating?: number;
  feedback?: string;
  created_at: string;
  user_email?: string;
}

export interface AdminPayment {
  id: string;
  user_id: string;
  amount: number;
  currency: 'EUR' | 'TRY';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: string;
  provider_ref: string;
  package_name?: string;
  credits_granted: number;
  created_at: string;
  processed_at?: string;
}

export interface AdminTransaction {
  id: string;
  user_id: string;
  type: 'purchase' | 'refund' | 'bonus' | 'deduction' | 'reading';
  amount: number | null;
  delta_credits: number;
  reason?: string;
  description?: string;
  reference_type?: string;
  reference_id?: string;
  created_at: string;
  credits?: number;
  is_audio?: boolean;
}

export interface AdminReportSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reportType: 'revenue' | 'users' | 'transactions' | 'comprehensive';
  recipients: string[];
  lastRun: string | null;
  nextRun: string;
  active: boolean;
  format: 'pdf' | 'excel' | 'email';
}

export interface AdminGeneratedReport {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  status: 'completed' | 'failed' | 'processing';
  fileUrl?: string;
}

export interface AdminSpread {
  id: string;
  name: string;
  description: string;
  positions: AdminSpreadPosition[];
  created_at: string;
  updated_at: string;
}

export interface AdminSpreadPosition {
  id: string;
  position: number;
  name: string;
  description: string;
  description_en?: string;
  description_sr?: string;
}

export interface AdminEmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content: string;
  template_type: 'welcome' | 'payment' | 'reading' | 'notification';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

// Filter types
export type ReadingFilter =
  | 'all'
  | 'tarot'
  | 'numerology'
  | 'love'
  | 'career'
  | 'general';
export type PaymentFilter =
  | 'all'
  | 'completed'
  | 'pending'
  | 'failed'
  | 'refunded';
export type TransactionFilter =
  | 'all'
  | 'purchase'
  | 'refund'
  | 'bonus'
  | 'deduction'
  | 'reading';

// Component props types
export interface AdminDataTableProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  limit?: number;
}

export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface AdminFilterProps<T> {
  filter: T;
  setFilter: (filter: T) => void;
  options: Array<{ value: T; label: string }>;
}

// Hook return types
export interface AdminDataHookReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface AdminFilterHookReturn<T> {
  filter: T[keyof T] | string;
  setFilter: (filter: T[keyof T] | string) => void;
  filteredData: T[];
}

// Error types
export interface AdminError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Performance monitoring types
export interface AdminPerformanceMetrics {
  componentName: string;
  renderTime: number;
  dataFetchTime: number;
  memoryUsage: number;
  timestamp: string;
}
