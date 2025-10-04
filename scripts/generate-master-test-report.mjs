#!/usr/bin/env node

/**
 * Master Test Report Generator
 *
 * Bu script, tüm test raporlarını birleştirerek kapsamlı bir master rapor oluşturur.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORTS_DIR = path.join(__dirname, '..', 'analysis');
const MASTER_REPORT_FILE = path.join(
  __dirname,
  '..',
  'analysis',
  'master-test-report.json'
);

async function generateMasterTestReport() {
  console.log('📊 Master Test Report oluşturuluyor...');

  try {
    // Tüm test raporlarını yükle
    const reports = await loadAllReports();

    // Master rapor oluştur
    const masterReport = {
      project_info: {
        name: 'Tarot Kartları SEO Projesi',
        version: '1.0.0',
        total_cards: 78,
        total_pages: 234,
        languages: ['tr', 'en', 'sr'],
        report_date: new Date().toISOString(),
      },

      test_summary: {
        total_tests: 0,
        passed_tests: 0,
        failed_tests: 0,
        warnings: 0,
        overall_score: 0,
      },

      individual_reports: reports,

      consolidated_analysis: {
        seo_health: 0,
        performance_score: 0,
        mobile_readiness: 0,
        content_quality: 0,
        accessibility_score: 0,
      },

      critical_issues: [],
      high_priority_recommendations: [],
      medium_priority_recommendations: [],
      low_priority_recommendations: [],

      next_steps: [],

      launch_readiness: {
        ready_for_launch: false,
        blocking_issues: 0,
        recommended_actions: [],
      },
    };

    // Test sonuçlarını analiz et
    analyzeTestResults(masterReport, reports);

    // Konsolidasyon analizi yap
    performConsolidatedAnalysis(masterReport, reports);

    // Kritik sorunları belirle
    identifyCriticalIssues(masterReport, reports);

    // Önerileri kategorize et
    categorizeRecommendations(masterReport, reports);

    // Sonraki adımları belirle
    defineNextSteps(masterReport);

    // Launch hazırlığını değerlendir
    evaluateLaunchReadiness(masterReport);

    // Master raporu kaydet
    await saveMasterReport(masterReport);

    // Konsola özet yazdır
    printMasterReportSummary(masterReport);

    console.log('🎉 Master Test Report oluşturuldu!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function loadAllReports() {
  const reports = {};

  const reportFiles = [
    { name: 'seo-audit-report.json', key: 'seo_audit' },
    { name: 'core-web-vitals-report.json', key: 'core_web_vitals' },
    { name: 'mobile-responsiveness-report.json', key: 'mobile_responsiveness' },
    { name: 'content-proofreading-report.json', key: 'content_proofreading' },
    {
      name: 'performance-optimization-report.json',
      key: 'performance_optimization',
    },
    { name: 'accessibility-audit-report.json', key: 'accessibility_audit' },
  ];

  for (const reportFile of reportFiles) {
    const filePath = path.join(REPORTS_DIR, reportFile.name);

    if (fs.existsSync(filePath)) {
      try {
        const reportData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        reports[reportFile.key] = reportData;
        console.log(`✅ ${reportFile.name} yüklendi`);
      } catch (error) {
        console.warn(`⚠️ ${reportFile.name} yüklenemedi: ${error.message}`);
      }
    } else {
      console.warn(`⚠️ ${reportFile.name} bulunamadı`);
    }
  }

  return reports;
}

function analyzeTestResults(masterReport, reports) {
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let warnings = 0;
  let totalScore = 0;
  let scoreCount = 0;

  // Her rapor için analiz yap
  Object.entries(reports).forEach(([key, report]) => {
    if (report.summary) {
      totalTests +=
        report.summary.total_tests || report.summary.total_cards || 0;
      passedTests +=
        report.summary.passed_tests || report.summary.passed_cards || 0;
      failedTests +=
        report.summary.failed_tests || report.summary.failed_cards || 0;
      warnings += report.summary.warnings || 0;

      if (report.summary.overall_score !== undefined) {
        totalScore += report.summary.overall_score;
        scoreCount++;
      }
    }
  });

  masterReport.test_summary.total_tests = totalTests;
  masterReport.test_summary.passed_tests = passedTests;
  masterReport.test_summary.failed_tests = failedTests;
  masterReport.test_summary.warnings = warnings;
  masterReport.test_summary.overall_score =
    scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;
}

function performConsolidatedAnalysis(masterReport, reports) {
  // SEO Health
  if (reports.seo_audit) {
    masterReport.consolidated_analysis.seo_health =
      reports.seo_audit.summary.overall_score;
  }

  // Performance Score
  if (reports.core_web_vitals) {
    masterReport.consolidated_analysis.performance_score =
      reports.core_web_vitals.summary.overall_score;
  }

  // Mobile Readiness
  if (reports.mobile_responsiveness) {
    masterReport.consolidated_analysis.mobile_readiness =
      reports.mobile_responsiveness.summary.overall_score;
  }

  // Content Quality
  if (reports.content_proofreading) {
    masterReport.consolidated_analysis.content_quality =
      reports.content_proofreading.summary.overall_score;
  }

  // Accessibility Score
  if (reports.accessibility_audit) {
    masterReport.consolidated_analysis.accessibility_score =
      reports.accessibility_audit.summary.overall_score;
  }
}

function identifyCriticalIssues(masterReport, reports) {
  const criticalIssues = [];

  // SEO kritik sorunlar
  if (reports.seo_audit && reports.seo_audit.summary.critical_issues > 0) {
    criticalIssues.push({
      category: 'SEO',
      issue: `${reports.seo_audit.summary.critical_issues} critical SEO issues found`,
      impact: 'HIGH',
      affected_pages: reports.seo_audit.summary.total_cards,
    });
  }

  // Content kritik sorunlar
  if (
    reports.content_proofreading &&
    reports.content_proofreading.summary.failed_cards > 0
  ) {
    criticalIssues.push({
      category: 'Content',
      issue: `${reports.content_proofreading.summary.failed_cards} cards failed content proofreading`,
      impact: 'HIGH',
      affected_pages: reports.content_proofreading.summary.failed_cards,
    });
  }

  // Performance kritik sorunlar
  if (
    reports.core_web_vitals &&
    reports.core_web_vitals.summary.poor_pages > 0
  ) {
    criticalIssues.push({
      category: 'Performance',
      issue: `${reports.core_web_vitals.summary.poor_pages} pages have poor Core Web Vitals`,
      impact: 'HIGH',
      affected_pages: reports.core_web_vitals.summary.poor_pages,
    });
  }

  // Accessibility kritik sorunlar
  if (
    reports.accessibility_audit &&
    reports.accessibility_audit.summary.failed_tests > 0
  ) {
    criticalIssues.push({
      category: 'Accessibility',
      issue: `${reports.accessibility_audit.summary.failed_tests} accessibility tests failed`,
      impact: 'MEDIUM',
      affected_pages: reports.accessibility_audit.summary.failed_tests,
    });
  }

  masterReport.critical_issues = criticalIssues;
}

function categorizeRecommendations(masterReport, reports) {
  const highPriority = [];
  const mediumPriority = [];
  const lowPriority = [];

  // Her rapordan önerileri topla
  Object.entries(reports).forEach(([key, report]) => {
    if (report.recommendations) {
      report.recommendations.forEach(rec => {
        const recommendation = {
          source: key,
          category: rec.category || rec.metric || 'General',
          description: rec.description || rec.issue,
          action: rec.action || rec.solutions || [],
          priority: rec.priority || 'MEDIUM',
        };

        if (recommendation.priority === 'HIGH') {
          highPriority.push(recommendation);
        } else if (recommendation.priority === 'MEDIUM') {
          mediumPriority.push(recommendation);
        } else {
          lowPriority.push(recommendation);
        }
      });
    }
  });

  masterReport.high_priority_recommendations = highPriority;
  masterReport.medium_priority_recommendations = mediumPriority;
  masterReport.low_priority_recommendations = lowPriority;
}

function defineNextSteps(masterReport) {
  const nextSteps = [];

  // Kritik sorunlar varsa önce onları çöz
  if (masterReport.critical_issues.length > 0) {
    nextSteps.push({
      step: 1,
      title: 'Critical Issues Resolution',
      description: 'Fix all critical issues before proceeding',
      estimated_time: '2-3 days',
      priority: 'BLOCKING',
    });
  }

  // Yüksek öncelikli öneriler
  if (masterReport.high_priority_recommendations.length > 0) {
    nextSteps.push({
      step: 2,
      title: 'High Priority Improvements',
      description: 'Implement high priority recommendations',
      estimated_time: '3-5 days',
      priority: 'HIGH',
    });
  }

  // Orta öncelikli öneriler
  if (masterReport.medium_priority_recommendations.length > 0) {
    nextSteps.push({
      step: 3,
      title: 'Medium Priority Enhancements',
      description: 'Implement medium priority recommendations',
      estimated_time: '2-3 days',
      priority: 'MEDIUM',
    });
  }

  // Launch hazırlığı
  nextSteps.push({
    step: 4,
    title: 'Launch Preparation',
    description: 'Final testing and deployment preparation',
    estimated_time: '1-2 days',
    priority: 'LAUNCH',
  });

  masterReport.next_steps = nextSteps;
}

function evaluateLaunchReadiness(masterReport) {
  const blockingIssues = masterReport.critical_issues.length;
  const overallScore = masterReport.test_summary.overall_score;

  masterReport.launch_readiness.blocking_issues = blockingIssues;

  // Launch hazırlık kriterleri
  const isReadyForLaunch =
    blockingIssues === 0 &&
    overallScore >= 70 &&
    masterReport.consolidated_analysis.seo_health >= 60 &&
    masterReport.consolidated_analysis.performance_score >= 70;

  masterReport.launch_readiness.ready_for_launch = isReadyForLaunch;

  // Önerilen aksiyonlar
  const recommendedActions = [];

  if (blockingIssues > 0) {
    recommendedActions.push('Fix all critical issues before launch');
  }

  if (overallScore < 70) {
    recommendedActions.push('Improve overall test scores to at least 70%');
  }

  if (masterReport.consolidated_analysis.seo_health < 60) {
    recommendedActions.push('Improve SEO health score to at least 60%');
  }

  if (masterReport.consolidated_analysis.performance_score < 70) {
    recommendedActions.push('Improve performance score to at least 70%');
  }

  if (isReadyForLaunch) {
    recommendedActions.push('Proceed with launch preparation');
  }

  masterReport.launch_readiness.recommended_actions = recommendedActions;
}

async function saveMasterReport(masterReport) {
  // Output dizinini oluştur
  const outputDir = path.dirname(MASTER_REPORT_FILE);
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Master raporu kaydet
  await fs.promises.writeFile(
    MASTER_REPORT_FILE,
    JSON.stringify(masterReport, null, 2),
    'utf-8'
  );

  console.log(`✅ Master test raporu kaydedildi: ${MASTER_REPORT_FILE}`);
}

function printMasterReportSummary(masterReport) {
  console.log('\n📊 MASTER TEST REPORT ÖZETİ');
  console.log('='.repeat(60));

  console.log('\n🎯 Proje Bilgileri:');
  console.log(`Proje: ${masterReport.project_info.name}`);
  console.log(`Toplam Kart: ${masterReport.project_info.total_cards}`);
  console.log(`Toplam Sayfa: ${masterReport.project_info.total_pages}`);
  console.log(`Diller: ${masterReport.project_info.languages.join(', ')}`);

  console.log('\n📈 Test Özeti:');
  console.log(`Toplam Test: ${masterReport.test_summary.total_tests}`);
  console.log(`Geçen Testler: ${masterReport.test_summary.passed_tests}`);
  console.log(`Başarısız Testler: ${masterReport.test_summary.failed_tests}`);
  console.log(`Uyarılar: ${masterReport.test_summary.warnings}`);
  console.log(`Genel Skor: ${masterReport.test_summary.overall_score}/100`);

  console.log('\n📊 Konsolidasyon Analizi:');
  console.log(
    `SEO Sağlığı: ${masterReport.consolidated_analysis.seo_health}/100`
  );
  console.log(
    `Performance Skoru: ${masterReport.consolidated_analysis.performance_score}/100`
  );
  console.log(
    `Mobile Hazırlık: ${masterReport.consolidated_analysis.mobile_readiness}/100`
  );
  console.log(
    `İçerik Kalitesi: ${masterReport.consolidated_analysis.content_quality}/100`
  );
  console.log(
    `Accessibility Skoru: ${masterReport.consolidated_analysis.accessibility_score}/100`
  );

  console.log('\n🚨 Kritik Sorunlar:');
  if (masterReport.critical_issues.length === 0) {
    console.log('✅ Kritik sorun bulunamadı');
  } else {
    masterReport.critical_issues.forEach((issue, index) => {
      console.log(
        `${index + 1}. [${issue.impact}] ${issue.category}: ${issue.issue}`
      );
    });
  }

  console.log('\n🎯 Yüksek Öncelikli Öneriler:');
  if (masterReport.high_priority_recommendations.length === 0) {
    console.log('✅ Yüksek öncelikli öneri bulunamadı');
  } else {
    masterReport.high_priority_recommendations
      .slice(0, 5)
      .forEach((rec, index) => {
        console.log(`${index + 1}. ${rec.category}: ${rec.description}`);
      });
  }

  console.log('\n🚀 Launch Hazırlığı:');
  console.log(
    `Launch Hazır: ${masterReport.launch_readiness.ready_for_launch ? '✅ EVET' : '❌ HAYIR'}`
  );
  console.log(
    `Blokaj Sorunları: ${masterReport.launch_readiness.blocking_issues}`
  );

  if (masterReport.launch_readiness.recommended_actions.length > 0) {
    console.log('\n📋 Önerilen Aksiyonlar:');
    masterReport.launch_readiness.recommended_actions.forEach(
      (action, index) => {
        console.log(`${index + 1}. ${action}`);
      }
    );
  }

  console.log('\n📅 Sonraki Adımlar:');
  masterReport.next_steps.forEach((step, index) => {
    console.log(`${step.step}. ${step.title} (${step.estimated_time})`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('📊 Master Test Report tamamlandı!');
}

// Script çalıştırma
generateMasterTestReport();
