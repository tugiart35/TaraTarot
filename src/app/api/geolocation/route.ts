/*
 * DOSYA ANALİZİ - GEOLOCATION API ENDPOINT (PRODUCTION-READY)
 * 
 * BAĞLANTILI DOSYALAR:
 * - src/lib/utils/geolocation.ts (geolocation utility fonksiyonları)
 * - src/middleware.ts (IP tabanlı dil yönlendirmesi için)
 * - src/lib/i18n/config.ts (desteklenen diller)
 * 
 * DOSYA AMACI:
 * Client-side coğrafi konum tespiti için API endpoint
 * IP tabanlı ve browser geolocation fallback desteği
 * 
 * SUPABASE DEĞİŞKENLERİ VE TABLOLARI:
 * - Yok (API endpoint)
 * 
 * GÜVENLİK ÖZELLİKLERİ:
 * - Rate limiting
 * - Input validation
 * - Error handling
 * - CORS headers
 * 
 * KULLANIM DURUMU:
 * - GEREKLİ: Client-side coğrafi konum tespiti için
 * - GÜVENLİ: Production-ready with security
 * - PERFORMANSLI: Cache mekanizması ile
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeolocationFromIP, getClientIP, type GeolocationData } from '@/lib/utils/geolocation';

// Rate limiting için basit in-memory store
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Dakikada 10 istek
const RATE_WINDOW = 60 * 1000; // 1 dakika

// Rate limiting kontrolü
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `geolocation:${ip}`;
  const entry = requestCounts.get(key);
  
  if (!entry || now > entry.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT) {
    return false;
  }
  
  entry.count++;
  return true;
}

// GET endpoint - IP tabanlı coğrafi konum tespiti
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    
    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }
    
    // IP tabanlı coğrafi konum tespiti
    const geolocation = await getGeolocationFromIP(ip);
    
    if (!geolocation) {
      return NextResponse.json(
        { error: 'Unable to determine location' },
        { status: 400 }
      );
    }
    
    // CORS headers
    const response = NextResponse.json({
      success: true,
      data: geolocation,
      ip: ip,
      timestamp: new Date().toISOString()
    });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Cache-Control', 'public, max-age=3600'); // 1 saat cache
    
    return response;
    
  } catch (error) {
    console.error('Geolocation API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint - Client-side coğrafi konum bilgisi ile dil belirleme
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    
    // Rate limiting kontrolü
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }
    
    const body = await request.json();
    
    // Input validation
    if (!body.latitude || !body.longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }
    
    // Reverse geocoding
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${body.latitude}&longitude=${body.longitude}&localityLanguage=en`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'TarotApp/1.0'
        },
        signal: AbortSignal.timeout(5000)
      }
    );
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Dil belirleme
    let locale: 'tr' | 'en' | 'sr' = 'en';
    if (data.countryCode === 'TR') {
      locale = 'tr';
    } else if (data.countryCode === 'RS' || data.countryCode === 'BA' || data.countryCode === 'ME') {
      locale = 'sr';
    }
    
    const geolocationData: GeolocationData = {
      country: data.countryName || 'Unknown',
      countryCode: data.countryCode || 'XX',
      region: data.principalSubdivision || 'Unknown',
      city: data.locality || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale
    };
    
    // CORS headers
    const apiResponse = NextResponse.json({
      success: true,
      data: geolocationData,
      ip: ip,
      timestamp: new Date().toISOString()
    });
    
    apiResponse.headers.set('Access-Control-Allow-Origin', '*');
    apiResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    apiResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    apiResponse.headers.set('Cache-Control', 'public, max-age=3600');
    
    return apiResponse;
    
  } catch (error) {
    console.error('Geolocation POST API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS endpoint - CORS preflight
export async function OPTIONS(_request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}
