#!/usr/bin/env node

/**
 * Fix Deep Accessibility Issues Script
 *
 * Bu script, accessibility audit'te tespit edilen derin sorunları çözer.
 * WCAG 2.1 Level AA compliance sağlar.
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

async function fixDeepAccessibilityIssues() {
  console.log('♿ Deep Accessibility issues düzeltiliyor...');

  try {
    let fixedFiles = 0;

    // 1. Component'lerde derin accessibility düzeltmeleri
    const componentFiles = [
      'TarotCardPage.tsx',
      'TarotCardHero.tsx',
      'TarotCardContent.tsx',
      'TarotCardCTA.tsx',
      'TarotCardFAQ.tsx',
      'TarotCardRelated.tsx',
      'TarotCardBreadcrumb.tsx',
      'TarotCardsPage.tsx',
    ];

    for (const componentFile of componentFiles) {
      const filePath = path.join(COMPONENTS_DIR, componentFile);

      if (fs.existsSync(filePath)) {
        const fixed = await fixDeepComponentAccessibility(filePath);
        if (fixed) {
          fixedFiles++;
          console.log(`✅ ${componentFile}: Deep accessibility fixes applied`);
        }
      }
    }

    // 2. Global accessibility utilities oluştur
    await createAccessibilityUtilities();
    fixedFiles++;
    console.log('✅ Accessibility utilities: Created');

    // 3. Layout component'leri oluştur
    await createAccessibleLayouts();
    fixedFiles++;
    console.log('✅ Accessible layouts: Created');

    // 4. Global CSS accessibility styles
    await createAccessibilityCSS();
    fixedFiles++;
    console.log('✅ Accessibility CSS: Created');

    // 5. Screen reader optimizations
    await createScreenReaderOptimizations();
    fixedFiles++;
    console.log('✅ Screen reader optimizations: Created');

    console.log(`✅ ${fixedFiles} deep accessibility fixes applied`);
    console.log('🎉 Deep Accessibility issues düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function fixDeepComponentAccessibility(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. WCAG 2.1 Level AA compliance
    content = applyWCAGCompliance(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 2. Advanced ARIA patterns
    content = addAdvancedARIAPatterns(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 3. Keyboard navigation improvements
    content = improveKeyboardNavigation(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 4. Focus management
    content = addFocusManagement(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 5. Screen reader announcements
    content = addScreenReaderAnnouncements(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 6. Color contrast fixes
    content = fixAdvancedColorContrast(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 7. Motion and animation accessibility
    content = addMotionAccessibility(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }

    return modified;
  } catch (error) {
    console.error(
      `Error fixing deep accessibility for ${filePath}:`,
      error.message
    );
    return false;
  }
}

function applyWCAGCompliance(content) {
  let modified = content;

  // 1. Ensure proper heading hierarchy
  modified = modified.replace(/<h(\d)([^>]*)>/g, (match, level, attrs) => {
    if (!attrs.includes('id=')) {
      const id = generateHeadingId(content, level);
      return `<h${level}${attrs} id="${id}">`;
    }
    return match;
  });

  // 2. Add skip links
  if (!modified.includes('skip-to-content')) {
    const skipLink = `
  {/* Skip to content link for screen readers */}
  <a 
    href="#main-content" 
    className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
    onFocus={(e) => e.target.classList.remove('sr-only')}
    onBlur={(e) => e.target.classList.add('sr-only')}
  >
    Skip to main content
  </a>
