/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/reporting/export-utils.ts: Export fonksiyonları (gerekli)

Dosyanın amacı:
- Admin paneli transaction yönetimi sayfası
- Tüm transaction'ları görüntüleme ve yönetme
- Kullanıcı bilgileri ile entegre transaction listesi

Supabase değişkenleri ve tabloları:
- transactions: Ana transaction verileri
- profiles: Kullanıcı bilgileri (join edilmiş)
- packages: Paket bilgileri (referans olarak)

Geliştirme önerileri:
- Paket bilgileri join edilebilir
- Gelişmiş filtreler eklenebilir
- PDF export özelliği eklenebilir
- Real-time güncellemeler eklenebilir

Tespit edilen hatalar:
- ✅ Kullanıcı bilgileri entegre edildi
- ✅ Arama fonksiyonu geliştirildi
- ✅ Export fonksiyonu eklendi
- ✅ Modal detayları güncellendi

Kullanım durumu:
- ✅ Gerekli: Admin transaction yönetimi
- ✅ Production-ready: Gerçek verilerle çalışıyor
*/

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';
import {
  CardSkeleton,
  TableSkeleton,
} from '@/components/shared/ui/LoadingSpinner';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Package,
  DollarSign,
  Download,
  UserCheck,
  Calendar as CalendarIcon,
  Hash,
  Tag,
  FileText,
  MessageSquare,
  Settings,
  Database,
  Key,
  Link,
  Copy,
  Mail,
  User,
  Clock,
  Activity,
  X,
} from 'lucide-react';

