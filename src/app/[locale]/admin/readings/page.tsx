/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- components/admin/ReadingDetailModal.tsx: Okuma detay modalı (gerekli)
- hooks/useToast.ts: Toast notification sistemi (gerekli)
- components/shared/ui/LoadingSpinner.tsx: Loading skeleton'ları (gerekli)

Dosyanın amacı:
- Admin paneli okuma yönetimi sayfası
- Kullanıcıların yaptığı tarot okumalarını görüntüleme ve yönetme
- Okuma detaylarını inceleme
- Okuma istatistikleri

Supabase değişkenleri ve tabloları:
- readings: Tarot okumaları
- profiles: Kullanıcı bilgileri (join edilmiş)

Geliştirme önerileri:
- Okuma filtreleme seçenekleri
- Export özelliği
- Real-time güncellemeler
- Okuma kategorileri

Tespit edilen hatalar:
- ✅ Veritabanı şemasına uygun sorgular
- ✅ Kullanıcı bilgileri entegrasyonu
- ✅ Hata yönetimi

Kullanım durumu:
- ✅ Gerekli: Admin okuma yönetimi
- ✅ Production-ready: Tam fonksiyonel
*/

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logError, logSupabaseError } from '@/lib/logger';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';
import { CardSkeleton, TableSkeleton } from '@/components/shared/ui/LoadingSpinner';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Star,
  BookOpen,
  Sparkles,
  Heart,
  Briefcase,
  Target,
  Mic,
  FileText,
  User,
  Calendar,
  Mail,
  MessageSquare
} from 'lucide-react';

interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  spread_name: string;
  title: string;
  interpretation: string;
  cards?: any;
  questions?: any;
  cost_credits: number;
  status: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  user_display_name?: string;
  user_email?: string;
}

