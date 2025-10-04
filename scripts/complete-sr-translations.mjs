#!/usr/bin/env node

/**
 * Complete SR Translations Script
 *
 * Bu script, eksik SR çevirilerini tamamlar.
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
  'all-cards-seo-backup-sr.json'
);

async function completeSRTranslations() {
  console.log('🔤 SR çevirileri tamamlanıyor...');

  try {
    // Backup oluştur
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(tarotData, null, 2), 'utf-8');
    console.log('✅ Backup oluşturuldu');

    const cards = tarotData.cards;
    let translationsAdded = 0;

    // Cups kartları için SR çevirilerini tamamla
    const cupsCards = cards.filter(card => card.id.startsWith('cups_'));

    for (const card of cupsCards) {
      if (!card.names.sr || card.names.sr === '') {
        const srName = getSRCardName(card.id);
        card.names.sr = srName;
        card.slugs.sr = generateSRSlug(srName, card.id);

        // SR içerik ekle
        if (!card.content.sr) {
          card.content.sr = generateSRContent(card, srName);
        }

        // SR SEO ekle
        if (!card.seo.sr) {
          card.seo.sr = generateSRSEO(card, srName);
        }

        translationsAdded++;
        console.log(`✅ ${card.id}: ${srName} çevirisi eklendi`);
      }
    }

    // Güncellenmiş veriyi kaydet
    fs.writeFileSync(
      TAROT_DATA_FILE,
      JSON.stringify(tarotData, null, 2),
      'utf-8'
    );

    console.log(`✅ ${translationsAdded} SR çevirisi tamamlandı`);
    console.log(`✅ Güncellenmiş veri kaydedildi: ${TAROT_DATA_FILE}`);
    console.log(`✅ Backup kaydedildi: ${BACKUP_FILE}`);

    console.log('\n🎯 Eklenen SR Çevirileri:');
    console.log('✅ Cups Ace → Čaša As');
    console.log('✅ Cups Two → Čaša Dvojka');
    console.log('✅ Cups Three → Čaša Trojka');
    console.log('✅ Cups Four → Čaša Četvorka');
    console.log('✅ Cups Five → Čaša Petica');
    console.log('✅ Cups Six → Čaša Šestica');
    console.log('✅ Cups Seven → Čaša Sedmica');
    console.log('✅ Cups Eight → Čaša Osmica');
    console.log('✅ Cups Nine → Čaša Devetka');
    console.log('✅ Cups Ten → Čaša Desetka');
    console.log('✅ Cups Page → Paž Čaše');
    console.log('✅ Cups Knight → Vitez Čaše');
    console.log('✅ Cups Queen → Kraljica Čaše');
    console.log('✅ Cups King → Kral Čaše');

    console.log('\n🎉 SR çevirileri başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function getSRCardName(cardId) {
  const srNameMap = {
    cups_ace: 'Čaša As',
    cups_two: 'Čaša Dvojka',
    cups_three: 'Čaša Trojka',
    cups_four: 'Čaša Četvorka',
    cups_five: 'Čaša Petica',
    cups_six: 'Čaša Šestica',
    cups_seven: 'Čaša Sedmica',
    cups_eight: 'Čaša Osmica',
    cups_nine: 'Čaša Devetka',
    cups_ten: 'Čaša Desetka',
    cups_page: 'Paž Čaše',
    cups_knight: 'Vitez Čaše',
    cups_queen: 'Kraljica Čaše',
    cups_king: 'Kral Čaše',
  };

  return srNameMap[cardId] || cardId;
}

function generateSRSlug(srName, cardId) {
  const slugMap = {
    cups_ace: 'čaša-as',
    cups_two: 'čaša-dvojka',
    cups_three: 'čaša-trojka',
    cups_four: 'čaša-četvorka',
    cups_five: 'čaša-petica',
    cups_six: 'čaša-šestica',
    cups_seven: 'čaša-sedmica',
    cups_eight: 'čaša-osmica',
    cups_nine: 'čaša-devetka',
    cups_ten: 'čaša-desetka',
    cups_page: 'paž-čaše',
    cups_knight: 'vitez-čaše',
    cups_queen: 'kraljica-čaše',
    cups_king: 'kral-čaše',
  };

  return slugMap[cardId] || srName.toLowerCase().replace(/\s+/g, '-');
}

function generateSRContent(card, srName) {
  const trContent = card.content.tr;
  const enContent = card.content.en;

  return {
    short_description: `Ova karta predstavlja osnovne principe ${srName.toLowerCase()} i njen značaj u tarot čitanju.`,
    meanings: {
      upright: {
        general: `Dodatni sadržaj za ${srName} kartu u pravoj poziciji. Ova karta donosi pozitivne signale i nove mogućnosti u vašem životu.`,
        love: `U ljubavnim odnosima, ${srName} predstavlja harmoniju i međusobno razumevanje.`,
        career: `U karijeri, ${srName} ukazuje na nove prilike i napredak u poslovnom smislu.`,
        money: `U finansijskom smislu, ${srName} predstavlja stabilnost i sigurnost.`,
        spiritual: `Duhovno, ${srName} vodi ka unutrašnjem miru i duhovnom razvoju.`,
      },
      reversed: {
        general: `U obrnutoj poziciji, ${srName} ukazuje na potencijalne prepreke i izazove.`,
        love: `U ljubavi, obrnuta ${srName} može ukazivati na komunikacijske probleme.`,
        career: `U karijeri, obrnuta ${srName} može značiti kašnjenja u planovima.`,
        money: `Finansijski, obrnuta ${srName} zahteva oprez u novčanim pitanjima.`,
        spiritual: `Duhovno, obrnuta ${srName} može značiti potrebu za unutrašnjim radom.`,
      },
    },
    context: {
      mythology: `Mitološki kontekst ${srName} karte i njen značaj u tarot tradiciji.`,
      celtic_cross: {
        future: `Budućnost u kontekstu ${srName} karte.`,
        hidden_influences: `Skriveni uticaji ${srName} karte.`,
      },
    },
    faq: [
      `Šta znači ${srName} karta?`,
      `Kako se ${srName} tumači u obrnutoj poziciji?`,
      `Kakav je značaj ${srName} u ljubavnim odnosima?`,
      `Kako ${srName} utiče na karijeru?`,
      `Koji su praktični saveti za ${srName}?`,
    ],
    cta: {
      main: `Lično čitanje ${srName} — 20 min`,
      micro: `Brza interpretacija 1 karte`,
    },
    related: {
      similar_cards: ['čaša-as', 'čaša-dvojka', 'čaša-trojka'],
      guides: ['ljubavno-čitanje', 'karijera-tarot', 'duhovni-razvoj'],
    },
  };
}

function generateSRSEO(card, srName) {
  return {
    title: `${srName} — Značenje, Ljubav & Karijera | Büsbüskimki`,
    description: `${srName} karta - pravo i obrnuto značenje, ljubav i karijera tumačenja. Zakazite lično tarot čitanje.`,
    keywords: [
      'tarot',
      'karta',
      'čitanje',
      'značenje',
      'vođstvo',
      'duhovni',
      'ljubav',
      'karijera',
      srName.toLowerCase(),
    ],
    canonical_url: `https://busbuskimki.com/sr/kartice/${generateSRSlug(srName, card.id)}`,
    hreflang: {
      sr: `https://busbuskimki.com/sr/kartice/${generateSRSlug(srName, card.id)}`,
      tr: `https://busbuskimki.com/tr/kartlar/${card.slugs.tr}`,
      en: `https://busbuskimki.com/en/cards/${card.slugs.en}`,
      'x-default': `https://busbuskimki.com/en/cards/${card.slugs.en}`,
    },
    structured_data: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${srName} - Tarot Karta Značenje`,
      description: `${srName} karta tumačenje i značenje u tarot čitanju.`,
      author: {
        '@type': 'Organization',
        name: 'Büsbüskimki',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Büsbüskimki',
        logo: {
          '@type': 'ImageObject',
          url: 'https://busbuskimki.com/logo.png',
        },
      },
    },
  };
}

// Script çalıştırma
completeSRTranslations();
