'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { TrendingUp, TrendingDown, Clock, CreditCard, Award, RefreshCw } from 'lucide-react';

interface Transaction {
  id: string;
  user_id: string;
  delta_credits: number;
  reason: string;
  ref_type: string;
  ref_id: string | null;
  created_at: string;
}

interface TransactionHistoryProps {
  userId: string;
  limit?: number;
}

export default function TransactionHistory({ userId, limit = 10 }: TransactionHistoryProps) {
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
      
      if (error) throw error;
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (refType: string, deltaCredits: number) => {
    switch (refType) {
      case 'admin_adjustment':
        return deltaCredits > 0 ? 
          <Award className="h-4 w-4 text-gold" /> : 
          <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'package_purchase':
        return <CreditCard className="h-4 w-4 text-green-400" />;
      case 'reading_usage':
        return <TrendingDown className="h-4 w-4 text-blue-400" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-yellow-400" />;
      default:
        return deltaCredits > 0 ? 
          <TrendingUp className="h-4 w-4 text-green-400" /> : 
          <TrendingDown className="h-4 w-4 text-red-400" />;
    }
  };

  const getTransactionTypeText = (refType: string) => {
    switch (refType) {
      case 'admin_adjustment': return 'Admin Düzeltmesi';
      case 'package_purchase': return 'Paket Satın Alımı';
      case 'reading_usage': return 'Okuma Kullanımı';
      case 'refund': return 'İade';
      default: return 'Diğer';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lavender">İşlemler yükleniyor...</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-lavender/50 mx-auto mb-3" />
        <p className="text-lavender">Henüz işlem geçmişi bulunmuyor</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="bg-lavender/5 rounded-lg p-4 border border-lavender/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {getTransactionIcon(transaction.ref_type, transaction.delta_credits)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium">
                    {getTransactionTypeText(transaction.ref_type)}
                  </span>
                  <span className={`text-sm font-medium ${
                    transaction.delta_credits > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.delta_credits > 0 ? '+' : ''}{transaction.delta_credits} kredi
                  </span>
                </div>
                <p className="text-lavender text-sm mb-2">{transaction.reason}</p>
                <div className="flex items-center space-x-4 text-xs text-lavender">
                  <span>{formatDate(transaction.created_at)}</span>
                  {transaction.ref_id && (
                    <span className="font-mono">ID: {transaction.ref_id.slice(0, 8)}...</span>
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
          className="w-full py-2 text-lavender hover:text-gold text-sm"
        >
          Daha fazla göster
        </button>
      )}
    </div>
  );
}
