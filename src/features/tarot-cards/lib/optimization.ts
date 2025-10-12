/**
 * Optimization utilities for tarot cards feature
 * Handles code duplication removal and bundle size optimization
 */

import * as React from 'react';
import { TarotCard, CardContent } from '../../../types/tarot-cards';

/**
 * Shared locale utilities to avoid duplication
 */
export class LocaleUtils {
  static getCardNameForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    switch (locale) {
      case 'tr':
        return card.turkishName;
      case 'en':
        return card.englishName;
      case 'sr':
        return card.serbianName;
      default:
        return card.turkishName;
    }
  }

  static getCardUrlForLocale(
    card: TarotCard,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const basePath =
      locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    const slug = card.slug[locale];
    return `/${locale}/${basePath}/${slug}`;
  }

  static getLocalizedText(key: string, locale: 'tr' | 'en' | 'sr'): string {
    const translations: Record<string, Record<'tr' | 'en' | 'sr', string>> = {
      // Common UI text
      'card-meanings': {
        tr: 'Kart Anlamları',
        en: 'Card Meanings',
        sr: 'Značenja Karte',
      },
      keywords: {
        tr: 'Anahtar Kelimeler',
        en: 'Keywords',
        sr: 'Ključne Reči',
      },
      'card-story': {
        tr: 'Kartın Hikayesi',
        en: 'Card Story',
        sr: 'Priča Karte',
      },
      'related-cards': {
        tr: 'İlgili Kartlar',
        en: 'Related Cards',
        sr: 'Povezane Karte',
      },
      faq: {
        tr: 'Sıkça Sorulan Sorular',
        en: 'Frequently Asked Questions',
        sr: 'Često Postavljana Pitanja',
      },
      cta: {
        tr: 'Kartınızı Çekin ve Keşfedin',
        en: 'Draw Your Card and Discover',
        sr: 'Izvuci Svoju Kartu i Otkrij',
      },
      upright: {
        tr: 'Düz Pozisyon',
        en: 'Upright Position',
        sr: 'Uspravna Pozicija',
      },
      reversed: {
        tr: 'Ters Pozisyon',
        en: 'Reversed Position',
        sr: 'Obrnuta Pozicija',
      },
      love: {
        tr: 'Aşk',
        en: 'Love',
        sr: 'Ljubav',
      },
      career: {
        tr: 'Kariyer',
        en: 'Career',
        sr: 'Karijera',
      },
      money: {
        tr: 'Para',
        en: 'Money',
        sr: 'Novac',
      },
      spiritual: {
        tr: 'Ruhsal',
        en: 'Spiritual',
        sr: 'Duhovno',
      },
      'major-arcana': {
        tr: 'Major Arcana',
        en: 'Major Arcana',
        sr: 'Velika Arkana',
      },
      'minor-arcana': {
        tr: 'Minor Arcana',
        en: 'Minor Arcana',
        sr: 'Mala Arkana',
      },
      'view-all-cards': {
        tr: 'Tüm Kartları Gör',
        en: 'View All Cards',
        sr: 'Pogledaj Sve Karte',
      },
      'free-reading': {
        tr: 'Ücretsiz Tarot Okuması',
        en: 'Free Tarot Reading',
        sr: 'Besplatno Tarot Čitanje',
      },
      'love-reading': {
        tr: 'Aşk Tarot Okuması',
        en: 'Love Tarot Reading',
        sr: 'Ljubavno Tarot Čitanje',
      },
      'start-now': {
        tr: 'Hemen Başla',
        en: 'Start Now',
        sr: 'Počni Sada',
      },
      'love-reading-btn': {
        tr: 'Aşk Okuması',
        en: 'Love Reading',
        sr: 'Ljubavno Čitanje',
      },
      'do-tarot-reading': {
        tr: 'Tarot Okuması Yap',
        en: 'Do Tarot Reading',
        sr: 'Napravi Tarot Čitanje',
      },
    };

    return translations[key]?.[locale] || key;
  }
}

/**
 * Shared SEO utilities to avoid duplication
 */
export class SEOUtils {
  static generateMetaTitle(
    card: TarotCard,
    _content: CardContent,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const cardName = LocaleUtils.getCardNameForLocale(card, locale);
    const suffix = '| Busbuskimki';
    return `${cardName} - ${cardName} ${suffix}`;
  }

