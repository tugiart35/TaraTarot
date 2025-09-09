/*
info:
Bağlantılı dosyalar:
- ../../messages/*.json: Dil dosyaları için (gerekli)
- ../../src/lib/i18n/config.ts: i18n yapılandırması için (gerekli)

Dosyanın amacı:
- Dil dosyaları arasında anahtar eşitliği kontrolü
- Eksik çevirileri tespit etme
- Kritik namespace'lerin tamamlanmasını sağlama

Supabase değişkenleri ve tabloları:
- Yok (test dosyası)

Geliştirme önerileri:
- Yeni dil eklenirken bu test güncellenmeli
- Kritik anahtarlar listesi genişletilebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- CI/CD pipeline'da çalışır
*/

import { describe, it, expect } from '@jest/globals';
import { locales } from '../../src/lib/i18n/config';

// Kritik namespace'ler - tüm dillerde bulunması gereken
const criticalNamespaces = [
  'common',
  'nav',
  'auth',
  'validation',
  'tarot',
  'reading',
  'errors',
  'seo',
];

// Kritik anahtarlar - tüm dillerde bulunması gereken
const criticalKeys = [
  'common.ok',
  'common.cancel',
  'common.save',
  'common.loading',
  'common.error',
  'nav.home',
  'nav.dashboard',
  'auth.signIn.title',
  'auth.signUp.title',
  'auth.email',
  'auth.password',
  'auth.errors.invalidCredentials',
  'validation.required',
  'validation.email',
  'validation.minLength',
  'tarot.title',
  'tarot.subtitle',
  'reading.types.threeCard',
  'reading.types.love',
  'errors.pageNotFound',
  'errors.serverError',
  'seo.title',
  'seo.description',
];

describe('i18n Messages Parity', () => {
  let messages: Record<string, Record<string, any>> = {};

  beforeAll(async () => {
    // Tüm dil dosyalarını yükle
    for (const locale of locales) {
      try {
        const module = await import(`../../messages/${locale}.json`);
        messages[locale] = module.default;
      } catch (error) {
        throw new Error(`Failed to load messages for locale: ${locale}`);
      }
    }
  });

  describe('Critical Namespaces', () => {
    it('should have all critical namespaces in all locales', () => {
      for (const locale of locales) {
        for (const namespace of criticalNamespaces) {
          expect(messages[locale]).toHaveProperty(namespace);
        }
      }
    });
  });

  describe('Critical Keys', () => {
    it('should have all critical keys in all locales', () => {
      for (const locale of locales) {
        for (const key of criticalKeys) {
          const keys = key.split('.');
          let current = messages[locale];
          
          for (const k of keys) {
            expect(current).toHaveProperty(k);
            current = current[k];
          }
          
          expect(typeof current).toBe('string');
          expect(current.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Message Structure', () => {
    it('should have consistent structure across locales', () => {
      const baseLocale = locales[0];
      const baseKeys = getAllKeys(messages[baseLocale]);

      for (const locale of locales.slice(1)) {
        const localeKeys = getAllKeys(messages[locale]);
        
        // Tüm anahtarlar mevcut olmalı
        for (const key of baseKeys) {
          expect(localeKeys).toContain(key);
        }
        
        // Ekstra anahtarlar olmamalı (opsiyonel - bazı dillerde ekstra anahtarlar olabilir)
        // expect(localeKeys).toEqual(baseKeys);
      }
    });
  });

  describe('Message Content', () => {
    it('should not have empty messages', () => {
      for (const locale of locales) {
        const emptyMessages = findEmptyMessages(messages[locale]);
        expect(emptyMessages).toEqual([]);
      }
    });

    it('should not have placeholder messages', () => {
      const placeholderPatterns = [
        /^TODO:/i,
        /^TBD:/i,
        /^PLACEHOLDER/i,
        /^XXX/i,
      ];

      for (const locale of locales) {
        const placeholderMessages = findPlaceholderMessages(messages[locale], placeholderPatterns);
        expect(placeholderMessages).toEqual([]);
      }
    });
  });
});

// Yardımcı fonksiyonlar
function getAllKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  
  return keys;
}

function findEmptyMessages(obj: any, prefix = ''): string[] {
  const empty: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        empty.push(...findEmptyMessages(obj[key], fullKey));
      } else if (typeof obj[key] === 'string' && obj[key].trim() === '') {
        empty.push(fullKey);
      }
    }
  }
  
  return empty;
}

function findPlaceholderMessages(obj: any, patterns: RegExp[], prefix = ''): string[] {
  const placeholders: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        placeholders.push(...findPlaceholderMessages(obj[key], patterns, fullKey));
      } else if (typeof obj[key] === 'string') {
        for (const pattern of patterns) {
          if (pattern.test(obj[key])) {
            placeholders.push(fullKey);
            break;
          }
        }
      }
    }
  }
  
  return placeholders;
}
