#!/usr/bin/env node

/**
 * Raw kartları SEO yapısına dönüştürme script'i
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-raw.json'
);
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'cards');

async function convertToSEOStructure() {
  console.log('🔄 SEO yapısına dönüştürme başlatılıyor...');

  try {
    // Raw veriyi oku
    const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    const cards = rawData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    // Kartları dönüştür
    const convertedCards = cards.map(card => convertCard(card));
    console.log('✅ Kartlar dönüştürüldü');

    // Kategorilere ayır
    const { majorArcana, minorArcana } = categorizeCards(convertedCards);
    console.log(
      `✅ ${majorArcana.length} Major Arcana, ${minorArcana.length} Minor Arcana`
    );

    // Dosyaları kaydet
    await saveCards(majorArcana, minorArcana, convertedCards);
    console.log('✅ Dosyalar kaydedildi');

    // Rapor oluştur
    await generateReport(convertedCards);
    console.log('✅ Rapor oluşturuldu');

    console.log('🎉 Dönüştürme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function convertCard(card) {
  // Kart kategorisini belirle
  const category = determineCategory(card.id);

  // Kart isimlerini al
  const names = extractCardNames(card);

  // Slug'ları oluştur
  const slugs = generateSlugs(names);

  // İçerikleri dönüştür
  const content = convertCardContent(card);

  // SEO meta'ları oluştur
  const seo = generateSEOMeta(card, names);

  // Minor Arcana için suit ve number
  let suit, number;
  if (category === 'minor_arcana') {
    const suitInfo = extractSuitInfo(card.id);
    suit = suitInfo.suit;
    number = suitInfo.number;
  }

  return {
    id: card.id,
    names,
    slugs,
    content,
    seo,
    category,
    ...(suit && { suit }),
    ...(number && { number }),
  };
}

function determineCategory(cardId) {
  const majorArcanaCards = [
    'the_fool',
    'the_magician',
    'the_high_priestess',
    'the_empress',
    'the_emperor',
    'the_hierophant',
    'the_lovers',
    'the_chariot',
    'strength',
    'the_hermit',
    'wheel_of_fortune',
    'justice',
    'the_hanged_man',
    'death',
    'temperance',
    'the_devil',
    'the_tower',
    'the_star',
    'the_moon',
    'the_sun',
    'judgement',
    'the_world',
  ];

  return majorArcanaCards.includes(cardId) ? 'major_arcana' : 'minor_arcana';
}

function extractCardNames(card) {
  return {
    tr: card.names?.tr || '',
    en: card.names?.en || '',
    sr: card.names?.sr || '',
  };
}

function generateSlugs(names) {
  return {
    tr: createTurkishSlug(names.tr),
    en: createEnglishSlug(names.en),
    sr: createSerbianSlug(names.sr),
  };
}

function createTurkishSlug(name) {
  if (!name) return '';

  const slugMap = {
    Deli: 'deli',
    Büyücü: 'buyucu',
    'Yüksek Rahibe': 'yuksek-rahibe',
    İmparatoriçe: 'imparatorice',
    İmparator: 'imparator',
    Aziz: 'aziz',
    Aşıklar: 'asiklar',
    'Savaş Arabası': 'savas-arabasi',
    Güç: 'guc',
    Ermiş: 'ermis',
    Münzevi: 'munzevi',
    'Kader Çarkı': 'kader-carki',
    Adalet: 'adalet',
    'Asılan Adam': 'asilan-adam',
    Ölüm: 'olum',
    Denge: 'denge',
    Şeytan: 'seytan',
    Kule: 'kule',
    Yıldız: 'yildiz',
    Ay: 'ay',
    Güneş: 'gunes',
    Yargı: 'yargi',
    Dünya: 'dunya',
    Kupalar: 'kupalar',
    Kılıçlar: 'kiliclar',
    Asalar: 'asalar',
    Tılsımlar: 'tilsimlar',
    Altınlar: 'altinlar',
    Ası: 'asi',
    İkilisi: 'ikilisi',
    Üçlüsü: 'uclusu',
    Dörtlüsü: 'dortlusu',
    Beşlisi: 'beslisi',
    Altılısı: 'altilisi',
    Yedilisi: 'yedilisi',
    Sekizlisi: 'sekizlisi',
    Dokuzlusu: 'dokuzlusu',
    Onlusu: 'onlusu',
    Uşağı: 'usagi',
    Prensi: 'prensi',
    Şövalyesi: 'sovalyesi',
    Kraliçesi: 'kralicesi',
    Kralı: 'krali',
  };

  if (slugMap[name]) {
    return slugMap[name];
  }

  return name
    .toLowerCase()
    .replace(/[çğıöşü]/g, match => {
      const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' };
      return map[match];
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function createEnglishSlug(name) {
  if (!name) return '';

  return name.toLowerCase().replace(/\s+/g, '-');
}

function createSerbianSlug(name) {
  if (!name) return '';

  return name
    .toLowerCase()
    .replace(/[čćđšž]/g, match => {
      const map = { č: 'c', ć: 'c', đ: 'd', š: 's', ž: 'z' };
      return map[match];
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function convertCardContent(card) {
  // Mevcut yapıyı kontrol et
  if (card.meanings && card.meanings.upright) {
    // Yeni yapı (Major Arcana)
    return {
      tr: convertContentForLocale(card, 'tr'),
      en: convertContentForLocale(card, 'en'),
      sr: convertContentForLocale(card, 'sr'),
    };
  } else {
    // Eski yapı (Minor Arcana) - placeholder içerik
    return {
      tr: createPlaceholderContent(card, 'tr'),
      en: createPlaceholderContent(card, 'en'),
      sr: createPlaceholderContent(card, 'sr'),
    };
  }
}

function convertContentForLocale(card, locale) {
  const meanings = card.meanings || {};
  const context = card.context || {};
  const cta = card.cta || {};
  const related = card.related || {};

  return {
    short_description: card.short_description || '',
    meanings: {
      upright: {
        general: meanings.upright?.general || '',
        love: meanings.upright?.love || '',
        career: meanings.upright?.career || '',
        money: meanings.upright?.money || '',
        spiritual: meanings.upright?.spiritual || '',
      },
      reversed: {
        general: meanings.reversed?.general || '',
        love: meanings.reversed?.love || '',
        career: meanings.reversed?.career || '',
        money: meanings.reversed?.money || '',
        spiritual: meanings.reversed?.spiritual || '',
      },
    },
    context: {
      mythology: context.mythology || '',
      celtic_cross: {
        future: context.celtic_cross?.future || '',
        hidden_influences: context.celtic_cross?.hidden_influences || '',
      },
    },
    faq: card.faq || [],
    cta: {
      main: cta.main || '',
      micro: cta.micro || '',
    },
    related: {
      cards: related.cards || [],
      guides: related.guides || [],
    },
  };
}

function createPlaceholderContent(card, locale) {
  return {
    short_description: card.upright || '',
    meanings: {
      upright: {
        general: card.upright || '',
        love: card.upright || '',
        career: card.upright || '',
        money: card.upright || '',
        spiritual: card.upright || '',
      },
      reversed: {
        general: card.reversed || '',
        love: card.reversed || '',
        career: card.reversed || '',
        money: card.reversed || '',
        spiritual: card.reversed || '',
      },
    },
    context: {
      mythology: card.context || '',
      celtic_cross: {
        future: '',
        hidden_influences: '',
      },
    },
    faq: [],
    cta: {
      main: card.cta || '',
      micro: '',
    },
    related: {
      cards: [],
      guides: [],
    },
  };
}

function generateSEOMeta(card, names) {
  return {
    tr: {
      title:
        card.seo?.tr_title || `${names.tr} — Tarot Kartı Anlamı | Büsbüskimki`,
      description:
        card.seo?.tr_meta || `${names.tr} kartının düz ve ters anlamları.`,
      keywords: ['tarot', 'kart', names.tr.toLowerCase()],
    },
    en: {
      title:
        card.seo?.en_title || `${names.en} — Tarot Card Meaning | Büsbüskimki`,
      description: card.seo?.en_meta || `Discover ${names.en} card meanings.`,
      keywords: ['tarot', 'card', names.en.toLowerCase()],
    },
    sr: {
      title: `${names.sr} — Značenje Tarot Karte | Büsbüskimki`,
      description: `Otkrijte značenje ${names.sr} karte.`,
      keywords: ['tarot', 'karta', names.sr.toLowerCase()],
    },
  };
}

function extractSuitInfo(cardId) {
  const suitMap = {
    cups: 'cups',
    swords: 'swords',
    wands: 'wands',
    pentacles: 'pentacles',
  };

  const numberMap = {
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    page: 11,
    knight: 12,
    queen: 13,
    king: 14,
  };

  // cardId formatını parse et (örn: cups_ace, swords_king)
  const parts = cardId.split('_');

  return {
    suit: suitMap[parts[0]] || null,
    number: numberMap[parts[1]] || null,
  };
}

function categorizeCards(cards) {
  const majorArcana = cards.filter(card => card.category === 'major_arcana');
  const minorArcana = cards.filter(card => card.category === 'minor_arcana');

  return { majorArcana, minorArcana };
}

async function saveCards(majorArcana, minorArcana, allCards) {
  // Major Arcana kaydet
  const majorArcanaData = {
    cards: majorArcana,
    metadata: {
      total: majorArcana.length,
      category: 'major_arcana',
      generated: new Date().toISOString(),
    },
  };

  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, 'major-arcana-seo.json'),
    JSON.stringify(majorArcanaData, null, 2),
    'utf-8'
  );

  // Minor Arcana kaydet
  const minorArcanaData = {
    cards: minorArcana,
    metadata: {
      total: minorArcana.length,
      category: 'minor_arcana',
      generated: new Date().toISOString(),
    },
  };

  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, 'minor-arcana-seo.json'),
    JSON.stringify(minorArcanaData, null, 2),
    'utf-8'
  );

  // Tüm kartları tek dosyada kaydet
  const allCardsData = {
    cards: allCards,
    metadata: {
      total: allCards.length,
      major_arcana: majorArcana.length,
      minor_arcana: minorArcana.length,
      generated: new Date().toISOString(),
    },
  };

  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, 'all-cards-seo.json'),
    JSON.stringify(allCardsData, null, 2),
    'utf-8'
  );
}

async function generateReport(cards) {
  const report = {
    summary: {
      total_cards: cards.length,
      major_arcana: cards.filter(c => c.category === 'major_arcana').length,
      minor_arcana: cards.filter(c => c.category === 'minor_arcana').length,
      conversion_date: new Date().toISOString(),
    },
    issues: [],
    recommendations: [],
  };

  // Eksik içerikleri kontrol et
  cards.forEach(card => {
    if (!card.names.sr) {
      report.issues.push(`Missing SR name for card: ${card.id}`);
    }

    if (!card.content.tr.short_description) {
      report.issues.push(`Missing TR short description for card: ${card.id}`);
    }

    if (!card.content.en.short_description) {
      report.issues.push(`Missing EN short description for card: ${card.id}`);
    }
  });

  // Öneriler
  report.recommendations = [
    'Minor Arcana kartları için içerik genişletme gerekli',
    'SR çevirileri tamamlanmalı',
    'SEO meta verileri optimize edilmeli',
    'FAQ içerikleri eklenmeli',
  ];

  // Raporu kaydet
  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, 'seo-conversion-report.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );
}

convertToSEOStructure();
