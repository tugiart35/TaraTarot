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
  | 'admin_user_created'
  | 'admin_user_updated'
  | 'admin_user_delete'
  | 'admin_user_deleted'
  | 'api_key_created'
  | 'api_key_updated'
  | 'api_key_deleted'
  | 'user_deleted'
  | 'user_banned'
  | 'user_unbanned'
  | 'data_export'
  | 'bulk_operation'
  | 'security_event'
  | 'email_settings_updated'
  | 'email_template_created'
  | 'email_template_updated'
  | 'email_template_deleted';

export type ResourceType =
  | 'user'
  | 'admin'
  | 'admin_users'
  | 'api_keys'
  | 'package'
  | 'order'
  | 'transaction'
  | 'settings'
  | 'system'
  | 'email_settings'
  | 'email_templates';

class AuditLogger {
  private queue: AuditLogEntry[] = [];
  private isFlushingQueue = false;
  private retryCount = 0;
  private maxRetries = 3;

  /**
   * Log an admin action
   */
  async logAction(
    action: AuditAction,
    resourceType: ResourceType,
    data: {
      userId?: string;
      userEmail?: string;
      resourceId?: string;
      oldValues?: Record<string, any>;
      newValues?: Record<string, any>;
      metadata?: Record<string, any>;
      severity?: 'low' | 'medium' | 'high' | 'critical';
      status?: 'success' | 'failure' | 'pending';
    }
  ): Promise<void> {
    try {
      const entry: AuditLogEntry = {
        user_id: data.userId ?? 'system',
        action,
        resource_type: resourceType,
        ip_address: await this.getClientIP(),
        user_agent: this.getUserAgent(),
        timestamp: new Date().toISOString(),
        severity: data.severity || this.getSeverityForAction(action),
        status: data.status || 'success',
      };

      if (data.userEmail !== undefined) {
        entry.user_email = data.userEmail;
      }

      if (data.resourceId !== undefined) {
        entry.resource_id = data.resourceId;
      }

      if (data.oldValues !== undefined) {
        entry.old_values = data.oldValues;
      }

      if (data.newValues !== undefined) {
        entry.new_values = data.newValues;
      }

      if (data.metadata !== undefined) {
        entry.metadata = data.metadata;
      }

      // Store in client-side queue
      this.queue.push(entry);

      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 [AUDIT]', entry);
      }

      // Flush queue to Supabase (async, don't wait)
      this.flushQueue().catch(error => {
        // Fallback: Store in localStorage if Supabase fails
        this.storeInLocalStorage(entry);
        const logContext: {
          action: string;
          resource: string;
          userId?: string;
        } = {
          action: action.toString(),
          resource: resourceType.toString(),
        };
        if (data.userId !== undefined) {
          logContext.userId = data.userId;
        }
        logError('Audit log fallback to localStorage', error, logContext);
      });
    } catch (error) {
      const logContext2: { action: string; resource: string; userId?: string } =
        {
          action: action.toString(),
          resource: resourceType.toString(),
        };
      if (data.userId !== undefined) {
        logContext2.userId = data.userId;
      }
      logError('Failed to create audit log entry', error, logContext2);
    }
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
        error:
          typeof data.error === 'string'
            ? data.error
            : (data.error as any)?.message,
      },
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
        ...data.metadata,
      },
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
  private getSeverityForAction(
    action: AuditAction
  ): 'low' | 'medium' | 'high' | 'critical' {
    const severityMap: Record<
      AuditAction,
      'low' | 'medium' | 'high' | 'critical'
    > = {
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
      admin_user_created: 'critical',
      admin_user_updated: 'critical',
      admin_user_delete: 'critical',
      admin_user_deleted: 'critical',
      data_export: 'high',
      bulk_operation: 'high',
      security_event: 'critical',
      email_settings_updated: 'medium',
      email_template_created: 'medium',
      email_template_updated: 'medium',
      email_template_deleted: 'high',
      api_key_created: 'high',
      api_key_updated: 'high',
      api_key_deleted: 'high',
      user_deleted: 'critical',
      user_banned: 'critical',
      user_unbanned: 'high',
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
   * Validate UUID format
   */
  private isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Store audit log in localStorage as fallback
   */
  private storeInLocalStorage(entry: AuditLogEntry): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Generate unique key for localStorage (not used but kept for future use)
        // const _key = `audit_log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const existingLogs = this.getLocalStorageLogs();
        existingLogs.push(entry);

        // Keep only last 50 logs to prevent localStorage overflow
        if (existingLogs.length > 50) {
          existingLogs.splice(0, existingLogs.length - 50);
        }

        localStorage.setItem(
          'audit_logs_fallback',
          JSON.stringify(existingLogs)
        );

        if (process.env.NODE_ENV === 'development') {
          console.warn('📦 [AUDIT] Stored in localStorage fallback:', entry);
        }
      }
    } catch (error) {
      logError('Failed to store audit log in localStorage', error);
    }
  }

  /**
   * Get audit logs from localStorage
   */
  private getLocalStorageLogs(): AuditLogEntry[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const logs = localStorage.getItem('audit_logs_fallback');
        return logs ? JSON.parse(logs) : [];
      }
    } catch (error) {
      logError('Failed to get audit logs from localStorage', error);
    }
    return [];
  }

  /**
   * Clear localStorage audit logs
   */
  public clearLocalStorageLogs(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('audit_logs_fallback');
        if (process.env.NODE_ENV === 'development') {
          console.log('🧹 [AUDIT] Cleared localStorage fallback logs');
        }
      }
    } catch (error) {
      logError('Failed to clear localStorage audit logs', error);
    }
  }

  /**
   * Retry failed logs from localStorage to Supabase
   */
  public async retryLocalStorageLogs(): Promise<{
    success: boolean;
    retriedCount: number;
  }> {
    try {
      const failedLogs = this.getLocalStorageLogs();
      if (failedLogs.length === 0) {
        return { success: true, retriedCount: 0 };
      }

      // Supabase bağlantısını kontrol et
      const isConnected = await this.checkSupabaseConnection();
      if (!isConnected) {
        return { success: false, retriedCount: 0 };
      }

      // localStorage log'larını Supabase'e gönder
      await this.persistToSupabase(failedLogs);

      // Başarılı olursa localStorage'ı temizle
      this.clearLocalStorageLogs();

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `✅ [AUDIT] Successfully retried ${failedLogs.length} logs from localStorage`
        );
      }

      return { success: true, retriedCount: failedLogs.length };
    } catch (error) {
      logError('Failed to retry localStorage audit logs', error, {
        action: 'audit_log_retry',
        metadata: {
          failedLogsCount: this.getLocalStorageLogs().length,
        },
      });
      return { success: false, retriedCount: 0 };
    }
  }

  /**
   * Flush the audit log queue to Supabase
   */
  private async flushQueue(): Promise<void> {
    if (this.isFlushingQueue || this.queue.length === 0) {
      return;
    }

    this.isFlushingQueue = true;

    try {
      // Supabase'e audit log'ları gönder
      await this.persistToSupabase(this.queue);

      // Başarılı olduktan sonra queue'yu temizle ve retry count'u sıfırla
      this.queue = [];
      this.retryCount = 0;
    } catch (error) {
      // Hata durumunda queue'yu temizleme, tekrar deneme için sakla
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '⚠️ [AUDIT] Failed to flush audit log queue to Supabase:',
          {
            error: error instanceof Error ? error.message : 'Unknown error',
            retryCount: this.retryCount,
            queueLength: this.queue.length,
            errorType:
              error instanceof Error ? error.constructor.name : typeof error,
          }
        );
      }

      this.retryCount++;

      // Çok fazla hata varsa queue'yu localStorage'a kaydet ve temizle
      if (this.queue.length > 100 || this.retryCount > this.maxRetries) {
        console.warn(
          'Audit log queue too large or max retries exceeded, saving to localStorage fallback'
        );

        // Queue'daki log'ları localStorage'a kaydet
        this.queue.forEach(log => {
          this.storeInLocalStorage(log);
        });

        this.queue = [];
        this.retryCount = 0;
      } else {
        // Retry için kısa bir süre bekle
        setTimeout(() => {
          if (this.queue.length > 0) {
            this.flushQueue();
          }
        }, 5000 * this.retryCount); // Exponential backoff
      }
    } finally {
      this.isFlushingQueue = false;
    }
  }

  /**
   * Check Supabase connection status
   */
  private async checkSupabaseConnection(): Promise<boolean> {
    try {
      const { error } = await supabase.from('audit_logs').select('id').limit(1);
      return !error;
    } catch {
      return false;
    }
  }

  /**
   * Persist logs to Supabase
   */
  private async persistToSupabase(logs: AuditLogEntry[]): Promise<void> {
    try {
      // Supabase bağlantısını kontrol et
      const isConnected = await this.checkSupabaseConnection();
      if (!isConnected) {
        throw new Error('Supabase connection not available');
      }
      // Log'ları temizle ve doğrula
      const cleanedLogs = logs.map(log => ({
        user_id: this.isValidUUID(log.user_id)
          ? log.user_id
          : '00000000-0000-0000-0000-000000000000',
        user_email: log.user_email || null,
        action: log.action || 'unknown',
        resource_type: log.resource_type || 'system',
        resource_id: log.resource_id || null,
        old_values: log.old_values || null,
        new_values: log.new_values || null,
        ip_address: log.ip_address || 'unknown',
        user_agent: log.user_agent || 'unknown',
        metadata: log.metadata || {},
        timestamp: log.timestamp || new Date().toISOString(),
        severity: log.severity || 'low',
        status: log.status || 'success',
      }));

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `🔍 [AUDIT] Attempting to insert ${cleanedLogs.length} logs to Supabase`
        );
      }

      // Önce audit_logs tablosunun var olup olmadığını kontrol et
      const { error: tableCheckError } = await supabase
        .from('audit_logs')
        .select('id')
        .limit(1);

      if (tableCheckError && tableCheckError.code === 'PGRST116') {
        if (process.env.NODE_ENV === 'development') {
          console.info(
            'ℹ️ [AUDIT] audit_logs table not found, skipping audit logging'
          );
        }
        return; // Tablo yoksa audit logging'i atla
      }

      const { error } = await supabase.from('audit_logs').insert(cleanedLogs);

      if (error) {
        // Supabase insert error'ını handle et
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ [AUDIT] Supabase audit log insert error:', {
            errorCode: error.code,
            errorMessage: error.message,
            errorHint: error.hint,
            errorDetails: error.details,
            logsCount: cleanedLogs.length,
          });
        }

        // RLS veya permission hatası ise sessizce geç
        if (error.code === 'PGRST301' || error.code === '42501') {
          if (process.env.NODE_ENV === 'development') {
            console.info(
              'ℹ️ [AUDIT] Skipping audit log insert due to permission error'
            );
          }
          return; // Hata fırlatma, sessizce geç
        }

        throw error; // Diğer hatalar için throw et
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `✅ [AUDIT] Successfully persisted ${logs.length} audit logs`
        );
      }
    } catch (error) {
      // Audit log hatalarını sessizce handle et, ana uygulamayı etkilemesin
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ [AUDIT] Failed to persist audit logs to Supabase:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          logsCount: logs.length,
          errorType:
            error instanceof Error ? error.constructor.name : typeof error,
        });
      }

      // Production'da audit log hataları ana uygulamayı etkilememeli
      // throw error; // Bu satırı kaldırdık
    }
  }

  /**
   * Export logs for compliance from Supabase
   */
  async exportLogs(
    format: 'json' | 'csv' = 'json',
    limit: number = 1000
  ): Promise<string> {
    try {
      const logs = await this.getRecentLogs(limit);

      if (format === 'csv') {
        const headers = [
          'timestamp',
          'user_id',
          'action',
          'resource_type',
          'resource_id',
          'severity',
          'status',
        ];
        const csvData = [
          headers.join(','),
          ...logs.map(log =>
            headers
              .map(header =>
                JSON.stringify(log[header as keyof AuditLogEntry] || '')
              )
              .join(',')
          ),
        ].join('\n');
        return csvData;
      }

      return JSON.stringify(logs, null, 2);
    } catch (error) {
      logError('Failed to export audit logs', error);
      return format === 'csv'
        ? 'timestamp,error\n' +
            new Date().toISOString() +
            ',Failed to export logs'
        : '[]';
    }
  }

  /**
   * Clear old audit logs (for maintenance)
   */
  async clearOldLogs(
    daysOld: number = 90
  ): Promise<{ success: boolean; deletedCount?: number }> {
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
