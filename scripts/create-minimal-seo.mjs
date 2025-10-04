#!/usr/bin/env node

/**
 * Create Minimal SEO Data
 *
 * Bu script, mevcut all-cards-seo.json dosyasından SEO verilerini çıkarır
 * ve basit bir format oluşturur.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TAROT_DATA_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo.json'
);
const SEO_OUTPUT_FILE = path.join(__dirname, '..', 'messages', 'seo-fixed.txt');

async function createMinimalSEO() {
  console.log('🔧 Minimal SEO verisi oluşturuluyor...');

  try {
    // Mevcut tarot verilerini yükle
    console.log('📖 Mevcut tarot verileri yükleniyor...');
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    console.log(`✅ ${tarotData.cards.length} kart yüklendi`);

    // SEO verilerini çıkar
    const seoData = [];

    for (const card of tarotData.cards) {
      const seoCard = {
        id: card.id,
        card: {
          tr: card.card_name.tr,
          en: card.card_name.en,
          sr: card.card_name.sr,
        },
        title: {
          tr: card.seo.tr.title,
          en: card.seo.en.title,
          sr: card.seo.sr.title,
        },
        meta: {
          tr: card.seo.tr.description,
          en: card.seo.en.description,
          sr: card.seo.sr.description,
        },
      };

      seoData.push(seoCard);
    }

    // JSON olarak kaydet
    fs.writeFileSync(
      SEO_OUTPUT_FILE,
      JSON.stringify(seoData, null, 2),
      'utf-8'
    );

    console.log(`✅ ${seoData.length} kart için SEO verisi oluşturuldu`);
    console.log(`✅ Dosya kaydedildi: ${SEO_OUTPUT_FILE}`);

    // Test et
    const testData = JSON.parse(fs.readFileSync(SEO_OUTPUT_FILE, 'utf-8'));
    console.log('✅ JSON formatı geçerli');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Script çalıştırma
createMinimalSEO();
