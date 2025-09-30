#!/usr/bin/env node

/**
 * Key Konumlarını Düzeltme Scripti
 * 
 * Bu script, yanlış yere eklenen key'leri doğru konumlarına taşır.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Key konumları düzeltiliyor...');

// TR dosyasını oku
const trPath = path.join(__dirname, '..', 'messages', 'tr.json');

try {
  const trContent = fs.readFileSync(trPath, 'utf8');
  const trData = JSON.parse(trContent);
  console.log('TR dosyası okundu');

  // Yanlış yerdeki key'leri kaldır
  const keysToMove = [
    'profile',
    'common',
    'dashboard'
  ];

  const movedKeys = {};

  for (const key of keysToMove) {
    if (trData[key]) {
      movedKeys[key] = trData[key];
      delete trData[key];
      console.log(`✓ ${key} objesi kaldırıldı`);
    }
  }

  // messages objesini bul veya oluştur
  if (!trData.messages) {
    trData.messages = {};
  }

  // Key'leri doğru yere ekle
  for (const [key, value] of Object.entries(movedKeys)) {
    trData.messages[key] = value;
    console.log(`✓ ${key} objesi messages altına taşındı`);
  }

  // Dosyayı kaydet
  const updatedContent = JSON.stringify(trData, null, 2);
  fs.writeFileSync(trPath, updatedContent, 'utf8');
  
  console.log('✅ Key konumları düzeltildi ve kaydedildi');
  
} catch (error) {
  console.error('Hata:', error.message);
}
