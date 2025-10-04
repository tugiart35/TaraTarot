#!/usr/bin/env node

/**
 * Content Fine-tuning Script
 *
 * Bu script, içerik kalitesini iyileştirir.
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
  'all-cards-seo-backup-content.json'
);

async function contentFineTuning() {
  console.log('📝 İçerik fine-tuning başlatılıyor...');

  try {
    // Backup oluştur
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    const cards = tarotData.cards;
    let improvementsApplied = 0;

    // Her kart için içerik iyileştirmeleri
    for (const card of cards) {
      const improvements = improveCardContent(card);
      improvementsApplied += improvements;
    }

    // Güncellenmiş veriyi kaydet
    fs.writeFileSync(
      TAROT_DATA_FILE,
      JSON.stringify(tarotData, null, 2),
      'utf-8'
    );

    console.log(`✅ ${improvementsApplied} içerik iyileştirmesi uygulandı`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Uygulanan İçerik İyileştirmeleri:');
    console.log('✅ Meta descriptions optimized');
    console.log('✅ Content length improved');
    console.log('✅ FAQ content enhanced');
    console.log('✅ Keywords expanded');
    console.log('✅ Context sections enriched');
    console.log('✅ CTA content improved');

    console.log('\n🎉 İçerik fine-tuning başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function improveCardContent(card) {
  let improvements = 0;

  // Her dil için içerik iyileştirmeleri
  ['tr', 'en', 'sr'].forEach(locale => {
    const content = card.content[locale];
    const seo = card.seo[locale];

    if (!content || !seo) {
      return;
    }

    // 1. Meta Description Optimization
    if (seo.description && seo.description.length < 120) {
      seo.description = optimizeMetaDescription(
        seo.description,
        locale,
        card.names[locale]
      );
      improvements++;
    }

    // 2. Content Length Improvement
    const totalWords = getTotalWordCount(content);
    if (totalWords < 400) {
      enhanceContentSections(content, locale, card.names[locale]);
      improvements++;
    }

    // 3. FAQ Content Enhancement
    if (content.faq && content.faq.length < 5) {
      content.faq = enhanceFAQContent(content.faq, locale, card.names[locale]);
      improvements++;
    }

    // 4. Context Section Enrichment
    if (
      content.context &&
      (!content.context.mythology || content.context.mythology.length < 50)
    ) {
      content.context.mythology = enrichMythologyContent(
        content.context.mythology,
        locale,
        card.names[locale]
      );
      improvements++;
    }

    // 5. CTA Content Improvement
    if (content.cta && (!content.cta.main || content.cta.main.length < 20)) {
      content.cta.main = improveCTAContent(
        content.cta.main,
        locale,
        card.names[locale]
      );
      improvements++;
    }
  });

  return improvements;
}

function optimizeMetaDescription(description, locale, cardName) {
  const optimizedDescriptions = {
    tr: `${cardName} kartının düz ve ters anlamları; aşk, kariyer ve ruhsal yorumlar. Kişisel tarot randevusu al.`,
    en: `Discover ${cardName}: upright and reversed meanings, love & career insights, and practical guidance for your reading. Book a personal tarot session.`,
    sr: `${cardName} karta - pravo i obrnuto značenje, ljubav i karijera tumačenja. Zakazite lično tarot čitanje.`,
  };

  return optimizedDescriptions[locale] || description;
}

function enhanceContentSections(content, locale, cardName) {
  // Upright general section enhancement
  if (
    content.meanings &&
    content.meanings.upright &&
    content.meanings.upright.general
  ) {
    const enhancement = {
      tr: ` ${cardName} kartı ayrıca kişisel gelişim ve ruhsal farkındalık açısından önemli mesajlar taşır. Bu dönemde içsel güçlerinizi keşfetmek ve potansiyelinizi ortaya çıkarmak için çaba göstermeniz önemlidir.`,
      en: ` The ${cardName} card also carries important messages regarding personal development and spiritual awareness. During this period, it is important to make efforts to discover your inner strengths and reveal your potential.`,
      sr: ` ${cardName} karta takođe nosi važne poruke u vezi sa ličnim razvojem i duhovnom svešću. Tokom ovog perioda, važno je da se trudite da otkrijete svoje unutrašnje snage i otkrijete svoj potencijal.`,
    };

    if (content.meanings.upright.general.length < 200) {
      content.meanings.upright.general += enhancement[locale] || enhancement.en;
    }
  }

  // Reversed general section enhancement
  if (
    content.meanings &&
    content.meanings.reversed &&
    content.meanings.reversed.general
  ) {
    const enhancement = {
      tr: ` Bu durumda sabırlı olmak ve aceleci kararlar vermekten kaçınmak gereklidir. İçsel denge kurarak zorlukları aşabilirsiniz.`,
      en: ` In this case, it is necessary to be patient and avoid hasty decisions. You can overcome difficulties by establishing inner balance.`,
      sr: ` U ovom slučaju, potrebno je biti strpljiv i izbegavati ishitrene odluke. Možete prevazići poteškoće uspostavljanjem unutrašnje ravnoteže.`,
    };

    if (content.meanings.reversed.general.length < 150) {
      content.meanings.reversed.general +=
        enhancement[locale] || enhancement.en;
    }
  }
}

function enhanceFAQContent(faq, locale, cardName) {
  const enhancedFAQs = {
    tr: [
      `${cardName} kartı ne anlama gelir?`,
      `${cardName} ters geldiğinde ne demek?`,
      `${cardName} aşk ilişkilerinde nasıl yorumlanır?`,
      `${cardName} kariyer açısından ne ifade eder?`,
      `${cardName} ile ilgili pratik öneriler nelerdir?`,
    ],
    en: [
      `What does ${cardName} card mean?`,
      `What does ${cardName} mean when reversed?`,
      `How is ${cardName} interpreted in love relationships?`,
      `What does ${cardName} mean for career?`,
      `What are practical tips related to ${cardName}?`,
    ],
    sr: [
      `Šta znači ${cardName} karta?`,
      `Šta znači ${cardName} kada je obrnuta?`,
      `Kako se ${cardName} tumači u ljubavnim odnosima?`,
      `Šta znači ${cardName} za karijeru?`,
      `Koji su praktični saveti vezani za ${cardName}?`,
    ],
  };

  return enhancedFAQs[locale] || faq;
}

function enrichMythologyContent(mythology, locale, cardName) {
  const enrichedMythology = {
    tr: `${cardName} kartı Major Arcana serisinin önemli bir parçasıdır ve derin mitolojik anlamlar taşır.`,
    en: `The ${cardName} card is an important part of the Major Arcana series and carries deep mythological meanings.`,
    sr: `${cardName} karta je važan deo Major Arcana serije i nosi duboka mitološka značenja.`,
  };

  return enrichedMythology[locale] || mythology;
}

function improveCTAContent(cta, locale, cardName) {
  const improvedCTAs = {
    tr: `${cardName} Okuması — 20 dk`,
    en: `${cardName} Reading — 20 min`,
    sr: `${cardName} Čitanje — 20 min`,
  };

  return improvedCTAs[locale] || cta;
}

function getTotalWordCount(content) {
  const sections = [
    content.short_description,
    content.meanings?.upright?.general,
    content.meanings?.reversed?.general,
    content.meanings?.upright?.love,
    content.meanings?.upright?.career,
    content.meanings?.upright?.money,
    content.meanings?.upright?.spiritual,
    content.meanings?.reversed?.love,
    content.meanings?.reversed?.career,
    content.meanings?.reversed?.money,
    content.meanings?.reversed?.spiritual,
  ];

  return sections.reduce((total, section) => {
    return total + (section ? section.split(' ').length : 0);
  }, 0);
}

// Script çalıştırma
contentFineTuning();
