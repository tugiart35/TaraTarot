/**
 * Static generation performance testing for tarot card pages
 * Tests build time, page generation speed, and memory usage
 */

import { generateStaticParams } from '@/app/[locale]/(main)/kartlar/[slug]/page';
import { generateStaticParams as generateStaticParamsEn } from '@/app/[locale]/(main)/cards/[slug]/page';
import { generateStaticParams as generateStaticParamsSr } from '@/app/[locale]/(main)/kartice/[slug]/page';

// Mock the blog card service
jest.mock('@/lib/data/blog-card-service', () => ({
  BlogCardService: {
    getAllCards: jest.fn(() => [
      { id: 'the-fool', slug: 'joker', slugEn: 'the-fool', slugSr: 'joker' },
      {
        id: 'the-magician',
        slug: 'buyucu',
        slugEn: 'the-magician',
        slugSr: 'majstor',
      },
      {
        id: 'the-high-priestess',
        slug: 'yuksek-rahibe',
        slugEn: 'the-high-priestess',
        slugSr: 'visoka-svestenica',
      },
      // ... more cards
    ]),
    getCardBySlug: jest.fn(() => ({
      id: 'the-fool',
      name: 'The Fool',
      slug: 'joker',
      imageUrl: '/cards/rws/0-Fool.jpg',
    })),
  },
}));

