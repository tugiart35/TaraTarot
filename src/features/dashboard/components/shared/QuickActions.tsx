/*
info:
Bağlantılı dosyalar:
- lucide-react: İkonlar için (gerekli)
- @/hooks/useTranslations: i18n desteği için (gerekli)

Dosyanın amacı:
- Dashboard sayfasının hızlı işlemler bölümünü oluşturur
- Kullanıcının sık kullandığı sayfalara hızlı erişim sağlar
- Ayarlar, kredi paketleri, okuma geçmişi gibi önemli linkleri içerir

Geliştirme ve öneriler:
- Responsive tasarım ve modern UI
- Hover efektleri ve transition animasyonları
- Accessibility desteği
- Icon ve renk tutarlılığı

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz kod yapısı, açık prop isimleri
- Optimizasyon: Gereksiz re-render'lar önlenmiş
- Yeniden Kullanılabilirlik: Modüler bileşen yapısı
- Güvenlik: Güvenli navigation linkleri

Gereklilik ve Kullanım Durumu:
- QuickActions: Gerekli, dashboard hızlı erişim menüsü için
- currentLocale: Gerekli, dil desteği için
*/

'use client';

import { Settings, Coins, BookOpen, TrendingUp, History, Crown } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';

interface QuickActionsProps {
  currentLocale: string;
}

export default function QuickActions({ currentLocale }: QuickActionsProps) {
  const { t: translate } = useTranslations();
  const { isAdmin } = useAuth();

  const quickActions = [
    // Admin kullanıcıları için Pakize erişimi
    ...(isAdmin ? [{
      href: `/${currentLocale}/pakize`,
      icon: Crown,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/20',
      label: '👑 Pakize Admin Panel',
      arrowColor: 'text-red-400',
    }] : []),
    {
      href: `/${currentLocale}/dashboard/settings`,
      icon: Settings,
      iconColor: 'text-success',
      bgColor: 'bg-success/20',
      label: translate('dashboard.accountSettings', 'Hesap Ayarları'),
      arrowColor: 'text-success',
    },
    {
      href: `/${currentLocale}/dashboard/packages`,
      icon: Coins,
      iconColor: 'text-gold',
      bgColor: 'bg-gold/20',
      label: translate('dashboard.creditPackages', 'Kredi Paketleri'),
      arrowColor: 'text-gold',
    },
    {
      href: `/${currentLocale}/dashboard/credits`,
      icon: History,
      iconColor: 'text-info',
      bgColor: 'bg-info/20',
      label: translate('dashboard.creditHistory', 'Kredi Geçmişi'),
      arrowColor: 'text-info',
    },
    {
      href: `/${currentLocale}/dashboard/readings`,
      icon: BookOpen,
      iconColor: 'text-purple',
      bgColor: 'bg-purple/20',
      label: translate('dashboard.readingHistory', 'Okuma Geçmişi'),
      arrowColor: 'text-purple',
    },
    {
      href: `/${currentLocale}/dashboard/statistics`,
      icon: TrendingUp,
      iconColor: 'text-warning',
      bgColor: 'bg-warning/20',
      label: translate('dashboard.statistics', 'İstatistikler'),
      arrowColor: 'text-warning',
    },
  ];

  return (
    <div>
      <h3 className='text-heading-3 text-gold mb-4'>
        {translate('dashboard.quickAccess', 'Hızlı Erişim')}
      </h3>
      <div className='space-y-3'>
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;

          return (
            <a
              key={index}
              href={action.href}
              className='flex items-center justify-between p-3 bg-crystal-clear rounded-lg hover:bg-crystal-clear/80 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className={`p-2 ${action.bgColor} rounded-lg`}>
                  <IconComponent className={`h-4 w-4 ${action.iconColor}`} />
                </div>
                <span className='text-text-celestial font-medium'>
                  {action.label}
                </span>
              </div>
              <span className={action.arrowColor}>→</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
