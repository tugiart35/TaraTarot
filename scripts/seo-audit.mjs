#!/usr/bin/env node

/**
 * SEO Audit Script
 *
 * Bu script, tarot kartları SEO projesi için kapsamlı SEO audit yapar.
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
  'seo-audit-report.json'
);

async function performSEOAudit() {
  console.log('🔍 SEO Audit başlatılıyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    // Audit sonuçları
    const auditResults = {
      summary: {
        total_cards: cards.length,
        audit_date: new Date().toISOString(),
        overall_score: 0,
        critical_issues: 0,
        warnings: 0,
        passed: 0,
      },
      meta_tags: {
        title_length: { passed: 0, failed: 0, issues: [] },
        description_length: { passed: 0, failed: 0, issues: [] },
        keywords_present: { passed: 0, failed: 0, issues: [] },
        unique_titles: { passed: 0, failed: 0, issues: [] },
      },
      content: {
        word_count: { passed: 0, failed: 0, issues: [] },
        duplicate_content: { passed: 0, failed: 0, issues: [] },
        missing_content: { passed: 0, failed: 0, issues: [] },
      },
      technical: {
        url_structure: { passed: 0, failed: 0, issues: [] },
        hreflang: { passed: 0, failed: 0, issues: [] },
        structured_data: { passed: 0, failed: 0, issues: [] },
      },
      recommendations: [],
      detailed_results: [],
    };

    // Her kart için audit yap
    for (const card of cards) {
      const cardAudit = auditCard(card);
      auditResults.detailed_results.push(cardAudit);

      // Sonuçları topla
      aggregateResults(auditResults, cardAudit);
    }

    // Genel skor hesapla
    calculateOverallScore(auditResults);

    // Öneriler oluştur
    generateRecommendations(auditResults);

    // Raporu kaydet
    await saveAuditReport(auditResults);

    // Konsola özet yazdır
    printAuditSummary(auditResults);

    console.log('🎉 SEO Audit tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function auditCard(card) {
  const audit = {
    card_id: card.id,
    card_name: card.names,
    issues: [],
    warnings: [],
    passed_checks: [],
  };

  // Meta Tags Audit
  auditMetaTags(card, audit);

  // Content Audit
  auditContent(card, audit);

  // Technical Audit
  auditTechnical(card, audit);

  return audit;
}

function auditMetaTags(card, audit) {
  const locales = ['tr', 'en', 'sr'];

  locales.forEach(locale => {
    const seo = card.seo[locale];

    // Title length check (50-60 chars optimal)
    if (seo.title.length < 30) {
      audit.issues.push(
        `${locale.toUpperCase()}: Title too short (${seo.title.length} chars)`
      );
    } else if (seo.title.length > 70) {
      audit.issues.push(
        `${locale.toUpperCase()}: Title too long (${seo.title.length} chars)`
      );
    } else {
      audit.passed_checks.push(`${locale.toUpperCase()}: Title length optimal`);
    }

    // Description length check (120-160 chars optimal)
    if (seo.description.length < 100) {
      audit.issues.push(
        `${locale.toUpperCase()}: Description too short (${seo.description.length} chars)`
      );
    } else if (seo.description.length > 180) {
      audit.issues.push(
        `${locale.toUpperCase()}: Description too long (${seo.description.length} chars)`
      );
    } else {
      audit.passed_checks.push(
        `${locale.toUpperCase()}: Description length optimal`
      );
    }

    // Keywords check
    if (seo.keywords.length < 3) {
      audit.warnings.push(
        `${locale.toUpperCase()}: Few keywords (${seo.keywords.length})`
      );
    } else {
      audit.passed_checks.push(`${locale.toUpperCase()}: Keywords present`);
    }
  });
}

function auditContent(card, audit) {
  const locales = ['tr', 'en', 'sr'];

  locales.forEach(locale => {
    const content = card.content[locale];

    // Word count check
    const totalWords = countWords(content);
    if (totalWords < 500) {
      audit.issues.push(
        `${locale.toUpperCase()}: Content too short (${totalWords} words)`
      );
    } else if (totalWords > 1500) {
      audit.warnings.push(
        `${locale.toUpperCase()}: Content very long (${totalWords} words)`
      );
    } else {
      audit.passed_checks.push(`${locale.toUpperCase()}: Content length good`);
    }

    // Missing content check
    if (!content.short_description) {
      audit.issues.push(`${locale.toUpperCase()}: Missing short description`);
    }

    if (!content.meanings.upright.general) {
      audit.issues.push(`${locale.toUpperCase()}: Missing upright meaning`);
    }

    if (!content.meanings.reversed.general) {
      audit.issues.push(`${locale.toUpperCase()}: Missing reversed meaning`);
    }
  });
}

function auditTechnical(card, audit) {
  const locales = ['tr', 'en', 'sr'];

  // URL structure check
  locales.forEach(locale => {
    const slug = card.slugs[locale];

    if (!slug) {
      audit.issues.push(`${locale.toUpperCase()}: Missing URL slug`);
    } else if (slug.length > 50) {
      audit.warnings.push(
        `${locale.toUpperCase()}: URL slug too long (${slug.length} chars)`
      );
    } else {
      audit.passed_checks.push(`${locale.toUpperCase()}: URL slug valid`);
    }
  });

  // Hreflang check (all locales should have slugs)
  const hasAllSlugs = locales.every(locale => card.slugs[locale]);
  if (!hasAllSlugs) {
    audit.issues.push('Missing slugs for hreflang implementation');
  } else {
    audit.passed_checks.push('Hreflang implementation ready');
  }

  // Structured data check
  const hasFAQ = card.content.tr.faq.length > 0;
  if (!hasFAQ) {
    audit.warnings.push('No FAQ content for structured data');
  } else {
    audit.passed_checks.push('FAQ structured data ready');
  }
}

function countWords(content) {
  const text = [
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
    content.context.mythology,
  ].join(' ');

  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function aggregateResults(auditResults, cardAudit) {
  // Issues count
  auditResults.summary.critical_issues += cardAudit.issues.length;

  // Warnings count
  auditResults.summary.warnings += cardAudit.warnings.length;

  // Passed checks count
  auditResults.summary.passed += cardAudit.passed_checks.length;
}

function calculateOverallScore(auditResults) {
  const totalChecks =
    auditResults.summary.critical_issues +
    auditResults.summary.warnings +
    auditResults.summary.passed;

  if (totalChecks === 0) {
    auditResults.summary.overall_score = 0;
    return;
  }

  const score = (auditResults.summary.passed / totalChecks) * 100;
  auditResults.summary.overall_score = Math.round(score);
}

function generateRecommendations(auditResults) {
  const recommendations = [];

  // Critical issues
  if (auditResults.summary.critical_issues > 0) {
    recommendations.push({
      priority: 'HIGH',
      category: 'Critical Issues',
      description: `${auditResults.summary.critical_issues} critical issues found`,
      action: 'Fix all critical issues before launch',
    });
  }

  // Title length issues
  const titleIssues = auditResults.detailed_results.filter(card =>
    card.issues.some(issue => issue.includes('Title too'))
  ).length;

  if (titleIssues > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Meta Tags',
      description: `${titleIssues} cards have title length issues`,
      action: 'Optimize title lengths (30-70 characters)',
    });
  }

  // Content length issues
  const contentIssues = auditResults.detailed_results.filter(card =>
    card.issues.some(issue => issue.includes('Content too short'))
  ).length;

  if (contentIssues > 0) {
    recommendations.push({
      priority: 'HIGH',
      category: 'Content',
      description: `${contentIssues} cards have insufficient content`,
      action: 'Expand content to at least 500 words per language',
    });
  }

  // Missing translations
  const missingTranslations = auditResults.detailed_results.filter(card =>
    card.issues.some(issue => issue.includes('Missing') && issue.includes('SR'))
  ).length;

  if (missingTranslations > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Translations',
      description: `${missingTranslations} cards missing SR translations`,
      action: 'Complete Serbian translations',
    });
  }

  // FAQ content
  const missingFAQ = auditResults.detailed_results.filter(card =>
    card.warnings.some(warning => warning.includes('No FAQ'))
  ).length;

  if (missingFAQ > 0) {
    recommendations.push({
      priority: 'LOW',
      category: 'Structured Data',
      description: `${missingFAQ} cards missing FAQ content`,
      action: 'Add FAQ content for better structured data',
    });
  }

  auditResults.recommendations = recommendations;
}

async function saveAuditReport(auditResults) {
  // Output dizinini oluştur
  const outputDir = path.dirname(OUTPUT_FILE);
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Raporu kaydet
  await fs.promises.writeFile(
    OUTPUT_FILE,
    JSON.stringify(auditResults, null, 2),
    'utf-8'
  );

  console.log(`✅ SEO audit raporu kaydedildi: ${OUTPUT_FILE}`);
}

function printAuditSummary(auditResults) {
  console.log('\n📊 SEO Audit Özeti:');
  console.log('='.repeat(50));
  console.log(`Toplam Kart: ${auditResults.summary.total_cards}`);
  console.log(`Genel Skor: ${auditResults.summary.overall_score}/100`);
  console.log(`Kritik Sorunlar: ${auditResults.summary.critical_issues}`);
  console.log(`Uyarılar: ${auditResults.summary.warnings}`);
  console.log(`Geçen Kontroller: ${auditResults.summary.passed}`);

  console.log('\n🎯 Öneriler:');
  auditResults.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority}] ${rec.description}`);
    console.log(`   → ${rec.action}`);
  });

  // En çok sorun olan kartlar
  const problematicCards = auditResults.detailed_results
    .sort(
      (a, b) =>
        b.issues.length +
        b.warnings.length -
        (a.issues.length + a.warnings.length)
    )
    .slice(0, 5);

  if (problematicCards.length > 0) {
    console.log('\n⚠️ En Çok Sorun Olan Kartlar:');
    problematicCards.forEach((card, index) => {
      const totalIssues = card.issues.length + card.warnings.length;
      console.log(`${index + 1}. ${card.card_id} (${totalIssues} sorun)`);
    });
  }
}

// Script çalıştırma
performSEOAudit();
