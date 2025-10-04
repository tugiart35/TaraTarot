#!/usr/bin/env node

/**
 * Fix Critical Accessibility Issues Script
 *
 * Bu script, accessibility audit'te tespit edilen kritik sorunları otomatik olarak çözer.
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

async function fixCriticalAccessibilityIssues() {
  console.log('♿ Critical Accessibility issues düzeltiliyor...');

  try {
    // Component dosyalarını listele
    const componentFiles = [
      'TarotCardPage.tsx',
      'TarotCardHero.tsx',
      'TarotCardContent.tsx',
      'TarotCardCTA.tsx',
      'TarotCardFAQ.tsx',
      'TarotCardRelated.tsx',
      'TarotCardBreadcrumb.tsx',
      'TarotCardStructuredData.tsx',
      'TarotCardsPage.tsx',
    ];

    let fixedComponents = 0;

    // Her component'i düzelt
    for (const componentFile of componentFiles) {
      const filePath = path.join(COMPONENTS_DIR, componentFile);

      if (fs.existsSync(filePath)) {
        const fixed = await fixComponentAccessibility(filePath);
        if (fixed) {
          fixedComponents++;
          console.log(`✅ ${componentFile}: Accessibility issues düzeltildi`);
        }
      }
    }

    console.log(
      `✅ ${fixedComponents} component accessibility issues düzeltildi`
    );
    console.log('🎉 Critical Accessibility issues düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function fixComponentAccessibility(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. Alt text ekle
    if (content.includes('<Image') && !content.includes('alt=')) {
      content = addAltTextToImages(content);
      modified = true;
    }

    // 2. ARIA labels ekle
    content = addAriaLabels(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 3. Focus indicators ekle
    content = addFocusIndicators(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 4. Semantic HTML düzelt
    content = fixSemanticHTML(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 5. Keyboard navigation ekle
    content = addKeyboardNavigation(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 6. Touch target sizes düzelt
    content = fixTouchTargetSizes(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    // 7. Color contrast düzelt
    content = fixColorContrast(content);
    if (content !== fs.readFileSync(filePath, 'utf-8')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }

    return modified;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function addAltTextToImages(content) {
  // Image component'lerine alt text ekle
  return content.replace(
    /<Image([^>]*?)src="([^"]*?)"([^>]*?)>/g,
    (match, before, src, after) => {
      // Eğer zaten alt varsa, dokunma
      if (match.includes('alt=')) {
        return match;
      }

      // Alt text oluştur
      const altText = generateAltText(src);
      return `<Image${before}src="${src}" alt="${altText}"${after}>`;
    }
  );
}

function generateAltText(src) {
  // src'den alt text oluştur
  const filename = src.split('/').pop().replace('.jpg', '').replace('.png', '');
  const cardName = filename
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  return `Tarot card: ${cardName}`;
}

function addAriaLabels(content) {
  let modified = content;

  // Button'lara aria-label ekle
  modified = modified.replace(
    /<button([^>]*?)>([^<]*?)<\/button>/g,
    (match, attrs, text) => {
      if (attrs.includes('aria-label')) {
        return match;
      }

      const ariaLabel = text.trim() || 'Button';
      return `<button${attrs} aria-label="${ariaLabel}">${text}</button>`;
    }
  );

  // Link'lere aria-label ekle
  modified = modified.replace(
    /<Link([^>]*?)href="([^"]*?)"([^>]*?)>([^<]*?)<\/Link>/g,
    (match, before, href, after, text) => {
      if (after.includes('aria-label')) {
        return match;
      }

      const ariaLabel = text.trim() || 'Link';
      return `<Link${before}href="${href}"${after} aria-label="${ariaLabel}">${text}</Link>`;
    }
  );

  // Input'lara aria-label ekle
  modified = modified.replace(
    /<input([^>]*?)type="([^"]*?)"([^>]*?)>/g,
    (match, before, type, after) => {
      if (after.includes('aria-label') || after.includes('placeholder=')) {
        return match;
      }

      const ariaLabel = type === 'email' ? 'Email address' : 'Input field';
      return `<input${before}type="${type}"${after} aria-label="${ariaLabel}">`;
    }
  );

  return modified;
}

function addFocusIndicators(content) {
  let modified = content;

  // Focus-visible class'ları ekle
  const focusClasses = [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-purple-500',
    'focus:ring-offset-2',
  ];

  // Button'lara focus indicators ekle
  modified = modified.replace(/className="([^"]*?)"/g, (match, classes) => {
    if (classes.includes('focus:')) {
      return match;
    }

    // Eğer button, link veya input ise focus indicators ekle
    const context = getElementContext(content, match);
    if (context === 'button' || context === 'link' || context === 'input') {
      const newClasses = `${classes} ${focusClasses.join(' ')}`;
      return `className="${newClasses}"`;
    }

    return match;
  });

  return modified;
}

function getElementContext(content, match) {
  const matchIndex = content.indexOf(match);
  const beforeMatch = content.substring(
    Math.max(0, matchIndex - 200),
    matchIndex
  );

  if (beforeMatch.includes('<button')) return 'button';
  if (beforeMatch.includes('<Link')) return 'link';
  if (beforeMatch.includes('<input')) return 'input';

  return 'unknown';
}

function fixSemanticHTML(content) {
  let modified = content;

  // Div'leri semantic elementlerle değiştir
  modified = modified.replace(
    /<div className="([^"]*?)" role="button"([^>]*?)>/g,
    '<button className="$1"$2>'
  );

  modified = modified.replace(
    /<\/div>(\s*<!-- button end -->)/g,
    '</button>$1'
  );

  // Navigation için nav element kullan
  modified = modified.replace(
    /<div className="([^"]*?)" role="navigation"([^>]*?)>/g,
    '<nav className="$1"$2>'
  );

  modified = modified.replace(
    /<\/div>(\s*<!-- navigation end -->)/g,
    '</nav>$1'
  );

  // Main content için main element kullan
  modified = modified.replace(
    /<div className="([^"]*?)" role="main"([^>]*?)>/g,
    '<main className="$1"$2>'
  );

  modified = modified.replace(/<\/div>(\s*<!-- main end -->)/g, '</main>$1');

  return modified;
}

function addKeyboardNavigation(content) {
  let modified = content;

  // Tab navigation için keyboard event handlers ekle
  modified = modified.replace(/onClick=\{([^}]*?)\}/g, (match, handler) => {
    return `${match} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ${handler}(); } }}`;
  });

  // Accordion için keyboard navigation ekle
  if (content.includes('accordion') || content.includes('FAQ')) {
    modified = modified.replace(
      /<button([^>]*?)onClick=\{([^}]*?)\}([^>]*?)>/g,
      (match, before, onClick, after) => {
        return `<button${before}onClick={${onClick}} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ${onClick}(); } }}${after}>`;
      }
    );
  }

  return modified;
}

function fixTouchTargetSizes(content) {
  let modified = content;

  // Touch target'ları 44px minimum yap
  modified = modified.replace(/className="([^"]*?)"/g, (match, classes) => {
    if (
      classes.includes('p-') &&
      !classes.includes('min-h-[44px]') &&
      !classes.includes('min-h-11')
    ) {
      // Eğer padding varsa ve minimum height yoksa ekle
      const context = getElementContext(content, match);
      if (context === 'button' || context === 'link') {
        const newClasses = `${classes} min-h-[44px] min-w-[44px]`;
        return `className="${newClasses}"`;
      }
    }

    return match;
  });

  return modified;
}

function fixColorContrast(content) {
  let modified = content;

  // Düşük contrast renkleri yüksek contrast ile değiştir
  const contrastFixes = [
    { from: 'text-gray-400', to: 'text-gray-600' },
    { from: 'text-gray-300', to: 'text-gray-700' },
    { from: 'bg-gray-100', to: 'bg-gray-200' },
    { from: 'text-purple-200', to: 'text-purple-800' },
    { from: 'text-pink-100', to: 'text-pink-800' },
  ];

  contrastFixes.forEach(fix => {
    const regex = new RegExp(fix.from, 'g');
    modified = modified.replace(regex, fix.to);
  });

  return modified;
}

// Script çalıştırma
fixCriticalAccessibilityIssues();
