'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Star,
  Hash,
  Calendar,
  Search,
  Grid,
  List,
  Download,
  Eye,
  Heart,
  ArrowLeft,
} from 'lucide-react';
import ReadingDetailModal from '@/features/shared/ui/ReadingDetailModal';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';

interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  cards: string;
  interpretation: string;
  question: string;
  status: 'pending' | 'reviewed' | 'completed';
  created_at: string;
  updated_at?: string;
  admin_notes?: string;
  // Hesaplanan alanlar
  title: string;
  summary: string;
  cost_credits: number;
  spread_name: string;
}

interface ReadingFilters {
  type: 'all' | 'love' | 'general' | 'career' | 'numerology';
  dateRange: 'week' | 'month' | 'year' | 'all';
  search: string;
}

export default function ReadingsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  // Geçici olarak çeviri fonksiyonunu devre dışı bırak
  const translate = (key: string, fallback: string) => {
    return fallback;
  };
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ReadingFilters>({
    type: 'all',
    dateRange: 'all',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/tr/auth');
        return;
      }
      fetchReadings();
    }
  }, [authLoading, isAuthenticated, filters, currentPage, router]);

  const fetchReadings = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      let query = supabase
        .from('tarot_readings')
        .select(`
          id,
          user_id,
          reading_type,
          cards,
          interpretation,
          question,
          status,
          created_at,
          updated_at,
          admin_notes
        `, { count: 'exact' })
        .eq('user_id', user.id); // Sadece kullanıcının kendi okumalarını çek

      // Type filter
      if (filters.type !== 'all') {
        query = query.eq('reading_type', filters.type);
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const now = new Date();
        const startDate = new Date();
        
        switch (filters.dateRange) {
          case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        query = query.gte('created_at', startDate.toISOString());
      }

      // Search filter
      if (filters.search) {
        query = query.or(`interpretation.ilike.%${filters.search}%,admin_notes.ilike.%${filters.search}%`);
      }

      // Pagination
      const limit = 20;
      const offset = (currentPage - 1) * limit;
      
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      if (data) {
        const processedReadings: Reading[] = data.map((reading) => {
          // Okuma türüne göre başlık oluştur
          const title = reading.reading_type === 'love' ? 'Aşk Okuması' : 
                       reading.reading_type === 'general' ? 'Genel Okuma' : 
                       reading.reading_type === 'career' ? 'Kariyer Okuması' : 
                       'Mistik Okuma';
          
          // Özet oluştur (interpretation'dan ilk 100 karakter)
          const summary = reading.interpretation.length > 100 ? 
                         reading.interpretation.substring(0, 100) + '...' : 
                         reading.interpretation;
          
          // Kredi maliyeti hesapla (okuma türüne göre) - sadece gerekli olanlar
          const getCreditCost = (readingType: string): number => {
            switch (readingType) {
              case 'LOVE_SPREAD_DETAILED':
                return READING_CREDIT_CONFIGS.LOVE_SPREAD_DETAILED.cost;
              case 'LOVE_SPREAD_WRITTEN':
                return READING_CREDIT_CONFIGS.LOVE_SPREAD_WRITTEN.cost;
              default:
                return reading.cost_credits || 50; // Fallback - yazılı okuma varsayılan
            }
          };
          const cost_credits = getCreditCost(reading.reading_type);
          
          // Spread adı oluştur
          const spread_name = reading.reading_type === 'love' ? 'Aşk Yayılımı' : 
                             reading.reading_type === 'general' ? '3 Kart Yayılımı' : 
                             reading.reading_type === 'career' ? 'Kariyer Yayılımı' : 
                             'Genel Yayılım';
          
          return {
            id: reading.id,
            user_id: reading.user_id,
            reading_type: reading.reading_type,
            cards: reading.cards,
            interpretation: reading.interpretation,
            question: reading.question,
            status: reading.status,
            created_at: reading.created_at,
            updated_at: reading.updated_at,
            admin_notes: reading.admin_notes,
            title,
            summary,
            cost_credits,
            spread_name
          };
        });

        if (currentPage === 1) {
          setReadings(processedReadings);
        } else {
          setReadings(prev => [...prev, ...processedReadings]);
        }

        setTotalCount(count || 0);
        setHasMore((count || 0) > offset + limit);
      }
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ReadingFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setReadings([]);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleViewReading = (reading: Reading) => {
    setSelectedReading(reading);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReading(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'love': return '💕';
      case 'general': return '🔮';
      case 'career': return '💼';
      case 'numerology': return '🔢';
      default: return '🔮';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'love': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'general': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'career': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'numerology': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  if (authLoading || (loading && currentPage === 1)) {
    return (
      <div className="min-h-screen admin-bg p-6">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <Star className="h-12 w-12 text-admin-accent mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">{translate('dashboard.readingsPage.loading', 'Yükleniyor...')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen admin-bg p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="admin-card rounded-lg p-2 admin-hover-lift">
              <ArrowLeft className="h-5 w-5 text-admin-text" />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-admin-text">{translate('dashboard.readingsPage.title', 'Okumalarım')}</h1>
              <p className="text-admin-text-muted">{translate('dashboard.readingsPage.subtitle', 'Tüm mistik deneyimleriniz')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-admin-accent text-white' 
                  : 'admin-card text-admin-text-muted hover:text-admin-text'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-admin-accent text-white' 
                  : 'admin-card text-admin-text-muted hover:text-admin-text'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="admin-card rounded-xl p-4 admin-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.totalReadings', 'Toplam Okuma')}</p>
                <p className="text-2xl font-bold text-admin-text">{totalCount}</p>
              </div>
              <div className="p-2 bg-admin-accent/20 rounded-lg">
                <Star className="h-6 w-6 text-admin-accent" />
              </div>
            </div>
          </div>
          
          <div className="admin-card rounded-xl p-4 admin-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.loveReadings', 'Aşk Okumaları')}</p>
                <p className="text-2xl font-bold text-admin-text">
                  {readings.filter(r => r.reading_type === 'love').length}
                </p>
              </div>
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Heart className="h-6 w-6 text-pink-400" />
              </div>
            </div>
          </div>
          
          <div className="admin-card rounded-xl p-4 admin-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.generalReadings', 'Genel Okumalar')}</p>
                <p className="text-2xl font-bold text-admin-text">
                  {readings.filter(r => r.reading_type === 'general').length}
                </p>
              </div>
              <div className="p-2 bg-admin-purple/20 rounded-lg">
                <Star className="h-6 w-6 text-admin-purple" />
              </div>
            </div>
          </div>
          
          <div className="admin-card rounded-xl p-4 admin-hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.totalCredits', 'Toplam Kredi')}</p>
                <p className="text-2xl font-bold text-admin-text">
                  {readings.reduce((sum, r) => sum + r.cost_credits, 0)}
                </p>
              </div>
              <div className="p-2 bg-admin-green/20 rounded-lg">
                <Calendar className="h-6 w-6 text-admin-green" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-admin-text-muted" />
                <input
                  type="text"
                  placeholder={translate('dashboard.readingsPage.searchPlaceholder', 'Okuma ara...')}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 pr-4 py-2 border border-admin-border rounded-lg bg-admin-dark text-admin-text focus:ring-2 focus:ring-admin-accent focus:border-transparent"
                />
              </div>
              
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="px-4 py-2 border border-admin-border rounded-lg bg-admin-dark text-admin-text focus:ring-2 focus:ring-admin-accent focus:border-transparent"
              >
                <option value="all">{translate('dashboard.readingsPage.allTypes', 'Tüm Türler')}</option>
                <option value="love">{translate('dashboard.readingsPage.loveType', 'Aşk Okuması')}</option>
                <option value="general">{translate('dashboard.readingsPage.generalType', 'Genel Okuma')}</option>
                <option value="career">{translate('dashboard.readingsPage.careerType', 'Kariyer Okuması')}</option>
                <option value="numerology">{translate('dashboard.readingsPage.numerologyType', 'Numeroloji')}</option>
              </select>
              
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="px-4 py-2 border border-admin-border rounded-lg bg-admin-dark text-admin-text focus:ring-2 focus:ring-admin-accent focus:border-transparent"
              >
                <option value="all">{translate('dashboard.readingsPage.allTime', 'Tüm Zamanlar')}</option>
                <option value="week">{translate('dashboard.readingsPage.lastWeek', 'Son 1 Hafta')}</option>
                <option value="month">{translate('dashboard.readingsPage.lastMonth', 'Son 1 Ay')}</option>
                <option value="year">{translate('dashboard.readingsPage.lastYear', 'Son 1 Yıl')}</option>
              </select>
            </div>
            
            <button
              onClick={() => {
                setFilters({
                  type: 'all',
                  dateRange: 'all',
                  search: ''
                });
                setCurrentPage(1);
                setReadings([]);
              }}
              className="admin-btn-primary px-4 py-2 rounded-lg"
            >
              {translate('dashboard.readingsPage.clearFilters', 'Filtreleri Temizle')}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {readings.length > 0 ? (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {readings.map((reading) => (
                <div key={reading.id} className="admin-card rounded-xl p-6 admin-hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${
                      reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? 'bg-admin-purple/20' : 'bg-admin-cyan/20'
                    }`}>
                      {reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? (
                        <Star className="h-5 w-5 text-admin-purple" />
                      ) : (
                        <Hash className="h-5 w-5 text-admin-cyan" />
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? 'bg-admin-purple/20 text-admin-purple' : 'bg-admin-cyan/20 text-admin-cyan'
                    }`}>
                      {reading.cost_credits} {translate('dashboard.readingsPage.credits', 'kredi')}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-admin-text mb-2 line-clamp-2">{reading.title}</h3>
                  <p className="text-sm text-admin-text-muted mb-4 line-clamp-3">{reading.summary}</p>
                  
                  <div className="flex items-center justify-between text-xs text-admin-text-muted mb-4">
                    <span>{formatDate(reading.created_at)}</span>
                    <span>{reading.spread_name || 'Genel Okuma'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewReading(reading)}
                      className="flex-1 admin-btn-primary py-2 rounded-lg text-sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {translate('dashboard.readingsPage.view', 'Görüntüle')}
                    </button>
                    <button className="p-2 admin-card rounded-lg text-admin-text-muted hover:text-admin-text">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {readings.map((reading) => (
                <div key={reading.id} className="admin-card rounded-xl p-6 admin-hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? 'bg-admin-purple/20' : 'bg-admin-cyan/20'
                      }`}>
                        {reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? (
                          <Star className="h-5 w-5 text-admin-purple" />
                        ) : (
                          <Hash className="h-5 w-5 text-admin-cyan" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-admin-text mb-1">{reading.title}</h3>
                        <p className="text-sm text-admin-text-muted mb-2 line-clamp-2">{reading.summary}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-admin-text-muted">
                          <span>{formatDate(reading.created_at)}</span>
                          <span>{reading.spread_name || 'Genel Okuma'}</span>
                          <span className={`px-2 py-1 rounded-full ${
                            reading.reading_type === 'love' || reading.reading_type === 'general' || reading.reading_type === 'career' ? 'bg-admin-purple/20 text-admin-purple' : 'bg-admin-cyan/20 text-admin-cyan'
                          }`}>
                            {reading.cost_credits} {translate('dashboard.readingsPage.credits', 'kredi')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewReading(reading)}
                        className="admin-btn-primary px-4 py-2 rounded-lg text-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {translate('dashboard.readingsPage.view', 'Görüntüle')}
                      </button>
                      <button className="p-2 admin-card rounded-lg text-admin-text-muted hover:text-admin-text">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="admin-btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? translate('dashboard.readingsPage.loading', 'Yükleniyor...') : translate('dashboard.readingsPage.loadMore', 'Daha Fazla Yükle')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-card rounded-xl p-12 text-center">
          <Star className="h-16 w-16 text-admin-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-admin-text mb-2">{translate('dashboard.readingsPage.noReadings', 'Henüz Okuma Yok')}</h3>
          <p className="text-admin-text-muted mb-6">
            {translate('dashboard.readingsPage.noReadingsDesc', 'İlk mistik deneyiminizi yaşamaya hazır mısınız?')}
          </p>
          <a 
            href="/tarot" 
            className="admin-btn-primary px-6 py-3 rounded-lg inline-block"
          >
            {translate('dashboard.readingsPage.startFirstReading', 'İlk Okumayı Başlat')}
          </a>
        </div>
      )}

      {/* Okuma Detay Modal */}
      <ReadingDetailModal
        reading={selectedReading}
        isOpen={showModal}
        onClose={closeModal}
      />
    </div>
  );
}
