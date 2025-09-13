// Dashboard sayfası için utility fonksiyonları

import { Package, Reading } from '@/types/dashboard.types';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';
import { Crown, Star, Coins } from 'lucide-react';

// Tarihi Türkçe formatta formatla
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric', // Gün sayısı
    month: 'long', // Ay adı (uzun)
    year: 'numeric' // Yıl sayısı
  });
};

// Üyelik süresini hesapla - ne kadar süredir üye olduğunu göster
export const getMemberSince = (createdAt: string): string => {
  const created = new Date(createdAt); // Hesap oluşturulma tarihi
  const now = new Date(); // Şu anki tarih
  const diffTime = Math.abs(now.getTime() - created.getTime()); // Fark (milisaniye)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Gün cinsinden fark
  
  if (diffDays < 30) return `${diffDays} gün`; // 30 günden az ise gün olarak
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay`; // 1 yıldan az ise ay olarak
  return `${Math.floor(diffDays / 365)} yıl`; // 1 yıldan fazla ise yıl olarak
};

// Okumayı indir - PDF/text formatında okuma raporu oluştur
export const downloadReading = (reading: Reading): void => {
  try {
    // İndirilecek içeriği oluştur - Türkçe format
    const content = `
TAROT OKUMASI RAPORU
====================

Okuma Türü: ${reading.reading_type || 'Bilinmiyor'}
Başlık: ${reading.title || 'Başlık Yok'}
Tarih: ${formatDate(reading.created_at)}

YORUMLAMA:
${reading.interpretation || 'Yorumlama bulunamadı'}

ÇEKİLEN KARTLAR:
${reading.cards ? JSON.stringify(reading.cards, null, 2) : 'Kart bilgisi bulunamadı'}

SORULAR VE CEVAPLAR:
${reading.questions ? JSON.stringify(reading.questions, null, 2) : 'Soru bilgisi bulunamadı'}

---
Bu rapor ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.
    `;

    // Blob oluştur - text dosyası için
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    // Object URL oluştur
    const url = URL.createObjectURL(blob);
    // İndirme linki oluştur
    const link = document.createElement('a');
    link.href = url;
    link.download = `tarot-okumasi-${reading.id}.txt`; // Dosya adı
    // Linki DOM'a ekle ve tıkla
    document.body.appendChild(link);
    link.click();
    // Linki DOM'dan kaldır
    document.body.removeChild(link);
    // Object URL'i temizle - memory leak önlemek için
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Okuma indirme hatası:', error);
  }
};

// Paket türüne göre renk ve ikon belirle - dinamik stil fonksiyonu
export const getPackageStyle = (credits: number) => {
  if (credits >= 500) { // Premium paket
    return {
      icon: Crown,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      creditColor: 'text-purple-400',
      buttonClass: 'btn-secondary'
    };
  } else if (credits >= 300) { // Popüler paket
    return {
      icon: Star,
      iconColor: 'text-gold',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold/30',
      creditColor: 'text-gold',
      buttonClass: 'btn-primary',
      isPopular: true // Popüler etiketi için
    };
  } else { // Başlangıç paketi
    return {
      icon: Coins,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      creditColor: 'text-blue-400',
      buttonClass: 'btn-secondary'
    };
  }
};

// Kredi maliyeti hesapla - sadece gerekli olanlar
export const getCreditCost = (readingType: string): number => {
  switch (readingType) {
    case 'LOVE_SPREAD_DETAILED':
      return READING_CREDIT_CONFIGS.LOVE_SPREAD_DETAILED.cost;
    case 'LOVE_SPREAD_WRITTEN':
      return READING_CREDIT_CONFIGS.LOVE_SPREAD_WRITTEN.cost;
    case 'simple':
      return 0; // Basit okuma ücretsiz
    default:
      return 50; // Fallback - yazılı okuma varsayılan
  }
};

// Başlık oluştur - okuma türüne göre
export const getReadingTitle = (readingType: string): string => {
  switch (readingType) {
    case 'love':
      return 'Aşk Okuması';
    case 'general':
      return 'Genel Okuma';
    case 'career':
      return 'Kariyer Okuması';
    case 'simple':
      return 'Basit Okuma';
    default:
      return 'Numeroloji Analizi';
  }
};

// Özet oluştur (interpretation'dan ilk 100 karakter)
export const getReadingSummary = (interpretation: string): string => {
  if (interpretation && interpretation.length > 100) {
    return interpretation.substring(0, 100) + '...';
  }
  return interpretation || 'Okuma yorumu bulunamadı';
};

// Fallback paket verileri
export const getFallbackPackages = (): Package[] => [
  {
    id: 1,
    name: 'Başlangıç',
    credits: 100,
    price_eur: 0.99,
    price_try: 29.99,
    active: true,
    created_at: new Date().toISOString(),
    description: 'Temel okumalar için ideal',
    shopier_product_id: 'https://www.shopier.com/38014526'
  },
  {
    id: 2,
    name: 'Popüler',
    credits: 300,
    price_eur: 2.49,
    price_try: 79.99,
    active: true,
    created_at: new Date().toISOString(),
    description: 'En çok tercih edilen paket',
    shopier_product_id: 'https://www.shopier.com/38014551'
  },
  {
    id: 3,
    name: 'Premium',
    credits: 500,
    price_eur: 3.99,
    price_try: 119.99,
    active: true,
    created_at: new Date().toISOString(),
    description: 'Sınırsız okuma deneyimi',
    shopier_product_id: 'https://www.shopier.com/38014558'
  }
];