export default function ReadingsPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalCredits: 0
  });
  
  const readingsPerPage = 12;

  useEffect(() => {
    fetchReadings();
    fetchStats();
  }, [currentPage, searchTerm, typeFilter, statusFilter]);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('readings')
        .select('reading_type, status, cost_credits');
      
      if (error) {
        logSupabaseError('readings stats fetch', error);
        return;
      }
      
      const readingsData = data || [];
      const completed = readingsData.filter((r: any) => r.status === 'completed').length;
      const pending = readingsData.filter((r: any) => r.status === 'pending').length;
      const failed = readingsData.filter((r: any) => r.status === 'failed').length;
      const totalCredits = readingsData.reduce((sum: number, r: any) => sum + (r.cost_credits || 0), 0);
      
      setStats({
        total: readingsData.length,
        completed,
        pending,
        failed,
        totalCredits
      });
    } catch (error) {
      logError('Error fetching reading stats', error);
    }
  };

  const fetchReadings = async () => {
    setLoading(true);
    try {
      // Toplam okuma sayısını al
      let countQuery = supabase
        .from('readings')
        .select('*', { count: 'exact' });
      
      // Tip filtresi
      if (typeFilter !== 'all') {
        countQuery = countQuery.eq('reading_type', typeFilter);
      }
      
      // Durum filtresi
      if (statusFilter !== 'all') {
        countQuery = countQuery.eq('status', statusFilter);
      }
      
      // Arama terimi
      if (searchTerm) {
        countQuery = countQuery.or(`title.ilike.%${searchTerm}%,spread_name.ilike.%${searchTerm}%,interpretation.ilike.%${searchTerm}%`);
      }
      
      const { count } = await countQuery;
      setTotalCount(count || 0);
      
      // Readings query with user joins
      let query = supabase
        .from('readings')
        .select(`
          *,
          profiles!inner(
            email,
            display_name
          )
        `)
        .range((currentPage - 1) * readingsPerPage, currentPage * readingsPerPage - 1)
        .order('created_at', { ascending: false });
      
      // Tip filtresi
      if (typeFilter !== 'all') {
        query = query.eq('reading_type', typeFilter);
      }
      
      // Durum filtresi
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      // Arama terimi
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,spread_name.ilike.%${searchTerm}%,interpretation.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        logSupabaseError('readings fetch', error);
        setReadings([]);
        return;
      }
      
      // Format readings safely with user data
      const formattedReadings = (data || []).map((reading: any) => ({
        id: reading.id || 'unknown',
        user_id: reading.user_id || 'unknown',
        reading_type: reading.reading_type || 'unknown',
        spread_name: reading.spread_name || 'Bilinmeyen Yayılım',
        title: reading.title || 'Okuma',
        interpretation: reading.interpretation || 'Açıklama yok',
        cards: reading.cards || null,
        questions: reading.questions || null,
        cost_credits: reading.cost_credits || 0,
        status: reading.status || 'pending',
        metadata: reading.metadata || null,
        created_at: reading.created_at || new Date().toISOString(),
        updated_at: reading.updated_at || new Date().toISOString(),
        // Kullanıcı bilgileri
        user_email: reading.profiles?.email || 'Bilinmeyen',
        user_display_name: reading.profiles?.display_name || 'Bilinmeyen Kullanıcı'
      }));
      
      setReadings(formattedReadings);
    } catch (error) {
      logError('Error fetching readings', error);
      showToast('Okumalar yüklenirken hata oluştu', 'error');
      setReadings([]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'love': return <Heart className="h-4 w-4" />;
      case 'career': return <Briefcase className="h-4 w-4" />;
      case 'general': return <Target className="h-4 w-4" />;
      case 'tarot': return <Sparkles className="h-4 w-4" />;
      case 'numerology': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'love': return 'text-pink-400 bg-pink-500/20 border-pink-500/30';
      case 'career': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'general': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'tarot': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'numerology': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'love': return 'Aşk';
      case 'career': return 'Kariyer';
      case 'general': return 'Genel';
      case 'tarot': return 'Tarot';
      case 'numerology': return 'Numeroloji';
      case 'situation-analysis': return 'Durum Analizi';
      case 'problem-solving': return 'Problem Çözme';
      case 'money-spread': return 'Para Yayılımı';
      case 'relationship-problems': return 'İlişki Problemleri';
      case 'relationship-analysis': return 'İlişki Analizi';
      case 'new-lover-spread': return 'Yeni Aşk';
      case 'marriage': return 'Evlilik';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'failed': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'reviewed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'reviewed': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'pending': return 'Beklemede';
      case 'failed': return 'Başarısız';
      case 'reviewed': return 'İncelendi';
      default: return status;
    }
  };

  const getMediaType = (metadata: any) => {
    if (!metadata) return 'text';
    
    // Metadata'dan sesli/yazılı bilgisini çıkar
    if (metadata.platform === 'voice' || metadata.audioEnabled) {
      return 'voice';
    }
    if (metadata.platform === 'web' || metadata.textEnabled) {
      return 'text';
    }
    return 'text';
  };

  const getMediaTypeIcon = (metadata: any) => {
    const mediaType = getMediaType(metadata);
    return mediaType === 'voice' ? <Mic className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const getMediaTypeColor = (metadata: any) => {
    const mediaType = getMediaType(metadata);
    return mediaType === 'voice' 
      ? 'text-purple-400 bg-purple-500/20 border-purple-500/30'
      : 'text-blue-400 bg-blue-500/20 border-blue-500/30';
  };

  const getMediaTypeText = (metadata: any) => {
    const mediaType = getMediaType(metadata);
    return mediaType === 'voice' ? 'Sesli' : 'Yazılı';
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

  const totalPages = Math.ceil(totalCount / readingsPerPage);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="admin-card rounded-2xl p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="admin-gradient-primary p-3 rounded-xl flex-shrink-0">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-white truncate">Okuma Yönetimi</h1>
                <p className="text-slate-400 text-sm md:text-base hidden sm:block">Kullanıcıların tarot okumalarını görüntüle ve yönet</p>
              </div>
            </div>
            
            <button 
              onClick={() => fetchReadings()}
              className="admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target flex-shrink-0 hover:bg-indigo-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Yenile</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-sm text-slate-400">Toplam</span>
            </div>
            <div className="text-xl font-bold text-white">{stats.total}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-slate-400">Tamamlanan</span>
            </div>
            <div className="text-xl font-bold text-green-400">{stats.completed}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm text-slate-400">Beklemede</span>
            </div>
            <div className="text-xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-sm text-slate-400">Başarısız</span>
            </div>
            <div className="text-xl font-bold text-red-400">{stats.failed}</div>
          </div>
          
          <div className="admin-glass rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm text-slate-400">Toplam Kredi</span>
            </div>
            <div className="text-lg font-bold text-purple-400">
              {stats.totalCredits}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Başlık, yayılım veya açıklama ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="all">🔮 Tüm Tipler</option>
              <option value="love">❤️ Aşk</option>
              <option value="career">💼 Kariyer</option>
              <option value="general">🎯 Genel</option>
              <option value="tarot">✨ Tarot</option>
              <option value="numerology">⭐ Numeroloji</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="all">📊 Tüm Durumlar</option>
              <option value="completed">✅ Tamamlanan</option>
              <option value="pending">⏳ Beklemede</option>
              <option value="failed">❌ Başarısız</option>
              <option value="reviewed">👀 İncelenen</option>
            </select>
          </div>
        </div>
      </div>

      {/* Readings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {readings.map((reading, index) => (
          <div 
            key={reading.id}
            className="group relative overflow-hidden admin-card rounded-2xl border border-slate-700/50 admin-hover-lift transition-all duration-300 hover:border-indigo-500/50"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            {/* Header with gradient */}
            <div className="relative p-4 md:p-6 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="admin-gradient-primary p-3 rounded-xl">
                      {getTypeIcon(reading.reading_type)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-base md:text-lg truncate group-hover:text-indigo-300 transition-colors">
                      {reading.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 mt-1">{formatDate(reading.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-shrink-0">
                  <div className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(reading.status)}`}>
                    {getStatusIcon(reading.status)}
                    <span className="ml-1.5 hidden sm:inline">{getStatusText(reading.status)}</span>
                    <span className="ml-1.5 sm:hidden">{getStatusText(reading.status).slice(0, 3)}</span>
                  </div>
                  <div className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs font-semibold ${getMediaTypeColor(reading.metadata)}`}>
                    {getMediaTypeIcon(reading.metadata)}
                    <span className="ml-1.5 hidden sm:inline">{getMediaTypeText(reading.metadata)}</span>
                    <span className="ml-1.5 sm:hidden">{getMediaTypeText(reading.metadata).slice(0, 3)}</span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {reading.user_display_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate text-sm md:text-base">{reading.user_display_name}</p>
                  <p className="text-slate-400 text-xs truncate">{reading.user_email}</p>
                </div>
              </div>

              {/* Reading Type & Spread */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getTypeColor(reading.reading_type)} w-fit`}>
                  {getTypeIcon(reading.reading_type)}
                  <span className="ml-2">{getTypeText(reading.reading_type)}</span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-slate-400 text-xs">Yayılım</p>
                  <p className="text-white text-sm font-medium truncate">{reading.spread_name}</p>
                </div>
              </div>

              {/* Interpretation Preview */}
              <div className="mb-4">
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {reading.interpretation}
                </p>
              </div>

              {/* Cost & Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-lg">{reading.cost_credits}</span>
                  <span className="text-slate-400 text-sm">Kredi</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedReading(reading);
                    setShowReadingModal(true);
                  }}
                  className="group/btn relative overflow-hidden admin-gradient-primary px-4 md:px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Detayları Gör</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>

            {/* Bottom border accent */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {readings.length === 0 && !loading && (
        <div className="admin-card rounded-2xl p-12 text-center">
          <BookOpen className="h-20 w-20 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Okuma Bulunamadı</h3>
          <p className="text-slate-400 mb-6">
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Arama kriterlerinize uygun okuma bulunamadı.'
              : 'Henüz okuma bulunmuyor.'}
          </p>
          {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
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
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-slate-400 text-center sm:text-left">
              {totalCount} okumadan {((currentPage - 1) * readingsPerPage) + 1}-{Math.min(currentPage * readingsPerPage, totalCount)} arası gösteriliyor
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

      {/* Reading Detail Modal */}
      {showReadingModal && selectedReading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-2 md:p-4">
          <div className="relative w-full max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden">
            {/* Modal Container */}
            <div className="admin-card rounded-3xl border border-slate-700/50 overflow-hidden">
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-b border-slate-700/50 p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div className="admin-gradient-primary p-3 md:p-4 rounded-2xl">
                        {getTypeIcon(selectedReading.reading_type)}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 truncate">{selectedReading.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getStatusColor(selectedReading.status)}`}>
                          {getStatusIcon(selectedReading.status)}
                          <span className="ml-2">{getStatusText(selectedReading.status)}</span>
                        </div>
                        <div className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getMediaTypeColor(selectedReading.metadata)}`}>
                          {getMediaTypeIcon(selectedReading.metadata)}
                          <span className="ml-2">{getMediaTypeText(selectedReading.metadata)}</span>
                        </div>
                        <div className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getTypeColor(selectedReading.reading_type)}`}>
                          {getTypeIcon(selectedReading.reading_type)}
                          <span className="ml-2">{getTypeText(selectedReading.reading_type)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReadingModal(false)}
                    className="p-3 admin-glass rounded-2xl admin-hover-scale transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 flex-shrink-0"
                  >
                    <XCircle className="h-6 w-6 text-slate-400 hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto admin-scrollbar">
                <div className="space-y-8">
                  {/* User Info Card */}
                  <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold">
                        {selectedReading.user_display_name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg">{selectedReading.user_display_name}</h4>
                        <p className="text-slate-400">{selectedReading.user_email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Okuma Tarihi</p>
                        <p className="text-white font-medium">{formatDate(selectedReading.created_at)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reading Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="admin-gradient-primary p-3 rounded-xl">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white">Okuma Detayları</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-400 text-sm">Yayılım</p>
                          <p className="text-white font-medium">{selectedReading.spread_name}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Maliyet</p>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-400 font-bold text-lg">{selectedReading.cost_credits}</span>
                            <span className="text-slate-400 text-sm">Kredi</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="admin-gradient-accent p-3 rounded-xl">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white">Teknik Bilgiler</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedReading.metadata?.duration && (
                          <div>
                            <p className="text-slate-400 text-sm">İşlem Süresi</p>
                            <p className="text-white font-medium">{selectedReading.metadata.duration}ms</p>
                          </div>
                        )}
                        {selectedReading.metadata?.platform && (
                          <div>
                            <p className="text-slate-400 text-sm">Platform</p>
                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getMediaTypeColor(selectedReading.metadata)}`}>
                              {getMediaTypeIcon(selectedReading.metadata)}
                              <span className="ml-2">{selectedReading.metadata.platform}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="admin-gradient-success p-3 rounded-xl">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white">Kart Bilgileri</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedReading.cards && Array.isArray(selectedReading.cards) && (
                          <div>
                            <p className="text-slate-400 text-sm">Çekilen Kart Sayısı</p>
                            <p className="text-white font-bold text-xl">{selectedReading.cards.length}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-slate-400 text-sm">Okuma Durumu</p>
                          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedReading.status)}`}>
                            {getStatusIcon(selectedReading.status)}
                            <span className="ml-2">{getStatusText(selectedReading.status)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="admin-gradient-primary p-3 rounded-xl">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-white">Okuma Açıklaması</h4>
                    </div>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedReading.interpretation}
                    </div>
                  </div>

                  {/* Form Cevapları */}
                  {selectedReading.questions && (
                    <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="admin-gradient-accent p-3 rounded-xl">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg">Form Cevapları</h4>
                      </div>
                      
                      {/* Kişisel Bilgiler */}
                      {selectedReading.questions.personalInfo && (
                        <div className="mb-8">
                          <div className="flex items-center space-x-2 mb-4">
                            <User className="h-5 w-5 text-blue-400" />
                            <h5 className="text-lg font-semibold text-white">Kişisel Bilgiler</h5>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedReading.questions.personalInfo.name && (
                              <div className="admin-glass rounded-xl p-4 border border-slate-700/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <p className="text-slate-400 text-sm font-medium">Ad</p>
                                </div>
                                <p className="text-white font-semibold text-lg">{selectedReading.questions.personalInfo.name}</p>
                              </div>
                            )}
                            {selectedReading.questions.personalInfo.surname && (
                              <div className="admin-glass rounded-xl p-4 border border-slate-700/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <p className="text-slate-400 text-sm font-medium">Soyad</p>
                                </div>
                                <p className="text-white font-semibold text-lg">{selectedReading.questions.personalInfo.surname}</p>
                              </div>
                            )}
                            {selectedReading.questions.personalInfo.email && (
                              <div className="admin-glass rounded-xl p-4 border border-slate-700/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Mail className="h-4 w-4 text-blue-400" />
                                  <p className="text-slate-400 text-sm font-medium">Email</p>
                                </div>
                                <p className="text-white font-medium">{selectedReading.questions.personalInfo.email}</p>
                              </div>
                            )}
                            {selectedReading.questions.personalInfo.birthDate && (
                              <div className="admin-glass rounded-xl p-4 border border-slate-700/30">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Calendar className="h-4 w-4 text-blue-400" />
                                  <p className="text-slate-400 text-sm font-medium">Doğum Tarihi</p>
                                </div>
                                <p className="text-white font-medium">{selectedReading.questions.personalInfo.birthDate}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Kullanıcı Soruları */}
                      {selectedReading.questions.userQuestions && (
                        <div className="mb-8">
                          <div className="flex items-center space-x-2 mb-4">
                            <MessageSquare className="h-5 w-5 text-green-400" />
                            <h5 className="text-lg font-semibold text-white">Kullanıcı Soruları</h5>
                          </div>
                          <div className="space-y-6">
                            {Object.entries(selectedReading.questions.userQuestions).map(([key, question]: [string, any], index) => (
                              <div key={key} className="admin-glass rounded-2xl p-6 border border-slate-700/30 hover:border-green-500/30 transition-all duration-300">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1 space-y-4">
                                    <div>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <MessageSquare className="h-4 w-4 text-green-400" />
                                        <p className="text-slate-400 text-sm font-medium">SORU</p>
                                      </div>
                                      <p className="text-white font-semibold text-lg leading-relaxed">
                                        {question.question || key}
                                      </p>
                                    </div>
                                    <div className="border-t border-slate-700/50 pt-4">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <p className="text-slate-400 text-sm font-medium">CEVAP</p>
                                      </div>
                                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                                        <p className="text-white text-base leading-relaxed">
                                          {question.answer || 'Cevap verilmemiş'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Diğer Sorular */}
                      {Object.keys(selectedReading.questions).filter(key => 
                        !['personalInfo', 'userQuestions'].includes(key)
                      ).length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Target className="h-5 w-5 text-purple-400" />
                            <h5 className="text-lg font-semibold text-white">Diğer Bilgiler</h5>
                          </div>
                          <div className="space-y-4">
                            {Object.entries(selectedReading.questions).filter(([key]) => 
                              !['personalInfo', 'userQuestions'].includes(key)
                            ).map(([key, value]: [string, any]) => (
                              <div key={key} className="admin-glass rounded-xl p-4 border border-slate-700/30">
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{key}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                  <p className="text-white font-mono text-sm">
                                    {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Kartlar */}
                  {selectedReading.cards && (
                    <div className="admin-glass rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="admin-gradient-success p-3 rounded-xl">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg">Çekilen Kartlar</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.isArray(selectedReading.cards) && selectedReading.cards.map((card: any, index: number) => (
                          <div key={index} className="group relative admin-glass rounded-2xl p-4 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white font-bold text-lg">
                                {card.nameTr || card.name || `Kart ${index + 1}`}
                              </span>
                              {card.isReversed && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                                  Ters
                                </span>
                              )}
                            </div>
                            {card.name && (
                              <div className="text-sm text-slate-400 mb-2">
                                {card.name}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              {/* Modal Footer */}
              <div className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-t border-slate-700/50 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <div className="text-slate-400 text-sm">
                    Okuma ID: {selectedReading?.id?.slice(0, 8)}...
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        // Copy reading ID to clipboard
                        navigator.clipboard.writeText(selectedReading?.id || '');
                        showToast('Okuma ID kopyalandı', 'success');
                      }}
                      className="px-4 py-2 admin-glass rounded-xl text-slate-300 hover:text-white transition-colors text-sm w-full sm:w-auto"
                    >
                      ID Kopyala
                    </button>
                    <button
                      onClick={() => setShowReadingModal(false)}
                      className="px-6 md:px-8 py-3 admin-gradient-primary rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
