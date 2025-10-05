/**
 * Lighthouse configuration for performance monitoring
 * Ensures all pages meet performance targets
 */

module.exports = {
  ci: {
    collect: {
      // Test all tarot card pages
      url: [
        'http://localhost:3000/tr/kartlar/joker',
        'http://localhost:3000/tr/kartlar/buyucu',
        'http://localhost:3000/tr/kartlar/yuksek-rahibe',
        'http://localhost:3000/en/cards/the-fool',
        'http://localhost:3000/en/cards/the-magician',
        'http://localhost:3000/en/cards/the-high-priestess',
        'http://localhost:3000/sr/kartice/joker',
        'http://localhost:3000/sr/kartice/majstor',
        'http://localhost:3000/sr/kartice/visoka-svestenica',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
    },
    assert: {
      // Performance targets
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.8 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

        // Additional performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        interactive: ['error', { maxNumericValue: 3000 }],

        // Resource optimization
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'render-blocking-resources': ['warn', { maxLength: 0 }],
        'unminified-css': ['warn', { maxLength: 0 }],
        'unminified-javascript': ['warn', { maxLength: 0 }],
        'efficient-animated-content': ['warn', { maxLength: 0 }],
        'uses-optimized-images': ['warn', { maxLength: 0 }],
        'uses-webp-images': ['warn', { maxLength: 0 }],
        'uses-text-compression': ['warn', { maxLength: 0 }],
        'uses-responsive-images': ['warn', { maxLength: 0 }],

        // SEO optimizations
        'meta-description': 'warn',
        'document-title': 'warn',
        'link-text': 'warn',
        'is-crawlable': 'warn',
        'robots-txt': 'warn',
        hreflang: 'warn',
        canonical: 'warn',
        'structured-data': 'warn',

        // Accessibility
        'color-contrast': 'warn',
        'image-alt': 'warn',
        label: 'warn',
        'button-name': 'warn',
        'link-name': 'warn',
        'heading-order': 'warn',
        'html-has-lang': 'warn',
        'html-lang-valid': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
