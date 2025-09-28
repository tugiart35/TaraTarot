/*
info:
Bağlantılı dosyalar:
- @/lib/payment/shopier-config: Shopier konfigürasyonu için (gerekli)
- @/lib/supabase/client: Veritabanı işlemleri için (gerekli)

Dosyanın amacı:
- Shopier webhook endpoint'i
- Ödeme onayı ve kredi yükleme
- Transaction log oluşturma
- Güvenlik doğrulaması

Backend bağlantısı:
- Shopier webhook entegrasyonu
- Ödeme doğrulama ve işleme
- Burada backend'e bağlanılacak - webhook işlemleri

Geliştirme ve öneriler:
- Webhook signature doğrulaması
- Idempotent işlem yönetimi
- Error handling ve logging
- Rate limiting

Hatalar / Geliştirmeye Açık Noktalar:
- Webhook retry mekanizması
- Duplicate payment kontrolü
- Comprehensive logging
- Monitoring ve alerting

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz webhook handling
- Optimizasyon: Efficient database operations
- Yeniden Kullanılabilirlik: Reusable webhook pattern
- Güvenlik: Secure webhook verification
*/

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import {
  verifyShopierWebhook,
  ShopierWebhookData,
} from '@/lib/payment/shopier-config';
import { emailService } from '@/lib/email/email-service';
import { ShopierEmailTemplates } from '@/lib/email/shopier-email-templates';
import {
  extractUserIdFromOrderId,
  extractPackageIdFromOrderId,
  getPackageInfo,
  calculateTotalCredits,
} from '@/lib/payment/payment-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Shopier webhook: Received body:', body);

    const signature = request.headers.get('x-shopier-signature');

    // Test modunda signature kontrolünü atla
    const isTestMode =
      process.env.NODE_ENV === 'development' ||
      body.platform_order_id?.startsWith('TEST_');

    if (!signature && !isTestMode) {
      console.error('Shopier webhook: Missing signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Webhook verilerini parse et
    const webhookData: ShopierWebhookData = {
      orderId: body.platform_order_id || body.orderId,
      status: body.status || body.payment_status,
      amount: parseFloat(body.total_order_value || body.amount),
      currency: body.currency || 'TRY',
      transactionId: body.transaction_id || body.shopier_payment_id,
      signature: signature || '',
      timestamp: body.timestamp || new Date().toISOString(),
      packageId: body.package_id,
      userId: body.user_id,
    };

    // Signature doğrulama (test modunda atla)
    if (
      !isTestMode &&
      signature &&
      !verifyShopierWebhook(webhookData, signature)
    ) {
      console.error('Shopier webhook: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Ödeme durumunu kontrol et ve email bildirimi gönder
    if (webhookData.status !== 'success') {
      console.log(
        'Shopier webhook: Payment not successful',
        webhookData.status
      );

      // Başarısız ödeme için email bildirimi gönder
      try {
        const userId = extractUserIdFromOrderId(webhookData.orderId);
        if (userId) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, email')
            .eq('id', userId)
            .single();

          if (profile) {
            const emailTemplate =
              ShopierEmailTemplates.generatePaymentFailureEmail({
                userEmail: profile.email || 'Bilinmiyor',
                userName: profile.display_name || 'Bilinmiyor',
                orderId: webhookData.orderId,
                status: webhookData.status,
                amount: webhookData.amount,
              });

            const emailData = {
              to: 'busbuskimkionline@gmail.com', // Admin email
              subject: `⚠️ Ödeme Bildirimi - ${webhookData.status} (${webhookData.amount} TL)`,
              html: emailTemplate,
            };

            await emailService.sendEmail(emailData);
            console.log('Payment failure notification email sent');
          }
        }
      } catch (emailError) {
        console.error(
          'Failed to send payment failure notification email:',
          emailError
        );
      }

      return NextResponse.json(
        { message: 'Payment not successful' },
        { status: 200 }
      );
    }

    // Duplicate payment kontrolü
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('id')
      .eq('ref_id', webhookData.orderId)
      .eq('ref_type', 'shopier_payment')
      .single();

    if (existingTransaction) {
      console.log(
        'Shopier webhook: Duplicate payment detected',
        webhookData.orderId
      );
      return NextResponse.json(
        { message: 'Payment already processed' },
        { status: 200 }
      );
    }

    // Kullanıcı ID'sini order ID'den çıkar
    const userId =
      webhookData.userId || extractUserIdFromOrderId(webhookData.orderId);
    if (!userId) {
      console.error('Shopier webhook: User ID not found');
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    // Paket bilgilerini al
    const packageId =
      webhookData.packageId || extractPackageIdFromOrderId(webhookData.orderId);
    console.log(
      'Shopier webhook: Package ID:',
      packageId,
      'Type:',
      typeof packageId
    );
    console.log(
      'Shopier webhook: webhookData.packageId:',
      webhookData.packageId
    );
    console.log('Shopier webhook: body.package_id:', body.package_id);
    if (!packageId) {
      console.error('Shopier webhook: Package ID not found');
      return NextResponse.json(
        { error: 'Package ID not found' },
        { status: 400 }
      );
    }

    // Package bilgilerini al
    const packageData = getPackageInfo(packageId);
    if (!packageData) {
      console.error('Shopier webhook: Package not found:', packageId);
      return NextResponse.json({ error: 'Package not found' }, { status: 400 });
    }

    console.log('Shopier webhook: Using package data:', packageData);

    // Toplam kredi hesapla
    const totalCredits = calculateTotalCredits(packageId);

    // Kullanıcının mevcut kredi bakiyesini ve profil bilgilerini al
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credit_balance, display_name, email')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Shopier webhook: User profile not found', userId);
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 400 }
      );
    }

    // Kredi bakiyesini güncelle
    const newBalance = (profile.credit_balance || 0) + totalCredits;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        credit_balance: newBalance,
      })
      .eq('id', userId);

    if (updateError) {
      console.error(
        'Shopier webhook: Failed to update credit balance',
        updateError
      );
      return NextResponse.json(
        { error: 'Failed to update credit balance' },
        { status: 500 }
      );
    }

    // Transaction log oluştur
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: webhookData.amount,
        delta_credits: totalCredits,
        reason: `${packageData.name} satın alındı (${packageData.credits} kredi${packageData.bonusCredits > 0 ? ` + ${packageData.bonusCredits} bonus` : ''})`,
        ref_type: 'shopier_payment',
        ref_id: webhookData.orderId,
        description: `${packageData.name} - ${totalCredits} kredi - Shopier`,
      });

    if (transactionError) {
      console.error(
        'Shopier webhook: Failed to create transaction log',
        transactionError
      );
      // Transaction log hatası kritik değil, devam et
    }

    console.log('Shopier webhook: Payment processed successfully', {
      orderId: webhookData.orderId,
      userId,
      packageId,
      totalCredits,
      newBalance,
    });

    // Email bildirimi gönder
    try {
      const emailTemplate = ShopierEmailTemplates.generatePaymentSuccessEmail({
        userEmail: profile.email || 'Bilinmiyor',
        userName: profile.display_name || 'Bilinmiyor',
        packageName: packageData.name,
        credits: totalCredits,
        amount: webhookData.amount,
        orderId: webhookData.orderId,
        newBalance: newBalance,
      });

      const emailData = {
        to: 'busbuskimkionline@gmail.com', // Admin email
        subject: `💳 Yeni Ödeme - ${packageData.name} (${totalCredits} kredi)`,
        html: emailTemplate,
      };

      await emailService.sendEmail(emailData);
      console.log('Payment notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send payment notification email:', emailError);
      // Email hatası kritik değil, devam et
    }

    return NextResponse.json(
      {
        message: 'Payment processed successfully',
        orderId: webhookData.orderId,
        credits: totalCredits,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Shopier webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// extractUserIdFromOrderId artık payment-utils'den import ediliyor

// sendPaymentNotificationEmail artık ShopierEmailTemplates kullanıyor

// sendPaymentFailureNotificationEmail artık ShopierEmailTemplates kullanıyor

// getStatusText artık payment-utils'den import ediliyor

// extractPackageIdFromOrderId artık payment-utils'den import ediliyor
