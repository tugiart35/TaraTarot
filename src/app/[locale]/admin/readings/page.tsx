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

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logError, logSupabaseError } from '@/lib/logger';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';
import { useReadingCards } from '@/hooks/useReadingCards';
import { useTarotDeck } from '@/features/tarot/lib/full-tarot-deck';
import type { TarotCard } from '@/types/tarot';
import type { NormalizedTarotReadingType } from '@/hooks/useReadingCards';
import type { Reading as DashboardReading } from '@/types/dashboard.types';
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
  MessageSquare,
  Phone,
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

// Kart detayları için bileşen
interface CardInsightProps {
  card: TarotCard;
  displayName: string;
  positionTitle: string;
  positionNumber: number;
  isReversed: boolean;
  meaning: string;
  keywords: string[];
  context: string;
  group: string;
}

function CardInsight({
  displayName,
  positionTitle,
  positionNumber,
  isReversed,
  meaning = '',
  keywords = [],
  context = '',
  group = '',
}: CardInsightProps) {
  return (
    <div className='group relative admin-glass rounded-2xl p-6 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300'>
      {/* Kart Başlığı */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg'>
            {positionNumber}
          </div>
          <div>
            <h5 className='text-white font-bold text-lg'>{displayName}</h5>
            <p className='text-sm text-slate-400'>{positionTitle}</p>
          </div>
        </div>
        <div className='flex flex-col items-end space-y-2'>
          {isReversed && (
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30'>
              Ters
            </span>
          )}
          {group && (
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30'>
              {group}
            </span>
          )}
        </div>
      </div>

      {/* Kart Anlamı */}
      {meaning && (
        <div className='mb-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
            <p className='text-slate-400 text-sm font-medium'>ANLAM</p>
          </div>
          <p className='text-white leading-relaxed'>{meaning}</p>
        </div>
      )}

      {/* Context */}
      {context && (
        <div className='mb-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            <p className='text-slate-400 text-sm font-medium'>BAĞLAM</p>
          </div>
          <p className='text-slate-300 text-sm leading-relaxed'>{context}</p>
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className='mb-4'>
          <div className='flex items-center space-x-2 mb-3'>
            <div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
            <p className='text-slate-400 text-sm font-medium'>
              ANAHTAR KELİMELER
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            {keywords.map((keyword, keywordIndex) => (
              <span
                key={keywordIndex}
                className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hover Effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
    </div>
  );
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
    totalCredits: 0,
  });

  const readingsPerPage = 12;

  // Tarot destesi - şimdilik kullanılmıyor ama gelecekte kullanılabilir
  useTarotDeck();

  // Seçilen okuma türünü normalize et
  const normalizedType = useMemo<NormalizedTarotReadingType | null>(() => {
    if (!selectedReading?.reading_type) {
      return null;
    }

    const readingType = selectedReading.reading_type.toLowerCase();

    // Tam eşleşme kontrolü önce
    if (readingType === 'love' || readingType === 'aşk') {
      return 'love';
    } else if (readingType === 'career' || readingType === 'kariyer') {
      return 'career';
    } else if (readingType === 'money' || readingType === 'para') {
      return 'money';
    } else if (readingType === 'problem-solving' || readingType === 'problem') {
      return 'problemSolving';
    } else if (
      readingType === 'situation-analysis' ||
      readingType === 'durum'
    ) {
      return 'situationAnalysis';
    } else if (
      readingType === 'relationship-analysis' ||
      readingType === 'ilişki analizi'
    ) {
      return 'relationshipAnalysis';
    } else if (
      readingType === 'relationship-problems' ||
      readingType === 'ilişki problemleri'
    ) {
      return 'relationshipProblems';
    } else if (readingType === 'new-lover' || readingType === 'yeni aşk') {
      return 'newLover';
    } else if (readingType === 'marriage' || readingType === 'evlilik') {
      return 'marriage';
    }

    // Kısmi eşleşme kontrolü
    if (readingType.includes('love') || readingType.includes('aşk')) {
      return 'love';
    } else if (
      readingType.includes('career') ||
      readingType.includes('kariyer')
    ) {
      return 'career';
    } else if (readingType.includes('money') || readingType.includes('para')) {
      return 'money';
    } else if (
      readingType.includes('problem-solving') ||
      readingType.includes('problem')
    ) {
      return 'problemSolving';
    } else if (
      readingType.includes('situation-analysis') ||
      readingType.includes('durum')
    ) {
      return 'situationAnalysis';
    } else if (
      readingType.includes('relationship-analysis') ||
      readingType.includes('ilişki analizi')
    ) {
      return 'relationshipAnalysis';
    } else if (
      readingType.includes('relationship-problems') ||
      readingType.includes('ilişki problemleri')
    ) {
      return 'relationshipProblems';
    } else if (
      readingType.includes('new-lover') ||
      readingType.includes('yeni aşk')
    ) {
      return 'newLover';
    } else if (
      readingType.includes('marriage') ||
      readingType.includes('evlilik')
    ) {
      return 'marriage';
    }

    return null;
  }, [selectedReading?.reading_type]);

  // useReadingCards hook'unu kullanarak kart detaylarını al
  const cardDetails = useReadingCards(
    selectedReading as unknown as DashboardReading,
    null,
    normalizedType
  );

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
      const completed = readingsData.filter(
        (r: any) => r.status === 'completed'
      ).length;
      const pending = readingsData.filter(
        (r: any) => r.status === 'pending'
      ).length;
      const failed = readingsData.filter(
        (r: any) => r.status === 'failed'
      ).length;
      const totalCredits = readingsData.reduce(
        (sum: number, r: any) => sum + (r.cost_credits || 0),
        0
      );

      setStats({
        total: readingsData.length,
        completed,
        pending,
        failed,
        totalCredits,
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
        countQuery = countQuery.or(
          `title.ilike.%${searchTerm}%,spread_name.ilike.%${searchTerm}%,interpretation.ilike.%${searchTerm}%`
        );
      }

      const { count } = await countQuery;
      setTotalCount(count || 0);

      // Readings query - önce sadece readings'i çek
      let query = supabase
        .from('readings')
        .select('*')
        .range(
          (currentPage - 1) * readingsPerPage,
          currentPage * readingsPerPage - 1
        )
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
        query = query.or(
          `title.ilike.%${searchTerm}%,spread_name.ilike.%${searchTerm}%,interpretation.ilike.%${searchTerm}%`
        );
      }

      const { data: readingsData, error } = await query;

      if (error) {
        logSupabaseError('readings fetch', error);
        setReadings([]);
        return;
      }

      // Kullanıcı bilgilerini ayrı ayrı çek
      const userIds = [
        ...new Set((readingsData || []).map((r: any) => r.user_id)),
      ];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, display_name')
        .in('id', userIds);

      if (profilesError) {
        logSupabaseError('profiles fetch', profilesError);
      }

      // Profiles'ı user_id'ye göre map'le
      const profilesMap = new Map();
      (profilesData || []).forEach((profile: any) => {
        profilesMap.set(profile.id, profile);
      });

      // Format readings safely with user data
      const formattedReadings = (readingsData || []).map((reading: any) => {
        const profile = profilesMap.get(reading.user_id);
        return {
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
          user_email: profile?.email || 'Bilinmeyen',
          user_display_name: profile?.display_name || 'Bilinmeyen Kullanıcı',
        };
      });

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
      case 'love':
        return <Heart className='h-4 w-4' />;
      case 'career':
        return <Briefcase className='h-4 w-4' />;
      case 'general':
        return <Target className='h-4 w-4' />;
      case 'tarot':
        return <Sparkles className='h-4 w-4' />;
      case 'numerology':
        return <Star className='h-4 w-4' />;
      default:
        return <BookOpen className='h-4 w-4' />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'love':
        return 'text-pink-400 bg-pink-500/20 border-pink-500/30';
      case 'career':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'general':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'tarot':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'numerology':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'situation-analysis':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'problem-solving':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'love':
        return 'Aşk';
      case 'career':
        return 'Kariyer';
      case 'general':
        return 'Genel';
      case 'tarot':
        return 'Tarot';
      case 'numerology':
        return 'Numeroloji';
      case 'situation-analysis':
        return 'Durum Analizi';
      case 'problem-solving':
        return 'Problem Çözme';
      case 'money-spread':
        return 'Para Yayılımı';
      case 'relationship-problems':
        return 'İlişki Problemleri';
      case 'relationship-analysis':
        return 'İlişki Analizi';
      case 'new-lover-spread':
        return 'Yeni Aşk';
      case 'marriage':
        return 'Evlilik';
      case 'situation-analysis':
        return 'Durum Analizi';
      case 'problem-solving':
        return 'Problem Çözme';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'failed':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'reviewed':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'situation-analysis':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'problem-solving':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
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
      case 'reviewed':
        return <AlertCircle className='h-4 w-4' />;
      default:
        return <AlertCircle className='h-4 w-4' />;
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
      case 'reviewed':
        return 'İncelendi';
      case 'situation-analysis':
        return 'İncelendi';
      case 'problem-solving':
        return 'İncelendi';
      default:
        return status;
    }
  };

  const getMediaType = (metadata: any) => {
    if (!metadata) {
      return 'text';
    }

    // Metadata'dan sesli/yazılı bilgisini çıkar
    // readingFormat alanından kontrol et: 'detailed' = sesli, 'written' = yazılı
    if (metadata.readingFormat === 'detailed') {
      return 'voice';
    }
    if (metadata.readingFormat === 'written') {
      return 'text';
    }

    // Eski format uyumluluğu için platform kontrolü
    if (metadata.platform === 'voice' || metadata.audioEnabled) {
      return 'voice';
    }
    if (metadata.platform === 'web' || metadata.textEnabled) {
      return 'text';
    }

    // Varsayılan olarak yazılı
    return 'text';
  };

  const getMediaTypeIcon = (metadata: any) => {
    const mediaType = getMediaType(metadata);
    return mediaType === 'voice' ? (
      <Mic className='h-4 w-4' />
    ) : (
      <FileText className='h-4 w-4' />
    );
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
      minute: '2-digit',
    });
  };

  const totalPages = Math.ceil(totalCount / readingsPerPage);

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
              <div className='admin-gradient-primary p-3 rounded-xl flex-shrink-0'>
                <BookOpen className='h-5 w-5 md:h-6 md:w-6 text-white' />
              </div>
              <div className='min-w-0 flex-1'>
                <h1 className='text-xl md:text-2xl font-bold text-white truncate'>
                  Okuma Yönetimi
                </h1>
                <p className='text-slate-400 text-sm md:text-base hidden sm:block'>
                  Kullanıcıların tarot okumalarını görüntüle ve yönet
                </p>
              </div>
            </div>

            <button
              onClick={() => fetchReadings()}
              className='admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target flex-shrink-0 hover:bg-indigo-600 transition-colors'
            >
              <RefreshCw className='h-4 w-4' />
              <span className='hidden sm:inline'>Yenile</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6'>
          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <BookOpen className='h-5 w-5 text-indigo-400 mr-2' />
              <span className='text-sm text-slate-400'>Toplam</span>
            </div>
            <div className='text-xl font-bold text-white'>{stats.total}</div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <CheckCircle className='h-5 w-5 text-green-400 mr-2' />
              <span className='text-sm text-slate-400'>Tamamlanan</span>
            </div>
            <div className='text-xl font-bold text-green-400'>
              {stats.completed}
            </div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <Clock className='h-5 w-5 text-yellow-400 mr-2' />
              <span className='text-sm text-slate-400'>Beklemede</span>
            </div>
            <div className='text-xl font-bold text-yellow-400'>
              {stats.pending}
            </div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <XCircle className='h-5 w-5 text-red-400 mr-2' />
              <span className='text-sm text-slate-400'>Başarısız</span>
            </div>
            <div className='text-xl font-bold text-red-400'>{stats.failed}</div>
          </div>

          <div className='admin-glass rounded-lg p-4 text-center'>
            <div className='flex items-center justify-center mb-2'>
              <Star className='h-5 w-5 text-purple-400 mr-2' />
              <span className='text-sm text-slate-400'>Toplam Kredi</span>
            </div>
            <div className='text-lg font-bold text-purple-400'>
              {stats.totalCredits}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='space-y-3 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4'>
          {/* Search */}
          <div className='lg:col-span-2'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input
                type='text'
                placeholder='Başlık, yayılım veya açıklama ile ara...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className='w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
            >
              <option value='all'>🔮 Tüm Tipler</option>
              <option value='love'>❤️ Aşk</option>
              <option value='career'>💼 Kariyer</option>
              <option value='general'>🎯 Genel</option>
              <option value='tarot'>✨ Tarot</option>
              <option value='numerology'>⭐ Numeroloji</option>
              <option value='situation-analysis'>📊 Durum Analizi</option>
              <option value='problem-solving'>🔍 Problem Çözme</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className='w-full px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
            >
              <option value='all'>📊 Tüm Durumlar</option>
              <option value='completed'>✅ Tamamlanan</option>
              <option value='pending'>⏳ Beklemede</option>
              <option value='failed'>❌ Başarısız</option>
              <option value='reviewed'>👀 İncelenen</option>
              <option value='situation-analysis'>📊 Durum Analizi</option>
              <option value='problem-solving'>🔍 Problem Çözme</option>
            </select>
          </div>
        </div>
      </div>

      {/* Readings Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6'>
        {readings.map((reading, index) => (
          <div
            key={reading.id}
            className='group relative overflow-hidden admin-card rounded-2xl border border-slate-700/50 admin-hover-lift transition-all duration-300 hover:border-indigo-500/50'
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Header with gradient */}
            <div className='relative p-4 md:p-6 pb-4'>
              <div className='flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-3 flex-1 min-w-0'>
                  <div className='relative flex-shrink-0'>
                    <div className='admin-gradient-primary p-3 rounded-xl'>
                      {getTypeIcon(reading.reading_type)}
                    </div>
                    <div className='absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center'>
                      <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-bold text-white text-base md:text-lg truncate group-hover:text-indigo-300 transition-colors'>
                      {reading.title}
                    </h3>
                    <p className='text-xs md:text-sm text-slate-400 mt-1'>
                      {formatDate(reading.created_at)}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-shrink-0'>
                  <div
                    className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(reading.status)}`}
                  >
                    {getStatusIcon(reading.status)}
                    <span className='ml-1.5 hidden sm:inline'>
                      {getStatusText(reading.status)}
                    </span>
                    <span className='ml-1.5 sm:hidden'>
                      {getStatusText(reading.status).slice(0, 3)}
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs font-semibold ${getMediaTypeColor(reading.metadata)}`}
                  >
                    {getMediaTypeIcon(reading.metadata)}
                    <span className='ml-1.5 hidden sm:inline'>
                      {getMediaTypeText(reading.metadata)}
                    </span>
                    <span className='ml-1.5 sm:hidden'>
                      {getMediaTypeText(reading.metadata).slice(0, 3)}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className='flex items-center space-x-3 mb-4'>
                <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
                  {reading.user_display_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white font-medium truncate text-sm md:text-base'>
                    {reading.user_display_name}
                  </p>
                  <p className='text-slate-400 text-xs truncate'>
                    {reading.user_email}
                  </p>
                </div>
              </div>

              {/* Reading Type & Spread */}
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0'>
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getTypeColor(reading.reading_type)} w-fit`}
                >
                  {getTypeIcon(reading.reading_type)}
                  <span className='ml-2'>
                    {getTypeText(reading.reading_type)}
                  </span>
                </div>
                <div className='text-left sm:text-right'>
                  <p className='text-slate-400 text-xs'>Yayılım</p>
                  <p className='text-white text-sm font-medium truncate'>
                    {reading.spread_name}
                  </p>
                </div>
              </div>

              {/* Interpretation Preview */}
              <div className='mb-4'>
                <p className='text-slate-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3'>
                  {reading.interpretation}
                </p>
              </div>

              {/* Cost & Button */}
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-2'>
                  <Star className='h-4 w-4 text-yellow-400' />
                  <span className='text-yellow-400 font-bold text-lg'>
                    {reading.cost_credits}
                  </span>
                  <span className='text-slate-400 text-sm'>Kredi</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedReading(reading);
                    setShowReadingModal(true);
                  }}
                  className='group/btn relative overflow-hidden admin-gradient-primary px-4 md:px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto'
                >
                  <span className='relative z-10 flex items-center justify-center space-x-2'>
                    <Eye className='h-4 w-4' />
                    <span>Detayları Gör</span>
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700'></div>
                </button>
              </div>
            </div>

            {/* Bottom border accent */}
            <div className='h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {readings.length === 0 && !loading && (
        <div className='admin-card rounded-2xl p-12 text-center'>
          <BookOpen className='h-20 w-20 text-slate-600 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-white mb-2'>
            Okuma Bulunamadı
          </h3>
          <p className='text-slate-400 mb-6'>
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
          <div className='flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0'>
            <div className='text-sm text-slate-400 text-center sm:text-left'>
              {totalCount} okumadan {(currentPage - 1) * readingsPerPage + 1}-
              {Math.min(currentPage * readingsPerPage, totalCount)} arası
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

      {/* Reading Detail Modal */}
      {showReadingModal && selectedReading && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-2 md:p-4'>
          <div className='relative w-full max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden'>
            {/* Modal Container */}
            <div className='admin-card rounded-3xl border border-slate-700/50 overflow-hidden'>
              {/* Modal Header */}
              <div className='relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-b border-slate-700/50 p-4 md:p-6'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0'>
                  <div className='flex items-center space-x-4 flex-1 min-w-0'>
                    <div className='relative flex-shrink-0'>
                      <div className='admin-gradient-primary p-3 md:p-4 rounded-2xl'>
                        {getTypeIcon(selectedReading.reading_type)}
                      </div>
                      <div className='absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center'>
                        <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                      </div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-xl md:text-2xl font-bold text-white mb-1 truncate'>
                        {selectedReading.title}
                      </h3>
                      <div className='flex flex-wrap items-center gap-2'>
                        <div
                          className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getStatusColor(selectedReading.status)}`}
                        >
                          {getStatusIcon(selectedReading.status)}
                          <span className='ml-2'>
                            {getStatusText(selectedReading.status)}
                          </span>
                        </div>
                        <div
                          className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getMediaTypeColor(selectedReading.metadata)}`}
                        >
                          {getMediaTypeIcon(selectedReading.metadata)}
                          <span className='ml-2'>
                            {getMediaTypeText(selectedReading.metadata)}
                          </span>
                        </div>
                        <div
                          className={`inline-flex items-center px-2 md:px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${getTypeColor(selectedReading.reading_type)}`}
                        >
                          {getTypeIcon(selectedReading.reading_type)}
                          <span className='ml-2'>
                            {getTypeText(selectedReading.reading_type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReadingModal(false)}
                    className='p-3 admin-glass rounded-2xl admin-hover-scale transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 flex-shrink-0'
                  >
                    <XCircle className='h-6 w-6 text-slate-400 hover:text-red-400 transition-colors' />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='p-6 max-h-[calc(100vh-200px)] overflow-y-auto admin-scrollbar'>
                <div className='space-y-8'>
                  {/* User Info Card */}
                  <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                    <div className='flex items-center space-x-4 mb-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold'>
                        {selectedReading.user_display_name
                          ?.charAt(0)
                          ?.toUpperCase() || 'U'}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-bold text-white text-lg'>
                          {selectedReading.user_display_name}
                        </h4>
                        <p className='text-slate-400'>
                          {selectedReading.user_email}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-slate-400 text-sm'>Okuma Tarihi</p>
                        <p className='text-white font-medium'>
                          {formatDate(selectedReading.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reading Details */}
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
                    <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='admin-gradient-primary p-3 rounded-xl'>
                          <BookOpen className='h-5 w-5 text-white' />
                        </div>
                        <h4 className='font-bold text-white'>
                          Okuma Detayları
                        </h4>
                      </div>
                      <div className='space-y-3'>
                        <div>
                          <p className='text-slate-400 text-sm'>Yayılım</p>
                          <p className='text-white font-medium'>
                            {selectedReading.spread_name}
                          </p>
                        </div>
                        <div>
                          <p className='text-slate-400 text-sm'>Maliyet</p>
                          <div className='flex items-center space-x-2'>
                            <Star className='h-4 w-4 text-yellow-400' />
                            <span className='text-yellow-400 font-bold text-lg'>
                              {selectedReading.cost_credits}
                            </span>
                            <span className='text-slate-400 text-sm'>
                              Kredi
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='admin-gradient-accent p-3 rounded-xl'>
                          <Target className='h-5 w-5 text-white' />
                        </div>
                        <h4 className='font-bold text-white'>
                          Teknik Bilgiler
                        </h4>
                      </div>
                      <div className='space-y-3'>
                        {selectedReading.metadata?.duration && (
                          <div>
                            <p className='text-slate-400 text-sm'>
                              İşlem Süresi
                            </p>
                            <p className='text-white font-medium'>
                              {selectedReading.metadata.duration}ms
                            </p>
                          </div>
                        )}
                        {selectedReading.metadata?.readingFormat && (
                          <div>
                            <p className='text-slate-400 text-sm'>
                              Okuma Formatı
                            </p>
                            <div
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getMediaTypeColor(selectedReading.metadata)}`}
                            >
                              {getMediaTypeIcon(selectedReading.metadata)}
                              <span className='ml-2'>
                                {selectedReading.metadata.readingFormatTr ||
                                  (selectedReading.metadata.readingFormat ===
                                  'detailed'
                                    ? 'Sesli'
                                    : selectedReading.metadata.readingFormat ===
                                        'written'
                                      ? 'Yazılı'
                                      : selectedReading.metadata.readingFormat)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                      <div className='flex items-center space-x-3 mb-4'>
                        <div className='admin-gradient-success p-3 rounded-xl'>
                          <Sparkles className='h-5 w-5 text-white' />
                        </div>
                        <h4 className='font-bold text-white'>Kart Bilgileri</h4>
                      </div>
                      <div className='space-y-3'>
                        {selectedReading.cards &&
                          Array.isArray(selectedReading.cards) && (
                            <div>
                              <p className='text-slate-400 text-sm'>
                                Çekilen Kart Sayısı
                              </p>
                              <p className='text-white font-bold text-xl'>
                                {selectedReading.cards.length}
                              </p>
                            </div>
                          )}
                        <div>
                          <p className='text-slate-400 text-sm'>Okuma Durumu</p>
                          <div
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedReading.status)}`}
                          >
                            {getStatusIcon(selectedReading.status)}
                            <span className='ml-2'>
                              {getStatusText(selectedReading.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Cevapları */}
                  {selectedReading.questions && (
                    <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                      <div className='flex items-center space-x-3 mb-6'>
                        <div className='admin-gradient-accent p-3 rounded-xl'>
                          <MessageSquare className='h-5 w-5 text-white' />
                        </div>
                        <h4 className='font-bold text-white text-lg'>
                          Form Cevapları
                        </h4>
                      </div>

                      {/* Kişisel Bilgiler */}
                      {selectedReading.questions.personalInfo && (
                        <div className='mb-8'>
                          <div className='flex items-center space-x-2 mb-4'>
                            <User className='h-5 w-5 text-blue-400' />
                            <h5 className='text-lg font-semibold text-white'>
                              Kişisel Bilgiler
                            </h5>
                          </div>
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {selectedReading.questions.personalInfo.name && (
                              <div className='admin-glass rounded-xl p-4 border border-slate-700/30'>
                                <div className='flex items-center space-x-2 mb-2'>
                                  <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                                  <p className='text-slate-400 text-sm font-medium'>
                                    Ad
                                  </p>
                                </div>
                                <p className='text-white font-semibold text-lg'>
                                  {selectedReading.questions.personalInfo.name}
                                </p>
                              </div>
                            )}
                            {selectedReading.questions.personalInfo.surname && (
                              <div className='admin-glass rounded-xl p-4 border border-slate-700/30'>
                                <div className='flex items-center space-x-2 mb-2'>
                                  <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                                  <p className='text-slate-400 text-sm font-medium'>
                                    Soyad
                                  </p>
                                </div>
                                <p className='text-white font-semibold text-lg'>
                                  {
                                    selectedReading.questions.personalInfo
                                      .surname
                                  }
                                </p>
                              </div>
                            )}
                            {/* Email veya Telefon - hangisi varsa onu göster */}
                            {(selectedReading.questions.personalInfo.email ||
                              selectedReading.questions.personalInfo.phone) && (
                              <div className='admin-glass rounded-xl p-4 border border-slate-700/30'>
                                <div className='flex items-center space-x-2 mb-2'>
                                  {selectedReading.questions.personalInfo
                                    .email ? (
                                    <>
                                      <Mail className='h-4 w-4 text-blue-400' />
                                      <p className='text-slate-400 text-sm font-medium'>
                                        Email
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <Phone className='h-4 w-4 text-blue-400' />
                                      <p className='text-slate-400 text-sm font-medium'>
                                        Telefon
                                      </p>
                                    </>
                                  )}
                                </div>
                                <p className='text-white font-medium'>
                                  {selectedReading.questions.personalInfo
                                    .email ||
                                    selectedReading.questions.personalInfo
                                      .phone}
                                </p>
                              </div>
                            )}
                            {selectedReading.questions.personalInfo
                              .birthDate && (
                              <div className='admin-glass rounded-xl p-4 border border-slate-700/30'>
                                <div className='flex items-center space-x-2 mb-2'>
                                  <Calendar className='h-4 w-4 text-blue-400' />
                                  <p className='text-slate-400 text-sm font-medium'>
                                    Doğum Tarihi
                                  </p>
                                </div>
                                <p className='text-white font-medium'>
                                  {
                                    selectedReading.questions.personalInfo
                                      .birthDate
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Kullanıcı Soruları - Tüm olası formatları destekler */}
                      {selectedReading.questions && (
                        <div className='mb-8'>
                          <div className='flex items-center space-x-2 mb-4'>
                            <MessageSquare className='h-5 w-5 text-green-400' />
                            <h5 className='text-lg font-semibold text-white'>
                              Kullanıcı Soruları
                            </h5>
                          </div>
                          <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4'>
                            {/* 1. Format: userQuestions objesi */}
                            {selectedReading.questions.userQuestions &&
                              typeof selectedReading.questions.userQuestions ===
                                'object' &&
                              Object.keys(
                                selectedReading.questions.userQuestions
                              ).length > 0 && (
                                <div className='space-y-6'>
                                  <h6 className='text-md font-semibold text-indigo-300 mb-2'>
                                    Soru-Cevap Formatı
                                  </h6>
                                  {Object.entries(
                                    selectedReading.questions.userQuestions
                                  ).map(
                                    ([key, value]: [string, any], index) => {
                                      // Açılım türüne göre soru metinleri
                                      const getSpreadQuestionMap = (
                                        readingType: string
                                      ): Record<string, string> => {
                                        const type = readingType.toLowerCase();

                                        if (
                                          type.includes('love') ||
                                          type.includes('aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('money') ||
                                          type.includes('para')
                                        ) {
                                          return {
                                            concern:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            emotional:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            question2:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('career') ||
                                          type.includes('kariyer')
                                        ) {
                                          return {
                                            concern:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('problem-solving') ||
                                          type.includes('problem')
                                        ) {
                                          return {
                                            concern:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            emotional:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            question2:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('situation-analysis') ||
                                          type.includes('durum')
                                        ) {
                                          return {
                                            concern:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('marriage') ||
                                          type.includes('evlilik')
                                        ) {
                                          return {
                                            concern:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-analysis'
                                          ) ||
                                          type.includes('ilişki analizi')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-problems'
                                          ) ||
                                          type.includes('ilişki problemleri')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizdeki problemler nelerdir?',
                                            emotional:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizdeki problemler nelerdir?',
                                            question2:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('new-lover') ||
                                          type.includes('yeni aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                          };
                                        }

                                        // Varsayılan sorular
                                        return {
                                          concern:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          emotional: 'Nasıl hissediyorsunuz?',
                                          understanding:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question1:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          question2:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question3: 'Nasıl hissediyorsunuz?',
                                        };
                                      };

                                      const spreadQuestionMap =
                                        getSpreadQuestionMap(
                                          selectedReading.reading_type
                                        );

                                      // Soru metnini belirle
                                      let questionText = '';
                                      if (
                                        typeof value === 'object' &&
                                        value.question
                                      ) {
                                        questionText = value.question;
                                      } else if (spreadQuestionMap[key]) {
                                        questionText = spreadQuestionMap[key];
                                      } else {
                                        questionText = key;
                                      }

                                      return (
                                        <div
                                          key={key}
                                          className='admin-glass rounded-2xl p-6 border border-slate-700/30 hover:border-green-500/30 transition-all duration-300'
                                        >
                                          <div className='flex items-start space-x-4'>
                                            <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                                              {index + 1}
                                            </div>
                                            <div className='flex-1 space-y-4'>
                                              <div>
                                                <div className='flex items-center space-x-2 mb-2'>
                                                  <MessageSquare className='h-4 w-4 text-green-400' />
                                                  <p className='text-slate-400 text-sm font-medium'>
                                                    SORU
                                                  </p>
                                                </div>
                                                <p className='text-white font-semibold text-lg leading-relaxed'>
                                                  {questionText}
                                                </p>
                                              </div>
                                              <div className='border-t border-slate-700/50 pt-4'>
                                                <div className='flex items-center space-x-2 mb-2'>
                                                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                                                  <p className='text-slate-400 text-sm font-medium'>
                                                    CEVAP
                                                  </p>
                                                </div>
                                                <div className='bg-slate-800/50 rounded-xl p-4 border border-slate-700/30'>
                                                  <p className='text-white text-base leading-relaxed'>
                                                    {typeof value === 'object'
                                                      ? value.answer ||
                                                        'Cevap verilmemiş'
                                                      : String(value)}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}

                            {/* 2. Format: prompts array */}
                            {selectedReading.questions.prompts &&
                              Array.isArray(
                                selectedReading.questions.prompts
                              ) &&
                              selectedReading.questions.prompts.length > 0 && (
                                <div className='space-y-4'>
                                  <h6 className='text-md font-semibold text-indigo-300 mb-2'>
                                    Liste Formatı
                                  </h6>
                                  {selectedReading.questions.prompts.map(
                                    (
                                      entry: { label: string; value: string },
                                      index: number
                                    ) => {
                                      // Açılım türüne göre soru metinleri (yukarıdaki fonksiyonla aynı)
                                      const getSpreadQuestionMap = (
                                        readingType: string
                                      ): Record<string, string> => {
                                        const type = readingType.toLowerCase();

                                        if (
                                          type.includes('love') ||
                                          type.includes('aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('money') ||
                                          type.includes('para')
                                        ) {
                                          return {
                                            concern:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            emotional:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            question2:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('career') ||
                                          type.includes('kariyer')
                                        ) {
                                          return {
                                            concern:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('problem-solving') ||
                                          type.includes('problem')
                                        ) {
                                          return {
                                            concern:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            emotional:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            question2:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('situation-analysis') ||
                                          type.includes('durum')
                                        ) {
                                          return {
                                            concern:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('marriage') ||
                                          type.includes('evlilik')
                                        ) {
                                          return {
                                            concern:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-analysis'
                                          ) ||
                                          type.includes('ilişki analizi')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-problems'
                                          ) ||
                                          type.includes('ilişki problemleri')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizdeki problemler nelerdir?',
                                            emotional:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizdeki problemler nelerdir?',
                                            question2:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('new-lover') ||
                                          type.includes('yeni aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                          };
                                        }

                                        // Varsayılan sorular
                                        return {
                                          concern:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          emotional: 'Nasıl hissediyorsunuz?',
                                          understanding:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question1:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          question2:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question3: 'Nasıl hissediyorsunuz?',
                                        };
                                      };

                                      const spreadQuestionMap =
                                        getSpreadQuestionMap(
                                          selectedReading.reading_type
                                        );
                                      const questionText =
                                        spreadQuestionMap[entry.label] ||
                                        entry.label ||
                                        `Soru ${index + 1}`;

                                      return (
                                        <div
                                          key={index}
                                          className='admin-glass rounded-xl p-4 border border-slate-700/30'
                                        >
                                          <p className='text-xs uppercase tracking-wide text-slate-400 mb-2'>
                                            {questionText}
                                          </p>
                                          <div className='bg-slate-800/50 rounded-xl p-4 border border-slate-700/30'>
                                            <p className='text-white text-base leading-relaxed'>
                                              {entry.value ||
                                                'Cevap verilmemiş'}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}

                            {/* 3. Format: Düz objeler (questions veya diğer alanlar) */}
                            {selectedReading.questions &&
                              typeof selectedReading.questions === 'object' &&
                              Object.keys(selectedReading.questions).filter(
                                key =>
                                  ![
                                    'personalInfo',
                                    'userQuestions',
                                    'prompts',
                                  ].includes(key)
                              ).length > 0 && (
                                <div className='space-y-4'>
                                  <h6 className='text-md font-semibold text-indigo-300 mb-2'>
                                    Diğer Sorular
                                  </h6>
                                  {Object.entries(selectedReading.questions)
                                    .filter(
                                      ([key]) =>
                                        ![
                                          'personalInfo',
                                          'userQuestions',
                                          'prompts',
                                        ].includes(key)
                                    )
                                    .map(([key, value]: [string, any]) => {
                                      // Açılım türüne göre soru metinleri (yukarıdaki fonksiyonla aynı)
                                      const getSpreadQuestionMap = (
                                        readingType: string
                                      ): Record<string, string> => {
                                        const type = readingType.toLowerCase();

                                        if (
                                          type.includes('love') ||
                                          type.includes('aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anda duygusal olarak nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('money') ||
                                          type.includes('para')
                                        ) {
                                          return {
                                            concern:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            emotional:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Para konusunda sizi en çok endişelendiren durum nedir?',
                                            question2:
                                              'Bu para açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Mali durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('career') ||
                                          type.includes('kariyer')
                                        ) {
                                          return {
                                            concern:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Kariyerinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu kariyer açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İş hayatınız hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('problem-solving') ||
                                          type.includes('problem')
                                        ) {
                                          return {
                                            concern:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            emotional:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Hangi problemi çözmek istiyorsunuz?',
                                            question2:
                                              'Bu problem çözme açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problem hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('situation-analysis') ||
                                          type.includes('durum')
                                        ) {
                                          return {
                                            concern:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Mevcut durumunuzda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu durum analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Şu anki durumunuz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('marriage') ||
                                          type.includes('evlilik')
                                        ) {
                                          return {
                                            concern:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Evlilik konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu evlilik açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Evlilik hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-analysis'
                                          ) ||
                                          type.includes('ilişki analizi')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizde sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu ilişki analizi açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'İlişkiniz hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes(
                                            'relationship-problems'
                                          ) ||
                                          type.includes('ilişki problemleri')
                                        ) {
                                          return {
                                            concern:
                                              'İlişkinizdeki problemler nelerdir?',
                                            emotional:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'İlişkinizdeki problemler nelerdir?',
                                            question2:
                                              'Bu ilişki problemleri açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Bu problemler hakkında nasıl hissediyorsunuz?',
                                          };
                                        } else if (
                                          type.includes('new-lover') ||
                                          type.includes('yeni aşk')
                                        ) {
                                          return {
                                            concern:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            emotional:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                            understanding:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question1:
                                              'Yeni aşk konusunda sizi en çok endişelendiren konu nedir?',
                                            question2:
                                              'Bu yeni aşk açılımı ile neyi anlamak istiyorsunuz?',
                                            question3:
                                              'Yeni aşk hakkında nasıl hissediyorsunuz?',
                                          };
                                        }

                                        // Varsayılan sorular
                                        return {
                                          concern:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          emotional: 'Nasıl hissediyorsunuz?',
                                          understanding:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question1:
                                            'Sizi en çok endişelendiren konu nedir?',
                                          question2:
                                            'Bu açılım ile neyi anlamak istiyorsunuz?',
                                          question3: 'Nasıl hissediyorsunuz?',
                                        };
                                      };

                                      const spreadQuestionMap =
                                        getSpreadQuestionMap(
                                          selectedReading.reading_type
                                        );
                                      const questionText =
                                        spreadQuestionMap[key] || key;

                                      if (
                                        typeof value === 'object' &&
                                        value !== null
                                      ) {
                                        return (
                                          <div
                                            key={key}
                                            className='admin-glass rounded-xl p-4 border border-slate-700/30'
                                          >
                                            <p className='text-xs uppercase tracking-wide text-slate-400 mb-2'>
                                              {questionText}
                                            </p>
                                            <div className='bg-slate-800/50 rounded-xl p-4 border border-slate-700/30'>
                                              <pre className='text-white text-sm whitespace-pre-wrap'>
                                                {JSON.stringify(value, null, 2)}
                                              </pre>
                                            </div>
                                          </div>
                                        );
                                      } else if (
                                        value !== null &&
                                        value !== undefined
                                      ) {
                                        return (
                                          <div
                                            key={key}
                                            className='admin-glass rounded-xl p-4 border border-slate-700/30'
                                          >
                                            <p className='text-xs uppercase tracking-wide text-slate-400 mb-2'>
                                              {questionText}
                                            </p>
                                            <div className='bg-slate-800/50 rounded-xl p-4 border border-slate-700/30'>
                                              <p className='text-white text-base leading-relaxed'>
                                                {String(value)}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })}
                                </div>
                              )}

                            {/* Hiçbir soru bulunamadığında */}
                            {(!selectedReading.questions.userQuestions ||
                              Object.keys(
                                selectedReading.questions.userQuestions
                              ).length === 0) &&
                              (!selectedReading.questions.prompts ||
                                selectedReading.questions.prompts.length ===
                                  0) &&
                              Object.keys(selectedReading.questions).filter(
                                key =>
                                  ![
                                    'personalInfo',
                                    'userQuestions',
                                    'prompts',
                                  ].includes(key)
                              ).length === 0 && (
                                <div className='text-center py-4'>
                                  <p className='text-slate-400'>
                                    Kullanıcı soruları bulunamadı.
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {/* Diğer Sorular bölümü kaldırıldı - artık tüm sorular yukarıda gösteriliyor */}
                    </div>
                  )}

                  {/* Kartlar */}
                  {selectedReading.cards && (
                    <div className='admin-glass rounded-2xl p-6 border border-slate-700/50'>
                      <div className='flex items-center space-x-3 mb-6'>
                        <div className='admin-gradient-success p-3 rounded-xl'>
                          <Sparkles className='h-5 w-5 text-white' />
                        </div>
                        <h4 className='font-bold text-white text-lg'>
                          Çekilen Kartlar
                        </h4>
                      </div>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* useReadingCards hook'undan gelen detayları kullan */}
                        {cardDetails.length > 0
                          ? cardDetails.map(cardItem => (
                              <CardInsight
                                key={`${cardItem.position.id}-${cardItem.card.id}`}
                                card={cardItem.card}
                                displayName={cardItem.displayName}
                                positionTitle={cardItem.position.title}
                                positionNumber={cardItem.position.id}
                                isReversed={cardItem.isReversed}
                                meaning={cardItem.meaning || ''}
                                keywords={cardItem.keywords || []}
                                context={cardItem.context || ''}
                                group={
                                  cardItem.card.suit === 'major'
                                    ? 'Majör Arkana'
                                    : cardItem.card.suit === 'cups'
                                      ? 'Kupalar'
                                      : cardItem.card.suit === 'wands'
                                        ? 'Asalar'
                                        : cardItem.card.suit === 'swords'
                                          ? 'Kılıçlar'
                                          : cardItem.card.suit === 'pentacles'
                                            ? 'Tılsımlar'
                                            : 'Bilinmeyen'
                                }
                              />
                            ))
                          : // Fallback: Eğer useReadingCards hook'u çalışmazsa, eski yöntemi kullan
                            Array.isArray(selectedReading.cards) &&
                            selectedReading.cards.map(
                              (card: any, index: number) => (
                                <CardInsight
                                  key={index}
                                  card={{
                                    id: card.id || index,
                                    name: card.name || `Card ${index + 1}`,
                                    nameTr:
                                      card.nameTr ||
                                      card.name ||
                                      `Kart ${index + 1}`,
                                    suit: 'major',
                                    meaning: { upright: '', reversed: '' },
                                    meaningTr: { upright: '', reversed: '' },
                                    keywords: [],
                                    keywordsTr: [],
                                    image: '',
                                  }}
                                  displayName={
                                    card.nameTr ||
                                    card.name ||
                                    `Kart ${index + 1}`
                                  }
                                  positionTitle={`Pozisyon ${index + 1}`}
                                  positionNumber={index + 1}
                                  isReversed={Boolean(card.isReversed)}
                                  meaning={card.meaning || ''}
                                  keywords={[]}
                                  context={''}
                                  group={''}
                                />
                              )
                            )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className='relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-t border-slate-700/50 p-4 md:p-6'>
                  <div className='flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0'>
                    <div className='text-slate-400 text-sm'>
                      Okuma ID: {selectedReading?.id?.slice(0, 8)}...
                    </div>
                    <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto'>
                      <button
                        onClick={() => {
                          // Copy reading ID to clipboard
                          navigator.clipboard.writeText(
                            selectedReading?.id || ''
                          );
                          showToast('Okuma ID kopyalandı', 'success');
                        }}
                        className='px-4 py-2 admin-glass rounded-xl text-slate-300 hover:text-white transition-colors text-sm w-full sm:w-auto'
                      >
                        ID Kopyala
                      </button>
                      <button
                        onClick={() => setShowReadingModal(false)}
                        className='px-6 md:px-8 py-3 admin-gradient-primary rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto'
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
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
