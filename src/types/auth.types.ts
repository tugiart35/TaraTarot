/*
 * AUTH TYPES - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/hooks/useAuth.ts (Auth hook)
 * - @/lib/supabase/client.ts (Supabase client)
 * - @supabase/supabase-js (Supabase types)
 *
 * DOSYA AMACI:
 * TypeScript type definitions for authentication system.
 * Includes user roles, subscription types, and security-related types.
 *
 * GÜVENLİK ÖZELLİKLERİ:
 * - Strict type definitions
 * - Role-based access control types
 * - Payment integration types
 * - Audit logging types
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Type safety için
 * - GÜVENLİ: Production-ready
 * - GENİŞLETİLEBİLİR: Yeni özellikler için
 */

import { User } from '@supabase/supabase-js';

// User roles for role-based access control
export type UserRole = 'admin' | 'premium' | 'user' | 'guest';

// Subscription types for payment integration
export type SubscriptionType = 'free' | 'premium' | 'pro' | 'enterprise';

// Subscription status
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'expired' | 'pending';

// Auth state types
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

// Session timeout configuration
export interface SessionConfig {
  timeout: number; // milliseconds
  refreshThreshold: number; // milliseconds before expiry to refresh
  maxRetries: number;
}

// Enhanced user interface with additional metadata
export interface EnhancedUser extends User {
  user_metadata: {
    role?: UserRole;
    subscription?: {
      type: SubscriptionType;
      status: SubscriptionStatus;
      expires_at?: string;
      stripe_customer_id?: string;
    };
    last_login?: string;
    login_count?: number;
    two_factor_enabled?: boolean;
    preferred_language?: string;
    timezone?: string;
  };
}

// Auth context type
export interface AuthContextType {
  user: EnhancedUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  sessionConfig: SessionConfig;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (updates: Partial<EnhancedUser['user_metadata']>) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
  checkPermission: (permission: string) => boolean;
  auditLog: (action: string, details?: Record<string, unknown>) => Promise<void>;
}

// Permission types for role-based access
export type Permission = 
  | 'read:tarot'
  | 'write:tarot'
  | 'read:premium'
  | 'write:premium'
  | 'admin:users'
  | 'admin:settings'
  | 'payment:manage'
  | 'analytics:view';

// Role permissions mapping
export interface RolePermissions {
  [key in UserRole]: Permission[];
}

// Audit log entry
export interface AuditLogEntry {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
  success: boolean;
}

// Rate limiting configuration
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// Security headers configuration
export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

// PWA-specific auth types
export interface PWAAuthConfig {
  offlineSupport: boolean;
  backgroundSync: boolean;
  pushNotifications: boolean;
  secureStorage: boolean;
}

// Error types for better error handling
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Form validation types
export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Social login providers
export type SocialProvider = 'google' | 'facebook' | 'apple' | 'github';

// OAuth configuration
export interface OAuthConfig {
  provider: SocialProvider;
  redirectTo: string;
  scopes?: string[];
}

// Session storage types for PWA
export interface SessionStorage {
  user: EnhancedUser | null;
  sessionToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  lastActivity: number;
}

// Export all types for easy importing
export type {
  User,
  UserRole,
  SubscriptionType,
  SubscriptionStatus,
  AuthState,
  SessionConfig,
  EnhancedUser,
  AuthContextType,
  Permission,
  RolePermissions,
  AuditLogEntry,
  RateLimitConfig,
  SecurityHeaders,
  PWAAuthConfig,
  AuthError,
  AuthFormData,
  AuthFormErrors,
  SocialProvider,
  OAuthConfig,
  SessionStorage,
};
