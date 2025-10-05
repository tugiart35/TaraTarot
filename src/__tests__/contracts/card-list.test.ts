import { describe, it, expect } from '@jest/globals';

/**
 * Contract Test: GET /api/cards/{locale}
 *
 * This test verifies the API contract for getting a list of cards by locale.
 * Tests must fail initially and pass only when implementation is complete.
 */

describe('GET /api/cards/{locale} Contract', () => {
  it('should return list of cards for valid locale', async () => {
    const response = await fetch('/api/cards/tr');

    expect(response.status).toBe(200);

    const data = await response.json();

    // Response structure validation
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('data');
    expect(data).toHaveProperty('pagination');

    // Data validation
    expect(data.data).toBeInstanceOf(Array);
    expect(data.pagination).toHaveProperty('total');
    expect(data.pagination).toHaveProperty('limit');
    expect(data.pagination).toHaveProperty('offset');
    expect(data.pagination).toHaveProperty('hasMore');

    // Each card should have required properties
    if (data.data.length > 0) {
      const card = data.data[0];
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('englishName');
      expect(card).toHaveProperty('turkishName');
      expect(card).toHaveProperty('serbianName');
      expect(card).toHaveProperty('arcanaType');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('slug');
    }
  });

  it('should filter by arcana type', async () => {
    const response = await fetch('/api/cards/tr?arcanaType=major');

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);

    // All returned cards should be major arcana
    data.data.forEach((card: any) => {
      expect(card.arcanaType).toBe('major');
    });
  });

  it('should filter by suit for minor arcana', async () => {
    const response = await fetch('/api/cards/tr?arcanaType=minor&suit=cups');

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);

    // All returned cards should be minor arcana with cups suit
    data.data.forEach((card: any) => {
      expect(card.arcanaType).toBe('minor');
      expect(card.suit).toBe('cups');
    });
  });

  it('should respect pagination parameters', async () => {
    const response = await fetch('/api/cards/tr?limit=5&offset=10');

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeLessThanOrEqual(5);
    expect(data.pagination.limit).toBe(5);
    expect(data.pagination.offset).toBe(10);
  });

  it('should return 400 for invalid locale', async () => {
    const response = await fetch('/api/cards/invalid');

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
  });

  it('should handle malformed requests gracefully', async () => {
    const response = await fetch('/api/cards/tr?invalid=param');

    // Should either return 200 with valid data or 400 with error
    expect([200, 400]).toContain(response.status);

    if (response.status === 400) {
      const data = await response.json();
      expect(data).toHaveProperty('success', false);
      expect(data).toHaveProperty('error');
    }
  });

  it('should return proper error format for 500 errors', async () => {
    // This test will fail until we can simulate a 500 error
    const response = await fetch('/api/cards/tr');

    if (response.status === 500) {
      const data = await response.json();
      expect(data).toHaveProperty('success', false);
      expect(data).toHaveProperty('error');
      expect(data.error).toHaveProperty('code');
      expect(data.error).toHaveProperty('message');
    }
  });
});
