/*
 * EMAIL NOTIFICATIONS - EDGE FUNCTION
 *
 * Bu fonksiyon email bildirimlerini işler:
 * - Okuma tamamlandı bildirimleri
 * - Kredi bitti uyarıları
 * - Hoş geldin emailleri
 */

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;

// Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Email template interface
interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Notification types
type NotificationType =
  | 'reading_completed'
  | 'low_credits'
  | 'welcome'
  | 'package_purchased';

/**
 * Generate email template
 */
function generateEmailTemplate(
  type: NotificationType,
  data: any
): EmailTemplate {
  switch (type) {
    case 'reading_completed':
      return {
        subject: 'Tarot Okumanız Hazır! 🔮',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B5CF6;">🔮 Tarot Okumanız Hazır!</h2>
            <p>Merhaba ${data.displayName},</p>
            <p>${data.readingTitle} okumanız tamamlandı ve sonuçlarınızı görüntüleyebilirsiniz.</p>
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151;">Okuma Detayları:</h3>
              <p><strong>Okuma Türü:</strong> ${data.readingType}</p>
              <p><strong>Başlık:</strong> ${data.readingTitle}</p>
              <p><strong>Kullanılan Kredi:</strong> ${data.creditsUsed}</p>
            </div>
            <a href="${data.readingUrl}" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Okumayı Görüntüle</a>
            <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
              Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.
            </p>
          </div>
        `,
        text: `
          Tarot Okumanız Hazır!
          
          Merhaba ${data.displayName},
          
          ${data.readingTitle} okumanız tamamlandı ve sonuçlarınızı görüntüleyebilirsiniz.
          
          Okuma Detayları:
          - Okuma Türü: ${data.readingType}
          - Başlık: ${data.readingTitle}
          - Kullanılan Kredi: ${data.creditsUsed}
          
          Okumayı görüntülemek için: ${data.readingUrl}
        `,
      };

    case 'low_credits':
      return {
        subject: 'Kredi Bakiyeniz Düşük! 💳',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #F59E0B;">💳 Kredi Bakiyeniz Düşük!</h2>
            <p>Merhaba ${data.displayName},</p>
            <p>Kredi bakiyeniz ${data.creditBalance} krediye düştü. Yeni okumalar yapabilmek için kredi paketi satın almanız gerekiyor.</p>
            <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400E;">Mevcut Kredi Paketleri:</h3>
              <p><strong>Başlangıç Paketi:</strong> 100 kredi - 29.99₺</p>
              <p><strong>Popüler Paket:</strong> 300 kredi + %10 bonus - 79.99₺</p>
              <p><strong>Premium Paket:</strong> 500 kredi + %20 bonus - 119.99₺</p>
            </div>
            <a href="${data.packagesUrl}" style="background-color: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Kredi Paketi Satın Al</a>
          </div>
        `,
        text: `
          Kredi Bakiyeniz Düşük!
          
          Merhaba ${data.displayName},
          
          Kredi bakiyeniz ${data.creditBalance} krediye düştü. Yeni okumalar yapabilmek için kredi paketi satın almanız gerekiyor.
          
          Mevcut Kredi Paketleri:
          - Başlangıç Paketi: 100 kredi - 29.99₺
          - Popüler Paket: 300 kredi + %10 bonus - 79.99₺
          - Premium Paket: 500 kredi + %20 bonus - 119.99₺
          
          Kredi paketi satın almak için: ${data.packagesUrl}
        `,
      };

    case 'welcome':
      return {
        subject: 'Tarot Uygulamasına Hoş Geldiniz! 🌟',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B5CF6;">🌟 Hoş Geldiniz!</h2>
            <p>Merhaba ${data.displayName},</p>
            <p>BüşbüşkimkiTarot uygulamasına kaydolduğunuz için teşekkürler! Size ${data.initialCredits} ücretsiz kredi hediye ettik.</p>
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151;">Başlamak için:</h3>
              <ol>
                <li>Uygulamaya giriş yapın</li>
                <li>İlk tarot okumanızı yapın</li>
                <li>Sonuçlarınızı keşfedin</li>
              </ol>
            </div>
            <a href="${data.appUrl}" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Uygulamaya Git</a>
          </div>
        `,
        text: `
          Hoş Geldiniz!
          
          Merhaba ${data.displayName},
          
          Tarot uygulamasına kaydolduğunuz için teşekkürler! Size ${data.initialCredits} ücretsiz kredi hediye ettik.
          
          Başlamak için:
          1. Uygulamaya giriş yapın
          2. İlk tarot okumanızı yapın
          3. Sonuçlarınızı keşfedin
          
          Uygulamaya gitmek için: ${data.appUrl}
        `,
      };

    case 'package_purchased':
      return {
        subject: 'Kredi Paketiniz Aktif Edildi! ✅',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10B981;">✅ Kredi Paketiniz Aktif Edildi!</h2>
            <p>Merhaba ${data.displayName},</p>
            <p>${data.packageName} paketini başarıyla satın aldınız ve ${data.totalCredits} kredi hesabınıza yüklendi!</p>
            <div style="background-color: #D1FAE5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #065F46;">Paket Detayları:</h3>
              <p><strong>Paket:</strong> ${data.packageName}</p>
              <p><strong>Ana Kredi:</strong> ${data.baseCredits}</p>
              <p><strong>Bonus Kredi:</strong> ${data.bonusCredits}</p>
              <p><strong>Toplam Kredi:</strong> ${data.totalCredits}</p>
              <p><strong>Yeni Bakiye:</strong> ${data.newBalance}</p>
            </div>
            <a href="${data.appUrl}" style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Okuma Yap</a>
          </div>
        `,
        text: `
          Kredi Paketiniz Aktif Edildi!
          
          Merhaba ${data.displayName},
          
          ${data.packageName} paketini başarıyla satın aldınız ve ${data.totalCredits} kredi hesabınıza yüklendi!
          
          Paket Detayları:
          - Paket: ${data.packageName}
          - Ana Kredi: ${data.baseCredits}
          - Bonus Kredi: ${data.bonusCredits}
          - Toplam Kredi: ${data.totalCredits}
          - Yeni Bakiye: ${data.newBalance}
          
          Okuma yapmak için: ${data.appUrl}
        `,
      };

    default:
      throw new Error(`Unknown notification type: ${type}`);
  }
}

