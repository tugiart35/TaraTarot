#!/usr/bin/env node

/**
 * Test Real Card URLs - Simulates actual card routing
 * Tests if CardMapping.getCardKeyFromSlug returns correct values
 */

// Simulate CardMapping.getCardKeyFromSlug logic
function getCardKeyFromSlug(slug, locale) {
  // Major Arcana reverse mapping
  const majorArcanaReverseMapping = {
    // Turkish
    'joker': 'the-fool',
    'buyucu': 'the-magician',
    'yuksek-rahibe': 'the-high-priestess',
    'imparatorice': 'the-empress',
    'imparator': 'the-emperor',
    'basrahip': 'the-hierophant',
    'asiklar': 'the-lovers',
    'savas-arabasi': 'the-chariot',
    'guc': 'strength',
    'ermis': 'the-hermit',
    'kader-carki': 'wheel-of-fortune',
    'adalet': 'justice',
    'asili-adam': 'the-hanged-man',
    'olum': 'death',
    'olcululuk': 'temperance',
    'seytan': 'the-devil',
    'kule': 'the-tower',
    'yildiz': 'the-star',
    'ay': 'the-moon',
    'gunes': 'the-sun',
    'yargi': 'judgement',
    'dunya': 'the-world',

    // English (direct mapping)
    'the-fool': 'the-fool',
    'the-magician': 'the-magician',
    'the-high-priestess': 'the-high-priestess',
    'the-empress': 'the-empress',
    'the-emperor': 'the-emperor',
    'the-hierophant': 'the-hierophant',
    'the-lovers': 'the-lovers',
    'the-chariot': 'the-chariot',
    'strength': 'strength',
    'the-hermit': 'the-hermit',
    'wheel-of-fortune': 'wheel-of-fortune',
    'justice': 'justice',
    'the-hanged-man': 'the-hanged-man',
    'death': 'death',
    'temperance': 'temperance',
    'the-devil': 'the-devil',
    'the-tower': 'the-tower',
    'the-star': 'the-star',
    'the-moon': 'the-moon',
    'the-sun': 'the-sun',
    'judgement': 'judgement',
    'the-world': 'the-world',

    // Serbian
    'carobnjak': 'the-magician',
    'visoka-svestenica': 'the-high-priestess',
    'carica': 'the-empress',
    'car': 'the-emperor',
    'visoki-svestenik': 'the-hierophant',
    'ljubavnici': 'the-lovers',
    'kola': 'the-chariot',
    'snaga': 'strength',
    'pustinjak': 'the-hermit',
    'kolo-srece': 'wheel-of-fortune',
    'pravda': 'justice',
    'obeseni-covek': 'the-hanged-man',
    'smrt': 'death',
    'umerenost': 'temperance',
    'davo': 'the-devil',
    'kula': 'the-tower',
    'zvezda': 'the-star',
    'mesec': 'the-moon',
    'sunce': 'the-sun',
    'sud': 'judgement',
    'svet': 'the-world'
  };

  // Check major arcana first
  if (majorArcanaReverseMapping[slug]) {
    return majorArcanaReverseMapping[slug];
  }

  // Check minor arcana
  return getMinorArcanaKey(slug, locale);
}

function getMinorArcanaKey(slug, locale) {
  if (locale === 'tr') {
    // Turkish patterns: kupalar-asi, kiliclar-2, yildizlar-krali
    const match = slug.match(/^(kupalar|kiliclar|asalar|yildizlar)-(.+)$/);
    if (!match) return null;

    const suitMap = {
      'kupalar': 'cups',
      'kiliclar': 'swords',
      'asalar': 'wands',
      'yildizlar': 'pentacles'
    };

    const numberMap = {
      'asi': 'ace', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
      '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
      'ucak': 'page', 'sovalye': 'knight', 'kiz': 'queen', 'krali': 'king'
    };

    const suitKey = match[1];
    const numberKey = match[2];

    if (!suitKey || !numberKey) return null;

    const suit = suitMap[suitKey];
    const number = numberMap[numberKey];

    if (!suit || !number) return null;
    return `${number}-of-${suit}`;

  } else if (locale === 'sr') {
    // Serbian patterns: kupa-as, mace-2, novcic-kralj
    const match = slug.match(/^(kupa|mace|stap|novcic)-(.+)$/);
    if (!match) return null;

    const suitMap = {
      'kupa': 'cups',
      'mace': 'swords',
      'stap': 'wands',
      'novcic': 'pentacles'
    };

    const numberMap = {
      'as': 'ace', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
      '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
      'ucak': 'page', 'vitez': 'knight', 'kraljica': 'queen', 'kralj': 'king'
    };

    const suitKey = match[1];
    const numberKey = match[2];

    if (!suitKey || !numberKey) return null;

    const suit = suitMap[suitKey];
    const number = numberMap[numberKey];

    if (!suit || !number) return null;
    return `${number}-of-${suit}`;

  } else {
    // English: ace-of-cups, king-of-swords (direct format)
    if (slug.match(/^(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)-of-(cups|swords|wands|pentacles)$/)) {
      return slug;
    }
  }

  return null;
}

// Test problematic cards
const testCases = [
  { slug: 'four-of-wands', locale: 'en', expected: 'four-of-wands' },
  { slug: 'nine-of-pentacles', locale: 'en', expected: 'nine-of-pentacles' },
  { slug: 'ace-of-cups', locale: 'en', expected: 'ace-of-cups' },
  { slug: 'king-of-swords', locale: 'en', expected: 'king-of-swords' },
  { slug: 'kupalar-asi', locale: 'tr', expected: 'ace-of-cups' },
  { slug: 'kiliclar-krali', locale: 'tr', expected: 'king-of-swords' },
];

console.log('🧪 Testing Card Key Resolution...\n');
console.log('='.repeat(70));

let passed = 0;
let failed = 0;

for (const test of testCases) {
  const result = getCardKeyFromSlug(test.slug, test.locale);
  const status = result === test.expected ? '✅' : '❌';

  if (result === test.expected) {
    passed++;
  } else {
    failed++;
  }

  console.log(`${status} ${test.locale}/${test.slug}`);
  console.log(`   Expected: ${test.expected}`);
  console.log(`   Got: ${result || 'null'}`);
  console.log('');
}

console.log('='.repeat(70));
console.log(`\n✅ Passed: ${passed}/${testCases.length}`);
console.log(`❌ Failed: ${failed}/${testCases.length}`);

if (failed > 0) {
  console.log('\n⚠️  Some cards are not resolving correctly!');
  console.log('This will cause 404 errors in the application.');
}
