/*
 * DOSYA: Kullanıcı Detay Modal Bileşeni
 * AMAÇ: Admin panelinde kullanıcı detaylarını görüntüleme ve yönetme modal'ı
 * BAĞLANTILI DOSYALAR: 
 *   - /components/admin/TransactionHistory.tsx (işlem geçmişi)
 *   - /components/admin/ReadingHistory.tsx (okuma geçmişi)
 *   - /components/admin/PaymentHistory.tsx (ödeme geçmişi)
 *   - /lib/supabase/client.ts (veritabanı bağlantısı)
 * SUPABASE TABLOLARI: 
 *   - profiles (kullanıcı bilgileri)
 *   - transactions (işlem geçmişi)
 *   - readings (okuma geçmişi)
 * GELİŞTİRME ÖNERİLERİ:
 *   - Kullanıcı notları ekleme özelliği
 *   - Toplu işlem yapma seçenekleri
 *   - Kullanıcı aktivite grafikleri
 *   - Export/print özellikleri
 * TESPİT EDİLEN HATALAR: 
 *   - ReadingHistory ve PaymentHistory mock data kullanıyordu (düzeltildi)
 *   - Supabase bağlantıları eksikti (düzeltildi)
 * KULLANIM DURUMU: Aktif - admin kullanıcı detay görüntüleme için
 * DEPLOY DURUMU: Hazır - production'a deploy edilebilir
 */

'use client';

import { useState } from 'react';
import { X, Eye, CreditCard, UserCheck, UserX, Clock, Award } from 'lucide-react';
import TransactionHistory from './TransactionHistory';
import ReadingHistory from './ReadingHistory';
import PaymentHistory from './PaymentHistory';

interface User {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
  created_at: string;
  last_sign_in_at: string | null;
  status?: string;
}

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
  onEditCredit: () => void;
  onStatusChange: (userId: string, status: string) => void;
}

export default function UserDetailModal({ user, onClose, onEditCredit, onStatusChange }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'readings' | 'payments'>('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="admin-card rounded-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col admin-hover-scale">
        {/* Header */}
        <div className="admin-gradient-primary rounded-xl p-6 mb-6 -m-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 admin-gradient-accent rounded-2xl flex items-center justify-center admin-hover-lift">
                <span className="text-white text-2xl font-bold">
                  {user.display_name?.[0] || user.email[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {user.display_name || 'İsimsiz Kullanıcı'}
                </h3>
                <p className="text-slate-200 mb-2">{user.email}</p>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    user.status === 'suspended' 
                      ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                      : 'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}>
                    {user.status === 'suspended' ? '🔴 Askıya Alınmış' : '🟢 Aktif'}
                  </div>
                  <div className="admin-glass px-3 py-1 rounded-lg">
                    <span className="text-slate-300 text-xs">ID: {user.id.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 admin-glass rounded-lg admin-hover-scale text-slate-300 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-glass rounded-xl p-2 mb-6">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all admin-hover-scale ${
                activeTab === 'overview'
                  ? 'admin-gradient-accent text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              📊 Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all admin-hover-scale ${
                activeTab === 'transactions'
                  ? 'admin-gradient-accent text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              💳 İşlem Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('readings')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all admin-hover-scale ${
                activeTab === 'readings'
                  ? 'admin-gradient-accent text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              🔮 Okuma Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all admin-hover-scale ${
                activeTab === 'payments'
                  ? 'admin-gradient-accent text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              💰 Ödeme Geçmişi
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* User Info */}
              <div>
                <h4 className="text-lg font-medium text-gold mb-4">Kullanıcı Bilgileri</h4>
                <div className="space-y-3">
                  <div className="bg-lavender/5 p-3 rounded">
                    <p className="text-xs text-lavender">Kullanıcı ID</p>
                    <p className="text-sm text-white font-mono">{user.id}</p>
                  </div>
                  
                  <div className="bg-lavender/5 p-3 rounded">
                    <p className="text-xs text-lavender">E-posta</p>
                    <p className="text-sm text-white">{user.email}</p>
                  </div>
                  
                  <div className="bg-lavender/5 p-3 rounded">
                    <p className="text-xs text-lavender">Kayıt Tarihi</p>
                    <p className="text-sm text-white">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                  
                  <div className="bg-lavender/5 p-3 rounded">
                    <p className="text-xs text-lavender">Son Giriş</p>
                    <p className="text-sm text-white">
                      {user.last_sign_in_at 
                        ? formatDate(user.last_sign_in_at)
                        : 'Hiç giriş yapmadı'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions & Stats */}
              <div>
                {/* Credit Balance */}
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gold">Kredi Bakiyesi</h4>
                    <button
                      onClick={onEditCredit}
                      className="text-xs bg-gold/20 hover:bg-gold/30 text-gold px-2 py-1 rounded"
                    >
                      Düzenle
                    </button>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-6 w-6 text-gold mr-2" />
                    <span className="text-2xl font-bold text-gold">{user.credit_balance}</span>
                    <span className="text-lavender ml-1">kredi</span>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-lavender/5 rounded-lg p-4">
                  <h4 className="font-medium text-lavender mb-3">Hızlı İşlemler</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="w-full text-left bg-lavender/10 hover:bg-lavender/20 text-white p-2 rounded flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2 text-lavender" />
                      İşlem Geçmişini Görüntüle
                    </button>
                    <button 
                      onClick={() => setActiveTab('readings')}
                      className="w-full text-left bg-lavender/10 hover:bg-lavender/20 text-white p-2 rounded flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-2 text-lavender" />
                      Okuma Geçmişini Görüntüle
                    </button>
                    <button 
                      onClick={() => setActiveTab('payments')}
                      className="w-full text-left bg-lavender/10 hover:bg-lavender/20 text-white p-2 rounded flex items-center"
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-lavender" />
                      Ödeme Geçmişini Görüntüle
                    </button>
                    
                    {/* Status Actions */}
                    {user.status === 'suspended' ? (
                      <button 
                        onClick={() => onStatusChange(user.id, 'active')}
                        className="w-full text-left bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded flex items-center"
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Kullanıcıyı Aktifleştir
                      </button>
                    ) : (
                      <button 
                        onClick={() => onStatusChange(user.id, 'suspended')}
                        className="w-full text-left bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded flex items-center"
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Kullanıcıyı Askıya Al
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h4 className="text-lg font-medium text-gold mb-4">Kredi İşlem Geçmişi</h4>
              <TransactionHistory userId={user.id} limit={20} />
            </div>
          )}

          {activeTab === 'readings' && (
            <div>
              <ReadingHistory userId={user.id} limit={15} />
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <PaymentHistory userId={user.id} limit={15} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-lavender/20 pt-4 mt-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
