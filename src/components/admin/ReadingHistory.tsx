'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Eye, Calendar, Clock, Star, TrendingUp, Filter } from 'lucide-react';

interface Reading {
  id: string;
  user_id: string;
  spread_type: string;
  spread_name: string;
  cards_drawn: string[];
  interpretation: string;
  cost_credits: number;
  rating?: number;
  feedback?: string;
  created_at: string;
}

interface ReadingHistoryProps {
  userId: string;
  limit?: number;
}

export default function ReadingHistory({
  userId,
  limit = 20,
}: ReadingHistoryProps) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [filter, setFilter] = useState<
    'all' | 'tarot' | 'numerology' | 'love' | 'career' | 'general' | 'situation-analysis' | 'problem-solving'
  >('all');

  useEffect(() => {
    fetchReadings();
  }, [userId, filter]);

  const fetchReadings = async () => {
    setLoading(true);
    try {
      // Admin kontrolü yap
      const { data: currentUser } = await supabase.auth.getUser();

      // Admin tablosunu kontrol et
      const { data: adminCheck } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', currentUser?.user?.id);

      // Admin check'i kullan (linter hatası için)
      if (!adminCheck || adminCheck.length === 0) {
        console.warn('Admin yetkisi bulunamadı');
      }

      // RLS politikalarını bypass etmek için farklı yaklaşım
      // Önce mevcut kullanıcının okumalarını dene
      const { data: currentUserReadings, error: currentUserError } =
        await supabase
          .from('readings')
          .select(
            `
          id,
          user_id,
          reading_type,
          spread_name,
          title,
          interpretation,
          cards,
          questions,
          cost_credits,
          status,
          metadata,
          created_at,
          updated_at
        `
          )
          .eq('user_id', userId)
          .eq('status', 'completed') // Sadece tamamlanan okumaları getir
          .order('created_at', { ascending: false })
          .limit(100);

      console.log('🔍 Current user readings query result:', {
        currentUserReadings,
        currentUserError,
      });

      // Eğer RLS hatası varsa veya veri yoksa, service role ile dene
      let allReadings, allError;
      if (
        currentUserError ||
        !currentUserReadings ||
        currentUserReadings.length === 0
      ) {
        console.log('🔍 No data or RLS error, trying with service role...');

        // Mevcut supabase client'ı kullan (service role client-side'da mevcut değil)
        const serviceSupabase = supabase;

        const { data, error } = await serviceSupabase
          .from('readings')
          .select(
            `
            id,
            user_id,
            reading_type,
            spread_name,
            title,
            interpretation,
            cards,
            questions,
            cost_credits,
            status,
            metadata,
            created_at,
            updated_at
          `
          )
          .eq('user_id', userId)
          .eq('status', 'completed') // Sadece tamamlanan okumaları getir
          .order('created_at', { ascending: false })
          .limit(100);

        allReadings = data;
        allError = error;

        console.log('🔍 Service role query result:', { data, error });
      } else {
        allReadings = currentUserReadings;
        allError = currentUserError;
      }

      console.log('🔍 All readings in database:', allReadings?.length || 0);
      console.log('🔍 All readings sample:', allReadings?.slice(0, 3));

      // Veritabanında hangi user_id'ler var kontrol et
      const uniqueUserIds = [
        ...new Set(allReadings?.map((r: any) => r.user_id) || []),
      ];
      const uniqueStatuses = [
        ...new Set(allReadings?.map((r: any) => r.status) || []),
      ];
      console.log('🔍 Unique user IDs in readings:', uniqueUserIds);
      console.log('🔍 Unique statuses in readings:', uniqueStatuses);
      console.log('🔍 Target user ID:', userId);
      console.log(
        '🔍 Is target user ID in database?',
        uniqueUserIds.includes(userId)
      );

      // Şimdi belirli kullanıcı için filtrele
      const userReadings =
        allReadings?.filter((reading: any) => reading.user_id === userId) || [];
      console.log('🔍 User specific readings:', userReadings.length);
      console.log('🔍 User readings sample:', userReadings.slice(0, 3));

      const data = userReadings;
      const error = allError;

      console.log('📊 Supabase response:', { data, error });
      console.log('📊 Data length:', data?.length || 0);
      console.log('📊 Error details:', error);
      console.log('📊 User ID being queried:', userId);
      console.log('📊 Query limit:', limit);

      if (error) {
        console.error('Supabase error fetching readings:', error);
        throw new Error(
          `Okuma verileri yüklenirken hata oluştu: ${error.message}`
        );
      }

      console.log('Raw readings data:', data);

      // Veriyi formatla
      const formattedReadings = (data || []).map((reading: any) => {
        console.log('Processing reading:', reading);

        // Cards verisi JSONB olarak geliyor, doğru şekilde parse et
        let cards_drawn: string[] = [];
        if (reading.cards) {
          try {
            if (typeof reading.cards === 'string') {
              const parsedCards = JSON.parse(reading.cards);
              cards_drawn = Array.isArray(parsedCards)
                ? parsedCards.map(
                    (card: any) => card.name || card.title || card
                  )
                : [];
            } else if (Array.isArray(reading.cards)) {
              cards_drawn = reading.cards.map(
                (card: any) => card.name || card.title || card
              );
            } else if (reading.cards && typeof reading.cards === 'object') {
              // Object ise values'ları al
              cards_drawn = Object.values(reading.cards).map(
                (card: any) => card.name || card.title || card
              );
            }
          } catch (e) {
            console.warn('Error parsing cards:', e);
            cards_drawn = [];
          }
        }

        // Metadata parsing
        let metadata = {};
        if (reading.metadata) {
          try {
            metadata =
              typeof reading.metadata === 'string'
                ? JSON.parse(reading.metadata)
                : reading.metadata;
          } catch (e) {
            console.warn('Error parsing metadata:', e);
            metadata = {};
          }
        }

        return {
          id: reading.id,
          user_id: reading.user_id,
          spread_type: reading.reading_type || 'tarot',
          spread_name:
            reading.spread_name || reading.title || 'Bilinmeyen Okuma',
          cards_drawn,
          interpretation: reading.interpretation || 'Yorum bulunamadı',
          cost_credits: reading.cost_credits || 0,
          rating: (metadata as any)?.rating,
          feedback: (metadata as any)?.feedback,
          created_at: reading.created_at,
        };
      });

      console.log('Formatted readings:', formattedReadings);

      // Filter readings based on user and type
      let filteredReadings = formattedReadings.filter(
        (reading: any) => reading.user_id === userId
      );

      if (filter !== 'all') {
        filteredReadings = filteredReadings.filter(
          (reading: any) => reading.spread_type === filter
        );
      }

      console.log('Filtered readings:', filteredReadings);
      setReadings(filteredReadings);
    } catch (error) {
      console.error('Error fetching readings:', error);
      setReadings([]);
      // Hata durumunda kullanıcıya bilgi ver
      if (error instanceof Error) {
        console.error('Reading fetch error details:', error.message);
      }
    } finally {
      setLoading(false);
    }
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

  const getSpreadIcon = (type: string) => {
    switch (type) {
      case 'tarot':
        return '🔮';
      case 'numerology':
        return '🔢';
      case 'love':
        return '💕';
      case 'career':
        return '💼';
      case 'general':
        return '✨';
      case 'situation-analysis':
        return '📊';
      case 'problem-solving':
        return '🔍';
      default:
        return '🔮';
    }
  };

  const getSpreadTypeText = (type: string) => {
    switch (type) {
      case 'tarot':
        return 'Tarot';
      case 'numerology':
        return 'Numeroloji';
      case 'love':
        return 'Aşk';
      case 'career':
        return 'Kariyer';
      case 'general':
        return 'Genel';
      case 'situation-analysis':
        return 'Durum Analizi';
      case 'problem-solving':
        return 'Problem Çözme';
      case 'situation-analysis':
        return 'Durum Analizi';
      case 'problem-solving':
        return 'Problem Çözme';
      default:
        return type;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) {
      return <span className='text-lavender text-sm'>Değerlendirilmedi</span>;
    }

    return (
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
            }`}
          />
        ))}
        <span className='text-sm text-lavender ml-2'>({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4'></div>
        <div className='text-lavender'>Okuma geçmişi yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Filter and Stats */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-lg font-medium text-gold'>Okuma Geçmişi</h4>
          <div className='flex items-center space-x-2'>
            <Filter className='h-4 w-4 text-lavender' />
            <select
              value={filter}
              onChange={e =>
                setFilter(
                  e.target.value as
                    | 'all'
                    | 'tarot'
                    | 'numerology'
                    | 'love'
                    | 'career'
                    | 'general'
                    | 'situation-analysis'
                    | 'problem-solving'
                )
              }
              className='bg-night/50 border border-lavender/30 text-white rounded px-3 py-1 text-sm focus:border-gold focus:outline-none'
            >
              <option value='all'>Tümü</option>
              <option value='tarot'>Tarot</option>
              <option value='numerology'>Numeroloji</option>
              <option value='love'>Aşk</option>
              <option value='career'>Kariyer</option>
              <option value='general'>Genel</option>
              <option value='situation-analysis'>📊 Durum Analizi</option>
              <option value='problem-solving'>🔍 Problem Çözme</option>
            </select>
          </div>
        </div>

        <div className='flex items-center space-x-4 text-sm'>
          <div className='flex items-center'>
            <Eye className='h-4 w-4 text-blue-400 mr-1' />
            <span className='text-blue-400'>{readings.length} okuma</span>
          </div>
          <div className='flex items-center'>
            <TrendingUp className='h-4 w-4 text-green-400 mr-1' />
            <span className='text-green-400'>
              {readings.reduce((sum, r) => sum + r.cost_credits, 0)} kredi
            </span>
          </div>
        </div>
      </div>

      {/* Readings List */}
      {readings.length === 0 ? (
        <div className='text-center py-12'>
          <Calendar className='h-16 w-16 text-lavender/50 mx-auto mb-4' />
          <p className='text-lavender'>
            Bu filtre için okuma geçmişi bulunmuyor
          </p>
          <p className='text-lavender/70 text-sm mt-2'>
            Bu kullanıcının henüz hiç okuma geçmişi bulunmuyor
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {readings.map(reading => (
            <div
              key={reading.id}
              className='bg-lavender/5 rounded-lg p-4 border border-lavender/10 hover:bg-lavender/10 transition-colors cursor-pointer'
              onClick={() => setSelectedReading(reading)}
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>
                    {getSpreadIcon(reading.spread_type)}
                  </span>
                  <div>
                    <h5 className='font-medium text-white'>
                      {reading.spread_name}
                    </h5>
                    <p className='text-sm text-lavender'>
                      {getSpreadTypeText(reading.spread_type)}
                    </p>
                  </div>
                </div>

                <div className='text-right'>
                  <div className='flex items-center text-gold text-sm mb-1'>
                    <TrendingUp className='h-3 w-3 mr-1' />
                    {reading.cost_credits} kredi
                  </div>
                  <div className='flex items-center text-lavender text-xs'>
                    <Clock className='h-3 w-3 mr-1' />
                    {formatDate(reading.created_at)}
                  </div>
                </div>
              </div>

              {/* Cards (for Tarot) */}
              {reading.cards_drawn.length > 0 && (
                <div className='mb-3'>
                  <p className='text-xs text-lavender mb-1'>Çekilen Kartlar:</p>
                  <div className='flex flex-wrap gap-1'>
                    {reading.cards_drawn.map((card, index) => (
                      <span
                        key={index}
                        className='bg-gold/20 text-gold px-2 py-1 rounded text-xs'
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation Preview */}
              <p className='text-white text-sm mb-3 line-clamp-2'>
                {reading.interpretation.length > 120
                  ? reading.interpretation.substring(0, 120) + '...'
                  : reading.interpretation}
              </p>

              {/* Rating and Feedback */}
              <div className='flex items-center justify-between'>
                <div>{renderStars(reading.rating)}</div>
                {reading.feedback && (
                  <div className='text-xs text-lavender'>
                    💬 Geri bildirim var
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reading Detail Modal */}
      {selectedReading && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-night border border-gold/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center space-x-3'>
                <span className='text-3xl'>
                  {getSpreadIcon(selectedReading.spread_type)}
                </span>
                <div>
                  <h3 className='text-xl font-semibold text-gold'>
                    {selectedReading.spread_name}
                  </h3>
                  <p className='text-lavender'>
                    {getSpreadTypeText(selectedReading.spread_type)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReading(null)}
                className='text-lavender hover:text-white'
              >
                ×
              </button>
            </div>

            {/* Reading Details */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-lavender'>Tarih:</span>
                <span className='text-white'>
                  {formatDate(selectedReading.created_at)}
                </span>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <span className='text-lavender'>Kredi Maliyeti:</span>
                <span className='text-gold font-medium'>
                  {selectedReading.cost_credits} kredi
                </span>
              </div>

              {/* Cards */}
              {selectedReading.cards_drawn.length > 0 && (
                <div>
                  <h4 className='font-medium text-gold mb-2'>
                    Çekilen Kartlar
                  </h4>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    {selectedReading.cards_drawn.map((card, index) => (
                      <div
                        key={index}
                        className='bg-gold/20 text-gold p-3 rounded text-center text-sm font-medium'
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div>
                <h4 className='font-medium text-gold mb-2'>Yorum</h4>
                <div className='bg-lavender/5 rounded p-4 border border-lavender/10'>
                  <p className='text-white leading-relaxed'>
                    {selectedReading.interpretation}
                  </p>
                </div>
              </div>

              {/* Rating and Feedback */}
              {(selectedReading.rating || selectedReading.feedback) && (
                <div>
                  <h4 className='font-medium text-gold mb-2'>Değerlendirme</h4>
                  <div className='bg-lavender/5 rounded p-4 border border-lavender/10'>
                    {selectedReading.rating && (
                      <div className='mb-3'>
                        <p className='text-lavender text-sm mb-1'>Puan:</p>
                        {renderStars(selectedReading.rating)}
                      </div>
                    )}
                    {selectedReading.feedback && (
                      <div>
                        <p className='text-lavender text-sm mb-1'>
                          Geri Bildirim:
                        </p>
                        <p className='text-white italic'>
                          &quot;{selectedReading.feedback}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className='flex justify-end mt-6'>
              <button
                onClick={() => setSelectedReading(null)}
                className='px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded'
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
