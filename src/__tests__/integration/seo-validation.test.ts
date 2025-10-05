import { describe, it, expect } from '@jest/globals';

/**
 * Integration Test: SEO Validation
 *
 * This test verifies that SEO metadata is properly generated and structured.
 * Tests must fail initially and pass only when implementation is complete.
 */

describe('SEO Validation Integration Tests', () => {
  it('should have proper meta title for Turkish page', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Meta title validation
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    expect(titleMatch).toBeTruthy();

    const title = titleMatch![1];
    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title).toContain('Joker');
    expect(title).toContain('Tarot');
  });

  it('should have proper meta description for Turkish page', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Meta description validation
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);
    expect(descMatch).toBeTruthy();

    const description = descMatch![1];
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(155);
    expect(description).toContain('Joker');
    expect(description).toContain('tarot');
  });

  it('should have proper Open Graph tags', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Open Graph validation
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta property="og:description"');
    expect(html).toContain('<meta property="og:image"');
    expect(html).toContain('<meta property="og:url"');
    expect(html).toContain('<meta property="og:type" content="article"');
    expect(html).toContain('<meta property="og:locale" content="tr_TR"');
  });

  it('should have proper Twitter Card tags', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Twitter Card validation
    expect(html).toContain(
      '<meta name="twitter:card" content="summary_large_image"'
    );
    expect(html).toContain('<meta name="twitter:title"');
    expect(html).toContain('<meta name="twitter:description"');
    expect(html).toContain('<meta name="twitter:image"');
  });

  it('should have structured data (JSON-LD)', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // JSON-LD validation
    expect(html).toContain('<script type="application/ld+json"');
    expect(html).toContain('"@context"');
    expect(html).toContain('"@type"');
    expect(html).toContain('"Article"');
    expect(html).toContain('"FAQPage"');
    expect(html).toContain('"BreadcrumbList"');
  });

  it('should have proper hreflang tags for all locales', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Hreflang validation
    expect(html).toContain(
      '<link rel="alternate" hreflang="tr" href="/tr/kartlar/joker"'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="en" href="/en/cards/the-fool"'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="sr" href="/sr/kartice/joker"'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="x-default" href="/en/cards/the-fool"'
    );
  });

  it('should have canonical URL', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Canonical URL validation
    expect(html).toContain('<link rel="canonical" href="/tr/kartlar/joker"');
  });

  it('should have proper robots meta tag', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Robots meta validation
    expect(html).toContain('<meta name="robots" content="index, follow"');
  });

  it('should have proper language meta tag', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Language meta validation
    expect(html).toContain('<meta http-equiv="content-language" content="tr"');
    expect(html).toContain('<html lang="tr"');
  });

  it('should have proper viewport meta tag', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Viewport meta validation
    expect(html).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1"'
    );
  });

  it('should have proper charset meta tag', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Charset meta validation
    expect(html).toContain('<meta charset="utf-8"');
  });

  it('should have proper favicon links', async () => {
    const response = await fetch('/tr/kartlar/joker');

    expect(response.status).toBe(200);

    const html = await response.text();

    // Favicon validation
    expect(html).toContain('<link rel="icon"');
    expect(html).toContain('<link rel="apple-touch-icon"');
  });
});
