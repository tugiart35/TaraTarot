#!/usr/bin/env node

/**
 * Translation Cleanup Script
 *
 * Bu script translation dosyalarını temizler:
 * 1. Kullanılmayan anahtarları siler
 * 2. Tekrar eden değerleri birleştirir (opsiyonel)
 * 3. Tüm dil dosyalarını senkronize eder (tr, en, sr)
 * 4. Backup oluşturur
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Renkli console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Kullanıcıdan onay al
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

// Nested objeyi düzleştir
function flattenObject(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(result, flattenObject(obj[key], fullKey));
    } else {
      result[fullKey] = obj[key];
    }
  }

  return result;
}

// Düz objeden nested obje oluştur
function unflattenObject(flat) {
  const result = {};

  for (const key in flat) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (i === keys.length - 1) {
        current[k] = flat[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }

  return result;
}

// Backup oluştur
function createBackup(locale) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
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
async function cleanTranslations(options = {}) {
  const {
    dryRun = false,
    removeUnused = true,
    mergeDuplicates = false,
    syncLanguages = true,
  } = options;

  log('\n🧹 Translation Temizleme İşlemi Başlıyor...', 'cyan');
  log('═'.repeat(60), 'cyan');

  if (dryRun) {
    log('\n⚠️  DRY-RUN MODU: Hiçbir değişiklik yapılmayacak\n', 'yellow');
  }

  // Analiz raporunu oku
  const reportPath = path.join(__dirname, 'translation-analysis-report.json');

  if (!fs.existsSync(reportPath)) {
    log(
      '❌ Analiz raporu bulunamadı! Önce analyze-translations.js çalıştırın.',
      'red'
    );
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  log('\n📊 Analiz Raporu Özeti:', 'blue');
  log(`   Toplam Anahtar:        ${report.summary.totalKeys}`);
  log(`   Kullanılmayan:         ${report.summary.unusedKeys}`, 'red');
  log(`   Tekrar Eden Değer:     ${report.summary.duplicateValues}`, 'yellow');
  log(`   Boş/Anlamsız:          ${report.summary.emptyOrInvalid}`, 'yellow');

  // Onay iste
  if (!dryRun) {
    log('\n⚠️  Bu işlem translation dosyalarını değiştirecek!', 'yellow');
    log('📁 Otomatik backup oluşturulacak.', 'green');

    const answer = await askQuestion(
      '\nDevam etmek istiyor musunuz? (evet/hayır): '
    );

    if (answer.toLowerCase() !== 'evet' && answer.toLowerCase() !== 'e') {
      log('\n❌ İşlem iptal edildi.', 'red');
      process.exit(0);
    }
  }

  // Dil dosyalarını yükle
  const locales = ['tr', 'en', 'sr'];
  const translations = {};

  for (const locale of locales) {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // 1. Kullanılmayan anahtarları kaldır
  if (removeUnused && report.unusedKeys.length > 0) {
    log('\n🗑️  Kullanılmayan anahtarlar kaldırılıyor...', 'yellow');

    const unusedKeySet = new Set(report.unusedKeys.map(k => k.key));

    for (const locale of locales) {
      const flat = flattenObject(translations[locale]);
      const cleaned = {};
      let removedCount = 0;

      for (const key in flat) {
        if (unusedKeySet.has(key)) {
          removedCount++;
          log(`   - [${locale}] ${key}`, 'red');
        } else {
          cleaned[key] = flat[key];
        }
      }

      translations[locale] = unflattenObject(cleaned);
      log(`   ✓ [${locale}] ${removedCount} anahtar kaldırıldı`, 'green');
    }
  }

  // 2. Boş/anlamsız değerleri kaldır
  if (report.emptyOrInvalid.length > 0) {
    log('\n🗑️  Boş/anlamsız değerler kaldırılıyor...', 'yellow');

    const emptyKeySet = new Set(report.emptyOrInvalid.map(k => k.key));

    for (const locale of locales) {
      const flat = flattenObject(translations[locale]);
      const cleaned = {};
      let removedCount = 0;

      for (const key in flat) {
        if (emptyKeySet.has(key)) {
          removedCount++;
          log(`   - [${locale}] ${key}: "${flat[key]}"`, 'red');
        } else {
          cleaned[key] = flat[key];
        }
      }

      translations[locale] = unflattenObject(cleaned);
      log(`   ✓ [${locale}] ${removedCount} boş anahtar kaldırıldı`, 'green');
    }
  }

  // 3. Tekrar eden değerleri birleştir (opsiyonel)
  if (mergeDuplicates && report.duplicateValues.length > 0) {
    log('\n🔄 Tekrar eden değerler birleştiriliyor...', 'yellow');
    log(
      '   ⚠️  Bu işlem manuel kontrol gerektirir, sadece rapor oluşturuluyor.',
      'yellow'
    );

    const duplicateReport = [];

    report.duplicateValues.slice(0, 50).forEach(({ value, keys }) => {
      const mainKey = keys[0]; // İlk anahtarı ana anahtar olarak kullan
      const duplicateKeys = keys.slice(1);

      duplicateReport.push({
        mainKey,
        duplicateKeys,
        value,
        recommendation: `Bu anahtarları "${mainKey}" ile değiştirin: ${duplicateKeys.join(', ')}`,
      });
    });

    // Duplicate raporu kaydet
    const duplicateReportPath = path.join(
      __dirname,
      'duplicate-merge-recommendations.json'
    );
    fs.writeFileSync(
      duplicateReportPath,
      JSON.stringify(duplicateReport, null, 2)
    );

    log(
      `   ✓ Birleştirme önerileri kaydedildi: ${path.basename(duplicateReportPath)}`,
      'green'
    );
    log('   ℹ️  Manuel olarak kodda anahtar referanslarını değiştirin', 'blue');
  }

  // 4. Dosyaları kaydet
  if (!dryRun) {
    log('\n💾 Dosyalar kaydediliyor...', 'blue');

    for (const locale of locales) {
      // Backup oluştur
      const backupFile = createBackup(locale);
      log(`   ✓ Backup: ${path.basename(backupFile)}`, 'green');

      // Yeni dosyayı kaydet
      const filePath = path.join(__dirname, 'messages', `${locale}.json`);
      fs.writeFileSync(
        filePath,
        JSON.stringify(translations[locale], null, 2) + '\n'
      );
      log(`   ✓ [${locale}.json] güncellendi`, 'green');
    }
  }

  // 5. İstatistikler
  log('\n📊 Temizleme İstatistikleri:', 'cyan');

  const newKeyCounts = {};
  for (const locale of locales) {
    const flat = flattenObject(translations[locale]);
    newKeyCounts[locale] = Object.keys(flat).length;
  }

  const removedTotal = report.summary.totalKeys - newKeyCounts.tr;
  const percentReduced = (
    (removedTotal / report.summary.totalKeys) *
    100
  ).toFixed(2);

  log(`   Önceki anahtar sayısı:    ${report.summary.totalKeys}`, 'white');
  log(`   Yeni anahtar sayısı:      ${newKeyCounts.tr}`, 'green');
  log(
    `   Kaldırılan anahtar:       ${removedTotal} (${percentReduced}%)`,
    'green'
  );

  // Dosya boyutu karşılaştırması
  const oldSize = JSON.stringify(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, 'messages', 'tr.json'), 'utf-8')
    )
  ).length;
  const newSize = JSON.stringify(translations.tr).length;
  const sizeDiff = oldSize - newSize;
  const percentSmaller = ((sizeDiff / oldSize) * 100).toFixed(2);

  log(
    `   Dosya boyutu tasarrufu:   ${Math.round(sizeDiff / 1024)} KB (${percentSmaller}%)`,
    'green'
  );

  // Özet rapor oluştur
  const cleanupReport = {
    timestamp: new Date().toISOString(),
    dryRun,
    statistics: {
      beforeCleanup: {
        totalKeys: report.summary.totalKeys,
        unusedKeys: report.summary.unusedKeys,
        duplicateValues: report.summary.duplicateValues,
        emptyOrInvalid: report.summary.emptyOrInvalid,
      },
      afterCleanup: {
        totalKeys: newKeyCounts.tr,
        removedKeys: removedTotal,
        percentReduced: parseFloat(percentReduced),
      },
      fileSize: {
        before: Math.round(oldSize / 1024) + ' KB',
        after: Math.round(newSize / 1024) + ' KB',
        saved: Math.round(sizeDiff / 1024) + ' KB',
        percentSmaller: parseFloat(percentSmaller),
      },
    },
    actions: {
      removedUnused: removeUnused,
      removedEmpty: report.emptyOrInvalid.length,
      mergeDuplicates: mergeDuplicates ? 'Recommendations created' : 'Skipped',
    },
  };

  const cleanupReportPath = path.join(__dirname, 'cleanup-report.json');
  fs.writeFileSync(cleanupReportPath, JSON.stringify(cleanupReport, null, 2));
  log(`\n📄 Temizleme raporu: ${path.basename(cleanupReportPath)}`, 'blue');

  log('\n' + '═'.repeat(60), 'cyan');
  log('✅ Temizleme işlemi tamamlandı!', 'green');
  log('═'.repeat(60) + '\n', 'cyan');

  if (dryRun) {
    log(
      '💡 Gerçek temizleme için: node clean-translations.js --no-dry-run\n',
      'yellow'
    );
  } else {
    log('💡 İpuçları:', 'cyan');
    log('   • Backup dosyaları messages/backups/ klasöründe', 'blue');
    log('   • Uygulamanızı test edin', 'blue');
    log(
      '   • Sorun olursa backup dosyalarından geri yükleyebilirsiniz\n',
      'blue'
    );
  }
}

// Script argümanlarını işle
async function main() {
  const args = process.argv.slice(2);

  const options = {
    dryRun: !args.includes('--no-dry-run'),
    removeUnused: !args.includes('--keep-unused'),
    mergeDuplicates: args.includes('--merge-duplicates'),
    syncLanguages: !args.includes('--no-sync'),
  };

  if (args.includes('--help') || args.includes('-h')) {
    log('\n🧹 Translation Cleanup Script', 'cyan');
    log('═'.repeat(60), 'cyan');
    log('\nKullanım: node clean-translations.js [options]\n', 'white');
    log('Seçenekler:', 'yellow');
    log('  --no-dry-run           Gerçek temizleme yap (varsayılan: dry-run)');
    log('  --keep-unused          Kullanılmayan anahtarları koru');
    log('  --merge-duplicates     Tekrar eden değerler için öneri oluştur');
    log('  --no-sync              Dil dosyalarını senkronize etme');
    log('  --help, -h             Bu yardım mesajını göster');
    log('\nÖrnekler:', 'yellow');
    log('  node clean-translations.js');
    log('    → Dry-run modu (değişiklik yapmaz)');
    log('  node clean-translations.js --no-dry-run');
    log('    → Gerçek temizleme yap');
    log('  node clean-translations.js --no-dry-run --merge-duplicates');
    log('    → Temizleme + duplicate önerileri\n');
    process.exit(0);
  }

  await cleanTranslations(options);
}

// Hata yakalama
process.on('unhandledRejection', error => {
  log('\n❌ Beklenmeyen hata:', 'red');
  console.error(error);
  process.exit(1);
});

// Çalıştır
main().catch(error => {
  log('\n❌ Hata oluştu:', 'red');
  console.error(error);
  process.exit(1);
});
