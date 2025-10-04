#!/usr/bin/env node

/**
 * Fix Technical Requirements Script
 *
 * Bu script, hreflang, OpenGraph tags ve diğer teknik gereksinimleri düzeltir.
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
  'all-cards-seo-backup-technical.json'
);

async function fixTechnicalRequirements() {
  console.log('🔧 Technical requirements düzeltiliyor...');

  try {
    // Mevcut tarot verilerini yükle
    console.log('📖 Mevcut tarot verileri yükleniyor...');
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    console.log(`✅ ${tarotData.cards.length} kart yüklendi`);

    // Backup oluştur
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    // Technical requirements düzeltmeleri
    let totalFixes = 0;

    for (const card of tarotData.cards) {
      let cardFixes = 0;

      // Her dil için technical requirements
      ['tr', 'en', 'sr'].forEach(locale => {
        if (card.seo[locale]) {
          const seo = card.seo[locale];

          // 1. Hreflang Implementation
          if (!seo.hreflang) {
            seo.hreflang = generateHreflangTags(card, locale);
            cardFixes++;
          }

          // 2. OpenGraph Tags
          if (!seo.openGraph) {
            seo.openGraph = generateOpenGraphTags(card, locale);
            cardFixes++;
          }

          // 3. Twitter Cards
          if (!seo.twitterCard) {
            seo.twitterCard = generateTwitterCard(card, locale);
            cardFixes++;
          }

          // 4. Canonical URL
          if (!seo.canonical) {
            seo.canonical = generateCanonicalURL(card, locale);
            cardFixes++;
          }

          // 5. Language Tags
          if (!seo.language) {
            seo.language = getLanguageCode(locale);
            cardFixes++;
          }

          // 6. Robots Meta
          if (!seo.robots) {
            seo.robots = 'index, follow';
            cardFixes++;
          }

          // 7. Viewport Meta
          if (!seo.viewport) {
            seo.viewport = 'width=device-width, initial-scale=1.0';
            cardFixes++;
          }

          // 8. Charset
          if (!seo.charset) {
            seo.charset = 'UTF-8';
            cardFixes++;
          }

          // 9. Author Meta
          if (!seo.author) {
            seo.author = 'Büsbüskimki';
            cardFixes++;
          }

          // 10. Generator Meta
          if (!seo.generator) {
            seo.generator = 'Next.js';
            cardFixes++;
          }
        }
      });

      totalFixes += cardFixes;

      if (cardFixes > 0) {
        console.log(
          `✅ ${card.id}: ${cardFixes} technical requirement düzeltildi`
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
    console.log(`✅ ${totalFixes} toplam technical requirement düzeltildi`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Uygulanan Technical Requirements:');
    console.log('✅ Hreflang tags implemented');
    console.log('✅ OpenGraph tags implemented');
    console.log('✅ Twitter Cards implemented');
    console.log('✅ Canonical URLs implemented');
    console.log('✅ Language tags implemented');
    console.log('✅ Robots meta implemented');
    console.log('✅ Viewport meta implemented');
    console.log('✅ Charset meta implemented');
    console.log('✅ Author meta implemented');
    console.log('✅ Generator meta implemented');

    console.log('\n🎉 Technical requirements başarıyla düzeltildi!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function generateHreflangTags(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const hreflangTags = [];

  // Mevcut dil için hreflang
  hreflangTags.push({
    rel: 'alternate',
    hreflang: locale,
    href: `${baseUrl}/${locale}/kartlar/${card.seo[locale].slug}`,
  });

  // Diğer diller için hreflang
  ['tr', 'en', 'sr'].forEach(otherLocale => {
    if (otherLocale !== locale && card.seo[otherLocale]) {
      hreflangTags.push({
        rel: 'alternate',
        hreflang: otherLocale,
        href: `${baseUrl}/${otherLocale}/kartlar/${card.seo[otherLocale].slug}`,
      });
    }
  });

  // x-default hreflang (genellikle EN)
  const defaultLocale = card.seo.en ? 'en' : 'tr';
  hreflangTags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/${defaultLocale}/kartlar/${card.seo[defaultLocale].slug}`,
  });

  return hreflangTags;
}

function generateOpenGraphTags(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const cardName = card.card_name[locale];
  const description = card.seo[locale].description;
  const imageUrl = `${baseUrl}/cards/${card.id}.jpg`;

  return {
    'og:title': card.seo[locale].title,
    'og:description': description,
    'og:image': imageUrl,
    'og:url': `${baseUrl}/${locale}/kartlar/${card.seo[locale].slug}`,
    'og:type': 'article',
    'og:site_name': 'Büsbüskimki',
    'og:locale': getOpenGraphLocale(locale),
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': `${cardName} tarot kartı`,
    'article:author': 'Büsbüskimki',
    'article:section': 'Tarot Kartları',
    'article:tag':
      card.seo[locale].keywords?.join(', ') || 'tarot, kart, yorum',
  };
}

function generateTwitterCard(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const imageUrl = `${baseUrl}/cards/${card.id}.jpg`;

  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': card.seo[locale].title,
    'twitter:description': card.seo[locale].description,
    'twitter:image': imageUrl,
    'twitter:image:alt': `${card.card_name[locale]} tarot kartı`,
    'twitter:site': '@Büsbüskimki',
    'twitter:creator': '@Büsbüskimki',
  };
}

function generateCanonicalURL(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  return `${baseUrl}/${locale}/kartlar/${card.seo[locale].slug}`;
}

function getLanguageCode(locale) {
  const languageMap = {
    tr: 'tr-TR',
    en: 'en-US',
    sr: 'sr-RS',
  };
  return languageMap[locale] || 'en-US';
}

function getOpenGraphLocale(locale) {
  const localeMap = {
    tr: 'tr_TR',
    en: 'en_US',
    sr: 'sr_RS',
  };
  return localeMap[locale] || 'en_US';
}

// Script çalıştırma
fixTechnicalRequirements();
