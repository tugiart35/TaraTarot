'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  CreditCard,
  Package,
  User,
  Calendar,
  Euro,
  Filter,
  TrendingUp,
  DollarSign,
  Download
} from 'lucide-react';

interface Order {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
  delta_credits: number;
  reason: string;
  ref_type: string;
  ref_id: string;
  user_display_name?: string;
  user_email?: string;
  package_name?: string;
  package_credits?: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalRevenue: 0
  });
  
  const ordersPerPage = 12;

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('type, amount, ref_type');
      
      if (error) return;
      
      const transactions = data || [];
      const purchases = transactions.filter(t => t.type === 'purchase');
      const bonuses = transactions.filter(t => t.type === 'bonus');
      const deductions = transactions.filter(t => t.type === 'deduction');
      const refunds = transactions.filter(t => t.type === 'refund');
      // Sadece Shopier'den gelen gelirleri hesapla
      const shopierRevenue = purchases
        .filter(t => t.ref_type === 'shopier_payment')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      setStats({
        total: transactions.length,
        completed: purchases.length,
        pending: bonuses.length,
        failed: deductions.length,
        totalRevenue: shopierRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Toplam transaction sayısını al
      let countQuery = supabase
        .from('transactions')
        .select('*', { count: 'exact' });
      
      // Durum filtresi
      if (statusFilter !== 'all') {
        countQuery = countQuery.eq('type', statusFilter);
      }
      
      // Arama terimi
      if (searchTerm) {
        countQuery = countQuery.or(`ref_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`);
      }
      
      const { count } = await countQuery;
      setTotalCount(count || 0);
      
      // Transactions query
      let query = supabase
        .from('transactions')
        .select('*')
        .range((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage - 1)
        .order('created_at', { ascending: false });
      
      // Durum filtresi
      if (statusFilter !== 'all') {
        query = query.eq('type', statusFilter);
      }
      
      // Arama terimi
      if (searchTerm) {
        query = query.or(`ref_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        setOrders([]);
        return;
      }
      
      // Format transactions safely
      const formattedOrders = (data || []).map(transaction => ({
        id: transaction.id || 'unknown',
        user_id: transaction.user_id || 'unknown',
        type: transaction.type || 'unknown',
        amount: transaction.amount || 0,
        description: transaction.description || 'No description',
        created_at: transaction.created_at || new Date().toISOString(),
        delta_credits: transaction.delta_credits || 0,
        reason: transaction.reason || 'No reason',
        ref_type: transaction.ref_type || 'unknown',
        ref_id: transaction.ref_id || 'No reference'
      }));
      
      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      // Transactions tablosunda status güncellemesi yapmıyoruz
      // Çünkü transaction'lar immutable (değiştirilemez) kayıtlardır
      console.log('Transaction status update not supported:', orderId, newStatus);
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bonus': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'deduction': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'refund': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <CheckCircle className="h-4 w-4" />;
      case 'bonus': return <Package className="h-4 w-4" />;
      case 'deduction': return <CreditCard className="h-4 w-4" />;
      case 'refund': return <RefreshCw className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (type: string) => {
    switch (type) {
      case 'purchase': return 'Satın Alma';
      case 'bonus': return 'Bonus';
      case 'deduction': return 'Kredi Düşümü';
      case 'refund': return 'İade';
      default: return type;
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalCount / ordersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <CreditCard className="h-12 w-12 text-purple-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Siparişler yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="admin-gradient-accent p-3 rounded-xl flex-shrink-0">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-white truncate">Sipariş Yönetimi</h1>
                <p className="text-slate-400 text-sm md:text-base hidden sm:block">Tüm siparişleri görüntüle ve yönet</p>
              </div>
            </div>
            
            <button className="admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target flex-shrink-0">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Rapor İndir</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm text-slate-400">Toplam</span>
            </div>
            <div className="text-xl font-bold text-white">{stats.total}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-slate-400">Satın Alma</span>
            </div>
            <div className="text-xl font-bold text-green-400">{stats.completed}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm text-slate-400">Bonus</span>
            </div>
            <div className="text-xl font-bold text-blue-400">{stats.pending}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CreditCard className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-sm text-slate-400">Kredi Düşümü</span>
            </div>
            <div className="text-xl font-bold text-orange-400">{stats.failed}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm text-slate-400">Shopier Gelir</span>
            </div>
            <div className="text-lg font-bold text-purple-400">
              ₺{stats.totalRevenue.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Transaction ID veya referans ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm"
            >
              <option value="all">🔍 Tümü</option>
              <option value="purchase">✅ Satın Alma</option>
              <option value="bonus">🎁 Bonus</option>
              <option value="deduction">💳 Kredi Düşümü</option>
              <option value="refund">🔄 İade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {orders.map((order, index) => (
          <div 
            key={order.id}
            className="admin-card rounded-xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="admin-gradient-accent p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    #{order.id.slice(0, 8)}...
                  </h3>
                  <p className="text-sm text-slate-400">{formatDate(order.created_at)}</p>
                </div>
              </div>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.type)}`}>
                {getStatusIcon(order.type)}
                <span className="ml-1">{getStatusText(order.type)}</span>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 mb-4">
              <div className="admin-glass rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Tutar</span>
                  <div className="text-lg font-bold text-white">
                    {formatPrice(order.amount, 'TRY')}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Kredi Değişimi</span>
                  <span className={`text-sm font-medium ${order.delta_credits > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {order.delta_credits > 0 ? '+' : ''}{order.delta_credits}
                  </span>
                </div>
              </div>

              <div className="admin-glass rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Açıklama</span>
                  <span className="text-sm text-white">{order.description}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Sebep</span>
                  <span className="text-xs text-slate-400">{order.reason}</span>
                </div>
              </div>

              <div className="admin-glass rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Referans ID</span>
                  <span className="text-sm text-white">{order.ref_id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Referans Tipi</span>
                  <span className="text-xs text-slate-400">{order.ref_type}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm">Detay</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && !loading && (
        <div className="admin-card rounded-2xl p-12 text-center">
          <CreditCard className="h-20 w-20 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Transaction Bulunamadı</h3>
          <p className="text-slate-400 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Arama kriterlerinize uygun transaction bulunamadı.'
              : 'Henüz transaction bulunmuyor.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="admin-btn-primary px-6 py-2 rounded-lg"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {totalCount} transaction'dan {((currentPage - 1) * ordersPerPage) + 1}-{Math.min(currentPage * ordersPerPage, totalCount)} arası gösteriliyor
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="px-4 py-2 admin-gradient-accent rounded-lg text-white font-medium">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="admin-card rounded-2xl p-6 w-full max-w-2xl admin-hover-scale">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-accent p-2 rounded-lg mr-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                Sipariş Detayları
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 admin-glass rounded-lg admin-hover-scale"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="admin-glass rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Sipariş Bilgileri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID:</span>
                      <span className="text-white font-mono">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Durum:</span>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1">{getStatusText(selectedOrder.status)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tarih:</span>
                      <span className="text-white">{formatDate(selectedOrder.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Referans:</span>
                      <span className="text-white font-mono text-xs">{selectedOrder.ref_id}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-glass rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Transaction Bilgileri</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tutar:</span>
                      <span className="text-white font-bold">{formatPrice(selectedOrder.amount, 'TRY')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kredi Değişimi:</span>
                      <span className={`font-bold ${selectedOrder.delta_credits > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedOrder.delta_credits > 0 ? '+' : ''}{selectedOrder.delta_credits}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Açıklama:</span>
                      <span className="text-white">{selectedOrder.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sebep:</span>
                      <span className="text-slate-300">{selectedOrder.reason}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-glass rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Referans Bilgileri</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kullanıcı ID:</span>
                    <span className="text-white font-mono text-xs">{selectedOrder.user_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Referans ID:</span>
                    <span className="text-white font-mono text-xs">{selectedOrder.ref_id}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-slate-400">Referans Tipi:</span>
                    <span className="text-white">{selectedOrder.ref_type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors"
              >
                Kapat
              </button>
              {selectedOrder.status === 'pending' && (
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedOrder.id, 'completed');
                    setShowOrderModal(false);
                  }}
                  className="flex-1 admin-gradient-success p-3 rounded-lg text-white admin-hover-scale"
                >
                  Onayla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}