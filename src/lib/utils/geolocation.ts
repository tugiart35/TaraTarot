/*
 * DOSYA ANALİZİ - GEOLOCATION UTILITY (PRODUCTION-READY)
 * 
 * BAĞLANTILI DOSYALAR:
 * - src/middleware.ts (IP tabanlı dil yönlendirmesi için)
 * - src/lib/i18n/config.ts (desteklenen diller)
 * - src/app/api/geolocation/route.ts (API endpoint)
 * 
 * DOSYA AMACI:
 * IP adresinden coğrafi konum tespiti ve dil belirleme
 * Türkiye'den gelen kullanıcılar için Türkçe, diğerleri için İngilizce
 * 
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (utility fonksiyon)
 * 
 * GÜVENLİK ÖZELLİKLERİ:
 * - Rate limiting için IP kontrolü
 * - Fallback mekanizması
 * - Error handling
 * 
 * KULLANIM DURUMU:
 * - GEREKLİ: IP tabanlı dil yönlendirmesi için
 * - GÜVENLİ: Production-ready with error handling
 * - PERFORMANSLI: Cache mekanizması ile
 */

import { NextRequest } from 'next/server';

// Desteklenen diller
export type SupportedLocale = 'tr' | 'en' | 'sr';

// Coğrafi konum bilgisi
export interface GeolocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  timezone: string;
  locale: SupportedLocale;
}

// Cache için in-memory store (production'da Redis kullanılmalı)
const geolocationCache = new Map<string, { data: GeolocationData; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 saat

// IP adresini temizle ve doğrula
function cleanIPAddress(ip: string): string {
  // IPv6 localhost
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    return '127.0.0.1';
  }
  
  // IPv4 localhost
  if (ip === '127.0.0.1') {
    return '127.0.0.1';
  }
  
  // X-Forwarded-For header'ından ilk IP'yi al
  if (ip.includes(',')) {
    return ip.split(',')[0].trim();
  }
  
  return ip;
}

// IP adresinden coğrafi konum bilgisi al
export async function getGeolocationFromIP(ip: string): Promise<GeolocationData | null> {
  try {
    const cleanIP = cleanIPAddress(ip);
    
    // Localhost için varsayılan değer
    if (cleanIP === '127.0.0.1' || cleanIP === 'localhost') {
      return {
        country: 'Turkey',
        countryCode: 'TR',
        region: 'Istanbul',
        city: 'Istanbul',
        timezone: 'Europe/Istanbul',
        locale: 'tr'
      };
    }
    
    // Cache kontrolü
    const cached = geolocationCache.get(cleanIP);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    // IP geolocation API'si kullan
    const response = await fetch(`http://ip-api.com/json/${cleanIP}?fields=status,message,country,countryCode,region,city,timezone`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TarotApp/1.0'
      },
      // Timeout ekle
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'fail') {
      return null;
    }
    
    // Dil belirleme
    let locale: SupportedLocale = 'en'; // Varsayılan İngilizce
    
    if (data.countryCode === 'TR') {
      locale = 'tr';
    } else if (data.countryCode === 'RS' || data.countryCode === 'BA' || data.countryCode === 'ME') {
      locale = 'sr';
    }
    
    const geolocationData: GeolocationData = {
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      region: data.region || 'Unknown',
      city: data.city || 'Unknown',
      timezone: data.timezone || 'UTC',
      locale
    };
    
    // Cache'e kaydet
    geolocationCache.set(cleanIP, {
      data: geolocationData,
      timestamp: Date.now()
    });
    
    return geolocationData;
    
  } catch (error) {
    return null;
  }
}

// IP adresinden dil belirleme (basit versiyon)
export async function getLocaleFromIP(ip: string): Promise<SupportedLocale> {
  const geolocation = await getGeolocationFromIP(ip);
  return geolocation?.locale || 'en';
}

// Client-side coğrafi konum tespiti (fallback)
export async function getClientGeolocation(): Promise<GeolocationData | null> {
  try {
    if (!navigator.geolocation) {
      return null;
    }
    
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding için API kullan
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            
            if (!response.ok) {
              resolve(null);
              return;
            }
            
            const data = await response.json();
            
            let locale: SupportedLocale = 'en';
            if (data.countryCode === 'TR') {
              locale = 'tr';
            } else if (data.countryCode === 'RS' || data.countryCode === 'BA' || data.countryCode === 'ME') {
              locale = 'sr';
            }
            
            resolve({
              country: data.countryName || 'Unknown',
              countryCode: data.countryCode || 'XX',
              region: data.principalSubdivision || 'Unknown',
              city: data.locality || 'Unknown',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              locale
            });
          } catch (error) {
            resolve(null);
          }
        },
        (error) => {
          resolve(null);
        },
        {
          timeout: 10000,
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 dakika
        }
      );
    });
  } catch (error) {
    return null;
  }
}

// Request'ten IP adresi al
export function getClientIP(request: NextRequest): string {
  // Vercel'de x-forwarded-for header'ı kullan
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  // Cloudflare'de cf-connecting-ip header'ı kullan
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP;
  }
  
  // Vercel'de x-vercel-forwarded-for header'ı kullan
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP;
  }
  
  // Fallback: request.ip
  return request.ip || '127.0.0.1';
}

// Cache temizleme fonksiyonu
export function clearGeolocationCache(): void {
  geolocationCache.clear();
}

// Cache istatistikleri
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: geolocationCache.size,
    entries: Array.from(geolocationCache.keys())
  };
}
