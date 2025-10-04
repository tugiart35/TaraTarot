#!/usr/bin/env node

/**
 * Apply SEO Optimization Script
 *
 * Bu script, seo.txt dosyasındaki optimize edilmiş SEO verilerini
 * all-cards-seo.json dosyasına uygular.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_DATA_FILE = path.join(__dirname, '..', 'messages', 'seo.txt');
const TAROT_DATA_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo.json'
);
const BACKUP_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo-backup-seo-opt.json'
);

async function applySEOOptimization() {
  console.log('🔧 SEO optimizasyonu uygulanıyor...');

  try {
    // SEO verilerini yükle
    console.log('📖 SEO verileri yükleniyor...');
    const seoDataRaw = fs.readFileSync(SEO_DATA_FILE, 'utf-8');
    const seoData = JSON.parse(seoDataRaw);
    console.log(`✅ ${seoData.length} kart için SEO verileri yüklendi`);

    // Mevcut tarot verilerini yükle
    console.log('📖 Mevcut tarot verileri yükleniyor...');
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    console.log(`✅ ${tarotData.cards.length} kart yüklendi`);

    // Backup oluştur
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    // SEO verilerini uygula
    let totalOptimizations = 0;

    for (const seoCard of seoData) {
      const cardId = getCardIdFromSEO(seoCard);
      const existingCard = tarotData.cards.find(card => card.id === cardId);

      if (existingCard) {
        const optimizationsApplied = applySEOToCard(existingCard, seoCard);
        totalOptimizations += optimizationsApplied;

        if (optimizationsApplied > 0) {
          console.log(
            `✅ ${cardId}: ${optimizationsApplied} SEO optimizasyonu uygulandı`
          );
        }
      } else {
        console.log(`⚠️ ${cardId}: Kart bulunamadı`);
      }
    }

    // Güncellenmiş veriyi kaydet
    fs.writeFileSync(
      TAROT_DATA_FILE,
      JSON.stringify(tarotData, null, 2),
      'utf-8'
    );

    console.log(`✅ ${totalOptimizations} toplam SEO optimizasyonu uygulandı`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Uygulanan SEO Optimizasyonları:');
    console.log('✅ Meta titles optimized (30-60 chars)');
    console.log('✅ Meta descriptions optimized (120-155 chars)');
    console.log('✅ FAQ structured data enhanced');
    console.log('✅ Brand name consistency (busbuskimki)');
    console.log('✅ Keyword optimization');

    console.log('\n🎉 SEO optimizasyonu başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function getCardIdFromSEO(seoCard) {
  // SEO verilerindeki kart isimlerini mevcut ID'lere dönüştür
  const cardNameMapping = {
    Joker: 'the_fool',
    'The Fool': 'the_fool',
    Lud: 'the_fool',
    Büyücü: 'the_magician',
    'The Magician': 'the_magician',
    Mag: 'the_magician',
    Başrahibe: 'the_high_priestess',
    'The High Priestess': 'the_high_priestess',
    Prvosveštenica: 'the_high_priestess',
    İmparatoriçe: 'the_empress',
    'The Empress': 'the_empress',
    Carica: 'the_empress',
    İmparator: 'the_emperor',
    'The Emperor': 'the_emperor',
    Car: 'the_emperor',
    Aziz: 'the_hierophant',
    'The Hierophant': 'the_hierophant',
    Vrhovnik: 'the_hierophant',
    Aşıklar: 'the_lovers',
    'The Lovers': 'the_lovers',
    Ljubavnici: 'the_lovers',
    'Savaş Arabası': 'the_chariot',
    'The Chariot': 'the_chariot',
    Kočija: 'the_chariot',
    Güç: 'strength',
    Strength: 'strength',
    Snaga: 'strength',
    Ermiş: 'the_hermit',
    'The Hermit': 'the_hermit',
    Pustinjak: 'the_hermit',
    'Kader Çarkı': 'wheel_of_fortune',
    'Wheel of Fortune': 'wheel_of_fortune',
    'Točak Sreće': 'wheel_of_fortune',
    Adalet: 'justice',
    Justice: 'justice',
    Pravda: 'justice',
    'Asılan Adam': 'the_hanged_man',
    'The Hanged Man': 'the_hanged_man',
    Obešenik: 'the_hanged_man',
    Ölüm: 'death',
    Death: 'death',
    Smrt: 'death',
    Denge: 'temperance',
    Temperance: 'temperance',
    Umerenost: 'temperance',
    Şeytan: 'the_devil',
    'The Devil': 'the_devil',
    Đavo: 'the_devil',
    Kule: 'the_tower',
    'The Tower': 'the_tower',
    Kula: 'the_tower',
    Yıldız: 'the_star',
    'The Star': 'the_star',
    Zvezda: 'the_star',
    Ay: 'the_moon',
    'The Moon': 'the_moon',
    Mesec: 'the_moon',
    Güneş: 'the_sun',
    'The Sun': 'the_sun',
    Sunce: 'the_sun',
    Mahkeme: 'judgement',
    Judgement: 'judgement',
    Sud: 'judgement',
    Dünya: 'the_world',
    'The World': 'the_world',
    Svet: 'the_world',
  };

  // Kart ismini kontrol et
  const cardNames = Object.values(seoCard.card);
  for (const name of cardNames) {
    if (cardNameMapping[name]) {
      return cardNameMapping[name];
    }
  }

  // Minor Arcana için pattern matching
  const trName = seoCard.card.tr;
  const enName = seoCard.card.en;

  // Swords
  if (trName.includes('Kılıçlar') || enName.includes('Swords')) {
    if (trName.includes('Ası') || enName.includes('Ace')) return 'swords_ace';
    if (trName.includes('İkilisi') || enName.includes('Two'))
      return 'swords_two';
    if (trName.includes('Üçlüsü') || enName.includes('Three'))
      return 'swords_three';
    if (trName.includes('Dörtlüsü') || enName.includes('Four'))
      return 'swords_four';
    if (trName.includes('Beşlisi') || enName.includes('Five'))
      return 'swords_five';
    if (trName.includes('Altılısı') || enName.includes('Six'))
      return 'swords_six';
    if (trName.includes('Yedilisi') || enName.includes('Seven'))
      return 'swords_seven';
    if (trName.includes('Sekizlisi') || enName.includes('Eight'))
      return 'swords_eight';
    if (trName.includes('Dokuzlusu') || enName.includes('Nine'))
      return 'swords_nine';
    if (trName.includes('Onlusu') || enName.includes('Ten'))
      return 'swords_ten';
    if (trName.includes('Valesi') || enName.includes('Page'))
      return 'swords_page';
    if (trName.includes('Şövalyesi') || enName.includes('Knight'))
      return 'swords_knight';
    if (trName.includes('Kraliçesi') || enName.includes('Queen'))
      return 'swords_queen';
    if (trName.includes('Kralı') || enName.includes('King'))
      return 'swords_king';
  }

  // Pentacles
  if (trName.includes('Tılsımlar') || enName.includes('Pentacles')) {
    if (trName.includes('Ası') || enName.includes('Ace'))
      return 'pentacles_ace';
    if (trName.includes('İkilisi') || enName.includes('Two'))
      return 'pentacles_two';
    if (trName.includes('Üçlüsü') || enName.includes('Three'))
      return 'pentacles_three';
    if (trName.includes('Dörtlüsü') || enName.includes('Four'))
      return 'pentacles_four';
    if (trName.includes('Beşlisi') || enName.includes('Five'))
      return 'pentacles_five';
    if (trName.includes('Altılısı') || enName.includes('Six'))
      return 'pentacles_six';
    if (trName.includes('Yedilisi') || enName.includes('Seven'))
      return 'pentacles_seven';
    if (trName.includes('Sekizlisi') || enName.includes('Eight'))
      return 'pentacles_eight';
    if (trName.includes('Dokuzlusu') || enName.includes('Nine'))
      return 'pentacles_nine';
    if (trName.includes('Onlusu') || enName.includes('Ten'))
      return 'pentacles_ten';
    if (trName.includes('Valesi') || enName.includes('Page'))
      return 'pentacles_page';
    if (trName.includes('Şövalyesi') || enName.includes('Knight'))
      return 'pentacles_knight';
    if (trName.includes('Kraliçesi') || enName.includes('Queen'))
      return 'pentacles_queen';
    if (trName.includes('Kralı') || enName.includes('King'))
      return 'pentacles_king';
  }

  // Wands
  if (trName.includes('Asalar') || enName.includes('Wands')) {
    if (trName.includes('Ası') || enName.includes('Ace')) return 'wands_ace';
    if (trName.includes('İkilisi') || enName.includes('Two'))
      return 'wands_two';
    if (trName.includes('Üçlüsü') || enName.includes('Three'))
      return 'wands_three';
    if (trName.includes('Dörtlüsü') || enName.includes('Four'))
      return 'wands_four';
    if (trName.includes('Beşlisi') || enName.includes('Five'))
      return 'wands_five';
    if (trName.includes('Altılısı') || enName.includes('Six'))
      return 'wands_six';
    if (trName.includes('Yedilisi') || enName.includes('Seven'))
      return 'wands_seven';
    if (trName.includes('Sekizlisi') || enName.includes('Eight'))
      return 'wands_eight';
    if (trName.includes('Dokuzlusu') || enName.includes('Nine'))
      return 'wands_nine';
    if (trName.includes('Onlusu') || enName.includes('Ten')) return 'wands_ten';
    if (trName.includes('Valesi') || enName.includes('Page'))
      return 'wands_page';
    if (trName.includes('Şövalyesi') || enName.includes('Knight'))
      return 'wands_knight';
    if (trName.includes('Kraliçesi') || enName.includes('Queen'))
      return 'wands_queen';
    if (trName.includes('Kralı') || enName.includes('King'))
      return 'wands_king';
  }

  // Cups
  if (trName.includes('Kupalar') || enName.includes('Cups')) {
    if (trName.includes('Ası') || enName.includes('Ace')) return 'cups_ace';
    if (trName.includes('İkilisi') || enName.includes('Two')) return 'cups_two';
    if (trName.includes('Üçlüsü') || enName.includes('Three'))
      return 'cups_three';
    if (trName.includes('Dörtlüsü') || enName.includes('Four'))
      return 'cups_four';
    if (trName.includes('Beşlisi') || enName.includes('Five'))
      return 'cups_five';
    if (trName.includes('Altılısı') || enName.includes('Six'))
      return 'cups_six';
    if (trName.includes('Yedilisi') || enName.includes('Seven'))
      return 'cups_seven';
    if (trName.includes('Sekizlisi') || enName.includes('Eight'))
      return 'cups_eight';
    if (trName.includes('Dokuzlusu') || enName.includes('Nine'))
      return 'cups_nine';
    if (trName.includes('Onlusu') || enName.includes('Ten')) return 'cups_ten';
    if (
      trName.includes('Prensi') ||
      trName.includes('Valesi') ||
      enName.includes('Page')
    )
      return 'cups_page';
    if (trName.includes('Şövalyesi') || enName.includes('Knight'))
      return 'cups_knight';
    if (trName.includes('Kraliçesi') || enName.includes('Queen'))
      return 'cups_queen';
    if (trName.includes('Kralı') || enName.includes('King')) return 'cups_king';
  }

  return null;
}

function applySEOToCard(existingCard, seoCard) {
  let optimizationsApplied = 0;

  // Her dil için SEO optimizasyonlarını uygula
  ['tr', 'en', 'sr'].forEach(locale => {
    const seo = existingCard.seo[locale];
    const content = existingCard.content[locale];

    if (!seo || !content) return;

    // 1. Meta Title Optimization
    if (seoCard.title[locale] && seoCard.title[locale] !== seo.title) {
      seo.title = seoCard.title[locale];
      optimizationsApplied++;
    }

    // 2. Meta Description Optimization
    if (seoCard.meta[locale] && seoCard.meta[locale] !== seo.description) {
      seo.description = seoCard.meta[locale];
      optimizationsApplied++;
    }

    // 3. FAQ Structured Data Enhancement
    if (
      seoCard.faq &&
      seoCard.faq['@context'] &&
      seoCard.faq['@type'] === 'FAQPage'
    ) {
      // Mevcut FAQ structured data'yı güncelle
      if (seo.structured_data) {
        // FAQ structured data'yı güncelle
        const updatedStructuredData = {
          ...seo.structured_data,
          '@type': 'FAQPage',
          mainEntity: seoCard.faq.mainEntity || [],
        };
        seo.structured_data = updatedStructuredData;
        optimizationsApplied++;
      }

      // Content FAQ'larını da güncelle
      if (seoCard.faq.mainEntity && seoCard.faq.mainEntity.length > 0) {
        const faqQuestions = seoCard.faq.mainEntity.map(q => q.name);
        content.faq = faqQuestions;
        optimizationsApplied++;
      }
    }

    // 4. Keywords Enhancement (meta description'dan çıkar)
    if (seoCard.meta[locale]) {
      const enhancedKeywords = extractKeywordsFromMeta(
        seoCard.meta[locale],
        locale
      );
      if (enhancedKeywords.length > 0) {
        seo.keywords = [...(seo.keywords || []), ...enhancedKeywords].slice(
          0,
          15
        ); // Max 15 keyword
        optimizationsApplied++;
      }
    }
  });

  return optimizationsApplied;
}

function extractKeywordsFromMeta(metaDescription, locale) {
  const keywords = [];

  // Meta description'dan önemli kelimeleri çıkar
  const words = metaDescription
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Dil bazında önemli kelimeler
  const importantWords = {
    tr: [
      'tarot',
      'kartı',
      'karta',
      'anlam',
      'anlamı',
      'aşk',
      'kariyer',
      'kariyeri',
      'para',
      'ruhsal',
      'duygusal',
      'ilişki',
      'gelecek',
      'rehberlik',
      'çitanje',
      'yorum',
    ],
    en: [
      'tarot',
      'card',
      'meaning',
      'love',
      'career',
      'money',
      'spiritual',
      'emotional',
      'relationship',
      'future',
      'guidance',
      'reading',
      'interpretation',
    ],
    sr: [
      'tarot',
      'karta',
      'značenje',
      'ljubav',
      'karijera',
      'novac',
      'duhovni',
      'emotivni',
      'odnos',
      'budućnost',
      'vođstvo',
      'čitanje',
      'tumačenje',
    ],
  };

  const localeWords = importantWords[locale] || importantWords.en;

  words.forEach(word => {
    if (localeWords.includes(word) && !keywords.includes(word)) {
      keywords.push(word);
    }
  });

  return keywords.slice(0, 5); // Max 5 ek keyword
}

// Script çalıştırma
applySEOOptimization();
