// Payment success page - handles Shopier payment completion

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase/client';
import { CheckCircle, ArrowRight, CreditCard } from 'lucide-react';
import { PaymentErrorBoundary } from '@/components/payment/PaymentErrorBoundary';

export default function PaymentSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'pending' | 'error'
  >('pending');
  const [creditsAdded, setCreditsAdded] = useState(0);
  const [packageName, setPackageName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    checkPaymentStatus();
  }, [user, router]);

  // Input validation for order_id
  const validateOrderId = (orderId: string | null): boolean => {
    return orderId !== null && /^[a-zA-Z0-9-_]+$/.test(orderId);
  };

  const checkPaymentStatus = async () => {
    try {
      const orderId = searchParams.get('order_id');

      if (!orderId || !validateOrderId(orderId)) {
        console.error('Invalid order_id parameter:', orderId);
        setPaymentStatus('error');
        setLoading(false);
        return;
      }

      // Transaction log'dan ödeme durumunu kontrol et
      const { data: transaction, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('ref_id', orderId)
        .eq('ref_type', 'shopier_payment')
        .single();

      if (error || !transaction) {
        // Ödeme henüz işlenmemiş, biraz bekle
        setTimeout(checkPaymentStatus, 2000);
        return;
      }

      if (transaction.delta_credits > 0) {
        setPaymentStatus('success');
        setCreditsAdded(transaction.delta_credits);
        setPackageName(transaction.description || 'Kredi Paketi');
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Payment status check error:', error);
      setPaymentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-cosmic-black flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4'></div>
          <p className='text-text-celestial'>
            Ödeme durumu kontrol ediliyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PaymentErrorBoundary>
      <div className='min-h-screen bg-cosmic-black flex items-center justify-center p-4'>
        <div className='max-w-md w-full'>
          <div className='card p-8 text-center'>
            {paymentStatus === 'success' ? (
              <>
                <div className='mb-6'>
                  <CheckCircle className='h-16 w-16 text-green-400 mx-auto mb-4' />
                  <h1 className='text-2xl font-bold text-text-celestial mb-2'>
                    Ödeme Başarılı!
                  </h1>
                  <p className='text-text-mystic mb-4'>
                    {packageName} başarıyla satın alındı
                  </p>
                </div>

                <div className='bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6'>
                  <div className='flex items-center justify-center space-x-2 mb-2'>
                    <CreditCard className='h-6 w-6 text-green-400' />
                    <span className='text-green-400 font-bold'>
                      +{creditsAdded} Kredi
                    </span>
                  </div>
                  <p className='text-sm text-text-muted'>
                    Krediler hesabınıza eklendi
                  </p>
                </div>

                <button
                  onClick={handleGoToDashboard}
                  className='w-full btn btn-primary flex items-center justify-center space-x-2'
                >
                  <span>Dashboard'a Git</span>
                  <ArrowRight className='h-4 w-4' />
                </button>
              </>
            ) : (
              <>
                <div className='mb-6'>
                  <div className='h-16 w-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-red-400 text-2xl'>!</span>
                  </div>
                  <h1 className='text-2xl font-bold text-text-celestial mb-2'>
                    Ödeme Hatası
                  </h1>
                  <p className='text-text-mystic mb-4'>
                    Ödeme işlemi tamamlanamadı
                  </p>
                </div>

                <button
                  onClick={handleGoToDashboard}
                  className='w-full btn btn-secondary'
                >
                  Dashboard'a Dön
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </PaymentErrorBoundary>
  );
}
