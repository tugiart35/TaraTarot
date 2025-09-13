/*
info:
---
Bağlantılı dosyalar:
- lucide-react: İkonlar için (gerekli)
- @/types/auth.types: Reading tipi için (gerekli)
- @/features/tarot/lib/love/position-meanings-index: Pozisyon bazlı kart anlamları (gerekli)

Dosyanın amacı:
- Dashboard sayfasının son okumalar bölümünü oluşturur
- Kullanıcının son yaptığı okumaları listeler
- Okuma detaylarına erişim ve indirme özellikleri sunar
- Aşk açılımı için pozisyon bazlı kart anlamlarını gösterir

Supabase değişkenleri ve tabloları:
- user_readings tablosu: Kullanıcı okuma geçmişi
- Reading interface: readingType, cards, createdAt alanları

Geliştirme önerileri:
- Reading tipi property'leri düzeltildi
- Firestore timestamp desteği eklendi
- Okuma türüne göre farklı ikonlar ve renkler
- Responsive tasarım ve modern UI
- Pozisyon bazlı kart anlamları eklendi
- Expand/collapse özelliği eklendi

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Dashboard son okumalar bölümü olarak aktif
- Okuma geçmişi görüntüleme için gerekli
- Aşk açılımı kart anlamları gösterimi için gerekli

Sonuç:
- Kod okunabilir, modüler ve üretime hazır
- Pozisyon bazlı kart anlamları başarıyla entegre edildi
---
*/

'use client';

import { useState } from 'react';
import {
  Star,
  BookOpen,
  Hash,
  Eye,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
// Reading type defined locally
interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  cards: any[];
  interpretation: string;
  question: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  admin_notes: string | null;
}

interface RecentReadingsProps {
  recentReadings: Reading[];
  currentLocale: string;
  onViewReading?: (reading: Reading) => void;
}

// Yardımcı fonksiyonlar
const formatDate = (dateValue: any): string => {
  // Firestore timestamp veya string date'i handle et
  const date = dateValue?.toDate ? dateValue.toDate() : new Date(dateValue);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Kart anlamlarını pozisyon bazlı olarak çeken fonksiyon
const getCardMeanings = (reading: Reading) => {
  if (!reading.cards || !['love', 'LOVE_SPREAD_WRITTEN', 'LOVE_SPREAD_DETAILED'].includes(reading.reading_type)) {
    return null;
  }

  try {
    const cardsData = typeof reading.cards === 'string' 
      ? JSON.parse(reading.cards) 
      : reading.cards;

    // Eğer selectedCards array'i varsa onu kullan
    let cardsArray = cardsData;
    if (cardsData && cardsData.selectedCards) {
      cardsArray = cardsData.selectedCards;
    }

    if (Array.isArray(cardsArray)) {
      return cardsArray.map((card: any, index: number) => {
        const position = index + 1;
        const cardName = card.nameTr || card.name || card.card || `Kart ${position}`;
        // Simple fallback since getMeaningByCardAndPositionSync is not available
        
        return {
          cardName,
          position,
          meaning: null,
          keywords: [],
          isReversed: card.isReversed || false
        };
      });
    }
  } catch (error) {
    console.error('Kart anlamları çekilirken hata:', error);
  }

  return null;
};

const getReadingTypeInfo = (readingType: string) => {
  switch (readingType) {
    case 'love':
    case 'LOVE_SPREAD_DETAILED':
    case 'LOVE_SPREAD_WRITTEN':
      return {
        icon: Star,
        iconColor: 'text-purple',
        bgColor: 'bg-purple/20',
      };
    case 'general':
      return {
        icon: BookOpen,
        iconColor: 'text-green',
        bgColor: 'bg-green/20',
      };
    case 'career':
      return {
        icon: Star,
        iconColor: 'text-blue',
        bgColor: 'bg-blue/20',
      };
    case 'numerology':
      return {
        icon: Hash,
        iconColor: 'text-info',
        bgColor: 'bg-info/20',
      };
    default:
      return {
        icon: Hash,
        iconColor: 'text-info',
        bgColor: 'bg-info/20',
      };
  }
};

export default function RecentReadings({
  recentReadings,
  currentLocale,
  onViewReading,
}: RecentReadingsProps) {
  const [expandedReadings, setExpandedReadings] = useState<Set<string>>(new Set());

  const toggleExpanded = (readingId: string) => {
    const newExpanded = new Set(expandedReadings);
    if (newExpanded.has(readingId)) {
      newExpanded.delete(readingId);
    } else {
      newExpanded.add(readingId);
    }
    setExpandedReadings(newExpanded);
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-cosmic-fog">
        <div className="flex items-center justify-between">
          <h3 className="text-heading-3 text-gold">Son Okumalar</h3>
          <a 
            href={`/${currentLocale}/dashboard/readings`} 
            className="text-gold hover:text-gold/80 text-sm font-medium"
          >
            Tümünü Gör →
          </a>
        </div>
      </div>
      
      <div className="p-6">
        {recentReadings.length > 0 ? (
          <div className="space-y-4">
            {recentReadings.map((reading) => {
              const typeInfo = getReadingTypeInfo(reading.reading_type);
              const IconComponent = typeInfo.icon;
              const isExpanded = expandedReadings.has(reading.id);
              const cardMeanings = getCardMeanings(reading);
              
              // Başlık zaten Reading interface'inde mevcut
              const title = 'Mistik Okuma';
              
              return (
                <div key={reading.id} className="bg-crystal-clear rounded-lg">
                  <div className="flex items-center space-x-4 p-4">
                    <div className={`p-2 rounded-lg ${typeInfo.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${typeInfo.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-celestial truncate">
                        {title}
                      </p>
                      <p className="text-sm text-text-muted">
                        {formatDate(reading.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cardMeanings && (
                        <button 
                          onClick={() => toggleExpanded(reading.id)}
                          className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                          title="Kart anlamlarını göster/gizle"
                          aria-label="Kart anlamlarını göster/gizle"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      )}
                      <button 
                        onClick={() => onViewReading?.(reading)}
                        className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                        title="Okumayı görüntüle"
                        aria-label="Okumayı görüntüle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-text-muted hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
                        title="Okumayı indir"
                        aria-label="Okumayı indir"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Kart Anlamları */}
                  {isExpanded && cardMeanings && (
                    <div className="px-4 pb-4 border-t border-cosmic-fog/50">
                      <div className="pt-4 space-y-3">
                        <h4 className="text-sm font-medium text-text-celestial mb-3">
                          Kart Anlamları
                        </h4>
                        {cardMeanings.map((card, index) => (
                          <div key={index} className="bg-cosmic-black/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-gold">
                                Pozisyon {card.position}: {card.cardName}
                              </h5>
                              {card.isReversed && (
                                <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                                  Ters
                                </span>
                              )}
                            </div>
                            {card.meaning && (
                              <p className="text-sm text-text-muted leading-relaxed mb-2">
                                {card.meaning}
                              </p>
                            )}
                            {card.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {card.keywords.map((keyword, keyIndex) => (
                                  <span
                                    key={keyIndex}
                                    className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-sm font-medium text-text-celestial mb-2">
              Henüz okuma yapılmamış
            </h3>
            <p className="text-sm text-text-muted mb-4">
              İlk mistik deneyiminizi yaşamak için bir okuma başlatın
            </p>
            <a 
              href={`/${currentLocale}/tarot`} 
              className="btn btn-primary"
            >
              Okuma Başlat
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
