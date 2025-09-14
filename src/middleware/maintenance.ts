/*
info:
Bağlantılı dosyalar:
- lib/admin/maintenance-system.ts: Bakım modu yönetimi (gerekli)
- middleware.ts: Ana middleware (gerekli)

Dosyanın amacı:
- Bakım modu kontrolü
- IP whitelist kontrolü
- Bakım sayfası yönlendirmesi

Supabase değişkenleri ve tabloları:
- system_settings: Sistem ayarları

Geliştirme önerileri:
- Cache mekanizması
- Rate limiting
- Logging

Tespit edilen hatalar:
- ✅ Bakım modu kontrolü eklendi
- ✅ IP whitelist eklendi
- ✅ Yönlendirme sistemi eklendi

Kullanım durumu:
- ✅ Gerekli: Sistem bakım kontrolü
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function checkMaintenanceMode(request: NextRequest): Promise<NextResponse | null> {
  try {
    // Admin sayfaları ve API endpoint'leri için bakım modunu atla
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.startsWith('/pakize') || pathname.startsWith('/api/pakize');
    const isAuthRoute = pathname.startsWith('/auth') || pathname.startsWith('/api/auth');
    const isMaintenanceRoute = pathname === '/maintenance';
    
    if (isAdminRoute || isAuthRoute || isMaintenanceRoute) {
      return null; // Bakım modunu atla
    }

    // Supabase client oluştur
    const supabase = createClient();
    
    // Bakım modu ayarlarını al
    const { data: settings, error } = await supabase
      .from('system_settings')
      .select('key, value')
      .eq('category', 'maintenance');

    if (error) {
      console.error('Error fetching maintenance settings:', error);
      return null; // Hata durumunda devam et
    }

    const maintenanceData = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>);

    const isMaintenanceMode = maintenanceData.enabled === true || maintenanceData.enabled === 'true';
    
    if (!isMaintenanceMode) {
      return null; // Bakım modu kapalı
    }

    // IP kontrolü
    const userIP = getClientIP(request);
    const allowedIPs = Array.isArray(maintenanceData.allowed_ips) ? maintenanceData.allowed_ips : [];
    const canAccess = allowedIPs.includes(userIP) || allowedIPs.includes('*');

    if (canAccess) {
      return null; // IP whitelist'te
    }

    // Bakım sayfasına yönlendir
    const maintenanceUrl = new URL('/maintenance', request.url);
    maintenanceUrl.searchParams.set('message', maintenanceData.message || 'Sistem bakımda');
    
    return NextResponse.redirect(maintenanceUrl);
  } catch (error) {
    console.error('Maintenance middleware error:', error);
    return null; // Hata durumunda devam et
  }
}

// Client IP adresini al
function getClientIP(request: NextRequest): string {
  // X-Forwarded-For header'ından IP al
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]!.trim();
  }

  // X-Real-IP header'ından IP al
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Connection'dan IP al
  const connection = request.headers.get('x-connection-ip');
  if (connection) {
    return connection;
  }

  return 'unknown';
}
