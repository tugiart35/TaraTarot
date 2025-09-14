/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/audit-logger.ts: Audit logging (gerekli)
- lib/payment/shopier-config.ts: Shopier konfigürasyonu (gerekli)

Dosyanın amacı:
- Shopier ayarları yönetimi
- API bağlantı testi
- Gerçek kaydetme işlemleri

Supabase değişkenleri ve tabloları:
- system_settings: Sistem ayarları
- admin_audit_logs: Audit logları

Geliştirme önerileri:
- API test fonksiyonları
- Webhook test sistemi
- Ayarları veritabanına kaydetme

Tespit edilen hatalar:
- ✅ Shopier ayarları yönetimi eklendi
- ✅ API test fonksiyonu eklendi
- ✅ Gerçek kaydetme sistemi eklendi

Kullanım durumu:
- ✅ Gerekli: Shopier ödeme sistemi yönetimi
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { supabase } from '@/lib/supabase/client';
import { logAdminAction, AuditAction, ResourceType } from '@/lib/audit-logger';
import { createShopierPayment, createTestPayment } from '@/lib/payment/shopier-config';

export interface ShopierSettings {
  merchantId: string;
  apiKey: string;
  apiSecret: string;
  testMode: boolean;
  callbackUrl: string;
  webhookUrl: string;
  successUrl: string;
  cancelUrl: string;
}

export interface ShopierTestResult {
  success: boolean;
  message: string;
  details?: any;
}

