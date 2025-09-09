/*
 * info:
 * Bu dosya, tüm tarot açılımı modülleri tarafından kullanılan
 * paylaşılan TypeScript tiplerini ve arayüzlerini merkezileştirir.
 * Kod tekrarını önler ve proje genelinde tip tutarlılığını sağlar.
 */

// ============================================================================
// BÖLÜM 1: TEMEL TİPLER
// ============================================================================

/**
 * Bir tarot kartının tüm özelliklerini tanımlayan ana arayüz.
 * Hem İngilizce hem de Türkçe alanları içerir.
 */
export interface TarotCard {
  id: number;
  name: string;
  nameTr: string;
  suit: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles';
  number?: number | string;
  meaning: {
    upright: string;
    reversed: string;
  };
  meaningTr: {
    upright: string;
    reversed: string;
  };
  keywords: string[];
  keywordsTr: string[];
  careerKeywords?: string[];
  image: string;
  element?: string;
  // Açılıma özel anlamlar opsiyonel olarak eklenebilir
  careerMeaning?: {
    upright: string;
    reversed: string;
  };
  loveMeaning?: {
    upright: string;
    reversed: string;
  };
  hermitMeaning?: {
    upright: string;
    reversed: string;
  };
}

/**
 * Tarot açılımlarında kullanılan okuma türlerini tanımlar.
 * (simple: Basit, detailed: Sesli/Detaylı, written: Yazılı)
 */
export const READING_TYPES = {
  SIMPLE: 'simple',
  DETAILED: 'detailed',
  WRITTEN: 'written',
} as const;

export type ReadingType = (typeof READING_TYPES)[keyof typeof READING_TYPES];

// ============================================================================
// BÖLÜM 2: AÇILIM (SPREAD) İLE İLGİLİ TİPLER
// ============================================================================

/**
 * Bir tarot açılımındaki tek bir kart pozisyonunun bilgilerini tanımlar.
 */
export interface PositionInfo {
  id: number;
  title: string;
  description: string;
  // desc alanı, eski bileşenlerle uyumluluk için eklenmiştir.
  desc: string;
}

/**
 * Bir tarot açılımındaki tek bir kart pozisyonunun CSS yerleşimini tanımlar.
 */
export interface PositionLayout {
  id: number;
  className: string;
  // x ve y koordinatları bazı özel yerleşimler için gerekebilir.
  x?: number;
  y?: number;
}

// ============================================================================
// BÖLÜM 3: MODÜLER SPREAD SİSTEMİ TİPLERİ
// ============================================================================

/**
 * Bir spread'in yorum bileşeni için gerekli konfigürasyon bilgileri
 */
export interface SpreadInterpretationConfig {
  title: string;
  icon: string;
  placeholder: string;
  badgeText: string;
  badgeColor: string;
  aiTitle?: string;
  aiIcon?: string;
  aiButtonText?: string;
  aiResultTitle?: string;
}

/**
 * Bir pozisyon için kart anlamları
 */
export interface PositionCardMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group:
    | 'Majör Arkana'
    | 'Kupalar'
    | 'Kılıçlar'
    | 'Asalar'
    | 'Tılsımlar'
    | 'Değnekler';
}

/**
 * Bir spread'in tüm pozisyon anlamlarını içeren yapı
 */
export interface SpreadMeanings {
  positions: Record<number, PositionCardMeaning[]>;
  aiMeanings?: any; // AI interpretation data
}

/**
 * Tam modüler tarot spread konfigürasyonu
 */
export interface TarotSpreadConfig {
  id: string;
  name: string;
  cardCount: number;
  theme: 'pink' | 'purple' | 'blue' | 'green' | 'amber' | 'red';
  backgroundImage: string;
  positionsLayout: readonly PositionLayout[];
  positionsInfo: readonly PositionInfo[];
  interpretationConfig: SpreadInterpretationConfig;
  interpretationSummary?: (cards: TarotCard[]) => string;
  interpretationComponent?: any; // React component for interpretation
}

/**
 * Spread registry entry
 */
export interface SpreadRegistryEntry {
  config: TarotSpreadConfig;
  meanings: SpreadMeanings;
  lazyComponent: () => Promise<any>;
}
