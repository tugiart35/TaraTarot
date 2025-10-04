#!/usr/bin/env node

/**
 * Tarot İçerik Dönüştürme Script'i
 *
 * Bu script, blogtarot.txt dosyasındaki içerikleri
 * yeni SEO yapısına dönüştürür.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// KONFIGÜRASYON
// ============================================================================

const INPUT_FILE = path.join(__dirname, '..', 'messages', 'blogtarot.txt');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'cards');
const MAPPING_FILE = path.join(
  __dirname,
  '..',
  'src',
  'features',
  'tarot',
  'lib',
  'love',
  'card-name-mapping.ts'
);

// ============================================================================
// TİPLER VE ARAYÜZLER
// ============================================================================

/**
 * Blogtarot.txt'deki eski yapı
 */
const OldCardStructure = {
  id: String,
  names: Object,
  short_description: String,
  meanings: Object,
  context: Object,
  cta: Object,
  faq: Array,
  related: Object,
  seo: Object,
};

/**
 * Yeni SEO yapısı
 */
const NewCardStructure = {
  id: String,
  names: Object,
  slugs: Object,
  content: Object,
  seo: Object,
  category: String,
  suit: String,
  number: Number,
};

// ============================================================================
// ANA FONKSİYONLAR
// ============================================================================

/**
 * Ana dönüştürme fonksiyonu
 */
