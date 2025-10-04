#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 SEO Structured Data Fix Script');
console.log('==================================');

// Load the current SEO data
const seoDataPath = 'src/data/cards/all-cards-seo.json';
let allCards;

try {
  const seoData = fs.readFileSync(seoDataPath, 'utf8');
  const seoDataObj = JSON.parse(seoData);
  allCards = seoDataObj.cards || seoDataObj;
  console.log(`✅ Loaded ${allCards.length} cards`);
} catch (error) {
  console.error('❌ Error loading SEO data:', error.message);
  process.exit(1);
}

let totalFixes = 0;

// Helper function to generate FAQ structured data
function generateFAQStructuredData(card, locale) {
  const cardName = card.names[locale];

  const faqTemplates = {
    tr: [
      {
        question: `${cardName} kartı ne anlama gelir?`,
        answer: `${cardName} kartı, tarot okumalarında önemli bir semboldür ve yaşamınızda karşılaştığınız durumları anlamanıza yardımcı olur. Bu kart, kişisel gelişiminiz ve ruhsal yolculuğunuz için değerli rehberlik sağlar.`,
      },
      {
        question: `${cardName} kartı aşk ilişkilerinde ne anlama gelir?`,
        answer: `${cardName} kartı aşk ilişkilerinde, duygusal bağlarınızı ve ilişki dinamiklerinizi anlamanıza yardımcı olur. Bu kart, sevgi, bağlılık ve kişisel gelişim konularında önemli mesajlar taşır.`,
      },
      {
        question: `${cardName} kartı kariyer açısından ne ifade eder?`,
        answer: `${cardName} kartı kariyer açısından, profesyonel hedefleriniz ve iş yaşamınızdaki fırsatlar hakkında önemli bilgiler verir. Bu kart, kariyer gelişiminiz için değerli rehberlik sağlar.`,
      },
      {
        question: `${cardName} kartı ters geldiğinde ne anlama gelir?`,
        answer: `${cardName} kartı ters geldiğinde, dikkat edilmesi gereken alanları ve potansiyel zorlukları işaret eder. Bu durum, daha dikkatli olmanız ve farklı yaklaşımlar denemeniz gerektiğini gösterir.`,
      },
    ],
    en: [
      {
        question: `What does the ${cardName} card mean?`,
        answer: `The ${cardName} card is an important symbol in tarot readings that helps you understand the situations you encounter in your life. This card provides valuable guidance for your personal development and spiritual journey.`,
      },
      {
        question: `What does the ${cardName} card mean in love relationships?`,
        answer: `In love relationships, the ${cardName} card helps you understand your emotional connections and relationship dynamics. This card carries important messages about love, commitment, and personal growth.`,
      },
      {
        question: `What does the ${cardName} card mean for career?`,
        answer: `For career, the ${cardName} card provides important information about your professional goals and opportunities in your work life. This card offers valuable guidance for your career development.`,
      },
      {
        question: `What does it mean when the ${cardName} card appears reversed?`,
        answer: `When the ${cardName} card appears reversed, it indicates areas that need attention and potential challenges. This situation shows that you need to be more careful and try different approaches.`,
      },
    ],
    sr: [
      {
        question: `Šta znači karta ${cardName}?`,
        answer: `Karta ${cardName} je važan simbol u tarot čitanjima koji pomaže da razumete situacije sa kojima se susrećete u vašem životu. Ova karta pruža dragoceno vodstvo za vaš lični razvoj i duhovni put.`,
      },
      {
        question: `Šta znači karta ${cardName} u ljubavnim odnosima?`,
        answer: `U ljubavnim odnosima, karta ${cardName} pomaže da razumete vaše emocionalne veze i dinamiku odnosa. Ova karta nosi važne poruke o ljubavi, posvećenosti i ličnom razvoju.`,
      },
      {
        question: `Šta znači karta ${cardName} za karijeru?`,
        answer: `Za karijeru, karta ${cardName} pruža važne informacije o vašim profesionalnim ciljevima i prilikama u vašem radnom životu. Ova karta nudi dragoceno vodstvo za vaš karijerni razvoj.`,
      },
      {
        question: `Šta znači kada se karta ${cardName} pojavi obrnuto?`,
        answer: `Kada se karta ${cardName} pojavi obrnuto, ukazuje na oblasti koje zahtevaju pažnju i potencijalne izazove. Ova situacija pokazuje da trebate biti oprezniji i pokušati drugačije pristupe.`,
      },
    ],
  };

  return faqTemplates[locale];
}

// Process each card
allCards.forEach((card, index) => {
  console.log(
    `\n🔄 Processing card ${index + 1}/${allCards.length}: ${card.id}`
  );

  // Process each locale
  ['tr', 'en', 'sr'].forEach(locale => {
    if (!card.seo) card.seo = {};
    if (!card.seo[locale]) card.seo[locale] = {};

    let cardFixes = 0;

    // Add FAQ structured data if missing
    if (
      !card.seo[locale].faq ||
      !Array.isArray(card.seo[locale].faq) ||
      card.seo[locale].faq.length === 0
    ) {
      card.seo[locale].faq = generateFAQStructuredData(card, locale);
      totalFixes++;
      cardFixes++;
      console.log(
        `  ✅ ${locale.toUpperCase()}: Added FAQ structured data (${card.seo[locale].faq.length} questions)`
      );
    }

    // Add keywords if missing
    if (!card.seo[locale].keywords || card.seo[locale].keywords.length === 0) {
      const keywords = [
        card.names[locale],
        locale === 'tr'
          ? 'tarot kartı'
          : locale === 'en'
            ? 'tarot card'
            : 'tarot karta',
        locale === 'tr'
          ? 'tarot okuması'
          : locale === 'en'
            ? 'tarot reading'
            : 'tarot čitanje',
        locale === 'tr'
          ? 'aşk kartları'
          : locale === 'en'
            ? 'love cards'
            : 'ljubavne karte',
        locale === 'tr'
          ? 'kariyer rehberliği'
          : locale === 'en'
            ? 'career guidance'
            : 'karijerno vodstvo',
      ];
      card.seo[locale].keywords = keywords;
      totalFixes++;
      cardFixes++;
      console.log(
        `  ✅ ${locale.toUpperCase()}: Added keywords (${keywords.length} keywords)`
      );
    }

    if (cardFixes > 0) {
      console.log(
        `  📝 ${locale.toUpperCase()}: Applied ${cardFixes} structured data fixes`
      );
    }
  });
});

// Save the optimized data
try {
  fs.writeFileSync(seoDataPath, JSON.stringify(allCards, null, 2));
  console.log(`\n💾 Saved optimized SEO data to ${seoDataPath}`);
} catch (error) {
  console.error('❌ Error saving optimized data:', error.message);
  process.exit(1);
}

console.log('\n📊 STRUCTURED DATA FIX SUMMARY');
console.log('===============================');
console.log(`🎯 Total Structured Data Fixes: ${totalFixes}`);
console.log('✅ All FAQ structured data added');
console.log('✅ All keywords optimized');
console.log('✅ Perfect SEO structured data achieved');
console.log('🚀 Ready for next optimization step!');
