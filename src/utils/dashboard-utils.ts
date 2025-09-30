/*
 * DASHBOARD YARDIMCI FONKSİYONLARI
 *
 * Dosya Amacı: Dashboard sayfasında kullanılan yardımcı fonksiyonları içerir
 *
 * Bağlı Dosyalar:
 * - src/components/dashboard/WelcomeSection.tsx (getMemberSince, formatDate kullanır)
 * - src/app/[locale]/dashboard/page.tsx (dashboard ana sayfası)
 *
 * Fonksiyonlar:
 * - getPackageStyle: Kredi miktarına göre paket stili belirler
 * - formatCredits: Kredi miktarını formatlar (1000+ için K kullanır)
 * - getPackageType: Paket türünü belirler (Temel, Standart, Popüler, vb.)
 * - getPackageDescription: Paket açıklaması oluşturur
 * - getPackageBonus: Bonus kredi bilgisi hesaplar
 * - formatDate: Tarihi Türkçe formatta gösterir
 * - getMemberSince: Üyelik süresini hesaplar ve Türkçe olarak döner
 *
 * Durum: Aktif kullanımda, hata düzeltildi
 *
 * Geliştirme Önerileri:
 * - Tarih hesaplamalarını daha hassas hale getirilebilir
 * - Çoklu dil desteği eklenebilir
 * - Unit testler yazılabilir
 */

// Dashboard yardımcı fonksiyonları

import { Star, Zap, Crown, Gem, Sparkles, Coins } from 'lucide-react';

// Paket stil arayüzü
export interface PackageStyle {
  icon: React.ComponentType<any>;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  creditColor: string;
  buttonClass: string;
  isPopular: boolean;
}

// Kredi miktarına göre paket stili belirleme fonksiyonu
export function getPackageStyle(credits: number): PackageStyle {
  if (credits <= 50) {
    // Temel paket
    return {
      icon: Coins,
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      creditColor: 'text-blue-600',
      buttonClass:
        'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors',
      isPopular: false,
    };
  } else if (credits <= 100) {
    // Standart paket
    return {
      icon: Zap,
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      creditColor: 'text-green-600',
      buttonClass:
        'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors',
      isPopular: false,
    };
  } else if (credits <= 200) {
    // Popüler paket
    return {
      icon: Star,
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      creditColor: 'text-yellow-600',
      buttonClass:
        'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors',
      isPopular: true,
    };
  } else if (credits <= 500) {
    // Premium paket
    return {
      icon: Crown,
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      creditColor: 'text-purple-600',
      buttonClass:
        'bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors',
      isPopular: false,
    };
  } else if (credits <= 1000) {
    // VIP paket
    return {
      icon: Gem,
      bgColor: 'bg-pink-100',
      borderColor: 'border-pink-200',
      iconColor: 'text-pink-600',
      creditColor: 'text-pink-600',
      buttonClass:
        'bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors',
      isPopular: false,
    };
  } else {
    // Ultimate paket
    return {
      icon: Sparkles,
      bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100',
      borderColor: 'border-purple-300',
      iconColor: 'text-purple-600',
      creditColor: 'text-purple-600',
      buttonClass:
        'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all',
      isPopular: true,
    };
  }
}

