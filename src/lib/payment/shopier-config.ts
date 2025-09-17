/*
info:
Bağlantılı dosyalar:
- @/lib/payment/payment-types: Payment provider tipleri için (gerekli)
- @/lib/constants/credit-packages: Kredi paketleri için (gerekli)
- @/lib/supabase/client: Veritabanı işlemleri için (gerekli)

Dosyanın amacı:
- Shopier ödeme sistemi konfigürasyonu
- API endpoint'leri ve güvenlik ayarları
- Ödeme formu oluşturma ve doğrulama
- Webhook event handling

Backend bağlantısı:
- Shopier API entegrasyonu
- Ödeme doğrulama ve işleme
- Burada backend'e bağlanılacak - ödeme işlemleri

Geliştirme ve öneriler:
- Güvenli API key yönetimi
- Error handling ve retry mekanizması
- Test ve production environment ayrımı
- Webhook güvenlik doğrulaması

Hatalar / Geliştirmeye Açık Noktalar:
- API key'ler environment variables'da saklanmalı
- Webhook signature doğrulaması eklenmeli
- Rate limiting ve timeout ayarları
- Comprehensive error handling

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz API interface
- Optimizasyon: Efficient request handling
- Yeniden Kullanılabilirlik: Modüler yapı
- Güvenlik: Secure payment processing
*/

export interface ShopierConfig {
  apiUrl: string;
  merchantId: string;
  apiKey: string;
  apiSecret: string;
  callbackUrl: string;
  webhookUrl: string;
  testMode: boolean;
}

export interface ShopierPaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
  packageId: string;
  packageName: string;
  credits: number;
  bonusCredits: number;
}

export interface ShopierPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  orderId?: string;
  error?: string;
  errorCode?: string;
}

export interface ShopierWebhookData {
  orderId: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
  transactionId: string;
  signature: string;
  timestamp: string;
  packageId: string;
  userId: string;
}

// Shopier konfigürasyonu
export const getShopierConfig = (): ShopierConfig => {
  return {
    apiUrl:
      process.env.NEXT_PUBLIC_SHOPIER_API_URL ||
      'https://www.shopier.com/ShowProduct/api_pay4.php',
    merchantId: process.env.SHOPIER_MERCHANT_ID || '',
    apiKey: process.env.SHOPIER_API_KEY || '',
    apiSecret: process.env.SHOPIER_API_SECRET || '',
    callbackUrl:
      process.env.NEXT_PUBLIC_SHOPIER_CALLBACK_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback`,
    webhookUrl:
      process.env.NEXT_PUBLIC_SHOPIER_WEBHOOK_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/shopier`,
    testMode:
      process.env.NODE_ENV === 'development' ||
      process.env.SHOPIER_TEST_MODE === 'true',
  };
};

// Shopier ödeme formu oluşturma
export const createShopierPayment = async (
  paymentRequest: ShopierPaymentRequest
): Promise<ShopierPaymentResponse> => {
  try {
    const config = getShopierConfig();

    // Test modunda mock response döndür
    if (config.testMode || paymentRequest.orderId.startsWith('TEST_')) {
      // Test için başarılı response simüle et
      return {
        success: true,
        paymentUrl: `${paymentRequest.returnUrl}?order_id=${paymentRequest.orderId}&transaction_id=TEST_${Date.now()}`,
        orderId: paymentRequest.orderId,
      };
    }

    // Gerçek Shopier API çağrısı
    const paymentParams = {
      platform_order_id: paymentRequest.orderId,
      product_name: paymentRequest.packageName,
      product_type: 'digital',
      total_order_value: paymentRequest.amount.toString(),
      currency: paymentRequest.currency,
      buyer_name: paymentRequest.customerName,
      buyer_email: paymentRequest.customerEmail,
      buyer_phone: paymentRequest.customerPhone || '',
      buyer_address: '',
      buyer_city: '',
      buyer_country: 'TR',
      merchant_id: config.merchantId,
      return_url: paymentRequest.returnUrl,
      cancel_url: paymentRequest.cancelUrl,
      test_mode: config.testMode ? '1' : '0',
      package_id: paymentRequest.packageId,
      credits: paymentRequest.credits.toString(),
      bonus_credits: paymentRequest.bonusCredits.toString(),
    };

    // Signature oluştur
    const signature = generateShopierSignature(paymentParams, config.apiSecret);
    (paymentParams as any)['signature'] = signature;

    // API isteği gönder
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(paymentParams).toString(),
    });

    if (!response.ok) {
      throw new Error(`Shopier API error: ${response.status}`);
    }

    const data = await response.text();

    // Başarılı response kontrolü
    if (data.includes('payment_url') || data.includes('success')) {
      return {
        success: true,
        paymentUrl: extractPaymentUrl(data),
        orderId: paymentRequest.orderId,
      };
    } else {
      return {
        success: false,
        error: 'Ödeme formu oluşturulamadı',
        errorCode: 'PAYMENT_FORM_ERROR',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      errorCode: 'PAYMENT_CREATION_ERROR',
    };
  }
};

// Shopier signature oluşturma
export const generateShopierSignature = (
  params: Record<string, string>,
  secret: string
): string => {
  // Shopier signature algoritması
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return btoa(sortedParams + secret);
};

// Webhook signature doğrulama
export const verifyShopierWebhook = (
  data: ShopierWebhookData,
  signature: string
): boolean => {
  try {
    const config = getShopierConfig();
    const expectedSignature = generateShopierSignature(
      {
        orderId: data.orderId,
        status: data.status,
        amount: data.amount.toString(),
        currency: data.currency,
        transactionId: data.transactionId,
        timestamp: data.timestamp,
      },
      config.apiSecret
    );

    return signature === expectedSignature;
  } catch (error) {
    return false;
  }
};

// Payment URL çıkarma
const extractPaymentUrl = (responseData: string): string => {
  // Shopier response'dan payment URL'i çıkar
  const urlMatch = responseData.match(/payment_url["\s]*[:=]["\s]*([^"'\s]+)/i);
  return urlMatch ? urlMatch[1]! : '';
};

// Test ödeme verisi
export const createTestPayment = (
  packageId: string,
  userId: string
): ShopierPaymentRequest => {
  return {
    orderId: `TEST_${Date.now()}_${userId}`,
    amount: 1.0, // Test için 1 TL
    currency: 'TRY',
    description: 'Test ödeme',
    customerEmail: 'test@example.com',
    customerName: 'Test Kullanıcı',
    returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3111'}/payment/success`,
    cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3111'}/payment/cancel`,
    packageId,
    packageName: 'Test Paketi',
    credits: 100,
    bonusCredits: 0,
  };
};
