#!/usr/bin/env node
/**
 * 🎯 ŞABLOMAdır - KOPYALAYIN VE ÖZELLEŞTİRİN
 * 
 * Kullanım:
 * 1. Bu dosyayı kopyalayın: extract-{spread}-position{X}-tr.js
 * 2. Aşağıdaki değerleri güncelleyin:
 *    - SPREAD_NAME
 *    - POSITION_NUMBER
 *    - FILE_NAME
 *    - ARRAY_NAME
 *    - TYPE_NAME
 * 3. Çalıştırın: node scripts/extract-{spread}-position{X}-tr.js
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// BURASI ÖZELLEŞTİRİLECEK
// ═══════════════════════════════════════════════════════════

const SPREAD_NAME = 'relationship-problems';           // 'love', 'career', 'money', vb.
const POSITION_NUMBER = 1;            // 1, 2, 3, 4, vb.
const FILE_NAME = 'position-1-celiski-nedir.ts';  // position dosyasının adı
const ARRAY_NAME = `position${POSITION_NUMBER}Meanings`;  // position2Meanings, vb.
const TYPE_NAME = `RelationshipProblemsPositionMeaning`;  // LovePosition1Meaning, vb.

// ═══════════════════════════════════════════════════════════

console.log('=' . repeat(70));
console.log(`🔮 ${SPREAD_NAME.toUpperCase()} POSITION-${POSITION_NUMBER} TÜRKÇE EXTRACTION`);
console.log('='.repeat(70));

// Dosyayı oku
const filePath = path.join(__dirname, `../src/features/tarot/lib/${SPREAD_NAME}/${FILE_NAME}`);
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Array'i bul
const regex = new RegExp(`export const ${ARRAY_NAME}: ${TYPE_NAME}\\[\\] = \\[([\\s\\S]*?)\\];`);
const arrayMatch = fileContent.match(regex);

if (!arrayMatch) {
  console.error(`❌ ${ARRAY_NAME} array bulunamadı!`);
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

console.log(`📖 ${cardObjects.length} kart objesi bulundu\n`);

// Her kart için i18n yapısını oluştur
const meanings = {};

cardObjects.forEach((objStr, index) => {
  try {
    // Kart adını çıkar
    const cardMatch = objStr.match(/card:\s*['"]([^'"]+)['"]/);
    if (!cardMatch) return;
    
    const cardName = cardMatch[1];
    
    // cardKey oluştur (normalized)
    const cardKey = cardName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    // ⚠️ LOOKAHEAD ASSERTION ile field'ları doğru çıkar
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
    
    // Mevcut card objesini al veya oluştur
    if (!meanings[cardKey]) {
      meanings[cardKey] = {};
    }
    
    meanings[cardKey][`position${POSITION_NUMBER}`] = {
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

// Spread objesini koru ve meanings'i merge et
if (!trData[SPREAD_NAME]) {
  trData[SPREAD_NAME] = {};
}
if (!trData[SPREAD_NAME].meanings) {
  trData[SPREAD_NAME].meanings = {};
}

// Yeni position verilerini merge et
for (const [cardKey, cardData] of Object.entries(meanings)) {
  if (!trData[SPREAD_NAME].meanings[cardKey]) {
    trData[SPREAD_NAME].meanings[cardKey] = {};
  }
  trData[SPREAD_NAME].meanings[cardKey][`position${POSITION_NUMBER}`] = cardData[`position${POSITION_NUMBER}`];
}

// Dosyaya kaydet
fs.writeFileSync(trJsonPath, JSON.stringify(trData, null, 2), 'utf-8');

console.log('\n✅ Türkçe i18n anahtarları oluşturuldu!');
console.log(`📊 Toplam kart: ${Object.keys(meanings).length}`);
console.log(`📁 Dosya: messages/tr.json`);
console.log(`\n🔑 Örnek anahtarlar:`);
console.log(`  - ${SPREAD_NAME}.meanings.thefool.position${POSITION_NUMBER}.upright`);
console.log(`  - ${SPREAD_NAME}.meanings.thefool.position${POSITION_NUMBER}.reversed`);
console.log(`  - ${SPREAD_NAME}.meanings.thefool.position${POSITION_NUMBER}.keywords`);
console.log(`  - ${SPREAD_NAME}.meanings.thefool.position${POSITION_NUMBER}.context`);