  static generateMetaDescription(
    content: CardContent,
    _locale: 'tr' | 'en' | 'sr'
  ): string {
    const maxLength = 160;
    const description = content.short_description;

    if (description.length <= maxLength) {
      return description;
    }

    return description.substring(0, maxLength - 3) + '...';
  }

  static generateKeywords(
    _card: TarotCard,
    content: CardContent,
    locale: 'tr' | 'en' | 'sr'
  ): string[] {
    // keywords obje olduğu için, keywords_message'dan anahtar kelimeleri çıkarabiliriz
    const keywordsText = content.keywords?.keywords_message || '';
    const baseKeywords = keywordsText
      .split(/[,;.\n]/)
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .slice(0, 5); // İlk 5 kelimeyi al
    
    const localeKeywords =
      locale === 'tr'
        ? ['tarot', 'kartlar', 'anlamlar']
        : locale === 'en'
          ? ['tarot', 'cards', 'meanings']
          : ['tarot', 'karte', 'značenja'];

    const allKeywords = [...baseKeywords, ...localeKeywords];
    return Array.from(new Set(allKeywords));
  }
}

/**
 * Shared component utilities to avoid duplication
 */
export class ComponentUtils {
  static getCardTypeBadge(card: TarotCard, locale: 'tr' | 'en' | 'sr'): string {
    if (card.arcanaType === 'major') {
      return LocaleUtils.getLocalizedText('major-arcana', locale);
    }
    return LocaleUtils.getLocalizedText('minor-arcana', locale);
  }

  static getCardNumberDisplay(card: TarotCard): string {
    if (card.arcanaType === 'major') {
      return card.number?.toString() || '0';
    }
    if (card.arcanaType === 'minor' && card.suit) {
      return `${card.suit.toUpperCase()} ${card.number}`;
    }
    return '';
  }

  static getReadingTimeText(
    readingTime: number,
    locale: 'tr' | 'en' | 'sr'
  ): string {
    const timeText =
      locale === 'tr'
        ? 'dakika okuma'
        : locale === 'en'
          ? 'min read'
          : 'min čitanje';
    return `${readingTime} ${timeText}`;
  }

  static getCardDescriptionText(locale: 'tr' | 'en' | 'sr'): string {
    return locale === 'tr'
      ? 'Detaylı anlamları için tıklayın'
      : locale === 'en'
        ? 'Click for detailed meanings'
        : 'Kliknite za detaljna značenja';
  }
}

/**
 * Bundle size optimization utilities
 */