async function convertBlogTarotToJson() {
  console.log('🔄 Tarot içerik dönüştürme başlatılıyor...');

  try {
    // 1. Input dosyasını oku
    const rawData = await readInputFile();
    console.log('✅ Input dosyası okundu');

    // 2. JSON parse et
    const cards = parseCardsData(rawData);
    console.log(`✅ ${cards.length} kart parse edildi`);

    // 3. Kart isimleri mapping'ini yükle
    const nameMapping = await loadNameMapping();
    console.log('✅ Kart isimleri mapping yüklendi');

    // 4. Kartları dönüştür
    const convertedCards = convertCards(cards, nameMapping);
    console.log('✅ Kartlar dönüştürüldü');

    // 5. Kategorilere ayır
    const { majorArcana, minorArcana } = categorizeCards(convertedCards);
    console.log(
      `✅ ${majorArcana.length} Major Arcana, ${minorArcana.length} Minor Arcana`
    );

    // 6. Output dizinini oluştur
    await createOutputDirectory();
    console.log('✅ Output dizini oluşturuldu');

    // 7. Dosyaları kaydet
    await saveCards(majorArcana, minorArcana);
    console.log('✅ Dosyalar kaydedildi');

    // 8. Rapor oluştur
    await generateReport(convertedCards);
    console.log('✅ Rapor oluşturuldu');

    console.log('🎉 Dönüştürme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

/**
 * Input dosyasını okuma
 */
async function readInputFile() {
  try {
    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Input dosyası okunamadı: ${error.message}`);
  }
}

/**
 * Kart verilerini parse etme
 */
function parseCardsData(rawData) {
  try {
    // Önce dosyanın başında ve sonunda gereksiz karakterleri temizle
    let cleanData = rawData.trim();

    // Dosyayı satırlara ayır ve JSON objelerini bul
    const lines = cleanData.split('\n');
    const jsonObjects = [];

    let currentObject = '';
    let braceCount = 0;
    let inObject = false;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine === '') continue;

      // Eğer satır { ile başlıyorsa, yeni obje başlıyor
      if (trimmedLine.startsWith('{') && !inObject) {
        currentObject = '';
        braceCount = 0;
        inObject = true;
      }

      if (inObject) {
        currentObject += line + '\n';

        // Brace sayısını takip et
        for (const char of line) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
        }

        // Eğer brace sayısı 0 ise, obje tamamlanmış
        if (braceCount === 0 && currentObject.trim() !== '') {
          try {
            const obj = JSON.parse(currentObject.trim());
            jsonObjects.push(obj);
            console.log(`✅ Kart parse edildi: ${obj.id}`);
          } catch (e) {
            console.warn(`⚠️ JSON parse uyarısı: ${e.message}`);
          }
          currentObject = '';
          inObject = false;
        }
      }
    }

    console.log(`📊 Toplam ${jsonObjects.length} kart parse edildi`);
    return jsonObjects;
  } catch (error) {
    throw new Error(`JSON parse hatası: ${error.message}`);
  }
}

/**
 * Kart isimleri mapping'ini yükleme
 */
async function loadNameMapping() {
  try {
    // Mapping dosyasını dinamik olarak import et
    const mappingModule = await import(MAPPING_FILE);
    return mappingModule.cardNameMapping;
  } catch (error) {
    console.warn(
      '⚠️ Mapping dosyası yüklenemedi, varsayılan mapping kullanılacak'
    );
    return {};
  }
}

/**
 * Kartları yeni yapıya dönüştürme
 */
function convertCards(cards, nameMapping) {
  return cards
    .map(card => {
      try {
        return convertSingleCard(card, nameMapping);
      } catch (error) {
        console.warn(`⚠️ Kart dönüştürülemedi (${card.id}): ${error.message}`);
        return null;
      }
    })
    .filter(card => card !== null);
}

/**
 * Tek kartı dönüştürme
 */
function convertSingleCard(card, nameMapping) {
  // Kart kategorisini belirle
  const category = determineCategory(card.id);

  // Kart isimlerini al
  const names = extractCardNames(card, nameMapping);

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

/**
 * Kart kategorisini belirleme
 */
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

/**
 * Kart isimlerini çıkarma
 */
function extractCardNames(card, nameMapping) {
  // Mevcut names objesini kullan
  const names = {
    tr: card.names?.tr || card.nameTr || card.name || '',
    en: card.names?.en || card.name || '',
    sr: card.names?.sr || '',
  };

  // Eksik SR isimleri için mapping'den bul
  if (!names.sr && nameMapping) {
    const srName = Object.entries(nameMapping).find(
      ([key, value]) => value === names.en || key === names.tr
    )?.[0];

    if (srName) {
      names.sr = srName;
    }
  }

  return names;
}

/**
 * Slug'ları oluşturma
 */
function generateSlugs(names) {
  return {
    tr: createTurkishSlug(names.tr),
    en: createEnglishSlug(names.en),
    sr: createSerbianSlug(names.sr),
  };
}

/**
 * Türkçe slug oluşturma
 */
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
    // Minor Arcana
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

  let slug = name;

  // Önce mapping'den bak
  if (slugMap[name]) {
    return slugMap[name];
  }

  // Genel dönüşüm
  slug = slug
    .toLowerCase()
    .replace(/[çğıöşü]/g, match => {
      const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' };
      return map[match];
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return slug;
}

/**
 * İngilizce slug oluşturma
 */
function createEnglishSlug(name) {
  if (!name) return '';

  const slugMap = {
    'The Fool': 'the-fool',
    'The Magician': 'the-magician',
    'The High Priestess': 'the-high-priestess',
    'The Empress': 'the-empress',
    'The Emperor': 'the-emperor',
    'The Hierophant': 'the-hierophant',
    'The Lovers': 'the-lovers',
    'The Chariot': 'the-chariot',
    Strength: 'strength',
    'The Hermit': 'the-hermit',
    'Wheel of Fortune': 'wheel-of-fortune',
    Justice: 'justice',
    'The Hanged Man': 'the-hanged-man',
    Death: 'death',
    Temperance: 'temperance',
    'The Devil': 'the-devil',
    'The Tower': 'the-tower',
    'The Star': 'the-star',
    'The Moon': 'the-moon',
    'The Sun': 'the-sun',
    Judgement: 'judgement',
    'The World': 'the-world',
    // Minor Arcana
    'Ace of Cups': 'ace-of-cups',
    'Two of Cups': 'two-of-cups',
    'Three of Cups': 'three-of-cups',
    'Four of Cups': 'four-of-cups',
    'Five of Cups': 'five-of-cups',
    'Six of Cups': 'six-of-cups',
    'Seven of Cups': 'seven-of-cups',
    'Eight of Cups': 'eight-of-cups',
    'Nine of Cups': 'nine-of-cups',
    'Ten of Cups': 'ten-of-cups',
    'Page of Cups': 'page-of-cups',
    'Knight of Cups': 'knight-of-cups',
    'Queen of Cups': 'queen-of-cups',
    'King of Cups': 'king-of-cups',
  };

  if (slugMap[name]) {
    return slugMap[name];
  }

  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Sırpça slug oluşturma
 */
function createSerbianSlug(name) {
  if (!name) return '';

  const slugMap = {
    Budala: 'budala',
    Mađioničar: 'madionicar',
    'Visoka Svestenica': 'visoka-svestenica',
    Carica: 'carica',
    Car: 'car',
    Sveštenik: 'svestenik',
    Ljubavnici: 'ljubavnici',
    Kola: 'kola',
    Snaga: 'snaga',
    Pustinjak: 'pustinjak',
    'Točak Sreće': 'tocak-srece',
    Pravda: 'pravda',
    'Obeseni Čovek': 'obeseni-covek',
    Smrt: 'smrt',
    Umerenost: 'umerenost',
    Đavo: 'davo',
    Kula: 'kula',
    Zvezda: 'zvezda',
    Mesec: 'mesec',
    Sunce: 'sunce',
    Sud: 'sud',
    Svet: 'svet',
  };

  if (slugMap[name]) {
    return slugMap[name];
  }

  return name
    .toLowerCase()
    .replace(/[čćđšž]/g, match => {
      const map = { č: 'c', ć: 'c', đ: 'd', š: 's', ž: 'z' };
      return map[match];
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Kart içeriklerini dönüştürme
 */
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

/**
 * Belirli bir dil için içerik dönüştürme
 */
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

/**
 * Placeholder içerik oluşturma (Minor Arcana için)
 */
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

/**
 * SEO meta oluşturma
 */
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

/**
 * Minor Arcana suit ve number bilgisi çıkarma
 */
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

/**
 * Kartları kategorilere ayırma
 */
function categorizeCards(cards) {
  const majorArcana = cards.filter(card => card.category === 'major_arcana');
  const minorArcana = cards.filter(card => card.category === 'minor_arcana');

  return { majorArcana, minorArcana };
}

/**
 * Output dizinini oluşturma
 */
async function createOutputDirectory() {
  try {
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Dizin zaten varsa hata verme
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Kartları dosyalara kaydetme
 */
async function saveCards(majorArcana, minorArcana) {
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
    path.join(OUTPUT_DIR, 'major-arcana.json'),
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
    path.join(OUTPUT_DIR, 'minor-arcana.json'),
    JSON.stringify(minorArcanaData, null, 2),
    'utf-8'
  );

  // Tüm kartları tek dosyada kaydet
  const allCardsData = {
    cards: [...majorArcana, ...minorArcana],
    metadata: {
      total: majorArcana.length + minorArcana.length,
      major_arcana: majorArcana.length,
      minor_arcana: minorArcana.length,
      generated: new Date().toISOString(),
    },
  };

  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, 'all-cards.json'),
    JSON.stringify(allCardsData, null, 2),
    'utf-8'
  );
}

/**
 * Rapor oluşturma
 */
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
    path.join(OUTPUT_DIR, 'conversion-report.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );
}

// ============================================================================
// SCRIPT ÇALIŞTIRMA
// ============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  convertBlogTarotToJson();
}

export { convertBlogTarotToJson };
