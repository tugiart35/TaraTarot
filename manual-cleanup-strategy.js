#!/usr/bin/env node

/**
 * Manuel Temizleme Stratejisi
 * Kategorilere göre güvenli temizlik
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// TR.json'u yükle
const trPath = path.join(__dirname, 'messages', 'tr.json');
const trData = JSON.parse(fs.readFileSync(trPath, 'utf-8'));

log('\n🔍 Manuel Kategori Analizi', 'cyan');
log('═'.repeat(60), 'cyan');

// Ana kategorileri listele
const topLevelKeys = Object.keys(trData);
log('\n📁 Ana Kategoriler:', 'yellow');

const categoryInfo = {
  // Kesinlikle KULLANILIYOR
  safe: {
    blog: 'Kart sayfalarında kullanılıyor',
    dashboard: 'Dashboard sayfalarında kullanılıyor',
    common: 'Tüm sayfalarda ortak kullanım',
    navigation: 'Navigasyon menülerinde',
    reading: 'Okuma formlarında',
    tarot: 'Tarot okumalarında',
    messages: 'Sistem mesajlarında',
  },

  // Muhtemelen KULLANILIYOR - Kontrol edilmeli
  needsReview: {
    auth: 'Auth sisteminde - Kontrol et',
    admin: 'Admin panelinde - Kontrol et',
    accessibility: 'Erişilebilirlik - Kontrol et',
    payment: 'Ödeme sisteminde - Kontrol et',
  },

  // Kullanım şüpheli - Detaylı inceleme gerekli
  suspicious: {
    situationAnalysis: 'Situation analiz - Kullanılıyor mu?',
    relationshipAnalysis: 'Relationship analiz - Kullanılıyor mu?',
    problemSolving: 'Problem solving - Kullanılıyor mu?',
    marriage: 'Evlilik açılımı - Kullanılıyor mu?',
    newLover: 'Yeni aşk - Kullanılıyor mu?',
    money: 'Para açılımı - Kullanılıyor mu?',
  },
};

// Her kategoriyi say
topLevelKeys.forEach(key => {
  const count = countKeys(trData[key]);
  const status = categoryInfo.safe[key]
    ? '✅ GÜVENLİ'
    : categoryInfo.needsReview[key]
      ? '🟡 KONTROL'
      : categoryInfo.suspicious[key]
        ? '⚠️  ŞÜPHELİ'
        : '❓ BİLİNMİYOR';

  const note =
    categoryInfo.safe[key] ||
    categoryInfo.needsReview[key] ||
    categoryInfo.suspicious[key] ||
    'Bilinmiyor';

  log(
    `  ${status} ${key.padEnd(25)} (${count.toString().padStart(4)} anahtar) - ${note}`
  );
});

function countKeys(obj) {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countKeys(obj[key]);
    } else {
      count++;
    }
  }
  return count;
}

log('\n💡 ÖNERİLEN STRATEJİ:', 'cyan');
log('═'.repeat(60), 'cyan');

log('\n1️⃣ İLK ADIM: Boş değerleri temizle', 'yellow');
log('   • newLover.form.concernQuestion', 'white');
log('   • newLover.form.emotionalQuestion', 'white');
log('   • newLover.form.understandingQuestion', 'white');

log('\n2️⃣ İKİNCİ ADIM: Şüpheli kategorileri kontrol et', 'yellow');
log('   Tarot spread component dosyalarını kontrol edin:', 'white');
log('   • src/features/tarot/components/Situation-Analysis/', 'white');
log('   • src/features/tarot/components/Marriage/', 'white');
log('   • src/features/tarot/components/Money-Spread/', 'white');
log('   Bu klasörler varsa ve kullanılıyorsa anahtarları SAKLA', 'white');

log('\n3️⃣ ÜÇÜNCÜ ADIM: Backup klasörünü kontrol et', 'yellow');
log('   • .backup dosyalarındaki anahtarlar muhtemelen ESKİ', 'white');
log('   • Bunlar silinebilir', 'white');

log('\n📝 Dosyayı manuel inceleyin:', 'cyan');
log('   cat messages/tr.json | jq "keys"', 'yellow');
log('');
