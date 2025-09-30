#!/usr/bin/env node

/**
 * i18n-ally Cache Temizleme Scripti
 * 
 * Bu script, i18n-ally eklentisinin cache'ini temizler
 * ve i18n dosyalarını yeniden yükler.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('i18n-ally cache temizleniyor...');

// VS Code workspace cache klasörlerini temizle
const cachePaths = [
  path.join(__dirname, '..', '.vscode'),
  path.join(__dirname, '..', 'node_modules', '.cache'),
  path.join(process.env.HOME || process.env.USERPROFILE, '.vscode', 'extensions', 'lokalise.i18n-ally'),
  path.join(process.env.HOME || process.env.USERPROFILE, '.vscode', 'User', 'workspaceStorage')
];

// Cache dosyalarını sil
function clearCache() {
  let clearedCount = 0;
  
  for (const cachePath of cachePaths) {
    try {
      if (fs.existsSync(cachePath)) {
        console.log(`Temizleniyor: ${cachePath}`);
        
        // Klasör içeriğini sil
        const files = fs.readdirSync(cachePath);
        for (const file of files) {
          const filePath = path.join(cachePath, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(filePath);
          }
          clearedCount++;
        }
      }
    } catch (error) {
      console.log(`Hata (${cachePath}): ${error.message}`);
    }
  }
  
  return clearedCount;
}

// i18n dosyalarını yeniden oluştur (touch)
function touchFiles() {
  const i18nFiles = [
    path.join(__dirname, '..', 'messages', 'tr.json'),
    path.join(__dirname, '..', 'messages', 'en.json'),
    path.join(__dirname, '..', 'messages', 'sr.json')
  ];
  
  for (const file of i18nFiles) {
    try {
      if (fs.existsSync(file)) {
        const now = new Date();
        fs.utimesSync(file, now, now);
        console.log(`Dosya yenilendi: ${file}`);
      }
    } catch (error) {
      console.log(`Hata (${file}): ${error.message}`);
    }
  }
}

// Ana fonksiyon
function main() {
  console.log('i18n-ally cache temizleme başlatılıyor...');
  
  try {
    // Cache'i temizle
    const clearedCount = clearCache();
    console.log(`✅ ${clearedCount} cache dosyası temizlendi`);
    
    // i18n dosyalarını yenile
    touchFiles();
    console.log('✅ i18n dosyaları yenilendi');
    
    console.log('\n🎯 Şimdi yapmanız gerekenler:');
    console.log('1. VS Code\'u kapatın');
    console.log('2. VS Code\'u yeniden açın');
    console.log('3. i18n-ally eklentisini yeniden yükleyin (Ctrl+Shift+P -> "Developer: Reload Window")');
    console.log('4. Veya sadece VS Code\'u yeniden başlatın');
    
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

// Script çalıştır
main();
