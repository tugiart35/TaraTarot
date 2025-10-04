# Card Name Mapping Entegrasyon Planı

## 📊 Mevcut Durum Analizi

**Dosya**: `src/features/tarot/lib/love/card-name-mapping.ts`  
**Toplam Mapping**: 247 kart ismi  
**Dil Desteği**: TR, EN, SR

## 🗺 Mevcut Mapping Yapısı

### Major Arcana Mapping Örnekleri

```typescript
export const cardNameMapping: { [key: string]: string } = {
  // Major Arcana - Türkçe
  Deli: 'The Fool',
  Büyücü: 'The Magician',
  'Yüksek Rahibe': 'The High Priestess',
  İmparatoriçe: 'The Empress',
  İmparator: 'The Emperor',
  Hierophant: 'The Hierophant',
  Aziz: 'The Hierophant',
  Aşıklar: 'The Lovers',
  'Savaş Arabası': 'The Chariot',
  Güç: 'Strength',
  Ermiş: 'The Hermit',
  Münzevi: 'The Hermit',
  // ... devamı

  // Major Arcana - Sırpça
  Budala: 'The Fool',
  Mađioničar: 'The Magician',
  'Visoka Svestenica': 'The High Priestess',
  Carica: 'The Empress',
  Car: 'The Emperor',
  // ... devamı
};
```

### Minor Arcana Mapping Örnekleri

```typescript
// Minor Arcana - Kupalar (Türkçe)
'Kupalar Ası': 'Ace of Cups',
'Kupalar İkilisi': 'Two of Cups',
'Kupalar Üçlüsü': 'Three of Cups',
// ... devamı

// Minor Arcana - Kupalar (Sırpça)
'As Pehara': 'Ace of Cups',
'Dvojka Pehara': 'Two of Cups',
'Trojka Pehara': 'Three of Cups',
// ... devamı
```

## 🔄 Entegrasyon Stratejisi

### 1. Reverse Mapping Oluşturma

```typescript
// Mevcut mapping'i tersine çevirme
export const reverseCardNameMapping = (): {
  [key: string]: { tr: string; sr: string };
} => {
  const reverse: { [key: string]: { tr: string; sr: string } } = {};

  Object.entries(cardNameMapping).forEach(([localName, englishName]) => {
    if (!reverse[englishName]) {
      reverse[englishName] = { tr: '', sr: '' };
    }

    // Türkçe mi Sırpça mı belirleme
    if (isTurkishName(localName)) {
      reverse[englishName].tr = localName;
    } else if (isSerbianName(localName)) {
      reverse[englishName].sr = localName;
    }
  });

  return reverse;
};

const isTurkishName = (name: string): boolean => {
  const turkishPatterns = [
    'Kupalar',
    'Kılıçlar',
    'Asalar',
    'Tılsımlar',
    'Altınlar',
  ];
  return (
    turkishPatterns.some(pattern => name.includes(pattern)) ||
    ['Deli', 'Büyücü', 'İmparatoriçe', 'İmparator', 'Aşıklar'].includes(name)
  );
};

const isSerbianName = (name: string): boolean => {
  const serbianPatterns = ['Pehara', 'Mačeva', 'Štapova', 'Pentakla'];
  return (
    serbianPatterns.some(pattern => name.includes(pattern)) ||
    ['Budala', 'Mađioničar', 'Carica', 'Car', 'Ljubavnici'].includes(name)
  );
};
```

### 2. Slug Mapping Oluşturma

```typescript
export const cardSlugMapping = (): {
  [key: string]: { tr: string; en: string; sr: string };
} => {
  const reverse = reverseCardNameMapping();
  const slugs: { [key: string]: { tr: string; en: string; sr: string } } = {};

  Object.entries(reverse).forEach(([englishName, names]) => {
    slugs[englishName] = {
      tr: createTurkishSlug(names.tr),
      en: createEnglishSlug(englishName),
      sr: createSerbianSlug(names.sr),
    };
  });

  return slugs;
};

const createTurkishSlug = (name: string): string => {
  const slugMap: { [key: string]: string } = {
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
    'Kupalar Ası': 'kupalar-asi',
    'Kupalar İkilisi': 'kupalar-ikilisi',
    'Kupalar Üçlüsü': 'kupalar-uclusu',
    // ... devamı
  };

  return (
    slugMap[name] ||
    name
      .toLowerCase()
      .replace(/[çğıöşü]/g, match => {
        const map: { [key: string]: string } = {
          ç: 'c',
          ğ: 'g',
          ı: 'i',
          ö: 'o',
          ş: 's',
          ü: 'u',
        };
        return map[match];
      })
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  );
};

const createEnglishSlug = (name: string): string => {
  const slugMap: { [key: string]: string } = {
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
    'The Wheel of Fortune': 'the-wheel-of-fortune',
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
    // ... devamı
  };

  return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-');
};

const createSerbianSlug = (name: string): string => {
  const slugMap: { [key: string]: string } = {
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
    // Minor Arcana
    'As Pehara': 'as-pehara',
    'Dvojka Pehara': 'dvojka-pehara',
    'Trojka Pehara': 'trojka-pehara',
    // ... devamı
  };

  return (
    slugMap[name] ||
    name
      .toLowerCase()
      .replace(/[čćđšž]/g, match => {
        const map: { [key: string]: string } = {
          č: 'c',
          ć: 'c',
          đ: 'd',
          š: 's',
          ž: 'z',
        };
        return map[match];
      })
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  );
};
```

