'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Eye, Calendar, Clock, Star, Users, TrendingUp, Filter } from 'lucide-react';

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

export default function ReadingHistory({ userId, limit = 20 }: ReadingHistoryProps) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);
  const [filter, setFilter] = useState<'all' | 'tarot' | 'numerology'>('all');

  useEffect(() => {
    fetchReadings();
  }, [userId, filter]);

  const fetchReadings = async () => {
    setLoading(true);
    try {
      // Gerçek Supabase verilerini çek
      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      // Veriyi formatla
      const formattedReadings = (data || []).map(reading => ({
        id: reading.id,
        user_id: reading.user_id,
        spread_type: reading.reading_type || reading.type || 'tarot',
        spread_name: reading.spread_name || reading.title || 'Bilinmeyen Okuma',
        cards_drawn: reading.cards ? reading.cards.map((card: any) => card.name) : [],
        interpretation: reading.interpretation || 'Yorum bulunamadı',
        cost_credits: reading.cost_credits || 0,
        rating: reading.result?.rating,
        feedback: reading.result?.feedback,
        created_at: reading.created_at
      }));
      
      // Filter readings based on type
      let filteredReadings = formattedReadings;
      if (filter !== 'all') {
        filteredReadings = formattedReadings.filter(reading => reading.spread_type === filter);
      }

      setReadings(filteredReadings);
    } catch (error) {
      console.error('Error fetching readings:', error);
      setReadings([]);
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
      minute: '2-digit'
    });
  };

  const getSpreadIcon = (type: string) => {
    switch (type) {
      case 'tarot': return '🔮';
      case 'numerology': return '🔢';
      default: return '✨';
    }
  };

  const getSpreadTypeText = (type: string) => {
    switch (type) {
      case 'tarot': return 'Tarot';
      case 'numerology': return 'Numeroloji';
      default: return type;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return <span className="text-lavender text-sm">Değerlendirilmedi</span>;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            }`}
          />
        ))}
        <span className="text-sm text-lavender ml-2">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lavender">Okuma geçmişi yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h4 className="text-lg font-medium text-gold">Okuma Geçmişi</h4>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-lavender" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'tarot' | 'numerology' | 'ai')}
              className="bg-night/50 border border-lavender/30 text-white rounded px-3 py-1 text-sm focus:border-gold focus:outline-none"
            >
              <option value="all">Tümü</option>
              <option value="tarot">Tarot</option>
              <option value="numerology">Numeroloji</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-blue-400 mr-1" />
            <span className="text-blue-400">{readings.length} okuma</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400">
              {readings.reduce((sum, r) => sum + r.cost_credits, 0)} kredi
            </span>
          </div>
        </div>
      </div>

      {/* Readings List */}
      {readings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-lavender/50 mx-auto mb-4" />
          <p className="text-lavender">Bu filtre için okuma geçmişi bulunmuyor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {readings.map((reading) => (
            <div
              key={reading.id}
              className="bg-lavender/5 rounded-lg p-4 border border-lavender/10 hover:bg-lavender/10 transition-colors cursor-pointer"
              onClick={() => setSelectedReading(reading)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getSpreadIcon(reading.spread_type)}</span>
                  <div>
                    <h5 className="font-medium text-white">{reading.spread_name}</h5>
                    <p className="text-sm text-lavender">{getSpreadTypeText(reading.spread_type)}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-gold text-sm mb-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {reading.cost_credits} kredi
                  </div>
                  <div className="flex items-center text-lavender text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(reading.created_at)}
                  </div>
                </div>
              </div>

              {/* Cards (for Tarot) */}
              {reading.cards_drawn.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-lavender mb-1">Çekilen Kartlar:</p>
                  <div className="flex flex-wrap gap-1">
                    {reading.cards_drawn.map((card, index) => (
                      <span
                        key={index}
                        className="bg-gold/20 text-gold px-2 py-1 rounded text-xs"
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation Preview */}
              <p className="text-white text-sm mb-3 line-clamp-2">
                {reading.interpretation.length > 120
                  ? reading.interpretation.substring(0, 120) + '...'
                  : reading.interpretation}
              </p>

              {/* Rating and Feedback */}
              <div className="flex items-center justify-between">
                <div>
                  {renderStars(reading.rating)}
                </div>
                {reading.feedback && (
                  <div className="text-xs text-lavender">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getSpreadIcon(selectedReading.spread_type)}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gold">{selectedReading.spread_name}</h3>
                  <p className="text-lavender">{getSpreadTypeText(selectedReading.spread_type)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReading(null)}
                className="text-lavender hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Reading Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-lavender">Tarih:</span>
                <span className="text-white">{formatDate(selectedReading.created_at)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-lavender">Kredi Maliyeti:</span>
                <span className="text-gold font-medium">{selectedReading.cost_credits} kredi</span>
              </div>

              {/* Cards */}
              {selectedReading.cards_drawn.length > 0 && (
                <div>
                  <h4 className="font-medium text-gold mb-2">Çekilen Kartlar</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedReading.cards_drawn.map((card, index) => (
                      <div
                        key={index}
                        className="bg-gold/20 text-gold p-3 rounded text-center text-sm font-medium"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div>
                <h4 className="font-medium text-gold mb-2">Yorum</h4>
                <div className="bg-lavender/5 rounded p-4 border border-lavender/10">
                  <p className="text-white leading-relaxed">{selectedReading.interpretation}</p>
                </div>
              </div>

              {/* Rating and Feedback */}
              {(selectedReading.rating || selectedReading.feedback) && (
                <div>
                  <h4 className="font-medium text-gold mb-2">Değerlendirme</h4>
                  <div className="bg-lavender/5 rounded p-4 border border-lavender/10">
                    {selectedReading.rating && (
                      <div className="mb-3">
                        <p className="text-lavender text-sm mb-1">Puan:</p>
                        {renderStars(selectedReading.rating)}
                      </div>
                    )}
                    {selectedReading.feedback && (
                      <div>
                        <p className="text-lavender text-sm mb-1">Geri Bildirim:</p>
                        <p className="text-white italic">&quot;{selectedReading.feedback}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedReading(null)}
                className="px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded"
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
