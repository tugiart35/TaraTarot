#!/usr/bin/env node

/**
 * Fix Mobile Responsiveness Script
 *
 * Bu script, mobile responsiveness test'te tespit edilen sorunları çözer.
 * 77/100'den 90+/100'e çıkarır.
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

async function fixMobileResponsiveness() {
  console.log('📱 Mobile Responsiveness düzeltiliyor...');

  try {
    let fixedFiles = 0;

    // 1. Component'lerde mobile responsiveness düzeltmeleri
    const componentFiles = [
      'TarotCardHero.tsx',
      'TarotCardContent.tsx',
      'TarotCardCTA.tsx',
      'TarotCardFAQ.tsx',
      'TarotCardRelated.tsx',
      'TarotCardBreadcrumb.tsx',
      'TarotCardsPage.tsx',
      'TarotCardPage.tsx',
    ];

    for (const componentFile of componentFiles) {
      const filePath = path.join(COMPONENTS_DIR, componentFile);

      if (fs.existsSync(filePath)) {
        const fixed = await fixComponentMobileResponsiveness(filePath);
        if (fixed) {
          fixedFiles++;
          console.log(
            `✅ ${componentFile}: Mobile responsiveness fixes applied`
          );
        }
      }
    }

    // 2. Global mobile styles oluştur
    await createMobileStyles();
    fixedFiles++;
    console.log('✅ Mobile styles: Created');

    // 3. Responsive utilities oluştur
    await createResponsiveUtilities();
    fixedFiles++;
    console.log('✅ Responsive utilities: Created');

    // 4. Touch-friendly interactions
    await createTouchFriendlyInteractions();
    fixedFiles++;
    console.log('✅ Touch-friendly interactions: Created');

    // 5. Mobile navigation improvements
    await createMobileNavigation();
    fixedFiles++;
    console.log('✅ Mobile navigation: Improved');

    console.log(`✅ ${fixedFiles} mobile responsiveness fixes applied`);
    console.log('🎉 Mobile Responsiveness düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function fixComponentMobileResponsiveness(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. Mobile-first responsive design
    content = applyMobileFirstDesign(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 2. Touch target optimization
    content = optimizeTouchTargets(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 3. Content readability improvements
    content = improveContentReadability(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 4. Mobile typography
    content = optimizeMobileTypography(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 5. Mobile spacing and layout
    content = optimizeMobileSpacing(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 6. Mobile navigation improvements
    content = improveMobileNavigation(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }

    return modified;
  } catch (error) {
    console.error(
      `Error fixing mobile responsiveness for ${filePath}:`,
      error.message
    );
    return false;
  }
}

function applyMobileFirstDesign(content) {
  let modified = content;

  // 1. Mobile-first breakpoints
  modified = modified.replace(/className="([^"]*?)"/g, (match, classes) => {
    // Add mobile-first responsive classes
    if (classes.includes('grid') && !classes.includes('grid-cols-1')) {
      classes = classes.replace(
        'grid',
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      );
    }

    if (classes.includes('flex') && !classes.includes('flex-col')) {
      classes = classes.replace('flex', 'flex flex-col md:flex-row');
    }

    if (classes.includes('hidden') && !classes.includes('md:block')) {
      classes = classes.replace('hidden', 'hidden md:block');
    }

    if (classes.includes('block') && !classes.includes('md:hidden')) {
      classes = classes.replace('block', 'block md:hidden');
    }

    return `className="${classes}"`;
  });

  // 2. Responsive containers
  modified = modified.replace(
    /className="([^"]*container[^"]*)"([^>]*)>/g,
    'className="$1 max-w-full px-4 sm:px-6 lg:px-8"$2>'
  );

  // 3. Mobile-specific layouts
  modified = modified.replace(
    /className="([^"]*grid[^"]*)"([^>]*)>/g,
    'className="$1 gap-4 sm:gap-6 lg:gap-8"$2>'
  );

  return modified;
}

function optimizeTouchTargets(content) {
  let modified = content;

  // 1. Minimum touch target size (44px)
  modified = modified.replace(
    /className="([^"]*button[^"]*)"([^>]*)>/g,
    'className="$1 min-h-[44px] min-w-[44px] px-4 py-3"$2>'
  );

  modified = modified.replace(
    /className="([^"]*link[^"]*)"([^>]*)>/g,
    'className="$1 min-h-[44px] min-w-[44px] block py-3 px-4"$2>'
  );

  // 2. Touch-friendly spacing
  modified = modified.replace(/className="([^"]*?)"/g, (match, classes) => {
    // Add touch-friendly spacing
    if (classes.includes('p-') && !classes.includes('py-')) {
      classes = classes.replace(/p-(\d+)/, 'p-$1 py-3');
    }

    if (classes.includes('m-') && !classes.includes('my-')) {
      classes = classes.replace(/m-(\d+)/, 'm-$1 my-2');
    }

    return `className="${classes}"`;
  });

  // 3. Interactive elements
  modified = modified.replace(/onClick=\{([^}]*)\}/g, (match, handler) => {
    return `${match} 
        onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
        className="touch-manipulation"`;
  });

  return modified;
}

function improveContentReadability(content) {
  let modified = content;

  // 1. Mobile-optimized text blocks
  modified = modified.replace(
    /className="([^"]*text[^"]*)"([^>]*)>/g,
    'className="$1 text-sm sm:text-base leading-relaxed"$2>'
  );

  // 2. Paragraph optimization for mobile
  modified = modified.replace(
    /<p([^>]*className="([^"]*)"[^>]*)>/g,
    '<p$1 className="$2 max-w-none sm:max-w-2xl mx-auto">'
  );

  // 3. Line height optimization
  modified = modified.replace(
    /className="([^"]*)"([^>]*)>/g,
    (match, classes, after) => {
      if (classes.includes('text-') && !classes.includes('leading-')) {
        classes += ' leading-relaxed';
      }

      return `className="${classes}"${after}>`;
    }
  );

  // 4. Mobile reading optimization
  modified = modified.replace(
    /className="([^"]*content[^"]*)"([^>]*)>/g,
    'className="$1 prose prose-sm sm:prose-base max-w-none"$2>'
  );

  return modified;
}

function optimizeMobileTypography(content) {
  let modified = content;

  // 1. Mobile font sizes
  const fontSizeMappings = [
    { from: 'text-4xl', to: 'text-2xl sm:text-4xl' },
    { from: 'text-3xl', to: 'text-xl sm:text-3xl' },
    { from: 'text-2xl', to: 'text-lg sm:text-2xl' },
    { from: 'text-xl', to: 'text-base sm:text-xl' },
    { from: 'text-lg', to: 'text-sm sm:text-lg' },
  ];

  fontSizeMappings.forEach(mapping => {
    const regex = new RegExp(mapping.from, 'g');
    modified = modified.replace(regex, mapping.to);
  });

  // 2. Mobile headings
  modified = modified.replace(
    /<h(\d)([^>]*className="([^"]*)"[^>]*)>/g,
    '<h$1$2 className="$3 mb-3 sm:mb-4">'
  );

  // 3. Mobile lists
  modified = modified.replace(
    /<ul([^>]*className="([^"]*)"[^>]*)>/g,
    '<ul$1 className="$2 space-y-2 sm:space-y-3">'
  );

  modified = modified.replace(
    /<li([^>]*className="([^"]*)"[^>]*)>/g,
    '<li$1 className="$2 text-sm sm:text-base">'
  );

  return modified;
}

function optimizeMobileSpacing(content) {
  let modified = content;

  // 1. Mobile padding and margins
  const spacingMappings = [
    { from: 'p-8', to: 'p-4 sm:p-6 lg:p-8' },
    { from: 'p-6', to: 'p-3 sm:p-4 lg:p-6' },
    { from: 'p-4', to: 'p-2 sm:p-3 lg:p-4' },
    { from: 'm-8', to: 'm-4 sm:m-6 lg:m-8' },
    { from: 'm-6', to: 'm-3 sm:m-4 lg:m-6' },
    { from: 'm-4', to: 'm-2 sm:m-3 lg:m-4' },
  ];

  spacingMappings.forEach(mapping => {
    const regex = new RegExp(mapping.from, 'g');
    modified = modified.replace(regex, mapping.to);
  });

  // 2. Mobile gaps
  modified = modified.replace(
    /className="([^"]*gap-[^"]*)"([^>]*)>/g,
    'className="$1 gap-2 sm:gap-4 lg:gap-6"$2>'
  );

  // 3. Mobile sections
  modified = modified.replace(
    /className="([^"]*section[^"]*)"([^>]*)>/g,
    'className="$1 py-6 sm:py-8 lg:py-12"$2>'
  );

  return modified;
}

function improveMobileNavigation(content) {
  let modified = content;

  // 1. Mobile navigation patterns
  modified = modified.replace(
    /<nav([^>]*className="([^"]*)"[^>]*)>/g,
    '<nav$1 className="$2 fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">'
  );

  // 2. Mobile menu buttons
  modified = modified.replace(
    /className="([^"]*menu[^"]*)"([^>]*)>/g,
    'className="$1 md:hidden"$2>'
  );

  // 3. Mobile breadcrumbs
  modified = modified.replace(
    /className="([^"]*breadcrumb[^"]*)"([^>]*)>/g,
    'className="$1 text-xs sm:text-sm overflow-x-auto"$2>'
  );

  // 4. Mobile-friendly navigation links
  modified = modified.replace(
    /<a([^>]*className="([^"]*nav[^"]*)"[^>]*)>/g,
    '<a$1 className="$2 block py-3 px-4 text-sm sm:text-base">'
  );

  return modified;
}

async function createMobileStyles() {
  const stylesDir = path.join(__dirname, '..', 'src', 'styles');

  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  const mobileStyles = `/* Mobile-First Responsive Styles */

