'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import {
  Star,
  Hash,
  Calendar,
  Search,
  Grid,
  List,
  Eye,
  Heart,
  ArrowLeft,
} from 'lucide-react';
import ReadingDetailModal from '@/features/shared/ui/ReadingDetailModal';
import { BottomNavigation } from '@/features/shared/layout';

interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  cards: string;
  interpretation: string;
  questions: any; // JSONB - yeni veri yapısı
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

interface ReadingsPageProps {
  params: Promise<{ locale: string }>;
}

export default function ReadingsPage({ params }: ReadingsPageProps) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ locale: string } | null>(null);
  
  // Tüm hook'ları koşullu return'den önce tanımla
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ReadingFilters>({
    type: 'all',
    dateRange: 'all',
    search: '',
  });
  const [cursor, setCursor] = useState<string | null>(null); // created_at cursor
  const [hasMore, setHasMore] = useState(true);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchReadings = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);

      let query = supabase
        .from('readings')
        .select(
          `
          id,
          user_id,
          reading_type,
          cards,
          interpretation,
          questions,
          status,
          created_at,
          updated_at,
          title,
          cost_credits,
          spread_name
        `,
          { count: 'exact' }
        )
        .eq('user_id', user.id); // Sadece kullanıcının kendi okumalarını çek

      // Type filter
      if (filters.type !== 'all') {
        const typeMapping: Record<string, string[]> = {
          love: ['LOVE_SPREAD_DETAILED', 'LOVE_SPREAD_WRITTEN'],
          general: ['GENERAL_SPREAD', 'THREE_CARD_SPREAD'],
          career: ['CAREER_SPREAD'],
          numerology: ['NUMEROLOGY_READING'],
        };

        const types = typeMapping[filters.type];
        if (types) {
          query = query.in('reading_type', types);
        }
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
        query = query.or(
          `interpretation.ilike.%${filters.search}%,title.ilike.%${filters.search}%`
        );
      }

      // Keyset pagination
      const limit = 20;
      if (cursor) {
        query = query.lt('created_at', cursor);
      }
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      if (data) {
        const processedReadings: Reading[] = data.map((reading: any) => {
          // Okuma türüne göre başlık oluştur
          const getReadingTitle = (readingType: string): string => {
            switch (readingType) {
              case 'LOVE_SPREAD_DETAILED':
              case 'LOVE_SPREAD_WRITTEN':
                return t('readings.loveReading', 'Aşk Okuması');
              case 'GENERAL_SPREAD':
              case 'THREE_CARD_SPREAD':
                return t('readings.generalReading', 'Genel Okuma');
              case 'CAREER_SPREAD':
                return t('readings.careerReading', 'Kariyer Okuması');
              case 'NUMEROLOGY_READING':
                return t('readings.numerologyReading', 'Numeroloji Okuması');
              default:
                return (
                  reading.title || t('readings.mysticReading', 'Mistik Okuma')
                );
            }
          };

          // Özet oluştur (interpretation'dan ilk 100 karakter)
          const summary =
            reading.interpretation.length > 100
              ? reading.interpretation.substring(0, 100) + '...'
              : reading.interpretation;

          // Kredi maliyeti - veritabanından gelen değeri kullan
          const cost_credits = reading.cost_credits || 50;

          // Spread adı - veritabanından gelen değeri kullan veya varsayılan oluştur
          const getSpreadName = (readingType: string): string => {
            switch (readingType) {
              case 'LOVE_SPREAD_DETAILED':
              case 'LOVE_SPREAD_WRITTEN':
                return t('readings.loveSpread', 'Aşk Yayılımı');
              case 'GENERAL_SPREAD':
                return t('readings.generalSpread', 'Genel Yayılım');
              case 'THREE_CARD_SPREAD':
                return t('readings.threeCardSpread', '3 Kart Yayılımı');
              case 'CAREER_SPREAD':
                return t('readings.careerSpread', 'Kariyer Yayılımı');
              case 'NUMEROLOGY_READING':
                return t('readings.numerologyAnalysis', 'Numeroloji Analizi');
              default:
                return (
                  reading.spread_name ||
                  t('readings.mysticSpread', 'Mistik Yayılım')
                );
            }
          };

          return {
            id: reading.id,
            user_id: reading.user_id,
            reading_type: reading.reading_type,
            cards: reading.cards,
            interpretation: reading.interpretation,
            questions: reading.questions,
            status: reading.status,
            created_at: reading.created_at,
            updated_at: reading.updated_at,
            title: getReadingTitle(reading.reading_type),
            summary,
            cost_credits,
            spread_name: getSpreadName(reading.reading_type),
          };
        });

        if (!cursor) {
          setReadings(processedReadings);
        } else {
          setReadings(prev => [...prev, ...processedReadings]);
        }
        // Update cursor and hasMore (keyset)
        const hasNext = processedReadings.length === limit;
        setHasMore(hasNext);
        setCursor(
          hasNext
            ? (processedReadings[processedReadings.length - 1]?.created_at ??
                null)
            : null
        );
      }
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  }, [user, filters, cursor, t]);

  // Params'ı resolve et
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParamsData = await params;
      setResolvedParams(resolvedParamsData);
    };
    resolveParams();
  }, [params]);

  // Locale'i güvenli şekilde al
  const locale = resolvedParams?.locale || 'tr';

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace(`/${locale}/auth`);
        return;
      }
      fetchReadings();
    }
  }, [authLoading, isAuthenticated, router, locale, fetchReadings]);

  const handleFilterChange = (key: keyof ReadingFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCursor(null);
    setReadings([]);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      // Trigger next page fetch; cursor is updated after fetch
      setCursor(prev => prev ?? new Date().toISOString());
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
    const locale = t('common.locale', 'tr-TR');
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Params yüklenene kadar bekle
  if (!resolvedParams) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-300'>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (authLoading || (loading && readings.length === 0)) {
    return (
      <div className='flex flex-col min-h-screen bg-gradient-to-br from-night via-purple-900/20 to-night text-white relative overflow-hidden pb-16'>
        {/* Background Effects */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent'></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <main className='flex-1 relative flex items-center justify-center p-6'>
          <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-12 border border-lavender/20 text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-full mb-6 animate-pulse'>
              <Star className='h-10 w-10 text-night' />
            </div>
            <div className='text-2xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-2'>
              {t('readings.loading', 'Okumalar Yükleniyor')}
            </div>
            <div className='text-lavender/80'>
              {t('readings.preparing', 'Mistik deneyimleriniz hazırlanıyor...')}
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-night via-purple-900/20 to-night text-white relative overflow-hidden pb-16'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent'></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <main className='flex-1 relative container mx-auto px-6 py-8'>
        {/* Header */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center space-x-4'>
              <Link
                href={`/${locale}/dashboard`}
                className='p-3 bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:scale-105'
              >
                <ArrowLeft className='h-5 w-5 text-lavender' />
              </Link>
              <div>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent'>
                  {t('readings.myReadings', 'Okumalarım')}
                </h1>
                <p className='text-lavender/90 text-lg'>
                  {t('readings.allExperiences', 'Tüm mistik deneyimleriniz')}
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-2 bg-gradient-to-r from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-1 border border-lavender/20'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-gold to-yellow-500 text-night shadow-lg transform scale-105'
                    : 'text-lavender hover:text-gold hover:bg-lavender/10'
                }`}
              >
                <Grid className='h-5 w-5' />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-gold to-yellow-500 text-night shadow-lg transform scale-105'
                    : 'text-lavender hover:text-gold hover:bg-lavender/10'
                }`}
              >
                <List className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='group bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-lavender mb-2'>
                  {t('readings.totalReadings', 'Toplam Okuma')}
                </p>
                <p className='text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                  {readings.length}
                </p>
              </div>
              <div className='p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                <Star className='h-6 w-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-lavender mb-2'>
                  {t('readings.loveReadings', 'Aşk Okumaları')}
                </p>
                <p className='text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent'>
                  {readings.filter(r => r.reading_type.includes('LOVE')).length}
                </p>
              </div>
              <div className='p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                <Heart className='h-6 w-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-lavender mb-2'>
                  {t('readings.generalReadings', 'Genel Okumalar')}
                </p>
                <p className='text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                  {
                    readings.filter(
                      r =>
                        r.reading_type.includes('GENERAL') ||
                        r.reading_type.includes('THREE_CARD')
                    ).length
                  }
                </p>
              </div>
              <div className='p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                <Star className='h-6 w-6 text-white' />
              </div>
            </div>
          </div>

          <div className='group bg-gradient-to-br from-gold/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-gold/20'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-lavender mb-2'>
                  {t('readings.totalCredits', 'Toplam Kredi')}
                </p>
                <p className='text-3xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent'>
                  {readings.reduce((sum, r) => sum + r.cost_credits, 0)}
                </p>
              </div>
              <div className='p-3 bg-gradient-to-br from-gold to-yellow-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                <Calendar className='h-6 w-6 text-night' />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='bg-gradient-to-r from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-lavender/20'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4'>
            <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-lavender/70' />
                <input
                  type='text'
                  placeholder={t('readings.searchPlaceholder', 'Okuma ara...')}
                  value={filters.search}
                  onChange={e => handleFilterChange('search', e.target.value)}
                  className='pl-12 pr-4 py-3 border border-lavender/20 rounded-xl bg-white/5 text-white placeholder-lavender/60 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm'
                />
              </div>

              <select
                value={filters.type}
                onChange={e => handleFilterChange('type', e.target.value)}
                className='px-4 py-3 border border-lavender/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm'
              >
                <option value='all'>
                  {t('readings.allTypes', 'Tüm Türler')}
                </option>
                <option value='love'>
                  {t('readings.loveReading', 'Aşk Okuması')}
                </option>
                <option value='general'>
                  {t('readings.generalReading', 'Genel Okuma')}
                </option>
                <option value='career'>
                  {t('readings.careerReading', 'Kariyer Okuması')}
                </option>
                <option value='numerology'>
                  {t('readings.numerologyReading', 'Numeroloji')}
                </option>
              </select>

              <select
                value={filters.dateRange}
                onChange={e => handleFilterChange('dateRange', e.target.value)}
                className='px-4 py-3 border border-lavender/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm'
              >
                <option value='all'>
                  {t('readings.allTime', 'Tüm Zamanlar')}
                </option>
                <option value='week'>
                  {t('readings.lastWeek', 'Son 1 Hafta')}
                </option>
                <option value='month'>
                  {t('readings.lastMonth', 'Son 1 Ay')}
                </option>
                <option value='year'>
                  {t('readings.lastYear', 'Son 1 Yıl')}
                </option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilters({
                  type: 'all',
                  dateRange: 'all',
                  search: '',
                });
                setCursor(null);
                setReadings([]);
              }}
              className='px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20'
            >
              {t('readings.clearFilters', 'Filtreleri Temizle')}
            </button>
          </div>
        </div>

        {/* Content */}
        {readings.length > 0 ? (
          <div>
            {viewMode === 'grid' ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {readings.map(reading => (
                  <div
                    key={reading.id}
                    className='group bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'
                  >
                    <div className='flex items-center justify-between mb-6'>
                      <div
                        className={`p-3 rounded-xl ${
                          reading.reading_type.includes('LOVE')
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500'
                            : reading.reading_type.includes('GENERAL') ||
                                reading.reading_type.includes('THREE_CARD')
                              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                              : reading.reading_type.includes('CAREER')
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                                : 'bg-gradient-to-br from-purple-500 to-indigo-500'
                        } group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {reading.reading_type.includes('LOVE') ? (
                          <Heart className='h-6 w-6 text-white' />
                        ) : reading.reading_type.includes('NUMEROLOGY') ? (
                          <Hash className='h-6 w-6 text-white' />
                        ) : (
                          <Star className='h-6 w-6 text-white' />
                        )}
                      </div>
                      <span className='text-xs px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 font-semibold'>
                        {reading.cost_credits} {t('readings.credits', 'kredi')}
                      </span>
                    </div>

                    <h3 className='font-bold text-white mb-3 line-clamp-2 text-lg'>
                      {reading.title}
                    </h3>
                    <p className='text-sm text-lavender/80 mb-4 line-clamp-3 leading-relaxed'>
                      {reading.summary}
                    </p>

                    <div className='flex items-center justify-between text-xs text-lavender/70 mb-6'>
                      <span>{formatDate(reading.created_at)}</span>
                      <span>
                        {reading.spread_name ||
                          t('readings.generalReading', 'Genel Okuma')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewReading(reading)}
                      className='w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center'
                    >
                      <Eye className='h-4 w-4 mr-2' />
                      {t('readings.view', 'Görüntüle')}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className='space-y-6'>
                {readings.map(reading => (
                  <div
                    key={reading.id}
                    className='group bg-gradient-to-r from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-6'>
                        <div
                          className={`p-4 rounded-xl ${
                            reading.reading_type.includes('LOVE')
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500'
                              : reading.reading_type.includes('GENERAL') ||
                                  reading.reading_type.includes('THREE_CARD')
                                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                : reading.reading_type.includes('CAREER')
                                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                                  : 'bg-gradient-to-br from-purple-500 to-indigo-500'
                          } group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          {reading.reading_type.includes('LOVE') ? (
                            <Heart className='h-6 w-6 text-white' />
                          ) : reading.reading_type.includes('NUMEROLOGY') ? (
                            <Hash className='h-6 w-6 text-white' />
                          ) : (
                            <Star className='h-6 w-6 text-white' />
                          )}
                        </div>

                        <div className='flex-1'>
                          <h3 className='font-bold text-white mb-2 text-lg'>
                            {reading.title}
                          </h3>
                          <p className='text-sm text-lavender/80 mb-3 line-clamp-2 leading-relaxed'>
                            {reading.summary}
                          </p>

                          <div className='flex items-center space-x-4 text-xs text-lavender/70'>
                            <span>{formatDate(reading.created_at)}</span>
                            <span>
                              {reading.spread_name ||
                                t('readings.generalReading', 'Genel Okuma')}
                            </span>
                            <span className='px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 font-semibold'>
                              {reading.cost_credits}{' '}
                              {t('readings.credits', 'kredi')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewReading(reading)}
                        className='bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 flex items-center'
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        {t('readings.view', 'Görüntüle')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className='text-center mt-12'>
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className='px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                >
                  {loading
                    ? t('readings.loading', 'Yükleniyor...')
                    : t('readings.loadMore', 'Daha Fazla Yükle')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-16 border border-lavender/20 text-center'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-lavender/20 to-purple-500/20 rounded-full mb-8'>
              <Star className='h-12 w-12 text-lavender/70' />
            </div>
            <h3 className='text-3xl font-bold text-white mb-4'>
              {t('readings.noReadings', 'Henüz Okuma Yok')}
            </h3>
            <p className='text-lavender/90 mb-8 max-w-md mx-auto leading-relaxed text-lg'>
              {t(
                'readings.firstExperience',
                'İlk mistik deneyiminizi yaşamaya hazır mısınız? Tarot kartları sizi bekliyor...'
              )}
            </p>
            <Link
              href={`/${locale}/tarot`}
              className='inline-flex items-center space-x-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20'
            >
              <Star className='h-5 w-5' />
              <span>
                {t('readings.startFirstReading', 'İlk Okumayı Başlat')}
              </span>
            </Link>
          </div>
        )}

        {/* Okuma Detay Modal */}
        <ReadingDetailModal
          reading={selectedReading}
          isOpen={showModal}
          onClose={closeModal}
        />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
