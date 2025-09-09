/*
 * Okuma Detay Modal Komponenti
 * 
 * Bu dosya okuma detaylarını göstermek için kullanılan modal komponentini içerir.
 * 
 * Bağlı dosyalar:
 * - useTranslations hook'u (çeviri desteği için)
 * - Lucide React ikonları
 * 
 * Supabase değişkenleri ve tablolar:
 * - tarot_readings tablosu (okuma verileri)
 * 
 * Geliştirme önerileri:
 * - Kart görsellerini ekle
 * - Animasyonlar ekle
 * - PDF export özelliği
 * 
 * Tespit edilen hatalar:
 * - Yok
 * 
 * Kullanım durumları:
 * - Gerekli: Okuma detaylarını göstermek için
 * - Gereksiz: Yok
 * - Silinebilir: Yok
 * - Birleştirilebilir: Yok
 */

'use client';

import { X, Download, Calendar, Star, Heart, Hash, Eye, FileText, MessageSquare, BookOpen } from 'lucide-react';
import Image from 'next/image';

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
  title: string;
  summary: string;
  cost_credits: number;
  spread_name: string;
}

interface ReadingDetailModalProps {
  reading: Reading | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingDetailModal({ reading, isOpen, onClose }: ReadingDetailModalProps) {
  // Geçici olarak çeviri fonksiyonunu devre dışı bırak
  const translate = (key: string, fallback: string) => {
    return fallback;
  };

  if (!isOpen || !reading) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadingIcon = (type: string) => {
    switch(type) {
      case 'love': return <Heart className="h-6 w-6 text-pink-400" />;
      case 'general': return <Star className="h-6 w-6 text-purple-400" />;
      case 'career': return <Calendar className="h-6 w-6 text-blue-400" />;
      case 'numerology': return <Hash className="h-6 w-6 text-cyan-400" />;
      default: return <Star className="h-6 w-6 text-purple-400" />;
    }
  };

  const getReadingColor = (type: string) => {
    switch(type) {
      case 'love': return 'bg-pink-500/20 border-pink-500/30';
      case 'general': return 'bg-purple-500/20 border-purple-500/30';
      case 'career': return 'bg-blue-500/20 border-blue-500/30';
      case 'numerology': return 'bg-cyan-500/20 border-cyan-500/30';
      default: return 'bg-purple-500/20 border-purple-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'reviewed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed': return translate('dashboard.readingsPage.detailModal.statusCompleted', 'Tamamlandı');
      case 'reviewed': return translate('dashboard.readingsPage.detailModal.statusReviewed', 'İncelendi');
      case 'pending': return translate('dashboard.readingsPage.detailModal.statusPending', 'Beklemede');
      default: return status;
    }
  };

  const handleDownload = () => {
    // PDF export functionality will be implemented here
    console.log('Download reading:', reading.id);
  };

  const getCardImage = (cardName: string) => {
    // Kart adını temizle ve dosya adına çevir
    const cleanName = cardName
      .replace(/[^a-zA-Z0-9\s]/g, '') // Özel karakterleri kaldır
      .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
      .toLowerCase();
    
    return `/cards/rws/${cleanName}.jpg`;
  };

  const renderCards = () => {
    if (!reading.cards) return null;

    try {
      const cardsData = typeof reading.cards === 'string' 
        ? JSON.parse(reading.cards) 
        : reading.cards;

      if (Array.isArray(cardsData)) {
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cardsData.map((card: any, index: number) => (
              <div key={index} className="admin-card rounded-lg p-4 admin-hover-lift">
                <div className="relative">
                  <Image
                    src={getCardImage(card.name || card.card || `card-${index}`)}
                    alt={card.name || card.card || `Kart ${index + 1}`}
                    width={120}
                    height={180}
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      // Hata durumunda varsayılan kart arkası göster
                      (e.target as HTMLImageElement).src = '/cards/CardBack.jpg';
                    }}
                  />
                  {card.reversed && (
                    <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full">
                      Ters
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-admin-text">
                    {card.name || card.card || `Kart ${index + 1}`}
                  </p>
                  {card.position && (
                    <p className="text-xs text-admin-text-muted">
                      {card.position}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }
    } catch (error) {
      console.error('Error parsing cards data:', error);
    }

    // Fallback: Raw text göster
    return (
      <div className="bg-admin-dark rounded-lg p-4 border-l-4 border-purple-500/30">
        <pre className="text-admin-text-muted text-sm whitespace-pre-wrap font-mono">
          {typeof reading.cards === 'string' 
            ? reading.cards 
            : JSON.stringify(reading.cards, null, 2)
          }
        </pre>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="admin-card rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-admin-border">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${getReadingColor(reading.reading_type)}`}>
              {getReadingIcon(reading.reading_type)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-admin-text">{reading.title}</h2>
              <p className="text-admin-text-muted">{reading.spread_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 admin-card rounded-lg text-admin-text-muted hover:text-admin-text transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Okuma Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="admin-card rounded-lg p-4 admin-hover-lift">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-admin-accent/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-admin-accent" />
                </div>
                <div>
                  <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.detailModal.readingDate', 'Okuma Tarihi')}</p>
                  <p className="font-semibold text-admin-text">{formatDate(reading.created_at)}</p>
                </div>
              </div>
            </div>
            
            <div className="admin-card rounded-lg p-4 admin-hover-lift">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-golden-400/20 rounded-lg">
                  <Star className="h-5 w-5 text-golden-400" />
                </div>
                <div>
                  <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.detailModal.creditCost', 'Kredi Maliyeti')}</p>
                  <p className="font-semibold text-admin-text">{reading.cost_credits} {translate('dashboard.readingsPage.credits', 'kredi')}</p>
                </div>
              </div>
            </div>
            
            <div className="admin-card rounded-lg p-4 admin-hover-lift">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-admin-green/20 rounded-lg">
                  <Eye className="h-5 w-5 text-admin-green" />
                </div>
                <div>
                  <p className="text-sm text-admin-text-muted">{translate('dashboard.readingsPage.detailModal.status', 'Durum')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reading.status)}`}>
                    {getStatusText(reading.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Soru */}
          {reading.question && (
            <div className="admin-card rounded-lg p-6 admin-hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-admin-text">{translate('dashboard.readingsPage.detailModal.yourQuestion', 'Sorunuz')}</h3>
              </div>
              <div className="bg-admin-dark rounded-lg p-4 border-l-4 border-blue-500/30">
                <p className="text-admin-text-muted leading-relaxed">
                  {typeof reading.question === 'string' 
                    ? reading.question 
                    : JSON.stringify(reading.question)
                  }
                </p>
              </div>
            </div>
          )}

          {/* Çekilen Kartlar */}
          {reading.cards && (
            <div className="admin-card rounded-lg p-6 admin-hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-admin-text">{translate('dashboard.readingsPage.detailModal.drawnCards', 'Çekilen Kartlar')}</h3>
              </div>
              {renderCards()}
            </div>
          )}

          {/* Yorumlama */}
          <div className="admin-card rounded-lg p-6 admin-hover-lift">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-golden-400/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-golden-400" />
              </div>
              <h3 className="text-lg font-semibold text-admin-text">{translate('dashboard.readingsPage.detailModal.interpretation', 'Yorumlama')}</h3>
            </div>
            <div className="bg-gradient-to-br from-mystical-800/50 to-mystical-900/50 rounded-lg p-6 border-l-4 border-golden-400/30">
              <div className="prose prose-invert max-w-none">
                <p className="text-admin-text-muted leading-relaxed whitespace-pre-wrap text-base">
                  {reading.interpretation}
                </p>
              </div>
            </div>
          </div>

          {/* Admin Notları */}
          {reading.admin_notes && (
            <div className="admin-card rounded-lg p-6 border-l-4 border-admin-accent admin-hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-admin-accent/20 rounded-lg">
                  <Star className="h-5 w-5 text-admin-accent" />
                </div>
                <h3 className="text-lg font-semibold text-admin-text">{translate('dashboard.readingsPage.detailModal.adminNotes', 'Admin Notları')}</h3>
              </div>
              <div className="bg-admin-accent/5 rounded-lg p-4">
                <p className="text-admin-text-muted leading-relaxed">
                  {reading.admin_notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-admin-border">
          <button
            onClick={onClose}
            className="admin-btn-primary px-6 py-2 rounded-lg"
          >
            {translate('dashboard.readingsPage.detailModal.close', 'Kapat')}
          </button>
          <button 
            onClick={handleDownload}
            className="admin-card px-6 py-2 rounded-lg text-admin-text hover:text-admin-accent transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>{translate('dashboard.readingsPage.detailModal.download', 'İndir')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
