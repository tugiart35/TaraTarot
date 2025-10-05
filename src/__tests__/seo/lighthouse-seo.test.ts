/**
 * Lighthouse SEO audit tests for tarot card pages
 * Tests meta tags, structured data, and SEO best practices
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardPage } from '@/features/tarot-cards/components/CardPage';
import { TarotCard, CardContent, CardSEO, CardPageData } from '@/types/tarot-cards';

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
    },
    {
      question: 'How do I interpret The Fool card?',
      answer: 'The Fool card suggests taking a leap of faith and embracing new opportunities.'
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

describe('Lighthouse SEO Audit Tests', () => {
  describe('Meta Tags Validation', () => {
    it('should have proper meta title structure', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      // Check for title element
      const title = document.querySelector('title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toContain('The Fool');
      expect(title?.textContent).toContain('Busbuskimki');
    });

    it('should have meta description within optimal length', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeInTheDocument();
      
      const description = metaDescription?.getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThanOrEqual(120);
      expect(description!.length).toBeLessThanOrEqual(160);
    });

    it('should have proper Open Graph meta tags', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');

      expect(ogTitle).toBeInTheDocument();
      expect(ogDescription).toBeInTheDocument();
      expect(ogImage).toBeInTheDocument();
      expect(ogUrl).toBeInTheDocument();

      expect(ogTitle?.getAttribute('content')).toContain('The Fool');
      expect(ogDescription?.getAttribute('content')).toBeTruthy();
      expect(ogImage?.getAttribute('content')).toContain('/cards/rws/');
    });

    it('should have proper Twitter Card meta tags', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      expect(twitterCard).toBeInTheDocument();
      expect(twitterTitle).toBeInTheDocument();
      expect(twitterDescription).toBeInTheDocument();
      expect(twitterImage).toBeInTheDocument();

      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    });

    it('should have canonical URL', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeInTheDocument();
      expect(canonical?.getAttribute('href')).toContain('busbuskimki.com');
    });

    it('should have hreflang tags for multilingual support', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const hreflangTr = document.querySelector('link[rel="alternate"][hreflang="tr"]');
      const hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
      const hreflangSr = document.querySelector('link[rel="alternate"][hreflang="sr"]');
      const hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');

      expect(hreflangTr).toBeInTheDocument();
      expect(hreflangEn).toBeInTheDocument();
      expect(hreflangSr).toBeInTheDocument();
      expect(hreflangDefault).toBeInTheDocument();
    });
  });

  describe('Structured Data Validation', () => {
    it('should have FAQ structured data', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const structuredData = document.querySelector('script[type="application/ld+json"]');
      expect(structuredData).toBeInTheDocument();

      const data = JSON.parse(structuredData?.textContent || '{}');
      expect(data['@type']).toBe('FAQPage');
      expect(data.mainEntity).toBeDefined();
      expect(Array.isArray(data.mainEntity)).toBe(true);
      expect(data.mainEntity.length).toBeGreaterThan(0);
    });

    it('should have Article structured data', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      let hasArticle = false;

      structuredData.forEach(script => {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'Article') {
          hasArticle = true;
          expect(data.headline).toBeDefined();
          expect(data.description).toBeDefined();
          expect(data.image).toBeDefined();
          expect(data.author).toBeDefined();
          expect(data.datePublished).toBeDefined();
        }
      });

      expect(hasArticle).toBe(true);
    });

    it('should have BreadcrumbList structured data', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      let hasBreadcrumb = false;

      structuredData.forEach(script => {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'BreadcrumbList') {
          hasBreadcrumb = true;
          expect(data.itemListElement).toBeDefined();
          expect(Array.isArray(data.itemListElement)).toBe(true);
          expect(data.itemListElement.length).toBeGreaterThan(0);
        }
      });

      expect(hasBreadcrumb).toBe(true);
    });
  });

  describe('Content Quality', () => {
    it('should have proper heading hierarchy', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1.textContent).toContain('The Fool');

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(1);
    });

    it('should have descriptive alt text for images', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(0);
        expect(alt).not.toBe('image');
        expect(alt).not.toBe('picture');
      });
    });

    it('should have proper link text', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        const text = link.textContent;
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(0);
        expect(text).not.toBe('click here');
        expect(text).not.toBe('read more');
        expect(text).not.toBe('here');
      });
    });

    it('should have sufficient content length', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const mainContent = screen.getByRole('main');
      const textContent = mainContent.textContent || '';
      
      // Should have substantial content (at least 300 words)
      const wordCount = textContent.split(/\s+/).length;
      expect(wordCount).toBeGreaterThan(300);
    });
  });

  describe('Technical SEO', () => {
    it('should have proper viewport meta tag', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeInTheDocument();
      expect(viewport?.getAttribute('content')).toContain('width=device-width');
    });

    it('should have proper language declaration', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const html = document.documentElement;
      expect(html.getAttribute('lang')).toBe('tr');
    });

    it('should have proper charset declaration', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeInTheDocument();
      expect(charset?.getAttribute('charset')).toBe('utf-8');
    });
  });

  describe('Performance SEO', () => {
    it('should have optimized images', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('width');
        expect(img).toHaveAttribute('height');
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('sizes');
      });
    });

    it('should have proper image formats', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          // Should prefer WebP format
          expect(src.includes('.webp') || src.includes('.jpg')).toBe(true);
        }
      });
    });
  });

  describe('Accessibility SEO', () => {
    it('should have proper ARIA labels', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label');
        const text = button.textContent;
        expect(ariaLabel || text).toBeTruthy();
      });
    });

    it('should have proper focus management', () => {
      render(
        React.createElement(CardPage, {
          card: mockCardPageData,
          locale: "tr"
        })
      );

      const focusableElements = screen.getAllByRole('button');
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });
});