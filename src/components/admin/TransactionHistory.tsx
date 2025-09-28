'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CreditCard,
  Award,
  RefreshCw,
  Volume2,
  FileText,
} from 'lucide-react';

interface Transaction {
  id: string;
  user_id: string;
  type: 'purchase' | 'refund' | 'bonus' | 'deduction' | 'reading';
  amount: number | null;
  delta_credits: number;
  reason?: string;
  description?: string;
  reference_type?: string;
  reference_id?: string;
  created_at: string;
  credits?: number;
  is_audio?: boolean;
}

interface TransactionHistoryProps {
  userId: string;
  limit?: number;
}

export default function TransactionHistory({
  userId,
  limit = 10,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase error fetching transactions:', error);
        throw new Error(
          `İşlem verileri yüklenirken hata oluştu: ${error.message}`
        );
      }

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string, deltaCredits: number) => {
    switch (type) {
      case 'bonus':
        return <Award className='h-4 w-4 text-gold' />;
      case 'purchase':
        return <CreditCard className='h-4 w-4 text-green-400' />;
      case 'reading':
        return <TrendingDown className='h-4 w-4 text-blue-400' />;
      case 'refund':
        return <RefreshCw className='h-4 w-4 text-yellow-400' />;
      case 'deduction':
        return <TrendingDown className='h-4 w-4 text-red-400' />;
      default:
        return deltaCredits > 0 ? (
          <TrendingUp className='h-4 w-4 text-green-400' />
        ) : (
          <TrendingDown className='h-4 w-4 text-red-400' />
        );
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'bonus':
        return 'Bonus';
      case 'purchase':
        return 'Satın Alım';
      case 'reading':
        return 'Okuma Kullanımı';
      case 'refund':
        return 'İade';
      case 'deduction':
        return 'Kesinti';
      default:
        return 'Diğer';
    }
  };

  // Okuma türünü belirle (sesli/yazılı) - reading-credits.ts'deki değerlere göre
  const getReadingType = (transaction: Transaction) => {
    if (transaction.type !== 'reading') {
      return null;
    }

    // Kredi miktarına göre okuma türünü belirle
    const creditAmount = Math.abs(transaction.delta_credits);

    // reading-credits.ts'deki kredi miktarlarına göre
    // Detaylı okumalar (sesli): 80-140 kredi arası
    if (creditAmount >= 80 && creditAmount <= 140) {
      return { type: 'audio', label: 'Sesli' };
    }
    // Yazılı okumalar: 70-130 kredi arası
    else if (creditAmount >= 70 && creditAmount <= 130) {
      return { type: 'written', label: 'Yazılı' };
    }
    // Basit okumalar: 70'den az
    else if (creditAmount < 70) {
      return { type: 'simple', label: 'Basit' };
    }

    // Varsayılan olarak sesli kabul et
    return { type: 'audio', label: 'Sesli' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4'></div>
        <div className='text-lavender'>İşlemler yükleniyor...</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='text-center py-8'>
        <Clock className='h-12 w-12 text-lavender/50 mx-auto mb-3' />
        <p className='text-lavender'>Henüz işlem geçmişi bulunmuyor</p>
        <p className='text-lavender/70 text-sm mt-2'>
          Bu kullanıcının henüz hiç işlemi bulunmuyor
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className='bg-lavender/5 rounded-lg p-4 border border-lavender/10'
        >
          <div className='flex items-start justify-between'>
            <div className='flex items-start space-x-3'>
              <div className='mt-1'>
                {getTransactionIcon(
                  transaction.type,
                  transaction.delta_credits
                )}
              </div>
              <div className='flex-1'>
                <div className='flex items-center space-x-2 mb-1'>
                  <span className='text-white font-medium'>
                    {getTransactionTypeText(transaction.type)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      transaction.delta_credits > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {transaction.delta_credits > 0 ? '+' : ''}
                    {Math.abs(transaction.delta_credits)} kredi
                  </span>
                  {transaction.type === 'reading' &&
                    (() => {
                      const readingType = getReadingType(transaction);
                      if (!readingType) {
                        return null;
                      }

                      return (
                        <div className='flex items-center space-x-1'>
                          {readingType.type === 'audio' ? (
                            <>
                              <Volume2 className='h-3 w-3 text-blue-400' />
                              <span className='text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded'>
                                {readingType.label}
                              </span>
                            </>
                          ) : readingType.type === 'written' ? (
                            <>
                              <FileText className='h-3 w-3 text-green-400' />
                              <span className='text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded'>
                                {readingType.label}
                              </span>
                            </>
                          ) : (
                            <>
                              <FileText className='h-3 w-3 text-gray-400' />
                              <span className='text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded'>
                                {readingType.label}
                              </span>
                            </>
                          )}
                        </div>
                      );
                    })()}
                </div>
                <p className='text-lavender text-sm mb-2'>
                  {transaction.reason ||
                    transaction.description ||
                    'İşlem açıklaması yok'}
                </p>
                <div className='flex items-center space-x-4 text-xs text-lavender'>
                  <span>{formatDate(transaction.created_at)}</span>
                  {transaction.reference_id && (
                    <span className='font-mono'>
                      ID: {transaction.reference_id.slice(0, 8)}...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {transactions.length === limit && (
        <button
          onClick={fetchTransactions}
          className='w-full py-2 text-lavender hover:text-gold text-sm'
        >
          Daha fazla göster
        </button>
      )}
    </div>
  );
}