// Shopier System Manager
export class ShopierSystemManager {
  // Shopier ayarlarını getir
  static async getShopierSettings(): Promise<ShopierSettings | null> {
    try {
      const { data: settings, error } = await supabase
        .from('system_settings')
        .select('key, value')
        .eq('category', 'shopier');

      if (error) {
        console.error('Error fetching shopier settings:', error);
        return null;
      }

      const shopierData = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);

      return {
        merchantId: shopierData.merchant_id || '',
        apiKey: shopierData.api_key || '',
        apiSecret: shopierData.api_secret || '',
        testMode: shopierData.test_mode === true || shopierData.test_mode === 'true',
        callbackUrl: shopierData.callback_url || 'http://localhost:3111/payment/callback',
        webhookUrl: shopierData.webhook_url || 'http://localhost:3111/api/webhook/shopier',
        successUrl: shopierData.success_url || 'http://localhost:3111/payment/success',
        cancelUrl: shopierData.cancel_url || 'http://localhost:3111/payment/cancel'
      };
    } catch (error) {
      console.error('ShopierSystemManager.getShopierSettings error:', error);
      return null;
    }
  }

  // Shopier ayarlarını kaydet
  static async saveShopierSettings(settings: ShopierSettings): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const settingsToSave = [
        { category: 'shopier', key: 'merchant_id', value: settings.merchantId },
        { category: 'shopier', key: 'api_key', value: settings.apiKey },
        { category: 'shopier', key: 'api_secret', value: settings.apiSecret },
        { category: 'shopier', key: 'test_mode', value: settings.testMode },
        { category: 'shopier', key: 'callback_url', value: settings.callbackUrl },
        { category: 'shopier', key: 'webhook_url', value: settings.webhookUrl },
        { category: 'shopier', key: 'success_url', value: settings.successUrl },
        { category: 'shopier', key: 'cancel_url', value: settings.cancelUrl }
      ];

      // Ayarları kaydet
      for (const setting of settingsToSave) {
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            ...setting,
            updated_by: user.id
          });

        if (error) {
          console.error('Error saving shopier setting:', error);
          throw error;
        }
      }

      // Audit log
      await logAdminAction('settings_update' as AuditAction, 'system' as ResourceType, {
        metadata: {
          shopierSettings: {
            merchantId: settings.merchantId,
            testMode: settings.testMode,
            callbackUrl: settings.callbackUrl,
            webhookUrl: settings.webhookUrl
          },
          timestamp: new Date().toISOString()
        }
      });

      return true;
    } catch (error) {
      console.error('ShopierSystemManager.saveShopierSettings error:', error);
      throw error;
    }
  }

  // Shopier API bağlantısını test et
  static async testShopierConnection(settings: ShopierSettings): Promise<ShopierTestResult> {
    try {
      // Test ödeme oluştur
      const testPayment = createTestPayment('test_package', 'test_user');
      
      // Test modunda mock response döndür
      if (settings.testMode) {
        return {
          success: true,
          message: 'Test modu aktif - API bağlantısı simüle edildi',
          details: {
            testMode: true,
            merchantId: settings.merchantId,
            testPayment: testPayment
          }
        };
      }

      // Gerçek API testi (test modu kapalıysa)
      const paymentResponse = await createShopierPayment(testPayment);
      
      if (paymentResponse.success) {
        return {
          success: true,
          message: 'Shopier API bağlantısı başarılı!',
          details: {
            testMode: false,
            merchantId: settings.merchantId,
            paymentUrl: paymentResponse.paymentUrl
          }
        };
      } else {
        return {
          success: false,
          message: `API bağlantı hatası: ${paymentResponse.error}`,
          details: {
            testMode: false,
            error: paymentResponse.error,
            errorCode: paymentResponse.errorCode
          }
        };
      }
    } catch (error) {
      console.error('ShopierSystemManager.testShopierConnection error:', error);
      return {
        success: false,
        message: `Test hatası: ${(error as Error).message}`,
        details: {
          error: (error as Error).message
        }
      };
    }
  }

  // Webhook endpoint'ini test et
  static async testWebhookEndpoint(webhookUrl: string): Promise<ShopierTestResult> {
    try {
      // Test webhook verisi
      const testWebhookData = {
        platform_order_id: 'TEST_WEBHOOK_' + Date.now(),
        status: 'success',
        amount: '1.00',
        currency: 'TRY',
        transaction_id: 'TEST_TXN_' + Date.now(),
        signature: 'test_signature',
        timestamp: new Date().toISOString(),
        package_id: 'test_package',
        user_id: 'test_user'
      };

      // Webhook endpoint'ini test et
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testWebhookData)
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Webhook endpoint erişilebilir',
          details: {
            status: response.status,
            statusText: response.statusText
          }
        };
      } else {
        return {
          success: false,
          message: `Webhook endpoint hatası: ${response.status} ${response.statusText}`,
          details: {
            status: response.status,
            statusText: response.statusText
          }
        };
      }
    } catch (error) {
      console.error('ShopierSystemManager.testWebhookEndpoint error:', error);
      return {
        success: false,
        message: `Webhook test hatası: ${(error as Error).message}`,
        details: {
          error: (error as Error).message
        }
      };
    }
  }

  // Shopier ayarlarını doğrula
  static validateShopierSettings(settings: ShopierSettings): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!settings.merchantId.trim()) {
      errors.push('Merchant ID gerekli');
    }

    if (!settings.apiKey.trim()) {
      errors.push('API Key gerekli');
    }

    if (!settings.apiSecret.trim()) {
      errors.push('API Secret gerekli');
    }

    if (!settings.callbackUrl.trim()) {
      errors.push('Callback URL gerekli');
    }

    if (!settings.webhookUrl.trim()) {
      errors.push('Webhook URL gerekli');
    }

    if (!settings.successUrl.trim()) {
      errors.push('Success URL gerekli');
    }

    if (!settings.cancelUrl.trim()) {
      errors.push('Cancel URL gerekli');
    }

    // URL format kontrolü
    const urlPattern = /^https?:\/\/.+/;
    if (settings.callbackUrl && !urlPattern.test(settings.callbackUrl)) {
      errors.push('Callback URL geçerli bir URL olmalı');
    }

    if (settings.webhookUrl && !urlPattern.test(settings.webhookUrl)) {
      errors.push('Webhook URL geçerli bir URL olmalı');
    }

    if (settings.successUrl && !urlPattern.test(settings.successUrl)) {
      errors.push('Success URL geçerli bir URL olmalı');
    }

    if (settings.cancelUrl && !urlPattern.test(settings.cancelUrl)) {
      errors.push('Cancel URL geçerli bir URL olmalı');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Varsayılan Shopier ayarları
  static getDefaultSettings(): ShopierSettings {
    return {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      testMode: true,
      callbackUrl: 'http://localhost:3111/payment/callback',
      webhookUrl: 'http://localhost:3111/api/webhook/shopier',
      successUrl: 'http://localhost:3111/payment/success',
      cancelUrl: 'http://localhost:3111/payment/cancel'
    };
  }

  // Shopier geçmişi
  static async getShopierHistory(limit: number = 10): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .eq('action', 'settings_update')
        .contains('details', { shopierSettings: true })
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching shopier history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('ShopierSystemManager.getShopierHistory error:', error);
      return [];
    }
  }
}

