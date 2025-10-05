const fs = require('fs');

// Read the file
let data = fs.readFileSync('blogtarot.txt', 'utf8');

// Fix common JSON issues
data = data
  .replace(/,\s*}/g, '}') // Remove trailing commas before }
  .replace(/,\s*]/g, ']') // Remove trailing commas before ]
  .replace(/\n\s*\n/g, '\n') // Remove empty lines
  .trim();

// Try to parse
try {
  const cards = JSON.parse(data);
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
  console.log('🔍 Error position:', error.message.match(/position (\d+)/)?.[1]);

  // Try to find the error position
  const pos = parseInt(error.message.match(/position (\d+)/)?.[1] || '0');
  const lines = data.substring(0, pos).split('\n');
  console.log('📍 Error at line:', lines.length);
  console.log('📝 Context:', lines.slice(-3).join('\n'));
}
