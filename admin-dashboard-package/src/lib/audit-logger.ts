/**
 * Audit Logging System
 * Tracks all critical admin actions for security and compliance
 */

import { supabase } from './supabase/client';
import { logError } from './logger';

export interface AuditLogEntry {
  id?: string;
  user_id: string;
  user_email?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failure' | 'pending';
}

export type AuditAction = 
  | 'admin_login'
  | 'admin_logout'
  | 'user_status_change'
  | 'user_credit_update'
  | 'package_create'
  | 'package_update'
  | 'package_delete'
  | 'order_status_change'
  | 'order_refund'
  | 'settings_update'
  | 'admin_user_create'
  | 'admin_user_delete'
  | 'data_export'
  | 'bulk_operation'
  | 'security_event';

export type ResourceType = 
  | 'user'
  | 'admin'
  | 'package'
  | 'order'
  | 'transaction'
  | 'settings'
  | 'system';

class AuditLogger {
  private queue: AuditLogEntry[] = [];
  private isFlushingQueue = false;

  /**
   * Log an admin action
   */
  async logAction(
    action: AuditAction,
    resourceType: ResourceType,
    data: {
      userId: string;
      userEmail?: string;
      resourceId?: string;
      oldValues?: Record<string, any>;
      newValues?: Record<string, any>;
      metadata?: Record<string, any>;
      severity?: 'low' | 'medium' | 'high' | 'critical';
      status?: 'success' | 'failure' | 'pending';
    }
  ): Promise<void> {
    const entry: AuditLogEntry = {
      user_id: data.userId,
      user_email: data.userEmail,
      action,
      resource_type: resourceType,
      resource_id: data.resourceId,
      old_values: data.oldValues,
      new_values: data.newValues,
      ip_address: await this.getClientIP(),
      user_agent: this.getUserAgent(),
      metadata: data.metadata,
      timestamp: new Date().toISOString(),
      severity: data.severity || this.getSeverityForAction(action),
      status: data.status || 'success'
    };

    // Store in client-side queue
    this.queue.push(entry);

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [AUDIT]', entry);
    }

