export const resourceHints = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//api.example.com',
  ],

  // Preconnect to external domains
  preconnect: [
    {
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],

  // Preload critical resources
  preload: [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      href: '/api/tarot/cards',
      as: 'fetch',
      crossOrigin: 'anonymous',
    },
  ],

  // Prefetch next page resources
  prefetch: ['/api/tarot/spreads', '/api/tarot/daily'],
};

export const generateResourceHints = () => {
  const hints: Array<{
    rel: string;
    href?: string;
    as?: string;
    type?: string;
    crossOrigin?: string;
  }> = [];

  // DNS prefetch
  resourceHints.dnsPrefetch.forEach(domain => {
    hints.push({
      rel: 'dns-prefetch',
      href: domain,
    });
  });

  // Preconnect
  resourceHints.preconnect.forEach(config => {
    hints.push({
      rel: 'preconnect',
      href: config.href,
      crossOrigin: config.crossOrigin,
    });
  });

  // Preload
  resourceHints.preload.forEach(config => {
    const preloadHint: {
      rel: string;
      href: string;
      as: string;
      type?: string;
      crossOrigin?: string;
    } = {
      rel: 'preload',
      href: config.href,
      as: config.as,
      crossOrigin: config.crossOrigin,
    };
    
    // Only add type if it exists
    if (config.type) {
      preloadHint.type = config.type;
    }
    
    hints.push(preloadHint);
  });

  return hints;
};
