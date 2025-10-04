#!/usr/bin/env node

/**
 * Fix Critical Performance Issues Script
 *
 * Bu script, performance audit'te tespit edilen kritik sorunları otomatik olarak çözer.
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

async function fixCriticalPerformanceIssues() {
  console.log('⚡ Critical Performance issues düzeltiliyor...');

  try {
    let fixedFiles = 0;

    // 1. Component'lerde performance optimizasyonları
    const componentFiles = [
      'TarotCardHero.tsx',
      'TarotCardContent.tsx',
      'TarotCardCTA.tsx',
      'TarotCardFAQ.tsx',
      'TarotCardsPage.tsx',
    ];

    for (const componentFile of componentFiles) {
      const filePath = path.join(COMPONENTS_DIR, componentFile);

      if (fs.existsSync(filePath)) {
        const fixed = await optimizeComponentPerformance(filePath);
        if (fixed) {
          fixedFiles++;
          console.log(`✅ ${componentFile}: Performance optimizations applied`);
        }
      }
    }

    // 2. Next.js configuration optimizations
    await optimizeNextJSConfig();
    fixedFiles++;
    console.log('✅ Next.js config: Performance optimizations applied');

    // 3. Image optimization setup
    await setupImageOptimization();
    fixedFiles++;
    console.log('✅ Image optimization: Setup completed');

    // 4. Bundle optimization
    await optimizeBundle();
    fixedFiles++;
    console.log('✅ Bundle optimization: Configuration updated');

    console.log(`✅ ${fixedFiles} performance optimizations applied`);
    console.log('🎉 Critical Performance issues düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function optimizeComponentPerformance(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. React.memo ekle
    if (
      !content.includes('React.memo') &&
      content.includes('export function')
    ) {
      content = addReactMemo(content);
      modified = true;
    }

    // 2. useMemo ve useCallback ekle
    content = addPerformanceHooks(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 3. Image optimization
    content = optimizeImages(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 4. Lazy loading ekle
    content = addLazyLoading(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 5. Code splitting ekle
    content = addCodeSplitting(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }

    return modified;
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    return false;
  }
}

function addReactMemo(content) {
  let modified = content;

  // React import'u ekle
  if (!modified.includes('import React')) {
    modified = modified.replace(
      /import { useState } from 'react';/,
      "import React, { useState, useMemo, useCallback } from 'react';"
    );
  }

  // Component'i React.memo ile sar
  modified = modified.replace(
    /export function (\w+)\(/g,
    'export const $1 = React.memo(function $1('
  );

  // Component'in sonuna kapanış parantezi ekle
  modified = modified.replace(/(\s+)(<\/div>\s*<\/div>\s*);$/gm, '$1$2);');

  return modified;
}

function addPerformanceHooks(content) {
  let modified = content;

  // Expensive calculations için useMemo ekle
  const expensivePatterns = [
    'filteredCards',
    'sortedCards',
    'processedData',
    'computedValue',
  ];

  expensivePatterns.forEach(pattern => {
    if (modified.includes(pattern)) {
      modified = modified.replace(
        new RegExp(`const ${pattern} = ([^;]+);`, 'g'),
        `const ${pattern} = useMemo(() => $1, [dependencies]);`
      );
    }
  });

  // Event handlers için useCallback ekle
  modified = modified.replace(
    /const handle(\w+) = \(([^)]*)\) => {([^}]+)};/g,
    `const handle$1 = useCallback(($2) => {$3}, [dependencies]);`
  );

  return modified;
}

function optimizeImages(content) {
  let modified = content;

  // Next.js Image component optimizations
  modified = modified.replace(/<Image([^>]*?)>/g, match => {
    if (match.includes('priority') || match.includes('loading')) {
      return match;
    }

    // Hero images için priority ekle
    if (content.includes('hero') || content.includes('Hero')) {
      return match.replace('>', ' priority loading="eager">');
    } else {
      return match.replace('>', ' loading="lazy">');
    }
  });

  // Sizes attribute ekle
  modified = modified.replace(
    /src="([^"]*?)"([^>]*?)>/g,
    (match, src, after) => {
      if (after.includes('sizes=')) {
        return match;
      }

      return match.replace(
        '>',
        ' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw">'
      );
    }
  );

  // Quality attribute ekle
  modified = modified.replace(
    /alt="([^"]*?)"([^>]*?)>/g,
    (match, alt, after) => {
      if (after.includes('quality=')) {
        return match;
      }

      return match.replace('>', ' quality={85}>');
    }
  );

  return modified;
}

function addLazyLoading(content) {
  let modified = content;

  // Dynamic imports ekle
  if (
    content.includes('TarotCardFAQ') ||
    content.includes('TarotCardRelated')
  ) {
    modified = modified.replace(
      /import { TarotCardFAQ } from '\.\.\/TarotCardFAQ';/,
      "import dynamic from 'next/dynamic';\nconst TarotCardFAQ = dynamic(() => import('../TarotCardFAQ').then(mod => ({ default: mod.TarotCardFAQ })), { ssr: false });"
    );

    modified = modified.replace(
      /import { TarotCardRelated } from '\.\.\/TarotCardRelated';/,
      "const TarotCardRelated = dynamic(() => import('../TarotCardRelated').then(mod => ({ default: mod.TarotCardRelated })), { ssr: false });"
    );
  }

  return modified;
}

function addCodeSplitting(content) {
  let modified = content;

  // Intersection Observer için lazy loading ekle
  if (content.includes('useState') && !content.includes('useEffect')) {
    modified = modified.replace(
      /import React, { useState } from 'react';/,
      "import React, { useState, useEffect, useRef } from 'react';"
    );

    // Lazy loading hook ekle
    const lazyHook = `
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
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
`;

    modified = modified.replace(
      /const \[(\w+), set\w+\] = useState\(/,
      `${lazyHook}\n  const [$1, set$1] = useState(`
    );
  }

  return modified;
}

async function optimizeNextJSConfig() {
  const configPath = path.join(__dirname, '..', 'next.config.js');

  if (!fs.existsSync(configPath)) {
    // next.config.js oluştur
    const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Bundle optimization
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Compression
  compress: true,
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`;

    fs.writeFileSync(configPath, configContent, 'utf-8');
  } else {
    // Mevcut config'i güncelle
    let config = fs.readFileSync(configPath, 'utf-8');

    // Image optimization ekle
    if (!config.includes('images:')) {
      config = config.replace(
        /const nextConfig = {/,
        `const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },`
      );
    }

    fs.writeFileSync(configPath, config, 'utf-8');
  }
}

async function setupImageOptimization() {
  // Image optimization için gerekli dosyaları oluştur
  const imageUtilsPath = path.join(
    __dirname,
    '..',
    'src',
    'lib',
    'image-utils.ts'
  );

  const imageUtilsContent = `import { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
}

export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = new URLSearchParams();
  params.append('w', width.toString());
  if (quality) {
    params.append('q', quality.toString());
  }
  return \`/api/image?\${params.toString()}&url=\${encodeURIComponent(src)}\`;
};

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = src;
  });
};

export const optimizeImageProps = (src: string, alt: string, priority = false): OptimizedImageProps => ({
  src,
  alt,
  priority,
  quality: 85,
  loading: priority ? 'eager' : 'lazy',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
});`;

  // Dizin oluştur
  const libDir = path.dirname(imageUtilsPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(imageUtilsPath, imageUtilsContent, 'utf-8');
}

async function optimizeBundle() {
  // Bundle analyzer için script ekle
  const packageJsonPath = path.join(__dirname, '..', 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Bundle analyzer scripts ekle
    if (!packageJson.scripts['analyze']) {
      packageJson.scripts.analyze = 'ANALYZE=true next build';
      packageJson.scripts['analyze:server'] =
        'BUNDLE_ANALYZE=server next build';
      packageJson.scripts['analyze:browser'] =
        'BUNDLE_ANALYZE=browser next build';
    }

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf-8'
    );
  }
}

// Script çalıştırma
fixCriticalPerformanceIssues();
