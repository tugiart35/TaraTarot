export const fontOptimization = {
  // Preload critical fonts
  preload: [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],

  // Font display strategy
  fontDisplay: 'swap',

  // Fallback fonts
  fallbacks: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],

  // Critical font weights
  criticalWeights: [400, 600, 700],

  // Font subsetting
  subsets: ['latin', 'latin-ext'],
};

export const generateFontPreloadLinks = () => {
  return fontOptimization.preload.map(font => ({
    rel: 'preload',
    href: font.href,
    as: font.as,
    type: font.type,
    crossOrigin: font.crossOrigin,
  }));
};
