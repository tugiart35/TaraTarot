/*
info:
Bağlantılı dosyalar:
- @/lib/payment/shopier-config: Shopier konfigürasyonu için (gerekli)
- @/lib/constants/credit-packages: Kredi paketleri için (gerekli)
- @/lib/supabase/client: Veritabanı işlemleri için (gerekli)
- @/hooks/useAuth: Kullanıcı bilgileri için (gerekli)

Dosyanın amacı:
- Shopier ödeme sistemi React hook'u
- Ödeme işlemi yönetimi
- Loading state ve error handling
- Kullanıcı dostu arayüz entegrasyonu

Backend bağlantısı:
- Shopier API entegrasyonu
- Ödeme doğrulama ve işleme
- Burada backend'e bağlanılacak - ödeme işlemleri

Geliştirme ve öneriler:
- React hook pattern kullanımı
- Error boundary entegrasyonu
- Loading state yönetimi
- User feedback sistemi

Hatalar / Geliştirmeye Açık Noktalar:
- Retry mekanizması eklenmeli
- Timeout handling
- Network error recovery
- Payment status polling

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz hook interface
- Optimizasyon: Efficient state management
- Yeniden Kullanılabilirlik: Reusable hook pattern
- Güvenlik: Secure payment processing
*/

'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import {
  createShopierPayment,
  ShopierPaymentRequest,
  ShopierPaymentResponse,
  createTestPayment,
} from '@/lib/payment/shopier-config';
import { supabase } from '@/lib/supabase/client';

interface PackageData {
  name: string;
  credits: number;
  price: number;
  currency: string;
}

export interface UseShopierReturn {
  initiatePayment: (packageId: string, packageData: PackageData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  paymentUrl: string | null;
}

export const useShopier = (): UseShopierReturn => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (packageId: string, packageData: PackageData) => {
      if (!user) {
        setError('Lütfen giriş yapın');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(null);
      setPaymentUrl(null);

      try {
        // Kullanıcı profil bilgilerini al
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('display_name, email')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          throw new Error('Kullanıcı profili bulunamadı');
        }

        // Bonus kredi hesapla
        const bonusCredits =
          packageData.credits >= 500
            ? 100
            : packageData.credits >= 300
              ? 30
              : 0;
        const totalCredits = packageData.credits + bonusCredits;

        // Ödeme isteği oluştur
        const paymentRequest: ShopierPaymentRequest = {
          orderId: `ORDER_${Date.now()}_${user.id}`,
          amount: packageData.price_try,
          currency: 'TRY',
          description: `${packageData.name} - ${totalCredits} kredi`,
          customerEmail: profile.email || user.email || '',
          customerName: profile.display_name || 'Kullanıcı',
          returnUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
          packageId: packageId,
          packageName: packageData.name,
          credits: packageData.credits,
          bonusCredits: bonusCredits,
        };

        // Test modunda test ödeme kullan
        const isTestMode = true; // Test için her zaman test modu
        const finalPaymentRequest = isTestMode
          ? createTestPayment(packageId, user.id)
          : paymentRequest;

        // Shopier ödeme formu oluştur
        const paymentResponse: ShopierPaymentResponse =
          await createShopierPayment(finalPaymentRequest);

        if (paymentResponse.success && paymentResponse.paymentUrl) {
          setPaymentUrl(paymentResponse.paymentUrl);
          setSuccess('Ödeme sayfasına yönlendiriliyorsunuz...');

          // Ödeme sayfasına yönlendir
          window.location.href = paymentResponse.paymentUrl;
        } else {
          throw new Error(
            paymentResponse.error || 'Ödeme formu oluşturulamadı'
          );
        }
      } catch (err) {
        console.error('Shopier payment initiation error:', err);
        setError(
          err instanceof Error ? err.message : 'Ödeme işlemi başlatılamadı'
        );
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    initiatePayment,
    loading,
    error,
    success,
    paymentUrl,
  };
};
