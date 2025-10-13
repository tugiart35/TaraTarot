/**
 * Security Type Definitions
 * Type-safe security utilities
 */

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
}

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  allowed: boolean;
  remainingRequests: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Password strength result
 */
export interface PasswordStrengthResult {
  score: number;
  feedback: string[];
}

/**
 * CSRF token pair
 */
export interface CsrfTokens {
  sessionToken: string;
  requestToken: string;
}

/**
 * Webhook validation result
 */
export interface WebhookValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Security headers configuration
 */
export interface SecurityHeaders {
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'Referrer-Policy': string;
  'Content-Security-Policy': string;
  'Strict-Transport-Security'?: string;
}

/**
 * Sanitization options
 */
export interface SanitizationOptions {
  allowHtml?: boolean;
  maxLength?: number;
  allowSpecialChars?: boolean;
}

/**
 * Input validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Email validation options
 */
export interface EmailValidationOptions {
  allowInternational?: boolean;
  maxLength?: number;
}

/**
 * URL validation options
 */
export interface UrlValidationOptions {
  allowedProtocols?: string[];
  allowedDomains?: string[];
  requireHttps?: boolean;
}

/**
 * Image source validation options
 */
export interface ImageSrcValidationOptions {
  allowData?: boolean;
  allowedDomains?: string[];
  requireHttps?: boolean;
}

/**
 * Rate limit entry for tracking
 */
export interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

/**
 * Security audit result
 */
export interface SecurityAuditResult {
  passed: boolean;
  vulnerabilities: SecurityVulnerability[];
  score: number;
}

/**
 * Security vulnerability details
 */
export interface SecurityVulnerability {
  type: VulnerabilityType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

/**
 * Vulnerability types
 */
export enum VulnerabilityType {
  XSS = 'XSS',
  SQL_INJECTION = 'SQL_INJECTION',
  CSRF = 'CSRF',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  INSECURE_URL = 'INSECURE_URL',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
}

/**
 * Content Security Policy directives
 */
export interface CSPDirectives {
  'default-src'?: string[];
  'script-src'?: string[];
  'style-src'?: string[];
  'img-src'?: string[];
  'font-src'?: string[];
  'connect-src'?: string[];
  'frame-src'?: string[];
  'object-src'?: string[];
  'base-uri'?: string[];
  'form-action'?: string[];
  'frame-ancestors'?: string[];
}

/**
 * Security context for middleware
 */
export interface SecurityContext {
  ip: string;
  userAgent: string;
  referer?: string;
  origin?: string;
  sessionId?: string;
  userId?: string;
}

/**
 * Webhook signature validation input
 */
export interface WebhookSignatureInput {
  payload: string;
  signature: string;
  secret: string;
  algorithm?: 'sha256' | 'sha512';
}

/**
 * HMAC validation result
 */
export interface HmacValidationResult {
  valid: boolean;
  expectedSignature?: string;
  error?: string;
}

/**
 * Security event for logging
 */
export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: number;
  ip: string;
  userId?: string;
  details: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

/**
 * Security event types
 */
export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_CSRF_TOKEN = 'INVALID_CSRF_TOKEN',
  SQL_INJECTION_DETECTED = 'SQL_INJECTION_DETECTED',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  FAILED_LOGIN = 'FAILED_LOGIN',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  WEBHOOK_VALIDATION_FAILED = 'WEBHOOK_VALIDATION_FAILED',
}

/**
 * Input sanitizer function type
 */
export type InputSanitizer = (input: string, options?: SanitizationOptions) => string;

/**
 * Validator function type
 */
export type Validator<T = string> = (input: T, options?: unknown) => ValidationResult;

/**
 * Rate limiter function type
 */
export type RateLimiterFn = (
  identifier: string,
  config: RateLimitConfig
) => RateLimitResult;