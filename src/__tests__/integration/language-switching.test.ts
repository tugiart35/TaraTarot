import { describe, it, expect } from '@jest/globals';

/**
 * Integration Test: Language Switching
 *
 * This test verifies that language switching works correctly between locales.
 * Tests must fail initially and pass only when implementation is complete.
 */

describe('Language Switching Integration Tests', () => {
  it('should switch from Turkish to English', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/en/cards/the-fool"');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('English');
  });

  it('should switch from Turkish to Serbian', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/sr/kartice/joker"');
    expect(html).toContain('hreflang="sr"');
    expect(html).toContain('Српски');
  });

  it('should switch from English to Turkish', async () => {
    const response = await fetch('/en/cards/the-fool');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/tr/kartlar/joker"');
    expect(html).toContain('hreflang="tr"');
    expect(html).toContain('Türkçe');
  });

  it('should switch from English to Serbian', async () => {
    const response = await fetch('/en/cards/the-fool');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/sr/kartice/joker"');
    expect(html).toContain('hreflang="sr"');
    expect(html).toContain('Српски');
  });

  it('should switch from Serbian to Turkish', async () => {
    const response = await fetch('/sr/kartice/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/tr/kartlar/joker"');
    expect(html).toContain('hreflang="tr"');
    expect(html).toContain('Türkçe');
  });

  it('should switch from Serbian to English', async () => {
    const response = await fetch('/sr/kartice/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language switching validation
    expect(html).toContain('<a href="/en/cards/the-fool"');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('English');
  });

  it('should maintain content consistency across languages', async () => {
    const trResponse = await fetch('/tr/kartlar/joker');
    const enResponse = await fetch('/en/cards/the-fool');
    const srResponse = await fetch('/sr/kartice/joker');

    expect(trResponse.status).toBe(200);
    expect(enResponse.status).toBe(200);
    expect(srResponse.status).toBe(200);

    const trHtml = await trResponse.text();
    const enHtml = await enResponse.text();
    const srHtml = await srResponse.text();

    // Content consistency validation
    expect(trHtml).toContain('Joker');
    expect(enHtml).toContain('The Fool');
    expect(srHtml).toContain('Joker');

    // All pages should have same structure
    expect(trHtml).toContain('<main');
    expect(enHtml).toContain('<main');
    expect(srHtml).toContain('<main');
  });

  it('should have proper language indicators', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language indicator validation
    expect(html).toContain('lang="tr"');
    expect(html).toContain('content-language');
    expect(html).toContain('Türkçe');
  });

  it('should have proper language selector', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language selector validation
    expect(html).toContain('language-selector');
    expect(html).toContain('dropdown');
    expect(html).toContain('Türkçe');
    expect(html).toContain('English');
    expect(html).toContain('Српски');
  });

  it('should have proper URL structure for each language', async () => {
    const trResponse = await fetch('/tr/kartlar/joker');
    const enResponse = await fetch('/en/cards/the-fool');
    const srResponse = await fetch('/sr/kartice/joker');

    expect(trResponse.status).toBe(200);
    expect(enResponse.status).toBe(200);
    expect(srResponse.status).toBe(200);

    // URL structure validation
    expect(trResponse.url).toContain('/tr/kartlar/');
    expect(enResponse.url).toContain('/en/cards/');
    expect(srResponse.url).toContain('/sr/kartice/');
  });

  it('should have proper canonical URLs for each language', async () => {
    const trResponse = await fetch('/tr/kartlar/joker');
    const enResponse = await fetch('/en/cards/the-fool');
    const srResponse = await fetch('/sr/kartice/joker');

    expect(trResponse.status).toBe(200);
    expect(enResponse.status).toBe(200);
    expect(srResponse.status).toBe(200);

    const trHtml = await trResponse.text();
    const enHtml = await enResponse.text();
    const srHtml = await srResponse.text();

    // Canonical URL validation
    expect(trHtml).toContain('<link rel="canonical" href="/tr/kartlar/joker"');
    expect(enHtml).toContain('<link rel="canonical" href="/en/cards/the-fool"');
    expect(srHtml).toContain('<link rel="canonical" href="/sr/kartice/joker"');
  });

  it('should have proper hreflang tags for all languages', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Hreflang validation
    expect(html).toContain('<link rel="alternate" hreflang="tr"');
    expect(html).toContain('<link rel="alternate" hreflang="en"');
    expect(html).toContain('<link rel="alternate" hreflang="sr"');
    expect(html).toContain('<link rel="alternate" hreflang="x-default"');
  });
});
