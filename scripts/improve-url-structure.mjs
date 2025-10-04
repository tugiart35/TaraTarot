#!/usr/bin/env node

/**
 * URL Structure Improvements Script
 *
 * Bu script, tarot kartları için URL yapısını iyileştirir:
 * 1. Daha SEO dostu URL'ler
 * 2. Kategori bazlı URL yapısı
 * 3. Hreflang implementasyonu
 * 4. Canonical URL'ler
 * 5. Breadcrumb yapısı
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
  'all-cards-seo-backup-url-structure.json'
);

// URL yapısı iyileştirmeleri
const URL_IMPROVEMENTS = {
  // Kategori yolları
  categoryPaths: {
    tr: {
      major_arcana: 'buyuk-arkana',
      minor_arcana: 'kucuk-arkana',
      swords: 'kiliclar',
      cups: 'kupalar',
      wands: 'asalar',
      pentacles: 'tilsimlar',
    },
    en: {
      major_arcana: 'major-arcana',
      minor_arcana: 'minor-arcana',
      swords: 'swords',
      cups: 'cups',
      wands: 'wands',
      pentacles: 'pentacles',
    },
    sr: {
      major_arcana: 'velika-arkana',
      minor_arcana: 'mala-arkana',
      swords: 'mačevi',
      cups: 'čaše',
      wands: 'štapovi',
      pentacles: 'zlatnici',
    },
  },

  // URL slug iyileştirmeleri
  slugImprovements: {
    // Türkçe karakter dönüşümleri
    tr: {
      ğ: 'g',
      ü: 'u',
      ş: 's',
      ı: 'i',
      ö: 'o',
      ç: 'c',
      Ğ: 'G',
      Ü: 'U',
      Ş: 'S',
      İ: 'I',
      Ö: 'O',
      Ç: 'C',
    },
    // Sırpça karakter dönüşümleri
    sr: {
      ć: 'c',
      č: 'c',
      đ: 'd',
      š: 's',
      ž: 'z',
      Ć: 'C',
      Č: 'C',
      Đ: 'D',
      Š: 'S',
      Ž: 'Z',
    },
  },
};

async function improveUrlStructure() {
  console.log('🔧 URL yapısı iyileştiriliyor...');

  try {
    // Mevcut tarot verilerini yükle
    console.log('📖 Mevcut tarot verileri yükleniyor...');
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    console.log(`✅ ${tarotData.cards.length} kart yüklendi`);

    // Backup oluştur
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    let totalImprovements = 0;

    for (const card of tarotData.cards) {
      let cardImprovements = 0;

      // Her dil için URL iyileştirmeleri
      ['tr', 'en', 'sr'].forEach(locale => {
        if (card.content && card.content[locale]) {
          // SEO objesi oluştur
          if (!card.seo) {
            card.seo = {};
          }
          if (!card.seo[locale]) {
            card.seo[locale] = {};
          }

          const seo = card.seo[locale];

          // 1. Gelişmiş URL slug'ları
          if (!seo.optimizedSlug) {
            seo.optimizedSlug = generateOptimizedSlug(card, locale);
            cardImprovements++;
          }

          // 2. Kategori bazlı URL yapısı
          if (!seo.categoryUrl) {
            seo.categoryUrl = generateCategoryUrl(card, locale);
            cardImprovements++;
          }

          // 3. Tam URL yapısı
          if (!seo.fullUrl) {
            seo.fullUrl = generateFullUrl(card, locale);
            cardImprovements++;
          }

          // 4. Breadcrumb URL'leri
          if (!seo.breadcrumbUrls) {
            seo.breadcrumbUrls = generateBreadcrumbUrls(card, locale);
            cardImprovements++;
          }

          // 5. Hreflang URL'leri
          if (!seo.hreflangUrls) {
            seo.hreflangUrls = generateHreflangUrls(card, locale);
            cardImprovements++;
          }

          // 6. Canonical URL
          if (!seo.canonicalUrl) {
            seo.canonicalUrl = generateCanonicalUrl(card, locale);
            cardImprovements++;
          }

          // 7. Related URLs
          if (!seo.relatedUrls) {
            seo.relatedUrls = generateRelatedUrls(card, locale);
            cardImprovements++;
          }

          // 8. Sitemap URL
          if (!seo.sitemapUrl) {
            seo.sitemapUrl = generateSitemapUrl(card, locale);
            cardImprovements++;
          }

          // 9. Image URLs
          if (!seo.imageUrls) {
            seo.imageUrls = generateImageUrls(card, locale);
            cardImprovements++;
          }

          // 10. Social sharing URLs
          if (!seo.socialUrls) {
            seo.socialUrls = generateSocialUrls(card, locale);
            cardImprovements++;
          }
        }
      });

      totalImprovements += cardImprovements;

      if (cardImprovements > 0) {
        console.log(
          `✅ ${card.id}: ${cardImprovements} URL iyileştirmesi uygulandı`
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
    console.log(`✅ ${totalImprovements} toplam URL iyileştirmesi uygulandı`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Uygulanan URL İyileştirmeleri:');
    console.log('✅ Optimized slug generation');
    console.log('✅ Category-based URL structure');
    console.log('✅ Full URL generation');
    console.log('✅ Breadcrumb URL structure');
    console.log('✅ Hreflang URL implementation');
    console.log('✅ Canonical URL generation');
    console.log('✅ Related URLs generation');
    console.log('✅ Sitemap URL generation');
    console.log('✅ Image URL optimization');
    console.log('✅ Social sharing URLs');

    console.log('\n🎉 URL yapısı başarıyla iyileştirildi!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function generateOptimizedSlug(card, locale) {
  const cardName = card.names[locale];
  let slug = cardName.toLowerCase();

  // Türkçe karakter dönüşümü
  if (locale === 'tr') {
    const trMap = URL_IMPROVEMENTS.slugImprovements.tr;
    for (const [from, to] of Object.entries(trMap)) {
      slug = slug.replace(new RegExp(from, 'g'), to);
    }
  }

  // Sırpça karakter dönüşümü
  if (locale === 'sr') {
    const srMap = URL_IMPROVEMENTS.slugImprovements.sr;
    for (const [from, to] of Object.entries(srMap)) {
      slug = slug.replace(new RegExp(from, 'g'), to);
    }
  }

  // Özel karakterleri temizle
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-|-$/g, '');

  return slug;
}

function generateCategoryUrl(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const categoryPaths = URL_IMPROVEMENTS.categoryPaths[locale];

  let category = 'major-arcana';
  if (card.category === 'minor_arcana') {
    // Minor Arcana için alt kategori belirle
    if (card.id.includes('swords')) category = 'swords';
    else if (card.id.includes('cups')) category = 'cups';
    else if (card.id.includes('wands')) category = 'wands';
    else if (card.id.includes('pentacles')) category = 'pentacles';
    else category = 'minor-arcana';
  }

  const categoryPath = categoryPaths[category] || category;
  const categoryPathMap = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };

  return `${baseUrl}/${locale}/${categoryPathMap[locale]}/${categoryPath}`;
}

function generateFullUrl(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const categoryPaths = URL_IMPROVEMENTS.categoryPaths[locale];

  let category = 'major-arcana';
  if (card.category === 'minor_arcana') {
    if (card.id.includes('swords')) category = 'swords';
    else if (card.id.includes('cups')) category = 'cups';
    else if (card.id.includes('wands')) category = 'wands';
    else if (card.id.includes('pentacles')) category = 'pentacles';
    else category = 'minor-arcana';
  }

  const categoryPath = categoryPaths[category] || category;
  const categoryPathMap = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };

  const optimizedSlug = card.seo[locale].optimizedSlug || card.slugs[locale];

  return `${baseUrl}/${locale}/${categoryPathMap[locale]}/${categoryPath}/${optimizedSlug}`;
}

function generateBreadcrumbUrls(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const categoryPaths = URL_IMPROVEMENTS.categoryPaths[locale];

  let category = 'major-arcana';
  if (card.category === 'minor_arcana') {
    if (card.id.includes('swords')) category = 'swords';
    else if (card.id.includes('cups')) category = 'cups';
    else if (card.id.includes('wands')) category = 'wands';
    else if (card.id.includes('pentacles')) category = 'pentacles';
    else category = 'minor-arcana';
  }

  const categoryPath = categoryPaths[category] || category;
  const categoryPathMap = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };

  return {
    home: `${baseUrl}/${locale}`,
    cards: `${baseUrl}/${locale}/${categoryPathMap[locale]}`,
    category: `${baseUrl}/${locale}/${categoryPathMap[locale]}/${categoryPath}`,
    card: card.seo[locale].fullUrl,
  };
}

function generateHreflangUrls(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const hreflangUrls = {};

  // Her dil için URL oluştur
  ['tr', 'en', 'sr'].forEach(loc => {
    if (card.content && card.content[loc]) {
      const categoryPaths = URL_IMPROVEMENTS.categoryPaths[loc];

      let category = 'major-arcana';
      if (card.category === 'minor_arcana') {
        if (card.id.includes('swords')) category = 'swords';
        else if (card.id.includes('cups')) category = 'cups';
        else if (card.id.includes('wands')) category = 'wands';
        else if (card.id.includes('pentacles')) category = 'pentacles';
        else category = 'minor-arcana';
      }

      const categoryPath = categoryPaths[category] || category;
      const categoryPathMap = {
        tr: 'kartlar',
        en: 'cards',
        sr: 'kartice',
      };

      const optimizedSlug = card.seo[loc].optimizedSlug || card.slugs[loc];
      hreflangUrls[loc] =
        `${baseUrl}/${loc}/${categoryPathMap[loc]}/${categoryPath}/${optimizedSlug}`;
    }
  });

  // x-default olarak EN URL'ini ayarla
  hreflangUrls['x-default'] = hreflangUrls.en || hreflangUrls.tr;

  return hreflangUrls;
}

function generateCanonicalUrl(card, locale) {
  return card.seo[locale].fullUrl;
}

function generateRelatedUrls(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const categoryPathMap = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };

  return {
    dailyTarot: `${baseUrl}/${locale}/gunluk-tarot`,
    spreads: `${baseUrl}/${locale}/acilimlar`,
    guides: `${baseUrl}/${locale}/rehberler`,
    readings: `${baseUrl}/${locale}/okumalar`,
  };
}

function generateSitemapUrl(card, locale) {
  return card.seo[locale].fullUrl;
}

function generateImageUrls(card, locale) {
  const baseUrl = 'https://busbuskimki.com';

  return {
    card: `${baseUrl}/images/cards/${card.id}.webp`,
    cardJpg: `${baseUrl}/images/cards/${card.id}.jpg`,
    thumbnail: `${baseUrl}/images/cards/thumbnails/${card.id}.webp`,
    social: `${baseUrl}/images/cards/social/${card.id}.webp`,
  };
}

function generateSocialUrls(card, locale) {
  const baseUrl = 'https://busbuskimki.com';
  const cardUrl = card.seo[locale].fullUrl;

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(cardUrl)}&text=${encodeURIComponent(card.names[locale])}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(cardUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(cardUrl)}&text=${encodeURIComponent(card.names[locale])}`,
  };
}

// Script çalıştırma
improveUrlStructure();
