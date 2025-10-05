export interface SEOTestResult {
  hasCanonical: boolean;
  hasHreflang: boolean;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  hasStructuredData: boolean;
  canonicalUrl?: string;
  hreflangUrls?: string[];
  errors: string[];
}

export const testSEO = (html: string): SEOTestResult => {
  const result: SEOTestResult = {
    hasCanonical: false,
    hasHreflang: false,
    hasOpenGraph: false,
    hasTwitterCard: false,
    hasStructuredData: false,
    errors: [],
  };

  // Test canonical URL
  const canonicalMatch = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i
  );
  if (canonicalMatch && canonicalMatch[1]) {
    result.hasCanonical = true;
    result.canonicalUrl = canonicalMatch[1];
  } else {
    result.errors.push('Canonical URL missing');
  }

  // Test hreflang tags
  const hreflangMatches = html.match(
    /<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/gi
  );
  if (hreflangMatches && hreflangMatches.length > 0) {
    result.hasHreflang = true;
    result.hreflangUrls = hreflangMatches
      .map(match => {
        const hrefMatch = match.match(/href="([^"]*)"/i);
        return hrefMatch && hrefMatch[1] ? hrefMatch[1] : '';
      })
      .filter(url => url !== '');
  } else {
    result.errors.push('Hreflang tags missing');
  }

  // Test Open Graph
  const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*>/i);
  const ogDescription = html.match(
    /<meta[^>]*property="og:description"[^>]*>/i
  );
  if (ogTitle && ogDescription) {
    result.hasOpenGraph = true;
  } else {
    result.errors.push('Open Graph tags missing');
  }

  // Test Twitter Card
  const twitterCard = html.match(/<meta[^>]*name="twitter:card"[^>]*>/i);
  if (twitterCard) {
    result.hasTwitterCard = true;
  } else {
    result.errors.push('Twitter Card missing');
  }

  // Test Structured Data
  const structuredData = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>/i
  );
  if (structuredData) {
    result.hasStructuredData = true;
  } else {
    result.errors.push('Structured Data missing');
  }

  return result;
};

export const testCoreWebVitals = async () => {
  // This would typically use a headless browser like Puppeteer
  // For now, we'll return mock data
  return {
    LCP: 2.5, // Largest Contentful Paint
    FID: 100, // First Input Delay
    CLS: 0.1, // Cumulative Layout Shift
    FCP: 1.8, // First Contentful Paint
    TTFB: 600, // Time to First Byte
  };
};

export const testSEOFriendlyURLs = (
  urls: string[]
): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach(url => {
    // Check if URL follows SEO-friendly pattern
    const isSEOFriendly = /^\/[a-z]{2}\/[a-z-]+$/.test(url);
    if (isSEOFriendly) {
      valid.push(url);
    } else {
      invalid.push(url);
    }
  });

  return { valid, invalid };
};
