const fs = require('fs');

console.log('🔧 Tüm blog.json hataları düzeltiliyor...\n');

const content = fs.readFileSync('i18nfix/blog.json', 'utf8');
const lines = content.split('\n');
const fixedLines = [];

let removedBraces = 0;
let addedCommas = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const prevLine = i > 0 ? lines[i - 1].trim() : '';
  const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
  
  // 1. Gereksiz açılış süslü parantezlerini kaldır
  if (trimmed === '{' && prevLine.endsWith(',')) {
    if (nextLine.startsWith('"') && (nextLine.includes('"question":') || nextLine.includes('"card":'))) {
      console.log(`✂️  Satır ${i + 1}: Gereksiz { kaldırıldı`);
      removedBraces++;
      continue; // Bu satırı atla
    }
  }
  
  // 2. Kart sonlarına virgül ekle (} ile biten ve sonraki satır " ile başlayan)
  if (trimmed === '}' && nextLine.startsWith('"') && nextLine.includes(':')) {
    fixedLines.push(line.replace('}', '},'));
    console.log(`➕ Satır ${i + 1}: } -> }, düzeltildi`);
    addedCommas++;
    continue;
  }
  
  fixedLines.push(line);
}

const fixedContent = fixedLines.join('\n');

// JSON geçerliliğini kontrol et
try {
  const parsed = JSON.parse(fixedContent);
  
  // Başarılı!
  const keys = Object.keys(parsed);
  console.log('\n✅ JSON başarıyla düzeltildi!');
  console.log(`\n📊 Düzeltmeler:`);
  console.log(`   - Kaldırılan gereksiz {: ${removedBraces}`);
  console.log(`   - Eklenen virgül: ${addedCommas}`);
  console.log(`   - Toplam kart: ${keys.length}`);
  
  // Duplikat kontrolü
  const seen = new Set();
  const duplicates = [];
  keys.forEach(key => {
    if (seen.has(key)) {
      duplicates.push(key);
    }
    seen.add(key);
  });
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  ${duplicates.length} duplike kart bulundu`);
    const unique = [...new Set(duplicates)];
    console.log('   İlk 10:', unique.slice(0, 10).join(', '));
    
    // Duplikatları temizle - sonuncuyu tut
    const cleanData = {};
    keys.forEach(key => {
      cleanData[key] = parsed[key];
    });
    
    console.log(`\n✨ Duplikatlar kaldırılıyor...`);
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(cleanData, null, 2), 'utf8');
    console.log(`✅ Temiz dosya kaydedildi! Kalan: ${Object.keys(cleanData).length} kart`);
  } else {
    // Duplikat yok, güzelce kaydet
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(parsed, null, 2), 'utf8');
    console.log('\n✨ Duplike kart yok! Dosya düzenli formatta kaydedildi.');
  }
  
  console.log('\n🎉 İşlem tamamlandı!');
  
} catch (e) {
  console.error('\n❌ Hata:', e.message);
  
  const match = e.message.match(/position (\d+)|line (\d+)/);
  if (match) {
    const lineNum = parseInt(match[2] || match[1]);
    console.error(`\n📍 Hata konumu: Satır ${lineNum}`);
    
    if (lineNum) {
      const errorLines = fixedContent.split('\n');
      console.error('\nHatalı bölge:');
      for (let i = Math.max(0, lineNum - 3); i < Math.min(errorLines.length, lineNum + 2); i++) {
        const marker = i === lineNum - 1 ? '>>> ' : '    ';
        console.error(`${marker}${i + 1}: ${errorLines[i].substring(0, 100)}`);
      }
    }
  }
  
  fs.writeFileSync('i18nfix/blog-error.json', fixedContent, 'utf8');
  console.log('\n💾 Kısmen düzeltilmiş dosya: i18nfix/blog-error.json');
}

// Script'i sil
fs.unlinkSync('fix-all-blog-errors.js');