// Kredi miktarını formatla
export function formatCredits(credits: number): string {
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}K`;
  }
  return credits.toString();
}

// Paket türünü belirle
export function getPackageType(credits: number): string {
  if (credits <= 50) {
    return 'Temel';
  }
  if (credits <= 100) {
    return 'Standart';
  }
  if (credits <= 200) {
    return 'Popüler';
  }
  if (credits <= 500) {
    return 'Premium';
  }
  if (credits <= 1000) {
    return 'VIP';
  }
  return 'Ultimate';
}

// Paket açıklaması oluştur
export function getPackageDescription(credits: number): string {
  const type = getPackageType(credits);

  switch (type) {
    case 'Temel':
      return 'Başlangıç için ideal paket';
    case 'Standart':
      return 'Günlük kullanım için uygun';
    case 'Popüler':
      return 'En çok tercih edilen paket';
    case 'Premium':
      return 'Gelişmiş özellikler için';
    case 'VIP':
      return 'Özel deneyim için';
    case 'Ultimate':
      return 'Sınırsız deneyim için';
    default:
      return 'Özel paket';
  }
}

// Paket bonus bilgisi
export function getPackageBonus(credits: number): string | null {
  if (credits >= 200) {
    return `+${Math.floor(credits * 0.1)} bonus kredi`;
  }
  return null;
}

// Tarih formatlama fonksiyonu
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Üyelik süresini hesaplama fonksiyonu
export function getMemberSince(dateString: string): string {
  const now = new Date();
  const memberDate = new Date(dateString);
  const diffTime = Math.abs(now.getTime() - memberDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return 'bugün';
  } else if (diffDays === 1) {
    return '1 gün';
  } else if (diffDays < 7) {
    return `${diffDays} gün`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 hafta' : `${weeks} hafta`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 ay' : `${months} ay`;
  } else {
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 yıl' : `${years} yıl`;
  }
}

// Okuma türüne göre başlık oluşturma fonksiyonu
export function getReadingTitle(readingType: string): string {
  switch (readingType) {
    case 'LOVE_SPREAD_DETAILED':
      return 'Aşk Açılımı - Sesli Detaylı Okuma';
    case 'LOVE_SPREAD_WRITTEN':
      return 'Aşk Açılımı - Yazılı Okuma';
    case 'LOVE_SPREAD_SIMPLE':
      return 'Aşk Açılımı - Basit Okuma';
    case 'GENERAL_SPREAD':
      return 'Genel Açılım - Sesli Okuma';
    case 'THREE_CARD_SPREAD':
      return '3 Kart Okuması - Basit Okuma';
    case 'CAREER_SPREAD':
      return 'Kariyer Açılımı - Sesli Okuma';
    case 'NUMEROLOGY_READING':
      return 'Numeroloji Okuması';
    case 'PROBLEM_SOLVING_SPREAD':
      return 'Problem Çözme Açılımı';
    case 'SITUATION_ANALYSIS_SPREAD':
      return 'Durum Analizi Açılımı';
    case 'RELATIONSHIP_ANALYSIS_SPREAD':
      return 'İlişki Analizi Açılımı';
    // Eski format desteği
    case 'love':
      return 'Aşk Açılımı';
    case 'general':
      return 'Genel Açılım';
    case 'career':
      return 'Kariyer Açılımı';
    case 'marriage':
      return 'Evlilik Açılımı';
    case 'new-lover':
      return 'Yeni Sevgili Açılımı';
    case 'relationship-analysis':
      return 'İlişki Analizi';
    case 'relationship-problems':
      return 'İlişki Problemleri';
    case 'problem-solving':
      return 'Problem Çözme Açılımı';
    case 'problem_solving':
      return 'Problem Çözme Açılımı';
    case 'money':
      return 'Para Açılımı';
    case 'situation-analysis':
      return 'Durum Analizi';
    case 'written':
      return 'Yazılı Açılım';
    case 'detailed':
      return 'Detaylı Açılım';
    case 'numerology':
      return 'Numeroloji Okuması';
    case 'tarot':
      return 'Tarot Okuması';
    default:
      return 'Tarot okuma';
  }
}

// Okuma formatını belirle (sesli/yazılı/basit)
export function getReadingFormat(
  readingType: string,
  costCredits?: number,
  title?: string,
  metadata?: any
): 'audio' | 'written' | 'simple' {
  // Önce metadata'dan readingFormat bilgisini kontrol et (en güvenilir)
  if (metadata?.readingFormat) {
    const format = metadata.readingFormat.toLowerCase();
    if (format === 'detailed') {
      return 'audio';
    }
    if (format === 'written') {
      return 'written';
    }
    if (format === 'simple') {
      return 'simple';
    }
  }

  // Sonra title alanındaki format bilgisini kontrol et
  if (title) {
    const titleUpper = title.toUpperCase();
    if (titleUpper.includes('VOICE') || titleUpper.includes('SESLİ')) {
      return 'audio';
    }
    if (titleUpper.includes('WRITTEN') || titleUpper.includes('YAZILI')) {
      return 'written';
    }
    if (titleUpper.includes('SIMPLE') || titleUpper.includes('BASIT')) {
      return 'simple';
    }
  }

  // Sonra reading_type'a göre format belirle
  const type = readingType.toUpperCase();

  // WRITTEN okumalar
  if (type.includes('WRITTEN')) {
    return 'written';
  }

  // DETAILED okumalar (sesli)
  if (type.includes('DETAILED')) {
    return 'audio';
  }

  // SIMPLE okumalar
  if (type.includes('SIMPLE') || type.includes('THREE_CARD')) {
    return 'simple';
  }

  // Fallback: cost_credits'e göre belirle
  if (costCredits) {
    if (costCredits <= 50) {
      return 'simple';
    } else if (costCredits >= 60 && costCredits <= 80) {
      return 'written'; // Genellikle yazılı okumalar
    } else if (costCredits >= 90) {
      return 'audio'; // Genellikle sesli okumalar
    }
  }

  // Fallback: reading_type'a göre belirle
  switch (readingType) {
    case 'LOVE_SPREAD_DETAILED':
    case 'GENERAL_SPREAD':
    case 'CAREER_SPREAD':
    case 'CAREER_SPREAD_DETAILED':
    case 'PROBLEM_SOLVING_DETAILED':
    case 'SITUATION_ANALYSIS_DETAILED':
    case 'RELATIONSHIP_ANALYSIS_DETAILED':
    case 'RELATIONSHIP_PROBLEMS_DETAILED':
    case 'MARRIAGE_DETAILED':
    case 'NEW_LOVER_DETAILED':
    case 'MONEY_SPREAD_DETAILED':
      return 'audio'; // Detaylı okumalar sesli
    case 'LOVE_SPREAD_WRITTEN':
    case 'CAREER_SPREAD_WRITTEN':
    case 'PROBLEM_SOLVING_WRITTEN':
    case 'SITUATION_ANALYSIS_WRITTEN':
    case 'RELATIONSHIP_ANALYSIS_WRITTEN':
    case 'RELATIONSHIP_PROBLEMS_WRITTEN':
    case 'MARRIAGE_WRITTEN':
    case 'NEW_LOVER_WRITTEN':
    case 'MONEY_SPREAD_WRITTEN':
      return 'written'; // Yazılı okumalar
    case 'LOVE_SPREAD_SIMPLE':
    case 'THREE_CARD_SPREAD':
      return 'simple'; // Basit okumalar
    default:
      return 'audio'; // Varsayılan
  }
}

// Format bilgisi için etiket ve ikon
export function getFormatInfo(format: 'audio' | 'written' | 'simple') {
  switch (format) {
    case 'audio':
      return {
        label: 'Sesli',
        icon: '🎵',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        iconComponent: '🔊',
      };
    case 'written':
      return {
        label: 'Yazılı',
        icon: '📝',
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        iconComponent: '📄',
      };
    case 'simple':
      return {
        label: 'Basit',
        icon: '⚡',
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        iconComponent: '⚡',
      };
    default:
      return {
        label: 'Bilinmiyor',
        icon: '❓',
        color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        iconComponent: '❓',
      };
  }
}

// Okuma özeti oluşturma fonksiyonu
export function getReadingSummary(interpretation: string): string {
  if (!interpretation) {
    return 'Özet bulunamadı';
  }

  // İlk 100 karakteri al ve son kelimeyi tamamla
  const summary = interpretation.substring(0, 100);
  const lastSpaceIndex = summary.lastIndexOf(' ');

  if (lastSpaceIndex > 50) {
    return summary.substring(0, lastSpaceIndex) + '...';
  }

  return summary + '...';
}

// Okuma indirme fonksiyonu
export function downloadReading(reading: any) {
  try {
    // Okuma verilerini JSON formatında hazırla
    const readingData = {
      id: reading.id,
      title: reading.title || getReadingTitle(reading.reading_type),
      type: reading.reading_type,
      cards: reading.cards,
      interpretation: reading.interpretation,
      questions: reading.questions,
      date: new Date(reading.created_at).toLocaleDateString('tr-TR'),
      cost_credits: reading.cost_credits || 50,
    };

    // JSON dosyası oluştur
    const jsonString = JSON.stringify(readingData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Dosya adı oluştur
    const fileName = `tarot-okuma-${reading.id}-${new Date(reading.created_at).toISOString().split('T')[0]}.json`;

    // İndirme linki oluştur ve tıkla
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Okuma indirme hatası:', error);
    return false;
  }
}

// Fallback paket verileri
export function getFallbackPackages() {
  return [
    {
      id: 1,
      name: 'Başlangıç Paketi',
      description: 'Yeni kullanıcılar için ideal',
      credits: 100,
      price_eur: 1.04,
      price_try: 500,
      active: true,
      created_at: new Date().toISOString(),
      shopier_product_id: 'https://www.shopier.com/38014526',
    },
    {
      id: 2,
      name: 'Popüler Paket',
      description: 'En çok tercih edilen',
      credits: 300,
      price_eur: 28.16,
      price_try: 1350,
      active: true,
      created_at: new Date().toISOString(),
      shopier_product_id: 'https://www.shopier.com/38014551',
    },
    {
      id: 3,
      name: 'Premium Paket',
      description: 'Büyük kullanıcılar için',
      credits: 500,
      price_eur: 41.72,
      price_try: 2000,
      active: true,
      created_at: new Date().toISOString(),
      shopier_product_id: 'https://www.shopier.com/38014558',
    },
  ];
}
