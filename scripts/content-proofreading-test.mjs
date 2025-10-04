#!/usr/bin/env node

/**
 * Content Proofreading Test Script
 *
 * Bu script, tarot kartları içerikleri için proofreading testi yapar.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TAROT_DATA_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo.json'
);
const OUTPUT_FILE = path.join(
  __dirname,
  '..',
  'analysis',
  'content-proofreading-report.json'
);

// Proofreading kuralları
const PROOFREADING_RULES = {
  // Kelime sayısı kontrolü
  word_count: {
    min_short_description: 10,
    max_short_description: 30,
    min_upright_general: 50,
    max_upright_general: 150,
    min_reversed_general: 40,
    max_reversed_general: 120,
    min_specific_section: 20,
    max_specific_section: 80,
  },

  // Yasak kelimeler
  forbidden_words: {
    tr: ['tatlım', 'canım', 'aşkım', 'sevgilim'],
    en: ['honey', 'sweetie', 'baby', 'darling'],
    sr: ['dušo', 'ljubavi', 'bebo', 'slatka'],
  },

  // Gerekli kelimeler (her içerikte bulunmalı)
  required_elements: {
    tr: ['anlam', 'kart', 'tarot'],
    en: ['meaning', 'card', 'tarot'],
    sr: ['značenje', 'karta', 'tarot'],
  },

  // Yazım kuralları
  grammar_rules: {
    tr: {
      sentence_endings: ['.', '!', '?'],
      capitalization: ['Tarot', 'Kart', 'Major', 'Minor', 'Arcana'],
    },
    en: {
      sentence_endings: ['.', '!', '?'],
      capitalization: ['Tarot', 'Card', 'Major', 'Minor', 'Arcana'],
    },
    sr: {
      sentence_endings: ['.', '!', '?'],
      capitalization: ['Tarot', 'Karta', 'Major', 'Minor', 'Arcana'],
    },
  },
};

async function performContentProofreadingTest() {
  console.log('📝 Content Proofreading testi başlatılıyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    // Test sonuçları
    const testResults = {
      summary: {
        total_cards: cards.length,
        total_content_sections: cards.length * 3 * 8, // kart × dil × 8 bölüm
        test_date: new Date().toISOString(),
        overall_score: 0,
        passed_cards: 0,
        failed_cards: 0,
        warnings: 0,
      },
      language_analysis: {
        tr: { passed: 0, failed: 0, issues: [] },
        en: { passed: 0, failed: 0, issues: [] },
        sr: { passed: 0, failed: 0, issues: [] },
      },
      content_analysis: {
        short_description: { passed: 0, failed: 0, issues: [] },
        upright_general: { passed: 0, failed: 0, issues: [] },
        reversed_general: { passed: 0, failed: 0, issues: [] },
        love_section: { passed: 0, failed: 0, issues: [] },
        career_section: { passed: 0, failed: 0, issues: [] },
        money_section: { passed: 0, failed: 0, issues: [] },
        spiritual_section: { passed: 0, failed: 0, issues: [] },
      },
      detailed_results: [],
      recommendations: [],
    };

    // Her kart için proofreading testi yap
    for (const card of cards) {
      const cardResults = proofreadCard(card);
      testResults.detailed_results.push(cardResults);

      // Sonuçları topla
      aggregateProofreadingResults(testResults, cardResults);
    }

    // Genel skor hesapla
    calculateProofreadingScore(testResults);

    // Öneriler oluştur
    generateProofreadingRecommendations(testResults);

    // Raporu kaydet
    await saveProofreadingReport(testResults);

    // Konsola özet yazdır
    printProofreadingSummary(testResults);

    console.log('🎉 Content Proofreading testi tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function proofreadCard(card) {
  const results = {
    card_id: card.id,
    card_name: card.names,
    languages: {},
    overall_score: 0,
    critical_issues: [],
    warnings: [],
    passed_checks: [],
  };

  // Her dil için proofreading yap
  ['tr', 'en', 'sr'].forEach(locale => {
    const languageResults = proofreadLanguage(card, locale);
    results.languages[locale] = languageResults;
  });

  // Genel skor hesapla
  const languageScores = Object.values(results.languages).map(
    lang => lang.score
  );
  results.overall_score = Math.round(
    languageScores.reduce((sum, score) => sum + score, 0) /
      languageScores.length
  );

  return results;
}

function proofreadLanguage(card, locale) {
  const results = {
    language: locale,
    score: 100,
    issues: [],
    warnings: [],
    passed_checks: [],
  };

  const content = card.content[locale];
  const rules = PROOFREADING_RULES;

  // Short description kontrolü
  checkShortDescription(content.short_description, locale, results, rules);

  // Upright meanings kontrolü
  checkUprightMeanings(content.meanings.upright, locale, results, rules);

  // Reversed meanings kontrolü
  checkReversedMeanings(content.meanings.reversed, locale, results, rules);

  // Specific sections kontrolü
  checkSpecificSections(content.meanings.upright, locale, results, rules);
  checkSpecificSections(content.meanings.reversed, locale, results, rules);

  // Grammar ve yazım kontrolü
  checkGrammarAndSpelling(content, locale, results, rules);

  // Yasak kelimeler kontrolü
  checkForbiddenWords(content, locale, results, rules);

  // Gerekli elementler kontrolü
  checkRequiredElements(content, locale, results, rules);

  return results;
}

function checkShortDescription(text, locale, results, rules) {
  if (!text) {
    results.issues.push('Missing short description');
    results.score -= 30;
    return;
  }

  const wordCount = countWords(text);
  const minWords = rules.word_count.min_short_description;
  const maxWords = rules.word_count.max_short_description;

  if (wordCount < minWords) {
    results.issues.push(
      `Short description too short (${wordCount} words, min: ${minWords})`
    );
    results.score -= 20;
  } else if (wordCount > maxWords) {
    results.warnings.push(
      `Short description too long (${wordCount} words, max: ${maxWords})`
    );
    results.score -= 10;
  } else {
    results.passed_checks.push('Short description length appropriate');
  }
}

function checkUprightMeanings(meanings, locale, results, rules) {
  if (!meanings.general) {
    results.issues.push('Missing upright general meaning');
    results.score -= 40;
    return;
  }

  const wordCount = countWords(meanings.general);
  const minWords = rules.word_count.min_upright_general;
  const maxWords = rules.word_count.max_upright_general;

  if (wordCount < minWords) {
    results.issues.push(
      `Upright meaning too short (${wordCount} words, min: ${minWords})`
    );
    results.score -= 25;
  } else if (wordCount > maxWords) {
    results.warnings.push(
      `Upright meaning too long (${wordCount} words, max: ${maxWords})`
    );
    results.score -= 10;
  } else {
    results.passed_checks.push('Upright meaning length appropriate');
  }
}

function checkReversedMeanings(meanings, locale, results, rules) {
  if (!meanings.general) {
    results.issues.push('Missing reversed general meaning');
    results.score -= 40;
    return;
  }

  const wordCount = countWords(meanings.general);
  const minWords = rules.word_count.min_reversed_general;
  const maxWords = rules.word_count.max_reversed_general;

  if (wordCount < minWords) {
    results.issues.push(
      `Reversed meaning too short (${wordCount} words, min: ${minWords})`
    );
    results.score -= 25;
  } else if (wordCount > maxWords) {
    results.warnings.push(
      `Reversed meaning too long (${wordCount} words, max: ${maxWords})`
    );
    results.score -= 10;
  } else {
    results.passed_checks.push('Reversed meaning length appropriate');
  }
}

function checkSpecificSections(meanings, locale, results, rules) {
  const sections = ['love', 'career', 'money', 'spiritual'];

  sections.forEach(section => {
    const text = meanings[section];
    if (!text) {
      results.issues.push(`Missing ${section} section`);
      results.score -= 15;
      return;
    }

    const wordCount = countWords(text);
    const minWords = rules.word_count.min_specific_section;
    const maxWords = rules.word_count.max_specific_section;

    if (wordCount < minWords) {
      results.issues.push(
        `${section} section too short (${wordCount} words, min: ${minWords})`
      );
      results.score -= 10;
    } else if (wordCount > maxWords) {
      results.warnings.push(
        `${section} section too long (${wordCount} words, max: ${maxWords})`
      );
      results.score -= 5;
    } else {
      results.passed_checks.push(`${section} section length appropriate`);
    }
  });
}

function checkGrammarAndSpelling(content, locale, results, rules) {
  const grammarRules = rules.grammar_rules[locale];
  if (!grammarRules) return;

  // Cümle sonları kontrolü
  const allText = [
    content.short_description,
    content.meanings.upright.general,
    content.meanings.reversed.general,
  ].join(' ');

  // Cümle sonları kontrolü
  const sentences = allText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentencesWithoutEndings = sentences.filter(
    s => !s.trim().match(/[.!?]$/)
  );

  if (sentencesWithoutEndings.length > 0) {
    results.warnings.push(
      `${sentencesWithoutEndings.length} sentences without proper endings`
    );
    results.score -= 5;
  }

  // Büyük harf kontrolü
  const requiredCapitalizations = grammarRules.capitalization;
  requiredCapitalizations.forEach(word => {
    if (!allText.includes(word)) {
      results.warnings.push(`Missing capitalization for "${word}"`);
      results.score -= 2;
    }
  });
}

function checkForbiddenWords(content, locale, results, rules) {
  const forbiddenWords = rules.forbidden_words[locale];
  if (!forbiddenWords) return;

  const allText = [
    content.short_description,
    content.meanings.upright.general,
    content.meanings.upright.love,
    content.meanings.upright.career,
    content.meanings.upright.money,
    content.meanings.upright.spiritual,
    content.meanings.reversed.general,
    content.meanings.reversed.love,
    content.meanings.reversed.career,
    content.meanings.reversed.money,
    content.meanings.reversed.spiritual,
  ]
    .join(' ')
    .toLowerCase();

  forbiddenWords.forEach(word => {
    if (allText.includes(word.toLowerCase())) {
      results.issues.push(`Contains forbidden word: "${word}"`);
      results.score -= 20;
    }
  });
}

function checkRequiredElements(content, locale, results, rules) {
  const requiredElements = rules.required_elements[locale];
  if (!requiredElements) return;

  const allText = [
    content.short_description,
    content.meanings.upright.general,
    content.meanings.reversed.general,
  ]
    .join(' ')
    .toLowerCase();

  requiredElements.forEach(element => {
    if (!allText.includes(element.toLowerCase())) {
      results.warnings.push(`Missing required element: "${element}"`);
      results.score -= 5;
    }
  });
}

function countWords(text) {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}

function aggregateProofreadingResults(testResults, cardResults) {
  // Kart seviyesi analiz
  if (cardResults.overall_score >= 90) {
    testResults.summary.passed_cards++;
  } else if (cardResults.overall_score >= 70) {
    testResults.summary.warnings++;
  } else {
    testResults.summary.failed_cards++;
  }

  // Dil seviyesi analiz
  Object.entries(cardResults.languages).forEach(([locale, languageResults]) => {
    const languageAnalysis = testResults.language_analysis[locale];

    if (languageResults.score >= 90) {
      languageAnalysis.passed++;
    } else {
      languageAnalysis.failed++;
    }

    // Issues topla
    languageResults.issues.forEach(issue => {
      if (!languageAnalysis.issues.includes(issue)) {
        languageAnalysis.issues.push(issue);
      }
    });
  });

  // İçerik seviyesi analiz
  Object.entries(cardResults.languages).forEach(([locale, languageResults]) => {
    // Bu kısım daha detaylı analiz için genişletilebilir
  });
}

function calculateProofreadingScore(testResults) {
  const totalCards = testResults.summary.total_cards;

  if (totalCards === 0) {
    testResults.summary.overall_score = 0;
    return;
  }

  const score =
    ((testResults.summary.passed_cards + testResults.summary.warnings * 0.5) /
      totalCards) *
    100;
  testResults.summary.overall_score = Math.round(score);
}

function generateProofreadingRecommendations(testResults) {
  const recommendations = [];

  // Dil bazlı öneriler
  Object.entries(testResults.language_analysis).forEach(
    ([locale, analysis]) => {
      if (analysis.failed > analysis.passed) {
        recommendations.push({
          priority: 'HIGH',
          language: locale.toUpperCase(),
          issue: `${analysis.failed} cards failed proofreading in ${locale}`,
          action: `Review and improve ${locale} content quality`,
        });
      }
    }
  );

  // Genel öneriler
  if (testResults.summary.failed_cards > 0) {
    recommendations.push({
      priority: 'HIGH',
      category: 'Content Quality',
      issue: `${testResults.summary.failed_cards} cards failed proofreading`,
      action: 'Conduct comprehensive content review and editing',
    });
  }

  // Kelime sayısı önerileri
  const shortDescIssues = testResults.detailed_results.filter(card =>
    Object.values(card.languages).some(lang =>
      lang.issues.some(
        issue => issue.includes('too short') || issue.includes('too long')
      )
    )
  ).length;

  if (shortDescIssues > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Word Count',
      issue: `${shortDescIssues} cards have word count issues`,
      action: 'Standardize content length across all cards',
    });
  }

  // Yasak kelimeler önerileri
  const forbiddenWordIssues = testResults.detailed_results.filter(card =>
    Object.values(card.languages).some(lang =>
      lang.issues.some(issue => issue.includes('forbidden word'))
    )
  ).length;

  if (forbiddenWordIssues > 0) {
    recommendations.push({
      priority: 'HIGH',
      category: 'Tone',
      issue: `${forbiddenWordIssues} cards contain forbidden words`,
      action: 'Remove informal/personal language from content',
    });
  }

  testResults.recommendations = recommendations;
}

async function saveProofreadingReport(testResults) {
  // Output dizinini oluştur
  const outputDir = path.dirname(OUTPUT_FILE);
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Raporu kaydet
  await fs.promises.writeFile(
    OUTPUT_FILE,
    JSON.stringify(testResults, null, 2),
    'utf-8'
  );

  console.log(`✅ Content proofreading raporu kaydedildi: ${OUTPUT_FILE}`);
}

function printProofreadingSummary(testResults) {
  console.log('\n📝 Content Proofreading Özeti:');
  console.log('='.repeat(50));
  console.log(`Toplam Kart: ${testResults.summary.total_cards}`);
  console.log(`Genel Skor: ${testResults.summary.overall_score}/100`);
  console.log(`Geçen Kartlar: ${testResults.summary.passed_cards}`);
  console.log(`Uyarılar: ${testResults.summary.warnings}`);
  console.log(`Başarısız Kartlar: ${testResults.summary.failed_cards}`);

  console.log('\n🌍 Dil Analizi:');
  Object.entries(testResults.language_analysis).forEach(
    ([locale, analysis]) => {
      console.log(
        `${locale.toUpperCase()}: ${analysis.passed} geçti, ${analysis.failed} başarısız`
      );
    }
  );

  console.log('\n🎯 Öneriler:');
  testResults.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority}] ${rec.issue}`);
    console.log(`   → ${rec.action}`);
  });

  // En çok sorun olan kartlar
  const problematicCards = testResults.detailed_results
    .sort((a, b) => a.overall_score - b.overall_score)
    .slice(0, 5);

  if (problematicCards.length > 0) {
    console.log('\n⚠️ En Çok Sorun Olan Kartlar:');
    problematicCards.forEach((card, index) => {
      console.log(
        `${index + 1}. ${card.card_id} - Skor: ${card.overall_score}/100`
      );
    });
  }

  // En yaygın sorunlar
  const allIssues = testResults.detailed_results
    .flatMap(card => Object.values(card.languages).flatMap(lang => lang.issues))
    .reduce((acc, issue) => {
      acc[issue] = (acc[issue] || 0) + 1;
      return acc;
    }, {});

  const topIssues = Object.entries(allIssues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (topIssues.length > 0) {
    console.log('\n🔍 En Yaygın Sorunlar:');
    topIssues.forEach(([issue, count], index) => {
      console.log(`${index + 1}. ${issue} (${count} kez)`);
    });
  }
}

// Script çalıştırma
performContentProofreadingTest();
