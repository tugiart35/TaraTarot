#!/usr/bin/env node

/**
 * Console Log Watcher - Otomatik i18n Key Çeviri Scripti
 *
 * Bu script, console'da "i18n key does not exist" hatalarını yakalayıp
 * otomatik olarak Türkçe'ye çevirir ve tr.json dosyasına ekler.
 *
 * Kullanım:
 * node scripts/auto-translate-console-watcher.mjs
 *
 * Özellikler:
 * - Console log'ları izler
 * - i18n key hatalarını yakalar
 * - Otomatik çeviri yapar
 * - tr.json dosyasını günceller
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigürasyon
const CONFIG = {
  messagesDir: path.join(__dirname, '..', 'messages'),
  trFile: 'tr.json',
  enFile: 'en.json',
  backupDir: path.join(__dirname, '..', 'backups'),
  logFile: path.join(__dirname, '..', 'logs', 'auto-translate-watcher.log'),
  watchPattern: /i18n key "([^"]+)" does not exist/i,
};

// Log fonksiyonu
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}`;

  console.log(logMessage);

  // Log dosyasına yaz
  if (!fs.existsSync(path.dirname(CONFIG.logFile))) {
    fs.mkdirSync(path.dirname(CONFIG.logFile), { recursive: true });
  }
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// Yedek oluştur
function createBackup() {
  const backupPath = path.join(
    CONFIG.backupDir,
    `tr-watcher-${Date.now()}.json`
  );

  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }

  const trPath = path.join(CONFIG.messagesDir, CONFIG.trFile);
  if (fs.existsSync(trPath)) {
    fs.copyFileSync(trPath, backupPath);
    log(`Yedek oluşturuldu: ${backupPath}`);
  }
}

// JSON dosyasını oku
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log(`JSON dosyası okunamadı: ${filePath} - ${error.message}`, 'ERROR');
    return null;
  }
}

// JSON dosyasını yaz
function writeJsonFile(filePath, data) {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    log(`JSON dosyası yazılamadı: ${filePath} - ${error.message}`, 'ERROR');
    return false;
  }
}

// Google Translate API kullanarak çeviri yap
async function translateText(text, targetLang = 'tr') {
  try {
    // Ücretsiz Google Translate API
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }

    throw new Error('Çeviri sonucu alınamadı');
  } catch (error) {
    log(`Çeviri hatası: ${error.message}`, 'ERROR');
    return text; // Hata durumunda orijinal metni döndür
  }
}

// Nested object'e key ekle
function addKeyToObject(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

// Key'i tr.json'a ekle
async function addMissingKey(keyPath) {
  try {
    const trPath = path.join(CONFIG.messagesDir, CONFIG.trFile);
    const enPath = path.join(CONFIG.messagesDir, CONFIG.enFile);

    const trData = readJsonFile(trPath);
    const enData = readJsonFile(enPath);

    if (!trData || !enData) {
      log('Dosyalar okunamadı!', 'ERROR');
      return false;
    }

    // EN dosyasından değeri al
    const enValue = getValueFromPath(enData, keyPath);
    if (!enValue) {
      log(`EN dosyasında key bulunamadı: ${keyPath}`, 'WARN');
      return false;
    }

    // Çeviri yap
    const translatedValue = await translateText(enValue);

    // TR dosyasına ekle
    addKeyToObject(trData, keyPath, translatedValue);

    // Dosyayı kaydet
    if (writeJsonFile(trPath, trData)) {
      log(`✓ Key eklendi: ${keyPath} -> ${translatedValue}`);
      return true;
    } else {
      log('Dosya kaydedilemedi!', 'ERROR');
      return false;
    }
  } catch (error) {
    log(`Key ekleme hatası: ${error.message}`, 'ERROR');
    return false;
  }
}

// Nested object'ten değer al
function getValueFromPath(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }

  return current;
}

// Console log'ları izle
function watchConsoleLogs() {
  log("Console log'ları izlemeye başlıyor...");
  log('i18n key hatalarını yakalamak için uygulamayı çalıştırın');

  // Process stdout'u izle
  process.stdout.on('data', data => {
    const output = data.toString();
    const match = output.match(CONFIG.watchPattern);

    if (match) {
      const missingKey = match[1];
      log(`🔍 Eksik key tespit edildi: ${missingKey}`);

      // Key'i otomatik olarak ekle
      addMissingKey(missingKey).then(success => {
        if (success) {
          log(`✅ Key başarıyla eklendi: ${missingKey}`);
        } else {
          log(`❌ Key eklenemedi: ${missingKey}`, 'ERROR');
        }
      });
    }
  });

  // Process stderr'ı da izle
  process.stderr.on('data', data => {
    const output = data.toString();
    const match = output.match(CONFIG.watchPattern);

    if (match) {
      const missingKey = match[1];
      log(`🔍 Eksik key tespit edildi (stderr): ${missingKey}`);

      // Key'i otomatik olarak ekle
      addMissingKey(missingKey).then(success => {
        if (success) {
          log(`✅ Key başarıyla eklendi: ${missingKey}`);
        } else {
          log(`❌ Key eklenemedi: ${missingKey}`, 'ERROR');
        }
      });
    }
  });
}

// Next.js uygulamasını başlat ve log'ları izle
function startNextApp() {
  log('Next.js uygulaması başlatılıyor...');

  const nextProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    cwd: path.join(__dirname, '..'),
  });

  // Next.js çıktısını ana process'e yönlendir
  nextProcess.stdout.on('data', data => {
    process.stdout.write(data);
  });

  nextProcess.stderr.on('data', data => {
    process.stderr.write(data);
  });

  // Process'i izle
  nextProcess.on('close', code => {
    log(`Next.js uygulaması kapatıldı (kod: ${code})`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    log('Script kapatılıyor...');
    nextProcess.kill();
    process.exit(0);
  });

  return nextProcess;
}

// Ana fonksiyon
async function main() {
  log('Console Log Watcher başlatılıyor...');

  try {
    // Yedek oluştur
    createBackup();

    // Console log'ları izle
    watchConsoleLogs();

    // Next.js uygulamasını başlat
    const nextProcess = startNextApp();

    log('✅ Watcher aktif! i18n key hatalarını otomatik olarak çevirecek...');
    log('Çıkmak için Ctrl+C tuşlayın');
  } catch (error) {
    log(`Genel hata: ${error.message}`, 'ERROR');
  }
}

// Script çalıştır
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    log(`Script hatası: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

export { main, addMissingKey, translateText };
