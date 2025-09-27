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
    return allowedDomains.some(domain => 
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
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
    "form-action 'self'"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
