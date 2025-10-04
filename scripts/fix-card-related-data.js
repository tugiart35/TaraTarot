const fs = require('fs');
const path = require('path');

// Read the original JSON file
const jsonPath = path.join(__dirname, '../src/data/cards/all-cards-seo.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Transform the data to fix the related field names
const transformedCards = jsonData.map(card => {
  const newCard = { ...card };
  newCard.content = { ...card.content };

  // Fix TR content
  if (newCard.content.tr && newCard.content.tr.related) {
    const trRelated = { ...newCard.content.tr.related };
    if (trRelated.similar_cards !== undefined) {
      trRelated.cards = trRelated.similar_cards;
      delete trRelated.similar_cards;
    }
    if (!trRelated.cards) {
      trRelated.cards = []; // Initialize as empty array if not present
    }
    if (!trRelated.guides) {
      trRelated.guides = []; // Initialize as empty array if not present
    }
    newCard.content.tr.related = trRelated;
  }

  // Fix EN content
  if (newCard.content.en && newCard.content.en.related) {
    const enRelated = { ...newCard.content.en.related };
    if (enRelated.similar_cards !== undefined) {
      enRelated.cards = enRelated.similar_cards;
      delete enRelated.similar_cards;
    }
    if (!enRelated.cards) {
      enRelated.cards = []; // Initialize as empty array if not present
    }
    if (!enRelated.guides) {
      enRelated.guides = []; // Initialize as empty array if not present
    }
    newCard.content.en.related = enRelated;
  }

  // Fix SR content
  if (newCard.content.sr && newCard.content.sr.related) {
    const srRelated = { ...newCard.content.sr.related };
    if (srRelated.similar_cards !== undefined) {
      srRelated.cards = srRelated.similar_cards;
      delete srRelated.similar_cards;
    }
    if (!srRelated.cards) {
      srRelated.cards = []; // Initialize as empty array if not present
    }
    if (!srRelated.guides) {
      srRelated.guides = []; // Initialize as empty array if not present
    }
    newCard.content.sr.related = srRelated;
  }

  return newCard;
});

// Write the transformed data back
const outputJsonPath = path.join(__dirname, '../src/data/cards/all-cards-seo-fixed.json');
fs.writeFileSync(outputJsonPath, JSON.stringify(transformedCards, null, 2));
console.log('Fixed card data written to:', outputJsonPath);
console.log('Total cards processed:', transformedCards.length);