const fs = require('fs');

const filePath = 'i18nfix/blog.json.manual-fix-needed';
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fazla virgüller (trailing commas) temizleniyor...\n');

const lines = content.split('\n');
const fixedLines = [];
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
  
  // Eğer satır "...", ile bitiyorsa ve sonraki satır } veya ], ise virgülü kaldır
  if (trimmed.endsWith('",') && (nextLine === '}' || nextLine === '},')) {
    const fixed = line.replace(/",\s*$/, '"');
    fixedLines.push(fixed);
    console.log(`✂️  Satır ${i + 1}: Fazla virgül kaldırıldı`);
    fixCount++;
  } else {
    fixedLines.push(line);
  }
}

const fixedContent = fixedLines.join('\n');

try {
  // JSON parse kontrolü
  const parsed = JSON.parse(fixedContent);
  
  // Başarılı!
  fs.writeFileSync('i18nfix/blog.json', JSON.stringify(parsed, null, 2), 'utf8');
  
  console.log('\n✅ Dosya başarıyla düzeltildi!');
  console.log(`\n📊 İstatistikler:`);
  console.log(`   - Temizlenen fazla virgül: ${fixCount}`);
  console.log(`   - Toplam kart: ${Object.keys(parsed).length}`);
  console.log(`   - Dosya boyutu: ${(Buffer.byteLength(JSON.stringify(parsed, null, 2), 'utf8') / 1024).toFixed(2)} KB`);
  
  // Duplikat kontrolü
  const keys = Object.keys(parsed);
  const seen = new Set();
  const duplicates = [];
  
  keys.forEach(key => {
    if (seen.has(key)) {
      duplicates.push(key);
    }
    seen.add(key);
  });
  
  if (duplicates.length > 0) {
    console.log('\n⚠️  Duplike kartlar bulundu:');
    const uniqueDuplicates = [...new Set(duplicates)];
    uniqueDuplicates.forEach(d => console.log(`   - ${d}`));
    
    // Duplikatları kaldır
    const uniqueData = {};
    keys.forEach(key => {
      uniqueData[key] = parsed[key];
    });
    
    fs.writeFileSync('i18nfix/blog.json', JSON.stringify(uniqueData, null, 2), 'utf8');
    console.log(`\n✅ Duplikatlar kaldırıldı! Kalan: ${Object.keys(uniqueData).length} kart`);
  } else {
    console.log('\n✨ Duplike kart bulunamadı!');
  }
  
  // Geçici dosyaları temizle
  const tempFiles = [
    'i18nfix/blog.json.partial',
    'i18nfix/blog.json.temp',
    'i18nfix/blog.json.error',
    'i18nfix/blog.json.failed',
    'i18nfix/blog.json.manual-fix-needed',
    'fix-tr-json.js',
    'fix-blog-json.js',
    'fix-blog-json-advanced.js',
    'fix-blog-final.js',
    'fix-blog-complete.js',
    'fix-blog-final-complete.js',
    'fix-trailing-commas.js'
  ];
  
  let cleanedCount = 0;
  tempFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      cleanedCount++;
    }
  });
  
  if (cleanedCount > 0) {
    console.log(`\n🗑️  ${cleanedCount} geçici dosya temizlendi`);
  }
  
  console.log('\n🎉 Tüm düzeltmeler başarıyla tamamlandı!');
  console.log('📄 Düzeltilmiş dosya: i18nfix/blog.json');
  
} catch (e) {
  console.error('\n❌ Hata:', e.message);
  
  // Hatanın yerini bul
  const match = e.message.match(/position (\d+)|line (\d+)/);
  if (match) {
    const pos = parseInt(match[1] || match[2]);
    const upToError = fixedContent.substring(0, pos);
    const lineNum = upToError.split('\n').length;
    
    console.error(`\n📍 Hata konumu: Satır ${lineNum}`);
    console.error('\nHatalı bölge:');
    
    const errorLines = fixedContent.split('\n');
    for (let i = Math.max(0, lineNum - 8); i < Math.min(errorLines.length, lineNum + 3); i++) {
      const marker = i === lineNum - 1 ? '>>> ' : '    ';
      console.error(`${marker}${i + 1}: ${errorLines[i]}`);
    }
  }
  
  fs.writeFileSync('i18nfix/blog-FINAL-ERROR.json', fixedContent, 'utf8');
  console.log(`\n💾 Son hata: i18nfix/blog-FINAL-ERROR.json`);
}

