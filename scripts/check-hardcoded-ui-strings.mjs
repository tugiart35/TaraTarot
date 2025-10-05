#!/usr/bin/env node

/*
info:
Bağlantılı dosyalar:
- ../src/app: React bileşenleri için (gerekli)
- ../src/features: TypeScript dosyaları için (gerekli)
- ../messages: Dil dosyaları için (gerekli)

Dosyanın amacı:
- Hardcoded UI string'lerini tespit etme
- i18n kullanımını zorunlu kılma
- CI/CD pipeline'da lint guard olarak çalışma

Supabase değişkenleri ve tabloları:
- Yok (build script)

Geliştirme önerileri:
- Yeni pattern'ler eklenebilir
- Whitelist genişletilebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- CI/CD pipeline'da çalışır
*/

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Hardcoded string pattern'leri
const HARDCODED_PATTERNS = [
  // JSX içinde string literal'lar
  /['"`]([A-ZÇĞIİÖŞÜ][a-zçğıiöşü\s]{2,})['"`]/g,
  // Button text'leri
  /<button[^>]*>([^<]+)<\/button>/gi,
  // Label text'leri
  /<label[^>]*>([^<]+)<\/label>/gi,
  // Placeholder text'leri
  /placeholder=['"`]([^'"`]+)['"`]/gi,
  // Title attribute'ları
  /title=['"`]([^'"`]+)['"`]/gi,
  // Alt text'leri
  /alt=['"`]([^'"`]+)['"`]/gi,
];

// Whitelist - bu string'ler hardcoded olarak kabul edilebilir
const WHITELIST = [
  // Teknik terimler
  'className',
  'id',
  'data-',
  'aria-',
  // URL'ler
  'http',
  'https',
  'www',
  // Email formatları
  '@',
  // Sayılar
  /^\d+$/,
  // Tek karakterler
  /^[a-zA-Z]$/,
  // Boş string'ler
  '',
  // CSS class'ları
  /^[a-z-]+$/,
  // HTML tag'leri
  /^<[^>]+>$/,
];

// İzin verilen dosya uzantıları
const ALLOWED_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Kontrol edilecek dizinler
const SOURCE_DIRS = [
  'src/app',
  'src/features',
  'src/components',
  'src/lib',
  'src/hooks',
];

// Hariç tutulacak dosyalar
const EXCLUDE_PATTERNS = [
  /\.test\./,
  /\.spec\./,
  /\.stories\./,
  /node_modules/,
  /\.next/,
  /\.git/,
];

// Hariç tutulacak dizinler
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

class HardcodedStringChecker {
  constructor() {
    this.violations = [];
    this.fileCount = 0;
    this.stringCount = 0;
  }

  // Ana kontrol fonksiyonu
  async check() {
    console.log('🔍 Hardcoded UI string kontrolü başlatılıyor...\n');

    for (const dir of SOURCE_DIRS) {
      if (this.directoryExists(dir)) {
        await this.checkDirectory(dir);
      }
    }

    this.reportResults();
    return this.violations.length === 0;
  }

  // Dizin kontrolü
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

  // Dosya kontrolü
  async checkFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      this.fileCount++;

      // Hardcoded string'leri bul
      for (const pattern of HARDCODED_PATTERNS) {
        const matches = content.matchAll(pattern);

        for (const match of matches) {
          const string = match[1] || match[0];

          if (this.isHardcodedString(string)) {
            this.violations.push({
              file: filePath,
              line: this.getLineNumber(content, match.index),
              string: string,
              context: this.getContext(content, match.index),
            });
            this.stringCount++;
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Dosya okunamadı: ${filePath}`);
    }
  }

  // Hardcoded string kontrolü
  isHardcodedString(str) {
    if (!str || typeof str !== 'string') return false;

    // Whitelist kontrolü
    for (const whitelistItem of WHITELIST) {
      if (typeof whitelistItem === 'string') {
        if (str.includes(whitelistItem)) return false;
      } else if (whitelistItem instanceof RegExp) {
        if (whitelistItem.test(str)) return false;
      }
    }

    // Minimum uzunluk kontrolü
    if (str.length < 3) return false;

    // Sadece boşluk kontrolü
    if (str.trim().length === 0) return false;

    // HTML tag kontrolü
    if (str.startsWith('<') && str.endsWith('>')) return false;

    // URL kontrolü
    if (str.startsWith('http') || str.startsWith('www')) return false;

    // Email kontrolü
    if (str.includes('@')) return false;

    // CSS class kontrolü
    if (/^[a-z-]+$/.test(str)) return false;

    return true;
  }

  // Dosya kontrol edilmeli mi?
  shouldCheckFile(filename) {
    const ext = extname(filename);
    return ALLOWED_EXTENSIONS.includes(ext);
  }

  // Dizin hariç tutulmalı mı?
  shouldExcludeDir(dirname) {
    return (
      EXCLUDE_DIRS.includes(dirname) ||
      EXCLUDE_PATTERNS.some(pattern => pattern.test(dirname))
    );
  }

  // Dizin var mı?
  directoryExists(dirPath) {
    try {
      const stat = statSync(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  // Satır numarası bulma
  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  // Context bulma
  getContext(content, index, contextLength = 50) {
    const start = Math.max(0, index - contextLength);
    const end = Math.min(content.length, index + contextLength);
    return content.substring(start, end).replace(/\n/g, '\\n');
  }

  // Sonuçları raporla
  reportResults() {
    console.log(`\n📊 Kontrol Sonuçları:`);
    console.log(`   📁 Kontrol edilen dosya sayısı: ${this.fileCount}`);
    console.log(`   🔤 Bulunan hardcoded string sayısı: ${this.stringCount}`);
    console.log(`   ❌ İhlal sayısı: ${this.violations.length}\n`);

    if (this.violations.length > 0) {
      console.log('❌ Hardcoded UI stringleri bulundu:\n');

      // Dosya bazında grupla
      const violationsByFile = this.violations.reduce((acc, violation) => {
        if (!acc[violation.file]) {
          acc[violation.file] = [];
        }
        acc[violation.file].push(violation);
        return acc;
      }, {});

      for (const [file, violations] of Object.entries(violationsByFile)) {
        console.log(`📄 ${file}:`);
        for (const violation of violations) {
          console.log(`   Satır ${violation.line}: "${violation.string}"`);
          console.log(`   Context: ...${violation.context}...`);
        }
        console.log('');
      }

      console.log('💡 Öneriler:');
      console.log('   - Bu stringleri messages/*.json dosyalarına taşıyın');
      console.log('   - useTranslations() hookunu kullanın');
      console.log('   - t() fonksiyonu ile çevirileri yükleyin');
      console.log('');
    } else {
      console.log('✅ Hardcoded UI string bulunamadı!');
      console.log('   Tüm UI stringleri i18n sistemi kullanıyor.\n');
    }
  }
}

// Ana fonksiyon
async function main() {
  const checker = new HardcodedStringChecker();
  const success = await checker.check();

  if (!success) {
    console.log('❌ Hardcoded string kontrolü başarısız!');
    process.exit(1);
  } else {
    console.log('✅ Hardcoded string kontrolü başarılı!');
    process.exit(0);
  }
}

// Script çalıştırma
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Hata:', error);
    process.exit(1);
  });
}

export { HardcodedStringChecker };
