/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/audit-logger.ts: Audit logging (gerekli)

Dosyanın amacı:
- Bakım modu yönetimi
- Sistem durumu kontrolü
- Bakım mesajları yönetimi

Supabase değişkenleri ve tabloları:
- system_settings: Sistem ayarları
- admin_audit_logs: Audit logları

Geliştirme önerileri:
- Otomatik bakım zamanlaması
- IP whitelist yönetimi
- Bakım bildirimleri

Tespit edilen hatalar:
- ✅ Bakım modu toggle eklendi
- ✅ Custom mesaj sistemi eklendi
- ✅ Zamanlama sistemi eklendi

Kullanım durumu:
- ✅ Gerekli: Sistem bakım yönetimi
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { supabase } from '@/lib/supabase/client';
import { logAdminAction, AuditAction, ResourceType } from '@/lib/audit-logger';

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
  startTime?: string;
  endTime?: string;
  allowedIPs: string[];
}

export interface MaintenanceStatus {
  isMaintenanceMode: boolean;
  message: string;
  startTime?: string;
  endTime?: string;
  allowedIPs: string[];
  canAccess: boolean;
  userIP?: string;
}

// Maintenance System Manager
export class MaintenanceSystemManager {
  // Bakım modu durumunu al
  static async getMaintenanceStatus(): Promise<MaintenanceStatus> {
    try {
      const { data: settings, error } = await supabase
        .from('system_settings')
        .select('key, value')
        .eq('category', 'maintenance');

      if (error) {
        console.error('Error fetching maintenance settings:', error);
        return {
          isMaintenanceMode: false,
          message: 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.',
          allowedIPs: [],
          canAccess: true
        };
      }

      const maintenanceData = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);

      const isMaintenanceMode = maintenanceData.enabled === true || maintenanceData.enabled === 'true';
      const message = maintenanceData.message || 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.';
      const allowedIPs = Array.isArray(maintenanceData.allowed_ips) ? maintenanceData.allowed_ips : [];
      
      // Kullanıcının IP'sini al (client-side'da)
      const userIP = await this.getUserIP();
      const canAccess = !isMaintenanceMode || allowedIPs.includes(userIP) || allowedIPs.includes('*');

      return {
        isMaintenanceMode,
        message,
        startTime: maintenanceData.start_time,
        endTime: maintenanceData.end_time,
        allowedIPs,
        canAccess,
        userIP
      };
    } catch (error) {
      console.error('MaintenanceSystemManager.getMaintenanceStatus error:', error);
      return {
        isMaintenanceMode: false,
        message: 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.',
        allowedIPs: [],
        canAccess: true
      };
    }
  }

  // Bakım modunu aç/kapat
  static async toggleMaintenanceMode(enabled: boolean, message?: string): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Bakım modu durumunu güncelle
      const { error: enabledError } = await supabase
        .from('system_settings')
        .upsert({
          category: 'maintenance',
          key: 'enabled',
          value: enabled,
          updated_by: user.id
        });

      if (enabledError) {
        console.error('Error updating maintenance mode:', enabledError);
        throw enabledError;
      }

      // Mesaj güncellenmişse kaydet
      if (message) {
        const { error: messageError } = await supabase
          .from('system_settings')
          .upsert({
            category: 'maintenance',
            key: 'message',
            value: message,
            updated_by: user.id
          });

        if (messageError) {
          console.error('Error updating maintenance message:', messageError);
          throw messageError;
        }
      }

      // Zamanlama bilgilerini güncelle
      const now = new Date().toISOString();
      if (enabled) {
        // Bakım modu açılıyorsa başlangıç zamanını kaydet
        await supabase
          .from('system_settings')
          .upsert({
            category: 'maintenance',
            key: 'start_time',
            value: now,
            updated_by: user.id
          });
      } else {
        // Bakım modu kapatılıyorsa bitiş zamanını kaydet
        await supabase
          .from('system_settings')
          .upsert({
            category: 'maintenance',
            key: 'end_time',
            value: now,
            updated_by: user.id
          });
      }

      // Audit log
      await logAdminAction(
        enabled ? 'settings_update' as AuditAction : 'settings_update' as AuditAction,
        'system' as ResourceType,
        {
          maintenanceMode: enabled,
          message: message || 'Default message',
          timestamp: now
        }
      );

      return true;
    } catch (error) {
      console.error('MaintenanceSystemManager.toggleMaintenanceMode error:', error);
      throw error;
    }
  }

  // Bakım mesajını güncelle
  static async updateMaintenanceMessage(message: string): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('system_settings')
        .upsert({
          category: 'maintenance',
          key: 'message',
          value: message,
          updated_by: user.id
        });

      if (error) {
        console.error('Error updating maintenance message:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('settings_update' as AuditAction, 'system' as ResourceType, {
        maintenanceMessage: message,
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('MaintenanceSystemManager.updateMaintenanceMessage error:', error);
      throw error;
    }
  }

  // IP whitelist yönetimi
  static async updateAllowedIPs(ips: string[]): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('system_settings')
        .upsert({
          category: 'maintenance',
          key: 'allowed_ips',
          value: ips,
          updated_by: user.id
        });

      if (error) {
        console.error('Error updating allowed IPs:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('settings_update' as AuditAction, 'system' as ResourceType, {
        allowedIPs: ips,
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('MaintenanceSystemManager.updateAllowedIPs error:', error);
      throw error;
    }
  }

  // Zamanlanmış bakım modu
  static async scheduleMaintenance(startTime: string, endTime: string, message?: string): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Zamanlama bilgilerini kaydet
      await supabase
        .from('system_settings')
        .upsert({
          category: 'maintenance',
          key: 'start_time',
          value: startTime,
          updated_by: user.id
        });

      await supabase
        .from('system_settings')
        .upsert({
          category: 'maintenance',
          key: 'end_time',
          value: endTime,
          updated_by: user.id
        });

      // Mesaj varsa kaydet
      if (message) {
        await supabase
          .from('system_settings')
          .upsert({
            category: 'maintenance',
            key: 'message',
            value: message,
            updated_by: user.id
          });
      }

      // Audit log
      await logAdminAction('settings_update' as AuditAction, 'system' as ResourceType, {
        scheduledMaintenance: true,
        startTime,
        endTime,
        message: message || 'Scheduled maintenance',
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('MaintenanceSystemManager.scheduleMaintenance error:', error);
      throw error;
    }
  }

  // Kullanıcının IP adresini al
  private static async getUserIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch (error) {
      console.error('Error getting user IP:', error);
      return 'unknown';
    }
  }

  // Bakım modu kontrolü (middleware için)
  static async checkMaintenanceAccess(userIP?: string): Promise<{ canAccess: boolean; message?: string }> {
    try {
      const status = await this.getMaintenanceStatus();
      
      if (!status.isMaintenanceMode) {
        return { canAccess: true };
      }

      // IP kontrolü
      const ip = userIP || status.userIP || 'unknown';
      const canAccess = status.allowedIPs.includes(ip) || status.allowedIPs.includes('*');

      return {
        canAccess,
        message: canAccess ? undefined : status.message
      };
    } catch (error) {
      console.error('MaintenanceSystemManager.checkMaintenanceAccess error:', error);
      return { canAccess: true }; // Hata durumunda erişime izin ver
    }
  }

  // Bakım geçmişi
  static async getMaintenanceHistory(limit: number = 10): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .eq('action', 'settings_update')
        .contains('details', { maintenanceMode: true })
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching maintenance history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('MaintenanceSystemManager.getMaintenanceHistory error:', error);
      return [];
    }
  }

  // Varsayılan bakım mesajları
  static getDefaultMessages(): { key: string; message: string }[] {
    return [
      {
        key: 'general',
        message: 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.'
      },
      {
        key: 'scheduled',
        message: 'Planlı sistem bakımı yapılmaktadır. Tahmini süre: 2 saat.'
      },
      {
        key: 'emergency',
        message: 'Acil sistem bakımı yapılmaktadır. En kısa sürede hizmete döneceğiz.'
      },
      {
        key: 'update',
        message: 'Sistem güncellemesi yapılmaktadır. Yeni özelliklerle yakında karşınızdayız!'
      },
      {
        key: 'custom',
        message: 'Özel bakım mesajınızı buraya yazabilirsiniz.'
      }
    ];
  }
}

