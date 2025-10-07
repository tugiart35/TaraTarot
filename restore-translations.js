#!/usr/bin/env node

/**
 * Restore Translation Files from Backup
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function restoreFromBackup() {
  log("\n🔄 Backup'tan Geri Yükleme İşlemi Başlıyor...", 'cyan');

  const backupDir = path.join(__dirname, 'messages', 'backups');
  const messagesDir = path.join(__dirname, 'messages');

  // En son backup dosyalarını bul
  const backups = fs
    .readdirSync(backupDir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();

  const locales = ['tr', 'en', 'sr'];

  for (const locale of locales) {
    const backupFile = backups.find(f => f.startsWith(`${locale}.backup.`));

    if (!backupFile) {
      log(`❌ ${locale} için backup bulunamadı!`, 'red');
      continue;
    }

    const backupPath = path.join(backupDir, backupFile);
    const targetPath = path.join(messagesDir, `${locale}.json`);

    try {
      // Backup'ı oku ve doğrula
      const backupContent = fs.readFileSync(backupPath, 'utf-8');
      const parsed = JSON.parse(backupContent);

      // Boş değilse geri yükle
      if (Object.keys(parsed).length > 0) {
        fs.copyFileSync(backupPath, targetPath);
        log(`✅ ${locale}.json geri yüklendi (${backupFile})`, 'green');
      } else {
        log(`⚠️  ${locale} backup'ı boş!`, 'yellow');
      }
    } catch (error) {
      log(`❌ ${locale} geri yüklenirken hata: ${error.message}`, 'red');
    }
  }

  log('\n✅ Geri yükleme tamamlandı!', 'green');
}

restoreFromBackup().catch(error => {
  log('\n❌ Hata:', 'red');
  console.error(error);
  process.exit(1);
});
