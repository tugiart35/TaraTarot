#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const OUTPUT_FILE = path.join(__dirname, '..', 'missing-i18n-keys.json');

// Dil dosyalarını oku
function loadLanguageFile(lang) {
  const filePath = path.join(MESSAGES_DIR, `${lang}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ ${lang}.json okunamadı:`, error.message);
    return {};
  }
}

// Tüm anahtarları düz bir nesneye çevir (nested keys için)
function flattenObject(obj, prefix = '') {
  const result = {};
  
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  
  return result;
}

// İki nesneyi karşılaştır ve eksik anahtarları bul
function findMissingKeys(source, target) {
  const missing = [];
  const flatSource = flattenObject(source);
  const flatTarget = flattenObject(target);
  
  for (const key in flatSource) {
    if (!(key in flatTarget)) {
      missing.push({
        key: key,
        value: flatSource[key]
      });
    } else if (flatTarget[key] === '' || flatTarget[key] === null) {
      missing.push({
        key: key,
        value: flatSource[key],
        reason: 'empty_value'
      });
    }
  }
  
  return missing;
}

// Ana fonksiyon
function main() {
  console.log('🔍 i18n Eksik Anahtarlar Analizi Başlıyor...\n');
  
  // Dil dosyalarını yükle
  const tr = loadLanguageFile('tr');
  const en = loadLanguageFile('en');
  const sr = loadLanguageFile('sr');
  
  console.log('📊 Dosya İstatistikleri:');
  console.log(`  TR: ${Object.keys(flattenObject(tr)).length} anahtar`);
  console.log(`  EN: ${Object.keys(flattenObject(en)).length} anahtar`);
  console.log(`  SR: ${Object.keys(flattenObject(sr)).length} anahtar\n`);
  
  // TR'yi referans al, EN ve SR'de eksik olanları bul
  const missingInEn = findMissingKeys(tr, en);
  const missingInSr = findMissingKeys(tr, sr);
  
  // EN'de olup TR'de olmayanları da kontrol et
  const missingInTr = findMissingKeys(en, tr);
  
  console.log('📋 Analiz Sonuçları:');
  console.log(`  EN'de eksik: ${missingInEn.length} anahtar`);
  console.log(`  SR'de eksik: ${missingInSr.length} anahtar`);
  console.log(`  TR'de eksik: ${missingInTr.length} anahtar\n`);
  
  // Rapor oluştur
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTrKeys: Object.keys(flattenObject(tr)).length,
      totalEnKeys: Object.keys(flattenObject(en)).length,
      totalSrKeys: Object.keys(flattenObject(sr)).length,
      missingInEnCount: missingInEn.length,
      missingInSrCount: missingInSr.length,
      missingInTrCount: missingInTr.length
    },
    missing: {
      en: missingInEn,
      sr: missingInSr,
      tr: missingInTr
    }
  };
  
  // Dosyaya yaz
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2), 'utf8');
  
  console.log(`✅ Rapor oluşturuldu: ${OUTPUT_FILE}\n`);
  
  // Özet göster
  if (missingInEn.length > 0) {
    console.log('🔴 EN\'de eksik ilk 10 anahtar:');
    missingInEn.slice(0, 10).forEach(item => {
      const displayValue = typeof item.value === 'string' ? item.value.substring(0, 50) : String(item.value);
      console.log(`  - ${item.key}: "${displayValue}..."`);
    });
    console.log('');
  }
  
  if (missingInSr.length > 0) {
    console.log('🔴 SR\'de eksik ilk 10 anahtar:');
    missingInSr.slice(0, 10).forEach(item => {
      const displayValue = typeof item.value === 'string' ? item.value.substring(0, 50) : String(item.value);
      console.log(`  - ${item.key}: "${displayValue}..."`);
    });
    console.log('');
  }
  
  if (missingInTr.length > 0) {
    console.log('🔴 TR\'de eksik ilk 10 anahtar:');
    missingInTr.slice(0, 10).forEach(item => {
      const displayValue = typeof item.value === 'string' ? item.value.substring(0, 50) : String(item.value);
      console.log(`  - ${item.key}: "${displayValue}..."`);
    });
    console.log('');
  }
  
  console.log('✨ Analiz tamamlandı!');
}

main();