### 3. Unified Card Interface

```typescript
export interface UnifiedCardData {
  id: string;
  names: {
    tr: string;
    en: string;
    sr: string;
  };
  slugs: {
    tr: string;
    en: string;
    sr: string;
  };
  content: {
    tr: CardContent;
    en: CardContent;
    sr: CardContent;
  };
  seo: {
    tr: SEOMeta;
    en: SEOMeta;
    sr: SEOMeta;
  };
}

export interface CardContent {
  short_description: string;
  meanings: {
    upright: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
    reversed: {
      general: string;
      love: string;
      career: string;
      money: string;
      spiritual: string;
    };
  };
  context: {
    mythology: string;
    celtic_cross: {
      future: string;
      hidden_influences: string;
    };
  };
  faq: string[];
  cta: {
    main: string;
    micro: string;
  };
  related: {
    cards: string[];
    guides: string[];
  };
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
}
```

### 4. Helper Fonksiyonları

```typescript
// Kart ID'sinden tüm dil bilgilerini getirme
export const getCardBySlug = async (
  slug: string,
  locale: 'tr' | 'en' | 'sr'
): Promise<UnifiedCardData | null> => {
  const slugMapping = cardSlugMapping();

  // Slug'dan kart ID'sini bulma
  const cardId = Object.keys(slugMapping).find(
    id => slugMapping[id][locale] === slug
  );

  if (!cardId) return null;

  // İçerik verilerini getirme
  const content = await getCardContent(cardId);

  return {
    id: cardId,
    names: reverseCardNameMapping()[cardId],
    slugs: slugMapping[cardId],
    content,
    seo: await getCardSEO(cardId),
  };
};

// Tüm kartları liste olarak getirme
export const getAllCards = async (): Promise<UnifiedCardData[]> => {
  const slugMapping = cardSlugMapping();
  const cards: UnifiedCardData[] = [];

  for (const cardId of Object.keys(slugMapping)) {
    const card = await getCardBySlug(slugMapping[cardId].en, 'en');
    if (card) cards.push(card);
  }

  return cards;
};

// Hreflang için alternatif URL'leri getirme
export const getHreflangUrls = (
  cardId: string
): { [locale: string]: string } => {
  const slugs = cardSlugMapping()[cardId];
  const baseUrl = 'https://busbuskimki.com';

  return {
    en: `${baseUrl}/en/cards/${slugs.en}`,
    tr: `${baseUrl}/tr/kartlar/${slugs.tr}`,
    sr: `${baseUrl}/sr/kartice/${slugs.sr}`,
    'x-default': `${baseUrl}/en/cards/${slugs.en}`,
  };
};
```

## 🎯 Implementation Adımları

### 1. Mapping Dosyasını Genişletme

```typescript
// src/lib/tarot/card-mappings.ts
export {
  cardNameMapping,
  reverseCardNameMapping,
  cardSlugMapping,
} from './mappings';
export { getCardBySlug, getAllCards, getHreflangUrls } from './helpers';
export type { UnifiedCardData, CardContent, SEOMeta } from './types';
```

### 2. Next.js Dynamic Routing

```typescript
// src/app/[locale]/(main)/[category]/[slug]/page.tsx
import { getCardBySlug, getHreflangUrls } from '@/lib/tarot/card-mappings';

export async function generateStaticParams() {
  const cards = await getAllCards();
  const params = [];

  for (const card of cards) {
    params.push(
      { locale: 'tr', category: 'kartlar', slug: card.slugs.tr },
      { locale: 'en', category: 'cards', slug: card.slugs.en },
      { locale: 'sr', category: 'kartice', slug: card.slugs.sr }
    );
  }

  return params;
}
```

### 3. SEO Meta Generation

```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const card = await getCardBySlug(
    params.slug,
    params.locale as 'tr' | 'en' | 'sr'
  );

  if (!card) return {};

  const hreflangUrls = getHreflangUrls(card.id);

  return {
    title: card.seo[params.locale as keyof typeof card.seo].title,
    description: card.seo[params.locale as keyof typeof card.seo].description,
    keywords: card.seo[params.locale as keyof typeof card.seo].keywords,
    alternates: {
      canonical: hreflangUrls[params.locale],
      languages: hreflangUrls,
    },
  };
}
```

## 📊 Sonuç ve Öneriler

### ✅ Avantajlar

1. **Merkezi Yönetim**: Tüm kart isimleri tek yerden
2. **Tip Güvenliği**: TypeScript ile güvenli erişim
3. **Performans**: Lazy loading ile optimizasyon
4. **Esneklik**: Yeni diller kolayca eklenebilir

### ⚠️ Dikkat Edilecekler

1. **Mapping Tutarlılığı**: Tüm kartlar için mapping gerekli
2. **Slug Benzersizliği**: URL çakışmalarını önleme
3. **Performance**: Büyük mapping objesi memory kullanımı
4. **Maintenance**: Yeni kartlar eklenirken mapping güncelleme

### 🚀 Sonraki Adımlar

1. **Mapping Validation**: Tüm kartlar için mapping kontrolü
2. **Slug Generation**: Otomatik slug oluşturma
3. **Content Integration**: blogtarot.txt ile entegrasyon
4. **Testing**: Mapping fonksiyonları test etme

---

**Sonuç**: Card name mapping entegrasyonu başarılı şekilde tamamlanabilir ve SEO
projesinin temelini oluşturur.

