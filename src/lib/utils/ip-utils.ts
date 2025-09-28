/*
 * IP Utility Functions
 *
 * Bu dosya IP adresi alma işlemleri için ortak utility fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan getClientIP kodlarını önler.
 */

import { NextRequest } from 'next/server';

/**
 * Request'ten client IP adresini al
 * Vercel, Cloudflare ve diğer platformlar için optimized
 */
export function getClientIP(request: NextRequest): string {
  // Vercel'de x-forwarded-for header'ı kullan
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || '';
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

  // AWS ALB'de x-real-ip header'ı kullan
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback: request.ip
  return (request as any).ip || '127.0.0.1';
}

/**
 * IP adresini temizle ve doğrula
 */
export function cleanIPAddress(ip: string): string {
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
    return ip.split(',')[0]?.trim() || '';
  }

  return ip;
}

/**
 * IP adresinin geçerli olup olmadığını kontrol et
 */
export function isValidIP(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (basit)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * IP adresinin localhost olup olmadığını kontrol et
 */
export function isLocalhost(ip: string): boolean {
  const cleanIP = cleanIPAddress(ip);
  return cleanIP === '127.0.0.1' || cleanIP === 'localhost';
}
