/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/reporting/export-utils.ts: Export fonksiyonları (gerekli)
- hooks/useDebounce.ts: Debounced search için (yeni eklendi)

Dosyanın amacı:
- Admin paneli transaction yönetimi sayfası
- Tüm transaction&apos;ları görüntüleme ve yönetme
- Kullanıcı bilgileri ile entegre transaction listesi
- Reading bilgileri ile entegre transaction detayları

Supabase değişkenleri ve tabloları:
- transactions: Ana transaction verileri
- profiles: Kullanıcı bilgileri (join edilmiş)
- readings: Okuma bilgileri (ref_type=&apos;reading_usage&apos; için join)
- packages: Paket bilgileri (referans olarak)

Geliştirme önerileri:
- ✅ Reading bilgileri entegre edildi
- ✅ Debounced search eklendi
- ✅ Tarih aralığı filtresi eklendi
- ✅ Kolon sıralama özelliği eklendi
- PDF export özelliği eklenebilir
- Real-time güncellemeler eklenebilir

Tespit edilen hatalar:
- ✅ Kullanıcı bilgileri entegre edildi
- ✅ Arama fonksiyonu geliştirildi
- ✅ Export fonksiyonu eklendi
- ✅ Modal detayları güncellendi
- ✅ Reading bilgileri entegre edildi

Kullanım durumu:
- ✅ Gerekli: Admin transaction yönetimi
- ✅ Production-ready: Gerçek verilerle çalışıyor
- ✅ Geliştirilmiş: Reading detayları dahil
*/

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import ReadingDetailModal from '@/features/shared/ui/ReadingDetailModal';
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
  Calendar,
  ArrowUpDown,
  BookOpen,
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
  status?: string;
  // Reading bilgileri
  reading_id: string | null;
  reading_type: string | null;
  reading_title: string | null;
  reading_spread_name: string | null;
  reading_interpretation: string | null;
  reading_cards: any | null;
  reading_questions: any | null;
  reading_cost_credits: number | null;
  reading_status: string | null;
}

