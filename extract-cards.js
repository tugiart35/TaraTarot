const fs = require('fs');

// Read the file and split by objects
let data = fs.readFileSync('blogtarot.txt', 'utf8');

// Split by "}, {" to separate objects
const objects = data.split('}, {');

// Fix the first and last objects
const fixedObjects = objects.map((obj, index) => {
  if (index === 0) {
    // First object - remove leading {
    return obj.replace(/^\s*{\s*/, '');
  } else if (index === objects.length - 1) {
    // Last object - remove trailing }
    return obj.replace(/\s*}\s*$/, '');
  } else {
    // Middle objects - add { at the beginning
    return '{' + obj;
  }
});

// Join with proper separators
const jsonArray = '[' + fixedObjects.join(', ') + ']';

try {
  const cards = JSON.parse(jsonArray);
  fs.writeFileSync(
    'src/lib/data/tarot-cards.json',
    JSON.stringify(cards, null, 2)
  );
  console.log('✅ Tarot cards data extracted successfully!');
  console.log('📊 Total cards:', cards.length);
  console.log(
    '🎯 Sample cards:',
    cards.slice(0, 3).map(c => c.names.tr)
  );
} catch (error) {
  console.error('❌ JSON Parse Error:', error.message);
}
