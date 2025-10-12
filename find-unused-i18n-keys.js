#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// tr.json dosyasını oku
const trJsonPath = path.join(__dirname, 'messages', 'tr.json');
const trJson = JSON.parse(fs.readFileSync(trJsonPath, 'utf8'));

// Tüm anahtarları al (nested keys için recursive function)
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(fullKey);
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const allKeys = getAllKeys(trJson);
console.log(`📊 Toplam anahtar sayısı: ${allKeys.length}`);

// Kaynak kod dosyalarını bul
const sourceFiles = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*']
});

console.log(`📁 Taranacak dosya sayısı: ${sourceFiles.length}`);
console.log('🔍 Tüm kaynak kodu birleştiriliyor...\n');

// Tüm kaynak kodları tek bir string'de birleştir (daha az hafıza kullanımı)
let allSourceCode = '';
let fileCount = 0;
for (const file of sourceFiles) {
  fileCount++;
  if (fileCount % 100 === 0) {
    console.log(`   İşlenen dosya: ${fileCount}/${sourceFiles.length}`);
  }
  
  try {
    allSourceCode += '\n' + fs.readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`❌ Hata (${file}): ${error.message}`);
  }
}

console.log('\n🔍 Kullanılmayan anahtarlar aranıyor...');

// Kullanılmayan anahtarları bul (basit string search, regex yerine)
const unusedKeys = [];
let checkedCount = 0;

for (const key of allKeys) {
  checkedCount++;
  if (checkedCount % 1000 === 0) {
    console.log(`   Kontrol edilen: ${checkedCount}/${allKeys.length} (${((checkedCount / allKeys.length) * 100).toFixed(1)}%)`);
  }
  
  // Farklı kullanım şekillerini kontrol et
  const quoted1 = `"${key}"`;
  const quoted2 = `'${key}'`;
  const quoted3 = `\`${key}\``;
  
  // Anahtarın kaynak kodda geçip geçmediğini kontrol et
  if (!allSourceCode.includes(quoted1) && 
      !allSourceCode.includes(quoted2) && 
      !allSourceCode.includes(quoted3)) {
    unusedKeys.push(key);
  }
}

const usedCount = allKeys.length - unusedKeys.length;

console.log('\n' + '='.repeat(80));
console.log('📈 SONUÇLAR');
console.log('='.repeat(80));
console.log(`✅ Kullanılan anahtar: ${usedCount}`);
console.log(`❌ Kullanılmayan anahtar: ${unusedKeys.length}`);
console.log(`📊 Kullanım oranı: ${((usedCount / allKeys.length) * 100).toFixed(2)}%`);

if (unusedKeys.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('❌ KULLANILMAYAN ANAHTARLAR:');
  console.log('='.repeat(80));
  
  // Anahtarları grupla (üst anahtar bazında)
  const groupedUnused = {};
  for (const key of unusedKeys) {
    const topLevel = key.split('.')[0];
    if (!groupedUnused[topLevel]) {
      groupedUnused[topLevel] = [];
    }
    groupedUnused[topLevel].push(key);
  }
  
  // Gruplara göre yazdır
  for (const [group, keys] of Object.entries(groupedUnused).sort()) {
    console.log(`\n[${group}] - ${keys.length} anahtar:`);
    keys.slice(0, 10).forEach(key => {
      console.log(`  - ${key}`);
    });
    if (keys.length > 10) {
      console.log(`  ... ve ${keys.length - 10} anahtar daha`);
    }
  }
  
  // Sonuçları dosyaya kaydet
  const reportPath = path.join(__dirname, 'unused-i18n-keys.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalKeys: allKeys.length,
      usedKeys: usedCount,
      unusedKeys: unusedKeys.length,
      usagePercentage: ((usedCount / allKeys.length) * 100).toFixed(2) + '%'
    },
    unusedKeysByGroup: groupedUnused,
    unusedKeysList: unusedKeys.sort()
  }, null, 2));
  
  console.log('\n' + '='.repeat(80));
  console.log(`💾 Detaylı rapor kaydedildi: ${reportPath}`);
  console.log('\n⚠️  NOT: Bu analiz sadece basit string eşleşmesi kullanır.');
  console.log('   Dinamik olarak oluşturulan anahtarlar tespit edilemeyebilir.');
  console.log('   Raporu kontrol edip emin olduktan sonra silme işlemi yapın.');
}

console.log('\n✨ Analiz tamamlandı!\n');
