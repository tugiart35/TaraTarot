import {
  TarotCard,
  Locale,
  HreflangUrls,
  SUPPORTED_LOCALES,
} from '@/types/tarot-seo';

// Kart verilerini cache'le
let cachedCards: TarotCard[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

/**
 * Tüm kartları yükle (cache'li)
 */
export async function getAllCards(): Promise<TarotCard[]> {
  const now = Date.now();

  if (cachedCards && now - cacheTimestamp < CACHE_DURATION) {
    return cachedCards;
  }

  try {
    // Server-side'da doğrudan dosyadan yükle
    const { default: cardsData } = await import(
      '@/data/cards/all-cards-seo.json'
    );
    
    // Type assertion for safer handling
    const data = cardsData as any;
    
    // Eğer cardsData bir array ise direkt kullan, değilse cards property'sini kullan
    cachedCards = Array.isArray(data) ? data : data.cards || [];
    cacheTimestamp = now;

    return cachedCards || [];
  } catch (error) {
    console.error('Error loading cards from file:', error);
    throw new Error('Unable to load tarot cards');
  }
}

/**
 * Slug ile kart yükle
 */
export async function getCardBySlug(
  slug: string,
  locale: Locale
): Promise<TarotCard | null> {
  try {
    const cards = await getAllCards();
    
    const foundCard = cards.find(card => card.slugs[locale] === slug);
    
    return foundCard || null;
  } catch (error) {
    console.error('Error loading card by slug:', error);
    return null;
  }
}

/**
 * ID ile kart yükle
 */
export async function getCardById(id: string): Promise<TarotCard | null> {
  try {
    const cards = await getAllCards();

    return cards.find(card => card.id === id) || null;
  } catch (error) {
    console.error('Error loading card by ID:', error);
    return null;
  }
}

/**
 * Kategoriye göre kartları yükle
 */
export async function getCardsByCategory(
  category: 'major_arcana' | 'minor_arcana'
): Promise<TarotCard[]> {
  try {
    const cards = await getAllCards();

    return cards.filter(card => card.category === category);
  } catch (error) {
    console.error('Error loading cards by category:', error);
    return [];
  }
}

/**
 * Takıma göre kartları yükle
 */
export async function getCardsBySuit(
  suit: 'cups' | 'swords' | 'wands' | 'pentacles'
): Promise<TarotCard[]> {
  try {
    const cards = await getAllCards();

    return cards.filter(card => card.suit === suit);
  } catch (error) {
    console.error('Error loading cards by suit:', error);
    return [];
  }
}

/**
 * İlgili kartları yükle
 */
export async function getRelatedCards(
  cardId: string,
  limit: number = 4
): Promise<TarotCard[]> {
  try {
    const card = await getCardById(cardId);

    if (!card || !card.content.tr.related.cards) {
      return [];
    }

    const relatedCards: TarotCard[] = [];

    for (const relatedId of card.content.tr.related.cards.slice(0, limit)) {
      const relatedCard = await getCardById(relatedId);
      if (relatedCard) {
        relatedCards.push(relatedCard);
      }
    }

    return relatedCards;
  } catch (error) {
    console.error('Error loading related cards:', error);
    return [];
  }
}

/**
 * Hreflang URL'leri oluştur
 */
export function getCardHreflangUrls(
  cardId: string,
  cardNames: Record<Locale, string>,
  cardSlugs?: Record<Locale, string>
): HreflangUrls {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const urls: HreflangUrls = {
    'x-default': '',
  };

  // Define main category paths for each locale to ensure correct values
  const mainCategoryPaths = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };

  // Her dil için URL oluştur
  for (const locale of SUPPORTED_LOCALES) {
    if (cardNames && cardNames[locale]) {
      // Determine category based on card ID
      let category = 'major-arcana';
      if (cardId.includes('swords')) category = 'swords';
      else if (cardId.includes('cups')) category = 'cups';
      else if (cardId.includes('wands')) category = 'wands';
      else if (cardId.includes('pentacles')) category = 'pentacles';
      else if (
        cardId.includes('the_') ||
        cardId.includes('strength') ||
        cardId.includes('justice') ||
        cardId.includes('wheel_of_fortune') ||
        cardId.includes('death') ||
        cardId.includes('temperance') ||
        cardId.includes('the_hanged_man') ||
        cardId.includes('judgement')
      ) {
        category = 'major-arcana';
      } else {
        category = 'minor-arcana';
      }

      // Get localized category paths
      const categoryPaths = {
        tr: {
          'major-arcana': 'buyuk-arkana',
          'minor-arcana': 'kucuk-arkana',
          swords: 'kiliclar',
          cups: 'kupalar',
          wands: 'asalar',
          pentacles: 'tilsimlar',
        },
        en: {
          'major-arcana': 'major-arcana',
          'minor-arcana': 'minor-arcana',
          swords: 'swords',
          cups: 'cups',
          wands: 'wands',
          pentacles: 'pentacles',
        },
        sr: {
          'major-arcana': 'velika-arkana',
          'minor-arcana': 'mala-arkana',
          swords: 'mačevi',
          cups: 'čaše',
          wands: 'štapovi',
          pentacles: 'zlatnici',
        },
      };

      const categoryPath = (categoryPaths[locale] as any)[category] || category;
      const mainPath = mainCategoryPaths[locale];
      // Her locale için kendi slug'ını kullan
      const slug = cardSlugs?.[locale] || generateOptimizedSlug(cardNames[locale], locale);

      urls[locale] =
        `${baseUrl}/${locale}/${mainPath}/${categoryPath}/${slug}`;
    }
  }

  // x-default olarak EN URL'ini ayarla
  urls['x-default'] = urls.en || urls.tr || '';

  return urls;
}

