const fs = require('fs');

console.log('🔧 Eksik virgüller düzeltiliyor...\n');

const content = fs.readFileSync('i18nfix/blog-error.json', 'utf8');
const lines = content.split('\n');
const fixedLines = [];

let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
  
  // Eğer satır " ile bitiyorsa (virgül yok) ve sonraki satır " ile başlayan bir key ise, virgül ekle
  if (trimmed.endsWith('"') && !trimmed.endsWith('",') && !trimmed.endsWith('"}') && !trimmed.endsWith('"]')) {
    if (nextLine.startsWith('"') && nextLine.includes(':')) {
      fixedLines.push(line.replace(/"$/, '",'));
      console.log(`➕ Satır ${i + 1}: Eksik virgül eklendi`);
      fixCount++;
      continue;
    }
  }
  
  fixedLines.push(line);
}

const fixedContent = fixedLines.join('\n');

try {
  const parsed = JSON.parse(fixedContent);
  const keys = Object.keys(parsed);
  
  console.log('\n✅ JSON başarıyla düzeltildi!');
  console.log(`   - Eklenen virgül: ${fixCount}`);
  console.log(`   - Toplam kart: ${keys.length}`);
  
  // Duplikat kontrolü
  const seen = new Set();
  const duplicates = [];
  keys.forEach(key => {
    if (seen.has(key)) duplicates.push(key);
    seen.add(key);
  });
  
  if (duplicates.length > 0) {
    const unique = [...new Set(duplicates)];
    console.log(`\n⚠️  ${unique.length} duplike kart bulundu:`);
    console.log('   ', unique.slice(0, 15).join(', '));
    if (unique.length > 15) console.log(`    ... ve ${unique.length - 15} tane daha`);
    
    // Duplikatları temizle
    const cleanData = {};
    keys.forEach(key => {
      cleanData[key] = parsed[key];
    });
    
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(cleanData, null, 2), 'utf8');
    console.log(`\n✅ Duplikatlar kaldırıldı! Kalan: ${Object.keys(cleanData).length} kart`);
  } else {
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(parsed, null, 2), 'utf8');
    console.log('\n✨ Duplike kart yok!');
  }
  
  // Temizlik
  ['i18nfix/blog-error.json', 'fix-missing-commas.js'].forEach(f => {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  });
  
  console.log('\n🎉 Dosya başarıyla düzeltildi ve kaydedildi!');
  
} catch (e) {
  console.error('\n❌ Hata:', e.message);
  
  const match = e.message.match(/line (\d+)/);
  if (match) {
    const lineNum = parseInt(match[1]);
    console.error(`\n📍 Satır: ${lineNum}`);
    
    const errorLines = fixedContent.split('\n');
    console.error('\nHatalı bölge:');
    for (let i = Math.max(0, lineNum - 4); i < Math.min(errorLines.length, lineNum + 2); i++) {
      const marker = i === lineNum - 1 ? '>>> ' : '    ';
      console.error(`${marker}${i + 1}: ${errorLines[i].substring(0, 120)}`);
    }
  }
  
  fs.writeFileSync('i18nfix/blog-partial.json', fixedContent, 'utf8');
  console.log('\n💾 Kısmi dosya: i18nfix/blog-partial.json');
}

