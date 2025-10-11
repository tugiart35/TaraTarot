const fs = require('fs');

console.log('🔨 Blog JSON dosyası yeniden inşa ediliyor...\n');

// Dosyayı oku
const content = fs.readFileSync('i18nfix/blog.json', 'utf8');

// İlk satırları al (blog metadata)
const lines = content.split('\n');
let blogMetadata = {
  title: '',
  subtitle: '',
  description: ''
};

// Metadata'yı bul
for (let i = 0; i < Math.min(10, lines.length); i++) {
  const line = lines[i];
  if (line.includes('"title":')) {
    const match = line.match(/"title":\s*"([^"]+)"/);
    if (match) blogMetadata.title = match[1];
  }
  if (line.includes('"subtitle":')) {
    const match = line.match(/"subtitle":\s*"([^"]+)"/);
    if (match) blogMetadata.subtitle = match[1];
  }
  if (line.includes('"description":')) {
    const match = line.match(/"description":\s*"([^"]+)"/);
    if (match) blogMetadata.description = match[1];
  }
}

// Kartları çıkar - her kart için pattern ara
const cardPattern = /^"(the-[a-z-]+|[a-z-]+-of-[a-z-]+|[a-z-]+-[a-z-]+)":\s*\{/;
const cards = {};
let currentCard = null;
let currentCardContent = [];
let braceDepth = 0;
let inCard = false;

for (const line of lines) {
  const trimmed = line.trim();
  
  // Yeni kart başlıyor mu?
  const cardMatch = trimmed.match(cardPattern);
  if (cardMatch && braceDepth === 0) {
    // Önceki kartı kaydet
    if (currentCard && currentCardContent.length > 0) {
      const cardJson = currentCardContent.join('\n');
      try {
        const parsed = JSON.parse('{' + cardJson + '}');
        cards[currentCard] = parsed;
        console.log(`✅ ${currentCard} eklendi`);
      } catch (e) {
        console.log(`⚠️  ${currentCard} parse edilemedi, atlandı`);
      }
    }
    
    // Yeni kart başlat
    currentCard = cardMatch[1];
    currentCardContent = [trimmed];
    braceDepth = 1;
    inCard = true;
    continue;
  }
  
  if (inCard) {
    currentCardContent.push(line);
    
    // Parantez sayımı
    for (const char of line) {
      if (char === '{') braceDepth++;
      if (char === '}') braceDepth--;
    }
    
    // Kart bitti mi?
    if (braceDepth === 0 && currentCard) {
      const cardJson = currentCardContent.join('\n');
      try {
        const parsed = JSON.parse('{' + cardJson + '}');
        cards[currentCard] = parsed;
        console.log(`✅ ${currentCard} eklendi`);
      } catch (e) {
        console.log(`⚠️  ${currentCard} parse edilemedi, atlandı`);
      }
      currentCard = null;
      currentCardContent = [];
      inCard = false;
    }
  }
}

// Son kartı da ekle
if (currentCard && currentCardContent.length > 0) {
  const cardJson = currentCardContent.join('\n');
  try {
    const parsed = JSON.parse('{' + cardJson + '}');
    cards[currentCard] = parsed;
    console.log(`✅ ${currentCard} eklendi`);
  } catch (e) {
    console.log(`⚠️  ${currentCard} parse edilemedi`);
  }
}

// Yeni yapıyı oluştur
const newStructure = {
  blog: {
    title: blogMetadata.title || "Tarot Kartları Rehberi",
    subtitle: blogMetadata.subtitle || "Her kartın derin anlamlarını keşfedin",
    description: blogMetadata.description || "Tarot kartlarının gizemli dünyasında yolculuğa çıkın.",
    cards: cards
  }
};

// Kaydet
fs.writeFileSync('i18nfix/blog.json', JSON.stringify(newStructure, null, 2), 'utf8');

console.log(`\n📊 Sonuç:`);
console.log(`   - Toplam kart: ${Object.keys(cards).length}`);
console.log(`   - Dosya boyutu: ${(Buffer.byteLength(JSON.stringify(newStructure, null, 2), 'utf8') / 1024).toFixed(2)} KB`);
console.log('\n🎉 Dosya başarıyla yeniden oluşturuldu!');

// Geçici dosyaları temizle
const tempFiles = fs.readdirSync('.').filter(f => 
  f.startsWith('fix-') && f.endsWith('.js')
).concat(
  fs.readdirSync('i18nfix').filter(f => 
    f.includes('blog') && f !== 'blog.json'
  ).map(f => 'i18nfix/' + f)
);

tempFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
});

console.log(`\n🗑️  ${tempFiles.length} geçici dosya temizlendi`);

