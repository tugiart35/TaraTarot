const fs = require('fs');

const filePath = 'i18nfix/blog.json';
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔍 Blog.json dosyası detaylı analiz ediliyor...\n');

const lines = content.split('\n');
const fixedLines = [];
let inArray = false;
let arrayDepth = 0;
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  const prevLine = i > 0 ? lines[i - 1].trim() : '';
  const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
  
  // Array kontrolü
  if (trimmed.includes('[')) {
    inArray = true;
    arrayDepth++;
  }
  if (trimmed.includes(']')) {
    arrayDepth--;
    if (arrayDepth === 0) inArray = false;
  }
  
  // 1. Gereksiz tek başına { olan satırları kaldır
  if (trimmed === '{' && prevLine.endsWith(',') && nextLine.startsWith('"') && nextLine.includes(':')) {
    console.log(`✂️  Satır ${i + 1}: Gereksiz { kaldırıldı`);
    fixCount++;
    continue;
  }
  
  // 2. Array içinde eksik { ekle
  if (inArray && trimmed.startsWith('"question":')) {
    // Önceki satır } ile bitiyorsa ve , varsa, bu yeni bir objedir
    if (prevLine === '},') {
      const indent = line.match(/^(\s*)/)[1];
      fixedLines.push(indent + '{');
      console.log(`➕ Satır ${i + 1}: Eksik { eklendi`);
      fixCount++;
    }
  }
  
  // 3. Array içinde eksik } ekle
  if (inArray && trimmed.startsWith('"answer":')) {
    const answerLine = line;
    fixedLines.push(answerLine);
    
    // Sonraki satır da question ise, önce } ve , ekle
    if (nextLine.startsWith('"question":')) {
      const indent = line.match(/^(\s*)/)[1];
      fixedLines.push(indent.substring(0, indent.length - 2) + '},');
      console.log(`➕ Satır ${i + 2}: Eksik } eklendi`);
      fixCount++;
    }
    continue;
  }
  
  fixedLines.push(line);
}

// Düzeltilmiş içeriği kaydet
const fixedContent = fixedLines.join('\n');

try {
  // JSON parse kontrolü
  const parsed = JSON.parse(fixedContent);
  
  // Duplikat key kontrolü
  const keys = Object.keys(parsed);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  
  if (duplicates.length > 0) {
    console.log('\n❌ Duplike kartlar bulundu:');
    const uniqueDuplicates = [...new Set(duplicates)];
    uniqueDuplicates.forEach(d => console.log(`   - ${d}`));
    
    // Duplikatları temizle - sonuncuyu tut
    const cleanData = {};
    for (const key of keys) {
      cleanData[key] = parsed[key];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(cleanData, null, 2), 'utf8');
    console.log('\n✅ Duplikatlar kaldırıldı!');
  } else {
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('\n✅ Dosya başarıyla düzeltildi!');
  }
  
  console.log(`\n📊 İstatistikler:`);
  console.log(`   - Toplam düzeltme: ${fixCount}`);
  console.log(`   - Toplam kart: ${keys.length}`);
  console.log(`   - Dosya boyutu: ${(fixedContent.length / 1024).toFixed(2)} KB`);
  
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
    for (let i = Math.max(0, lineNum - 3); i < Math.min(errorLines.length, lineNum + 3); i++) {
      const marker = i === lineNum - 1 ? '>>> ' : '    ';
      console.error(`${marker}${i + 1}: ${errorLines[i]}`);
    }
  }
  
  // Yine de kaydet
  fs.writeFileSync(filePath + '.partial', fixedContent, 'utf8');
  console.log(`\n💾 Kısmi düzeltme ${filePath}.partial olarak kaydedildi`);
}

// Temp dosyasını temizle
if (fs.existsSync(filePath + '.temp')) {
  fs.unlinkSync(filePath + '.temp');
  console.log('\n🗑️  Geçici dosya temizlendi');
}

