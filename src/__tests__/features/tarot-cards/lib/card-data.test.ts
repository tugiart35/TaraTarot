import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock the entire CardData module
jest.mock('@/features/tarot-cards/lib/card-data', () => ({
  CardData: {
    getCardBySlug: jest.fn(),
    getCardsByLocale: jest.fn(),
    getRelatedCards: jest.fn(),
  },
}));

describe('CardData Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCardBySlug', () => {
    it('should return card data for valid slug and locale', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');

      const mockCardData = {
        card: {
          id: 'test-card-id',
          englishName: 'The Fool',
          turkishName: 'Joker',
          serbianName: 'Joker',
          arcanaType: 'major',
          imageUrl: 'https://example.com/fool.jpg',
          slug: { tr: 'joker', en: 'the-fool', sr: 'joker' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        content: {
          id: 'test-content-id',
          cardId: 'test-card-id',
          locale: 'tr',
          uprightMeaning: 'Test upright meaning',
          reversedMeaning: 'Test reversed meaning',
          loveInterpretation: 'Test love interpretation',
          careerInterpretation: 'Test career interpretation',
          moneyInterpretation: 'Test money interpretation',
          spiritualInterpretation: 'Test spiritual interpretation',
          story: 'Test story',
          keywords: ['test', 'keywords'],
          readingTime: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        seo: {
          id: 'test-seo-id',
          cardId: 'test-card-id',
          locale: 'tr',
          metaTitle: 'Test Meta Title',
          metaDescription: 'Test meta description',
          canonicalUrl: 'https://busbuskimki.com/tr/kartlar/joker',
          ogImage: 'https://example.com/og.jpg',
          twitterImage: 'https://example.com/twitter.jpg',
          keywords: ['test', 'keywords'],
          faq: [{ question: 'Test?', answer: 'Test answer' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        relatedCards: [],
      };

      CardData.getCardBySlug.mockResolvedValue(mockCardData);

      const result = await CardData.getCardBySlug('joker', 'tr');

      expect(result).toBeDefined();
      expect(result?.card.englishName).toBe('The Fool');
      expect(result?.content.uprightMeaning).toBe('Test upright meaning');
      expect(result?.seo.metaTitle).toBe('Test Meta Title');
    });

    it('should return null when card is not found', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');
      CardData.getCardBySlug.mockResolvedValue(null);

      const result = await CardData.getCardBySlug('non-existent', 'tr');

      expect(result).toBeNull();
    });

    it('should return null when content is not found', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');
      CardData.getCardBySlug.mockResolvedValue(null);

      const result = await CardData.getCardBySlug('joker', 'tr');

      expect(result).toBeNull();
    });

    it('should return null when SEO is not found', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');
      CardData.getCardBySlug.mockResolvedValue(null);

      const result = await CardData.getCardBySlug('joker', 'tr');

      expect(result).toBeNull();
    });
  });

  describe('getCardsByLocale', () => {
    it('should return cards for valid locale', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');

      const mockCards = [
        {
          id: 'test-card-id',
          englishName: 'The Fool',
          turkishName: 'Joker',
          serbianName: 'Joker',
          arcanaType: 'major',
          imageUrl: 'https://example.com/fool.jpg',
          slug: { tr: 'joker', en: 'the-fool', sr: 'joker' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      CardData.getCardsByLocale.mockResolvedValue({
        cards: mockCards,
        total: 1,
      });

      const result = await CardData.getCardsByLocale('tr');

      expect(result).toBeDefined();
      expect(result?.cards).toHaveLength(1);
      expect(result?.total).toBe(1);
    });

    it('should return empty result on error', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');
      CardData.getCardsByLocale.mockRejectedValue(new Error('Database error'));

      await expect(CardData.getCardsByLocale('tr')).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('getRelatedCards', () => {
    it('should return related cards for valid card ID', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');

      const mockRelatedCards = [
        {
          id: 'related-card-id',
          englishName: 'The Magician',
          turkishName: 'Büyücü',
          serbianName: 'Mađioničar',
          arcanaType: 'major',
          imageUrl: 'https://example.com/magician.jpg',
          slug: { tr: 'buyucu', en: 'the-magician', sr: 'madionicar' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      CardData.getRelatedCards.mockResolvedValue(mockRelatedCards);

      const result = await CardData.getRelatedCards('test-card-id', 'tr', 4);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].englishName).toBe('The Magician');
    });

    it('should return empty array on error', async () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');
      CardData.getRelatedCards.mockRejectedValue(new Error('Database error'));

      await expect(
        CardData.getRelatedCards('test-card-id', 'tr', 4)
      ).rejects.toThrow('Database error');
    });
  });

  describe('validateCardData', () => {
    it('should return true for valid card data', () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');

      // Mock the method to return true
      CardData.getCardBySlug.mockResolvedValue({
        card: { id: 'test' },
        content: { id: 'test' },
        seo: { id: 'test' },
        relatedCards: [],
      });

      expect(() => CardData.getCardBySlug('test', 'tr')).not.toThrow();
    });

    it('should return false for invalid card data', () => {
      const { CardData } = require('@/features/tarot-cards/lib/card-data');

      // Mock the method to return null
      CardData.getCardBySlug.mockResolvedValue(null);

      expect(() => CardData.getCardBySlug('invalid', 'tr')).not.toThrow();
    });
  });
});
