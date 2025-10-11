#!/usr/bin/env node

const fs = require('fs');

// JSON dosyasını oku
const trData = JSON.parse(fs.readFileSync('messages/tr.json', 'utf8'));

// Doğru resim yollarını mapping et
const correctImagePaths = {
  // Major Arcana
  'the-fool': '/cards/rws/0-Fool.webp',
  'the-magician': '/cards/rws/I-Magician.webp',
  'the-high-priestess': '/cards/rws/II-HighPriestess.webp',
  'the-empress': '/cards/rws/III-Empress.webp',
  'the-emperor': '/cards/rws/IV-Emperor.webp',
  'the-hierophant': '/cards/rws/V-Hierophant.webp',
  'the-lovers': '/cards/rws/VI-Lovers.webp',
  'the-chariot': '/cards/rws/VII-Chariot.webp',
  'strength': '/cards/rws/VIII-Strength.webp',
  'the-hermit': '/cards/rws/IX-Hermit.webp',
  'the-wheel-of-fortune': '/cards/rws/X-WheelOfFortune.webp',
  'justice': '/cards/rws/XI-Justice.webp',
  'the-hanged-man': '/cards/rws/XII-HangedMan.webp',
  'death': '/cards/rws/XIII-Death.webp',
  'temperance': '/cards/rws/XIV-Temperance.webp',
  'the-devil': '/cards/rws/XV-Devil.webp',
  'the-tower': '/cards/rws/XVI-Tower.webp',
  'the-star': '/cards/rws/XVII-Star.webp',
  'the-moon': '/cards/rws/XVIII-Moon.webp',
  'the-sun': '/cards/rws/XIX-Sun.webp',
  'judgment': '/cards/rws/XX-Judgement.webp',
  'the-world': '/cards/rws/XXI-World.webp',
  
  // Wands - Asa
  'ace-of-wands': '/cards/rws/Ace-Wands.webp',
  'two-of-wands': '/cards/rws/II-Wands.webp',
  'three-of-wands': '/cards/rws/III-Wands.webp',
  'four-of-wands': '/cards/rws/IV-Wands.webp',
  'five-of-wands': '/cards/rws/V-Wands.webp',
  'six-of-wands': '/cards/rws/VI-Wands.webp',
  'seven-of-wands': '/cards/rws/VII-Wands.webp',
  'eight-of-wands': '/cards/rws/VIII-Wands.webp',
  'nine-of-wands': '/cards/rws/IX-Wands.webp',
  'ten-of-wands': '/cards/rws/X-Wands.webp',
  'page-of-wands': '/cards/rws/Page-Wands.webp',
  'knight-of-wands': '/cards/rws/Knight-Wands.webp',
  'queen-of-wands': '/cards/rws/Queen-Wands.webp',
  'king-of-wands': '/cards/rws/King-Wands.webp',
  
  // Pentacles - Yıldız/Madeni
  'ace-of-pentacles': '/cards/rws/Ace-Pentacles.webp',
  'two-of-pentacles': '/cards/rws/II-Pentacles.webp',
  'three-of-pentacles': '/cards/rws/III-Pentacles.webp',
  'four-of-pentacles': '/cards/rws/IV-Pentacles.webp',
  'five-of-pentacles': '/cards/rws/V-Pentacles.webp',
  'six-of-pentacles': '/cards/rws/VI-Pentacles.webp',
  'seven-of-pentacles': '/cards/rws/VII-Pentacles.webp',
  'eight-of-pentacles': '/cards/rws/VIII-Pentacles.webp',
  'nine-of-pentacles': '/cards/rws/IX-Pentacles.webp',
  'ten-of-pentacles': '/cards/rws/X-Pentacles.webp',
  'page-of-pentacles': '/cards/rws/Page-Pentacles.webp',
  'knight-of-pentacles': '/cards/rws/Knight-Pentacles.webp',
  'queen-of-pentacles': '/cards/rws/Queen-Pentacles.webp',
  'king-of-pentacles': '/cards/rws/King-Pentacles.webp',
  
  // Cups - Kupa
  'ace-of-cups': '/cards/rws/Ace-Cups.webp',
  'two-of-cups': '/cards/rws/II-Cups.webp',
  'three-of-cups': '/cards/rws/III-Cups.webp',
  'four-of-cups': '/cards/rws/IV-Cups.webp',
  'five-of-cups': '/cards/rws/V-Cups.webp',
  'six-of-cups': '/cards/rws/VI-Cups.webp',
  'seven-of-cups': '/cards/rws/VII-Cups.webp',
  'eight-of-cups': '/cards/rws/VIII-Cups.webp',
  'nine-of-cups': '/cards/rws/IX-Cups.webp',
  'ten-of-cups': '/cards/rws/X-Cups.webp',
  'page-of-cups': '/cards/rws/Page-Cups.webp',
  'knight-of-cups': '/cards/rws/Knight-Cups.webp',
  'queen-of-cups': '/cards/rws/Queen-Cups.webp',
  'king-of-cups': '/cards/rws/King-Cups.webp',
  
  // Swords - Kılıç
  'ace-of-swords': '/cards/rws/Ace-Swords.webp',
  'two-of-swords': '/cards/rws/II-Swords.webp',
  'three-of-swords': '/cards/rws/III-Swords.webp',
  'four-of-swords': '/cards/rws/IV-Swords.webp',
  'five-of-swords': '/cards/rws/V-Swords.webp',
  'six-of-swords': '/cards/rws/VI-Swords.webp',
  'seven-of-swords': '/cards/rws/VII-Swords.webp',
  'eight-of-swords': '/cards/rws/VIII-Swords.webp',
  'nine-of-swords': '/cards/rws/IX-Swords.webp',
  'ten-of-swords': '/cards/rws/X-Swords.webp',
  'page-of-swords': '/cards/rws/Page-Swords.webp',
  'knight-of-swords': '/cards/rws/Knight-Swords.webp',
  'queen-of-swords': '/cards/rws/Queen-Swords.webp',
  'king-of-swords': '/cards/rws/King-Swords.webp',
};

// Değişiklikleri uygula
let changeCount = 0;
const changes = [];

Object.keys(trData.blog.cards).forEach(cardKey => {
  if (correctImagePaths[cardKey]) {
    const oldPath = trData.blog.cards[cardKey].imageUrl;
    const newPath = correctImagePaths[cardKey];
    
    if (oldPath !== newPath) {
      trData.blog.cards[cardKey].imageUrl = newPath;
      changeCount++;
      changes.push({
        card: cardKey,
        old: oldPath,
        new: newPath
      });
      console.log(`✓ ${cardKey}: ${oldPath || '(yok)'} → ${newPath}`);
    }
  }
});

// Dosyayı kaydet
fs.writeFileSync('messages/tr.json', JSON.stringify(trData, null, 2), 'utf8');

console.log(`\n✅ ${changeCount} kart resim yolu düzeltildi.`);

// Değişiklikleri kaydet
fs.writeFileSync('image-path-changes.json', JSON.stringify(changes, null, 2));
console.log('Değişiklik raporu: image-path-changes.json');