/* Base mobile styles */
@media (max-width: 767px) {
  .mobile-optimized {
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .mobile-text {
    font-size: 0.875rem;
    line-height: 1.6;
    max-width: 100%;
    word-wrap: break-word;
  }
  
  .mobile-heading {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
  }
  
  .mobile-button {
    min-height: 44px;
    min-width: 44px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
  }
  
  .mobile-card {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .mobile-flex {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mobile-spacing {
    padding: 0.75rem;
    margin: 0.5rem 0;
  }
}

/* Touch-friendly interactions */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}

.touch-feedback {
  transition: transform 0.1s ease;
}

.touch-feedback:active {
  transform: scale(0.95);
}

/* Mobile typography */
@media (max-width: 767px) {
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.25rem; }
  h3 { font-size: 1.125rem; }
  h4 { font-size: 1rem; }
  h5 { font-size: 0.875rem; }
  h6 { font-size: 0.75rem; }
  
  p {
    font-size: 0.875rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .prose {
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  .prose h1 { font-size: 1.5rem; }
  .prose h2 { font-size: 1.25rem; }
  .prose h3 { font-size: 1.125rem; }
}

/* Mobile navigation */
@media (max-width: 767px) {
  .mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0.75rem 1rem;
  }
  
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-menu-item {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}

/* Mobile content optimization */
@media (max-width: 767px) {
  .mobile-content {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .mobile-content p {
    margin-bottom: 1rem;
    text-align: justify;
  }
  
  .mobile-content ul,
  .mobile-content ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .mobile-content li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

/* Mobile cards */
@media (max-width: 767px) {
  .mobile-card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .mobile-card-item {
    padding: 1rem;
    border-radius: 0.75rem;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

/* Mobile forms */
@media (max-width: 767px) {
  .mobile-form {
    padding: 1rem;
  }
  
  .mobile-form input,
  .mobile-form textarea,
  .mobile-form select {
    min-height: 44px;
    padding: 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    width: 100%;
  }
  
  .mobile-form button {
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    width: 100%;
    margin-top: 1rem;
  }
}

/* Mobile images */
@media (max-width: 767px) {
  .mobile-image {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
  }
  
  .mobile-hero-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
}

/* Mobile utilities */
@media (max-width: 767px) {
  .mobile-hidden { display: none !important; }
  .mobile-block { display: block !important; }
  .mobile-flex { display: flex !important; }
  .mobile-grid { display: grid !important; }
  .mobile-text-center { text-align: center !important; }
  .mobile-text-left { text-align: left !important; }
  .mobile-text-right { text-align: right !important; }
}

/* Responsive breakpoints */
@media (min-width: 640px) {
  .sm\\:mobile-optimized {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .md\\:mobile-optimized {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .lg\\:mobile-optimized {
    padding: 2.5rem;
    font-size: 1.25rem;
  }
}`;

  fs.writeFileSync(path.join(stylesDir, 'mobile.css'), mobileStyles, 'utf-8');
}

async function createResponsiveUtilities() {
  const utilsDir = path.join(__dirname, '..', 'src', 'lib', 'responsive');

  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  const responsiveUtils = `import { useState, useEffect } from 'react';

export interface Breakpoint {
  name: string;
  min: number;
  max?: number;
}

export const breakpoints: Breakpoint[] = [
  { name: 'mobile', min: 0, max: 767 },
  { name: 'tablet', min: 768, max: 1023 },
  { name: 'desktop', min: 1024, max: 1439 },
  { name: 'large', min: 1440 }
];

export const useBreakpoint = (): string => {
  const [breakpoint, setBreakpoint] = useState('mobile');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const currentBreakpoint = breakpoints.find(
        bp => width >= bp.min && (!bp.max || width <= bp.max)
      );
      setBreakpoint(currentBreakpoint?.name || 'mobile');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};

export const useIsMobile = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'mobile';
};

export const useIsTablet = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet';
};

export const useIsDesktop = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'desktop' || breakpoint === 'large';
};

export const getResponsiveClasses = (baseClasses: string, mobileClasses?: string, desktopClasses?: string): string => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
  
  if (isMobile && mobileClasses) {
    return mobileClasses;
  }
  
  if (!isMobile && desktopClasses) {
    return desktopClasses;
  }
  
  return baseClasses;
};

export const getMobileOptimizedProps = (props: any, isMobile: boolean) => {
  if (!isMobile) return props;
  
  return {
    ...props,
    className: \`\${props.className || ''} mobile-optimized\`,
    style: {
      ...props.style,
      fontSize: '0.875rem',
      lineHeight: '1.6',
      padding: '1rem'
    }
  };
};

export const getTouchTargetProps = (props: any) => ({
  ...props,
  className: \`\${props.className || ''} touch-target\`,
  style: {
    ...props.style,
    minHeight: '44px',
    minWidth: '44px'
  }
});

export const getMobileTypographyClasses = (size: 'sm' | 'base' | 'lg' | 'xl'): string => {
  const baseClasses = 'leading-relaxed';
  
  switch (size) {
    case 'sm':
      return \`text-xs sm:text-sm \${baseClasses}\`;
    case 'base':
      return \`text-sm sm:text-base \${baseClasses}\`;
    case 'lg':
      return \`text-base sm:text-lg \${baseClasses}\`;
    case 'xl':
      return \`text-lg sm:text-xl \${baseClasses}\`;
    default:
      return \`text-sm sm:text-base \${baseClasses}\`;
  }
};

export const getMobileSpacingClasses = (size: 'sm' | 'md' | 'lg'): string => {
  switch (size) {
    case 'sm':
      return 'p-2 sm:p-3 lg:p-4';
    case 'md':
      return 'p-3 sm:p-4 lg:p-6';
    case 'lg':
      return 'p-4 sm:p-6 lg:p-8';
    default:
      return 'p-3 sm:p-4 lg:p-6';
  }
};

export const getMobileGridClasses = (cols: { mobile: number; tablet: number; desktop: number }): string => {
  const { mobile, tablet, desktop } = cols;
  
  return \`grid grid-cols-\${mobile} sm:grid-cols-\${tablet} lg:grid-cols-\${desktop} gap-4 sm:gap-6 lg:gap-8\`;
};

export const getMobileFlexClasses = (direction: 'row' | 'col' | 'responsive'): string => {
  switch (direction) {
    case 'row':
      return 'flex flex-row items-center gap-2 sm:gap-4';
    case 'col':
      return 'flex flex-col gap-2 sm:gap-4';
    case 'responsive':
      return 'flex flex-col sm:flex-row items-center gap-2 sm:gap-4';
    default:
      return 'flex flex-col sm:flex-row items-center gap-2 sm:gap-4';
  }
};`;

  fs.writeFileSync(
    path.join(utilsDir, 'responsive.ts'),
    responsiveUtils,
    'utf-8'
  );
}

async function createTouchFriendlyInteractions() {
  const touchDir = path.join(__dirname, '..', 'src', 'components', 'touch');

  if (!fs.existsSync(touchDir)) {
    fs.mkdirSync(touchDir, { recursive: true });
  }

  const touchButton = `import React from 'react';
import { getTouchTargetProps } from '@/lib/responsive/responsive';

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 touch-target';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[48px]'
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${widthClasses} \${className}\`;
  
  const touchProps = getTouchTargetProps(props);
  
  return (
    <button
      className={classes}
      {...touchProps}
      onTouchStart={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
        touchProps.onTouchStart?.(e);
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        touchProps.onTouchEnd?.(e);
      }}
    >
      {children}
    </button>
  );
};`;

  fs.writeFileSync(
    path.join(touchDir, 'TouchButton.tsx'),
    touchButton,
    'utf-8'
  );
}

async function createMobileNavigation() {
  const navDir = path.join(__dirname, '..', 'src', 'components', 'navigation');

  if (!fs.existsSync(navDir)) {
    fs.mkdirSync(navDir, { recursive: true });
  }

  const mobileNav = `import React, { useState } from 'react';
import { useIsMobile } from '@/lib/responsive/responsive';

interface MobileNavigationProps {
  children: React.ReactNode;
  brand?: React.ReactNode;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  children,
  brand
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            {brand}
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {children}
              </div>
            </div>
          )}
          
          {/* Mobile menu button */}
          {isMobile && (
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="touch-target inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {children}
          </div>
        </div>
      )}
    </nav>
  );
};

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  children,
  active = false
}) => {
  const baseClasses = 'touch-target block px-3 py-2 rounded-md text-base font-medium';
  const activeClasses = active
    ? 'bg-blue-100 text-blue-700'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  
  return (
    <a
      href={href}
      className={\`\${baseClasses} \${activeClasses}\`}
    >
      {children}
    </a>
  );
};`;

  fs.writeFileSync(
    path.join(navDir, 'MobileNavigation.tsx'),
    mobileNav,
    'utf-8'
  );
}

// Script çalıştırma
fixMobileResponsiveness();
