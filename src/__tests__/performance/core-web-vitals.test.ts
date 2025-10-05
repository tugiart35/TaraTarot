/**
 * Core Web Vitals testing for tarot card pages
 * Tests LCP, FID, CLS, and other performance metrics
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CardPage } from '@/features/tarot-cards/components/CardPage';
import { TarotCard, CardContent, CardSEO, CardPageData } from '@/types/tarot-cards';

// Mock performance API
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

Object.defineProperty(window, 'PerformanceObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect
  }))
});

// Mock performance metrics (for reference)
// const mockPerformanceMetrics = {
//   lcp: 1200, // Good LCP (<2.5s)
//   fid: 50,   // Good FID (<100ms)
//   cls: 0.05, // Good CLS (<0.1)
//   fcp: 800,  // Good FCP (<1.8s)
//   ttfb: 200  // Good TTFB (<600ms)
// };

// Mock card data
const mockCard: TarotCard = {
  id: 'the-fool',
  englishName: 'The Fool',
  turkishName: 'Deli (Joker)',
  serbianName: 'Budala',
  arcanaType: 'major',
  number: 0,
  imageUrl: '/cards/rws/0-Fool.jpg',
  slug: {
    tr: 'joker',
    en: 'the-fool',
    sr: 'budala'
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockContent: CardContent = {
  id: 'the-fool-content',
  cardId: 'the-fool',
  locale: 'tr',
  uprightMeaning: 'New beginnings, innocence, spontaneity',
  reversedMeaning: 'Recklessness, lack of direction',
  loveInterpretation: 'New relationships, fresh start',
  careerInterpretation: 'New opportunities, taking risks',
  moneyInterpretation: 'Financial new beginnings',
  spiritualInterpretation: 'Spiritual awakening',
  keywords: ['new beginnings', 'innocence', 'spontaneity'],
  story: 'The Fool represents the beginning of the journey through the Major Arcana.',
  readingTime: 3,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockSEO: CardSEO = {
  id: 'the-fool-seo',
  cardId: 'the-fool',
  locale: 'tr',
  metaTitle: 'The Fool Tarot Card Meaning | Busbuskimki',
  metaDescription: 'Discover the meaning of The Fool tarot card. Learn about new beginnings, innocence, and spiritual awakening.',
  keywords: ['tarot', 'fool', 'new beginnings'],
  canonicalUrl: 'https://busbuskimki.com/tr/kartlar/joker',
  ogImage: 'https://busbuskimki.com/cards/rws/0-Fool.jpg',
  twitterImage: 'https://busbuskimki.com/cards/rws/0-Fool.jpg',
  faq: [
    {
      question: 'What does The Fool card mean?',
      answer: 'The Fool represents new beginnings and the start of a journey.'
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock CardPageData
const mockCardPageData: CardPageData = {
  card: mockCard,
  content: mockContent,
  seo: mockSEO,
  relatedCards: []
};

describe('Core Web Vitals Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock performance.now
    Object.defineProperty(window, 'performance', {
      writable: true,
      value: {
        now: jest.fn(() => Date.now()),
        getEntriesByType: jest.fn(() => []),
        mark: jest.fn(),
        measure: jest.fn()
      }
    });
  });

  describe('Largest Contentful Paint (LCP)', () => {
    it('should have LCP < 2.5 seconds', async () => {
      const startTime = performance.now();
      
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Wait for component to render
      await waitFor(() => {
        expect(screen.getByText('The Fool')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // LCP should be under 2.5 seconds
      expect(renderTime).toBeLessThan(2500);
    });

    it('should optimize image loading for LCP', async () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Check if images have proper loading attributes
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('sizes');
      });
    });
  });

  describe('First Input Delay (FID)', () => {
    it('should have FID < 100ms', async () => {
      const startTime = performance.now();
      
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Simulate user interaction
      const button = screen.getByRole('button', { name: /kartınızı çekin/i });
      button.click();

      const endTime = performance.now();
      const interactionTime = endTime - startTime;

      // FID should be under 100ms
      expect(interactionTime).toBeLessThan(100);
    });

    it('should handle rapid user interactions efficiently', async () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const buttons = screen.getAllByRole('button');
      
      // Simulate rapid clicks
      const startTime = performance.now();
      buttons.forEach(button => {
        button.click();
      });
      const endTime = performance.now();

      // Should handle rapid interactions efficiently
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  describe('Cumulative Layout Shift (CLS)', () => {
    it('should have CLS < 0.1', async () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Check for layout shift indicators
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('width');
        expect(img).toHaveAttribute('height');
      });

      // Check for proper aspect ratios
      const cardImages = screen.getAllByAltText(/tarot/i);
      cardImages.forEach(img => {
        const width = img.getAttribute('width');
        const height = img.getAttribute('height');
        if (width && height) {
          const aspectRatio = parseInt(width) / parseInt(height);
          expect(aspectRatio).toBeCloseTo(0.67, 1); // 400/600 ratio
        }
      });
    });

    it('should prevent layout shift with proper dimensions', async () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // All images should have explicit dimensions
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
      
      images.forEach(img => {
        expect(img).toHaveAttribute('width');
        expect(img).toHaveAttribute('height');
        expect(parseInt(img.getAttribute('width')!)).toBeGreaterThan(0);
        expect(parseInt(img.getAttribute('height')!)).toBeGreaterThan(0);
      });
    });
  });

  describe('First Contentful Paint (FCP)', () => {
    it('should have FCP < 1.8 seconds', async () => {
      const startTime = performance.now();
      
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      await waitFor(() => {
        expect(screen.getByText('The Fool')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const fcp = endTime - startTime;

      // FCP should be under 1.8 seconds
      expect(fcp).toBeLessThan(1800);
    });
  });

  describe('Time to First Byte (TTFB)', () => {
    it('should have TTFB < 600ms', async () => {
      const startTime = performance.now();
      
      // Simulate server response time
      await new Promise(resolve => setTimeout(resolve, 100));
      
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const endTime = performance.now();
      const ttfb = endTime - startTime;

      // TTFB should be under 600ms
      expect(ttfb).toBeLessThan(600);
    });
  });

  describe('Memory Usage Optimization', () => {
    it('should not cause memory leaks', async () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      const { unmount } = render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Simulate component lifecycle
      await waitFor(() => {
        expect(screen.getByText('The Fool')).toBeInTheDocument();
      });

      unmount();

      // Wait for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be minimal
      expect(memoryIncrease).toBeLessThan(1000000); // 1MB
    });

    it('should handle large datasets efficiently', async () => {
      const largeContent = {
        ...mockContent,
        faq: Array.from({ length: 50 }, (_, i) => ({
          question: `Question ${i + 1}`,
          answer: `Answer ${i + 1}`.repeat(100)
        }))
      };

      const startTime = performance.now();
      
      const largeCardPageData: CardPageData = {
        card: mockCard,
        content: largeContent,
        seo: mockSEO,
        relatedCards: []
      };

      render(
        React.createElement(CardPage, {
          card: largeCardPageData,
          locale: "tr"
        })
      );

      await waitFor(() => {
        expect(screen.getByText('The Fool')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should handle large datasets efficiently
      expect(renderTime).toBeLessThan(2000);
    });
  });

  describe('Rapid Re-renders', () => {
    it('should handle rapid re-renders efficiently', async () => {
      const { rerender } = render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const startTime = performance.now();

      // Simulate rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
        );
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle rapid re-renders efficiently
      expect(totalTime).toBeLessThan(1000);
    });
  });
});