interface OrderMetadata {
  status?: string;
  updated_at?: string;
  updated_by?: string;
  readingFormat?: 'detailed' | 'written' | 'simple';
  [key: string]: any;
}

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
  user_first_name?: string;
  user_last_name?: string;
  user_avatar?: string | null;
  package_name?: string;
  package_credits?: number;
  status?: string;
  statusData?: {
    color: string;
    icon: React.ReactNode;
    text: string;
  };
  metadata?: OrderMetadata;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
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
    totalRevenue: 0,
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

      if (error) {
        return;
      }

      const transactions = data || [];
      const purchases = transactions.filter((t: any) => t.type === 'purchase');
      const bonuses = transactions.filter((t: any) => t.type === 'bonus');
      const deductions = transactions.filter(
        (t: any) => t.type === 'deduction'
      );
      // const refunds = transactions.filter(t => t.type === 'refund');
      // Sadece Shopier'den gelen gelirleri hesapla
      const shopierRevenue = purchases
        .filter((t: any) => t.ref_type === 'shopier_payment')
        .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

      setStats({
        total: transactions.length,
        completed: purchases.length,
        pending: bonuses.length,
        failed: deductions.length,
        totalRevenue: shopierRevenue,
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
        // Status filtresi için transaction type'ları map et
        const statusTypeMap: Record<string, string[]> = {
          completed: ['purchase', 'bonus', 'deduction'],
          pending: ['pending_payment'],
          cancelled: ['refund'],
        };

        // Eğer bu bir durum filtresi ise
        if (['completed', 'pending', 'cancelled'].includes(statusFilter)) {
          if (statusTypeMap[statusFilter]) {
            countQuery = countQuery.in('type', statusTypeMap[statusFilter]);
          }
        } else {
          // Doğrudan transaction tipi filtresi
          countQuery = countQuery.eq('type', statusFilter);
        }
      }

      // Arama terimi - kullanıcı email ve display_name dahil
      if (searchTerm) {
        countQuery = countQuery.or(
          `ref_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%,reference_id.ilike.%${searchTerm}%`
        );
      }

      const { count } = await countQuery;
      setTotalCount(count || 0);

      // Transactions query with joins - LEFT JOIN kullanarak tüm transaction'ları getir
      let query = supabase
        .from('transactions')
        .select(
          `
          *,
          profiles(
            email,
            display_name,
            first_name,
            last_name,
            avatar_url
          )
        `
        )
        .range(
          (currentPage - 1) * ordersPerPage,
          currentPage * ordersPerPage - 1
        )
        .order('created_at', { ascending: false });

      // Durum filtresi
      if (statusFilter !== 'all') {
        // Status filtresi için transaction type'ları map et
        const statusTypeMap: Record<string, string[]> = {
          completed: ['purchase', 'bonus', 'deduction'],
          pending: ['pending_payment'],
          cancelled: ['refund'],
        };

        // Eğer bu bir durum filtresi ise
        if (['completed', 'pending', 'cancelled'].includes(statusFilter)) {
          if (statusTypeMap[statusFilter]) {
            query = query.in('type', statusTypeMap[statusFilter]);
          }
        } else {
          // Doğrudan transaction tipi filtresi
          query = query.eq('type', statusFilter);
        }
      }

      // Arama terimi - transaction bilgileri ile arama
      if (searchTerm) {
        query = query.or(
          `ref_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%,reference_id.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        showToast('Veriler yüklenirken hata oluştu: ' + error.message, 'error');
        setOrders([]);
        return;
      }

      // Format transactions safely with user data
      const formattedOrders = (data || []).map((transaction: any) => {
        // Önce client-side'da saklanan status'u kontrol et
        const storedStatuses = getStoredStatuses();
        const storedStatus = storedStatuses[transaction.id];

        // Status öncelik sırası: localStorage > transaction.status > transaction.type
        const status =
          storedStatus ||
          transaction.status ||
          getTransactionStatus(transaction.type);

        // Status bilgisine göre renk, icon ve metin belirle
        const statusData = {
          color: getStatusColor(transaction.type, status),
          icon: getStatusIcon(transaction.type, status),
          text: getStatusText(transaction.type, status),
        };

        return {
          id: transaction.id || 'unknown',
          user_id: transaction.user_id || 'unknown',
          type: transaction.type || 'unknown',
          amount: transaction.amount || 0,
          description: transaction.description || 'Açıklama yok',
          created_at: transaction.created_at || new Date().toISOString(),
          delta_credits: transaction.delta_credits || 0,
          reason: transaction.reason || 'Sebep belirtilmemiş',
          ref_type: transaction.ref_type || 'unknown',
          ref_id: transaction.ref_id || 'Referans yok',
          // Kullanıcı bilgileri
          user_email: transaction.profiles?.email || 'Bilinmeyen',
          user_display_name:
            transaction.profiles?.display_name || 'Bilinmeyen Kullanıcı',
          user_first_name: transaction.profiles?.first_name || '',
          user_last_name: transaction.profiles?.last_name || '',
          user_avatar: transaction.profiles?.avatar_url || null,
          // Paket bilgileri
          package_name: getPackageName(transaction.ref_type),
          package_credits: transaction.delta_credits || 0,
          // Status - localStorage > transaction.status > transaction.type
          status: status,
          // Status data - renk, icon ve metin
          statusData: statusData,
          // Metadata - diğer özel alanlar (varsa)
          metadata: transaction.metadata || {},
        };
      });

      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Siparişler yüklenirken hata oluştu', 'error');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getPackageName = (refType: string) => {
    switch (refType) {
      case 'package_purchase':
        return 'Paket Satın Alma';
      case 'shopier_payment':
        return 'Shopier Ödemesi';
      case 'admin_adjustment':
        return 'Admin Düzenlemesi';
      case 'bonus':
        return 'Bonus Kredi';
      case 'reading_deduction':
        return 'Okuma Ücreti';
      default:
        return 'Diğer';
    }
  };

  const getReadingType = (refType: string, description: string) => {
    // Okuma türünü belirle
    if (refType === 'reading_deduction') {
      if (
        description.toLowerCase().includes('sesli') ||
        description.toLowerCase().includes('voice')
      ) {
        return 'Sesli Okuma';
      } else if (
        description.toLowerCase().includes('yazılı') ||
        description.toLowerCase().includes('text')
      ) {
        return 'Yazılı Okuma';
      } else {
        return 'Tarot Okuması';
      }
    }
    return 'Diğer';
  };

  const getTransactionStatus = (type: string) => {
    switch (type) {
      case 'purchase':
      case 'bonus':
        return 'completed';
      case 'deduction':
        return 'completed';
      case 'refund':
        return 'cancelled';
      case 'pending_payment':
        return 'pending';
      default:
        return 'pending';
    }
  };

  // Client-side durum yönetimi için localStorage kullanımı
  const getStoredStatuses = (): Record<string, string> => {
    if (typeof window === 'undefined') {
      return {};
    }

    const stored = localStorage.getItem('admin_transaction_statuses');
    if (!stored) {
      return {};
    }

    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Stored statuses parse error:', e);
      return {};
    }
  };

  const saveStoredStatus = (id: string, status: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const current = getStoredStatuses();
    const updated = { ...current, [id]: status };
    localStorage.setItem('admin_transaction_statuses', JSON.stringify(updated));
  };

  // Kopyalama fonksiyonu
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} panoya kopyalandı`, 'success');
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      showToast('Kopyalama başarısız', 'error');
    }
  };

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: string,
    e?: React.MouseEvent
  ) => {
    // Eğer event nesnesi varsa, varsayılan davranışı engelle
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    // orderId kontrolü
    if (!orderId) {
      console.error('Geçersiz işlem ID');
      showToast('Geçersiz işlem ID', 'error');
      return;
    }

    try {
      console.log('İşlem güncelleniyor:', orderId, 'yeni durum:', newStatus);

      // UI'ı hemen güncelle - optimistic update
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                statusData: {
                  color: getStatusColor(order.type, newStatus),
                  icon: getStatusIcon(order.type, newStatus),
                  text: getStatusText(order.type, newStatus),
                },
              }
            : order
        )
      );

      // Eğer modal açıksa, seçili siparişi güncelle
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
          statusData: {
            color: getStatusColor(selectedOrder.type, newStatus),
            icon: getStatusIcon(selectedOrder.type, newStatus),
            text: getStatusText(selectedOrder.type, newStatus),
          },
        });
      }

      // Client-side'da durumu sakla
      saveStoredStatus(orderId, newStatus);

      // Metadata olmadan doğrudan status alanını güncellemeyi dene
      const { error: directUpdateError } = await supabase
        .from('transactions')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (directUpdateError) {
        console.log('Direct status update failed, using alternative method');

        // Alternatif 1: RPC fonksiyonu kullanarak güncelleme
        const { error: rpcError } = await supabase.rpc(
          'update_transaction_status',
          {
            p_transaction_id: orderId,
            p_status: newStatus,
          }
        );

        if (rpcError) {
          console.log('RPC update failed, using client-side only storage');
          // Başarılı bildirim göster (client-side storage çalıştı)
          showToast('İşlem durumu sadece görsel olarak güncellendi', 'warning');
        } else {
          // RPC başarılı
          showToast('İşlem durumu güncellendi', 'success');
        }
      } else {
        // Doğrudan güncelleme başarılı
        showToast('İşlem durumu güncellendi', 'success');
      }

      // Modal'ı kapat
      setShowOrderModal(false);
    } catch (error: any) {
      console.error('Error updating transaction status:', error);
      showToast(
        `İşlem durumu güncellenirken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`,
        'error'
      );

      // Hata durumunda bile client-side'da durumu sakla
      if (orderId) {
        saveStoredStatus(orderId, newStatus);
      }
    }
  };

  const handleExportOrders = async () => {
    try {
      // Tüm transaction'ları çek (filtreler dahil)
      let query = supabase
        .from('transactions')
        .select(
          `
          *,
          profiles!inner(
            email,
            display_name
          )
        `
        )
        .order('created_at', { ascending: false });

      // Durum filtresi
      if (statusFilter !== 'all') {
        // Status filtresi için transaction type'ları map et
        const statusTypeMap: Record<string, string[]> = {
          completed: ['purchase', 'bonus', 'deduction'],
          pending: ['pending_payment'],
          cancelled: ['refund'],
        };

        // Eğer bu bir durum filtresi ise
        if (['completed', 'pending', 'cancelled'].includes(statusFilter)) {
          if (statusTypeMap[statusFilter]) {
            query = query.in('type', statusTypeMap[statusFilter]);
          }
        } else {
          // Doğrudan transaction tipi filtresi
          query = query.eq('type', statusFilter);
        }
      }

      // Arama terimi
      if (searchTerm) {
        query = query.or(
          `ref_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%,reference_id.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Export error:', error);
        return;
      }

      // CSV formatında export
      const csvData = (data || []).map((transaction: any) => ({
        'Transaction ID': transaction.id,
        Kullanıcı: transaction.profiles?.display_name || 'Bilinmeyen',
        Email: transaction.profiles?.email || 'Bilinmeyen',
        Tip: getStatusText(transaction.type),
        Tutar: transaction.amount || 0,
        'Kredi Değişimi': transaction.delta_credits || 0,
        Açıklama: transaction.description || '',
        Sebep: transaction.reason || '',
        'Referans ID': transaction.ref_id || '',
        'Referans Tipi': transaction.ref_type || '',
        Tarih: formatDate(transaction.created_at),
      }));

      // CSV oluştur
      const csvContent = [
        Object.keys(csvData[0] || {}).join(','),
        ...csvData.map((row: any) =>
          Object.values(row)
            .map((val: any) => `"${val}"`)
            .join(',')
        ),
      ].join('\n');

      // Dosyayı indir
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `transactions_${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Siparişler başarıyla export edildi', 'success');
    } catch (error) {
      console.error('Export error:', error);
      showToast('Export işlemi sırasında hata oluştu', 'error');
    }
  };

  const getStatusColor = (type: string, status?: string) => {
    // Önce status'a göre renk belirle
    if (status) {
      switch (status) {
        case 'completed':
          return 'text-green-400 bg-green-500/20 border-green-500/30';
        case 'pending':
          return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
        case 'cancelled':
          return 'text-red-400 bg-red-500/20 border-red-500/30';
      }
    }

    // Status yoksa type'a göre renk belirle
    switch (type) {
      case 'purchase':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bonus':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'deduction':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'refund':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'pending_payment':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusIcon = (type: string, status?: string) => {
    // Önce status'a göre icon belirle
    if (status) {
      switch (status) {
        case 'completed':
          return <CheckCircle className='h-4 w-4' />;
        case 'pending':
          return <AlertCircle className='h-4 w-4' />;
        case 'cancelled':
          return <XCircle className='h-4 w-4' />;
      }
    }

    // Status yoksa type'a göre icon belirle
    switch (type) {
      case 'purchase':
        return <CheckCircle className='h-4 w-4' />;
      case 'bonus':
        return <Package className='h-4 w-4' />;
      case 'deduction':
        return <CreditCard className='h-4 w-4' />;
      case 'refund':
        return <RefreshCw className='h-4 w-4' />;
      case 'pending_payment':
        return <AlertCircle className='h-4 w-4' />;
      default:
        return <AlertCircle className='h-4 w-4' />;
    }
  };

  const getStatusText = (type: string, status?: string) => {
    // Önce status'a göre text belirle
    if (status) {
      switch (status) {
        case 'completed':
          return 'Tamamlandı';
        case 'pending':
          return 'Beklemede';
        case 'cancelled':
          return 'İptal Edildi';
      }
    }

    // Status yoksa type'a göre text belirle
    switch (type) {
      case 'purchase':
        return 'Satın Alma';
      case 'bonus':
        return 'Bonus';
      case 'deduction':
        return 'Kredi Düşümü';
      case 'refund':
        return 'İade';
      case 'pending_payment':
        return 'Ödeme Bekliyor';
      default:
        return type;
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency || 'EUR',
    }).format(amount);
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

  const totalPages = Math.ceil(totalCount / ordersPerPage);

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='admin-card rounded-2xl p-6'>
          <div className='animate-pulse'>
            <div className='h-6 bg-slate-700 rounded w-1/3 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <TableSkeleton rows={5} columns={6} />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='admin-card rounded-2xl mobile-compact admin-hover-lift'>
        <div className='flex flex-col space-y-4 mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3 min-w-0 flex-1'>
              <div className='admin-gradient-accent p-3 rounded-xl flex-shrink-0'>
                <CreditCard className='h-5 w-5 md:h-6 md:w-6 text-white' />
              </div>
              <div className='min-w-0 flex-1'>
                <h1 className='text-xl md:text-2xl font-bold text-white truncate'>
                  Sipariş Yönetimi
                </h1>
                <p className='text-slate-400 text-sm md:text-base hidden sm:block'>
                  Tüm siparişleri görüntüle ve yönet
                </p>
              </div>
            </div>

            <button
              onClick={handleExportOrders}
              className='admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target flex-shrink-0 hover:bg-purple-600 transition-colors'
            >
              <Download className='h-4 w-4' />
              <span className='hidden sm:inline'>Rapor İndir</span>
              <span className='sm:hidden'>İndir</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6'>
          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <Package className='h-5 w-5 text-blue-400 mr-2' />
              <span className='text-sm text-slate-400'>Toplam</span>
            </div>
            <div className='text-xl font-bold text-white'>{stats.total}</div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <CheckCircle className='h-5 w-5 text-green-400 mr-2' />
              <span className='text-sm text-slate-400'>Satın Alma</span>
            </div>
            <div className='text-xl font-bold text-green-400'>
              {stats.completed}
            </div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <Package className='h-5 w-5 text-blue-400 mr-2' />
              <span className='text-sm text-slate-400'>Bonus</span>
            </div>
            <div className='text-xl font-bold text-blue-400'>
              {stats.pending}
            </div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <CreditCard className='h-5 w-5 text-orange-400 mr-2' />
              <span className='text-sm text-slate-400'>Kredi Düşümü</span>
            </div>
            <div className='text-xl font-bold text-orange-400'>
              {stats.failed}
            </div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <DollarSign className='h-5 w-5 text-purple-400 mr-2' />
              <span className='text-sm text-slate-400'>Shopier Gelir</span>
            </div>
            <div className='text-lg font-bold text-purple-400'>
              ₺{stats.totalRevenue.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4'>
          {/* Search */}
          <div className='lg:col-span-2'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input
                type='text'
                placeholder='Transaction ID, açıklama veya referans ile ara...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm'
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className='w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm'
            >
              <option value='all'>🔍 Tümü</option>
              {/* Durum filtreleri */}
              <option value='completed'>✅ Tamamlandı</option>
              <option value='pending'>⏳ Beklemede</option>
              <option value='cancelled'>❌ İptal Edildi</option>
              {/* İşlem tipi filtreleri */}
              <option value='purchase'>💰 Satın Alma</option>
              <option value='bonus'>🎁 Bonus</option>
              <option value='deduction'>💳 Kredi Düşümü</option>
              <option value='refund'>🔄 İade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
        {orders.map((order, index) => (
          <div
            key={order.id}
            className='admin-card rounded-2xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale border border-slate-700/50 backdrop-blur-sm'
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Modern Card Header */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center space-x-3'>
                <div className='admin-gradient-accent p-3 rounded-xl shadow-lg'>
                  <CreditCard className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h3 className='font-bold text-white text-lg'>
                    #{order.id.slice(0, 8)}...
                  </h3>
                  <p className='text-sm text-slate-400'>
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold border-2 shadow-lg ${order.statusData?.color || getStatusColor(order.type, order.status)}`}
              >
                {order.statusData?.icon ||
                  getStatusIcon(order.type, order.status)}
                <span className='ml-2'>
                  {order.statusData?.text ||
                    getStatusText(order.type, order.status)}
                </span>
              </div>
            </div>

            {/* Modern Transaction Details */}
            <div className='space-y-4 mb-6'>
              {/* Kullanıcı Bilgileri - Modern Card */}
              <div className='admin-glass rounded-xl p-4 border border-slate-600/30'>
                <div className='flex items-center space-x-3 mb-3'>
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-bold'>
                      {(
                        order.user_first_name?.charAt(0) ||
                        order.user_last_name?.charAt(0) ||
                        'U'
                      ).toUpperCase()}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <div className='text-sm text-slate-400'>Kullanıcı</div>
                    <div className='text-white font-semibold'>
                      {order.user_first_name && order.user_last_name
                        ? `${order.user_first_name} ${order.user_last_name}`
                        : order.user_display_name || 'Bilinmeyen Kullanıcı'}
                    </div>
                  </div>
                </div>
                <div className='text-xs text-slate-400 truncate'>
                  {order.user_email}
                </div>
              </div>

              {/* Tutar ve Kredi - Modern Card */}
              <div className='admin-glass rounded-xl p-4 border border-slate-600/30'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='text-sm text-slate-400'>Tutar</div>
                  <div className='text-xl font-bold text-white'>
                    {formatPrice(order.amount, 'TRY')}
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-slate-400'>Kredi Değişimi</div>
                  <div
                    className={`text-lg font-bold flex items-center space-x-1 ${
                      order.delta_credits > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    <span>{order.delta_credits > 0 ? '+' : ''}</span>
                    <span>{order.delta_credits}</span>
                    <span className='text-xs'>kredi</span>
                  </div>
                </div>
              </div>

              {/* Açıklama ve Sebep - Modern Card */}
              <div className='admin-glass rounded-xl p-4 border border-slate-600/30'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-400'>Açıklama</span>
                    <span className='text-sm text-white font-medium'>
                      {order.description}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-400'>Sebep</span>
                    <span className='text-xs text-slate-400'>
                      {order.reason}
                    </span>
                  </div>
                </div>
              </div>

              {/* Referans Bilgileri - Modern Card */}
              <div className='admin-glass rounded-xl p-4 border border-slate-600/30'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-400'>Okuma ID</span>
                    <span className='text-sm text-white font-mono'>
                      {order.ref_id}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-400'>Okuma Tipi</span>
                    <span className='text-xs text-blue-400 font-medium'>
                      {getReadingType(order.ref_type, order.description)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Action Button */}
            <div className='flex space-x-2'>
              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
                className='flex-1 admin-glass hover:bg-slate-700/50 text-white p-3 rounded-xl admin-hover-scale transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-600/30 shadow-lg'
              >
                <Eye className='h-4 w-4' />
                <span className='text-sm font-medium'>Detayları Gör</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && !loading && (
        <div className='admin-card rounded-2xl p-12 text-center'>
          <CreditCard className='h-20 w-20 text-slate-600 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-white mb-2'>
            Transaction Bulunamadı
          </h3>
          <p className='text-slate-400 mb-6'>
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
              className='admin-btn-primary px-6 py-2 rounded-lg'
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='admin-card rounded-xl p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-slate-400'>
              {totalCount} transaction'dan{' '}
              {(currentPage - 1) * ordersPerPage + 1}-
              {Math.min(currentPage * ordersPerPage, totalCount)} arası
              gösteriliyor
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>

              <span className='px-4 py-2 admin-gradient-accent rounded-lg text-white font-medium'>
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className='p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && selectedOrder.id && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4'>
          <div className='admin-card rounded-2xl p-6 w-full max-w-2xl admin-hover-scale'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white flex items-center'>
                <div className='admin-gradient-accent p-2 rounded-lg mr-3'>
                  <CreditCard className='h-5 w-5 text-white' />
                </div>
                Sipariş Detayları
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className='p-2 admin-glass rounded-lg admin-hover-scale'
              >
                <XCircle className='h-5 w-5' />
              </button>
            </div>

            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='admin-glass rounded-lg p-4'>
                  <h4 className='font-medium text-white mb-3 flex items-center'>
                    <Hash className='h-4 w-4 mr-2 text-blue-400' />
                    Sipariş Bilgileri
                  </h4>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <Key className='h-3 w-3 mr-1' />
                        ID:
                      </span>
                      <div className='flex items-center space-x-2'>
                        <span className='text-white font-mono text-xs bg-slate-800 px-2 py-1 rounded'>
                          {selectedOrder?.id || 'N/A'}
                        </span>
                        <button
                          onClick={() =>
                            selectedOrder?.id &&
                            copyToClipboard(selectedOrder.id, 'İşlem ID')
                          }
                          className='p-1 hover:bg-slate-700 rounded transition-colors'
                          title='Kopyala'
                        >
                          <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                        </button>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <Activity className='h-3 w-3 mr-1' />
                        Durum:
                      </span>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${selectedOrder?.statusData?.color || getStatusColor(selectedOrder?.type || '', selectedOrder?.status)}`}
                      >
                        {selectedOrder?.statusData?.icon ||
                          getStatusIcon(
                            selectedOrder?.type || '',
                            selectedOrder?.status
                          )}
                        <span className='ml-1'>
                          {selectedOrder?.statusData?.text ||
                            getStatusText(
                              selectedOrder?.type || '',
                              selectedOrder?.status
                            )}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <CalendarIcon className='h-3 w-3 mr-1' />
                        Tarih:
                      </span>
                      <span className='text-white text-xs'>
                        {selectedOrder?.created_at
                          ? formatDate(selectedOrder.created_at)
                          : 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <Link className='h-3 w-3 mr-1' />
                        Referans:
                      </span>
                      <div className='flex items-center space-x-2'>
                        <span className='text-white font-mono text-xs bg-slate-800 px-2 py-1 rounded'>
                          {selectedOrder?.ref_id || 'N/A'}
                        </span>
                        <button
                          onClick={() =>
                            selectedOrder?.ref_id &&
                            copyToClipboard(selectedOrder.ref_id, 'Referans ID')
                          }
                          className='p-1 hover:bg-slate-700 rounded transition-colors'
                          title='Kopyala'
                        >
                          <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='admin-glass rounded-lg p-4'>
                  <h4 className='font-medium text-white mb-3 flex items-center'>
                    <DollarSign className='h-4 w-4 mr-2 text-green-400' />
                    Transaction Bilgileri
                  </h4>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <DollarSign className='h-3 w-3 mr-1' />
                        Tutar:
                      </span>
                      <span className='text-white font-bold text-lg'>
                        {selectedOrder?.amount
                          ? formatPrice(selectedOrder.amount, 'TRY')
                          : 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-400 flex items-center'>
                        <Activity className='h-3 w-3 mr-1' />
                        Kredi Değişimi:
                      </span>
                      <div className='flex items-center space-x-2'>
                        <span
                          className={`font-bold text-lg ${(selectedOrder?.delta_credits || 0) > 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {(selectedOrder?.delta_credits || 0) > 0 ? '+' : ''}
                          {selectedOrder?.delta_credits || 0}
                        </span>
                        <span className='text-xs text-slate-500'>kredi</span>
                      </div>
                    </div>
                    <div className='flex justify-between items-start'>
                      <span className='text-slate-400 flex items-center mt-1'>
                        <FileText className='h-3 w-3 mr-1' />
                        Açıklama:
                      </span>
                      <span className='text-white text-right max-w-[200px] break-words'>
                        {selectedOrder?.description || 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between items-start'>
                      <span className='text-slate-400 flex items-center mt-1'>
                        <MessageSquare className='h-3 w-3 mr-1' />
                        Sebep:
                      </span>
                      <span className='text-slate-300 text-right max-w-[200px] break-words'>
                        {selectedOrder?.reason || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-4'>
                <h4 className='font-medium text-white mb-3 flex items-center'>
                  <User className='h-4 w-4 mr-2 text-purple-400' />
                  Kullanıcı Bilgileri
                </h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <Key className='h-3 w-3 mr-1' />
                      Kullanıcı ID:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-mono text-xs bg-slate-800 px-2 py-1 rounded'>
                        {selectedOrder?.user_id || 'N/A'}
                      </span>
                      <button
                        onClick={() =>
                          selectedOrder?.user_id &&
                          copyToClipboard(selectedOrder.user_id, 'Kullanıcı ID')
                        }
                        className='p-1 hover:bg-slate-700 rounded transition-colors'
                        title='Kopyala'
                      >
                        <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <UserCheck className='h-3 w-3 mr-1' />
                      Kullanıcı Adı:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-medium'>
                        {selectedOrder?.user_display_name || 'N/A'}
                      </span>
                      {selectedOrder?.user_first_name &&
                        selectedOrder?.user_last_name && (
                          <span className='text-xs text-slate-400'>
                            ({selectedOrder.user_first_name}{' '}
                            {selectedOrder.user_last_name})
                          </span>
                        )}
                    </div>
                  </div>
                  <div className='flex justify-between items-center col-span-2'>
                    <span className='text-slate-400 flex items-center'>
                      <Mail className='h-3 w-3 mr-1' />
                      Email:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white'>
                        {selectedOrder?.user_email || 'N/A'}
                      </span>
                      <button
                        onClick={() =>
                          selectedOrder?.user_email &&
                          copyToClipboard(selectedOrder.user_email, 'Email')
                        }
                        className='p-1 hover:bg-slate-700 rounded transition-colors'
                        title='Kopyala'
                      >
                        <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-4'>
                <h4 className='font-medium text-white mb-3 flex items-center'>
                  <Package className='h-4 w-4 mr-2 text-orange-400' />
                  Referans Bilgileri
                </h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <Link className='h-3 w-3 mr-1' />
                      Referans ID:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-mono text-xs bg-slate-800 px-2 py-1 rounded'>
                        {selectedOrder?.ref_id || 'N/A'}
                      </span>
                      <button
                        onClick={() =>
                          selectedOrder?.ref_id &&
                          copyToClipboard(selectedOrder.ref_id, 'Referans ID')
                        }
                        className='p-1 hover:bg-slate-700 rounded transition-colors'
                        title='Kopyala'
                      >
                        <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <Tag className='h-3 w-3 mr-1' />
                      Referans Tipi:
                    </span>
                    <span className='text-white font-medium bg-blue-500/20 px-2 py-1 rounded text-xs'>
                      {selectedOrder?.ref_type || 'N/A'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center col-span-2'>
                    <span className='text-slate-400 flex items-center'>
                      <Package className='h-3 w-3 mr-1' />
                      Paket:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-medium'>
                        {selectedOrder?.package_name || 'N/A'}
                      </span>
                      {selectedOrder?.package_credits && (
                        <span className='text-xs text-slate-400'>
                          ({selectedOrder.package_credits} kredi)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Okuma Tipi ve Ek Bilgiler */}
              <div className='admin-glass rounded-lg p-4'>
                <h4 className='font-medium text-white mb-3 flex items-center'>
                  <Settings className='h-4 w-4 mr-2 text-cyan-400' />
                  Okuma Detayları
                </h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <FileText className='h-3 w-3 mr-1' />
                      Okuma Tipi:
                    </span>
                    <span className='text-white font-medium bg-purple-500/20 px-2 py-1 rounded text-xs'>
                      {getReadingType(
                        selectedOrder?.ref_type || '',
                        selectedOrder?.description || ''
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 flex items-center'>
                      <Clock className='h-3 w-3 mr-1' />
                      İşlem Tipi:
                    </span>
                    <span className='text-white font-medium bg-slate-700 px-2 py-1 rounded text-xs'>
                      {selectedOrder?.type || 'N/A'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center col-span-2'>
                    <span className='text-slate-400 flex items-center'>
                      <Database className='h-3 w-3 mr-1' />
                      İşlem ID:
                    </span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-mono text-xs bg-slate-800 px-2 py-1 rounded'>
                        {selectedOrder?.id || 'N/A'}
                      </span>
                      <button
                        onClick={() =>
                          selectedOrder?.id &&
                          copyToClipboard(selectedOrder.id, 'İşlem ID')
                        }
                        className='p-1 hover:bg-slate-700 rounded transition-colors'
                        title='Kopyala'
                      >
                        <Copy className='h-3 w-3 text-slate-400 hover:text-white' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex space-x-3 mt-6'>
              <button
                onClick={() => setShowOrderModal(false)}
                className='flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors flex items-center justify-center'
              >
                <X className='h-4 w-4 mr-2' />
                <span>Kapat</span>
              </button>

              {/* Durum değiştirme butonları */}
              <div className='flex-1 flex space-x-2'>
                {selectedOrder && selectedOrder.status !== 'completed' && (
                  <button
                    onClick={e =>
                      handleStatusUpdate(selectedOrder.id, 'completed', e)
                    }
                    className='flex-1 admin-gradient-success p-3 rounded-lg text-white admin-hover-scale flex items-center justify-center transition-all duration-200 hover:shadow-lg'
                    title='İşlemi onayla'
                  >
                    <CheckCircle className='h-4 w-4 mr-2' />
                    <span>Onayla</span>
                  </button>
                )}

                {selectedOrder && selectedOrder.status !== 'pending' && (
                  <button
                    onClick={e =>
                      handleStatusUpdate(selectedOrder.id, 'pending', e)
                    }
                    className='flex-1 bg-yellow-500/20 border border-yellow-500/30 p-3 rounded-lg text-yellow-400 admin-hover-scale flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:bg-yellow-500/30'
                    title='İşlemi beklemede bırak'
                  >
                    <AlertCircle className='h-4 w-4 mr-2' />
                    <span>Beklet</span>
                  </button>
                )}

                {selectedOrder && selectedOrder.status !== 'cancelled' && (
                  <button
                    onClick={e =>
                      handleStatusUpdate(selectedOrder.id, 'cancelled', e)
                    }
                    className='flex-1 bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-red-400 admin-hover-scale flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:bg-red-500/30'
                    title='İşlemi iptal et'
                  >
                    <XCircle className='h-4 w-4 mr-2' />
                    <span>İptal Et</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
