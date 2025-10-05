#!/usr/bin/env node

/**
 * 🔄 Sürekli Test Scripti
 *
 * Bu script belirli aralıklarla test yapar:
 * - Her 30 saniyede bir test
 * - Rastgele kullanıcı verileri
 * - Test sonuçlarını takip eder
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let testCount = 0;
let successCount = 0;
let failureCount = 0;

function runSingleTest() {
  return new Promise((resolve, reject) => {
    exec('npm run test:love', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Test ${testCount + 1} başarısız:`, error.message);
        failureCount++;
        resolve(false);
      } else {
        console.log(`✅ Test ${testCount + 1} başarılı`);
        successCount++;
        resolve(true);
      }
    });
  });
}

function saveTestStats() {
  const stats = {
    totalTests: testCount,
    successfulTests: successCount,
    failedTests: failureCount,
    successRate:
      testCount > 0 ? ((successCount / testCount) * 100).toFixed(2) : 0,
    lastUpdate: new Date().toISOString(),
  };

  const statsFile = path.join(__dirname, 'test-stats.json');
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

  console.log(
    `📊 İstatistikler: ${successCount}/${testCount} başarılı (%${stats.successRate})`
  );
}

async function continuousTest() {
  console.log('🔄 Sürekli Test Başlatılıyor...');
  console.log('⏰ Her 30 saniyede bir test yapılacak');
  console.log('🛑 Durdurmak için Ctrl+C');
  console.log('─'.repeat(50));

  const interval = setInterval(async () => {
    testCount++;
    console.log(
      `\n🧪 Test ${testCount} başlatılıyor... (${new Date().toLocaleTimeString()})`
    );

    try {
      const success = await runSingleTest();
      saveTestStats();

      if (success) {
        console.log(`✅ Test ${testCount} tamamlandı`);
      } else {
        console.log(`❌ Test ${testCount} başarısız`);
      }
    } catch (error) {
      console.error(`❌ Test ${testCount} hatası:`, error.message);
      failureCount++;
      saveTestStats();
    }

    console.log('⏳ Sonraki test 30 saniye sonra...');
  }, 30000); // 30 saniye

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Test durduruluyor...');
    clearInterval(interval);
    console.log(`📊 Final İstatistikler:`);
    console.log(`   Toplam Test: ${testCount}`);
    console.log(`   Başarılı: ${successCount}`);
    console.log(`   Başarısız: ${failureCount}`);
    console.log(
      `   Başarı Oranı: %${testCount > 0 ? ((successCount / testCount) * 100).toFixed(2) : 0}`
    );
    process.exit(0);
  });
}

// İlk testi hemen çalıştır
console.log('🚀 İlk test başlatılıyor...');
runSingleTest().then(() => {
  testCount = 1;
  saveTestStats();
  continuousTest();
});
