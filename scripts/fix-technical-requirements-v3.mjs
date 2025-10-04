#!/usr/bin/env node

/**
 * Fix Technical Requirements Script V3
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
  'all-cards-seo-backup-technical-v3.json'
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
        if (card.content && card.content[locale]) {
          const content = card.content[locale];

          // SEO objesi oluştur
          if (!card.seo) {
            card.seo = {};
          }
          if (!card.seo[locale]) {
            card.seo[locale] = {};
          }

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

          // 11. Title Meta
          if (!seo.title) {
            seo.title = generateTitle(card, locale);
            cardFixes++;
          }

          // 12. Description Meta
          if (!seo.description) {
            seo.description = generateDescription(card, locale);
            cardFixes++;
          }

          // 13. Keywords Meta
          if (!seo.keywords) {
            seo.keywords = generateKeywords(card, locale);
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
    console.log('✅ Title meta implemented');
    console.log('✅ Description meta implemented');
    console.log('✅ Keywords meta implemented');

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
    href: `${baseUrl}/${locale}/kartlar/${card.slugs[locale]}`,
  });

  // Diğer diller için hreflang
  ['tr', 'en', 'sr'].forEach(otherLocale => {
    if (otherLocale !== locale && card.slugs[otherLocale]) {
      hreflangTags.push({
        rel: 'alternate',
        hreflang: otherLocale,
        href: `${baseUrl}/${otherLocale}/kartlar/${card.slugs[otherLocale]}`,
      });
    }
  });

  // x-default hreflang (genellikle EN)
  const defaultLocale = card.slugs.en ? 'en' : 'tr';
  hreflangTags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/${defaultLocale}/kartlar/${card.slugs[defaultLocale]}`,
  });

  return hreflangTags;
}

function generateOpenGraphTags(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const cardName = card.names[locale];
  const description = card.content[locale].short_description;
  const imageUrl = `${baseUrl}/cards/${card.id}.jpg`;

  return {
    'og:title': generateTitle(card, locale),
    'og:description': description,
    'og:image': imageUrl,
    'og:url': `${baseUrl}/${locale}/kartlar/${card.slugs[locale]}`,
    'og:type': 'article',
    'og:site_name': 'Büsbüskimki',
    'og:locale': getOpenGraphLocale(locale),
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': `${cardName} tarot kartı`,
    'article:author': 'Büsbüskimki',
    'article:section': 'Tarot Kartları',
    'article:tag': generateKeywords(card, locale).join(', '),
  };
}

function generateTwitterCard(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const imageUrl = `${baseUrl}/cards/${card.id}.jpg`;

  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': generateTitle(card, locale),
    'twitter:description': card.content[locale].short_description,
    'twitter:image': imageUrl,
    'twitter:image:alt': `${card.names[locale]} tarot kartı`,
    'twitter:site': '@Büsbüskimki',
    'twitter:creator': '@Büsbüskimki',
  };
}

function generateCanonicalURL(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  return `${baseUrl}/${locale}/kartlar/${card.slugs[locale]}`;
}

function generateTitle(card, locale) {
  const cardName = card.names[locale];
  const titleMap = {
    tr: `${cardName} — Anlamı, Aşk & Kariyer | Büsbüskimki`,
    en: `${cardName} — Meaning, Love & Career | Büsbüskimki`,
    sr: `${cardName} — Značenje, Ljubav & Karijera | Büsbüskimki`,
  };
  return titleMap[locale] || titleMap['en'];
}

function generateDescription(card, locale) {
  const cardName = card.names[locale];
  const descriptionMap = {
    tr: `${cardName} kartının düz ve ters anlamları; aşk, kariyer ve ruhsal yorumlar. Kişisel tarot randevusu al.`,
    en: `Discover ${cardName}: upright and reversed meanings, love & career insights. Book a personal tarot session.`,
    sr: `Otkrijte ${cardName}: značenje u uspravnom i obrnutom položaju, ljubav i karijera. Rezervišite sesiju.`,
  };
  return descriptionMap[locale] || descriptionMap['en'];
}

function generateKeywords(card, locale) {
  const cardName = card.names[locale];
  const keywordMap = {
    tr: [
      `${cardName} anlamı`,
      `${cardName} aşk`,
      `${cardName} kariyer`,
      `tarot ${cardName}`,
      `tarot kartları`,
    ],
    en: [
      `${cardName} meaning`,
      `${cardName} love`,
      `${cardName} career`,
      `tarot ${cardName}`,
      `tarot cards`,
    ],
    sr: [
      `${cardName} značenje`,
      `${cardName} ljubav`,
      `${cardName} karijera`,
      `tarot ${cardName}`,
      `tarot karte`,
    ],
  };
  return keywordMap[locale] || keywordMap['en'];
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
