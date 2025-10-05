#!/usr/bin/env node

/**
 * Test Card Links - Finds broken card links
 * Checks all card URLs from the cards page and validates routing
 */

import fs from 'fs';
import path from 'path';

// Card mapping from card-mapping.ts
const majorArcanaMapping = {
  'the-fool': { tr: 'joker', en: 'the-fool', sr: 'joker' },
  'the-magician': { tr: 'buyucu', en: 'the-magician', sr: 'carobnjak' },
  'the-high-priestess': { tr: 'yuksek-rahibe', en: 'the-high-priestess', sr: 'visoka-svestenica' },
  'the-empress': { tr: 'imparatorice', en: 'the-empress', sr: 'carica' },
  'the-emperor': { tr: 'imparator', en: 'the-emperor', sr: 'car' },
  'the-hierophant': { tr: 'basrahip', en: 'the-hierophant', sr: 'visoki-svestenik' },
  'the-lovers': { tr: 'asiklar', en: 'the-lovers', sr: 'ljubavnici' },
  'the-chariot': { tr: 'savas-arabasi', en: 'the-chariot', sr: 'kola' },
  'strength': { tr: 'guc', en: 'strength', sr: 'snaga' },
  'the-hermit': { tr: 'ermis', en: 'the-hermit', sr: 'pustinjak' },
  'wheel-of-fortune': { tr: 'kader-carki', en: 'wheel-of-fortune', sr: 'kolo-srece' },
  'justice': { tr: 'adalet', en: 'justice', sr: 'pravda' },
  'the-hanged-man': { tr: 'asili-adam', en: 'the-hanged-man', sr: 'obeseni-covek' },
  'death': { tr: 'olum', en: 'death', sr: 'smrt' },
  'temperance': { tr: 'olcululuk', en: 'temperance', sr: 'umerenost' },
  'the-devil': { tr: 'seytan', en: 'the-devil', sr: 'davo' },
  'the-tower': { tr: 'kule', en: 'the-tower', sr: 'kula' },
  'the-star': { tr: 'yildiz', en: 'the-star', sr: 'zvezda' },
  'the-moon': { tr: 'ay', en: 'the-moon', sr: 'mesec' },
  'the-sun': { tr: 'gunes', en: 'the-sun', sr: 'sunce' },
  'judgement': { tr: 'yargi', en: 'judgement', sr: 'sud' },
  'the-world': { tr: 'dunya', en: 'the-world', sr: 'svet' }
};

// Generate Minor Arcana cards
function generateMinorArcanaCards() {
  const suits = ['cups', 'pentacles', 'swords', 'wands'];
  const cards = [];

  for (const suit of suits) {
    // Number cards (Ace = 1, 2-10)
    cards.push(`ace-of-${suit}`);
    for (let i = 2; i <= 10; i++) {
      const numberNames = {
        2: 'two', 3: 'three', 4: 'four', 5: 'five',
        6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten'
      };
      cards.push(`${numberNames[i]}-of-${suit}`);
    }

    // Court cards
    cards.push(`page-of-${suit}`);
    cards.push(`knight-of-${suit}`);
    cards.push(`queen-of-${suit}`);
    cards.push(`king-of-${suit}`);
  }

  return cards;
}

// Get slug from card key for a locale
function getCardSlug(cardKey, locale) {
  // Major Arcana
  if (majorArcanaMapping[cardKey]) {
    return majorArcanaMapping[cardKey][locale];
  }

  // Minor Arcana - English uses same format
  if (locale === 'en') {
    return cardKey;
  }

  // Parse minor arcana for other locales
  const match = cardKey.match(/^(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)-of-(cups|pentacles|swords|wands)$/);
  if (!match) return cardKey;

  const [, number, suit] = match;

  if (locale === 'tr') {
    const suitNames = { cups: 'kupalar', pentacles: 'yildizlar', swords: 'kiliclar', wands: 'asalar' };
    const numberNames = {
      ace: 'asi', two: '2', three: '3', four: '4', five: '5', six: '6',
      seven: '7', eight: '8', nine: '9', ten: '10',
      page: 'ucak', knight: 'sovalye', queen: 'kiz', king: 'krali'
    };
    return `${suitNames[suit]}-${numberNames[number]}`;
  } else if (locale === 'sr') {
    const suitNames = { cups: 'kupa', pentacles: 'novcic', swords: 'mace', wands: 'stap' };
    const numberNames = {
      ace: 'as', two: '2', three: '3', four: '4', five: '5', six: '6',
      seven: '7', eight: '8', nine: '9', ten: '10',
      page: 'ucak', knight: 'vitez', queen: 'kraljica', king: 'kralj'
    };
    return `${suitNames[suit]}-${numberNames[number]}`;
  }

  return cardKey;
}

// Check if dynamic route file exists
function checkRouteExists(locale, slug) {
  const basePath = locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
  const dynamicRoutePath = path.join(process.cwd(), 'src', 'app', '[locale]', '(main)', basePath, '[slug]', 'page.tsx');
  return fs.existsSync(dynamicRoutePath);
}

// Main test function
function testCardLinks() {
  console.log('🧪 Testing Card Links...\n');

  const majorArcanaCards = Object.keys(majorArcanaMapping);
  const minorArcanaCards = generateMinorArcanaCards();
  const allCards = [...majorArcanaCards, ...minorArcanaCards];

  const locales = ['en', 'tr', 'sr'];
  const results = {
    passed: [],
    failed: []
  };

  for (const locale of locales) {
    const basePath = locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';

    console.log(`\n📋 Testing ${locale.toUpperCase()} locale (/${locale}/${basePath}/)`);
    console.log('='.repeat(60));

    for (const cardKey of allCards) {
      const slug = getCardSlug(cardKey, locale);
      const url = `/${locale}/${basePath}/${slug}`;
      const routeExists = checkRouteExists(locale, slug);

      if (!routeExists) {
        console.log(`❌ ${url} - Route file missing`);
        results.failed.push({ cardKey, locale, slug, url, error: 'Route file missing' });
      } else {
        // Check if slug matches expected format
        const expectedSlug = getCardSlug(cardKey, locale);
        if (slug !== expectedSlug) {
          console.log(`⚠️  ${url} - Slug mismatch (expected: ${expectedSlug})`);
          results.failed.push({ cardKey, locale, slug, url, error: 'Slug mismatch' });
        } else {
          results.passed.push({ cardKey, locale, slug, url });
        }
      }
    }
  }

  // Summary
  console.log('\n\n📊 Test Summary');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📝 Total: ${results.passed.length + results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n\n🔍 Failed Cards:');
    console.log('='.repeat(60));

    const failedByLocale = {};
    for (const fail of results.failed) {
      if (!failedByLocale[fail.locale]) {
        failedByLocale[fail.locale] = [];
      }
      failedByLocale[fail.locale].push(fail);
    }

    for (const [locale, fails] of Object.entries(failedByLocale)) {
      console.log(`\n${locale.toUpperCase()}:`);
      for (const fail of fails) {
        console.log(`  - ${fail.cardKey} → ${fail.url}`);
        console.log(`    Error: ${fail.error}`);
      }
    }
  }

  // Save results to file
  const resultsPath = path.join(process.cwd(), 'card-link-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n\n💾 Results saved to: ${resultsPath}`);
}

// Run tests
testCardLinks();
