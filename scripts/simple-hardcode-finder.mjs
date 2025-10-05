#!/usr/bin/env node

/**
 * Basit Hardcode String Bulucu
 * 
 * Bu script sadece hardcode stringleri bulur ve raporlar
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Basit pattern'ler
const PATTERNS = [
  // JSX içinde Türkçe metinler
  />([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{2,})</g,
  // String literal'lar
  /['"`]([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{3,})['"`]/g,
];

const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build', '__tests__'];
const EXCLUDE_PATTERNS = [/\.test\./, /\.spec\./, /\.stories\./, /node_modules/, /\.next/, /\.git/];
const ALLOWED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Basit whitelist
const WHITELIST = [
  'className', 'id', 'data-', 'aria-', 'http', 'https', 'www', '@',
  'src', 'href', 'key', 'ref', 'style', 'onClick', 'onChange', 'type', 'name', 'value',
  'title', 'description', 'keywords', 'canonical', 'locale', 'type', 'card',
  'slug', 'locale', 'path', 'route', 'url',
  'api', 'endpoint', 'method', 'status', 'error', 'success',
  'Component', 'Props', 'State', 'Hook', 'Provider',
  /^\d+$/, /^[a-zA-Z]$/, '', /^[a-z-]+$/, /^<[^>]+>$/, /^.{1,2}$/,
];

function isHardcodedString(str) {
  if (!str || typeof str !== 'string') return false;
  if (str.trim().length < 3) return false;
  if (str.includes('t(') || str.includes('useTranslations')) return false;

  for (const whitelistItem of WHITELIST) {
    if (typeof whitelistItem === 'string') {
      if (str.includes(whitelistItem)) return false;
    } else if (whitelistItem instanceof RegExp) {
      if (whitelistItem.test(str)) return false;
    }
  }

  return true;
}

function shouldCheckFile(filename) {
  const ext = extname(filename);
  return ALLOWED_EXTENSIONS.includes(ext);
}

function shouldExcludeDir(dirname) {
  return (
    EXCLUDE_DIRS.includes(dirname) ||
    EXCLUDE_PATTERNS.some(pattern => pattern.test(dirname))
  );
}

function directoryExists(dirPath) {
  try {
    const stat = statSync(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

async function checkDirectory(dirPath, results = []) {
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!shouldExcludeDir(item)) {
        await checkDirectory(fullPath, results);
      }
    } else if (stat.isFile()) {
      if (shouldCheckFile(item)) {
        await checkFile(fullPath, results);
      }
    }
  }

  return results;
}

async function checkFile(filePath, results) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const hardcodedStrings = [];

    for (const pattern of PATTERNS) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const string = (match[1] || match[0]).trim();

        if (isHardcodedString(string)) {
          hardcodedStrings.push({
            string,
            line: getLineNumber(content, match.index),
          });
        }
        
        // Global flag'i reset et
        if (!pattern.global) break;
      }
    }

    if (hardcodedStrings.length > 0) {
      results.push({
        file: filePath,
        strings: hardcodedStrings,
      });
    }
  } catch (error) {
    console.log(`Dosya okuma hatası: ${filePath}`);
  }
}

// Ana fonksiyon
async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 Basit Hardcode String Bulucu');
  console.log('='.repeat(80) + '\n');

  const results = [];
  
  // Sadece src/app dizinini kontrol et
  await checkDirectory('src/app', results);

  console.log(`📁 Kontrol edilen dosya sayısı: ${results.length}`);
  console.log('='.repeat(80) + '\n');

  if (results.length > 0) {
    console.log('🔍 Bulunan Hardcode Stringler:\n');

    for (const { file, strings } of results) {
      console.log(`📄 ${file}:`);
      for (const { string, line } of strings.slice(0, 5)) {
        console.log(`   Satır ${line}: "${string}"`);
      }
      if (strings.length > 5) {
        console.log(`   ... ve ${strings.length - 5} tane daha`);
      }
      console.log('');
    }
  } else {
    console.log('✅ Hardcode string bulunamadı!');
  }
}

main().catch(error => {
  console.error('❌ Hata:', error);
  process.exit(1);
});
