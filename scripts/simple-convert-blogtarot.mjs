#!/usr/bin/env node

/**
 * Basit Tarot İçerik Dönüştürme Script'i
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '..', 'messages', 'blogtarot.txt');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'cards');

async function convertBlogTarot() {
  console.log('🔄 Basit dönüştürme başlatılıyor...');

  try {
    // Dosyayı oku
    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    console.log('✅ Dosya okundu');

    // Dosya zaten array formatında mı kontrol et
    let arrayContent;
    if (content.trim().startsWith('[')) {
      arrayContent = content;
    } else {
      // Tek obje formatında ise array yap
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error('JSON format bulunamadı');
      }

      // Array formatına çevir
      arrayContent = '[' + content.slice(firstBrace, lastBrace + 1) + ']';
    }

    // JSON parse et
    const cards = JSON.parse(arrayContent);
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
      path.join(OUTPUT_DIR, 'all-cards-raw.json'),
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

convertBlogTarot();
