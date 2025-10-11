const fs = require('fs');

const filePath = 'i18nfix/blog.json.partial';
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Final düzeltme yapılıyor...\n');

const lines = content.split('\n');
const fixedLines = [];
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const prevLine = i > 0 ? lines[i - 1].trim() : '';
  
  // Eğer satır "question" ile başlıyorsa ve önceki satır },
  // ise eksik { ekle
  if (trimmed.startsWith('"question":') && prevLine === '},') {
    const indent = line.match(/^(\s*)/)[1];
    // İki boşluk geri git (obje için)
    const objIndent = indent.substring(0, indent.length - 2);
    fixedLines.push(objIndent + '{');
    console.log(`➕ Satır ${i + 1}: Eksik { eklendi`);
    fixCount++;
  }
  
  fixedLines.push(line);
}

const fixedContent = fixedLines.join('\n');

try {
  // JSON parse kontrolü
  const parsed = JSON.parse(fixedContent);
  
  // Başarılı!
  fs.writeFileSync('i18nfix/blog.json', JSON.stringify(parsed, null, 2), 'utf8');
  
  console.log('\n✅ Dosya başarıyla düzeltildi!');
  console.log(`\n📊 İstatistikler:`);
  console.log(`   - Bu aşamada yapılan düzeltme: ${fixCount}`);
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
    console.log('\n⚠️  Uyarı: Duplike kartlar bulundu:');
    duplicates.forEach(d => console.log(`   - ${d}`));
  } else {
    console.log('\n✨ Duplike kart bulunamadı!');
  }
  
  // Geçici dosyaları temizle
  if (fs.existsSync('i18nfix/blog.json.partial')) {
    fs.unlinkSync('i18nfix/blog.json.partial');
  }
  if (fs.existsSync('i18nfix/blog.json.temp')) {
    fs.unlinkSync('i18nfix/blog.json.temp');
  }
  console.log('\n🗑️  Geçici dosyalar temizlendi');
  
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
    for (let i = Math.max(0, lineNum - 5); i < Math.min(errorLines.length, lineNum + 3); i++) {
      const marker = i === lineNum - 1 ? '>>> ' : '    ';
      console.error(`${marker}${i + 1}: ${errorLines[i]}`);
    }
  }
  
  fs.writeFileSync('i18nfix/blog.json.error', fixedContent, 'utf8');
  console.log(`\n💾 Hatalı içerik i18nfix/blog.json.error olarak kaydedildi`);
}

