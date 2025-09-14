/*
 * PAYMENT TYPES - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/types/auth.types.ts (Auth types)
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/lib/supabase/client.ts (Supabase client)
 *
 * DOSYA AMACI:
 * Payment sistemi için TypeScript type definitions.
 * Stripe, PayPal ve diğer payment provider'lar için type safety.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Secure payment data types
 * - PCI compliance considerations
 * - Subscription management types
 * - Role-based payment access
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Payment sistemi için
 * - GÜVENLİ: Production-ready
 * - GENİŞLETİLEBİLİR: Yeni payment provider'lar için
 */

import type { SubscriptionType, SubscriptionStatus } from '@/types/auth.types';

// Payment providers
export type PaymentProvider = 'stripe' | 'paypal' | 'apple_pay' | 'google_pay' | 'shopier';

// Payment methods
export type PaymentMethod = 'card' | 'bank_transfer' | 'wallet' | 'crypto';

// Currency codes (ISO 4217)
export type Currency = 'USD' | 'EUR' | 'TRY' | 'GBP' | 'JPY';

// Payment status
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'canceled'
  | 'refunded'
  | 'partially_refunded';

// Subscription billing intervals
export type BillingInterval = 'day' | 'week' | 'month' | 'year';

// Payment intent types
export type PaymentIntentType = 'subscription' | 'one_time' | 'setup';

// Enhanced subscription interface
export interface PaymentSubscription {
  id: string;
  user_id: string;
  provider: PaymentProvider;
  provider_subscription_id: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  billing_interval: BillingInterval;
  amount: number;
  currency: Currency;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Payment method interface
export interface PaymentMethodData {
  id: string;
  user_id: string;
  provider: PaymentProvider;
  provider_payment_method_id: string;
  type: PaymentMethod;
  is_default: boolean;
  card_last_four?: string;
  card_brand?: string;
  card_exp_month?: number;
  card_exp_year?: number;
  billing_details: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Payment transaction interface
export interface PaymentTransaction {
  id: string;
  user_id: string;
  subscription_id?: string;
  provider: PaymentProvider;
  provider_transaction_id: string;
  type: PaymentIntentType;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  description: string;
  metadata: Record<string, unknown>;
  failure_reason?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

// Pricing tier interface
export interface PricingTier {
  id: string;
  name: string;
  type: SubscriptionType;
  description: string;
  price: number;
  currency: Currency;
  billing_interval: BillingInterval;
  features: string[];
  limits: {
    tarot_readings_per_month?: number;
    premium_features?: boolean;
    priority_support?: boolean;
    analytics_access?: boolean;
  };
  is_popular?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Payment form data
export interface PaymentFormData {
  email: string;
  name: string;
  payment_method: PaymentMethod;
  billing_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  save_payment_method?: boolean;
  coupon_code?: string;
}

// Payment form errors
export interface PaymentFormErrors {
  email?: string;
  name?: string;
  payment_method?: string;
  billing_address?: {
    line1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  coupon_code?: string;
  general?: string;
}

// Stripe specific types
export interface StripeConfig {
  publishable_key: string;
  webhook_secret: string;
  price_ids: {
    [key in SubscriptionType]: string;
  };
}

// PayPal specific types
export interface PayPalConfig {
  client_id: string;
  client_secret: string;
  environment: 'sandbox' | 'production';
  plan_ids: {
    [key in SubscriptionType]: string;
  };
}

// Payment provider configuration
export interface PaymentConfig {
  stripe?: StripeConfig;
  paypal?: PayPalConfig;
  default_currency: Currency;
  supported_currencies: Currency[];
  webhook_endpoints: {
    stripe?: string;
    paypal?: string;
  };
}

// Webhook event types
export type WebhookEventType = 
  | 'payment.succeeded'
  | 'payment.failed'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.canceled'
  | 'subscription.payment_succeeded'
  | 'subscription.payment_failed'
  | 'customer.created'
  | 'customer.updated'
  | 'payment_method.attached'
  | 'payment_method.detached';

// Webhook event interface
export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  provider: PaymentProvider;
  data: Record<string, unknown>;
  processed: boolean;
  created_at: string;
}

// Payment analytics interface
export interface PaymentAnalytics {
  total_revenue: number;
  monthly_recurring_revenue: number;
  churn_rate: number;
  conversion_rate: number;
  average_revenue_per_user: number;
  subscription_count: {
    [key in SubscriptionType]: number;
  };
  payment_method_distribution: {
    [key in PaymentMethod]: number;
  };
  currency_distribution: {
    [key in Currency]: number;
  };
}

// Role-based payment permissions
export interface PaymentPermissions {
  can_view_pricing: boolean;
  can_subscribe: boolean;
  can_manage_subscription: boolean;
  can_view_payment_history: boolean;
  can_download_invoices: boolean;
  can_request_refund: boolean;
  can_manage_payment_methods: boolean;
  can_view_analytics: boolean;
  can_manage_pricing: boolean;
  can_process_refunds: boolean;
}

// Payment context interface
export interface PaymentContextType {
  // User payment data
  subscription: PaymentSubscription | null;
  paymentMethods: PaymentMethodData[];
  transactions: PaymentTransaction[];
  
  // Pricing data
  pricingTiers: PricingTier[];
  
  // Payment operations
  createSubscription: (tierId: string, paymentData: PaymentFormData) => Promise<boolean>;
  updateSubscription: (subscriptionId: string, updates: Partial<PaymentSubscription>) => Promise<boolean>;
  cancelSubscription: (subscriptionId: string) => Promise<boolean>;
  addPaymentMethod: (paymentData: PaymentFormData) => Promise<boolean>;
  removePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  
  // Utility functions
  getPaymentPermissions: () => PaymentPermissions;
  canAccessFeature: (feature: string) => boolean;
  getRemainingUsage: (feature: string) => number;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

// Payment hook return type
export interface UsePaymentReturn extends PaymentContextType {
  // Additional hook-specific methods
  refreshPaymentData: () => Promise<void>;
  validateCoupon: (code: string) => Promise<{ valid: boolean; discount?: number }>;
  calculatePrice: (tierId: string, couponCode?: string) => Promise<number>;
}

// All types are already exported inline above
