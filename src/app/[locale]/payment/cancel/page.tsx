// Payment cancel page - handles Shopier payment cancellation

'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { PaymentErrorBoundary } from '@/components/payment/PaymentErrorBoundary';

export default function PaymentCancelPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToPackages = () => {
    router.push('/dashboard/packages');
  };

  return (
    <PaymentErrorBoundary>
      <div className='min-h-screen bg-cosmic-black flex items-center justify-center p-4'>
        <div className='max-w-md w-full'>
          <div className='card p-8 text-center'>
            <div className='mb-6'>
              <XCircle className='h-16 w-16 text-orange-400 mx-auto mb-4' />
              <h1 className='text-2xl font-bold text-text-celestial mb-2'>
                Ödeme İptal Edildi
              </h1>
              <p className='text-text-mystic mb-4'>
                Ödeme işlemi iptal edildi. Kredi paketinizi tekrar satın
                alabilirsiniz.
              </p>
            </div>

            <div className='space-y-3'>
              <button
                onClick={handleGoToPackages}
                className='w-full btn btn-primary flex items-center justify-center space-x-2'
              >
                <CreditCard className='h-4 w-4' />
                <span>Kredi Paketleri</span>
              </button>

              <button
                onClick={handleGoToDashboard}
                className='w-full btn btn-secondary flex items-center justify-center space-x-2'
              >
                <ArrowLeft className='h-4 w-4' />
                <span>Dashboard'a Dön</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PaymentErrorBoundary>
  );
}