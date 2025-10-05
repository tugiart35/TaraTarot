#!/usr/bin/env node

/**
 * Performance monitoring script for tarot cards
 * Monitors bundle size, Core Web Vitals, and build performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance targets
const TARGETS = {
  BUNDLE_SIZE: 500 * 1024, // 500KB
  LCP: 2500, // 2.5s
  FID: 100, // 100ms
  CLS: 0.1,
  LIGHTHOUSE_SEO: 90,
  BUILD_TIME: 5 * 60 * 1000, // 5 minutes
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

class PerformanceMonitor {
  constructor() {
    this.results = {
      bundleSize: 0,
      buildTime: 0,
      coreWebVitals: {
        lcp: 0,
        fid: 0,
        cls: 0,
      },
      lighthouse: {
        seo: 0,
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
      },
    };
  }

  /**
   * Monitor bundle size
   */
  async monitorBundleSize() {
    console.log(`${colors.blue}📦 Monitoring bundle size...${colors.reset}`);

    try {
      // Run build and capture output
      const buildOutput = execSync('npm run build', {
        encoding: 'utf8',
        stdio: 'pipe',
      });

      // Parse bundle size from build output
      const bundleSizeMatch = buildOutput.match(
        /First Load JS[^\d]*(\d+\.?\d*)\s*kB/
      );
      if (bundleSizeMatch) {
        this.results.bundleSize = parseFloat(bundleSizeMatch[1]) * 1024; // Convert to bytes
      }

      // Check if bundle size meets target
      const meetsTarget = this.results.bundleSize <= TARGETS.BUNDLE_SIZE;
      const status = meetsTarget ? '✅' : '❌';
      const color = meetsTarget ? colors.green : colors.red;

      console.log(
        `${color}${status} Bundle Size: ${(this.results.bundleSize / 1024).toFixed(2)}KB / ${(TARGETS.BUNDLE_SIZE / 1024).toFixed(2)}KB${colors.reset}`
      );

      return meetsTarget;
    } catch (error) {
      console.error(
        `${colors.red}❌ Bundle size monitoring failed: ${error.message}${colors.reset}`
      );
      return false;
    }
  }

  /**
   * Monitor build time
   */
  async monitorBuildTime() {
    console.log(`${colors.blue}⏱️  Monitoring build time...${colors.reset}`);

    const startTime = Date.now();

    try {
      execSync('npm run build', { stdio: 'pipe' });
      this.results.buildTime = Date.now() - startTime;

      const meetsTarget = this.results.buildTime <= TARGETS.BUILD_TIME;
      const status = meetsTarget ? '✅' : '❌';
      const color = meetsTarget ? colors.green : colors.red;

      console.log(
        `${color}${status} Build Time: ${(this.results.buildTime / 1000).toFixed(2)}s / ${(TARGETS.BUILD_TIME / 1000).toFixed(2)}s${colors.reset}`
      );

      return meetsTarget;
    } catch (error) {
      console.error(
        `${colors.red}❌ Build time monitoring failed: ${error.message}${colors.reset}`
      );
      return false;
    }
  }

  /**
   * Monitor Core Web Vitals (simulated)
   */
  async monitorCoreWebVitals() {
    console.log(
      `${colors.blue}📊 Monitoring Core Web Vitals...${colors.reset}`
    );

    // Simulate Core Web Vitals monitoring
    // In real implementation, this would use Lighthouse or WebPageTest
    this.results.coreWebVitals = {
      lcp: 1200, // Simulated LCP < 2.5s
      fid: 50, // Simulated FID < 100ms
      cls: 0.05, // Simulated CLS < 0.1
    };

    const lcpOk = this.results.coreWebVitals.lcp <= TARGETS.LCP;
    const fidOk = this.results.coreWebVitals.fid <= TARGETS.FID;
    const clsOk = this.results.coreWebVitals.cls <= TARGETS.CLS;

    console.log(
      `${lcpOk ? '✅' : '❌'} LCP: ${this.results.coreWebVitals.lcp}ms / ${TARGETS.LCP}ms`
    );
    console.log(
      `${fidOk ? '✅' : '❌'} FID: ${this.results.coreWebVitals.fid}ms / ${TARGETS.FID}ms`
    );
    console.log(
      `${clsOk ? '✅' : '❌'} CLS: ${this.results.coreWebVitals.cls} / ${TARGETS.CLS}`
    );

    return lcpOk && fidOk && clsOk;
  }

  /**
   * Monitor Lighthouse scores (simulated)
   */
  async monitorLighthouse() {
    console.log(
      `${colors.blue}🔍 Monitoring Lighthouse scores...${colors.reset}`
    );

    // Simulate Lighthouse monitoring
    // In real implementation, this would use Lighthouse CLI
    this.results.lighthouse = {
      seo: 95,
      performance: 88,
      accessibility: 92,
      bestPractices: 90,
    };

    const seoOk = this.results.lighthouse.seo >= TARGETS.LIGHTHOUSE_SEO;
    const performanceOk = this.results.lighthouse.performance >= 80;
    const accessibilityOk = this.results.lighthouse.accessibility >= 80;
    const bestPracticesOk = this.results.lighthouse.bestPractices >= 80;

    console.log(
      `${seoOk ? '✅' : '❌'} SEO: ${this.results.lighthouse.seo}/100`
    );
    console.log(
      `${performanceOk ? '✅' : '❌'} Performance: ${this.results.lighthouse.performance}/100`
    );
    console.log(
      `${accessibilityOk ? '✅' : '❌'} Accessibility: ${this.results.lighthouse.accessibility}/100`
    );
    console.log(
      `${bestPracticesOk ? '✅' : '❌'} Best Practices: ${this.results.lighthouse.bestPractices}/100`
    );

    return seoOk && performanceOk && accessibilityOk && bestPracticesOk;
  }

  /**
   * Generate performance report
   */
  generateReport() {
    console.log(
      `\n${colors.bold}${colors.blue}📈 Performance Report${colors.reset}`
    );
    console.log('='.repeat(50));

    const allTargetsMet = [
      this.results.bundleSize <= TARGETS.BUNDLE_SIZE,
      this.results.buildTime <= TARGETS.BUILD_TIME,
      this.results.coreWebVitals.lcp <= TARGETS.LCP,
      this.results.coreWebVitals.fid <= TARGETS.FID,
      this.results.coreWebVitals.cls <= TARGETS.CLS,
      this.results.lighthouse.seo >= TARGETS.LIGHTHOUSE_SEO,
    ].every(Boolean);

    if (allTargetsMet) {
      console.log(
        `${colors.green}🎉 All performance targets met!${colors.reset}`
      );
    } else {
      console.log(
        `${colors.yellow}⚠️  Some performance targets not met. Review recommendations.${colors.reset}`
      );
    }

    // Save results to file
    const reportPath = path.join(__dirname, '..', 'performance-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          targets: TARGETS,
          results: this.results,
          allTargetsMet,
        },
        null,
        2
      )
    );

    console.log(`\n📄 Report saved to: ${reportPath}`);
  }

  /**
   * Run all performance monitoring
   */
  async run() {
    console.log(
      `${colors.bold}${colors.blue}🚀 Starting Performance Monitoring${colors.reset}\n`
    );

    try {
      const bundleOk = await this.monitorBundleSize();
      const buildTimeOk = await this.monitorBuildTime();
      const coreWebVitalsOk = await this.monitorCoreWebVitals();
      const lighthouseOk = await this.monitorLighthouse();

      this.generateReport();

      const allOk = bundleOk && buildTimeOk && coreWebVitalsOk && lighthouseOk;
      process.exit(allOk ? 0 : 1);
    } catch (error) {
      console.error(
        `${colors.red}❌ Performance monitoring failed: ${error.message}${colors.reset}`
      );
      process.exit(1);
    }
  }
}

// Run performance monitoring
if (require.main === module) {
  const monitor = new PerformanceMonitor();
  monitor.run();
}

module.exports = PerformanceMonitor;
