#!/usr/bin/env node

/**
 * Fix Performance LCP and CLS Issues Script
 *
 * Bu script, Core Web Vitals'te tespit edilen LCP ve CLS sorunlarını çözer.
 * Largest Contentful Paint (LCP) ve Cumulative Layout Shift (CLS) optimizasyonları.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(
  __dirname,
  '..',
  'src',
  'features',
  'tarot',
  'components'
);
const APP_DIR = path.join(__dirname, '..', 'src', 'app');

async function fixPerformanceLCPCLSIssues() {
  console.log('⚡ Performance LCP & CLS issues düzeltiliyor...');

  try {
    let fixedFiles = 0;

    // 1. Component'lerde LCP optimizasyonları
    const componentFiles = [
      'TarotCardHero.tsx',
      'TarotCardContent.tsx',
      'TarotCardPage.tsx',
      'TarotCardsPage.tsx',
    ];

    for (const componentFile of componentFiles) {
      const filePath = path.join(COMPONENTS_DIR, componentFile);

      if (fs.existsSync(filePath)) {
        const fixed = await optimizeLCPCLS(filePath);
        if (fixed) {
          fixedFiles++;
          console.log(`✅ ${componentFile}: LCP & CLS optimizations applied`);
        }
      }
    }

    // 2. Next.js configuration LCP optimizations
    await optimizeNextJSForLCP();
    fixedFiles++;
    console.log('✅ Next.js config: LCP optimizations applied');

    // 3. Image optimization for LCP
    await createImageOptimizationUtils();
    fixedFiles++;
    console.log('✅ Images: LCP optimizations applied');

    // 4. CSS optimization for CLS
    await optimizeCSSForCLS();
    fixedFiles++;
    console.log('✅ CSS: CLS optimizations applied');

    // 5. Font optimization
    await optimizeFonts();
    fixedFiles++;
    console.log('✅ Fonts: Performance optimizations applied');

    // 6. Critical resource hints
    await addResourceHints();
    fixedFiles++;
    console.log('✅ Resource hints: Added');

    console.log(`✅ ${fixedFiles} LCP & CLS optimizations applied`);
    console.log('🎉 Performance LCP & CLS issues düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function optimizeLCPCLS(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. Image optimization for LCP
    content = optimizeImagesForLCP(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 2. CLS prevention
    content = preventCLS(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 3. Critical CSS inlining
    content = inlineCriticalCSS(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 4. Resource preloading
    content = addResourcePreloading(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 5. Lazy loading optimization
    content = optimizeLazyLoading(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }

    return modified;
  } catch (error) {
    console.error(`Error optimizing LCP/CLS for ${filePath}:`, error.message);
    return false;
  }
}

function optimizeImagesForLCP(content) {
  let modified = content;

  // 1. Hero images için priority ve preload ekle
  modified = modified.replace(
    /<Image([^>]*?)src="([^"]*?)"([^>]*?)>/g,
    (match, before, src, after) => {
      // Hero image detection
      const isHeroImage =
        content.includes('hero') ||
        content.includes('Hero') ||
        src.includes('hero') ||
        after.includes('hero');

      if (isHeroImage) {
        // Priority loading for LCP
        if (!after.includes('priority')) {
          after = after.replace(
            '>',
            ' priority loading="eager" fetchPriority="high">'
          );
        }

        // Add preload link
        const preloadLink = `
  {/* Preload hero image for LCP */}
  <link
    rel="preload"
    as="image"
    href="${src}"
    fetchPriority="high"
  />
