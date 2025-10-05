#!/usr/bin/env node

/*
info:
Bağlantılı dosyalar:
- ../src: React bileşenleri için (gerekli)
- ../messages: Dil dosyaları için (gerekli)

Dosyanın amacı:
- Projedeki tüm i18n anahtarlarını tespit etme
- Kullanılan ve kullanılmayan anahtarları bulma
- Eksik çevirileri tespit etme
- i18n anahtarlarını tek bir kodla dosyalama

Supabase değişkenleri ve tabloları:
- Yok (i18n analiz scripti)

Geliştirme önerileri:
- Yeni pattern'ler eklenebilir
- Otomatik çeviri önerileri eklenebilir

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- i18n analizi için çalışır
*/

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

// i18n anahtar pattern'leri
const I18N_PATTERNS = [
  // t() fonksiyonu kullanımı
  /t\(['"`]([^'"`]+)['"`]\)/g,
  // useTranslations hook kullanımı
  /useTranslations\(['"`]([^'"`]+)['"`]\)/g,
  // getTranslations kullanımı
  /getTranslations\(['"`]([^'"`]+)['"`]\)/g,
  // Template literal içinde
  /t\(`([^`]+)`\)/g,
  // Nested key'ler
  /t\(['"`]([^'"`]+\.[^'"`]+)['"`]\)/g,
];

// Desteklenen diller
const SUPPORTED_LOCALES = ['tr', 'en', 'sr'];

// Kontrol edilecek dizinler
const SOURCE_DIRS = [
  'src/app',
  'src/features',
  'src/components',
  'src/lib',
  'src/hooks',
  'src/utils',
];

// Hariç tutulacak dosyalar
const EXCLUDE_PATTERNS = [
  /\.test\./,
  /\.spec\./,
  /\.stories\./,
  /node_modules/,
  /\.next/,
  /\.git/,
  /\.backup/,
];

// Hariç tutulacak dizinler
const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '__tests__',
];

class I18nKeyExtractor {
  constructor() {
    this.usedKeys = new Set();
    this.definedKeys = new Set();
    this.missingKeys = new Set();
    this.unusedKeys = new Set();
    this.fileCount = 0;
    this.keyCount = 0;
    this.messages = {};
  }

  // Ana analiz fonksiyonu
  async analyze() {
    console.log('🔍 i18n anahtar analizi başlatılıyor...\n');

    // Dil dosyalarını yükle
    await this.loadMessageFiles();

    // Kaynak kodları analiz et
    await this.analyzeSourceCode();

    // Sonuçları hesapla
    this.calculateResults();

    // Rapor oluştur
    this.generateReport();

    return {
      usedKeys: Array.from(this.usedKeys),
      definedKeys: Array.from(this.definedKeys),
      missingKeys: Array.from(this.missingKeys),
      unusedKeys: Array.from(this.unusedKeys),
      messages: this.messages,
    };
  }

  // Dil dosyalarını yükle
  async loadMessageFiles() {
    console.log('📚 Dil dosyaları yükleniyor...');

    for (const locale of SUPPORTED_LOCALES) {
      try {
        const filePath = `messages/${locale}.json`;
        const content = readFileSync(filePath, 'utf8');
        this.messages[locale] = JSON.parse(content);

        // Anahtarları topla
        this.extractKeysFromMessages(this.messages[locale], '', locale);

        console.log(`   ✅ ${locale}.json yüklendi`);
      } catch (error) {
        console.warn(`   ⚠️  ${locale}.json yüklenemedi: ${error.message}`);
      }
    }
  }

  // Mesaj dosyalarından anahtarları çıkar
  extractKeysFromMessages(obj, prefix = '', locale) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        this.extractKeysFromMessages(value, fullKey, locale);
      } else {
        this.definedKeys.add(fullKey);
      }
    }
  }

  // Kaynak kodları analiz et
  async analyzeSourceCode() {
    console.log('🔍 Kaynak kodları analiz ediliyor...');

    for (const dir of SOURCE_DIRS) {
      if (this.directoryExists(dir)) {
        await this.analyzeDirectory(dir);
      }
    }
  }

  // Dizin analizi
  async analyzeDirectory(dirPath) {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        if (!this.shouldExcludeDir(item)) {
          await this.analyzeDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        if (this.shouldCheckFile(item)) {
          await this.analyzeFile(fullPath);
        }
      }
    }
  }

  // Dosya analizi
  async analyzeFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      this.fileCount++;

      // i18n anahtarlarını bul
      for (const pattern of I18N_PATTERNS) {
        const matches = content.matchAll(pattern);

        for (const match of matches) {
          const key = match[1];
          if (key && key.trim()) {
            this.usedKeys.add(key.trim());
            this.keyCount++;
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Dosya okunamadı: ${filePath}`);
    }
  }

  // Sonuçları hesapla
  calculateResults() {
    // Kullanılmayan anahtarlar
    for (const key of this.definedKeys) {
      if (!this.usedKeys.has(key)) {
        this.unusedKeys.add(key);
      }
    }

    // Eksik anahtarlar
    for (const key of this.usedKeys) {
      if (!this.definedKeys.has(key)) {
        this.missingKeys.add(key);
      }
    }
  }

  // Rapor oluştur
  generateReport() {
    console.log('\n📊 i18n Analiz Sonuçları:');
    console.log(`   📁 Analiz edilen dosya sayısı: ${this.fileCount}`);
    console.log(`   🔑 Bulunan anahtar sayısı: ${this.keyCount}`);
    console.log(`   📝 Tanımlı anahtar sayısı: ${this.definedKeys.size}`);
    console.log(`   ✅ Kullanılan anahtar sayısı: ${this.usedKeys.size}`);
    console.log(`   ❌ Eksik anahtar sayısı: ${this.missingKeys.size}`);
    console.log(
      `   🗑️  Kullanılmayan anahtar sayısı: ${this.unusedKeys.size}\n`
    );

    // Eksik anahtarlar
    if (this.missingKeys.size > 0) {
      console.log('❌ Eksik anahtarlar:');
      for (const key of Array.from(this.missingKeys).sort()) {
        console.log(`   - ${key}`);
      }
      console.log('');
    }

    // Kullanılmayan anahtarlar
    if (this.unusedKeys.size > 0) {
      console.log('🗑️  Kullanılmayan anahtarlar:');
      for (const key of Array.from(this.unusedKeys).sort()) {
        console.log(`   - ${key}`);
      }
      console.log('');
    }

    // Dil dosyası durumu
    this.reportLanguageStatus();
  }

  // Dil dosyası durumu
  reportLanguageStatus() {
    console.log('🌍 Dil dosyası durumu:');

    for (const locale of SUPPORTED_LOCALES) {
      if (this.messages[locale]) {
        const keyCount = this.countKeys(this.messages[locale]);
        console.log(`   ${locale}: ${keyCount} anahtar`);

        // Eksik çevirileri kontrol et
        const missingTranslations = this.findMissingTranslations(locale);
        if (missingTranslations.length > 0) {
          console.log(`     ⚠️  ${missingTranslations.length} eksik çeviri`);
        }
      } else {
        console.log(`   ${locale}: ❌ Dosya bulunamadı`);
      }
    }
    console.log('');
  }

  // Anahtar sayısını hesapla
  countKeys(obj) {
    let count = 0;
    for (const value of Object.values(obj)) {
      if (typeof value === 'object' && value !== null) {
        count += this.countKeys(value);
      } else {
        count++;
      }
    }
    return count;
  }

  // Eksik çevirileri bul
  findMissingTranslations(locale) {
    const missing = [];
    const trKeys = this.getAllKeys(this.messages.tr || {});
    const localeKeys = this.getAllKeys(this.messages[locale] || {});

    for (const key of trKeys) {
      if (!localeKeys.includes(key)) {
        missing.push(key);
      }
    }

    return missing;
  }

  // Tüm anahtarları al
  getAllKeys(obj, prefix = '') {
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        keys.push(...this.getAllKeys(value, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  // JSON raporu oluştur
  generateJsonReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.fileCount,
        totalKeys: this.keyCount,
        definedKeys: this.definedKeys.size,
        usedKeys: this.usedKeys.size,
        missingKeys: this.missingKeys.size,
        unusedKeys: this.unusedKeys.size,
      },
      keys: {
        used: Array.from(this.usedKeys).sort(),
        defined: Array.from(this.definedKeys).sort(),
        missing: Array.from(this.missingKeys).sort(),
        unused: Array.from(this.unusedKeys).sort(),
      },
      languages: {},
    };

    // Dil durumları
    for (const locale of SUPPORTED_LOCALES) {
      report.languages[locale] = {
        keyCount: this.countKeys(this.messages[locale] || {}),
        missingTranslations: this.findMissingTranslations(locale),
      };
    }

    return report;
  }

  // Dosya kontrol edilmeli mi?
  shouldCheckFile(filename) {
    const ext = extname(filename);
    return ['.tsx', '.ts', '.jsx', '.js'].includes(ext);
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
}

// Ana fonksiyon
async function main() {
  const extractor = new I18nKeyExtractor();
  const results = await extractor.analyze();

  // JSON raporu oluştur
  const jsonReport = extractor.generateJsonReport();
  writeFileSync(
    'i18n-analysis-report.json',
    JSON.stringify(jsonReport, null, 2)
  );

  console.log(
    '📄 Detaylı rapor: i18n-analysis-report.json dosyasına kaydedildi'
  );

  // Özet
  console.log('\n💡 Öneriler:');
  if (results.missingKeys.length > 0) {
    console.log('   - Eksik anahtarları messages/*.json dosyalarına ekleyin');
  }
  if (results.unusedKeys.length > 0) {
    console.log('   - Kullanılmayan anahtarları temizleyebilirsiniz');
  }
  console.log('   - Dil dosyalarını düzenli olarak senkronize edin');
  console.log("   - CI/CD pipeline'da bu analizi çalıştırın");
}

// Script çalıştırma
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error('❌ Hata:', error);
    process.exit(1);
  });
}

export { I18nKeyExtractor };