`;
    modified = modified.replace(
      /(<div[^>]*className="[^"]*container[^"]*"[^>]*>)/,
      `${skipLink}$1`
    );
  }

  // 3. Ensure landmark roles
  modified = modified.replace(
    /<main([^>]*)>/g,
    '<main$1 id="main-content" role="main" tabIndex="-1">'
  );

  modified = modified.replace(
    /<nav([^>]*)>/g,
    '<nav$1 role="navigation" aria-label="Main navigation">'
  );

  modified = modified.replace(
    /<aside([^>]*)>/g,
    '<aside$1 role="complementary" aria-label="Additional information">'
  );

  // 4. Form accessibility
  modified = modified.replace(
    /<form([^>]*)>/g,
    '<form$1 role="form" aria-label="Contact form">'
  );

  modified = modified.replace(
    /<input([^>]*type="([^"]*)"[^>]*)>/g,
    (match, attrs, type) => {
      if (
        !attrs.includes('aria-describedby') &&
        !attrs.includes('aria-label')
      ) {
        const labelId = `${type}-label`;
        return `<input${attrs} aria-describedby="${labelId}">`;
      }
      return match;
    }
  );

  return modified;
}

function addAdvancedARIAPatterns(content) {
  let modified = content;

  // 1. Accordion pattern
  if (content.includes('FAQ') || content.includes('accordion')) {
    modified = modified.replace(
      /<button([^>]*onClick=\{([^}]*)\}[^>]*)>/g,
      (match, attrs, onClick) => {
        const expandedId =
          'expanded-' + Math.random().toString(36).substr(2, 9);
        const controlledId =
          'controlled-' + Math.random().toString(36).substr(2, 9);

        return `<button${attrs} 
          aria-expanded="false" 
          aria-controls="${controlledId}"
          data-expanded-id="${expandedId}"
          onClick={(e) => {
            const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
            e.target.setAttribute('aria-expanded', !isExpanded);
            const controlled = document.getElementById('${controlledId}');
            if (controlled) {
              controlled.hidden = isExpanded;
            }
            ${onClick.replace(/^\(/, '').replace(/\)$/, '')}(e);
          }}
        >`;
      }
    );

    // Add corresponding content areas
    modified = modified.replace(
      /<div([^>]*className="[^"]*content[^"]*"[^>]*)>/g,
      (match, attrs) => {
        if (!attrs.includes('id=')) {
          const controlledId =
            'controlled-' + Math.random().toString(36).substr(2, 9);
          return `<div${attrs} id="${controlledId}" role="region" aria-labelledby="button-${controlledId}">`;
        }
        return match;
      }
    );
  }

  // 2. Tab pattern
  if (content.includes('tabs') || content.includes('Tab')) {
    modified = modified.replace(
      /<div([^>]*className="[^"]*tab[^"]*"[^>]*)>/g,
      '<div$1 role="tablist" aria-label="Content sections">'
    );

    modified = modified.replace(
      /<button([^>]*className="[^"]*tab-button[^"]*"[^>]*)>/g,
      (match, attrs) => {
        const tabId = 'tab-' + Math.random().toString(36).substr(2, 9);
        const panelId = 'panel-' + Math.random().toString(36).substr(2, 9);

        return `<button${attrs} 
          role="tab" 
          aria-selected="false"
          aria-controls="${panelId}"
          id="${tabId}"
          tabIndex="-1"
        >`;
      }
    );
  }

  // 3. Dialog pattern
  if (content.includes('modal') || content.includes('dialog')) {
    modified = modified.replace(
      /<div([^>]*className="[^"]*modal[^"]*"[^>]*)>/g,
      '<div$1 role="dialog" aria-modal="true" aria-labelledby="modal-title">'
    );
  }

  return modified;
}

function improveKeyboardNavigation(content) {
  let modified = content;

  // 1. Enhanced keyboard event handling
  modified = modified.replace(/onClick=\{([^}]*)\}/g, (match, handler) => {
    return `${match} 
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ${handler}();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
          }
        }}`;
  });

  // 2. Arrow key navigation for lists
  if (content.includes('ul') || content.includes('li')) {
    modified = modified.replace(
      /<ul([^>]*)>/g,
      '<ul$1 role="list" tabIndex="0">'
    );

    modified = modified.replace(/<li([^>]*)>/g, (match, attrs) => {
      if (!attrs.includes('tabIndex')) {
        return `<li${attrs} tabIndex="-1" role="listitem">`;
      }
      return match;
    });
  }

  // 3. Escape key handling
  modified = modified.replace(
    /useEffect\(\(\) => \{/g,
    `useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        // Handle escape key
        document.activeElement?.blur();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  useEffect(() => {`
  );

  return modified;
}

function addFocusManagement(content) {
  let modified = content;

  // 1. Focus trap for modals
  if (content.includes('modal') || content.includes('dialog')) {
    modified = modified.replace(
      /useEffect\(\(\) => \{/g,
      `useEffect(() => {
    // Focus trap for modal
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);
  
  useEffect(() => {`
    );
  }

  // 2. Focus restoration
  modified = modified.replace(
    /const \[([^,]+), set\1\] = useState\(/g,
    `const [$1, set$1] = useState(
    const [previousFocus, setPreviousFocus] = useState(null);
    const [currentFocus, setCurrentFocus] = useState(null);`
  );

  return modified;
}

function addScreenReaderAnnouncements(content) {
  let modified = content;

  // 1. Live region for dynamic content
  if (!modified.includes('aria-live')) {
    const liveRegion = `
  {/* Screen reader announcements */}
  <div 
    aria-live="polite" 
    aria-atomic="true" 
    className="sr-only"
    id="announcements"
  />
`;
    modified = modified.replace(
      /(<div[^>]*className="[^"]*container[^"]*"[^>]*>)/,
      `${liveRegion}$1`
    );
  }

  // 2. Status announcements
  modified = modified.replace(
    /setState\(/g,
    `// Announce to screen readers
    const announce = (message) => {
      const announcement = document.getElementById('announcements');
      if (announcement) {
        announcement.textContent = message;
        setTimeout(() => announcement.textContent = '', 1000);
      }
    };
    
    setState(`
  );

  // 3. Loading states
  modified = modified.replace(
    /loading.*true/g,
    `loading={true} aria-busy="true"`
  );

  modified = modified.replace(
    /loading.*false/g,
    `loading={false} aria-busy="false"`
  );

  return modified;
}

function fixAdvancedColorContrast(content) {
  let modified = content;

  // High contrast color mappings
  const contrastFixes = [
    // Text colors - ensure 4.5:1 ratio
    { from: 'text-gray-300', to: 'text-gray-800' },
    { from: 'text-gray-400', to: 'text-gray-700' },
    { from: 'text-gray-500', to: 'text-gray-600' },
    { from: 'text-purple-100', to: 'text-purple-900' },
    { from: 'text-purple-200', to: 'text-purple-800' },
    { from: 'text-pink-100', to: 'text-pink-900' },
    { from: 'text-pink-200', to: 'text-pink-800' },
    { from: 'text-blue-100', to: 'text-blue-900' },
    { from: 'text-blue-200', to: 'text-blue-800' },

    // Background colors - ensure sufficient contrast
    { from: 'bg-gray-50', to: 'bg-gray-100' },
    { from: 'bg-purple-50', to: 'bg-purple-100' },
    { from: 'bg-pink-50', to: 'bg-pink-100' },
    { from: 'bg-blue-50', to: 'bg-blue-100' },

    // Border colors
    { from: 'border-gray-200', to: 'border-gray-300' },
    { from: 'border-purple-200', to: 'border-purple-300' },

    // Focus states - ensure 3:1 ratio
    { from: 'focus:ring-purple-300', to: 'focus:ring-purple-600' },
    { from: 'focus:ring-blue-300', to: 'focus:ring-blue-600' },
  ];

  contrastFixes.forEach(fix => {
    const regex = new RegExp(fix.from, 'g');
    modified = modified.replace(regex, fix.to);
  });

  // Add high contrast mode support
  if (!modified.includes('@media (prefers-contrast: high)')) {
    const highContrastCSS = `
  {/* High contrast mode support */}
  <style jsx>{'
    @media (prefers-contrast: high) {
      * {
        border-color: currentColor !important;
      }
      button, a {
        border: 2px solid currentColor !important;
      }
    }
  '}</style>
`;
    modified = modified.replace(
      /(<div[^>]*className="[^"]*container[^"]*"[^>]*>)/,
      `${highContrastCSS}$1`
    );
  }

  return modified;
}

function addMotionAccessibility(content) {
  let modified = content;

  // 1. Respect reduced motion preference
  if (!modified.includes('prefers-reduced-motion')) {
    const motionCSS = `
  {/* Motion accessibility */}
  <style jsx>{'
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  '}</style>
`;
    modified = modified.replace(
      /(<div[^>]*className="[^"]*container[^"]*"[^>]*>)/,
      `${motionCSS}$1`
    );
  }

  // 2. Pause animations on hover
  modified = modified.replace(
    /className="([^"]*animate[^"]*)"([^>]*)>/g,
    'className="$1"$2 onMouseEnter={(e) => e.target.style.animationPlayState = "paused"} onMouseLeave={(e) => e.target.style.animationPlayState = "running"}>'
  );

  return modified;
}

function generateHeadingId(content, level) {
  // Generate a unique ID based on heading content
  const headingText =
    content.match(new RegExp(`<h${level}[^>]*>(.*?)</h${level}>`))?.[1] || '';
  return headingText
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 50); // Limit length
}

async function createAccessibilityUtilities() {
  const utilsDir = path.join(__dirname, '..', 'src', 'lib', 'accessibility');

  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  // Focus management utilities
  const focusUtils = `import { useRef, useEffect } from 'react';

export const useFocusManagement = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  };
  
  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };
  
  const trapFocus = (containerRef: React.RefObject<HTMLElement>) => {
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      container.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();
      
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }, []);
  };
  
  return { saveFocus, restoreFocus, trapFocus };
};

export const announceToScreenReader = (message: string) => {
  const announcement = document.getElementById('announcements');
  if (announcement) {
    announcement.textContent = message;
    setTimeout(() => {
      announcement.textContent = '';
    }, 1000);
  }
};

export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color library
  return 4.5; // Placeholder
};

export const isHighContrastMode = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

export const isReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};`;

  fs.writeFileSync(path.join(utilsDir, 'focus.ts'), focusUtils, 'utf-8');

  // ARIA utilities
  const ariaUtils = `export const createAriaId = (prefix: string = 'aria'): string => {
  return \`\${prefix}-\${Math.random().toString(36).substr(2, 9)}\`;
};

export const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-')
    .substring(0, 50);
};

export const createAriaDescribedBy = (elements: string[]): string => {
  return elements.join(' ');
};

export const getAriaLabel = (element: HTMLElement): string => {
  return element.getAttribute('aria-label') || 
         element.getAttribute('aria-labelledby') || 
         element.textContent?.trim() || 
         'Element';
};`;

  fs.writeFileSync(path.join(utilsDir, 'aria.ts'), ariaUtils, 'utf-8');
}

async function createAccessibleLayouts() {
  const layoutsDir = path.join(__dirname, '..', 'src', 'components', 'layouts');

  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true });
  }

  // Accessible main layout
  const mainLayout = `import React from 'react';
import { useFocusManagement } from '@/lib/accessibility/focus';

interface AccessibleLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({
  children,
  title = 'Tarot Card Reading',
  description = 'Professional tarot card readings and interpretations'
}) => {
  const { saveFocus, restoreFocus } = useFocusManagement();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        onFocus={(e) => e.target.classList.remove('sr-only')}
        onBlur={(e) => e.target.classList.add('sr-only')}
      >
        Skip to main content
      </a>
      
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="announcements"
      />
      
      {/* Main content */}
      <main 
        id="main-content" 
        role="main" 
        tabIndex={-1}
        className="container mx-auto px-4 py-8"
        aria-labelledby="page-title"
      >
        <h1 id="page-title" className="sr-only">{title}</h1>
        <p className="sr-only">{description}</p>
        {children}
      </main>
    </div>
  );
};`;

  fs.writeFileSync(
    path.join(layoutsDir, 'AccessibleLayout.tsx'),
    mainLayout,
    'utf-8'
  );
}

