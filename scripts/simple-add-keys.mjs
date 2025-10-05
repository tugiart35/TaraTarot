#!/usr/bin/env node

/**
 * Basit Eksik Key Ekleme Scripti
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Script başlatılıyor...');

// Eksik key'ler ve çevirileri
const MISSING_KEYS = {
  'messages.profile.updateError': 'Profil güncelleme hatası',
  'messages.profile.title': 'Profil',
  'messages.common.close': 'Kapat',
  'messages.profile.noName': 'İsim belirtilmedi',
  'messages.dashboard.memberSince': 'Üyelik tarihi',
  'messages.dashboard.credits': 'Krediler',
  'messages.dashboard.level': 'Seviye',
  'messages.dashboard.expert': 'Uzman',
  'messages.dashboard.intermediate': 'Orta',
  'messages.dashboard.beginner': 'Başlangıç',
  'messages.profile.personalInfo': 'Kişisel Bilgiler',
  'messages.common.edit': 'Düzenle',
  'messages.common.cancel': 'İptal',
  'messages.common.saving': 'Kaydediliyor...',
  'messages.common.save': 'Kaydet',
  'messages.profile.firstName': 'Ad',
  'messages.profile.firstNamePlaceholder': 'Adınızı girin',
  'messages.profile.lastName': 'Soyad',
  'messages.profile.lastNamePlaceholder': 'Soyadınızı girin',
  'messages.profile.fullName': 'Tam Ad',
  'messages.profile.fullNamePlaceholder': 'Tam adınızı girin',
  'messages.profile.birthDate': 'Doğum Tarihi',
};

// TR dosyasını oku
const trPath = path.join(__dirname, '..', 'messages', 'tr.json');
console.log('TR dosya yolu:', trPath);

try {
  const trContent = fs.readFileSync(trPath, 'utf8');
  const trData = JSON.parse(trContent);
  console.log('TR dosyası okundu');

  // Key'leri ekle
  let addedCount = 0;

  for (const [keyPath, value] of Object.entries(MISSING_KEYS)) {
    const keys = keyPath.split('.');
    let current = trData;

    // Nested object oluştur
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    // Son key'i ekle
    current[keys[keys.length - 1]] = value;
    addedCount++;
    console.log(`✓ Eklendi: ${keyPath} -> ${value}`);
  }

  // Dosyayı kaydet
  const updatedContent = JSON.stringify(trData, null, 2);
  fs.writeFileSync(trPath, updatedContent, 'utf8');

  console.log(`✅ ${addedCount} key başarıyla eklendi ve kaydedildi`);
} catch (error) {
  console.error('Hata:', error.message);
}
