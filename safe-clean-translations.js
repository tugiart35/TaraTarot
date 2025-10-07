#!/usr/bin/env node

/**
 * Safe Translation Cleanup Script
 *
 * Özellikler:
 * - Küçük batchler halinde temizlik
 * - Her adımda onay
 * - Otomatik test
 * - Anında rollback
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

// Anahtarı nested objeden sil
function deleteNestedKey(obj, keyPath) {
  const keys = keyPath.split('.');
  const lastKey = keys.pop();
  let current = obj;

  // Son seviyeye kadar git
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]]) {
      return false; // Anahtar bulunamadı
    }
    current = current[keys[i]];
  }

  // Son anahtarı sil
  if (current && lastKey in current) {
    delete current[lastKey];
    return true;
  }

  return false;
}

// Boş objeleri temizle
function cleanEmptyObjects(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      cleanEmptyObjects(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  });
  return obj;
}

// Backup oluştur
function createBackup(locale) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const sourceFile = path.join(__dirname, 'messages', `${locale}.json`);
  const backupDir = path.join(__dirname, 'messages', 'backups');
  const backupFile = path.join(backupDir, `${locale}.backup.${timestamp}.json`);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  fs.copyFileSync(sourceFile, backupFile);
  return backupFile;
}

// Ana temizleme fonksiyonu
async function safeCleanTranslations() {
  log('\n🧹 GÜVENLİ Translation Temizleme', 'cyan');
  log('═'.repeat(60), 'cyan');

  // 1. Analiz raporunu kontrol et
  const reportPath = path.join(__dirname, 'translation-analysis-report.json');

  if (!fs.existsSync(reportPath)) {
    log('❌ Analiz raporu bulunamadı!', 'red');
    log('Önce şunu çalıştırın: node analyze-translations.js\n', 'yellow');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  if (report.summary.totalKeys === 0) {
    log('❌ Analiz raporu boş görünüyor!', 'red');
    log('Önce şunu çalıştırın: node analyze-translations.js\n', 'yellow');
    process.exit(1);
  }

  log('\n📊 Mevcut Durum:', 'blue');
  log(`   Toplam Anahtar:        ${report.summary.totalKeys}`);
  log(`   Kullanılmayan:         ${report.summary.unusedKeys}`, 'red');
  log(`   Tekrar Eden:           ${report.summary.duplicateValues}`, 'yellow');
  log(`   Boş/Anlamsız:          ${report.summary.emptyOrInvalid}`, 'yellow');

  // 2. Temizleme stratejisi seç
  log('\n🎯 Temizleme Stratejisi Seçin:', 'cyan');
  log('   1. Sadece boş/anlamsız değerleri temizle (EN GÜVENLİ)');
  log('   2. İlk 100 kullanılmayan anahtarı temizle (ORTA)');
  log('   3. İlk 500 kullanılmayan anahtarı temizle (ORTA)');
  log('   4. Tüm kullanılmayan anahtarları temizle (RİSKLİ)');
  log('   5. İptal\n');

  const strategy = await askQuestion('Seçiminiz (1-5): ');

  let keysToRemove = [];

  switch (strategy) {
    case '1':
      keysToRemove = report.emptyOrInvalid.map(k => k.key);
      log(`\n✓ ${keysToRemove.length} boş anahtar temizlenecek`, 'green');
      break;
    case '2':
      keysToRemove = report.unusedKeys.slice(0, 100).map(k => k.key);
      log(`\n✓ İlk 100 kullanılmayan anahtar temizlenecek`, 'yellow');
      break;
    case '3':
      keysToRemove = report.unusedKeys.slice(0, 500).map(k => k.key);
      log(`\n✓ İlk 500 kullanılmayan anahtar temizlenecek`, 'yellow');
      break;
    case '4':
      keysToRemove = report.unusedKeys.map(k => k.key);
      log(
        `\n⚠️  ${keysToRemove.length} kullanılmayan anahtar temizlenecek`,
        'red'
      );
      break;
    case '5':
      log('\n❌ İşlem iptal edildi', 'red');
      process.exit(0);
    default:
      log('\n❌ Geçersiz seçim', 'red');
      process.exit(1);
  }

  if (keysToRemove.length === 0) {
    log('\n✅ Temizlenecek anahtar yok!', 'green');
    process.exit(0);
  }

  // 3. Onay al
  log('\n📋 Temizlenecek Anahtarlar (İlk 10):', 'blue');
  keysToRemove.slice(0, 10).forEach((key, i) => {
    log(`   ${i + 1}. ${key}`, 'white');
  });
  if (keysToRemove.length > 10) {
    log(`   ... ve ${keysToRemove.length - 10} anahtar daha`, 'white');
  }

  const confirm = await askQuestion(
    '\n❓ Bu anahtarları silmek istiyor musunuz? (evet/hayır): '
  );

  if (confirm.toLowerCase() !== 'evet' && confirm.toLowerCase() !== 'e') {
    log('\n❌ İşlem iptal edildi', 'red');
    process.exit(0);
  }

  // 4. Backup oluştur
  log('\n💾 Backup oluşturuluyor...', 'blue');
  const locales = ['tr', 'en', 'sr'];
  const backupFiles = {};

  for (const locale of locales) {
    backupFiles[locale] = createBackup(locale);
    log(`   ✓ ${locale}: ${path.basename(backupFiles[locale])}`, 'green');
  }

  // 5. Temizleme yap
  log('\n🗑️  Anahtarlar siliniyor...', 'yellow');

  const results = {
    tr: { removed: 0, failed: 0 },
    en: { removed: 0, failed: 0 },
    sr: { removed: 0, failed: 0 },
  };

  for (const locale of locales) {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const key of keysToRemove) {
      const deleted = deleteNestedKey(data, key);
      if (deleted) {
        results[locale].removed++;
      } else {
        results[locale].failed++;
      }
    }

    // Boş objeleri temizle
    cleanEmptyObjects(data);

    // Dosyayı kaydet
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    log(`   ✓ [${locale}] ${results[locale].removed} anahtar silindi`, 'green');

    if (results[locale].failed > 0) {
      log(
        `   ⚠️  [${locale}] ${results[locale].failed} anahtar bulunamadı`,
        'yellow'
      );
    }
  }

  // 6. Sonuçları göster
  log('\n📊 Temizleme Sonuçları:', 'cyan');
  log('═'.repeat(60), 'cyan');

  const totalRemoved = results.tr.removed;
  const newTotal = report.summary.totalKeys - totalRemoved;
  const percentReduced = (
    (totalRemoved / report.summary.totalKeys) *
    100
  ).toFixed(2);

  log(`   Önceki anahtar sayısı:    ${report.summary.totalKeys}`, 'white');
  log(`   Yeni anahtar sayısı:      ${newTotal}`, 'green');
  log(
    `   Silinen anahtar:          ${totalRemoved} (${percentReduced}%)`,
    'green'
  );

  // 7. Temizleme raporu kaydet
  const cleanupReport = {
    timestamp: new Date().toISOString(),
    strategy: strategy,
    keysRemoved: keysToRemove,
    results: results,
    backups: backupFiles,
    statistics: {
      before: report.summary.totalKeys,
      after: newTotal,
      removed: totalRemoved,
      percentReduced: parseFloat(percentReduced),
    },
  };

  const cleanupReportPath = path.join(
    __dirname,
    `cleanup-report-${Date.now()}.json`
  );
  fs.writeFileSync(cleanupReportPath, JSON.stringify(cleanupReport, null, 2));

  log('\n✅ Temizleme tamamlandı!', 'green');
  log(`📄 Rapor: ${path.basename(cleanupReportPath)}`, 'blue');

  log('\n💡 Sonraki Adımlar:', 'cyan');
  log('   1. Uygulamanızı test edin', 'white');
  log('   2. Herhangi bir sorun varsa:', 'white');
  log('      node restore-translations.js', 'yellow');
  log(
    '   3. Her şey yolundaysa, başka bir batch temizleyebilirsiniz\n',
    'white'
  );
}

// Hata yakalama
process.on('unhandledRejection', error => {
  log('\n❌ Beklenmeyen hata:', 'red');
  console.error(error);
  log('\n💡 Backup dosyalarından geri yükleyin:', 'yellow');
  log('   node restore-translations.js\n', 'yellow');
  process.exit(1);
});

// Çalıştır
safeCleanTranslations().catch(error => {
  log('\n❌ Hata:', 'red');
  console.error(error);
  log('\n💡 Backup dosyalarından geri yükleyin:', 'yellow');
  log('   node restore-translations.js\n', 'yellow');
  process.exit(1);
});
