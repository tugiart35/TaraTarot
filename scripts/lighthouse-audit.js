const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'pwa', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(url, options);
    
    // Extract scores
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      pwa: Math.round(runnerResult.lhr.categories.pwa.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      'best-practices': Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
      seo: Math.round(runnerResult.lhr.categories.seo.score * 100),
    };

    // Core Web Vitals
    const cwv = {
      lcp: runnerResult.lhr.audits['largest-contentful-paint']?.numericValue || 0,
      fid: runnerResult.lhr.audits['max-potential-fid']?.numericValue || 0,
      cls: runnerResult.lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      fcp: runnerResult.lhr.audits['first-contentful-paint']?.numericValue || 0,
    };

    console.log('📊 Lighthouse Audit Results:');
    console.log('================================');
    console.log(`🚀 Performance: ${scores.performance}/100`);
    console.log(`📱 PWA: ${scores.pwa}/100`);
    console.log(`♿ Accessibility: ${scores.accessibility}/100`);
    console.log(`✅ Best Practices: ${scores['best-practices']}/100`);
    console.log(`🔍 SEO: ${scores.seo}/100`);
    console.log('');
    console.log('📈 Core Web Vitals:');
    console.log(`   LCP: ${Math.round(cwv.lcp)}ms`);
    console.log(`   FID: ${Math.round(cwv.fid)}ms`);
    console.log(`   CLS: ${cwv.cls.toFixed(3)}`);
    console.log(`   FCP: ${Math.round(cwv.fcp)}ms`);
    console.log('');

    // Overall score
    const overallScore = Math.round(
      (scores.performance + scores.pwa + scores.accessibility + 
       scores['best-practices'] + scores.seo) / 5
    );

    console.log(`🎯 Overall Score: ${overallScore}/100`);

    // Recommendations
    console.log('\n💡 Recommendations:');
    if (scores.performance < 90) {
      console.log('   ⚠️ Performance needs improvement');
    }
    if (scores.pwa < 100) {
      console.log('   ⚠️ PWA features incomplete');
    }
    if (scores.accessibility < 90) {
      console.log('   ⚠️ Accessibility issues found');
    }
    if (scores.seo < 90) {
      console.log('   ⚠️ SEO optimization needed');
    }

    // Save detailed report
    await fs.writeFile(
      'lighthouse-report.json',
      JSON.stringify(runnerResult.lhr, null, 2)
    );
    console.log('\n📄 Detailed report saved to: lighthouse-report.json');

    return { scores, cwv, overallScore };

  } finally {
    await chrome.kill();
  }
}

async function main() {
  const url = process.argv[2] || 'http://localhost:3000';
  console.log(`🔍 Running Lighthouse audit for: ${url}\n`);
  
  try {
    await runLighthouse(url);
  } catch (error) {
    console.error('❌ Error running Lighthouse:', error.message);
    process.exit(1);
  }
}

main();
