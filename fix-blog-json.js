const fs = require('fs');

// Blog JSON dosyasını oku
const filePath = 'i18nfix/blog.json';
let content = fs.readFileSync(filePath, 'utf8');

console.log('📝 Blog.json dosyası analiz ediliyor...\n');

// Satırları ayır
const lines = content.split('\n');
const errors = [];
const fixes = [];

// 1. Gereksiz açılış parantezlerini bul ve kaldır
let fixedLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  
  // Sadece { olan satırları kontrol et
  if (trimmed === '{') {
    const prevLine = i > 0 ? lines[i - 1].trim() : '';
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
    
    // Eğer önceki satır virgül ile bitiyorsa ve sonraki satır bir key ise
    if (prevLine.endsWith(',') && nextLine.startsWith('"') && nextLine.includes(':')) {
      errors.push(`Satır ${i + 1}: Gereksiz açılış süslü parantezi kaldırıldı`);
      fixes.push(`Satır ${i + 1} atlandı`);
      continue; // Bu satırı atla
    }
  }
  
  fixedLines.push(line);
}

// Geçici dosyaya yaz ve JSON olarak parse et
const tempContent = fixedLines.join('\n');

try {
  // JSON'u parse ederek duplikatları kontrol et
  const parsed = JSON.parse(tempContent);
  
  // Her kart için duplikat kontrolü
  const allKeys = Object.keys(parsed);
  const seen = new Set();
  const duplicates = [];
  
  for (const key of allKeys) {
    if (seen.has(key)) {
      duplicates.push(key);
    }
    seen.add(key);
  }
  
  if (duplicates.length > 0) {
    console.log('❌ Duplike kartlar bulundu:');
    duplicates.forEach(d => console.log(`   - ${d}`));
    
    // Duplikatları kaldır - son olanı tut
    const uniqueData = {};
    for (const key of allKeys) {
      uniqueData[key] = parsed[key];
    }
    
    // Düzeltilmiş JSON'u yaz
    fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2), 'utf8');
    console.log('\n✅ Duplikatlar kaldırıldı ve dosya düzeltildi!');
  } else {
    // Sadece syntax düzeltmelerini yaz
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('✅ JSON syntax hataları düzeltildi!');
  }
  
  if (errors.length > 0) {
    console.log('\n📋 Yapılan düzeltmeler:');
    errors.forEach(e => console.log(`   ${e}`));
  }
  
  console.log(`\n✨ Toplam ${Object.keys(parsed).length} kart bulundu`);
  
} catch (e) {
  console.error('❌ JSON parse hatası:', e.message);
  
  // Manuel düzeltme gerekliyse satır numarasını göster
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    const upToError = tempContent.substring(0, pos);
    const lineNum = upToError.split('\n').length;
    console.error(`   Hata satırı: ${lineNum}`);
    
    // O bölgeyi göster
    const errorLines = tempContent.split('\n').slice(Math.max(0, lineNum - 3), lineNum + 2);
    console.error('\n   Hatalı bölge:');
    errorLines.forEach((l, i) => {
      const num = lineNum - 2 + i;
      console.error(`   ${num}: ${l}`);
    });
  }
  
  // Düzeltilmiş içeriği yine de kaydet (kısmen düzeltmiş olabilir)
  fs.writeFileSync(filePath + '.temp', tempContent, 'utf8');
  console.log(`\n💾 Kısmen düzeltilmiş içerik ${filePath}.temp olarak kaydedildi`);
}

