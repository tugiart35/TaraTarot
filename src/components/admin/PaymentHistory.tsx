'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Euro,
} from 'lucide-react';

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: 'EUR' | 'TRY';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: string;
  provider_ref: string;
  package_name?: string;
  credits_granted: number;
  created_at: string;
  processed_at?: string;
}

interface PaymentHistoryProps {
  userId: string;
  limit?: number;
}

export default function PaymentHistory({
  userId,
  limit = 20,
}: PaymentHistoryProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filter, setFilter] = useState<
    'all' | 'completed' | 'pending' | 'failed' | 'refunded'
  >('all');

  useEffect(() => {
    fetchPayments();
  }, [userId, filter]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      // Transactions tablosundan ödeme verilerini çek
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'purchase') // Sadece satın alma işlemlerini al
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase error fetching payments:', error);
        throw new Error(
          `Ödeme verileri yüklenirken hata oluştu: ${error.message}`
        );
      }

      // Veriyi formatla
      const formattedPayments = (data || []).map((transaction: any) => ({
        id: transaction.id,
        user_id: transaction.user_id,
        amount: Math.abs(transaction.amount) / 100, // Cent'ten Euro'ya çevir
        currency: 'EUR' as const,
        status: 'completed' as const, // Transactions tablosunda sadece tamamlanan işlemler var
        payment_method: 'Credit Card', // Varsayılan
        provider_ref: transaction.reference_id || transaction.id.slice(0, 12),
        package_name: transaction.description || 'Kredi Paketi',
        credits_granted: Math.abs(transaction.amount),
        created_at: transaction.created_at,
        processed_at: transaction.created_at,
      }));

      // Filter payments based on status
      let filteredPayments = formattedPayments;
      if (filter !== 'all') {
        filteredPayments = formattedPayments.filter(
          (payment: any) => payment.status === filter
        );
      }

      setPayments(filteredPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Mock data yerine boş liste göster
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/20';
      case 'refunded':
        return 'text-blue-400 bg-blue-500/20';
      default:
        return 'text-lavender bg-lavender/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4' />;
      case 'pending':
        return <Clock className='h-4 w-4' />;
      case 'failed':
        return <XCircle className='h-4 w-4' />;
      case 'refunded':
        return <AlertCircle className='h-4 w-4' />;
      default:
        return <CreditCard className='h-4 w-4' />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Beklemede';
      case 'failed':
        return 'Başarısız';
      case 'refunded':
        return 'İade Edildi';
      default:
        return status;
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'EUR':
        return <Euro className='h-4 w-4' />;
      case 'TRY':
        return <span className='text-sm font-bold'>₺</span>;
      default:
        return <DollarSign className='h-4 w-4' />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return '💳';
      case 'paypal':
        return '🅿️';
      case 'bank transfer':
        return '🏦';
      default:
        return '💰';
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4'></div>
        <div className='text-lavender'>Ödeme geçmişi yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Filter and Stats */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-lg font-medium text-gold'>Ödeme Geçmişi</h4>
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-lavender'>Filtrele:</span>
            <select
              value={filter}
              onChange={e =>
                setFilter(
                  e.target.value as
                    | 'all'
                    | 'completed'
                    | 'pending'
                    | 'failed'
                    | 'refunded'
                )
              }
              className='bg-night/50 border border-lavender/30 text-white rounded px-3 py-1 text-sm focus:border-gold focus:outline-none'
            >
              <option value='all'>Tümü</option>
              <option value='completed'>Tamamlandı</option>
              <option value='pending'>Beklemede</option>
              <option value='failed'>Başarısız</option>
              <option value='refunded'>İade Edildi</option>
            </select>
          </div>
        </div>

        <div className='flex items-center space-x-4 text-sm'>
          <div className='flex items-center'>
            <CreditCard className='h-4 w-4 text-blue-400 mr-1' />
            <span className='text-blue-400'>{payments.length} ödeme</span>
          </div>
          <div className='flex items-center'>
            <Euro className='h-4 w-4 text-green-400 mr-1' />
            <span className='text-green-400'>
              {payments
                .filter(p => p.status === 'completed')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}{' '}
              toplam
            </span>
          </div>
        </div>
      </div>

      {/* Payments List */}
      {payments.length === 0 ? (
        <div className='text-center py-12'>
          <Calendar className='h-16 w-16 text-lavender/50 mx-auto mb-4' />
          <p className='text-lavender'>
            Bu filtre için ödeme geçmişi bulunmuyor
          </p>
          <p className='text-lavender/70 text-sm mt-2'>
            Bu kullanıcının henüz hiç ödeme işlemi bulunmuyor
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {payments.map(payment => (
            <div
              key={payment.id}
              className='bg-lavender/5 rounded-lg p-4 border border-lavender/10 hover:bg-lavender/10 transition-colors cursor-pointer'
              onClick={() => setSelectedPayment(payment)}
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>
                    {getPaymentMethodIcon(payment.payment_method)}
                  </span>
                  <div>
                    <h5 className='font-medium text-white'>
                      {payment.package_name}
                    </h5>
                    <p className='text-sm text-lavender'>
                      {payment.payment_method}
                    </p>
                  </div>
                </div>

                <div className='text-right'>
                  <div className='flex items-center justify-end space-x-1 mb-1'>
                    {getCurrencyIcon(payment.currency)}
                    <span className='text-white font-medium'>
                      {payment.amount.toFixed(2)}
                    </span>
                    <span className='text-lavender text-sm'>
                      {payment.currency}
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}
                  >
                    {getStatusIcon(payment.status)}
                    <span className='ml-1'>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm'>
                <div>
                  <span className='text-lavender'>Krediler:</span>
                  <span className='text-gold ml-1 font-medium'>
                    {payment.credits_granted}
                  </span>
                </div>
                <div>
                  <span className='text-lavender'>Referans:</span>
                  <span className='text-white ml-1 font-mono text-xs'>
                    {payment.provider_ref.slice(0, 12)}...
                  </span>
                </div>
                <div>
                  <span className='text-lavender'>Tarih:</span>
                  <span className='text-white ml-1'>
                    {formatDate(payment.created_at)}
                  </span>
                </div>
                {payment.processed_at && (
                  <div>
                    <span className='text-lavender'>İşlendi:</span>
                    <span className='text-white ml-1'>
                      {formatDate(payment.processed_at)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-night border border-gold/30 rounded-lg p-6 w-full max-w-2xl'>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center space-x-3'>
                <span className='text-3xl'>
                  {getPaymentMethodIcon(selectedPayment.payment_method)}
                </span>
                <div>
                  <h3 className='text-xl font-semibold text-gold'>
                    Ödeme Detayları
                  </h3>
                  <p className='text-lavender'>
                    {selectedPayment.package_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className='text-lavender hover:text-white'
              >
                ×
              </button>
            </div>

            {/* Payment Info */}
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-lavender/5 rounded p-3'>
                  <h4 className='font-medium text-gold mb-2'>
                    Ödeme Bilgileri
                  </h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-lavender'>Tutar:</span>
                      <div className='flex items-center'>
                        {getCurrencyIcon(selectedPayment.currency)}
                        <span className='text-white font-medium ml-1'>
                          {selectedPayment.amount.toFixed(2)}{' '}
                          {selectedPayment.currency}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-lavender'>Krediler:</span>
                      <span className='text-gold font-medium'>
                        {selectedPayment.credits_granted}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-lavender'>Yöntem:</span>
                      <span className='text-white'>
                        {selectedPayment.payment_method}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='bg-lavender/5 rounded p-3'>
                  <h4 className='font-medium text-gold mb-2'>İşlem Durumu</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lavender'>Durum:</span>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPayment.status)}`}
                      >
                        {getStatusIcon(selectedPayment.status)}
                        <span className='ml-1'>
                          {getStatusText(selectedPayment.status)}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-lavender'>Referans:</span>
                      <span className='text-white font-mono text-xs'>
                        {selectedPayment.provider_ref}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-lavender'>Tarih:</span>
                      <span className='text-white'>
                        {formatDate(selectedPayment.created_at)}
                      </span>
                    </div>
                    {selectedPayment.processed_at && (
                      <div className='flex justify-between'>
                        <span className='text-lavender'>İşlem Tarihi:</span>
                        <span className='text-white'>
                          {formatDate(selectedPayment.processed_at)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Info based on status */}
              {selectedPayment.status === 'failed' && (
                <div className='bg-red-500/10 border border-red-500/20 rounded p-3'>
                  <h4 className='font-medium text-red-400 mb-2'>
                    Başarısız Ödeme
                  </h4>
                  <p className='text-red-400 text-sm'>
                    Bu ödeme işlemi başarısız olmuştur. Kredi kartı bilgileri
                    veya bakiye yetersizliği nedeniyle işlem
                    gerçekleştirilememiş olabilir.
                  </p>
                </div>
              )}

              {selectedPayment.status === 'pending' && (
                <div className='bg-yellow-500/10 border border-yellow-500/20 rounded p-3'>
                  <h4 className='font-medium text-yellow-400 mb-2'>
                    Bekleyen Ödeme
                  </h4>
                  <p className='text-yellow-400 text-sm'>
                    Bu ödeme işlemi henüz tamamlanmamıştır. Banka havalesi veya
                    diğer ödeme yöntemleri için işlem süreci devam ediyor.
                  </p>
                </div>
              )}

              {selectedPayment.status === 'refunded' && (
                <div className='bg-blue-500/10 border border-blue-500/20 rounded p-3'>
                  <h4 className='font-medium text-blue-400 mb-2'>
                    İade Edildi
                  </h4>
                  <p className='text-blue-400 text-sm'>
                    Bu ödeme iade edilmiştir. İade tutarı orijinal ödeme
                    yönteminize geri yansıtılmıştır.
                  </p>
                </div>
              )}
            </div>

            <div className='flex justify-end mt-6'>
              <button
                onClick={() => setSelectedPayment(null)}
                className='px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded'
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
