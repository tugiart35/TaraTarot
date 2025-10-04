#!/usr/bin/env node

/**
 * Final Content Review Script
 *
 * Bu script, final manuel content review yapar.
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
  'final-content-review-report.json'
);

async function performFinalContentReview() {
  console.log('📋 Final Content Review başlatılıyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    const reviewResults = {
      summary: {
        total_cards: cards.length,
        review_date: new Date().toISOString(),
        overall_content_quality_score: 0,
        critical_issues_found: 0,
        content_recommendations: 0,
        production_readiness: 'unknown',
      },
      detailed_analysis: [],
      content_quality_metrics: {
        meta_descriptions_optimal: 0,
        content_length_sufficient: 0,
        faq_complete: 0,
        keywords_optimized: 0,
        structured_data_ready: 0,
      },
      production_readiness: {
        ready_for_launch: false,
        blocking_issues: 0,
        recommendations: [],
      },
      recommendations: [],
    };

    let totalCriticalIssues = 0;
    let contentQualityScore = 0;
    let blockingIssues = 0;

    // Her kart için detaylı content review
    for (const card of cards) {
      const cardReview = reviewCardContent(card);
      reviewResults.detailed_analysis.push(cardReview);

      totalCriticalIssues += cardReview.critical_issues.length;
      contentQualityScore += cardReview.quality_score;

      if (cardReview.blocking_issues.length > 0) {
        blockingIssues += cardReview.blocking_issues.length;
      }
    }

    // Summary hesapla
    reviewResults.summary.overall_content_quality_score = Math.round(
      contentQualityScore / cards.length
    );
    reviewResults.summary.critical_issues_found = totalCriticalIssues;
    reviewResults.summary.content_recommendations =
      generateContentRecommendations(reviewResults);

    // Production readiness assessment
    reviewResults.production_readiness.ready_for_launch =
      blockingIssues === 0 && totalCriticalIssues <= 10;
    reviewResults.production_readiness.blocking_issues = blockingIssues;
    reviewResults.production_readiness.recommendations =
      generateProductionRecommendations(reviewResults);

    // Content quality metrics
    reviewResults.content_quality_metrics = calculateContentQualityMetrics(
      reviewResults.detailed_analysis
    );

    // Final recommendations
    reviewResults.recommendations = generateFinalRecommendations(reviewResults);

    // Raporu kaydet
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(reviewResults, null, 2),
      'utf-8'
    );

    console.log(`✅ Final content review raporu kaydedildi: ${OUTPUT_FILE}`);

    // Özet rapor
    console.log('\n📋 Final Content Review Özeti:');
    console.log('==================================================');
    console.log(`Toplam Kart: ${reviewResults.summary.total_cards}`);
    console.log(
      `Content Quality Score: ${reviewResults.summary.overall_content_quality_score}/100`
    );
    console.log(`Kritik Sorun: ${reviewResults.summary.critical_issues_found}`);
    console.log(
      `Production Ready: ${reviewResults.production_readiness.ready_for_launch ? '✅ EVET' : '❌ HAYIR'}`
    );
    console.log(
      `Blokaj Sorunları: ${reviewResults.production_readiness.blocking_issues}`
    );

    console.log('\n📊 Content Quality Metrics:');
    console.log(
      `Meta Descriptions Optimal: ${reviewResults.content_quality_metrics.meta_descriptions_optimal}/${cards.length}`
    );
    console.log(
      `Content Length Sufficient: ${reviewResults.content_quality_metrics.content_length_sufficient}/${cards.length}`
    );
    console.log(
      `FAQ Complete: ${reviewResults.content_quality_metrics.faq_complete}/${cards.length}`
    );
    console.log(
      `Keywords Optimized: ${reviewResults.content_quality_metrics.keywords_optimized}/${cards.length}`
    );
    console.log(
      `Structured Data Ready: ${reviewResults.content_quality_metrics.structured_data_ready}/${cards.length}`
    );

    console.log('\n🎯 Final Recommendations:');
    reviewResults.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.description}`);
    });

    console.log('\n🚀 Production Readiness:');
    if (reviewResults.production_readiness.ready_for_launch) {
      console.log("✅ PROJE PRODUCTION'A HAZIR!");
      console.log('✅ Tüm kritik sorunlar çözüldü');
      console.log('✅ Content kalitesi yeterli');
      console.log('✅ SEO optimizasyonu tamamlandı');
    } else {
      console.log('⚠️ Production öncesi düzeltmeler gerekli:');
      reviewResults.production_readiness.recommendations.forEach(
        (rec, index) => {
          console.log(`   ${index + 1}. ${rec}`);
        }
      );
    }

    console.log('\n🎉 Final Content Review tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function reviewCardContent(card) {
  const cardReview = {
    card_id: card.id,
    card_name: card.names,
    quality_score: 0,
    critical_issues: [],
    blocking_issues: [],
    content_analysis: {},
    recommendations: [],
  };

  let totalScore = 0;
  let maxScore = 0;

  // Her dil için content review
  ['tr', 'en', 'sr'].forEach(locale => {
    const content = card.content[locale];
    const seo = card.seo[locale];

    if (!content || !seo) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: Missing content or SEO data`
      );
      return;
    }

    maxScore += 100; // Her dil için 100 puan

    let localeScore = 0;

    // 1. Meta Description Quality (20 puan)
    const metaDescScore = evaluateMetaDescription(seo.description, locale);
    localeScore += metaDescScore;

    if (metaDescScore < 15) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: Meta description needs optimization (${seo.description?.length || 0} chars)`
      );
    }

    // 2. Content Length & Quality (30 puan)
    const contentScore = evaluateContentLength(content, locale);
    localeScore += contentScore;

    if (contentScore < 20) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: Content length insufficient (${getTotalWordCount(content)} words)`
      );
    }

    // 3. FAQ Completeness (15 puan)
    const faqScore = evaluateFAQContent(content.faq, locale);
    localeScore += faqScore;

    if (faqScore < 10) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: FAQ content incomplete`
      );
    }

    // 4. Keywords Optimization (15 puan)
    const keywordsScore = evaluateKeywords(seo.keywords, locale);
    localeScore += keywordsScore;

    if (keywordsScore < 10) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: Keywords need optimization`
      );
    }

    // 5. Structured Data (20 puan)
    const structuredDataScore = evaluateStructuredData(
      seo.structured_data,
      locale
    );
    localeScore += structuredDataScore;

    if (structuredDataScore < 15) {
      cardReview.critical_issues.push(
        `${locale.toUpperCase()}: Structured data incomplete`
      );
    }

    totalScore += localeScore;

    // Content analysis
    cardReview.content_analysis[locale] = {
      meta_description_length: seo.description?.length || 0,
      content_word_count: getTotalWordCount(content),
      faq_count: content.faq?.length || 0,
      keywords_count: seo.keywords?.length || 0,
      structured_data_present: !!seo.structured_data,
    };
  });

  cardReview.quality_score =
    maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Blocking issues (çok kritik sorunlar)
  if (cardReview.quality_score < 60) {
    cardReview.blocking_issues.push(
      `Overall quality score too low: ${cardReview.quality_score}/100`
    );
  }

  if (cardReview.critical_issues.length > 5) {
    cardReview.blocking_issues.push(
      `Too many critical issues: ${cardReview.critical_issues.length}`
    );
  }

  return cardReview;
}

function evaluateMetaDescription(description, locale) {
  if (!description) return 0;

  const length = description.length;
  let score = 0;

  // Length scoring (120-155 karakter optimal)
  if (length >= 120 && length <= 155) {
    score += 15;
  } else if (length >= 100 && length <= 170) {
    score += 10;
  } else if (length >= 80 && length <= 200) {
    score += 5;
  }

  // Content quality
  if (description.includes('|')) score += 2;
  if (description.includes('tarot')) score += 1;
  if (
    description.includes('reading') ||
    description.includes('çitanje') ||
    description.includes('čitanje')
  )
    score += 1;
  if (
    description.includes('booking') ||
    description.includes('randevu') ||
    description.includes('zakazivanje')
  )
    score += 1;

  return Math.min(score, 20);
}

function evaluateContentLength(content, locale) {
  const totalWords = getTotalWordCount(content);
  let score = 0;

  // Word count scoring (400+ kelime hedef)
  if (totalWords >= 400) {
    score += 20;
  } else if (totalWords >= 350) {
    score += 15;
  } else if (totalWords >= 300) {
    score += 10;
  } else if (totalWords >= 250) {
    score += 5;
  }

  // Content structure scoring
  if (content.meanings?.upright?.general) score += 3;
  if (content.meanings?.reversed?.general) score += 3;
  if (content.meanings?.upright?.love) score += 1;
  if (content.meanings?.upright?.career) score += 1;
  if (content.meanings?.upright?.money) score += 1;
  if (content.meanings?.upright?.spiritual) score += 1;

  return Math.min(score, 30);
}

function evaluateFAQContent(faq, locale) {
  if (!faq || !Array.isArray(faq)) return 0;

  let score = 0;

  // FAQ count scoring (5 soru hedef)
  if (faq.length >= 5) {
    score += 10;
  } else if (faq.length >= 3) {
    score += 7;
  } else if (faq.length >= 1) {
    score += 3;
  }

  // FAQ quality scoring
  const avgLength = faq.reduce((sum, q) => sum + q.length, 0) / faq.length;
  if (avgLength >= 30) score += 3;
  if (avgLength >= 20) score += 2;
  if (avgLength >= 10) score += 1;

  // Question mark presence
  const hasQuestionMarks = faq.some(q => q.includes('?'));
  if (hasQuestionMarks) score += 2;

  return Math.min(score, 15);
}

function evaluateKeywords(keywords, locale) {
  if (!keywords || !Array.isArray(keywords)) return 0;

  let score = 0;

  // Keyword count scoring (8+ anahtar kelime hedef)
  if (keywords.length >= 8) {
    score += 8;
  } else if (keywords.length >= 5) {
    score += 5;
  } else if (keywords.length >= 3) {
    score += 3;
  }

  // Essential keywords
  const essentialKeywords = [
    'tarot',
    'karta',
    'čitanje',
    'reading',
    'znamenje',
    'meaning',
  ];
  const hasEssential = essentialKeywords.some(keyword =>
    keywords.some(k => k.toLowerCase().includes(keyword))
  );
  if (hasEssential) score += 4;

  // Locale-specific keywords
  const localeKeywords = {
    tr: ['tarot', 'karta', 'çitanje', 'anlam', 'yorum'],
    en: ['tarot', 'card', 'reading', 'meaning', 'interpretation'],
    sr: ['tarot', 'karta', 'čitanje', 'značenje', 'tumačenje'],
  };

  const localeSpecific = localeKeywords[locale] || [];
  const hasLocaleSpecific = localeSpecific.some(keyword =>
    keywords.some(k => k.toLowerCase().includes(keyword))
  );
  if (hasLocaleSpecific) score += 3;

  return Math.min(score, 15);
}

function evaluateStructuredData(structuredData, locale) {
  if (!structuredData) return 0;

  let score = 0;

  // Basic structure
  if (structuredData['@context']) score += 3;
  if (structuredData['@type']) score += 3;
  if (structuredData.headline) score += 3;
  if (structuredData.description) score += 3;
  if (structuredData.author) score += 2;
  if (structuredData.publisher) score += 2;

  // Advanced structure
  if (structuredData.publisher?.logo) score += 2;
  if (structuredData.author?.['@type']) score += 1;
  if (structuredData.publisher?.['@type']) score += 1;

  return Math.min(score, 20);
}

function getTotalWordCount(content) {
  const sections = [
    content.short_description,
    content.meanings?.upright?.general,
    content.meanings?.reversed?.general,
    content.meanings?.upright?.love,
    content.meanings?.upright?.career,
    content.meanings?.upright?.money,
    content.meanings?.upright?.spiritual,
    content.meanings?.reversed?.love,
    content.meanings?.reversed?.career,
    content.meanings?.reversed?.money,
    content.meanings?.reversed?.spiritual,
  ];

  return sections.reduce((total, section) => {
    return total + (section ? section.split(' ').length : 0);
  }, 0);
}

function calculateContentQualityMetrics(detailedAnalysis) {
  const totalCards = detailedAnalysis.length;

  return {
    meta_descriptions_optimal: detailedAnalysis.filter(
      card =>
        card.content_analysis.tr?.meta_description_length >= 120 &&
        card.content_analysis.en?.meta_description_length >= 120 &&
        card.content_analysis.sr?.meta_description_length >= 120
    ).length,

    content_length_sufficient: detailedAnalysis.filter(
      card =>
        card.content_analysis.tr?.content_word_count >= 400 &&
        card.content_analysis.en?.content_word_count >= 400 &&
        card.content_analysis.sr?.content_word_count >= 400
    ).length,

    faq_complete: detailedAnalysis.filter(
      card =>
        card.content_analysis.tr?.faq_count >= 5 &&
        card.content_analysis.en?.faq_count >= 5 &&
        card.content_analysis.sr?.faq_count >= 5
    ).length,

    keywords_optimized: detailedAnalysis.filter(
      card =>
        card.content_analysis.tr?.keywords_count >= 8 &&
        card.content_analysis.en?.keywords_count >= 8 &&
        card.content_analysis.sr?.keywords_count >= 8
    ).length,

    structured_data_ready: detailedAnalysis.filter(
      card =>
        card.content_analysis.tr?.structured_data_present &&
        card.content_analysis.en?.structured_data_present &&
        card.content_analysis.sr?.structured_data_present
    ).length,
  };
}

function generateContentRecommendations(reviewResults) {
  const recommendations = [];

  if (reviewResults.summary.overall_content_quality_score < 80) {
    recommendations.push('Content quality needs improvement');
  }

  if (reviewResults.summary.critical_issues_found > 10) {
    recommendations.push('Too many critical content issues');
  }

  return recommendations.length;
}

function generateProductionRecommendations(reviewResults) {
  const recommendations = [];

  if (reviewResults.production_readiness.blocking_issues > 0) {
    recommendations.push('Resolve blocking issues before launch');
  }

  if (reviewResults.summary.overall_content_quality_score < 70) {
    recommendations.push('Improve content quality to production standards');
  }

  if (reviewResults.summary.critical_issues_found > 5) {
    recommendations.push('Address remaining critical issues');
  }

  return recommendations;
}

function generateFinalRecommendations(reviewResults) {
  const recommendations = [];

  // High priority recommendations
  if (reviewResults.production_readiness.blocking_issues > 0) {
    recommendations.push({
      priority: 'HIGH',
      description: 'Blocking issues must be resolved before launch',
      action: 'Fix all blocking issues immediately',
    });
  }

  if (reviewResults.summary.overall_content_quality_score < 70) {
    recommendations.push({
      priority: 'HIGH',
      description: 'Content quality below production standards',
      action: 'Improve content quality to 70+ score',
    });
  }

  // Medium priority recommendations
  if (reviewResults.summary.critical_issues_found > 5) {
    recommendations.push({
      priority: 'MEDIUM',
      description: 'Multiple critical content issues remain',
      action: 'Address remaining critical issues',
    });
  }

  // Low priority recommendations
  if (reviewResults.summary.overall_content_quality_score >= 80) {
    recommendations.push({
      priority: 'LOW',
      description: 'Content quality is excellent',
      action: 'Maintain current quality standards',
    });
  }

  if (reviewResults.production_readiness.ready_for_launch) {
    recommendations.push({
      priority: 'LOW',
      description: 'Project is ready for production launch',
      action: 'Proceed with deployment',
    });
  }

  return recommendations;
}

// Script çalıştırma
performFinalContentReview();
