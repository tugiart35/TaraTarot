/*
 * Security Utilities
 * XSS koruması ve güvenlik kontrolleri
 */

/**
 * Image source validation
 * Sadece güvenli domain'lerden gelen resimlere izin verir
 */
export function validateImageSrc(src: string): boolean {
  // Yerel dosya yollarına izin ver (public klasöründeki dosyalar)
  if (src.startsWith('/') && !src.startsWith('//')) {
    return true;
  }

  // Data URL'lere izin ver (base64 encoded images)
  if (src.startsWith('data:')) {
    return true;
  }

  const allowedDomains = [
    'localhost',
    'supabase.co',
    'supabase.com',
    'cdn.supabase.io',
    // Production domain'ler buraya eklenebilir
  ];

  try {
    const url = new URL(src);
    return allowedDomains.some(
      domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );
  } catch {
    // Geçersiz URL
    return false;
  }
}

/**
 * HTML injection koruması
 * PDF export için güvenli HTML oluşturur
 */
export function sanitizeHtml(html: string): string {
  // Tehlikeli tag'leri kaldır
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form'];
  let sanitized = html;

  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Tehlikeli attribute'ları kaldır
  const dangerousAttrs = ['onload', 'onerror', 'onclick', 'onmouseover'];
  dangerousAttrs.forEach(attr => {
    const regex = new RegExp(`\\s${attr}\\s*=\\s*["'][^"']*["']`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  return sanitized;
}

/**
 * XSS koruması için text sanitization
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * URL validation
 * Sadece güvenli URL'lere izin verir
 */
export function validateUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/**
 * Numeroloji input sanitization
 * İsim ve tarih girişlerini güvenli hale getirir
 */
export function sanitizeNumerologyInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // HTML/XML tag'lerini kaldır
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Script injection'ları kaldır
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/vbscript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');

  // Sadece harf, rakam, boşluk, tire ve nokta karakterlerine izin ver
  sanitized = sanitized.replace(/[^a-zA-Z0-9\s\-\.]/g, '');

  // Çoklu boşlukları tek boşluğa çevir
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  // Maksimum uzunluk kontrolü
  return sanitized.substring(0, 100);
}

/**
 * Tarih formatı validation
 * Sadece geçerli tarih formatlarına izin verir
 */
export function validateDateInput(dateString: string): boolean {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }

  // YYYY-MM-DD formatını kontrol et
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Geçerli tarih mi kontrol et
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Gelecek tarih kontrolü (100 yıl sonrasına kadar)
  const now = new Date();
  const maxDate = new Date(now.getFullYear() + 100, 11, 31);
  if (date > maxDate) {
    return false;
  }

  // Çok eski tarih kontrolü (1900'den önce)
  const minDate = new Date(1900, 0, 1);
  if (date < minDate) {
    return false;
  }

  return true;
}

/**
 * İsim validation
 * Sadece geçerli karakterlere izin verir
 */
export function validateNameInput(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  // Boş string kontrolü
  if (name.trim().length === 0) {
    return false;
  }

  // Minimum ve maksimum uzunluk kontrolü
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Sadece harf, boşluk, tire ve nokta karakterlerine izin ver
  const nameRegex = /^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s\-\.]+$/;
  if (!nameRegex.test(name)) {
    return false;
  }

  // Çoklu boşluk kontrolü
  if (/\s{2,}/.test(name)) {
    return false;
  }

  return true;
}

/**
 * XSS koruması için gelişmiş text sanitization
 */
export function sanitizeForDisplay(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // HTML entity'lerini decode et
  const htmlEntities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  let sanitized = text;
  Object.entries(htmlEntities).forEach(([entity, char]) => {
    sanitized = sanitized.replace(new RegExp(entity, 'g'), char);
  });

  // Tehlikeli karakterleri escape et
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Form input rate limiting
 * Çok sık form gönderimini engeller
 */
const formSubmissionTimes: Map<string, number[]> = new Map();

export function checkRateLimit(
  userId: string = 'anonymous',
  maxSubmissions: number = 5,
  timeWindow: number = 60000
): boolean {
  const now = Date.now();
  const userSubmissions = formSubmissionTimes.get(userId) || [];

  // Eski submission'ları temizle
  const recentSubmissions = userSubmissions.filter(
    time => now - time < timeWindow
  );

  if (recentSubmissions.length >= maxSubmissions) {
    return false; // Rate limit aşıldı
  }

  // Yeni submission'ı ekle
  recentSubmissions.push(now);
  formSubmissionTimes.set(userId, recentSubmissions);

  return true;
}

/**
 * Content Security Policy header'ları
 */
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
