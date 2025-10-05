const fs = require('fs');

// Read blogtarot.txt
const blogtarotContent = fs.readFileSync(
  '/Users/tugi/Desktop/busbuskimki/blogtarot.txt',
  'utf8'
);

// Parse the JSON array - the file contains a JSON array
const cards = JSON.parse(blogtarotContent);

// Read current tr.json
const trJsonPath = '/Users/tugi/Desktop/busbuskimki/messages/tr.json';
const trJson = JSON.parse(fs.readFileSync(trJsonPath, 'utf8'));

// Convert cards to the format expected by tr.json blog section
const blogCards = {};

cards.forEach(card => {
  const cardId = card.id;

  blogCards[cardId] = {
    name: card.names.tr, // Turkish name
    short_description: card.short_description,
    meanings: {
      upright: {
        general: card.meanings.upright.general,
        love: card.meanings.upright.love,
        career: card.meanings.upright.career,
        money: card.meanings.upright.money,
        spiritual: card.meanings.upright.spiritual,
      },
      reversed: {
        general: card.meanings.reversed.general,
        love: card.meanings.reversed.love,
        career: card.meanings.reversed.career,
        money: card.meanings.reversed.money,
        spiritual: card.meanings.reversed.spiritual,
      },
    },
    context: {
      mythology: card.context.mythology,
      celtic_cross: card.context.celtic_cross,
    },
    faq: card.faq,
    related_cards: card.related.cards,
    imageUrl: `/cards/rws/${getImageFileName(cardId)}`,
  };
});

// Function to get image file name based on card ID
function getImageFileName(cardId) {
  const imageMapping = {
    the_fool: '0-Fool.jpg',
    the_magician: 'I-Magician.jpg',
    the_high_priestess: 'II-HighPriestess.jpg',
    the_empress: 'III-Empress.jpg',
    the_emperor: 'IV-Emperor.jpg',
    the_hierophant: 'V-Hierophant.jpg',
    the_lovers: 'VI-Lovers.jpg',
    the_chariot: 'VII-Chariot.jpg',
    strength: 'VIII-Strength.jpg',
    the_hermit: 'IX-Hermit.jpg',
    wheel_of_fortune: 'X-WheelOfFortune.jpg',
    justice: 'XI-Justice.jpg',
    the_hanged_man: 'XII-HangedMan.jpg',
    death: 'XIII-Death.jpg',
    temperance: 'XIV-Temperance.jpg',
    the_devil: 'XV-Devil.jpg',
    the_tower: 'XVI-Tower.jpg',
    the_star: 'XVII-Star.jpg',
    the_moon: 'XVIII-Moon.jpg',
    the_sun: 'XIX-Sun.jpg',
    judgement: 'XX-Judgement.jpg',
    the_world: 'XXI-World.jpg',
  };

  return imageMapping[cardId] || `${cardId.replace(/_/g, '-')}.jpg`;
}

// Update the blog section in tr.json
trJson.blog.cards = blogCards;

// Write back to tr.json
fs.writeFileSync(trJsonPath, JSON.stringify(trJson, null, 2));

console.log(`Successfully converted ${cards.length} cards to tr.json format`);
console.log('Cards added:', Object.keys(blogCards));