`;
        modified = modified.replace(
          /(<div[^>]*className="[^"]*hero[^"]*"[^>]*>)/,
          `${preloadLink}$1`
        );
      }

      return `<Image${before}src="${src}"${after}`;
    }
  );

  // 2. Image dimensions for CLS prevention
  modified = modified.replace(
    /src="([^"]*?)"([^>]*?)>/g,
    (match, src, after) => {
      if (!after.includes('width') && !after.includes('height')) {
        // Default dimensions for tarot cards (4:5 ratio)
        const defaultWidth = 400;
        const defaultHeight = 500;

        after = after.replace(
          '>',
          ` width={${defaultWidth}} height={${defaultHeight}}>`
        );
      }

      return `src="${src}"${after}`;
    }
  );

  // 3. WebP format with fallback
  modified = modified.replace(
    /quality=\{([^}]*)\}>/g,
    'quality={$1} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==">'
  );

  return modified;
}

function preventCLS(content) {
  let modified = content;

  // 1. Container dimensions
  modified = modified.replace(/className="([^"]*?)"/g, (match, classes) => {
    // Add aspect ratio containers
    if (classes.includes('card') || classes.includes('image')) {
      if (!classes.includes('aspect-')) {
        classes += ' aspect-[4/5]';
      }
    }

    // Add minimum heights for content areas
    if (classes.includes('content') || classes.includes('description')) {
      if (!classes.includes('min-h-')) {
        classes += ' min-h-[200px]';
      }
    }

    return `className="${classes}"`;
  });

  // 2. Skeleton loading states
  if (!modified.includes('skeleton')) {
    const skeletonCSS = `
  {/* Skeleton loading to prevent CLS */}
  <div className="animate-pulse">
    <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
    <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
    <div className="bg-gray-200 h-32 w-full rounded"></div>
  </div>
`;
    modified = modified.replace(
      /{loading && <div[^>]*>Loading\.\.\.<\/div>}/,
      `{loading && ${skeletonCSS}}`
    );
  }

  // 3. Font loading optimization
  modified = modified.replace(
    /<div[^>]*className="[^"]*container[^"]*"[^>]*>/,
    `<div className="container" style={{ fontDisplay: 'swap' }}>`
  );

  // 4. Reserve space for dynamic content
  modified = modified.replace(
    /<div([^>]*className="[^"]*dynamic[^"]*"[^>]*)>/g,
    '<div$1 style={{ minHeight: "200px" }}>'
  );

  return modified;
}

function inlineCriticalCSS(content) {
  let modified = content;

  // Critical CSS for above-the-fold content
  const criticalCSS = `
  {/* Critical CSS for LCP */}
  <style dangerouslySetInnerHTML={{
    __html: \`
      .hero-image {
        width: 100%;
        height: auto;
        max-width: 400px;
        aspect-ratio: 4/5;
        object-fit: cover;
      }
      .card-container {
        min-height: 500px;
        padding: 1rem;
      }
      .content-section {
        min-height: 200px;
        padding: 1rem 0;
      }
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }
    \`
  }} />
`;

  if (!modified.includes('critical css')) {
    modified = modified.replace(
      /(<div[^>]*className="[^"]*hero[^"]*"[^>]*>)/,
      `${criticalCSS}$1`
    );
  }

  return modified;
}

function addResourcePreloading(content) {
  let modified = content;

  // 1. Preload critical resources
  if (!modified.includes('preload')) {
    const preloadLinks = `
  {/* Preload critical resources for LCP */}
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  <link rel="preload" href="/api/tarot/cards" as="fetch" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
`;
    modified = modified.replace(
      /(<div[^>]*className="[^"]*container[^"]*"[^>]*>)/,
      `${preloadLinks}$1`
    );
  }

  // 2. Module preloading for critical components
  modified = modified.replace(
    /import { TarotCardHero } from/g,
    `import { TarotCardHero } from
  // Preload critical component
  import(/* webpackPreload: true */ './TarotCardHero').then(module => module.TarotCardHero);`
  );

  return modified;
}

function optimizeLazyLoading(content) {
  let modified = content;

  // 1. Intersection Observer for lazy loading
  if (!modified.includes('IntersectionObserver')) {
    const lazyLoadingHook = `
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
`;

    modified = modified.replace(
      /const \[(\w+), set\w+\] = useState\(/,
      `${lazyLoadingHook}\n  const [$1, set$1] = useState(`
    );
  }

  // 2. Lazy load non-critical components
  modified = modified.replace(
    /import { TarotCardFAQ } from/g,
    `import dynamic from 'next/dynamic';
const TarotCardFAQ = dynamic(() => import('./TarotCardFAQ'), { 
  loading: () => <div className="animate-pulse h-32 bg-gray-200 rounded" />,
  ssr: false 
});`
  );

  return modified;
}

async function optimizeNextJSForLCP() {
  const configPath = path.join(__dirname, '..', 'next.config.js');

  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, 'utf-8');

    // LCP optimizations
    if (!config.includes('experimental')) {
      config = config.replace(
        /module\.exports = nextConfig;/,
        `module.exports = {
  ...nextConfig,
  experimental: {
    ...nextConfig.experimental,
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // LCP optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};`
      );
    }

    fs.writeFileSync(configPath, config, 'utf-8');
  }
}

