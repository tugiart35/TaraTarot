#!/usr/bin/env node
/**
 * position-2-fiziksel.ts dosyasından Türkçe metinleri çıkarıp
 * messages/tr.json için i18n anahtarları oluşturur
 */

const fs = require('fs');
const path = require('path');

// Dosyayı oku
const filePath = path.join(__dirname, '../src/features/tarot/lib/love/position-2-fiziksel.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

// position2Meanings array'ini bul
const arrayMatch = fileContent.match(/export const position2Meanings: LovePositionMeaning\[\] = \[([\s\S]*?)\];/);

if (!arrayMatch) {
  console.error('❌ position2Meanings array bulunamadı!');
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
    
    // upright metni çıkar (field sonuna kadar al, sonraki field'a veya } 'a kadar)
    const uprightMatch = objStr.match(/upright:\s*['"`]([\s\S]*?)['"`]\s*,?\s*(?=reversed:|keywords:|context:|group:|$)/);
    const upright = uprightMatch ? uprightMatch[1].trim() : '';
    
    // reversed metni çıkar
    const reversedMatch = objStr.match(/reversed:\s*['"`]([\s\S]*?)['"`]\s*,?\s*(?=keywords:|context:|group:|$)/);
    const reversed = reversedMatch ? reversedMatch[1].trim() : '';
    
    // keywords çıkar
    const keywordsMatch = objStr.match(/keywords:\s*\[([\s\S]*?)\]\s*,?\s*(?=context:|group:|$)/);
    let keywords = [];
    if (keywordsMatch) {
      const keywordsStr = keywordsMatch[1];
      keywords = keywordsStr
        .split(',')
        .map(k => k.trim().replace(/^['"`]|['"`]$/g, ''))
        .filter(k => k.length > 0);
    }
    
    // context çıkar
    const contextMatch = objStr.match(/context:\s*['"`]([\s\S]*?)['"`]\s*,?\s*(?=group:|$)/);
    const context = contextMatch ? contextMatch[1].trim() : '';
    
    // Mevcut position2 objesini al veya oluştur
    if (!meanings[cardKey]) {
      meanings[cardKey] = {};
    }
    
    meanings[cardKey].position2 = {
      upright,
      reversed,
      keywords,
      context
    };
    
    console.log(`  ✅ ${index + 1}/${cardObjects.length} - ${cardName} (${cardKey})`);
    
  } catch (error) {
    console.error(`❌ Hata (obje ${index}):`, error.message);
  }
});

// Mevcut tr.json'u oku
const trJsonPath = path.join(__dirname, '../messages/tr.json');
let trData = {};

try {
  trData = JSON.parse(fs.readFileSync(trJsonPath, 'utf-8'));
  console.log('\n📖 Mevcut tr.json okundu');
} catch (error) {
  console.log('\n⚠️  Mevcut tr.json bulunamadı, yeni oluşturulacak');
}

// love objesini koru ve meanings'i merge et
if (!trData.love) {
  trData.love = {};
}
if (!trData.love.meanings) {
  trData.love.meanings = {};
}

// Yeni position2 verilerini merge et
for (const [cardKey, cardData] of Object.entries(meanings)) {
  if (!trData.love.meanings[cardKey]) {
    trData.love.meanings[cardKey] = {};
  }
  trData.love.meanings[cardKey].position2 = cardData.position2;
}

// Dosyaya kaydet
fs.writeFileSync(trJsonPath, JSON.stringify(trData, null, 2), 'utf-8');

console.log('\n✅ Türkçe position-2 i18n anahtarları oluşturuldu!');
console.log(`📊 Toplam kart: ${Object.keys(meanings).length}`);
console.log(`📁 Dosya: messages/tr.json`);
console.log(`\n🔑 Örnek anahtarlar:`);
console.log(`  - love.meanings.thefool.position2.upright`);
console.log(`  - love.meanings.thefool.position2.reversed`);
console.log(`  - love.meanings.thefool.position2.keywords`);
console.log(`  - love.meanings.thefool.position2.context`);

