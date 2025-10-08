#!/usr/bin/env node
/**
 * position-1-ilgi-duydugun-kisi.ts dosyasından Türkçe metinleri çıkarıp
 * messages/tr.json için i18n anahtarları oluşturur
 */

const fs = require('fs');
const path = require('path');

// Dosyayı oku
const filePath = path.join(__dirname, '../src/features/tarot/lib/love/position-1-ilgi-duydugun-kisi.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

// position1Meanings array'ini bul
const arrayMatch = fileContent.match(/export const position1Meanings: LovePosition1Meaning\[\] = \[([\s\S]*?)\];/);

if (!arrayMatch) {
  console.error('❌ position1Meanings array bulunamadı!');
  process.exit(1);
}

const arrayContent = arrayMatch[1];

// Her bir kart objesini parse et
const cardObjects = [];
let currentObject = '';
let braceCount = 0;
let inObject = false;

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  
  if (char === '{') {
    if (braceCount === 0) {
      inObject = true;
      currentObject = '{';
    } else {
      currentObject += char;
    }
    braceCount++;
  } else if (char === '}') {
    braceCount--;
    currentObject += char;
    
    if (braceCount === 0 && inObject) {
      cardObjects.push(currentObject);
      currentObject = '';
      inObject = false;
    }
  } else if (inObject) {
    currentObject += char;
  }
}

console.log(`📖 ${cardObjects.length} kart objesi bulundu`);

// Her kart için i18n yapısını oluştur
const meanings = {};

cardObjects.forEach((objStr, index) => {
  try {
    // Kart adını çıkar
    const cardMatch = objStr.match(/card:\s*['"]([^'"]+)['"]/);
    if (!cardMatch) return;
    
    const cardName = cardMatch[1];
    
    // cardKey oluştur
    const cardKey = cardName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    // upright metni çıkar
    const uprightMatch = objStr.match(/upright:\s*['"]([^'"]*(?:'[^'"]*)*)['"]/s);
    const upright = uprightMatch ? uprightMatch[1].replace(/\\n/g, ' ').trim() : '';
    
    // reversed metni çıkar
    const reversedMatch = objStr.match(/reversed:\s*['"]([^'"]*(?:'[^'"]*)*)['"]/s);
    const reversed = reversedMatch ? reversedMatch[1].replace(/\\n/g, ' ').trim() : '';
    
    // keywords çıkar
    const keywordsMatch = objStr.match(/keywords:\s*\[([\s\S]*?)\]/);
    let keywords = [];
    if (keywordsMatch) {
      const keywordsStr = keywordsMatch[1];
      keywords = keywordsStr
        .split(',')
        .map(k => k.trim().replace(/['"]/g, ''))
        .filter(k => k.length > 0);
    }
    
    // context çıkar
    const contextMatch = objStr.match(/context:\s*['"]([^'"]*(?:'[^'"]*)*)['"]/s);
    const context = contextMatch ? contextMatch[1].replace(/\\n/g, ' ').trim() : '';
    
    meanings[cardKey] = {
      position1: {
        upright,
        reversed,
        keywords,
        context
      }
    };
    
    console.log(`  ✅ ${index + 1}/${cardObjects.length} - ${cardName} (${cardKey})`);
    
  } catch (error) {
    console.error(`❌ Hata (obje ${index}):`, error.message);
  }
});

// cardGroups ekle
const cardGroups = {
  majorArcana: "Majör Arkana",
  cups: "Kupalar",
  swords: "Kılıçlar",
  wands: "Asalar",
  pentacles: "Tılsımlar"
};

// love objesini oluştur
const loveData = {
  meanings,
  cardGroups
};

// Mevcut tr.json'u oku
const trJsonPath = path.join(__dirname, '../messages/tr.json');
let trData = {};

try {
  trData = JSON.parse(fs.readFileSync(trJsonPath, 'utf-8'));
  console.log('\n📖 Mevcut tr.json okundu');
} catch (error) {
  console.log('\n⚠️  Mevcut tr.json bulunamadı, yeni oluşturulacak');
}

// love anahtarını ekle/güncelle
trData.love = {
  ...trData.love,
  ...loveData
};

// Dosyaya kaydet
fs.writeFileSync(trJsonPath, JSON.stringify(trData, null, 2), 'utf-8');

console.log('\n✅ Türkçe i18n anahtarları oluşturuldu!');
console.log(`📊 Toplam kart: ${Object.keys(meanings).length}`);
console.log(`📁 Dosya: messages/tr.json`);
console.log(`\n🔑 Örnek anahtarlar:`);
console.log(`  - love.meanings.thefool.position1.upright`);
console.log(`  - love.meanings.thefool.position1.reversed`);
console.log(`  - love.meanings.thefool.position1.keywords`);
console.log(`  - love.meanings.thefool.position1.context`);
console.log(`  - love.cardGroups.majorArcana`);