async function createImageOptimizationUtils() {
  // Create image optimization utilities
  const imageUtilsPath = path.join(
    __dirname,
    '..',
    'src',
    'lib',
    'image-optimization.ts'
  );

  const imageOptimization = `import { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  isLCP?: boolean;
}

export const getOptimizedImageProps = (
  src: string, 
  alt: string, 
  options: { priority?: boolean; isLCP?: boolean; quality?: number } = {}
): OptimizedImageProps => {
  const { priority = false, isLCP = false, quality = 85 } = options;
  
  return {
    src,
    alt,
    priority: priority || isLCP,
    quality,
    loading: priority || isLCP ? 'eager' : 'lazy',
    fetchPriority: priority || isLCP ? 'high' : 'auto',
    sizes: isLCP 
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      : '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw',
    placeholder: 'blur',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  };
};

export const preloadImage = (src: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }
};

export const generateResponsiveImages = (baseSrc: string): string[] => {
  const sizes = [400, 600, 800, 1200];
  return sizes.map(size => \`\${baseSrc}?w=\${size}&q=85&f=webp\`);
};`;

  const libDir = path.dirname(imageUtilsPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(imageUtilsPath, imageOptimization, 'utf-8');
}

async function optimizeCSSForCLS() {
  const cssPath = path.join(
    __dirname,
    '..',
    'src',
    'styles',
    'performance.css'
  );

  const performanceCSS = `/* Performance Optimizations for LCP and CLS */

/* Prevent layout shift with aspect ratios */
.card-image {
  aspect-ratio: 4/5;
  object-fit: cover;
  width: 100%;
  height: auto;
}

/* Reserve space for dynamic content */
.content-container {
  min-height: 200px;
}

.hero-section {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  font-weight: 100 900;
  src: url('/fonts/inter-var.woff2') format('woff2');
}

/* Critical above-the-fold styles */
.above-fold {
  contain: layout style paint;
}

/* Skeleton loading states */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Reduce motion for performance */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Optimize rendering */
.will-change-transform {
  will-change: transform;
}

.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Container queries for responsive images */
@container (min-width: 768px) {
  .responsive-image {
    width: 50%;
  }
}

@container (min-width: 1200px) {
  .responsive-image {
    width: 25%;
  }
}`;

  const stylesDir = path.dirname(cssPath);
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  fs.writeFileSync(cssPath, performanceCSS, 'utf-8');
}

async function optimizeFonts() {
  // Create font optimization configuration
  const fontConfigPath = path.join(
    __dirname,
    '..',
    'src',
    'lib',
    'font-optimization.ts'
  );

  const fontOptimization = `export const fontOptimization = {
  // Preload critical fonts
  preload: [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }
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
    'sans-serif'
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
    crossOrigin: font.crossOrigin
  }));
};`;

  const libDir = path.dirname(fontConfigPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(fontConfigPath, fontOptimization, 'utf-8');
}

async function addResourceHints() {
  // Create resource hints configuration
  const hintsPath = path.join(
    __dirname,
    '..',
    'src',
    'lib',
    'resource-hints.ts'
  );

  const resourceHints = `export const resourceHints = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//api.example.com'
  ],
  
  // Preconnect to external domains
  preconnect: [
    {
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
  ],
  
  // Preload critical resources
  preload: [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    },
    {
      href: '/api/tarot/cards',
      as: 'fetch',
      crossOrigin: 'anonymous'
    }
  ],
  
  // Prefetch next page resources
  prefetch: [
    '/api/tarot/spreads',
    '/api/tarot/daily'
  ]
};

export const generateResourceHints = () => {
  const hints = [];
  
  // DNS prefetch
  resourceHints.dnsPrefetch.forEach(domain => {
    hints.push({
      rel: 'dns-prefetch',
      href: domain
    });
  });
  
  // Preconnect
  resourceHints.preconnect.forEach(config => {
    hints.push({
      rel: 'preconnect',
      href: config.href,
      crossOrigin: config.crossOrigin
    });
  });
  
  // Preload
  resourceHints.preload.forEach(config => {
    hints.push({
      rel: 'preload',
      href: config.href,
      as: config.as,
      type: config.type,
      crossOrigin: config.crossOrigin
    });
  });
  
  return hints;
};`;

  const libDir = path.dirname(hintsPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(hintsPath, resourceHints, 'utf-8');
}

// Script çalıştırma
fixPerformanceLCPCLSIssues();
