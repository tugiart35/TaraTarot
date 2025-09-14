/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/audit-logger.ts: Audit logging (gerekli)
- functions/send-report-email/index.ts: Email Edge Function (gerekli)

Dosyanın amacı:
- Email sistemi yönetimi
- SMTP test fonksiyonları
- Email template yönetimi
- Email gönderim işlemleri

Supabase değişkenleri ve tabloları:
- email_settings: SMTP ayarları
- email_templates: Email şablonları
- email_logs: Email gönderim logları
- admin_audit_logs: Audit logları

Geliştirme önerileri:
- Email template editor
- Bulk email gönderimi
- Email analytics
- Template variables

Tespit edilen hatalar:
- ✅ SMTP test fonksiyonu eklendi
- ✅ Email template CRUD eklendi
- ✅ Email gönderim sistemi eklendi
- ✅ Error handling geliştirildi

Kullanım durumu:
- ✅ Gerekli: Email sistemi yönetimi
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { supabase } from '@/lib/supabase/client';
import { logAdminAction, AuditAction, ResourceType } from '@/lib/audit-logger';

export interface EmailSettings {
  id: string;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_password: string;
  from_email: string;
  from_name: string;
  active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  template_type: string;
  variables: Record<string, any>;
  active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  to_email: string;
  subject: string;
  template_id?: string;
  status: 'sent' | 'failed' | 'pending';
  error_message?: string;
  sent_at?: string;
  created_at: string;
}

export interface CreateEmailSettingsData {
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_password: string;
  from_email: string;
  from_name: string;
  active?: boolean;
}

export interface CreateEmailTemplateData {
  name: string;
  subject: string;
  body: string;
  template_type: string;
  variables?: Record<string, any>;
  active?: boolean;
}

