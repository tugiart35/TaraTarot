#!/usr/bin/env node

/**
 * Generate correct generateStaticParams for all cards
 * Creates proper slug lists for Turkish, English, and Serbian
 */

function generateAllCardParams() {
  const params = [];

  // Major Arcana
  const majorArcana = {
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

  // Add Major Arcana
  for (const [key, slugs] of Object.entries(majorArcana)) {
    params.push({ locale: 'tr', slug: slugs.tr });
    params.push({ locale: 'en', slug: slugs.en });
    params.push({ locale: 'sr', slug: slugs.sr });
  }

  // Minor Arcana
  const suits = {
    tr: { cups: 'kupalar', pentacles: 'yildizlar', swords: 'kiliclar', wands: 'asalar' },
    en: { cups: 'cups', pentacles: 'pentacles', swords: 'swords', wands: 'wands' },
    sr: { cups: 'kupa', pentacles: 'novcic', swords: 'mace', wands: 'stap' }
  };

  const numbers = {
    tr: {
      ace: 'asi', two: '2', three: '3', four: '4', five: '5',
      six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
      page: 'ucak', knight: 'sovalye', queen: 'kiz', king: 'krali'
    },
    en: {
      ace: 'ace', two: 'two', three: 'three', four: 'four', five: 'five',
      six: 'six', seven: 'seven', eight: 'eight', nine: 'nine', ten: 'ten',
      page: 'page', knight: 'knight', queen: 'queen', king: 'king'
    },
    sr: {
      ace: 'as', two: '2', three: '3', four: '4', five: '5',
      six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
      page: 'ucak', knight: 'vitez', queen: 'kraljica', king: 'kralj'
    }
  };

  const cardNumbers = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'page', 'knight', 'queen', 'king'];

  // Add Minor Arcana
  for (const locale of ['tr', 'en', 'sr']) {
    for (const [suitEn, suitLocale] of Object.entries(suits[locale])) {
      for (const num of cardNumbers) {
        const numberPart = numbers[locale][num];
        let slug;

        if (locale === 'en') {
          slug = `${numberPart}-of-${suitLocale}`;
        } else {
          slug = `${suitLocale}-${numberPart}`;
        }

        params.push({ locale, slug });
      }
    }
  }

  return params;
}

const allParams = generateAllCardParams();

console.log('export async function generateStaticParams() {');
console.log('  return [');

for (const param of allParams) {
  console.log(`    { locale: '${param.locale}', slug: '${param.slug}' },`);
}

console.log('  ];');
console.log('}');

console.log(`\n// Total params: ${allParams.length}`);
console.log(`// Expected: 234 (22 Major × 3 locales + 56 Minor × 3 locales = 66 + 168 = 234)`);
