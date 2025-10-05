import { testSEO, testSEOFriendlyURLs } from '@/test-utils/seo-test-utils';

describe('SEO Tests', () => {
  describe('SEO-friendly URLs', () => {
    it('should validate SEO-friendly URL patterns', () => {
      const testUrls = [
        '/tr/anasayfa',
        '/en/home',
        '/sr/pocetna',
        '/tr/tarot-okuma',
        '/en/tarot-reading',
        '/sr/tarot-citanje',
        '/tr/numeroloji',
        '/en/numerology',
        '/sr/numerologija',
        '/tr/panel',
        '/en/dashboard',
        '/sr/panel',
        '/tr/giris',
        '/en/login',
        '/sr/prijava',
      ];

      const { valid, invalid } = testSEOFriendlyURLs(testUrls);

      expect(valid).toHaveLength(testUrls.length);
      expect(invalid).toHaveLength(0);
    });

    it('should reject non-SEO-friendly URLs', () => {
      const invalidUrls = [
        '/tr/tarotokumasi', // Old format
        '/en/anasayfa', // Wrong language
        '/sr/home', // Wrong language
        '/tr/dashboard', // Should be /tr/panel
        '/en/giris', // Should be /en/login
      ];

      const { valid, invalid } = testSEOFriendlyURLs(invalidUrls);

      expect(valid.length).toBeLessThan(invalidUrls.length);
      expect(invalid.length).toBeGreaterThan(0);
    });
  });

  describe('SEO Meta Tags', () => {
    it('should have all required SEO meta tags', () => {
      const mockHTML = `
        <html>
          <head>
            <link rel="canonical" href="https://busbuskimki.com/tr/anasayfa" />
            <link rel="alternate" hreflang="tr" href="https://busbuskimki.com/tr/anasayfa" />
            <link rel="alternate" hreflang="en" href="https://busbuskimki.com/en/home" />
            <link rel="alternate" hreflang="sr" href="https://busbuskimki.com/sr/pocetna" />
            <meta property="og:title" content="Büşbüşkiki - Mistik Rehberlik" />
            <meta property="og:description" content="Profesyonel tarot okuma ve numeroloji hizmetleri" />
            <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">{"@context":"https://schema.org"}</script>
          </head>
        </html>
      `;

      const result = testSEO(mockHTML);

      expect(result.hasCanonical).toBe(true);
      expect(result.hasHreflang).toBe(true);
      expect(result.hasOpenGraph).toBe(true);
      expect(result.hasTwitterCard).toBe(true);
      expect(result.hasStructuredData).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing SEO elements', () => {
      const incompleteHTML = `
        <html>
          <head>
            <title>Test Page</title>
          </head>
        </html>
      `;

      const result = testSEO(incompleteHTML);

      expect(result.hasCanonical).toBe(false);
      expect(result.hasHreflang).toBe(false);
      expect(result.hasOpenGraph).toBe(false);
      expect(result.hasTwitterCard).toBe(false);
      expect(result.hasStructuredData).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Language-specific SEO', () => {
    it('should have correct hreflang URLs for each locale', () => {
      const testCases = [
        {
          locale: 'tr',
          expectedUrls: [
            'https://busbuskimki.com/tr/anasayfa',
            'https://busbuskimki.com/en/home',
            'https://busbuskimki.com/sr/pocetna',
          ],
        },
        {
          locale: 'en',
          expectedUrls: [
            'https://busbuskimki.com/tr/anasayfa',
            'https://busbuskimki.com/en/home',
            'https://busbuskimki.com/sr/pocetna',
          ],
        },
        {
          locale: 'sr',
          expectedUrls: [
            'https://busbuskimki.com/tr/anasayfa',
            'https://busbuskimki.com/en/home',
            'https://busbuskimki.com/sr/pocetna',
          ],
        },
      ];

      testCases.forEach(({ locale, expectedUrls }) => {
        const mockHTML = `
          <html>
            <head>
              <link rel="alternate" hreflang="tr" href="https://busbuskimki.com/tr/anasayfa" />
              <link rel="alternate" hreflang="en" href="https://busbuskimki.com/en/home" />
              <link rel="alternate" hreflang="sr" href="https://busbuskimki.com/sr/pocetna" />
            </head>
          </html>
        `;

        const result = testSEO(mockHTML);

        expect(result.hasHreflang).toBe(true);
        expect(result.hreflangUrls).toEqual(
          expect.arrayContaining(expectedUrls)
        );
      });
    });
  });
});
