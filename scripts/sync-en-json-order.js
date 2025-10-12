const fs = require('fs');
const path = require('path');

const TR_PATH = path.join(__dirname, '../messages/tr.json');
const EN_PATH = path.join(__dirname, '../messages/en.json');
const EN_BACKUP_PATH = path.join(__dirname, '../messages/en.backup-' + new Date().toISOString().replace(/:/g, '-') + '.json');

console.log('🔄 en.json sıralamasını tr.json\'a göre düzenleniyor...\n');

// Dosyaları oku
const trData = JSON.parse(fs.readFileSync(TR_PATH, 'utf8'));
const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));

// Backup oluştur
fs.writeFileSync(EN_BACKUP_PATH, JSON.stringify(enData, null, 2), 'utf8');
console.log('✅ Yedek oluşturuldu:', EN_BACKUP_PATH);

// İstatistikler için sayaçlar
let missingKeysCount = 0;
let extraKeysCount = 0;
const missingKeysList = [];
const extraKeysList = [];

// Rekürsif olarak objeyi tr.json sırasına göre yeniden düzenle
function reorderObject(trObj, enObj, path = '') {
  const result = {};

  // tr.json'daki sırayı takip et
  for (const key in trObj) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (enObj.hasOwnProperty(key)) {
      if (typeof trObj[key] === 'object' && trObj[key] !== null && !Array.isArray(trObj[key])) {
        // İç içe obje ise rekürsif çağır
        result[key] = reorderObject(trObj[key], enObj[key], currentPath);
      } else {
        // Değer ise en.json'daki değeri koru
        result[key] = enObj[key];
      }
    } else {
      // tr.json'da var ama en.json'da yok
      missingKeysCount++;
      missingKeysList.push(currentPath);
      // tr.json'daki değeri koy (daha sonra çevrilmek üzere)
      result[key] = trObj[key];
    }
  }

  // en.json'da olup tr.json'da olmayan keyleri bul
  for (const key in enObj) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!trObj.hasOwnProperty(key)) {
      extraKeysCount++;
      extraKeysList.push(currentPath);
      // Bu keyler sonuç dosyasına eklenmeyecek (temizleme yapıyoruz)
    }
  }

  return result;
}

// Ana işlem
console.log('📊 Karşılaştırma yapılıyor...\n');
const reorderedEn = reorderObject(trData, enData);

// Yeni en.json'u kaydet
fs.writeFileSync(EN_PATH, JSON.stringify(reorderedEn, null, 2), 'utf8');

console.log('\n✅ en.json başarıyla yeniden düzenlendi!\n');
console.log('📄 Key sıralaması artık tr.json ile aynı');
console.log('🌍 İngilizce değerler korundu');
console.log('💾 Orijinal dosya yedeklendi\n');

// İstatistik raporu
console.log('📊 İSTATİSTİKLER:');
console.log('─────────────────────────────────────');
console.log(`⚠️  Eksik key sayısı (tr.json'da var, en.json'da yok): ${missingKeysCount}`);
console.log(`⚠️  Fazla key sayısı (en.json'da var, tr.json'da yok): ${extraKeysCount}`);

if (missingKeysCount > 0) {
  console.log('\n⚠️  EKSİK KEY\'LER (İLK 20):');
  missingKeysList.slice(0, 20).forEach(key => console.log(`   - ${key}`));
  if (missingKeysCount > 20) {
    console.log(`   ... ve ${missingKeysCount - 20} tane daha`);
  }
  console.log('\n   💡 Bu key\'ler tr.json\'dan kopyalandı ve çevrilmeyi bekliyor.');
}

if (extraKeysCount > 0) {
  console.log('\n⚠️  FAZLA KEY\'LER (İLK 20):');
  extraKeysList.slice(0, 20).forEach(key => console.log(`   - ${key}`));
  if (extraKeysCount > 20) {
    console.log(`   ... ve ${extraKeysCount - 20} tane daha`);
  }
  console.log('\n   💡 Bu key\'ler en.json\'dan kaldırıldı.');
}

console.log('\n✨ İşlem tamamlandı!\n');