/**
 * Send email using Resend
 */
async function sendEmail(
  to: string,
  template: EmailTemplate
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tarot Uygulaması <noreply@tarot.app>',
        to: [to],
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return false;
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.id);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send reading completed notification
 */
async function sendReadingCompletedNotification(
  userId: string,
  readingId: string
): Promise<boolean> {
  try {
    // Get user and reading data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, display_name')
      .eq('user_id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Error fetching profile:', profileError);
      return false;
    }

    const { data: reading, error: readingError } = await supabase
      .from('readings')
      .select('title, reading_type, cost_credits')
      .eq('id', readingId)
      .single();

    if (readingError || !reading) {
      console.error('Error fetching reading:', readingError);
      return false;
    }

    // Generate email template
    const template = generateEmailTemplate('reading_completed', {
      displayName: profile.display_name,
      readingTitle: reading.title,
      readingType: reading.reading_type,
      creditsUsed: reading.cost_credits,
      readingUrl: `${Deno.env.get('APP_URL')}/readings/${readingId}`,
    });

    // Send email
    const success = await sendEmail(profile.email, template);

    if (success) {
      // Log the notification
      await supabase.rpc('log_audit_event', {
        p_user_id: userId,
        p_action: 'email_notification_sent',
        p_resource_type: 'reading',
        p_resource_id: readingId,
        p_details: { type: 'reading_completed', email: profile.email },
      });
    }

    return success;
  } catch (error) {
    console.error('Error sending reading completed notification:', error);
    return false;
  }
}

/**
 * Send low credits warning
 */
async function sendLowCreditsWarning(userId: string): Promise<boolean> {
  try {
    // Get user data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, display_name, credit_balance')
      .eq('user_id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Error fetching profile:', profileError);
      return false;
    }

    // Generate email template
    const template = generateEmailTemplate('low_credits', {
      displayName: profile.display_name,
      creditBalance: profile.credit_balance,
      packagesUrl: `${Deno.env.get('APP_URL')}/packages`,
    });

    // Send email
    const success = await sendEmail(profile.email, template);

    if (success) {
      // Log the notification
      await supabase.rpc('log_audit_event', {
        p_user_id: userId,
        p_action: 'email_notification_sent',
        p_resource_type: 'profile',
        p_resource_id: userId,
        p_details: { type: 'low_credits', email: profile.email },
      });
    }

    return success;
  } catch (error) {
    console.error('Error sending low credits warning:', error);
    return false;
  }
}

/**
 * Main handler function
 */
Deno.serve(async (req: Request) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const { type, userId, data } = await req.json();

    let success = false;

    switch (type) {
      case 'reading_completed':
        success = await sendReadingCompletedNotification(
          userId,
          data.readingId
        );
        break;

      case 'low_credits':
        success = await sendLowCreditsWarning(userId);
        break;

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown notification type' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (success) {
      return new Response(
        JSON.stringify({ message: 'Notification sent successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to send notification' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Notification handler error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
