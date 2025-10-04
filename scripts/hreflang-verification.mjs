#!/usr/bin/env node

/**
 * Hreflang Verification Script
 *
 * Bu script, hreflang implementasyonunu doğrular.
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
  'hreflang-verification-report.json'
);

async function verifyHreflangImplementation() {
  console.log('🔗 Hreflang verification başlatılıyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    const verificationResults = {
      summary: {
        total_cards: cards.length,
        total_pages: cards.length * 3, // TR, EN, SR
        verification_date: new Date().toISOString(),
        hreflang_implementation_score: 0,
        issues_found: 0,
        recommendations: [],
      },
      detailed_results: [],
      hreflang_validation: {
        valid_implementations: 0,
        missing_hreflang: 0,
        invalid_urls: 0,
        missing_x_default: 0,
        incorrect_language_codes: 0,
      },
      recommendations: [],
    };

    let totalIssues = 0;
    let validImplementations = 0;

    // Her kart için hreflang verification
    for (const card of cards) {
      const cardVerification = verifyCardHreflang(card);
      verificationResults.detailed_results.push(cardVerification);

      totalIssues += cardVerification.issues.length;
      if (cardVerification.issues.length === 0) {
        validImplementations++;
      }
    }

    // Summary hesapla
    verificationResults.summary.hreflang_implementation_score = Math.round(
      (validImplementations / cards.length) * 100
    );
    verificationResults.summary.issues_found = totalIssues;

    // Hreflang validation summary
    verificationResults.hreflang_validation.valid_implementations =
      validImplementations;
    verificationResults.hreflang_validation.missing_hreflang = Math.max(
      0,
      cards.length * 3 - validImplementations
    );

    // Recommendations
    verificationResults.recommendations =
      generateHreflangRecommendations(verificationResults);

    // Raporu kaydet
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(verificationResults, null, 2),
      'utf-8'
    );

    console.log(`✅ Hreflang verification raporu kaydedildi: ${OUTPUT_FILE}`);

    // Özet rapor
    console.log('\n🔗 Hreflang Verification Özeti:');
    console.log('==================================================');
    console.log(`Toplam Kart: ${verificationResults.summary.total_cards}`);
    console.log(`Toplam Sayfa: ${verificationResults.summary.total_pages}`);
    console.log(
      `Hreflang Implementation Score: ${verificationResults.summary.hreflang_implementation_score}/100`
    );
    console.log(`Bulunan Sorun: ${verificationResults.summary.issues_found}`);

    console.log('\n📊 Hreflang Validation:');
    console.log(
      `Valid Implementations: ${verificationResults.hreflang_validation.valid_implementations}`
    );
    console.log(
      `Missing Hreflang: ${verificationResults.hreflang_validation.missing_hreflang}`
    );
    console.log(
      `Invalid URLs: ${verificationResults.hreflang_validation.invalid_urls}`
    );
    console.log(
      `Missing x-default: ${verificationResults.hreflang_validation.missing_x_default}`
    );

    console.log('\n🎯 Öneriler:');
    verificationResults.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.description}`);
    });

    console.log('\n🎉 Hreflang verification tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function verifyCardHreflang(card) {
  const issues = [];
  const cardVerification = {
    card_id: card.id,
    card_name: card.names,
    issues: [],
    hreflang_status: 'unknown',
    validation_details: {},
  };

  // Her dil için hreflang kontrolü
  ['tr', 'en', 'sr'].forEach(locale => {
    const seo = card.seo[locale];

    if (!seo || !seo.hreflang) {
      issues.push(`${locale.toUpperCase()}: Missing hreflang implementation`);
      return;
    }

    const hreflang = seo.hreflang;

    // 1. x-default kontrolü
    if (!hreflang['x-default']) {
      issues.push(`${locale.toUpperCase()}: Missing x-default hreflang`);
    }

    // 2. Tüm diller için URL kontrolü
    ['tr', 'en', 'sr', 'x-default'].forEach(lang => {
      if (hreflang[lang]) {
        const url = hreflang[lang];
        if (!isValidURL(url)) {
          issues.push(
            `${locale.toUpperCase()}: Invalid URL for ${lang} hreflang`
          );
        }

        // 3. URL format kontrolü
        if (!url.includes('busbuskimki.com')) {
          issues.push(
            `${locale.toUpperCase()}: URL does not match domain for ${lang} hreflang`
          );
        }

        // 4. Language code kontrolü
        if (lang !== 'x-default' && !url.includes(`/${lang}/`)) {
          issues.push(
            `${locale.toUpperCase()}: Language code mismatch for ${lang} hreflang`
          );
        }
      }
    });

    // 5. Canonical URL kontrolü
    if (seo.canonical_url) {
      const canonicalUrl = seo.canonical_url;
      if (!isValidURL(canonicalUrl)) {
        issues.push(`${locale.toUpperCase()}: Invalid canonical URL`);
      }

      // Canonical URL'nin hreflang ile uyumlu olup olmadığını kontrol et
      if (hreflang[locale] && hreflang[locale] !== canonicalUrl) {
        issues.push(
          `${locale.toUpperCase()}: Canonical URL mismatch with hreflang`
        );
      }
    }
  });

  cardVerification.issues = issues;
  cardVerification.hreflang_status = issues.length === 0 ? 'valid' : 'invalid';

  return cardVerification;
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function generateHreflangRecommendations(verificationResults) {
  const recommendations = [];

  // Genel öneriler
  if (verificationResults.summary.hreflang_implementation_score < 90) {
    recommendations.push({
      priority: 'HIGH',
      description: 'Hreflang implementation score is below 90%',
      action: 'Review and fix missing hreflang implementations',
    });
  }

  if (verificationResults.hreflang_validation.missing_x_default > 0) {
    recommendations.push({
      priority: 'HIGH',
      description: 'Missing x-default hreflang tags',
      action: 'Add x-default hreflang tags to all pages',
    });
  }

  if (verificationResults.hreflang_validation.invalid_urls > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      description: 'Invalid URLs in hreflang tags',
      action: 'Fix invalid URLs in hreflang implementations',
    });
  }

  if (verificationResults.hreflang_validation.incorrect_language_codes > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      description: 'Incorrect language codes in URLs',
      action: 'Ensure language codes match hreflang values',
    });
  }

  // Başarı önerileri
  if (verificationResults.summary.hreflang_implementation_score >= 90) {
    recommendations.push({
      priority: 'LOW',
      description: 'Hreflang implementation is excellent',
      action: 'Maintain current implementation and monitor for changes',
    });
  }

  return recommendations;
}

// Script çalıştırma
verifyHreflangImplementation();
