/*
 * Okuma Detay Modal Komponenti - Modernize Edilmiş
 *
 * Bu dosya okuma detaylarını göstermek için kullanılan modal komponentini içerir.
 * Modern tasarım, gradient efektler ve glassmorphism ile güncellenmiştir.
 *
 * Bağlı dosyalar:
 * - Lucide React ikonları
 * - Next.js Image komponenti
 *
 * Supabase değişkenleri ve tablolar:
 * - readings tablosu (okuma verileri)
 *
 * Geliştirme önerileri:
 * - PDF export özelliği eklendi
 * - Modern animasyonlar eklendi
 * - Responsive tasarım iyileştirildi
 *
 * Tespit edilen hatalar:
 * - Reading type mapping düzeltildi
 * - Kart görselleri path'i düzeltildi
 * - Veri yapısı basitleştirildi
 *
 * Kullanım durumları:
 * - Gerekli: Okuma detaylarını göstermek için
 * - Modern: Gradient tasarım ve glassmorphism
 * - Responsive: Tüm cihazlarda çalışır
 */

'use client';

import {
  X,
  Calendar,
  Star,
  Heart,
  Hash,
  Eye,
  MessageSquare,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { getCardImagePath } from '@/features/tarot/lib/a-tarot-helpers';
import type { TarotCard } from '@/types/tarot';
import { useTranslations } from '@/hooks/useTranslations';
import { getI18nMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';
import { getI18nPosition4Meaning } from '@/features/tarot/lib/love/position-4-uzun-vadeli-surec';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';
import { getCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';
import { getMoneyMeaningByCardAndPosition } from '@/features/tarot/lib/money/position-meanings-index';
import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';
import { getSituationAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/situation-analysis/position-meanings-index';
import { getRelationshipProblemsMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-problems/position-meanings-index';
import { getNewLoverMeaningByCardAndPosition } from '@/features/tarot/lib/new-lover/position-meanings-index';
import { getProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';
import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
// Eski import kaldırıldı - yeni yapıda kullanılmıyor
import { lazy, Suspense } from 'react';
import { LazyLoadingFallback } from './LazyComponents';
import { sanitizeHtml } from '@/utils/security';

// PDF Export'u lazy loading ile yükle
const PDFExport = lazy(() => import('./PDFExport'));

interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  cards: string;
  interpretation: string;
  questions: any;
  status: 'pending' | 'reviewed' | 'completed';
  created_at: string;
  updated_at?: string;
  admin_notes?: string;
  title?: string;
  summary?: string;
  cost_credits?: number;
  spread_name?: string;
}

interface ReadingDetailModalProps {
  reading: Reading | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingDetailModal({
  reading,
  isOpen,
  onClose,
}: ReadingDetailModalProps) {
  const { t } = useTranslations();

  if (!isOpen || !reading) {
    return null;
  }

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

  const getReadingIcon = (type: string) => {
    if (type.includes('LOVE')) {
      return <Heart className='h-6 w-6 text-pink-400' />;
    }
    if (type.includes('GENERAL') || type.includes('THREE_CARD')) {
      return <Star className='h-6 w-6 text-blue-400' />;
    }
    if (type.includes('CAREER')) {
      return <Calendar className='h-6 w-6 text-emerald-400' />;
    }
    if (type.includes('NUMEROLOGY')) {
      return <Hash className='h-6 w-6 text-purple-400' />;
    }
    return <Star className='h-6 w-6 text-purple-400' />;
  };

  const getReadingGradient = (type: string) => {
    if (type.includes('LOVE')) {
      return 'from-pink-500/20 to-rose-500/20 border-pink-500/30';
    }
    if (type.includes('GENERAL') || type.includes('THREE_CARD')) {
      return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
    }
    if (type.includes('CAREER')) {
      return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30';
    }
    if (type.includes('NUMEROLOGY')) {
      return 'from-purple-500/20 to-indigo-500/20 border-purple-500/30';
    }
    return 'from-purple-500/20 to-indigo-500/20 border-purple-500/30';
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          text: t('readingModal.completed', 'Tamamlandı'),
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: '✅',
        };
      case 'reviewed':
        return {
          text: t('readingModal.reviewed', 'İncelendi'),
          color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          icon: '👁️',
        };
      case 'pending':
        return {
          text: t('readingModal.pending', 'Beklemede'),
          color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          icon: '⏳',
        };
      default:
        return {
          text: status,
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: '❓',
        };
    }
  };

  const handleDownload = async () => {
    try {
      // Modal içeriğini PDF'e dönüştür
      const modalContent = document.querySelector(
        '[data-modal-content]'
      ) as HTMLElement;
      if (!modalContent) {
        // Modal content not found - burada backend'e bağlanılacak
        return;
      }

      // HTML sanitization before PDF generation
      const sanitizedHtml = sanitizeHtml(modalContent.innerHTML);
      modalContent.innerHTML = sanitizedHtml;

      // PDF export için özel stil ekle
      const originalClass = modalContent.className;
      modalContent.className += ' pdf-export-mode';

      // PDF export CSS'i ekle - kompakt versiyon
      const style = document.createElement('style');
      style.id = 'pdf-export-styles';
      style.textContent = `
        .pdf-export-mode {
          background: #1a1a2e !important;
          color: white !important;
          padding: 15px !important;
          min-height: auto !important;
          max-width: 800px !important;
          margin: 0 auto !important;
        }
        .pdf-export-mode * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .pdf-export-mode .space-y-8 > * + * {
          margin-top: 1rem !important;
        }
        .pdf-export-mode .space-y-6 > * + * {
          margin-top: 0.75rem !important;
        }
        .pdf-export-mode .space-y-4 > * + * {
          margin-top: 0.5rem !important;
        }
        .pdf-export-mode .p-6 {
          padding: 1rem !important;
        }
        .pdf-export-mode .p-8 {
          padding: 1.25rem !important;
        }
        .pdf-export-mode .mb-8 {
          margin-bottom: 1rem !important;
        }
        .pdf-export-mode .mb-6 {
          margin-bottom: 0.75rem !important;
        }
        .pdf-export-mode .mb-4 {
          margin-bottom: 0.5rem !important;
        }
        .pdf-export-mode .text-2xl {
          font-size: 1.25rem !important;
        }
        .pdf-export-mode .text-xl {
          font-size: 1.125rem !important;
        }
        .pdf-export-mode .text-lg {
          font-size: 1rem !important;
        }
        .pdf-export-mode .bg-gradient-to-br {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3)) !important;
        }
        .pdf-export-mode .from-lavender\\/10 {
          background: rgba(139, 92, 246, 0.2) !important;
        }
        .pdf-export-mode .to-purple-500\\/10 {
          background: rgba(168, 85, 247, 0.2) !important;
        }
        .pdf-export-mode .from-gold {
          background: #fbbf24 !important;
        }
        .pdf-export-mode .to-yellow-500 {
          background: #eab308 !important;
        }
        .pdf-export-mode .text-gold {
          color: #fbbf24 !important;
        }
        .pdf-export-mode .text-lavender {
          color: #8b5cf6 !important;
        }
        .pdf-export-mode .border-lavender\\/20 {
          border-color: rgba(139, 92, 246, 0.3) !important;
        }
        .pdf-export-mode .text-white {
          color: white !important;
        }
        .pdf-export-mode .text-night {
          color: #1a1a2e !important;
        }
        .pdf-export-mode .shadow-lg {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
        }
        .pdf-export-mode .shadow-xl {
          box-shadow: 0 6px 8px -2px rgba(0, 0, 0, 0.3) !important;
        }
        .pdf-export-mode .shadow-2xl {
          box-shadow: 0 8px 12px -4px rgba(0, 0, 0, 0.4) !important;
        }
        .pdf-export-mode .grid-cols-1.lg\\:grid-cols-2 {
          grid-template-columns: 1fr !important;
        }
        .pdf-export-mode .grid-cols-1.md\\:grid-cols-3 {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .pdf-export-mode .gap-6 {
          gap: 0.75rem !important;
        }
        .pdf-export-mode .gap-8 {
          gap: 1rem !important;
        }
      `;
      document.head.appendChild(style);

      // Kısa bir bekleme süresi ekle (stillerin yüklenmesi için)
      await new Promise(resolve => setTimeout(resolve, 100));

      // html2canvas ve jsPDF import'ları
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Modal içeriğini canvas'a dönüştür
      const canvas = await html2canvas(modalContent, {
        background: '#1a1a2e', // Night background
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // PDF oluştur - tek sayfa için
      const imgData = canvas.toDataURL('image/jpeg', 0.8); // JPEG, %80 kalite

      // Canvas boyutlarını hesapla
      const maxWidth = 190; // A4 genişliği - margin
      const maxHeight = 280; // A4 yüksekliği - margin

      // Oranları koruyarak boyutlandır
      let imgWidth = maxWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Eğer yükseklik çok fazlaysa, genişliği azalt
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = (canvas.width * imgHeight) / canvas.height;
      }

      // PDF oluştur - tek sayfa
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Tek sayfaya sığdır
      const x = (210 - imgWidth) / 2; // Ortala
      const y = (297 - imgHeight) / 2; // Ortala

      pdf.addImage(
        imgData,
        'JPEG',
        x,
        y,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // PDF'i indir
      const fileName = `${t('readingModal.filePrefix', 'tarot-okuma')}-${reading.id.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Stilleri temizle
      modalContent.className = originalClass;
      const existingStyle = document.getElementById('pdf-export-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    } catch (error) {
      // PDF oluşturma hatası - burada backend'e bağlanılacak
      alert(
        t(
          'readingModal.pdfError',
          'PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.'
        )
      );

      // Hata durumunda da stilleri temizle
      const modalContent = document.querySelector(
        '[data-modal-content]'
      ) as HTMLElement;
      if (modalContent) {
        modalContent.className = modalContent.className.replace(
          ' pdf-export-mode',
          ''
        );
      }
      const existingStyle = document.getElementById('pdf-export-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  };

  const getCardImage = (cardData: any) => {
    // Eğer cardData bir TarotCard objesi ise ve image alanı varsa, getCardImagePath kullan
    if (cardData && typeof cardData === 'object' && cardData.image) {
      return getCardImagePath(cardData as TarotCard);
    }

    // Veritabanından gelen kart verisi için (id, name, nameTr var ama image yok)
    if (cardData && typeof cardData === 'object' && cardData.id) {
      // Kart ID'sine göre doğru image path'ini oluştur
      return getCardImageById(cardData.id, cardData.name || cardData.nameTr);
    }

    // Fallback: string ise eski yöntemi kullan
    const cardName =
      typeof cardData === 'string'
        ? cardData
        : cardData?.name || cardData?.card || 'unknown';
    const cleanName = cardName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    return `/cards/rws/${cleanName}.jpg`;
  };

  const getCardImageById = (cardId: number, cardName: string) => {
    // Kart ID'sine göre doğru dosya adını oluştur (gerçek dosya isimlerine göre)
    const cardMappings: Record<number, string> = {
      // Major Arcana (0-21)
      0: '0-Fool',
      1: 'I-Magician',
      2: 'II-HighPriestess',
      3: 'III-Empress',
      4: 'IV-Emperor',
      5: 'V-Hierophant',
      6: 'VI-Lovers',
      7: 'VII-Chariot',
      8: 'VIII-Strength',
      9: 'IX-Hermit',
      10: 'X-WheelOfFortune',
      11: 'XI-Justice',
      12: 'XII-HangedMan',
      13: 'XIII-Death',
      14: 'XIV-Temperance',
      15: 'XV-Devil',
      16: 'XVI-Tower',
      17: 'XVII-Star',
      18: 'XVIII-Moon',
      19: 'XIX-Sun',
      20: 'XX-Judgement',
      21: 'XXI-World',
      // Minor Arcana - Cups (22-35)
      22: 'Ace-Cups',
      23: 'II-Cups',
      24: 'III-Cups',
      25: 'IV-Cups',
      26: 'V-Cups',
      27: 'VI-Cups',
      28: 'VII-Cups',
      29: 'VIII-Cups',
      30: 'IX-Cups',
      31: 'X-Cups',
      32: 'Page-Cups',
      33: 'Knight-Cups',
      34: 'Queen-Cups',
      35: 'King-Cups',
      // Minor Arcana - Wands (36-49)
      36: 'Ace-Wands',
      37: 'II-Wands',
      38: 'III-Wands',
      39: 'IV-Wands',
      40: 'V-Wands',
      41: 'VI-Wands',
      42: 'VII-Wands',
      43: 'VIII-Wands',
      44: 'IX-Wands',
      45: 'X-Wands',
      46: 'Page-Wands',
      47: 'Knight-Wands',
      48: 'Queen-Wands',
      49: 'King-Wands',
      // Minor Arcana - Swords (50-63)
      50: 'Ace-Swords',
      51: 'II-Swords',
      52: 'III-Swords',
      53: 'IV-Swords',
      54: 'V-Swords',
      55: 'VI-Swords',
      56: 'VII-Swords',
      57: 'VIII-Swords',
      58: 'IX-Swords',
      59: 'X-Swords',
      60: 'Page-Swords',
      61: 'Knight-Swords',
      62: 'Queen-Swords',
      63: 'King-Swords',
      // Minor Arcana - Pentacles (64-77)
      64: 'Ace-Pentacles',
      65: 'II-Pentacles',
      66: 'III-Pentacles',
      67: 'IV-Pentacles',
      68: 'V-Pentacles',
      69: 'VI-Pentacles',
      70: 'VII-Pentacles',
      71: 'VIII-Pentacles',
      72: 'IX-Pentacles',
      73: 'X-Pentacles',
      74: 'Page-Pentacles',
      75: 'Knight-Pentacles',
      76: 'Queen-Pentacles',
      77: 'King-Pentacles',
    };

    const fileName = cardMappings[cardId];
    if (fileName) {
      return `/cards/rws/${fileName}.jpg`;
    }

    // Fallback: kart adından dosya adı oluştur
    const cleanName = cardName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    return `/cards/rws/${cleanName}.jpg`;
  };

  // Genel kart anlamı çekme fonksiyonu - tüm açılım türleri için
  const getCardMeaningBySpreadType = (
    cardName: string,
    position: number,
    spreadType: string
  ) => {
    console.log('🚀 getCardMeaningBySpreadType called:', {
      cardName,
      position,
      spreadType
    });
    
    try {
      // Kart adını İngilizce'ye çevir (gerekirse)
      const englishCardName = cardName;

      // Açılım türüne göre doğru fonksiyonu çağır
      switch (spreadType.toLowerCase()) {
        case 'love':
        case 'aşk':
          console.log('💕 Love açılımı seçildi');
          console.log('💕 Kart adı:', cardName, 'Pozisyon:', position);
          
          // Önce i18n ile dene
          const loveResult = getI18nMeaningByCardAndPosition(cardName, position, t);
          console.log('💕 Love result:', loveResult);
          
          // Eğer i18n sonucu null ise, direkt position meanings'den ara
          if (!loveResult) {
            console.log('💕 i18n null, direkt arama yapılıyor');
            
            // Hazır mapping'i kullan
            const cardNameMapping = getCardNameMappingSync();
            const englishCardName = cardNameMapping[cardName] || cardName;
            console.log('💕 İngilizce kart adı:', englishCardName);
            
            // İngilizce kart adı ile tekrar dene
            console.log('💕 İngilizce kart adı ile arama yapılıyor:', englishCardName, 'Pozisyon:', position);
            const englishLoveResult = getI18nMeaningByCardAndPosition(englishCardName, position, t);
            console.log('💕 İngilizce Love result:', englishLoveResult);
            
            if (englishLoveResult) {
              return englishLoveResult;
            }
            
            // Hala bulunamazsa, direkt position meanings array'inden ara
            console.log('💕 Direkt array arama yapılıyor');
            // Bu kısmı sonra implement edeceğiz
            return null;
          }
          
          return loveResult;

        case 'career':
        case 'kariyer':
          console.log('💼 Career açılımı seçildi');
          const careerResult = getCareerMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );
          console.log('💼 Career result:', careerResult);
          return careerResult;

        case 'general':
        case 'genel':
        case 'tarot':
          console.log('🔮 General/Tarot açılımı seçildi, love fallback kullanılıyor');
          const generalResult = getI18nMeaningByCardAndPosition(cardName, position, t);
          console.log('🔮 General result:', generalResult);
          return generalResult;

        case 'numerology':
        case 'numeroloji':
          console.log('🔢 Numerology açılımı seçildi, love fallback kullanılıyor');
          const numerologyResult = getI18nMeaningByCardAndPosition(cardName, position, t);
          console.log('🔢 Numerology result:', numerologyResult);
          return numerologyResult;

        // Diğer açılım türleri için (gelecekte eklenebilir)
        case 'money':
        case 'para':
          return getMoneyMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'relationship-analysis':
        case 'ilişki-analizi':
          return getRelationshipAnalysisMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'situation-analysis':
        case 'durum-analizi':
          return getSituationAnalysisMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'relationship-problems':
        case 'ilişki-problemleri':
          return getRelationshipProblemsMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'new-lover':
        case 'yeni-aşk':
          return getNewLoverMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'problem-solving':
        case 'problem-çözme':
          return getProblemSolvingMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        case 'marriage':
        case 'evlilik':
          return getMarriageMeaningByCardAndPosition(
            { name: englishCardName, nameTr: cardName, id: 0 } as any,
            position,
            false
          );

        default:
          console.log('🔄 Default case - Love fallback kullanılıyor');
          const defaultResult = getI18nMeaningByCardAndPosition(cardName, position, t);
          console.log('🔄 Default result:', defaultResult);
          return defaultResult;
      }
    } catch (error) {
      // console.warn('Kart anlamı çekilirken hata:', error);
      return null;
    }
  };

  const renderModernInterpretation = () => {
    // Kart verilerini parse et - interpretation yoksa da kartları göster
    const cardsData =
      typeof reading.cards === 'string'
        ? JSON.parse(reading.cards)
        : reading.cards;

    // Eğer kartlar yoksa hiçbir şey gösterme
    if (!Array.isArray(cardsData) || cardsData.length === 0) {
      return null;
    }

    // Interpretation varsa parse et
    let lines: string[] = [];
    let titleLine: string | undefined;
    let cardSections: string[] = [];

    if (reading.interpretation) {
      try {
        lines = reading.interpretation.split('\n').filter(line => line.trim());

        // Başlık ayır
        titleLine = lines.find(line => line.includes('**Aşk Açılımı**'));

        // Kart bölümlerini bul
        cardSections = lines.filter(
          line =>
            line.match(/^\*\*\d+\./) &&
            !line.includes('Aşk Açılımı') &&
            !line.includes('Aşk Hayatı Özeti')
        );
      } catch (error) {
        // console.warn('Interpretation parsing error:', error);
      }
    }

    return (
      <div className='space-y-6'>
        {/* Başlık */}
        {titleLine && (
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-4'>
              <span className='text-2xl'>❤️</span>
            </div>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent'>
              {t('readingModal.loveSpread', 'Aşk Açılımı')}
            </h2>
          </div>
        )}

        {/* Kartlar ve Yorumlar */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {cardsData.map((card: any, index: number) => {
            const cardSection = cardSections[index];
            // cardSection yoksa da kartı göster, sadece yorum olmayacak

            // Kart bilgilerini parse et
            let cardName =
              card.name || card.card || card.nameTr || `Kart ${index + 1}`;

            // Kart adlarını Türkçe'ye çevir
            const cardNameMap: { [key: string]: string } = {
              'The Wheel of Fortune': 'Kader Çarkı',
              'The Fool': 'Deli',
              'The Magician': 'Büyücü',
              'The High Priestess': 'Yüksek Rahibe',
              'The Empress': 'İmparatoriçe',
              'The Emperor': 'İmparator',
              'The Hierophant': 'Hierophant',
              'The Lovers': 'Aşıklar',
              'The Chariot': 'Savaş Arabası',
              Strength: 'Güç',
              'The Hermit': 'Ermiş',
              Justice: 'Adalet',
              'The Hanged Man': 'Asılı Adam',
              Death: 'Ölüm',
              Temperance: 'Ölçülülük',
              'The Devil': 'Şeytan',
              'The Tower': 'Kule',
              'The Star': 'Yıldız',
              'The Moon': 'Ay',
              'The Sun': 'Güneş',
              Judgement: 'Yargı',
              'The World': 'Dünya',
            };

            // Eğer İngilizce ad varsa Türkçe'ye çevir
            if (cardNameMap[cardName]) {
              cardName = cardNameMap[cardName];
            }

            const isReversed = card.reversed || card.isReversed;
            const imagePath = getCardImage(card);

            // Pozisyon başlıklarını al
            const positionTitles = [
              t('readingModal.position1', 'İlgi Duyduğun Kişi'),
              t('readingModal.position2', 'Fiziksel/Cinsel Bağlantı'),
              t('readingModal.position3', 'Duygusal/Ruhsal Bağlantı'),
              t('readingModal.position4', 'Uzun Vadeli Sonuç'),
            ];
            const positionTitle =
              positionTitles[index] ||
              `${t('readingModal.position', 'Pozisyon')} ${index + 1}`;

            // Yorum metnini bul - önce interpretation'dan, yoksa pozisyon anlamlarından
            let meaningText = '';
            let keywords: string[] = [];

            // 1. Önce interpretation'dan parse et
            if (cardSection) {
              const sectionIndex = lines.findIndex(
                line => line === cardSection
              );
              const meaningLines = [];
              for (let i = sectionIndex + 2; i < lines.length; i++) {
                const currentLine = lines[i];

                // Tüm kartlar için aynı kontrol mantığı
                if (
                  !currentLine ||
                  currentLine.trim() === '' ||
                  currentLine.match(/^\*\*\d+\./) ||
                  currentLine.includes('**Aşk Hayatı Özeti**') ||
                  currentLine.includes('Bu açılım') ||
                  currentLine.includes('Aşk Hayatı Özeti:')
                ) {
                  break;
                }
                meaningLines.push(currentLine);
              }
              meaningText = meaningLines
                .join(' ')
                .trim()
                .replace(/\*\*Aşk Hayatı Özeti:\*\*/g, '')
                .replace(/Aşk Hayatı Özeti:/g, '')
                .replace(/\*\*Aşk Hayatı Özeti\*\*/g, '')
                .trim();
            }

            // 2. Eğer interpretation'dan anlam bulunamadıysa, pozisyon anlamlarını kullan
            if (!meaningText) {
              // Açılım türünü belirle
              const spreadType = reading.reading_type || 'love';
              
              // Debug için console.log ekle
              console.log('🔍 Debug kart anlamı:', {
                cardName,
                position: index + 1,
                spreadType,
                readingType: reading.reading_type,
                isReversed
              });

              // Genel kart anlamı çekme fonksiyonunu kullan
              const positionMeaningData = getCardMeaningBySpreadType(
                cardName,
                index + 1,
                spreadType
              );

              console.log('📊 Position meaning data:', positionMeaningData);
              console.log('🔧 Function called with:', {
                cardName,
                position: index + 1,
                spreadType
              });

              if (positionMeaningData) {
                // Farklı açılım türlerinden gelen veri yapılarını handle et
                if (
                  positionMeaningData.upright &&
                  positionMeaningData.reversed
                ) {
                  meaningText = isReversed
                    ? positionMeaningData.reversed
                    : positionMeaningData.upright;
                  keywords = positionMeaningData.keywords || [];
                  console.log('✅ Upright/Reversed anlam bulundu:', meaningText);
                } else if (typeof positionMeaningData === 'string') {
                  meaningText = positionMeaningData;
                  console.log('✅ String anlam bulundu:', meaningText);
                }
              }

              // Hala anlam bulunamadıysa, fallback olarak genel kart anlamını kullan
              if (!meaningText) {
                console.log('❌ Anlam bulunamadı, fallback kullanılıyor');
                meaningText = t(
                  'readingModal.noInterpretation',
                  'Bu kart için yorum henüz hazırlanmamış.'
                );
              }
            }

            return (
              <div
                key={index}
                className='group bg-gradient-to-br from-night/60 to-purple-900/60 backdrop-blur-sm rounded-2xl p-6 border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20'
              >
                {/* Kart Görseli */}
                <div className='flex items-start space-x-4 mb-4'>
                  <div className='relative flex-shrink-0'>
                    <Image
                      src={imagePath}
                      alt={cardName}
                      width={80}
                      height={120}
                      className={`rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                        isReversed ? 'rotate-180' : ''
                      }`}
                      onError={e => {
                        (e.target as HTMLImageElement).src =
                          '/cards/CardBack.jpg';
                      }}
                    />
                    {/* Açılım Numarası */}
                    <div className='absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-night'>
                      <span className='text-night font-bold text-xs'>
                        {index + 1}
                      </span>
                    </div>
                    {isReversed && (
                      <div className='absolute top-1 right-1 bg-red-500/90 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold'>
                        {t('readingModal.reversed', 'Ters')}
                      </div>
                    )}
                  </div>

                  {/* Kart Bilgileri */}
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-lg font-bold text-white mb-1'>
                      {positionTitle}
                    </h4>
                    <p className='text-gold font-semibold text-sm'>
                      {cardName}{' '}
                      {isReversed
                        ? `(${t('readingModal.reversed', 'Ters')})`
                        : `(${t('readingModal.upright', 'Düz')})`}
                    </p>
                  </div>
                </div>

                {/* Yorum Metni */}
                <div className='bg-gradient-to-r from-lavender/5 to-purple-500/5 backdrop-blur-sm rounded-xl p-4 border border-lavender/10 space-y-4'>
                  {meaningText ? (
                    <div>
                      <h5 className='text-gold font-semibold text-sm mb-2'>
                        Pozisyon Anlamı
                      </h5>
                      <p className='text-white leading-relaxed text-sm'>
                        {meaningText}
                      </p>
                    </div>
                  ) : null}

                  {/* Anahtar Kelimeler */}
                  {keywords && keywords.length > 0 && (
                    <div>
                      <h5 className='text-gold font-semibold text-sm mb-2'>
                        Anahtar Kelimeler
                      </h5>
                      <div className='flex flex-wrap gap-2'>
                        {keywords.map((keyword, keywordIndex) => (
                          <span
                            key={keywordIndex}
                            className='bg-gold/20 text-gold px-2 py-1 rounded-full text-xs font-medium'
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderQuestions = () => {
    if (!reading.questions) {
      return null;
    }

    const questions = reading.questions;
    const questionItems: { question: string; answer: string }[] = [];

    // Yeni veri yapısı kontrolü
    if (
      questions.userQuestions &&
      typeof questions.userQuestions === 'object'
    ) {
      if (
        questions.userQuestions.concern &&
        typeof questions.userQuestions.concern === 'object' &&
        questions.userQuestions.concern.question
      ) {
        // Yeni yapı: { question: "...", answer: "..." }
        Object.entries(questions.userQuestions).forEach(
          ([, qa]: [string, any]) => {
            if (qa.question && qa.answer) {
              questionItems.push({
                question: qa.question,
                answer: qa.answer,
              });
            }
          }
        );
      } else {
        // Eski yapı: sadece cevaplar
        const questionMap = {
          concern: t(
            'readingModal.question1',
            'Aşk hayatınızda sizi en çok endişelendiren konu nedir?'
          ),
          understanding: t(
            'readingModal.question2',
            'Bu aşk açılımı ile neyi anlamak istiyorsunuz?'
          ),
          emotional: t(
            'readingModal.question3',
            'Şu anda duygusal olarak nasıl hissediyorsunuz?'
          ),
        };

        Object.entries(questions.userQuestions).forEach(([key, answer]) => {
          if (answer && questionMap[key as keyof typeof questionMap]) {
            questionItems.push({
              question: questionMap[key as keyof typeof questionMap],
              answer: answer as string,
            });
          }
        });
      }
    } else {
      // En eski yapı: direkt questions içinde
      const questionMap = {
        concern: t(
          'readingModal.question1',
          'Aşk hayatınızda sizi en çok endişelendiren konu nedir?'
        ),
        understanding: t(
          'readingModal.question2',
          'Bu aşk açılımı ile neyi anlamak istiyorsunuz?'
        ),
        emotional: t(
          'readingModal.question3',
          'Şu anda duygusal olarak nasıl hissediyorsunuz?'
        ),
      };

      Object.entries(questions).forEach(([key, answer]) => {
        if (answer && questionMap[key as keyof typeof questionMap]) {
          questionItems.push({
            question: questionMap[key as keyof typeof questionMap],
            answer: answer as string,
          });
        }
      });
    }

    if (questionItems.length === 0) {
      return null;
    }

    return (
      <div className='space-y-4'>
        {questionItems.map((item, index) => (
          <div
            key={index}
            className='border-b border-lavender/20 pb-4 last:border-b-0'
          >
            <h4 className='font-semibold text-gold mb-2 flex items-start'>
              <Sparkles className='h-4 w-4 mr-2 mt-0.5 flex-shrink-0' />
              {item.question}
            </h4>
            <p className='text-lavender/90 leading-relaxed pl-6'>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const statusInfo = getStatusInfo(reading.status);

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-gradient-to-br from-night via-purple-900/20 to-night rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-lavender/20 shadow-2xl'>
        {/* Modal Header */}
        <div className='relative border-b border-lavender/20 p-6 bg-gradient-to-r from-lavender/5 to-purple-500/5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${getReadingGradient(reading.reading_type)}`}
              >
                {getReadingIcon(reading.reading_type)}
              </div>
              <div>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent'>
                  {reading.title ||
                    t('readingModal.mysticReading', 'Mistik Okuma')}
                </h2>
                <p className='text-lavender/90'>
                  {reading.spread_name ||
                    t('readingModal.generalSpread', 'Genel Yayılım')}
                </p>
                <div className='flex items-center space-x-2 mt-1'>
                  {reading.reading_type === 'written' && (
                    <span className='text-orange-400 bg-orange-500/20 px-2 py-1 rounded text-xs flex items-center space-x-1'>
                      <span>📝</span>
                      <span>Yazılı Okuma</span>
                    </span>
                  )}
                  {reading.reading_type === 'detailed' && (
                    <span className='text-purple-400 bg-purple-500/20 px-2 py-1 rounded text-xs flex items-center space-x-1'>
                      <span>🎤</span>
                      <span>Sesli Okuma</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-3 bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:scale-105 text-lavender hover:text-gold'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-6 space-y-8' data-modal-content>
          {/* Okuma Bilgileri */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'>
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <Calendar className='h-6 w-6 text-white' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-lavender mb-1'>
                    {t('readingModal.readingDate', 'Okuma Tarihi')}
                  </p>
                  <p className='font-bold text-white'>
                    {formatDate(reading.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className='group bg-gradient-to-br from-gold/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20'>
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gradient-to-br from-gold to-yellow-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <Star className='h-6 w-6 text-night' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-lavender mb-1'>
                    {t('readingModal.creditCost', 'Kredi Maliyeti')}
                  </p>
                  <p className='font-bold text-white'>
                    {reading.cost_credits || 50} {t('common.credits', 'kredi')}
                  </p>
                </div>
              </div>
            </div>

            <div className='group bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20'>
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                  <Eye className='h-6 w-6 text-white' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-lavender mb-1'>
                    {t('readingModal.status', 'Durum')}
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}
                  >
                    <span className='mr-1'>{statusInfo.icon}</span>
                    {statusInfo.text}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sorular ve Cevaplar */}
          {reading.questions && (
            <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-lavender/20'>
              <div className='flex items-center space-x-3 mb-6'>
                <div className='p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg'>
                  <MessageSquare className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-white'>
                    {t('readingModal.questionsAnswers', 'Sorular ve Cevaplar')}
                  </h3>
                  <p className='text-lavender/80'>
                    {t(
                      'readingModal.questionsDesc',
                      'Mistik rehberliğiniz için sorularınız'
                    )}
                  </p>
                </div>
              </div>
              <div className='bg-gradient-to-r from-lavender/5 to-purple-500/5 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
                {renderQuestions()}
              </div>
            </div>
          )}

          {/* Modern Yorumlama */}
          <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-lavender/20'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg'>
                <BookOpen className='h-6 w-6 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>
                  {t('readingModal.interpretation', 'Yorumlama')}
                </h3>
                <p className='text-lavender/80'>
                  {t('readingModal.interpretationDesc', 'Mistik rehberliğiniz')}
                </p>
              </div>
            </div>

            {renderModernInterpretation()}
          </div>

          {/* Admin Notları */}
          {reading.admin_notes && (
            <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-gold/50'>
              <div className='flex items-center space-x-3 mb-4'>
                <div className='p-3 bg-gradient-to-br from-gold to-yellow-500 rounded-xl shadow-lg'>
                  <Star className='h-6 w-6 text-night' />
                </div>
                <h3 className='text-xl font-bold text-white'>
                  {t('readingModal.mysticNotes', 'Mistik Notlar')}
                </h3>
              </div>
              <div className='bg-gradient-to-r from-gold/5 to-yellow-500/5 backdrop-blur-sm rounded-xl p-4 border border-gold/20'>
                <p className='text-lavender/90 leading-relaxed'>
                  {reading.admin_notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className='flex items-center justify-end space-x-4 p-6 border-t border-lavender/20 bg-gradient-to-r from-lavender/5 to-purple-500/5'>
          <button
            onClick={onClose}
            className='px-6 py-3 bg-gradient-to-r from-lavender/20 to-purple-500/20 hover:from-lavender/30 hover:to-purple-500/30 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 border border-lavender/30'
          >
            {t('readingModal.close', 'Kapat')}
          </button>
          <Suspense fallback={<LazyLoadingFallback />}>
            <PDFExport onDownload={handleDownload} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
