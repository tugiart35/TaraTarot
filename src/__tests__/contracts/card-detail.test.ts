import { describe, it, expect } from '@jest/globals';

/**
 * Contract Test: GET /api/cards/{locale}/{slug}
 *
 * This test verifies the API contract for getting a single card by slug and locale.
 * Tests must fail initially and pass only when implementation is complete.
 */

describe('GET /api/cards/{locale}/{slug} Contract', () => {
  it('should return card data for valid slug and locale', async () => {
    // This test will fail until implementation is complete
    const response = await fetch('/api/cards/tr/joker');

    expect(response.status).toBe(200);

    const data = await response.json();

    // Response structure validation
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('card');
    expect(data.data).toHaveProperty('content');
    expect(data.data).toHaveProperty('seo');
    expect(data.data).toHaveProperty('relatedCards');

    // Card structure validation
    expect(data.data.card).toHaveProperty('id');
    expect(data.data.card).toHaveProperty('englishName');
    expect(data.data.card).toHaveProperty('turkishName');
    expect(data.data.card).toHaveProperty('serbianName');
    expect(data.data.card).toHaveProperty('arcanaType');
    expect(data.data.card).toHaveProperty('imageUrl');
    expect(data.data.card).toHaveProperty('slug');

    // Content structure validation
    expect(data.data.content).toHaveProperty('id');
    expect(data.data.content).toHaveProperty('cardId');
    expect(data.data.content).toHaveProperty('locale', 'tr');
    expect(data.data.content).toHaveProperty('uprightMeaning');
    expect(data.data.content).toHaveProperty('reversedMeaning');
    expect(data.data.content).toHaveProperty('loveInterpretation');
    expect(data.data.content).toHaveProperty('careerInterpretation');
    expect(data.data.content).toHaveProperty('moneyInterpretation');
    expect(data.data.content).toHaveProperty('spiritualInterpretation');
    expect(data.data.content).toHaveProperty('story');
    expect(data.data.content).toHaveProperty('keywords');
    expect(data.data.content).toHaveProperty('readingTime');

    // SEO structure validation
    expect(data.data.seo).toHaveProperty('id');
    expect(data.data.seo).toHaveProperty('cardId');
    expect(data.data.seo).toHaveProperty('locale', 'tr');
    expect(data.data.seo).toHaveProperty('metaTitle');
    expect(data.data.seo).toHaveProperty('metaDescription');
    expect(data.data.seo).toHaveProperty('canonicalUrl');
    expect(data.data.seo).toHaveProperty('ogImage');
    expect(data.data.seo).toHaveProperty('twitterImage');
    expect(data.data.seo).toHaveProperty('keywords');
    expect(data.data.seo).toHaveProperty('faq');

    // Data validation
    expect(data.data.card.arcanaType).toMatch(/^(major|minor)$/);
    expect(data.data.content.locale).toMatch(/^(tr|en|sr)$/);
    expect(data.data.seo.locale).toMatch(/^(tr|en|sr)$/);
    expect(data.data.content.keywords).toBeInstanceOf(Array);
    expect(data.data.content.keywords.length).toBeGreaterThanOrEqual(5);
    expect(data.data.content.keywords.length).toBeLessThanOrEqual(10);
    expect(data.data.seo.faq).toBeInstanceOf(Array);
    expect(data.data.seo.faq.length).toBeGreaterThanOrEqual(3);
    expect(data.data.seo.faq.length).toBeLessThanOrEqual(6);
  });

  it('should return 404 for non-existent card', async () => {
    const response = await fetch('/api/cards/tr/non-existent-card');

    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
    expect(data.error).toHaveProperty('code');
    expect(data.error).toHaveProperty('message');
  });

  it('should return 400 for invalid locale', async () => {
    const response = await fetch('/api/cards/invalid/joker');

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
  });

  it('should validate content length constraints', async () => {
    const response = await fetch('/api/cards/tr/joker');

    expect(response.status).toBe(200);

    const data = await response.json();
    const content = data.data.content;

    // Content length validation
    expect(content.uprightMeaning.length).toBeGreaterThanOrEqual(500);
    expect(content.uprightMeaning.length).toBeLessThanOrEqual(800);
    expect(content.reversedMeaning.length).toBeGreaterThanOrEqual(500);
    expect(content.reversedMeaning.length).toBeLessThanOrEqual(800);
    expect(content.loveInterpretation.length).toBeGreaterThanOrEqual(200);
    expect(content.loveInterpretation.length).toBeLessThanOrEqual(400);
    expect(content.careerInterpretation.length).toBeGreaterThanOrEqual(200);
    expect(content.careerInterpretation.length).toBeLessThanOrEqual(400);
    expect(content.moneyInterpretation.length).toBeGreaterThanOrEqual(200);
    expect(content.moneyInterpretation.length).toBeLessThanOrEqual(400);
    expect(content.spiritualInterpretation.length).toBeGreaterThanOrEqual(200);
    expect(content.spiritualInterpretation.length).toBeLessThanOrEqual(400);
    expect(content.story.length).toBeGreaterThanOrEqual(300);
    expect(content.story.length).toBeLessThanOrEqual(600);
  });

  it('should validate SEO metadata length constraints', async () => {
    const response = await fetch('/api/cards/tr/joker');

    expect(response.status).toBe(200);

    const data = await response.json();
    const seo = data.data.seo;

    // SEO length validation
    expect(seo.metaTitle.length).toBeGreaterThanOrEqual(50);
    expect(seo.metaTitle.length).toBeLessThanOrEqual(60);
    expect(seo.metaDescription.length).toBeGreaterThanOrEqual(120);
    expect(seo.metaDescription.length).toBeLessThanOrEqual(155);
  });

  it('should validate keywords array constraints', async () => {
    const response = await fetch('/api/cards/tr/joker');

    expect(response.status).toBe(200);

    const data = await response.json();
    const content = data.data.content;
    const seo = data.data.seo;

    // Keywords validation
    expect(content.keywords.length).toBeGreaterThanOrEqual(5);
    expect(content.keywords.length).toBeLessThanOrEqual(10);
    expect(seo.keywords.length).toBeGreaterThanOrEqual(5);
    expect(seo.keywords.length).toBeLessThanOrEqual(10);
  });

  it('should validate FAQ array constraints', async () => {
    const response = await fetch('/api/cards/tr/joker');

    expect(response.status).toBe(200);

    const data = await response.json();
    const seo = data.data.seo;

    // FAQ validation
    expect(seo.faq.length).toBeGreaterThanOrEqual(3);
    expect(seo.faq.length).toBeLessThanOrEqual(6);

    // Each FAQ item should have question and answer
    seo.faq.forEach((item: any) => {
      expect(item).toHaveProperty('question');
      expect(item).toHaveProperty('answer');
      expect(item.question.length).toBeLessThanOrEqual(100);
      expect(item.answer.length).toBeLessThanOrEqual(300);
    });
  });
});
