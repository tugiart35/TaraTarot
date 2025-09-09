/*
info:
Bağlantılı dosyalar:
- ../../src/middleware.ts: Locale routing middleware için (gerekli)
- ../../src/lib/i18n/paths.ts: Path helper fonksiyonları için (gerekli)
- ../../src/lib/i18n/config.ts: i18n yapılandırması için (gerekli)

Dosyanın amacı:
- Locale routing testleri
- Varsayılan dil yönlendirmesi testleri
- Path korunması testleri

Supabase değişkenleri ve tabloları:
- Yok (test dosyası)

Geliştirme önerileri:
- E2E testleri için Playwright entegrasyonu
- Performance testleri eklenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- CI/CD pipeline'da çalışır
*/

import { describe, it, expect } from '@jest/globals';
import { locales, defaultLocale } from '../../src/lib/i18n/config';
import {
  getLocaleFromPath,
  removeLocaleFromPath,
  createLocalizedPath,
  createAllLocalizedPaths,
  getLanguageSwitcherPaths,
} from '../../src/lib/i18n/paths';

describe('Locale Routing', () => {
  describe('getLocaleFromPath', () => {
    it('should extract locale from path', () => {
      expect(getLocaleFromPath('/tr/tarot')).toBe('tr');
      expect(getLocaleFromPath('/en/tarot')).toBe('en');
      expect(getLocaleFromPath('/sr/tarot')).toBe('sr');
    });

    it('should return default locale for paths without locale', () => {
      expect(getLocaleFromPath('/tarot')).toBe(defaultLocale);
      expect(getLocaleFromPath('/')).toBe(defaultLocale);
    });

    it('should return default locale for invalid locale', () => {
      expect(getLocaleFromPath('/invalid/tarot')).toBe(defaultLocale);
    });
  });

  describe('removeLocaleFromPath', () => {
    it('should remove locale from path', () => {
      expect(removeLocaleFromPath('/tr/tarot')).toBe('/tarot');
      expect(removeLocaleFromPath('/en/tarot')).toBe('/tarot');
      expect(removeLocaleFromPath('/sr/tarot')).toBe('/tarot');
    });

    it('should return original path if no locale found', () => {
      expect(removeLocaleFromPath('/tarot')).toBe('/tarot');
      expect(removeLocaleFromPath('/')).toBe('/');
    });
  });

  describe('createLocalizedPath', () => {
    it('should create localized path for non-default locale', () => {
      expect(createLocalizedPath('/tarot', 'en')).toBe('/en/tarot');
      expect(createLocalizedPath('/tarot', 'sr')).toBe('/sr/tarot');
    });

    it('should not add locale prefix for default locale', () => {
      expect(createLocalizedPath('/tarot', defaultLocale)).toBe('/tarot');
      expect(createLocalizedPath('/', defaultLocale)).toBe('/');
    });

    it('should handle nested paths', () => {
      expect(createLocalizedPath('/tarot/love', 'en')).toBe('/en/tarot/love');
      expect(createLocalizedPath('/tarot/love', 'sr')).toBe('/sr/tarot/love');
    });
  });

  describe('createAllLocalizedPaths', () => {
    it('should create paths for all locales', () => {
      const paths = createAllLocalizedPaths('/tarot');
      
      expect(paths).toHaveProperty('tr');
      expect(paths).toHaveProperty('en');
      expect(paths).toHaveProperty('sr');
      
      expect(paths.tr).toBe('/tarot');
      expect(paths.en).toBe('/en/tarot');
      expect(paths.sr).toBe('/sr/tarot');
    });
  });

  describe('getLanguageSwitcherPaths', () => {
    it('should return language switcher data', () => {
      const paths = getLanguageSwitcherPaths('/tarot');
      
      expect(paths).toHaveLength(locales.length);
      
      for (const path of paths) {
        expect(path).toHaveProperty('locale');
        expect(path).toHaveProperty('path');
        expect(path).toHaveProperty('name');
        expect(path).toHaveProperty('nativeName');
        
        expect(locales).toContain(path.locale);
        expect(typeof path.path).toBe('string');
        expect(typeof path.name).toBe('string');
        expect(typeof path.nativeName).toBe('string');
      }
    });

    it('should preserve current path in language switcher', () => {
      const paths = getLanguageSwitcherPaths('/tarot/love');
      
      const trPath = paths.find(p => p.locale === 'tr');
      const enPath = paths.find(p => p.locale === 'en');
      const srPath = paths.find(p => p.locale === 'sr');
      
      expect(trPath?.path).toBe('/tarot/love');
      expect(enPath?.path).toBe('/en/tarot/love');
      expect(srPath?.path).toBe('/sr/tarot/love');
    });
  });

  describe('Locale Validation', () => {
    it('should have valid locale names', () => {
      for (const locale of locales) {
        expect(locale).toMatch(/^[a-z]{2}$/);
      }
    });

    it('should have default locale in supported locales', () => {
      expect(locales).toContain(defaultLocale);
    });

    it('should have unique locales', () => {
      const uniqueLocales = new Set(locales);
      expect(uniqueLocales.size).toBe(locales.length);
    });
  });

  describe('Path Edge Cases', () => {
    it('should handle root path', () => {
      expect(createLocalizedPath('/', 'en')).toBe('/en');
      expect(createLocalizedPath('/', 'sr')).toBe('/sr');
      expect(createLocalizedPath('/', defaultLocale)).toBe('/');
    });

    it('should handle paths with query parameters', () => {
      // Nota: Query parametreleri path helper'lar tarafından işlenmez
      // Bu test gelecekte query parametre desteği eklendiğinde güncellenebilir
      expect(createLocalizedPath('/tarot?param=value', 'en')).toBe('/en/tarot?param=value');
    });

    it('should handle paths with hash', () => {
      // Nota: Hash'ler path helper'lar tarafından işlenmez
      // Bu test gelecekte hash desteği eklendiğinde güncellenebilir
      expect(createLocalizedPath('/tarot#section', 'en')).toBe('/en/tarot#section');
    });
  });
});