export class BundleOptimizer {
  /**
   * Lazy load components to reduce initial bundle size
   */
  static createLazyComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  }

  /**
   * Analyze bundle size and identify optimization opportunities
   */
  static analyzeBundleSize(): {
    totalSize: number;
    recommendations: string[];
    criticalChunks: string[];
  } {
    const recommendations: string[] = [];
    const criticalChunks: string[] = [];

    // Check for large imports
    if (typeof window !== 'undefined') {
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && src.includes('_next/static/chunks/')) {
          criticalChunks.push(src);
        }
      });
    }

    // Bundle size recommendations
    recommendations.push('Use dynamic imports for non-critical components');
    recommendations.push('Implement code splitting for card components');
    recommendations.push('Optimize image loading with WebP format');
    recommendations.push('Remove unused dependencies');
    recommendations.push('Use tree shaking for better bundle optimization');

    return {
      totalSize: 0, // Will be calculated by build tools
      recommendations,
      criticalChunks,
    };
  }

  /**
   * Optimize imports to reduce bundle size
   */
  static optimizeImports() {
    return {
      // Use specific imports instead of wildcard imports
      nextIntl: "import { useTranslations } from 'next-intl'",
      react: "import { useState, useEffect, useMemo } from 'react'",
      next: "import { useRouter } from 'next/navigation'",

      // Avoid importing entire libraries
      lodash: "import { debounce } from 'lodash/debounce'",
      dateFns: "import { format } from 'date-fns/format'",

      // Use dynamic imports for heavy components
      heavyComponents:
        "const HeavyComponent = dynamic(() => import('./HeavyComponent'))",
    };
  }

  /**
   * Memoize expensive calculations
   */
  static memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map();
    return ((...args: any[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  /**
   * Debounce function calls to reduce bundle size
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function calls to reduce bundle size
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Code splitting utilities for better performance
   */
  static createCodeSplitComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    _fallback?: React.ComponentType
  ) {
    return React.lazy(importFunc);
  }

  /**
   * Tree shaking optimization helpers
   */
  static optimizeTreeShaking() {
    return {
      // Use specific imports
      specificImports: {
        react: "import { useState, useEffect } from 'react'",
        next: "import { useRouter } from 'next/navigation'",
        nextIntl: "import { useTranslations } from 'next-intl'",
      },

      // Avoid default imports when possible
      avoidDefaultImports: {
        lodash: "import { debounce } from 'lodash/debounce'",
        dateFns: "import { format } from 'date-fns/format'",
      },

      // Use dynamic imports for heavy libraries
      dynamicImports: {
        chart: "const Chart = dynamic(() => import('react-chartjs-2'))",
        editor: "const Editor = dynamic(() => import('@monaco-editor/react'))",
      },
    };
  }

  /**
   * Bundle size monitoring
   */
  static monitorBundleSize() {
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resource = entry as PerformanceResourceTiming;
            if (resource.name.includes('_next/static/chunks/')) {
              console.log(
                `Chunk loaded: ${resource.name}, size: ${resource.transferSize} bytes`
              );
            }
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });

      return () => observer.disconnect();
    }
    return () => {};
  }
}

/**
 * Shared constants to avoid duplication
 */
export const CONSTANTS = {
  // Image paths
  IMAGE_BASE_PATH: '/cards/rws/',
  IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],

  // SEO limits
  META_TITLE_MAX_LENGTH: 60,
  META_DESCRIPTION_MAX_LENGTH: 160,
  META_DESCRIPTION_MIN_LENGTH: 120,

  // Performance limits
  MAX_RELATED_CARDS: 6,
  MAX_FAQ_ITEMS: 10,
  MAX_KEYWORDS: 8,

  // Reading time estimation
  WORDS_PER_MINUTE: 200,

  // Cache settings
  CACHE_DURATION: 3600, // 1 hour
  STALE_WHILE_REVALIDATE: 86400, // 24 hours
} as const;

/**
 * Shared validation utilities
 */
export class ValidationUtils {
  static isValidLocale(locale: string): locale is 'tr' | 'en' | 'sr' {
    return ['tr', 'en', 'sr'].includes(locale);
  }

  static isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug);
  }

  static isValidCardId(id: string): boolean {
    return /^[a-z0-9-]+$/.test(id);
  }

  static isValidImageUrl(url: string): boolean {
    return CONSTANTS.IMAGE_EXTENSIONS.some(ext => url.endsWith(ext));
  }

  static isValidMetaTitle(title: string): boolean {
    return title.length > 0 && title.length <= CONSTANTS.META_TITLE_MAX_LENGTH;
  }

  static isValidMetaDescription(description: string): boolean {
    return (
      description.length >= CONSTANTS.META_DESCRIPTION_MIN_LENGTH &&
      description.length <= CONSTANTS.META_DESCRIPTION_MAX_LENGTH
    );
  }
}

/**
 * Shared error handling utilities
 */
export class ErrorUtils {
  static createErrorResponse(code: string, message: string, details?: string) {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Math.random().toString(36).substr(2, 9)}`,
      },
    };
  }

  static createSuccessResponse<T>(data: T, meta?: Record<string, any>) {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }
}

/**
 * Shared performance utilities
 */
export class PerformanceUtils {
  static measurePerformance<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`);
    }

    return result;
  }

  static async measureAsyncPerformance<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`);
    }

    return result;
  }
}

// Export all utilities as a single object for easier importing
export const TarotUtils = {
  Locale: LocaleUtils,
  SEO: SEOUtils,
  Component: ComponentUtils,
  Bundle: BundleOptimizer,
  Validation: ValidationUtils,
  Error: ErrorUtils,
  Performance: PerformanceUtils,
  CONSTANTS,
};