/**
 * Optimized slug oluştur
 */
function generateOptimizedSlug(cardName: string, locale: Locale): string {
  let slug = cardName.toLowerCase();

  // Türkçe karakter dönüşümü
  if (locale === 'tr') {
    const trMap = {
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
    };
    for (const [from, to] of Object.entries(trMap)) {
      slug = slug.replace(new RegExp(from, 'g'), to);
    }
  }

  // Sırpça karakter dönüşümü
  if (locale === 'sr') {
    const srMap = {
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
    };
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

/**
 * Breadcrumb oluştur
 */
export function generateBreadcrumb(card: TarotCard, locale: Locale) {
  // Define main category paths for each locale to ensure correct values
  const mainCategoryPaths = {
    tr: 'kartlar',
    en: 'cards',
    sr: 'kartice',
  };
  const categoryPath = mainCategoryPaths[locale];

  // Determine category based on card ID
  let category = 'major-arcana';
  if (card.category === 'minor_arcana') {
    if (card.id.includes('swords')) category = 'swords';
    else if (card.id.includes('cups')) category = 'cups';
    else if (card.id.includes('wands')) category = 'wands';
    else if (card.id.includes('pentacles')) category = 'pentacles';
    else category = 'minor-arcana';
  }

  // Get localized category paths
  const categoryPaths = {
    tr: {
      'major-arcana': 'buyuk-arkana',
      'minor-arcana': 'kucuk-arkana',
      swords: 'kiliclar',
      cups: 'kupalar',
      wands: 'asalar',
      pentacles: 'tilsimlar',
    },
    en: {
      'major-arcana': 'major-arcana',
      'minor-arcana': 'minor-arcana',
      swords: 'swords',
      cups: 'cups',
      wands: 'wands',
      pentacles: 'pentacles',
    },
    sr: {
      'major-arcana': 'velika-arkana',
      'minor-arcana': 'mala-arkana',
      swords: 'mačevi',
      cups: 'čaše',
      wands: 'štapovi',
      pentacles: 'zlatnici',
    },
  };

  const localizedCategoryPath = (categoryPaths[locale] as any)[category] || category;
  const optimizedSlug = generateOptimizedSlug(card.names[locale], locale);

  // Get localized labels
  const labels = {
    tr: {
      home: 'Ana Sayfa',
      cards: 'Kartlar',
      majorArcana: 'Büyük Arkana',
      minorArcana: 'Küçük Arkana',
      swords: 'Kılıçlar',
      cups: 'Kupalar',
      wands: 'Asalar',
      pentacles: 'Tılsımlar',
    },
    en: {
      home: 'Home',
      cards: 'Cards',
      majorArcana: 'Major Arcana',
      minorArcana: 'Minor Arcana',
      swords: 'Swords',
      cups: 'Cups',
      wands: 'Wands',
      pentacles: 'Pentacles',
    },
    sr: {
      home: 'Početna',
      cards: 'Karte',
      majorArcana: 'Velika Arkana',
      minorArcana: 'Mala Arkana',
      swords: 'Mačevi',
      cups: 'Čaše',
      wands: 'Štapovi',
      pentacles: 'Zlatnici',
    },
  };

  const categoryLabel = (labels[locale] as any)[category] || category;

  return [
    {
      label: labels[locale].home,
      href: `/${locale}`,
    },
    {
      label: labels[locale].cards,
      href: `/${locale}/${categoryPath}`,
    },
    {
      label: categoryLabel,
      href: `/${locale}/${categoryPath}/${localizedCategoryPath}`,
    },
    {
      label: card.names[locale],
      href: `/${locale}/${categoryPath}/${localizedCategoryPath}/${optimizedSlug}`,
    },
  ];
}

/**
 * Kart arama
 */
export async function searchCards(
  query: string,
  locale: Locale
): Promise<TarotCard[]> {
  try {
    const cards = await getAllCards();
    const searchTerm = query.toLowerCase();

    return cards.filter(card => {
      const name = card.names[locale].toLowerCase();
      const description = card.content[locale].short_description.toLowerCase();
      const keywords = card.seo[locale].keywords.join(' ').toLowerCase();

      return (
        name.includes(searchTerm) ||
        description.includes(searchTerm) ||
        keywords.includes(searchTerm)
      );
    });
  } catch (error) {
    console.error('Error searching cards:', error);
    return [];
  }
}

/**
 * Rastgele kart seç
 */
export async function getRandomCard(): Promise<TarotCard | null> {
  try {
    const cards = await getAllCards();
    const randomIndex = Math.floor(Math.random() * cards.length);

    return cards[randomIndex] || null;
  } catch (error) {
    console.error('Error getting random card:', error);
    return null;
  }
}

/**
 * Günlük kart seç (tarihe göre deterministik)
 */
export async function getDailyCard(): Promise<TarotCard | null> {
  try {
    const cards = await getAllCards();
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const cardIndex = dayOfYear % cards.length;

    return cards[cardIndex] || null;
  } catch (error) {
    console.error('Error getting daily card:', error);
    return null;
  }
}