    // Flush queue to Supabase
    this.flushQueue();
  }

  /**
   * Log a failed action attempt
   */
  async logFailure(
    action: AuditAction,
    resourceType: ResourceType,
    data: {
      userId: string;
      userEmail?: string;
      error: unknown;
      metadata?: Record<string, unknown>;
    }
  ): Promise<void> {
    await this.logAction(action, resourceType, {
      ...data,
      status: 'failure',
      severity: 'high',
      metadata: {
        ...data.metadata,
        error: typeof data.error === 'string' ? data.error : data.error?.message
      }
    });
  }

  /**
   * Log a security event
   */
  async logSecurityEvent(
    event: string,
    data: {
      userId?: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      metadata?: Record<string, unknown>;
    }
  ): Promise<void> {
    await this.logAction('security_event', 'system', {
      userId: data.userId || 'system',
      severity: data.severity,
      metadata: {
        event,
        ...data.metadata
      }
    });
  }

  /**
   * Get audit logs from Supabase (for admin interface)
   */
  async getRecentLogs(limit: number = 100): Promise<AuditLogEntry[]> {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        logError('Failed to fetch audit logs from Supabase', error);
        return [];
      }

      return data || [];
    } catch (error) {
      logError('Failed to fetch audit logs', error);
      return [];
    }
  }

  /**
   * Filter logs by criteria from Supabase
   */
  async filterLogs(criteria: {
    userId?: string;
    action?: AuditAction;
    resourceType?: ResourceType;
    severity?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
  }): Promise<AuditLogEntry[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (criteria.userId) {
        query = query.eq('user_id', criteria.userId);
      }
      if (criteria.action) {
        query = query.eq('action', criteria.action);
      }
      if (criteria.resourceType) {
        query = query.eq('resource_type', criteria.resourceType);
      }
      if (criteria.severity) {
        query = query.eq('severity', criteria.severity);
      }
      if (criteria.dateFrom) {
        query = query.gte('timestamp', criteria.dateFrom.toISOString());
      }
      if (criteria.dateTo) {
        query = query.lte('timestamp', criteria.dateTo.toISOString());
      }

      query = query.limit(criteria.limit || 100);

      const { data, error } = await query;

      if (error) {
        logError('Failed to filter audit logs', error);
        return [];
      }

      return data || [];
    } catch (error) {
      logError('Failed to filter audit logs', error);
      return [];
    }
  }

  /**
   * Get severity level for action
   */
  private getSeverityForAction(action: AuditAction): 'low' | 'medium' | 'high' | 'critical' {
    const severityMap: Record<AuditAction, 'low' | 'medium' | 'high' | 'critical'> = {
      admin_login: 'medium',
      admin_logout: 'low',
      user_status_change: 'high',
      user_credit_update: 'high',
      package_create: 'medium',
      package_update: 'medium',
      package_delete: 'high',
      order_status_change: 'medium',
      order_refund: 'high',
      settings_update: 'high',
      admin_user_create: 'critical',
      admin_user_delete: 'critical',
      data_export: 'high',
      bulk_operation: 'high',
      security_event: 'critical'
    };

    return severityMap[action] || 'medium';
  }

  /**
   * Get client IP address
   */
  private async getClientIP(): Promise<string> {
    try {
      // Client-side IP detection is limited for security reasons
      // Bu production'da server-side yapılmalı
      const response = await fetch('https://ipapi.co/ip/');
      const ip = await response.text();
      return ip.trim();
    } catch {
      return 'unknown';
    }
  }

  /**
   * Get user agent
   */
  private getUserAgent(): string {
    if (typeof window !== 'undefined') {
      return window.navigator.userAgent;
    }
    return 'unknown';
  }

  /**
   * Flush the audit log queue to Supabase
   */
  private async flushQueue(): Promise<void> {
    if (this.isFlushingQueue || this.queue.length === 0) return;
    
    this.isFlushingQueue = true;

    try {
      // Supabase'e audit log'ları gönder
      await this.persistToSupabase(this.queue);
      
      // Başarılı olduktan sonra queue'yu temizle
      this.queue = [];
    } catch (error) {
      logError('Failed to flush audit log queue to Supabase', error);
    } finally {
      this.isFlushingQueue = false;
    }
  }

  /**
   * Persist logs to Supabase
   */
  private async persistToSupabase(logs: AuditLogEntry[]): Promise<void> {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert(logs.map(log => ({
          user_id: log.user_id,
          user_email: log.user_email,
          action: log.action,
          resource_type: log.resource_type,
          resource_id: log.resource_id,
          old_values: log.old_values,
          new_values: log.new_values,
          ip_address: log.ip_address,
          user_agent: log.user_agent,
          metadata: log.metadata,
          timestamp: log.timestamp,
          severity: log.severity,
          status: log.status
        })));

      if (error) {
        throw error;
      }
    } catch (error) {
      logError('Failed to persist audit logs to Supabase', error);
      throw error;
    }
  }

  /**
   * Export logs for compliance from Supabase
   */
  async exportLogs(format: 'json' | 'csv' = 'json', limit: number = 1000): Promise<string> {
    try {
      const logs = await this.getRecentLogs(limit);

      if (format === 'csv') {
        const headers = ['timestamp', 'user_id', 'action', 'resource_type', 'resource_id', 'severity', 'status'];
        const csvData = [
          headers.join(','),
          ...logs.map(log => 
            headers.map(header => JSON.stringify(log[header as keyof AuditLogEntry] || '')).join(',')
          )
        ].join('\n');
        return csvData;
      }

      return JSON.stringify(logs, null, 2);
    } catch (error) {
      logError('Failed to export audit logs', error);
      return format === 'csv' ? 'timestamp,error\n' + new Date().toISOString() + ',Failed to export logs' : '[]';
    }
  }

  /**
   * Clear old audit logs (for maintenance)
   */
  async clearOldLogs(daysOld: number = 90): Promise<{ success: boolean; deletedCount?: number }> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { data, error } = await supabase
        .from('audit_logs')
        .delete()
        .lt('timestamp', cutoffDate.toISOString())
        .select('id');

      if (error) {
        logError('Failed to clear old audit logs', error);
        return { success: false };
      }

      return { success: true, deletedCount: data?.length || 0 };
    } catch (error) {
      logError('Failed to clear old audit logs', error);
      return { success: false };
    }
  }
}

// Global audit logger instance
export const auditLogger = new AuditLogger();

// Convenience functions
export const logAdminAction = (
  action: AuditAction,
  resourceType: ResourceType,
  data: Parameters<typeof auditLogger.logAction>[2]
) => auditLogger.logAction(action, resourceType, data);

export const logAuditFailure = (
  action: AuditAction,
  resourceType: ResourceType,
  data: Parameters<typeof auditLogger.logFailure>[2]
) => auditLogger.logFailure(action, resourceType, data);

export const logSecurityEvent = (
  event: string,
  data: Parameters<typeof auditLogger.logSecurityEvent>[1]
) => auditLogger.logSecurityEvent(event, data);
