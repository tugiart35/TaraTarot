import { describe, it, expect } from '@jest/globals';
import { CardMapping } from '@/features/tarot-cards/lib/card-mapping';
import { TarotCard } from '@/types/tarot-cards';

describe('CardMapping Service', () => {
  const mockCard: TarotCard = {
    id: 'test-card-id',
    englishName: 'The Fool',
    turkishName: 'Joker',
    serbianName: 'Joker',
    arcanaType: 'major',
    imageUrl: '/images/the-fool.jpg',
    slug: { tr: 'joker', en: 'the-fool', sr: 'joker' },
    createdAt: new Date('2025-01-27'),
    updatedAt: new Date('2025-01-27'),
  };

  describe('getCardSlugForLocale', () => {
    it('should return correct slug for Turkish locale', () => {
      const slug = CardMapping.getCardSlugForLocale('the-fool', 'tr');
      expect(slug).toBe('joker');
    });

    it('should return correct slug for English locale', () => {
      const slug = CardMapping.getCardSlugForLocale('the-fool', 'en');
      expect(slug).toBe('the-fool');
    });

    it('should return correct slug for Serbian locale', () => {
      const slug = CardMapping.getCardSlugForLocale('the-fool', 'sr');
      expect(slug).toBe('joker');
    });

    it('should return correct slug for The High Priestess', () => {
      expect(CardMapping.getCardSlugForLocale('the-high-priestess', 'tr')).toBe(
        'yuksek-rahibe'
      );
      expect(CardMapping.getCardSlugForLocale('the-high-priestess', 'en')).toBe(
        'the-high-priestess'
      );
      expect(CardMapping.getCardSlugForLocale('the-high-priestess', 'sr')).toBe(
        'visoka-svestenica'
      );
    });

    it('should return original key for unknown card', () => {
      const slug = CardMapping.getCardSlugForLocale('unknown-card', 'tr');
      expect(slug).toBe('unknown-card');
    });
  });

  describe('getCardKeyFromSlug', () => {
    it('should return correct key for Turkish slug', () => {
      const key = CardMapping.getCardKeyFromSlug('joker', 'tr');
      expect(key).toBe('the-fool');
    });

    it('should return correct key for English slug', () => {
      const key = CardMapping.getCardKeyFromSlug('the-fool', 'en');
      expect(key).toBe('the-fool');
    });

    it('should return correct key for Serbian slug', () => {
      const key = CardMapping.getCardKeyFromSlug('joker', 'sr');
      expect(key).toBe('the-fool');
    });

    it('should return correct key for The High Priestess', () => {
      expect(CardMapping.getCardKeyFromSlug('yuksek-rahibe', 'tr')).toBe(
        'the-high-priestess'
      );
      expect(CardMapping.getCardKeyFromSlug('the-high-priestess', 'en')).toBe(
        'the-high-priestess'
      );
      expect(CardMapping.getCardKeyFromSlug('visoka-svestenica', 'sr')).toBe(
        'the-high-priestess'
      );
    });

    it('should return null for unknown slug', () => {
      const key = CardMapping.getCardKeyFromSlug('unknown-slug', 'tr');
      expect(key).toBeNull();
    });
  });

  describe('getCardNameForLocale', () => {
    it('should return Turkish name for Turkish locale', () => {
      const name = CardMapping.getCardNameForLocale(mockCard, 'tr');
      expect(name).toBe('Joker');
    });

    it('should return English name for English locale', () => {
      const name = CardMapping.getCardNameForLocale(mockCard, 'en');
      expect(name).toBe('The Fool');
    });

    it('should return Serbian name for Serbian locale', () => {
      const name = CardMapping.getCardNameForLocale(mockCard, 'sr');
      expect(name).toBe('Joker');
    });

    it('should return English name for unknown locale', () => {
      const name = CardMapping.getCardNameForLocale(mockCard, 'unknown' as any);
      expect(name).toBe('The Fool');
    });
  });

  describe('getCardUrlForLocale', () => {
    it('should return correct URL for Turkish locale', () => {
      const url = CardMapping.getCardUrlForLocale(mockCard, 'tr');
      expect(url).toBe('/tr/kartlar/joker');
    });

    it('should return correct URL for English locale', () => {
      const url = CardMapping.getCardUrlForLocale(mockCard, 'en');
      expect(url).toBe('/en/cards/the-fool');
    });

    it('should return correct URL for Serbian locale', () => {
      const url = CardMapping.getCardUrlForLocale(mockCard, 'sr');
      expect(url).toBe('/sr/kartice/joker');
    });
  });

  describe('getAllCardUrls', () => {
    it('should return all URLs for all locales', () => {
      const urls = CardMapping.getAllCardUrls(mockCard);

      expect(urls.tr).toBe('/tr/kartlar/joker');
      expect(urls.en).toBe('/en/cards/the-fool');
      expect(urls.sr).toBe('/sr/kartice/joker');
    });
  });

  describe('getCardPathForLocale', () => {
    it('should return correct path for Turkish locale', () => {
      const path = CardMapping.getCardPathForLocale(mockCard, 'tr');
      expect(path).toBe('/tr/kartlar/joker');
    });

    it('should return correct path for English locale', () => {
      const path = CardMapping.getCardPathForLocale(mockCard, 'en');
      expect(path).toBe('/en/cards/the-fool');
    });

    it('should return correct path for Serbian locale', () => {
      const path = CardMapping.getCardPathForLocale(mockCard, 'sr');
      expect(path).toBe('/sr/kartice/joker');
    });
  });

  describe('getCardBreadcrumbForLocale', () => {
    it('should return correct breadcrumb for Turkish locale', () => {
      const breadcrumb = CardMapping.getCardBreadcrumbForLocale(mockCard, 'tr');

      expect(breadcrumb).toHaveLength(3);
      expect(breadcrumb[0].name).toBe('Ana Sayfa');
      expect(breadcrumb[0].url).toBe('/tr');
      expect(breadcrumb[1].name).toBe('Tarot Kartları');
      expect(breadcrumb[1].url).toBe('/tr/kartlar');
      expect(breadcrumb[2].name).toBe('Joker');
      expect(breadcrumb[2].url).toBe('/tr/kartlar/joker');
    });

    it('should return correct breadcrumb for English locale', () => {
      const breadcrumb = CardMapping.getCardBreadcrumbForLocale(mockCard, 'en');

      expect(breadcrumb[0].name).toBe('Home');
      expect(breadcrumb[0].url).toBe('/en');
      expect(breadcrumb[1].name).toBe('Tarot Cards');
      expect(breadcrumb[1].url).toBe('/en/cards');
      expect(breadcrumb[2].name).toBe('The Fool');
      expect(breadcrumb[2].url).toBe('/en/cards/the-fool');
    });

    it('should return correct breadcrumb for Serbian locale', () => {
      const breadcrumb = CardMapping.getCardBreadcrumbForLocale(mockCard, 'sr');

      expect(breadcrumb[0].name).toBe('Početna');
      expect(breadcrumb[0].url).toBe('/sr');
      expect(breadcrumb[1].name).toBe('Tarot Karte');
      expect(breadcrumb[1].url).toBe('/sr/kartice');
      expect(breadcrumb[2].name).toBe('Joker');
      expect(breadcrumb[2].url).toBe('/sr/kartice/joker');
    });
  });

  describe('getCardNavigationForLocale', () => {
    it('should return correct navigation for Turkish locale', () => {
      const navigation = CardMapping.getCardNavigationForLocale(mockCard, 'tr');

      expect(navigation.current).toBe('/tr/kartlar/joker');
      expect(navigation.alternate).toHaveLength(2);
      expect(navigation.alternate[0].locale).toBe('en');
      expect(navigation.alternate[0].url).toBe('/en/cards/the-fool');
      expect(navigation.alternate[0].name).toBe('English');
      expect(navigation.alternate[1].locale).toBe('sr');
      expect(navigation.alternate[1].url).toBe('/sr/kartice/joker');
      expect(navigation.alternate[1].name).toBe('Српски');
    });

    it('should return correct navigation for English locale', () => {
      const navigation = CardMapping.getCardNavigationForLocale(mockCard, 'en');

      expect(navigation.current).toBe('/en/cards/the-fool');
      expect(navigation.alternate).toHaveLength(2);
      expect(navigation.alternate[0].locale).toBe('tr');
      expect(navigation.alternate[0].url).toBe('/tr/kartlar/joker');
      expect(navigation.alternate[0].name).toBe('Türkçe');
      expect(navigation.alternate[1].locale).toBe('sr');
      expect(navigation.alternate[1].url).toBe('/sr/kartice/joker');
      expect(navigation.alternate[1].name).toBe('Српски');
    });

    it('should return correct navigation for Serbian locale', () => {
      const navigation = CardMapping.getCardNavigationForLocale(mockCard, 'sr');

      expect(navigation.current).toBe('/sr/kartice/joker');
      expect(navigation.alternate).toHaveLength(2);
      expect(navigation.alternate[0].locale).toBe('tr');
      expect(navigation.alternate[0].url).toBe('/tr/kartlar/joker');
      expect(navigation.alternate[0].name).toBe('Türkçe');
      expect(navigation.alternate[1].locale).toBe('en');
      expect(navigation.alternate[1].url).toBe('/en/cards/the-fool');
      expect(navigation.alternate[1].name).toBe('English');
    });
  });
});
