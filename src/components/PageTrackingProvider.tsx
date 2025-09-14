/*
info:
Bağlantılı dosyalar:
- hooks/usePageTracking.ts: Sayfa takip hook'u (gerekli)
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)

Dosyanın amacı:
- Sayfa görüntüleme takibi için provider bileşeni
- Otomatik sayfa ziyaret kaydı
- Analytics verilerini toplama

Supabase değişkenleri ve tabloları:
- page_views: Sayfa görüntüleme kayıtları

Geliştirme önerileri:
- Otomatik sayfa takibi
- Session yönetimi
- Performans optimizasyonu

Tespit edilen hatalar:
- ✅ Provider yapısı oluşturuldu

Kullanım durumu:
- ✅ Gerekli: Sayfa analitikleri için takip sistemi
- ✅ Production-ready: Supabase entegrasyonu ile
*/

'use client';

import { ReactNode } from 'react';
import { usePageTracking } from '@/hooks/usePageTracking';

interface PageTrackingProviderProps {
  children: ReactNode;
}

export function PageTrackingProvider({ children }: PageTrackingProviderProps) {
  // Sayfa takibini başlat
  usePageTracking();

  return <>{children}</>;
}

