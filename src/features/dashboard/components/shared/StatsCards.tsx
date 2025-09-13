/*
info:
Bağlantılı dosyalar:
- lucide-react: İkonlar için (gerekli)
- @/hooks/useTranslations: i18n desteği için (gerekli)

Dosyanın amacı:
- Dashboard sayfasının istatistik kartlarını oluşturur
- Kredi bakiyesi, okuma sayısı, üyelik süresi ve diğer istatistikleri gösterir
- Interactive özellikler (yenile butonu) sunar

Supabase değişkenleri ve tabloları:
- profiles tablosu: Kullanıcı profil bilgileri
- user_readings tablosu: Okuma geçmişi
- UserProfile interface: Yerel tip tanımı

Geliştirme önerileri:
- UserProfile tipi yerel olarak tanımlandı
- Responsive tasarım ve modern UI
- Real-time data güncelleme
- Loading states ve error handling

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Dashboard istatistik kartları olarak aktif
- Kullanıcı istatistikleri görüntüleme için gerekli
*/

'use client';

import {
  Coins,
  BookOpen,
  Calendar,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
// UserProfile type defined locally
interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
  created_at: string;
  updated_at: string;
}

interface StatsCardsProps {
  profile: UserProfile | null;
  totalCount: number;
  refreshCreditBalance: () => void;
}

// Yardımcı fonksiyonlar
const getMemberSince = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '1 gün';
  }
  if (diffDays < 30) {
    return `${diffDays} gün`;
  }
  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} ay`;
  }
  return `${Math.floor(diffDays / 365)} yıl`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function StatsCards({
  profile,
  totalCount,
  refreshCreditBalance,
}: StatsCardsProps) {
  const { t: translate } = useTranslations();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {/* Kredi Bakiyesi */}
      <div className="card hover-lift p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gold/20 rounded-lg">
              <Coins className="h-6 w-6 text-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-text-muted">Kredi Bakiyesi</p>
              <p className="text-2xl font-bold text-text-celestial">
                {profile?.credit_balance || 0}
              </p>
            </div>
          </div>
          <button
            onClick={refreshCreditBalance}
            className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
            title="Kredi bakiyesini yenile"
            aria-label="Kredi bakiyesini yenile"
          >
            <RefreshCw className="h-4 w-4 text-gold" />
          </button>
        </div>
      </div>
      
      {/* Toplam Okuma */}
      <div className="card hover-lift p-6">
        <div className="flex items-center">
          <div className="p-2 bg-success/20 rounded-lg">
            <BookOpen className="h-6 w-6 text-success" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-admin-text-muted">
              {translate('dashboard.readingsPage.totalReadings', 'Toplam Okuma')}
            </p>
            <p className="text-2xl font-bold text-admin-text">{totalCount}</p>
            <p className="text-xs text-text-muted">Son 30 gün</p>
          </div>
        </div>
      </div>
      
      {/* Üyelik Süresi */}
      <div className="card hover-lift p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple/20 rounded-lg">
            <Calendar className="h-6 w-6 text-purple" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-text-muted">Üyelik Süresi</p>
            <p className="text-2xl font-bold text-text-celestial">
              {profile?.created_at ? getMemberSince(profile.created_at) : 'Yeni'}
            </p>
            <p className="text-xs text-text-muted">
              {profile?.created_at ? formatDate(profile.created_at) : 'Bugün'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Aktivite Skoru */}
      <div className="card hover-lift p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue/20 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-text-muted">Aktivite Skoru</p>
            <p className="text-2xl font-bold text-text-celestial">
              {totalCount > 10 ? 'Aktif' : totalCount > 5 ? 'Orta' : 'Yeni'}
            </p>
            <p className="text-xs text-text-muted">
              {totalCount} okuma
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
