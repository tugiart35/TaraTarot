#!/usr/bin/env node

/**
 * Tarot içeriklerini tr.json dosyasına entegre etme script'i
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
const TR_JSON_FILE = path.join(__dirname, '..', 'messages', 'tr.json');
const BACKUP_FILE = path.join(__dirname, '..', 'messages', 'tr.json.backup');

async function integrateTarotToTrJson() {
  console.log('🔄 Tarot içerikleri tr.json dosyasına entegre ediliyor...');

  try {
    // Backup oluştur
    await createBackup();
    console.log('✅ Backup oluşturuldu');

    // Tarot verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const tarotCards = tarotData.cards || tarotData;
    console.log(`✅ ${tarotCards.length} kart yüklendi`);

    // tr.json dosyasını yükle
    const trJson = JSON.parse(fs.readFileSync(TR_JSON_FILE, 'utf-8'));
    console.log('✅ tr.json yüklendi');

    // Tarot içeriklerini entegre et
    const integratedJson = integrateTarotContent(trJson, tarotCards);
    console.log('✅ Tarot içerikleri entegre edildi');

    // Güncellenmiş dosyayı kaydet
    await fs.promises.writeFile(
      TR_JSON_FILE,
      JSON.stringify(integratedJson, null, 2),
      'utf-8'
    );
    console.log('✅ tr.json güncellendi');

    console.log('🎉 Entegrasyon tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

async function createBackup() {
  try {
    const trJsonContent = fs.readFileSync(TR_JSON_FILE, 'utf-8');
    await fs.promises.writeFile(BACKUP_FILE, trJsonContent, 'utf-8');
  } catch (error) {
    throw new Error(`Backup oluşturulamadı: ${error.message}`);
  }
}

function integrateTarotContent(trJson, cards) {
  // Tarot bölümünü oluştur
  const tarotSection = {
    cards: {},
    categories: {
      major_arcana: {
        name: 'Major Arcana',
        description: 'Büyük Gizemler - 22 ana kart',
      },
      minor_arcana: {
        name: 'Minor Arcana',
        description: 'Küçük Gizemler - 56 kart',
      },
    },
    suits: {
      cups: {
        name: 'Kupalar',
        description: 'Duygular ve ilişkiler',
      },
      swords: {
        name: 'Kılıçlar',
        description: 'Düşünce ve çatışma',
      },
      wands: {
        name: 'Asalar',
        description: 'Yaratıcılık ve enerji',
      },
      pentacles: {
        name: 'Tılsımlar',
        description: 'Maddi dünya ve pratiklik',
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
        short_description: card.content.tr.short_description,
        meanings: {
          upright: card.content.tr.meanings.upright,
          reversed: card.content.tr.meanings.reversed,
        },
        context: card.content.tr.context,
        faq: card.content.tr.faq,
        cta: card.content.tr.cta,
        related: card.content.tr.related,
      },
      seo: card.seo.tr,
    };
  });

  // tr.json'a tarot bölümünü ekle
  return {
    ...trJson,
    tarot: tarotSection,
  };
}

integrateTarotToTrJson();
