/*
 * AUDIT TYPES - PRODUCTION-READY
 *
 * BAĞLANTILI DOSYALAR:
 * - @/lib/security/audit-logger.ts (Audit logger implementation)
 * - @/types/auth.types.ts (Auth types)
 *
 * DOSYA AMACI:
 * Audit logging sistemi için type definitions.
 * Circular dependency resolution için types ayrıldı.
 *
 * KULLANIM DURUMU:
 * - GEREKLİ: Type safety için
 * - GÜVENLİ: Production-ready
 * - SCALABLE: Enterprise-ready
 */

import type { AuditLogEntry } from '@/types/auth.types';

// Audit log levels
export type AuditLogLevel = 'info' | 'warning' | 'error' | 'critical';

// Audit log categories
export type AuditLogCategory =
  | 'authentication'
  | 'authorization'
  | 'data_access'
  | 'data_modification'
  | 'system'
  | 'security'
  | 'payment'
  | 'user_management';

// Enhanced audit log entry
export interface EnhancedAuditLogEntry extends Omit<AuditLogEntry, 'id'> {
  level: AuditLogLevel;
  category: AuditLogCategory;
  source: string; // 'web', 'mobile', 'api', 'admin'
  session_id?: string;
  request_id?: string;
  user_agent?: string;
  ip_address?: string;
  country?: string;
  device_info?: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
  };
  risk_score?: number; // 0-100
  tags?: string[];
  correlation_id?: string;
  parent_event_id?: string;
  duration_ms?: number;
  memory_usage?: number;
  cpu_usage?: number;
  network_latency?: number;
  error_details?: {
    code: string;
    message: string;
    stack?: string;
    context?: Record<string, unknown>;
  };
  performance_metrics?: {
    response_time: number;
    database_query_time?: number;
    cache_hit_rate?: number;
    memory_peak?: number;
  };
  security_context?: {
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    attack_vector?: string;
    mitigation_applied?: string[];
    false_positive?: boolean;
  };
  compliance_flags?: {
    gdpr_relevant: boolean;
    pci_dss_relevant: boolean;
    sox_relevant: boolean;
    hipaa_relevant: boolean;
  };
  data_classification?: {
    sensitivity: 'public' | 'internal' | 'confidential' | 'restricted';
    data_types: string[];
    pii_detected: boolean;
    retention_period: number; // days
  };
}

// Audit log context
export interface AuditLogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  source: string;
  category: AuditLogCategory;
  level: AuditLogLevel;
  tags?: string[];
  correlationId?: string;
  parentEventId?: string;
}

// Audit log filter
export interface AuditLogFilter {
  userId?: string;
  category?: AuditLogCategory;
  level?: AuditLogLevel;
  source?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  riskScoreMin?: number;
  riskScoreMax?: number;
  limit?: number;
  offset?: number;
}

// Audit log aggregation
export interface AuditLogAggregation {
  totalEvents: number;
  eventsByCategory: Record<AuditLogCategory, number>;
  eventsByLevel: Record<AuditLogLevel, number>;
  eventsBySource: Record<string, number>;
  averageRiskScore: number;
  topUsers: Array<{
    userId: string;
    eventCount: number;
  }>;
  topIPs: Array<{
    ipAddress: string;
    eventCount: number;
  }>;
  timeRange: {
    start: string;
    end: string;
  };
}

// Audit log export
export interface AuditLogExport {
  format: 'json' | 'csv' | 'xlsx';
  filter: AuditLogFilter;
  includeMetadata: boolean;
  compression: boolean;
}

// Audit log retention policy
export interface AuditLogRetentionPolicy {
  category: AuditLogCategory;
  level: AuditLogLevel;
  retentionDays: number;
  archiveAfterDays: number;
  deleteAfterDays: number;
}

// Audit log alert
export interface AuditLogAlert {
  id: string;
  name: string;
  description: string;
  conditions: {
    category?: AuditLogCategory;
    level?: AuditLogLevel;
    riskScoreMin?: number;
    tags?: string[];
    timeWindow: number; // minutes
    threshold: number; // event count
  };
  actions: {
    email?: string[];
    webhook?: string;
    slack?: string;
    sms?: string[];
  };
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Audit log dashboard
export interface AuditLogDashboard {
  realTimeEvents: EnhancedAuditLogEntry[];
  summary: {
    totalEvents: number;
    eventsLast24h: number;
    eventsLast7d: number;
    eventsLast30d: number;
    averageRiskScore: number;
    topCategories: Array<{
      category: AuditLogCategory;
      count: number;
    }>;
    topSources: Array<{
      source: string;
      count: number;
    }>;
  };
  alerts: AuditLogAlert[];
  recentAlerts: Array<{
    alertId: string;
    triggeredAt: string;
    eventCount: number;
    severity: AuditLogLevel;
  }>;
}
