import { describe, it, expect, beforeEach } from '@jest/globals';
import { BlogCardService } from '@/lib/data/blog-card-service';

describe('Card Routes Testing', () => {
  const locales = ['tr', 'en', 'sr'] as const;
  const cardSlugs = {
    tr: [
      'joker', 'buyucu', 'yuksek-rahibe', 'imparatorice', 'imparator',
      'basrahip', 'asiklar', 'savas-arabasi', 'guc', 'ermis',
      'kader-carki', 'adalet', 'asili-adam', 'olum', 'olcululuk',
      'seytan', 'kule', 'yildiz', 'ay', 'gunes', 'yargi', 'dunya'
    ],
    en: [
      'the-fool', 'the-magician', 'the-high-priestess', 'the-empress', 'the-emperor',
      'the-hierophant', 'the-lovers', 'the-chariot', 'strength', 'the-hermit',
      'wheel-of-fortune', 'justice', 'the-hanged-man', 'death', 'temperance',
      'the-devil', 'the-tower', 'the-star', 'the-moon', 'the-sun', 'judgement', 'the-world'
    ],
    sr: [
      'joker', 'carobnjak', 'visoka-svestenica', 'carica', 'car',
      'prvosveštenica', 'ljubavnici', 'ratna-kolica', 'snaga', 'pustinjak',
      'kolo-srece', 'pravda', 'obeseni', 'smrt', 'umerenost',
      'djavol', 'kula', 'zvezda', 'mesec', 'sunce', 'sud', 'svet'
    ]
  };

  describe('Turkish Routes (/tr/kartlar/[slug])', () => {
    it('should return valid card data for all Turkish slugs', () => {
      cardSlugs.tr.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'tr');
        expect(card).toBeTruthy();
        expect(card?.name).toBeDefined();
        expect(card?.short_description).toBeDefined();
        expect(card?.meanings).toBeDefined();
        expect(card?.imageUrl).toBeDefined();
      });
    });

    it('should handle invalid Turkish slugs gracefully', () => {
      const invalidSlugs = ['invalid-slug', 'non-existent', 'test'];
      invalidSlugs.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'tr');
        expect(card).toBeNull();
      });
    });
  });

  describe('English Routes (/en/cards/[slug])', () => {
    it('should return valid card data for all English slugs', () => {
      cardSlugs.en.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'en');
        expect(card).toBeTruthy();
        expect(card?.name).toBeDefined();
        expect(card?.short_description).toBeDefined();
        expect(card?.meanings).toBeDefined();
        expect(card?.imageUrl).toBeDefined();
      });
    });

    it('should handle invalid English slugs gracefully', () => {
      const invalidSlugs = ['invalid-slug', 'non-existent', 'test'];
      invalidSlugs.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'en');
        expect(card).toBeNull();
      });
    });
  });

  describe('Serbian Routes (/sr/kartice/[slug])', () => {
    it('should return valid card data for all Serbian slugs', () => {
      cardSlugs.sr.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'sr');
        expect(card).toBeTruthy();
        expect(card?.name).toBeDefined();
        expect(card?.short_description).toBeDefined();
        expect(card?.meanings).toBeDefined();
        expect(card?.imageUrl).toBeDefined();
      });
    });

    it('should handle invalid Serbian slugs gracefully', () => {
      const invalidSlugs = ['invalid-slug', 'non-existent', 'test'];
      invalidSlugs.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'sr');
        expect(card).toBeNull();
      });
    });
  });

  describe('Cross-locale consistency', () => {
    it('should return the same card data for equivalent slugs across locales', () => {
      const equivalentSlugs = [
        { tr: 'joker', en: 'the-fool', sr: 'joker' },
        { tr: 'buyucu', en: 'the-magician', sr: 'carobnjak' },
        { tr: 'yuksek-rahibe', en: 'the-high-priestess', sr: 'visoka-svestenica' }
      ];

      equivalentSlugs.forEach(({ tr, en, sr }) => {
        const trCard = BlogCardService.getCardBySlug(tr, 'tr');
        const enCard = BlogCardService.getCardBySlug(en, 'en');
        const srCard = BlogCardService.getCardBySlug(sr, 'sr');

        expect(trCard).toBeTruthy();
        expect(enCard).toBeTruthy();
        expect(srCard).toBeTruthy();

        // All should return the same card data (since we only have Turkish content)
        expect(trCard?.name).toBe(enCard?.name);
        expect(trCard?.name).toBe(srCard?.name);
      });
    });
  });

  describe('URL generation', () => {
    it('should generate correct URLs for all locales', () => {
      const testCard = BlogCardService.getCardBySlug('joker', 'tr');
      expect(testCard).toBeTruthy();

      if (testCard) {
        const trUrl = BlogCardService.getCardUrl(testCard, 'tr');
        const enUrl = BlogCardService.getCardUrl(testCard, 'en');
        const srUrl = BlogCardService.getCardUrl(testCard, 'sr');

        expect(trUrl).toMatch(/\/tr\/kartlar\//);
        expect(enUrl).toMatch(/\/en\/cards\//);
        expect(srUrl).toMatch(/\/sr\/kartice\//);
      }
    });
  });

  describe('Related cards functionality', () => {
    it('should return related cards for valid card IDs', () => {
      const testCardId = 'the-fool';
      const relatedCards = BlogCardService.getRelatedCards(testCardId, 'tr', 4);
      
      expect(Array.isArray(relatedCards)).toBe(true);
      expect(relatedCards.length).toBeLessThanOrEqual(4);
      
      relatedCards.forEach(card => {
        expect(card).toBeTruthy();
        expect(card.name).toBeDefined();
        expect(card.imageUrl).toBeDefined();
      });
    });

    it('should handle invalid card IDs gracefully', () => {
      const invalidCardId = 'non-existent-card';
      const relatedCards = BlogCardService.getRelatedCards(invalidCardId, 'tr', 4);
      
      expect(Array.isArray(relatedCards)).toBe(true);
      expect(relatedCards.length).toBe(0);
    });
  });

  describe('Performance testing', () => {
    it('should handle multiple concurrent requests efficiently', () => {
      const startTime = performance.now();
      
      // Simulate multiple concurrent requests
      const promises = cardSlugs.tr.slice(0, 10).map(slug => 
        BlogCardService.getCardBySlug(slug, 'tr')
      );
      
      Promise.all(promises).then(cards => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(duration).toBeLessThan(100); // Should complete in less than 100ms
        expect(cards.every(card => card !== null)).toBe(true);
      });
    });
  });

  describe('Error handling', () => {
    it('should handle malformed slugs gracefully', () => {
      const malformedSlugs = ['', '   ', 'slug-with-special-chars!@#', 'UPPERCASE-SLUG'];
      
      malformedSlugs.forEach(slug => {
        const card = BlogCardService.getCardBySlug(slug, 'tr');
        expect(card).toBeNull();
      });
    });

    it('should handle null/undefined parameters gracefully', () => {
      expect(BlogCardService.getCardBySlug(null as any, 'tr')).toBeNull();
      expect(BlogCardService.getCardBySlug(undefined as any, 'tr')).toBeNull();
    });
  });
});
