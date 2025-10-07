#!/usr/bin/env node

/**
 * Smart Translation Analyzer
 *
 * Bu script:
 * 1. tr.json'daki TÜM anahtarları çıkarır
 * 2. Kodda GERÇEKTEN kullanılan anahtarları bulur
 * 3. Kategorilere ayırır
 * 4. Manuel inceleme için rapor oluşturur
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Tüm anahtarları düz liste olarak çıkar
function flattenKeys(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenKeys(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

// Kodda anahtar kullanımını kontrol et
function isKeyUsedInCode(key, srcDir) {
  try {
    // Farklı kullanım pattern'leri
    const patterns = [
      // t('full.key.path')
      `t\\(['"\`]${key.replace(/\./g, '\\.')}['"\`]`,
      // Sadece key string olarak
      `['"\`]${key.replace(/\./g, '\\.')}['"\`]`,
    ];

    // Parent key kontrolü (nested yapılar için)
    const keyParts = key.split('.');
    if (keyParts.length > 1) {
      // İlk seviye kontrolü
      patterns.push(`t\\(['"\`]${keyParts[0]}['"\`]`);
      // İkinci seviye kontrolü
      if (keyParts.length > 2) {
        patterns.push(`t\\(['"\`]${keyParts[0]}\\.${keyParts[1]}['"\`]`);
      }
    }

    for (const pattern of patterns) {
      try {
        // ripgrep ile ara
        const cmd = `rg -q "${pattern}" ${srcDir} --type ts --type tsx --type js --type jsx 2>/dev/null`;
        execSync(cmd, { stdio: 'pipe' });
        return true; // Bulundu
      } catch (e) {
        // Bulunamadı, devam et
      }
    }

    return false;
  } catch (error) {
    return false;
  }
}

// Değer benzerliğini kontrol et
function findSimilarValues(allKeys) {
  const valueToKeys = new Map();

  Object.entries(allKeys).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim().length > 3) {
      const normalized = value.toLowerCase().trim();

      if (!valueToKeys.has(normalized)) {
        valueToKeys.set(normalized, []);
      }
      valueToKeys.get(normalized).push({ key, value });
    }
  });

  const duplicates = [];
  valueToKeys.forEach((keys, normalizedValue) => {
    if (keys.length > 1) {
      duplicates.push({
        value: keys[0].value,
        count: keys.length,
        keys: keys.map(k => k.key),
      });
    }
  });

  // En çok tekrar edenlere göre sırala
  duplicates.sort((a, b) => b.count - a.count);

  return duplicates;
}

// Ana analiz
async function smartAnalyze() {
  log('\n🔍 AKILLI Translation Analizi Başlıyor...', 'cyan');
  log('═'.repeat(70), 'cyan');

  const trJsonPath = path.join(__dirname, 'messages', 'tr.json');
  const srcDir = path.join(__dirname, 'src');

  // tr.json'ı yükle
  log('\n📖 tr.json dosyası okunuyor...', 'blue');
  const trData = JSON.parse(fs.readFileSync(trJsonPath, 'utf-8'));
  const allKeys = flattenKeys(trData);
  const totalKeys = Object.keys(allKeys).length;

  log(`✅ ${totalKeys} anahtar bulundu`, 'green');

  // Kategorilere ayır
  const categories = {
    used: [],
    unused: [],
    probablyUsed: [], // Parent key kullanılıyorsa
    empty: [],
    suspicious: [], // Boş, "TODO", vb.
  };

  log('\n🔍 Anahtarlar analiz ediliyor...', 'yellow');
  log('⏳ Bu işlem 3-5 dakika sürebilir...\n', 'yellow');

  let processed = 0;
  const keys = Object.keys(allKeys);

  for (const key of keys) {
    processed++;
    if (processed % 50 === 0) {
      const percent = Math.round((processed / totalKeys) * 100);
      process.stdout.write(
        `\r⏳ İlerleme: ${processed}/${totalKeys} (${percent}%)   `
      );
    }

    const value = allKeys[key];

    // Boş veya şüpheli değerleri kategorize et
    if (
      !value ||
      value === '' ||
      value === 'TODO' ||
      value === 'N/A' ||
      value === 'boş' ||
      value === '-'
    ) {
      categories.empty.push({ key, value, reason: 'Boş veya placeholder' });
      continue;
    }

    // Kodda kullanımı kontrol et
    const isUsed = isKeyUsedInCode(key, srcDir);

    if (isUsed) {
      categories.used.push({ key, value });
    } else {
      // Parent key kontrolü
      const keyParts = key.split('.');
      if (keyParts.length > 1) {
        const parentKey = keyParts.slice(0, -1).join('.');
        const isParentUsed = isKeyUsedInCode(parentKey, srcDir);

        if (isParentUsed) {
          categories.probablyUsed.push({
            key,
            value,
            reason: `Parent key "${parentKey}" kullanılıyor`,
          });
        } else {
          categories.unused.push({ key, value });
        }
      } else {
        categories.unused.push({ key, value });
      }
    }
  }

  console.log(''); // Yeni satır

  // Tekrar edenleri bul
  log('\n🔍 Tekrar eden değerler aranıyor...', 'yellow');
  const duplicates = findSimilarValues(allKeys);
  log(`✅ ${duplicates.length} tekrar eden değer bulundu`, 'green');

  // Sonuçları göster
  log('\n' + '═'.repeat(70), 'cyan');
  log('📊 ANALİZ SONUÇLARI', 'bright');
  log('═'.repeat(70), 'cyan');

  log(
    `\n✅ Kullanılan:              ${categories.used.length} (${((categories.used.length / totalKeys) * 100).toFixed(1)}%)`,
    'green'
  );
  log(
    `🟡 Muhtemelen Kullanılan:   ${categories.probablyUsed.length} (${((categories.probablyUsed.length / totalKeys) * 100).toFixed(1)}%)`,
    'yellow'
  );
  log(
    `❌ Kullanılmayan:           ${categories.unused.length} (${((categories.unused.length / totalKeys) * 100).toFixed(1)}%)`,
    'red'
  );
  log(`⚪ Boş/Şüpheli:             ${categories.empty.length}`, 'magenta');
  log(`🔄 Tekrar Eden Değer:       ${duplicates.length}`, 'yellow');

  // Detaylı rapor oluştur
  const report = {
    metadata: {
      analyzedFile: 'messages/tr.json',
      totalKeys: totalKeys,
      analysisDate: new Date().toISOString(),
      srcDirectory: 'src/',
    },
    summary: {
      used: categories.used.length,
      probablyUsed: categories.probablyUsed.length,
      unused: categories.unused.length,
      empty: categories.empty.length,
      duplicates: duplicates.length,
    },
    statistics: {
      usageRate: ((categories.used.length / totalKeys) * 100).toFixed(2) + '%',
      unusageRate:
        ((categories.unused.length / totalKeys) * 100).toFixed(2) + '%',
      potentialSavings: `${categories.unused.length + categories.empty.length} anahtar`,
    },
    categories: {
      used: categories.used.slice(0, 100), // İlk 100
      probablyUsed: categories.probablyUsed,
      unused: categories.unused,
      empty: categories.empty,
    },
    duplicates: duplicates,
    recommendations: [],
  };

  // Öneriler oluştur
  if (categories.empty.length > 0) {
    report.recommendations.push({
      priority: 'HIGH',
      action: 'DELETE',
      count: categories.empty.length,
      description: `${categories.empty.length} boş/placeholder değer hemen silinebilir`,
      keys: categories.empty.map(k => k.key),
    });
  }

  if (categories.unused.length > 500) {
    report.recommendations.push({
      priority: 'MEDIUM',
      action: 'REVIEW_AND_DELETE',
      count: categories.unused.length,
      description: `${categories.unused.length} kullanılmayan anahtar var. Batch halinde temizlenebilir.`,
      suggestion: 'İlk 100 anahtarla başlayın, test edin, sonra devam edin',
    });
  }

  if (duplicates.length > 50) {
    report.recommendations.push({
      priority: 'LOW',
      action: 'CONSOLIDATE',
      count: duplicates.length,
      description: `${duplicates.length} tekrar eden değer var. Bunlar birleştirilebilir.`,
      suggestion:
        'Önce kullanılmayanları temizleyin, sonra duplicatelere bakın',
    });
  }

  // Raporları kaydet
  const jsonReportPath = path.join(__dirname, 'smart-analysis-report.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));

  // Okunabilir rapor
  const txtReportPath = path.join(__dirname, 'smart-analysis-report.txt');
  let txtReport = '';

  txtReport += '═'.repeat(80) + '\n';
  txtReport += '              🔍 AKILLI TRANSLATION ANALİZ RAPORU\n';
  txtReport += '═'.repeat(80) + '\n\n';

  txtReport += '📊 ÖZET\n';
  txtReport += '─'.repeat(80) + '\n';
  txtReport += `Toplam Anahtar:           ${totalKeys}\n`;
  txtReport += `✅ Kullanılan:             ${categories.used.length} (${report.statistics.usageRate})\n`;
  txtReport += `🟡 Muhtemelen Kullanılan:  ${categories.probablyUsed.length}\n`;
  txtReport += `❌ Kullanılmayan:          ${categories.unused.length} (${report.statistics.unusageRate})\n`;
  txtReport += `⚪ Boş/Şüpheli:            ${categories.empty.length}\n`;
  txtReport += `🔄 Tekrar Eden Değer:      ${duplicates.length}\n`;
  txtReport += `Analiz Tarihi:            ${new Date().toLocaleString('tr-TR')}\n\n`;

  // Boş değerler
  if (categories.empty.length > 0) {
    txtReport += '\n⚪ BOŞ/ŞÜPHELİ DEĞERLER (HEPSİ)\n';
    txtReport += '─'.repeat(80) + '\n';
    txtReport += '❗ ÖNCELİK: YÜKSEK - Bunlar hemen silinebilir\n\n';

    categories.empty.forEach(({ key, value, reason }) => {
      txtReport += `• ${key}\n`;
      txtReport += `  Değer: "${value}"\n`;
      txtReport += `  Sebep: ${reason}\n\n`;
    });
  }

  // Kullanılmayan anahtarlar - kategorilere ayrılmış
  if (categories.unused.length > 0) {
    txtReport += '\n❌ KULLANILMAYAN ANAHTARLAR\n';
    txtReport += '─'.repeat(80) + '\n';
    txtReport += `Toplam: ${categories.unused.length} anahtar\n`;
    txtReport += '❗ ÖNCELİK: ORTA - Manuel kontrol sonrası silinebilir\n\n';

    // Kategorilere göre grupla
    const grouped = {};
    categories.unused.forEach(({ key, value }) => {
      const topLevel = key.split('.')[0];
      if (!grouped[topLevel]) {
        grouped[topLevel] = [];
      }
      grouped[topLevel].push({ key, value });
    });

    // Her kategoriyi göster
    Object.keys(grouped)
      .sort()
      .forEach(category => {
        txtReport += `\n📁 ${category.toUpperCase()} Kategorisi (${grouped[category].length} anahtar)\n`;
        txtReport += '─'.repeat(40) + '\n';

        grouped[category].slice(0, 20).forEach(({ key, value }) => {
          const preview =
            typeof value === 'string' && value.length > 60
              ? value.substring(0, 60) + '...'
              : value;
          txtReport += `  • ${key}\n    "${preview}"\n`;
        });

        if (grouped[category].length > 20) {
          txtReport += `  ... ve ${grouped[category].length - 20} anahtar daha\n`;
        }
        txtReport += '\n';
      });
  }

  // Muhtemelen kullanılanlar
  if (categories.probablyUsed.length > 0) {
    txtReport += '\n🟡 MUHTEMELEN KULLANILAN ANAHTARLAR\n';
    txtReport += '─'.repeat(80) + '\n';
    txtReport += `Toplam: ${categories.probablyUsed.length} anahtar\n`;
    txtReport +=
      '❗ DİKKAT: Parent key kullanılıyor, bu anahtarlar dinamik olabilir\n\n';

    categories.probablyUsed.slice(0, 30).forEach(({ key, value, reason }) => {
      txtReport += `• ${key}\n`;
      txtReport += `  "${value}"\n`;
      txtReport += `  ${reason}\n\n`;
    });

    if (categories.probablyUsed.length > 30) {
      txtReport += `... ve ${categories.probablyUsed.length - 30} anahtar daha\n\n`;
    }
  }

  // Tekrar eden değerler
  if (duplicates.length > 0) {
    txtReport += '\n🔄 TEKRAR EDEN DEĞERLER (En Çok Tekrar Edenler)\n';
    txtReport += '─'.repeat(80) + '\n';
    txtReport += `Toplam: ${duplicates.length} tekrar eden değer\n`;
    txtReport += '❗ ÖNCELİK: DÜŞÜK - Birleştirilebilir ama acil değil\n\n';

    duplicates.slice(0, 30).forEach(({ value, count, keys }) => {
      const preview =
        value.length > 70 ? value.substring(0, 70) + '...' : value;
      txtReport += `"${preview}"\n`;
      txtReport += `${count} yerde kullanılıyor:\n`;
      keys.slice(0, 5).forEach(key => {
        txtReport += `  • ${key}\n`;
      });
      if (keys.length > 5) {
        txtReport += `  ... ve ${keys.length - 5} anahtar daha\n`;
      }
      txtReport += '\n';
    });
  }

  // Öneriler
  txtReport += '\n' + '═'.repeat(80) + '\n';
  txtReport += '💡 ÖNERİLER VE EYLEM PLANI\n';
  txtReport += '═'.repeat(80) + '\n\n';

  if (categories.empty.length > 0) {
    txtReport += `1️⃣ YÜKSEK ÖNCELİK: ${categories.empty.length} boş değeri hemen silin\n`;
    txtReport += '   Komut: node safe-clean-translations.js (Seçenek 1)\n\n';
  }

  if (categories.unused.length > 0) {
    txtReport += `2️⃣ ORTA ÖNCELİK: ${categories.unused.length} kullanılmayan anahtarı temizleyin\n`;
    txtReport += '   Önerilen Strateji:\n';
    txtReport += '   • Adım 1: İlk 100 anahtarı sil → Test et\n';
    txtReport += '   • Adım 2: Sonraki 500 anahtarı sil → Test et\n';
    txtReport += '   • Adım 3: Kalanları sil → Test et\n\n';
  }

  if (categories.probablyUsed.length > 0) {
    txtReport += `3️⃣ DİKKAT: ${categories.probablyUsed.length} anahtar dinamik kullanım olabilir\n`;
    txtReport += '   Bu anahtarları manuel kontrol edin\n\n';
  }

  if (duplicates.length > 50) {
    txtReport += `4️⃣ DÜŞÜK ÖNCELİK: ${duplicates.length} tekrar eden değer\n`;
    txtReport +=
      '   Önce kullanılmayanları temizleyin, sonra bunlara dönün\n\n';
  }

  const estimatedSavings =
    ((categories.unused.length + categories.empty.length) / totalKeys) * 100;
  txtReport += `💾 Potansiyel Tasarruf: ~${estimatedSavings.toFixed(1)}% (${categories.unused.length + categories.empty.length} anahtar)\n`;

  txtReport += '\n' + '═'.repeat(80) + '\n';
  txtReport += `Rapor Tarihi: ${new Date().toLocaleString('tr-TR')}\n`;
  txtReport += '═'.repeat(80) + '\n';

  fs.writeFileSync(txtReportPath, txtReport);

  log('✅ Analiz tamamlandı!\n', 'green');
  log('📄 Raporlar:', 'cyan');
  log(`   • ${path.basename(jsonReportPath)} (Detaylı JSON)`, 'blue');
  log(`   • ${path.basename(txtReportPath)} (Okunabilir)`, 'blue');

  log('\n💡 Sonraki Adım:', 'cyan');
  log(`   cat ${path.basename(txtReportPath)} | less`, 'yellow');
  log('   Raporu inceleyin ve temizleme stratejisi belirleyin\n', 'yellow');
}

// Çalıştır
smartAnalyze().catch(error => {
  log('\n❌ Hata:', 'red');
  console.error(error);
  process.exit(1);
});
