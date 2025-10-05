const fs = require('fs');
const path = require('path');

// Migration dosyalarını oku ve birleştir
const migrationFiles = [
  '001_create_tarot_cards_tables.sql',
  '002_insert_sample_tarot_cards.sql',
  '003_insert_seo_data.sql',
];

console.log('🚀 Tarot Cards Migration Script');
console.log('================================');

migrationFiles.forEach((file, index) => {
  const filePath = path.join(__dirname, 'migrations', file);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n📄 ${file}:`);
    console.log('─'.repeat(50));
    console.log(content.substring(0, 200) + '...');
    console.log(`\n✅ ${file} loaded successfully`);
  } else {
    console.log(`❌ ${file} not found`);
  }
});

console.log('\n📋 Migration Instructions:');
console.log('1. Go to your Supabase Dashboard');
console.log('2. Navigate to SQL Editor');
console.log('3. Copy and paste the following SQL files in order:');
migrationFiles.forEach((file, index) => {
  console.log(`   ${index + 1}. migrations/${file}`);
});
console.log('\n4. Execute each migration file');
console.log('\n🎯 Test URLs after migration:');
console.log('- /tr/kartlar/joker');
console.log('- /en/cards/the-fool');
console.log('- /sr/kartice/joker');
console.log('- /tr/kartlar/yuksek-rahibe');
console.log('- /en/cards/the-high-priestess');
console.log('- /sr/kartice/visoka-svestenica');