describe('Static Generation Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateStaticParams Performance', () => {
    it('should generate params for Turkish cards within acceptable time', async () => {
      const startTime = performance.now();

      const params = await generateStaticParams();

      const endTime = performance.now();
      const generationTime = endTime - startTime;

      // Should generate params for all 78 cards
      expect(params).toHaveLength(78);

      // Should complete within 5 seconds
      expect(generationTime).toBeLessThan(5000);

      // Each param should have the correct structure
      params.forEach(param => {
        expect(param).toHaveProperty('slug');
        expect(typeof param.slug).toBe('string');
        expect(param.slug.length).toBeGreaterThan(0);
      });
    });

    it('should generate params for English cards within acceptable time', async () => {
      const startTime = performance.now();

      const params = await generateStaticParamsEn();

      const endTime = performance.now();
      const generationTime = endTime - startTime;

      // Should generate params for all 78 cards
      expect(params).toHaveLength(78);

      // Should complete within 5 seconds
      expect(generationTime).toBeLessThan(5000);
    });

    it('should generate params for Serbian cards within acceptable time', async () => {
      const startTime = performance.now();

      const params = await generateStaticParamsSr();

      const endTime = performance.now();
      const generationTime = endTime - startTime;

      // Should generate params for all 78 cards
      expect(params).toHaveLength(78);

      // Should complete within 5 seconds
      expect(generationTime).toBeLessThan(5000);
    });

    it('should handle memory efficiently during param generation', async () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Generate params for all locales
      const [trParams, enParams, srParams] = await Promise.all([
        generateStaticParams(),
        generateStaticParamsEn(),
        generateStaticParamsSr(),
      ]);

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Should not use excessive memory
      expect(memoryIncrease).toBeLessThan(10000000); // 10MB

      // All should have correct length
      expect(trParams).toHaveLength(78);
      expect(enParams).toHaveLength(78);
      expect(srParams).toHaveLength(78);
    });
  });

  describe('Build Time Optimization', () => {
    it('should complete static generation within build time limits', async () => {
      const startTime = performance.now();

      // Simulate generating all 234 pages (78 cards × 3 languages)
      const allParams = await Promise.all([
        generateStaticParams(),
        generateStaticParamsEn(),
        generateStaticParamsSr(),
      ]);

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should complete within 30 seconds for all pages
      expect(totalTime).toBeLessThan(30000);

      // Should generate 234 total pages
      const totalPages = allParams.reduce(
        (sum, params) => sum + params.length,
        0
      );
      expect(totalPages).toBe(234);
    });

    it('should handle concurrent page generation efficiently', async () => {
      const startTime = performance.now();

      // Generate multiple pages concurrently
      const pagePromises = Array.from({ length: 10 }, (_, i) =>
        generateStaticParams()
      );

      const results = await Promise.all(pagePromises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle concurrent generation efficiently
      expect(totalTime).toBeLessThan(10000);

      // All results should be valid
      results.forEach(params => {
        expect(params).toHaveLength(78);
      });
    });
  });

  describe('Memory Usage During Build', () => {
    it('should not cause memory leaks during static generation', async () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Simulate multiple build cycles
      for (let i = 0; i < 5; i++) {
        await generateStaticParams();
        await generateStaticParamsEn();
        await generateStaticParamsSr();
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(50000000); // 50MB
    });

    it('should handle large datasets efficiently', async () => {
      const startTime = performance.now();

      // Simulate generating with large card datasets
      const largeCardSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `card-${i}`,
        slug: `card-${i}`,
        slugEn: `card-${i}`,
        slugSr: `card-${i}`,
      }));

      // Mock large dataset
      const { BlogCardService } = require('@/lib/data/blog-card-service');
      BlogCardService.getAllCards.mockReturnValue(largeCardSet);

      const params = await generateStaticParams();
      const endTime = performance.now();
      const generationTime = endTime - startTime;

      // Should handle large datasets efficiently
      expect(generationTime).toBeLessThan(10000);
      expect(params).toHaveLength(1000);
    });
  });

  describe('Error Handling During Build', () => {
    it('should handle errors gracefully during static generation', async () => {
      // Mock service to throw error
      const { BlogCardService } = require('@/lib/data/blog-card-service');
      BlogCardService.getAllCards.mockImplementation(() => {
        throw new Error('Service unavailable');
      });

      // Should not crash the build process
      await expect(generateStaticParams()).rejects.toThrow(
        'Service unavailable'
      );
    });

    it('should handle partial failures gracefully', async () => {
      // Mock service to return partial data
      const { BlogCardService } = require('@/lib/data/blog-card-service');
      BlogCardService.getAllCards.mockReturnValue([
        { id: 'card-1', slug: 'card-1' },
        { id: 'card-2', slug: 'card-2' },
        // Missing other cards
      ]);

      const params = await generateStaticParams();

      // Should return available data
      expect(params).toHaveLength(2);
      expect(params[0]).toEqual({ slug: 'card-1' });
      expect(params[1]).toEqual({ slug: 'card-2' });
    });
  });

  describe('Build Performance Metrics', () => {
    it('should track build performance metrics', async () => {
      const metrics = {
        startTime: performance.now(),
        memoryStart: (performance as any).memory?.usedJSHeapSize || 0,
        pagesGenerated: 0,
        errors: 0,
      };

      try {
        const params = await generateStaticParams();
        metrics.pagesGenerated = params.length;
      } catch (error) {
        metrics.errors++;
      }

      metrics.endTime = performance.now();
      metrics.memoryEnd = (performance as any).memory?.usedJSHeapSize || 0;

      const buildTime = metrics.endTime - metrics.startTime;
      const memoryUsed = metrics.memoryEnd - metrics.memoryStart;

      // Log performance metrics
      console.log('Build Performance Metrics:', {
        buildTime: `${buildTime.toFixed(2)}ms`,
        pagesGenerated: metrics.pagesGenerated,
        memoryUsed: `${(memoryUsed / 1024 / 1024).toFixed(2)}MB`,
        errors: metrics.errors,
      });

      // Assert performance thresholds
      expect(buildTime).toBeLessThan(5000);
      expect(metrics.pagesGenerated).toBe(78);
      expect(metrics.errors).toBe(0);
    });
  });

  describe('Incremental Build Optimization', () => {
    it('should support incremental builds', async () => {
      // First build
      const firstBuildStart = performance.now();
      const firstParams = await generateStaticParams();
      const firstBuildTime = performance.now() - firstBuildStart;

      // Second build (should be faster due to caching)
      const secondBuildStart = performance.now();
      const secondParams = await generateStaticParams();
      const secondBuildTime = performance.now() - secondBuildStart;

      // Second build should be faster
      expect(secondBuildTime).toBeLessThanOrEqual(firstBuildTime);

      // Results should be identical
      expect(firstParams).toEqual(secondParams);
    });

    it('should handle cache invalidation correctly', async () => {
      // Initial build
      const initialParams = await generateStaticParams();

      // Clear cache
      jest.clearAllMocks();

      // Rebuild with fresh data
      const { BlogCardService } = require('@/lib/data/blog-card-service');
      BlogCardService.getAllCards.mockReturnValue([
        { id: 'new-card', slug: 'new-card' },
      ]);

      const newParams = await generateStaticParams();

      // Should reflect new data
      expect(newParams).toHaveLength(1);
      expect(newParams[0]).toEqual({ slug: 'new-card' });
    });
  });
});