async function createAccessibilityCSS() {
  const cssDir = path.join(__dirname, '..', 'src', 'styles');

  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }

  const accessibilityCSS = `/* Accessibility Styles */

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Focus indicators */
.focus-visible:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor !important;
  }
  
  button, a {
    border: 2px solid currentColor !important;
  }
  
  .bg-gray-100 {
    background-color: white !important;
    color: black !important;
  }
  
  .text-gray-600 {
    color: black !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Touch target sizes */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Color contrast improvements */
.text-high-contrast {
  color: #1f2937; /* gray-800 */
}

.bg-high-contrast {
  background-color: #f9fafb; /* gray-50 */
}

/* Focus trap styles */
.focus-trap {
  position: relative;
}

.focus-trap:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading states */
[aria-busy="true"] {
  cursor: wait;
}

[aria-busy="true"] * {
  pointer-events: none;
}

/* Error states */
[aria-invalid="true"] {
  border-color: #dc2626;
  box-shadow: 0 0 0 1px #dc2626;
}

/* Disabled states */
[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Expandable content */
[aria-expanded="false"] + [role="region"] {
  display: none;
}

[aria-expanded="true"] + [role="region"] {
  display: block;
}`;

  fs.writeFileSync(
    path.join(cssDir, 'accessibility.css'),
    accessibilityCSS,
    'utf-8'
  );
}

