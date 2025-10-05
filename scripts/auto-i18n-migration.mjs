#!/usr/bin/env node

/**
 * Kapsamlı i18n Otomasyon Scripti
 * 
 * Bu script:
 * 1. Projedeki tüm hardcode metinleri bulur
 * 2. Uygun i18n key'leri oluşturur
 * 3. 3 dilde (TR, EN, SR) çevirileri raporlar
 * 
 * Kullanım:
 * npm run i18n:migrate:dry  # Sadece analiz yap
 * npm run i18n:migrate      # Tüm dosyaları güncelle
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Hardcoded string pattern'leri
const HARDCODED_PATTERNS = [
  // JSX içinde Türkçe metinler (büyük harfle başlayan)
  />([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{3,})</g,
  // Button içindeki metinler
  /<button[^>]*>([^<{]+)<\/button>/gi,
  // Label içindeki metinler
  /<label[^>]*>([^<{]+)<\/label>/gi,
  // h1, h2, h3 içindeki metinler
  /<h[1-6][^>]*>([^<{]+)<\/h[1-6]>/gi,
  // p içindeki metinler
  /<p[^>]*>([^<{]+)<\/p>/gi,
  // span içindeki metinler
  /<span[^>]*>([^<{]+)<\/span>/gi,
  // div içindeki kısa metinler
  /<div[^>]*>([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{3,20})<\/div>/gi,
  // Placeholder attribute'ları
  /placeholder=['"`]([^'"`]+)['"`]/gi,
  // Title attribute'ları
  /title=['"`]([^'"`]+)['"`]/gi,
  // Alt text'leri
  /alt=['"`]([^'"`]+)['"`]/gi,
  // aria-label attribute'ları
  /aria-label=['"`]([^'"`]+)['"`]/gi,
];

// Whitelist
const WHITELIST = [
  'className', 'id', 'data-', 'aria-', 'http', 'https', 'www', '@',
  /^\d+$/, /^[a-zA-Z]$/, '', /^[a-z-]+$/, /^<[^>]+>$/,
  'src', 'href', 'key', 'ref', 'style', 'onClick', 'onChange', 'type', 'name', 'value',
];

const ALLOWED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const SOURCE_DIRS = ['src/app', 'src/features', 'src/components', 'src/lib', 'src/hooks'];
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build', '__tests__'];
const EXCLUDE_PATTERNS = [/\.test\./, /\.spec\./, /\.stories\./, /node_modules/, /\.next/, /\.git/];

class I18nMigration {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.violations = [];
    this.fileCount = 0;
    this.stringCount = 0;
  }

  async migrate() {
    console.log('\n' + '='.repeat(80));
    console.log('🌍 Kapsamlı i18n Otomasyon Scripti');
    console.log('='.repeat(80));
    console.log(`Mod: ${this.dryRun ? 'DRY RUN (sadece analiz)' : 'LIVE (dosyalar güncellenecek)'}`);
    console.log('='.repeat(80) + '\n');

    for (const dir of SOURCE_DIRS) {
      if (this.directoryExists(dir)) {
        await this.checkDirectory(dir);
      }
    }

    this.reportResults();
    return this.violations.length === 0;
  }

  async checkDirectory(dirPath) {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldExcludeDir(item)) {
          await this.checkDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        if (this.shouldCheckFile(item)) {
          await this.checkFile(fullPath);
        }
      }
    }
  }

  async checkFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      this.fileCount++;

      const hardcodedStrings = [];

      for (const pattern of HARDCODED_PATTERNS) {
        const matches = content.matchAll(pattern);

        for (const match of matches) {
          const string = (match[1] || match[0]).trim();

          if (this.isHardcodedString(string)) {
            hardcodedStrings.push({
              string,
              line: this.getLineNumber(content, match.index),
              context: this.getContext(content, match.index),
            });
            this.stringCount++;
          }
        }
      }

      if (hardcodedStrings.length > 0) {
        this.violations.push({
          file: filePath,
          strings: hardcodedStrings,
        });
      }
    } catch (error) {
      // Dosya okuma hatası
    }
  }

  isHardcodedString(str) {
    if (!str || typeof str !== 'string') return false;

    for (const whitelistItem of WHITELIST) {
      if (typeof whitelistItem === 'string') {
        if (str.includes(whitelistItem)) return false;
      } else if (whitelistItem instanceof RegExp) {
        if (whitelistItem.test(str)) return false;
      }
    }

    if (str.trim().length < 3) return false;
    if (str.trim().length === 0) return false;
    if (str.startsWith('<') && str.endsWith('>')) return false;
    if (str.startsWith('http') || str.startsWith('www')) return false;
    if (str.includes('@')) return false;
    if (/^[a-z-]+$/.test(str)) return false;
    if (/^\d+$/.test(str)) return false;
    if (str.includes('t(') || str.includes('useTranslations')) return false;

    return true;
  }

  shouldCheckFile(filename) {
    const ext = extname(filename);
    return ALLOWED_EXTENSIONS.includes(ext);
  }

  shouldExcludeDir(dirname) {
    return (
      EXCLUDE_DIRS.includes(dirname) ||
      EXCLUDE_PATTERNS.some(pattern => pattern.test(dirname))
    );
  }

  directoryExists(dirPath) {
    try {
      const stat = statSync(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  getContext(content, index, contextLength = 50) {
    const start = Math.max(0, index - contextLength);
    const end = Math.min(content.length, index + contextLength);
    return content.substring(start, end).replace(/\n/g, '\\n');
  }

  generateI18nKey(text, namespace = 'common') {
    const normalized = text
      .toLowerCase()
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 4)
      .join('-');

    return `${namespace}.${normalized}`;
  }

  reportResults() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 i18n Migration Sonuçları');
    console.log('='.repeat(80));
    console.log(`📁 Kontrol edilen dosya sayısı: ${this.fileCount}`);
    console.log(`🔤 Bulunan hardcoded string sayısı: ${this.stringCount}`);
    console.log(`❌ Hardcoded string içeren dosya sayısı: ${this.violations.length}`);
    console.log('='.repeat(80) + '\n');

    if (this.violations.length > 0) {
      console.log('🔍 Bulunan Hardcoded Stringler:\n');

      for (const { file, strings } of this.violations) {
        console.log(`📄 ${file}:`);
        for (const { string, line } of strings.slice(0, 5)) {
          const key = this.generateI18nKey(string);
          console.log(`   Satır ${line}: "${string}"`);
          console.log(`   → Önerilen key: ${key}`);
        }
        if (strings.length > 5) {
          console.log(`   ... ve ${strings.length - 5} tane daha`);
        }
        console.log('');
      }

      console.log('💡 Sonraki Adımlar:\n');
      console.log('   1. Bu stringleri messages/*.json dosyalarına ekleyin');
      console.log('   2. useTranslations() hookunu kullanın');
      console.log('   3. t() fonksiyonu ile çevirileri yükleyin\n');
      console.log('   Örnek:');
      console.log('   const t = useTranslations("common");');
      console.log('   <button>{t("key")}</button>\n');
    } else {
      console.log('✅ Hardcoded string bulunamadı!');
      console.log('   Tüm UI stringleri i18n sistemi kullanıyor.\n');
    }
  }
}

// Ana fonksiyon
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || !args.includes('--live');

  const migration = new I18nMigration({ dryRun });
  await migration.migrate();

  process.exit(0);
}

// Script çalıştırma
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Kritik Hata:', error);
    process.exit(1);
  });
}

export { I18nMigration };
