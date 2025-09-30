#!/usr/bin/env node

/**
 * Otomatik i18n Key Çeviri Scripti
 * 
 * Bu script, eksik i18n key'lerini yakalayıp otomatik olarak Türkçe'ye çevirir
 * ve tr.json dosyasına ekler.
 * 
 * Kullanım:
 * node scripts/auto-translate-missing-keys.mjs
 * 
 * Özellikler:
 * - Eksik key'leri tespit eder
 * - Google Translate API kullanır (ücretsiz)
 * - tr.json dosyasını günceller
 * - Yedek oluşturur
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigürasyon
const CONFIG = {
  messagesDir: path.join(__dirname, '..', 'messages'),
  trFile: 'tr.json',
  enFile: 'en.json',
  backupDir: path.join(__dirname, '..', 'backups'),
  logFile: path.join(__dirname, '..', 'logs', 'auto-translate.log')
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
  const backupPath = path.join(CONFIG.backupDir, `tr-${Date.now()}.json`);
  
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

// Eksik key'leri bul
function findMissingKeys(trData, enData) {
  const missingKeys = [];
  
  function compareObjects(trObj, enObj, prefix = '') {
    for (const key in enObj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof enObj[key] === 'object' && enObj[key] !== null) {
        if (!trObj[key] || typeof trObj[key] !== 'object') {
          missingKeys.push({
            key: fullKey,
            value: enObj[key],
            type: 'object'
          });
        } else {
          compareObjects(trObj[key], enObj[key], fullKey);
        }
      } else if (typeof enObj[key] === 'string') {
        if (!trObj[key] || typeof trObj[key] !== 'string') {
          missingKeys.push({
            key: fullKey,
            value: enObj[key],
            type: 'string'
          });
        }
      }
    }
  }
  
  compareObjects(trData, enData);
  return missingKeys;
}

// Google Translate API kullanarak çeviri yap
async function translateText(text, targetLang = 'tr') {
  try {
    // Ücretsiz Google Translate API (rate limit var)
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    
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

// Ana fonksiyon
async function main() {
  log('Otomatik i18n çeviri scripti başlatılıyor...');
  
  try {
    // Yedek oluştur
    createBackup();
    
    // Dosya yolları
    const trPath = path.join(CONFIG.messagesDir, CONFIG.trFile);
    const enPath = path.join(CONFIG.messagesDir, CONFIG.enFile);
    
    // Dosyaları oku
    log('Dosyalar okunuyor...');
    const trData = readJsonFile(trPath);
    const enData = readJsonFile(enPath);
    
    if (!trData || !enData) {
      log('Dosyalar okunamadı!', 'ERROR');
      return;
    }
    
    // Eksik key'leri bul
    log('Eksik key\'ler taranıyor...');
    const missingKeys = findMissingKeys(trData, enData);
    
    if (missingKeys.length === 0) {
      log('Eksik key bulunamadı!');
      return;
    }
    
    log(`${missingKeys.length} eksik key bulundu`);
    
    // Eksik key'leri çevir ve ekle
    let translatedCount = 0;
    
    for (const missingKey of missingKeys) {
      try {
        log(`Çevriliyor: ${missingKey.key}`);
        
        if (missingKey.type === 'string') {
          const translatedText = await translateText(missingKey.value);
          addKeyToObject(trData, missingKey.key, translatedText);
          translatedCount++;
          
          log(`✓ Çevrildi: ${missingKey.key} -> ${translatedText}`);
        } else if (missingKey.type === 'object') {
          // Object için recursive çeviri
          const translatedObject = await translateObject(missingKey.value);
          addKeyToObject(trData, missingKey.key, translatedObject);
          translatedCount++;
          
          log(`✓ Object çevrildi: ${missingKey.key}`);
        }
        
        // Rate limiting için kısa bekleme
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        log(`Çeviri hatası (${missingKey.key}): ${error.message}`, 'ERROR');
      }
    }
    
    // Güncellenmiş tr.json dosyasını kaydet
    if (writeJsonFile(trPath, trData)) {
      log(`✓ ${translatedCount} key başarıyla çevrildi ve kaydedildi`);
    } else {
      log('Dosya kaydedilemedi!', 'ERROR');
    }
    
  } catch (error) {
    log(`Genel hata: ${error.message}`, 'ERROR');
  }
}

// Object çeviri fonksiyonu
async function translateObject(obj) {
  const result = {};
  
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = await translateText(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = await translateObject(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  
  return result;
}

// Script çalıştır
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    log(`Script hatası: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

export { main, translateText, findMissingKeys };
