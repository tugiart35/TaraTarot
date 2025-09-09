'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { X, Coins, TrendingUp, TrendingDown } from 'lucide-react';

interface User {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
}

interface CreditManagementModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

export default function CreditManagementModal({ user, onClose, onUpdate }: CreditManagementModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || amount === 0) {
      setError('Lütfen geçerli bir miktar girin');
      return;
    }
    
    if (!reason.trim()) {
      setError('Lütfen işlem nedeni girin');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const newBalance = user.credit_balance + amount;
      
      if (newBalance < 0) {
        setError('Kredi bakiyesi negatif olamaz');
        setLoading(false);
        return;
      }
      
      // Credit balance güncelle
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          credit_balance: newBalance 
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Transaction log oluştur
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          delta_credits: amount,
          reason: reason.trim(),
          ref_type: 'admin_adjustment',
          ref_id: null
        });
      
      if (transactionError) throw transactionError;
      
      // Parent component'e güncellemeyi bildir
      onUpdate({
        ...user,
        credit_balance: newBalance
      });
      
    } catch (error) {
      console.error('Error updating credits:', error);
      setError('Kredi güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: '+10 Kredi', value: 10, color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' },
    { label: '+50 Kredi', value: 50, color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' },
    { label: '+100 Kredi', value: 100, color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' },
    { label: '-10 Kredi', value: -10, color: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: '-50 Kredi', value: -50, color: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: 'Sıfırla', value: -user.credit_balance, color: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gold">
            Kredi Yönetimi
          </h3>
          <button
            onClick={onClose}
            className="text-lavender hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* User Info */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="h-12 w-12 bg-gold rounded-full flex items-center justify-center">
              <span className="text-night font-bold text-lg">
                {user.display_name?.[0] || user.email[0].toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h4 className="text-white font-medium">{user.display_name || 'İsimsiz Kullanıcı'}</h4>
              <p className="text-lavender text-sm">{user.email}</p>
            </div>
          </div>
          
          <div className="bg-gold/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-lavender">Mevcut Bakiye</span>
              <div className="flex items-center">
                <Coins className="h-5 w-5 text-gold mr-2" />
                <span className="text-2xl font-bold text-gold">{user.credit_balance}</span>
                <span className="text-lavender ml-1">kredi</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h4 className="text-lavender text-sm font-medium mb-3">Hızlı İşlemler</h4>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setAmount(action.value);
                  if (action.value > 0) {
                    setReason('Bonus kredi');
                  } else if (action.value === -user.credit_balance) {
                    setReason('Kredi sıfırlama');
                  } else {
                    setReason('Manuel düzeltme');
                  }
                }}
                className={`p-2 rounded text-xs font-medium transition-colors ${action.color}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-lavender mb-2">
              Kredi Değişikliği
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                placeholder="Pozitif veya negatif değer"
                className="w-full p-3 pl-10 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
              />
              {amount > 0 ? (
                <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-green-400" />
              ) : amount < 0 ? (
                <TrendingDown className="absolute left-3 top-3 h-5 w-5 text-red-400" />
              ) : (
                <Coins className="absolute left-3 top-3 h-5 w-5 text-lavender" />
              )}
            </div>
            <p className="text-xs text-lavender mt-1">
              Yeni bakiye: <span className="text-gold font-medium">{user.credit_balance + amount}</span> kredi
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-lavender mb-2">
              İşlem Nedeni
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Örn: Bonus, İade, Manuel düzeltme"
              className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
            />
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-lavender/30 text-lavender rounded hover:bg-lavender/10"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading || amount === 0 || !reason.trim()}
              className="px-4 py-2 bg-gold hover:bg-gold/90 text-night rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Güncelleniyor...' : 'Krediyi Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