// Email System Manager
export class EmailSystemManager {
  // SMTP ayarlarını getir
  static async getEmailSettings(): Promise<EmailSettings | null> {
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching email settings:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('EmailSystemManager.getEmailSettings error:', error);
      return null;
    }
  }

  // SMTP ayarlarını kaydet
  static async saveEmailSettings(settingsData: CreateEmailSettingsData): Promise<EmailSettings | null> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Mevcut aktif ayarları pasif yap
      await supabase
        .from('email_settings')
        .update({ active: false })
        .eq('active', true);

      // Yeni ayarları kaydet
      const { data, error } = await supabase
        .from('email_settings')
        .insert({
          ...settingsData,
          active: settingsData.active ?? true,
          created_by: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving email settings:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('email_settings_updated' as AuditAction, 'email_settings' as ResourceType, {
        smtpHost: settingsData.smtp_host,
        smtpPort: settingsData.smtp_port,
        fromEmail: settingsData.from_email
      });

      return data;
    } catch (error) {
      console.error('EmailSystemManager.saveEmailSettings error:', error);
      throw error;
    }
  }

  // SMTP bağlantısını test et
  static async testSMTPConnection(settingsData: CreateEmailSettingsData): Promise<{ success: boolean; message: string }> {
    try {
      // Test email gönder
      const testResult = await this.sendTestEmail(settingsData);
      
      if (testResult.success) {
        return { 
          success: true, 
          message: 'SMTP bağlantısı başarılı! Test email gönderildi.' 
        };
      } else {
        return { 
          success: false, 
          message: `SMTP test başarısız: ${testResult.message}` 
        };
      }
    } catch (error) {
      console.error('EmailSystemManager.testSMTPConnection error:', error);
      return { 
        success: false, 
        message: `SMTP test hatası: ${(error as Error).message}` 
      };
    }
  }

  // Test email gönder
  private static async sendTestEmail(settingsData: CreateEmailSettingsData): Promise<{ success: boolean; message: string }> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Test email içeriği
      const testEmail = {
        to: user.email || 'test@example.com',
        subject: 'SMTP Test Email - Busbuskimki Tarot',
        body: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50;">SMTP Test Email</h2>
                <p>Merhaba,</p>
                <p>Bu email SMTP ayarlarınızın doğru çalıştığını test etmek için gönderilmiştir.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="color: #2c3e50; margin-top: 0;">Test Detayları</h3>
                  <ul>
                    <li><strong>SMTP Host:</strong> ${settingsData.smtp_host}</li>
                    <li><strong>SMTP Port:</strong> ${settingsData.smtp_port}</li>
                    <li><strong>Güvenli Bağlantı:</strong> ${settingsData.smtp_secure ? 'Evet' : 'Hayır'}</li>
                    <li><strong>Gönderen:</strong> ${settingsData.from_name} &lt;${settingsData.from_email}&gt;</li>
                    <li><strong>Test Zamanı:</strong> ${new Date().toLocaleString('tr-TR')}</li>
                  </ul>
                </div>
                <p>Eğer bu email'i alabiliyorsanız, SMTP ayarlarınız doğru çalışıyor demektir.</p>
                <p>İyi günler,<br>Busbuskimki Tarot Ekibi</p>
              </div>
            </body>
          </html>
        `
      };

      // Email gönderim Edge Function'ını çağır
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testEmail,
          smtpSettings: settingsData
        })
      });

      if (!response.ok) {
        throw new Error(`Email gönderim hatası: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Email log kaydet
        await supabase
          .from('email_logs')
          .insert({
            to_email: testEmail.to,
            subject: testEmail.subject,
            status: 'sent',
            sent_at: new Date().toISOString()
          });

        return { success: true, message: 'Test email başarıyla gönderildi!' };
      } else {
        throw new Error(result.message || 'Email gönderim başarısız');
      }
    } catch (error) {
      console.error('EmailSystemManager.sendTestEmail error:', error);
      return { 
        success: false, 
        message: `Test email gönderim hatası: ${(error as Error).message}` 
      };
    }
  }

  // Email template'leri getir
  static async getEmailTemplates(): Promise<EmailTemplate[]> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching email templates:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('EmailSystemManager.getEmailTemplates error:', error);
      throw error;
    }
  }

  // Email template oluştur
  static async createEmailTemplate(templateData: CreateEmailTemplateData): Promise<EmailTemplate | null> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          ...templateData,
          active: templateData.active ?? true,
          created_by: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating email template:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('email_template_created' as AuditAction, 'email_templates' as ResourceType, {
        templateName: templateData.name,
        templateType: templateData.template_type
      });

      return data;
    } catch (error) {
      console.error('EmailSystemManager.createEmailTemplate error:', error);
      throw error;
    }
  }

  // Email template güncelle
  static async updateEmailTemplate(id: string, templateData: Partial<CreateEmailTemplateData>): Promise<EmailTemplate | null> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('email_templates')
        .update({
          ...templateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating email template:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('email_template_updated' as AuditAction, 'email_templates' as ResourceType, {
        templateId: id,
        updatedFields: Object.keys(templateData)
      });

      return data;
    } catch (error) {
      console.error('EmailSystemManager.updateEmailTemplate error:', error);
      throw error;
    }
  }

  // Email template sil
  static async deleteEmailTemplate(id: string): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Silmeden önce template bilgilerini al (audit log için)
      const { data: templateData } = await supabase
        .from('email_templates')
        .select('name, template_type')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting email template:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('email_template_deleted' as AuditAction, 'email_templates' as ResourceType, {
        templateId: id,
        templateName: templateData?.name,
        templateType: templateData?.template_type
      });

      return true;
    } catch (error) {
      console.error('EmailSystemManager.deleteEmailTemplate error:', error);
      throw error;
    }
  }

  // Email logları getir
  static async getEmailLogs(limit: number = 50): Promise<EmailLog[]> {
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching email logs:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('EmailSystemManager.getEmailLogs error:', error);
      throw error;
    }
  }

  // Template değişkenlerini işle
  static processTemplateVariables(template: string, variables: Record<string, any>): string {
    let processedTemplate = template;
    
    // {{variable}} formatındaki değişkenleri işle
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedTemplate = processedTemplate.replace(regex, String(value));
    });

    return processedTemplate;
  }

  // Varsayılan email template'leri oluştur
  static async createDefaultTemplates(): Promise<void> {
    try {
      const defaultTemplates = [
        {
          name: 'Hoş Geldin Emaili',
          subject: 'Busbuskimki Tarot\'a Hoş Geldiniz!',
          body: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #2c3e50;">Hoş Geldiniz, {{userName}}!</h2>
                  <p>Busbuskimki Tarot ailesine katıldığınız için teşekkür ederiz.</p>
                  <p>Artık aşağıdaki özelliklerden yararlanabilirsiniz:</p>
                  <ul>
                    <li>🔮 Kişiselleştirilmiş tarot okumaları</li>
                    <li>📊 Numeroloji analizleri</li>
                    <li>💝 Aşk ve ilişki rehberliği</li>
                    <li>🎯 Kariyer ve gelecek planlaması</li>
                  </ul>
                  <p>İyi günler,<br>Busbuskimki Tarot Ekibi</p>
                </div>
              </body>
            </html>
          `,
          template_type: 'welcome',
          variables: { userName: 'Kullanıcı Adı' }
        },
        {
          name: 'Bakım Modu Bildirimi',
          subject: 'Sistem Bakımı - {{maintenanceDate}}',
          body: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #2c3e50;">Sistem Bakımı Bildirimi</h2>
                  <p>Sevgili {{userName}},</p>
                  <p>{{maintenanceDate}} tarihinde sistem bakımı yapılacaktır.</p>
                  <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #856404; margin-top: 0;">Bakım Detayları</h3>
                    <ul>
                      <li><strong>Başlangıç:</strong> {{startTime}}</li>
                      <li><strong>Bitiş:</strong> {{endTime}}</li>
                      <li><strong>Süre:</strong> {{duration}}</li>
                    </ul>
                  </div>
                  <p>Bu süre zarfında hizmetlerimiz geçici olarak kullanılamayacaktır.</p>
                  <p>Anlayışınız için teşekkür ederiz.</p>
                  <p>İyi günler,<br>Busbuskimki Tarot Ekibi</p>
                </div>
              </body>
            </html>
          `,
          template_type: 'maintenance',
          variables: { 
            userName: 'Kullanıcı Adı',
            maintenanceDate: 'Bakım Tarihi',
            startTime: 'Başlangıç Saati',
            endTime: 'Bitiş Saati',
            duration: 'Süre'
          }
        }
      ];

      for (const template of defaultTemplates) {
        await this.createEmailTemplate(template);
      }
    } catch (error) {
      console.error('EmailSystemManager.createDefaultTemplates error:', error);
      throw error;
    }
  }
}
