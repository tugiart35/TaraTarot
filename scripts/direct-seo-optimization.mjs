#!/usr/bin/env node

/**
 * Direct SEO Optimization Script
 *
 * Bu script, doğrudan all-cards-seo.json dosyasını optimize eder.
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
const BACKUP_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo-backup-direct-opt.json'
);

async function directSEOOptimization() {
  console.log('🔧 Doğrudan SEO optimizasyonu uygulanıyor...');

  try {
    // Mevcut tarot verilerini yükle
    console.log('📖 Mevcut tarot verileri yükleniyor...');
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    console.log(`✅ ${tarotData.cards.length} kart yüklendi`);

    // Backup oluştur
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    // SEO optimizasyonları uygula
    let totalOptimizations = 0;

    for (const card of tarotData.cards) {
      let cardOptimizations = 0;

      // Her dil için optimizasyonlar
      ['tr', 'en', 'sr'].forEach(locale => {
        if (card.seo[locale] && card.content[locale]) {
          const seo = card.seo[locale];
          const content = card.content[locale];

          // 1. Meta Description Optimization (120-155 chars)
          if (
            seo.description &&
            (seo.description.length < 120 || seo.description.length > 155)
          ) {
            seo.description = optimizeMetaDescription(seo.description, locale);
            cardOptimizations++;
          }

          // 2. Meta Title Optimization (30-60 chars)
          if (seo.title && (seo.title.length < 30 || seo.title.length > 60)) {
            seo.title = optimizeMetaTitle(
              seo.title,
              card.card_name[locale],
              locale
            );
            cardOptimizations++;
          }

          // 3. Keywords Enhancement
          if (!seo.keywords || seo.keywords.length < 5) {
            seo.keywords = generateKeywords(card.card_name[locale], locale);
            cardOptimizations++;
          }

          // 4. FAQ Enhancement
          if (!content.faq || content.faq.length < 3) {
            content.faq = generateFAQ(card.card_name[locale], locale);
            cardOptimizations++;
          }

          // 5. Structured Data Enhancement
          if (!seo.structured_data || !seo.structured_data['@type']) {
            seo.structured_data = {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: seo.title,
              description: seo.description,
              author: {
                '@type': 'Organization',
                name: 'Büsbüskimki',
              },
            };
            cardOptimizations++;
          }
        }
      });

      totalOptimizations += cardOptimizations;

      if (cardOptimizations > 0) {
        console.log(
          `✅ ${card.id}: ${cardOptimizations} SEO optimizasyonu uygulandı`
        );
      }
    }

    // Güncellenmiş veriyi kaydet
    fs.writeFileSync(
      TAROT_DATA_FILE,
      JSON.stringify(tarotData, null, 2),
      'utf-8'
    );

    console.log(`\n📊 Özet:`);
    console.log(`✅ ${totalOptimizations} toplam SEO optimizasyonu uygulandı`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Uygulanan SEO Optimizasyonları:');
    console.log('✅ Meta titles optimized (30-60 chars)');
    console.log('✅ Meta descriptions optimized (120-155 chars)');
    console.log('✅ Keywords enhanced (5+ keywords)');
    console.log('✅ FAQ content enhanced (3+ questions)');
    console.log('✅ Structured data enhanced');

    console.log('\n🎉 SEO optimizasyonu başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function optimizeMetaDescription(description, locale) {
  // Mevcut description'ı optimize et
  let optimized = description.trim();

  // Uzunluk kontrolü
  if (optimized.length < 120) {
    const additions = {
      tr: ' Kişisel tarot randevusu al.',
      en: ' Book a personal tarot session.',
      sr: ' Rezervišite sesiju.',
    };
    optimized += additions[locale] || additions.en;
  } else if (optimized.length > 155) {
    optimized = optimized.substring(0, 152) + '...';
  }

  return optimized;
}

function optimizeMetaTitle(title, cardName, locale) {
  // Mevcut title'ı optimize et
  let optimized = title.trim();

  // Brand name ekle
  const brandSuffix = {
    tr: ' | Büsbüskimki',
    en: ' | Büsbüskimki',
    sr: ' | Büsbüskimki',
  };

  if (!optimized.includes('Büsbüskimki')) {
    optimized += brandSuffix[locale] || brandSuffix.en;
  }

  // Uzunluk kontrolü
  if (optimized.length > 60) {
    optimized = optimized.substring(0, 57) + '...';
  }

  return optimized;
}

function generateKeywords(cardName, locale) {
  const baseKeywords = {
    tr: ['tarot', 'kartı', 'anlam', 'yorum'],
    en: ['tarot', 'card', 'meaning', 'interpretation'],
    sr: ['tarot', 'karta', 'značenje', 'tumačenje'],
  };

  const keywords = baseKeywords[locale] || baseKeywords.en;
  keywords.push(cardName.toLowerCase());

  return keywords.slice(0, 8); // Max 8 keywords
}

function generateFAQ(cardName, locale) {
  const faqTemplates = {
    tr: [
      `${cardName} kartı ne anlama gelir?`,
      `${cardName} ters geldiğinde ne demek?`,
      `${cardName} aşk hayatında ne ifade eder?`,
      `${cardName} kariyer anlamında neyi işaret eder?`,
    ],
    en: [
      `What does ${cardName} card mean?`,
      `What does reversed ${cardName} mean?`,
      `What does ${cardName} mean in love?`,
      `What does ${cardName} mean in career?`,
    ],
    sr: [
      `Šta znači karta ${cardName}?`,
      `Šta znači obrnuta ${cardName}?`,
      `Šta ${cardName} znači u ljubavi?`,
      `Šta ${cardName} znači u karijeri?`,
    ],
  };

  return faqTemplates[locale] || faqTemplates.en;
}

// Script çalıştırma
directSEOOptimization();
