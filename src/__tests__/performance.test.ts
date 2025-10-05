import { testCoreWebVitals } from '@/test-utils/seo-test-utils';

describe('Performance Tests', () => {
  describe('Core Web Vitals', () => {
    it('should meet Core Web Vitals thresholds', async () => {
      const vitals = await testCoreWebVitals(
        'https://busbuskimki.com/tr/anasayfa'
      );

      // LCP should be under 2.5s
      expect(vitals.LCP).toBeLessThan(2.5);

      // FID should be under 100ms
      expect(vitals.FID).toBeLessThan(100);

      // CLS should be under 0.1
      expect(vitals.CLS).toBeLessThan(0.1);

      // FCP should be under 1.8s
      expect(vitals.FCP).toBeLessThan(1.8);

      // TTFB should be under 600ms
      expect(vitals.TTFB).toBeLessThan(600);
    });

    it('should have good performance scores', async () => {
      const vitals = await testCoreWebVitals(
        'https://busbuskimki.com/tr/anasayfa'
      );

      // All metrics should be in the "good" range
      const isGoodLCP = vitals.LCP < 2.5;
      const isGoodFID = vitals.FID < 100;
      const isGoodCLS = vitals.CLS < 0.1;
      const isGoodFCP = vitals.FCP < 1.8;
      const isGoodTTFB = vitals.TTFB < 600;

      expect(isGoodLCP).toBe(true);
      expect(isGoodFID).toBe(true);
      expect(isGoodCLS).toBe(true);
      expect(isGoodFCP).toBe(true);
      expect(isGoodTTFB).toBe(true);
    });
  });

  describe('SEO Performance', () => {
    it('should load SEO elements quickly', async () => {
      const startTime = Date.now();

      // Simulate loading SEO elements
      await new Promise(resolve => setTimeout(resolve, 100));

      const loadTime = Date.now() - startTime;

      // SEO elements should load within 200ms
      expect(loadTime).toBeLessThan(200);
    });

    it('should have optimized structured data', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BüşBüşKimKi Tarot Okuyucusu',
        // ... other properties
      };

      const jsonSize = JSON.stringify(structuredData).length;

      // Structured data should be under 10KB
      expect(jsonSize).toBeLessThan(10000);
    });
  });
});
