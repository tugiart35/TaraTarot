#!/usr/bin/env node

/**
 * Tarot içeriklerini en.json dosyasına entegre etme script'i
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
const EN_JSON_FILE = path.join(__dirname, '..', 'messages', 'en.json');
const BACKUP_FILE = path.join(__dirname, '..', 'messages', 'en.json.backup');

async function integrateTarotToEnJson() {
  console.log('🔄 Tarot içerikleri en.json dosyasına entegre ediliyor...');

  try {
    // Backup oluştur
    await createBackup();
    console.log('✅ Backup oluşturuldu');

    // Tarot verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const tarotCards = tarotData.cards || tarotData;
    console.log(`✅ ${tarotCards.length} kart yüklendi`);

    // en.json dosyasını yükle
    const enJson = JSON.parse(fs.readFileSync(EN_JSON_FILE, 'utf-8'));
    console.log('✅ en.json yüklendi');

    // Tarot içeriklerini entegre et
    const integratedJson = integrateTarotContent(enJson, tarotCards);
    console.log('✅ Tarot içerikleri entegre edildi');

    // Güncellenmiş dosyayı kaydet
    await fs.promises.writeFile(
      EN_JSON_FILE,
      JSON.stringify(integratedJson, null, 2),
      'utf-8'
    );
    console.log('✅ en.json güncellendi');

    console.log('🎉 Entegrasyon tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function createBackup() {
  try {
    const enJsonContent = fs.readFileSync(EN_JSON_FILE, 'utf-8');
    await fs.promises.writeFile(BACKUP_FILE, enJsonContent, 'utf-8');
  } catch (error) {
    throw new Error(`Backup oluşturulamadı: ${error.message}`);
  }
}

function integrateTarotContent(enJson, cards) {
  // Tarot bölümünü oluştur
  const tarotSection = {
    cards: {},
    categories: {
      major_arcana: {
        name: 'Major Arcana',
        description: 'The Great Mysteries - 22 main cards',
      },
      minor_arcana: {
        name: 'Minor Arcana',
        description: 'The Lesser Mysteries - 56 cards',
      },
    },
    suits: {
      cups: {
        name: 'Cups',
        description: 'Emotions and relationships',
      },
      swords: {
        name: 'Swords',
        description: 'Thought and conflict',
      },
      wands: {
        name: 'Wands',
        description: 'Creativity and energy',
      },
      pentacles: {
        name: 'Pentacles',
        description: 'Material world and practicality',
      },
    },
  };

  // Her kart için içerik oluştur
  cards.forEach(card => {
    const cardKey = card.id;

    tarotSection.cards[cardKey] = {
      names: card.names,
      slugs: card.slugs,
      category: card.category,
      ...(card.suit && { suit: card.suit }),
      ...(card.number && { number: card.number }),
      content: {
        short_description: card.content.en.short_description,
        meanings: {
          upright: card.content.en.meanings.upright,
          reversed: card.content.en.meanings.reversed,
        },
        context: card.content.en.context,
        faq: card.content.en.faq,
        cta: card.content.en.cta,
        related: card.content.en.related,
      },
      seo: card.seo.en,
    };
  });

  // en.json'a tarot bölümünü ekle
  return {
    ...enJson,
    tarot: tarotSection,
  };
}

integrateTarotToEnJson();
