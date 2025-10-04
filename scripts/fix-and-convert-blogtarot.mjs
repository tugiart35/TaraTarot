#!/usr/bin/env node

/**
 * Blogtarot.txt Format Düzeltme ve Dönüştürme Script'i
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'messages', 'blogtarot.txt');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'cards');

async function fixAndConvertBlogTarot() {
  console.log('🔄 Format düzeltme ve dönüştürme başlatılıyor...');

  try {
    // Dosyayı oku
    let content = fs.readFileSync(INPUT_FILE, 'utf-8');
    console.log('✅ Dosya okundu');

    // Format hatalarını düzelt
    content = fixJsonFormat(content);
    console.log('✅ Format hataları düzeltildi');

    // JSON parse et
    const cards = JSON.parse(content);
    console.log(`✅ ${cards.length} kart parse edildi`);

    // Output dizini oluştur
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

    // Tüm kartları kaydet
    const allCardsData = {
      cards,
      metadata: {
        total: cards.length,
        generated: new Date().toISOString(),
      },
    };

    await fs.promises.writeFile(
      path.join(OUTPUT_DIR, 'all-cards-fixed.json'),
      JSON.stringify(allCardsData, null, 2),
      'utf-8'
    );

    console.log('✅ Dosya kaydedildi');
    console.log('🎉 Dönüştürme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function fixJsonFormat(content) {
  // Satırlara ayır
  const lines = content.split('\n');
  const fixedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Problemli satırları düzelt
    if (trimmedLine === '}') {
      // Eğer bir sonraki satır [ ile başlıyorsa, virgül ekle
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('[')) {
        fixedLines.push(line + ',');
        continue;
      }
    }

    // Eğer satır [ ile başlıyorsa ve önceki satırda virgül yoksa, virgül ekle
    if (trimmedLine.startsWith('[') && fixedLines.length > 0) {
      const lastLine = fixedLines[fixedLines.length - 1];
      if (!lastLine.trim().endsWith(',') && !lastLine.trim().endsWith('[')) {
        fixedLines[fixedLines.length - 1] = lastLine + ',';
      }
    }

    fixedLines.push(line);
  }

  return fixedLines.join('\n');
}

fixAndConvertBlogTarot();
