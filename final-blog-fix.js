const fs = require('fs');

console.log('🔧 Blog.json DOĞRU düzeltme yapılıyor...\n');

const content = fs.readFileSync('i18nfix/blog.json', 'utf8');
const lines = content.split('\n');
const fixedLines = [];

let addedCommas = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
  const next2Line = i < lines.length - 2 ? lines[i + 2].trim() : '';
  
  // Kart bitişlerinde virgül ekle
  // Eğer satır } ile bitiyorsa, sonraki satır boş ve ondan sonraki satır " ile başlayan bir key ise
  if (trimmed === '}' && nextLine === '' && next2Line.startsWith('"') && next2Line.includes(':')) {
    fixedLines.push(line.replace('}', '},'));
    console.log(`➕ Satır ${i + 1}: Kart sonu virgülü eklendi`);
    addedCommas++;
  } else {
    fixedLines.push(line);
  }
}

const fixedContent = fixedLines.join('\n');

try {
  const parsed = JSON.parse(fixedContent);
  const keys = Object.keys(parsed);
  
  console.log('\n✅ JSON başarıyla düzeltildi!');
  console.log(`   - Eklenen virgül: ${addedCommas}`);
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
    console.log('   İlk 20:', unique.slice(0, 20).join(', '));
    if (unique.length > 20) console.log(`   ... ve ${unique.length - 20} tane daha`);
    
    // Duplikatları temizle - sonuncuyu tut
    const cleanData = {};
    keys.forEach(key => {
      cleanData[key] = parsed[key];
    });
    
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(cleanData, null, 2), 'utf8');
    console.log(`\n✅ Duplikatlar kaldırıldı! Kalan: ${Object.keys(cleanData).length} kart`);
  } else {
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(parsed, null, 2), 'utf8');
    console.log('\n✨ Duplike kart yok! Dosya kaydedildi.');
  }
  
  // Temizlik
  const tempFiles = [
    'i18nfix/blog-error.json',
    'i18nfix/blog-partial.json',
    'final-blog-fix.js',
    'rebuild-blog-json.js'
  ];
  
  tempFiles.forEach(f => {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`🗑️  ${f} silindi`);
    }
  });
  
  console.log('\n🎉 Tüm düzeltmeler tamamlandı!');
  
} catch (e) {
  console.error('\n❌ Hata:', e.message);
  
  const match = e.message.match(/line (\d+)|position (\d+)/);
  if (match) {
    const info = match[1] || match[2];
    console.error(`   Konum: ${match[1] ? 'Satır' : 'Pozisyon'} ${info}`);
    
    if (match[1]) {
      const lineNum = parseInt(match[1]);
      const errorLines = fixedContent.split('\n');
      console.error('\nHatalı bölge:');
      for (let i = Math.max(0, lineNum - 5); i < Math.min(errorLines.length, lineNum + 3); i++) {
        const marker = i === lineNum - 1 ? '>>> ' : '    ';
        console.error(`${marker}${i + 1}: ${errorLines[i].substring(0, 100)}`);
      }
    }
  }
  
  fs.writeFileSync('i18nfix/blog-FAILED.json', fixedContent, 'utf8');
  console.log('\n💾 Hatalı dosya: i18nfix/blog-FAILED.json');
  process.exit(1);
}