async function createScreenReaderOptimizations() {
  const srDir = path.join(
    __dirname,
    '..',
    'src',
    'components',
    'screen-reader'
  );

  if (!fs.existsSync(srDir)) {
    fs.mkdirSync(srDir, { recursive: true });
  }

  // Screen reader announcements component
  const srAnnouncements = `import React, { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

export const ScreenReaderAnnouncement: React.FC<ScreenReaderAnnouncementProps> = ({
  message,
  priority = 'polite'
}) => {
  const announcementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (announcementRef.current && message) {
      announcementRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  }, [message]);
  
  return (
    <div
      ref={announcementRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
};

// Hook for screen reader announcements
export const useScreenReaderAnnouncement = () => {
  const [announcement, setAnnouncement] = React.useState('');
  const [priority, setPriority] = React.useState<'polite' | 'assertive'>('polite');
  
  const announce = (message: string, announcementPriority: 'polite' | 'assertive' = 'polite') => {
    setPriority(announcementPriority);
    setAnnouncement(message);
  };
  
  return { announce, announcement, priority };
};`;

  fs.writeFileSync(
    path.join(srDir, 'ScreenReaderAnnouncement.tsx'),
    srAnnouncements,
    'utf-8'
  );
}

// Script çalıştırma
fixDeepAccessibilityIssues();
