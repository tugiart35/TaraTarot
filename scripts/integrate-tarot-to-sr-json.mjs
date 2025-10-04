#!/usr/bin/env node

/**
 * Tarot içeriklerini sr.json dosyasına entegre etme script'i
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
const SR_JSON_FILE = path.join(__dirname, '..', 'messages', 'sr.json');
const BACKUP_FILE = path.join(__dirname, '..', 'messages', 'sr.json.backup');

async function integrateTarotToSrJson() {
  console.log('🔄 Tarot içerikleri sr.json dosyasına entegre ediliyor...');

  try {
    // Backup oluştur
    await createBackup();
    console.log('✅ Backup oluşturuldu');

    // Tarot verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const tarotCards = tarotData.cards || tarotData;
    console.log(`✅ ${tarotCards.length} kart yüklendi`);

    // sr.json dosyasını yükle
    const srJson = JSON.parse(fs.readFileSync(SR_JSON_FILE, 'utf-8'));
    console.log('✅ sr.json yüklendi');

    // Tarot içeriklerini entegre et
    const integratedJson = integrateTarotContent(srJson, tarotCards);
    console.log('✅ Tarot içerikleri entegre edildi');

    // Güncellenmiş dosyayı kaydet
    await fs.promises.writeFile(
      SR_JSON_FILE,
      JSON.stringify(integratedJson, null, 2),
      'utf-8'
    );
    console.log('✅ sr.json güncellendi');

    console.log('🎉 Entegrasyon tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function createBackup() {
  try {
    const srJsonContent = fs.readFileSync(SR_JSON_FILE, 'utf-8');
    await fs.promises.writeFile(BACKUP_FILE, srJsonContent, 'utf-8');
  } catch (error) {
    throw new Error(`Backup oluşturulamadı: ${error.message}`);
  }
}

function integrateTarotContent(srJson, cards) {
  // Tarot bölümünü oluştur
  const tarotSection = {
    cards: {},
    categories: {
      major_arcana: {
        name: 'Velika Arkana',
        description: 'Velike Tajne - 22 glavne karte',
      },
      minor_arcana: {
        name: 'Mala Arkana',
        description: 'Male Tajne - 56 karata',
      },
    },
    suits: {
      cups: {
        name: 'Pehari',
        description: 'Emocije i odnosi',
      },
      swords: {
        name: 'Mačevi',
        description: 'Misao i konflikt',
      },
      wands: {
        name: 'Štapovi',
        description: 'Kreativnost i energija',
      },
      pentacles: {
        name: 'Pentakli',
        description: 'Materijalni svet i praktičnost',
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
        short_description: card.content.sr.short_description,
        meanings: {
          upright: card.content.sr.meanings.upright,
          reversed: card.content.sr.meanings.reversed,
        },
        context: card.content.sr.context,
        faq: card.content.sr.faq,
        cta: card.content.sr.cta,
        related: card.content.sr.related,
      },
      seo: card.seo.sr,
    };
  });

  // sr.json'a tarot bölümünü ekle
  return {
    ...srJson,
    tarot: tarotSection,
  };
}

integrateTarotToSrJson();
