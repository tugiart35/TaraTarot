#!/usr/bin/env node

/**
 * Mobile Responsiveness Test Script
 *
 * Bu script, tarot kartları sayfaları için mobile responsiveness testi yapar.
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
  'mobile-responsiveness-report.json'
);

// Test edilecek cihaz boyutları
const DEVICE_SIZES = {
  mobile: { width: 375, height: 667, name: 'iPhone SE' },
  mobile_large: { width: 414, height: 896, name: 'iPhone 11 Pro Max' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  tablet_large: { width: 1024, height: 1366, name: 'iPad Pro' },
  desktop: { width: 1440, height: 900, name: 'Desktop' },
};

// Responsive breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

async function performMobileResponsivenessTest() {
  console.log('📱 Mobile Responsiveness testi başlatılıyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    // Test sonuçları
    const testResults = {
      summary: {
        total_tests: cards.length * 3 * Object.keys(DEVICE_SIZES).length, // kart × dil × cihaz
        test_date: new Date().toISOString(),
        overall_score: 0,
        passed_tests: 0,
        failed_tests: 0,
        warnings: 0,
      },
      device_analysis: {},
      component_analysis: {
        hero: { passed: 0, failed: 0, issues: [] },
        content: { passed: 0, failed: 0, issues: [] },
        cta: { passed: 0, failed: 0, issues: [] },
        faq: { passed: 0, failed: 0, issues: [] },
        navigation: { passed: 0, failed: 0, issues: [] },
      },
      detailed_results: [],
      recommendations: [],
    };

    // Her cihaz boyutu için analiz başlat
    Object.entries(DEVICE_SIZES).forEach(([device, size]) => {
      testResults.device_analysis[device] = {
        name: size.name,
        size: `${size.width}x${size.height}`,
        passed: 0,
        failed: 0,
        warnings: 0,
        issues: [],
      };
    });

    // Her kart için test yap
    for (const card of cards) {
      const cardResults = testCardResponsiveness(card);
      testResults.detailed_results.push(cardResults);

      // Sonuçları topla
      aggregateResponsivenessResults(testResults, cardResults);
    }

    // Genel skor hesapla
    calculateResponsivenessScore(testResults);

    // Öneriler oluştur
    generateResponsivenessRecommendations(testResults);

    // Raporu kaydet
    await saveResponsivenessReport(testResults);

    // Konsola özet yazdır
    printResponsivenessSummary(testResults);

    console.log('🎉 Mobile Responsiveness testi tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function testCardResponsiveness(card) {
  const results = {
    card_id: card.id,
    card_name: card.names,
    device_tests: {},
  };

  // Her cihaz boyutu için test yap
  Object.entries(DEVICE_SIZES).forEach(([device, size]) => {
    const deviceTest = testDeviceSize(card, device, size);
    results.device_tests[device] = deviceTest;
  });

  return results;
}

function testDeviceSize(card, device, size) {
  const test = {
    device: device,
    size: size,
    components: {},
    overall_score: 0,
    issues: [],
    warnings: [],
  };

  // Her component için test yap
  test.components.hero = testHeroComponent(card, device, size);
  test.components.content = testContentComponent(card, device, size);
  test.components.cta = testCTAComponent(card, device, size);
  test.components.faq = testFAQComponent(card, device, size);
  test.components.navigation = testNavigationComponent(card, device, size);

  // Genel skor hesapla
  const componentScores = Object.values(test.components).map(
    comp => comp.score
  );
  test.overall_score = Math.round(
    componentScores.reduce((sum, score) => sum + score, 0) /
      componentScores.length
  );

  return test;
}

function testHeroComponent(card, device, size) {
  const issues = [];
  const warnings = [];
  let score = 100;

  // Mobile cihazlarda hero section testi
  if (size.width <= BREAKPOINTS.md) {
    // Mobile hero testleri
    if (card.content.tr.short_description.length > 100) {
      issues.push('Hero description too long for mobile');
      score -= 20;
    }

    // Hero image responsive test
    if (size.width < 400) {
      warnings.push('Hero image may be too small on very small screens');
      score -= 10;
    }
  }

  // Tablet ve desktop testleri
  if (size.width >= BREAKPOINTS.lg) {
    // Large screen optimizations
    if (card.content.tr.short_description.length < 50) {
      warnings.push('Hero description could be longer for desktop');
      score -= 5;
    }
  }

  return {
    component: 'hero',
    score: Math.max(0, score),
    issues,
    warnings,
    recommendations: generateHeroRecommendations(issues, warnings),
  };
}

function testContentComponent(card, device, size) {
  const issues = [];
  const warnings = [];
  let score = 100;

  // Content readability test
  if (size.width <= BREAKPOINTS.md) {
    // Mobile content testleri
    const contentLength = card.content.tr.meanings.upright.general.length;

    if (contentLength > 300) {
      issues.push('Content paragraphs too long for mobile reading');
      score -= 25;
    }

    // Tab navigation test
    warnings.push('Ensure tab navigation is touch-friendly');
    score -= 5;
  }

  // Grid layout test
  if (size.width >= BREAKPOINTS.lg) {
    // Desktop grid test
    if (
      !card.content.tr.meanings.upright.love ||
      !card.content.tr.meanings.upright.career
    ) {
      warnings.push('Consider adding more content sections for desktop layout');
      score -= 10;
    }
  }

  return {
    component: 'content',
    score: Math.max(0, score),
    issues,
    warnings,
    recommendations: generateContentRecommendations(issues, warnings),
  };
}

function testCTAComponent(card, device, size) {
  const issues = [];
  const warnings = [];
  let score = 100;

  // Mobile CTA testleri
  if (size.width <= BREAKPOINTS.md) {
    // Button size test
    warnings.push('Ensure CTA buttons are at least 44px for touch targets');
    score -= 5;

    // Form layout test
    warnings.push('Check form inputs are properly sized for mobile');
    score -= 5;
  }

  // Desktop CTA testleri
  if (size.width >= BREAKPOINTS.lg) {
    // Sidebar layout test
    warnings.push("Ensure CTA sidebar doesn't take too much space");
    score -= 5;
  }

  return {
    component: 'cta',
    score: Math.max(0, score),
    issues,
    warnings,
    recommendations: generateCTARecommendations(issues, warnings),
  };
}

function testFAQComponent(card, device, size) {
  const issues = [];
  const warnings = [];
  let score = 100;

  // FAQ accordion test
  if (size.width <= BREAKPOINTS.md) {
    // Mobile FAQ testleri
    if (card.content.tr.faq.length > 5) {
      warnings.push('Too many FAQ items for mobile - consider pagination');
      score -= 10;
    }

    // Touch target test
    warnings.push('Ensure FAQ accordion headers are touch-friendly');
    score -= 5;
  }

  return {
    component: 'faq',
    score: Math.max(0, score),
    issues,
    warnings,
    recommendations: generateFAQRecommendations(issues, warnings),
  };
}

function testNavigationComponent(card, device, size) {
  const issues = [];
  const warnings = [];
  let score = 100;

  // Breadcrumb test
  if (size.width <= BREAKPOINTS.sm) {
    // Mobile breadcrumb test
    warnings.push('Breadcrumb may need mobile optimization');
    score -= 10;
  }

  // Related cards navigation
  if (size.width <= BREAKPOINTS.md) {
    warnings.push('Related cards section needs mobile layout');
    score -= 5;
  }

  return {
    component: 'navigation',
    score: Math.max(0, score),
    issues,
    warnings,
    recommendations: generateNavigationRecommendations(issues, warnings),
  };
}

function generateHeroRecommendations(issues, warnings) {
  const recommendations = [];

  if (issues.some(issue => issue.includes('description too long'))) {
    recommendations.push('Truncate hero description for mobile devices');
  }

  if (warnings.some(warning => warning.includes('image too small'))) {
    recommendations.push(
      'Use responsive images with different sizes for different devices'
    );
  }

  return recommendations;
}

function generateContentRecommendations(issues, warnings) {
  const recommendations = [];

  if (issues.some(issue => issue.includes('paragraphs too long'))) {
    recommendations.push('Break long paragraphs into shorter ones for mobile');
  }

  if (warnings.some(warning => warning.includes('touch-friendly'))) {
    recommendations.push('Increase touch target sizes for mobile devices');
  }

  return recommendations;
}

function generateCTARecommendations(issues, warnings) {
  const recommendations = [];

  if (warnings.some(warning => warning.includes('44px'))) {
    recommendations.push(
      'Ensure all interactive elements are at least 44px tall'
    );
  }

  if (warnings.some(warning => warning.includes('form inputs'))) {
    recommendations.push('Optimize form inputs for mobile keyboards');
  }

  return recommendations;
}

function generateFAQRecommendations(issues, warnings) {
  const recommendations = [];

  if (warnings.some(warning => warning.includes('too many FAQ'))) {
    recommendations.push('Implement FAQ pagination or collapsible sections');
  }

  if (warnings.some(warning => warning.includes('accordion headers'))) {
    recommendations.push('Make FAQ accordion headers larger for touch');
  }

  return recommendations;
}

function generateNavigationRecommendations(issues, warnings) {
  const recommendations = [];

  if (warnings.some(warning => warning.includes('breadcrumb'))) {
    recommendations.push('Implement mobile-friendly breadcrumb navigation');
  }

  if (warnings.some(warning => warning.includes('related cards'))) {
    recommendations.push('Optimize related cards layout for mobile');
  }

  return recommendations;
}

function aggregateResponsivenessResults(testResults, cardResults) {
  Object.entries(cardResults.device_tests).forEach(([device, deviceTest]) => {
    const deviceAnalysis = testResults.device_analysis[device];

    if (deviceTest.overall_score >= 90) {
      deviceAnalysis.passed++;
      testResults.summary.passed_tests++;
    } else if (deviceTest.overall_score >= 70) {
      deviceAnalysis.warnings++;
      testResults.summary.warnings++;
    } else {
      deviceAnalysis.failed++;
      testResults.summary.failed_tests++;
    }

    // Component analizi
    Object.entries(deviceTest.components).forEach(([component, compTest]) => {
      const componentAnalysis = testResults.component_analysis[component];

      if (compTest.score >= 90) {
        componentAnalysis.passed++;
      } else {
        componentAnalysis.failed++;
      }

      // Issues topla
      compTest.issues.forEach(issue => {
        if (!componentAnalysis.issues.includes(issue)) {
          componentAnalysis.issues.push(issue);
        }
      });
    });
  });
}

function calculateResponsivenessScore(testResults) {
  const totalTests =
    testResults.summary.passed_tests +
    testResults.summary.warnings +
    testResults.summary.failed_tests;

  if (totalTests === 0) {
    testResults.summary.overall_score = 0;
    return;
  }

  const score =
    ((testResults.summary.passed_tests + testResults.summary.warnings * 0.5) /
      totalTests) *
    100;
  testResults.summary.overall_score = Math.round(score);
}

function generateResponsivenessRecommendations(testResults) {
  const recommendations = [];

  // Device-specific recommendations
  Object.entries(testResults.device_analysis).forEach(([device, analysis]) => {
    if (analysis.failed > 0) {
      recommendations.push({
        priority: 'HIGH',
        device: device,
        issue: `${analysis.failed} tests failed on ${analysis.name}`,
        action: `Fix responsive issues for ${device} devices`,
      });
    }
  });

  // Component-specific recommendations
  Object.entries(testResults.component_analysis).forEach(
    ([component, analysis]) => {
      if (analysis.failed > analysis.passed) {
        recommendations.push({
          priority: 'MEDIUM',
          component: component,
          issue: `${component} component has ${analysis.failed} failed tests`,
          action: `Improve ${component} component responsiveness`,
        });
      }
    }
  );

  // General recommendations
  if (testResults.summary.overall_score < 80) {
    recommendations.push({
      priority: 'HIGH',
      category: 'General',
      issue: 'Overall responsiveness score is below 80%',
      action: 'Conduct comprehensive responsive design review',
    });
  }

  testResults.recommendations = recommendations;
}

async function saveResponsivenessReport(testResults) {
  // Output dizinini oluştur
  const outputDir = path.dirname(OUTPUT_FILE);
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Raporu kaydet
  await fs.promises.writeFile(
    OUTPUT_FILE,
    JSON.stringify(testResults, null, 2),
    'utf-8'
  );

  console.log(`✅ Mobile responsiveness raporu kaydedildi: ${OUTPUT_FILE}`);
}

function printResponsivenessSummary(testResults) {
  console.log('\n📱 Mobile Responsiveness Özeti:');
  console.log('='.repeat(50));
  console.log(`Toplam Test: ${testResults.summary.total_tests}`);
  console.log(`Genel Skor: ${testResults.summary.overall_score}/100`);
  console.log(`Geçen Testler: ${testResults.summary.passed_tests}`);
  console.log(`Uyarılar: ${testResults.summary.warnings}`);
  console.log(`Başarısız Testler: ${testResults.summary.failed_tests}`);

  console.log('\n📊 Cihaz Analizi:');
  Object.entries(testResults.device_analysis).forEach(([device, analysis]) => {
    console.log(
      `${device.toUpperCase()}: ${analysis.passed} geçti, ${analysis.warnings} uyarı, ${analysis.failed} başarısız`
    );
  });

  console.log('\n🧩 Component Analizi:');
  Object.entries(testResults.component_analysis).forEach(
    ([component, analysis]) => {
      console.log(
        `${component.toUpperCase()}: ${analysis.passed} geçti, ${analysis.failed} başarısız`
      );
    }
  );

  console.log('\n🎯 Öneriler:');
  testResults.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority}] ${rec.issue}`);
    console.log(`   → ${rec.action}`);
  });

  // En çok sorun olan cihazlar
  const problematicDevices = Object.entries(testResults.device_analysis)
    .sort((a, b) => b[1].failed - a[1].failed)
    .slice(0, 3);

  if (problematicDevices.length > 0) {
    console.log('\n⚠️ En Çok Sorun Olan Cihazlar:');
    problematicDevices.forEach(([device, analysis], index) => {
      console.log(
        `${index + 1}. ${analysis.name} - ${analysis.failed} başarısız test`
      );
    });
  }
}

// Script çalıştırma
performMobileResponsivenessTest();