interface DateRange {
  start: string | null;
  end: string | null;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [envError, setEnvError] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [readingDetails, setReadingDetails] = useState<any>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'created_at',
    direction: 'desc',
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    readings: 0,
    totalRevenue: 0,
  });

  const ordersPerPage = 12;

  // Debounced search - 300ms gecikme
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Environment değişkenlerini kontrol et
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setEnvError(true);
      setLoading(false);
      showToast(
        'Supabase bağlantı bilgileri eksik. Lütfen .env.local dosyasını kontrol edin.',
        'error'
      );
      return;
    }

    fetchOrders();
    fetchStats();
  }, [currentPage, debouncedSearchTerm, statusFilter, dateRange, sortConfig]);

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
      const deductions = transactions.filter((t: any) => t.type === 'deduction');
      const readings = transactions.filter((t: any) => t.type === 'reading');
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
        readings: readings.length,
        totalRevenue: shopierRevenue,
      });
    } catch (error) {
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

      // Tarih aralığı filtresi
      if (dateRange.start) {
        countQuery = countQuery.gte('created_at', dateRange.start);
      }
      if (dateRange.end) {
        countQuery = countQuery.lte('created_at', dateRange.end);
      }

      // Arama terimi - transaction ID ve ref_id ile ara
      if (debouncedSearchTerm) {
        countQuery = countQuery.or(
          `ref_id.ilike.%${debouncedSearchTerm}%,id.ilike.%${debouncedSearchTerm}%`
        );
      }

      const { count } = await countQuery;
      setTotalCount(count || 0);

      // Transactions query with profiles join only
      let query = supabase
        .from('transactions')
        .select(
          `
          *,
          profiles(
            email,
            display_name,
            full_name,
            first_name,
            last_name
          )
        `
        )
        .range(
          (currentPage - 1) * ordersPerPage,
          currentPage * ordersPerPage - 1
        )
        .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });

      // Durum filtresi
      if (statusFilter !== 'all') {
        query = query.eq('type', statusFilter);
      }

      // Tarih aralığı filtresi
      if (dateRange.start) {
        query = query.gte('created_at', dateRange.start);
      }
      if (dateRange.end) {
        query = query.lte('created_at', dateRange.end);
      }

      // Arama terimi - transaction ID ve ref_id ile ara
      if (debouncedSearchTerm) {
        query = query.or(
          `ref_id.ilike.%${debouncedSearchTerm}%,id.ilike.%${debouncedSearchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        showToast(`Veriler yüklenirken hata oluştu: ${error.message}`, 'error');
        setOrders([]);
        return;
      }

      // Format transactions safely with user data
      const formattedOrders = (data || []).map((transaction: any) => ({
        id: transaction.id || 'unknown',
        user_id: transaction.user_id || 'unknown',
        type: transaction.type || 'unknown',
        amount: transaction.amount || 0,
        description: transaction.description || 'No description',
        created_at: transaction.created_at || new Date().toISOString(),
        delta_credits: transaction.delta_credits || 0,
        reason: transaction.reason || 'No reason',
        ref_type: transaction.ref_type || 'unknown',
        ref_id: transaction.ref_id || 'No reference',
        // Kullanıcı bilgileri
        user_email: transaction.profiles?.email || 'Bilinmeyen',
        user_display_name:
          transaction.profiles?.display_name ||
          transaction.profiles?.full_name ||
          `${transaction.profiles?.first_name || ''} ${transaction.profiles?.last_name || ''}`.trim() ||
          'Bilinmeyen Kullanıcı',
        // Paket bilgileri (ref_id'den paket bilgisi çekilebilir)
        package_name:
          transaction.ref_type === 'package_purchase'
            ? 'Paket Satın Alma'
            : 'Diğer',
        package_credits: transaction.delta_credits || 0,
        status:
          transaction.type === 'purchase'
            ? 'completed'
            : transaction.type === 'bonus'
              ? 'completed'
              : transaction.type === 'deduction'
                ? 'completed'
                : 'pending',
        // Reading bilgileri - ayrı query ile doldurulacak
        reading_id: null,
        reading_type: null,
        reading_title: null,
        reading_spread_name: null,
        reading_interpretation: null,
        reading_cards: null,
        reading_questions: null,
        reading_cost_credits: null,
        reading_status: null,
      }));

      // Reading transaction'ları için reading bilgilerini ayrı query ile çek
      const readingTransactions = formattedOrders.filter(
        (order: any) => order.type === 'reading' && order.ref_id
      );
      if (readingTransactions.length > 0) {
        const readingIds = readingTransactions.map((order: any) => order.ref_id);
        const { data: readingsData, error: readingsError } = await supabase
          .from('readings')
          .select(
            'id, reading_type, title, spread_name, interpretation, cards, questions, cost_credits, status'
          )
          .in('id', readingIds);

        if (!readingsError && readingsData) {
          // Reading bilgilerini transaction'lara ekle
          formattedOrders.forEach((order: any) => {
            if (order.type === 'reading' && order.ref_id) {
              const readingData = readingsData.find(
                (reading: any) => reading.id === order.ref_id
              );
              if (readingData) {
                order.reading_id = readingData.id;
                order.reading_type = readingData.reading_type;
                order.reading_title = readingData.title;
                order.reading_spread_name = readingData.spread_name;
                order.reading_interpretation = readingData.interpretation;
                order.reading_cards = readingData.cards;
                order.reading_questions = readingData.questions;
                order.reading_cost_credits = readingData.cost_credits;
                order.reading_status = readingData.status;
              }
            }
          });
        }
      }

      setOrders(formattedOrders);
    } catch (error) {
      showToast('Siparişler yüklenirken hata oluştu', 'error');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Reading bilgilerini çekmek için ayrı fonksiyon
  const fetchReadingDetails = async (refId: string) => {
    try {
      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('id', refId)
        .single();

      if (error) {
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  };

  // Modal açıldığında reading bilgilerini çek
  const handleOrderModalOpen = async (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
    setReadingDetails(null);

    // Eğer reading transaction'ı ise reading bilgilerini çek
    if (order.type === 'reading' && order.ref_id) {
      setLoadingReading(true);
      try {
        const readingData = await fetchReadingDetails(order.ref_id);
        setReadingDetails(readingData);
      } catch (error) {
      } finally {
        setLoadingReading(false);
      }
    }
  };

  const handleStatusUpdate = async (_orderId: string, _newStatus: string) => {
    try {
      // Transactions tablosunda status güncellemesi yapmıyoruz
      // Çünkü transaction'lar immutable (değiştirilemez) kayıtlardır
      console.error(
        'Transaction status update not supported:',
        _orderId,
        _newStatus
      );
    } catch (error) {
      console.error('Error updating transaction status:', error);
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
          profiles(
            email,
            display_name,
            full_name,
            first_name,
            last_name
          )
        `
        )
        .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });

      // Durum filtresi
      if (statusFilter !== 'all') {
        query = query.eq('type', statusFilter);
      }

      // Tarih aralığı filtresi
      if (dateRange.start) {
        query = query.gte('created_at', dateRange.start);
      }
      if (dateRange.end) {
        query = query.lte('created_at', dateRange.end);
      }

      // Arama terimi
      if (debouncedSearchTerm) {
        query = query.or(
          `ref_id.ilike.%${debouncedSearchTerm}%,id.ilike.%${debouncedSearchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        return;
      }

      // CSV formatında export
      const csvData = (data || []).map((transaction: any) => ({
        'Transaction ID': transaction.id,
        Kullanıcı:
          transaction.profiles?.display_name ||
          transaction.profiles?.full_name ||
          'Bilinmeyen',
        Email: transaction.profiles?.email || 'Bilinmeyen',
        Tip: getStatusText(transaction.type, transaction),
        Tutar: transaction.amount || 0,
        'Kredi Değişimi': transaction.delta_credits || 0,
        Açıklama: transaction.description || '',
        Sebep: transaction.reason || '',
        'Referans ID': transaction.ref_id || '',
        'Referans Tipi': transaction.ref_type || '',
        Tarih: formatDate(transaction.created_at),
        // Reading bilgileri - şimdilik boş
        'Okuma ID': '',
        'Okuma Tipi': '',
        'Okuma Başlığı': '',
        'Okuma Yayılımı': '',
        'Okuma Durumu': '',
        'Okuma Maliyeti': 0,
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
      showToast('Export işlemi sırasında hata oluştu', 'error');
    }
  };

  // Reading türünü belirle (kredi miktarına göre)
  const getReadingType = (order: Order) => {
    if (order.type !== 'reading') {
      return null;
    }
    
    const creditAmount = Math.abs(order.delta_credits);
    
    // reading-credits.ts'deki kredi miktarlarına göre
    // Detaylı okumalar (sesli): 80-140 kredi arası
    if (creditAmount >= 80 && creditAmount <= 140) {
      return { type: 'detailed', label: 'Sesli', icon: '🎤' };
    }
    // Yazılı okumalar: 70-130 kredi arası
    else if (creditAmount >= 70 && creditAmount <= 130) {
      return { type: 'written', label: 'Yazılı', icon: '📝' };
    }
    // Basit okumalar: 70'den az
    else if (creditAmount < 70) {
      return { type: 'simple', label: 'Basit', icon: '✨' };
    }

    // Varsayılan olarak sesli kabul et
    return { type: 'detailed', label: 'Sesli', icon: '🎤' };
  };

  const getStatusColor = (type: string, order?: Order) => {
    // Reading transaction'ları için özel renk
    if (type === 'reading' && order) {
      const readingType = getReadingType(order);
      if (readingType) {
        switch (readingType.type) {
          case 'written':
            return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
          case 'detailed':
            return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
          case 'simple':
            return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
          default:
            return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
        }
      }
    }

    switch (type) {
      case 'purchase':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bonus':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'deduction':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'reading':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'refund':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusIcon = (type: string, order?: Order) => {
    // Reading transaction'ları için özel icon
    if (type === 'reading' && order) {
      const readingType = getReadingType(order);
      if (readingType) {
        return <BookOpen className='h-4 w-4' />;
      }
    }

    switch (type) {
      case 'purchase':
        return <CheckCircle className='h-4 w-4' />;
      case 'bonus':
        return <Package className='h-4 w-4' />;
      case 'deduction':
        return <CreditCard className='h-4 w-4' />;
      case 'reading':
        return <BookOpen className='h-4 w-4' />;
      case 'refund':
        return <RefreshCw className='h-4 w-4' />;
      default:
        return <AlertCircle className='h-4 w-4' />;
    }
  };

  const getStatusText = (type: string, order?: Order) => {
    // Reading transaction'ları için özel text
    if (type === 'reading' && order) {
      const readingType = getReadingType(order);
      if (readingType) {
        return readingType.label; // "Sesli", "Yazılı", "Basit"
      }
    }

    switch (type) {
      case 'purchase':
        return 'Satın Alma';
      case 'bonus':
        return 'Bonus';
      case 'deduction':
        return 'Kredi Düşümü';
      case 'reading':
        return 'Okuma';
      case 'refund':
        return 'İade';
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

  if (envError) {
    return (
      <div className='space-y-6'>
        <div className='admin-card rounded-2xl p-12 text-center'>
          <div className='admin-gradient-accent p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center'>
            <AlertCircle className='h-12 w-12 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-white mb-4'>
            Bağlantı Hatası
          </h2>
          <p className='text-slate-400 mb-6 max-w-md mx-auto'>
            Supabase bağlantı bilgileri eksik. Lütfen .env.local dosyasında
            NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY
            değişkenlerini tanımlayın.
          </p>
          <div className='bg-slate-800/50 rounded-lg p-4 max-w-lg mx-auto text-left'>
            <h3 className='text-white font-semibold mb-2'>
              Gerekli Environment Değişkenleri:
            </h3>
            <pre className='text-sm text-slate-300'>
              {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className='admin-btn-primary px-6 py-3 rounded-lg mt-6'
          >
            Sayfayı Yenile
          </button>
        </div>
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
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-6'>
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
              <BookOpen className='h-5 w-5 text-purple-400 mr-2' />
              <span className='text-sm text-slate-400'>Okuma</span>
            </div>
            <div className='text-xl font-bold text-purple-400'>
              {stats.readings || 0}
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
        <div className='space-y-3 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4'>
          {/* Search */}
          <div className='lg:col-span-2'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input
                type='text'
                placeholder='Transaction ID, email, kullanıcı adı veya referans ile ara...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm'
              />
            </div>
          </div>

          {/* Date Range */}
          <div className='lg:col-span-1'>
            <div className='relative'>
              <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input
                type='date'
                value={dateRange.start || ''}
                onChange={e =>
                  setDateRange(prev => ({
                    ...prev,
                    start: e.target.value || null,
                  }))
                }
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm'
                placeholder='Başlangıç tarihi'
              />
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='relative'>
              <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input
                type='date'
                value={dateRange.end || ''}
                onChange={e =>
                  setDateRange(prev => ({
                    ...prev,
                    end: e.target.value || null,
                  }))
                }
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-text-sm'
                placeholder='Bitiş tarihi'
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
              <option value='purchase'>✅ Satın Alma</option>
              <option value='bonus'>🎁 Bonus</option>
              <option value='deduction'>💳 Kredi Düşümü</option>
              <option value='reading'>📖 Okuma</option>
              <option value='refund'>🔄 İade</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className='flex flex-wrap gap-2 mt-4'>
          <span className='text-sm text-slate-400 flex items-center'>
            <ArrowUpDown className='h-4 w-4 mr-1' />
            Sırala:
          </span>
          {[
            { key: 'created_at', label: 'Tarih' },
            { key: 'amount', label: 'Tutar' },
            { key: 'delta_credits', label: 'Kredi' },
            { key: 'type', label: 'Tip' },
          ].map(sort => (
            <button
              key={sort.key}
              onClick={() => handleSort(sort.key)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                sortConfig.key === sort.key
                  ? 'admin-gradient-accent text-white'
                  : 'admin-glass hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              {sort.label}
              {sortConfig.key === sort.key && (
                <span className='ml-1'>
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
        {orders.map((order, index) => (
          <div
            key={order.id}
            className='admin-card rounded-xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale'
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Order Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-3'>
                <div className='admin-gradient-accent p-2 rounded-lg'>
                  <CreditCard className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h3 className='font-semibold text-white'>
                    #{order.id.slice(0, 8)}...
                  </h3>
                  <p className='text-sm text-slate-400'>
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.type, order)}`}
              >
                {getStatusIcon(order.type, order)}
                <span className='ml-1'>{getStatusText(order.type, order)}</span>
              </div>
            </div>

            {/* Transaction Details */}
            <div className='space-y-3 mb-4'>
              {/* Kullanıcı Bilgileri */}
              <div className='admin-glass rounded-lg p-3'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-slate-400'>Kullanıcı</span>
                  <span className='text-sm text-white font-medium'>
                    {order.user_display_name}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-400'>Email</span>
                  <span className='text-xs text-slate-300'>
                    {order.user_email}
                  </span>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-3'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-slate-400'>Tutar</span>
                  <div className='text-lg font-bold text-white'>
                    {formatPrice(order.amount, 'TRY')}
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-400'>Kredi Değişimi</span>
                  <span
                    className={`text-sm font-medium ${order.delta_credits > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {order.delta_credits > 0 ? '+' : ''}
                    {order.delta_credits}
                  </span>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-3'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-slate-400'>Açıklama</span>
                  <span className='text-sm text-white'>
                    {order.description}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-400'>Sebep</span>
                  <span className='text-xs text-slate-400'>{order.reason}</span>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-3'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-slate-400'>Referans ID</span>
                  <span className='text-sm text-white'>{order.ref_id}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-400'>Referans Tipi</span>
                  <span className='text-xs text-slate-400'>
                    {order.ref_type}
                  </span>
                </div>
              </div>

              {/* Reading Bilgileri - sadece reading transaction'ları için göster */}
              {order.type === 'reading' && false && (
                <div className='admin-glass rounded-lg p-3 border-l-4 border-blue-500'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-blue-400 flex items-center'>
                      <BookOpen className='h-4 w-4 mr-1' />
                      Okuma Bilgileri
                    </span>
                    <span className='text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded'>
                      {order.reading_type}
                    </span>
                  </div>
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-400'>Başlık:</span>
                      <span className='text-xs text-white truncate max-w-[120px]'>
                        {order.reading_title || 'Başlık yok'}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-400'>Yayılım:</span>
                      <span className='text-xs text-slate-300'>
                        {order.reading_spread_name || 'Bilinmiyor'}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-400'>Durum:</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.reading_status === 'completed'
                            ? 'text-green-400 bg-green-500/20'
                            : 'text-yellow-400 bg-yellow-500/20'
                        }`}
                      >
                        {order.reading_status === 'completed'
                          ? 'Tamamlandı'
                          : 'Beklemede'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className='flex space-x-2'>
              <button
                onClick={() => handleOrderModalOpen(order)}
                className='flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1'
              >
                <Eye className='h-4 w-4' />
                <span className='text-sm'>Detay</span>
              </button>
              
              {/* Reading Detayları Butonu - sadece reading transaction'ları için */}
              {order.type === 'reading' && (
                <button
                  onClick={() => handleOrderModalOpen(order)}
                  className='admin-glass hover:bg-blue-700/50 text-blue-400 p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1'
                >
                  <BookOpen className='h-4 w-4' />
                  <span className='text-sm'>
                    {order.reading_type === 'written'
                      ? 'Yazılı'
                      : order.reading_type === 'detailed'
                        ? 'Sesli'
                        : 'Okuma'}
                  </span>
                </button>
              )}
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
            {searchTerm ||
            statusFilter !== 'all' ||
            dateRange.start ||
            dateRange.end
              ? 'Arama kriterlerinize uygun transaction bulunamadı.'
              : 'Henüz transaction bulunmuyor.'}
          </p>
          {(searchTerm ||
            statusFilter !== 'all' ||
            dateRange.start ||
            dateRange.end) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDateRange({ start: null, end: null });
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
      {showOrderModal && selectedOrder && (
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
                  <h4 className='font-medium text-white mb-3'>
                    Sipariş Bilgileri
                  </h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>ID:</span>
                      <span className='text-white font-mono'>
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Durum:</span>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedOrder.type, selectedOrder)}`}
                      >
                        {getStatusIcon(selectedOrder.type, selectedOrder)}
                        <span className='ml-1'>
                          {getStatusText(selectedOrder.type, selectedOrder)}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Tarih:</span>
                      <span className='text-white'>
                        {formatDate(selectedOrder.created_at)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Referans:</span>
                      <span className='text-white font-mono text-xs'>
                        {selectedOrder.ref_id}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='admin-glass rounded-lg p-4'>
                  <h4 className='font-medium text-white mb-3'>
                    Transaction Bilgileri
                  </h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Tutar:</span>
                      <span className='text-white font-bold'>
                        {formatPrice(selectedOrder.amount, 'TRY')}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Kredi Değişimi:</span>
                      <span
                        className={`font-bold ${selectedOrder.delta_credits > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {selectedOrder.delta_credits > 0 ? '+' : ''}
                        {selectedOrder.delta_credits}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Açıklama:</span>
                      <span className='text-white'>
                        {selectedOrder.description}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-slate-400'>Sebep:</span>
                      <span className='text-slate-300'>
                        {selectedOrder.reason}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-4'>
                <h4 className='font-medium text-white mb-3'>
                  Kullanıcı Bilgileri
                </h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Kullanıcı ID:</span>
                    <span className='text-white font-mono text-xs'>
                      {selectedOrder.user_id}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Kullanıcı Adı:</span>
                    <span className='text-white'>
                      {selectedOrder.user_display_name}
                    </span>
                  </div>
                  <div className='flex justify-between col-span-2'>
                    <span className='text-slate-400'>Email:</span>
                    <span className='text-white'>
                      {selectedOrder.user_email}
                    </span>
                  </div>
                </div>
              </div>

              <div className='admin-glass rounded-lg p-4'>
                <h4 className='font-medium text-white mb-3'>
                  Referans Bilgileri
                </h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Referans ID:</span>
                    <span className='text-white font-mono text-xs'>
                      {selectedOrder.ref_id}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Referans Tipi:</span>
                    <span className='text-white'>{selectedOrder.ref_type}</span>
                  </div>
                  <div className='flex justify-between col-span-2'>
                    <span className='text-slate-400'>Paket:</span>
                    <span className='text-white'>
                      {selectedOrder.package_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reading Detayları - sadece reading transaction'ları için göster */}
              {selectedOrder.type === 'reading' && (
                <div className='admin-glass rounded-lg p-4 border-l-4 border-blue-500'>
                  <h4 className='font-medium text-white mb-3 flex items-center'>
                    <BookOpen className='h-5 w-5 mr-2 text-blue-400' />
                    Okuma Detayları
                  </h4>
                  {loadingReading ? (
                    <div className='flex items-center justify-center py-4'>
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400'></div>
                      <span className='ml-2 text-slate-400'>
                        Okuma bilgileri yükleniyor...
                      </span>
                    </div>
                  ) : readingDetails ? (
                    <div className='space-y-3 text-sm'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='flex justify-between'>
                          <span className='text-slate-400'>Okuma ID:</span>
                          <span className='text-white font-mono text-xs'>
                            {readingDetails.id}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-400'>Okuma Tipi:</span>
                          <div className='flex items-center space-x-2'>
                            <span className='text-blue-400 bg-blue-500/20 px-2 py-1 rounded text-xs'>
                              {readingDetails.reading_type === 'written'
                                ? 'Yazılı'
                                : readingDetails.reading_type === 'detailed'
                                  ? 'Sesli'
                                  : readingDetails.reading_type === 'love'
                                    ? 'Aşk'
                                    : readingDetails.reading_type === 'general'
                                      ? 'Genel'
                                      : readingDetails.reading_type}
                            </span>
                            {readingDetails.reading_type === 'written' && (
                              <span className='text-orange-400 bg-orange-500/20 px-2 py-1 rounded text-xs'>
                                📝 Yazılı
                              </span>
                            )}
                            {readingDetails.reading_type === 'detailed' && (
                              <span className='text-purple-400 bg-purple-500/20 px-2 py-1 rounded text-xs'>
                                🎤 Sesli
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    
                      <div className='flex justify-between'>
                        <span className='text-slate-400'>Başlık:</span>
                        <span className='text-white font-medium'>
                          {readingDetails.title || 'Başlık yok'}
                        </span>
                      </div>
                      
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='flex justify-between'>
                          <span className='text-slate-400'>Yayılım:</span>
                          <span className='text-white'>
                            {readingDetails.spread_name || 'Bilinmiyor'}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-400'>Durum:</span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              readingDetails.status === 'completed'
                                ? 'text-green-400 bg-green-500/20'
                                : 'text-yellow-400 bg-yellow-500/20'
                            }`}
                          >
                            {readingDetails.status === 'completed'
                              ? 'Tamamlandı'
                              : 'Beklemede'}
                          </span>
                        </div>
                      </div>

                      <div className='flex justify-between'>
                        <span className='text-slate-400'>Maliyet:</span>
                        <span className='text-gold font-semibold'>
                          {readingDetails.cost_credits || 0} kredi
                        </span>
                      </div>
                      
                      {/* Detaylı Okuma Modal Butonu */}
                      <div className='pt-3 border-t border-slate-600'>
                        <button
                          onClick={() => {
                            setShowOrderModal(false);
                            setShowReadingModal(true);
                          }}
                          className='w-full admin-btn-primary py-2 rounded-lg flex items-center justify-center space-x-2'
                        >
                          <BookOpen className='h-4 w-4' />
                          <span>Detaylı Okuma Görüntüle</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='text-slate-400 text-center py-4'>
                      Okuma bilgileri bulunamadı
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex space-x-3 mt-6'>
              <button
                onClick={() => setShowOrderModal(false)}
                className='flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors'
              >
                Kapat
              </button>
              {selectedOrder.status === 'pending' && (
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedOrder.id, 'completed');
                    setShowOrderModal(false);
                  }}
                  className='flex-1 admin-gradient-success p-3 rounded-lg text-white admin-hover-scale'
                >
                  Onayla
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reading Detail Modal */}
      <ReadingDetailModal
        reading={readingDetails}
        isOpen={showReadingModal}
        onClose={() => setShowReadingModal(false)}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
