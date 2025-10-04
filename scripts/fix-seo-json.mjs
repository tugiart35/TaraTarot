#!/usr/bin/env node

/**
 * Fix SEO JSON Script
 *
 * Bu script, seo.txt dosyasındaki JSON formatını düzeltir.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_DATA_FILE = path.join(__dirname, '..', 'messages', 'seo.txt');

async function fixSEOJSON() {
  console.log('🔧 SEO JSON formatı düzeltiliyor...');

  try {
    // Dosyayı oku
    let content = fs.readFileSync(SEO_DATA_FILE, 'utf-8');

    // JSON parse hatası için temizleme
    content = content.trim();

    // Dosyayı satır satır işle
    const lines = content.split('\n');
    const fixedLines = [];

    let inComment = false;
    let braceCount = 0;
    let bracketCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Yorumları atla
      if (line.startsWith('/*') || line.startsWith('//')) {
        continue;
      }

      if (line.includes('/*')) {
        inComment = true;
        continue;
      }

      if (line.includes('*/')) {
        inComment = false;
        continue;
      }

      if (inComment) {
        continue;
      }

      // Boş satırları atla
      if (line === '') {
        continue;
      }

      // Brace ve bracket sayımı
      for (const char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        if (char === '[') bracketCount++;
        if (char === ']') bracketCount--;
      }

      fixedLines.push(lines[i]);
    }

    // Dosyayı yeniden birleştir
    const fixedContent = fixedLines.join('\n');

    // JSON parse testi
    try {
      JSON.parse(fixedContent);
      console.log('✅ JSON formatı geçerli');
    } catch (error) {
      console.log('❌ JSON parse hatası:', error.message);

      // Daha agresif temizleme
      const cleanedContent = fixedContent
        .replace(/\/\*[\s\S]*?\*\//g, '') // /* */ yorumları
        .replace(/\/\/.*$/gm, '') // // yorumları
        .replace(/\s+/g, ' ') // Fazla boşlukları temizle
        .trim();

      try {
        JSON.parse(cleanedContent);
        console.log('✅ Temizlenmiş JSON formatı geçerli');

        // Temizlenmiş versiyonu kaydet
        fs.writeFileSync(SEO_DATA_FILE, cleanedContent, 'utf-8');
        console.log('✅ Düzeltilmiş dosya kaydedildi');
        return;
      } catch (cleanError) {
        console.log('❌ Temizlenmiş JSON da hatalı:', cleanError.message);
      }
    }

    // Eğer JSON geçerliyse, düzeltilmiş versiyonu kaydet
    fs.writeFileSync(SEO_DATA_FILE, fixedContent, 'utf-8');
    console.log('✅ Düzeltilmiş dosya kaydedildi');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Script çalıştırma
fixSEOJSON();
